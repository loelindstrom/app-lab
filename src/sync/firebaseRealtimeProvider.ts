import { deleteApp, getApps, initializeApp, type FirebaseOptions } from "firebase/app";
import { get, getDatabase, onValue, ref, remove, runTransaction, type Database } from "firebase/database";
import type { FirebaseWebAppConfig } from "./firebaseConfig";
import type { CreateRoomInput, DeleteRoomInput, LoadRoomInput, RealtimeSyncProvider, RemoteRoomSnapshot, SaveRoomInput, SubscribeRoomInput } from "./types";

const ROOM_COLLECTION = "appLabSyncRooms";
const TEXT_ENCODER = new TextEncoder();

export interface FirebaseRealtimeRoomRecord {
  encryptedPayload: string;
  readTokenHash: string;
  roomId: string;
  updatedAt: string;
  version: number;
  writeTokenHash: string;
}

export interface FirebaseRealtimeDriver {
  createRoom(record: FirebaseRealtimeRoomRecord): Promise<boolean>;
  getRoom(roomId: string): Promise<FirebaseRealtimeRoomRecord | null>;
  saveRoom(input: {
    expectedVersion: number;
    nextRecord: FirebaseRealtimeRoomRecord;
    roomId: string;
  }): Promise<{ currentRecord: FirebaseRealtimeRoomRecord | null; ok: boolean }>;
  deleteRoom(input: {
    roomId: string;
    writeTokenHash: string;
  }): Promise<{ currentRecord: FirebaseRealtimeRoomRecord | null; ok: boolean }>;
  subscribeConnection(onChange: (connected: boolean) => void): () => void;
  subscribeRoom(roomId: string, onChange: (record: FirebaseRealtimeRoomRecord | null) => void): () => void;
}

export function createFirebaseRealtimeSyncProvider(input: { driver: FirebaseRealtimeDriver }): RealtimeSyncProvider {
  async function createRoom(room: CreateRoomInput): Promise<RemoteRoomSnapshot> {
    const record: FirebaseRealtimeRoomRecord = {
      encryptedPayload: room.encryptedPayload,
      readTokenHash: await hashToken(room.readToken),
      roomId: room.roomId,
      updatedAt: new Date().toISOString(),
      version: 1,
      writeTokenHash: await hashToken(room.writeToken),
    };

    const created = await input.driver.createRoom(record);
    if (!created) throw new Error(`Room already exists: ${room.roomId}`);
    return toSnapshot(record);
  }

  async function loadRoom(room: LoadRoomInput): Promise<RemoteRoomSnapshot> {
    const record = await requireAuthorizedRead(room.roomId, room.readToken);
    return toSnapshot(record);
  }

  async function saveRoom(room: SaveRoomInput): Promise<RemoteRoomSnapshot> {
    const existing = await requireRoom(room.roomId);
    if (existing.writeTokenHash !== (await hashToken(room.writeToken))) {
      throw new Error("Write token is not authorized for this room.");
    }
    if (existing.version !== room.expectedVersion) {
      throw new Error(`Room version conflict. Expected ${room.expectedVersion}, found ${existing.version}.`);
    }

    const nextRecord: FirebaseRealtimeRoomRecord = {
      ...existing,
      encryptedPayload: room.encryptedPayload,
      updatedAt: new Date().toISOString(),
      version: existing.version + 1,
    };
    const saved = await input.driver.saveRoom({
      expectedVersion: room.expectedVersion,
      nextRecord,
      roomId: room.roomId,
    });

    if (!saved.ok) {
      const foundVersion = saved.currentRecord?.version ?? "missing";
      throw new Error(`Room version conflict. Expected ${room.expectedVersion}, found ${foundVersion}.`);
    }

    return toSnapshot(saved.currentRecord ?? nextRecord);
  }

  async function deleteRoom(room: DeleteRoomInput): Promise<void> {
    const existing = await requireRoom(room.roomId);
    const writeTokenHash = await hashToken(room.writeToken);
    if (existing.writeTokenHash !== writeTokenHash) {
      throw new Error("Write token is not authorized for this room.");
    }

    const deleted = await input.driver.deleteRoom({
      roomId: room.roomId,
      writeTokenHash,
    });
    if (!deleted.ok) {
      throw new Error(`Room could not be deleted: ${room.roomId}`);
    }
  }

  function subscribeRoom(room: SubscribeRoomInput): () => void {
    let cancelled = false;
    const readTokenHashPromise = hashToken(room.readToken);

    const unsubscribe = input.driver.subscribeRoom(room.roomId, (record) => {
      if (cancelled || !record) return;
      void readTokenHashPromise.then((readTokenHash) => {
        if (cancelled || record.readTokenHash !== readTokenHash) return;
        room.onChange(toSnapshot(record));
      });
    });
    return () => {
      cancelled = true;
      unsubscribe();
    };
  }

  async function requireAuthorizedRead(roomId: string, readToken: string): Promise<FirebaseRealtimeRoomRecord> {
    const record = await requireRoom(roomId);
    if (record.readTokenHash !== (await hashToken(readToken))) {
      throw new Error("Read token is not authorized for this room.");
    }
    return record;
  }

  async function requireRoom(roomId: string): Promise<FirebaseRealtimeRoomRecord> {
    const record = await input.driver.getRoom(roomId);
    if (!record) throw new Error(`Room not found: ${roomId}`);
    return record;
  }

  return {
    createRoom,
    deleteRoom,
    loadRoom,
    saveRoom,
    subscribeConnection: input.driver.subscribeConnection,
    subscribeRoom,
  };
}

