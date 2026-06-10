import { useEffect, useMemo, useState } from "react";
import type { AppLabCore, AppRecord, AppSummary, JsonValue } from "../../core/types";
import { decryptRoomSnapshot, rememberSnapshotVersion } from "../../sync/crypto";
import { encodeAppInvite, readInviteFromHash } from "../../sync/invites";
import type { RemoteDataChange, SandboxConsoleEntry } from "../../runtime/SandboxFrame";
import { SandboxFrame } from "../../runtime/SandboxFrame";
import { deleteRemoteAppRooms, ensureRemoteAppRooms, isRemoteAppDeletedError, loadRemoteAppRooms, saveRemoteAppData, saveRemoteAppSource } from "../../sync/appRooms";
import { createFirebaseRealtimeSyncProvider, createFirebaseSdkRealtimeDriver } from "../../sync/firebaseRealtimeProvider";
import type {
  AppInvitePayload,
  AppSyncBadge,
  ConfigureStorageProfileInput,
  RemoteProviderReference,
  StorageProfile,
  WorkspaceSyncRegistry,
} from "../../sync/workspaceSync";
import {
  createWorkspaceRecoveryMaterial,
  decodeWorkspaceRecoveryMaterial,
  encodeWorkspaceRecoveryMaterial,
  loadWorkspaceManifest,
  saveWorkspaceManifest,
} from "../../sync/workspaceManifest";
import { SettingsDialog } from "../dialogs/SettingsDialog";
import { ToolPanelMode, WorkspaceToolPanel } from "../tools/WorkspaceToolPanel";

type WorkspaceMode = "launcher" | "app";

interface WorkspaceShellProps {
  core: AppLabCore;
  syncRegistry: WorkspaceSyncRegistry;
}

