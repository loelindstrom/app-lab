import { useEffect, useMemo, useState } from "react";
import type { AppRecord, JsonValue } from "../../core";
import type { SandboxConsoleEntry } from "../../runtime";

export type ToolPanelMode = "builder" | "console" | "source";
type SourceExportKind = "data" | "source";

interface WorkspaceToolPanelProps {
  activeApp: AppRecord;
  consoleEntries: SandboxConsoleEntry[];
  mode: ToolPanelMode | null;
  onClearConsole: () => void;
  onClose: () => void;
  onLoadAppData: (appId: string) => Promise<JsonValue>;
  onSaveSource: (sourceCode: string) => Promise<AppRecord>;
}

export function WorkspaceToolPanel({ activeApp, consoleEntries, mode, onClearConsole, onClose, onLoadAppData, onSaveSource }: WorkspaceToolPanelProps) {
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
        <SourceView app={activeApp} onLoadAppData={onLoadAppData} onSaveSource={onSaveSource} />
      ) : mode === "console" ? (
        <ConsoleView entries={consoleEntries} onClear={onClearConsole} />
      ) : (
        <BuilderView app={activeApp} />
      )}
    </aside>
  );
}

function SourceView({
  app,
  onLoadAppData,
  onSaveSource,
}: {
  app: AppRecord;
  onLoadAppData: (appId: string) => Promise<JsonValue>;
  onSaveSource: (sourceCode: string) => Promise<AppRecord>;
}) {
  const [sourceCode, setSourceCode] = useState(app.sourceCode);
  const [exportOpen, setExportOpen] = useState(false);
  const [includeSourceExport, setIncludeSourceExport] = useState(true);
  const [includeDataExport, setIncludeDataExport] = useState(false);
  const [appDataText, setAppDataText] = useState("");
  const [manualCopyText, setManualCopyText] = useState("");
  const [manualCopyLabel, setManualCopyLabel] = useState("");
  const [status, setStatus] = useState("Ready");
  const [exportStatus, setExportStatus] = useState("Ready");

  useEffect(() => {
    setSourceCode(app.sourceCode);
    setStatus("Ready");
    setIncludeSourceExport(true);
    setIncludeDataExport(false);
    setAppDataText("");
    setManualCopyText("");
    setManualCopyLabel("");
    setExportStatus("Ready");
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

  async function loadAppData(): Promise<string | null> {
    setExportStatus("Loading data...");
    try {
      const data = await onLoadAppData(app.appId);
      const dataText = JSON.stringify(data, null, 2);
      setAppDataText(dataText);
      setExportStatus("Data loaded.");
      return dataText;
    } catch (error) {
      setExportStatus(error instanceof Error ? error.message : "Could not load app data.");
      return null;
    }
  }

  async function copyExportText(text: string, label: string) {
    if (!text) {
      setExportStatus(`No ${label} to copy.`);
      return;
    }

    try {
      await withTimeout(navigator.clipboard.writeText(text), 1500);
      setManualCopyText("");
      setManualCopyLabel("");
      setExportStatus("Copied.");
    } catch (_) {
      setManualCopyText(text);
      setManualCopyLabel(label);
      setExportStatus("Select and copy manually.");
    }
  }

  async function copyAppData() {
    const dataText = appDataText || (await loadAppData());
    if (dataText) await copyExportText(dataText, "app data");
  }

  async function toggleDataExport(checked: boolean) {
    setIncludeDataExport(checked);
    if (checked && !appDataText) await loadAppData();
  }

  async function downloadSelectedExports() {
    if (!includeSourceExport && !includeDataExport) {
      setExportStatus("Select at least one export.");
      return;
    }

    const downloads: Array<{ contents: string; kind: SourceExportKind }> = [];
    if (includeSourceExport) downloads.push({ contents: sourceCode, kind: "source" });

    if (includeDataExport) {
      const dataText = appDataText || (await loadAppData());
      if (!dataText) return;
      downloads.push({ contents: dataText, kind: "data" });
    }

    const downloadCount = downloads.filter((download) => downloadTextFile(download.contents, getExportFilename(app.name, download.kind), getExportMimeType(download.kind))).length;
    setExportStatus(downloadCount === downloads.length ? "Download started." : "Download is unavailable.");
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
        <div className="grid gap-3 border-t border-app-line bg-app-panel p-3">
          <fieldset className="grid gap-2">
            <legend className="sr-only">Export files</legend>
            <label className="flex min-h-10 items-center gap-3 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink">
              <input
                checked={includeSourceExport}
                className="h-4 w-4 accent-app-accent"
                type="checkbox"
                onChange={(event) => setIncludeSourceExport(event.target.checked)}
              />
              <span className="min-w-0">
                <span className="block">Source code</span>
                <span className="block truncate text-xs font-bold text-app-muted">{getExportFilename(app.name, "source")}</span>
              </span>
            </label>
            <label className="flex min-h-10 items-center gap-3 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink">
              <input
                checked={includeDataExport}
                className="h-4 w-4 accent-app-accent"
                type="checkbox"
                onChange={(event) => void toggleDataExport(event.target.checked)}
              />
              <span className="min-w-0">
                <span className="block">App data</span>
                <span className="block truncate text-xs font-bold text-app-muted">{getExportFilename(app.name, "data")}</span>
              </span>
            </label>
          </fieldset>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <button
              className="min-h-8 rounded-md border border-app-accent bg-app-accent px-3 text-sm font-bold text-white hover:bg-app-strong"
              type="button"
              onClick={() => void downloadSelectedExports()}
            >
              Download selected
            </button>
            <div className="flex flex-wrap gap-2">
              {includeDataExport ? (
                <button className="min-h-8 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent" type="button" onClick={() => void loadAppData()}>
                  Refresh data
                </button>
              ) : null}
              <button className="min-h-8 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent" type="button" onClick={() => void copyExportText(sourceCode, "source code")}>
                Copy source
              </button>
              <button className="min-h-8 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent" type="button" onClick={() => void copyAppData()}>
                Copy data
              </button>
            </div>
          </div>
          {manualCopyText ? (
            <textarea
              aria-label={`${manualCopyLabel} export`}
              className="h-32 w-full resize-y rounded-md border border-app-line bg-white p-3 font-mono text-xs leading-relaxed text-app-ink"
              readOnly
              value={manualCopyText}
              onFocus={(event) => event.target.select()}
            />
          ) : null}
          <div className="text-xs font-bold text-app-muted">{exportStatus}</div>
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
            Export {exportOpen ? "↓" : "↑"}
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

function getExportFilename(appName: string, kind: SourceExportKind): string {
  const safeName = appName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  const baseName = safeName || "untitled-app";
  return kind === "source" ? `${baseName}.html` : `${baseName}.data.json`;
}

function getExportMimeType(kind: SourceExportKind): string {
  return kind === "source" ? "text/html;charset=utf-8" : "application/json;charset=utf-8";
}

function downloadTextFile(contents: string, filename: string, mimeType: string): boolean {
  if (typeof window.URL.createObjectURL !== "function") return false;

  const url = window.URL.createObjectURL(new Blob([contents], { type: mimeType }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => {
    if (typeof window.URL.revokeObjectURL === "function") window.URL.revokeObjectURL(url);
  }, 0);
  return true;
}

function BuilderView({ app }: { app: AppRecord }) {
  const [promptOpen, setPromptOpen] = useState(false);
  const [status, setStatus] = useState("Ready");
  const promptText = useMemo(() => createPromptWithCode(app.name, app.sourceCode), [app.name, app.sourceCode]);
  const promptPanelId = "builder-prompt-code";

  useEffect(() => {
    setPromptOpen(false);
    setStatus("Ready");
  }, [app.appId]);

  async function copyPromptText() {
    try {
      await withTimeout(navigator.clipboard.writeText(promptText), 1500);
      setStatus("Copied.");
    } catch (_) {
      setPromptOpen(true);
      setStatus("Select and copy manually.");
    }
  }

  return (
    <div className="grid min-h-0 grid-rows-[minmax(0,1fr)_auto]">
      <div className="min-h-0 overflow-auto">
        <ol className="flex flex-col gap-3 p-3" aria-live="polite">
          <li className="rounded-lg border border-app-line bg-app-accent/10 px-3 py-2 text-sm leading-relaxed text-app-muted">
            The AI bot is still being built, but use the button below to copy prompt + code and use it in another AI.
          </li>
        </ol>
      </div>

      <form className="grid gap-2 border-t border-app-line p-3">
        <div className="grid grid-cols-[minmax(0,1fr)_40px] items-end gap-2">
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
        </div>
        {promptOpen ? (
          <div className="grid gap-2 rounded-md border border-app-line bg-app-panel p-2" id={promptPanelId}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-xs font-bold text-app-muted">{status}</div>
              <button
                className="min-h-8 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent"
                type="button"
                onClick={copyPromptText}
              >
                Copy
              </button>
            </div>
            <textarea
              aria-label="Prompt and code"
              className="h-40 w-full resize-y rounded-md border border-app-line bg-white p-3 font-mono text-xs leading-relaxed text-app-ink"
              readOnly
              value={promptText}
              onFocus={(event) => event.target.select()}
            />
          </div>
        ) : null}
        <button
          aria-controls={promptPanelId}
          aria-expanded={promptOpen}
          className="min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent"
          type="button"
          onClick={() => {
            setPromptOpen((isOpen) => !isOpen);
            setStatus("Ready");
          }}
        >
          Copy prompt + code {promptOpen ? "↓" : "↑"}
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
