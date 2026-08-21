import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  expect: { timeout: 10_000 },
  outputDir: "/tmp/app-lab-ai-experiment-playwright",
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 5"] } },
  ],
  testDir: ".",
  testMatch: "browser.e2e.ts",
  timeout: 60_000,
  use: {
    baseURL: "http://127.0.0.1:5178",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "pnpm exec vite --host 127.0.0.1 --port 5178",
    reuseExistingServer: false,
    url: "http://127.0.0.1:5178",
  },
  workers: 1,
});
