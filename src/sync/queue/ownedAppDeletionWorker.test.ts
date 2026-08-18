import { describe, expect, it } from "vitest";
import { createMemoryCore } from "../../core/memoryCore";
import { isRemoteAppDeletedError, loadRemoteAppRooms } from "../rooms/appRooms";
import { createMemorySyncProvider } from "../testing/memorySyncProvider";
import { processRoomLifecycleQueue } from "./roomLifecycleWorker";
import { createMemorySyncQueueStore, enqueueDeleteOwnedApp, enqueueEnsureAppRooms } from "./syncQueue";
import { configureTestStorageProfile } from "../testing/testStorageProfile";
import { createMemoryWorkspaceSyncStore, createWorkspaceSyncRegistry } from "../workspace/workspaceSync";
import { processOwnedAppDeletionQueue } from "./ownedAppDeletionWorker";

describe("owned app deletion worker", () => {
  it("marks the source room deleted and removes the data room", async () => {
    const provider = createMemorySyncProvider();
    const core = createMemoryCore();
    const queueStore = createMemorySyncQueueStore();
    const syncRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await configureTestStorageProfile(syncRegistry);
    const app = await core.createApp({
      description: "Delete worker test",
      name: "Delete worker test",
      sourceCode: "<!doctype html><title>Delete worker test</title>",
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
    const rememberedRecord = await syncRegistry.getAppSyncRecord(app.appId);
    if (!rememberedRecord || rememberedRecord.kind === "joined") throw new Error("Expected owned sync record.");
    await enqueueDeleteOwnedApp({ app, store: queueStore, syncRecord: rememberedRecord });

    await processOwnedAppDeletionQueue({
      createProviderFromStorageProfile: () => provider,
      queueStore,
      syncRegistry,
    });

    await expect(queueStore.listItems()).resolves.toEqual([]);
    try {
      await loadRemoteAppRooms({ provider, syncRecord });
      throw new Error("Expected deleted app marker.");
    } catch (error) {
      expect(isRemoteAppDeletedError(error)).toBe(true);
    }
  });

  it("keeps deletion queued when the provider is unavailable", async () => {
    const core = createMemoryCore();
    const queueStore = createMemorySyncQueueStore();
    const syncRegistry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await configureTestStorageProfile(syncRegistry);
    const app = await core.createApp({
      description: "Offline delete",
      name: "Offline delete",
      sourceCode: "<!doctype html><title>Offline delete</title>",
    });
    const syncRecord = await syncRegistry.ensureOwnedAppRooms(app.appId);
    await enqueueDeleteOwnedApp({ app, store: queueStore, syncRecord });

    await processOwnedAppDeletionQueue({
      createProviderFromStorageProfile: () => {
        throw new Error("Offline");
      },
      queueStore,
      syncRegistry,
    });

    await expect(queueStore.listItems()).resolves.toMatchObject([{ attempts: 1, kind: "delete-owned-app", status: "pending" }]);
  });
});
