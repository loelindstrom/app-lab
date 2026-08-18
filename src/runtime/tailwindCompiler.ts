const TAILWIND_META_SELECTOR = 'meta[name="app-lab-tailwind"][content="enabled"]';
const TAILWIND_STYLE_SELECTOR = 'style[type="text/tailwindcss"]';
const COMPILE_TIMEOUT_MS = 5000;
const OVERALL_COMPILE_TIMEOUT_MS = 8000;
const compileCache = new Map<string, Promise<CompiledAppStyles>>();
let tailwindRuntimePromise: Promise<string> | null = null;

export interface CompiledAppStyles {
  compiledCss?: string;
  compiledCssSourceHash?: string;
}

export async function compileAppStyles(sourceCode: string): Promise<CompiledAppStyles> {
  const compiledCssSourceHash = await hashSourceCode(sourceCode);

  if (!sourceUsesTailwind(sourceCode)) {
    return { compiledCss: undefined, compiledCssSourceHash: undefined };
  }
  if (isBrowserOffline()) {
    throw new Error("Tailwind CSS compilation is unavailable while offline.");
  }

  const cached = compileCache.get(compiledCssSourceHash);
  if (cached) return cached;

  const promise = withTimeout(compileTailwind(sourceCode, compiledCssSourceHash), OVERALL_COMPILE_TIMEOUT_MS, "Tailwind CSS compilation timed out.").catch((error) => {
    compileCache.delete(compiledCssSourceHash);
    throw error;
  });
  compileCache.set(compiledCssSourceHash, promise);
  return promise;
}

export function sourceUsesTailwind(sourceCode: string): boolean {
  const document = new DOMParser().parseFromString(sourceCode, "text/html");
  return Boolean(
    document.querySelector(TAILWIND_META_SELECTOR) ||
      document.documentElement.hasAttribute("data-app-lab-tailwind") ||
      document.body.hasAttribute("data-app-lab-tailwind"),
  );
}

async function compileTailwind(sourceCode: string, compiledCssSourceHash: string): Promise<CompiledAppStyles> {
  const compilerId = createCompilerId();
  const sanitizedMarkup = createSanitizedCompilerMarkup(sourceCode);
  const supplementalCandidates = extractStringClassCandidates(sourceCode);
  const tailwindCssInput = extractTailwindCssInput(sourceCode);
  const tailwindBrowserRuntime = await loadTailwindBrowserRuntime();

  const frame = document.createElement("iframe");
  frame.setAttribute("aria-hidden", "true");
  frame.setAttribute("sandbox", "allow-scripts");
  frame.tabIndex = -1;
  frame.style.cssText = "position:absolute;left:-10000px;top:-10000px;width:1px;height:1px;border:0;visibility:hidden;";

  try {
    frame.srcdoc = createCompilerDocument(compilerId, sanitizedMarkup, supplementalCandidates, tailwindCssInput, tailwindBrowserRuntime);
    document.body.appendChild(frame);
    const compiledCss = await waitForCompiledCss(frame, compilerId);
    return { compiledCss, compiledCssSourceHash };
  } finally {
    frame.remove();
  }
}

async function loadTailwindBrowserRuntime(): Promise<string> {
  tailwindRuntimePromise ??= import("@tailwindcss/browser?raw").then((module) => module.default);
  return tailwindRuntimePromise;
}

function extractTailwindCssInput(sourceCode: string): string {
  const document = new DOMParser().parseFromString(sourceCode, "text/html");
  return [...document.querySelectorAll(TAILWIND_STYLE_SELECTOR)]
    .map((style) => style.textContent ?? "")
    .join("\n");
}

export function extractClassCandidates(sourceCode: string): string[] {
  const document = new DOMParser().parseFromString(sourceCode, "text/html");
  const candidates = new Set<string>();

  collectClassCandidates(document, candidates);
  for (const template of document.querySelectorAll("template")) {
    collectClassCandidates(template.content, candidates);
  }
  collectStringClassCandidates(sourceCode, candidates);

  return [...candidates].sort();
}

function extractStringClassCandidates(sourceCode: string): string[] {
  const candidates = new Set<string>();
  collectStringClassCandidates(sourceCode, candidates);
  return [...candidates].sort();
}

function collectClassCandidates(root: ParentNode, candidates: Set<string>) {
  for (const element of root.querySelectorAll("[class]")) {
    for (const className of element.classList) {
      if (isSafeClassCandidate(className)) candidates.add(className);
    }
  }
}

function collectStringClassCandidates(sourceCode: string, candidates: Set<string>) {
  for (const match of sourceCode.matchAll(/["'`]([^"'`<>]*[-:/[\]().#%][^"'`<>]*)["'`]/g)) {
    for (const token of match[1].split(/\s+/)) {
      const candidate = token.trim().replace(/,$/, "");
      if (isLikelyTailwindCandidate(candidate)) candidates.add(candidate);
    }
  }
}

