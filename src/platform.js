export const DB_NAME = "app-lab";
export const DB_VERSION = 2;
export const MENU_APP_ID = "menu";
export const CONFIG_KEY = "openrouter";
export const MAX_APP_DATA_BYTES = 1_048_576;

const SANDBOX_CSP = [
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

// Section: Seed app manifest
const SEED_APPS = [
  {
    appId: MENU_APP_ID,
    name: "Home",
    description: "Local app launcher",
    sourcePath: "seed-apps/menu.html",
    seedVersion: 1,
  },
  {
    appId: "notes",
    name: "Notes",
    description: "A small example app.",
    sourcePath: "seed-apps/notes.html",
    seedVersion: 2,
  },
];

export function createPlatform({ dom }) {
  // Section: Platform state and lifecycle hooks
  const state = {
    db: null,
    activeAppId: null,
    activeApp: null,
  };
  let onAppLoaded = () => {};
  let expectedIframeLoad = false;

  function setAppLoadedHandler(handler) {
    onAppLoaded = handler;
  }

  // Section: IndexedDB connection and request helpers
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

        if (!db.objectStoreNames.contains("system_config")) {
          db.createObjectStore("system_config", { keyPath: "key" });
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

  // Section: Host-owned system configuration
  async function getOpenRouterConfig() {
    const record = await requestToPromise(transaction("system_config").get(CONFIG_KEY));
    return {
      apiKey: record?.apiKey ?? "",
      model: record?.model ?? "",
    };
  }

  async function saveOpenRouterConfig(config) {
    await requestToPromise(
      transaction("system_config", "readwrite").put({
        key: CONFIG_KEY,
        apiKey: config.apiKey.trim(),
        model: config.model.trim(),
        updatedAt: new Date().toISOString(),
      }),
    );
  }

  // Section: App registry
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

  // Section: Active app data
  async function getActiveAppData() {
    const record = await requestToPromise(transaction("apps_data").get(state.activeAppId));
    return record?.data ?? null;
  }

  function validateAppData(data) {
    let serialized;

    try {
      serialized = JSON.stringify(data);
    } catch {
      throw new Error("App data must be JSON-serializable.");
    }

    if (serialized === undefined) {
      throw new Error("App data must be JSON-serializable.");
    }

    const byteLength = new TextEncoder().encode(serialized).byteLength;
    if (byteLength > MAX_APP_DATA_BYTES) {
      throw new Error(`App data exceeds the ${MAX_APP_DATA_BYTES} byte limit.`);
    }

    return data;
  }

  async function saveActiveAppData(data) {
    const validatedData = validateAppData(data);
    await requestToPromise(
      transaction("apps_data", "readwrite").put({
        appId: state.activeAppId,
        data: validatedData,
        updatedAt: new Date().toISOString(),
      }),
    );
  }

  // Section: Iframe app loading
  function escapeHtmlAttribute(value) {
    return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;");
  }

  function createCspMetaTag() {
    return `<meta http-equiv="Content-Security-Policy" content="${escapeHtmlAttribute(SANDBOX_CSP)}">`;
  }

  function prepareSandboxHtml(sourceCode) {
    const cspMeta = createCspMetaTag();
    if (/<head[\s>]/i.test(sourceCode)) {
      return sourceCode.replace(/<head([^>]*)>/i, `<head$1>${cspMeta}`);
    }

    if (/<html[\s>]/i.test(sourceCode)) {
      return sourceCode.replace(/<html([^>]*)>/i, `<html$1><head>${cspMeta}</head>`);
    }

    const doctypeMatch = sourceCode.match(/^\s*<!doctype[^>]*>/i);
    const doctype = doctypeMatch?.[0] ?? "<!doctype html>";
    const body = doctypeMatch ? sourceCode.slice(doctype.length) : sourceCode;
    return `${doctype}<html><head>${cspMeta}</head><body>${body}</body></html>`;
  }

  function postToApp(message) {
    dom.iframe.contentWindow?.postMessage(message, "*");
  }

  async function loadApp(appId) {
    const app = await getApp(appId);

    if (!app) {
      console.warn(`App not found: ${appId}`);
      return;
    }

    state.activeAppId = app.appId;
    state.activeApp = app;
    expectedIframeLoad = true;
    dom.iframe.srcdoc = prepareSandboxHtml(app.sourceCode);
    onAppLoaded(app);
  }

  function handleIframeLoad() {
    if (expectedIframeLoad) {
      expectedIframeLoad = false;
      return;
    }

    if (state.activeAppId) {
      console.warn("Unexpected iframe navigation detected; reloading active app.");
      loadApp(state.activeAppId);
    }
  }

  // Section: Host/app RPC boundary
  async function handleMessage(event) {
    if (event.source !== dom.iframe.contentWindow) return;
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
      try {
        await saveActiveAppData(payload?.data ?? null);
        postToApp({
          type: "MY_DATA_SAVED",
          requestId,
          payload: { ok: true },
        });
      } catch (error) {
        postToApp({
          type: "MY_DATA_SAVE_FAILED",
          requestId,
          payload: { ok: false, error: error?.message || "Could not save app data." },
        });
      }
      return;
    }

    if (type === "NAVIGATE_APP") {
      const nextAppId = payload?.appId;
      if (typeof nextAppId === "string") {
        await loadApp(nextAppId);
      }
    }
  }

  // Section: Seed app installation
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

  return {
    state,
    getActiveAppData,
    getApp,
    getOpenRouterConfig,
    handleMessage,
    handleIframeLoad,
    listApps,
    loadApp,
    openDatabase,
    prepareSandboxHtml,
    putApp,
    saveOpenRouterConfig,
    seedApps,
    setAppLoadedHandler,
  };
}
