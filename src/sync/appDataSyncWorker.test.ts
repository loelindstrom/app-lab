import { describe, expect, it } from "vitest";
import { createMemoryCore } from "../core/memoryCore";
import { ensureRemoteAppRooms, loadRemoteAppRooms, saveRemoteAppData } from "./appRooms";
import { createMemorySyncProvider } from "./memorySyncProvider";
import { processAppDataSyncQueue } from "./appDataSyncWorker";
import { createMemorySyncQueueStore, enqueueSaveAppData } from "./syncQueue";
import { configureTestStorageProfile } from "./testStorageProfile";
import { createMemoryWorkspaceSyncStore, createWorkspaceSyncRegistry } from "./workspaceSync";

describe("app data sync worker", () => {
  it("saves queued app data remotely, remembers the data room version, and removes completed work", async () => {
    const core = createMemoryCore();
    const provider = createMemorySyncProvider();
    const queueStore = createMemorySyncQueueStore();
    const syncRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await configureTestStorageProfile(syncRegistry);

    const app = await core.createBlankApp();
    const syncRecord = await syncRegistry.ensureOwnedAppRooms(app.appId);
    await ensureRemoteAppRooms({ app, appData: { count: 0 }, provider, syncRecord });
    await enqueueSaveAppData({
      appId: app.appId,
      baseData: { count: 0 },
      baseRemoteVersion: 1,
      data: { count: 1 },
      roomId: syncRecord.dataRoom.roomId,
      store: queueStore,
    });

    await processAppDataSyncQueue({
      createProviderForSyncRecord: async () => provider,
      queueStore,
      syncRegistry,
    });

    await expect(queueStore.listItems()).resolves.toEqual([]);
    const remembered = await syncRegistry.getAppSyncRecord(app.appId);
    expect(remembered?.dataRoom.lastSeenVersion).toBe(2);
    await expect(loadRemoteAppRooms({ provider, syncRecord: remembered ?? syncRecord })).resolves.toMatchObject({
      appData: { count: 1 },
    });
  });

  it("keeps failed app data work pending for a future retry", async () => {
    const core = createMemoryCore();
    const queueStore = createMemorySyncQueueStore();
    const syncRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await configureTestStorageProfile(syncRegistry);

    const app = await core.createBlankApp();
    const syncRecord = await syncRegistry.ensureOwnedAppRooms(app.appId);
    const queued = await enqueueSaveAppData({
      appId: app.appId,
      baseData: { count: 0 },
      baseRemoteVersion: 0,
      data: { count: 1 },
      roomId: syncRecord.dataRoom.roomId,
      store: queueStore,
    });

    await processAppDataSyncQueue({
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

  it("uses latest-local-wins when the remote data room changed before a queued save flushes", async () => {
    const core = createMemoryCore();
    const provider = createMemorySyncProvider();
    const queueStore = createMemorySyncQueueStore();
    const syncRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await configureTestStorageProfile(syncRegistry);

    const app = await core.createBlankApp();
    const syncRecord = await syncRegistry.ensureOwnedAppRooms(app.appId);
    await ensureRemoteAppRooms({ app, appData: { count: 0 }, provider, syncRecord });
    const remoteDataRoom = await saveRemoteAppData({
      appData: { count: 99 },
      provider,
      syncRecord,
    });
    await enqueueSaveAppData({
      appId: app.appId,
      baseData: { count: 0 },
      baseRemoteVersion: 1,
      data: { count: 2 },
      roomId: syncRecord.dataRoom.roomId,
      store: queueStore,
    });

    await processAppDataSyncQueue({
      createProviderForSyncRecord: async () => provider,
      queueStore,
      syncRegistry,
    });

    const remembered = await syncRegistry.getAppSyncRecord(app.appId);
    expect(remembered?.dataRoom.lastSeenVersion).toBe(remoteDataRoom.lastSeenVersion + 1);
    await expect(loadRemoteAppRooms({ provider, syncRecord: remembered ?? syncRecord })).resolves.toMatchObject({
      appData: { count: 2 },
    });
  });
});
