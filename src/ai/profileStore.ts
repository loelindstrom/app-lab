import type { BuilderProfile, BuilderProfileInput, UpdateBuilderProfileInput } from "./types";
import { validateBuilderSource } from "./sourceValidation";

const BUILDER_PROFILES_KEY = "app-lab-builder-profiles-v1";

interface ProfileStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

interface CreateBuilderProfileStoreOptions {
  builtInProfiles: BuilderProfile[];
  createId?: () => string;
}

export interface BuilderProfileStore {
  create(input: BuilderProfileInput): Promise<BuilderProfile>;
  delete(profileId: string): Promise<void>;
  list(): Promise<BuilderProfile[]>;
  update(input: UpdateBuilderProfileInput): Promise<BuilderProfile>;
}

export function createBuilderProfileStore(
  storage: ProfileStorage,
  options: CreateBuilderProfileStoreOptions,
): BuilderProfileStore {
  const builtInProfiles = options.builtInProfiles.map((profile) => ({ ...profile, builtIn: true }));
  const builtInIds = new Set(builtInProfiles.map((profile) => profile.profileId));
  const createId = options.createId ?? (() => crypto.randomUUID());

  return {
    async create(input) {
      const customProfiles = readCustomProfiles(storage, builtInIds);
      let profileId = createId();
      while (builtInIds.has(profileId) || customProfiles.some((profile) => profile.profileId === profileId)) {
        profileId = createId();
      }
      const profile = normalizeInput(input, profileId);
      writeCustomProfiles(storage, [...customProfiles, profile]);
      return profile;
    },
    async delete(profileId) {
      if (builtInIds.has(profileId)) throw new Error("Built-in Builder profiles cannot be deleted.");
      const customProfiles = readCustomProfiles(storage, builtInIds);
      writeCustomProfiles(storage, customProfiles.filter((profile) => profile.profileId !== profileId));
    },
    async list() {
      return [...builtInProfiles.map((profile) => ({ ...profile })), ...readCustomProfiles(storage, builtInIds)];
    },
    async update(input) {
      if (builtInIds.has(input.profileId)) throw new Error("Built-in Builder profiles cannot be changed.");
      const customProfiles = readCustomProfiles(storage, builtInIds);
      const profileIndex = customProfiles.findIndex((profile) => profile.profileId === input.profileId);
      if (profileIndex < 0) throw new Error("Builder profile not found.");
      const updated = normalizeInput(input, input.profileId);
      customProfiles[profileIndex] = updated;
      writeCustomProfiles(storage, customProfiles);
      return updated;
    },
  };
}

function normalizeInput(input: BuilderProfileInput, profileId: string): BuilderProfile {
  const name = input.name.trim();
  if (!name) throw new Error("Profile name is required.");
  assertValidStarterSource(input.starterSource);
  return {
    builtIn: false,
    name,
    profileId,
    promptTemplate: input.promptTemplate,
    starterSource: input.starterSource,
  };
}

function readCustomProfiles(storage: ProfileStorage, builtInIds: Set<string>): BuilderProfile[] {
  try {
    const parsed = JSON.parse(storage.getItem(BUILDER_PROFILES_KEY) ?? "null") as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return [];
    const stored = parsed as { profiles?: unknown; version?: unknown };
    if (stored.version !== 1) return [];
    const profiles = stored.profiles;
    if (!Array.isArray(profiles)) return [];
    const seen = new Set<string>();
    return profiles.flatMap((value) => {
      const profile = parseStoredProfile(value);
      if (!profile || builtInIds.has(profile.profileId) || seen.has(profile.profileId)) return [];
      seen.add(profile.profileId);
      return [profile];
    });
  } catch (_) {
    return [];
  }
}

function parseStoredProfile(value: unknown): BuilderProfile | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const profile = value as Partial<BuilderProfile>;
  if (
    typeof profile.profileId !== "string" ||
    !profile.profileId ||
    typeof profile.name !== "string" ||
    !profile.name.trim() ||
    typeof profile.promptTemplate !== "string" ||
    typeof profile.starterSource !== "string" ||
    !profile.starterSource.trim()
  ) {
    return null;
  }
  return {
    builtIn: false,
    name: profile.name.trim(),
    profileId: profile.profileId,
    promptTemplate: profile.promptTemplate,
    starterSource: profile.starterSource,
  };
}

function assertValidStarterSource(starterSource: string): void {
  if (!starterSource.trim()) throw new Error("Starter app is required.");
  const failure = validateBuilderSource(starterSource);
  if (failure) throw new Error(`Starter app is invalid: ${failure.message}`);
}

function writeCustomProfiles(storage: ProfileStorage, profiles: BuilderProfile[]): void {
  storage.setItem(BUILDER_PROFILES_KEY, JSON.stringify({ profiles, version: 1 }));
}
