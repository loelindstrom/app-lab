import type { JsonValue } from "../core/types";
import { decryptRoomSnapshot, encryptRoomPayload, rememberSnapshotVersion, roomReadToken, roomWriteToken } from "./crypto";
import { DEFAULT_FIREBASE_ACCESS_MODEL } from "./firebaseAccessRules";
import type { FirebaseWebAppConfig } from "./firebaseConfig";
import type { RealtimeSyncProvider, RemoteRoomSnapshot, RoomCapability } from "./types";
import type { AppSyncRecord, JoinedAppSyncRecord, OwnedAppSyncRecord, PrivateCopySyncRecord, RemoteProviderReference, StorageProfile, TombstoneRecord, WorkspaceSyncState } from "./workspaceSync";

const WORKSPACE_RECOVERY_SCHEMA_VERSION = 1;

export interface WorkspaceRecoveryMaterial {
  createdAt: string;
  kind: "app-lab-workspace-recovery";
  manifestRoom: RoomCapability;
  provider: RemoteProviderReference & {
    firebaseConfig: FirebaseWebAppConfig;
    ownerSetupSecret?: string;
  };
  schemaVersion: typeof WORKSPACE_RECOVERY_SCHEMA_VERSION;
  workspaceState?: JsonValue;
  workspaceId: string;
}

export function createWorkspaceRecoveryMaterial(state: WorkspaceSyncState): WorkspaceRecoveryMaterial {
  if (!state.storageProfile) throw new Error("Storage profile is required before exporting recovery material.");
  if (!state.manifestRoom) throw new Error("Workspace manifest room is required before exporting recovery material.");

  return {
    createdAt: new Date().toISOString(),
    kind: "app-lab-workspace-recovery",
    manifestRoom: state.manifestRoom,
    provider: {
      accessModel: state.storageProfile.accessModel,
      databaseUrl: state.storageProfile.databaseUrl,
      firebaseConfig: state.storageProfile.firebaseConfig,
      ownerSetupSecret: state.storageProfile.ownerSetupSecret,
      profileId: state.storageProfile.profileId,
      provider: state.storageProfile.provider,
    },
    schemaVersion: WORKSPACE_RECOVERY_SCHEMA_VERSION,
    workspaceState: toWorkspaceManifestPayload(state),
    workspaceId: state.workspaceId,
  };
}

export function encodeWorkspaceRecoveryMaterial(material: WorkspaceRecoveryMaterial): string {
  return `applab-recovery:${bytesToBase64Url(new TextEncoder().encode(JSON.stringify(material)))}`;
}

export function decodeWorkspaceRecoveryMaterial(value: string): WorkspaceRecoveryMaterial {
  const encoded = value.trim().replace(/^applab-recovery:/, "");
  let parsed: unknown;
  try {
    parsed = JSON.parse(new TextDecoder().decode(base64UrlToBytes(encoded)));
  } catch (_) {
    throw new Error("Workspace recovery material is not valid.");
  }
  return parseWorkspaceRecoveryMaterial(parsed);
}

export async function saveWorkspaceManifest(input: {
  provider: RealtimeSyncProvider;
  state: WorkspaceSyncState;
}): Promise<WorkspaceSyncState> {
  const capability = requireManifestCapability(input.state);
  const saved =
    capability.lastSeenVersion === 0
      ? await createOrUpdateManifestRoom(input.provider, capability, input.state)
      : await saveManifestRoom(input.provider, capability, input.state, capability.lastSeenVersion);

  return {
    ...saved.state,
    manifestRoom: rememberSnapshotVersion(saved.state.manifestRoom ?? capability, saved.snapshot),
    updatedAt: new Date().toISOString(),
  };
}

