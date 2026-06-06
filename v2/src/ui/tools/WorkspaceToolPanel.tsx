import { useEffect, useMemo, useState } from "react";
import type { AppRecord } from "../../core/types";
import type { SandboxConsoleEntry } from "../../runtime/SandboxFrame";

export type ToolPanelMode = "builder" | "console" | "source";

interface WorkspaceToolPanelProps {
  activeApp: AppRecord;
  consoleEntries: SandboxConsoleEntry[];
  mode: ToolPanelMode | null;
  onClearConsole: () => void;
  onClose: () => void;
  onSaveSource: (sourceCode: string) => Promise<void>;
}

export function WorkspaceToolPanel({ activeApp, consoleEntries, mode, onClearConsole, onClose, onSaveSource }: WorkspaceToolPanelProps) {
  const isOpen = mode !== null;
  const title = mode === "source" ? "Source" : mode === "builder" ? "BuilderAI" : mode === "console" ? "Console" : "App tools";

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

      {mode === "source" ? (
        <SourceView app={activeApp} onSaveSource={onSaveSource} />
      ) : mode === "console" ? (
        <ConsoleView entries={consoleEntries} onClear={onClearConsole} />
      ) : (
        <BuilderView />
      )}
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
    <div className="grid min-h-0 grid-rows-[minmax(0,1fr)_auto_auto] bg-[#111827]">
      <div className="min-h-0 bg-[#111827]">
        <textarea
          className="h-full min-h-0 w-full resize-none border-0 bg-[#111827] p-4 font-mono text-[13px] leading-normal text-slate-100 outline-none [tab-size:2]"
          spellCheck={false}
          value={sourceCode}
          onChange={(event) => {
            setSourceCode(event.target.value);
            setStatus("Unsaved changes");
          }}
        />
      </div>
      {exportOpen ? (
        <div className="border-t border-app-line bg-app-panel p-3">
          <p className="mb-2 text-xs font-bold text-app-muted">Select and copy this prompt into another LLM.</p>
          <textarea
            className="h-44 w-full resize-y rounded-md border border-app-line bg-white p-3 font-mono text-xs leading-relaxed text-app-ink"
            readOnly
            value={promptText}
            onFocus={(event) => event.target.select()}
          />
        </div>
      ) : null}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-app-line bg-slate-50 px-3 py-2">
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
            Save
          </button>
        </div>
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

function ConsoleView({ entries, onClear }: { entries: SandboxConsoleEntry[]; onClear: () => void }) {
  const [status, setStatus] = useState("Ready");
  const consoleText = useMemo(() => formatConsoleEntries(entries), [entries]);

  async function copyConsole() {
    if (!consoleText) {
      setStatus("No output");
      return;
    }

    try {
      await navigator.clipboard.writeText(consoleText);
      setStatus("Copied.");
    } catch (_) {
      setStatus("Select and copy manually.");
    }
  }

  return (
    <div className="grid min-h-0 grid-rows-[minmax(0,1fr)_auto] bg-slate-950">
      <div className="min-h-0 overflow-auto p-3 font-mono text-xs leading-relaxed text-slate-200">
        {entries.length ? (
          <ol className="select-text space-y-4">
            {entries.map((entry) => (
              <li className="whitespace-pre-wrap break-words" key={entry.id}>
                <span className="text-slate-500">[{formatTime(entry.timestamp)}] </span>
                <span className={`font-extrabold ${consoleLevelTextClass(entry.level)}`}>{entry.level.toUpperCase()}</span>
                <span> {entry.args.join(" ") || "(empty)"}</span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="select-text text-slate-400">No console output yet.</p>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-app-line bg-slate-50 px-3 py-2">
        <div className="text-xs font-bold text-app-muted">{status}</div>
        <div className="flex gap-2">
          <button
            className="min-h-8 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent"
            type="button"
            onClick={() => {
              onClear();
              setStatus("Cleared.");
            }}
          >
            Clear
          </button>
          <button
            className="min-h-8 rounded-md border border-app-accent bg-app-accent px-3 text-sm font-bold text-white hover:bg-app-strong"
            type="button"
            onClick={copyConsole}
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}

function createPromptWithCode(appName: string, sourceCode: string): string {
  return `You are helping me edit an App Lab sandbox app named "${appName}".

The app must be a complete single-file HTML document. Use inline CSS and inline JavaScript only.

Runtime rules:
- Do not use external scripts, imports, CDNs, remote images, cookies, localStorage, sessionStorage, direct IndexedDB, navigation, window.prompt, alert, or confirm.
- The app runs in a sandboxed iframe with scripts enabled and an opaque origin.
- Use inline CSS and plain browser APIs only. Do not rely on package managers or network access.
- Use <dialog> for modal UI, but do not use native form submission. Use button type="button" and explicit click handlers.
- Use textContent and DOM APIs for user-controlled text. Do not put user content into innerHTML.
- Use pointer events for drag/drop interactions.
- Include a visible status/error area so runtime failures are shown to the user.
- For saved data changes, use a schemaVersion and migrate older saved shapes defensively before saving the new shape.
- For small state objects with known keys, put "use strict"; at the top of the script and call Object.seal(state) after creating the state object, so property-name typos become visible errors.

Persistence API:
- Use the injected helper: await AppLab.getData(fallbackValue)
- Save app-owned JSON data with: await AppLab.saveData(jsonValue)
- JSON data must be primitives, arrays, and plain objects only.
- You can show unexpected runtime errors with AppLab.onError((message) => { ... }).
- Do not use raw postMessage unless the user explicitly asks for low-level App Lab runtime code.

Please rewrite the app as requested, returning only the complete HTML document.

Current app code:

\`\`\`html
${sourceCode}
\`\`\`
`;
}

function formatConsoleEntries(entries: SandboxConsoleEntry[]): string {
  return entries
    .map((entry) => {
      const message = entry.args.join(" ") || "(empty)";
      return `[${formatTime(entry.timestamp)}] ${entry.level.toUpperCase()} ${message}`;
    })
    .join("\n\n");
}

function formatTime(timestamp: string): string {
  return new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(timestamp));
}

function consoleLevelTextClass(level: SandboxConsoleEntry["level"]): string {
  if (level === "error") return "text-red-400";
  if (level === "warn") return "text-amber-300";
  if (level === "info") return "text-sky-300";
  if (level === "debug") return "text-violet-300";
  return "text-slate-100";
}
