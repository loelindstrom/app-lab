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
          BuilderAI is a placeholder while the app-building loop is shaped around source editing, logs, and the sandbox runtime.
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
      await withTimeout(navigator.clipboard.writeText(consoleText), 1500);
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

function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => reject(new Error("Timed out.")), timeoutMs);
    promise.then(
      (value) => {
        window.clearTimeout(timeout);
        resolve(value);
      },
      (error: unknown) => {
        window.clearTimeout(timeout);
        reject(error);
      },
    );
  });
}

function createPromptWithCode(appName: string, sourceCode: string): string {
  return `You are helping me edit an App Lab sandbox app named "${appName}".

Return one complete single-file HTML document. Use inline JavaScript, host-compiled Tailwind classes, Alpine.js, and minimal inline CSS only when Tailwind cannot express a rule.

App Lab provides the runtime:
- Alpine.js 3.14.9 is injected before app code runs. Alpine directives and the global Alpine object are available without adding a script tag.
- Tailwind utilities are compiled by App Lab when the document includes <meta name="app-lab-tailwind" content="enabled">.
- App-owned JSON data is stored through the injected AppLab helper.

Runtime rules:
- Do not use external scripts, imports, CDNs, remote images, cookies, localStorage, sessionStorage, direct IndexedDB, navigation, window.prompt, alert, or confirm.
- The app runs in a sandboxed iframe with scripts enabled and an opaque origin.
- Because of the sandbox origin, browser storage, cookies, same-origin assumptions, top-level navigation, and network-loaded dependencies are unavailable or unreliable; use AppLab APIs and inline code instead.
- To use Tailwind, include <meta name="app-lab-tailwind" content="enabled"> in <head>. Do not include Tailwind with <script src>, import, CDN, or package-manager syntax.
- Tailwind classes should appear literally in class attributes whenever possible, so App Lab can compile them on save. Avoid constructing class names dynamically in JavaScript.
- Do not include Alpine with <script src>, import, CDN, or package-manager syntax. Do not call Alpine.start(); App Lab starts Alpine after the body is parsed.
- Alpine runs in normal mode, so x-model, x-show comparisons, ternary :class values, method calls, and simple inline expressions are supported.
- Register non-trivial Alpine components inside document.addEventListener("alpine:init", () => Alpine.data("componentName", () => ({ ... }))), then use x-data="componentName".
- A small <style> block is fine for rules like [x-cloak], data-attribute selectors, and browser quirks; prefer Tailwind utilities for normal layout and styling.
- Use <dialog> for modal UI. Do not use native form submission; use button type="button" and explicit click handlers.
- Use x-text, textContent, and DOM APIs for user-controlled text. Do not put user content into x-html or innerHTML.
- Include a visible error area for unexpected runtime or save failures, but avoid noisy "Ready" or "Saved" status UI unless the user asks for it.
- Do not add a fixed top app bar unless the user asks for one; App Lab already shows the app title from the <title> tag in its surrounding frame.
- If implementing drag/drop, use pointer events and keep touch-action scoped to the drag handle.

Persistence API:
- Use the injected helper: await AppLab.getData(fallbackValue)
- Save app-owned JSON data with: await AppLab.saveData(jsonValue)
- Register live shared data updates with: AppLab.onDataChange((nextData, info) => { ... }).
- Keep persisted data separate from transient UI state. Persist records/settings; keep tabs, dialogs, focus, drafts, and open/collapsed state as UI state unless the user asks to persist them.
- Persist only JSON-compatible data: primitives, arrays, and plain objects. Do not save DOM nodes, functions, Events, Maps, Sets, Dates, class instances, or circular objects.
- Save a plain JSON snapshot, for example with JSON.parse(JSON.stringify(state)) or an explicit snapshot() method, before calling AppLab.saveData.
- Include schemaVersion in saved data and normalize loaded data defensively before the UI reads it.
- For lists or collections, prefer stable high-entropy id fields using crypto.randomUUID() or a fallback.
- In onDataChange, update the persisted data model without resetting transient UI state.
- If a local save is currently in flight, ignore or queue onDataChange so an older remote echo cannot overwrite the user's local edit.
- Current App Lab sync uses latest-local-wins for unresolved offline conflicts. Design shared apps so occasional full-state overwrites are acceptable.
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
