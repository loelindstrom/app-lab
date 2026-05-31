export const DB_NAME = "app-lab";
export const DB_VERSION = 2;
export const MENU_APP_ID = "menu";
export const CONFIG_KEY = "openrouter";
export const MAX_APP_DATA_BYTES = 1_048_576;
export const APP_CAPABILITY_GLOBAL = "__APP_LAB_CAPABILITY__";
export const APP_CAPABILITY_FIELD = "appLabCapability";

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
    seedVersion: 2,
  },
  {
    appId: "notes",
    name: "Notes",
    description: "A small example app.",
    sourcePath: "seed-apps/notes.html",
    seedVersion: 3,
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
  let activeFrameAppId = null;
  let activeFrameCapability = null;

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
  async function getAppData(appId) {
    const record = await requestToPromise(transaction("apps_data").get(appId));
    return record?.data ?? null;
  }

  async function getActiveAppData() {
    return getAppData(state.activeAppId);
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

    return JSON.parse(serialized);
  }

  async function saveAppData(appId, data) {
    const validatedData = validateAppData(data);
    await requestToPromise(
      transaction("apps_data", "readwrite").put({
        appId,
        data: validatedData,
        updatedAt: new Date().toISOString(),
      }),
    );
  }

  // Section: Iframe app loading
  function createFrameCapability() {
    return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }

  function createCspMetaElement(document) {
    const meta = document.createElement("meta");
    meta.setAttribute("http-equiv", "Content-Security-Policy");
    meta.setAttribute("content", SANDBOX_CSP);
    return meta;
  }

  function createCapabilityScriptElement(document, capability) {
    const script = document.createElement("script");
    script.textContent = `Object.defineProperty(window, ${JSON.stringify(APP_CAPABILITY_GLOBAL)}, {
  value: ${JSON.stringify(capability)},
  configurable: false,
  enumerable: false,
  writable: false
});`;
    return script;
  }

  function serializeDoctype(doctype) {
    if (!doctype) return "<!doctype html>";

    let serialized = `<!doctype ${doctype.name}`;
    if (doctype.publicId) serialized += ` PUBLIC "${doctype.publicId}"`;
    if (doctype.systemId) serialized += doctype.publicId ? ` "${doctype.systemId}"` : ` SYSTEM "${doctype.systemId}"`;
    return `${serialized}>`;
  }

  function prepareSandboxHtml(sourceCode, capability = "") {
    const document = new DOMParser().parseFromString(String(sourceCode), "text/html");

    for (const meta of document.querySelectorAll("meta[http-equiv]")) {
      if (meta.getAttribute("http-equiv")?.toLowerCase() === "content-security-policy") {
        meta.remove();
      }
    }

    document.head.prepend(
      createCspMetaElement(document),
      createCapabilityScriptElement(document, capability),
    );

    return `${serializeDoctype(document.doctype)}\n${document.documentElement.outerHTML}`;
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

    const capability = createFrameCapability();
    state.activeAppId = app.appId;
    state.activeApp = app;
    activeFrameAppId = app.appId;
    activeFrameCapability = capability;
    expectedIframeLoad = true;
    dom.iframe.srcdoc = prepareSandboxHtml(app.sourceCode, capability);
    onAppLoaded(app);
  }

  function handleIframeLoad() {
    if (expectedIframeLoad) {
      expectedIframeLoad = false;
      return;
    }

    if (state.activeAppId) {
      console.warn("Unexpected iframe navigation detected; reloading active app.");
      activeFrameAppId = null;
      activeFrameCapability = null;
      loadApp(state.activeAppId);
    }
  }

  // Section: Host/app RPC boundary
  function getActiveFrameCapability() {
    return activeFrameCapability;
  }

  function getValidatedFrameAppId(message) {
    if (!activeFrameAppId || !activeFrameCapability) return null;
    return message?.[APP_CAPABILITY_FIELD] === activeFrameCapability ? activeFrameAppId : null;
  }

  async function handleMessage(event) {
    if (event.source !== dom.iframe.contentWindow) return;
    if (!event.data || typeof event.data !== "object") return;

    const { type, requestId, payload } = event.data;
    const frameAppId = getValidatedFrameAppId(event.data);
    if (!frameAppId) return;

    if (type === "LIST_APPS") {
      postToApp({
        type: "APPS_LIST",
        requestId,
        payload: { apps: await listApps(), activeAppId: frameAppId },
      });
      return;
    }

    if (type === "GET_MY_DATA") {
      postToApp({
        type: "MY_DATA",
        requestId,
        payload: { data: await getAppData(frameAppId) },
      });
      return;
    }

    if (type === "SAVE_MY_DATA") {
      try {
        await saveAppData(frameAppId, payload?.data ?? null);
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
    getActiveFrameCapability,
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
