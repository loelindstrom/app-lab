import type { BuilderConversationMemory, BuilderPreferences } from "./types";

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
        const stored = parsed as { conversationMemory?: unknown; version?: unknown };
        if (stored.version !== 1 || !isConversationMemory(stored.conversationMemory)) return createDefaultPreferences();
        return { conversationMemory: stored.conversationMemory };
      } catch (_) {
        return createDefaultPreferences();
      }
    },
    async save(preferences) {
      if (!isConversationMemory(preferences.conversationMemory)) {
        throw new Error("Conversation memory is invalid.");
      }
      const saved = { conversationMemory: preferences.conversationMemory };
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
