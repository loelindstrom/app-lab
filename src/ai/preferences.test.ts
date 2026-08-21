import { describe, expect, it } from "vitest";
import { createBuilderPreferencesStore } from "./preferences";

describe("Builder preferences", () => {
  it("stores conversation memory independently from profiles", async () => {
    const storage = createMemoryStorage();
    const store = createBuilderPreferencesStore(storage);

    await expect(store.get()).resolves.toEqual({ conversationMemory: "short" });
    await expect(store.save({ conversationMemory: "long" })).resolves.toEqual({ conversationMemory: "long" });
    await expect(store.get()).resolves.toEqual({ conversationMemory: "long" });
  });

  it("uses the default for malformed and unsupported stored values", async () => {
    const storage = createMemoryStorage();
    const store = createBuilderPreferencesStore(storage);

    storage.setItem("app-lab-builder-preferences-v1", JSON.stringify({ conversationMemory: "long", version: 2 }));
    await expect(store.get()).resolves.toEqual({ conversationMemory: "short" });

    storage.setItem("app-lab-builder-preferences-v1", "not-json");
    await expect(store.get()).resolves.toEqual({ conversationMemory: "short" });
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
    removeItem: (key) => values.delete(key),
    setItem: (key, value) => values.set(key, value),
  };
}
