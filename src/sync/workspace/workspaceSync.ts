import type { AppId } from "../../core";
import { createFirebaseOwnerSetupSecret, DEFAULT_FIREBASE_ACCESS_MODEL, type FirebaseAccessModel } from "../providers/firebase/firebaseAccessRules";
import { normalizeFirebaseDatabaseUrl, parseFirebaseWebAppConfig, type FirebaseWebAppConfig } from "../providers/firebase/firebaseConfig";
import { createRoomCapability } from "../rooms/crypto";
import type { RoomCapability } from "../rooms/types";

const WORKSPACE_SYNC_SCHEMA_VERSION = 1;
const LOCAL_STORAGE_KEY = "app-lab-workspace-sync-v1";

export type StorageProviderKind = "firebase-rtdb";

export interface StorageProfile {
  accessModel: FirebaseAccessModel;
  profileId: string;
  provider: StorageProviderKind;
  displayName: string;
  databaseUrl: string;
  firebaseConfig: FirebaseWebAppConfig;
  ownerSetupSecret?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConfigureStorageProfileInput {
  accessModel?: FirebaseAccessModel;
  displayName?: string;
  firebaseConfigText?: string;
  ownerSetupSecret?: string;
  provider?: StorageProviderKind;
  databaseUrl: string;
}

export interface RemoteProviderReference {
  accessModel?: FirebaseAccessModel;
  provider: StorageProviderKind;
  profileId?: string;
  databaseUrl: string;
  firebaseConfig?: FirebaseWebAppConfig;
}

export type AppSyncRecord = OwnedAppSyncRecord | JoinedAppSyncRecord | PrivateCopySyncRecord;

export interface OwnedAppSyncRecord {
  kind: "owned";
  appId: AppId;
  storageProfileId: string;
  sourceRoom: RoomCapability;
  dataRoom: RoomCapability;
  shareState: "private" | "invite-created";
  createdAt: string;
  updatedAt: string;
}

export interface JoinedAppSyncRecord {
  kind: "joined";
  appId: AppId;
  sourceProvider: RemoteProviderReference;
  dataProvider: RemoteProviderReference;
  sourceRoom: RoomCapability;
  dataRoom: RoomCapability;
  importedAt: string;
  cachedAt?: string;
  remoteDeletedAt?: string;
}

export interface PrivateCopySyncRecord {
  kind: "private-copy";
  appId: AppId;
  storageProfileId: string;
  sourceRoom: RoomCapability;
  dataRoom: RoomCapability;
  copiedFrom?: {
    appId?: AppId;
    provider: RemoteProviderReference;
    copiedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface WorkspaceSyncState {
  schemaVersion: typeof WORKSPACE_SYNC_SCHEMA_VERSION;
  workspaceId: string;
  storageProfile: StorageProfile | null;
  manifestRoom?: RoomCapability;
  apps: Record<AppId, AppSyncRecord>;
  deletedApps: Record<AppId, TombstoneRecord>;
  updatedAt: string;
}

export interface TombstoneRecord {
  appId: AppId;
  deletedAt: string;
  reason: "local-delete" | "remote-owner-delete";
}

export type AppSyncBadgeKind = "local-only" | "backed-up" | "shared-by-me" | "shared-with-me" | "private-copy" | "needs-attention";

export interface AppSyncBadge {
  kind: AppSyncBadgeKind;
  label: string;
  tone: "neutral" | "good" | "shared" | "attention";
}

export interface AppInvitePayload {
  schemaVersion: 1;
  kind: "app-lab-invite";
  provider: RemoteProviderReference;
  sourceRoom: RoomCapability;
  dataRoom: RoomCapability;
  createdAt: string;
}

export interface WorkspaceSyncStore {
  load(): Promise<WorkspaceSyncState | null>;
  save(state: WorkspaceSyncState): Promise<void>;
}

export interface WorkspaceSyncRegistry {
  getState(): Promise<WorkspaceSyncState>;
  getStorageProfile(): Promise<StorageProfile | null>;
  configureStorageProfile(input: ConfigureStorageProfileInput): Promise<StorageProfile>;
  clearStorageProfile(): Promise<void>;
  ensureWorkspaceManifestRoom(): Promise<RoomCapability>;
  rememberWorkspaceManifestVersion(version: number): Promise<RoomCapability>;
  replaceState(state: WorkspaceSyncState): Promise<void>;
  ensureOwnedAppRooms(appId: AppId): Promise<OwnedAppSyncRecord>;
  markJoinedApp(input: {
    appId: AppId;
    sourceProvider: RemoteProviderReference;
    dataProvider?: RemoteProviderReference;
    sourceRoom: RoomCapability;
    dataRoom: RoomCapability;
  }): Promise<JoinedAppSyncRecord>;
  createInvite(appId: AppId): Promise<AppInvitePayload>;
  getInvite(appId: AppId): Promise<AppInvitePayload | null>;
  getAppSyncRecord(appId: AppId): Promise<AppSyncRecord | null>;
  getAppSyncBadge(appId: AppId): Promise<AppSyncBadge>;
  listAppSyncBadges(appIds: AppId[]): Promise<Record<AppId, AppSyncBadge>>;
  markRemoteAppDeleted(appId: AppId, deletedAt?: string): Promise<void>;
  rememberAppRoomVersions(input: { appId: AppId; dataRoom?: RoomCapability; sourceRoom?: RoomCapability }): Promise<AppSyncRecord>;
  removeLocalAppSync(appId: AppId): Promise<void>;
}

export function createWorkspaceSyncRegistry(store: WorkspaceSyncStore): WorkspaceSyncRegistry {
  async function getState(): Promise<WorkspaceSyncState> {
    return (await store.load()) ?? createEmptyWorkspaceSyncState();
  }

  async function saveMutated(mutator: (state: WorkspaceSyncState, now: string) => void): Promise<WorkspaceSyncState> {
    const state = await getState();
    const now = new Date().toISOString();
    mutator(state, now);
    state.updatedAt = now;
    await store.save(state);
    return state;
  }

  async function getStorageProfile(): Promise<StorageProfile | null> {
    return (await getState()).storageProfile;
  }

  async function configureStorageProfile(input: ConfigureStorageProfileInput): Promise<StorageProfile> {
    const firebaseConfig = parseFirebaseWebAppConfig(input.firebaseConfigText ?? "", input.databaseUrl);
    const normalizedDatabaseUrl = firebaseConfig.databaseURL;
    if (!normalizedDatabaseUrl) {
      throw new Error("Storage database URL is required.");
    }

    let savedProfile: StorageProfile | null = null;
    await saveMutated((state, now) => {
      const existing = state.storageProfile;
      const accessModel = input.accessModel ?? existing?.accessModel ?? DEFAULT_FIREBASE_ACCESS_MODEL;
      requireAuthFirebaseConfig(firebaseConfig);
      savedProfile = {
        accessModel,
        profileId: existing?.profileId ?? `profile_${crypto.randomUUID()}`,
        provider: input.provider ?? "firebase-rtdb",
        displayName: input.displayName?.trim() || existing?.displayName || "Firebase Realtime Database",
        databaseUrl: normalizedDatabaseUrl,
        firebaseConfig,
        ownerSetupSecret: input.ownerSetupSecret?.trim() || existing?.ownerSetupSecret || createFirebaseOwnerSetupSecret(),
        createdAt: existing?.createdAt ?? now,
        updatedAt: now,
      };
      state.storageProfile = savedProfile;
    });

    if (!savedProfile) throw new Error("Could not save storage profile.");
    return savedProfile;
  }

  async function clearStorageProfile(): Promise<void> {
    await saveMutated((state) => {
      state.storageProfile = null;
    });
  }

  async function ensureWorkspaceManifestRoom(): Promise<RoomCapability> {
    let capability: RoomCapability | null = null;
    await saveMutated((state) => {
      requireStorageProfile(state);
      state.manifestRoom ??= createRoomCapability();
      capability = state.manifestRoom;
    });
    if (!capability) throw new Error("Could not create workspace manifest room.");
    return capability;
  }

  async function rememberWorkspaceManifestVersion(version: number): Promise<RoomCapability> {
    let capability: RoomCapability | null = null;
    await saveMutated((state) => {
      if (!state.manifestRoom) throw new Error("Workspace manifest room is not configured.");
      state.manifestRoom = {
        ...state.manifestRoom,
        lastSeenVersion: Math.max(state.manifestRoom.lastSeenVersion, version),
      };
      capability = state.manifestRoom;
    });
    if (!capability) throw new Error("Could not remember workspace manifest version.");
    return capability;
  }

  async function replaceState(nextState: WorkspaceSyncState): Promise<void> {
    await store.save(cloneState(nextState));
  }

  async function ensureOwnedAppRooms(appId: AppId): Promise<OwnedAppSyncRecord> {
    let record: OwnedAppSyncRecord | null = null;
    await saveMutated((state, now) => {
      const profile = requireStorageProfile(state);
      const existing = state.apps[appId];
      if (existing?.kind === "owned") {
        record = existing;
        return;
      }
      if (existing?.kind === "joined") {
        throw new Error("Joined apps must be made into private copies before they can become owned apps.");
      }
      if (existing?.kind === "private-copy") {
        record = {
          kind: "owned",
          appId,
          storageProfileId: existing.storageProfileId,
          sourceRoom: existing.sourceRoom,
          dataRoom: existing.dataRoom,
          shareState: "private",
          createdAt: existing.createdAt,
          updatedAt: now,
        };
        state.apps[appId] = record;
        return;
      }

      record = {
        kind: "owned",
        appId,
        storageProfileId: profile.profileId,
        sourceRoom: createRoomCapability(),
        dataRoom: createRoomCapability(),
        shareState: "private",
        createdAt: now,
        updatedAt: now,
      };
      state.apps[appId] = record;
    });

    if (!record) throw new Error("Could not create owned app sync record.");
    return record;
  }

  async function markJoinedApp(input: {
    appId: AppId;
    sourceProvider: RemoteProviderReference;
    dataProvider?: RemoteProviderReference;
    sourceRoom: RoomCapability;
    dataRoom: RoomCapability;
  }): Promise<JoinedAppSyncRecord> {
    let record: JoinedAppSyncRecord | null = null;
    await saveMutated((state, now) => {
      record = {
        kind: "joined",
        appId: input.appId,
        sourceProvider: input.sourceProvider,
        dataProvider: input.dataProvider ?? input.sourceProvider,
        sourceRoom: input.sourceRoom,
        dataRoom: input.dataRoom,
        importedAt: now,
      };
      state.apps[input.appId] = record;
    });
    if (!record) throw new Error("Could not create joined app sync record.");
    return record;
  }

  async function createInvite(appId: AppId): Promise<AppInvitePayload> {
    let invite: AppInvitePayload | null = null;
    await saveMutated((state, now) => {
      const record = state.apps[appId];
      if (!record) throw new Error("App must have sync rooms before it can be shared.");

      if (record.kind === "owned") {
        const profile = requireMatchingStorageProfile(state, record.storageProfileId);
        record.shareState = "invite-created";
        record.updatedAt = now;
        invite = toInvitePayload(record.sourceRoom, record.dataRoom, profile, now);
        return;
      }

      if (record.kind === "joined") {
        if (record.remoteDeletedAt) throw new Error("Deleted shared apps cannot be forwarded.");
        invite = toInvitePayload(record.sourceRoom, record.dataRoom, record.sourceProvider, now);
        return;
      }

      const profile = requireMatchingStorageProfile(state, record.storageProfileId);
      invite = toInvitePayload(record.sourceRoom, record.dataRoom, profile, now);
    });

    if (!invite) throw new Error("Could not create app invite.");
    return invite;
  }

  async function getInvite(appId: AppId): Promise<AppInvitePayload | null> {
    const state = await getState();
    const record = state.apps[appId];
    if (!record) return null;

    if (record.kind === "joined") {
      return toInvitePayload(record.sourceRoom, record.dataRoom, record.sourceProvider, new Date().toISOString());
    }

    const profile = state.storageProfile;
    if (!profile || profile.profileId !== record.storageProfileId) return null;
    return toInvitePayload(record.sourceRoom, record.dataRoom, profile, new Date().toISOString());
  }

  async function getAppSyncRecord(appId: AppId): Promise<AppSyncRecord | null> {
    return (await getState()).apps[appId] ?? null;
  }

  async function getAppSyncBadge(appId: AppId): Promise<AppSyncBadge> {
    return toAppSyncBadge((await getState()).apps[appId] ?? null);
  }

  async function listAppSyncBadges(appIds: AppId[]): Promise<Record<AppId, AppSyncBadge>> {
    const state = await getState();
    return Object.fromEntries(appIds.map((appId) => [appId, toAppSyncBadge(state.apps[appId] ?? null)]));
  }

  async function rememberAppRoomVersions(input: { appId: AppId; dataRoom?: RoomCapability; sourceRoom?: RoomCapability }): Promise<AppSyncRecord> {
    let record: AppSyncRecord | null = null;
    await saveMutated((state, now) => {
      const existing = state.apps[input.appId];
      if (!existing) throw new Error(`App sync record not found: ${input.appId}`);
      record = {
        ...existing,
        ...(input.sourceRoom ? { sourceRoom: input.sourceRoom } : {}),
        ...(input.dataRoom ? { dataRoom: input.dataRoom } : {}),
        ...("updatedAt" in existing ? { updatedAt: now } : {}),
      } as AppSyncRecord;
      state.apps[input.appId] = record;
    });
    if (!record) throw new Error("Could not remember app room versions.");
    return record;
  }

  async function markRemoteAppDeleted(appId: AppId, deletedAt?: string): Promise<void> {
    await saveMutated((state, now) => {
      const existing = state.apps[appId];
      if (!existing) {
        state.deletedApps[appId] = { appId, deletedAt: deletedAt ?? now, reason: "remote-owner-delete" };
        return;
      }

      if (existing.kind === "joined") {
        state.apps[appId] = {
          ...existing,
          remoteDeletedAt: deletedAt ?? now,
        };
      } else {
        delete state.apps[appId];
        state.deletedApps[appId] = { appId, deletedAt: deletedAt ?? now, reason: "remote-owner-delete" };
      }
    });
  }

  async function removeLocalAppSync(appId: AppId): Promise<void> {
    await saveMutated((state, now) => {
      delete state.apps[appId];
      state.deletedApps[appId] = { appId, deletedAt: now, reason: "local-delete" };
    });
  }

  return {
    clearStorageProfile,
    configureStorageProfile,
    createInvite,
    ensureOwnedAppRooms,
    ensureWorkspaceManifestRoom,
    getAppSyncBadge,
    getAppSyncRecord,
    getInvite,
    getState,
    getStorageProfile,
    listAppSyncBadges,
    markJoinedApp,
    markRemoteAppDeleted,
    rememberAppRoomVersions,
    rememberWorkspaceManifestVersion,
    removeLocalAppSync,
    replaceState,
  };
}

export function createMemoryWorkspaceSyncStore(initialState?: WorkspaceSyncState): WorkspaceSyncStore {
  let state: WorkspaceSyncState | null = initialState ? cloneState(initialState) : null;
  return {
    async load() {
      return state ? cloneState(state) : null;
    },
    async save(nextState) {
      state = cloneState(nextState);
    },
  };
}

export function createLocalStorageWorkspaceSyncStore(storage: Storage = localStorage, key = LOCAL_STORAGE_KEY): WorkspaceSyncStore {
  return {
    async load() {
      const raw = storage.getItem(key);
      if (!raw) return null;
      return parseWorkspaceSyncState(raw);
    },
    async save(state) {
      storage.setItem(key, JSON.stringify(state));
    },
  };
}

export function createEmptyWorkspaceSyncState(): WorkspaceSyncState {
  const now = new Date().toISOString();
  return {
    schemaVersion: WORKSPACE_SYNC_SCHEMA_VERSION,
    workspaceId: `workspace_${crypto.randomUUID()}`,
    storageProfile: null,
    manifestRoom: undefined,
    apps: {},
    deletedApps: {},
    updatedAt: now,
  };
}

export function toAppSyncBadge(record: AppSyncRecord | null): AppSyncBadge {
  if (!record) return { kind: "local-only", label: "Private", tone: "neutral" };
  if (record.kind === "joined" && record.remoteDeletedAt) return { kind: "needs-attention", label: "Deleted by owner", tone: "attention" };
  if (record.kind === "joined") return { kind: "shared-with-me", label: "Shared with me", tone: "shared" };
  if (record.kind === "private-copy") return { kind: "private-copy", label: "Private copy", tone: "good" };
  if (record.shareState === "invite-created") return { kind: "shared-by-me", label: "Shared by me", tone: "shared" };
  return { kind: "backed-up", label: "Private", tone: "neutral" };
}

function requireStorageProfile(state: WorkspaceSyncState): StorageProfile {
  if (!state.storageProfile) {
    throw new Error("Storage profile must be configured before apps can be backed up.");
  }
  return state.storageProfile;
}

function requireAuthFirebaseConfig(firebaseConfig: FirebaseWebAppConfig): void {
  if (!firebaseConfig.apiKey) {
    throw new Error("Authenticated Firebase access requires the Firebase web app config with apiKey.");
  }
}

function requireMatchingStorageProfile(state: WorkspaceSyncState, storageProfileId: string): StorageProfile {
  const profile = requireStorageProfile(state);
  if (profile.profileId !== storageProfileId) {
    throw new Error("App sync record belongs to a different storage profile.");
  }
  return profile;
}

function toInvitePayload(
  sourceRoom: RoomCapability,
  dataRoom: RoomCapability,
  provider: StorageProfile | RemoteProviderReference,
  createdAt: string,
): AppInvitePayload {
  return {
    schemaVersion: 1,
    kind: "app-lab-invite",
    provider: {
      accessModel: provider.accessModel ?? DEFAULT_FIREBASE_ACCESS_MODEL,
      provider: provider.provider,
      databaseUrl: provider.databaseUrl,
      firebaseConfig: toInviteFirebaseConfig(provider),
    },
    sourceRoom,
    dataRoom,
    createdAt,
  };
}

function toInviteFirebaseConfig(provider: StorageProfile | RemoteProviderReference): FirebaseWebAppConfig | undefined {
  if (!("firebaseConfig" in provider) || !provider.firebaseConfig) return undefined;
  const databaseURL = normalizeFirebaseDatabaseUrl(provider.firebaseConfig.databaseURL || provider.databaseUrl);
  const config: FirebaseWebAppConfig = { databaseURL };
  if (provider.firebaseConfig.apiKey) config.apiKey = provider.firebaseConfig.apiKey;
  if (provider.firebaseConfig.authDomain) config.authDomain = provider.firebaseConfig.authDomain;
  return config;
}

function parseWorkspaceSyncState(raw: string): WorkspaceSyncState | null {
  try {
    const parsed = JSON.parse(raw) as Partial<WorkspaceSyncState>;
    if (parsed.schemaVersion !== WORKSPACE_SYNC_SCHEMA_VERSION || typeof parsed.workspaceId !== "string") {
      return null;
    }
    return {
      schemaVersion: WORKSPACE_SYNC_SCHEMA_VERSION,
      workspaceId: parsed.workspaceId,
      storageProfile: normalizeStoredStorageProfile(parsed.storageProfile),
      manifestRoom: normalizeRoomCapability(parsed.manifestRoom),
      apps: parsed.apps ?? {},
      deletedApps: parsed.deletedApps ?? {},
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : new Date().toISOString(),
    };
  } catch (_) {
    return null;
  }
}

function cloneState(state: WorkspaceSyncState): WorkspaceSyncState {
  return JSON.parse(JSON.stringify(state)) as WorkspaceSyncState;
}

function normalizeStoredStorageProfile(value: unknown): StorageProfile | null {
  if (!value || typeof value !== "object") return null;
  const profile = value as Partial<StorageProfile>;
  if (
    typeof profile.profileId !== "string" ||
    profile.provider !== "firebase-rtdb" ||
    typeof profile.displayName !== "string" ||
    typeof profile.databaseUrl !== "string" ||
    typeof profile.createdAt !== "string" ||
    typeof profile.updatedAt !== "string"
  ) {
    return null;
  }

  const databaseURL = normalizeFirebaseDatabaseUrl(profile.databaseUrl);
  const accessModel = profile.accessModel === "auth-v1" ? "auth-v1" : DEFAULT_FIREBASE_ACCESS_MODEL;
  return {
    accessModel,
    profileId: profile.profileId,
    provider: profile.provider,
    displayName: profile.displayName,
    databaseUrl: databaseURL,
    firebaseConfig: profile.firebaseConfig?.databaseURL
      ? { ...profile.firebaseConfig, databaseURL: normalizeFirebaseDatabaseUrl(profile.firebaseConfig.databaseURL) }
      : { databaseURL },
    ownerSetupSecret: typeof profile.ownerSetupSecret === "string" ? profile.ownerSetupSecret : undefined,
    createdAt: profile.createdAt,
    updatedAt: profile.updatedAt,
  };
}

function normalizeRoomCapability(value: unknown): RoomCapability | undefined {
  if (!value || typeof value !== "object") return undefined;
  const capability = value as Partial<RoomCapability>;
  const readToken = typeof capability.readToken === "string" ? capability.readToken : undefined;
  const writeToken = typeof capability.writeToken === "string" ? capability.writeToken : undefined;
  const accessToken = typeof capability.accessToken === "string" ? capability.accessToken : writeToken ?? readToken;
  if (
    typeof capability.roomId !== "string" ||
    typeof capability.decryptSecret !== "string" ||
    typeof accessToken !== "string" ||
    typeof readToken !== "string" ||
    typeof writeToken !== "string" ||
    typeof capability.lastSeenVersion !== "number"
  ) {
    return undefined;
  }
  return {
    roomId: capability.roomId,
    decryptSecret: capability.decryptSecret,
    accessToken,
    readToken,
    writeToken,
    lastSeenVersion: capability.lastSeenVersion,
  };
}
