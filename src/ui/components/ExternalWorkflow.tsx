import { ArrowUpRight, Check, Copy } from "lucide-react";
import { Button, HelpTip } from "./controls";
import { FileEditor } from "./FileEditor";

export type CopyStatus = "idle" | "copied" | "error";

const PROVIDERS = [
  { name: "ChatGPT", href: "https://chatgpt.com/" },
  { name: "Claude", href: "https://claude.ai/new" },
  { name: "Gemini", href: "https://gemini.google.com/app" },
];

export function ExternalWorkflow({ prompt, onPromptChange, onCopy, copyStatus, fallbackPrompt, reply, onReplyChange, disabled = false }: {
  prompt: string;
  onPromptChange: (prompt: string) => void;
  onCopy: () => void;
  copyStatus: CopyStatus;
  fallbackPrompt?: string;
  disabled?: boolean;
  reply: string;
  onReplyChange: (reply: string) => void;
}) {
  return <ol className="external-workflow" aria-label="Edit with external AI">
    <li>
      <h3 className="workflow-heading editor-label">
        <label htmlFor="prompt-draft">1. Describe your idea</label>
        <HelpTip label="About the prompt">This instruction is combined with your app's code in a longer prompt, ready to paste into an external AI.</HelpTip>
      </h3>
      <textarea className="text-field prompt-draft" id="prompt-draft" placeholder="e.g. Turn this into a travel journal" value={prompt} onChange={(event) => onPromptChange(event.target.value)} />
    </li>
    <li>
      <h3 className="workflow-heading">2. Copy the prompt</h3>
      <Button className={`workflow-copy ${copyStatus === "copied" ? "is-copied" : ""}`} variant="secondary" onClick={onCopy} disabled={disabled}>
        {copyStatus === "copied" ? <Check size={17} /> : <Copy size={17} />}<span aria-live="polite">{copyStatus === "copied" ? "Copied" : "Copy prompt + code"}</span>
      </Button>
      {copyStatus === "error" && <>
        <p className="editor-error" role="alert">Couldn't access the clipboard. Select and copy the prompt below.</p>
        <textarea className="text-field code-draft reply-draft" aria-label="Prompt and code" readOnly value={fallbackPrompt} onFocus={(event) => event.currentTarget.select()} />
      </>}
    </li>
    <li>
      <h3 className="workflow-heading">3. Ask your AI</h3>
      <p className="workflow-hint">Paste the prompt into your AI, then copy its HTML reply.</p>
      <nav className="ai-provider-links" aria-label="External AI services">{PROVIDERS.map(({ name, href }) =>
        <a key={name} href={href} target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer">{name}<ArrowUpRight size={14} /><span className="sr-only"> (opens in a new tab)</span></a>
      )}</nav>
    </li>
    <li>
      <FileEditor kind="code" value={reply} onChange={onReplyChange} pasteOnly disabled={disabled} label="Paste the new code"
        caption="4. Paste the new code" />
    </li>
  </ol>;
}
