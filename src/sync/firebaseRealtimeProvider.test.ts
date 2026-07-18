import { describe, expect, it } from "vitest";
import { createRoomCapability, encryptRoomPayload } from "./crypto";
import { createFirebaseRealtimeSyncProvider, createMemoryFirebaseRealtimeDriver } from "./firebaseRealtimeProvider";

describe("firebase realtime sync provider", () => {
  it("creates and loads rooms with read-token checks", async () => {
    const provider = createFirebaseRealtimeSyncProvider({ driver: createMemoryFirebaseRealtimeDriver() });
    const capability = createRoomCapability();
    const encryptedPayload = await encryptRoomPayload({
      data: { ok: true },
      decryptSecret: capability.decryptSecret,
      roomId: capability.roomId,
      roomType: "app-data",
      roomVersion: 1,
    });

    await provider.createRoom({
      encryptedPayload,
      readToken: capability.readToken,
      roomId: capability.roomId,
      writeToken: capability.writeToken ?? "",
    });

    await expect(provider.loadRoom({ readToken: capability.readToken, roomId: capability.roomId })).resolves.toMatchObject({
      roomId: capability.roomId,
      version: 1,
    });
    await expect(provider.loadRoom({ readToken: "wrong", roomId: capability.roomId })).rejects.toThrow(/Read token/);
  });

  it("rejects writes without the room access token", async () => {
    const provider = createFirebaseRealtimeSyncProvider({ driver: createMemoryFirebaseRealtimeDriver() });
    const capability = createRoomCapability();
    const encryptedPayload = await encryptRoomPayload({
      data: { count: 1 },
      decryptSecret: capability.decryptSecret,
      roomId: capability.roomId,
      roomType: "app-data",
      roomVersion: 1,
    });
    await provider.createRoom({
      encryptedPayload,
      readToken: capability.readToken,
      roomId: capability.roomId,
      writeToken: capability.writeToken ?? "",
    });

    await expect(
      provider.saveRoom({
        encryptedPayload,
        expectedVersion: 1,
        roomId: capability.roomId,
        writeToken: "wrong",
      }),
    ).rejects.toThrow(/Write token/);
  });

  it("applies version-checked saves and notifies subscribers", async () => {
    const provider = createFirebaseRealtimeSyncProvider({ driver: createMemoryFirebaseRealtimeDriver() });
    const capability = createRoomCapability();
    const firstPayload = await encryptRoomPayload({
      data: { count: 1 },
      decryptSecret: capability.decryptSecret,
      roomId: capability.roomId,
      roomType: "app-data",
      roomVersion: 1,
    });
    await provider.createRoom({
      encryptedPayload: firstPayload,
      readToken: capability.readToken,
      roomId: capability.roomId,
      writeToken: capability.writeToken ?? "",
    });

    const seenVersions: number[] = [];
    const unsubscribe = provider.subscribeRoom({
      onChange: (snapshot) => seenVersions.push(snapshot.version),
      readToken: capability.readToken,
      roomId: capability.roomId,
    });

    const secondPayload = await encryptRoomPayload({
      data: { count: 2 },
      decryptSecret: capability.decryptSecret,
      roomId: capability.roomId,
      roomType: "app-data",
      roomVersion: 2,
    });
    await expect(
      provider.saveRoom({
        encryptedPayload: secondPayload,
        expectedVersion: 1,
        roomId: capability.roomId,
        writeToken: capability.writeToken ?? "",
      }),
    ).resolves.toMatchObject({ version: 2 });

    await expect(
      provider.saveRoom({
        encryptedPayload: secondPayload,
        expectedVersion: 1,
        roomId: capability.roomId,
        writeToken: capability.writeToken ?? "",
      }),
    ).rejects.toThrow(/version conflict/i);

    unsubscribe();
    expect(seenVersions).toEqual([2]);
  });

  it("deletes rooms only with the room access token", async () => {
    const provider = createFirebaseRealtimeSyncProvider({ driver: createMemoryFirebaseRealtimeDriver() });
    const capability = createRoomCapability();
    const encryptedPayload = await encryptRoomPayload({
      data: { count: 1 },
      decryptSecret: capability.decryptSecret,
      roomId: capability.roomId,
      roomType: "app-data",
      roomVersion: 1,
    });
    await provider.createRoom({
      encryptedPayload,
      readToken: capability.readToken,
      roomId: capability.roomId,
      writeToken: capability.writeToken ?? "",
    });

    await expect(provider.deleteRoom({ roomId: capability.roomId, writeToken: "wrong" })).rejects.toThrow(/Write token/);
    await provider.deleteRoom({ roomId: capability.roomId, writeToken: capability.writeToken ?? "" });
    await expect(provider.loadRoom({ readToken: capability.readToken, roomId: capability.roomId })).rejects.toThrow(/not found/i);
  });
});
