import { useMemo } from "react";
import { createIndexedDbCore } from "./core/indexedDbCore";
import { createIndexedDbSyncQueueStore } from "./sync/syncQueue";
import { createLocalStorageWorkspaceSyncStore, createWorkspaceSyncRegistry } from "./sync/workspaceSync";
import { WorkspaceShell } from "./ui/shell/WorkspaceShell";

export function App() {
  const core = useMemo(() => createIndexedDbCore(), []);
  const syncQueueStore = useMemo(() => createIndexedDbSyncQueueStore(), []);
  const syncRegistry = useMemo(() => createWorkspaceSyncRegistry(createLocalStorageWorkspaceSyncStore()), []);
  return <WorkspaceShell core={core} syncQueueStore={syncQueueStore} syncRegistry={syncRegistry} />;
}
