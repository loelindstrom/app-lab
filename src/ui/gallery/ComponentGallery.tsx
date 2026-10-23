import { useState } from "react";
import { ArrowLeft, ArrowUpRight, Code2, Database, FlaskConical } from "lucide-react";
import { AiToolsButton } from "../next/components/AiToolsButton";
import { Button, IconButton, Switch, Tabs } from "../next/components/controls";
import { EditAppForm } from "../next/components/EditAppForm";
import { FileEditor } from "../next/components/FileEditor";
import { SyncStatusIndicator } from "../next/components/SyncStatusIndicator";
import { ToolsPanel } from "../next/components/ToolsPanel";
import { AppearanceControl, useAppearance } from "../next/theme/appearance";
import type { LauncherApp } from "../next/types";

const SYNC_STATES = [
  { kind: "synced", label: "Synced", title: "Synced with remote storage.", tone: "good" },
  { kind: "syncing", label: "Syncing", title: "Syncing local changes to remote storage.", tone: "working" },
  { kind: "pending", label: "Queued", title: "Local changes are queued for remote sync.", tone: "working" },
  { kind: "offline", label: "Offline", title: "Local changes are saved and will sync when the browser comes back online.", tone: "neutral" },
  { kind: "problem", label: "Error", title: "Could not sync. App Lab will retry when sync wakes up.", tone: "attention" },
] as const;

const EDITOR_TABS = [{ value: "code", label: "HTML", icon: Code2 }, { value: "data", label: "JSON", icon: Database }] as const;

export function ComponentGallery() {
  const { preference, setPreference } = useAppearance({ persist: false });
  const [toolsOpen, setToolsOpen] = useState(false);
  const [motion, setMotion] = useState(true);
  const [editor, setEditor] = useState<"code" | "data">("code");
  const [source, setSource] = useState("<!doctype html>\n<html><head><title>Weekend board</title></head><body></body></html>");
  const [data, setData] = useState('{\n  "notes": []\n}');
  const [app, setApp] = useState<LauncherApp>({
    appId: "gallery", id: "gallery", kind: 0, name: "Weekend board", description: "", updatedAt: "", unavailable: false,
  });
  const [notice, setNotice] = useState("");
  const workspaceUrl = `${import.meta.env.BASE_URL}next/`;

  return <div className="component-gallery">
    <header className="gallery-header">
      <h1><FlaskConical size={24} />Components</h1>
      <AppearanceControl value={preference} onChange={setPreference} compact />
      <a className="button button--quiet" href={workspaceUrl}>Workspace<ArrowUpRight size={16} /></a>
    </header>
    <main className="gallery-sections">
      <section className="gallery-section gallery-header-example" aria-labelledby="gallery-app-header">
        <h2 id="gallery-app-header">App header</h2>
        <div className="workspace-app-toolbar">
          <IconButton label="Back to workspace" onClick={() => window.location.assign(workspaceUrl)}><ArrowLeft size={21} /></IconButton>
          <div className="workspace-app-identity"><strong>{app.name}</strong></div>
          <SyncStatusIndicator health={SYNC_STATES[0]} />
          <AiToolsButton motion={motion} onClick={() => setToolsOpen(true)} />
        </div>
      </section>
      <section className="gallery-section" aria-labelledby="gallery-sync-heading">
        <h2 id="gallery-sync-heading">Cloud sync</h2>
        <div className="gallery-sync-states" role="group" aria-label="Cloud sync states">
          {SYNC_STATES.map((health) => <div className="gallery-sync-state" key={health.kind}>
            <SyncStatusIndicator health={health} /><span>{health.label}</span>
          </div>)}
        </div>
      </section>
      <section className="gallery-section" aria-labelledby="gallery-details-heading">
        <h2 id="gallery-details-heading">App details</h2>
        <EditAppForm key={app.appId} app={app} busy={false} onSave={(input) => {
          setApp((current) => ({ ...current, name: input.name.trim(), themeColor: input.themeColor ?? undefined }));
          setNotice("Preview updated");
        }} />
        {notice && <p className="gallery-notice" role="status">{notice}</p>}
      </section>
      <section className="gallery-section" aria-labelledby="gallery-editor-heading">
        <h2 id="gallery-editor-heading">File editor</h2>
        <Tabs label="Editor format" value={editor} onChange={setEditor} items={EDITOR_TABS} idPrefix="gallery-editor" variant="underline" />
        <div className="gallery-editor" role="tabpanel" id={`gallery-editor-panel-${editor}`} aria-labelledby={`gallery-editor-tab-${editor}`}>
          <FileEditor key={editor} kind={editor} value={editor === "code" ? source : data} onChange={editor === "code" ? setSource : setData} />
        </div>
      </section>
      <section className="gallery-section" aria-labelledby="gallery-appearance-heading">
        <h2 id="gallery-appearance-heading">Appearance</h2>
        <AppearanceControl value={preference} onChange={setPreference} />
        <Switch label="AI animation" checked={motion} onChange={setMotion} />
      </section>
    </main>
    <ToolsPanel open={toolsOpen} onOpenChange={setToolsOpen} appName={app.name}>
      <div className="gallery-panel-editor"><FileEditor kind="code" label="Panel source (HTML)" value={source} onChange={setSource} /></div>
      <footer className="sheet-footer"><Button variant="secondary" onClick={() => setToolsOpen(false)}>Close preview</Button></footer>
    </ToolsPanel>
  </div>;
}
