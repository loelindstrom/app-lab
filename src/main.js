import { createBuilderAgent } from "./builder/agent.js";
import { readOpenRouterStream } from "./builder/openrouter.js";
import { createBuilderUi } from "./builder/ui.js";
import { MENU_APP_ID, createPlatform } from "./platform.js";
import { createShell, getDomBindings } from "./shell.js";

const dom = getDomBindings();
const platform = createPlatform({ dom });
const builderUi = createBuilderUi({
  dom,
  getActiveApp: () => platform.state.activeApp,
  getActiveAppId: () => platform.state.activeAppId,
});
const shell = createShell({ builderUi, dom, platform });
const builderAgent = createBuilderAgent({ builderUi, platform });

builderUi.setAgentRunner(builderAgent.runBuilderAgent);
platform.setAppLoadedHandler((app) => {
  shell.syncAppChrome(app);
  builderUi.handleAppLoaded(app);
});

async function boot() {
  try {
    platform.state.db = await platform.openDatabase();
    await platform.seedApps();
    await platform.loadApp(MENU_APP_ID);
  } catch (error) {
    console.error(error);
    dom.activeTitle.textContent = "Startup error";
  }
}

dom.homeButton.addEventListener("click", shell.handleHomeButton);
dom.newAppButton.addEventListener("click", shell.createBlankApp);
dom.toggleBuilderButton.addEventListener("click", builderUi.toggleBuilder);
dom.mobileBuilderToggle.addEventListener("click", builderUi.toggleBuilder);
dom.closeBuilderButton.addEventListener("click", builderUi.closeBuilder);
dom.openSettingsButton.addEventListener("click", shell.openSettings);
dom.closeMenuButton.addEventListener("click", shell.closeSideMenu);
dom.sideMenuSettingsButton.addEventListener("click", shell.openSettingsFromMenu);
dom.builderForm.addEventListener("submit", builderUi.submitBuilderMessage);
dom.settingsForm.addEventListener("submit", shell.submitSettings);
window.addEventListener("message", platform.handleMessage);

if (new URLSearchParams(window.location.search).has("test")) {
  window.__appLabTest = {
    addBuilderMessage: builderUi.addBuilderMessage,
    getActiveAppData: platform.getActiveAppData,
    getToolActivityLabel: builderAgent.getToolActivityLabel,
    handleMessage: platform.handleMessage,
    listApps: platform.listApps,
    readOpenRouterStream,
    setBuilderBusy: builderUi.setBuilderBusy,
    updateBuilderActivity: builderUi.updateBuilderActivity,
  };
}

boot();
