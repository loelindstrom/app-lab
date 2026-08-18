import type { JsonValue } from "../core";

export type RoomType = "workspace-manifest" | "app-package" | "app-data";

export interface RoomCapability {
  roomId: string;
  decryptSecret: string;
  accessToken: string;
  /**
   * Provider compatibility tokens. New rooms use accessToken for both.
   */
  readToken: string;
  writeToken: string;
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

export interface DeleteRoomInput {
  roomId: string;
  writeToken: string;
}

export interface SubscribeRoomInput {
  roomId: string;
  readToken: string;
  onChange: (snapshot: RemoteRoomSnapshot) => void;
}

export interface ClaimRoomAccessInput {
  claimToken: string;
  roomId: string;
}

export interface SyncProvider {
  createRoom(input: CreateRoomInput): Promise<RemoteRoomSnapshot>;
  deleteRoom(input: DeleteRoomInput): Promise<void>;
  loadRoom(input: LoadRoomInput): Promise<RemoteRoomSnapshot>;
  saveRoom(input: SaveRoomInput): Promise<RemoteRoomSnapshot>;
}

export interface RealtimeSyncProvider extends SyncProvider {
  claimRoomAccess?(input: ClaimRoomAccessInput): Promise<void>;
  subscribeConnection?(onChange: (connected: boolean) => void): () => void;
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
