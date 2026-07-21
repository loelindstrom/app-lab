import type { AppRecord, JsonValue } from "../core/types";
import { decryptRoomSnapshot, encryptRoomPayload, rememberSnapshotVersion, roomReadToken, roomWriteToken } from "./crypto";
import type { AppSyncRecord, OwnedAppSyncRecord, PrivateCopySyncRecord } from "./workspaceSync";
import type { RealtimeSyncProvider, RoomCapability, RoomType } from "./types";

export type AppPackageRoomPayload = ActiveAppPackageRoomPayload | DeletedAppPackageRoomPayload;

export interface ActiveAppPackageRoomPayload {
  app: {
    appId: string;
    compiledCss?: string;
    compiledCssSourceHash?: string;
    createdAt: string;
    description: string;
    name: string;
    sourceCode: string;
    updatedAt: string;
  };
  schemaVersion: 1;
}

export interface DeletedAppPackageRoomPayload {
  appId: string;
  deleted: true;
  deletedAt: string;
  name?: string;
  schemaVersion: 1;
}

export class RemoteAppDeletedError extends Error {
  constructor(
    readonly appId: string,
    readonly deletedAt: string,
  ) {
    super("Remote app was deleted by its owner.");
  }
}

export async function ensureRemoteAppRooms(input: {
  app: AppRecord;
  appData: JsonValue;
  provider: RealtimeSyncProvider;
  syncRecord: OwnedAppSyncRecord | PrivateCopySyncRecord;
}): Promise<void> {
  const sourcePayload: AppPackageRoomPayload = {
    app: {
      appId: input.app.appId,
      compiledCss: input.app.compiledCss,
      compiledCssSourceHash: input.app.compiledCssSourceHash,
      createdAt: input.app.createdAt,
      description: input.app.description,
      name: input.app.name,
      sourceCode: input.app.sourceCode,
      updatedAt: input.app.updatedAt,
    },
    schemaVersion: 1,
  };

  await ensureRemoteRoom({
    capability: input.syncRecord.sourceRoom,
    data: sourcePayload as unknown as JsonValue,
    provider: input.provider,
    roomType: "app-package",
  });
  await ensureRemoteRoom({
    capability: input.syncRecord.dataRoom,
    data: input.appData,
    provider: input.provider,
    roomType: "app-data",
  });
}

export async function saveRemoteAppSource(input: {
  app: AppRecord;
  provider: RealtimeSyncProvider;
  syncRecord: AppSyncRecord;
}): Promise<RoomCapability> {
  const sourcePayload: AppPackageRoomPayload = {
    app: {
      appId: input.app.appId,
      compiledCss: input.app.compiledCss,
      compiledCssSourceHash: input.app.compiledCssSourceHash,
      createdAt: input.app.createdAt,
      description: input.app.description,
      name: input.app.name,
      sourceCode: input.app.sourceCode,
      updatedAt: input.app.updatedAt,
    },
    schemaVersion: 1,
  };
  return saveRemoteRoom({
    capability: input.syncRecord.sourceRoom,
    data: sourcePayload as unknown as JsonValue,
    provider: input.provider,
    recreateIfMissing: input.syncRecord.kind !== "joined",
    roomType: "app-package",
  });
}

export async function saveRemoteAppData(input: {
  appData: JsonValue;
  provider: RealtimeSyncProvider;
  syncRecord: OwnedAppSyncRecord | PrivateCopySyncRecord | Extract<AppSyncRecord, { kind: "joined" }>;
}): Promise<RoomCapability> {
  return saveRemoteRoom({
    capability: input.syncRecord.dataRoom,
    data: input.appData,
    provider: input.provider,
    recreateIfMissing: input.syncRecord.kind !== "joined",
    roomType: "app-data",
  });
}

export interface LoadedRemoteAppRooms {
  app: AppRecord;
  appData: JsonValue;
  dataRoom: RoomCapability;
  sourceRoom: RoomCapability;
}

export interface LoadedRemoteAppSource {
  app: AppRecord;
  sourceRoom: RoomCapability;
}

