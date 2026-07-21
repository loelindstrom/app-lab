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
    expect(scripts[1]).toContain("onDataChange");
    expect(scripts[1]).toContain("onError");
    expect(scripts[1]).toContain("APP_LAB_DATA_CHANGED");
    expect(scripts[1]).toContain("APP_LAB_DATA_HANDLER_STATUS");
    expect(scripts[1]).toContain("APP_LAB_CONSOLE");
    expect(scripts[1]).toContain("toJsonValue");
    expect(scripts[2]).toContain("window.Alpine");
    expect(scripts[2]).not.toContain("queueMicrotask(() => {\n    src_default.start();");
    expect(scripts[3]).toContain("APP_LAB_UNLOADING");
    expect(scripts[4]).toContain("window.appSawHelper");
    expect(document.body.lastElementChild?.textContent).toContain("window.Alpine.start");
  });

  it("injects Alpine before generated app scripts and starts it after body parsing", () => {
    const html = prepareSandboxDocument(
      '<!doctype html><html><head><script>window.appSawAlpine = Boolean(window.Alpine);</script></head><body><div x-data="{ ready: true }" x-text="ready"></div></body></html>',
      "cap-test",
    );
    const document = new DOMParser().parseFromString(html, "text/html");
    const headScripts = Array.from(document.querySelectorAll("head script")).map((script) => script.textContent || "");
    const bodyScripts = Array.from(document.querySelectorAll("body script")).map((script) => script.textContent || "");

    expect(headScripts[2]).toContain("window.Alpine");
    expect(headScripts[4]).toContain("window.appSawAlpine");
    expect(bodyScripts.at(-1)).toContain("window.Alpine.start");
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
    expect(cspMetas[0].getAttribute("content")).toContain("script-src 'unsafe-inline' 'unsafe-eval'");
  });

  it("can prepare a stricter vanilla sandbox without Alpine", () => {
    const html = prepareSandboxDocument("<!doctype html><html><head></head><body></body></html>", "cap-test", undefined, {
      runtimeMode: "vanilla",
    });
    const document = new DOMParser().parseFromString(html, "text/html");
    const csp = document.querySelector('meta[http-equiv="Content-Security-Policy"]')?.getAttribute("content");

    expect(csp).toContain("script-src 'unsafe-inline'");
    expect(csp).not.toContain("'unsafe-eval'");
    expect(document.querySelector('script[data-app-lab-runtime="alpine"]')).toBeNull();
    expect(document.querySelector('script[data-app-lab-runtime="alpine-start"]')).toBeNull();
  });

  it("injects host-compiled CSS before app-authored content when provided", () => {
    const html = prepareSandboxDocument(
      "<!doctype html><html><head><style>body { color: red; }</style></head><body></body></html>",
      "cap-test",
      ".bg-slate-950 { background: #020617; }",
    );
    const document = new DOMParser().parseFromString(html, "text/html");
    const styles = Array.from(document.querySelectorAll("head style"));

    expect((styles[0] as HTMLStyleElement).dataset.appLabRuntime).toBe("compiled-css");
    expect(styles[0].textContent).toContain("bg-slate-950");
    expect(styles[1].textContent).toContain("color: red");
  });
});
