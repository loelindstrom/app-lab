import { saveRemoteAppData } from "../rooms/appRooms";
import { roomReadToken } from "../rooms/crypto";
import {
  isQueueItemStaleSyncing,
  markQueueItemFailed,
  markQueueItemSyncing,
  removeQueueItemIfCurrent,
  type SaveAppDataQueueItem,
  type SyncQueueStore,
} from "./syncQueue";
import type { RealtimeSyncProvider, RoomCapability } from "../rooms/types";
import type { AppSyncRecord, WorkspaceSyncRegistry } from "../workspace/workspaceSync";

export interface AppDataSyncWorkerInput {
  createProviderForSyncRecord: (record: AppSyncRecord | null) => Promise<RealtimeSyncProvider | null>;
  queueStore: SyncQueueStore;
  syncRegistry: WorkspaceSyncRegistry;
}

export async function processAppDataSyncQueue(input: AppDataSyncWorkerInput): Promise<void> {
  const items = await input.queueStore.listItems();
  for (const item of items) {
    if (item.kind !== "save-app-data") continue;
    if (item.status === "syncing" && !isQueueItemStaleSyncing(item)) continue;
    await processSaveAppDataItem(input, item);
  }
}

async function processSaveAppDataItem(input: AppDataSyncWorkerInput, item: SaveAppDataQueueItem): Promise<void> {
  const syncingItem = await markQueueItemSyncing(input.queueStore, item);

  try {
    const syncRecord = await input.syncRegistry.getAppSyncRecord(item.appId);
    if (!syncRecord) {
      await input.queueStore.removeItem(item.id);
      return;
    }

    const provider = await input.createProviderForSyncRecord(syncRecord);
    if (!provider) throw new Error("Storage profile is required before app data can sync.");

    const dataRoom = await saveLatestLocalAppData({
      item,
      provider,
      syncRecord,
    });
    await input.syncRegistry.rememberAppRoomVersions({ appId: item.appId, dataRoom });
    await removeQueueItemIfCurrent(input.queueStore, syncingItem);
  } catch (error) {
    await markQueueItemFailed(input.queueStore, syncingItem, error);
  }
}

async function saveLatestLocalAppData(input: {
  item: SaveAppDataQueueItem;
  provider: RealtimeSyncProvider;
  syncRecord: AppSyncRecord;
}): Promise<RoomCapability> {
  try {
    return await saveRemoteAppData({
      appData: input.item.localData,
      provider: input.provider,
      syncRecord: input.syncRecord,
    });
  } catch (error) {
    if (!isRoomVersionConflictError(error)) throw error;
    const latestDataRoom = await loadCurrentRemoteRoomCapability(input.provider, input.syncRecord.dataRoom);
    return saveRemoteAppData({
      appData: input.item.localData,
      provider: input.provider,
      syncRecord: {
        ...input.syncRecord,
        dataRoom: latestDataRoom,
      },
    });
  }
}

async function loadCurrentRemoteRoomCapability(provider: RealtimeSyncProvider, capability: RoomCapability): Promise<RoomCapability> {
  const snapshot = await provider.loadRoom({
    readToken: roomReadToken(capability),
    roomId: capability.roomId,
  });
  return {
    ...capability,
    lastSeenVersion: snapshot.version,
  };
}

function isRoomVersionConflictError(error: unknown): boolean {
  return error instanceof Error && /version conflict/i.test(error.message);
}
