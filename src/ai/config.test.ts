import { describe, expect, it } from "vitest";
import { createAiConfigStore, normalizeAiConfig } from "./config";

describe("AI configuration", () => {
  it("stores a trimmed OpenRouter key and model locally", async () => {
    const storage = createMemoryStorage();
    const store = createAiConfigStore(storage);

    await expect(store.save({ apiKey: "  sk-test  ", model: "  provider/model  " })).resolves.toEqual({
      apiKey: "sk-test",
      model: "provider/model",
    });
    await expect(store.get()).resolves.toEqual({ apiKey: "sk-test", model: "provider/model" });

    await store.clear();
    await expect(store.get()).resolves.toEqual({ apiKey: "", model: "" });
  });

  it("treats malformed stored configuration as empty", async () => {
    const storage = createMemoryStorage();
    storage.setItem("app-lab-ai-config-v1", "not-json");

    await expect(createAiConfigStore(storage).get()).resolves.toEqual({ apiKey: "", model: "" });
  });

  it("treats unavailable browser storage as empty during startup", async () => {
    const storage = createMemoryStorage();
    storage.getItem = () => {
      throw new DOMException("Storage is unavailable.", "SecurityError");
    };

    await expect(createAiConfigStore(storage).get()).resolves.toEqual({ apiKey: "", model: "" });
  });

  it("requires both the API key and model id", () => {
    expect(() => normalizeAiConfig({ apiKey: "", model: "provider/model" })).toThrow("OpenRouter API key is required.");
    expect(() => normalizeAiConfig({ apiKey: "sk-test", model: "" })).toThrow("OpenRouter model id is required.");
  });
});

function createMemoryStorage(): Storage {
  const values = new Map<string, string>();
  return {
    clear: () => values.clear(),
    getItem: (key) => values.get(key) ?? null,
    key: (index) => [...values.keys()][index] ?? null,
    get length() {
      return values.size;
    },
    removeItem: (key) => {
      values.delete(key);
    },
    setItem: (key, value) => {
      values.set(key, value);
    },
  };
}