export function WorkspaceShell({ core, syncRegistry }: WorkspaceShellProps) {
  const [apps, setApps] = useState<AppSummary[]>([]);
  const [syncBadges, setSyncBadges] = useState<Record<string, AppSyncBadge>>({});
  const [storageProfile, setStorageProfile] = useState<StorageProfile | null>(null);
  const [activeApp, setActiveApp] = useState<AppRecord | null>(null);
  const [mode, setMode] = useState<WorkspaceMode>("launcher");
  const [activeTool, setActiveTool] = useState<ToolPanelMode | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [sharingApp, setSharingApp] = useState<AppSummary | null>(null);
  const [pendingInvite, setPendingInvite] = useState<AppInvitePayload | null>(null);
  const [remoteDataChange, setRemoteDataChange] = useState<RemoteDataChange | null>(null);
  const [aiAttentionKey, setAiAttentionKey] = useState(0);
  const [aiAttentionDismissed, setAiAttentionDismissed] = useState(true);
  const [consoleEntries, setConsoleEntries] = useState<SandboxConsoleEntry[]>([]);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [syncStatusOpen, setSyncStatusOpen] = useState(false);
  const [sandboxReloadKey, setSandboxReloadKey] = useState(0);

  useEffect(() => {
    refreshApps();
  }, []);

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
      const record = await syncRegistry.getAppSyncRecord(subscribedApp.appId);
      const provider = await createProviderForSyncRecord(record);
      if (!record || !provider || cancelled) return;

      unsubscribe = provider.subscribeRoom({
        readToken: record.dataRoom.readToken,
        roomId: record.dataRoom.roomId,
        onChange: (snapshot) => {
          void (async () => {
            const latestRecord = await syncRegistry.getAppSyncRecord(subscribedApp.appId);
            if (!latestRecord || snapshot.version <= latestRecord.dataRoom.lastSeenVersion || cancelled) return;
            const data = await decryptRoomSnapshot({
              capability: latestRecord.dataRoom,
              roomType: "app-data",
              snapshot,
            });
            await core.saveAppData(subscribedApp.appId, data);
            const dataRoom = rememberSnapshotVersion(latestRecord.dataRoom, snapshot);
            await syncRegistry.rememberAppRoomVersions({ appId: subscribedApp.appId, dataRoom });
            setRemoteDataChange({ data, id: crypto.randomUUID(), version: snapshot.version });
          })();
        },
      });
    }

    void subscribe();
    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, [activeApp?.appId, core, syncRegistry, storageProfile]);

  useEffect(() => {
    if (!activeApp) return;
    const subscribedApp = activeApp;
    let unsubscribe: (() => void) | null = null;
    let cancelled = false;

    async function subscribe() {
      const record = await syncRegistry.getAppSyncRecord(subscribedApp.appId);
      const provider = await createSourceProviderForSyncRecord(record);
      if (!record || !provider || cancelled) return;

      unsubscribe = provider.subscribeRoom({
        readToken: record.sourceRoom.readToken,
        roomId: record.sourceRoom.roomId,
        onChange: (snapshot) => {
          void (async () => {
            const latestRecord = await syncRegistry.getAppSyncRecord(subscribedApp.appId);
            if (!latestRecord || snapshot.version <= latestRecord.sourceRoom.lastSeenVersion || cancelled) return;
            try {
              const loaded = await loadRemoteAppRooms({ provider, syncRecord: latestRecord });
              await core.upsertApp(loaded.app);
              await core.saveAppData(loaded.app.appId, loaded.appData);
              await syncRegistry.rememberAppRoomVersions({
                appId: loaded.app.appId,
                dataRoom: loaded.dataRoom,
                sourceRoom: loaded.sourceRoom,
              });
              setActiveApp(loaded.app);
              setSyncStatus(null);
              await refreshApps();
            } catch (error) {
              if (!isRemoteAppDeletedError(error)) throw error;
              await syncRegistry.markRemoteAppDeleted(subscribedApp.appId, error.deletedAt);
              setSyncStatus("This shared app was deleted by its owner.");
              await refreshApps();
            }
          })();
        },
      });
    }

    void subscribe();
    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, [activeApp?.appId, core, syncRegistry, storageProfile]);

  async function refreshApps() {
    const nextApps = await core.listApps();
    setApps(nextApps);
    setSyncBadges(await syncRegistry.listAppSyncBadges(nextApps.map((app) => app.appId)));
    setStorageProfile(await syncRegistry.getStorageProfile());
  }

  async function openApp(appId: string) {
    await pullLatestAppRooms(appId);
    const app = await core.getApp(appId);
    if (!app) return;
    setActiveApp(app);
    setMode("app");
    setActiveTool(null);
    setConsoleEntries([]);
    setSyncStatusOpen(false);
    setAiAttentionKey((key) => key + 1);
    setAiAttentionDismissed(false);
  }

  async function createApp() {
    const app = await core.createBlankApp();
    await ensureAppBackedUp(app);
    await refreshApps();
    setActiveApp(app);
    setMode("app");
    setActiveTool(null);
    setConsoleEntries([]);
    setSyncStatusOpen(false);
    setAiAttentionKey((key) => key + 1);
    setAiAttentionDismissed(false);
  }

  function openLauncher() {
    setMode("launcher");
    setActiveTool(null);
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
          {mode === "app" && syncStatus ? (
            <div className="relative">
              <button
                className="grid h-8 min-h-8 w-8 place-items-center rounded-full border border-amber-200 bg-amber-50 text-sm font-extrabold text-amber-900 hover:bg-amber-100"
                type="button"
                aria-label="Open sync warning"
                title={syncStatus}
                onClick={() => setSyncStatusOpen((open) => !open)}
              >
                !
              </button>
              {syncStatusOpen ? (
                <div className="absolute right-0 top-10 z-40 grid w-72 gap-3 rounded-lg border border-amber-200 bg-white p-3 text-left shadow-panel">
                  <p className="text-sm font-bold leading-snug text-amber-950">{syncStatus}</p>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      className="min-h-8 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent"
                      type="button"
                      onClick={() => setSyncStatusOpen(false)}
                    >
                      Close
                    </button>
                    <button
                      className="grid h-8 min-h-8 w-8 place-items-center rounded-md border border-app-accent bg-app-accent text-lg font-bold text-white hover:bg-app-strong"
                      type="button"
                      aria-label="Reload app"
                      title="Reload app"
                      onClick={() => {
                        setSandboxReloadKey((key) => key + 1);
                        setSyncStatus(null);
                        setSyncStatusOpen(false);
                      }}
                    >
                      ↻
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
          {mode === "app" && activeApp ? (
            <button
              className="grid h-9 min-h-9 w-9 place-items-center rounded-md border border-transparent bg-transparent text-lg text-app-muted hover:bg-app-accent/10 hover:text-app-accent"
              type="button"
              aria-label={`Share ${activeApp.name}`}
              title="Share"
              onClick={() => setSharingApp(activeApp)}
            >
              ↗
            </button>
          ) : null}
          <button
            className="grid h-9 min-h-9 w-9 place-items-center rounded-md border border-transparent bg-transparent text-lg text-app-muted hover:bg-app-accent/10 hover:text-app-accent"
            type="button"
            aria-label="Open settings"
            onClick={() => setSettingsOpen(true)}
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
              await deleteSyncedAppRooms(appId);
              await core.deleteApp(appId);
              await syncRegistry.removeLocalAppSync(appId);
              await refreshApps();
            }}
            onOpenApp={openApp}
            onShareApp={(app) => setSharingApp(app)}
            storageProfile={storageProfile}
            syncBadges={syncBadges}
            onUpdateApp={async (appId, input) => {
              await core.updateApp({ appId, ...input });
              await refreshApps();
            }}
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
              await core.saveAppData(appId, data);
              await trySync("App data saved locally. Remote data sync failed", () => pushAppData(appId, data));
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
            consoleEntries={consoleEntries}
            mode={activeTool}
            onClearConsole={() => setConsoleEntries([])}
            onClose={() => setActiveTool(null)}
            onSaveSource={async (sourceCode) => {
              const nextName = readHtmlTitle(sourceCode) || activeApp.name;
              const updated = await core.updateApp({ appId: activeApp.appId, name: nextName, sourceCode });
              await trySync("Source saved locally. Remote source sync failed", () => pushAppSource(updated));
              setActiveApp(updated);
              setConsoleEntries([]);
              await refreshApps();
            }}
          />
        </>
      ) : mode === "launcher" ? (
        <button
          className="fixed bottom-5 right-5 z-20 grid h-14 min-h-14 w-14 place-items-center rounded-full border border-app-accent bg-app-accent text-3xl font-light leading-none text-white shadow-panel hover:bg-app-strong"
          type="button"
          aria-label="Create new app"
          onClick={createApp}
        >
          +
        </button>
      ) : null}

      <SettingsDialog
        isOpen={settingsOpen}
        storageProfile={storageProfile}
        onClearStorageProfile={async () => {
          await syncRegistry.clearStorageProfile();
          await refreshApps();
        }}
        onClose={() => setSettingsOpen(false)}
        onConfigureStorageProfile={async (input: ConfigureStorageProfileInput) => {
          await syncRegistry.configureStorageProfile(input);
          const nextApps = await core.listApps();
          for (const app of nextApps) {
            const record = await syncRegistry.getAppSyncRecord(app.appId);
            if (!record) await syncRegistry.ensureOwnedAppRooms(app.appId);
            const fullApp = await core.getApp(app.appId);
            if (fullApp) await ensureAppBackedUp(fullApp);
          }
          await refreshApps();
        }}
        onExportWorkspaceRecovery={async () => {
          await syncRegistry.ensureWorkspaceManifestRoom();
          let state = await syncRegistry.getState();
          if (!state.storageProfile) throw new Error("Storage profile is required.");
          const provider = createFirebaseProvider(state.storageProfile);
          for (const appSummary of await core.listApps()) {
            const app = await core.getApp(appSummary.appId);
            const syncRecord = await syncRegistry.getAppSyncRecord(appSummary.appId);
            if (!app || !syncRecord || syncRecord.kind === "joined") continue;
            await ensureRemoteAppRooms({
              app,
              appData: await core.getAppData(app.appId),
              provider,
              syncRecord,
            });
          }
          state = await syncRegistry.getState();
          const savedState = await saveWorkspaceManifest({
            provider,
            state,
          });
          await syncRegistry.replaceState(savedState);
          await refreshApps();
          return encodeWorkspaceRecoveryMaterial(createWorkspaceRecoveryMaterial(savedState));
        }}
        onRestoreWorkspaceRecovery={async (recoveryText) => {
          const recoveryMaterial = decodeWorkspaceRecoveryMaterial(recoveryText);
          const restoredState = await loadWorkspaceManifest({
            provider: createFirebaseRealtimeSyncProvider({ driver: createFirebaseSdkRealtimeDriver(recoveryMaterial.provider.firebaseConfig) }),
            recoveryMaterial,
          });
          await hydrateWorkspaceAppsFromRooms(core, restoredState);
          await syncRegistry.replaceState(restoredState);
          await refreshApps();
        }}
      />
      <ShareAppDialog
        app={sharingApp}
        hasStorageProfile={Boolean(storageProfile)}
        onClose={() => setSharingApp(null)}
        onCreateInvite={async (appId) => {
          const app = await core.getApp(appId);
          if (!app) throw new Error("App not found.");
          let syncRecord = await syncRegistry.getAppSyncRecord(appId);
          if (!syncRecord) syncRecord = await syncRegistry.ensureOwnedAppRooms(appId);

          if (syncRecord.kind !== "joined") {
            const profile = await syncRegistry.getStorageProfile();
            if (!profile) throw new Error("Storage profile is required before sharing.");
            await syncCurrentAppToRemote(app, createFirebaseProvider(profile), syncRecord);
          }

          const invite = await syncRegistry.createInvite(appId);
          await refreshApps();
          return invite;
        }}
      />
      <InviteImportDialog
        invite={pendingInvite}
        onClose={() => {
          setPendingInvite(null);
          if (window.location.hash.startsWith("#applab-invite=")) history.replaceState(null, "", window.location.pathname + window.location.search);
        }}
        onImport={async (invite) => {
          await importInvite(invite);
          setPendingInvite(null);
          if (window.location.hash.startsWith("#applab-invite=")) history.replaceState(null, "", window.location.pathname + window.location.search);
        }}
      />
    </div>
  );

  async function importInvite(invite: AppInvitePayload) {
    const provider = createFirebaseProviderFromReference(invite.provider);
    const loaded = await loadRemoteAppRooms({
      provider,
      syncRecord: {
        appId: "pending-import",
        dataProvider: invite.provider,
        dataRoom: invite.dataRoom,
        importedAt: new Date().toISOString(),
        kind: "joined",
        sourceProvider: invite.provider,
        sourceRoom: invite.sourceRoom,
      },
    });
    await core.upsertApp(loaded.app);
    await core.saveAppData(loaded.app.appId, loaded.appData);
    await syncRegistry.markJoinedApp({
      appId: loaded.app.appId,
      dataProvider: invite.provider,
      dataRoom: loaded.dataRoom,
      sourceProvider: invite.provider,
      sourceRoom: loaded.sourceRoom,
    });
    await refreshApps();
  }

  async function pushAppSource(app: AppRecord) {
    const record = await syncRegistry.getAppSyncRecord(app.appId);
    const provider = await createSourceProviderForSyncRecord(record);
    if (!record || !provider) return;
    const sourceRoom = await saveRemoteAppSource({ app, provider, syncRecord: record });
    await syncRegistry.rememberAppRoomVersions({ appId: app.appId, sourceRoom });
  }

  async function pushAppData(appId: string, data: JsonValue) {
    const record = await syncRegistry.getAppSyncRecord(appId);
    const provider = await createProviderForSyncRecord(record);
    if (!record || !provider) return;
    const dataRoom = await saveRemoteAppData({ appData: data, provider, syncRecord: record });
    await syncRegistry.rememberAppRoomVersions({ appId, dataRoom });
  }

  async function ensureAppBackedUp(app: AppRecord) {
    const profile = await syncRegistry.getStorageProfile();
    if (!profile) return;
    const syncRecord = await syncRegistry.ensureOwnedAppRooms(app.appId);
    await trySync("App created locally. Remote backup failed", async () => {
      await ensureRemoteAppRooms({
        app,
        appData: await core.getAppData(app.appId),
        provider: createFirebaseProvider(profile),
        syncRecord,
      });
      const loaded = await loadRemoteAppRooms({ provider: createFirebaseProvider(profile), syncRecord });
      await syncRegistry.rememberAppRoomVersions({
        appId: app.appId,
        dataRoom: loaded.dataRoom,
        sourceRoom: loaded.sourceRoom,
      });
    });
  }

  async function syncCurrentAppToRemote(
    app: AppRecord,
    provider: ReturnType<typeof createFirebaseProvider>,
    record: Awaited<ReturnType<WorkspaceSyncRegistry["getAppSyncRecord"]>>,
  ) {
    if (!record || record.kind === "joined") return;
    const sourceRoom = await saveRemoteAppSource({ app, provider, syncRecord: record });
    const dataRoom = await saveRemoteAppData({
      appData: await core.getAppData(app.appId),
      provider,
      syncRecord: { ...record, sourceRoom },
    });
    await syncRegistry.rememberAppRoomVersions({ appId: app.appId, dataRoom, sourceRoom });
  }

  async function pullLatestAppRooms(appId: string) {
    const record = await syncRegistry.getAppSyncRecord(appId);
    const provider = await createProviderForSyncRecord(record);
    if (!record || !provider) return;
    await trySync("Could not pull latest shared app", async () => {
      let loaded;
      try {
        loaded = await loadRemoteAppRooms({ provider, syncRecord: record });
      } catch (error) {
        if (!isRemoteAppDeletedError(error)) throw error;
        await syncRegistry.markRemoteAppDeleted(appId, error.deletedAt);
        throw new Error("This shared app was deleted by its owner.");
      }
      await core.upsertApp(loaded.app);
      await core.saveAppData(loaded.app.appId, loaded.appData);
      await syncRegistry.rememberAppRoomVersions({
        appId: loaded.app.appId,
        dataRoom: loaded.dataRoom,
        sourceRoom: loaded.sourceRoom,
      });
    });
    await refreshApps();
  }

  async function trySync(prefix: string, action: () => Promise<void>) {
    try {
      await action();
      setSyncStatus(null);
    } catch (error) {
      const detail = error instanceof Error ? error.message : "Unknown sync error.";
      setSyncStatus(`${prefix}: ${detail}`);
    }
  }

  async function deleteSyncedAppRooms(appId: string) {
    const record = await syncRegistry.getAppSyncRecord(appId);
    if (!record) return;
    if (record.kind === "joined") return;
    const app = await core.getApp(appId);
    if (!app) return;
    const sourceProvider = await createSourceProviderForSyncRecord(record);
    const dataProvider = await createProviderForSyncRecord(record);
    if (!sourceProvider || !dataProvider) return;
    await deleteRemoteAppRooms({
      app,
      dataProvider,
      sourceProvider,
      syncRecord: record,
    });
  }

  async function createProviderForSyncRecord(record: Awaited<ReturnType<WorkspaceSyncRegistry["getAppSyncRecord"]>>) {
    if (!record) return null;
    if (record.kind === "joined") return createFirebaseProviderFromReference(record.dataProvider);
    const profile = await syncRegistry.getStorageProfile();
    if (!profile) return null;
    return createFirebaseProvider(profile);
  }

  async function createSourceProviderForSyncRecord(record: Awaited<ReturnType<WorkspaceSyncRegistry["getAppSyncRecord"]>>) {
    if (!record) return null;
    if (record.kind === "joined") return createFirebaseProviderFromReference(record.sourceProvider);
    const profile = await syncRegistry.getStorageProfile();
    if (!profile) return null;
    return createFirebaseProvider(profile);
  }
}

