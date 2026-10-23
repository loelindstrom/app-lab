import { useEffect, useId, useRef, useState } from "react";
import { X } from "lucide-react";
import type { AppSyncHealth } from "../shell/useWorkspace";
import { IconButton } from "./controls";
import { SyncStatusIcon } from "./SyncStatusIcon";
import "./syncStatus.css";

export function SyncStatusIndicator({ health }: { health: AppSyncHealth }) {
  const [open, setOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();
  useEffect(() => {
    if (!open) return;
    function dismiss(event: PointerEvent) {
      if (event.target instanceof Node && !container.current?.contains(event.target)) setOpen(false);
    }
    function escape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false); trigger.current?.focus();
    }
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", dismiss); document.removeEventListener("keydown", escape); };
  }, [open]);
  if (health.kind === "none") return null;
  return <div className="workspace-sync" ref={container}>
    <IconButton ref={trigger} className="workspace-sync-button" data-kind={health.kind} label={`Sync status: ${health.label}`} title={health.title}
      aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
      <SyncStatusIcon kind={health.kind} />
    </IconButton>
    {open && <div id={id} className="workspace-sync-popover" role="region" aria-label="Sync status">
      <header><strong>{health.label}</strong><IconButton label="Close sync status" onClick={() => { setOpen(false); trigger.current?.focus(); }}><X size={17} /></IconButton></header>
      <p>{health.title}</p>
    </div>}
  </div>;
}
