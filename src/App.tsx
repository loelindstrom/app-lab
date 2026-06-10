import { useMemo } from "react";
import { createIndexedDbCore } from "./core/indexedDbCore";
import { createLocalStorageWorkspaceSyncStore, createWorkspaceSyncRegistry } from "./sync/workspaceSync";
import { WorkspaceShell } from "./ui/shell/WorkspaceShell";

export function App() {
  const core = useMemo(() => createIndexedDbCore(), []);
  const syncRegistry = useMemo(() => createWorkspaceSyncRegistry(createLocalStorageWorkspaceSyncStore()), []);
  return <WorkspaceShell core={core} syncRegistry={syncRegistry} />;
}