function isLikelyTailwindCandidate(candidate: string): boolean {
  if (!isSafeClassCandidate(candidate)) return false;
  return /[-:/[\]().#%]/.test(candidate);
}

function isSafeClassCandidate(candidate: string): boolean {
  if (!candidate || candidate.length > 160) return false;
  if (/[\s<>{};]/.test(candidate)) return false;
  if (candidate.startsWith("http:") || candidate.startsWith("https:") || candidate.startsWith("data:")) return false;
  if (candidate.startsWith("--")) return false;
  return true;
}

function isBrowserOffline(): boolean {
  return typeof navigator !== "undefined" && navigator.onLine === false;
}

function createCompilerDocument(
  compilerId: string,
  sanitizedMarkup: string,
  supplementalCandidates: string[],
  tailwindCssInput: string,
  tailwindBrowserRuntime: string,
): string {
  const candidateMarkup = supplementalCandidates.map((candidate) => `<div class="${escapeAttribute(candidate)}"></div>`).join("");
  const cssInput = tailwindCssInput.trim() ? tailwindCssInput : "";
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src 'none'; font-src 'none'; connect-src 'none'; media-src 'none'; object-src 'none'; frame-src 'none'; worker-src 'none'; form-action 'none'; base-uri 'none'">
    <style type="text/tailwindcss">${escapeStyleText(cssInput)}</style>
  </head>
  <body>
    ${sanitizedMarkup}
    ${candidateMarkup}
    <script>${createCompilerErrorForwarderScript(compilerId)}</script>
    <script>${tailwindBrowserRuntime.replaceAll("</script", "<\\/script")}</script>
    <script>${createCompilerResultScript(compilerId)}</script>
  </body>
</html>`;
}

function createSanitizedCompilerMarkup(sourceCode: string): string {
  const document = new DOMParser().parseFromString(sourceCode, "text/html");
  const body = document.body.cloneNode(true) as HTMLBodyElement;

  sanitizeCompilerNode(body);

  const templateContent = document.createElement("div");
  templateContent.hidden = true;
  templateContent.dataset.appLabCompilerTemplates = "";

  for (const template of body.querySelectorAll("template")) {
    const content = template.content.cloneNode(true) as DocumentFragment;
    sanitizeCompilerNode(content);
    templateContent.append(content);
  }

  body.append(templateContent);
  return body.innerHTML;
}

function sanitizeCompilerNode(root: ParentNode) {
  for (const element of [...root.querySelectorAll("script, iframe, object, embed, link, meta, base, style")]) {
    element.remove();
  }

  const elements: Element[] = [];
  if (root instanceof Element) elements.push(root);
  elements.push(...root.querySelectorAll("*"));

  for (const element of elements) {
    for (const attribute of [...element.attributes]) {
      if (attribute.name !== "class") element.removeAttribute(attribute.name);
    }
  }
}

async function waitForCompiledCss(frame: HTMLIFrameElement, compilerId: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error("Tailwind CSS compilation timed out."));
    }, COMPILE_TIMEOUT_MS);

    function cleanup() {
      window.clearTimeout(timeout);
      window.removeEventListener("message", handleMessage);
    }

    function handleMessage(event: MessageEvent) {
      if (event.source !== frame.contentWindow || !isCompilerMessage(event.data, compilerId)) return;
      cleanup();
      if (event.data.error) {
        reject(new Error(event.data.error));
        return;
      }
      resolve(event.data.css);
    }

    window.addEventListener("message", handleMessage);
  });
}

function createCompilerErrorForwarderScript(compilerId: string): string {
  return `(function () {
  const compilerId = ${JSON.stringify(compilerId)};
  function report(error) {
    parent.postMessage({
      type: "APP_LAB_TAILWIND_COMPILE_RESULT",
      compilerId,
      error: error && error.message ? error.message : String(error || "Tailwind CSS compilation failed.")
    }, "*");
  }
  window.addEventListener("error", (event) => report(event.error || event.message));
  window.addEventListener("unhandledrejection", (event) => report(event.reason));
})();`.replaceAll("</script", "<\\/script");
}

function createCompilerResultScript(compilerId: string): string {
  return `(function () {
  const compilerId = ${JSON.stringify(compilerId)};
  const startedAt = performance.now();
  function readCompiledCss() {
    const compiledStyles = Array.from(document.head.querySelectorAll("style"))
      .filter((style) => style.getAttribute("type") !== "text/tailwindcss")
      .map((style) => (style.textContent || "").trim())
      .filter(Boolean);
    if (compiledStyles.length > 0) {
      parent.postMessage({
        type: "APP_LAB_TAILWIND_COMPILE_RESULT",
        compilerId,
        css: compiledStyles.join("\\n")
      }, "*");
      return;
    }
    if (performance.now() - startedAt > ${COMPILE_TIMEOUT_MS}) {
      parent.postMessage({
        type: "APP_LAB_TAILWIND_COMPILE_RESULT",
        compilerId,
        error: "Tailwind CSS compilation timed out."
      }, "*");
      return;
    }
    setTimeout(readCompiledCss, 25);
  }
  readCompiledCss();
})();`.replaceAll("</script", "<\\/script");
}

function isCompilerMessage(value: unknown, compilerId: string): value is { compilerId: string; css: string; error?: string; type: "APP_LAB_TAILWIND_COMPILE_RESULT" } {
  if (!value || typeof value !== "object") return false;
  const message = value as { compilerId?: unknown; css?: unknown; error?: unknown; type?: unknown };
  return (
    message.type === "APP_LAB_TAILWIND_COMPILE_RESULT" &&
    message.compilerId === compilerId &&
    (typeof message.css === "string" || typeof message.error === "string")
  );
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number, message: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => reject(new Error(message)), timeoutMs);
    promise.then(
      (value) => {
        window.clearTimeout(timeout);
        resolve(value);
      },
      (error: unknown) => {
        window.clearTimeout(timeout);
        reject(error);
      },
    );
  });
}

function escapeAttribute(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function escapeStyleText(value: string): string {
  return value.replaceAll("</style", "<\\/style");
}

function createCompilerId(): string {
  return typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `compiler_${Math.random().toString(36).slice(2)}`;
}

async function hashSourceCode(sourceCode: string): Promise<string> {
  const bytes = new TextEncoder().encode(sourceCode);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}
