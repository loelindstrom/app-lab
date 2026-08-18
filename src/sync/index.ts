import type { AppLabCore } from "../core";
import { createAuthFirebaseRules, createFirebaseOwnerSetupSecret } from "./providers/firebase/firebaseAccessRules";
import { createIndexedDbSyncQueueStore } from "./queue/syncQueue";
import { encodeAppInvite, readInviteFromHash } from "./sharing/invites";
import { createLocalStorageWorkspaceSyncStore, createWorkspaceSyncRegistry } from "./workspace/workspaceSync";
import { createWorkspaceSyncActions } from "./workspaceSyncActions";

export { createAuthFirebaseRules, createFirebaseOwnerSetupSecret, encodeAppInvite, readInviteFromHash };
export type {
  AppInvitePayload,
  AppSyncBadge,
  ConfigureStorageProfileInput,
  StorageProfile,
} from "./workspace/workspaceSync";
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
