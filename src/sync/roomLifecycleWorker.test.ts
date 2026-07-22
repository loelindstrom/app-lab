import { describe, expect, it } from "vitest";
import { createMemoryCore } from "../core/memoryCore";
import { loadRemoteAppRooms } from "./appRooms";
import { createMemorySyncProvider } from "./memorySyncProvider";
import { processRoomLifecycleQueue } from "./roomLifecycleWorker";
import { createMemorySyncQueueStore, enqueueEnsureAppRooms, ensureAppRoomsQueueId } from "./syncQueue";
import { configureTestStorageProfile } from "./testStorageProfile";
import { createMemoryWorkspaceSyncStore, createWorkspaceSyncRegistry } from "./workspaceSync";

describe("room lifecycle worker", () => {
  it("creates remote rooms for queued owned apps and removes completed work", async () => {
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
    await core.saveAppData(app.appId, { count: 1 });
    const syncRecord = await syncRegistry.ensureOwnedAppRooms(app.appId);
    await enqueueEnsureAppRooms(queueStore, app.appId);

    await processRoomLifecycleQueue({
      core,
      createProviderFromStorageProfile: () => provider,
      queueStore,
      syncRegistry,
    });

    await expect(queueStore.listItems()).resolves.toEqual([]);
    const remembered = await syncRegistry.getAppSyncRecord(app.appId);
    expect(remembered?.dataRoom.lastSeenVersion).toBe(1);
    await expect(loadRemoteAppRooms({ provider, syncRecord })).resolves.toMatchObject({
      app: { appId: app.appId, name: "Example" },
      appData: { count: 1 },
    });
  });

  it("keeps failed room work pending for a future retry", async () => {
    const core = createMemoryCore();
    const queueStore = createMemorySyncQueueStore();
    const syncRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await configureTestStorageProfile(syncRegistry);

    const app = await core.createBlankApp();
    await syncRegistry.ensureOwnedAppRooms(app.appId);
    const queued = await enqueueEnsureAppRooms(queueStore, app.appId);

    await processRoomLifecycleQueue({
      core,
      createProviderFromStorageProfile: () => {
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

  it("retries stale syncing room work after an interrupted flush", async () => {
    const core = createMemoryCore();
    const provider = createMemorySyncProvider();
    const queueStore = createMemorySyncQueueStore();
    const syncRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await configureTestStorageProfile(syncRegistry);

    const app = await core.createBlankApp();
    await syncRegistry.ensureOwnedAppRooms(app.appId);
    await queueStore.putItem({
      appId: app.appId,
      attempts: 0,
      createdAt: "2026-01-01T00:00:00.000Z",
      id: ensureAppRoomsQueueId(app.appId),
      kind: "ensure-app-rooms",
      status: "syncing",
      updatedAt: "2026-01-01T00:00:00.000Z",
    });

    await processRoomLifecycleQueue({
      core,
      createProviderFromStorageProfile: () => provider,
      queueStore,
      syncRegistry,
    });

    await expect(queueStore.listItems()).resolves.toEqual([]);
  });
});
