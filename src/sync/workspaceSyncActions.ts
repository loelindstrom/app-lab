import type { AppLabCore, AppRecord, JsonValue } from "../core/types";
import { deleteRemoteAppRooms, ensureRemoteAppRooms, isRemoteAppDeletedError, loadRemoteAppRooms, saveRemoteAppData, saveRemoteAppSource } from "./appRooms";
import { decryptRoomSnapshot, rememberSnapshotVersion } from "./crypto";
import { createFirebaseRealtimeSyncProvider, createFirebaseSdkRealtimeDriver } from "./firebaseRealtimeProvider";
import type { RealtimeSyncProvider } from "./types";
import type { AppInvitePayload, AppSyncRecord, RemoteProviderReference, StorageProfile, WorkspaceSyncRegistry } from "./workspaceSync";
import {
  createWorkspaceRecoveryMaterial,
  decodeWorkspaceRecoveryMaterial,
  encodeWorkspaceRecoveryMaterial,
  loadWorkspaceManifest,
  saveWorkspaceManifest,
} from "./workspaceManifest";

interface WorkspaceSyncActionsInput {
  core: AppLabCore;
  createProviderFromReference?: (provider: RemoteProviderReference) => RealtimeSyncProvider;
  createProviderFromStorageProfile?: (profile: StorageProfile) => RealtimeSyncProvider;
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

export function createWorkspaceSyncActions(input: WorkspaceSyncActionsInput) {
  const { core, syncRegistry } = input;
  const createProviderFromStorageProfile = input.createProviderFromStorageProfile ?? createFirebaseProviderFromStorageProfile;
  const createProviderFromReference = input.createProviderFromReference ?? createFirebaseProviderFromReference;

  async function createInvite(appId: string): Promise<AppInvitePayload> {
    const app = await core.getApp(appId);
    if (!app) throw new Error("App not found.");
    let syncRecord = await syncRegistry.getAppSyncRecord(appId);
    if (!syncRecord) syncRecord = await syncRegistry.ensureOwnedAppRooms(appId);

    if (syncRecord.kind !== "joined") {
      const profile = await syncRegistry.getStorageProfile();
      if (!profile) throw new Error("Storage profile is required before sharing.");
      await syncCurrentAppToRemote(app, createProviderFromStorageProfile(profile), syncRecord);
    }

    return syncRegistry.createInvite(appId);
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
  }

  async function pushAppSource(app: AppRecord): Promise<void> {
    const record = await syncRegistry.getAppSyncRecord(app.appId);
    const provider = await createSourceProviderForSyncRecord(record);
    if (!record || !provider) return;
    const sourceRoom = await saveRemoteAppSource({ app, provider, syncRecord: record });
    await syncRegistry.rememberAppRoomVersions({ appId: app.appId, sourceRoom });
  }

  async function pushAppData(appId: string, data: JsonValue): Promise<void> {
    const record = await syncRegistry.getAppSyncRecord(appId);
    const provider = await createProviderForSyncRecord(record);
    if (!record || !provider) return;
    const dataRoom = await saveRemoteAppData({ appData: data, provider, syncRecord: record });
    await syncRegistry.rememberAppRoomVersions({ appId, dataRoom });
  }

  async function ensureAppBackedUp(app: AppRecord): Promise<void> {
    const profile = await syncRegistry.getStorageProfile();
    if (!profile) return;
    const syncRecord = await syncRegistry.ensureOwnedAppRooms(app.appId);
    const provider = createProviderFromStorageProfile(profile);
    await ensureRemoteAppRooms({
      app,
      appData: await core.getAppData(app.appId),
      provider,
      syncRecord,
    });
    const loaded = await loadRemoteAppRooms({ provider, syncRecord });
    await syncRegistry.rememberAppRoomVersions({
      appId: app.appId,
      dataRoom: loaded.dataRoom,
      sourceRoom: loaded.sourceRoom,
    });
  }

  async function backUpLocalApps(): Promise<void> {
    for (const appSummary of await core.listApps()) {
      const record = await syncRegistry.getAppSyncRecord(appSummary.appId);
      if (!record) await syncRegistry.ensureOwnedAppRooms(appSummary.appId);
      const fullApp = await core.getApp(appSummary.appId);
      if (fullApp) await ensureAppBackedUp(fullApp);
    }
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
      return { app: loaded.app };
    } catch (error) {
      if (!isRemoteAppDeletedError(error)) throw error;
      await syncRegistry.markRemoteAppDeleted(appId, error.deletedAt);
      return { deletedAt: error.deletedAt };
    }
  }