export async function loadRemoteAppSource(input: {
  provider: RealtimeSyncProvider;
  syncRecord: AppSyncRecord;
}): Promise<LoadedRemoteAppSource> {
  const sourceSnapshot = await input.provider.loadRoom({
    readToken: roomReadToken(input.syncRecord.sourceRoom),
    roomId: input.syncRecord.sourceRoom.roomId,
  });
  const sourcePayload = await decryptRoomSnapshot({
    capability: input.syncRecord.sourceRoom,
    roomType: "app-package",
    snapshot: sourceSnapshot,
  });

  return {
    app: parseAppPackagePayload(sourcePayload),
    sourceRoom: rememberSnapshotVersion(input.syncRecord.sourceRoom, sourceSnapshot),
  };
}

export async function loadRemoteAppRooms(input: {
  provider: RealtimeSyncProvider;
  syncRecord: AppSyncRecord;
}): Promise<LoadedRemoteAppRooms> {
  const source = await loadRemoteAppSource(input);

  const dataSnapshot = await input.provider.loadRoom({
    readToken: roomReadToken(input.syncRecord.dataRoom),
    roomId: input.syncRecord.dataRoom.roomId,
  });
  const dataPayload = await decryptRoomSnapshot({
    capability: input.syncRecord.dataRoom,
    roomType: "app-data",
    snapshot: dataSnapshot,
  });

  return {
    app: source.app,
    appData: dataPayload,
    dataRoom: rememberSnapshotVersion(input.syncRecord.dataRoom, dataSnapshot),
    sourceRoom: source.sourceRoom,
  };
}

export async function deleteRemoteAppRooms(input: {
  app?: AppRecord;
  dataProvider: RealtimeSyncProvider;
  sourceProvider: RealtimeSyncProvider;
  syncRecord: AppSyncRecord;
}): Promise<void> {
  if (input.app) {
    await markRemoteAppDeleted({
      app: input.app,
      provider: input.sourceProvider,
      syncRecord: input.syncRecord,
    });
  } else {
    await deleteRemoteRoom(input.sourceProvider, input.syncRecord.sourceRoom);
  }
  await deleteRemoteRoom(input.dataProvider, input.syncRecord.dataRoom);
}

export async function markRemoteAppDeleted(input: {
  app: AppRecord;
  provider: RealtimeSyncProvider;
  syncRecord: AppSyncRecord;
}): Promise<RoomCapability> {
  const deletedPayload: DeletedAppPackageRoomPayload = {
    appId: input.app.appId,
    deleted: true,
    deletedAt: new Date().toISOString(),
    name: input.app.name,
    schemaVersion: 1,
  };
  return saveRemoteRoom({
    capability: input.syncRecord.sourceRoom,
    data: deletedPayload as unknown as JsonValue,
    provider: input.provider,
    recreateIfMissing: true,
    roomType: "app-package",
  });
}

async function ensureRemoteRoom(input: {
  capability: RoomCapability;
  data: JsonValue;
  provider: RealtimeSyncProvider;
  roomType: RoomType;
}) {
  const encryptedPayload = await encryptRoomPayload({
    data: input.data,
    decryptSecret: input.capability.decryptSecret,
    roomId: input.capability.roomId,
    roomType: input.roomType,
    roomVersion: 1,
  });

  try {
    await input.provider.createRoom({
      encryptedPayload,
      readToken: roomReadToken(input.capability),
      roomId: input.capability.roomId,
      writeToken: roomWriteToken(input.capability),
    });
  } catch (error) {
    if (!isRoomAlreadyExistsError(error)) throw error;
    await input.provider.loadRoom({
      readToken: roomReadToken(input.capability),
      roomId: input.capability.roomId,
    });
  }
}

async function deleteRemoteRoom(provider: RealtimeSyncProvider, capability: RoomCapability): Promise<void> {
  try {
    await provider.deleteRoom({
      roomId: capability.roomId,
      writeToken: roomWriteToken(capability),
    });
  } catch (error) {
    if (!isRoomNotFoundError(error)) throw error;
  }
}

