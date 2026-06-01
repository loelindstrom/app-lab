import { useMemo } from "react";
import { createMemoryCore } from "./core/memoryCore";
import { WorkspaceShell } from "./ui/shell/WorkspaceShell";

export function App() {
  const core = useMemo(() => createMemoryCore(), []);
  return <WorkspaceShell core={core} />;
}
