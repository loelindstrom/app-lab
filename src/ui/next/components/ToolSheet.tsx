import { useEffect, useRef, useState } from "react";
import { Check, Code2, Copy, Database, ExternalLink, MessageSquare, Share2, Sparkles, Terminal, Trash2 } from "lucide-react";
import { createPromptWithCode } from "../../../ai";
import type { WorkspaceController } from "../../shell/useWorkspace";
import type { ToolAttention } from "../types";
import { Button, IconButton, Tabs } from "./controls";
import { BuilderChat } from "./BuilderChat";
import { ConsoleView, formatConsoleEntries } from "./ConsoleView";
import { ExternalWorkflow, type CopyStatus } from "./ExternalWorkflow";
import { FileEditor } from "./FileEditor";
import { SharePanel } from "./SharePanel";
import { ToolsPanel } from "./ToolsPanel";

export type Tool = "ai" | "develop" | "share";
export type ToolView = "external" | "internal" | "code" | "data" | "log" | "share";

export function ToolSheet({ workspace, open, onOpenChange, initialTool, motion, attention, onViewChange, onNotify, onSettings }: {
  workspace: WorkspaceController;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialTool: Tool;
  motion: boolean;
  attention: ToolAttention;
  onViewChange: (view: ToolView | null) => void;
  onNotify: (message: string) => void;
  onSettings: (section: "ai" | "storage") => void;
}) {
  const app = workspace.activeApp!;
  const [tool, setTool] = useState<Tool>(initialTool);
  const [aiMode, setAiMode] = useState<"external" | "internal">("external");
  const [developView, setDevelopView] = useState<"code" | "data" | "log">("code");
  const [draft, setDraft] = useState(app.sourceCode);
  const [baseSource, setBaseSource] = useState(app.sourceCode);
  const [prompt, setPrompt] = useState("");
  const [chatDraft, setChatDraft] = useState("");
  const [reply, setReply] = useState("");
  const [data, setData] = useState("");
  const [dataDirty, setDataDirty] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
  const [fallbackPrompt, setFallbackPrompt] = useState("");
  const [logCopyStatus, setLogCopyStatus] = useState<CopyStatus>("idle");
  const view = tool === "ai" ? aiMode : tool === "develop" ? developView : "share";
  const saving = useRef(false);
  const mounted = useRef(true);
  const visibleView = useRef<ToolView | null>(null);
  visibleView.current = open ? view : null;
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);
  useEffect(() => { if (open) { setTool(initialTool); } }, [open, initialTool]);
  useEffect(() => { onViewChange(open ? view : null); }, [open, view, onViewChange]);
  useEffect(() => {
    if (app.sourceCode === baseSource) return;
    if (draft === baseSource) setDraft(app.sourceCode);
    setBaseSource(app.sourceCode);
  }, [app.sourceCode, baseSource, draft]);
  useEffect(() => { setError(""); }, [view]);
  useEffect(() => {
    if (!open || view !== "data" || dataDirty) return;
    let cancelled = false;
    setDataLoading(true);
    void workspace.core.getAppData(app.appId).then((value) => {
      if (!cancelled) setData(JSON.stringify(value, null, 2));
    }).catch((error) => { if (!cancelled) setError(error instanceof Error ? error.message : "Could not load data."); })
      .finally(() => { if (!cancelled) setDataLoading(false); });
    return () => { cancelled = true; };
  }, [app.appId, workspace.core, open, view, dataDirty]);
  async function copyPrompt() {
    const text = `${createPromptWithCode(app.name, app.sourceCode)}\nRequested change:\n${prompt}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("copied");
    } catch { setFallbackPrompt(text); setCopyStatus("error"); }
  }
  async function apply(kind: "source" | "data", value: string) {
    if (saving.current) return;
    saving.current = true; setBusy(true); setError("");
    try {
      if (kind === "source") {
        const saved = await workspace.saveAppSource(app.appId, value);
        if (!mounted.current) return;
        setDraft(saved.sourceCode); setBaseSource(saved.sourceCode); setReply("");
        setCopyStatus("idle"); setFallbackPrompt("");
      } else {
        await workspace.importAppData(app.appId, JSON.parse(value));
        if (!mounted.current) return;
        setDataDirty(false);
      }
      onNotify(kind === "source" ? "App updated" : "App data imported");
      if (visibleView.current === view) onOpenChange(false);
    } catch (error) { if (mounted.current) setError(error instanceof Error ? error.message : "Could not save changes."); }
    finally { saving.current = false; if (mounted.current) setBusy(false); }
  }
  async function copyLog() {
    try { await navigator.clipboard.writeText(formatConsoleEntries(workspace.consoleEntries)); setLogCopyStatus("copied"); }
    catch { setLogCopyStatus("error"); }
  }
  const tabs = [
    { value: "ai", label: "AI", icon: Sparkles, attention: { count: attention.aiReplies, kind: "reply" as const } },
    { value: "develop", label: "Develop", icon: Code2, attention: { count: attention.logErrors, kind: "error" as const } },
    { value: "share", label: "Share", icon: Share2 },
  ] as const;
  const aiTabs = [
    { value: "external", label: "External", icon: ExternalLink },
    { value: "internal", label: "Chat", icon: MessageSquare, attention: { count: attention.aiReplies, kind: "reply" as const } },
  ] as const;
  const developTabs = [
    { value: "code", label: "Code", icon: Code2 }, { value: "data", label: "Data", icon: Database },
    { value: "log", label: "Log", icon: Terminal, attention: { count: attention.logErrors, kind: "error" as const } },
  ] as const;
  const subPrefix = tool === "ai" ? "ai-modes" : "develop";
  return <ToolsPanel open={open} onOpenChange={onOpenChange} appName={app.name}>
    <div className="sheet-tabs"><Tabs label="App tools" value={tool} onChange={setTool} items={tabs} idPrefix="tools" /></div>
    <div role="tabpanel" id={`tools-panel-${tool}`} aria-labelledby={`tools-tab-${tool}`} className="sheet-workspace">
      {tool === "ai" && <Tabs label="AI workflow" value={aiMode} onChange={setAiMode} items={aiTabs} idPrefix="ai-modes" variant="underline" />}
      {tool === "develop" && <Tabs label="Develop views" value={developView} onChange={setDevelopView} items={developTabs} idPrefix="develop" variant="underline" />}
      <div className={`sheet-scroll ${view === "internal" ? "sheet-scroll--chat" : ""}`} data-vaul-no-drag>
        <div role={tool === "share" ? undefined : "tabpanel"} id={tool === "share" ? undefined : `${subPrefix}-panel-${view}`}
          aria-labelledby={tool === "share" ? undefined : `${subPrefix}-tab-${view}`}
          className={`tool-panel ${view === "code" || view === "data" ? "tool-panel--code" : ""}`}>
          {view === "external" && <ExternalWorkflow prompt={prompt} onPromptChange={(value) => { setPrompt(value); setCopyStatus("idle"); }} onCopy={() => void copyPrompt()}
            copyStatus={copyStatus} fallbackPrompt={fallbackPrompt} reply={reply} onReplyChange={setReply} disabled={busy} />}
          {view === "internal" && <BuilderChat workspace={workspace} motion={motion} draft={chatDraft} onDraftChange={setChatDraft} onSettings={() => onSettings("ai")} />}
          {view === "code" && <FileEditor kind="code" value={draft} onChange={setDraft} disabled={busy} />}
          {view === "data" && (dataLoading ? <p role="status">Loading data...</p> : <FileEditor kind="data" value={data} disabled={busy} onChange={(value) => { setData(value); setDataDirty(true); }} />)}
          {view === "log" && <ConsoleView entries={workspace.consoleEntries} />}
          {view === "share" && <SharePanel workspace={workspace} onSettings={() => onSettings("storage")} />}
          {view === "log" && logCopyStatus === "error" && <p className="editor-error" role="alert">Couldn't copy. Select the log text to copy it.</p>}
        </div>
      </div>
      {error && <p className="editor-error sheet-error" role="alert">{error}</p>}
      {view !== "internal" && view !== "share" && <footer className="sheet-footer" data-mode={tool === "ai" ? aiMode : tool}>
        {view === "external" && <Button disabled={busy || !reply.trim()} onClick={() => void apply("source", reply)}><Check size={17} />{busy ? "Saving..." : "Apply code"}</Button>}
        {view === "code" && <Button disabled={busy || !draft.trim()} onClick={() => void apply("source", draft)}><Check size={17} />{busy ? "Saving..." : "Apply changes"}</Button>}
        {view === "data" && <Button disabled={busy || dataLoading || !data.trim()} onClick={() => void apply("data", data)}><Check size={17} />{busy ? "Saving..." : "Apply data"}</Button>}
        {view === "log" && <>
          <Button variant="secondary" disabled={!workspace.consoleEntries.length} onClick={() => void copyLog()}>{logCopyStatus === "copied" ? <Check size={17} /> : <Copy size={17} />}{logCopyStatus === "copied" ? "Copied" : "Copy log"}</Button>
          <IconButton label="Clear console" disabled={!workspace.consoleEntries.length} onClick={() => { workspace.setConsoleEntries([]); setLogCopyStatus("idle"); }}><Trash2 size={18} /></IconButton>
        </>}
      </footer>}
    </div>
  </ToolsPanel>;
}