export async function loadWorkspaceManifest(input: {
  provider: RealtimeSyncProvider;
  recoveryMaterial: WorkspaceRecoveryMaterial;
}): Promise<WorkspaceSyncState> {
  const embeddedState = input.recoveryMaterial.workspaceState
    ? withRecoveryProviderMetadata(parseWorkspaceManifestPayload(input.recoveryMaterial.workspaceState), input.recoveryMaterial)
    : null;

  let remoteState: WorkspaceSyncState | null = null;
  try {
    const snapshot = await input.provider.loadRoom({
      readToken: roomReadToken(input.recoveryMaterial.manifestRoom),
      roomId: input.recoveryMaterial.manifestRoom.roomId,
    });
    remoteState = await readWorkspaceManifestSnapshot({
      snapshot,
      state: {
        apps: {},
        deletedApps: {},
        manifestRoom: input.recoveryMaterial.manifestRoom,
        schemaVersion: WORKSPACE_RECOVERY_SCHEMA_VERSION,
        storageProfile: null,
        updatedAt: input.recoveryMaterial.createdAt,
        workspaceId: input.recoveryMaterial.workspaceId,
      },
    });
  } catch (error) {
    if (embeddedState) return embeddedState;
    throw error;
  }

  return withRecoveryProviderMetadata(embeddedState ? mergeWorkspaceManifestStates(remoteState, embeddedState) : remoteState, input.recoveryMaterial);
}

export async function loadLatestWorkspaceManifest(input: {
  provider: RealtimeSyncProvider;
  state: WorkspaceSyncState;
}): Promise<WorkspaceSyncState> {
  const capability = requireManifestCapability(input.state);
  const snapshot = await input.provider.loadRoom({
    readToken: roomReadToken(capability),
    roomId: capability.roomId,
  });
  return readWorkspaceManifestSnapshot({ snapshot, state: input.state });
}

export async function readWorkspaceManifestSnapshot(input: {
  snapshot: Awaited<ReturnType<RealtimeSyncProvider["loadRoom"]>>;
  state: WorkspaceSyncState;
}): Promise<WorkspaceSyncState> {
  const capability = requireManifestCapability(input.state);
  const payload = await decryptRoomSnapshot({
    capability,
    roomType: "workspace-manifest",
    snapshot: input.snapshot,
  });
  const state = parseWorkspaceManifestPayload(payload);
  return {
    ...state,
    manifestRoom: rememberSnapshotVersion(capability, input.snapshot),
    storageProfile: state.storageProfile ?? input.state.storageProfile,
  };
}

function withRecoveryProviderMetadata(state: WorkspaceSyncState, recoveryMaterial: WorkspaceRecoveryMaterial): WorkspaceSyncState {
  return {
    ...state,
    manifestRoom: state.manifestRoom ?? recoveryMaterial.manifestRoom,
    storageProfile: {
      accessModel: recoveryMaterial.provider.accessModel ?? state.storageProfile?.accessModel ?? DEFAULT_FIREBASE_ACCESS_MODEL,
      createdAt: state.storageProfile?.createdAt ?? recoveryMaterial.createdAt,
      databaseUrl: recoveryMaterial.provider.databaseUrl,
      displayName: state.storageProfile?.displayName ?? "Firebase Realtime Database",
      firebaseConfig: recoveryMaterial.provider.firebaseConfig,
      ownerSetupSecret: recoveryMaterial.provider.ownerSetupSecret ?? state.storageProfile?.ownerSetupSecret,
      profileId: recoveryMaterial.provider.profileId ?? state.storageProfile?.profileId ?? `profile_${crypto.randomUUID()}`,
      provider: recoveryMaterial.provider.provider,
      updatedAt: new Date().toISOString(),
    },
  };
}

interface SavedManifestRoom {
  snapshot: RemoteRoomSnapshot;
  state: WorkspaceSyncState;
}

