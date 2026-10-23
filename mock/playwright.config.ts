import { fileURLToPath } from "node:url";
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.pw.ts",
  outputDir: "../test-results/mock",
  timeout: 30_000,
  workers: 1,
  use: { baseURL: "http://127.0.0.1:5180", browserName: "chromium" },
  projects: [
    { name: "phone", use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
    { name: "desktop", use: { viewport: { width: 1440, height: 960 } } },
  ],
  webServer: {
    command: "pnpm exec vite --host 127.0.0.1 --port 5180 --strictPort",
    cwd: fileURLToPath(new URL("..", import.meta.url)),
    url: "http://127.0.0.1:5180/mock/",
    reuseExistingServer: true,
  },
});
