import type { JsonValue } from "../core/types";

export type RoomType = "workspace-manifest" | "app-package" | "app-data";

export type RoomPermission = "read" | "write";

export interface RoomCapability {
  roomId: string;
  decryptSecret: string;
  readToken: string;
  writeToken?: string;
  permission: RoomPermission;
  lastSeenVersion: number;
}

export interface RemoteRoomSnapshot {
  roomId: string;
  version: number;
  encryptedPayload: string;
  updatedAt: string;
}

export interface CreateRoomInput {
  roomId: string;
  readToken: string;
  writeToken: string;
  encryptedPayload: string;
}

export interface LoadRoomInput {
  roomId: string;
  readToken: string;
}

export interface SaveRoomInput {
  roomId: string;
  writeToken: string;
  expectedVersion: number;
  encryptedPayload: string;
}

export interface SubscribeRoomInput {
  roomId: string;
  readToken: string;
  onChange: (snapshot: RemoteRoomSnapshot) => void;
}

export interface SyncProvider {
  createRoom(input: CreateRoomInput): Promise<RemoteRoomSnapshot>;
  loadRoom(input: LoadRoomInput): Promise<RemoteRoomSnapshot>;
  saveRoom(input: SaveRoomInput): Promise<RemoteRoomSnapshot>;
}

export interface RealtimeSyncProvider extends SyncProvider {
  subscribeRoom(input: SubscribeRoomInput): () => void;
}

export interface EncryptRoomPayloadInput {
  roomId: string;
  roomType: RoomType;
  roomVersion: number;
  decryptSecret: string;
  data: JsonValue;
}

export interface DecryptRoomPayloadInput {
  roomId: string;
  roomType: RoomType;
  roomVersion: number;
  decryptSecret: string;
  encryptedPayload: string;
}

export interface DecryptRoomSnapshotInput {
  capability: RoomCapability;
  roomType: RoomType;
  snapshot: RemoteRoomSnapshot;
}
