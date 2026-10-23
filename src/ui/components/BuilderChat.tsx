import { Fragment, useEffect, useRef } from "react";
import { ArrowUp, Settings, Trash2 } from "lucide-react";
import type { WorkspaceController } from "../shell/useWorkspace";
import { MarkdownMessage } from "./MarkdownMessage";
import { Activity, Button, IconButton } from "./controls";

export function BuilderChat({ workspace, motion, onSettings, draft, onDraftChange }: {
  workspace: WorkspaceController;
  motion: boolean;
  onSettings: () => void;
  draft: string;
  onDraftChange: (draft: string) => void;
}) {
  const app = workspace.activeApp!;
  const session = workspace.builderSessions[app.appId];
  const end = useRef<HTMLLIElement>(null);
  const configured = !!(workspace.aiConfig.apiKey && workspace.aiConfig.model);
  useEffect(() => { end.current?.scrollIntoView?.({ block: "nearest" }); }, [session]);
  const reasoning = session?.reasoning && <li className="chat-reasoning"><details>
    <summary>{session.isRunning ? session.activity || "Thinking..." : "Thought process"}</summary>
    <p>{session.reasoning}</p>
  </details></li>;
  return <div className="live-chat">
    <header className="live-chat-heading">
      <button type="button" onClick={onSettings} title="AI settings">BuilderAI{workspace.activeBuilderProfile ? ` / ${workspace.activeBuilderProfile.name}` : ""}</button>
      <span title={workspace.aiConfig.model}>{workspace.aiConfig.model || "Not connected"}</span>
    </header>
    <ol className="chat-messages" role="log" aria-label="AI conversation" aria-live="polite">
      <li className="chat-message chat-message--assistant"><Activity active={false} /><div>
        <p>{configured ? "What would you like to change?" : "Use External to copy a prompt, or connect your AI to chat here."}</p>
        {!configured && <Button variant="quiet" onClick={onSettings}><Settings size={16} />Set up AI</Button>}
      </div></li>
      {session?.messages.map((message) => <Fragment key={message.messageId}>
        {session.reasoningMessageId === message.messageId && reasoning}
        <li className={`chat-message chat-message--${message.role}`}>
          {message.role === "assistant" && <Activity active={false} />}
          <div>{message.role === "assistant" ? <MarkdownMessage content={message.content} /> : <p>{message.content}</p>}</div>
        </li>
      </Fragment>)}
      {!session?.reasoningMessageId && reasoning}
      {session?.streamingContent && <li className="chat-message chat-message--assistant"><Activity active={motion} /><MarkdownMessage content={session.streamingContent} /></li>}
      {session?.isRunning && <li className="chat-thinking"><Activity active={motion} /><span>{session.activity || "Thinking..."}</span></li>}
      {session?.error && <li className="editor-error" role="alert">{session.error}</li>}
      <li ref={end} aria-hidden="true" />
    </ol>
    <div className="live-chat-footer">
      <div className="live-chat-usage"><span>{session?.usage.costUsd != null ? `$${session.usage.costUsd.toFixed(4)}` : `${session?.usage.totalTokens.toLocaleString() ?? 0} tokens`}</span>
        <IconButton label="Clear chat" disabled={session?.isRunning || !session?.messages.length} onClick={() => workspace.clearBuilderConversation(app.appId)}><Trash2 size={17} /></IconButton>
      </div>
      {configured && <form className="chat-composer" onSubmit={(event) => {
        event.preventDefault();
        if (!draft.trim() || session?.isRunning) return;
        void workspace.sendBuilderMessage(app, draft); onDraftChange("");
      }}>
        <label className="sr-only" htmlFor="chat-message">Message</label>
        <textarea id="chat-message" className="text-field" placeholder="Ask for a change..." rows={2} value={draft} disabled={session?.isRunning}
          onChange={(event) => onDraftChange(event.target.value)} onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); }
          }} />
        <IconButton className="send-message" type="submit" label="Send message" disabled={!draft.trim() || session?.isRunning}><ArrowUp size={19} /></IconButton>
      </form>}
    </div>
  </div>;
}
