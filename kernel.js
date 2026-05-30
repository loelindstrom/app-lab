// Kernel Module: Constants & Host Bindings
const DB_NAME = "app-lab";
const DB_VERSION = 2;
const MENU_APP_ID = "menu";
const CONFIG_KEY = "openrouter";
const OPENROUTER_CHAT_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_MODELS_URL = "https://openrouter.ai/api/v1/models?supported_parameters=tools";
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
const hostShell = document.querySelector(".host-shell");
const homeButton = document.querySelector("#system-home");
const newAppButton = document.querySelector("#new-app");
const toggleBuilderButton = document.querySelector("#toggle-builder");
const mobileBuilderBar = document.querySelector("#mobile-builder-bar");
const mobileBuilderToggle = document.querySelector("#mobile-builder-toggle");
const closeBuilderButton = document.querySelector("#close-builder");
const openSettingsButton = document.querySelector("#open-settings");
const sideMenu = document.querySelector("#side-menu");
const closeMenuButton = document.querySelector("#close-menu");
const sideMenuSettingsButton = document.querySelector("#side-menu-settings");
const activeTitle = document.querySelector("#active-app-title");
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
const openRouterModelsList = document.querySelector("#openrouter-models");
const modelsStatus = document.querySelector("#models-status");

const state = {
  db: null,
  activeAppId: null,
  activeApp: null,
  builder: {
    appId: null,
    messages: [],
    activity: [],
    busy: false,
  },
};

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
    console.warn(`App not found: ${appId}`);
    return;
  }

  state.activeAppId = app.appId;
  state.activeApp = app;
  activeTitle.textContent = app.name;
  builderTitle.textContent = app.name;
  updateTopBar(app.appId);
  iframe.srcdoc = app.sourceCode;

  if (state.builder.appId !== app.appId) {
    resetBuilderSession(app.appId);
  }
}

function updateTopBar(appId) {
  const isHome = appId === MENU_APP_ID;
  hostShell.classList.toggle("is-home", isHome);
  hostShell.classList.toggle("is-app", !isHome);
  homeButton.textContent = isHome ? "☰" : "‹";
  homeButton.setAttribute("aria-label", isHome ? "Open menu" : "Back to home");
  newAppButton.hidden = !isHome;
  toggleBuilderButton.hidden = isHome;
  mobileBuilderBar.hidden = isHome;
  mobileBuilderToggle.hidden = isHome;
  updateBuilderToggleLabel();
  openSettingsButton.hidden = true;
}

function handleHomeButton() {
  if (state.activeAppId === MENU_APP_ID) {
    sideMenu.hidden = false;
    return;
  }

  closeBuilder();
  loadApp(MENU_APP_ID);
}

function closeSideMenu() {
  sideMenu.hidden = true;
}

function openSettingsFromMenu() {
  closeSideMenu();
  openSettings();
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
  hostShell.classList.add("builder-open");
  toggleBuilderButton.hidden = true;
  mobileBuilderToggle.hidden = state.activeAppId === MENU_APP_ID;
  updateBuilderToggleLabel();
  builderInput.focus();
}

function closeBuilder() {
  builderPanel.hidden = true;
  hostShell.classList.remove("builder-open");
  toggleBuilderButton.hidden = state.activeAppId === MENU_APP_ID;
  mobileBuilderToggle.hidden = state.activeAppId === MENU_APP_ID;
  updateBuilderToggleLabel();
}

function toggleBuilder() {
  if (builderPanel.hidden) {
    openBuilder();
  } else {
    closeBuilder();
  }
}

function updateBuilderToggleLabel() {
  toggleBuilderButton.textContent = "BuilderAI";
  mobileBuilderToggle.textContent = builderPanel.hidden ? "BuilderAI ↑" : "BuilderAI ↓";
}

function addBuilderMessage(role, content, persist = false) {
  if (persist) {
    state.builder.messages.push({ role, content });
  }

  const item = document.createElement("li");
  item.className = "builder-message";
  item.dataset.role = role;
  item.textContent = content;

  const progressItem = builderMessages.querySelector(".builder-progress");
  if (progressItem) {
    builderMessages.insertBefore(item, progressItem);
  } else {
    builderMessages.append(item);
  }

  scrollBuilderMessages();
  return item;
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

  if (isBusy) {
    state.builder.activity = [];
    updateBuilderActivity("Thinking...");
  } else {
    clearBuilderProgress();
  }
}

function scrollBuilderMessages() {
  builderMessages.scrollTop = builderMessages.scrollHeight;
}

