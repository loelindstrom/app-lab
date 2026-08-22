import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  BUILDER_MEMORY_MESSAGE_LIMITS,
  type AiConfig,
  type AiConnectionResult,
  type BuilderConversationMemory,
  type BuilderPreferences,
  type BuilderProfile,
  type BuilderProfileInput,
  type UpdateBuilderProfileInput,
} from "../../ai";
import { createAuthFirebaseRules, createFirebaseOwnerSetupSecret, type ConfigureStorageProfileInput, type StorageProfile } from "../../sync";
import { BuilderProfilesSettings } from "./BuilderProfilesSettings";
import { SettingsActionBar, SettingsSnackbar } from "./SettingsActions";

interface SettingsDialogProps {
  aiConfig: AiConfig;
  builderPreferences: BuilderPreferences;
  builderProfiles: BuilderProfile[];
  initialAiTab?: AiTab;
  initialSection?: SettingsSection;
  isOpen: boolean;
  onClearAiConfig: () => Promise<void>;
  onClose: () => void;
  storageProfile: StorageProfile | null;
  onConfigureStorageProfile: (input: ConfigureStorageProfileInput) => Promise<void>;
  onClearStorageProfile: () => Promise<void>;
  onExportWorkspaceRecovery: () => Promise<string>;
  onRestoreWorkspaceRecovery: (recoveryText: string) => Promise<void>;
  onCreateBuilderProfile: (input: BuilderProfileInput) => Promise<BuilderProfile>;
  onDeleteBuilderProfile: (profileId: string) => Promise<void>;
  onSaveAiConfig: (config: AiConfig) => Promise<AiConfig>;
  onSaveBuilderPreferences: (preferences: BuilderPreferences) => Promise<BuilderPreferences>;
  onTestAiConnection: (config: AiConfig) => Promise<AiConnectionResult>;
  onUpdateBuilderProfile: (input: UpdateBuilderProfileInput) => Promise<BuilderProfile>;
}

