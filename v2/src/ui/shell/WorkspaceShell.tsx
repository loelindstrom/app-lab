import { useEffect, useMemo, useState } from "react";
import type { AppLabCore, AppRecord, AppSummary } from "../../core/types";
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
  const [aiAttentionKey, setAiAttentionKey] = useState(0);
  const [aiAttentionDismissed, setAiAttentionDismissed] = useState(true);

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
    setAiAttentionKey((key) => key + 1);
    setAiAttentionDismissed(false);
  }

  async function createApp() {
    const app = await core.createBlankApp();
    await refreshApps();
    setActiveApp(app);
    setMode("app");
    setActiveTool(null);
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
    <div className="grid min-h-[calc(100dvh+1px)] grid-rows-[44px_minmax(0,1fr)_auto] overflow-x-hidden">
      <header className="grid grid-cols-[88px_minmax(0,1fr)_88px] items-center border-b border-app-line bg-app-panel/90 px-2 lg:grid-cols-[1fr_auto_1fr]">
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
        <nav className="flex items-center justify-end gap-3" aria-label="Workspace actions">
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
                onToggleTool={toggleTool}
              />
            </div>
          ) : null}
        </nav>
      </header>

      <main className={`min-h-0 overflow-hidden ${activeTool ? "lg:mr-[min(420px,36vw)]" : ""}`}>
        {mode === "launcher" ? (
          <LauncherView apps={apps} onOpenApp={openApp} />
        ) : activeApp ? (
          <AppView app={activeApp} />
        ) : null}
      </main>

      {mode === "app" && activeApp ? (
        <>
          <footer className="sticky bottom-0 z-30 flex h-11 shrink-0 items-center justify-end border-t border-app-line bg-app-panel/95 px-3 lg:hidden">
            <ToolSwitch
              activeTool={activeTool}
              aiAttentionDismissed={aiAttentionDismissed}
              aiAttentionKey={aiAttentionKey}
              onToggleTool={toggleTool}
            />
          </footer>
          <WorkspaceToolPanel activeApp={activeApp} mode={activeTool} onClose={() => setActiveTool(null)} />
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
    </div>
  );
}

interface LauncherViewProps {
  apps: AppSummary[];
  onOpenApp: (appId: string) => void;
}

interface ToolSwitchProps {
  activeTool: ToolPanelMode | null;
  aiAttentionDismissed: boolean;
  aiAttentionKey: number;
  onToggleTool: (tool: ToolPanelMode) => void;
}

function ToolSwitch({ activeTool, aiAttentionDismissed, aiAttentionKey, onToggleTool }: ToolSwitchProps) {
  const showAiAttention = !aiAttentionDismissed && activeTool !== "builder";

  return (
    <div className="flex h-9 items-stretch gap-1 rounded-lg border border-app-line bg-white/90 p-1" role="group" aria-label="App tools">
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

function LauncherView({ apps, onOpenApp }: LauncherViewProps) {
  return (
    <section className="mx-auto h-full w-full max-w-5xl overflow-auto px-4 py-7 pb-24" aria-label="Apps">
      <div className="mb-5 flex items-end justify-between gap-5">
        <div>
          <p className="mb-1 text-xs font-extrabold uppercase text-app-muted">Workspace</p>
          <h2 className="text-[clamp(24px,4vw,38px)] font-extrabold leading-none">Choose an app</h2>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3">
        {apps.map((app) => (
          <button
            className="grid min-h-28 content-start gap-2 rounded-lg border border-app-line bg-app-surface/95 p-4 text-left text-app-ink shadow-[0_10px_30px_rgb(46_38_24_/_8%)] hover:bg-white"
            key={app.appId}
            type="button"
            onClick={() => onOpenApp(app.appId)}
          >
            <strong className="text-lg">{app.name}</strong>
            <span className="text-sm leading-snug text-app-muted">{app.description}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function AppView({ app }: { app: AppRecord }) {
  return (
    <section className="min-h-0" aria-label={app.name}>
      <SandboxFrame app={app} />
    </section>
  );
}
