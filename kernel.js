// Kernel Module: Constants & Host Bindings
const DB_NAME = "app-lab";
const DB_VERSION = 1;
const MENU_APP_ID = "menu";

const SEED_APPS = [
  {
    appId: MENU_APP_ID,
    name: "Home",
    description: "Local app launcher",
    sourcePath: "seed-apps/menu.html",
    seedVersion: 1,
  },
  {
    appId: "sandbox-check",
    name: "Sandbox Check",
    description: "A tiny app loaded from IndexedDB to verify iframe switching.",
    sourcePath: "seed-apps/sandbox-check.html",
    seedVersion: 1,
  },
  {
    appId: "notes",
    name: "Notes",
    description: "A small persistence test app backed by apps_data.",
    sourcePath: "seed-apps/notes.html",
    seedVersion: 1,
  },
];

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

// Kernel Module: Storage Manager
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

// Kernel Module: Apps Registry
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

// Kernel Module: Apps Data
async function getActiveAppData() {
  const record = await requestToPromise(transaction("apps_data").get(state.activeAppId));
  return record?.data ?? null;
}

async function saveActiveAppData(data) {
  await requestToPromise(
    transaction("apps_data", "readwrite").put({
      appId: state.activeAppId,
      data,
      updatedAt: new Date().toISOString(),
    }),
  );
}

// Kernel Module: App Loader
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

// Kernel Module: RPC Message Router
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

  if (type === "GET_MY_DATA") {
    postToApp({
      type: "MY_DATA",
      requestId,
      payload: { data: await getActiveAppData() },
    });
    return;
  }

  if (type === "SAVE_MY_DATA") {
    await saveActiveAppData(payload?.data ?? null);
    postToApp({
      type: "MY_DATA_SAVED",
      requestId,
      payload: { ok: true },
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

// Kernel Module: Seed Apps
async function fetchSeedSource(sourcePath) {
  const response = await fetch(sourcePath, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Could not load seed app: ${sourcePath}`);
  }

  return response.text();
}

async function seedApps() {
  for (const seed of SEED_APPS) {
    const existing = await getApp(seed.appId);
    if (existing && existing.seedVersion === seed.seedVersion) continue;

    const sourceCode = await fetchSeedSource(seed.sourcePath);
    await putApp({
      appId: seed.appId,
      name: seed.name,
      description: seed.description,
      seedVersion: seed.seedVersion,
      sourceCode,
    });
  }
}

// Kernel Module: Boot
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
