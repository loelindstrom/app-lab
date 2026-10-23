import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, Check, ChevronDown, CircleCheck, Code2, Copy, FlaskConical, MessageSquare, MoreHorizontal, Plus, Settings, Sparkles, Sun, Trees, Utensils } from "lucide-react";
import { Activity, Button, IconButton, Section, Switch } from "../components/controls";
import { STARTER_SOURCE, ToolSheet, type AiMode, type Tool, type ToolAttention } from "../components/ToolSheet";
import { AppearanceControl, useAppearance } from "../theme/appearance";
import { AiToolsButton } from "../components/AiToolsButton";

export function Gallery() {
  const { preference, setPreference } = useAppearance();
  const [toolsOpen, setToolsOpen] = useState(false);
  const [initialTool, setInitialTool] = useState<Tool>("ai");
  const [aiMode, setAiMode] = useState<AiMode>("external");
  const [toolAttention, setToolAttention] = useState<ToolAttention>({ logErrors: 1, aiReplies: 0 });
  const lastToolsTrigger = useRef<HTMLElement | null>(null);
  const [motion, setMotion] = useState(true);
  const [sync, setSync] = useState(false);
  const [appName, setAppName] = useState("Weekend board");
  const [profile, setProfile] = useState("Opinionated");
  const [source, setSource] = useState(STARTER_SOURCE);
  const [sampleTitle, setSampleTitle] = useState("For the weekend");
  const [toast, setToast] = useState("");
  const [notes, setNotes] = useState([
    { id: 1, title: "Dinner at ours", detail: "Friday, 19:00", icon: Utensils, color: "rose", checked: false },
    { id: 2, title: "A walk, no agenda", detail: "Saturday, whenever", icon: Trees, color: "green", checked: false },
    { id: 3, title: "Sunday slow-down", detail: "Coffee. A book. Repeat.", icon: Sun, color: "violet", checked: false },
  ]);

  useEffect(() => { document.documentElement.dataset.motion = motion ? "on" : "off"; }, [motion]);
  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  function openTools(tool: Tool = "ai") {
    lastToolsTrigger.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setInitialTool(tool);
    setToolsOpen(true);
  }

  function saveSource(nextSource: string) {
    setSource(nextSource);
    const doc = new DOMParser().parseFromString(nextSource, "text/html");
    if (doc.title.trim()) setAppName(doc.title.trim());
    const title = doc.querySelector("h1")?.textContent?.trim();
    if (title) setSampleTitle(title);
  }

  return (
    <>
      <header className="study-header">
        <div className="brand"><span className="brand-mark"><FlaskConical size={21} strokeWidth={1.8} /></span><span>App Lab<span className="brand-caption">Interface / 01</span></span></div>
        <AppearanceControl value={preference} onChange={setPreference} compact />
      </header>

      <main className="study-layout">
        <div className="preview-column">
          <Section number="01" title="App shell">
            <div className="app-preview">
              <header className="app-toolbar">
                <IconButton label="Back to workspace" onClick={() => setToast("Workspace preview comes next")}><ArrowLeft size={20} /></IconButton>
                <div className="app-identity"><strong>{appName || "Untitled app"}</strong><span><span className={`status-dot ${sync ? "status-dot--connected" : ""}`} />{sync ? "Synced just now" : "On this device"}</span></div>
                <AiToolsButton motion={motion} aria-describedby="tool-attention-summary" onClick={() => openTools()}
                  attention={{ count: toolAttention.logErrors || toolAttention.aiReplies, kind: toolAttention.logErrors ? "error" : "reply" }} />
                <span className="sr-only" id="tool-attention-summary">{toolAttention.logErrors ? `${toolAttention.logErrors} unread log error. ` : ""}{toolAttention.aiReplies ? `${toolAttention.aiReplies} unread AI reply.` : ""}</span>
              </header>
              <div className="sample-board">
                <div className="sample-meta"><span>FRIDAY TO SUNDAY</span><MoreHorizontal size={20} /></div>
                <h1>{sampleTitle}</h1>
                <p className="sample-subtitle">A few good plans. Nothing more.</p>
                <div className="sample-notes">
                  {notes.map(({ id, title, detail, icon: Icon, color, checked }) => <button className={`sample-note ${checked ? "sample-note--done" : ""}`} key={id} aria-label={`Mark ${title} ${checked ? "incomplete" : "complete"}`} aria-pressed={checked} onClick={() => setNotes((items) => items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item))}>
                    <span className={`sample-icon sample-icon--${color}`}>{checked ? <Check size={20} /> : <Icon size={20} strokeWidth={1.7} />}</span><span><strong>{title}</strong><small>{detail}</small></span><span className="note-check">{checked && <Check size={12} />}</span>
                  </button>)}
                </div>
                <button className="sample-add" onClick={() => setNotes((items) => [...items, { id: Date.now(), title: "Something spontaneous", detail: "Whenever it feels right", icon: Sparkles, color: "violet", checked: false }])}><Plus size={17} />Add a plan</button>
                <div className="sample-bottom"><span className="sample-monogram">W</span><span>A little space for the good stuff.</span></div>
              </div>
            </div>
          </Section>
          <Section number="02" title="Palette">
            <div className="palette" aria-label="Theme palette">
              {[{ name: "Canvas", token: "--canvas" }, { name: "Surface", token: "--surface" }, { name: "Ink", token: "--ink" }, { name: "Muted", token: "--muted" }, { name: "Accent", token: "--accent" }, { name: "Signal", token: "--signal" }].map(({ name, token }) => <div className="swatch" key={name}><span style={{ background: `var(${token})` }} /><small>{name}</small></div>)}
            </div>
          </Section>
        </div>

        <div className="controls-column">
          <Section number="03" title="Actions">
            <div className="type-example"><span className="eyebrow">YOUR WORKSPACE</span><h2>A place for your ideas.</h2><p>Small apps. Made yours.</p></div>
            <div className="action-examples"><Button onClick={() => openTools()}><Plus size={17} />Create app</Button><Button variant="secondary" onClick={() => { setAiMode("external"); openTools(); }}><Copy size={16} />Copy prompt</Button></div>
            <div className="icon-examples" role="group" aria-label="App actions">
              <IconButton label="Edit source" onClick={() => openTools("develop")}><Code2 size={20} /></IconButton>
              <IconButton label="Builder AI" onClick={() => { setAiMode("internal"); openTools(); }}><Sparkles size={20} /></IconButton>
              <IconButton label="App settings" onClick={() => { document.getElementById("app-name")?.focus(); }}><Settings size={20} /></IconButton>
              <IconButton label="More actions" onClick={() => openTools("share")}><MoreHorizontal size={20} /></IconButton>
              <span className="saved-indicator"><CircleCheck size={14} />Saved locally</span>
            </div>
          </Section>
          <Section number="04" title="Preferences">
            <div className="field-group"><label htmlFor="app-name">App name</label><input className="text-field" id="app-name" value={appName} onChange={(event) => setAppName(event.target.value)} /></div>
            <div className="field-group"><label htmlFor="builder-profile">Builder profile</label><div className="select-field"><select id="builder-profile" value={profile} onChange={(event) => setProfile(event.target.value)}><option>Opinionated</option><option>Minimal</option></select><ChevronDown size={16} /></div></div>
            <div className="settings-list"><Switch label="Workspace sync" detail="Keep this device up to date" checked={sync} onChange={setSync} /><Switch label="AI activity" detail="A little motion while thinking" checked={motion} onChange={setMotion} /></div>
          </Section>
          <Section number="05" title="AI activity">
            <div className="activity-example"><Activity active={motion} /><div><strong>Builder AI</strong><span>{motion ? "Thinking it through" : "Ready when you are"}<span className={`activity-dots ${motion ? "is-active" : ""}`} aria-hidden="true"><i /><i /><i /></span></span></div><span className="activity-profile">{profile}</span></div>
            <div className="conversation-example"><span className="assistant-symbol"><MessageSquare size={16} /></span><p>Something simple to start with.<br /><strong>Something you can make your own.</strong></p></div>
          </Section>
          <footer className="study-footer"><span><span className="status-dot status-dot--connected" />Local prototype</span><button onClick={() => openTools()}>App tools<ArrowUpRight size={14} /></button></footer>
        </div>
      </main>
      <ToolSheet open={toolsOpen} onOpenChange={setToolsOpen} onNotify={setToast} onSave={saveSource} source={source} motion={motion} appName={appName || "Untitled app"} initialTool={initialTool} onReturnFocus={() => lastToolsTrigger.current?.focus()} aiMode={aiMode} onAiModeChange={setAiMode} onAttentionChange={setToolAttention} />
      {toast && <div className="toast" role="status"><Check size={17} />{toast}</div>}
    </>
  );
}
