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
  const sanitizedMarkup = createSanitizedCompilerMarkup(sourceCode);
  const supplementalCandidates = extractStringClassCandidates(sourceCode);
  const tailwindCssInput = extractTailwindCssInput(sourceCode);
  const tailwindBrowserRuntime = await loadTailwindBrowserRuntime();

  const frame = document.createElement("iframe");
  frame.setAttribute("aria-hidden", "true");
  frame.tabIndex = -1;
  frame.style.cssText = "position:absolute;left:-10000px;top:-10000px;width:1px;height:1px;border:0;visibility:hidden;";

  try {
    frame.srcdoc = createCompilerDocument(sanitizedMarkup, supplementalCandidates, tailwindCssInput, tailwindBrowserRuntime);
    document.body.appendChild(frame);
    const compiledCss = await waitForCompiledCss(frame);
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

function createCompilerDocument(sanitizedMarkup: string, supplementalCandidates: string[], tailwindCssInput: string, tailwindBrowserRuntime: string): string {
  const candidateMarkup = supplementalCandidates.map((candidate) => `<div class="${escapeAttribute(candidate)}"></div>`).join("");
  const cssInput = tailwindCssInput.trim() ? tailwindCssInput : "";
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <style type="text/tailwindcss">${escapeStyleText(cssInput)}</style>
  </head>
  <body>
    ${sanitizedMarkup}
    ${candidateMarkup}
    <script>${tailwindBrowserRuntime.replaceAll("</script", "<\\/script")}</script>
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

async function waitForCompiledCss(frame: HTMLIFrameElement): Promise<string> {
  const startedAt = performance.now();

  while (performance.now() - startedAt < COMPILE_TIMEOUT_MS) {
    const document = frame.contentDocument;
    const compiledStyles = document
      ? [...document.head.querySelectorAll("style")]
          .filter((style) => style.getAttribute("type") !== "text/tailwindcss")
          .map((style) => style.textContent?.trim() ?? "")
          .filter(Boolean)
      : [];

    if (compiledStyles.length > 0) {
      return compiledStyles.join("\n");
    }

    await delay(25);
  }

  throw new Error("Tailwind CSS compilation timed out.");
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
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

async function hashSourceCode(sourceCode: string): Promise<string> {
  const bytes = new TextEncoder().encode(sourceCode);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}
