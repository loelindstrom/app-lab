const DB_NAME = "app-lab";
const DB_VERSION = 1;
const MENU_APP_ID = "menu";

const iframe = document.querySelector("#app-sandbox");
const homeButton = document.querySelector("#system-home");
const activeTitle = document.querySelector("#active-app-title");
const statusLine = document.querySelector("#kernel-status");

const state = {
  db: null,
  activeAppId: null,
  activeApp: null,
};

function setStatus(message) {
  statusLine.textContent = message;
}

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains("apps_registry")) {
        const registry = db.createObjectStore("apps_registry", { keyPath: "appId" });
        registry.createIndex("updatedAt", "updatedAt");
      }

      if (!db.objectStoreNames.contains("apps_data")) {
        db.createObjectStore("apps_data", { keyPath: "appId" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function transaction(storeName, mode = "readonly") {
  return state.db.transaction(storeName, mode).objectStore(storeName);
}

function requestToPromise(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getApp(appId) {
  return requestToPromise(transaction("apps_registry").get(appId));
}

async function listApps() {
  const apps = await requestToPromise(transaction("apps_registry").getAll());
  return apps
    .map(({ appId, name, description, updatedAt }) => ({ appId, name, description, updatedAt }))
    .sort((a, b) => {
      if (a.appId === MENU_APP_ID) return -1;
      if (b.appId === MENU_APP_ID) return 1;
      return a.name.localeCompare(b.name);
    });
}

async function putApp(app) {
  const now = new Date().toISOString();
  const existing = await getApp(app.appId);
  const record = {
    createdAt: existing?.createdAt ?? now,
    ...existing,
    ...app,
    updatedAt: now,
  };

  await requestToPromise(transaction("apps_registry", "readwrite").put(record));
}

function postToApp(message) {
  iframe.contentWindow?.postMessage(message, "*");
}

async function loadApp(appId) {
  const app = await getApp(appId);

  if (!app) {
    setStatus(`App not found: ${appId}`);
    return;
  }

  state.activeAppId = app.appId;
  state.activeApp = app;
  activeTitle.textContent = app.name;
  iframe.srcdoc = app.sourceCode;
  setStatus(`Loaded ${app.name}`);
}

async function handleMessage(event) {
  if (event.source !== iframe.contentWindow) return;
  if (!event.data || typeof event.data !== "object") return;

  const { type, requestId, payload } = event.data;

  if (type === "LIST_APPS") {
    postToApp({
      type: "APPS_LIST",
      requestId,
      payload: { apps: await listApps(), activeAppId: state.activeAppId },
    });
    return;
  }

  if (type === "NAVIGATE_APP") {
    const nextAppId = payload?.appId;
    if (typeof nextAppId === "string") {
      await loadApp(nextAppId);
    }
  }
}

function createMenuAppHtml() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      :root {
        --bg: #fffaf0;
        --ink: #202723;
        --muted: #66706a;
        --line: #ddd4c4;
        --accent: #0f6d5c;
        --accent-soft: #d9eee8;
      }

      * { box-sizing: border-box; }

      body {
        margin: 0;
        min-height: 100vh;
        background:
          linear-gradient(160deg, rgb(15 109 92 / 10%), transparent 34%),
          var(--bg);
        color: var(--ink);
        font-family: "Aptos", "Segoe UI", sans-serif;
      }

      main {
        margin: 0 auto;
        max-width: 980px;
        padding: 36px 22px;
      }

      header {
        margin-bottom: 28px;
      }

      p {
        color: var(--muted);
        line-height: 1.55;
        margin: 8px 0 0;
        max-width: 680px;
      }

      h1 {
        font-size: clamp(34px, 8vw, 68px);
        line-height: .96;
        margin: 0;
      }

      .grid {
        display: grid;
        gap: 12px;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      }

      button {
        background: white;
        border: 1px solid var(--line);
        border-radius: 8px;
        color: inherit;
        cursor: pointer;
        display: grid;
        gap: 10px;
        min-height: 148px;
        padding: 18px;
        text-align: left;
        width: 100%;
      }

      button:hover,
      button:focus-visible {
        border-color: var(--accent);
        box-shadow: 0 12px 32px rgb(15 109 92 / 16%);
        outline: none;
      }

      .name {
        font-size: 20px;
        font-weight: 800;
      }

      .description {
        color: var(--muted);
        line-height: 1.45;
      }

      .tag {
        align-self: end;
        background: var(--accent-soft);
        border-radius: 999px;
        color: #09483d;
        display: inline-block;
        font-size: 12px;
        font-weight: 800;
        padding: 5px 9px;
        width: fit-content;
      }
    </style>
  </head>
  <body>
    <main>
      <header>
        <h1>Your app shelf</h1>
        <p>Open a generated app from the local registry. The host controls storage and navigation outside this sandbox.</p>
      </header>
      <section id="apps" class="grid" aria-label="Available apps"></section>
    </main>

    <script>
      const appsRoot = document.querySelector("#apps");
      const requestId = crypto.randomUUID();

      window.addEventListener("message", (event) => {
        if (event.data?.type !== "APPS_LIST" || event.data.requestId !== requestId) return;
        renderApps(event.data.payload.apps);
      });

      function renderApps(apps) {
        appsRoot.replaceChildren(...apps
          .filter((app) => app.appId !== "menu")
          .map((app) => {
            const button = document.createElement("button");
            button.type = "button";
            button.innerHTML = "<span class='name'></span><span class='description'></span><span class='tag'>Open</span>";
            button.querySelector(".name").textContent = app.name;
            button.querySelector(".description").textContent = app.description || "Local app";
            button.addEventListener("click", () => {
              window.parent.postMessage({ type: "NAVIGATE_APP", payload: { appId: app.appId } }, "*");
            });
            return button;
          }));
      }

      window.parent.postMessage({ type: "LIST_APPS", requestId }, "*");
    </script>
  </body>
</html>`;
}

function createDemoAppHtml() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      * { box-sizing: border-box; }

      body {
        align-items: center;
        background: #f8fbf6;
        color: #17211d;
        display: grid;
        font-family: "Aptos", "Segoe UI", sans-serif;
        margin: 0;
        min-height: 100vh;
        padding: 24px;
      }

      main {
        max-width: 720px;
      }

      h1 {
        font-size: clamp(38px, 9vw, 86px);
        line-height: .92;
        margin: 0 0 18px;
      }

      p {
        color: #5f6a64;
        font-size: 18px;
        line-height: 1.55;
        margin: 0 0 24px;
      }

      button {
        background: #17211d;
        border: 0;
        border-radius: 7px;
        color: white;
        cursor: pointer;
        font: inherit;
        font-weight: 800;
        min-height: 44px;
        padding: 0 18px;
      }

      output {
        display: block;
        font-size: 48px;
        font-weight: 900;
        margin-top: 22px;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>Sandbox check</h1>
      <p>This dummy app is a complete HTML document loaded from IndexedDB into an isolated iframe.</p>
      <button id="increment" type="button">Increment local counter</button>
      <output id="count">0</output>
    </main>
    <script>
      let count = 0;
      const output = document.querySelector("#count");
      document.querySelector("#increment").addEventListener("click", () => {
        count += 1;
        output.textContent = count;
      });
    </script>
  </body>
</html>`;
}

async function seedApps() {
  const seeds = [
    {
      appId: MENU_APP_ID,
      name: "Home",
      description: "Local app launcher",
      sourceCode: createMenuAppHtml(),
    },
    {
      appId: "sandbox-check",
      name: "Sandbox Check",
      description: "A tiny app loaded from IndexedDB to verify iframe switching.",
      sourceCode: createDemoAppHtml(),
    },
  ];

  for (const app of seeds) {
    const existing = await getApp(app.appId);
    if (!existing) await putApp(app);
  }
}

async function boot() {
  try {
    state.db = await openDatabase();
    await seedApps();
    await loadApp(MENU_APP_ID);
    setStatus("Kernel ready");
  } catch (error) {
    console.error(error);
    activeTitle.textContent = "Kernel error";
    setStatus(error?.message || "Kernel failed to start");
  }
}

homeButton.addEventListener("click", () => loadApp(MENU_APP_ID));
window.addEventListener("message", handleMessage);

boot();
