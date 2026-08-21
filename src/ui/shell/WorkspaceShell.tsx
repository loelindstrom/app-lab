import { useEffect, useMemo, useRef, useState } from "react";
import type { AiActions, AiChatMessage, AiConfig } from "../../ai";
import {
  createAlpineExampleAppInput,
  type AppLabCore,
  type AppRecord,
  type AppSummary,
  type CreateAppInput,
  type JsonValue,
} from "../../core";
import {
  compileAppStyles,
  SandboxFrame,
  type RemoteDataChange,
  type SandboxConsoleEntry,
} from "../../runtime";
import {
  encodeAppInvite,
  readInviteFromHash,
  type AppInvitePayload,
  type AppInvitePreview,
  type AppSyncBadge,
  type ConfigureStorageProfileInput,
  type PendingSyncOperation,
  type StorageProfile,
  type WorkspaceSyncActions,
} from "../../sync";
import { SettingsDialog } from "../dialogs/SettingsDialog";
import { ToolPanelMode, WorkspaceToolPanel } from "../tools/WorkspaceToolPanel";

type WorkspaceMode = "launcher" | "app";

type AppSyncHealthKind = "none" | "offline" | "pending" | "problem" | "synced" | "syncing";

interface AppSyncHealth {
  kind: AppSyncHealthKind;
  label: string;
  title: string;
  tone: "attention" | "good" | "neutral" | "working";
}

interface BuilderSessionState {
  activity: string | null;
  error: string | null;
  isRunning: boolean;
  messages: AiChatMessage[];
}

interface WorkspaceShellProps {
  aiActions: AiActions;
  core: AppLabCore;
  syncActions: WorkspaceSyncActions;
}

