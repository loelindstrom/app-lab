import type { AiConfig } from "./types";

const AI_CONFIG_KEY = "app-lab-ai-config-v1";

interface ConfigStorage {
  getItem(key: string): string | null;
  removeItem(key: string): void;
  setItem(key: string, value: string): void;
}

export interface AiConfigStore {
  clear(): Promise<void>;
  get(): Promise<AiConfig>;
  save(config: AiConfig): Promise<AiConfig>;
}

export function createAiConfigStore(storage: ConfigStorage): AiConfigStore {
  return {
    async clear() {
      storage.removeItem(AI_CONFIG_KEY);
    },
    async get() {
      try {
        const raw = storage.getItem(AI_CONFIG_KEY);
        if (!raw) return emptyAiConfig();
        return normalizeStoredConfig(JSON.parse(raw));
      } catch (_) {
        return emptyAiConfig();
      }
    },
    async save(config) {
      const normalized = normalizeAiConfig(config);
      storage.setItem(AI_CONFIG_KEY, JSON.stringify(normalized));
      return normalized;
    },
  };
}

export function normalizeAiConfig(config: AiConfig): AiConfig {
  const normalized = {
    apiKey: config.apiKey.trim(),
    model: config.model.trim(),
  };
  if (!normalized.apiKey) throw new Error("OpenRouter API key is required.");
  if (!normalized.model) throw new Error("OpenRouter model id is required.");
  return normalized;
}

function normalizeStoredConfig(value: unknown): AiConfig {
  if (!value || typeof value !== "object") return emptyAiConfig();
  const candidate = value as Partial<AiConfig>;
  return {
    apiKey: typeof candidate.apiKey === "string" ? candidate.apiKey.trim() : "",
    model: typeof candidate.model === "string" ? candidate.model.trim() : "",
  };
}

function emptyAiConfig(): AiConfig {
  return { apiKey: "", model: "" };
}
