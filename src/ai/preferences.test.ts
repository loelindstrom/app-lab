import { describe, expect, it } from "vitest";
import { createBuilderPreferencesStore } from "./preferences";
import {
  LEGACY_GUIDED_BUILDER_PROFILE_ID,
  OPINIONATED_BUILDER_PROFILE_ID,
} from "./profiles";

describe("Builder preferences", () => {
  it("stores conversation memory independently from profiles", async () => {
    const storage = createMemoryStorage();
    const store = createBuilderPreferencesStore(storage);

    await expect(store.get()).resolves.toEqual({ activeProfileId: OPINIONATED_BUILDER_PROFILE_ID, conversationMemory: "short" });
    await expect(store.save({ activeProfileId: "custom-1", conversationMemory: "long" })).resolves.toEqual({
      activeProfileId: "custom-1",
      conversationMemory: "long",
    });
    await expect(store.get()).resolves.toEqual({ activeProfileId: "custom-1", conversationMemory: "long" });
  });

  it("adds the Opinionated profile when loading preferences saved before profile selection existed", async () => {
    const storage = createMemoryStorage();
    const store = createBuilderPreferencesStore(storage);

    storage.setItem("app-lab-builder-preferences-v1", JSON.stringify({ conversationMemory: "medium", version: 1 }));

    await expect(store.get()).resolves.toEqual({ activeProfileId: OPINIONATED_BUILDER_PROFILE_ID, conversationMemory: "medium" });

    storage.setItem(
      "app-lab-builder-preferences-v1",
      JSON.stringify({ activeProfileId: LEGACY_GUIDED_BUILDER_PROFILE_ID, conversationMemory: "medium", version: 1 }),
    );
    await expect(store.get()).resolves.toEqual({ activeProfileId: OPINIONATED_BUILDER_PROFILE_ID, conversationMemory: "medium" });
  });

  it("uses the default for malformed and unsupported stored values", async () => {
    const storage = createMemoryStorage();
    const store = createBuilderPreferencesStore(storage);

    storage.setItem("app-lab-builder-preferences-v1", JSON.stringify({ conversationMemory: "long", version: 2 }));
    await expect(store.get()).resolves.toEqual({ activeProfileId: OPINIONATED_BUILDER_PROFILE_ID, conversationMemory: "short" });

    storage.setItem("app-lab-builder-preferences-v1", "not-json");
    await expect(store.get()).resolves.toEqual({ activeProfileId: OPINIONATED_BUILDER_PROFILE_ID, conversationMemory: "short" });
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
