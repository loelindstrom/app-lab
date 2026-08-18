import type { AppLabCore } from "../../core";
import { ensureRemoteAppRooms, loadRemoteAppRooms } from "../rooms/appRooms";
import type { RealtimeSyncProvider } from "../rooms/types";
import type { StorageProfile, WorkspaceSyncRegistry } from "../workspace/workspaceSync";
import { isQueueItemStaleSyncing, markQueueItemFailed, markQueueItemSyncing, type EnsureAppRoomsQueueItem, type SyncQueueStore } from "./syncQueue";

export interface RoomLifecycleWorkerInput {
  core: AppLabCore;
  createProviderFromStorageProfile: (profile: StorageProfile) => RealtimeSyncProvider;
  queueStore: SyncQueueStore;
  syncRegistry: WorkspaceSyncRegistry;
}

export async function processRoomLifecycleQueue(input: RoomLifecycleWorkerInput): Promise<void> {
  const items = await input.queueStore.listItems();
  for (const item of items) {
    if (item.kind !== "ensure-app-rooms") continue;
    if (item.status === "syncing" && !isQueueItemStaleSyncing(item)) continue;
    await processEnsureAppRoomsItem(input, item);
  }
}

async function processEnsureAppRoomsItem(input: RoomLifecycleWorkerInput, item: EnsureAppRoomsQueueItem): Promise<void> {
  const syncingItem = await markQueueItemSyncing(input.queueStore, item);

  try {
    const profile = await input.syncRegistry.getStorageProfile();
    if (!profile) {
      await input.queueStore.removeItem(item.id);
      return;
    }

    const app = await input.core.getApp(item.appId);
    if (!app) {
      await input.queueStore.removeItem(item.id);
      return;
    }

    const syncRecord = await input.syncRegistry.getAppSyncRecord(item.appId);
    if (!syncRecord || syncRecord.kind === "joined") {
      await input.queueStore.removeItem(item.id);
      return;
    }

    const provider = input.createProviderFromStorageProfile(profile);
    await ensureRemoteAppRooms({
      app,
      appData: await input.core.getAppData(app.appId),
      provider,
      syncRecord,
    });

    const loaded = await loadRemoteAppRooms({ provider, syncRecord });
    await input.syncRegistry.rememberAppRoomVersions({
      appId: app.appId,
      dataRoom: loaded.dataRoom,
      sourceRoom: loaded.sourceRoom,
    });
    await input.queueStore.removeItem(item.id);
  } catch (error) {
    await markQueueItemFailed(input.queueStore, syncingItem, error);
  }
}
