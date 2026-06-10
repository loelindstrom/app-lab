import { describe, expect, it } from "vitest";
import { createRoomCapability } from "./crypto";
import { decodeAppInvite, encodeAppInvite, readInviteFromHash } from "./invites";
import type { AppInvitePayload } from "./workspaceSync";

describe("app invite encoding", () => {
  it("round-trips app invites through URL hash payloads", () => {
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

    const encoded = encodeAppInvite(invite);

    expect(encoded).toMatch(/^applab-invite=/);
    expect(decodeAppInvite(encoded)).toMatchObject({
      kind: "app-lab-invite",
      provider: { databaseUrl: "https://example.firebaseio.com" },
    });
    expect(readInviteFromHash(`#${encoded}`)?.sourceRoom.roomId).toBe(invite.sourceRoom.roomId);
  });

  it("rejects invites without provider config", () => {
    const broken = btoa(JSON.stringify({ kind: "app-lab-invite", schemaVersion: 1 }));
    expect(() => decodeAppInvite(`applab-invite=${broken}`)).toThrow(/unsupported|malformed/i);
  });
});
