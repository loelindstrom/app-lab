import { afterEach, describe, expect, it, vi } from "vitest";
import { compileAppStyles, extractClassCandidates, sourceUsesTailwind } from "./tailwindCompiler";

describe("tailwindCompiler", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("requires an explicit App Lab Tailwind marker", () => {
    expect(sourceUsesTailwind('<!doctype html><html><head><meta name="app-lab-tailwind" content="enabled"></head></html>')).toBe(true);
    expect(sourceUsesTailwind('<!doctype html><html><body class="bg-slate-950"></body></html>')).toBe(false);
  });

  it("fails fast when Tailwind compilation is requested offline", async () => {
    vi.spyOn(window.navigator, "onLine", "get").mockReturnValue(false);

    await expect(
      compileAppStyles('<!doctype html><html><head><meta name="app-lab-tailwind" content="enabled"></head><body class="p-4"></body></html>'),
    ).rejects.toThrow(/offline/i);
  });

  it("extracts literal Tailwind class candidates from markup and strings", () => {
    const candidates = extractClassCandidates(`
      <main class="relative grid min-h-screen bg-slate-950 text-white hover:bg-violet-500"></main>
      <script>const cls = "rounded-full px-4";</script>
    `);

    expect(candidates).toContain("relative");
    expect(candidates).toContain("grid");
    expect(candidates).toContain("min-h-screen");
    expect(candidates).toContain("bg-slate-950");
    expect(candidates).toContain("text-white");
    expect(candidates).toContain("hover:bg-violet-500");
    expect(candidates).toContain("rounded-full");
    expect(candidates).toContain("px-4");
  });

});
