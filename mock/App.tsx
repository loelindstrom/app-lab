import React, { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy, Plus, Share2, Trash2 } from "lucide-react";
import { Button } from "./components/controls";
import { Sheet } from "./components/Sheet";
import { ToolSheet, type AiMode, type Tool, type ToolAttention } from "./components/ToolSheet";
import { AppScreen } from "./screens/AppScreen";
import { LauncherScreen } from "./screens/LauncherScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { createSampleApp, initialApps, type SampleApp } from "./sampleApps";
import { useAppearance } from "./theme/appearance";

function readAppId() {
  return new URLSearchParams(window.location.hash.slice(1)).get("app");
}

function navigateFromLauncher(hash: string) {
  window.location.hash = hash;
  window.history.replaceState({ appLabMockFromLauncher: true }, "", window.location.href);
}

export function MockApp() {
  const [apps, setApps] = useState(initialApps);
  const [activeId, setActiveId] = useState<string | null>(readAppId);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [initialTool, setInitialTool] = useState<Tool>("ai");
  const [attention, setAttention] = useState<Record<string, ToolAttention>>({ weekend: { logErrors: 1, aiReplies: 0 } });
  const [settingsOpen, setSettingsOpen] = useState(() => new URLSearchParams(window.location.hash.slice(1)).get("view") === "settings");
  const [createOpen, setCreateOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [optionsAppId, setOptionsAppId] = useState<string | null>(null);
  const [action, setAction] = useState<"menu" | "copy" | "delete">("menu");
  const [includeData, setIncludeData] = useState(true);
  const [motion, setMotion] = useState(true);
  const [profile, setProfile] = useState("Opinionated");
  const [toast, setToast] = useState("");
  const { preference, setPreference } = useAppearance();
  const lastTrigger = useRef<HTMLElement | null>(null);
  const pendingTool = useRef<Tool | null>(null);
  const lastOpenedApp = useRef<string | null>(null);
  const activeApp = apps.find((app) => app.id === activeId);
  const optionsApp = apps.find((app) => app.id === optionsAppId);

  useEffect(() => {
    function changed() {
      setActiveId(readAppId());
      setSettingsOpen(new URLSearchParams(window.location.hash.slice(1)).get("view") === "settings");
      setToolsOpen(pendingTool.current !== null); pendingTool.current = null;
    }
    window.addEventListener("hashchange", changed);
    return () => window.removeEventListener("hashchange", changed);
  }, []);
  useEffect(() => {
    if (activeId || settingsOpen || !lastOpenedApp.current) return;
    const id = lastOpenedApp.current;
    const frame = window.requestAnimationFrame(() => document.querySelector<HTMLButtonElement>(id === "settings" ? '[aria-label="Settings"]' : `[data-app-id="${CSS.escape(id)}"]`)?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [activeId, settingsOpen]);
  useEffect(() => { document.documentElement.dataset.motion = motion ? "on" : "off"; }, [motion]);
  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const reportAttention = useCallback((id: string, next: ToolAttention) => {
    setAttention((current) => {
      if (current[id]?.aiReplies === next.aiReplies && current[id]?.logErrors === next.logErrors) return current;
      return { ...current, [id]: next };
    });
  }, []);

  function rememberTrigger() { lastTrigger.current = document.activeElement instanceof HTMLElement ? document.activeElement : null; }
  function returnFocus() {
    if (lastTrigger.current?.isConnected) lastTrigger.current.focus();
    else document.querySelector<HTMLButtonElement>('[aria-label="Open app tools"]')?.focus();
  }
  function openApp(id: string, tool?: Tool) {
    lastOpenedApp.current = id;
    pendingTool.current = tool ?? null;
    setInitialTool(tool ?? "ai");
    setToolsOpen(false);
    navigateFromLauncher(new URLSearchParams({ app: id }).toString());
  }
  function back() {
    setToolsOpen(false);
    if (window.history.state?.appLabMockFromLauncher) window.history.back();
    else {
      const launcher = new URL(window.location.href);
      launcher.hash = "";
      window.history.replaceState(null, "", launcher.href);
      setActiveId(null); setSettingsOpen(false);
    }
  }
  function saveSource(id: string, source: string) {
    const doc = new DOMParser().parseFromString(source, "text/html");
    setApps((items) => items.map((app) => app.id !== id ? app : { ...app, source, name: doc.title.trim() || app.name, title: doc.querySelector("h1")?.textContent?.trim() || app.title }));
  }

  return <>
    {settingsOpen ? <SettingsScreen preference={preference} onPreferenceChange={setPreference} profile={profile} onProfileChange={setProfile}
      motion={motion} onMotionChange={setMotion} onBack={back} /> : activeApp ? <AppScreen key={activeApp.id} app={activeApp} attention={attention[activeApp.id]} motion={motion} onBack={back}
      onTools={() => { rememberTrigger(); setInitialTool("ai"); setToolsOpen(true); }}
      onUpdateNotes={(notes) => setApps((items) => items.map((app) => app.id === activeApp.id ? { ...app, notes } : app))} />
      : <LauncherScreen apps={apps} attention={attention} onOpenApp={openApp}
        onCreateApp={() => { rememberTrigger(); setNewName(""); setCreateOpen(true); }}
        onSettings={() => { rememberTrigger(); lastOpenedApp.current = "settings"; navigateFromLauncher("view=settings"); }}
        onAppOptions={(app) => { rememberTrigger(); setOptionsAppId(app.id); setAction("menu"); setIncludeData(true); }} />}

    {apps.map((app) => <AppSession key={app.id} app={app} open={activeId === app.id && toolsOpen} onOpenChange={setToolsOpen} initialTool={initialTool}
      motion={motion} onSave={(source) => saveSource(app.id, source)} onNotify={setToast} onAttentionChange={reportAttention} onReturnFocus={returnFocus} />)}

    <Sheet open={createOpen} onOpenChange={setCreateOpen} title="New app" onReturnFocus={returnFocus}>
      <form onSubmit={(event) => {
        event.preventDefault();
        const name = newName.trim() || "Untitled app";
        const app = createSampleApp(name, "board", profile === "Opinionated" ? ["Something worth keeping", "A little idea for later"] : []);
        app.title = name;
        setApps((items) => [...items, app]); setCreateOpen(false); openApp(app.id);
      }}>
        <div className="field-group"><label htmlFor="new-app-name">App name</label><input className="text-field" id="new-app-name" aria-describedby="new-app-name-help" placeholder="e.g. Weekend plans" value={newName} onChange={(event) => setNewName(event.target.value)} maxLength={120} />
          <p id="new-app-name-help" className="field-helper">Optional. Leave blank to let AI name your app.</p>
        </div>
        <div className="create-profile"><span>Starter</span><strong>{profile}</strong></div>
        <Button className="sheet-form-submit" type="submit"><Plus size={18} />Create app</Button>
      </form>
    </Sheet>

    <Sheet open={!!optionsApp} onOpenChange={(open) => { if (!open) setOptionsAppId(null); }} title={action === "copy" ? "Copy app" : action === "delete" ? "Delete app?" : optionsApp?.name || "App options"} onReturnFocus={returnFocus}>
      {optionsApp && (action === "menu" ? <div className="app-action-list">
        <button onClick={() => setAction("copy")}><Copy size={19} /><span>Copy app</span></button>
        <button onClick={() => { setOptionsAppId(null); openApp(optionsApp.id, "share"); }}><Share2 size={19} /><span>Share app</span></button>
        <button className="danger-action" onClick={() => setAction("delete")}><Trash2 size={19} /><span>Delete app</span></button>
      </div> : action === "copy" ? <>
        <label className="copy-data-option"><input type="checkbox" checked={includeData} onChange={(event) => setIncludeData(event.target.checked)} /><span>Include app data</span></label>
        <Button className="sheet-form-submit" onClick={() => {
          const name = `${optionsApp.name} copy`;
          const sourceDoc = new DOMParser().parseFromString(optionsApp.source, "text/html");
          sourceDoc.title = name;
          const copy = { ...createSampleApp(name, optionsApp.kind), source: `<!doctype html>\n${sourceDoc.documentElement.outerHTML}`, title: optionsApp.title, subtitle: optionsApp.subtitle, notes: includeData ? optionsApp.notes.map((note) => ({ ...note, id: crypto.randomUUID() })) : [] };
          setApps((items) => [...items, copy]); setOptionsAppId(null); setToast("App copied");
        }}><Copy size={18} />Copy app</Button>
      </> : <>
        <p className="delete-description">Delete {optionsApp.name} from this workspace?</p>
        <div className="confirm-actions"><Button variant="secondary" onClick={() => setOptionsAppId(null)}>Cancel</Button><Button className="button--danger" onClick={() => { setApps((items) => items.filter((app) => app.id !== optionsApp.id)); setOptionsAppId(null); setToast("App deleted"); }}><Trash2 size={17} />Delete</Button></div>
      </>)}
    </Sheet>
    {toast && <div className="toast" role="status"><Check size={17} />{toast}</div>}
  </>;
}

function AppSession({ app, onAttentionChange, ...props }: {
  app: SampleApp;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialTool: Tool;
  motion: boolean;
  onSave: (source: string) => void;
  onNotify: (message: string) => void;
  onReturnFocus: () => void;
  onAttentionChange: (id: string, attention: ToolAttention) => void;
}) {
  const [aiMode, setAiMode] = useState<AiMode>("external");
  const changed = useCallback((attention: ToolAttention) => onAttentionChange(app.id, attention), [app.id, onAttentionChange]);
  return <ToolSheet {...props} appId={app.id} source={app.source} appName={app.name} aiMode={aiMode} onAiModeChange={setAiMode} onAttentionChange={changed} sampleError={app.id === "weekend"} />;
}
