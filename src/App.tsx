import { useMemo } from "react";
import { createBrowserAiActions } from "./ai";
import { createIndexedDbCore } from "./core";
import { createBrowserWorkspaceSyncActions } from "./sync";
import { WorkspaceShell } from "./ui";

export function App() {
  const aiActions = useMemo(() => createBrowserAiActions(), []);
  const core = useMemo(() => createIndexedDbCore(), []);
  const syncActions = useMemo(() => createBrowserWorkspaceSyncActions(core), [core]);
  return <WorkspaceShell aiActions={aiActions} core={core} syncActions={syncActions} />;
}
