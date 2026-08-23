import type { FirebaseWebAppConfig } from "../providers/firebase/firebaseConfig";
import type { RoomCapability } from "../rooms/types";
import type { AppInvitePayload } from "../workspace/workspaceSync";

const INVITE_HASH_PREFIX = "applab-invite=";

type CompactAccessModel = "a";
type CompactRoom = [roomId: string, decryptSecret: string, readToken: string] | [roomId: string, decryptSecret: string, readToken: string, writeToken: string];

interface CompactInvitePayload {
  v: 2;
  p: {
    m?: CompactAccessModel;
    u: string;
    k?: string;
    d?: string;
  };
  s: CompactRoom;
  r: CompactRoom;
}

export function encodeAppInvite(invite: AppInvitePayload): string {
  return `${INVITE_HASH_PREFIX}${base64UrlEncode(JSON.stringify(toCompactInvite(invite)))}`;
}

export function decodeAppInvite(value: string): AppInvitePayload {
  const normalized = value.trim().replace(/^#/, "");
  const encoded = normalized.startsWith(INVITE_HASH_PREFIX) ? normalized.slice(INVITE_HASH_PREFIX.length) : normalized;
  let parsed: unknown;
  try {
    parsed = JSON.parse(base64UrlDecode(encoded));
  } catch (_) {
    throw new Error("App invite is not valid.");
  }
  return parseInvitePayload(parsed);
}

export function readInviteFromHash(hash: string): AppInvitePayload | null {
  const normalized = hash.trim().replace(/^#/, "");
  if (!normalized.startsWith(INVITE_HASH_PREFIX)) return null;
  return decodeAppInvite(normalized);
}

function parseInvitePayload(value: unknown): AppInvitePayload {
  if (!isCompactInvitePayload(value)) throw new Error("App invite is unsupported.");
  return fromCompactInvite(value);
}

function toCompactInvite(invite: AppInvitePayload): CompactInvitePayload {
  const apiKey = invite.provider.firebaseConfig?.apiKey;
  if (!apiKey) throw new Error("App invite is missing Firebase apiKey.");
  return {
    v: 2,
    p: {
      m: "a",
      u: invite.provider.databaseUrl,
      k: apiKey,
      d: invite.provider.firebaseConfig?.authDomain,
    },
    r: toCompactRoom(invite.dataRoom),
    s: toCompactRoom(invite.sourceRoom),
  };
}

function fromCompactInvite(invite: CompactInvitePayload): AppInvitePayload {
  const firebaseConfig: FirebaseWebAppConfig = {
    databaseURL: invite.p.u,
  };
  if (invite.p.k) firebaseConfig.apiKey = invite.p.k;
  if (invite.p.d) firebaseConfig.authDomain = invite.p.d;
  return {
    createdAt: new Date().toISOString(),
    dataRoom: fromCompactRoom(invite.r),
    kind: "app-lab-invite",
    provider: {
      accessModel: "auth-v1",
      databaseUrl: invite.p.u,
      firebaseConfig,
      provider: "firebase-rtdb",
    },
    schemaVersion: 1,
    sourceRoom: fromCompactRoom(invite.s),
  };
}

function toCompactRoom(room: RoomCapability): CompactRoom {
  const readToken = room.readToken ?? room.accessToken;
  const writeToken = room.writeToken ?? room.accessToken;
  return readToken === writeToken ? [room.roomId, room.decryptSecret, readToken] : [room.roomId, room.decryptSecret, readToken, writeToken];
}

function fromCompactRoom(room: CompactRoom): RoomCapability {
  const [roomId, decryptSecret, readToken, explicitWriteToken] = room;
  const writeToken = explicitWriteToken ?? readToken;
  return {
    accessToken: writeToken,
    decryptSecret,
    lastSeenVersion: 0,
    readToken,
    roomId,
    writeToken,
  };
}

function isCompactInvitePayload(value: unknown): value is CompactInvitePayload {
  if (!value || typeof value !== "object") return false;
  const invite = value as Partial<CompactInvitePayload>;
  return (
    invite.v === 2 &&
    isCompactProvider(invite.p) &&
    isCompactRoom(invite.s) &&
    isCompactRoom(invite.r)
  );
}

function isCompactProvider(value: unknown): value is CompactInvitePayload["p"] {
  if (!value || typeof value !== "object") return false;
  const provider = value as Partial<CompactInvitePayload["p"]>;
  return (
    typeof provider.u === "string" &&
    (!provider.m || provider.m === "a") &&
    typeof provider.k === "string" &&
    (!provider.d || typeof provider.d === "string")
  );
}

function isCompactRoom(value: unknown): value is CompactRoom {
  return (
    Array.isArray(value) &&
    (value.length === 3 || value.length === 4) &&
    value.every((item) => typeof item === "string")
  );
}

function base64UrlEncode(value: string): string {
  return btoa(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlDecode(value: string): string {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
  return atob(padded);
}
