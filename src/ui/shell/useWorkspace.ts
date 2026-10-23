import { useEffect, useMemo, useRef, useState } from "react";
import {
  addAiUsage,
  createEmptyAiUsage,
  DEFAULT_BUILDER_PREFERENCES,
  MINIMAL_BOARD_DESCRIPTION,
  MINIMAL_BUILDER_STARTER_SOURCE,
  resolveActiveBuilderProfile,
  type AiActions,
  type AiChatMessage,
  type AiConfig,
  type AiUsage,
  type BuilderPreferences,
  type BuilderProfile,
} from "../../ai";
import {
  type AppLabCore,
  type AppRecord,
  type AppSummary,
  type CreateAppInput,
  type JsonValue,
} from "../../core";
import {
  compileAppStyles,
  type RemoteDataChange,
  type SandboxConsoleEntry,
} from "../../runtime";
import {
  readInviteFromHash,
  type AppInvitePayload,
  type AppSyncBadge,
  type PendingSyncOperation,
  type StorageProfile,
  type WorkspaceSyncActions,
} from "../../sync";
import { updateAppSourceDetails, type AppDetailsInput } from "./appDetails";

type WorkspaceMode = "launcher" | "app";

export type AppSyncHealthKind = "none" | "offline" | "pending" | "problem" | "synced" | "syncing";

export interface AppSyncHealth {
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
  reasoning: string;
  reasoningMessageId: string | null;
  streamingContent: string;
  usage: AiUsage;
}

export interface WorkspaceServices {
  aiActions: AiActions;
  core: AppLabCore;
  syncActions: WorkspaceSyncActions;
}

