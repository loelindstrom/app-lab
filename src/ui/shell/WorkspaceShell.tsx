import { useEffect, useMemo, useState } from "react";
import type { AppLabCore, AppRecord, AppSummary } from "../../core/types";
import type { SandboxConsoleEntry } from "../../runtime/SandboxFrame";
import { SandboxFrame } from "../../runtime/SandboxFrame";
import { SettingsDialog } from "../dialogs/SettingsDialog";
import { ToolPanelMode, WorkspaceToolPanel } from "../tools/WorkspaceToolPanel";

type WorkspaceMode = "launcher" | "app";

interface WorkspaceShellProps {
  core: AppLabCore;
}

export function WorkspaceShell({ core }: WorkspaceShellProps) {
  const [apps, setApps] = useState<AppSummary[]>([]);
  const [activeApp, setActiveApp] = useState<AppRecord | null>(null);
  const [mode, setMode] = useState<WorkspaceMode>("launcher");
  const [activeTool, setActiveTool] = useState<ToolPanelMode | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [workspaceSyncOpen, setWorkspaceSyncOpen] = useState(false);
  const [sharingApp, setSharingApp] = useState<AppSummary | null>(null);
  const [aiAttentionKey, setAiAttentionKey] = useState(0);
  const [aiAttentionDismissed, setAiAttentionDismissed] = useState(true);
  const [consoleEntries, setConsoleEntries] = useState<SandboxConsoleEntry[]>([]);

  useEffect(() => {
    refreshApps();
  }, []);

  async function refreshApps() {
    setApps(await core.listApps());
  }

  async function openApp(appId: string) {
    const app = await core.getApp(appId);
    if (!app) return;
    setActiveApp(app);
    setMode("app");
    setActiveTool(null);
    setConsoleEntries([]);
    setAiAttentionKey((key) => key + 1);
    setAiAttentionDismissed(false);
  }

  async function createApp() {
    const app = await core.createBlankApp();
    await refreshApps();
    setActiveApp(app);
    setMode("app");
    setActiveTool(null);
    setConsoleEntries([]);
    setAiAttentionKey((key) => key + 1);
    setAiAttentionDismissed(false);
  }

  function openLauncher() {
    setMode("launcher");
    setActiveTool(null);
  }

  function toggleTool(nextTool: ToolPanelMode) {
    if (nextTool === "builder") {
      setAiAttentionDismissed(true);
    }

    setActiveTool((currentTool) => (currentTool === nextTool ? null : nextTool));
  }

  const title = useMemo(() => {
    if (mode === "launcher") return "App Lab";
    return activeApp?.name ?? "App";
  }, [activeApp?.name, mode]);

  return (
    <div className="grid min-h-[calc(100dvh+1px)] grid-rows-[44px_minmax(0,1fr)_auto] overflow-x-hidden lg:min-h-dvh">
      <header className="grid grid-cols-[88px_minmax(0,1fr)_112px] items-center border-b border-app-line bg-app-panel/90 px-2 lg:grid-cols-[1fr_auto_1fr]">
        <div className="justify-self-start">
          {mode === "app" ? (
            <button
              className="min-h-9 rounded-md border border-transparent bg-transparent px-3 font-bold text-app-accent hover:bg-app-accent/10"
              type="button"
              onClick={openLauncher}
            >
              ‹ Apps
            </button>
          ) : null}
        </div>
        <h1 className="max-w-[50vw] truncate text-center text-[17px] font-extrabold">{title}</h1>
        <nav className="flex items-center justify-end gap-1 lg:gap-3" aria-label="Workspace actions">
          {mode === "app" && activeApp ? (
            <button
              className="grid h-9 min-h-9 w-9 place-items-center rounded-md border border-transparent bg-transparent text-lg text-app-muted hover:bg-app-accent/10 hover:text-app-accent"
              type="button"
              aria-label={`Share ${activeApp.name}`}
              title="Share"
              onClick={() => setSharingApp(activeApp)}
            >
              ↗
            </button>
          ) : null}
          <button
            className="grid h-9 min-h-9 w-9 place-items-center rounded-md border border-transparent bg-transparent text-lg text-app-muted hover:bg-app-accent/10 hover:text-app-accent"
            type="button"
            aria-label="Open settings"
            onClick={() => setSettingsOpen(true)}
          >
            ⚙
          </button>
          {mode === "app" && activeApp ? (
            <div className="hidden lg:block">
              <ToolSwitch
                activeTool={activeTool}
                aiAttentionDismissed={aiAttentionDismissed}
                aiAttentionKey={aiAttentionKey}
                consoleCount={consoleEntries.length}
                onToggleTool={toggleTool}
              />
            </div>
          ) : null}
        </nav>
      </header>

      <main className={`min-h-0 overflow-hidden ${activeTool ? "lg:mr-[min(420px,36vw)]" : ""}`}>
        {mode === "launcher" ? (
          <LauncherView
            apps={apps}
            onDeleteApp={async (appId) => {
              await core.deleteApp(appId);
              await refreshApps();
            }}
            onOpenApp={openApp}
            onOpenSync={() => setWorkspaceSyncOpen(true)}
            onShareApp={(app) => setSharingApp(app)}
            onUpdateApp={async (appId, input) => {
              await core.updateApp({ appId, ...input });
              await refreshApps();
            }}
          />
        ) : activeApp ? (
          <AppView
            app={activeApp}
            core={core}
            onConsoleEntry={(entry) => {
              setConsoleEntries((entries) => [...entries.slice(-199), entry]);
            }}
          />
        ) : null}
      </main>

      {mode === "app" && activeApp ? (
        <>
          <footer className="sticky bottom-0 z-30 flex h-11 shrink-0 items-center justify-end border-t border-app-line bg-app-panel/95 px-3 lg:hidden">
            <ToolSwitch
              activeTool={activeTool}
              aiAttentionDismissed={aiAttentionDismissed}
              aiAttentionKey={aiAttentionKey}
              consoleCount={consoleEntries.length}
              onToggleTool={toggleTool}
            />
          </footer>
          <WorkspaceToolPanel
            activeApp={activeApp}
            consoleEntries={consoleEntries}
            mode={activeTool}
            onClearConsole={() => setConsoleEntries([])}
            onClose={() => setActiveTool(null)}
            onSaveSource={async (sourceCode) => {
              const nextName = readHtmlTitle(sourceCode) || activeApp.name;
              const updated = await core.updateApp({ appId: activeApp.appId, name: nextName, sourceCode });
              setActiveApp(updated);
              setConsoleEntries([]);
              await refreshApps();
            }}
          />
        </>
      ) : mode === "launcher" ? (
        <button
          className="fixed bottom-5 right-5 z-20 grid h-14 min-h-14 w-14 place-items-center rounded-full border border-app-accent bg-app-accent text-3xl font-light leading-none text-white shadow-panel hover:bg-app-strong"
          type="button"
          aria-label="Create new app"
          onClick={createApp}
        >
          +
        </button>
      ) : null}

      <SettingsDialog isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <WorkspaceSyncDialog isOpen={workspaceSyncOpen} onClose={() => setWorkspaceSyncOpen(false)} />
      <ShareAppDialog app={sharingApp} onClose={() => setSharingApp(null)} />
    </div>
  );
}

