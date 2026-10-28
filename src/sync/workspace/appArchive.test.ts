import { afterEach, describe, expect, it, vi } from "vitest";
import { createLocalStorageWorkspaceSyncStore, createMemoryWorkspaceSyncStore, createWorkspaceSyncRegistry, mergeAppArchiveStates, parseAppArchiveStates } from "./workspaceSync";

afterEach(() => { vi.useRealTimers(); });

describe("workspace app archive", () => {
  it("persists without a storage provider and keeps explicit unarchive history", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-10-24T12:00:00Z"));
    const key = "app-archive-test";
    const store = createLocalStorageWorkspaceSyncStore(localStorage, key);
    try {
      const registry = createWorkspaceSyncRegistry(store);
      await registry.setAppArchived("app", true);
      const archived = (await registry.getState()).appArchiveStates!;
      await registry.setAppArchived("app", false);
      const restored = await createWorkspaceSyncRegistry(store).getState();
      expect(restored.storageProfile).toBeNull();
      expect(restored.appArchiveStates?.app.archived).toBe(false);
      expect(restored.appArchiveStates!.app.updatedAt > archived.app.updatedAt).toBe(true);
      expect(mergeAppArchiveStates(restored.appArchiveStates, archived).app.archived).toBe(false);
    } finally { localStorage.removeItem(key); }
  });

  it("preserves concurrent app preferences and ignores an older state replacement", async () => {
    const registry = createWorkspaceSyncRegistry(createMemoryWorkspaceSyncStore());
    await registry.setAppArchived("first", false);
    const stale = await registry.getState();
    await Promise.all([registry.setAppArchived("first", true), registry.setAppArchived("second", true)]);
    await registry.replaceState(stale);
    expect((await registry.getState()).appArchiveStates).toMatchObject({ first: { archived: true }, second: { archived: true } });
  });

  it("accepts older manifests and rejects malformed archive preferences", () => {
    expect(parseAppArchiveStates(undefined)).toEqual({});
    expect(parseAppArchiveStates({
      invalidFlag: { archived: "yes", updatedAt: "2026-10-24T12:00:00Z" },
      invalidDate: { archived: true, updatedAt: "bad" },
      valid: { archived: false, updatedAt: "2026-10-24T12:00:00Z" },
    })).toEqual({ valid: { archived: false, updatedAt: "2026-10-24T12:00:00.000Z" } });
  });
});
