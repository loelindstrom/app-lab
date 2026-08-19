import { describe, expect, it } from "vitest";
import { createMemoryCore } from "../../core/memoryCore";
import { ensureRemoteAppRooms, loadRemoteAppRooms, markRemoteAppDeleted, saveRemoteAppSource } from "../rooms/appRooms";
import { decryptRoomSnapshot } from "../rooms/crypto";
import { createMemorySyncProvider } from "../testing/memorySyncProvider";
import { processSourceSyncQueue } from "./sourceSyncWorker";
import { createMemorySyncQueueStore, enqueueSaveAppData, enqueueSaveSource } from "./syncQueue";
import { configureTestStorageProfile } from "../testing/testStorageProfile";
import type { RealtimeSyncProvider, SaveRoomInput } from "../rooms/types";
import { createMemoryWorkspaceSyncStore, createWorkspaceSyncRegistry } from "../workspace/workspaceSync";

describe("source sync worker", () => {
  it("saves queued source remotely, remembers the source room version, and removes completed work", async () => {
    const core = createMemoryCore();
    const provider = createMemorySyncProvider();
    const queueStore = createMemorySyncQueueStore();
    const syncRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await configureTestStorageProfile(syncRegistry);

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
    await configureTestStorageProfile(syncRegistry);

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

  it("uses latest-local-wins when the remote source room changed before a queued save flushes", async () => {
    const core = createMemoryCore();
    const provider = createMemorySyncProvider();
    const queueStore = createMemorySyncQueueStore();
    const syncRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await configureTestStorageProfile(syncRegistry);

    const app = await core.createApp({
      description: "Conflict test",
      name: "Initial",
      sourceCode: "<!doctype html><title>Initial</title>",
    });
    const initialRecord = await syncRegistry.ensureOwnedAppRooms(app.appId);
    await ensureRemoteAppRooms({ app, appData: {}, provider, syncRecord: initialRecord });
    const initialRemote = await loadRemoteAppRooms({ provider, syncRecord: initialRecord });
    const currentRecord = await syncRegistry.rememberAppRoomVersions({
      appId: app.appId,
      dataRoom: initialRemote.dataRoom,
      sourceRoom: initialRemote.sourceRoom,
    });
    const remoteSourceRoom = await saveRemoteAppSource({
      app: {
        ...app,
        name: "Remote newer",
        sourceCode: "<!doctype html><title>Remote newer</title>",
        updatedAt: new Date().toISOString(),
      },
      provider,
      syncRecord: currentRecord,
    });
    const localApp = await core.updateApp({
      appId: app.appId,
      name: "Local pending",
      sourceCode: "<!doctype html><title>Local pending</title>",
    });
    await enqueueSaveSource(queueStore, localApp);

    await processSourceSyncQueue({
      core,
      createProviderForSyncRecord: async () => provider,
      queueStore,
      syncRegistry,
    });

    await expect(queueStore.listItems()).resolves.toEqual([]);
    const remembered = await syncRegistry.getAppSyncRecord(app.appId);
    expect(remembered?.sourceRoom.lastSeenVersion).toBe(remoteSourceRoom.lastSeenVersion + 1);
    await expect(loadRemoteAppRooms({ provider, syncRecord: remembered ?? currentRecord })).resolves.toMatchObject({
      app: {
        name: "Local pending",
        sourceCode: "<!doctype html><title>Local pending</title>",
      },
    });
  });

  it("discards stale local writes instead of overwriting a remote deletion marker", async () => {
    const core = createMemoryCore();
    const provider = createMemorySyncProvider();
    const queueStore = createMemorySyncQueueStore();
    const syncRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await configureTestStorageProfile(syncRegistry);

    const app = await core.createBlankApp();
    const initialRecord = await syncRegistry.ensureOwnedAppRooms(app.appId);
    await ensureRemoteAppRooms({ app, appData: {}, provider, syncRecord: initialRecord });
    const initialRemote = await loadRemoteAppRooms({ provider, syncRecord: initialRecord });
    const currentRecord = await syncRegistry.rememberAppRoomVersions({
      appId: app.appId,
      dataRoom: initialRemote.dataRoom,
      sourceRoom: initialRemote.sourceRoom,
    });
    await markRemoteAppDeleted({ app, provider, syncRecord: currentRecord });
    const localApp = await core.updateApp({
      appId: app.appId,
      sourceCode: "<!doctype html><title>Stale local edit</title>",
    });
    await enqueueSaveSource(queueStore, localApp);
    await enqueueSaveAppData({
      appId: app.appId,
      baseData: {},
      baseRemoteVersion: currentRecord.dataRoom.lastSeenVersion,
      data: { stale: true },
      roomId: currentRecord.dataRoom.roomId,
      store: queueStore,
    });

    await processSourceSyncQueue({
      core,
      createProviderForSyncRecord: async () => provider,
      queueStore,
      syncRegistry,
    });

    await expect(queueStore.listItems()).resolves.toEqual([]);
    await expect(core.getApp(app.appId)).resolves.toBeNull();
    await expect(syncRegistry.getAppSyncRecord(app.appId)).resolves.toBeNull();
    await expect(loadRemoteAppRooms({ provider, syncRecord: currentRecord })).rejects.toThrow(/deleted by its owner/i);
  });

  it("does not remove newer source work that arrives while an older source upload is in flight", async () => {
    const core = createMemoryCore();
    const baseProvider = createMemorySyncProvider();
    const queueStore = createMemorySyncQueueStore();
    const syncRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await configureTestStorageProfile(syncRegistry);

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
