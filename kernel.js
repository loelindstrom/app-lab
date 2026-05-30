// Kernel Module: Constants & Host Bindings
const DB_NAME = "app-lab";
const DB_VERSION = 2;
const MENU_APP_ID = "menu";
const CONFIG_KEY = "openrouter";
const OPENROUTER_CHAT_URL = "https://openrouter.ai/api/v1/chat/completions";
const MAX_TOOL_ROUNDS = 4;

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
const newAppButton = document.querySelector("#new-app");
const toggleBuilderButton = document.querySelector("#toggle-builder");
const closeBuilderButton = document.querySelector("#close-builder");
const openSettingsButton = document.querySelector("#open-settings");
const activeTitle = document.querySelector("#active-app-title");
const statusLine = document.querySelector("#kernel-status");
const builderPanel = document.querySelector("#builder-panel");
const builderTitle = document.querySelector("#builder-title");
const builderMessages = document.querySelector("#builder-messages");
const builderForm = document.querySelector("#builder-form");
const builderInput = document.querySelector("#builder-input");
const builderSend = document.querySelector("#builder-send");
const settingsDialog = document.querySelector("#settings-dialog");
const settingsForm = document.querySelector("#settings-form");
const openRouterKeyInput = document.querySelector("#openrouter-key");
const openRouterModelInput = document.querySelector("#openrouter-model");

