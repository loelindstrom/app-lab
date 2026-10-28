import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Archive, ArchiveRestore, ArrowLeft, Check, Copy, Pencil, Plus, RotateCw, Share2, Trash2, X } from "lucide-react";
import { SandboxFrame } from "../../runtime";
import { InviteImportDialog } from "../dialogs/InviteImportDialog";
import { useWorkspace, type WorkspaceServices } from "./useWorkspace";
import { WorkspaceSettings } from "./WorkspaceSettings";
import { AiToolsButton } from "../components/AiToolsButton";
import { SyncStatusIndicator } from "../components/SyncStatusIndicator";
import { EditAppForm } from "../components/EditAppForm";
import { Button, IconButton } from "../components/controls";
import { Sheet } from "../components/Sheet";
import { ToolSheet, type Tool, type ToolView } from "../components/ToolSheet";
import { LauncherScreen } from "../screens/LauncherScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { useAppearance } from "../theme/appearance";
import type { LauncherApp, ToolAttention } from "../types";

const NO_ATTENTION: ToolAttention = { aiReplies: 0, logErrors: 0 };

export function WorkspaceShell(services: WorkspaceServices) {
  const workspace = useWorkspace(services);
  const [hash, setHash] = useState(window.location.hash);
  const route = useMemo(() => new URLSearchParams(hash.slice(1)), [hash]);
  const appId = route.get("app");
  const settingsOpen = route.get("view") === "settings";
  const [toolsOpen, setToolsOpen] = useState(false);
  const [initialTool, setInitialTool] = useState<Tool>("ai");
  const [view, setView] = useState<ToolView | null>(null);
  const [attention, setAttention] = useState<Record<string, ToolAttention>>({});
  const [createOpen, setCreateOpen] = useState(false);
  const [launcherView, setLauncherView] = useState<"active" | "archived">("active");
  const [name, setName] = useState("");
  const [optionsAppId, setOptionsAppId] = useState<string | null>(null);
  const [action, setAction] = useState<"menu" | "edit" | "copy" | "delete">("menu");
  const [includeData, setIncludeData] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [motion, setMotion] = useState(() => {
    try { return localStorage.getItem("app-lab-next-motion") !== "off"; } catch { return true; }
  });
  const { preference, setPreference } = useAppearance();
  const current = useRef(workspace);
  current.current = workspace;
  const seen = useRef(new Set<string>());
  const focusTarget = useRef<HTMLElement | null>(null);
  const pendingTool = useRef<Tool | null>(null);
  const activeApp = workspace.activeApp;
  const optionsApp = workspace.apps.find((app) => app.appId === optionsAppId);
  const activeAttention = activeApp ? attention[activeApp.appId] ?? NO_ATTENTION : NO_ATTENTION;
  const apps: LauncherApp[] = workspace.apps.map((app) => ({
    ...app, id: app.appId,
    archived: workspace.appArchiveStates[app.appId]?.archived ?? false,
    kind: Array.from(app.appId).reduce((sum, char) => sum + char.charCodeAt(0), 0) % 6,
    relationship: workspace.syncBadges[app.appId]?.kind === "local-only" ? undefined : workspace.syncBadges[app.appId]?.label,
    unavailable: workspace.syncBadges[app.appId]?.kind === "needs-attention",
  }));
  useEffect(() => {
    const changed = () => setHash(window.location.hash);
    window.addEventListener("hashchange", changed);
    return () => window.removeEventListener("hashchange", changed);
  }, []);
  useEffect(() => {
    setToolsOpen(!!pendingTool.current); pendingTool.current = null;
    if (appId) void current.current.openApp(appId).catch((error) => setToast(error instanceof Error ? error.message : "Could not open app."));
    else current.current.openLauncher();
  }, [appId]);
  useEffect(() => {
    document.documentElement.dataset.motion = motion ? "on" : "off";
    try { localStorage.setItem("app-lab-next-motion", motion ? "on" : "off"); } catch { /* Appearance remains usable without storage. */ }
  }, [motion]);
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 3000);
    return () => window.clearTimeout(timer);
  }, [toast]);
  useEffect(() => {
    const visible = toolsOpen && !settingsOpen ? view : null;
    const additions: Record<string, ToolAttention> = {};
    function add(id: string, kind: keyof ToolAttention, messageId: string) {
      if (seen.current.has(messageId)) return;
      seen.current.add(messageId);
      if (id === appId && visible === (kind === "logErrors" ? "log" : "internal")) return;
      additions[id] ??= { ...NO_ATTENTION };
      additions[id][kind] += 1;
    }
    for (const [id, session] of Object.entries(workspace.builderSessions)) {
      for (const message of session.messages) if (message.role === "assistant") add(id, "aiReplies", message.messageId);
    }
    if (activeApp) for (const entry of workspace.consoleEntries) if (entry.level === "error") add(activeApp.appId, "logErrors", entry.id);
    setAttention((previous) => {
      const next = { ...previous };
      for (const [id, added] of Object.entries(additions)) {
        const old = next[id] ?? NO_ATTENTION;
        next[id] = { aiReplies: old.aiReplies + added.aiReplies, logErrors: old.logErrors + added.logErrors };
      }
      if (appId && (visible === "log" || visible === "internal")) {
        const old = next[appId] ?? NO_ATTENTION;
        next[appId] = { ...old, [visible === "log" ? "logErrors" : "aiReplies"]: 0 };
      }
      return next;
    });
  }, [workspace.builderSessions, workspace.consoleEntries, activeApp?.appId, appId, toolsOpen, settingsOpen, view]);
  const onViewChange = useCallback((next: ToolView | null) => setView(next), []);
  function rememberFocus() {
    setToast("");
    focusTarget.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  }
  function restoreFocus() {
    if (focusTarget.current?.isConnected) focusTarget.current.focus();
    else document.querySelector<HTMLButtonElement>('.launcher-view [role="tab"][aria-selected="true"]')?.focus();
  }
  function navigate(params: URLSearchParams) {
    const url = new URL(window.location.href);
    url.hash = params.toString();
    window.history.pushState(null, "", url.href);
    setHash(url.hash);
  }
  function openApp(id: string, tool?: Tool) {
    rememberFocus();
    setInitialTool(tool ?? "ai");
    if (appId === id) { setToolsOpen(!!tool); return; }
    pendingTool.current = tool ?? null;
    navigate(new URLSearchParams({ app: id }));
  }
  function back() {
    if (!settingsOpen) setToolsOpen(false);
    // Frame reloads have their own history entries; the shell back arrow is an explicit destination.
    const params = new URLSearchParams(window.location.hash.slice(1));
    if (settingsOpen) params.delete("view"); else params.delete("app");
    navigate(params);
    window.setTimeout(restoreFocus, 0);
  }
  function openSettings(section?: "ai" | "storage") {
    // Settings hides the panel without discarding its selected view or drafts.
    if (toolsOpen && view) setInitialTool(view === "share" ? "share" : view === "external" || view === "internal" ? "ai" : "develop");
    workspace.setSettingsInitialSection(section);
    workspace.setSettingsInitialAiTab("connection");
    const params = new URLSearchParams(appId ? { app: appId } : {}); params.set("view", "settings"); navigate(params);
  }
  async function perform(task: () => Promise<unknown>, success?: string) {
    if (busy) return;
    setBusy(true); setError("");
    try { await task(); if (success) setToast(success); }
    catch (error) { setError(error instanceof Error ? error.message : "Could not complete the action."); }
    finally { setBusy(false); }
  }
  const health = activeApp ? workspace.syncHealth[activeApp.appId] : null;
  return <>
    <div hidden={settingsOpen}>
      {appId && activeApp?.appId === appId && workspace.mode === "app" ? <div className="workspace-app" key={appId}>
        <header className="workspace-app-header"><div className="workspace-app-toolbar">
          <IconButton label="Back to workspace" onClick={back}><ArrowLeft size={21} /></IconButton>
          <div className="workspace-app-identity"><strong>{activeApp.name}</strong></div>
          {health && <SyncStatusIndicator health={health} />}
          <AiToolsButton motion={motion} attention={{ count: activeAttention.logErrors || activeAttention.aiReplies, kind: activeAttention.logErrors ? "error" : "reply" }} onClick={() => { setInitialTool("ai"); setToolsOpen(true); }} />
        </div></header>
        <main className="live-runtime">
          <SandboxFrame app={activeApp} getAppData={services.core.getAppData} saveAppData={workspace.saveAppData}
            reloadKey={workspace.sandboxReloadKey} remoteDataChange={workspace.remoteDataChange}
            onConsoleEntry={(entry) => workspace.setConsoleEntries((entries) => [...entries.slice(-199), entry])}
            onUnhandledRemoteDataChange={() => workspace.setSyncStatus("Remote data changed. Reload this app to see it.")} />
        </main>
      </div> : <LauncherScreen apps={apps} attention={attention} view={launcherView} onViewChange={setLauncherView} onOpenApp={openApp}
        onCreateApp={() => { rememberFocus(); setName(""); setError(""); setCreateOpen(true); }} onSettings={() => { rememberFocus(); openSettings(); }}
        onAppOptions={(app) => { rememberFocus(); setOptionsAppId(app.id); setAction("menu"); setIncludeData(true); setError(""); }} />}
      {workspace.syncStatus && <div className="live-notice" role="status"><span>{workspace.syncStatus}</span>
        {appId && <IconButton label="Reload app" onClick={() => { workspace.setSandboxReloadKey((key) => key + 1); workspace.setSyncStatus(null); }}><RotateCw size={17} /></IconButton>}
        <IconButton label="Dismiss notice" onClick={() => workspace.setSyncStatus(null)}><X size={17} /></IconButton>
      </div>}
    </div>
    {settingsOpen && <SettingsScreen preference={preference} onPreferenceChange={setPreference} motion={motion} onMotionChange={setMotion}
      initialSection={workspace.settingsInitialSection}
      returnToApp={Boolean(appId && toolsOpen)}
      onBack={back} renderSection={(section) => <WorkspaceSettings key={section} embedded workspace={{ ...workspace, settingsOpen: true, settingsInitialSection: section }} />} />}
    {activeApp && <ToolSheet key={activeApp.appId} workspace={workspace} open={toolsOpen && !settingsOpen && workspace.mode === "app"} onOpenChange={setToolsOpen}
      initialTool={initialTool} motion={motion} attention={activeAttention} onViewChange={onViewChange} onNotify={setToast} onSettings={openSettings} />}
    <Sheet open={createOpen} onOpenChange={(open) => { if (!busy) setCreateOpen(open); }} title="New app" onReturnFocus={restoreFocus}>
      <form onSubmit={(event) => {
        event.preventDefault();
        void perform(async () => {
          const app = await workspace.createApp(name.trim() || "Untitled app");
          setLauncherView("active");
          setCreateOpen(false); openApp(app.appId);
        });
      }}>
        <div className="field-group"><label htmlFor="new-app-name">App name</label>
          <input className="text-field" id="new-app-name" aria-describedby="new-app-name-help" placeholder="e.g. Weekend plans" value={name} onChange={(event) => setName(event.target.value)} maxLength={120} />
          <p id="new-app-name-help" className="field-helper">Optional. AI can name your app when you edit it.</p>
        </div>
        <div className="create-profile"><span>Starter</span><strong>{workspace.activeBuilderProfile?.name || "Minimal"}</strong></div>
        {error && <p className="editor-error" role="alert">{error}</p>}
        <Button className="sheet-form-submit" type="submit" disabled={busy}><Plus size={18} />{busy ? "Creating..." : "Create app"}</Button>
      </form>
    </Sheet>
    <Sheet open={!!optionsApp} onOpenChange={(open) => { if (!busy && !open) setOptionsAppId(null); }} title={action === "edit" ? "Edit app details" : action === "copy" ? "Copy app" : action === "delete" ? "Delete app?" : optionsApp?.name || "App options"} onReturnFocus={restoreFocus}>
      {optionsApp && (action === "menu" ? <div className="app-action-list">
        <button type="button" disabled={workspace.syncBadges[optionsApp.appId]?.kind === "needs-attention"} onClick={() => setAction("edit")}><Pencil size={19} /><span>Edit app details</span></button>
        <button type="button" onClick={() => setAction("copy")}><Copy size={19} /><span>Copy app</span></button>
        <button type="button" disabled={workspace.syncBadges[optionsApp.appId]?.kind === "needs-attention"} onClick={() => { setOptionsAppId(null); openApp(optionsApp.appId, "share"); }}><Share2 size={19} /><span>Share app</span></button>
        <button type="button" disabled={busy} onClick={() => {
          const archived = workspace.appArchiveStates[optionsApp.appId]?.archived ?? false;
          void perform(async () => { await workspace.setAppArchived(optionsApp.appId, !archived); setOptionsAppId(null); }, archived ? "App unarchived" : "App archived");
        }}>{workspace.appArchiveStates[optionsApp.appId]?.archived ? <ArchiveRestore size={19} /> : <Archive size={19} />}<span>{workspace.appArchiveStates[optionsApp.appId]?.archived ? "Unarchive app" : "Archive app"}</span></button>
        <button type="button" className="danger-action" onClick={() => setAction("delete")}><Trash2 size={19} /><span>Delete app</span></button>
      </div> : action === "edit" ? <EditAppForm key={optionsApp.appId} app={apps.find((app) => app.appId === optionsApp.appId)!} busy={busy}
        onSave={(input) => void perform(async () => { await workspace.updateAppDetails(optionsApp.appId, input); setOptionsAppId(null); }, "App updated")} /> : action === "copy" ? <>
        <label className="copy-data-option"><input type="checkbox" checked={includeData} onChange={(event) => setIncludeData(event.target.checked)} /><span>Include app data</span></label>
        <Button className="sheet-form-submit" disabled={busy} onClick={() => void perform(async () => { await workspace.copyApp(optionsApp.appId, includeData); setLauncherView("active"); setOptionsAppId(null); }, "App copied")}><Copy size={18} />{busy ? "Copying..." : "Copy app"}</Button>
      </> : <>
        <p className="delete-description">Delete {optionsApp.name} from this workspace?{["backed-up", "shared-by-me"].includes(workspace.syncBadges[optionsApp.appId]?.kind) ? " Its cloud backup will also be deleted." : ""}</p>
        <div className="confirm-actions"><Button variant="secondary" disabled={busy} onClick={() => setOptionsAppId(null)}>Cancel</Button>
          <Button className="button--danger" disabled={busy} onClick={() => void perform(async () => { await workspace.deleteApp(optionsApp.appId); setOptionsAppId(null); }, "App deleted")}><Trash2 size={17} />{busy ? "Deleting..." : "Delete"}</Button></div>
      </>)}
      {error && <p className="editor-error" role="alert">{error}</p>}
    </Sheet>
    <InviteImportDialog invite={workspace.pendingInvite} onPreview={services.syncActions.previewInvite}
      onClose={() => { workspace.setPendingInvite(null); window.history.replaceState(null, "", window.location.pathname + window.location.search); setHash(""); }}
      onImport={async (invite) => {
        await services.syncActions.importInvite(invite); await workspace.refreshApps(); workspace.setPendingInvite(null);
        window.history.replaceState(null, "", window.location.pathname + window.location.search); setHash("");
      }} />
    {toast && <div className="toast" role="status"><Check size={17} />{toast}</div>}
  </>;
}
