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
    expect(app.sourceCode).toContain("GET_MY_DATA");
    expect(app.sourceCode).toContain("SAVE_MY_DATA");
    expect(app.sourceCode).toContain("Persisted counter");
  });

  it("saves app-owned JSON data", async () => {
    const core = createMemoryCore();
    const app = await core.createBlankApp();

    await core.saveAppData(app.appId, { note: "hello" });

    await expect(core.getAppData(app.appId)).resolves.toEqual({ note: "hello" });
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
