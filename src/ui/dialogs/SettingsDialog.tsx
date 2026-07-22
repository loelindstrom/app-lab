import { useEffect, useRef, useState, type ReactNode } from "react";
import { createAuthFirebaseRules, createFirebaseOwnerSetupSecret } from "../../sync/firebaseAccessRules";
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
type StorageTab = "setup" | "sync";
type SetupGuideSectionId = "firebase" | "security" | "connect";
type SetupStepId =
  | "create-account"
  | "create-project"
  | "create-database"
  | "enable-auth"
  | "paste-rules"
  | "copy-config"
  | "copy-url"
  | "sync";

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
  const [ownerSetupSecret, setOwnerSetupSecret] = useState(() => createFirebaseOwnerSetupSecret());
  const [firebaseConfigText, setFirebaseConfigText] = useState("");
  const [databaseUrl, setDatabaseUrl] = useState("");
  const [recoveryText, setRecoveryText] = useState("");
  const [restoreText, setRestoreText] = useState("");
  const [status, setStatus] = useState("Ready");
  const [openSetupSection, setOpenSetupSection] = useState<SetupGuideSectionId | null>("firebase");
  const [setupSteps, setSetupSteps] = useState<Record<SetupStepId, boolean>>(() => createSetupStepState());
  const wasOpenRef = useRef(false);

  useEffect(() => {
    setDisplayName(storageProfile?.displayName ?? "");
    setDatabaseUrl(storageProfile?.databaseUrl ?? "");
    setFirebaseConfigText(storageProfile ? JSON.stringify(storageProfile.firebaseConfig, null, 2) : "");
    if (storageProfile?.ownerSetupSecret) setOwnerSetupSecret(storageProfile.ownerSetupSecret);
  }, [storageProfile]);

  useEffect(() => {
    if (!isOpen) {
      wasOpenRef.current = false;
      return;
    }
    if (wasOpenRef.current) return;
    wasOpenRef.current = true;
    setRecoveryText("");
    setRestoreText("");
    setStatus("Ready");
    setOpenSetupSection(storageProfile ? "connect" : "firebase");
    setSetupSteps(createSetupStepState());
  }, [isOpen, storageProfile]);

  const firebaseRules = createAuthFirebaseRules(ownerSetupSecret);

  if (!isOpen) return null;

  async function saveStorageProfile() {
    setStatus("Saving storage profile...");
    try {
      await onConfigureStorageProfile({
        accessModel: "auth-v1",
        databaseUrl,
        displayName,
        firebaseConfigText,
        ownerSetupSecret,
      });
      setStatus("Storage profile saved. Existing owned apps now have stable sync rooms.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not save storage profile.");
    }
  }

  async function copyFirebaseRules() {
    try {
      await navigator.clipboard?.writeText(firebaseRules);
      setStatus("Firebase rules copied.");
    } catch (_) {
      setStatus("Could not copy rules. Select the rules text and copy it manually.");
    }
  }

  function toggleSetupStep(stepId: SetupStepId) {
    setSetupSteps((steps) => ({ ...steps, [stepId]: !steps[stepId] }));
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
      setStatus("Sync material ready. Treat it like a password.");
      void navigator.clipboard?.writeText(material).catch(() => {});
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not generate sync material.");
    }
  }

  async function restoreRecovery() {
    if (!restoreText.trim()) return;
    if (storageProfile) {
      setStatus("This browser already has a storage profile. Remove the current profile in First-time setup before syncing this device.");
      return;
    }
    setStatus("Restoring workspace manifest...");
    try {
      await onRestoreWorkspaceRecovery(restoreText);
      setStatus("Workspace synced. Apps are being hydrated from their rooms.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not sync this device.");
    }
  }

  return (
    <div className="fixed inset-0 z-30 bg-app-surface" role="presentation">
      <section className="grid h-dvh grid-rows-[auto_minmax(0,1fr)] overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="settings-title">
        <header className="border-b border-app-line bg-white/90">
          <div className="mx-auto flex w-full max-w-5xl items-center gap-4 px-4 py-3">
            <button
              className="min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-extrabold text-app-ink hover:border-app-accent"
              type="button"
              onClick={onClose}
            >
              ← Back
            </button>
            <div className="min-w-0">
              <p className="mb-1 text-xs font-extrabold uppercase text-app-muted">Settings</p>
              <h2 className="truncate text-xl font-extrabold leading-tight" id="settings-title">
                {section === "ai" ? "AI config" : "Storage and sync"}
              </h2>
            </div>
          </div>
        </header>
        <div className="min-h-0 overflow-auto">
          <div className="mx-auto grid min-h-full w-full max-w-5xl grid-cols-1 gap-4 px-4 py-4 md:grid-cols-[190px_minmax(0,1fr)]">
            <nav className="flex gap-2 rounded-lg border border-app-line bg-white p-2 md:grid md:content-start" aria-label="Settings sections">
              <SettingsNavButton active={section === "storage"} label="Storage" onClick={() => setSection("storage")} />
              <SettingsNavButton active={section === "ai"} label="AI" onClick={() => setSection("ai")} />
            </nav>

            <div className="min-w-0">
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
                    <SettingsNavButton active={storageTab === "sync"} label="Sync device" onClick={() => setStorageTab("sync")} />
                  </div>

                  {storageTab === "setup" ? (
                    <div className="grid gap-4">
                      <div className="grid gap-2 text-sm leading-relaxed text-app-muted">
                        <p>
                          Connect your own Firebase Realtime Database to back up this browser's apps, restore them on another
                          device, and create app invite links. Set up security before saving the profile here.
                        </p>
                        {storageProfile ? (
                          <p className="break-all rounded-md bg-emerald-50 px-3 py-2 font-mono text-xs font-bold text-emerald-800">
                            Connected to {storageProfile.databaseUrl}
                          </p>
                        ) : null}
                      </div>

                      <div className="divide-y divide-app-line overflow-hidden rounded-lg border border-app-line bg-white">
                        <SetupGuideSection
                          id="firebase"
                          number="1"
                          title="Create Firebase"
                          description="Create the Firebase account, project, and Realtime Database."
                          open={openSetupSection === "firebase"}
                          onOpenChange={setOpenSetupSection}
                        >
                          <SetupStep
                            checked={setupSteps["create-account"]}
                            stepNumber="1a"
                            label="Create or sign in to Firebase"
                            detail="Use the Google account that should own this sync storage."
                            onChange={() => toggleSetupStep("create-account")}
                          />
                          <SetupStep
                            checked={setupSteps["create-project"]}
                            stepNumber="1b"
                            label="Create a Firebase project"
                            detail="A plain project is enough; App Lab only needs the web app config and Realtime Database."
                            onChange={() => toggleSetupStep("create-project")}
                          />
                          <SetupStep
                            checked={setupSteps["create-database"]}
                            stepNumber="1c"
                            label="Create Realtime Database"
                            detail="Pick a region, create the database, and leave this screen open before copying details."
                            onChange={() => toggleSetupStep("create-database")}
                          />
                        </SetupGuideSection>

                        <SetupGuideSection
                          id="security"
                          number="2"
                          title="Set Security"
                          description="Enable anonymous users and publish the rules before App Lab connects."
                          open={openSetupSection === "security"}
                          onOpenChange={setOpenSetupSection}
                        >
                          <p className="text-sm leading-relaxed text-app-muted">
                            App Lab uses authenticated room claims for new Firebase setups. That prevents invite recipients from
                            creating unrelated App Lab rooms in your database.
                          </p>
                          <SetupStep
                            checked={setupSteps["enable-auth"]}
                            stepNumber="2a"
                            label="Enable Anonymous Auth"
                            detail="In Firebase Authentication, add Anonymous as a sign-in provider."
                            onChange={() => toggleSetupStep("enable-auth")}
                          />
                          <SetupStep
                            checked={setupSteps["paste-rules"]}
                            stepNumber="2b"
                            label="Publish these Realtime Database rules"
                            detail="They let you create rooms and let invited people claim only the rooms in an invite."
                            onChange={() => toggleSetupStep("paste-rules")}
                          >
                            <div className="grid gap-2">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <p className="text-xs font-extrabold uppercase text-app-muted">Rules</p>
                                <button
                                  className="min-h-8 rounded-md border border-app-line bg-white px-3 text-xs font-extrabold text-app-ink hover:border-app-accent"
                                  type="button"
                                  onClick={copyFirebaseRules}
                                >
                                  Copy rules
                                </button>
                              </div>
                              <pre className="max-h-72 overflow-auto rounded-md border border-app-line bg-slate-50 p-3 text-xs leading-relaxed text-app-ink">
                                {firebaseRules}
                              </pre>
                            </div>
                          </SetupStep>
                        </SetupGuideSection>

                        <SetupGuideSection
                          id="connect"
                          number="3"
                          title="Connect App Lab"
                          description="Paste the web app config and database URL, then save."
                          open={openSetupSection === "connect"}
                          onOpenChange={setOpenSetupSection}
                        >
                          <SetupStep
                            checked={setupSteps["copy-config"]}
                            stepNumber="3a"
                            label="Copy web app config object"
                            detail="Use the config object from Project settings. Authenticated setup requires the apiKey field."
                            onChange={() => toggleSetupStep("copy-config")}
                          >
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
                          </SetupStep>
                          <SetupStep
                            checked={setupSteps["copy-url"]}
                            stepNumber="3b"
                            label="Copy the Realtime Database URL"
                            detail="Use the database URL from Realtime Database, not a Storage bucket URL."
                            onChange={() => toggleSetupStep("copy-url")}
                          >
                            <label className="grid gap-2 text-sm font-extrabold text-app-muted">
                              Firebase Realtime Database URL
                              <input
                                className="min-h-10 rounded-md border border-app-line bg-white px-3 font-mono text-sm text-app-ink outline-none focus:border-app-accent"
                                value={databaseUrl}
                                onChange={(event) => setDatabaseUrl(event.target.value)}
                                placeholder="https://your-project.region.firebasedatabase.app"
                              />
                            </label>
                          </SetupStep>
                          <SetupStep
                            checked={setupSteps.sync}
                            stepNumber="3c"
                            label="Ready to connect and sync"
                            detail="Saving the profile backs up existing local apps to the selected Firebase project."
                            onChange={() => toggleSetupStep("sync")}
                          />
                        </SetupGuideSection>
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
                  ) : (
                    <div className="grid gap-4">
                      <p className="text-sm leading-relaxed text-app-muted">
                        Sync device is for moving the whole workspace to another browser or device. Generate sync material on a
                        device that already has this workspace, then paste it on the device you want to sync with.
                      </p>

                      <div className="divide-y divide-app-line overflow-hidden rounded-lg border border-app-line bg-white">
                        <SyncMaterialStep
                          number="1"
                          title="Generate sync material"
                          description="Use this on the device that already has the workspace you want to sync."
                        >
                          <textarea
                            className="min-h-32 resize-y rounded-md border border-app-line bg-white p-3 font-mono text-xs outline-none focus:border-app-accent"
                            readOnly
                            placeholder="Generated workspace sync material will appear here."
                            value={recoveryText}
                          />
                          <button
                            className="min-h-10 justify-self-start rounded-md border border-app-accent bg-app-accent px-4 font-extrabold text-white hover:bg-app-strong disabled:opacity-50"
                            type="button"
                            disabled={!storageProfile}
                            onClick={exportRecovery}
                          >
                            Generate sync material
                          </button>
                        </SyncMaterialStep>

                        <SyncMaterialStep
                          number="2"
                          title="Paste sync material"
                          description="Use this on the device or browser you want to sync with the existing workspace."
                        >
                          <textarea
                            className="min-h-32 resize-y rounded-md border border-app-line bg-white p-3 font-mono text-sm outline-none focus:border-app-accent"
                            placeholder="Paste workspace sync material"
                            value={restoreText}
                            onChange={(event) => setRestoreText(event.target.value)}
                          />
                          <button
                            className="min-h-10 justify-self-start rounded-md border border-app-accent bg-app-accent px-4 font-extrabold text-white hover:bg-app-strong disabled:opacity-50"
                            type="button"
                            disabled={!restoreText.trim()}
                            onClick={restoreRecovery}
                          >
                            Sync this device
                          </button>
                        </SyncMaterialStep>
                      </div>

                      <span className="text-xs font-bold text-app-muted">{status}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
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

function SetupGuideSection({
  children,
  description,
  id,
  number,
  onOpenChange,
  open,
  title,
}: {
  children: ReactNode;
  description: string;
  id: SetupGuideSectionId;
  number: string;
  onOpenChange: (id: SetupGuideSectionId | null) => void;
  open: boolean;
  title: string;
}) {
  return (
    <section>
      <button
        className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 text-left hover:bg-app-accent/5"
        type="button"
        aria-expanded={open}
        onClick={() => onOpenChange(open ? null : id)}
      >
        <span className="grid h-7 min-h-7 w-7 place-items-center rounded-full bg-app-accent text-sm font-extrabold text-white">
          {number}
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-extrabold text-app-ink">{title}</span>
          <span className="block text-sm leading-relaxed text-app-muted">{description}</span>
        </span>
        <span className="text-xl leading-none text-app-muted" aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </button>
      {open ? <div className="grid gap-4 px-4 pb-4">{children}</div> : null}
    </section>
  );
}

function SetupStep({
  checked,
  children,
  detail,
  label,
  onChange,
  stepNumber,
}: {
  checked: boolean;
  children?: ReactNode;
  detail: string;
  label: string;
  onChange: () => void;
  stepNumber: string;
}) {
  return (
    <div className="grid grid-cols-[2rem_minmax(0,1fr)_2.25rem] gap-4 border-t border-app-line py-4 text-sm leading-relaxed first:border-t-0 first:pt-0">
      <span className="pt-0.5 font-mono text-xs font-extrabold text-app-muted">{stepNumber}</span>
      <div className="grid min-w-0 gap-3">
        <span className="grid gap-1">
          <span className={`block font-extrabold ${checked ? "text-app-muted line-through decoration-2" : "text-app-ink"}`}>
            {label}
          </span>
          <span className={`block ${checked ? "text-app-muted/80 line-through" : "text-app-muted"}`}>{detail}</span>
        </span>
        {children ? <div className="grid gap-3">{children}</div> : null}
      </div>
      <label className="grid h-8 min-h-8 w-8 cursor-pointer place-items-center self-center justify-self-end" title={label}>
        <input aria-label={label} className="peer sr-only" type="checkbox" checked={checked} onChange={onChange} />
        <span className="grid h-5 min-h-5 w-5 place-items-center rounded-full border-2 border-app-line text-[11px] font-extrabold leading-none text-white peer-checked:border-app-accent peer-checked:bg-app-accent">
          {checked ? "✓" : ""}
        </span>
      </label>
    </div>
  );
}

function SyncMaterialStep({
  children,
  description,
  number,
  title,
}: {
  children: ReactNode;
  description: string;
  number: string;
  title: string;
}) {
  return (
    <section className="grid grid-cols-[2rem_minmax(0,1fr)] gap-4 px-4 py-4 text-sm leading-relaxed">
      <span className="grid h-7 min-h-7 w-7 place-items-center rounded-full bg-app-accent text-sm font-extrabold text-white">
        {number}
      </span>
      <div className="grid min-w-0 gap-3">
        <div className="grid gap-1">
          <h3 className="font-extrabold text-app-ink">{title}</h3>
          <p className="text-app-muted">{description}</p>
        </div>
        <div className="grid gap-3">{children}</div>
      </div>
    </section>
  );
}

function createSetupStepState(): Record<SetupStepId, boolean> {
  return {
    "copy-config": false,
    "copy-url": false,
    "create-account": false,
    "create-database": false,
    "create-project": false,
    "enable-auth": false,
    "paste-rules": false,
    sync: false,
  };
}