const state = {
  db: null,
  activeAppId: null,
  activeApp: null,
  builder: {
    appId: null,
    messages: [],
    busy: false,
  },
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

async function getApp(appId) {
  return requestToPromise(transaction("apps_registry").get(appId));
}

// Kernel Module: System Config
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

function createBlankAppHtml(name) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(name)}</title>
    <style>
      * { box-sizing: border-box; }
      body {
        align-items: center;
        background: #fffaf0;
        color: #1f2522;
        display: grid;
        font-family: "Aptos", "Segoe UI", sans-serif;
        margin: 0;
        min-height: 100vh;
        padding: 24px;
      }
      main { max-width: 680px; }
      h1 { font-size: clamp(40px, 9vw, 84px); line-height: .94; margin: 0 0 18px; }
      p { color: #66706a; font-size: 18px; line-height: 1.55; margin: 0; }
    </style>
  </head>
  <body>
    <main>
      <h1>${escapeHtml(name)}</h1>
      <p>Open the host Builder and describe what this app should become.</p>
    </main>
  </body>
</html>`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function createBlankApp() {
  const appId = crypto.randomUUID();
  const name = "Untitled App";

  await putApp({
    appId,
    name,
    description: "New local app",
    sourceCode: createBlankAppHtml(name),
  });

  await loadApp(appId);
  openBuilder();
  addBuilderMessage("system", "Blank app created. Describe what you want this app to do.");
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
  builderTitle.textContent = app.name;
  iframe.srcdoc = app.sourceCode;
  setStatus(`Loaded ${app.name}`);

  if (state.builder.appId !== app.appId) {
    resetBuilderSession(app.appId);
  }
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

// Kernel Module: Builder UI
function resetBuilderSession(appId) {
  state.builder.appId = appId;
  state.builder.messages = [];
  state.builder.busy = false;
  renderBuilderMessages();
}

function openBuilder() {
  builderPanel.hidden = false;
  builderInput.focus();
}

function closeBuilder() {
  builderPanel.hidden = true;
}

function addBuilderMessage(role, content, persist = false) {
  if (persist) {
    state.builder.messages.push({ role, content });
  }

  const item = document.createElement("li");
  item.className = "builder-message";
  item.dataset.role = role;
  item.textContent = content;
  builderMessages.append(item);
  builderMessages.scrollTop = builderMessages.scrollHeight;
}

function renderBuilderMessages() {
  builderMessages.replaceChildren();

  if (!state.activeApp) return;

  addBuilderMessage(
    "system",
    `Builder session for ${state.activeApp.name}. Chat history resets when you switch apps or reload.`,
  );

  for (const message of state.builder.messages) {
    addBuilderMessage(message.role, message.content);
  }
}

function setBuilderBusy(isBusy) {
  state.builder.busy = isBusy;
  builderSend.disabled = isBusy;
  builderInput.disabled = isBusy;
}

// Kernel Module: Manager AI Harness
function getBuilderSystemPrompt() {
  return `You are the Builder Agent for App Lab.

You edit exactly one current app. You cannot access other apps, API keys, app data, sync, or browser storage.

Rules:
- Use read_current_app_code before writing unless the user explicitly asks a general question.
- Use write_current_app when the user asks for an app change.
- write_current_app must provide a complete single-file HTML document.
- Use plain HTML, CSS, and JavaScript only.
- Do not use external scripts, CDNs, imports, remote images, network requests, cookies, localStorage, sessionStorage, or IndexedDB.
- For persistence inside the generated app, use window.parent.postMessage with GET_MY_DATA and SAVE_MY_DATA.
- Generated apps run inside sandbox="allow-scripts" without allow-same-origin.
- Keep the app useful on mobile and desktop.
- After writing, briefly summarize what changed.`;
}

function getBuilderTools() {
  return [
    {
      type: "function",
      function: {
        name: "read_current_app_code",
        description: "Read the active app's registry metadata and complete HTML source.",
        parameters: {
          type: "object",
          properties: {},
          additionalProperties: false,
        },
      },
    },
    {
      type: "function",
      function: {
        name: "write_current_app",
        description: "Overwrite only the active app's metadata and complete HTML source.",
        parameters: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Short display name for the app.",
            },
            description: {
              type: "string",
              description: "One-sentence description for the app shelf.",
            },
            sourceCode: {
              type: "string",
              description: "Complete standalone HTML document for the app.",
            },
          },
          required: ["name", "description", "sourceCode"],
          additionalProperties: false,
        },
      },
    },
  ];
}

async function callOpenRouter(messages, tools) {
  const config = await getOpenRouterConfig();

  if (!config.apiKey || !config.model) {
    throw new Error("Add an OpenRouter API key and model id in Settings first.");
  }

  const response = await fetch(OPENROUTER_CHAT_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": window.location.origin,
      "X-Title": "App Lab",
    },
    body: JSON.stringify({
      model: config.model,
      messages,
      tools,
      tool_choice: "auto",
    }),
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(body?.error?.message || `OpenRouter request failed with ${response.status}`);
  }

  return body.choices?.[0]?.message;
}

async function executeBuilderTool(toolCall) {
  const toolName = toolCall.function?.name;
  const args = toolCall.function?.arguments ? JSON.parse(toolCall.function.arguments) : {};

  if (toolName === "read_current_app_code") {
    return {
      appId: state.activeApp.appId,
      name: state.activeApp.name,
      description: state.activeApp.description,
      sourceCode: state.activeApp.sourceCode,
    };
  }

  if (toolName === "write_current_app") {
    if (typeof args.sourceCode !== "string" || !args.sourceCode.toLowerCase().includes("<html")) {
      throw new Error("write_current_app requires a complete HTML document.");
    }

    await putApp({
      appId: state.activeAppId,
      name: args.name || state.activeApp.name,
      description: args.description || state.activeApp.description,
      sourceCode: args.sourceCode,
    });
    await loadApp(state.activeAppId);

    return {
      ok: true,
      appId: state.activeAppId,
      name: state.activeApp.name,
    };
  }

  throw new Error(`Unknown builder tool: ${toolName}`);
}

async function runBuilderAgent() {
  const messages = [
    { role: "system", content: getBuilderSystemPrompt() },
    ...state.builder.messages,
  ];
  const tools = getBuilderTools();

  for (let round = 0; round < MAX_TOOL_ROUNDS; round += 1) {
    const assistantMessage = await callOpenRouter(messages, tools);

    if (!assistantMessage) {
      throw new Error("OpenRouter returned an empty response.");
    }

    messages.push(assistantMessage);

    if (!assistantMessage.tool_calls?.length) {
      const content = assistantMessage.content || "Done.";
      addBuilderMessage("assistant", content, true);
      return;
    }

    for (const toolCall of assistantMessage.tool_calls) {
      const result = await executeBuilderTool(toolCall);
      messages.push({
        role: "tool",
        tool_call_id: toolCall.id,
        name: toolCall.function.name,
        content: JSON.stringify(result),
      });
    }
  }

  throw new Error("Builder stopped after too many tool rounds.");
}

async function submitBuilderMessage(event) {
  event.preventDefault();
  const userMessage = builderInput.value.trim();

  if (!userMessage || state.builder.busy) return;

  builderInput.value = "";
  addBuilderMessage("user", userMessage, true);
  setBuilderBusy(true);

  try {
    await runBuilderAgent();
  } catch (error) {
    console.error(error);
    addBuilderMessage("system", error?.message || "Builder request failed.");
  } finally {
    setBuilderBusy(false);
    builderInput.focus();
  }
}

// Kernel Module: Settings UI
async function openSettings() {
  const config = await getOpenRouterConfig();
  openRouterKeyInput.value = config.apiKey;
  openRouterModelInput.value = config.model;
  settingsDialog.showModal();
}

async function submitSettings(event) {
  event.preventDefault();

  if (event.submitter?.value === "cancel") {
    settingsDialog.close();
    return;
  }

  await saveOpenRouterConfig({
    apiKey: openRouterKeyInput.value,
    model: openRouterModelInput.value,
  });
  settingsDialog.close();
  setStatus("OpenRouter settings saved");
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
newAppButton.addEventListener("click", createBlankApp);
toggleBuilderButton.addEventListener("click", openBuilder);
closeBuilderButton.addEventListener("click", closeBuilder);
openSettingsButton.addEventListener("click", openSettings);
builderForm.addEventListener("submit", submitBuilderMessage);
settingsForm.addEventListener("submit", submitSettings);
window.addEventListener("message", handleMessage);

boot();
