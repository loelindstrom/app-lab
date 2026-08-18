import type { RealtimeSyncProvider } from "../rooms/types";
import { saveWorkspaceManifest } from "../workspace/workspaceManifest";
import type { StorageProfile, WorkspaceSyncRegistry, WorkspaceSyncState } from "../workspace/workspaceSync";
import {
  isQueueItemStaleSyncing,
  markQueueItemFailed,
  markQueueItemSyncing,
  type SaveWorkspaceManifestQueueItem,
  type SyncQueueStore,
} from "./syncQueue";

export interface WorkspaceManifestWorkerInput {
  createProviderFromStorageProfile: (profile: StorageProfile) => RealtimeSyncProvider;
  onSavedState?: (state: WorkspaceSyncState) => Promise<void>;
  queueStore: SyncQueueStore;
  syncRegistry: WorkspaceSyncRegistry;
  throwOnError?: boolean;
}

export async function processWorkspaceManifestQueue(input: WorkspaceManifestWorkerInput): Promise<void> {
  const items = await input.queueStore.listItems();
  for (const item of items) {
    if (item.kind !== "save-workspace-manifest") continue;
    if (item.status === "syncing" && !isQueueItemStaleSyncing(item)) continue;
    await processSaveWorkspaceManifestItem(input, item);
  }
}

async function processSaveWorkspaceManifestItem(input: WorkspaceManifestWorkerInput, item: SaveWorkspaceManifestQueueItem): Promise<void> {
  const syncingItem = await markQueueItemSyncing(input.queueStore, item);

  try {
    const profile = await input.syncRegistry.getStorageProfile();
    if (!profile) {
      await input.queueStore.removeItem(item.id);
      return;
    }

    await input.syncRegistry.ensureWorkspaceManifestRoom();
    const state = await input.syncRegistry.getState();
    if (state.workspaceId !== item.workspaceId) {
      await input.queueStore.removeItem(item.id);
      return;
    }

    const savedState = await saveWorkspaceManifest({
      provider: input.createProviderFromStorageProfile(profile),
      state,
    });
    if (input.onSavedState) await input.onSavedState(savedState);
    else await input.syncRegistry.replaceState(savedState);
    await input.queueStore.removeItem(item.id);
  } catch (error) {
    await markQueueItemFailed(input.queueStore, syncingItem, error);
    if (input.throwOnError) throw error;
  }
}