async function createOrUpdateManifestRoom(provider: RealtimeSyncProvider, capability: RoomCapability, state: WorkspaceSyncState): Promise<SavedManifestRoom> {
  try {
    return await createManifestRoom(provider, capability, state);
  } catch (error) {
    if (!(error instanceof Error) || !/already exists/i.test(error.message)) throw error;
    const current = await provider.loadRoom({ readToken: roomReadToken(capability), roomId: capability.roomId });
    const currentState = await readWorkspaceManifestSnapshot({ snapshot: current, state });
    return saveManifestRoom(provider, capability, mergeWorkspaceManifestStates(currentState, state), current.version);
  }
}

async function createManifestRoom(provider: RealtimeSyncProvider, capability: RoomCapability, state: WorkspaceSyncState): Promise<SavedManifestRoom> {
  const snapshot = await provider.createRoom({
    encryptedPayload: await encryptWorkspaceManifest(capability, state, 1),
    readToken: roomReadToken(capability),
    roomId: capability.roomId,
    writeToken: roomWriteToken(capability),
  });
  return { snapshot, state };
}

async function saveManifestRoom(
  provider: RealtimeSyncProvider,
  capability: RoomCapability,
  state: WorkspaceSyncState,
  expectedVersion: number,
): Promise<SavedManifestRoom> {
  try {
    const snapshot = await provider.saveRoom({
      encryptedPayload: await encryptWorkspaceManifest(capability, state, expectedVersion + 1),
      expectedVersion,
      roomId: capability.roomId,
      writeToken: roomWriteToken(capability),
    });
    return { snapshot, state };
  } catch (error) {
    if (isRoomNotFoundError(error)) return createManifestRoom(provider, capability, state);
    if (!isRoomVersionConflictError(error)) throw error;
    const current = await provider.loadRoom({ readToken: roomReadToken(capability), roomId: capability.roomId });
    const currentState = await readWorkspaceManifestSnapshot({ snapshot: current, state });
    const mergedState = mergeWorkspaceManifestStates(currentState, state);
    const snapshot = await provider.saveRoom({
      encryptedPayload: await encryptWorkspaceManifest(capability, mergedState, current.version + 1),
      expectedVersion: current.version,
      roomId: capability.roomId,
      writeToken: roomWriteToken(capability),
    });
    return { snapshot, state: mergedState };
  }
}

function mergeWorkspaceManifestStates(primary: WorkspaceSyncState, secondary: WorkspaceSyncState): WorkspaceSyncState {
  if (primary.workspaceId !== secondary.workspaceId) {
    throw new Error("Workspace manifest belongs to a different workspace.");
  }

  const deletedApps = mergeTombstones(primary.deletedApps, secondary.deletedApps);
  const apps: WorkspaceSyncState["apps"] = {};

  for (const record of [...Object.values(primary.apps), ...Object.values(secondary.apps)]) {
    if (deletedApps[record.appId]) continue;
    apps[record.appId] = mergeAppSyncRecord(apps[record.appId], record);
  }

  return {
    apps,
    deletedApps,
    manifestRoom: mergeRoomCapability(primary.manifestRoom, secondary.manifestRoom),
    schemaVersion: primary.schemaVersion,
    storageProfile: primary.storageProfile ?? secondary.storageProfile,
    updatedAt: maxIsoTimestamp(primary.updatedAt, secondary.updatedAt),
    workspaceId: primary.workspaceId,
  };
}

function mergeTombstones(
  primary: WorkspaceSyncState["deletedApps"],
  secondary: WorkspaceSyncState["deletedApps"],
): WorkspaceSyncState["deletedApps"] {
  const deletedApps: WorkspaceSyncState["deletedApps"] = {};
  for (const tombstone of [...Object.values(primary), ...Object.values(secondary)]) {
    deletedApps[tombstone.appId] = mergeTombstone(deletedApps[tombstone.appId], tombstone);
  }
  return deletedApps;
}

function mergeTombstone(existing: TombstoneRecord | undefined, candidate: TombstoneRecord): TombstoneRecord {
  if (!existing) return candidate;
  if (candidate.deletedAt > existing.deletedAt) return candidate;
  if (candidate.deletedAt === existing.deletedAt && candidate.reason === "remote-owner-delete") return candidate;
  return existing;
}

