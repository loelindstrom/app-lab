import { type ReactNode } from "react";
import { X } from "lucide-react";
import { Drawer } from "vaul";
import { IconButton } from "./controls";

export function Sheet({ open, onOpenChange, title, children, onReturnFocus }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  onReturnFocus?: () => void;
}) {
  return <Drawer.Root open={open} onOpenChange={onOpenChange} handleOnly>
    <Drawer.Portal>
      <Drawer.Overlay className="sheet-backdrop" />
      <Drawer.Content className="simple-sheet" onCloseAutoFocus={(event) => {
        if (onReturnFocus) { event.preventDefault(); onReturnFocus(); }
      }}>
        <div className="sheet-grip-area"><Drawer.Handle aria-label="Close panel" /></div>
        <header className="simple-sheet-header"><Drawer.Title>{title}</Drawer.Title><Drawer.Close asChild><IconButton label="Close panel"><X size={20} /></IconButton></Drawer.Close></header>
        <Drawer.Description className="sr-only">{title}</Drawer.Description>
        <div className="simple-sheet-body" data-vaul-no-drag>{children}</div>
      </Drawer.Content>
    </Drawer.Portal>
  </Drawer.Root>;
}