async function saveRemoteRoom(input: {
  capability: RoomCapability;
  data: JsonValue;
  provider: RealtimeSyncProvider;
  recreateIfMissing?: boolean;
  roomType: RoomType;
}): Promise<RoomCapability> {
  let expectedVersion = input.capability.lastSeenVersion;
  if (expectedVersion === 0) {
    try {
      const snapshot = await input.provider.loadRoom({
        readToken: roomReadToken(input.capability),
        roomId: input.capability.roomId,
      });
      expectedVersion = snapshot.version;
    } catch (error) {
      if (!isRoomNotFoundError(error)) throw error;
      await ensureRemoteRoom(input);
      const snapshot = await input.provider.loadRoom({
        readToken: roomReadToken(input.capability),
        roomId: input.capability.roomId,
      });
      return rememberExactSnapshotVersion(input.capability, snapshot);
    }
  }

  const encryptedPayload = await encryptRoomPayload({
    data: input.data,
    decryptSecret: input.capability.decryptSecret,
    roomId: input.capability.roomId,
    roomType: input.roomType,
    roomVersion: expectedVersion + 1,
  });
  let snapshot;
  try {
    snapshot = await input.provider.saveRoom({
      encryptedPayload,
      expectedVersion,
      roomId: input.capability.roomId,
      writeToken: roomWriteToken(input.capability),
    });
  } catch (error) {
    if (!input.recreateIfMissing || !isRoomNotFoundError(error)) throw error;
    await ensureRemoteRoom(input);
    snapshot = await input.provider.loadRoom({
      readToken: roomReadToken(input.capability),
      roomId: input.capability.roomId,
    });
    return rememberExactSnapshotVersion(input.capability, snapshot);
  }
  return rememberSnapshotVersion(input.capability, snapshot);
}

function rememberExactSnapshotVersion(capability: RoomCapability, snapshot: { version: number }): RoomCapability {
  return {
    ...capability,
    lastSeenVersion: snapshot.version,
  };
}

function parseAppPackagePayload(payload: JsonValue): AppRecord {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new Error("App package payload is malformed.");
  }
  const record = payload as Record<string, JsonValue>;
  if (record.deleted === true) {
    throw new RemoteAppDeletedError(
      typeof record.appId === "string" ? record.appId : "unknown",
      typeof record.deletedAt === "string" ? record.deletedAt : new Date().toISOString(),
    );
  }
  const app = record.app;
  if (!app || typeof app !== "object" || Array.isArray(app)) {
    throw new Error("App package is missing app metadata.");
  }
  const appRecord = app as Record<string, JsonValue>;
  if (
    typeof appRecord.appId !== "string" ||
    typeof appRecord.description !== "string" ||
    typeof appRecord.name !== "string" ||
    typeof appRecord.sourceCode !== "string" ||
    typeof appRecord.updatedAt !== "string"
  ) {
    throw new Error("App package app metadata is unsupported.");
  }
  return {
    appId: appRecord.appId,
    compiledCss: typeof appRecord.compiledCss === "string" ? appRecord.compiledCss : undefined,
    compiledCssSourceHash: typeof appRecord.compiledCssSourceHash === "string" ? appRecord.compiledCssSourceHash : undefined,
    createdAt: typeof appRecord.createdAt === "string" ? appRecord.createdAt : appRecord.updatedAt,
    description: appRecord.description,
    name: appRecord.name,
    sourceCode: appRecord.sourceCode,
    updatedAt: appRecord.updatedAt,
  };
}

function isRoomAlreadyExistsError(error: unknown): boolean {
  return error instanceof Error && /already exists/i.test(error.message);
}

function isRoomNotFoundError(error: unknown): boolean {
  return error instanceof Error && /(not found|found missing)/i.test(error.message);
}

export function isRemoteAppDeletedError(error: unknown): error is RemoteAppDeletedError {
  return error instanceof RemoteAppDeletedError;
}
