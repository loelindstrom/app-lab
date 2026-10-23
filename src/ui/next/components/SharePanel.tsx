import { useState } from "react";
import { Check, Copy, Link, Settings } from "lucide-react";
import { encodeAppInvite } from "../../../sync";
import type { WorkspaceController } from "../../shell/useWorkspace";
import { Button } from "./controls";

export function SharePanel({ workspace, onSettings }: { workspace: WorkspaceController; onSettings: () => void }) {
  const [link, setLink] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const app = workspace.activeApp!;
  async function create() {
    setBusy(true); setError("");
    try {
      const invite = await workspace.syncActions.createInvite(app.appId);
      setLink(`${window.location.origin}${window.location.pathname}#${encodeAppInvite(invite)}`);
      await workspace.refreshApps();
    } catch (error) { setError(error instanceof Error ? error.message : "Could not create link."); }
    finally { setBusy(false); }
  }
  async function copy() {
    try { await navigator.clipboard.writeText(link); setCopied(true); }
    catch { setError("Couldn't copy. Select the link to copy it."); }
  }
  const canShare = !!workspace.storageProfile || workspace.syncBadges[app.appId]?.kind === "shared-with-me";
  return <div className="live-share">
    <h3>Share this app</h3>
    <p className="field-helper">Anyone with the link can edit the app and its data. Keep it private.</p>
    {!canShare ? <Button variant="secondary" onClick={onSettings}><Settings size={17} />Set up storage</Button>
      : link ? <>
        <label className="field-label" htmlFor="share-link">Share link</label>
        <textarea className="text-field share-link-input" id="share-link" readOnly value={link} onFocus={(event) => event.currentTarget.select()} rows={3} />
        <Button onClick={() => void copy()}>{copied ? <Check size={17} /> : <Copy size={17} />}{copied ? "Copied" : "Copy link"}</Button>
      </> : <Button onClick={() => void create()} disabled={busy}><Link size={17} />{busy ? "Creating link..." : "Create share link"}</Button>}
    {error && <p className="editor-error" role="alert">{error}</p>}
  </div>;
}
