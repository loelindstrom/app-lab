import type { AppLabCore, AppRecord } from "../../core";
import { isRemoteAppDeletedError, loadRemoteAppSource, saveRemoteAppSource } from "../rooms/appRooms";
import {
  isQueueItemStaleSyncing,
  markQueueItemFailed,
  markQueueItemSyncing,
  removeQueueItemIfCurrent,
  saveAppDataQueueId,
  type SaveSourceQueueItem,
  type SyncQueueStore,
} from "./syncQueue";
import type { RealtimeSyncProvider, RoomCapability } from "../rooms/types";
import type { AppSyncRecord, WorkspaceSyncRegistry } from "../workspace/workspaceSync";

export interface SourceSyncWorkerInput {
  core: AppLabCore;
  createProviderForSyncRecord: (record: AppSyncRecord | null) => Promise<RealtimeSyncProvider | null>;
  queueStore: SyncQueueStore;
  syncRegistry: WorkspaceSyncRegistry;
}

export async function processSourceSyncQueue(input: SourceSyncWorkerInput): Promise<void> {
  const items = await input.queueStore.listItems();
  for (const item of items) {
    if (item.kind !== "save-source") continue;
    if (item.status === "syncing" && !isQueueItemStaleSyncing(item)) continue;
    await processSaveSourceItem(input, item);
  }
}

async function processSaveSourceItem(input: SourceSyncWorkerInput, item: SaveSourceQueueItem): Promise<void> {
  const syncingItem = await markQueueItemSyncing(input.queueStore, item);

  try {
    const app = await input.core.getApp(item.appId);
    if (!app) {
      await input.queueStore.removeItem(item.id);
      return;
    }

    const syncRecord = await input.syncRegistry.getAppSyncRecord(item.appId);
    if (!syncRecord) {
      await input.queueStore.removeItem(item.id);
      return;
    }

    const provider = await input.createProviderForSyncRecord(syncRecord);
    if (!provider) throw new Error("Storage profile is required before source can sync.");

    const result = await saveLatestLocalSource({ app, provider, syncRecord });
    if (result.kind === "deleted") {
      await discardWritesForRemotelyDeletedApp(input, item, syncRecord, result.deletedAt);
      return;
    }
    await input.syncRegistry.rememberAppRoomVersions({ appId: app.appId, sourceRoom: result.sourceRoom });
    await removeQueueItemIfCurrent(input.queueStore, syncingItem);
  } catch (error) {
    await markQueueItemFailed(input.queueStore, syncingItem, error);
  }
}

async function saveLatestLocalSource(input: {
  app: AppRecord;
  provider: RealtimeSyncProvider;
  syncRecord: AppSyncRecord;
}): Promise<{ kind: "deleted"; deletedAt: string } | { kind: "saved"; sourceRoom: RoomCapability }> {
  try {
    return { kind: "saved", sourceRoom: await saveRemoteAppSource(input) };
  } catch (error) {
    if (!isRoomVersionConflictError(error)) throw error;
    try {
      const latest = await loadRemoteAppSource({ provider: input.provider, syncRecord: input.syncRecord });
      return {
        kind: "saved",
        sourceRoom: await saveRemoteAppSource({
          ...input,
          syncRecord: {
            ...input.syncRecord,
            sourceRoom: latest.sourceRoom,
          },
        }),
      };
    } catch (loadError) {
      if (isRemoteAppDeletedError(loadError)) return { kind: "deleted", deletedAt: loadError.deletedAt };
      throw loadError;
    }
  }
}

async function discardWritesForRemotelyDeletedApp(
  input: SourceSyncWorkerInput,
  item: SaveSourceQueueItem,
  syncRecord: AppSyncRecord,
  deletedAt: string,
): Promise<void> {
  if (syncRecord.kind !== "joined") await input.core.deleteApp(item.appId);
  await input.syncRegistry.markRemoteAppDeleted(item.appId, deletedAt);
  await input.queueStore.removeItem(item.id);
  await input.queueStore.removeItem(saveAppDataQueueId(item.appId));
}

function isRoomVersionConflictError(error: unknown): boolean {
  return error instanceof Error && /room version conflict/i.test(error.message);
}
