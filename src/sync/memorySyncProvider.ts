import type { CreateRoomInput, DeleteRoomInput, LoadRoomInput, RemoteRoomSnapshot, SaveRoomInput, SubscribeRoomInput, RealtimeSyncProvider } from "./types";

interface MemoryRoom {
  roomId: string;
  readToken: string;
  writeToken: string;
  version: number;
  encryptedPayload: string;
  updatedAt: string;
}

export function createMemorySyncProvider(): RealtimeSyncProvider {
  const rooms = new Map<string, MemoryRoom>();
  const subscribers = new Map<string, Set<(snapshot: RemoteRoomSnapshot) => void>>();

  async function createRoom(input: CreateRoomInput): Promise<RemoteRoomSnapshot> {
    if (rooms.has(input.roomId)) {
      throw new Error(`Room already exists: ${input.roomId}`);
    }

    const room: MemoryRoom = {
      roomId: input.roomId,
      readToken: input.readToken,
      writeToken: input.writeToken,
      version: 1,
      encryptedPayload: input.encryptedPayload,
      updatedAt: new Date().toISOString(),
    };
    rooms.set(room.roomId, room);
    return toSnapshot(room);
  }

  async function loadRoom(input: LoadRoomInput): Promise<RemoteRoomSnapshot> {
    const room = requireRoom(input.roomId);
    if (input.readToken !== room.readToken) {
      throw new Error("Read token is not authorized for this room.");
    }
    return toSnapshot(room);
  }

  async function saveRoom(input: SaveRoomInput): Promise<RemoteRoomSnapshot> {
    const room = requireRoom(input.roomId);
    if (input.writeToken !== room.writeToken) {
      throw new Error("Write token is not authorized for this room.");
    }
    if (input.expectedVersion !== room.version) {
      throw new Error(`Room version conflict. Expected ${input.expectedVersion}, found ${room.version}.`);
    }

    room.version += 1;
    room.encryptedPayload = input.encryptedPayload;
    room.updatedAt = new Date().toISOString();
    const snapshot = toSnapshot(room);
    subscribers.get(room.roomId)?.forEach((onChange) => onChange(snapshot));
    return snapshot;
  }

  async function deleteRoom(input: DeleteRoomInput): Promise<void> {
    const room = requireRoom(input.roomId);
    if (input.writeToken !== room.writeToken) {
      throw new Error("Write token is not authorized for this room.");
    }
    rooms.delete(input.roomId);
  }

  function subscribeRoom(input: SubscribeRoomInput): () => void {
    const room = requireRoom(input.roomId);
    if (input.readToken !== room.readToken) {
      throw new Error("Read token is not authorized for this room.");
    }

    let roomSubscribers = subscribers.get(input.roomId);
    if (!roomSubscribers) {
      roomSubscribers = new Set();
      subscribers.set(input.roomId, roomSubscribers);
    }

    roomSubscribers.add(input.onChange);
    return () => {
      roomSubscribers?.delete(input.onChange);
      if (roomSubscribers?.size === 0) subscribers.delete(input.roomId);
    };
  }

  function requireRoom(roomId: string): MemoryRoom {
    const room = rooms.get(roomId);
    if (!room) throw new Error(`Room not found: ${roomId}`);
    return room;
  }

  return {
    createRoom,
    deleteRoom,
    loadRoom,
    saveRoom,
    subscribeRoom,
  };
}

function toSnapshot(room: MemoryRoom): RemoteRoomSnapshot {
  return {
    roomId: room.roomId,
    version: room.version,
    encryptedPayload: room.encryptedPayload,
    updatedAt: room.updatedAt,
  };
}
