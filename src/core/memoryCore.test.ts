import { describe, expect, it } from "vitest";
import { normalizeJsonValue } from "./jsonData";
import { createMemoryCore } from "./memoryCore";

describe("createMemoryCore", () => {
  it("starts without seeded apps", async () => {
    const core = createMemoryCore();
    await expect(core.listApps()).resolves.toEqual([]);
  });

  it("creates and reads an example app", async () => {
    const core = createMemoryCore();
    const app = await core.createBlankApp();
    const found = await core.getApp(app.appId);

    expect(found).toEqual(app);
    expect(app.name).toBe("Example App");
    expect(app.sourceCode).toContain("<html");
    expect(app.sourceCode).toContain("AppLab.getData");
    expect(app.sourceCode).toContain("AppLab.saveData");
    expect(app.sourceCode).toContain("AppLab.onDataChange");
    expect(app.sourceCode).toContain("crypto.randomUUID");
    expect(app.sourceCode).toContain("Persisted records with stable IDs");
  });

  it("saves app-owned JSON data", async () => {
    const core = createMemoryCore();
    const app = await core.createBlankApp();

    await core.saveAppData(app.appId, { note: "hello" });

    await expect(core.getAppData(app.appId)).resolves.toEqual({ note: "hello" });
  });

  it("upserts restored app records with their original app id", async () => {
    const core = createMemoryCore();
    await core.upsertApp({
      appId: "restored-app",
      createdAt: "2026-01-01T00:00:00.000Z",
      description: "Restored",
      name: "Restored App",
      sourceCode: "<!doctype html><title>Restored</title>",
      updatedAt: "2026-01-02T00:00:00.000Z",
    });

    await expect(core.getApp("restored-app")).resolves.toMatchObject({
      appId: "restored-app",
      name: "Restored App",
    });
  });

  it("deletes apps and their app-owned data", async () => {
    const core = createMemoryCore();
    const app = await core.createBlankApp();

    await core.saveAppData(app.appId, { note: "hello" });
    await core.deleteApp(app.appId);

    await expect(core.getApp(app.appId)).resolves.toBeNull();
    await expect(core.getAppData(app.appId)).resolves.toBeNull();
    await expect(core.listApps()).resolves.toEqual([]);
  });
});

describe("normalizeJsonValue", () => {
  it("normalizes structured-clone-only values through JSON", () => {
    expect(normalizeJsonValue({ map: new Map(), list: [undefined, 1] })).toEqual({
      map: {},
      list: [null, 1],
    });
  });
});
