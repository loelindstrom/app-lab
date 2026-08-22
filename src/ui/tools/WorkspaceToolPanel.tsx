import { useEffect, useMemo, useRef, useState } from "react";
import { createPromptWithCode, type AiChatMessage, type AiUsage } from "../../ai";
import type { AppRecord, JsonValue } from "../../core";
import type { SandboxConsoleEntry } from "../../runtime";

export type ToolPanelMode = "builder" | "console" | "source";
type SourceExportKind = "data" | "source";

interface WorkspaceToolPanelProps {
  activeApp: AppRecord;
  activeBuilderProfileName: string | null;
  aiConfigured: boolean;
  builderActivity: string | null;
  builderError: string | null;
  builderIsRunning: boolean;
  builderMessages: AiChatMessage[];
  builderUsage: AiUsage;
  consoleEntries: SandboxConsoleEntry[];
  mode: ToolPanelMode | null;
  onClearBuilderConversation: () => void;
  onClearConsole: () => void;
  onClose: () => void;
  onLoadAppData: (appId: string) => Promise<JsonValue>;
  onOpenAiSettings: () => void;
  onOpenBuilderProfileSettings: () => void;
  onSaveSource: (sourceCode: string) => Promise<AppRecord>;
  onSendBuilderMessage: (content: string) => Promise<void>;
}

