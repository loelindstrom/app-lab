import { describe, expect, it } from "vitest";
import { createMemoryCore } from "./memoryCore";

describe("createMemoryCore", () => {
  it("lists the seeded welcome app", async () => {
    const core = createMemoryCore();
    await expect(core.listApps()).resolves.toEqual([
      expect.objectContaining({
        appId: "welcome",
        name: "Welcome",
      }),
    ]);
  });

  it("creates and reads a blank app", async () => {
    const core = createMemoryCore();
    const app = await core.createBlankApp();
    const found = await core.getApp(app.appId);

    expect(found).toEqual(app);
    expect(app.name).toBe("Untitled App");
    expect(app.sourceCode).toContain("<html");
  });
});