export function createFirebaseSdkRealtimeDriver(config: FirebaseWebAppConfig): FirebaseRealtimeDriver {
  const appName = `app-lab-sync-${hashString(config.databaseURL)}`;
  const existingApp = getApps().find((app) => app.name === appName);
  const app = existingApp ?? initializeApp(config as FirebaseOptions, appName);
  const database = getDatabase(app, config.databaseURL);

  return createFirebaseRealtimeDriverFromDatabase(database);
}

export function createFirebaseRealtimeDriverFromDatabase(database: Database): FirebaseRealtimeDriver {
  return {
    async createRoom(record) {
      const result = await runTransaction(roomRef(database, record.roomId), (current) => {
        if (current !== null) return;
        return record;
      });
      return result.committed;
    },
    async getRoom(roomId) {
      const snapshot = await get(roomRef(database, roomId));
      return parseRoomRecord(snapshot.val(), roomId);
    },
    async saveRoom(input) {
      let currentRecord: FirebaseRealtimeRoomRecord | null = null;
      const result = await runTransaction(roomRef(database, input.roomId), (current) => {
        const parsed = parseRoomRecord(current, input.roomId);
        currentRecord = parsed;
        if (!parsed || parsed.version !== input.expectedVersion) return;
        currentRecord = input.nextRecord;
        return input.nextRecord;
      });

      return {
        currentRecord: parseRoomRecord(result.snapshot.val(), input.roomId) ?? currentRecord,
        ok: result.committed,
      };
    },
    async deleteRoom(input) {
      const reference = roomRef(database, input.roomId);
      const snapshot = await get(reference);
      const currentRecord = parseRoomRecord(snapshot.val(), input.roomId);
      if (!currentRecord || currentRecord.writeTokenHash !== input.writeTokenHash) {
        return { currentRecord, ok: false };
      }
      await remove(reference);
      return { currentRecord: null, ok: true };
    },
    subscribeConnection(onChange) {
      return onValue(ref(database, ".info/connected"), (snapshot) => {
        onChange(snapshot.val() === true);
      });
    },
    subscribeRoom(roomId, onChange) {
      return onValue(roomRef(database, roomId), (snapshot) => {
        onChange(parseRoomRecord(snapshot.val(), roomId));
      });
    },
  };
}