function updateBuilderActivity(message) {
  if (!state.builder.busy || !message) return;

  if (state.builder.activity.at(-1) !== message) {
    state.builder.activity.push(message);
  }

  renderBuilderProgress();
}

function renderBuilderProgress() {
  clearBuilderProgress(false);

  if (!state.builder.busy) return;

  const item = document.createElement("li");
  item.className = "builder-progress";
  item.setAttribute("aria-live", "polite");

  const lines = document.createElement("div");
  lines.className = "builder-progress-lines";

  for (const message of state.builder.activity.slice(-4)) {
    const line = document.createElement("p");
    line.textContent = message;
    lines.append(line);
  }

  const loader = document.createElement("div");
  loader.className = "builder-loader";
  loader.innerHTML = '<span></span><span></span><span></span><strong>Working</strong>';

  item.append(lines, loader);
  builderMessages.append(item);
  scrollBuilderMessages();
}

function clearBuilderProgress(resetActivity = true) {
  for (const item of builderMessages.querySelectorAll(".builder-progress")) {
    item.remove();
  }

  if (resetActivity) {
    state.builder.activity = [];
  }
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

async function callOpenRouter(messages, tools, handlers = {}) {
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
      stream: true,
    }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error?.message || `OpenRouter request failed with ${response.status}`);
  }

  if (!response.body) {
    const body = await response.json().catch(() => null);
    return body?.choices?.[0]?.message;
  }

  return readOpenRouterStream(response.body, handlers);
}

async function readOpenRouterStream(body, handlers) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  const assistantMessage = {
    role: "assistant",
    content: "",
    tool_calls: [],
  };
  let buffer = "";
  let sawReasoning = false;

  while (true) {
    const { value, done } = await reader.read();
    buffer += decoder.decode(value || new Uint8Array(), { stream: !done });
    buffer = buffer.replace(/\r\n/g, "\n");

    let eventBoundary = buffer.indexOf("\n\n");
    while (eventBoundary !== -1) {
      const rawEvent = buffer.slice(0, eventBoundary);
      buffer = buffer.slice(eventBoundary + 2);
      processOpenRouterStreamEvent(rawEvent, assistantMessage, handlers, () => {
        if (!sawReasoning) {
          sawReasoning = true;
          handlers.onThinking?.();
        }
      });
      eventBoundary = buffer.indexOf("\n\n");
    }

    if (done) break;
  }

  if (buffer.trim()) {
    processOpenRouterStreamEvent(buffer, assistantMessage, handlers, () => {
      if (!sawReasoning) {
        sawReasoning = true;
        handlers.onThinking?.();
      }
    });
  }

  if (!assistantMessage.tool_calls.length) {
    delete assistantMessage.tool_calls;
  }

  return assistantMessage;
}

function processOpenRouterStreamEvent(rawEvent, assistantMessage, handlers, markThinking) {
  const data = rawEvent
    .split("\n")
    .filter((line) => line.startsWith("data:"))
    .map((line) => line.slice(5).trimStart())
    .join("\n")
    .trim();

  if (!data || data === "[DONE]") return;

  let payload;
  try {
    payload = JSON.parse(data);
  } catch (error) {
    console.warn("Could not parse OpenRouter stream event", error);
    return;
  }

  const delta = payload.choices?.[0]?.delta;
  if (!delta) return;

  if (delta.reasoning || delta.reasoning_content || delta.reasoning_details) {
    markThinking();
  }

  if (typeof delta.content === "string") {
    assistantMessage.content += delta.content;
    handlers.onContent?.(delta.content, assistantMessage.content);
  }

  for (const toolDelta of delta.tool_calls || []) {
    const index = toolDelta.index ?? assistantMessage.tool_calls.length;
    const toolCall = ensureToolCallDelta(assistantMessage.tool_calls, index);
    if (toolDelta.id) toolCall.id = toolDelta.id;
    if (toolDelta.type) toolCall.type = toolDelta.type;
    if (toolDelta.function?.name) toolCall.function.name += toolDelta.function.name;
    if (toolDelta.function?.arguments) toolCall.function.arguments += toolDelta.function.arguments;
    handlers.onToolDelta?.(toolCall);
  }
}

