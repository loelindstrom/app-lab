import { createBuilderAgent } from "./builder/agent.js";
import { createBuilderUi } from "./builder/ui.js";
import { MENU_APP_ID, createPlatform } from "./platform.js";
import { createShell, getDomBindings } from "./shell.js";

export function createAppLab() {
  // Section: Composition root
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

  // Section: Boot lifecycle
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

  // Section: Host event wiring
  function bindHostEvents() {
    dom.homeButton.addEventListener("click", shell.handleHomeButton);
    dom.newAppButton.addEventListener("click", shell.createBlankApp);
    dom.toggleBuilderButton.addEventListener("click", builderUi.toggleBuilder);
    dom.viewSourceButton.addEventListener("click", shell.openSourceViewer);
    dom.mobileSourceButton.addEventListener("click", shell.openSourceViewer);
    dom.closeSourceButton.addEventListener("click", shell.closeSourceViewer);
    dom.mobileBuilderToggle.addEventListener("click", () => builderUi.toggleBuilder({ focusInput: false }));
    dom.closeBuilderButton.addEventListener("click", builderUi.closeBuilder);
    dom.openSettingsButton.addEventListener("click", shell.openSettings);
    dom.closeMenuButton.addEventListener("click", shell.closeSideMenu);
    dom.sideMenuSettingsButton.addEventListener("click", shell.openSettingsFromMenu);
    dom.builderForm.addEventListener("submit", builderUi.submitBuilderMessage);
    dom.settingsForm.addEventListener("submit", shell.submitSettings);
    window.addEventListener("message", platform.handleMessage);
    dom.iframe.addEventListener("load", platform.handleIframeLoad);
  }

  return {
    boot,
    builderAgent,
    builderUi,
    dom,
    platform,
    shell,
    start() {
      bindHostEvents();
      return boot();
    },
  };
}
