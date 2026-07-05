import { describe, expect, it } from "vitest";
import { createMemoryCore } from "../core/memoryCore";
import { ensureRemoteAppRooms } from "./appRooms";
import { decryptRoomSnapshot } from "./crypto";
import { createMemorySyncProvider } from "./memorySyncProvider";
import { processSourceSyncQueue } from "./sourceSyncWorker";
import { createMemorySyncQueueStore, enqueueSaveSource } from "./syncQueue";
import type { RealtimeSyncProvider, SaveRoomInput } from "./types";
import { createMemoryWorkspaceSyncStore, createWorkspaceSyncRegistry } from "./workspaceSync";

describe("source sync worker", () => {
  it("saves queued source remotely, remembers the source room version, and removes completed work", async () => {
    const core = createMemoryCore();
    const provider = createMemorySyncProvider();
    const queueStore = createMemorySyncQueueStore();
    const syncRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await syncRegistry.configureStorageProfile({ databaseUrl: "https://example.firebaseio.com" });

    const app = await core.createApp({
      description: "Example",
      name: "Example",
      sourceCode: "<!doctype html><title>Example</title>",
    });
    await syncRegistry.ensureOwnedAppRooms(app.appId);
    await enqueueSaveSource(queueStore, app);

    await processSourceSyncQueue({
      core,
      createProviderForSyncRecord: async () => provider,
      queueStore,
      syncRegistry,
    });

    await expect(queueStore.listItems()).resolves.toEqual([]);
    const remembered = await syncRegistry.getAppSyncRecord(app.appId);
    if (!remembered) throw new Error("Expected app sync record.");
    expect(remembered?.sourceRoom.lastSeenVersion).toBe(1);
    const snapshot = await provider.loadRoom({
      readToken: remembered.sourceRoom.readToken,
      roomId: remembered.sourceRoom.roomId,
    });
    const sourcePayload = await decryptRoomSnapshot({
      capability: remembered.sourceRoom,
      roomType: "app-package",
      snapshot,
    });
    expect(sourcePayload).toMatchObject({
      app: { appId: app.appId, sourceCode: "<!doctype html><title>Example</title>" },
    });
  });

  it("keeps failed source work pending for a future retry", async () => {
    const core = createMemoryCore();
    const queueStore = createMemorySyncQueueStore();
    const syncRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await syncRegistry.configureStorageProfile({ databaseUrl: "https://example.firebaseio.com" });

    const app = await core.createBlankApp();
    await syncRegistry.ensureOwnedAppRooms(app.appId);
    const queued = await enqueueSaveSource(queueStore, app);

    await processSourceSyncQueue({
      core,
      createProviderForSyncRecord: async () => {
        throw new Error("Provider unavailable");
      },
      queueStore,
      syncRegistry,
    });

    await expect(queueStore.getItem(queued.id)).resolves.toMatchObject({
      attempts: 1,
      lastError: "Provider unavailable",
      status: "pending",
    });
  });

  it("does not remove newer source work that arrives while an older source upload is in flight", async () => {
    const core = createMemoryCore();
    const baseProvider = createMemorySyncProvider();
    const queueStore = createMemorySyncQueueStore();
    const syncRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await syncRegistry.configureStorageProfile({ databaseUrl: "https://example.firebaseio.com" });

    const oldApp = await core.createApp({
      description: "Example",
      name: "Old",
      sourceCode: "<!doctype html><title>Old</title>",
    });
    const syncRecord = await syncRegistry.ensureOwnedAppRooms(oldApp.appId);
    await ensureRemoteAppRooms({ app: oldApp, appData: {}, provider: baseProvider, syncRecord });
    await enqueueSaveSource(queueStore, oldApp);

    let injectedNewerSource = false;
    const provider: RealtimeSyncProvider = {
      ...baseProvider,
      async saveRoom(input: SaveRoomInput) {
        if (!injectedNewerSource) {
          injectedNewerSource = true;
          const newApp = await core.updateApp({
            appId: oldApp.appId,
            name: "New",
            sourceCode: "<!doctype html><title>New</title>",
          });
          await enqueueSaveSource(queueStore, newApp);
        }
        return baseProvider.saveRoom(input);
      },
    };

    await processSourceSyncQueue({
      core,
      createProviderForSyncRecord: async () => provider,
      queueStore,
      syncRegistry,
    });

    await expect(queueStore.listItems()).resolves.toMatchObject([
      {
        appId: oldApp.appId,
        kind: "save-source",
        sourceCode: "<!doctype html><title>New</title>",
        status: "pending",
      },
    ]);
  });
});