function ensureToolCallDelta(toolCalls, index) {
  if (!toolCalls[index]) {
    toolCalls[index] = {
      id: "",
      type: "function",
      function: {
        name: "",
        arguments: "",
      },
    };
  }

  return toolCalls[index];
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
    let liveAssistantItem = null;
    let sawToolCall = false;
    const assistantMessage = await callOpenRouter(messages, tools, {
      onThinking: () => updateBuilderActivity("Thinking through the request..."),
      onToolDelta: (toolCall) => {
        sawToolCall = true;
        updateBuilderActivity(getToolActivityLabel(toolCall.function?.name));

        if (liveAssistantItem) {
          liveAssistantItem.remove();
          liveAssistantItem = null;
        }
      },
      onContent: (_chunk, content) => {
        if (sawToolCall) return;

        if (!liveAssistantItem) {
          updateBuilderActivity("Writing response...");
          liveAssistantItem = addBuilderMessage("assistant", "");
          liveAssistantItem.dataset.streaming = "true";
        }

        liveAssistantItem.textContent = content;
        scrollBuilderMessages();
      },
    });

    if (!assistantMessage) {
      throw new Error("OpenRouter returned an empty response.");
    }

    messages.push(assistantMessage);

    if (!assistantMessage.tool_calls?.length) {
      const content = assistantMessage.content || "Done.";
      if (liveAssistantItem) {
        liveAssistantItem.textContent = content;
        delete liveAssistantItem.dataset.streaming;
        state.builder.messages.push({ role: "assistant", content });
        scrollBuilderMessages();
      } else {
        addBuilderMessage("assistant", content, true);
      }
      return;
    }

    if (liveAssistantItem) {
      liveAssistantItem.remove();
    }

    for (const toolCall of assistantMessage.tool_calls) {
      updateBuilderActivity(getToolActivityLabel(toolCall.function?.name, true));
      const result = await executeBuilderTool(toolCall);
      updateBuilderActivity(getToolActivityLabel(toolCall.function?.name, false));
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

function getToolActivityLabel(toolName, completed = null) {
  const labels = {
    read_current_app_code: ["Reading current app...", "Read current app."],
    write_current_app: ["Editing app...", "Edited app."],
  };
  const [activeLabel, doneLabel] = labels[toolName] || ["Using a tool...", "Tool finished."];
  return completed === false ? doneLabel : activeLabel;
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
  loadOpenRouterModels();
}

async function loadOpenRouterModels() {
  modelsStatus.textContent = "Loading tool-capable models...";

  try {
    const response = await fetch(OPENROUTER_MODELS_URL);
    if (!response.ok) throw new Error(`Model list failed with ${response.status}`);

    const body = await response.json();
    const models = (body.data || [])
      .filter((model) => model.supported_parameters?.includes("tools"))
      .sort((a, b) => {
        const aCost = Number(a.pricing?.prompt || 0) + Number(a.pricing?.completion || 0);
        const bCost = Number(b.pricing?.prompt || 0) + Number(b.pricing?.completion || 0);
        return aCost - bCost || a.name.localeCompare(b.name);
      });

    openRouterModelsList.replaceChildren(...models.map(createModelOption));
    modelsStatus.textContent = `${models.length} tool-capable models available. Prices are USD per 1M tokens.`;
  } catch (error) {
    console.error(error);
    modelsStatus.textContent = "Could not load models. You can still type a model id manually.";
  }
}

function createModelOption(model) {
  const option = document.createElement("option");
  const inputCost = formatTokenPrice(model.pricing?.prompt);
  const outputCost = formatTokenPrice(model.pricing?.completion);
  option.value = model.id;
  option.label = `${model.name} (${inputCost} in / ${outputCost} out)`;
  return option;
}

function formatTokenPrice(pricePerToken) {
  const price = Number(pricePerToken);
  if (!Number.isFinite(price)) return "?";
  if (price === 0) return "$0";
  return `$${(price * 1_000_000).toFixed(price * 1_000_000 < 1 ? 2 : 1)}`;
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
}

// Kernel Module: Boot
async function boot() {
  try {
    state.db = await openDatabase();
    await seedApps();
    await loadApp(MENU_APP_ID);
  } catch (error) {
    console.error(error);
    activeTitle.textContent = "Kernel error";
  }
}

homeButton.addEventListener("click", handleHomeButton);
newAppButton.addEventListener("click", createBlankApp);
toggleBuilderButton.addEventListener("click", toggleBuilder);
mobileBuilderToggle.addEventListener("click", toggleBuilder);
closeBuilderButton.addEventListener("click", closeBuilder);
openSettingsButton.addEventListener("click", openSettings);
closeMenuButton.addEventListener("click", closeSideMenu);
sideMenuSettingsButton.addEventListener("click", openSettingsFromMenu);
builderForm.addEventListener("submit", submitBuilderMessage);
settingsForm.addEventListener("submit", submitSettings);
window.addEventListener("message", handleMessage);

boot();
