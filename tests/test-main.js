import { createAppLab } from "../src/app.js";

const localHosts = new Set(["localhost", "127.0.0.1", "[::1]"]);
const isSmokeHarness = localHosts.has(window.location.hostname)
  && window.location.pathname === "/__app_lab_test__.html";

if (!isSmokeHarness) {
  throw new Error("App Lab test harness can only run from the local smoke-test page.");
}

const app = createAppLab();

window.__appLabTest = {
  addBuilderMessage: app.builderUi.addBuilderMessage,
  getActiveAppData: app.platform.getActiveAppData,
  handleMessage: app.platform.handleMessage,
  listApps: app.platform.listApps,
  prepareSandboxHtml: app.platform.prepareSandboxHtml,
  setBuilderBusy: app.builderUi.setBuilderBusy,
  updateBuilderActivity: app.builderUi.updateBuilderActivity,
};

app.start();
