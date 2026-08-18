import { normalizeJsonValue } from "../jsonData";
import type { JsonValue } from "../core";
import type { DecryptRoomPayloadInput, DecryptRoomSnapshotInput, EncryptRoomPayloadInput, RoomCapability } from "./types";

const ENCRYPTED_ROOM_SCHEMA_VERSION = 1;
const ROOM_KEY_BYTES = 32;
const ROOM_ID_BYTES = 16;
const ROOM_TOKEN_BYTES = 32;
const AES_GCM_IV_BYTES = 12;

interface EncryptedRoomEnvelope {
  schemaVersion: typeof ENCRYPTED_ROOM_SCHEMA_VERSION;
  algorithm: "AES-GCM";
  iv: string;
  ciphertext: string;
}

export function createRoomCapability(): RoomCapability {
  const accessToken = `room_access_${randomBase64Url(ROOM_TOKEN_BYTES)}`;
  return {
    roomId: `room_${randomBase64Url(ROOM_ID_BYTES)}`,
    decryptSecret: randomBase64Url(ROOM_KEY_BYTES),
    accessToken,
    readToken: accessToken,
    writeToken: accessToken,
    lastSeenVersion: 0,
  };
}

export function roomReadToken(capability: RoomCapability): string {
  return capability.readToken ?? capability.accessToken;
}

export function roomWriteToken(capability: RoomCapability): string {
  return capability.writeToken ?? capability.accessToken;
}

export async function encryptRoomPayload(input: EncryptRoomPayloadInput): Promise<string> {
  const key = await importAesKey(input.decryptSecret);
  const iv = crypto.getRandomValues(new Uint8Array(AES_GCM_IV_BYTES));
  const plaintext = new TextEncoder().encode(JSON.stringify(normalizeJsonValue(input.data)));
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv, additionalData: associatedData(input) },
    key,
    plaintext,
  );
  const envelope: EncryptedRoomEnvelope = {
    schemaVersion: ENCRYPTED_ROOM_SCHEMA_VERSION,
    algorithm: "AES-GCM",
    iv: bytesToBase64Url(iv),
    ciphertext: bytesToBase64Url(new Uint8Array(ciphertext)),
  };
  return JSON.stringify(envelope);
}

export async function decryptRoomPayload(input: DecryptRoomPayloadInput): Promise<JsonValue> {
  const envelope = parseEnvelope(input.encryptedPayload);
  const key = await importAesKey(input.decryptSecret);
  const plaintext = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: base64UrlToBytes(envelope.iv),
      additionalData: associatedData(input),
    },
    key,
    base64UrlToBytes(envelope.ciphertext),
  );
  return normalizeJsonValue(JSON.parse(new TextDecoder().decode(plaintext)));
}

export async function decryptRoomSnapshot(input: DecryptRoomSnapshotInput): Promise<JsonValue> {
  const { capability, snapshot } = input;
  if (snapshot.roomId !== capability.roomId) {
    throw new Error("Snapshot room does not match capability.");
  }
  if (snapshot.version < capability.lastSeenVersion) {
    throw new Error("Remote room snapshot is older than the last seen version.");
  }
  return decryptRoomPayload({
    roomId: snapshot.roomId,
    roomType: input.roomType,
    roomVersion: snapshot.version,
    decryptSecret: capability.decryptSecret,
    encryptedPayload: snapshot.encryptedPayload,
  });
}

export function rememberSnapshotVersion(capability: RoomCapability, snapshot: { version: number }): RoomCapability {
  return {
    ...capability,
    lastSeenVersion: Math.max(capability.lastSeenVersion, snapshot.version),
  };
}

function associatedData(input: { roomId: string; roomType: string; roomVersion: number }): Uint8Array {
  return new TextEncoder().encode(
    JSON.stringify({
      schemaVersion: ENCRYPTED_ROOM_SCHEMA_VERSION,
      roomId: input.roomId,
      roomType: input.roomType,
      roomVersion: input.roomVersion,
    }),
  );
}

async function importAesKey(secret: string): Promise<CryptoKey> {
  const bytes = base64UrlToBytes(secret);
  if (bytes.byteLength !== ROOM_KEY_BYTES) {
    throw new Error("Room decrypt secret must be a 256-bit base64url key.");
  }
  return crypto.subtle.importKey("raw", bytes, "AES-GCM", false, ["encrypt", "decrypt"]);
}

function parseEnvelope(value: string): EncryptedRoomEnvelope {
  let parsed: unknown;
  try {
    parsed = JSON.parse(value);
  } catch (_) {
    throw new Error("Encrypted room payload is not valid JSON.");
  }

  if (
    !parsed ||
    typeof parsed !== "object" ||
    (parsed as Partial<EncryptedRoomEnvelope>).schemaVersion !== ENCRYPTED_ROOM_SCHEMA_VERSION ||
    (parsed as Partial<EncryptedRoomEnvelope>).algorithm !== "AES-GCM" ||
    typeof (parsed as Partial<EncryptedRoomEnvelope>).iv !== "string" ||
    typeof (parsed as Partial<EncryptedRoomEnvelope>).ciphertext !== "string"
  ) {
    throw new Error("Encrypted room payload has an unsupported shape.");
  }

  return parsed as EncryptedRoomEnvelope;
}

function randomBase64Url(byteLength: number): string {
  return bytesToBase64Url(crypto.getRandomValues(new Uint8Array(byteLength)));
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToBytes(value: string): Uint8Array {
  if (!/^[A-Za-z0-9_-]+$/.test(value)) {
    throw new Error("Value is not valid base64url.");
  }
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}
