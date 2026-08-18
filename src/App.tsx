import { useMemo } from "react";
import { createIndexedDbCore } from "./core";
import { createBrowserWorkspaceSyncActions } from "./sync";
import { WorkspaceShell } from "./ui";

export function App() {
  const core = useMemo(() => createIndexedDbCore(), []);
  const syncActions = useMemo(() => createBrowserWorkspaceSyncActions(core), [core]);
  return <WorkspaceShell core={core} syncActions={syncActions} />;
}
