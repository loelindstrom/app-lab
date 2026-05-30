import { MENU_APP_ID } from "./platform.js";
import { OPENROUTER_MODELS_URL, formatTokenPrice } from "./builder/openrouter.js";

const REQUIRED_SELECTORS = {
  activeTitle: "#active-app-title",
  builderForm: "#builder-form",
  builderInput: "#builder-input",
  builderMessages: "#builder-messages",
  builderPanel: "#builder-panel",
  builderSend: "#builder-send",
  builderTitle: "#builder-title",
  closeBuilderButton: "#close-builder",
  closeMenuButton: "#close-menu",
  homeButton: "#system-home",
  hostShell: ".host-shell",
  iframe: "#app-sandbox",
  mobileBuilderBar: "#mobile-builder-bar",
  mobileBuilderToggle: "#mobile-builder-toggle",
  modelsStatus: "#models-status",
  newAppButton: "#new-app",
  openRouterKeyInput: "#openrouter-key",
  openRouterModelInput: "#openrouter-model",
  openRouterModelsList: "#openrouter-models",
  openSettingsButton: "#open-settings",
  settingsDialog: "#settings-dialog",
  settingsForm: "#settings-form",
  sideMenu: "#side-menu",
  sideMenuSettingsButton: "#side-menu-settings",
  toggleBuilderButton: "#toggle-builder",
};

export function getDomBindings() {
  const bindings = {};

  for (const [key, selector] of Object.entries(REQUIRED_SELECTORS)) {
    const element = document.querySelector(selector);
    if (!element) {
      throw new Error(`Missing required element: ${selector}`);
    }
    bindings[key] = element;
  }

  return bindings;
}

export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function createShell({ builderUi, dom, platform }) {
  function syncAppChrome(app) {
    dom.activeTitle.textContent = app.name;
    updateTopBar(app.appId);
  }

  function updateTopBar(appId) {
    const isHome = appId === MENU_APP_ID;
    dom.hostShell.classList.toggle("is-home", isHome);
    dom.hostShell.classList.toggle("is-app", !isHome);
    dom.homeButton.textContent = isHome ? "☰" : "‹";
    dom.homeButton.setAttribute("aria-label", isHome ? "Open menu" : "Back to home");
    dom.newAppButton.hidden = !isHome;
    dom.toggleBuilderButton.hidden = isHome;
    dom.mobileBuilderBar.hidden = isHome;
    dom.mobileBuilderToggle.hidden = isHome;
    builderUi.updateBuilderToggleLabel();
    dom.openSettingsButton.hidden = true;
  }

  function handleHomeButton() {
    if (platform.state.activeAppId === MENU_APP_ID) {
      dom.sideMenu.hidden = false;
      return;
    }

    builderUi.closeBuilder();
    platform.loadApp(MENU_APP_ID);
  }

  function closeSideMenu() {
    dom.sideMenu.hidden = true;
  }

  function openSettingsFromMenu() {
    closeSideMenu();
    openSettings();
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

  async function createBlankApp() {
    const appId = crypto.randomUUID();
    const name = "Untitled App";

    await platform.putApp({
      appId,
      name,
      description: "New local app",
      sourceCode: createBlankAppHtml(name),
    });

    await platform.loadApp(appId);
    builderUi.openBuilder();
    builderUi.addBuilderMessage("system", "Blank app created. Describe what you want this app to do.");
  }

  async function openSettings() {
    const config = await platform.getOpenRouterConfig();
    dom.openRouterKeyInput.value = config.apiKey;
    dom.openRouterModelInput.value = config.model;
    dom.settingsDialog.showModal();
    loadOpenRouterModels();
  }

  async function loadOpenRouterModels() {
    dom.modelsStatus.textContent = "Loading tool-capable models...";

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

      dom.openRouterModelsList.replaceChildren(...models.map(createModelOption));
      dom.modelsStatus.textContent = `${models.length} tool-capable models available. Prices are USD per 1M tokens.`;
    } catch (error) {
      console.error(error);
      dom.modelsStatus.textContent = "Could not load models. You can still type a model id manually.";
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

  async function submitSettings(event) {
    event.preventDefault();

    if (event.submitter?.value === "cancel") {
      dom.settingsDialog.close();
      return;
    }

    await platform.saveOpenRouterConfig({
      apiKey: dom.openRouterKeyInput.value,
      model: dom.openRouterModelInput.value,
    });
    dom.settingsDialog.close();
  }

  return {
    closeSideMenu,
    createBlankApp,
    escapeHtml,
    handleHomeButton,
    openSettings,
    openSettingsFromMenu,
    submitSettings,
    syncAppChrome,
    updateTopBar,
  };
}
