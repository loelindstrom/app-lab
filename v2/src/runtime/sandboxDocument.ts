const APP_CSP = [
  "default-src 'none'",
  "script-src 'unsafe-inline'",
  "style-src 'unsafe-inline'",
  "img-src data: blob:",
  "font-src data:",
  "connect-src 'none'",
  "media-src data: blob:",
  "object-src 'none'",
  "frame-src 'none'",
  "worker-src 'none'",
  "form-action 'none'",
  "base-uri 'none'",
].join("; ");

export function prepareSandboxDocument(sourceCode: string, capability: string): string {
  const document = new DOMParser().parseFromString(sourceCode, "text/html");

  for (const meta of document.querySelectorAll("meta[http-equiv]")) {
    if (meta.getAttribute("http-equiv")?.toLowerCase() === "content-security-policy") {
      meta.remove();
    }
  }

  const csp = document.createElement("meta");
  csp.setAttribute("http-equiv", "Content-Security-Policy");
  csp.setAttribute("content", APP_CSP);

  const capabilityScript = document.createElement("script");
  capabilityScript.textContent = `Object.defineProperty(window, "__APP_LAB_CAPABILITY__", {
  value: ${JSON.stringify(capability)},
  configurable: false,
  enumerable: false,
  writable: false
});`;

  document.head.prepend(csp, capabilityScript);
  return `<!doctype html>\n${document.documentElement.outerHTML}`;
}
