import { useId, useRef, useState, type ReactNode } from "react";
import { ClipboardPaste, Copy, Download, Upload } from "lucide-react";
import { Button, IconButton } from "./controls";

export function FileEditor({ kind, value, onChange, error, pasteOnly = false, label: customLabel, caption, disabled = false }: {
  kind: "code" | "data";
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
  pasteOnly?: boolean;
  label?: string;
  caption?: ReactNode;
  disabled?: boolean;
}) {
  const editor = useRef<HTMLTextAreaElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const isCode = kind === "code";
  const blocked = disabled || busy;
  const id = useId();
  const label = customLabel ?? (isCode ? "App source (HTML)" : "App data (JSON)");

  async function paste() {
    setNotice(null);
    setBusy(true);
    try {
      const text = await navigator.clipboard.readText();
      if (!text) { setNotice("Clipboard is empty"); return; }
      onChange(text);
      editor.current?.focus();
    } catch {
      setNotice("Clipboard unavailable. Paste directly into the editor.");
    } finally { setBusy(false); }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setNotice("Copied");
    } catch { setNotice("Select and copy directly from the editor."); }
  }

  async function readFile(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setNotice(null);
    try {
      onChange(await file.text());
      setNotice("File loaded. Review before applying.");
    } catch { setNotice("Could not read the file."); }
    finally { setBusy(false); }
  }

  function download() {
    const url = URL.createObjectURL(new Blob([value], { type: isCode ? "text/html" : "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = isCode ? "app.html" : "app-data.json";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return <>
    <div className="editor-toolbar">
      <label className="field-label" htmlFor={id}>{caption ?? (isCode ? "HTML" : "JSON")}</label>
      <div className="button-group">
        <Button variant="quiet" onClick={paste} disabled={blocked}><ClipboardPaste size={16} />Paste</Button>
        {!pasteOnly && <><IconButton label={`Copy ${kind}`} onClick={copy} disabled={blocked || !value}><Copy size={16} /></IconButton>
        <IconButton label={`Import ${kind} file`} onClick={() => fileInput.current?.click()} disabled={blocked}><Upload size={16} /></IconButton>
        <IconButton label={`Export ${kind} file`} onClick={download} disabled={blocked || !value}><Download size={16} /></IconButton></>}
      </div>
      <input ref={fileInput} type="file" className="sr-only" tabIndex={-1} aria-label={`Choose ${kind} file`} disabled={blocked}
        accept={isCode ? ".html,.htm,text/html" : ".json,application/json"}
        onChange={(event) => { const file = event.currentTarget.files?.[0]; event.currentTarget.value = ""; void readFile(file); }} />
    </div>
    {notice && <p className="clipboard-notice" role="status">{notice}</p>}
    {error && <p className="editor-error" id={`${id}-error`} role="alert">{error}</p>}
    <textarea ref={editor} id={id} aria-label={label} readOnly={blocked} className={`text-field code-draft ${pasteOnly ? "reply-draft" : ""}`} spellCheck={false}
      aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined}
      placeholder={isCode ? "Paste HTML here" : "Paste JSON here"} value={value}
      onChange={(event) => { onChange(event.target.value); setNotice(null); }} />
    {!isCode && <p className="field-helper">Applying replaces this app's data.</p>}
  </>;
}