  async function deleteSyncedAppRooms(appId: string): Promise<void> {
    const record = await syncRegistry.getAppSyncRecord(appId);
    if (!record || record.kind === "joined") return;
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

  async function exportWorkspaceRecovery(): Promise<string> {
    await syncRegistry.ensureWorkspaceManifestRoom();
    let state = await syncRegistry.getState();
    if (!state.storageProfile) throw new Error("Storage profile is required.");
    const provider = createProviderFromStorageProfile(state.storageProfile);
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
    return encodeWorkspaceRecoveryMaterial(createWorkspaceRecoveryMaterial(savedState));
  }

  async function restoreWorkspaceRecovery(recoveryText: string): Promise<void> {
    const recoveryMaterial = decodeWorkspaceRecoveryMaterial(recoveryText);
    const restoredState = await loadWorkspaceManifest({
      provider: createProviderFromReference(recoveryMaterial.provider),
      recoveryMaterial,
    });
    await hydrateWorkspaceAppsFromRooms(restoredState);
    await syncRegistry.replaceState(restoredState);
  }

  async function subscribeAppData(
    appId: string,
    onChange: (change: RemoteAppDataChange) => void,
  ): Promise<() => void> {
    const record = await syncRegistry.getAppSyncRecord(appId);
    const provider = await createProviderForSyncRecord(record);
    if (!record || !provider) return () => {};

    return provider.subscribeRoom({
      readToken: record.dataRoom.readToken,
      roomId: record.dataRoom.roomId,
      onChange: (snapshot) => {
        void (async () => {
          const latestRecord = await syncRegistry.getAppSyncRecord(appId);
          if (!latestRecord || snapshot.version <= latestRecord.dataRoom.lastSeenVersion) return;
          const data = await decryptRoomSnapshot({
            capability: latestRecord.dataRoom,
            roomType: "app-data",
            snapshot,
          });
          await core.saveAppData(appId, data);
          const dataRoom = rememberSnapshotVersion(latestRecord.dataRoom, snapshot);
          await syncRegistry.rememberAppRoomVersions({ appId, dataRoom });
          onChange({ data, version: snapshot.version });
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
      readToken: record.sourceRoom.readToken,
      roomId: record.sourceRoom.roomId,
      onChange: (snapshot) => {
        void (async () => {
          const latestRecord = await syncRegistry.getAppSyncRecord(appId);
          if (!latestRecord || snapshot.version <= latestRecord.sourceRoom.lastSeenVersion) return;
          try {
            const loaded = await loadRemoteAppRooms({ provider, syncRecord: latestRecord });
            await core.upsertApp(loaded.app);
            await core.saveAppData(loaded.app.appId, loaded.appData);
            await syncRegistry.rememberAppRoomVersions({
              appId: loaded.app.appId,
              dataRoom: loaded.dataRoom,
              sourceRoom: loaded.sourceRoom,
            });
            onChange({ app: loaded.app });
          } catch (error) {
            if (!isRemoteAppDeletedError(error)) throw error;
            await syncRegistry.markRemoteAppDeleted(appId, error.deletedAt);
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

  return {
    backUpLocalApps,
    createInvite,
    deleteSyncedAppRooms,
    ensureAppBackedUp,
    exportWorkspaceRecovery,
    importInvite,
    pullLatestAppRooms,
    pushAppData,
    pushAppSource,
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
