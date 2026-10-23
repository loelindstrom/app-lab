import { useEffect, useState } from "react";
import type { AppInvitePayload, AppInvitePreview } from "../../sync";

export function InviteImportDialog({
  invite,
  onClose,
  onImport,
  onPreview,
}: {
  invite: AppInvitePayload | null;
  onClose: () => void;
  onImport: (invite: AppInvitePayload) => Promise<void>;
  onPreview: (invite: AppInvitePayload) => Promise<AppInvitePreview>;
}) {
  const [preview, setPreview] = useState<AppInvitePreview | null>(null);
  const [status, setStatus] = useState("Ready");

  useEffect(() => {
    setPreview(null);
    setStatus("Ready");
  }, [invite]);

  if (!invite) return null;

  async function previewInvite() {
    if (!invite) return;
    const currentInvite = invite;
    setStatus("Loading app preview...");
    try {
      setPreview(await onPreview(currentInvite));
      setStatus("Preview loaded. Review before importing.");
    } catch (error) {
      setPreview(null);
      setStatus(error instanceof Error ? error.message : "Could not load app preview.");
    }
  }

  async function importInvite() {
    if (!invite) return;
    const currentInvite = invite;
    setStatus("Importing shared app...");
    try {
      await onImport(currentInvite);
      setStatus("Imported.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not import invite.");
    }
  }

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-black/35 px-4" role="dialog" aria-modal="true" aria-label="Import shared app">
      <div className="grid w-full max-w-lg gap-4 rounded-xl border border-app-line bg-app-panel p-4 shadow-panel">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="mb-1 text-xs font-extrabold uppercase text-app-muted">Shared app invite</p>
            <h2 className="truncate text-lg font-extrabold">Import shared app</h2>
          </div>
          <button
            className="grid h-8 min-h-8 w-8 place-items-center rounded-full text-xl text-app-muted hover:bg-app-accent/10 hover:text-app-accent"
            type="button"
            aria-label="Close invite import"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <p className="text-sm leading-relaxed text-app-muted">
          This link grants access to a shared app source room and data room. Importing will add the app to this workspace as
          Shared with me and connect it to live data updates.
        </p>

        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm leading-relaxed text-amber-900">
          Shared app source is executable code from whoever controls the shared source room. Only import apps from people you
          trust.
        </div>

        <div className="rounded-lg border border-app-line bg-slate-50 p-3 text-xs text-app-muted">
          <p>
            Provider: <span className="font-mono">{invite.provider.databaseUrl}</span>
          </p>
          <p>
            Created: <span className="font-mono">{new Date(invite.createdAt).toLocaleDateString()}</span>
          </p>
        </div>

        {preview ? (
          <div className="grid gap-2 rounded-lg border border-app-line bg-white p-3">
            <div className="min-w-0">
              <p className="mb-1 text-xs font-extrabold uppercase text-app-muted">Preview</p>
              <h3 className="truncate text-base font-extrabold text-app-ink">{preview.name}</h3>
              {preview.description ? <p className="mt-1 text-sm leading-relaxed text-app-muted">{preview.description}</p> : null}
            </div>
            <div className="grid gap-1 text-xs text-app-muted">
              <p>
                App id: <span className="font-mono">{shortFingerprint(preview.appId)}</span>
              </p>
              <p>
                Source room: <span className="font-mono">{shortFingerprint(preview.sourceRoomId)}</span>
              </p>
              <p>
                Data room: <span className="font-mono">{shortFingerprint(preview.dataRoomId)}</span>
              </p>
              <p>
                Updated: <span className="font-mono">{new Date(preview.updatedAt).toLocaleDateString()}</span>
              </p>
            </div>
          </div>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-bold text-app-muted">{status}</span>
          <div className="flex gap-2">
            <button className="min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent" type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent" type="button" onClick={previewInvite}>
              Preview app
            </button>
            <button
              className="min-h-9 rounded-md border border-app-accent bg-app-accent px-3 text-sm font-extrabold text-white hover:bg-app-strong"
              type="button"
              onClick={importInvite}
            >
              Import
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function shortFingerprint(value: string): string {
  if (value.length <= 18) return value;
  return `${value.slice(0, 8)}...${value.slice(-6)}`;
}
