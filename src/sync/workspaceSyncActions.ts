import type { AppLabCore, AppRecord, JsonValue } from "../core/types";
import { isRemoteAppDeletedError, loadRemoteAppRooms, loadRemoteAppSource, saveRemoteAppData, saveRemoteAppSource } from "./appRooms";
import { processAppDataSyncQueue } from "./appDataSyncWorker";
import { decryptRoomSnapshot, rememberSnapshotVersion, roomReadToken } from "./crypto";
import { createFirebaseRealtimeSyncProvider, createFirebaseSdkRealtimeDriver } from "./firebaseRealtimeProvider";
import { processOwnedAppDeletionQueue } from "./ownedAppDeletionWorker";
import { processRoomLifecycleQueue } from "./roomLifecycleWorker";
import { processSourceSyncQueue } from "./sourceSyncWorker";
import { enqueueDeleteOwnedApp, enqueueEnsureAppRooms, enqueueSaveAppData, enqueueSaveSource, enqueueSaveWorkspaceManifest, saveAppDataQueueId, type SyncQueueStore } from "./syncQueue";
import type { RealtimeSyncProvider } from "./types";
import type { AppInvitePayload, AppSyncRecord, RemoteProviderReference, StorageProfile, WorkspaceSyncRegistry } from "./workspaceSync";
import {
  createWorkspaceRecoveryMaterial,
  decodeWorkspaceRecoveryMaterial,
  encodeWorkspaceRecoveryMaterial,
  loadWorkspaceManifest,
} from "./workspaceManifest";
import { processWorkspaceManifestQueue } from "./workspaceManifestWorker";

interface WorkspaceSyncActionsInput {
  core: AppLabCore;
  createProviderFromReference?: (provider: RemoteProviderReference) => RealtimeSyncProvider;
  createProviderFromStorageProfile?: (profile: StorageProfile) => RealtimeSyncProvider;
  queueStore: SyncQueueStore;
  syncRegistry: WorkspaceSyncRegistry;
}

export interface RemoteAppDataChange {
  data: JsonValue;
  version: number;
}

export interface RemoteAppSourceChange {
  app: AppRecord;
}

export interface RemoteAppDeletedChange {
  deletedAt: string;
}

export interface PullLatestResult {
  app?: AppRecord;
  deletedAt?: string;
}

export type WorkspaceSyncActions = ReturnType<typeof createWorkspaceSyncActions>;