function mergeAppSyncRecord(existing: AppSyncRecord | undefined, candidate: AppSyncRecord): AppSyncRecord {
  if (!existing) return candidate;
  const base = isAppSyncRecordNewer(candidate, existing) ? candidate : existing;
  const other = base === candidate ? existing : candidate;

  if (base.kind === "owned" && other.kind === "owned") return mergeOwnedAppSyncRecord(base, other);
  if (base.kind === "private-copy" && other.kind === "private-copy") return mergePrivateCopySyncRecord(base, other);
  if (base.kind === "joined" && other.kind === "joined") return mergeJoinedAppSyncRecord(base, other);
  return base;
}

function mergeOwnedAppSyncRecord(base: OwnedAppSyncRecord, other: OwnedAppSyncRecord): OwnedAppSyncRecord {
  return {
    ...base,
    dataRoom: mergeSameRoomCapability(base.dataRoom, other.dataRoom),
    shareState: base.shareState === "invite-created" || other.shareState === "invite-created" ? "invite-created" : "private",
    sourceRoom: mergeSameRoomCapability(base.sourceRoom, other.sourceRoom),
    updatedAt: maxIsoTimestamp(base.updatedAt, other.updatedAt),
  };
}

function mergePrivateCopySyncRecord(base: PrivateCopySyncRecord, other: PrivateCopySyncRecord): PrivateCopySyncRecord {
  return {
    ...base,
    dataRoom: mergeSameRoomCapability(base.dataRoom, other.dataRoom),
    sourceRoom: mergeSameRoomCapability(base.sourceRoom, other.sourceRoom),
    updatedAt: maxIsoTimestamp(base.updatedAt, other.updatedAt),
  };
}

function mergeJoinedAppSyncRecord(base: JoinedAppSyncRecord, other: JoinedAppSyncRecord): JoinedAppSyncRecord {
  return {
    ...base,
    cachedAt: maxOptionalIsoTimestamp(base.cachedAt, other.cachedAt),
    dataRoom: mergeSameRoomCapability(base.dataRoom, other.dataRoom),
    remoteDeletedAt: maxOptionalIsoTimestamp(base.remoteDeletedAt, other.remoteDeletedAt),
    sourceRoom: mergeSameRoomCapability(base.sourceRoom, other.sourceRoom),
  };
}

function isAppSyncRecordNewer(candidate: AppSyncRecord, existing: AppSyncRecord): boolean {
  const candidateVersion = maxRoomVersion(candidate);
  const existingVersion = maxRoomVersion(existing);
  if (candidateVersion !== existingVersion) return candidateVersion > existingVersion;
  return appSyncRecordTimestamp(candidate) > appSyncRecordTimestamp(existing);
}

function maxRoomVersion(record: AppSyncRecord): number {
  return Math.max(record.sourceRoom.lastSeenVersion, record.dataRoom.lastSeenVersion);
}

function appSyncRecordTimestamp(record: AppSyncRecord): string {
  if ("updatedAt" in record) return record.updatedAt;
  return maxOptionalIsoTimestamp(record.remoteDeletedAt, record.cachedAt, record.importedAt) ?? "";
}

function mergeRoomCapability(primary?: RoomCapability, secondary?: RoomCapability): RoomCapability | undefined {
  if (!primary) return secondary;
  if (!secondary) return primary;
  return mergeSameRoomCapability(primary, secondary);
}

function mergeSameRoomCapability(primary: RoomCapability, secondary: RoomCapability): RoomCapability {
  if (primary.roomId !== secondary.roomId) {
    return primary.lastSeenVersion >= secondary.lastSeenVersion ? primary : secondary;
  }
  const base = primary.lastSeenVersion >= secondary.lastSeenVersion ? primary : secondary;
  const other = base === primary ? secondary : primary;
  return {
    ...base,
    lastSeenVersion: Math.max(primary.lastSeenVersion, secondary.lastSeenVersion),
    readToken: base.readToken || other.readToken,
    writeToken: base.writeToken || other.writeToken,
    accessToken: base.accessToken || other.accessToken,
  };
}

