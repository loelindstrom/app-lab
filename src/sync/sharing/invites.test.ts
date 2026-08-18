import { describe, expect, it } from "vitest";
import { createRoomCapability } from "../rooms/crypto";
import { decodeAppInvite, encodeAppInvite, readInviteFromHash } from "./invites";
import type { AppInvitePayload } from "../workspace/workspaceSync";

describe("app invite encoding", () => {
  it("round-trips app invites through URL hash payloads", () => {
    const invite: AppInvitePayload = {
      createdAt: "2026-01-01T00:00:00.000Z",
      dataRoom: createRoomCapability(),
      kind: "app-lab-invite",
      provider: {
        accessModel: "auth-v1",
        databaseUrl: "https://example.firebaseio.com",
        firebaseConfig: {
          apiKey: "key",
          appId: "app-id",
          authDomain: "example.firebaseapp.com",
          databaseURL: "https://example.firebaseio.com",
          measurementId: "G-TEST",
          messagingSenderId: "123",
          projectId: "example",
          storageBucket: "example.appspot.com",
        },
        provider: "firebase-rtdb",
      },
      schemaVersion: 1,
      sourceRoom: createRoomCapability(),
    };

    const encoded = encodeAppInvite(invite);
    const decoded = decodeAppInvite(encoded);

    expect(encoded).toMatch(/^applab-invite=/);
    expect(encoded).not.toContain("%");
    expect(encoded.length).toBeLessThan(btoa(JSON.stringify(invite)).length);
    expect(decoded).toMatchObject({
      kind: "app-lab-invite",
      provider: {
        accessModel: "auth-v1",
        databaseUrl: "https://example.firebaseio.com",
        firebaseConfig: {
          apiKey: "key",
          authDomain: "example.firebaseapp.com",
          databaseURL: "https://example.firebaseio.com",
        },
      },
    });
    expect(decoded.provider.firebaseConfig).not.toHaveProperty("appId");
    expect(decoded.provider.firebaseConfig).not.toHaveProperty("measurementId");
    expect(decoded.provider.firebaseConfig).not.toHaveProperty("messagingSenderId");
    expect(decoded.provider.firebaseConfig).not.toHaveProperty("projectId");
    expect(decoded.provider.firebaseConfig).not.toHaveProperty("storageBucket");
    expect(decoded.sourceRoom).toMatchObject({
      accessToken: invite.sourceRoom.writeToken,
      decryptSecret: invite.sourceRoom.decryptSecret,
      readToken: invite.sourceRoom.readToken,
      roomId: invite.sourceRoom.roomId,
      writeToken: invite.sourceRoom.writeToken,
    });
    expect(readInviteFromHash(`#${encoded}`)?.sourceRoom.roomId).toBe(invite.sourceRoom.roomId);
  });

  it("still decodes legacy verbose invite links", () => {
    const invite: AppInvitePayload = {
      createdAt: "2026-01-01T00:00:00.000Z",
      dataRoom: createRoomCapability(),
      kind: "app-lab-invite",
      provider: {
        databaseUrl: "https://example.firebaseio.com",
        firebaseConfig: { apiKey: "key", databaseURL: "https://example.firebaseio.com" },
        provider: "firebase-rtdb",
      },
      schemaVersion: 1,
      sourceRoom: createRoomCapability(),
    };
    const legacyEncoded = `applab-invite=${encodeURIComponent(btoa(JSON.stringify(invite)))}`;

    expect(decodeAppInvite(legacyEncoded).sourceRoom.roomId).toBe(invite.sourceRoom.roomId);
  });

  it("refuses to encode auth invites without a Firebase apiKey", () => {
    const invite: AppInvitePayload = {
      createdAt: "2026-01-01T00:00:00.000Z",
      dataRoom: createRoomCapability(),
      kind: "app-lab-invite",
      provider: {
        accessModel: "auth-v1",
        databaseUrl: "https://example.firebaseio.com",
        firebaseConfig: { databaseURL: "https://example.firebaseio.com" },
        provider: "firebase-rtdb",
      },
      schemaVersion: 1,
      sourceRoom: createRoomCapability(),
    };

    expect(() => encodeAppInvite(invite)).toThrow(/apiKey/);
  });

  it("rejects invites without provider config", () => {
    const broken = btoa(JSON.stringify({ kind: "app-lab-invite", schemaVersion: 1 }));
    expect(() => decodeAppInvite(`applab-invite=${broken}`)).toThrow(/unsupported|malformed/i);
  });
});
