import { describe, expect, it } from "vitest";
import { createRoomCapability, encryptRoomPayload } from "./crypto";
import { createMemorySyncProvider } from "./memorySyncProvider";

describe("memory sync provider", () => {
  it("loads and saves only with the room access token", async () => {
    const provider = createMemorySyncProvider();
    const capability = createRoomCapability();
    const encryptedPayload = await encryptRoomPayload({
      roomId: capability.roomId,
      roomType: "app-data",
      roomVersion: 1,
      decryptSecret: capability.decryptSecret,
      data: { count: 1 },
    });

    await provider.createRoom({
      roomId: capability.roomId,
      readToken: capability.readToken,
      writeToken: capability.writeToken ?? "",
      encryptedPayload,
    });

    await expect(provider.loadRoom({ roomId: capability.roomId, readToken: capability.readToken })).resolves.toMatchObject({
      roomId: capability.roomId,
      version: 1,
    });

    await expect(
      provider.saveRoom({
        roomId: capability.roomId,
        writeToken: "wrong",
        expectedVersion: 1,
        encryptedPayload,
      }),
    ).rejects.toThrow(/Write token/);
  });

  it("applies version-checked saves", async () => {
    const provider = createMemorySyncProvider();
    const capability = createRoomCapability();
    const firstPayload = await encryptRoomPayload({
      roomId: capability.roomId,
      roomType: "app-data",
      roomVersion: 1,
      decryptSecret: capability.decryptSecret,
      data: { count: 1 },
    });

    await provider.createRoom({
      roomId: capability.roomId,
      readToken: capability.readToken,
      writeToken: capability.writeToken ?? "",
      encryptedPayload: firstPayload,
    });

    const secondPayload = await encryptRoomPayload({
      roomId: capability.roomId,
      roomType: "app-data",
      roomVersion: 2,
      decryptSecret: capability.decryptSecret,
      data: { count: 2 },
    });

    await expect(
      provider.saveRoom({
        roomId: capability.roomId,
        writeToken: capability.writeToken ?? "",
        expectedVersion: 1,
        encryptedPayload: secondPayload,
      }),
    ).resolves.toMatchObject({ version: 2 });

    await expect(
      provider.saveRoom({
        roomId: capability.roomId,
        writeToken: capability.writeToken ?? "",
        expectedVersion: 1,
        encryptedPayload: secondPayload,
      }),
    ).rejects.toThrow(/version conflict/i);
  });

  it("notifies subscribers after successful saves", async () => {
    const provider = createMemorySyncProvider();
    const capability = createRoomCapability();
    const firstPayload = await encryptRoomPayload({
      roomId: capability.roomId,
      roomType: "app-data",
      roomVersion: 1,
      decryptSecret: capability.decryptSecret,
      data: { count: 1 },
    });
    await provider.createRoom({
      roomId: capability.roomId,
      readToken: capability.readToken,
      writeToken: capability.writeToken ?? "",
      encryptedPayload: firstPayload,
    });

    const seenVersions: number[] = [];
    const unsubscribe = provider.subscribeRoom({
      roomId: capability.roomId,
      readToken: capability.readToken,
      onChange: (snapshot) => seenVersions.push(snapshot.version),
    });

    const secondPayload = await encryptRoomPayload({
      roomId: capability.roomId,
      roomType: "app-data",
      roomVersion: 2,
      decryptSecret: capability.decryptSecret,
      data: { count: 2 },
    });
    await provider.saveRoom({
      roomId: capability.roomId,
      writeToken: capability.writeToken ?? "",
      expectedVersion: 1,
      encryptedPayload: secondPayload,
    });
    unsubscribe();

    expect(seenVersions).toEqual([2]);
  });

  it("deletes rooms only with the room access token", async () => {
    const provider = createMemorySyncProvider();
    const capability = createRoomCapability();
    const encryptedPayload = await encryptRoomPayload({
      roomId: capability.roomId,
      roomType: "app-data",
      roomVersion: 1,
      decryptSecret: capability.decryptSecret,
      data: { count: 1 },
    });
    await provider.createRoom({
      roomId: capability.roomId,
      readToken: capability.readToken,
      writeToken: capability.writeToken ?? "",
      encryptedPayload,
    });

    await expect(provider.deleteRoom({ roomId: capability.roomId, writeToken: "wrong" })).rejects.toThrow(/Write token/);
    await provider.deleteRoom({ roomId: capability.roomId, writeToken: capability.writeToken ?? "" });
    await expect(provider.loadRoom({ roomId: capability.roomId, readToken: capability.readToken })).rejects.toThrow(/not found/i);
  });
});
