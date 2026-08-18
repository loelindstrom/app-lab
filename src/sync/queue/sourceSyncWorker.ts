import type { AppLabCore } from "../../core";
import { saveRemoteAppSource } from "../rooms/appRooms";
import {
  isQueueItemStaleSyncing,
  markQueueItemFailed,
  markQueueItemSyncing,
  removeQueueItemIfCurrent,
  type SaveSourceQueueItem,
  type SyncQueueStore,
} from "./syncQueue";
import type { RealtimeSyncProvider } from "../rooms/types";
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

    const sourceRoom = await saveRemoteAppSource({ app, provider, syncRecord });
    await input.syncRegistry.rememberAppRoomVersions({ appId: app.appId, sourceRoom });
    await removeQueueItemIfCurrent(input.queueStore, syncingItem);
  } catch (error) {
    await markQueueItemFailed(input.queueStore, syncingItem, error);
  }
}
