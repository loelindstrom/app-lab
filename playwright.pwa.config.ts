import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e/pwa",
  outputDir: "./artifacts/pwa-test-results",
  timeout: 60_000,
  workers: 1,
  expect: { timeout: 15_000 },
  use: {
    baseURL: "http://127.0.0.1:5186",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "node scripts/pwa-test-server.mjs",
    url: "http://127.0.0.1:5186/app-lab/",
    timeout: 120_000,
    reuseExistingServer: false,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
