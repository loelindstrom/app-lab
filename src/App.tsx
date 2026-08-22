import { useMemo } from "react";
import { createBrowserAiActions } from "./ai";
import { createAlpineExampleAppInput, createIndexedDbCore } from "./core";
import { createBrowserWorkspaceSyncActions } from "./sync";
import { WorkspaceShell } from "./ui";

export function App() {
  const aiActions = useMemo(
    () => createBrowserAiActions({ opinionatedStarterSource: createAlpineExampleAppInput().sourceCode }),
    [],
  );
  const core = useMemo(() => createIndexedDbCore(), []);
  const syncActions = useMemo(() => createBrowserWorkspaceSyncActions(core), [core]);
  return <WorkspaceShell aiActions={aiActions} core={core} syncActions={syncActions} />;
}
