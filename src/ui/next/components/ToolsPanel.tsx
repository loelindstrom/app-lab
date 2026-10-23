import { useEffect, useRef, useState, type ReactNode } from "react";
import { Maximize2, Minimize2, X } from "lucide-react";
import { Drawer } from "vaul";
import * as Dialog from "@radix-ui/react-dialog";
import { IconButton } from "./controls";

export function ToolsPanel({ open, onOpenChange, appName, children }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appName: string;
  children: ReactNode;
}) {
  const [desktop, setDesktop] = useState(() => window.matchMedia("(min-width: 1024px)").matches);
  const [snap, setSnap] = useState<number | string | null>(0.94);
  const [wide, setWide] = useState(false);
  const content = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const changed = () => setDesktop(media.matches);
    media.addEventListener("change", changed);
    return () => media.removeEventListener("change", changed);
  }, []);
  useEffect(() => { if (!open) { setSnap(0.94); setWide(false); } }, [open]);
  const expanded = desktop ? wide : snap === 0.94;
  // Vaul 1.1 does not forward modal=false; use Radix directly on desktop.
  const Panel = desktop ? Dialog : Drawer;
  const layout = desktop ? { modal: false } : {
    snapPoints: [0, 0.68, 0.94], activeSnapPoint: snap,
    setActiveSnapPoint: (next: number | string | null) => { if (next === 0) onOpenChange(false); else setSnap(next); },
    fadeFromIndex: 1, handleOnly: true, autoFocus: true, shouldScaleBackground: false,
  };
  return <Panel.Root key={desktop ? "right" : "bottom"} open={open} onOpenChange={onOpenChange} {...layout}>
    <Panel.Portal>
      {!desktop && <Drawer.Overlay className="sheet-backdrop" style={{ opacity: 1 }} />}
      <Panel.Content ref={content} className="tools-sheet" data-placement={desktop ? "right" : "bottom"} data-expanded={expanded}
        onInteractOutside={(event) => { if (desktop) event.preventDefault(); }}
        onEscapeKeyDown={(event) => { if (content.current?.querySelector("[role=tooltip]")) event.preventDefault(); }}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          document.querySelector<HTMLButtonElement>('[aria-label="Open app tools"]')?.focus();
        }}>
        <div className="sheet-visible" style={{ height: desktop ? "100dvh" : `${Number(snap ?? 0.94) * 100}dvh` }}>
          {!desktop && <div className="sheet-grip-area"><Drawer.Handle className="sheet-grip" aria-label="Resize tools" /></div>}
          <header className="sheet-header">
            <div className="sheet-identity"><Panel.Title>App tools</Panel.Title><span title={appName}>{appName}</span></div>
            <div className="button-group">
              <IconButton label={expanded ? "Reduce tools" : "Expand tools"} onClick={() => desktop ? setWide(!wide) : setSnap(snap === 0.94 ? 0.68 : 0.94)}>
                {expanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </IconButton>
              <Panel.Close asChild><IconButton label="Close tools"><X size={21} /></IconButton></Panel.Close>
            </div>
          </header>
          <Panel.Description className="sr-only">Edit, inspect, and share this app.</Panel.Description>
          {children}
        </div>
      </Panel.Content>
    </Panel.Portal>
  </Panel.Root>;
}
