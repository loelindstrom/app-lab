import { Check, CircleAlert, Clock3, Cloud, RefreshCw, WifiOff } from "lucide-react";
import type { AppSyncHealthKind } from "../../shell/useWorkspace";

const MARKS = { synced: Check, syncing: RefreshCw, pending: Clock3, offline: WifiOff, problem: CircleAlert };

export function SyncStatusIcon({ kind }: { kind: Exclude<AppSyncHealthKind, "none"> }) {
  const Mark = MARKS[kind];
  return <span className="sync-status-icon" data-kind={kind} aria-hidden="true">
    <Cloud size={28} strokeWidth={1.8} />
    <span className="sync-status-mark"><Mark size={14} strokeWidth={2.25} /></span>
  </span>;
}
