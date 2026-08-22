import type { BuilderConversationMemory, BuilderPreferences } from "./types";
import {
  LEGACY_GUIDED_BUILDER_PROFILE_ID,
  OPINIONATED_BUILDER_PROFILE_ID,
} from "./profiles";

const BUILDER_PREFERENCES_KEY = "app-lab-builder-preferences-v1";

interface PreferencesStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export const BUILDER_MEMORY_MESSAGE_LIMITS: Record<BuilderConversationMemory, number> = {
  long: 24,
  medium: 12,
  short: 4,
};

export const DEFAULT_BUILDER_PREFERENCES: Readonly<BuilderPreferences> = {
  activeProfileId: OPINIONATED_BUILDER_PROFILE_ID,
  conversationMemory: "short",
};

export interface BuilderPreferencesStore {
  get(): Promise<BuilderPreferences>;
  save(preferences: BuilderPreferences): Promise<BuilderPreferences>;
}

export function createBuilderPreferencesStore(storage: PreferencesStorage): BuilderPreferencesStore {
  return {
    async get() {
      try {
        const parsed = JSON.parse(storage.getItem(BUILDER_PREFERENCES_KEY) ?? "null") as unknown;
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return createDefaultPreferences();
        const stored = parsed as { activeProfileId?: unknown; conversationMemory?: unknown; version?: unknown };
        if (stored.version !== 1 || !isConversationMemory(stored.conversationMemory)) return createDefaultPreferences();
        return {
          activeProfileId: normalizeProfileId(stored.activeProfileId),
          conversationMemory: stored.conversationMemory,
        };
      } catch (_) {
        return createDefaultPreferences();
      }
    },
    async save(preferences) {
      if (!isConversationMemory(preferences.conversationMemory)) {
        throw new Error("Conversation memory is invalid.");
      }
      const activeProfileId = preferences.activeProfileId.trim();
      if (!activeProfileId) throw new Error("Active Builder profile is invalid.");
      const saved = { activeProfileId, conversationMemory: preferences.conversationMemory };
      storage.setItem(BUILDER_PREFERENCES_KEY, JSON.stringify({ ...saved, version: 1 }));
      return saved;
    },
  };
}

function createDefaultPreferences(): BuilderPreferences {
  return { ...DEFAULT_BUILDER_PREFERENCES };
}

function isConversationMemory(value: unknown): value is BuilderConversationMemory {
  return value === "short" || value === "medium" || value === "long";
}

function normalizeProfileId(value: unknown): string {
  if (value === LEGACY_GUIDED_BUILDER_PROFILE_ID) return OPINIONATED_BUILDER_PROFILE_ID;
  return typeof value === "string" && value.trim() ? value.trim() : OPINIONATED_BUILDER_PROFILE_ID;
}
