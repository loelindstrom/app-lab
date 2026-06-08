import { describe, expect, it } from "vitest";
import {
  createRoomCapability,
  decryptRoomPayload,
  decryptRoomSnapshot,
  encryptRoomPayload,
  rememberSnapshotVersion,
  toReadOnlyCapability,
} from "./crypto";

describe("sync room crypto", () => {
  it("round-trips JSON with room associated data", async () => {
    const capability = createRoomCapability();
    const encryptedPayload = await encryptRoomPayload({
      roomId: capability.roomId,
      roomType: "app-data",
      roomVersion: 1,
      decryptSecret: capability.decryptSecret,
      data: { count: 2, nested: ["ok"] },
    });

    await expect(
      decryptRoomPayload({
        roomId: capability.roomId,
        roomType: "app-data",
        roomVersion: 1,
        decryptSecret: capability.decryptSecret,
        encryptedPayload,
      }),
    ).resolves.toEqual({ count: 2, nested: ["ok"] });
  });

  it("rejects replaying one room type as another room type", async () => {
    const capability = createRoomCapability();
    const encryptedPayload = await encryptRoomPayload({
      roomId: capability.roomId,
      roomType: "app-package",
      roomVersion: 1,
      decryptSecret: capability.decryptSecret,
      data: { sourceCode: "<!doctype html>" },
    });

    await expect(
      decryptRoomPayload({
        roomId: capability.roomId,
        roomType: "app-data",
        roomVersion: 1,
        decryptSecret: capability.decryptSecret,
        encryptedPayload,
      }),
    ).rejects.toThrow();
  });

  it("rejects snapshots older than the local last seen version", async () => {
    const capability = createRoomCapability();
    const encryptedPayload = await encryptRoomPayload({
      roomId: capability.roomId,
      roomType: "app-data",
      roomVersion: 1,
      decryptSecret: capability.decryptSecret,
      data: { value: "old" },
    });
    const rememberedCapability = rememberSnapshotVersion(capability, { version: 3 });

    await expect(
      decryptRoomSnapshot({
        capability: rememberedCapability,
        roomType: "app-data",
        snapshot: {
          roomId: capability.roomId,
          version: 1,
          encryptedPayload,
          updatedAt: new Date().toISOString(),
        },
      }),
    ).rejects.toThrow(/older/);
  });

  it("removes write authority from read-only capabilities", () => {
    const capability = createRoomCapability();
    const readOnly = toReadOnlyCapability(capability);

    expect(readOnly).toMatchObject({
      roomId: capability.roomId,
      decryptSecret: capability.decryptSecret,
      readToken: capability.readToken,
      permission: "read",
    });
    expect(readOnly.writeToken).toBeUndefined();
  });
});