export function createWorkspaceSyncActions(input: WorkspaceSyncActionsInput) {
  const { core, queueStore, syncRegistry } = input;
  const createProviderFromStorageProfile = input.createProviderFromStorageProfile ?? createFirebaseProviderFromStorageProfile;
  const createProviderFromReference = input.createProviderFromReference ?? createFirebaseProviderFromReference;
  let roomLifecycleFlushAgain = false;
  let roomLifecycleFlushPromise: Promise<void> | null = null;
  let appDataFlushAgain = false;
  let appDataFlushPromise: Promise<void> | null = null;
  let sourceFlushAgain = false;
  let sourceFlushPromise: Promise<void> | null = null;
  let manifestFlushAgain = false;
  let manifestFlushPromise: Promise<void> | null = null;
  let deletionFlushAgain = false;
  let deletionFlushPromise: Promise<void> | null = null;
  const localAppDataWriteBarriers = new Map<string, number>();

  async function createInvite(appId: string): Promise<AppInvitePayload> {
    const app = await core.getApp(appId);
    if (!app) throw new Error("App not found.");
    let syncRecord = await syncRegistry.getAppSyncRecord(appId);
    if (!syncRecord) syncRecord = await syncRegistry.ensureOwnedAppRooms(appId);

    if (syncRecord.kind !== "joined") {
      await flushRoomLifecycleQueue();
      await flushSourceSyncQueue();
      await flushAppDataSyncQueue();
      syncRecord = await syncRegistry.getAppSyncRecord(appId);
      const profile = await syncRegistry.getStorageProfile();
      if (!profile) throw new Error("Storage profile is required before sharing.");
      await syncCurrentAppToRemote(app, createProviderFromStorageProfile(profile), syncRecord);
    }

    const invite = await syncRegistry.createInvite(appId);
    await enqueueCurrentWorkspaceManifest();
    void flushWorkspaceManifestQueue();
    return invite;
  }

  async function importInvite(invite: AppInvitePayload): Promise<void> {
    const provider = createProviderFromReference(invite.provider);
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
    await enqueueCurrentWorkspaceManifest();
    void flushWorkspaceManifestQueue();
  }

  async function pushAppSource(app: AppRecord): Promise<void> {
    const record = await syncRegistry.getAppSyncRecord(app.appId);
    if (!record) {
      const profile = await syncRegistry.getStorageProfile();
      if (!profile) return;
      await syncRegistry.ensureOwnedAppRooms(app.appId);
      await enqueueEnsureAppRooms(queueStore, app.appId);
    }
    await enqueueSaveSource(queueStore, app);
    void flushSourceSyncQueue();
  }

  async function pushAppData(appId: string, data: JsonValue): Promise<void> {
    markRecentLocalAppDataWrite(appId);
    const record = await syncRegistry.getAppSyncRecord(appId);
    let syncRecord = record;
    if (!syncRecord) {
      const profile = await syncRegistry.getStorageProfile();
      if (!profile) return;
      syncRecord = await syncRegistry.ensureOwnedAppRooms(appId);
      await enqueueEnsureAppRooms(queueStore, appId);
    }
    await enqueueSaveAppData({
      appId,
      baseData: data,
      baseRemoteVersion: syncRecord.dataRoom.lastSeenVersion,
      data,
      roomId: syncRecord.dataRoom.roomId,
      store: queueStore,
    });
    void flushAppDataSyncQueue();
  }

  async function ensureAppBackedUp(app: AppRecord): Promise<void> {
    const profile = await syncRegistry.getStorageProfile();
    if (!profile) return;
    await syncRegistry.ensureOwnedAppRooms(app.appId);
    await enqueueEnsureAppRooms(queueStore, app.appId);
    await enqueueCurrentWorkspaceManifest();
    void flushRoomLifecycleQueue();
  }

  async function backUpLocalApps(): Promise<void> {
    for (const appSummary of await core.listApps()) {
      const record = await syncRegistry.getAppSyncRecord(appSummary.appId);
      if (!record) await syncRegistry.ensureOwnedAppRooms(appSummary.appId);
      const fullApp = await core.getApp(appSummary.appId);
      if (fullApp) await ensureAppBackedUp(fullApp);
    }
    await flushRoomLifecycleQueue();
    await enqueueCurrentWorkspaceManifest();
    await flushWorkspaceManifestQueue();
  }

  async function pullLatestAppRooms(appId: string): Promise<PullLatestResult> {
    const record = await syncRegistry.getAppSyncRecord(appId);
    const provider = await createProviderForSyncRecord(record);
    if (!record || !provider) return {};

    try {
      const loaded = await loadRemoteAppRooms({ provider, syncRecord: record });
      await core.upsertApp(loaded.app);
      await core.saveAppData(loaded.app.appId, loaded.appData);
      await syncRegistry.rememberAppRoomVersions({
        appId: loaded.app.appId,
        dataRoom: loaded.dataRoom,
        sourceRoom: loaded.sourceRoom,
      });
      await enqueueCurrentWorkspaceManifest();
      return { app: loaded.app };
    } catch (error) {
      if (!isRemoteAppDeletedError(error)) throw error;
      await syncRegistry.markRemoteAppDeleted(appId, error.deletedAt);
      await enqueueCurrentWorkspaceManifest();
      return { deletedAt: error.deletedAt };
    }
  }

  async function deleteSyncedAppRooms(appId: string): Promise<void> {
    const record = await syncRegistry.getAppSyncRecord(appId);
    if (!record || record.kind === "joined") return;
    const app = await core.getApp(appId);
    if (!app) return;
    await enqueueDeleteOwnedApp({ app, store: queueStore, syncRecord: record });
    void flushOwnedAppDeletionQueue();
  }

  async function exportWorkspaceRecovery(): Promise<string> {
    await syncRegistry.ensureWorkspaceManifestRoom();
    await flushRoomLifecycleQueue();
    await flushSourceSyncQueue();
    await flushAppDataSyncQueue();

    let state = await syncRegistry.getState();
    if (!state.storageProfile) throw new Error("Storage profile is required.");
    const provider = createProviderFromStorageProfile(state.storageProfile);
    for (const appSummary of await core.listApps()) {
      const app = await core.getApp(appSummary.appId);
      const syncRecord = await syncRegistry.getAppSyncRecord(appSummary.appId);
      if (!app || !syncRecord || syncRecord.kind === "joined") continue;
      await syncCurrentAppToRemote(app, provider, syncRecord);
    }
    await enqueueCurrentWorkspaceManifest();
    void flushWorkspaceManifestQueue();
    state = await syncRegistry.getState();
    const material = createWorkspaceRecoveryMaterial(state);
    return encodeWorkspaceRecoveryMaterial(material);
  }

  async function restoreWorkspaceRecovery(recoveryText: string): Promise<void> {
    const recoveryMaterial = decodeWorkspaceRecoveryMaterial(recoveryText);
    const restoredState = await loadWorkspaceManifest({
      provider: createProviderFromReference(recoveryMaterial.provider),
      recoveryMaterial,
    });
    await hydrateWorkspaceAppsFromRooms(restoredState);
    await syncRegistry.replaceState(restoredState);
    await enqueueCurrentWorkspaceManifest();
    void flushWorkspaceManifestQueue();
  }

  async function subscribeAppData(
    appId: string,
    onChange: (change: RemoteAppDataChange) => void,
  ): Promise<() => void> {
    const record = await syncRegistry.getAppSyncRecord(appId);
    const provider = await createProviderForSyncRecord(record);
    if (!record || !provider) return () => {};
    const subscriptionBaselineVersion = record.dataRoom.lastSeenVersion;
    let initialSnapshotSeen = false;

    return provider.subscribeRoom({
      readToken: roomReadToken(record.dataRoom),
      roomId: record.dataRoom.roomId,
      onChange: (snapshot) => {
        void (async () => {
          try {
            const isInitialSnapshot = !initialSnapshotSeen;
            initialSnapshotSeen = true;
            const latestRecord = await syncRegistry.getAppSyncRecord(appId);
            if (!latestRecord || snapshot.version <= latestRecord.dataRoom.lastSeenVersion) return;
            if (await shouldPreferLocalAppData(appId)) return;
            const data = await decryptRoomSnapshot({
              capability: latestRecord.dataRoom,
              roomType: "app-data",
              snapshot,
            });
            await core.saveAppData(appId, data);
            const dataRoom = rememberSnapshotVersion(latestRecord.dataRoom, snapshot);
            await syncRegistry.rememberAppRoomVersions({ appId, dataRoom });
            await enqueueCurrentWorkspaceManifest();
            if (isInitialSnapshot && subscriptionBaselineVersion === 0) return;
            onChange({ data, version: snapshot.version });
          } catch (error) {
            if (isRoomNotFoundError(error)) return;
            console.warn("Could not process remote app data update.", error);
          }
        })();
      },
    });
  }

  async function subscribeAppSource(
    appId: string,
    onChange: (change: RemoteAppSourceChange) => void,
    onDeleted: (change: RemoteAppDeletedChange) => void,
  ): Promise<() => void> {
    const record = await syncRegistry.getAppSyncRecord(appId);
    const provider = await createSourceProviderForSyncRecord(record);
    if (!record || !provider) return () => {};

    return provider.subscribeRoom({
      readToken: roomReadToken(record.sourceRoom),
      roomId: record.sourceRoom.roomId,
      onChange: (snapshot) => {
        void (async () => {
          const latestRecord = await syncRegistry.getAppSyncRecord(appId);
          if (!latestRecord || snapshot.version <= latestRecord.sourceRoom.lastSeenVersion) return;
          try {
            const loaded = await loadRemoteAppSource({ provider, syncRecord: latestRecord });
            await core.upsertApp(loaded.app);
            await syncRegistry.rememberAppRoomVersions({
              appId: loaded.app.appId,
              sourceRoom: loaded.sourceRoom,
            });
            await enqueueCurrentWorkspaceManifest();
            onChange({ app: loaded.app });
          } catch (error) {
            if (isRoomNotFoundError(error)) return;
            if (!isRemoteAppDeletedError(error)) {
              console.warn("Could not process remote app source update.", error);
              return;
            }
            await syncRegistry.markRemoteAppDeleted(appId, error.deletedAt);
            await enqueueCurrentWorkspaceManifest();
            onDeleted({ deletedAt: error.deletedAt });
          }
        })();
      },
    });
  }

  async function syncCurrentAppToRemote(
    app: AppRecord,
    provider: RealtimeSyncProvider,
    record: AppSyncRecord | null,
  ): Promise<void> {
    if (!record || record.kind === "joined") return;
    const sourceRoom = await saveRemoteAppSource({ app, provider, syncRecord: record });
    const dataRoom = await saveRemoteAppData({
      appData: await core.getAppData(app.appId),
      provider,
      syncRecord: { ...record, sourceRoom },
    });
    await syncRegistry.rememberAppRoomVersions({ appId: app.appId, dataRoom, sourceRoom });
    await enqueueCurrentWorkspaceManifest();
  }

  async function createProviderForSyncRecord(record: AppSyncRecord | null): Promise<RealtimeSyncProvider | null> {
    if (!record) return null;
    if (record.kind === "joined") return createProviderFromReference(record.dataProvider);
    const profile = await syncRegistry.getStorageProfile();
    if (!profile) return null;
    return createProviderFromStorageProfile(profile);
  }

  async function createSourceProviderForSyncRecord(record: AppSyncRecord | null): Promise<RealtimeSyncProvider | null> {
    if (!record) return null;
    if (record.kind === "joined") return createProviderFromReference(record.sourceProvider);
    const profile = await syncRegistry.getStorageProfile();
    if (!profile) return null;
    return createProviderFromStorageProfile(profile);
  }

  async function hydrateWorkspaceAppsFromRooms(state: Awaited<ReturnType<WorkspaceSyncRegistry["getState"]>>): Promise<void> {
    if (!state.storageProfile) return;
    const provider = createProviderFromStorageProfile(state.storageProfile);
    for (const record of Object.values(state.apps)) {
      if (record.kind === "joined" && record.sourceProvider.databaseUrl !== state.storageProfile.databaseUrl) continue;
      const loaded = await loadRemoteAppRooms({ provider, syncRecord: record });
      await core.upsertApp(loaded.app);
      await core.saveAppData(loaded.app.appId, loaded.appData);
      record.sourceRoom = loaded.sourceRoom;
      record.dataRoom = loaded.dataRoom;
    }
  }

  async function flushRoomLifecycleQueue(): Promise<void> {
    if (roomLifecycleFlushPromise) {
      roomLifecycleFlushAgain = true;
      return roomLifecycleFlushPromise;
    }
    roomLifecycleFlushPromise = (async () => {
      do {
        roomLifecycleFlushAgain = false;
        await processRoomLifecycleQueue({
          core,
          createProviderFromStorageProfile,
          queueStore,
          syncRegistry,
        });
      } while (roomLifecycleFlushAgain);
    })().finally(() => {
      roomLifecycleFlushPromise = null;
    });
    return roomLifecycleFlushPromise;
  }

  async function flushSourceSyncQueue(): Promise<void> {
    if (sourceFlushPromise) {
      sourceFlushAgain = true;
      return sourceFlushPromise;
    }
    sourceFlushPromise = (async () => {
      do {
        sourceFlushAgain = false;
        await flushRoomLifecycleQueue();
        await processSourceSyncQueue({
          core,
          createProviderForSyncRecord: createSourceProviderForSyncRecord,
          queueStore,
          syncRegistry,
        });
      } while (sourceFlushAgain);
      await enqueueCurrentWorkspaceManifest();
      void flushWorkspaceManifestQueue();
    })().finally(() => {
      sourceFlushPromise = null;
    });
    return sourceFlushPromise;
  }

  async function flushAppDataSyncQueue(): Promise<void> {
    if (appDataFlushPromise) {
      appDataFlushAgain = true;
      return appDataFlushPromise;
    }
    appDataFlushPromise = (async () => {
      do {
        appDataFlushAgain = false;
        await flushRoomLifecycleQueue();
        await processAppDataSyncQueue({
          createProviderForSyncRecord: createProviderForSyncRecord,
          queueStore,
          syncRegistry,
        });
        await clearSettledLocalAppDataWriteBarriers();
      } while (appDataFlushAgain);
      await enqueueCurrentWorkspaceManifest();
      void flushWorkspaceManifestQueue();
    })().finally(() => {
      appDataFlushPromise = null;
    });
    return appDataFlushPromise;
  }

  async function enqueueCurrentWorkspaceManifest(): Promise<void> {
    const state = await syncRegistry.getState();
    if (!state.storageProfile) return;
    await syncRegistry.ensureWorkspaceManifestRoom();
    await enqueueSaveWorkspaceManifest(queueStore, state.workspaceId);
  }

  async function queueWorkspaceManifestSave(): Promise<void> {
    await enqueueCurrentWorkspaceManifest();
  }

  function noteLocalAppDataEdit(appId: string): void {
    markRecentLocalAppDataWrite(appId);
  }

  async function flushWorkspaceManifestQueue(options: { throwOnError?: boolean } = {}): Promise<void> {
    if (manifestFlushPromise) {
      manifestFlushAgain = true;
      await manifestFlushPromise;
      if (!options.throwOnError) return;
    }
    manifestFlushPromise = (async () => {
      do {
        manifestFlushAgain = false;
        await processWorkspaceManifestQueue({
          createProviderFromStorageProfile,
          queueStore,
          syncRegistry,
          throwOnError: options.throwOnError,
        });
      } while (manifestFlushAgain);
    })().finally(() => {
      manifestFlushPromise = null;
    });
    return manifestFlushPromise;
  }

  async function hasPendingLocalAppData(appId: string): Promise<boolean> {
    const item = await queueStore.getItem(saveAppDataQueueId(appId));
    return item?.kind === "save-app-data";
  }

  async function shouldPreferLocalAppData(appId: string): Promise<boolean> {
    return (await hasPendingLocalAppData(appId)) || hasRecentLocalAppDataWrite(appId);
  }

  function markRecentLocalAppDataWrite(appId: string) {
    localAppDataWriteBarriers.set(appId, Date.now() + 1500);
  }

  function hasRecentLocalAppDataWrite(appId: string): boolean {
    const expiresAt = localAppDataWriteBarriers.get(appId);
    if (!expiresAt) return false;
    if (Date.now() <= expiresAt) return true;
    localAppDataWriteBarriers.delete(appId);
    return false;
  }

  async function clearSettledLocalAppDataWriteBarriers(): Promise<void> {
    await Promise.all(
      [...localAppDataWriteBarriers.keys()].map(async (appId) => {
        if (await hasPendingLocalAppData(appId)) return;
        localAppDataWriteBarriers.delete(appId);
      }),
    );
  }

  async function flushOwnedAppDeletionQueue(): Promise<void> {
    if (deletionFlushPromise) {
      deletionFlushAgain = true;
      return deletionFlushPromise;
    }
    deletionFlushPromise = (async () => {
      do {
        deletionFlushAgain = false;
        await processOwnedAppDeletionQueue({
          createProviderFromStorageProfile,
          queueStore,
          syncRegistry,
        });
      } while (deletionFlushAgain);
    })().finally(() => {
      deletionFlushPromise = null;
    });
    return deletionFlushPromise;
  }

  return {
    backUpLocalApps,
    createInvite,
    deleteSyncedAppRooms,
    ensureAppBackedUp,
    exportWorkspaceRecovery,
    flushAppDataSyncQueue,
    flushOwnedAppDeletionQueue,
    flushWorkspaceManifestQueue,
    flushSourceSyncQueue,
    flushRoomLifecycleQueue,
    importInvite,
    noteLocalAppDataEdit,
    pullLatestAppRooms,
    pushAppData,
    pushAppSource,
    queueWorkspaceManifestSave,
    restoreWorkspaceRecovery,
    subscribeAppData,
    subscribeAppSource,
  };
}

function createFirebaseProviderFromStorageProfile(profile: StorageProfile): RealtimeSyncProvider {
  return createFirebaseRealtimeSyncProvider({ driver: createFirebaseSdkRealtimeDriver(profile.firebaseConfig) });
}

function createFirebaseProviderFromReference(provider: RemoteProviderReference): RealtimeSyncProvider {
  if (!provider.firebaseConfig) throw new Error("Invite is missing Firebase config.");
  return createFirebaseRealtimeSyncProvider({ driver: createFirebaseSdkRealtimeDriver(provider.firebaseConfig) });
}

function isRoomNotFoundError(error: unknown): boolean {
  return error instanceof Error && /(not found|found missing)/i.test(error.message);
}
