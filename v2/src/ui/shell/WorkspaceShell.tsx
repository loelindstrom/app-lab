import { useEffect, useMemo, useState } from "react";
import type { AppLabCore, AppRecord, AppSummary } from "../../core/types";
import { SandboxFrame } from "../../runtime/SandboxFrame";
import { BuilderPanel } from "../builder/BuilderPanel";
import { SettingsDialog } from "../dialogs/SettingsDialog";
import { SourceDialog } from "../dialogs/SourceDialog";

type WorkspaceMode = "launcher" | "app";

interface WorkspaceShellProps {
  core: AppLabCore;
}

export function WorkspaceShell({ core }: WorkspaceShellProps) {
  const [apps, setApps] = useState<AppSummary[]>([]);
  const [activeApp, setActiveApp] = useState<AppRecord | null>(null);
  const [mode, setMode] = useState<WorkspaceMode>("launcher");
  const [builderOpen, setBuilderOpen] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

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
    setBuilderOpen(false);
    setSourceOpen(false);
  }

  async function createApp() {
    const app = await core.createBlankApp();
    await refreshApps();
    setActiveApp(app);
    setMode("app");
    setBuilderOpen(true);
  }

  function openLauncher() {
    setMode("launcher");
    setBuilderOpen(false);
    setSourceOpen(false);
  }

  const title = useMemo(() => {
    if (mode === "launcher") return "Apps";
    return activeApp?.name ?? "App";
  }, [activeApp?.name, mode]);

  return (
    <div className={`grid min-h-[100svh] grid-rows-[44px_minmax(0,1fr)] ${builderOpen ? "lg:mr-[min(420px,36vw)]" : ""}`}>
      <header className="grid grid-cols-[120px_minmax(0,1fr)_auto] items-center gap-2 border-b border-app-line bg-app-surface/85 px-2">
        <button
          className="min-h-9 justify-self-start rounded-md border border-transparent bg-transparent px-3 font-bold text-app-accent hover:bg-app-accent/10"
          type="button"
          onClick={openLauncher}
        >
          {mode === "launcher" ? "Apps" : "‹ Apps"}
        </button>
        <h1 className="truncate text-center text-[17px] font-extrabold">{title}</h1>
        <nav className="flex gap-2" aria-label="Workspace actions">
          <button className="min-h-9 rounded-md border border-app-accent bg-app-accent px-4 font-bold text-white hover:bg-app-strong" type="button" onClick={createApp}>
            New
          </button>
          <button className="hidden min-h-9 rounded-md border border-app-accent bg-app-accent px-4 font-bold text-white hover:bg-app-strong sm:block" type="button" onClick={() => setSettingsOpen(true)}>
            Settings
          </button>
        </nav>
      </header>

      <main className="min-h-0">
        {mode === "launcher" ? (
          <LauncherView apps={apps} onCreateApp={createApp} onOpenApp={openApp} />
        ) : activeApp ? (
          <AppView app={activeApp} />
        ) : null}
      </main>

      {mode === "app" && activeApp ? (
        <>
          <button
            className="fixed bottom-6 right-6 z-10 hidden min-h-9 rounded-md border border-app-accent bg-app-accent px-4 font-bold text-white shadow-panel hover:bg-app-strong lg:block"
            type="button"
            onClick={() => setBuilderOpen(true)}
          >
            BuilderAI
          </button>
          <footer className="sticky bottom-0 z-10 flex h-10 items-center justify-end gap-2 border-t border-app-line bg-app-surface/90 px-2 lg:hidden">
            <button className="min-h-8 rounded-md border border-app-accent bg-app-accent px-3 font-bold text-white hover:bg-app-strong" type="button" onClick={() => setSourceOpen(true)}>
              Source
            </button>
            <button className="min-h-8 rounded-md border border-app-accent bg-app-accent px-3 font-bold text-white hover:bg-app-strong" type="button" onClick={() => setBuilderOpen(true)}>
              BuilderAI
            </button>
          </footer>
          <BuilderPanel activeAppName={activeApp.name} isOpen={builderOpen} onClose={() => setBuilderOpen(false)} />
          <SourceDialog app={activeApp} isOpen={sourceOpen} onClose={() => setSourceOpen(false)} />
        </>
      ) : null}

      <SettingsDialog isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}

interface LauncherViewProps {
  apps: AppSummary[];
  onCreateApp: () => void;
  onOpenApp: (appId: string) => void;
}

function LauncherView({ apps, onCreateApp, onOpenApp }: LauncherViewProps) {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-7" aria-label="Apps">
      <div className="mb-5 flex items-end justify-between gap-5">
        <div>
          <p className="mb-1 text-xs font-extrabold uppercase text-app-muted">Workspace</p>
          <h2 className="text-[clamp(24px,4vw,38px)] font-extrabold leading-none">Choose an app</h2>
        </div>
        <button className="min-h-9 rounded-md border border-app-accent bg-app-accent px-4 font-bold text-white hover:bg-app-strong" type="button" onClick={onCreateApp}>
          New app
        </button>
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