export function WorkspaceToolPanel({
  activeApp,
  activeBuilderProfileName,
  aiConfigured,
  builderActivity,
  builderError,
  builderIsRunning,
  builderMessages,
  builderUsage,
  consoleEntries,
  mode,
  onClearBuilderConversation,
  onClearConsole,
  onClose,
  onLoadAppData,
  onOpenAiSettings,
  onOpenBuilderProfileSettings,
  onSaveSource,
  onSendBuilderMessage,
}: WorkspaceToolPanelProps) {
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
          <div className="flex min-w-0 items-baseline gap-1.5">
            <h2 className="shrink-0 truncate text-base font-extrabold leading-tight">{title}</h2>
            {mode === "builder" && activeBuilderProfileName ? (
              <button
                className="min-w-0 truncate text-left text-xs font-bold text-app-accent hover:underline focus-visible:underline"
                type="button"
                aria-label={`Open Builder profile settings for ${activeBuilderProfileName}`}
                title={`Active profile: ${activeBuilderProfileName}`}
                onClick={onOpenBuilderProfileSettings}
              >
                (Profile: {activeBuilderProfileName})
              </button>
            ) : null}
          </div>
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
        <BuilderView
          activity={builderActivity}
          app={activeApp}
          configured={aiConfigured}
          error={builderError}
          isRunning={builderIsRunning}
          messages={builderMessages}
          usage={builderUsage}
          onClear={onClearBuilderConversation}
          onOpenAiSettings={onOpenAiSettings}
          onSendMessage={onSendBuilderMessage}
        />
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

function BuilderView({
  activity,
  app,
  configured,
  error,
  isRunning,
  messages,
  usage,
  onClear,
  onOpenAiSettings,
  onSendMessage,
}: {
  activity: string | null;
  app: AppRecord;
  configured: boolean;
  error: string | null;
  isRunning: boolean;
  messages: AiChatMessage[];
  onClear: () => void;
  onOpenAiSettings: () => void;
  onSendMessage: (content: string) => Promise<void>;
  usage: AiUsage;
}) {
  const conversationEndRef = useRef<HTMLLIElement>(null);
  const [draft, setDraft] = useState("");
  const [promptOpen, setPromptOpen] = useState(false);
  const [status, setStatus] = useState("");
  const promptText = useMemo(() => createPromptWithCode(app.name, app.sourceCode), [app.name, app.sourceCode]);
  const promptPanelId = "builder-prompt-code";

  useEffect(() => {
    setDraft("");
    setPromptOpen(false);
    setStatus("");
  }, [app.appId]);

  useEffect(() => {
    if (typeof conversationEndRef.current?.scrollIntoView === "function") {
      conversationEndRef.current.scrollIntoView({ block: "nearest" });
    }
  }, [activity, error, messages.length]);

  async function sendMessage() {
    const message = draft.trim();
    if (!configured || isRunning || !message) return;
    setDraft("");
    await onSendMessage(message);
  }

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
          <li className="mr-auto grid max-w-[92%] gap-2 rounded-lg border border-app-line bg-white px-3 py-3 text-sm leading-relaxed text-app-muted">
            <p className="font-bold text-app-ink">Hi,</p>
            {configured ? (
              <>
                <p>Describe how you want to edit {app.name}.</p>
                <p>Or use the button below to work in an external AI chat.</p>
              </>
            ) : (
              <>
                <p>Use the button below to work in an external AI chat.</p>
                <p>
                  Or set up your AI provider in{" "}
                  <button className="font-bold text-app-accent underline underline-offset-2" type="button" onClick={onOpenAiSettings}>
                    Settings
                  </button>{" "}
                  to chat directly here.
                </p>
              </>
            )}
            <div>
              <button
                aria-controls={promptPanelId}
                aria-expanded={promptOpen}
                className="inline-flex min-h-9 items-center gap-2 rounded-md border border-app-line bg-app-panel px-3 text-sm font-bold text-app-ink hover:border-app-accent hover:text-app-accent"
                type="button"
                onClick={() => {
                  setPromptOpen(true);
                  setStatus("");
                }}
              >
                <CopyPromptIcon className="h-4 w-4" />
                Copy prompt + code
              </button>
            </div>
          </li>
          {messages.map((message) => (
            <li
              className={`max-w-[92%] whitespace-pre-wrap break-words rounded-lg px-3 py-2 text-sm leading-relaxed ${
                message.role === "user"
                  ? "ml-auto bg-app-accent text-white"
                  : "mr-auto border border-app-line bg-white text-app-muted"
              }`}
              key={message.messageId}
            >
              {message.content}
            </li>
          ))}
          {activity ? (
            <li className="mr-auto max-w-[92%] rounded-lg border border-app-line bg-app-accent/10 px-3 py-2 text-sm font-bold text-app-muted">
              {activity}
            </li>
          ) : null}
          {error ? (
            <li className="mr-auto max-w-[92%] rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm leading-relaxed text-red-700" role="alert">
              {error}
            </li>
          ) : null}
          <li aria-hidden="true" className="h-px" ref={conversationEndRef} />
        </ol>
      </div>

      <form
        className="grid gap-2 border-t border-app-line p-3"
        onSubmit={(event) => {
          event.preventDefault();
          void sendMessage();
        }}
      >
        <p aria-label="Builder session usage" className="text-right text-xs font-bold text-app-muted">
          Session: {formatBuilderUsage(usage)}
        </p>
        {configured ? (
          <div className="grid grid-cols-[minmax(0,1fr)_40px] items-end gap-2">
            <label className="sr-only" htmlFor="builder-message">
              Message
            </label>
            <textarea
              className="max-h-36 min-h-11 resize-y rounded-md border border-app-line px-3 py-2 text-app-ink outline-none focus:border-app-accent disabled:bg-slate-100"
              disabled={isRunning}
              id="builder-message"
              rows={2}
              placeholder="Ask BuilderAI to change this app"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key !== "Enter" || event.shiftKey || event.nativeEvent.isComposing) return;
                event.preventDefault();
                event.currentTarget.form?.requestSubmit();
              }}
            />
            <button
              className="grid h-10 min-h-10 w-10 place-items-center rounded-full border border-app-accent bg-app-accent p-0 text-xl font-bold text-white hover:bg-app-strong disabled:opacity-50"
              disabled={isRunning || !draft.trim()}
              type="submit"
              aria-label="Send message"
            >
              ↑
            </button>
          </div>
        ) : null}
        {promptOpen ? (
          <div className="grid gap-2 rounded-md border border-app-line bg-app-panel p-2" id={promptPanelId}>
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm leading-relaxed text-app-muted">
                Copy this prompt into an external AI. Paste the returned HTML into <span className="font-mono text-app-ink">&lt;&gt;</span> and save.
              </p>
              <button
                aria-label="Close prompt and code"
                className="grid h-8 min-h-8 w-8 shrink-0 place-items-center rounded-full text-xl text-app-muted hover:bg-app-accent/10 hover:text-app-accent"
                type="button"
                onClick={() => setPromptOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-xs font-bold text-app-muted" role="status">{status}</div>
              <button
                className="inline-flex min-h-8 items-center gap-2 rounded-md border border-app-accent bg-app-accent px-3 text-sm font-bold text-white hover:bg-app-strong"
                type="button"
                onClick={copyPromptText}
              >
                <CopyPromptIcon className="h-4 w-4" />
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
        <div className="flex flex-wrap justify-start gap-2">
          {messages.length || error ? (
            <button
              className="min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-muted hover:border-red-300 hover:text-red-700 disabled:opacity-50"
              disabled={isRunning}
              type="button"
              onClick={onClear}
            >
              Clear chat
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}

function CopyPromptIcon({ className }: { className: string }) {
  return (
    <svg className={className} aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function formatBuilderUsage(usage: AiUsage): string {
  const tokens = usage.totalTokens < 1_000 ? String(usage.totalTokens) : `${(usage.totalTokens / 1_000).toFixed(1)}k`;
  const cost = usage.costUsd === null ? null : `$${usage.costUsd.toFixed(usage.costUsd < 0.1 ? 4 : 2)}`;
  return [cost, `${tokens} tokens`].filter(Boolean).join(" · ");
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
