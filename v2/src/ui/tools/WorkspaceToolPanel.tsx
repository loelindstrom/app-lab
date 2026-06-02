import { useEffect, useMemo, useState } from "react";
import type { AppRecord } from "../../core/types";

export type ToolPanelMode = "builder" | "source";

interface WorkspaceToolPanelProps {
  activeApp: AppRecord;
  mode: ToolPanelMode | null;
  onClose: () => void;
  onSaveSource: (sourceCode: string) => Promise<void>;
}

export function WorkspaceToolPanel({ activeApp, mode, onClose, onSaveSource }: WorkspaceToolPanelProps) {
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

      {mode === "source" ? <SourceView app={activeApp} onSaveSource={onSaveSource} /> : <BuilderView />}
    </aside>
  );
}

function SourceView({ app, onSaveSource }: { app: AppRecord; onSaveSource: (sourceCode: string) => Promise<void> }) {
  const [sourceCode, setSourceCode] = useState(app.sourceCode);
  const [exportOpen, setExportOpen] = useState(false);
  const [status, setStatus] = useState("Ready");
  const promptText = useMemo(() => createPromptWithCode(app.name, sourceCode), [app.name, sourceCode]);

  useEffect(() => {
    setSourceCode(app.sourceCode);
    setStatus("Ready");
  }, [app.appId, app.sourceCode]);

  async function saveSource() {
    setStatus("Saving...");
    try {
      await onSaveSource(sourceCode);
      setStatus("Saved.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not save.");
    }
  }

  return (
    <div className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-app-line bg-slate-50 px-3 py-2">
        <div className="text-xs font-bold text-app-muted">{status}</div>
        <div className="flex gap-2">
          <button
            className="min-h-8 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent"
            type="button"
            onClick={() => setExportOpen((isOpen) => !isOpen)}
          >
            Copy prompt+code
          </button>
          <button
            className="min-h-8 rounded-md border border-app-accent bg-app-accent px-3 text-sm font-bold text-white hover:bg-app-strong"
            type="button"
            onClick={saveSource}
          >
            Save ↥
          </button>
        </div>
      </div>

      <div className="grid min-h-0 grid-rows-[minmax(0,1fr)_auto] bg-[#111827]">
        <textarea
          className="h-full min-h-0 resize-none border-0 bg-[#111827] p-4 font-mono text-[13px] leading-normal text-slate-100 outline-none [tab-size:2]"
          spellCheck={false}
          value={sourceCode}
          onChange={(event) => {
            setSourceCode(event.target.value);
            setStatus("Unsaved changes");
          }}
        />
        {exportOpen ? (
          <div className="border-t border-slate-700 bg-slate-950 p-3">
            <textarea
              className="h-44 w-full resize-y rounded-md border border-slate-700 bg-slate-900 p-3 font-mono text-xs leading-relaxed text-slate-100"
              readOnly
              value={promptText}
              onFocus={(event) => event.target.select()}
            />
          </div>
        ) : null}
      </div>
    </div>
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

function createPromptWithCode(appName: string, sourceCode: string): string {
  return `You are helping me edit an App Lab sandbox app named "${appName}".

The app must be a complete single-file HTML document. Use inline CSS and inline JavaScript only.

Runtime rules:
- Do not use external scripts, imports, CDNs, remote images, cookies, localStorage, sessionStorage, or direct IndexedDB.
- The app runs in a sandboxed iframe with scripts enabled and an opaque origin.
- To persist app-owned JSON data, use the host message API below.

Persistence API:
- Read the injected capability: const appLabCapability = window.__APP_LAB_CAPABILITY__;
- Send window.parent.postMessage({ type, requestId, appLabCapability, payload }, "*");
- To load saved data, send type "GET_MY_DATA".
- The host replies with { type: "MY_DATA", requestId, payload: { data } }.
- To save data, send type "SAVE_MY_DATA" with payload { data: <JSON value> }.
- The host replies with "MY_DATA_SAVED" or "MY_DATA_SAVE_FAILED".
- Keep requestId values and match replies to requests.

Please rewrite the app as requested, returning only the complete HTML document.

Current app code:

\`\`\`html
${sourceCode}
\`\`\`
`;
}
