import type { AppRecord } from "../../core/types";

interface SourceDialogProps {
  app: AppRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SourceDialog({ app, isOpen, onClose }: SourceDialogProps) {
  if (!isOpen || !app) return null;

  return (
    <div className="fixed inset-0 z-30 grid items-center bg-app-ink/40 p-4" role="presentation">
      <section
        className="max-h-[calc(100svh-28px)] w-full max-w-5xl justify-self-center overflow-hidden rounded-lg border border-app-line bg-app-surface/95 shadow-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="source-title"
      >
        <header className="flex items-center justify-between gap-4 border-b border-app-line p-4">
          <div>
            <p className="mb-1 text-xs font-extrabold uppercase text-app-muted">Source</p>
            <h2 className="text-xl font-extrabold leading-tight" id="source-title">
              {app.name}
            </h2>
          </div>
          <button className="min-h-9 rounded-md border border-app-accent bg-app-accent px-4 font-bold text-white hover:bg-app-strong" type="button" onClick={onClose}>
            Close
          </button>
        </header>
        <pre className="m-0 max-h-[min(680px,calc(100svh-120px))] overflow-auto bg-app-ink p-4 font-mono text-[13px] leading-normal text-[#f7f2e8] [tab-size:2]">
          <code>{app.sourceCode}</code>
        </pre>
      </section>
    </div>
  );
}
