import { useMemo, type ComponentType } from "react";
import { createBrowserAiActions } from "./ai";
import { createIndexedDbCore } from "./core";
import { createBrowserWorkspaceSyncActions } from "./sync";
import { WorkspaceShell, type WorkspaceServices } from "./ui";

export function App({ shell: Shell = WorkspaceShell }: { shell?: ComponentType<WorkspaceServices> }) {
  const aiActions = useMemo(() => createBrowserAiActions(), []);
  const core = useMemo(() => createIndexedDbCore(), []);
  const syncActions = useMemo(() => createBrowserWorkspaceSyncActions(core), [core]);
  return <Shell aiActions={aiActions} core={core} syncActions={syncActions} />;
}
