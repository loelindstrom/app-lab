import { describe, expect, it } from "vitest";
import { createBuilderProfileStore } from "./profileStore";
import { createBuiltInBuilderProfiles, resolveActiveBuilderProfile } from "./profiles";

describe("Builder profile store", () => {
  it("keeps built-ins locked while custom profiles can be created, changed, and deleted", async () => {
    const storage = createMemoryStorage();
    const builtIns = createBuiltInBuilderProfiles("<!doctype html><title>Guided</title>");
    const store = createBuilderProfileStore(storage, {
      builtInProfiles: builtIns,
      createId: () => "custom-1",
    });

    await expect(store.list()).resolves.toEqual(builtIns);

    const created = await store.create({
      name: "  My profile  ",
      promptTemplate: "",
      starterSource: "<!doctype html><title>Custom</title>",
    });
    expect(created).toMatchObject({ builtIn: false, name: "My profile", profileId: "custom-1" });

    const updated = await store.update({
      ...created,
      name: "Changed",
      promptTemplate: "Updated prompt",
    });
    expect(updated).toMatchObject({ name: "Changed", promptTemplate: "Updated prompt" });
    await expect(store.list()).resolves.toEqual([...builtIns, updated]);

    await store.delete(created.profileId);
    await expect(store.list()).resolves.toEqual(builtIns);
  });

  it("keeps Minimal constraint-focused and adds opinionated guidance only to Guided", () => {
    const guidedStarterSource = "<!doctype html><title>Guided</title>";
    const [minimal, guided] = createBuiltInBuilderProfiles(guidedStarterSource);

    expect(minimal.promptTemplate).toContain("Runtime constraints:");
    expect(minimal.promptTemplate).toContain("Persistence and live data:");
    expect(minimal.promptTemplate).not.toContain("App Lab best practices:");
    expect(minimal.promptTemplate).not.toContain("read_current_app_source");
    expect(minimal.starterSource).toContain('name="app-lab-tailwind"');
    expect(minimal.starterSource).toContain("Alpine.data");
    expect(minimal.starterSource).toContain("AppLab.getData");
    expect(minimal.starterSource).toContain("AppLab.saveData");
    expect(minimal.starterSource).toContain("AppLab.onDataChange");

    expect(guided.promptTemplate).toContain(minimal.promptTemplate);
    expect(guided.promptTemplate).toContain("App Lab best practices:");
    expect(guided.promptTemplate).toContain("transient UI state");
    expect(guided.starterSource).toBe(guidedStarterSource);
    expect(resolveActiveBuilderProfile([minimal, guided], guided.profileId)).toBe(guided);
    expect(resolveActiveBuilderProfile([minimal, guided], "missing-profile")).toBe(minimal);
  });

  it("rejects changes to built-ins and invalid custom input", async () => {
    const builtIns = createBuiltInBuilderProfiles("<!doctype html><title>Guided</title>");
    const store = createBuilderProfileStore(createMemoryStorage(), { builtInProfiles: builtIns });

    await expect(store.delete(builtIns[0].profileId)).rejects.toThrow("cannot be deleted");
    await expect(store.update({ ...builtIns[0], name: "Changed" })).rejects.toThrow("cannot be changed");
    await expect(
      store.create({ name: "", promptTemplate: "Prompt", starterSource: "Source" }),
    ).rejects.toThrow("Profile name is required");
    await expect(
      store.create({ name: "Invalid source", promptTemplate: "Prompt", starterSource: "Source" }),
    ).rejects.toThrow("Starter app is invalid");
    await expect(
      store.create({
        name: "Unsupported form",
        promptTemplate: "Prompt",
        starterSource: "<!doctype html><html><body><form><button>Save</button></form></body></html>",
      }),
    ).rejects.toThrow("instead of forms");
  });

  it("ignores malformed and unsupported stored versions", async () => {
    const storage = createMemoryStorage();
    const builtIns = createBuiltInBuilderProfiles("<!doctype html><title>Guided</title>");
    const store = createBuilderProfileStore(storage, { builtInProfiles: builtIns });

    storage.setItem("app-lab-builder-profiles-v1", JSON.stringify({ profiles: [], version: 2 }));
    await expect(store.list()).resolves.toEqual(builtIns);

    storage.setItem("app-lab-builder-profiles-v1", "not-json");
    await expect(store.list()).resolves.toEqual(builtIns);
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
