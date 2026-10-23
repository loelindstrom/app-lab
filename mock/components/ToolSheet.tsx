import React, { useEffect, useRef, useState } from "react";
import { ArrowUp, Check, Code2, Copy, Database, ExternalLink, Maximize2, MessageSquare, Minimize2, Share2, Sparkles, Terminal, Trash2, X } from "lucide-react";
import { Drawer } from "vaul";
import * as Dialog from "@radix-ui/react-dialog";
import { Activity, Button, IconButton, Tabs } from "./controls";
import { FileEditor } from "./FileEditor";
import { ExternalWorkflow, type CopyStatus } from "./ExternalWorkflow";
import { ConsoleView, formatConsoleEntries, type ConsoleEntry } from "./ConsoleView";

const TOOL_TABS = [
  { value: "ai", label: "AI", icon: Sparkles },
  { value: "develop", label: "Develop", icon: Code2 },
  { value: "share", label: "Share", icon: Share2 },
] as const;
export type Tool = typeof TOOL_TABS[number]["value"];
export type AiMode = "external" | "internal";
type DevelopView = "code" | "data" | "log";

export interface ToolAttention {
  logErrors: number;
  aiReplies: number;
}

function sampleConsoleEntries(withError: boolean): ConsoleEntry[] {
  const now = Date.now();
  const entries: ConsoleEntry[] = [
    { id: "initialized", level: "info", args: ["[App] Initialized"], timestamp: new Date(now - 80).toISOString() },
    { id: "data", level: "log", args: ['Loaded data:', '{"notes":3}'], timestamp: new Date(now - 60).toISOString() },
    { id: "warning", level: "warn", args: ["No saved theme found; using the default."], timestamp: new Date(now - 40).toISOString() },
  ];
  if (withError) entries.push({ id: "error", level: "error", args: ["ReferenceError: selectedNote is not defined", "\n    at toggleNote (app.html:27:18)\n    at HTMLButtonElement.onclick (app.html:48:9)"], timestamp: new Date(now).toISOString() });
  return entries;
}

interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
}

export const STARTER_SOURCE = `<!doctype html>
<html lang="en">
  <head>
    <title>Weekend board</title>
  </head>
  <body>
    <h1>For the weekend</h1>
    <p>A few good plans. Nothing more.</p>
  </body>
</html>`;