function maxOptionalIsoTimestamp(...timestamps: Array<string | undefined>): string | undefined {
  return timestamps.filter((timestamp): timestamp is string => Boolean(timestamp)).sort().at(-1);
}

function maxIsoTimestamp(primary: string, secondary: string): string {
  return maxOptionalIsoTimestamp(primary, secondary) ?? primary;
}

function encryptWorkspaceManifest(capability: RoomCapability, state: WorkspaceSyncState, roomVersion: number) {
  return encryptRoomPayload({
    data: toWorkspaceManifestPayload(state),
    decryptSecret: capability.decryptSecret,
    roomId: capability.roomId,
    roomType: "workspace-manifest",
    roomVersion,
  });
}

function toWorkspaceManifestPayload(state: WorkspaceSyncState): JsonValue {
  return {
    apps: state.apps as unknown as JsonValue,
    deletedApps: state.deletedApps as unknown as JsonValue,
    schemaVersion: state.schemaVersion,
    storageProfile: state.storageProfile as unknown as JsonValue,
    updatedAt: state.updatedAt,
    workspaceId: state.workspaceId,
  };
}

function parseWorkspaceManifestPayload(payload: JsonValue): WorkspaceSyncState {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new Error("Workspace manifest payload is malformed.");
  }
  const record = payload as Record<string, JsonValue>;
  if (record.schemaVersion !== 1 || typeof record.workspaceId !== "string" || typeof record.updatedAt !== "string") {
    throw new Error("Workspace manifest payload is unsupported.");
  }
  return {
    apps: isRecord(record.apps) ? (record.apps as unknown as WorkspaceSyncState["apps"]) : {},
    deletedApps: isRecord(record.deletedApps) ? (record.deletedApps as unknown as WorkspaceSyncState["deletedApps"]) : {},
    schemaVersion: 1,
    storageProfile: isRecord(record.storageProfile) ? (record.storageProfile as unknown as StorageProfile) : null,
    updatedAt: record.updatedAt,
    workspaceId: record.workspaceId,
  };
}

function parseWorkspaceRecoveryMaterial(value: unknown): WorkspaceRecoveryMaterial {
  if (!isRecord(value)) throw new Error("Workspace recovery material is malformed.");
  if (
    value.kind !== "app-lab-workspace-recovery" ||
    value.schemaVersion !== WORKSPACE_RECOVERY_SCHEMA_VERSION ||
    typeof value.workspaceId !== "string" ||
    typeof value.createdAt !== "string" ||
    !isRecord(value.provider) ||
    value.provider.provider !== "firebase-rtdb" ||
    typeof value.provider.databaseUrl !== "string" ||
    !isRecord(value.provider.firebaseConfig) ||
    typeof value.provider.firebaseConfig.databaseURL !== "string" ||
    !isRecord(value.manifestRoom)
  ) {
    throw new Error("Workspace recovery material is unsupported.");
  }
  return value as unknown as WorkspaceRecoveryMaterial;
}

function requireManifestCapability(state: WorkspaceSyncState): RoomCapability {
  if (!state.manifestRoom) throw new Error("Workspace manifest room is not configured.");
  return state.manifestRoom;
}

function isRecord(value: unknown): value is Record<string, JsonValue> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function isRoomNotFoundError(error: unknown): boolean {
  return error instanceof Error && /(not found|found missing)/i.test(error.message);
}

function isRoomVersionConflictError(error: unknown): boolean {
  return error instanceof Error && /room version conflict/i.test(error.message);
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToBytes(value: string): Uint8Array {
  if (!/^[A-Za-z0-9_-]+$/.test(value)) {
    throw new Error("Value is not valid base64url.");
  }
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}