interface LauncherViewProps {
  apps: AppSummary[];
  onDeleteApp: (appId: string) => Promise<void>;
  onOpenApp: (appId: string) => void;
  onOpenSync: () => void;
  onShareApp: (app: AppSummary) => void;
  onUpdateApp: (appId: string, input: { name: string; description: string }) => Promise<void>;
}

interface ToolSwitchProps {
  activeTool: ToolPanelMode | null;
  aiAttentionDismissed: boolean;
  aiAttentionKey: number;
  consoleCount: number;
  onToggleTool: (tool: ToolPanelMode) => void;
}

function ToolSwitch({ activeTool, aiAttentionDismissed, aiAttentionKey, consoleCount, onToggleTool }: ToolSwitchProps) {
  const showAiAttention = !aiAttentionDismissed && activeTool !== "builder";

  return (
    <div className="flex h-9 items-stretch gap-1 rounded-lg border border-app-line bg-white/90 p-1" role="group" aria-label="App tools">
      <button
        className={`relative min-h-0 rounded-md border-0 bg-transparent px-3 font-bold text-app-muted hover:text-app-accent ${
          activeTool === "console" ? "text-app-accent after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:bg-app-accent" : ""
        }`}
        type="button"
        aria-label="Toggle console"
        onClick={() => onToggleTool("console")}
      >
        Log
        {consoleCount > 0 ? (
          <span className="absolute -right-1 -top-1 grid min-h-4 min-w-4 place-items-center rounded-full bg-red-600 px-1 text-[10px] font-extrabold leading-none text-white shadow-sm">
            {consoleCount > 99 ? "99+" : consoleCount}
          </span>
        ) : null}
      </button>
      <button
        className={`relative min-h-0 rounded-md border-0 bg-transparent px-3 font-mono font-bold text-app-muted hover:text-app-accent ${
          activeTool === "source" ? "text-app-accent after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:bg-app-accent" : ""
        }`}
        type="button"
        aria-label="Toggle source"
        onClick={() => onToggleTool("source")}
      >
        &lt;&gt;
      </button>
      <button
        className={`relative min-h-0 overflow-hidden rounded-md border-0 bg-transparent px-3 font-bold text-app-muted hover:text-app-violet ${
          activeTool === "builder" ? "text-app-violet after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:bg-app-violet" : ""
        }`}
        type="button"
        aria-label="Toggle BuilderAI"
        onClick={() => onToggleTool("builder")}
      >
        {showAiAttention ? (
          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 36" preserveAspectRatio="none" aria-hidden="true">
            <rect
              key={aiAttentionKey}
              className="ai-snake-path"
              x="2"
              y="2"
              width="96"
              height="32"
              rx="6"
              ry="6"
              pathLength="100"
              fill="none"
              stroke="#8b5cf6"
              strokeLinecap="round"
            />
          </svg>
        ) : null}
        <span key={aiAttentionKey} className={`relative z-10 ${showAiAttention ? "animate-ai-text-shimmer" : ""}`}>
          AI ✦
        </span>
      </button>
    </div>
  );
}

