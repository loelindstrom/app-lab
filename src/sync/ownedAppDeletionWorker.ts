import { deleteRemoteAppRooms } from "./appRooms";
import { roomReadToken } from "./crypto";
import {
  isQueueItemStaleSyncing,
  markQueueItemFailed,
  markQueueItemSyncing,
  type DeleteOwnedAppQueueItem,
  type SyncQueueStore,
} from "./syncQueue";
import type { RealtimeSyncProvider, RoomCapability } from "./types";
import type { StorageProfile, WorkspaceSyncRegistry } from "./workspaceSync";

export interface OwnedAppDeletionWorkerInput {
  createProviderFromStorageProfile: (profile: StorageProfile) => RealtimeSyncProvider;
  queueStore: SyncQueueStore;
  syncRegistry: WorkspaceSyncRegistry;
}

export async function processOwnedAppDeletionQueue(input: OwnedAppDeletionWorkerInput): Promise<void> {
  const items = await input.queueStore.listItems();
  for (const item of items) {
    if (item.kind !== "delete-owned-app") continue;
    if (item.status === "syncing" && !isQueueItemStaleSyncing(item)) continue;
    await processDeleteOwnedAppItem(input, item);
  }
}

async function processDeleteOwnedAppItem(input: OwnedAppDeletionWorkerInput, item: DeleteOwnedAppQueueItem): Promise<void> {
  const syncingItem = await markQueueItemSyncing(input.queueStore, item);

  try {
    const profile = await input.syncRegistry.getStorageProfile();
    if (!profile) throw new Error("Storage profile is required before remote app rooms can be deleted.");

    const provider = input.createProviderFromStorageProfile(profile);
    const sourceRoom = await loadCurrentRemoteRoomCapability(provider, item.syncRecord.sourceRoom);
    const dataRoom = await loadCurrentRemoteRoomCapability(provider, item.syncRecord.dataRoom);
    await deleteRemoteAppRooms({
      app: item.app,
      dataProvider: provider,
      sourceProvider: provider,
      syncRecord: {
        ...item.syncRecord,
        dataRoom,
        sourceRoom,
      },
    });
    await input.queueStore.removeItem(item.id);
  } catch (error) {
    await markQueueItemFailed(input.queueStore, syncingItem, error);
  }
}

async function loadCurrentRemoteRoomCapability(provider: RealtimeSyncProvider, capability: RoomCapability): Promise<RoomCapability> {
  try {
    const snapshot = await provider.loadRoom({
      readToken: roomReadToken(capability),
      roomId: capability.roomId,
    });
    return {
      ...capability,
      lastSeenVersion: snapshot.version,
    };
  } catch (error) {
    if (!isRoomNotFoundError(error)) throw error;
    return {
      ...capability,
      lastSeenVersion: 0,
    };
  }
}

function isRoomNotFoundError(error: unknown): boolean {
  return error instanceof Error && /(not found|found missing)/i.test(error.message);
}
