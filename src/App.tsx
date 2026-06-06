import { useMemo } from "react";
import { createIndexedDbCore } from "./core/indexedDbCore";
import { WorkspaceShell } from "./ui/shell/WorkspaceShell";

export function App() {
  const core = useMemo(() => createIndexedDbCore(), []);
  return <WorkspaceShell core={core} />;
}
