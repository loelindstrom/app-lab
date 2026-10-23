import { describe, expect, it } from "vitest";
import { updateAppSourceDetails } from "./appDetails";

const SOURCE = `<!doctype html><html><head><title>Original</title><meta name="theme-color" content="#000000"></head><body><div x-data="{ text: 'hello' }"></div><script>const text = "<div>";</script></body></html>`;

describe("updateAppSourceDetails", () => {
  it("updates metadata without losing app scripts and Alpine attributes", () => {
    const source = updateAppSourceDetails(SOURCE, { name: "New <title>", themeColor: "#167d70" });
    const doc = new DOMParser().parseFromString(source, "text/html");
    expect(doc.title).toBe("New <title>");
    expect(doc.querySelector('meta[name="theme-color"]')?.getAttribute("content")).toBe("#167d70");
    expect(doc.querySelector("script")?.textContent).toBe('const text = "<div>";');
    expect(doc.querySelector("[x-data]")?.getAttribute("x-data")).toBe("{ text: 'hello' }");
  });

  it("removes the override when returning to automatic color", () => {
    const source = updateAppSourceDetails(SOURCE, { name: "Original", themeColor: null });
    expect(new DOMParser().parseFromString(source, "text/html").querySelector('meta[name="theme-color"]')).toBeNull();
  });

  it("rejects empty names and non-color values", () => {
    expect(() => updateAppSourceDetails(SOURCE, { name: "  ", themeColor: null })).toThrow("app name");
    expect(() => updateAppSourceDetails(SOURCE, { name: "Original", themeColor: "url(example.com)" })).toThrow("valid icon color");
  });
});
