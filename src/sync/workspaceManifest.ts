import type { JsonValue } from "../core/types";
import { decryptRoomSnapshot, encryptRoomPayload, rememberSnapshotVersion, roomReadToken, roomWriteToken } from "./crypto";
import type { FirebaseWebAppConfig } from "./firebaseConfig";
import type { RealtimeSyncProvider, RoomCapability } from "./types";
import type { RemoteProviderReference, StorageProfile, WorkspaceSyncState } from "./workspaceSync";

const WORKSPACE_RECOVERY_SCHEMA_VERSION = 1;

export interface WorkspaceRecoveryMaterial {
  createdAt: string;
  kind: "app-lab-workspace-recovery";
  manifestRoom: RoomCapability;
  provider: RemoteProviderReference & {
    firebaseConfig: FirebaseWebAppConfig;
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
      databaseUrl: state.storageProfile.databaseUrl,
      firebaseConfig: state.storageProfile.firebaseConfig,
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
  const snapshot =
    capability.lastSeenVersion === 0
      ? await createOrUpdateManifestRoom(input.provider, capability, input.state)
      : await saveManifestRoom(input.provider, capability, input.state, capability.lastSeenVersion);

  return {
    ...input.state,
    manifestRoom: rememberSnapshotVersion(capability, snapshot),
    updatedAt: new Date().toISOString(),
  };
}

export async function loadWorkspaceManifest(input: {
  provider: RealtimeSyncProvider;
  recoveryMaterial: WorkspaceRecoveryMaterial;
}): Promise<WorkspaceSyncState> {
  if (input.recoveryMaterial.workspaceState) {
    return withRecoveryProviderMetadata(parseWorkspaceManifestPayload(input.recoveryMaterial.workspaceState), input.recoveryMaterial);
  }

  const snapshot = await input.provider.loadRoom({
    readToken: roomReadToken(input.recoveryMaterial.manifestRoom),
    roomId: input.recoveryMaterial.manifestRoom.roomId,
  });
  const payload = await decryptRoomSnapshot({
    capability: input.recoveryMaterial.manifestRoom,
    roomType: "workspace-manifest",
    snapshot,
  });
  const state = parseWorkspaceManifestPayload(payload);
  return withRecoveryProviderMetadata(
    {
      ...state,
      manifestRoom: rememberSnapshotVersion(input.recoveryMaterial.manifestRoom, snapshot),
    },
    input.recoveryMaterial,
  );
}

function withRecoveryProviderMetadata(state: WorkspaceSyncState, recoveryMaterial: WorkspaceRecoveryMaterial): WorkspaceSyncState {
  return {
    ...state,
    manifestRoom: state.manifestRoom ?? recoveryMaterial.manifestRoom,
    storageProfile: {
      createdAt: state.storageProfile?.createdAt ?? recoveryMaterial.createdAt,
      databaseUrl: recoveryMaterial.provider.databaseUrl,
      displayName: state.storageProfile?.displayName ?? "Firebase Realtime Database",
      firebaseConfig: recoveryMaterial.provider.firebaseConfig,
      profileId: recoveryMaterial.provider.profileId ?? state.storageProfile?.profileId ?? `profile_${crypto.randomUUID()}`,
      provider: recoveryMaterial.provider.provider,
      updatedAt: new Date().toISOString(),
    },
  };
}

async function createOrUpdateManifestRoom(provider: RealtimeSyncProvider, capability: RoomCapability, state: WorkspaceSyncState) {
  try {
    return await createManifestRoom(provider, capability, state);
  } catch (error) {
    if (!(error instanceof Error) || !/already exists/i.test(error.message)) throw error;
    const current = await provider.loadRoom({ readToken: roomReadToken(capability), roomId: capability.roomId });
    return saveManifestRoom(provider, capability, state, current.version);
  }
}

async function createManifestRoom(provider: RealtimeSyncProvider, capability: RoomCapability, state: WorkspaceSyncState) {
  return provider.createRoom({
    encryptedPayload: await encryptWorkspaceManifest(capability, state, 1),
    readToken: roomReadToken(capability),
    roomId: capability.roomId,
    writeToken: roomWriteToken(capability),
  });
}

async function saveManifestRoom(provider: RealtimeSyncProvider, capability: RoomCapability, state: WorkspaceSyncState, expectedVersion: number) {
  try {
    return await provider.saveRoom({
      encryptedPayload: await encryptWorkspaceManifest(capability, state, expectedVersion + 1),
      expectedVersion,
      roomId: capability.roomId,
      writeToken: roomWriteToken(capability),
    });
  } catch (error) {
    if (isRoomNotFoundError(error)) return createManifestRoom(provider, capability, state);
    if (!isRoomVersionConflictError(error)) throw error;
    const current = await provider.loadRoom({ readToken: roomReadToken(capability), roomId: capability.roomId });
    return provider.saveRoom({
      encryptedPayload: await encryptWorkspaceManifest(capability, state, current.version + 1),
      expectedVersion: current.version,
      roomId: capability.roomId,
      writeToken: roomWriteToken(capability),
    });
  }
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