export function createMemoryFirebaseRealtimeDriver(): FirebaseRealtimeDriver {
  const rooms = new Map<string, FirebaseRealtimeRoomRecord>();
  const subscribers = new Map<string, Set<(record: FirebaseRealtimeRoomRecord | null) => void>>();

  function emit(roomId: string) {
    const record = rooms.get(roomId) ?? null;
    subscribers.get(roomId)?.forEach((onChange) => onChange(record ? { ...record } : null));
  }

  return {
    async createRoom(record) {
      if (rooms.has(record.roomId)) return false;
      rooms.set(record.roomId, { ...record });
      emit(record.roomId);
      return true;
    },
    async getRoom(roomId) {
      const record = rooms.get(roomId);
      return record ? { ...record } : null;
    },
    async saveRoom(input) {
      const currentRecord = rooms.get(input.roomId) ?? null;
      if (!currentRecord || currentRecord.version !== input.expectedVersion) {
        return { currentRecord: currentRecord ? { ...currentRecord } : null, ok: false };
      }
      rooms.set(input.roomId, { ...input.nextRecord });
      emit(input.roomId);
      return { currentRecord: { ...input.nextRecord }, ok: true };
    },
    async deleteRoom(input) {
      const currentRecord = rooms.get(input.roomId) ?? null;
      if (!currentRecord || currentRecord.writeTokenHash !== input.writeTokenHash) {
        return { currentRecord: currentRecord ? { ...currentRecord } : null, ok: false };
      }
      rooms.delete(input.roomId);
      emit(input.roomId);
      return { currentRecord: null, ok: true };
    },
    subscribeConnection(onChange) {
      onChange(true);
      return () => {};
    },
    subscribeRoom(roomId, onChange) {
      let roomSubscribers = subscribers.get(roomId);
      if (!roomSubscribers) {
        roomSubscribers = new Set();
        subscribers.set(roomId, roomSubscribers);
      }
      roomSubscribers.add(onChange);
      return () => {
        roomSubscribers?.delete(onChange);
        if (roomSubscribers?.size === 0) subscribers.delete(roomId);
      };
    },
  };
}

export async function releaseFirebaseSdkAppsForTests() {
  await Promise.all(getApps().filter((app) => app.name.startsWith("app-lab-sync-")).map((app) => deleteApp(app)));
}

async function hashToken(token: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", TEXT_ENCODER.encode(token));
  return bytesToBase64Url(new Uint8Array(digest));
}

function toSnapshot(room: FirebaseRealtimeRoomRecord): RemoteRoomSnapshot {
  return {
    encryptedPayload: room.encryptedPayload,
    roomId: room.roomId,
    updatedAt: room.updatedAt,
    version: room.version,
  };
}

function roomRef(database: Database, roomId: string) {
  return ref(database, `${ROOM_COLLECTION}/${roomId}`);
}

function parseRoomRecord(value: unknown, roomId: string): FirebaseRealtimeRoomRecord | null {
  if (value === null || value === undefined) return null;
  if (!value || typeof value !== "object") throw new Error(`Firebase room is malformed: ${roomId}`);
  const record = value as Partial<FirebaseRealtimeRoomRecord>;
  if (
    record.roomId !== roomId ||
    typeof record.encryptedPayload !== "string" ||
    typeof record.readTokenHash !== "string" ||
    typeof record.updatedAt !== "string" ||
    typeof record.version !== "number" ||
    typeof record.writeTokenHash !== "string"
  ) {
    throw new Error(`Firebase room is malformed: ${roomId}`);
  }
  return {
    encryptedPayload: record.encryptedPayload,
    readTokenHash: record.readTokenHash,
    roomId: record.roomId,
    updatedAt: record.updatedAt,
    version: record.version,
    writeTokenHash: record.writeTokenHash,
  };
}

function hashString(value: string): string {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) | 0;
  }
  return Math.abs(hash).toString(36);
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
