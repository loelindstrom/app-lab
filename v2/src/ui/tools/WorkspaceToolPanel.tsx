import type { AppRecord } from "../../core/types";

export type ToolPanelMode = "builder" | "source";

interface WorkspaceToolPanelProps {
  activeApp: AppRecord;
  mode: ToolPanelMode | null;
  onClose: () => void;
}

export function WorkspaceToolPanel({ activeApp, mode, onClose }: WorkspaceToolPanelProps) {
  const isOpen = mode !== null;
  const title = mode === "source" ? "Source" : mode === "builder" ? "BuilderAI" : "App tools";

  return (
    <aside
      className={`fixed bottom-11 right-0 z-20 grid h-[min(74svh,620px)] w-full grid-rows-[44px_minmax(0,1fr)] overflow-hidden border-t border-app-line bg-app-panel shadow-panel transition-transform duration-200 lg:bottom-0 lg:top-11 lg:h-auto lg:w-[min(420px,36vw)] lg:border-l lg:border-t-0 ${
        isOpen ? "translate-y-0 lg:translate-x-0" : "translate-y-[calc(100%+44px)] lg:translate-x-full lg:translate-y-0"
      }`}
      aria-label={title}
      aria-hidden={!isOpen}
    >
      <header className="flex min-h-0 items-center justify-between gap-3 border-b border-app-line px-3">
        <div className="min-w-0">
          <p className="m-0 truncate text-[11px] font-extrabold uppercase text-app-muted">{activeApp.name}</p>
          <h2 className="truncate text-base font-extrabold leading-tight">{title}</h2>
        </div>
        <button
          className="min-h-8 w-8 rounded-full border border-transparent bg-transparent p-0 text-xl text-app-muted hover:bg-app-accent/10 hover:text-app-accent"
          type="button"
          aria-label={`Close ${title}`}
          onClick={onClose}
        >
          ×
        </button>
      </header>

      {mode === "source" ? <SourceView app={activeApp} /> : <BuilderView />}
    </aside>
  );
}

function SourceView({ app }: { app: AppRecord }) {
  return (
    <pre className="m-0 overflow-auto bg-[#111827] p-4 font-mono text-[13px] leading-normal text-slate-100 [tab-size:2]">
      <code>{app.sourceCode}</code>
    </pre>
  );
}

function BuilderView() {
  return (
    <div className="grid min-h-0 grid-rows-[minmax(0,1fr)_auto]">
      <ol className="flex flex-col gap-3 overflow-auto p-3" aria-live="polite">
        <li className="rounded-lg border border-app-line bg-app-accent/10 px-3 py-2 text-sm leading-relaxed text-app-muted">
          BuilderAI is a placeholder in this first v2 slice. The next step is moving the PoC agent loop into core.
        </li>
      </ol>

      <form className="grid grid-cols-[minmax(0,1fr)_40px] items-end gap-2 border-t border-app-line p-3">
        <label className="sr-only" htmlFor="builder-message">
          Message
        </label>
        <textarea
          className="max-h-36 min-h-11 resize-y rounded-md border border-app-line px-3 py-2 text-app-ink"
          id="builder-message"
          rows={2}
          placeholder="Ask BuilderAI to change this app"
        />
        <button
          className="grid h-10 min-h-10 w-10 place-items-center rounded-full border border-app-accent bg-app-accent p-0 text-xl font-bold text-white hover:bg-app-strong"
          type="button"
          aria-label="Send message"
        >
          ↑
        </button>
      </form>
    </div>
  );
}