export function useWorkspace({ aiActions, core, syncActions }: WorkspaceServices) {
  const [aiConfig, setAiConfig] = useState<AiConfig>({ apiKey: "", model: "" });
  const [builderPreferences, setBuilderPreferences] = useState<BuilderPreferences>({ ...DEFAULT_BUILDER_PREFERENCES });
  const [builderProfiles, setBuilderProfiles] = useState<BuilderProfile[]>([]);
  const [builderSessions, setBuilderSessions] = useState<Record<string, BuilderSessionState>>({});
  const [apps, setApps] = useState<AppSummary[]>([]);
  const [syncBadges, setSyncBadges] = useState<Record<string, AppSyncBadge>>({});
  const [syncHealth, setSyncHealth] = useState<Record<string, AppSyncHealth>>({});
  const [storageProfile, setStorageProfile] = useState<StorageProfile | null>(null);
  const [workspaceManifestRoomId, setWorkspaceManifestRoomId] = useState<string | null>(null);
  const [activeApp, setActiveApp] = useState<AppRecord | null>(null);
  const [mode, setMode] = useState<WorkspaceMode>("launcher");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsInitialAiTab, setSettingsInitialAiTab] = useState<"agent" | "connection" | undefined>();
  const [settingsInitialSection, setSettingsInitialSection] = useState<"ai" | "storage" | undefined>();
  const [pendingInvite, setPendingInvite] = useState<AppInvitePayload | null>(null);
  const [remoteDataChange, setRemoteDataChange] = useState<RemoteDataChange | null>(null);
  const [consoleEntries, setConsoleEntries] = useState<SandboxConsoleEntry[]>([]);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [sandboxReloadKey, setSandboxReloadKey] = useState(0);
  const activeAppIdRef = useRef<string | null>(null);
  const builderRunningAppIdsRef = useRef(new Set<string>());
  const browserOnlineRef = useRef(navigator.onLine);
  const consoleEntriesRef = useRef<SandboxConsoleEntry[]>([]);
  const providerOnlineRef = useRef<boolean | null>(null);
  const navigationVersionRef = useRef(0);
  activeAppIdRef.current = activeApp?.appId ?? null;
  consoleEntriesRef.current = consoleEntries;

  function isSyncReachable() {
    return browserOnlineRef.current && providerOnlineRef.current !== false;
  }

  async function saveAppData(appId: string, data: JsonValue) {
    setRemoteDataChange(null);
    syncActions.noteLocalAppDataEdit(appId);
    await core.saveAppData(appId, data);
    await trySync("App data saved locally. Remote data sync failed", () => syncActions.pushAppData(appId, data));
    refreshWhenSettled(syncActions.flushAppDataSyncQueue());
    await refreshApps();
  }

  async function importAppData(appId: string, data: JsonValue) {
    await saveAppData(appId, data);
    setSandboxReloadKey((key) => key + 1);
  }

  useEffect(() => {
    void refreshApps(isSyncReachable());
  }, []);

  useEffect(() => {
    void aiActions.getConfig().then(setAiConfig);
  }, [aiActions]);

  useEffect(() => {
    void aiActions.listBuilderProfiles().then(setBuilderProfiles);
  }, [aiActions]);

  useEffect(() => {
    void aiActions.getBuilderPreferences().then(setBuilderPreferences);
  }, [aiActions]);

  const activeBuilderProfile = useMemo(
    () => resolveActiveBuilderProfile(builderProfiles, builderPreferences.activeProfileId),
    [builderPreferences.activeProfileId, builderProfiles],
  );

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
      if (cancelled) return;
      if (!storageConfigured) {
        void wakePendingSync(isSyncReachable());
        return;
      }

      const connection = await syncActions.subscribeStorageConnection((connected) => {
        if (cancelled) return;
        providerOnlineRef.current = connected;
        if (connected) void wakePendingSync(isSyncReachable());
        else void refreshApps(false);
      });
      if (cancelled) { connection(); return; }
      unsubscribeConnection = connection;
      const manifest = await syncActions.subscribeWorkspaceManifest(() => {
        if (!cancelled) void refreshApps(isSyncReachable());
      });
      if (cancelled) manifest();
      else unsubscribeWorkspaceManifest = manifest;
    }

    providerOnlineRef.current = null;
    void startSyncWakeups().catch((error) => {
      if (!cancelled) setSyncStatus(`Could not start workspace sync: ${error instanceof Error ? error.message : "Unknown error."}`);
    });
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

  const activeAppSyncKind = activeApp ? syncBadges[activeApp.appId]?.kind : undefined;

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

    void subscribe().catch((error) => {
      if (!cancelled) setSyncStatus(`Could not listen for app data updates: ${error instanceof Error ? error.message : "Unknown error."}`);
    });
    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, [activeApp?.appId, activeAppSyncKind, storageProfile?.profileId, storageProfile?.databaseUrl, syncActions]);

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

    void subscribe().catch((error) => {
      if (!cancelled) setSyncStatus(`Could not listen for app source updates: ${error instanceof Error ? error.message : "Unknown error."}`);
    });
    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, [activeApp?.appId, activeAppSyncKind, storageProfile?.profileId, storageProfile?.databaseUrl, syncActions]);

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
    const navigationVersion = ++navigationVersionRef.current;
    const app = await core.getApp(appId);
    if (!app || navigationVersion !== navigationVersionRef.current) return;
    setActiveApp(app);
    setMode("app");
    setConsoleEntries([]);
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
    setConsoleEntries([]);
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
    return app;
  }

  async function createApp(name?: string) {
    const [profiles, preferences] = await Promise.all([
      aiActions.listBuilderProfiles(),
      aiActions.getBuilderPreferences(),
    ]);
    setBuilderProfiles(profiles);
    setBuilderPreferences(preferences);
    const profile = resolveActiveBuilderProfile(profiles, preferences.activeProfileId);
    const fallbackInput: CreateAppInput = {
      description: MINIMAL_BOARD_DESCRIPTION,
      name: "Minimal Board",
      sourceCode: MINIMAL_BUILDER_STARTER_SOURCE,
    };
    return createAppFromInput(
      profile
        ? {
            description: `Created from the ${profile.name} Builder profile.`,
            name: name?.trim() || "New App",
            sourceCode: name ? replaceAppTitle(profile.starterSource, name.trim()) : profile.starterSource,
          }
        : fallbackInput,
    );
  }

  async function copyApp(appId: string, includeData: boolean) {
    const [original, appSummaries] = await Promise.all([core.getApp(appId), core.listApps()]);
    if (!original) throw new Error("App not found.");

    const appData = includeData ? await core.getAppData(appId) : null;
    const copyName = createAppCopyName(original.name, appSummaries);
    const copy = await core.createApp({
      compiledCss: original.compiledCss,
      description: original.description,
      name: copyName,
      sourceCode: replaceAppTitle(original.sourceCode, copyName),
    });

    if (includeData) {
      try {
        await core.saveAppData(copy.appId, appData);
      } catch (error) {
        try {
          await core.deleteApp(copy.appId);
        } catch {
          // Preserve the data-copy error that caused the rollback.
        }
        throw error;
      }
    }

    setSyncStatus(null);
    void syncActions.ensureAppBackedUp(copy, { flush: isSyncReachable() }).then(
      () => refreshApps(),
      (error) => {
        const detail = error instanceof Error ? error.message : "Unknown sync error.";
        setSyncStatus(`App copied locally. Remote backup failed: ${detail}`);
        void refreshApps(false);
      },
    );
    refreshWhenSettled(syncActions.flushRoomLifecycleQueue());
    await refreshApps();
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

    let syncWarning: string | null = null;
    const finishLocalEdit = syncActions.beginLocalAppSourceEdit(appId);
    const updated = await (async () => {
      try {
        const nextApp = await core.updateApp({ appId, sourceCode, ...compiledStyles });
        try {
          await syncActions.pushAppSource(nextApp);
        } catch (error) {
          const detail = error instanceof Error ? error.message : "Unknown sync error.";
          syncWarning = `Source saved locally. Remote source sync failed: ${detail}`;
        }
        return nextApp;
      } finally {
        finishLocalEdit();
      }
    })();

    refreshWhenSettled(syncActions.flushSourceSyncQueue());
    if (activeAppIdRef.current === appId) {
      setActiveApp(updated);
      setConsoleEntries([]);
      setSyncStatus([compileWarning, syncWarning].filter(Boolean).join(" ") || null);
    }
    await refreshApps();
    return updated;
  }

  async function updateAppDetails(appId: string, input: AppDetailsInput) {
    const app = await core.getApp(appId);
    if (!app) throw new Error("App not found.");
    return saveAppSource(appId, updateAppSourceDetails(app.sourceCode, input));
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
      reasoning: "",
      reasoningMessageId: null,
      streamingContent: "",
    }));

    try {
      const result = await aiActions.runBuilderTurn({
        appId: app.appId,
        appName: app.name,
        conversationMemory: builderPreferences.conversationMemory,
        messages: requestMessages,
        onActivity: (activity) => {
          updateBuilderSession(app.appId, (session) => ({ ...session, activity }));
        },
        onAssistantContent: (streamingContent) => {
          updateBuilderSession(app.appId, (session) => ({ ...session, streamingContent }));
        },
        onReasoning: (reasoning) => {
          updateBuilderSession(app.appId, (session) => ({ ...session, reasoning }));
        },
        onUsage: (usage) => {
          updateBuilderSession(app.appId, (session) => ({ ...session, usage: addAiUsage(session.usage, usage) }));
        },
        profile: activeBuilderProfile ?? undefined,
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
            const updated = await saveAppSource(app.appId, sourceCode);
            return {
              name: updated.name,
              sourceChars: updated.sourceCode.length,
              success: true,
            };
          },
        },
      });
      const assistantMessage = createAiChatMessage(app.appId, "assistant", result.content);
      updateBuilderSession(app.appId, (session) => ({
        ...session,
        messages: [...session.messages, assistantMessage],
        reasoningMessageId: assistantMessage.messageId,
        streamingContent: "",
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
    navigationVersionRef.current += 1;
    setMode("launcher");
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

  async function deleteApp(appId: string) {
    await syncActions.deleteSyncedAppRooms(appId);
    await core.deleteApp(appId);
    await syncActions.removeLocalAppSync(appId);
    await syncActions.queueWorkspaceManifestSave();
    void syncActions.flushWorkspaceManifestQueue();
    await refreshApps();
  }

  return {
    aiActions,
    core,
    syncActions,
    aiConfig,
    setAiConfig,
    builderPreferences,
    setBuilderPreferences,
    builderProfiles,
    setBuilderProfiles,
    builderSessions,
    apps,
    syncBadges,
    syncHealth,
    storageProfile,
    workspaceManifestRoomId,
    activeApp,
    mode,
    settingsOpen,
    setSettingsOpen,
    settingsInitialAiTab,
    setSettingsInitialAiTab,
    settingsInitialSection,
    setSettingsInitialSection,
    pendingInvite,
    setPendingInvite,
    remoteDataChange,
    consoleEntries,
    setConsoleEntries,
    syncStatus,
    setSyncStatus,
    sandboxReloadKey,
    setSandboxReloadKey,
    activeBuilderProfile,
    refreshApps,
    openApp,
    createApp,
    copyApp,
    saveAppSource,
    updateAppDetails,
    sendBuilderMessage,
    clearBuilderConversation,
    openLauncher,
    saveAppData,
    importAppData,
    trySync,
    deleteApp,
  };

  async function pullLatestAppRooms(appId: string) {
    await trySync("Could not pull latest shared app", async () => {
      const result = await syncActions.pullLatestAppRooms(appId);
      if (result.deletedAt) throw new Error("This shared app was deleted by its owner.");
      if (result.app && activeAppIdRef.current === appId) setActiveApp(result.app);
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
    void promise.then(() => refreshApps(), (error) => {
      setSyncStatus(`Could not finish pending sync: ${error instanceof Error ? error.message : "Unknown error."}`);
      return refreshApps(false);
    }).catch((error) => {
      setSyncStatus(`Could not refresh sync status: ${error instanceof Error ? error.message : "Unknown error."}`);
    });
  }

}

export type WorkspaceController = ReturnType<typeof useWorkspace>;

function assertCompleteAppSource(sourceCode: string): void {
  const start = sourceCode.trimStart().toLowerCase();
  if (!/^<!doctype\s+html(?:\s[^>]*)?>/.test(start) && !/^<html(?:\s|>)/.test(start)) {
    throw new Error("Source must be a complete HTML document starting with <!doctype html> or <html>.");
  }
}

function createAppCopyName(originalName: string, apps: AppSummary[]): string {
  const existingNames = new Set(apps.map((app) => app.name.toLocaleLowerCase()));
  const baseName = originalName.replace(/ \(copy(?: \d+)?\)$/i, "");
  let copyNumber = 1;
  let candidate = `${baseName} (copy)`;

  while (existingNames.has(candidate.toLocaleLowerCase())) {
    copyNumber += 1;
    candidate = `${baseName} (copy ${copyNumber})`;
  }

  return candidate;
}

function replaceAppTitle(sourceCode: string, title: string): string {
  const titleMarkup = `<title>${escapeHtmlText(title)}</title>`;
  const titlePattern = /<title(?:\s[^>]*)?>[\s\S]*?<\/title\s*>/i;
  const completeHeadPattern = /<head(?:\s[^>]*)?>[\s\S]*?<\/head\s*>/i;
  const headMatch = completeHeadPattern.exec(sourceCode);
  if (headMatch) {
    const updatedHead = titlePattern.test(headMatch[0])
      ? headMatch[0].replace(titlePattern, titleMarkup)
      : headMatch[0].replace(/<head(?:\s[^>]*)?>/i, (head) => `${head}\n    ${titleMarkup}`);
    return `${sourceCode.slice(0, headMatch.index)}${updatedHead}${sourceCode.slice(headMatch.index + headMatch[0].length)}`;
  }

  const bodyIndex = sourceCode.search(/<body(?:\s|>)/i);
  const metadataRegion = bodyIndex === -1 ? sourceCode : sourceCode.slice(0, bodyIndex);
  if (titlePattern.test(metadataRegion)) {
    return `${metadataRegion.replace(titlePattern, titleMarkup)}${bodyIndex === -1 ? "" : sourceCode.slice(bodyIndex)}`;
  }

  const headPattern = /<head(?:\s[^>]*)?>/i;
  if (headPattern.test(sourceCode)) return sourceCode.replace(headPattern, (head) => `${head}\n    ${titleMarkup}`);

  const htmlPattern = /<html(?:\s[^>]*)?>/i;
  if (htmlPattern.test(sourceCode)) return sourceCode.replace(htmlPattern, (html) => `${html}\n  <head>${titleMarkup}</head>`);

  return `${titleMarkup}\n${sourceCode}`;
}

function escapeHtmlText(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
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
      label: "App unavailable",
      title: "This shared app was deleted by its owner. You can remove this local entry from app actions.",
      tone: "attention",
    };
  }
  if (!input.items.length) return { kind: "synced", label: "Synced", title: "Synced with remote storage.", tone: "good" };

  if (!input.isOnline) {
    return {
      kind: "offline",
      label: "Offline",
      title: "Offline. Local changes are saved and will sync when the browser comes back online.",
      tone: "attention",
    };
  }

  const problem = input.items.find((item) => item.lastError || item.status === "problem");
  if (problem) {
    return {
      kind: "problem",
      label: "Sync needs attention",
      title: `Could not sync ${formatQueueKind(problem.kind)}. App Lab will retry when sync wakes up. ${problem.lastError ?? ""}`.trim(),
      tone: "attention",
    };
  }

  if (input.items.some((item) => item.status === "syncing")) {
    return { kind: "syncing", label: "Syncing", title: "Syncing local changes to remote storage.", tone: "working" };
  }

  return { kind: "pending", label: "Waiting to sync", title: "Local changes are queued for remote sync.", tone: "working" };
}

function formatQueueKind(kind: PendingSyncOperation["kind"]): string {
  if (kind === "ensure-app-rooms") return "app rooms";
  if (kind === "save-source") return "source code";
  if (kind === "save-app-data") return "app data";
  if (kind === "delete-owned-app") return "app deletion";
  return "workspace manifest";
}

function createEmptyBuilderSession(): BuilderSessionState {
  return {
    activity: null,
    error: null,
    isRunning: false,
    messages: [],
    reasoning: "",
    reasoningMessageId: null,
    streamingContent: "",
    usage: createEmptyAiUsage(),
  };
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