function createFirebaseProvider(profile: StorageProfile) {
  return createFirebaseRealtimeSyncProvider({ driver: createFirebaseSdkRealtimeDriver(profile.firebaseConfig) });
}

function createFirebaseProviderFromReference(provider: RemoteProviderReference) {
  if (!provider.firebaseConfig) throw new Error("Invite is missing Firebase config.");
  return createFirebaseRealtimeSyncProvider({ driver: createFirebaseSdkRealtimeDriver(provider.firebaseConfig) });
}

async function hydrateWorkspaceAppsFromRooms(core: AppLabCore, state: Awaited<ReturnType<WorkspaceSyncRegistry["getState"]>>) {
  if (!state.storageProfile) return;
  const provider = createFirebaseProvider(state.storageProfile);
  for (const record of Object.values(state.apps)) {
    if (record.kind === "joined" && record.sourceProvider.databaseUrl !== state.storageProfile.databaseUrl) continue;
    const loaded = await loadRemoteAppRooms({ provider, syncRecord: record });
    await core.upsertApp(loaded.app);
    await core.saveAppData(loaded.app.appId, loaded.appData);
    record.sourceRoom = loaded.sourceRoom;
    record.dataRoom = loaded.dataRoom;
  }
}

interface LauncherViewProps {
  apps: AppSummary[];
  onDeleteApp: (appId: string) => Promise<void>;
  onOpenApp: (appId: string) => void;
  onShareApp: (app: AppSummary) => void;
  storageProfile: StorageProfile | null;
  syncBadges: Record<string, AppSyncBadge>;
  onUpdateApp: (appId: string, input: { name: string; description: string }) => Promise<void>;
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

function LauncherView({ apps, onDeleteApp, onOpenApp, onShareApp, onUpdateApp, storageProfile, syncBadges }: LauncherViewProps) {
  const [editingApp, setEditingApp] = useState<AppSummary | null>(null);

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
              onEdit={() => setEditingApp(app)}
              onOpen={() => onOpenApp(app.appId)}
              onShare={() => onShareApp(app)}
              syncBadge={syncBadges[app.appId] ?? { kind: "local-only", label: "Local only", tone: "neutral" }}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-app-line bg-app-panel/70 p-8 text-app-muted">
          No apps yet. Use the + button to create the example app.
        </div>
      )}

      <LauncherEditDialog
        app={editingApp}
        onClose={() => setEditingApp(null)}
        onDeleteApp={async (appId) => {
          await onDeleteApp(appId);
          setEditingApp(null);
        }}
        syncBadge={editingApp ? syncBadges[editingApp.appId] : undefined}
        onUpdateApp={async (appId, input) => {
          await onUpdateApp(appId, input);
          setEditingApp(null);
        }}
      />
    </section>
  );
}