export function ToolSheet({ open, onOpenChange, onNotify, onSave, source, motion, appName, initialTool, onReturnFocus, aiMode, onAiModeChange, onAttentionChange, sampleError = true, appId = "weekend" }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNotify: (message: string) => void;
  onSave: (source: string) => void;
  source: string;
  motion: boolean;
  appName: string;
  initialTool: Tool;
  onReturnFocus: () => void;
  aiMode: AiMode;
  onAiModeChange: (mode: AiMode) => void;
  onAttentionChange: (attention: ToolAttention) => void;
  sampleError?: boolean;
  appId?: string;
}) {
  const [tool, setTool] = useState<Tool>("ai");
  const [developView, setDevelopView] = useState<DevelopView>("code");
  const [snap, setSnap] = useState<number | string | null>(0.94);
  const [desktop, setDesktop] = useState(() => window.matchMedia("(min-width: 1024px)").matches);
  const [wide, setWide] = useState(false);
  const [draft, setDraft] = useState(source);
  const [dataDraft, setDataDraft] = useState('{\n  "notes": [\n    { "title": "Dinner at ours", "done": false }\n  ]\n}');
  const [dataError, setDataError] = useState<string | null>(null);
  const sheetContent = useRef<HTMLDivElement>(null);
  const [prompt, setPrompt] = useState("");
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
  const [replyCode, setReplyCode] = useState("");
  const [logs, setLogs] = useState<ConsoleEntry[]>(() => sampleConsoleEntries(sampleError));
  const [consoleCopyStatus, setConsoleCopyStatus] = useState<CopyStatus>("idle");
  const [shareCopyStatus, setShareCopyStatus] = useState<CopyStatus>("idle");
  const [unreadErrors, setUnreadErrors] = useState(sampleError ? 1 : 0);
  const [unreadReplies, setUnreadReplies] = useState(0);
  const [chatDraft, setChatDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "intro", role: "assistant", content: "What would you like to change?" },
  ]);
  const [replyPending, setReplyPending] = useState(false);
  const chatEnd = useRef<HTMLLIElement | null>(null);
  const shareLink = new URL(`https://app-lab.example/invite/${encodeURIComponent(appId)}`).href;

  useEffect(() => { if (!open) { setSnap(0.94); setWide(false); setConsoleCopyStatus("idle"); setShareCopyStatus("idle"); } }, [open]);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const changed = () => setDesktop(media.matches);
    media.addEventListener("change", changed);
    return () => media.removeEventListener("change", changed);
  }, []);
  useEffect(() => {
    if (!open) return;
    setTool(initialTool);
    if (initialTool === "develop") setDevelopView("code");
  }, [open, initialTool]);
  useEffect(() => {
    if (!replyPending) return;
    const timer = window.setTimeout(() => {
      setMessages((items) => [...items, {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Let's try that. We can keep it simple and build from there.",
      }]);
      setUnreadReplies((count) => count + 1);
      setReplyPending(false);
    }, 1100);
    return () => window.clearTimeout(timer);
  }, [replyPending]);
  useEffect(() => {
    if (open && tool === "ai" && aiMode === "internal" && messages.length > 1) {
      chatEnd.current?.scrollIntoView({ block: "nearest" });
    }
  }, [open, tool, aiMode, messages, replyPending]);
  useEffect(() => {
    if (open && tool === "ai" && aiMode === "internal") setUnreadReplies(0);
  }, [open, tool, aiMode, messages]);
  useEffect(() => {
    if (open && tool === "develop" && developView === "log") setUnreadErrors(0);
  }, [open, tool, developView]);
  useEffect(() => {
    onAttentionChange({ logErrors: unreadErrors, aiReplies: unreadReplies });
  }, [unreadErrors, unreadReplies, onAttentionChange]);

  function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const content = chatDraft.trim();
    if (!content || replyPending) return;
    setMessages((items) => [...items, { id: crypto.randomUUID(), role: "user", content }]);
    setChatDraft("");
    setReplyPending(true);
  }

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(`${prompt}\n\nCurrent app:\n${source}`);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  }

  async function copyConsole() {
    try {
      await navigator.clipboard.writeText(formatConsoleEntries(logs));
      setConsoleCopyStatus("copied");
    } catch { setConsoleCopyStatus("error"); }
  }

  async function copyShareLink() {
    try {
      await navigator.clipboard.writeText(shareLink);
      setShareCopyStatus("copied");
    } catch { setShareCopyStatus("error"); }
  }

  function applySource(nextSource: string) {
    onSave(nextSource);
    setDraft(nextSource);
    setReplyCode("");
    setCopyStatus("idle");
    onNotify("Sample app updated");
    onOpenChange(false);
  }

  function applyData() {
    try {
      setDataDraft(JSON.stringify(JSON.parse(dataDraft), null, 2));
    } catch {
      setDataError("Enter valid JSON before applying changes.");
      return;
    }
    onNotify("Sample data updated");
    onOpenChange(false);
  }

  const toolTabs = TOOL_TABS.map((item) => ({ ...item, attention: item.value === "ai"
    ? { count: unreadReplies, kind: "reply" as const }
    : item.value === "develop" ? { count: unreadErrors, kind: "error" as const } : undefined }));
  const aiTabs = [
    { value: "external", label: "External", icon: ExternalLink },
    { value: "internal", label: "Chat", icon: MessageSquare, attention: { count: unreadReplies, kind: "reply" as const } },
  ] as const;
  const developTabs = [
    { value: "code", label: "Code", icon: Code2 },
    { value: "data", label: "Data", icon: Database },
    { value: "log", label: "Log", icon: Terminal, attention: { count: unreadErrors, kind: "error" as const } },
  ] as const;
  const editorVisible = tool === "develop" && developView !== "log";
  const panelPrefix = tool === "ai" ? "ai-modes" : "develop";
  const panelValue = tool === "ai" ? aiMode : developView;
  const expanded = desktop ? wide : snap === 0.94;
  const Panel = desktop ? Dialog : Drawer;
  const panelLayout = desktop ? { modal: false } : {
    snapPoints: [0, 0.68, 0.94],
    activeSnapPoint: snap,
    setActiveSnapPoint: (next: number | string | null) => { if (next === 0) onOpenChange(false); else setSnap(next); },
    fadeFromIndex: 1,
    handleOnly: true,
    autoFocus: true,
    shouldScaleBackground: false,
  };

  return (
    <Panel.Root key={desktop ? "right" : "bottom"} open={open} onOpenChange={onOpenChange} {...panelLayout}>
      <Panel.Portal>
        {!desktop && <Drawer.Overlay className="sheet-backdrop" style={{ opacity: 1 }} />}
        <Panel.Content ref={sheetContent} className="tools-sheet" data-placement={desktop ? "right" : "bottom"} data-expanded={expanded}
          onInteractOutside={(event) => { if (desktop) event.preventDefault(); }}
          onEscapeKeyDown={(event) => { if (sheetContent.current?.querySelector("[role=tooltip]")) event.preventDefault(); }}
          onCloseAutoFocus={(event) => { event.preventDefault(); onReturnFocus(); }}>
          <div className="sheet-visible" style={{ height: desktop ? "100dvh" : `${Number(snap ?? 0.94) * 100}dvh` }}>
            {!desktop && <div className="sheet-grip-area"><Drawer.Handle className="sheet-grip" aria-label="Resize tools" /></div>}
            <header className="sheet-header">
              <div className="sheet-identity"><Activity active={motion} /><div><Panel.Title>App tools</Panel.Title><span>{appName}</span></div></div>
              <div className="button-group">
                <IconButton label={expanded ? "Reduce tools" : "Expand tools"} onClick={() => desktop ? setWide(!wide) : setSnap(snap === 0.94 ? 0.68 : 0.94)}>
                  {expanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </IconButton>
                <Panel.Close asChild><IconButton label="Close tools"><X size={21} /></IconButton></Panel.Close>
              </div>
            </header>
            <Panel.Description className="sr-only">Tools for editing and sharing the sample app.</Panel.Description>
            <div className="sheet-tabs"><Tabs label="App tools" value={tool} onChange={setTool} items={toolTabs} idPrefix="tools" /></div>
            <div role="tabpanel" id={`tools-panel-${tool}`} aria-labelledby={`tools-tab-${tool}`} className="sheet-workspace">
            {tool === "ai" && <Tabs label="AI workflow" value={aiMode} onChange={onAiModeChange} items={aiTabs} idPrefix="ai-modes" variant="underline" />}
            {tool === "develop" && <Tabs label="Develop views" value={developView} onChange={setDevelopView} items={developTabs} idPrefix="develop" variant="underline" />}
            <div className="sheet-scroll" data-vaul-no-drag>
              <div role={tool === "share" ? undefined : "tabpanel"} id={tool === "share" ? undefined : `${panelPrefix}-panel-${panelValue}`}
                aria-labelledby={tool === "share" ? undefined : `${panelPrefix}-tab-${panelValue}`} tabIndex={0}
                className={`tool-panel ${editorVisible ? "tool-panel--code" : ""}`}>
                {tool === "ai" && aiMode === "external" && <ExternalWorkflow prompt={prompt} onPromptChange={(value) => { setPrompt(value); setCopyStatus("idle"); }}
                  onCopy={copyPrompt} copyStatus={copyStatus} reply={replyCode} onReplyChange={setReplyCode} />}
                {tool === "ai" && aiMode === "internal" && (
                  <ol className="chat-messages" role="log" aria-label="AI conversation" aria-live="polite">
                    {messages.map((message) => (
                      <li className={`chat-message chat-message--${message.role}`} key={message.id}>
                        {message.role === "assistant" && <Activity active={false} />}
                        <p>{message.content}</p>
                      </li>
                    ))}
                    {replyPending && <li className="chat-thinking"><Activity active={motion} /><span>Thinking...</span></li>}
                    <li ref={chatEnd} aria-hidden="true" />
                  </ol>
                )}
                {tool === "develop" && developView === "code" && <FileEditor kind="code" value={draft} onChange={setDraft} />}
                {tool === "develop" && developView === "data" && <FileEditor kind="data" value={dataDraft} error={dataError}
                  onChange={(value) => { setDataDraft(value); setDataError(null); }} />}
                {tool === "develop" && developView === "log" && <>
                  <ConsoleView entries={logs} />
                  {consoleCopyStatus === "error" && <p className="editor-error" role="alert">Couldn't copy. Select the log text to copy it.</p>}
                </>}
                {tool === "share" && <>
                  <div className="share-link-label"><label htmlFor="share-link">Share link</label><span>Preview</span></div>
                  <input id="share-link" className="text-field share-link-input" type="url" value={shareLink} readOnly onFocus={(event) => event.currentTarget.select()} />
                  <p className="share-permission">Anyone with the link can edit.</p>
                  {shareCopyStatus === "error" && <p className="editor-error" role="alert">Couldn't copy. Select the link to copy it.</p>}
                </>}
              </div>
            </div>
            <footer className="sheet-footer" data-mode={tool === "ai" ? aiMode : tool}>
              {tool === "ai" && aiMode === "external" && <Button disabled={!replyCode.trim()} onClick={() => applySource(replyCode)}><Check size={17} />Apply code</Button>}
              {tool === "ai" && aiMode === "internal" && (
                <form className="chat-composer" onSubmit={sendMessage}>
                  <label className="sr-only" htmlFor="chat-message">Message</label>
                  <textarea id="chat-message" className="text-field" placeholder="Ask for a change..." rows={1}
                    value={chatDraft} onChange={(event) => setChatDraft(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
                        event.preventDefault();
                        event.currentTarget.form?.requestSubmit();
                      }
                    }} />
                  <IconButton className="send-message" type="submit" label="Send message" disabled={!chatDraft.trim() || replyPending}>
                    <ArrowUp size={19} />
                  </IconButton>
                </form>
              )}
              {tool === "develop" && developView === "code" && <Button disabled={!draft.trim()} onClick={() => applySource(draft)}><Check size={17} />Apply changes</Button>}
              {tool === "develop" && developView === "data" && <Button disabled={!dataDraft.trim()} onClick={applyData}><Check size={17} />Apply data</Button>}
              {tool === "develop" && developView === "log" && <>
                <Button variant="secondary" disabled={!logs.length} onClick={copyConsole}>{consoleCopyStatus === "copied" ? <Check size={17} /> : <Copy size={17} />}<span aria-live="polite">{consoleCopyStatus === "copied" ? "Copied" : "Copy log"}</span></Button>
                <IconButton label="Clear console" disabled={!logs.length} onClick={() => { setLogs([]); setUnreadErrors(0); setConsoleCopyStatus("idle"); }}><Trash2 size={18} /></IconButton>
              </>}
              {tool === "share" && <Button onClick={copyShareLink}>{shareCopyStatus === "copied" ? <Check size={17} /> : <Copy size={17} />}<span aria-live="polite">{shareCopyStatus === "copied" ? "Copied" : "Copy link"}</span></Button>}
            </footer>
            </div>
          </div>
        </Panel.Content>
      </Panel.Portal>
    </Panel.Root>
  );
}