function LauncherView({ apps, onDeleteApp, onOpenApp, onOpenSync, onShareApp, onUpdateApp }: LauncherViewProps) {
  const [editingApp, setEditingApp] = useState<AppSummary | null>(null);

  return (
    <section className="mx-auto h-full w-full max-w-5xl overflow-auto px-4 py-7 pb-24" aria-label="Apps">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="mb-1 text-xs font-extrabold uppercase text-app-muted">Workspace</p>
          <h2 className="text-[clamp(24px,4vw,38px)] font-extrabold leading-none">Choose an app</h2>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <span className="rounded-full border border-app-line bg-white px-3 py-1 text-xs font-extrabold uppercase text-app-muted">
            Local only
          </span>
          <button
            className="min-h-9 rounded-md border border-app-accent bg-white px-3 text-sm font-extrabold text-app-accent hover:bg-app-accent/10"
            type="button"
            onClick={onOpenSync}
          >
            Sync workspace
          </button>
        </div>
      </div>

      {apps.length ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3">
          {apps.map((app) => (
            <article
              className="relative grid min-h-32 content-start gap-3 rounded-lg border border-app-line bg-app-surface/95 p-4 text-app-ink shadow-[0_10px_30px_rgb(46_38_24_/_8%)] hover:bg-white"
              key={app.appId}
            >
              <button
                className="absolute right-3 top-3 grid h-8 min-h-8 w-8 place-items-center rounded-md border border-transparent bg-white/80 text-base text-app-muted hover:border-app-accent hover:text-app-accent"
                type="button"
                aria-label={`Edit ${app.name}`}
                title="Edit"
                onClick={() => setEditingApp(app)}
              >
                <span className="inline-block scale-x-[-1]" aria-hidden="true">
                  ✎
                </span>
              </button>
              <button className="grid gap-2 pr-9 text-left" type="button" onClick={() => onOpenApp(app.appId)}>
                <strong className="text-lg leading-tight">{app.name}</strong>
                <span className="line-clamp-3 text-sm leading-snug text-app-muted">{app.description}</span>
              </button>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-extrabold uppercase text-app-muted">Private</span>
                <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-extrabold uppercase text-app-muted">Not synced</span>
              </div>
              <div className="mt-auto flex items-center justify-between gap-2 border-t border-app-line pt-3">
                <span className="truncate text-xs font-bold text-app-muted">{formatDate(app.updatedAt)}</span>
                <div className="flex gap-2">
                  <button
                    className="min-h-8 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent"
                    type="button"
                    onClick={() => onShareApp(app)}
                  >
                    Share
                  </button>
                  <button
                    className="min-h-8 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent"
                    type="button"
                    onClick={() => onOpenApp(app.appId)}
                  >
                    Open
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-app-line bg-app-panel/70 p-8 text-app-muted">
          No apps yet. Use the + button to create the example app.
        </div>
      )}

      <LauncherEditDialog
        app={editingApp}
        onClose={() => setEditingApp(null)}
        onDeleteApp={async (appId) => {
          await onDeleteApp(appId);
          setEditingApp(null);
        }}
        onUpdateApp={async (appId, input) => {
          await onUpdateApp(appId, input);
          setEditingApp(null);
        }}
      />
    </section>
  );
}

function WorkspaceSyncDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [mode, setMode] = useState<"create" | "restore">("create");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-black/35 px-4" role="dialog" aria-modal="true" aria-label="Workspace sync">
      <div className="grid max-h-[88dvh] w-full max-w-2xl grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-xl border border-app-line bg-app-panel shadow-panel">
        <div className="flex items-center justify-between gap-3 border-b border-app-line p-4">
          <div>
            <p className="mb-1 text-xs font-extrabold uppercase text-app-muted">Design preview</p>
            <h2 className="text-lg font-extrabold">Workspace sync</h2>
          </div>
          <button
            className="grid h-8 min-h-8 w-8 place-items-center rounded-full text-xl text-app-muted hover:bg-app-accent/10 hover:text-app-accent"
            type="button"
            aria-label="Close workspace sync"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="min-h-0 overflow-auto p-4">
          <div className="mb-4 grid gap-3 rounded-lg border border-app-line bg-slate-50 p-3 sm:grid-cols-3">
            <SyncFact label="Workspace" value="Local only" />
            <SyncFact label="Provider" value="Not connected" />
            <SyncFact label="Live updates" value="Planned" />
          </div>

          <div className="mb-4 flex flex-wrap gap-2 rounded-lg bg-white p-1">
            <SyncModeButton active={mode === "create"} label="Create key" onClick={() => setMode("create")} />
            <SyncModeButton active={mode === "restore"} label="Restore device" onClick={() => setMode("restore")} />
          </div>

          {mode === "create" ? (
            <div className="grid gap-4">
              <p className="text-sm leading-relaxed text-app-muted">
                This will create one workspace recovery key. Adding that key on another device should restore the launcher,
                including private apps and shared app memberships.
              </p>
              <div className="rounded-lg border border-app-line bg-white p-3">
                <p className="mb-2 text-xs font-extrabold uppercase text-app-muted">Future recovery key</p>
                <div className="rounded-md border border-dashed border-app-line bg-slate-50 p-3 font-mono text-sm text-app-muted">
                  applab-workspace-key-will-appear-here
                </div>
              </div>
              <button className="min-h-10 rounded-md border border-app-line bg-slate-100 px-4 font-extrabold text-app-muted" type="button" disabled>
                Create workspace key after provider is implemented
              </button>
            </div>
          ) : (
            <div className="grid gap-4">
              <p className="text-sm leading-relaxed text-app-muted">
                Restore is the one-thing setup flow for a second device. The key unlocks the encrypted workspace manifest and
                imports the app room references that belong to this user.
              </p>
              <textarea
                className="min-h-28 resize-y rounded-md border border-app-line bg-white p-3 font-mono text-sm outline-none focus:border-app-accent"
                placeholder="Paste workspace recovery key"
              />
              <button className="min-h-10 rounded-md border border-app-line bg-slate-100 px-4 font-extrabold text-app-muted" type="button" disabled>
                Restore after sync core is implemented
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SyncFact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] font-extrabold uppercase text-app-muted">{label}</p>
      <p className="text-sm font-extrabold text-app-ink">{value}</p>
    </div>
  );
}

function SyncModeButton({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      className={`min-h-9 rounded-md px-3 text-sm font-extrabold ${
        active ? "bg-app-accent text-white" : "bg-transparent text-app-muted hover:bg-app-accent/10 hover:text-app-accent"
      }`}
      type="button"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function ShareAppDialog({ app, onClose }: { app: AppSummary | null; onClose: () => void }) {
  const [sourceScope, setSourceScope] = useState("read");
  const [dataScope, setDataScope] = useState("write");

  useEffect(() => {
    setSourceScope("read");
    setDataScope("write");
  }, [app?.appId]);

  if (!app) return null;

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-black/35 px-4" role="dialog" aria-modal="true" aria-label="Share app">
      <div className="grid w-full max-w-lg gap-4 rounded-xl border border-app-line bg-app-panel p-4 shadow-panel">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="mb-1 text-xs font-extrabold uppercase text-app-muted">Design preview</p>
            <h2 className="truncate text-lg font-extrabold">Share {app.name}</h2>
          </div>
          <button
            className="grid h-8 min-h-8 w-8 place-items-center rounded-full text-xl text-app-muted hover:bg-app-accent/10 hover:text-app-accent"
            type="button"
            aria-label="Close share dialog"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <p className="text-sm leading-relaxed text-app-muted">
          Sharing will create an encrypted app room and an invite link. Opening that link should show an import confirmation before
          adding the app to another workspace. Source is always visible to collaborators; the controls below choose whether source
          and data are editable.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-app-muted">
            Source code
            <select
              className="min-h-10 rounded-md border border-app-line bg-white px-3 text-base font-semibold text-app-ink outline-none focus:border-app-accent"
              value={sourceScope}
              onChange={(event) => setSourceScope(event.target.value)}
            >
              <option value="read">Can view</option>
              <option value="write">Can edit</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-app-muted">
            App data
            <select
              className="min-h-10 rounded-md border border-app-line bg-white px-3 text-base font-semibold text-app-ink outline-none focus:border-app-accent"
              value={dataScope}
              onChange={(event) => setDataScope(event.target.value)}
            >
              <option value="read">Can view</option>
              <option value="write">Can edit</option>
            </select>
          </label>
        </div>

        <div className="rounded-lg border border-app-line bg-slate-50 p-3">
          <p className="mb-2 text-xs font-extrabold uppercase text-app-muted">Invite link</p>
          <div className="rounded-md border border-dashed border-app-line bg-white p-3 font-mono text-xs leading-relaxed text-app-muted">
            Share link will appear after workspace sync is connected.
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-bold text-app-muted">Selected: source {sourceScope}, data {dataScope}</span>
          <button className="min-h-9 rounded-md border border-app-line bg-slate-100 px-3 text-sm font-extrabold text-app-muted" type="button" disabled>
            Create invite later
          </button>
        </div>
      </div>
    </div>
  );
}

function LauncherEditDialog({
  app,
  onClose,
  onDeleteApp,
  onUpdateApp,
}: {
  app: AppSummary | null;
  onClose: () => void;
  onDeleteApp: (appId: string) => Promise<void>;
  onUpdateApp: (appId: string, input: { name: string; description: string }) => Promise<void>;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Ready");

  useEffect(() => {
    setName(app?.name ?? "");
    setDescription(app?.description ?? "");
    setStatus("Ready");
  }, [app]);

  if (!app) return null;

  async function save() {
    if (!app || !name.trim()) return;
    setStatus("Saving...");
    try {
      await onUpdateApp(app.appId, { name: name.trim(), description: description.trim() });
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not save app.");
    }
  }

  async function deleteApp() {
    if (!app || !window.confirm(`Delete "${app.name}"? This removes the app and its saved data.`)) return;
    setStatus("Deleting...");
    try {
      await onDeleteApp(app.appId);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not delete app.");
    }
  }

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-black/35 px-4" role="dialog" aria-modal="true" aria-label="Edit app">
      <div className="grid w-full max-w-md gap-4 rounded-xl border border-app-line bg-app-panel p-4 shadow-panel">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-extrabold">Edit app</h2>
          <button
            className="grid h-8 min-h-8 w-8 place-items-center rounded-full text-xl text-app-muted hover:bg-app-accent/10 hover:text-app-accent"
            type="button"
            aria-label="Close app editor"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <label className="grid gap-2 text-sm font-bold text-app-muted">
          Name
          <input
            className="min-h-10 rounded-md border border-app-line bg-white px-3 text-base font-semibold text-app-ink outline-none focus:border-app-accent"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-app-muted">
          Description
          <textarea
            className="min-h-24 resize-y rounded-md border border-app-line bg-white px-3 py-2 text-base font-medium text-app-ink outline-none focus:border-app-accent"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            className="min-h-9 rounded-md border border-red-200 bg-red-50 px-3 text-sm font-bold text-red-700 hover:bg-red-100"
            type="button"
            onClick={deleteApp}
          >
            Delete
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-app-muted">{status}</span>
            <button
              className="min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="min-h-9 rounded-md border border-app-accent bg-app-accent px-3 text-sm font-bold text-white hover:bg-app-strong disabled:opacity-50"
              type="button"
              disabled={!name.trim()}
              onClick={save}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function readHtmlTitle(sourceCode: string): string {
  const document = new DOMParser().parseFromString(sourceCode, "text/html");
  return document.title.trim();
}

function AppView({ app, core, onConsoleEntry }: { app: AppRecord; core: AppLabCore; onConsoleEntry: (entry: SandboxConsoleEntry) => void }) {
  return (
    <section className="min-h-0" aria-label={app.name}>
      <SandboxFrame app={app} getAppData={core.getAppData} onConsoleEntry={onConsoleEntry} saveAppData={core.saveAppData} />
    </section>
  );
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(new Date(value));
}
