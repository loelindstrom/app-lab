import { useEffect, useState } from "react";
import type { ConfigureStorageProfileInput, StorageProfile } from "../../sync/workspaceSync";

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  storageProfile: StorageProfile | null;
  onConfigureStorageProfile: (input: ConfigureStorageProfileInput) => Promise<void>;
  onClearStorageProfile: () => Promise<void>;
  onExportWorkspaceRecovery: () => Promise<string>;
  onRestoreWorkspaceRecovery: (recoveryText: string) => Promise<void>;
}

type SettingsSection = "ai" | "storage";
type StorageTab = "setup" | "restore" | "advanced";

export function SettingsDialog({
  isOpen,
  onClearStorageProfile,
  onClose,
  onConfigureStorageProfile,
  onExportWorkspaceRecovery,
  onRestoreWorkspaceRecovery,
  storageProfile,
}: SettingsDialogProps) {
  const [section, setSection] = useState<SettingsSection>("storage");
  const [storageTab, setStorageTab] = useState<StorageTab>("setup");
  const [displayName, setDisplayName] = useState("");
  const [firebaseConfigText, setFirebaseConfigText] = useState("");
  const [databaseUrl, setDatabaseUrl] = useState("");
  const [recoveryText, setRecoveryText] = useState("");
  const [restoreText, setRestoreText] = useState("");
  const [status, setStatus] = useState("Ready");

  useEffect(() => {
    setDisplayName(storageProfile?.displayName ?? "");
    setDatabaseUrl(storageProfile?.databaseUrl ?? "");
    setFirebaseConfigText(storageProfile ? JSON.stringify(storageProfile.firebaseConfig, null, 2) : "");
    setRecoveryText("");
    setRestoreText("");
    setStatus("Ready");
  }, [storageProfile, isOpen]);

  if (!isOpen) return null;

  async function saveStorageProfile() {
    setStatus("Saving storage profile...");
    try {
      await onConfigureStorageProfile({ displayName, databaseUrl, firebaseConfigText });
      setStatus("Storage profile saved. Existing owned apps now have stable sync rooms.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not save storage profile.");
    }
  }

  async function clearStorageProfile() {
    if (!window.confirm("Remove this storage profile from this browser? Existing app sync room references stay in the workspace metadata.")) return;
    setStatus("Removing storage profile...");
    try {
      await onClearStorageProfile();
      setStatus("Storage profile removed from this browser.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not remove storage profile.");
    }
  }

  async function exportRecovery() {
    setStatus("Saving encrypted workspace manifest...");
    try {
      const material = await onExportWorkspaceRecovery();
      setRecoveryText(material);
      setStatus("Recovery material ready. Treat it like a password.");
      await navigator.clipboard?.writeText(material);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not export recovery material.");
    }
  }

  async function restoreRecovery() {
    if (!restoreText.trim()) return;
    setStatus("Restoring workspace manifest...");
    try {
      await onRestoreWorkspaceRecovery(restoreText);
      setStatus("Workspace metadata restored. App hydration from rooms is the next sync slice.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not restore workspace.");
    }
  }

  return (
    <div className="fixed inset-0 z-30 grid items-center bg-app-ink/40 p-4" role="presentation">
      <section
        className="grid max-h-[90dvh] w-full max-w-3xl grid-rows-[auto_minmax(0,1fr)] justify-self-center overflow-hidden rounded-lg border border-app-line bg-app-surface/95 shadow-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
      >
        <header className="flex items-center justify-between gap-4 border-b border-app-line p-4">
          <div>
            <p className="mb-1 text-xs font-extrabold uppercase text-app-muted">Settings</p>
            <h2 className="text-xl font-extrabold leading-tight" id="settings-title">
              {section === "ai" ? "AI config" : "Storage and sync"}
            </h2>
          </div>
          <button className="min-h-9 rounded-md border border-app-accent bg-app-accent px-4 font-bold text-white hover:bg-app-strong" type="button" onClick={onClose}>
            Close
          </button>
        </header>
        <div className="grid min-h-0 grid-cols-1 overflow-hidden border-t border-app-line md:grid-cols-[190px_minmax(0,1fr)]">
          <nav className="flex gap-2 border-b border-app-line bg-white/70 p-3 md:grid md:content-start md:border-b-0 md:border-r" aria-label="Settings sections">
            <SettingsNavButton active={section === "storage"} label="Storage" onClick={() => setSection("storage")} />
            <SettingsNavButton active={section === "ai"} label="AI" onClick={() => setSection("ai")} />
          </nav>

          <div className="min-h-0 overflow-auto p-4">
            {section === "ai" ? (
              <form className="grid gap-4">
                <p className="text-sm leading-relaxed text-app-muted">
                  BuilderAI configuration will live here. It stays separate from storage so sync setup does not get mixed with
                  model/API-key setup.
                </p>
                <label className="grid gap-2 text-sm font-extrabold text-app-muted">
                  API key
                  <input
                    className="rounded-md border border-app-line px-3 py-2 text-app-ink"
                    type="password"
                    autoComplete="off"
                    placeholder="Stored by the future core config service"
                  />
                </label>
                <label className="grid gap-2 text-sm font-extrabold text-app-muted">
                  Model id
                  <input className="rounded-md border border-app-line px-3 py-2 text-app-ink" type="text" placeholder="inclusionai/ling-2.6-flash" />
                </label>
                <button className="min-h-9 justify-self-end rounded-md border border-app-line bg-slate-100 px-4 font-bold text-app-muted" type="button" disabled>
                  Save later
                </button>
              </form>
            ) : (
              <div className="grid gap-4">
                <div className="flex flex-wrap gap-2 rounded-lg bg-white p-1">
                  <SettingsNavButton active={storageTab === "setup"} label="First-time setup" onClick={() => setStorageTab("setup")} />
                  <SettingsNavButton active={storageTab === "restore"} label="Restore device" onClick={() => setStorageTab("restore")} />
                  <SettingsNavButton active={storageTab === "advanced"} label="Advanced" onClick={() => setStorageTab("advanced")} />
                </div>

                {storageTab === "setup" ? (
                  <div className="grid gap-4">
                    <div className="rounded-lg border border-app-line bg-white p-3">
                      <p className="mb-1 text-xs font-extrabold uppercase text-app-muted">Current state</p>
                      <p className="text-sm font-bold text-app-ink">{storageProfile ? storageProfile.displayName : "No storage profile configured"}</p>
                      <p className="mt-1 text-sm leading-relaxed text-app-muted">
                        Saving a profile creates stable room references for owned apps. The cloud adapter will use these references
                        instead of creating new rooms every time an app is shared.
                      </p>
                    </div>
                    <label className="grid gap-2 text-sm font-extrabold text-app-muted">
                      Display name
                      <input
                        className="min-h-10 rounded-md border border-app-line bg-white px-3 text-base font-semibold text-app-ink outline-none focus:border-app-accent"
                        value={displayName}
                        onChange={(event) => setDisplayName(event.target.value)}
                        placeholder="My Firebase project"
                      />
                    </label>
                    <label className="grid gap-2 text-sm font-extrabold text-app-muted">
                      Firebase web app config
                      <textarea
                        className="min-h-28 resize-y rounded-md border border-app-line bg-white px-3 py-2 font-mono text-xs text-app-ink outline-none focus:border-app-accent"
                        value={firebaseConfigText}
                        onChange={(event) => setFirebaseConfigText(event.target.value)}
                        placeholder={'const firebaseConfig = {\n  apiKey: "...",\n  authDomain: "...",\n  projectId: "..."\n};'}
                      />
                    </label>
                    <label className="grid gap-2 text-sm font-extrabold text-app-muted">
                      Firebase Realtime Database URL
                      <input
                        className="min-h-10 rounded-md border border-app-line bg-white px-3 font-mono text-sm text-app-ink outline-none focus:border-app-accent"
                        value={databaseUrl}
                        onChange={(event) => setDatabaseUrl(event.target.value)}
                        placeholder="https://your-project.region.firebasedatabase.app"
                      />
                    </label>
                    <div className="rounded-lg border border-app-line bg-slate-50 p-3 text-sm leading-relaxed text-app-muted">
                      Paste the Firebase web app config from Project settings, then paste the Realtime Database URL from the
                      Realtime Database page. For this prototype, your Realtime Database rules must allow App Lab room reads and
                      writes at the `appLabSyncRooms` path.
                    </div>
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                      <p className="mb-2 text-xs font-extrabold uppercase text-amber-900">Prototype Firebase rules</p>
                      <pre className="overflow-auto rounded-md bg-white p-3 text-xs leading-relaxed text-amber-950">{`{
  "rules": {
    "appLabSyncRooms": {
      "$roomId": {
        ".read": true,
        ".write": true
      }
    }
  }
}`}</pre>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="text-xs font-bold text-app-muted">{status}</span>
                      <div className="flex gap-2">
                        {storageProfile ? (
                          <button className="min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent" type="button" onClick={clearStorageProfile}>
                            Remove profile
                          </button>
                        ) : null}
                        <button
                          className="min-h-9 rounded-md border border-app-accent bg-app-accent px-3 text-sm font-bold text-white hover:bg-app-strong disabled:opacity-50"
                          type="button"
                          disabled={!databaseUrl.trim()}
                          onClick={saveStorageProfile}
                        >
                          Save storage profile
                        </button>
                      </div>
                    </div>
                  </div>
                ) : storageTab === "restore" ? (
                  <div className="grid gap-4">
                    <p className="text-sm leading-relaxed text-app-muted">
                      Restore will be the one-step flow for a second device. Recovery material should be treated like a password:
                      anyone with it can restore the full workspace, including private apps and shared room memberships.
                    </p>
                    <textarea
                      className="min-h-28 resize-y rounded-md border border-app-line bg-white p-3 font-mono text-sm outline-none focus:border-app-accent"
                      placeholder="Paste workspace recovery material"
                      value={restoreText}
                      onChange={(event) => setRestoreText(event.target.value)}
                    />
                    <button
                      className="min-h-10 rounded-md border border-app-accent bg-app-accent px-4 font-extrabold text-white hover:bg-app-strong disabled:opacity-50"
                      type="button"
                      disabled={!restoreText.trim()}
                      onClick={restoreRecovery}
                    >
                      Restore workspace metadata
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm leading-relaxed text-amber-900">
                      Recovery exports will support text, QR code, and file formats. Exports must warn that this material unlocks
                      the full workspace.
                    </div>
                    <textarea
                      className="min-h-32 resize-y rounded-md border border-app-line bg-white p-3 font-mono text-xs outline-none focus:border-app-accent"
                      readOnly
                      placeholder="Exported recovery material will appear here."
                      value={recoveryText}
                    />
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="text-xs font-bold text-app-muted">{status}</span>
                      <button
                        className="min-h-10 rounded-md border border-app-accent bg-app-accent px-4 font-extrabold text-white hover:bg-app-strong disabled:opacity-50"
                        type="button"
                        disabled={!storageProfile}
                        onClick={exportRecovery}
                      >
                        Export recovery text
                      </button>
                    </div>
                    <button className="min-h-10 rounded-md border border-app-line bg-slate-100 px-4 font-extrabold text-app-muted" type="button" disabled>
                      QR and file export later
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function SettingsNavButton({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      className={`min-h-9 rounded-md px-3 text-sm font-extrabold ${
        active ? "bg-app-accent text-white" : "bg-transparent text-app-muted hover:bg-app-accent/10 hover:text-app-accent"
      }`}
      type="button"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