type AiTab = "agent" | "connection";
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
  aiConfig,
  builderPreferences,
  builderProfiles,
  initialAiTab,
  initialSection,
  isOpen,
  onClearAiConfig,
  onClearStorageProfile,
  onClose,
  onConfigureStorageProfile,
  onCreateBuilderProfile,
  onDeleteBuilderProfile,
  onExportWorkspaceRecovery,
  onRestoreWorkspaceRecovery,
  onSaveAiConfig,
  onSaveBuilderPreferences,
  onTestAiConnection,
  onUpdateBuilderProfile,
  storageProfile,
}: SettingsDialogProps) {
  const [aiApiKey, setAiApiKey] = useState("");
  const [aiModel, setAiModel] = useState("");
  const [aiTab, setAiTab] = useState<AiTab>("connection");
  const [memoryStatus, setMemoryStatus] = useState("Ready");
  const [section, setSection] = useState<SettingsSection>("storage");
  const [storageTab, setStorageTab] = useState<StorageTab>("setup");
  const [displayName, setDisplayName] = useState("");
  const [ownerSetupSecret, setOwnerSetupSecret] = useState(() => createFirebaseOwnerSetupSecret());
  const [firebaseConfigText, setFirebaseConfigText] = useState("");
  const [databaseUrl, setDatabaseUrl] = useState("");
  const [isCompactViewport, setIsCompactViewport] = useState(isCompactSettingsViewport);
  const [mobileSectionOpen, setMobileSectionOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [recoveryText, setRecoveryText] = useState("");
  const [restoreText, setRestoreText] = useState("");
  const [status, setStatus] = useState("Ready");
  const [openSetupSection, setOpenSetupSection] = useState<SetupGuideSectionId | null>("firebase");
  const [setupSteps, setSetupSteps] = useState<Record<SetupStepId, boolean>>(() => createSetupStepState());
  const wasOpenRef = useRef(false);

  useEffect(() => {
    setAiApiKey(aiConfig.apiKey);
    setAiModel(aiConfig.model);
  }, [aiConfig]);

  useEffect(() => {
    setDisplayName(storageProfile?.displayName ?? "");
    setDatabaseUrl(storageProfile?.databaseUrl ?? "");
    setFirebaseConfigText(storageProfile ? JSON.stringify(storageProfile.firebaseConfig, null, 2) : "");
    if (storageProfile?.ownerSetupSecret) setOwnerSetupSecret(storageProfile.ownerSetupSecret);
  }, [storageProfile]);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleChange = (event: MediaQueryListEvent) => setIsCompactViewport(event.matches);
    setIsCompactViewport(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!notice) return;
    const timeoutId = window.setTimeout(() => setNotice(null), 3000);
    return () => window.clearTimeout(timeoutId);
  }, [notice]);

  useEffect(() => {
    if (!isOpen) {
      wasOpenRef.current = false;
      return;
    }
    if (wasOpenRef.current) return;
    wasOpenRef.current = true;
    if (initialSection) setSection(initialSection);
    if (initialAiTab) setAiTab(initialAiTab);
    setMobileSectionOpen(Boolean(initialSection));
    setNotice(null);
    setRecoveryText("");
    setRestoreText("");
    setStatus("Ready");
    setMemoryStatus("Ready");
    setOpenSetupSection(storageProfile ? "connect" : "firebase");
    setSetupSteps(createSetupStepState());
  }, [initialAiTab, initialSection, isOpen, storageProfile]);

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
      setStatus("Ready");
      setNotice("Storage profile saved. Existing owned apps now have stable sync rooms.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not save storage profile.");
    }
  }

  async function saveAiConfig() {
    setStatus("Saving AI configuration...");
    try {
      const saved = await onSaveAiConfig({ apiKey: aiApiKey, model: aiModel });
      setAiApiKey(saved.apiKey);
      setAiModel(saved.model);
      setStatus("Ready");
      setNotice("AI configuration saved in this browser.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not save AI configuration.");
    }
  }

  async function testAiConnection() {
    setStatus("Testing OpenRouter key and model...");
    try {
      const result = await onTestAiConnection({ apiKey: aiApiKey, model: aiModel });
      const keyDetail = result.keyLabel ? ` using ${result.keyLabel}` : "";
      setStatus(`Connected to ${result.modelName}${keyDetail}.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not connect to OpenRouter.");
    }
  }

  async function saveConversationMemory(conversationMemory: BuilderConversationMemory) {
    setMemoryStatus("Saving...");
    try {
      await onSaveBuilderPreferences({ ...builderPreferences, conversationMemory });
      setMemoryStatus("Saved");
    } catch (error) {
      setMemoryStatus(error instanceof Error ? error.message : "Could not save.");
    }
  }

  async function selectBuilderProfile(activeProfileId: string) {
    await onSaveBuilderPreferences({ ...builderPreferences, activeProfileId });
  }

  async function clearAiConfig() {
    if (!window.confirm("Remove the OpenRouter API key and model from this browser?")) return;
    setStatus("Removing AI configuration...");
    try {
      await onClearAiConfig();
      setAiApiKey("");
      setAiModel("");
      setStatus("Ready");
      setNotice("AI configuration removed from this browser.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not remove AI configuration.");
    }
  }

  async function copyFirebaseRules() {
    try {
      await navigator.clipboard?.writeText(firebaseRules);
      setStatus("Ready");
      setNotice("Firebase rules copied.");
    } catch (_) {
      setStatus("Could not copy rules. Select the rules text and copy it manually.");
    }
  }

  function toggleSetupStep(stepId: SetupStepId) {
    setSetupSteps((steps) => ({ ...steps, [stepId]: !steps[stepId] }));
  }

  function selectSettingsSection(nextSection: SettingsSection) {
    setSection(nextSection);
    setNotice(null);
    setStatus("Ready");
  }

  function selectAiTab(nextTab: AiTab) {
    setAiTab(nextTab);
    setNotice(null);
    setStatus("Ready");
  }

  function selectStorageTab(nextTab: StorageTab) {
    setStorageTab(nextTab);
    setNotice(null);
    setStatus("Ready");
  }

  async function clearStorageProfile() {
    if (!window.confirm("Remove this storage profile from this browser? Existing app sync room references stay in the workspace metadata.")) return;
    setStatus("Removing storage profile...");
    try {
      await onClearStorageProfile();
      setStatus("Ready");
      setNotice("Storage profile removed from this browser.");
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
              aria-label={isCompactViewport && mobileSectionOpen ? "Back to Settings" : undefined}
              className={`min-h-9 rounded-md border border-app-line bg-white text-sm font-extrabold text-app-ink hover:border-app-accent ${
                isCompactViewport && mobileSectionOpen ? "w-9 px-0 text-lg" : "px-3"
              }`}
              type="button"
              onClick={() => {
                if (isCompactViewport && mobileSectionOpen) {
                  setMobileSectionOpen(false);
                  setNotice(null);
                  setStatus("Ready");
                  return;
                }
                onClose();
              }}
            >
              {isCompactViewport && mobileSectionOpen ? "←" : "← Back"}
            </button>
            <h2 className="truncate text-xl font-bold leading-tight text-app-ink" id="settings-title">Settings</h2>
          </div>
        </header>
        <div className="min-h-0 overflow-auto pb-24">
          {isCompactViewport && !mobileSectionOpen ? (
            <MobileSettingsMenu
              onOpen={(nextSection) => {
                selectSettingsSection(nextSection);
                setMobileSectionOpen(true);
              }}
            />
          ) : (
            <div
              className={`mx-auto grid w-full max-w-5xl px-4 py-5 ${
                isCompactViewport ? "grid-cols-1" : "min-h-full grid-cols-[180px_minmax(0,1fr)] gap-8"
              }`}
            >
            {!isCompactViewport ? (
              <nav className="grid content-start border-r border-app-line pr-4" aria-label="Settings sections">
                <SettingsSectionButton active={section === "storage"} label="Storage" onClick={() => selectSettingsSection("storage")} />
                <SettingsSectionButton active={section === "ai"} label="AI" onClick={() => selectSettingsSection("ai")} />
              </nav>
            ) : null}

            <div className="min-w-0">
              {section === "ai" ? (
                <div className="grid gap-8">
                  <header className="grid gap-1">
                    <h2 className="text-2xl font-bold text-app-ink">AI</h2>
                    <p className="text-sm text-app-muted">Connect a model and configure how BuilderAI works.</p>
                  </header>

                  <nav className="flex gap-6 border-b border-app-line" aria-label="AI settings">
                    <SettingsTabButton active={aiTab === "connection"} label="Connection" onClick={() => selectAiTab("connection")} />
                    <SettingsTabButton active={aiTab === "agent"} label="AI Agent" onClick={() => selectAiTab("agent")} />
                  </nav>

                  {aiTab === "connection" ? (
                    <form
                      className="grid max-w-3xl gap-5"
                      onSubmit={(event) => {
                        event.preventDefault();
                        void saveAiConfig();
                      }}
                    >
                      <div className="grid gap-2 text-sm leading-relaxed text-app-muted">
                        <p>
                          Connect OpenRouter to use BuilderAI. The API key is stored only in this browser and sent to OpenRouter to
                          authenticate requests. It is never included in workspace sync or app invites.
                        </p>
                        <p>App source and conversation context are sent to the selected model only when you submit a BuilderAI request.</p>
                      </div>

                      <ol className="grid gap-3 text-sm leading-relaxed text-app-muted">
                        <li className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3">
                          <span className="grid h-7 min-h-7 w-7 place-items-center rounded-full bg-app-accent font-extrabold text-white">1</span>
                          <span>
                            Create an API key in{" "}
                            <a className="font-extrabold text-app-accent underline" href="https://openrouter.ai/settings/keys" target="_blank" rel="noreferrer">
                              OpenRouter
                            </a>
                            .
                          </span>
                        </li>
                        <li className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3">
                          <span className="grid h-7 min-h-7 w-7 place-items-center rounded-full bg-app-accent font-extrabold text-white">2</span>
                          <span>
                            Choose a model id from the{" "}
                            <a className="font-extrabold text-app-accent underline" href="https://openrouter.ai/models?supported_parameters=tools" target="_blank" rel="noreferrer">
                              tool-capable models
                            </a>
                            .
                          </span>
                        </li>
                        <li className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3">
                          <span className="grid h-7 min-h-7 w-7 place-items-center rounded-full bg-app-accent font-extrabold text-white">3</span>
                          <span>Paste both values below, test the connection, and save them locally.</span>
                        </li>
                      </ol>

                      <label className="grid gap-2 text-sm font-normal text-app-muted">
                        OpenRouter API key
                        <input
                          autoComplete="off"
                          className="min-h-10 rounded-md border border-app-line bg-white px-3 font-mono text-sm text-app-ink outline-none focus:border-app-accent"
                          onChange={(event) => setAiApiKey(event.target.value)}
                          placeholder="sk-or-v1-..."
                          type="password"
                          value={aiApiKey}
                        />
                      </label>
                      <label className="grid gap-2 text-sm font-normal text-app-muted">
                        Model id
                        <input
                          className="min-h-10 rounded-md border border-app-line bg-white px-3 font-mono text-sm text-app-ink outline-none focus:border-app-accent"
                          onChange={(event) => setAiModel(event.target.value)}
                          placeholder="provider/model-name"
                          type="text"
                          value={aiModel}
                        />
                      </label>

                      <SettingsActionBar status={status}>
                        {aiConfig.apiKey || aiConfig.model ? (
                          <button
                            className="min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent"
                            type="button"
                            onClick={() => void clearAiConfig()}
                          >
                            Remove
                          </button>
                        ) : null}
                        <button
                          className="min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent disabled:opacity-50"
                          disabled={!aiApiKey.trim() || !aiModel.trim()}
                          type="button"
                          onClick={() => void testAiConnection()}
                        >
                          Test connection
                        </button>
                        <button
                          className="min-h-9 rounded-md border border-app-accent bg-app-accent px-4 text-sm font-bold text-white hover:bg-app-strong disabled:opacity-50"
                          disabled={!aiApiKey.trim() || !aiModel.trim()}
                          type="submit"
                        >
                          Save AI configuration
                        </button>
                      </SettingsActionBar>
                    </form>
                  ) : (
                    <div className="grid max-w-3xl gap-8">
                      <section className="grid gap-4 border-b border-app-line pb-6" aria-labelledby="global-ai-settings-title">
                        <h3 className="text-xl font-bold text-app-ink" id="global-ai-settings-title">Global settings</h3>
                        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
                          <div className="grid gap-1">
                            <h4 className="text-base font-bold text-app-ink">Conversation memory</h4>
                            <p className="text-sm text-app-muted">Recent messages sent with each request.</p>
                          </div>
                          <div className="grid justify-items-end gap-1">
                            <select
                              aria-label="Conversation memory"
                              className="min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-normal text-app-ink outline-none focus:border-app-accent"
                              value={builderPreferences.conversationMemory}
                              onChange={(event) => void saveConversationMemory(event.target.value as BuilderConversationMemory)}
                            >
                              {(["short", "medium", "long"] as const).map((memory) => (
                                <option key={memory} value={memory}>
                                  {formatMemoryOption(memory)}
                                </option>
                              ))}
                            </select>
                            <span className="min-h-4 text-xs font-normal text-app-muted" aria-live="polite">
                              {memoryStatus === "Ready" ? "" : memoryStatus}
                            </span>
                          </div>
                        </div>
                      </section>

                      <BuilderProfilesSettings
                        activeProfileId={builderPreferences.activeProfileId}
                        profiles={builderProfiles}
                        onCreate={onCreateBuilderProfile}
                        onDelete={onDeleteBuilderProfile}
                        onSelect={selectBuilderProfile}
                        onUpdate={onUpdateBuilderProfile}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid gap-8">
                  <header className="grid gap-1">
                    <h2 className="text-2xl font-bold text-app-ink">Storage and sync</h2>
                    <p className="text-sm text-app-muted">Connect storage for backup, sharing, and cross-device sync.</p>
                  </header>

                  <nav className="flex gap-6 border-b border-app-line" aria-label="Storage settings">
                    <SettingsTabButton active={storageTab === "setup"} label="First-time setup" onClick={() => selectStorageTab("setup")} />
                    <SettingsTabButton active={storageTab === "sync"} label="Sync device" onClick={() => selectStorageTab("sync")} />
                  </nav>

                  {storageTab === "setup" ? (
                    <div className="grid gap-4">
                      <div className="grid gap-2 text-sm leading-relaxed text-app-muted">
                        <p>
                          Connect your own Firebase Realtime Database to back up this browser's apps, restore them on another
                          device, and create app invite links. Complete the security setup in step 2 to protect your storage.
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
                            stepNumber="a"
                            label="Create or sign in to Firebase"
                            detail="Use the Google account that should own this sync storage."
                            onChange={() => toggleSetupStep("create-account")}
                          />
                          <SetupStep
                            checked={setupSteps["create-project"]}
                            stepNumber="b"
                            label="Create a Firebase project"
                            detail="A plain project is enough; App Lab only needs the web app config and Realtime Database."
                            onChange={() => toggleSetupStep("create-project")}
                          />
                          <SetupStep
                            checked={setupSteps["create-database"]}
                            stepNumber="c"
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
                            stepNumber="a"
                            label="Enable Anonymous Auth"
                            detail="In Firebase Authentication, add Anonymous as a sign-in provider."
                            onChange={() => toggleSetupStep("enable-auth")}
                          />
                          <SetupStep
                            checked={setupSteps["paste-rules"]}
                            stepNumber="b"
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
                            stepNumber="a"
                            label="Copy web app config object"
                            detail="Use the config object from Project settings. Authenticated setup requires the apiKey field."
                            onChange={() => toggleSetupStep("copy-config")}
                          >
                            <label className="grid gap-2 text-sm font-normal text-app-muted">
                              Display name
                              <input
                                className="min-h-10 rounded-md border border-app-line bg-white px-3 text-sm font-normal text-app-ink outline-none focus:border-app-accent"
                                value={displayName}
                                onChange={(event) => setDisplayName(event.target.value)}
                                placeholder="My Firebase project"
                              />
                            </label>
                            <label className="grid gap-2 text-sm font-normal text-app-muted">
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
                            stepNumber="b"
                            label="Copy the Realtime Database URL"
                            detail="Use the database URL from Realtime Database, not a Storage bucket URL."
                            onChange={() => toggleSetupStep("copy-url")}
                          >
                            <label className="grid gap-2 text-sm font-normal text-app-muted">
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
                            stepNumber="c"
                            label="Ready to connect and sync"
                            detail="Saving the profile backs up existing local apps to the selected Firebase project."
                            onChange={() => toggleSetupStep("sync")}
                          />
                        </SetupGuideSection>
                      </div>

                      <SettingsActionBar status={status}>
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
                      </SettingsActionBar>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      <p className="text-sm leading-relaxed text-app-muted">
                        Sync device is for moving the whole workspace to another browser or device. Generate sync material on a
                        device that already has this workspace, then paste it on the device you want to sync with.
                      </p>

                      <div className="divide-y divide-app-line">
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

                      {status !== "Ready" ? <span className="text-xs font-normal text-app-muted">{status}</span> : null}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          )}
        </div>
        <SettingsSnackbar message={notice} />
      </section>
    </div>
  );
}

function MobileSettingsMenu({ onOpen }: { onOpen: (section: SettingsSection) => void }) {
  return (
    <nav className="mx-auto w-full max-w-5xl divide-y divide-app-line border-y border-app-line" aria-label="Settings sections">
      <MobileSettingsSection
        description="Back up apps, share them, and sync this workspace."
        label="Storage and sync"
        onClick={() => onOpen("storage")}
      />
      <MobileSettingsSection
        description="Connect a model and configure how BuilderAI works."
        label="AI"
        onClick={() => onOpen("ai")}
      />
    </nav>
  );
}

function MobileSettingsSection({ description, label, onClick }: { description: string; label: string; onClick: () => void }) {
  return (
    <button className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 bg-white px-4 py-4 text-left hover:bg-slate-50" type="button" onClick={onClick}>
      <span className="grid gap-1">
        <span className="text-base font-bold text-app-ink">{label}</span>
        <span className="text-sm text-app-muted">{description}</span>
      </span>
      <span className="text-xl text-app-muted" aria-hidden="true">›</span>
    </button>
  );
}

function SettingsSectionButton({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      aria-current={active ? "page" : undefined}
      className={`min-h-10 border-b-2 px-3 text-left text-sm font-semibold md:border-b-0 md:border-l-2 ${
        active
          ? "border-app-accent bg-app-accent/5 text-app-ink"
          : "border-transparent text-app-muted hover:bg-slate-100 hover:text-app-ink"
      }`}
      type="button"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function SettingsTabButton({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      aria-current={active ? "page" : undefined}
      className={`-mb-px min-h-10 border-b-2 px-0 text-sm font-semibold ${
        active ? "border-app-ink text-app-ink" : "border-transparent text-app-muted hover:text-app-ink"
      }`}
      type="button"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function formatMemoryOption(memory: BuilderConversationMemory): string {
  const label = `${memory.charAt(0).toUpperCase()}${memory.slice(1)}`;
  return `${label} (${BUILDER_MEMORY_MESSAGE_LIMITS[memory]})`;
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
        className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 text-left hover:bg-app-accent/5"
        type="button"
        aria-expanded={open}
        onClick={() => onOpenChange(open ? null : id)}
      >
        <span className="min-w-0">
          <span className="block text-sm font-extrabold text-app-ink">{`${number}. ${title}`}</span>
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
    <section className="grid gap-3 py-5 text-sm leading-relaxed">
      <div className="grid min-w-0 gap-3">
        <div className="grid gap-1">
          <h3 className="font-extrabold text-app-ink">{`${number}. ${title}`}</h3>
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

function isCompactSettingsViewport(): boolean {
  if (typeof window === "undefined") return false;
  if (typeof window.matchMedia === "function") return window.matchMedia("(max-width: 767px)").matches;
  return window.innerWidth <= 767;
}
