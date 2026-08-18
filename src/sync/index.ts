import type { AppLabCore } from "../core";
import { createAuthFirebaseRules, createFirebaseOwnerSetupSecret } from "./firebaseAccessRules";
import { encodeAppInvite, readInviteFromHash } from "./invites";
import { createIndexedDbSyncQueueStore } from "./syncQueue";
import { createLocalStorageWorkspaceSyncStore, createWorkspaceSyncRegistry } from "./workspaceSync";
import { createWorkspaceSyncActions } from "./workspaceSyncActions";

export { createAuthFirebaseRules, createFirebaseOwnerSetupSecret, encodeAppInvite, readInviteFromHash };
export type {
  AppInvitePayload,
  AppSyncBadge,
  ConfigureStorageProfileInput,
  StorageProfile,
} from "./workspaceSync";
export type {
  AppInvitePreview,
  PendingSyncOperation,
  PendingSyncOperationKind,
  WorkspaceSyncActions,
  WorkspaceSyncOverview,
} from "./workspaceSyncActions";

export function createBrowserWorkspaceSyncActions(core: AppLabCore) {
  return createWorkspaceSyncActions({
    core,
    queueStore: createIndexedDbSyncQueueStore(),
    syncRegistry: createWorkspaceSyncRegistry(createLocalStorageWorkspaceSyncStore()),
  });
}
