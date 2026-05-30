import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { createReadStream, existsSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import { spawn } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";

const root = resolve(import.meta.dirname, "..");
const port = 8123;
const cdpPort = 9222;
const baseUrl = `http://127.0.0.1:${port}/`;
const mimeTypes = new Map([
  [".css", "text/css"],
  [".html", "text/html"],
  [".ico", "image/x-icon"],
  [".js", "text/javascript"],
  [".json", "application/json"],
  [".png", "image/png"],
]);

let nextId = 1;

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function findChrome() {
  const candidates = [
    process.env.CHROME_BIN,
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ].filter(Boolean);

  return candidates.find((candidate) => existsSync(candidate));
}

function startServer() {
  const server = createServer(async (request, response) => {
    const url = new URL(request.url || "/", baseUrl);
    const pathname = url.pathname === "/" ? "/index.html" : url.pathname;
    const filePath = resolve(join(root, pathname));

    if (!filePath.startsWith(root)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    try {
      await readFile(filePath);
      response.writeHead(200, {
        "Cache-Control": "no-store",
        "Content-Type": mimeTypes.get(extname(filePath)) || "application/octet-stream",
      });
      createReadStream(filePath).pipe(response);
    } catch {
      response.writeHead(404);
      response.end("Not found");
    }
  });

  return new Promise((resolveServer, reject) => {
    server.once("error", reject);
    server.listen(port, "127.0.0.1", () => resolveServer(server));
  });
}

async function startChrome() {
  const chromePath = findChrome();
  assert(chromePath, "Chrome/Chromium was not found. Set CHROME_BIN to run smoke tests.");

  const profileDir = await mkdtemp(join(tmpdir(), "app-lab-smoke-"));
  const chrome = spawn(chromePath, [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    `--user-data-dir=${profileDir}`,
    "--remote-debugging-address=127.0.0.1",
    `--remote-debugging-port=${cdpPort}`,
    "about:blank",
  ], {
    stdio: ["ignore", "ignore", "pipe"],
  });

  chrome.stderr.on("data", () => {});
  await waitFor(async () => {
    try {
      const response = await fetch(`http://127.0.0.1:${cdpPort}/json/version`);
      return response.ok;
    } catch {
      return false;
    }
  }, "Chrome DevTools endpoint");

  return {
    chrome,
    profileDir,
    async close() {
      chrome.kill("SIGTERM");
      await new Promise((resolveClose) => chrome.once("exit", resolveClose));
      await rm(profileDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    },
  };
}

async function createPage() {
  const response = await fetch(`http://127.0.0.1:${cdpPort}/json/new?${encodeURIComponent("about:blank")}`, {
    method: "PUT",
  });
  assert(response.ok, `Could not create Chrome target: ${response.status}`);
  const target = await response.json();
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  const pending = new Map();
  const contexts = new Map();

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);

    if (message.method === "Runtime.executionContextCreated") {
      const context = message.params.context;
      const frameId = context.auxData?.frameId;
      if (frameId) contexts.set(frameId, context.id);
    }

    if (!message.id) return;
    const callbacks = pending.get(message.id);
    if (!callbacks) return;
    pending.delete(message.id);
    if (message.error) {
      callbacks.reject(new Error(message.error.message));
    } else {
      callbacks.resolve(message.result);
    }
  });

  await new Promise((resolveOpen, reject) => {
    socket.addEventListener("open", resolveOpen, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });

  function send(method, params = {}) {
    const id = nextId += 1;
    socket.send(JSON.stringify({ id, method, params }));
    return new Promise((resolveSend, reject) => pending.set(id, { resolve: resolveSend, reject }));
  }

  await send("Page.enable");
  await send("Runtime.enable");

  return {
    contexts,
    send,
    close: () => socket.close(),
  };
}

async function evaluate(page, expression, contextId = undefined) {
  const result = await page.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    contextId,
    returnByValue: true,
  });
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
  }
  return result.result.value;
}