function LauncherCard({
  app,
  onEdit,
  onOpen,
  onShare,
  syncBadge,
}: {
  app: AppSummary;
  onEdit: () => void;
  onOpen: () => void;
  onShare: () => void;
  syncBadge: AppSyncBadge;
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
        aria-label={`Edit ${app.name}`}
        title="Edit"
        onClick={onEdit}
      >
        <span className="inline-block scale-x-[-1]" aria-hidden="true">
          ✎
        </span>
      </button>
      <button className="grid gap-2 pr-9 text-left disabled:cursor-default" type="button" disabled={isRemoteDeleted} onClick={onOpen}>
        <strong className={`text-lg leading-tight ${isRemoteDeleted ? "line-through decoration-2" : ""}`}>{app.name}</strong>
        <span className="line-clamp-3 text-sm leading-snug text-app-muted">{app.description}</span>
      </button>
      <div className="flex flex-wrap gap-2">
        <span
          className={`rounded-full px-2 py-1 text-[11px] font-extrabold uppercase ${syncBadgeClassName(syncBadge.tone)}`}
          title={isRemoteDeleted ? "The owner deleted this shared app. You can remove this local entry from the edit menu." : undefined}
        >
          {syncBadge.label}
          {isRemoteDeleted ? " ⓘ" : ""}
        </span>
      </div>
      <div className="mt-auto flex items-center justify-between gap-2 border-t border-app-line pt-3">
        <span className="truncate text-xs font-bold text-app-muted">{formatDate(app.updatedAt)}</span>
        <div className="flex gap-2">
          <button
            className="min-h-8 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            disabled={isRemoteDeleted}
            onClick={onShare}
          >
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

function syncBadgeClassName(tone: AppSyncBadge["tone"]): string {
  if (tone === "good") return "bg-emerald-50 text-emerald-700";
  if (tone === "shared") return "bg-violet-50 text-violet-700";
  if (tone === "attention") return "bg-amber-50 text-amber-800";
  return "bg-slate-100 text-app-muted";
}

function ShareAppDialog({
  app,
  hasStorageProfile,
  onClose,
  onCreateInvite,
}: {
  app: AppSummary | null;
  hasStorageProfile: boolean;
  onClose: () => void;
  onCreateInvite: (appId: string) => Promise<AppInvitePayload>;
}) {
  const [inviteUrl, setInviteUrl] = useState("");
  const [status, setStatus] = useState("Ready");

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
      await navigator.clipboard?.writeText(url);
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

        <p className="text-sm leading-relaxed text-app-muted">
          Sharing exposes this app's room references in an invite link. In v1, collaborators with the link can forward it. Source
          code is visible to collaborators because browser apps can be inspected.
        </p>

        {!hasStorageProfile ? (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm font-bold leading-relaxed text-amber-900">
            Configure Storage and sync in Settings before creating share links.
          </div>
        ) : null}

        <div className="rounded-lg border border-app-line bg-slate-50 p-3">
          <p className="mb-2 text-xs font-extrabold uppercase text-app-muted">Invite link</p>
          <textarea
            className="min-h-24 w-full resize-y rounded-md border border-app-line bg-white p-3 font-mono text-xs leading-relaxed text-app-muted"
            readOnly
            value={inviteUrl || "Create an invite to show the stable room link here."}
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
}: {
  invite: AppInvitePayload | null;
  onClose: () => void;
  onImport: (invite: AppInvitePayload) => Promise<void>;
}) {
  const [status, setStatus] = useState("Ready");

  useEffect(() => {
    setStatus("Ready");
  }, [invite?.createdAt]);

  if (!invite) return null;

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

        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-bold text-app-muted">{status}</span>
          <div className="flex gap-2">
            <button className="min-h-9 rounded-md border border-app-line bg-white px-3 text-sm font-bold text-app-ink hover:border-app-accent" type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="min-h-9 rounded-md border border-app-accent bg-app-accent px-3 text-sm font-extrabold text-white hover:bg-app-strong" type="button" onClick={importInvite}>
              Import
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LauncherEditDialog({
  app,
  onClose,
  onDeleteApp,
  syncBadge,
  onUpdateApp,
}: {
  app: AppSummary | null;
  onClose: () => void;
  onDeleteApp: (appId: string) => Promise<void>;
  syncBadge?: AppSyncBadge;
  onUpdateApp: (appId: string, input: { name: string; description: string }) => Promise<void>;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Ready");

  useEffect(() => {
    setName(app?.name ?? "");
    setDescription(app?.description ?? "");
    setStatus("Ready");
  }, [app]);

  if (!app) return null;

  async function save() {
    if (!app || !name.trim()) return;
    setStatus("Saving...");
    try {
      await onUpdateApp(app.appId, { name: name.trim(), description: description.trim() });
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not save app.");
    }
  }

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
    <div className="fixed inset-0 z-40 grid place-items-center bg-black/35 px-4" role="dialog" aria-modal="true" aria-label="Edit app">
      <div className="grid w-full max-w-md gap-4 rounded-xl border border-app-line bg-app-panel p-4 shadow-panel">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-extrabold">Edit app</h2>
          <button
            className="grid h-8 min-h-8 w-8 place-items-center rounded-full text-xl text-app-muted hover:bg-app-accent/10 hover:text-app-accent"
            type="button"
            aria-label="Close app editor"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <label className="grid gap-2 text-sm font-bold text-app-muted">
          Name
          <input
            className="min-h-10 rounded-md border border-app-line bg-white px-3 text-base font-semibold text-app-ink outline-none focus:border-app-accent"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-app-muted">
          Description
          <textarea
            className="min-h-24 resize-y rounded-md border border-app-line bg-white px-3 py-2 text-base font-medium text-app-ink outline-none focus:border-app-accent"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
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
            <button
              className="min-h-9 rounded-md border border-app-accent bg-app-accent px-3 text-sm font-bold text-white hover:bg-app-strong disabled:opacity-50"
              type="button"
              disabled={!name.trim()}
              onClick={save}
            >
              Save
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

function readHtmlTitle(sourceCode: string): string {
  const document = new DOMParser().parseFromString(sourceCode, "text/html");
  return document.title.trim();
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

function formatDate(value: string): string {
  return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(new Date(value));
}
