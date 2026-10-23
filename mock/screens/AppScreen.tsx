import React, { useState } from "react";
import { ArrowLeft, Check, Plus, Users } from "lucide-react";
import { IconButton } from "../components/controls";
import { AiToolsButton } from "../components/AiToolsButton";
import type { ToolAttention } from "../components/ToolSheet";
import type { SampleApp, SampleNote } from "../sampleApps";

export function AppScreen({ app, attention, motion, onBack, onTools, onUpdateNotes }: {
  app: SampleApp;
  attention?: ToolAttention;
  motion: boolean;
  onBack: () => void;
  onTools: () => void;
  onUpdateNotes: (notes: SampleNote[]) => void;
}) {
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");
  return <div className="workspace-app">
    <header className="workspace-app-header"><div className="workspace-app-toolbar">
      <IconButton label="Back to workspace" onClick={onBack}><ArrowLeft size={21} /></IconButton>
      <div className="workspace-app-identity"><strong>{app.name}</strong><span>{app.sharedBy ? <><Users size={11} />With {app.sharedBy}</> : <><span className="status-dot" />On this device</>}</span></div>
      <AiToolsButton motion={motion} onClick={onTools} aria-describedby="app-attention"
        attention={{ count: attention?.logErrors || attention?.aiReplies || 0, kind: attention?.logErrors ? "error" : "reply" }} />
      <span className="sr-only" id="app-attention">{attention?.logErrors ? "Unread log error. " : ""}{attention?.aiReplies ? "Unread AI reply." : ""}</span>
    </div></header>
    <main className={`sample-app sample-app--${app.kind}`}>
      <div className="sample-app-inner">
        <span className="sample-app-eyebrow">{app.kind === "board" ? "FRIDAY TO SUNDAY" : app.kind === "habits" ? "ONE DAY AT A TIME" : app.kind === "recipes" ? "GOOD FOOD, GOOD COMPANY" : app.kind === "plants" ? "A LITTLE MORE GREEN" : app.kind === "books" ? "ONE MORE CHAPTER" : "SOMEWHERE NEW"}</span>
        <h1>{app.title}</h1><p className="sample-app-subtitle">{app.subtitle}</p>
        <ul className="sample-app-notes">{app.notes.map((note) => <li key={note.id}>
          <button className={`sample-app-note ${note.checked ? "is-done" : ""}`} aria-label={`Mark ${note.title} ${note.checked ? "incomplete" : "complete"}`} aria-pressed={note.checked}
            onClick={() => onUpdateNotes(app.notes.map((item) => item.id === note.id ? { ...item, checked: !item.checked } : item))}>
            <span className="sample-app-check">{note.checked && <Check size={16} />}</span><span><strong>{note.title}</strong><small>{note.detail}</small></span>
          </button>
        </li>)}</ul>
        {adding ? <form className="sample-add-form" onSubmit={(event) => {
          event.preventDefault();
          if (!draft.trim()) return;
          onUpdateNotes([...app.notes, { id: crypto.randomUUID(), title: draft.trim(), detail: "Just added", checked: false }]);
          setDraft(""); setAdding(false);
        }}>
          <input aria-label="New item" placeholder="Something to add..." value={draft} onChange={(event) => setDraft(event.target.value)} autoFocus />
          <IconButton label="Add item" type="submit" disabled={!draft.trim()}><Check size={20} /></IconButton>
          <button type="button" onClick={() => { setAdding(false); setDraft(""); }}>Cancel</button>
        </form> : <button className="sample-app-add" onClick={() => setAdding(true)}><Plus size={18} />{app.kind === "board" ? "Add a plan" : "Add an item"}</button>}
      </div>
    </main>
  </div>;
}