async function waitFor(callback, label, timeout = 8000) {
  const started = Date.now();
  while (Date.now() - started < timeout) {
    if (await callback()) return;
    await new Promise((resolveWait) => setTimeout(resolveWait, 100));
  }
  throw new Error(`Timed out waiting for ${label}`);
}

async function waitForTitle(page, title) {
  await waitFor(
    () => evaluate(page, `document.querySelector("#active-app-title")?.textContent === ${JSON.stringify(title)}`),
    `title ${title}`,
  );
}

async function smoke() {
  const page = await createPage();
  try {
    await page.send("Emulation.setDeviceMetricsOverride", {
      width: 390,
      height: 844,
      deviceScaleFactor: 1,
      mobile: true,
    });
    await page.send("Page.navigate", { url: `${baseUrl}?test=1` });
    await waitForTitle(page, "Home");

    const homeMetrics = await evaluate(page, `(() => {
      const bar = document.querySelector("#mobile-builder-bar");
      return {
        shellClass: document.querySelector(".host-shell").className,
        barDisplay: getComputedStyle(bar).display,
        scrollHeight: document.documentElement.scrollHeight,
        height: window.innerHeight
      };
    })()`);
    assert(homeMetrics.shellClass.includes("is-home"), "Home shell class was not set");
    assert(homeMetrics.barDisplay === "none", "Mobile builder bar should be hidden on home");
    assert(homeMetrics.scrollHeight === homeMetrics.height, "Home should not reserve a bottom strip");

    const homeApps = await evaluate(page, `(window.__appLabTest?.listApps?.() || listApps()).then((apps) => apps.map((app) => app.name))`);
    assert(homeApps.includes("Notes"), "App registry should include Notes");
    assert(!homeApps.includes("Sandbox Check"), "App registry should not include Sandbox Check");
    await evaluate(page, `(window.__appLabTest?.handleMessage || handleMessage)({
      source: document.querySelector("#app-sandbox").contentWindow,
      data: { type: "NAVIGATE_APP", payload: { appId: "notes" } }
    })`);
    await waitForTitle(page, "Notes");

    const appMetrics = await evaluate(page, `(() => {
      const bar = document.querySelector("#mobile-builder-bar");
      return {
        shellClass: document.querySelector(".host-shell").className,
        barDisplay: getComputedStyle(bar).display,
        barHeight: Math.round(bar.getBoundingClientRect().height),
        iframeHeight: Math.round(document.querySelector("#app-sandbox").getBoundingClientRect().height)
      };
    })()`);
    assert(appMetrics.shellClass.includes("is-app"), "App shell class was not set");
    assert(appMetrics.barDisplay === "flex", "Mobile builder bar should be visible in an app");
    assert(appMetrics.barHeight === 36, "Mobile builder bar should keep a constant height");
    assert(appMetrics.iframeHeight > 500, "App iframe should remain visible");

    await evaluate(page, `(window.__appLabTest?.handleMessage || handleMessage)({
      source: document.querySelector("#app-sandbox").contentWindow,
      data: { type: "SAVE_MY_DATA", requestId: "save-smoke", payload: { data: { text: "Smoke test note" } } }
    })`);
    const savedData = await evaluate(page, `(window.__appLabTest?.getActiveAppData?.() || getActiveAppData())`);
    assert(savedData.text === "Smoke test note", "Notes data should save through the RPC path");

    await evaluate(page, `document.querySelector("#mobile-builder-toggle").click()`);
    await waitFor(
      () => evaluate(page, `!document.querySelector("#builder-panel").hidden`),
      "mobile builder open",
    );
    const builderOpenMetrics = await evaluate(page, `(() => {
      const bar = document.querySelector("#mobile-builder-bar");
      const panel = document.querySelector("#builder-panel");
      return {
        toggleText: document.querySelector("#mobile-builder-toggle").textContent,
        gapPanelToBar: Math.round(bar.getBoundingClientRect().top - panel.getBoundingClientRect().bottom),
        panelPosition: getComputedStyle(panel).position
      };
    })()`);
    assert(builderOpenMetrics.toggleText === "BuilderAI ↓", "Mobile builder arrow should flip while open");
    assert(Math.abs(builderOpenMetrics.gapPanelToBar) <= 2, "Builder panel should sit against the mobile bar");
    assert(builderOpenMetrics.panelPosition === "static", "Mobile builder panel should stay in document flow");

    await evaluate(page, `(() => {
      window.__appLabFetch = window.fetch;
      window.fetch = async (url) => {
        if (String(url).includes("/models")) throw new Error("mock model failure");
        return window.__appLabFetch(url);
      };
      document.querySelector("#mobile-builder-toggle").click();
      document.querySelector("#system-home").click();
      document.querySelector("#system-home").click();
      document.querySelector("#side-menu-settings").click();
    })()`);
    await waitFor(
      () => evaluate(page, `document.querySelector("#settings-dialog").open`),
      "settings dialog open",
    );
    await waitFor(
      () => evaluate(page, `document.querySelector("#models-status").textContent.includes("Could not load models")`),
      "settings model failure state",
    );

    await page.send("Emulation.setDeviceMetricsOverride", {
      width: 1280,
      height: 800,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await evaluate(page, `document.querySelector("#settings-dialog").close();
      document.querySelector("#side-menu").hidden = true;
      window.fetch = window.__appLabFetch;
      document.querySelector("#new-app").click();`);
    await waitFor(
      () => evaluate(page, `document.querySelector("#active-app-title")?.textContent === "Untitled App"`),
      "new app load",
    );
    const newAppMetrics = await evaluate(page, `(() => ({
      title: document.querySelector("#active-app-title").textContent,
      builderOpen: !document.querySelector("#builder-panel").hidden,
      desktopBarDisplay: getComputedStyle(document.querySelector("#mobile-builder-bar")).display,
      panelPosition: getComputedStyle(document.querySelector("#builder-panel")).position,
      messages: [...document.querySelectorAll("#builder-messages .builder-message")].map((item) => item.textContent)
    }))()`);
    assert(newAppMetrics.title === "Untitled App", "New App should load the created app");
    assert(newAppMetrics.builderOpen, "New App should open BuilderAI");
    assert(newAppMetrics.desktopBarDisplay === "none", "Desktop should not display mobile builder bar");
    assert(newAppMetrics.panelPosition === "fixed", "Desktop builder should be a fixed drawer");
    assert(newAppMetrics.messages.some((message) => message.includes("Blank app created")), "Blank app system message missing");

    await evaluate(page, `(() => {
      (window.__appLabTest?.setBuilderBusy || setBuilderBusy)(true);
      (window.__appLabTest?.updateBuilderActivity || updateBuilderActivity)("Reading current app...");
      const live = (window.__appLabTest?.addBuilderMessage || addBuilderMessage)("assistant", "");
      live.dataset.streaming = "true";
      live.textContent = "Streaming final reply";
      (window.__appLabTest?.updateBuilderActivity || updateBuilderActivity)("Writing response...");
    })()`);
    const streamMetrics = await evaluate(page, `(() => {
      const progress = document.querySelector(".builder-progress");
      const live = document.querySelector('.builder-message[data-streaming="true"]');
      return {
        progressText: progress?.innerText,
        loaderDots: progress?.querySelectorAll(".builder-loader span").length,
        liveText: live?.textContent,
        liveBeforeProgress: live?.nextElementSibling === progress
      };
    })()`);
    assert(streamMetrics.progressText.includes("Reading current app"), "Builder progress should show activity text");
    assert(streamMetrics.loaderDots === 3, "Builder progress should show loader dots");
    assert(streamMetrics.liveText === "Streaming final reply", "Streaming assistant text should render");
    assert(streamMetrics.liveBeforeProgress, "Streaming assistant message should sit above progress");

    console.log("Smoke tests passed");
  } finally {
    page.close();
  }
}

const server = await startServer();
const chrome = await startChrome();
try {
  await smoke();
} finally {
  await chrome.close();
  await new Promise((resolveClose) => server.close(resolveClose));
}
