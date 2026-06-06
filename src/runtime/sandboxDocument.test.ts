import { describe, expect, it } from "vitest";
import { prepareSandboxDocument } from "./sandboxDocument";

describe("prepareSandboxDocument", () => {
  it("injects the AppLab helper before app scripts run", () => {
    const html = prepareSandboxDocument(
      "<!doctype html><html><head><script>window.appSawHelper = Boolean(window.AppLab);</script></head><body></body></html>",
      "cap-test",
    );
    const document = new DOMParser().parseFromString(html, "text/html");
    const scripts = Array.from(document.querySelectorAll("head script")).map((script) => script.textContent || "");

    expect(scripts[0]).toContain("__APP_LAB_CAPABILITY__");
    expect(scripts[1]).toContain('Object.defineProperty(window, "AppLab"');
    expect(scripts[1]).toContain("getData");
    expect(scripts[1]).toContain("saveData");
    expect(scripts[1]).toContain("onError");
    expect(scripts[1]).toContain("APP_LAB_CONSOLE");
    expect(scripts[2]).toContain("APP_LAB_UNLOADING");
    expect(scripts[3]).toContain("window.appSawHelper");
  });

  it("removes app-supplied CSP before adding the App Lab CSP", () => {
    const html = prepareSandboxDocument(
      '<!doctype html><html><head><meta http-equiv="Content-Security-Policy" content="default-src *"></head></html>',
      "cap-test",
    );
    const document = new DOMParser().parseFromString(html, "text/html");
    const cspMetas = document.querySelectorAll('meta[http-equiv="Content-Security-Policy"]');

    expect(cspMetas).toHaveLength(1);
    expect(cspMetas[0].getAttribute("content")).toContain("connect-src 'none'");
  });
});