export function WorkspaceShell({ aiActions, core, syncActions }: WorkspaceShellProps) {
  const [aiConfig, setAiConfig] = useState<AiConfig>({ apiKey: "", model: "" });
  const [builderSessions, setBuilderSessions] = useState<Record<string, BuilderSessionState>>({});
  const [apps, setApps] = useState<AppSummary[]>([]);
  const [syncBadges, setSyncBadges] = useState<Record<string, AppSyncBadge>>({});
  const [syncHealth, setSyncHealth] = useState<Record<string, AppSyncHealth>>({});
  const [storageProfile, setStorageProfile] = useState<StorageProfile | null>(null);
  const [workspaceManifestRoomId, setWorkspaceManifestRoomId] = useState<string | null>(null);
  const [activeApp, setActiveApp] = useState<AppRecord | null>(null);
  const [mode, setMode] = useState<WorkspaceMode>("launcher");
  const [activeTool, setActiveTool] = useState<ToolPanelMode | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsInitialSection, setSettingsInitialSection] = useState<"ai" | "storage" | undefined>();
  const [sharingApp, setSharingApp] = useState<AppSummary | null>(null);
  const [pendingInvite, setPendingInvite] = useState<AppInvitePayload | null>(null);
  const [remoteDataChange, setRemoteDataChange] = useState<RemoteDataChange | null>(null);
  const [aiAttentionKey, setAiAttentionKey] = useState(0);
  const [aiAttentionDismissed, setAiAttentionDismissed] = useState(true);
  const [consoleEntries, setConsoleEntries] = useState<SandboxConsoleEntry[]>([]);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [syncStatusOpen, setSyncStatusOpen] = useState(false);
  const [sandboxReloadKey, setSandboxReloadKey] = useState(0);
  const activeAppIdRef = useRef<string | null>(null);
  const builderRunningAppIdsRef = useRef(new Set<string>());
  const browserOnlineRef = useRef(navigator.onLine);
  const consoleEntriesRef = useRef<SandboxConsoleEntry[]>([]);
  const providerOnlineRef = useRef<boolean | null>(null);
  activeAppIdRef.current = activeApp?.appId ?? null;
  consoleEntriesRef.current = consoleEntries;

  function isSyncReachable() {
    return browserOnlineRef.current && providerOnlineRef.current !== false;
  }

  useEffect(() => {
    void refreshApps(isSyncReachable());
  }, []);

  useEffect(() => {
    void aiActions.getConfig().then(setAiConfig);
  }, [aiActions]);

  useEffect(() => {
    let cancelled = false;
    let unsubscribeConnection: (() => void) | null = null;
    let unsubscribeWorkspaceManifest: (() => void) | null = null;

    async function wakePendingSync(online = isSyncReachable()) {
      try {
        if (!online) {
          if (!cancelled) await refreshApps(false);
          return;
        }
        await syncActions.flushRoomLifecycleQueue();
        await syncActions.flushSourceSyncQueue();
        await syncActions.flushAppDataSyncQueue();
        await syncActions.flushOwnedAppDeletionQueue();
        await syncActions.flushWorkspaceManifestQueue();
        await syncActions.pullLatestWorkspaceManifest();
        if (!cancelled) await refreshApps(true);
      } catch (error) {
        const detail = error instanceof Error ? error.message : "Unknown sync error.";
        if (!cancelled) setSyncStatus(`Could not retry pending sync: ${detail}`);
      }
    }

    function wakeIfVisible() {
      if (document.visibilityState === "visible") void wakePendingSync(isSyncReachable());
    }

    function wakeIfFocused() {
      void wakePendingSync(isSyncReachable());
    }

    function markOnline() {
      browserOnlineRef.current = true;
      void wakePendingSync(isSyncReachable());
    }

    function markOffline() {
      browserOnlineRef.current = false;
      void refreshApps(false);
    }

    async function startSyncWakeups() {
      const { storageConfigured } = await syncActions.initializeWorkspaceSync();
      if (!storageConfigured) {
        void wakePendingSync(isSyncReachable());
        return;
      }

      unsubscribeConnection = await syncActions.subscribeStorageConnection((connected) => {
        providerOnlineRef.current = connected;
        if (connected) void wakePendingSync(isSyncReachable());
        else void refreshApps(false);
      });
      unsubscribeWorkspaceManifest = await syncActions.subscribeWorkspaceManifest(() => {
        if (!cancelled) void refreshApps(isSyncReachable());
      });
    }

    providerOnlineRef.current = null;
    void startSyncWakeups();
    window.addEventListener("online", markOnline);
    window.addEventListener("offline", markOffline);
    window.addEventListener("focus", wakeIfFocused);
    document.addEventListener("visibilitychange", wakeIfVisible);
    return () => {
      cancelled = true;
      unsubscribeConnection?.();
      unsubscribeWorkspaceManifest?.();
      window.removeEventListener("online", markOnline);
      window.removeEventListener("offline", markOffline);
      window.removeEventListener("focus", wakeIfFocused);
      document.removeEventListener("visibilitychange", wakeIfVisible);
    };
  }, [storageProfile?.profileId, storageProfile?.databaseUrl, syncActions, workspaceManifestRoomId]);

  useEffect(() => {
    function readHashInvite() {
      try {
        setPendingInvite(readInviteFromHash(window.location.hash));
      } catch (_) {
        setPendingInvite(null);
      }
    }

    readHashInvite();
    window.addEventListener("hashchange", readHashInvite);
    return () => window.removeEventListener("hashchange", readHashInvite);
  }, []);

  useEffect(() => {
    if (!activeApp) return;
    const subscribedApp = activeApp;
    let unsubscribe: (() => void) | null = null;
    let cancelled = false;

    async function subscribe() {
      const nextUnsubscribe = await syncActions.subscribeAppData(subscribedApp.appId, ({ data, version }) => {
        if (cancelled) return;
        setRemoteDataChange({ data, id: crypto.randomUUID(), version });
      });
      if (cancelled) nextUnsubscribe();
      else unsubscribe = nextUnsubscribe;
    }

    void subscribe();
    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, [activeApp?.appId, syncActions]);

  useEffect(() => {
    if (!activeApp) return;
    const subscribedApp = activeApp;
    let unsubscribe: (() => void) | null = null;
    let cancelled = false;

    async function subscribe() {
      const nextUnsubscribe = await syncActions.subscribeAppSource(
        subscribedApp.appId,
        ({ app }) => {
          if (cancelled) return;
          setActiveApp(app);
          setSyncStatus(null);
          void refreshApps();
        },
        () => {
          if (cancelled) return;
          setSyncStatus("This shared app was deleted by its owner.");
          void refreshApps();
        },
      );
      if (cancelled) nextUnsubscribe();
      else unsubscribe = nextUnsubscribe;
    }

    void subscribe();
    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, [activeApp?.appId, syncActions]);

  async function refreshApps(online = isSyncReachable()) {
    const nextApps = await core.listApps();
    const syncOverview = await syncActions.getWorkspaceSyncOverview(nextApps.map((app) => app.appId));
    setApps(nextApps);
    setSyncBadges(syncOverview.appBadges);
    setSyncHealth(buildAppSyncHealthMap({ apps: nextApps, badges: syncOverview.appBadges, isOnline: online, queueItems: syncOverview.pendingOperations }));
    setStorageProfile(syncOverview.storageProfile);
    setWorkspaceManifestRoomId(syncOverview.workspaceManifestRoomId);
  }

  async function openApp(appId: string) {
    const app = await core.getApp(appId);
    if (!app) return;
    setActiveApp(app);
    setMode("app");
    setActiveTool(null);
    setConsoleEntries([]);
    setSyncStatusOpen(false);
    setAiAttentionKey((key) => key + 1);
    setAiAttentionDismissed(false);
    void pullLatestAppRooms(appId);
  }

  async function createAppFromInput(input: CreateAppInput) {
    let compiledStyles = {};
    let compileWarning: string | null = null;
    try {
      compiledStyles = await compileAppStyles(input.sourceCode);
    } catch (error) {
      const detail = error instanceof Error ? error.message : "Unknown Tailwind compile error.";
      compileWarning = `${input.name} created without compiled Tailwind CSS: ${detail}`;
    }
    const app = await core.createApp({
      ...input,
      ...compiledStyles,
    });
    if (compileWarning) setSyncStatus(compileWarning);
    setActiveApp(app);
    setMode("app");
    setActiveTool(null);
    setConsoleEntries([]);
    setSyncStatusOpen(false);
    setAiAttentionKey((key) => key + 1);
    setAiAttentionDismissed(false);
    void syncActions.ensureAppBackedUp(app, { flush: isSyncReachable() }).then(
      () => refreshApps(),
      (error) => {
        const detail = error instanceof Error ? error.message : "Unknown sync error.";
        setSyncStatus(`App created locally. Remote backup failed: ${detail}`);
        void refreshApps(false);
      },
    );
    refreshWhenSettled(syncActions.flushRoomLifecycleQueue());
    await refreshApps();
  }

  async function createApp() {
    await createAppFromInput(createAlpineExampleAppInput());
  }

  async function saveAppSource(appId: string, sourceCode: string): Promise<AppRecord> {
    assertCompleteAppSource(sourceCode);

    let compiledStyles: Pick<AppRecord, "compiledCss" | "compiledCssSourceHash">;
    let compileWarning: string | null = null;
    try {
      compiledStyles = await compileAppStyles(sourceCode);
    } catch (error) {
      const detail = error instanceof Error ? error.message : "Unknown Tailwind compile error.";
      compiledStyles = { compiledCss: undefined, compiledCssSourceHash: undefined };
      compileWarning = `Source saved without compiled Tailwind CSS: ${detail}`;
    }

    const updated = await core.updateApp({ appId, sourceCode, ...compiledStyles });
    let syncWarning: string | null = null;
    try {
      await syncActions.pushAppSource(updated);
    } catch (error) {
      const detail = error instanceof Error ? error.message : "Unknown sync error.";
      syncWarning = `Source saved locally. Remote source sync failed: ${detail}`;
    }

    refreshWhenSettled(syncActions.flushSourceSyncQueue());
    if (activeAppIdRef.current === appId) {
      setActiveApp(updated);
      setConsoleEntries([]);
      setSyncStatus([compileWarning, syncWarning].filter(Boolean).join(" ") || null);
    }
    await refreshApps();
    return updated;
  }

  async function sendBuilderMessage(app: AppRecord, content: string): Promise<void> {
    const message = content.trim();
    if (!message || builderRunningAppIdsRef.current.has(app.appId)) return;

    const currentMessages = builderSessions[app.appId]?.messages ?? [];
    const userMessage = createAiChatMessage(app.appId, "user", message);
    const requestMessages = [...currentMessages, userMessage];
    builderRunningAppIdsRef.current.add(app.appId);
    updateBuilderSession(app.appId, (session) => ({
      ...session,
      activity: "Thinking...",
      error: null,
      isRunning: true,
      messages: requestMessages,
    }));

    try {
      const result = await aiActions.runBuilderTurn({
        appId: app.appId,
        appName: app.name,
        messages: requestMessages,
        onActivity: (activity) => {
          updateBuilderSession(app.appId, (session) => ({ ...session, activity }));
        },
        tools: {
          readCurrentAppSource: async () => {
            const currentApp = await core.getApp(app.appId);
            if (!currentApp) throw new Error("The app no longer exists.");
            return toBuilderAppSource(currentApp);
          },
          readRecentConsoleOutput: async () => {
            if (activeAppIdRef.current !== app.appId) return "The app is no longer active, so recent console output is unavailable.";
            return formatConsoleForBuilder(consoleEntriesRef.current);
          },
          replaceCurrentAppSource: async (sourceCode) => {
            return toBuilderAppSource(await saveAppSource(app.appId, sourceCode));
          },
        },
      });
      updateBuilderSession(app.appId, (session) => ({
        ...session,
        messages: [...session.messages, createAiChatMessage(app.appId, "assistant", result.content)],
      }));
    } catch (error) {
      updateBuilderSession(app.appId, (session) => ({
        ...session,
        error: error instanceof Error ? error.message : "BuilderAI could not complete the request.",
      }));
    } finally {
      builderRunningAppIdsRef.current.delete(app.appId);
      updateBuilderSession(app.appId, (session) => ({ ...session, activity: null, isRunning: false }));
    }
  }

  function clearBuilderConversation(appId: string) {
    if (builderRunningAppIdsRef.current.has(appId)) return;
    setBuilderSessions((sessions) => {
      const nextSessions = { ...sessions };
      delete nextSessions[appId];
      return nextSessions;
    });
  }

  function updateBuilderSession(appId: string, update: (session: BuilderSessionState) => BuilderSessionState) {
    setBuilderSessions((sessions) => ({
      ...sessions,
      [appId]: update(sessions[appId] ?? createEmptyBuilderSession()),
    }));
  }

  function openLauncher() {
    setMode("launcher");
    setActiveTool(null);
    void syncActions
      .pullLatestWorkspaceManifest()
      .catch((error) => {
        const detail = error instanceof Error ? error.message : "Unknown sync error.";
        setSyncStatus(`Could not pull latest workspace: ${detail}`);
      })
      .finally(() => {
        void refreshApps(isSyncReachable());
      });
  }

  function toggleTool(nextTool: ToolPanelMode) {
    if (nextTool === "builder") {
      setAiAttentionDismissed(true);
    }

    setActiveTool((currentTool) => (currentTool === nextTool ? null : nextTool));
  }

  const title = useMemo(() => {
    if (mode === "launcher") return "App Lab";
    return activeApp?.name ?? "App";
  }, [activeApp?.name, mode]);
  const activeAppSyncHealth = activeApp ? syncHealth[activeApp.appId] : undefined;
  const headerSyncHealth = syncStatus
    ? ({
        kind: "problem",
        label: "",
        title: syncStatus,
        tone: "attention",
      } satisfies AppSyncHealth)
    : activeAppSyncHealth;

  return (
    <div className="grid min-h-[calc(100dvh+1px)] grid-rows-[44px_minmax(0,1fr)_auto] overflow-x-hidden lg:min-h-dvh">
      <header className="grid grid-cols-[88px_minmax(0,1fr)_112px] items-center border-b border-app-line bg-app-panel/90 px-2 lg:grid-cols-[1fr_auto_1fr]">
        <div className="justify-self-start">
          {mode === "app" ? (
            <button
              className="min-h-9 rounded-md border border-transparent bg-transparent px-3 font-bold text-app-accent hover:bg-app-accent/10"
              type="button"
              onClick={openLauncher}
            >
              ‹ Apps
            </button>
          ) : null}
        </div>
        <h1 className="max-w-[50vw] truncate text-center text-[17px] font-extrabold">{title}</h1>
        <nav className="relative flex items-center justify-end gap-1 lg:gap-3" aria-label="Workspace actions">
          {mode === "app" && headerSyncHealth && headerSyncHealth.kind !== "none" ? (
            <CloudSyncIndicator
              health={headerSyncHealth}
              onReload={
                syncStatus
                  ? () => {
                      setSandboxReloadKey((key) => key + 1);
                      setSyncStatus(null);
                      setSyncStatusOpen(false);
                    }
                  : undefined
              }
              open={syncStatusOpen}
              onOpenChange={setSyncStatusOpen}
              popoverAlign="right"
            />
          ) : null}
          {mode === "app" && activeApp ? (
            <button
              className="grid h-9 min-h-9 w-9 place-items-center rounded-md border border-transparent bg-transparent text-app-muted hover:bg-app-accent/10 hover:text-app-accent"
              type="button"
              aria-label={`Share ${activeApp.name}`}
              title="Share"
              onClick={() => setSharingApp(activeApp)}
            >
              <ShareIcon className="h-5 w-5" />
            </button>
          ) : null}
          <button
            className="grid h-9 min-h-9 w-9 place-items-center rounded-md border border-transparent bg-transparent text-lg text-app-muted hover:bg-app-accent/10 hover:text-app-accent"
            type="button"
            aria-label="Open settings"
            onClick={() => {
              setSettingsInitialSection(undefined);
              setSettingsOpen(true);
            }}
          >
            ⚙
          </button>
          {mode === "app" && activeApp ? (
            <div className="hidden lg:block">
              <ToolSwitch
                activeTool={activeTool}
                aiAttentionDismissed={aiAttentionDismissed}
                aiAttentionKey={aiAttentionKey}
                consoleCount={consoleEntries.length}
                onToggleTool={toggleTool}
              />
            </div>
          ) : null}
        </nav>
      </header>

      <main className={`min-h-0 overflow-hidden ${activeTool ? "lg:mr-[min(420px,36vw)]" : ""}`}>
        {mode === "launcher" ? (
          <LauncherView
            apps={apps}
            onDeleteApp={async (appId) => {
              await syncActions.deleteSyncedAppRooms(appId);
              await core.deleteApp(appId);
              await syncActions.removeLocalAppSync(appId);
              await syncActions.queueWorkspaceManifestSave();
              void syncActions.flushWorkspaceManifestQueue();
              await refreshApps();
            }}
            onOpenApp={openApp}
            onShareApp={(app) => setSharingApp(app)}
            storageProfile={storageProfile}
            syncBadges={syncBadges}
            syncHealth={syncHealth}
          />
        ) : activeApp ? (
          <AppView
            app={activeApp}
            core={core}
            reloadKey={sandboxReloadKey}
            remoteDataChange={remoteDataChange}
            onConsoleEntry={(entry) => {
              setConsoleEntries((entries) => [...entries.slice(-199), entry]);
            }}
            onSaveAppData={async (appId, data) => {
              setRemoteDataChange(null);
              syncActions.noteLocalAppDataEdit(appId);
              await core.saveAppData(appId, data);
              await trySync("App data saved locally. Remote data sync failed", () => syncActions.pushAppData(appId, data));
              refreshWhenSettled(syncActions.flushAppDataSyncQueue());
              await refreshApps();
            }}
            onUnhandledRemoteDataChange={() => {
              setSyncStatus("Remote data changed. This app does not handle live updates yet; reopen it to reload latest data.");
            }}
          />
        ) : null}
      </main>

      {mode === "app" && activeApp ? (
        <>
          <footer className="sticky bottom-0 z-30 flex h-11 shrink-0 items-center justify-end border-t border-app-line bg-app-panel/95 px-3 lg:hidden">
            <ToolSwitch
              activeTool={activeTool}
              aiAttentionDismissed={aiAttentionDismissed}
              aiAttentionKey={aiAttentionKey}
              consoleCount={consoleEntries.length}
              onToggleTool={toggleTool}
            />
          </footer>
          <WorkspaceToolPanel
            activeApp={activeApp}
            aiConfigured={Boolean(aiConfig.apiKey && aiConfig.model)}
            builderActivity={builderSessions[activeApp.appId]?.activity ?? null}
            builderError={builderSessions[activeApp.appId]?.error ?? null}
            builderIsRunning={builderSessions[activeApp.appId]?.isRunning ?? false}
            builderMessages={builderSessions[activeApp.appId]?.messages ?? []}
            consoleEntries={consoleEntries}
            mode={activeTool}
            onClearBuilderConversation={() => clearBuilderConversation(activeApp.appId)}
            onClearConsole={() => setConsoleEntries([])}
            onClose={() => setActiveTool(null)}
            onLoadAppData={core.getAppData}
            onOpenAiSettings={() => {
              setSettingsInitialSection("ai");
              setSettingsOpen(true);
            }}
            onSaveSource={(sourceCode) => saveAppSource(activeApp.appId, sourceCode)}
            onSendBuilderMessage={(content) => sendBuilderMessage(activeApp, content)}
          />
        </>
      ) : mode === "launcher" ? (
        <>
          <button
            className="fixed bottom-5 right-5 z-20 grid h-14 min-h-14 w-14 place-items-center rounded-full border border-app-accent bg-app-accent text-3xl font-light leading-none text-white shadow-panel hover:bg-app-strong"
            type="button"
            aria-label="Create new app"
            onClick={createApp}
          >
            +
          </button>
        </>
      ) : null}

      <SettingsDialog
        aiConfig={aiConfig}
        initialSection={settingsInitialSection}
        isOpen={settingsOpen}
        storageProfile={storageProfile}
        onClearAiConfig={async () => {
          await aiActions.clearConfig();
          setAiConfig({ apiKey: "", model: "" });
        }}
        onClearStorageProfile={async () => {
          await syncActions.clearStorageProfile();
          await refreshApps();
        }}
        onClose={() => setSettingsOpen(false)}
        onConfigureStorageProfile={async (input: ConfigureStorageProfileInput) => {
          await syncActions.configureStorageProfile(input);
          await trySync("Storage configured locally. Remote backup failed", () => syncActions.backUpLocalApps());
          await refreshApps();
        }}
        onSaveAiConfig={async (config) => {
          const saved = await aiActions.saveConfig(config);
          setAiConfig(saved);
          return saved;
        }}
        onTestAiConnection={aiActions.testConnection}
        onExportWorkspaceRecovery={async () => {
          return syncActions.exportWorkspaceRecovery();
        }}
        onRestoreWorkspaceRecovery={async (recoveryText) => {
          await syncActions.restoreWorkspaceRecovery(recoveryText);
          window.setTimeout(() => void refreshApps(), 0);
        }}
      />
      <ShareAppDialog
        app={sharingApp}
        onClose={() => setSharingApp(null)}
        onOpenStorageSettings={() => {
          setSharingApp(null);
          setSettingsInitialSection("storage");
          setSettingsOpen(true);
        }}
        onCreateInvite={async (appId) => {
          const invite = await syncActions.createInvite(appId);
          await refreshApps();
          return invite;
        }}
        storageProfile={storageProfile}
      />
      <InviteImportDialog
        invite={pendingInvite}
        onClose={() => {
          setPendingInvite(null);
          if (window.location.hash.startsWith("#applab-invite=")) history.replaceState(null, "", window.location.pathname + window.location.search);
        }}
        onPreview={syncActions.previewInvite}
        onImport={async (invite) => {
          await syncActions.importInvite(invite);
          await refreshApps();
          setPendingInvite(null);
          if (window.location.hash.startsWith("#applab-invite=")) history.replaceState(null, "", window.location.pathname + window.location.search);
        }}
      />
    </div>
  );

  async function pullLatestAppRooms(appId: string) {
    await trySync("Could not pull latest shared app", async () => {
      const result = await syncActions.pullLatestAppRooms(appId);
      if (result.deletedAt) throw new Error("This shared app was deleted by its owner.");
      if (result.app) setActiveApp(result.app);
    });
    await refreshApps();
  }

  async function trySync(prefix: string, action: () => Promise<void>): Promise<string | null> {
    try {
      await action();
      setSyncStatus(null);
      return null;
    } catch (error) {
      const detail = error instanceof Error ? error.message : "Unknown sync error.";
      const message = `${prefix}: ${detail}`;
      setSyncStatus(message);
      return message;
    }
  }

  function refreshWhenSettled(promise: Promise<void>) {
    void promise.finally(() => {
      void refreshApps();
    });
  }

}

function assertCompleteAppSource(sourceCode: string): void {
  const start = sourceCode.trimStart().toLowerCase();
  if (!/^<!doctype\s+html(?:\s[^>]*)?>/.test(start) && !/^<html(?:\s|>)/.test(start)) {
    throw new Error("Source must be a complete HTML document starting with <!doctype html> or <html>.");
  }
}

interface LauncherViewProps {
  apps: AppSummary[];
  onDeleteApp: (appId: string) => Promise<void>;
  onOpenApp: (appId: string) => void;
  onShareApp: (app: AppSummary) => void;
  storageProfile: StorageProfile | null;
  syncBadges: Record<string, AppSyncBadge>;
  syncHealth: Record<string, AppSyncHealth>;
}

interface ToolSwitchProps {
  activeTool: ToolPanelMode | null;
  aiAttentionDismissed: boolean;
  aiAttentionKey: number;
  consoleCount: number;
  onToggleTool: (tool: ToolPanelMode) => void;
}

function ToolSwitch({ activeTool, aiAttentionDismissed, aiAttentionKey, consoleCount, onToggleTool }: ToolSwitchProps) {
  const showAiAttention = !aiAttentionDismissed && activeTool !== "builder";

  return (
    <div className="flex h-9 items-stretch gap-1 rounded-lg border border-app-line bg-white/90 p-1" role="group" aria-label="App tools">
      <button
        className={`relative min-h-0 rounded-md border-0 bg-transparent px-3 font-bold text-app-muted hover:text-app-accent ${
          activeTool === "console" ? "text-app-accent after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:bg-app-accent" : ""
        }`}
        type="button"
        aria-label="Toggle console"
        onClick={() => onToggleTool("console")}
      >
        Log
        {consoleCount > 0 ? (
          <span className="absolute -right-1 -top-1 grid min-h-4 min-w-4 place-items-center rounded-full bg-red-600 px-1 text-[10px] font-extrabold leading-none text-white shadow-sm">
            {consoleCount > 99 ? "99+" : consoleCount}
          </span>
        ) : null}
      </button>
      <button
        className={`relative min-h-0 rounded-md border-0 bg-transparent px-3 font-mono font-bold text-app-muted hover:text-app-accent ${
          activeTool === "source" ? "text-app-accent after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:bg-app-accent" : ""
        }`}
        type="button"
        aria-label="Toggle source"
        onClick={() => onToggleTool("source")}
      >
        &lt;&gt;
      </button>
      <button
        className={`relative min-h-0 overflow-hidden rounded-md border-0 bg-transparent px-3 font-bold text-app-muted hover:text-app-violet ${
          activeTool === "builder" ? "text-app-violet after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:bg-app-violet" : ""
        }`}
        type="button"
        aria-label="Toggle BuilderAI"
        onClick={() => onToggleTool("builder")}
      >
        {showAiAttention ? (
          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 36" preserveAspectRatio="none" aria-hidden="true">
            <rect
              key={aiAttentionKey}
              className="ai-snake-path"
              x="2"
              y="2"
              width="96"
              height="32"
              rx="6"
              ry="6"
              pathLength="100"
              fill="none"
              stroke="#8b5cf6"
              strokeLinecap="round"
            />
          </svg>
        ) : null}
        <span key={aiAttentionKey} className={`relative z-10 ${showAiAttention ? "animate-ai-text-shimmer" : ""}`}>
          AI ✦
        </span>
      </button>
    </div>
  );
}

function LauncherView({ apps, onDeleteApp, onOpenApp, onShareApp, storageProfile, syncBadges, syncHealth }: LauncherViewProps) {
  const [selectedApp, setSelectedApp] = useState<AppSummary | null>(null);

  return (
    <section className="mx-auto h-full w-full max-w-5xl overflow-auto px-4 py-7 pb-24" aria-label="Apps">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="mb-1 text-xs font-extrabold uppercase text-app-muted">Workspace</p>
          <h2 className="text-[clamp(24px,4vw,38px)] font-extrabold leading-none">Choose an app</h2>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <span className="rounded-full border border-app-line bg-white px-3 py-1 text-xs font-extrabold uppercase text-app-muted">
            {storageProfile ? `Storage: ${storageProfile.displayName}` : "Local only"}
          </span>
        </div>
      </div>

      {apps.length ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3">
          {apps.map((app) => (
            <LauncherCard
              app={app}
              key={app.appId}
              onOpenActions={() => setSelectedApp(app)}
              onOpen={() => onOpenApp(app.appId)}
              onShare={() => onShareApp(app)}
              syncBadge={syncBadges[app.appId] ?? { kind: "local-only", label: "Private", tone: "neutral" }}
              syncHealth={syncHealth[app.appId] ?? { kind: "none", label: "", title: "", tone: "neutral" }}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-app-line bg-app-panel/70 p-8 text-app-muted">
          No apps yet. Use the + button to create the example app.
        </div>
      )}

      <LauncherAppActionsDialog
        app={selectedApp}
        onClose={() => setSelectedApp(null)}
        onDeleteApp={async (appId) => {
          await onDeleteApp(appId);
          setSelectedApp(null);
        }}
        syncBadge={selectedApp ? syncBadges[selectedApp.appId] : undefined}
      />
    </section>
  );
}

function LauncherCard({
  app,
  onOpenActions,
  onOpen,
  onShare,
  syncBadge,
  syncHealth,
}: {
  app: AppSummary;
  onOpenActions: () => void;
  onOpen: () => void;
  onShare: () => void;
  syncBadge: AppSyncBadge;
  syncHealth: AppSyncHealth;
}) {
  const isRemoteDeleted = syncBadge.kind === "needs-attention";
  return (
    <article
      className={`relative grid min-h-32 content-start gap-3 rounded-lg border border-app-line bg-app-surface/95 p-4 text-app-ink shadow-[0_10px_30px_rgb(46_38_24_/_8%)] hover:bg-white ${
        isRemoteDeleted ? "opacity-75" : ""
      }`}
    >
      <button
        className="absolute right-3 top-3 grid h-8 min-h-8 w-8 place-items-center rounded-md border border-transparent bg-white/80 text-base text-app-muted hover:border-app-accent hover:text-app-accent"
        type="button"
        aria-label={`Open app actions for ${app.name}`}
        title="App actions"
        onClick={onOpenActions}
      >
        <svg className="h-4 w-4" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.2 19.8 6.4 14.1 9.9 17.6 4.2 19.8Z"></path>
          <path d="M8.1 12.4 13.4 7.1 16.9 10.6 11.6 15.9Z"></path>
          <path d="M15.1 5.4 17.4 3.1 20.9 6.6 18.6 8.9Z"></path>
        </svg>
      </button>
      <button className="grid gap-2 pr-9 text-left disabled:cursor-default" type="button" disabled={isRemoteDeleted} onClick={onOpen}>
        <strong className={`text-lg leading-tight ${isRemoteDeleted ? "line-through decoration-2" : ""}`}>{app.name}</strong>
        <span className="line-clamp-3 text-sm leading-snug text-app-muted">{app.description}</span>
      </button>
      <div className="flex flex-wrap gap-2">
        <span
          className={`rounded-full px-2 py-1 text-[11px] font-extrabold uppercase ${syncBadgeClassName(syncBadge.tone)}`}
          title={isRemoteDeleted ? "The owner deleted this shared app. You can remove this local entry from app actions." : undefined}
        >
          {syncBadge.label}
          {isRemoteDeleted ? " ⓘ" : ""}
        </span>
        {syncHealth.kind !== "none" ? (
          <CloudSyncIndicator health={syncHealth} popoverAlign="left" />
        ) : null}
      </div>
      <div className="mt-auto flex items-center justify-between gap-2 border-t border-app-line pt-3">
        <span className="truncate text-xs font-bold text-app-muted">{formatDate(app.updatedAt)}</span>
        <div className="flex gap-2">
          <button
            className="inline-flex min-h-8 items-center gap-1.5 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            disabled={isRemoteDeleted}
            onClick={onShare}
          >
            <ShareIcon className="h-4 w-4" />
            Share
          </button>
          <button
            className="min-h-8 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            disabled={isRemoteDeleted}
            onClick={onOpen}
          >
            Open
          </button>
        </div>
      </div>
    </article>
  );
}

function ShareIcon({ className }: { className: string }) {
  return (
    <svg className={className} aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M8.1 10.7 15.6 6.6M8.1 13.3l7.5 4.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="6" cy="12" r="2.4" fill="currentColor" />
      <circle cx="18" cy="5.5" r="2.4" fill="currentColor" />
      <circle cx="18" cy="18.5" r="2.4" fill="currentColor" />
    </svg>
  );
}

function syncBadgeClassName(tone: AppSyncBadge["tone"]): string {
  if (tone === "good") return "bg-emerald-50 text-emerald-700";
  if (tone === "shared") return "bg-violet-50 text-violet-700";
  if (tone === "attention") return "bg-amber-50 text-amber-800";
  return "bg-slate-100 text-app-muted";
}

function buildAppSyncHealthMap(input: {
  apps: AppSummary[];
  badges: Record<string, AppSyncBadge>;
  isOnline: boolean;
  queueItems: PendingSyncOperation[];
}): Record<string, AppSyncHealth> {
  return Object.fromEntries(
    input.apps.map((app) => {
      const badge = input.badges[app.appId];
      const items = input.queueItems.filter((item) => item.appId === app.appId);
      return [app.appId, describeAppSyncHealth({ badge, isOnline: input.isOnline, items })];
    }),
  );
}

function describeAppSyncHealth(input: { badge?: AppSyncBadge; isOnline: boolean; items: PendingSyncOperation[] }): AppSyncHealth {
  if (input.badge?.kind === "local-only") return { kind: "none", label: "", title: "", tone: "neutral" };
  if (input.badge?.kind === "needs-attention") {
    return {
      kind: "problem",
      label: "",
      title: "This shared app was deleted by its owner. You can remove this local entry from app actions.",
      tone: "attention",
    };
  }
  if (!input.items.length) return { kind: "synced", label: "☁ ✓", title: "Synced with remote storage.", tone: "good" };

  if (!input.isOnline) {
    return {
      kind: "offline",
      label: "☁ ×",
      title: "Offline. Local changes are saved and will sync when the browser comes back online.",
      tone: "attention",
    };
  }

  const problem = input.items.find((item) => item.lastError || item.status === "problem");
  if (problem) {
    return {
      kind: "problem",
      label: "☁ !",
      title: `Could not sync ${formatQueueKind(problem.kind)}. App Lab will retry when sync wakes up. ${problem.lastError ?? ""}`.trim(),
      tone: "attention",
    };
  }

  if (input.items.some((item) => item.status === "syncing")) {
    return { kind: "syncing", label: "☁ …", title: "Syncing local changes to remote storage.", tone: "working" };
  }

  return { kind: "pending", label: "☁ …", title: "Local changes are queued for remote sync.", tone: "working" };
}

function CloudSyncIndicator({
  health,
  onOpenChange,
  onReload,
  open,
  popoverAlign = "right",
}: {
  health: AppSyncHealth;
  onOpenChange?: (open: boolean) => void;
  onReload?: () => void;
  open?: boolean;
  popoverAlign?: "left" | "right";
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;
  const toneClass =
    health.kind === "synced"
      ? "text-emerald-600 hover:bg-emerald-50"
      : health.kind === "pending" || health.kind === "syncing"
        ? "text-blue-600 hover:bg-blue-50"
        : health.kind === "offline"
          ? "text-slate-500 hover:bg-slate-100"
          : "text-red-600 hover:bg-red-50";
  const popoverToneClass =
    health.kind === "synced"
      ? "border-emerald-100"
      : health.kind === "pending" || health.kind === "syncing"
        ? "border-blue-100"
        : health.kind === "offline"
          ? "border-slate-200"
          : "border-red-100";

  return (
    <div className="relative inline-grid place-items-center">
      <button
        aria-label={`Open sync status: ${health.title}`}
        className={`grid h-9 min-h-9 w-9 place-items-center rounded-md border border-transparent bg-transparent ${toneClass}`}
        title={health.title}
        type="button"
        onClick={() => setOpen(!isOpen)}
      >
        <CloudSyncIcon kind={health.kind} />
      </button>
      {isOpen ? (
        <div
          className={`absolute top-10 z-40 grid w-72 gap-3 rounded-lg border ${popoverToneClass} bg-white p-3 text-left text-app-ink shadow-panel ${
            popoverAlign === "left" ? "left-0" : "right-0"
          }`}
        >
          <div className="flex items-start gap-3">
            <div className={toneClass.replace(/hover:[^ ]+/g, "")}>
              <CloudSyncIcon kind={health.kind} />
            </div>
            <div className="grid gap-1">
              <p className="text-xs font-extrabold uppercase text-app-muted">Sync status</p>
              <p className="text-sm font-bold leading-snug">{health.title}</p>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2">
            <button
              className="min-h-8 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent"
              type="button"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
            {onReload ? (
              <button
                aria-label="Reload app"
                className="grid h-8 min-h-8 w-8 place-items-center rounded-md border border-app-accent bg-app-accent text-lg font-bold text-white hover:bg-app-strong"
                title="Reload app"
                type="button"
                onClick={onReload}
              >
                ↻
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function CloudSyncIcon({ kind }: { kind: AppSyncHealthKind }) {
  return (
    <svg aria-hidden="true" className="block h-7 w-7" viewBox="0 0 64 64">
      <path
        d="M20 46h26a12 12 0 0 0 1.2-23.9A17 17 0 0 0 15.5 27.5 9.5 9.5 0 0 0 20 46Z"
        fill="#f8fafc"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.8"
      />
      {kind === "synced" ? (
        <path d="m25 35 5 5 10-12" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4" />
      ) : null}
      {kind === "pending" ? (
        <>
          <circle className="cloud-sync-dot-one" cx="27" cy="36" fill="currentColor" r="2.4" />
          <circle className="cloud-sync-dot-two" cx="32" cy="36" fill="currentColor" r="2.4" />
          <circle className="cloud-sync-dot-three" cx="37" cy="36" fill="currentColor" r="2.4" />
        </>
      ) : null}
      {kind === "syncing" ? (
        <g className="cloud-sync-spin">
          <path d="M37.7 27.3a8 8 0 0 1 2.1 8.8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4" />
          <path
            d="M24 33a8 8 0 0 1 13.7-5.7"
            fill="none"
            opacity="0.58"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.4"
          />
          <path
            d="M26.4 38.7A8 8 0 0 1 24 33"
            fill="none"
            opacity="0.24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.4"
          />
        </g>
      ) : null}
      {kind === "offline" ? (
        <path d="M17 17 47 47" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4" />
      ) : null}
      {kind === "problem" ? (
        <>
          <path d="M32 21.8v9.4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4" />
          <circle cx="32" cy="38.8" fill="currentColor" r="2.4" />
        </>
      ) : null}
    </svg>
  );
}

function formatQueueKind(kind: PendingSyncOperation["kind"]): string {
  if (kind === "ensure-app-rooms") return "app rooms";
  if (kind === "save-source") return "source code";
  if (kind === "save-app-data") return "app data";
  if (kind === "delete-owned-app") return "app deletion";
  return "workspace manifest";
}

function ShareAppDialog({
  app,
  onClose,
  onCreateInvite,
  onOpenStorageSettings,
  storageProfile,
}: {
  app: AppSummary | null;
  onClose: () => void;
  onCreateInvite: (appId: string) => Promise<AppInvitePayload>;
  onOpenStorageSettings: () => void;
  storageProfile: StorageProfile | null;
}) {
  const [inviteUrl, setInviteUrl] = useState("");
  const [status, setStatus] = useState("Ready");
  const hasStorageProfile = Boolean(storageProfile);

  useEffect(() => {
    setInviteUrl("");
    setStatus("Ready");
  }, [app?.appId]);

  if (!app) return null;

  async function createInvite() {
    if (!app) return;
    setStatus("Creating invite...");
    try {
      const invite = await onCreateInvite(app.appId);
      const url = `${window.location.origin}${window.location.pathname}#${encodeAppInvite(invite)}`;
      setInviteUrl(url);
      setStatus("Invite ready. It reuses this app's stable source and data rooms.");
      void navigator.clipboard?.writeText(url).catch(() => {});
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not create invite.");
    }
  }

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-black/35 px-4" role="dialog" aria-modal="true" aria-label="Share app">
      <div className="grid w-full max-w-lg gap-4 rounded-xl border border-app-line bg-app-panel p-4 shadow-panel">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="mb-1 text-xs font-extrabold uppercase text-app-muted">Share</p>
            <h2 className="truncate text-lg font-extrabold">{app.name}</h2>
          </div>
          <button
            className="grid h-8 min-h-8 w-8 place-items-center rounded-full text-xl text-app-muted hover:bg-app-accent/10 hover:text-app-accent"
            type="button"
            aria-label="Close share dialog"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {!hasStorageProfile ? (
          <div className="grid gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm leading-relaxed text-amber-900">
            <p className="font-bold">Cloud sync is required before this app can be shared.</p>
            <button
              className="min-h-9 justify-self-start rounded-md border border-amber-300 bg-white px-3 text-sm font-extrabold text-amber-900 hover:border-amber-500"
              type="button"
              onClick={onOpenStorageSettings}
            >
              Open settings
            </button>
          </div>
        ) : (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm leading-relaxed text-amber-900">
            <p className="font-bold">Invite links are sensitive.</p>
            <p>
              Anyone with the link can access and edit this app's source and data rooms. It does not include the owner setup material for creating new rooms.
            </p>
          </div>
        )}

        <div className="rounded-lg border border-app-line bg-slate-50 p-3">
          <p className="mb-2 text-xs font-extrabold uppercase text-app-muted">Invite link</p>
          <textarea
            className="min-h-24 w-full resize-y rounded-md border border-app-line bg-white p-3 font-mono text-xs leading-relaxed text-app-muted"
            readOnly
            value={inviteUrl || "Create an invite to generate the access link."}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-bold text-app-muted">{status}</span>
          <button
            className="min-h-9 rounded-md border border-app-accent bg-app-accent px-3 text-sm font-extrabold text-white hover:bg-app-strong disabled:opacity-50"
            type="button"
            disabled={!hasStorageProfile}
            onClick={createInvite}
          >
            Create invite
          </button>
        </div>
      </div>
    </div>
  );
}

function InviteImportDialog({
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
            Created: <span className="font-mono">{formatDate(invite.createdAt)}</span>
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
                Updated: <span className="font-mono">{formatDate(preview.updatedAt)}</span>
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
              className="min-h-9 rounded-md border border-app-accent bg-app-accent px-3 text-sm font-extrabold text-white hover:bg-app-strong disabled:opacity-50"
              type="button"
              disabled={!preview}
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

function LauncherAppActionsDialog({
  app,
  onClose,
  onDeleteApp,
  syncBadge,
}: {
  app: AppSummary | null;
  onClose: () => void;
  onDeleteApp: (appId: string) => Promise<void>;
  syncBadge?: AppSyncBadge;
}) {
  const [status, setStatus] = useState("");

  useEffect(() => {
    setStatus("");
  }, [app]);

  if (!app) return null;

  async function deleteApp() {
    if (!app) return;
    const message = deleteConfirmationMessage(app, syncBadge);
    if (!window.confirm(message)) return;
    setStatus("Deleting...");
    try {
      await onDeleteApp(app.appId);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not delete app.");
    }
  }

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-black/35 px-4" role="dialog" aria-modal="true" aria-label="App actions">
      <div className="grid w-full max-w-md gap-4 rounded-xl border border-app-line bg-app-panel p-4 shadow-panel">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-extrabold">App actions</h2>
          <button
            className="grid h-8 min-h-8 w-8 place-items-center rounded-full text-xl text-app-muted hover:bg-app-accent/10 hover:text-app-accent"
            type="button"
            aria-label="Close app actions"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="grid gap-1 rounded-lg border border-app-line bg-white p-3">
          <p className="text-xs font-extrabold uppercase text-app-muted">Selected app</p>
          <p className="truncate text-base font-extrabold text-app-ink">{app.name}</p>
          {app.description ? <p className="line-clamp-3 text-sm leading-snug text-app-muted">{app.description}</p> : null}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            className="min-h-9 rounded-md border border-red-200 bg-red-50 px-3 text-sm font-bold text-red-700 hover:bg-red-100"
            type="button"
            onClick={deleteApp}
          >
            Delete
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-app-muted">{status}</span>
            <button
              className="min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function deleteConfirmationMessage(app: AppSummary, syncBadge?: AppSyncBadge): string {
  const base = `Delete "${app.name}"? This removes the app and its saved data from this workspace.`;
  if (syncBadge?.kind === "shared-by-me") {
    return `${base}\n\nThis app is shared. Its remote source and data rooms will also be deleted, so collaborators with the invite link will lose access.`;
  }
  if (syncBadge?.kind === "shared-with-me" || syncBadge?.kind === "needs-attention") {
    return `${base}\n\nThis app was shared with you. Deleting it here only removes your local entry; it does not delete the owner's rooms.`;
  }
  if (syncBadge && syncBadge.kind !== "local-only") {
    return `${base}\n\nIts remote source and data backup rooms will also be deleted.`;
  }
  return base;
}

function AppView({
  app,
  core,
  onConsoleEntry,
  onUnhandledRemoteDataChange,
  onSaveAppData,
  reloadKey,
  remoteDataChange,
}: {
  app: AppRecord;
  core: AppLabCore;
  onConsoleEntry: (entry: SandboxConsoleEntry) => void;
  onUnhandledRemoteDataChange: () => void;
  onSaveAppData: (appId: string, data: JsonValue) => Promise<void>;
  reloadKey: number;
  remoteDataChange: RemoteDataChange | null;
}) {
  return (
    <section className="min-h-0" aria-label={app.name}>
      <SandboxFrame
        app={app}
        getAppData={core.getAppData}
        onConsoleEntry={onConsoleEntry}
        onUnhandledRemoteDataChange={onUnhandledRemoteDataChange}
        reloadKey={reloadKey}
        remoteDataChange={remoteDataChange}
        saveAppData={onSaveAppData}
      />
    </section>
  );
}

function createEmptyBuilderSession(): BuilderSessionState {
  return { activity: null, error: null, isRunning: false, messages: [] };
}

function createAiChatMessage(appId: string, role: AiChatMessage["role"], content: string): AiChatMessage {
  return {
    appId,
    content,
    createdAt: new Date().toISOString(),
    messageId: crypto.randomUUID(),
    role,
  };
}

function toBuilderAppSource(app: AppRecord) {
  return {
    description: app.description,
    name: app.name,
    sourceCode: app.sourceCode,
  };
}

function formatConsoleForBuilder(entries: SandboxConsoleEntry[]): string {
  if (!entries.length) return "No recent console output.";
  return entries
    .slice(-50)
    .map((entry) => `[${entry.timestamp}] ${entry.level.toUpperCase()} ${entry.args.join(" ") || "(empty)"}`)
    .join("\n");
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(new Date(value));
}
