import type { AppInvitePayload } from "./workspaceSync";

const INVITE_HASH_PREFIX = "applab-invite=";

export function encodeAppInvite(invite: AppInvitePayload): string {
  return `${INVITE_HASH_PREFIX}${encodeURIComponent(btoa(JSON.stringify(invite)))}`;
}

export function decodeAppInvite(value: string): AppInvitePayload {
  const normalized = value.trim().replace(/^#/, "");
  const encoded = normalized.startsWith(INVITE_HASH_PREFIX) ? normalized.slice(INVITE_HASH_PREFIX.length) : normalized;
  let parsed: unknown;
  try {
    parsed = JSON.parse(atob(decodeURIComponent(encoded)));
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
  if (!value || typeof value !== "object") throw new Error("App invite is malformed.");
  const invite = value as Partial<AppInvitePayload>;
  if (
    invite.kind !== "app-lab-invite" ||
    invite.schemaVersion !== 1 ||
    !invite.provider ||
    invite.provider.provider !== "firebase-rtdb" ||
    typeof invite.provider.databaseUrl !== "string" ||
    !invite.provider.firebaseConfig?.databaseURL ||
    !invite.sourceRoom ||
    !invite.dataRoom ||
    typeof invite.createdAt !== "string"
  ) {
    throw new Error("App invite is unsupported.");
  }
  return invite as AppInvitePayload;
}
