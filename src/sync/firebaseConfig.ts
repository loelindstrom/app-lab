export interface FirebaseWebAppConfig {
  apiKey?: string;
  appId?: string;
  authDomain?: string;
  databaseURL: string;
  measurementId?: string;
  messagingSenderId?: string;
  projectId?: string;
  storageBucket?: string;
}

export function parseFirebaseWebAppConfig(input: string, databaseUrlOverride = ""): FirebaseWebAppConfig {
  const trimmed = input.trim();
  const parsed = trimmed ? parseConfigObject(trimmed) : {};
  const databaseURL = normalizeFirebaseDatabaseUrl(databaseUrlOverride || parsed.databaseURL || "");

  if (!databaseURL) {
    throw new Error("Firebase Realtime Database URL is required.");
  }

  return {
    ...parsed,
    databaseURL,
  };
}

export function normalizeFirebaseDatabaseUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return trimmed.replace(/\/+$/, "");
}

function parseConfigObject(input: string): Partial<FirebaseWebAppConfig> {
  if (!input.trim()) return {};

  try {
    const parsed = JSON.parse(input) as unknown;
    if (!parsed || typeof parsed !== "object") throw new Error("Firebase config must be an object.");
    return pickConfigFields(parsed as Record<string, unknown>);
  } catch (_) {
    return parseConsoleSnippet(input);
  }
}

function parseConsoleSnippet(input: string): Partial<FirebaseWebAppConfig> {
  const config: Record<string, string> = {};
  const withoutComments = input.replace(/\/\/.*$/gm, "");
  const propertyPattern = /([A-Za-z_$][\w$]*)\s*:\s*(['"])(.*?)\2\s*,?/g;

  let match: RegExpExecArray | null;
  while ((match = propertyPattern.exec(withoutComments))) {
    config[match[1]] = match[3];
  }

  return pickConfigFields(config);
}

function pickConfigFields(value: Record<string, unknown>): Partial<FirebaseWebAppConfig> {
  const config: Partial<FirebaseWebAppConfig> = {};
  for (const key of ["apiKey", "appId", "authDomain", "databaseURL", "measurementId", "messagingSenderId", "projectId", "storageBucket"] as const) {
    if (typeof value[key] === "string" && value[key].trim()) {
      config[key] = key === "databaseURL" ? normalizeFirebaseDatabaseUrl(value[key]) : value[key].trim();
    }
  }
  return config;
}
