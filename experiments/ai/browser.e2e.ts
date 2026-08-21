import { expect, test } from "@playwright/test";
import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const configuredRunDirectory = process.env.APP_LAB_AI_EVAL_RUN;
if (!configuredRunDirectory) throw new Error("APP_LAB_AI_EVAL_RUN must point to an existing artifacts/ai-evals run directory.");

const runDirectory = resolve(configuredRunDirectory);
const generatedApps = readdirSync(runDirectory)
  .filter((file) => file.endsWith(".html"))
  .map((file) => ({ profile: file.slice(0, -".html".length), sourceCode: readFileSync(resolve(runDirectory, file), "utf8") }));

test.describe("BuilderAI generated-app browser checks", () => {
  for (const generatedApp of generatedApps) {
    test(`${generatedApp.profile} runs and saves a finished time`, async ({ page }, testInfo) => {
      const sandboxErrors: string[] = [];
      page.on("console", (message) => {
        if (message.type() !== "error") return;
        if (message.location().url.startsWith("about:srcdoc")) sandboxErrors.push(message.text());
      });
      page.on("pageerror", (error) => sandboxErrors.push(error.message));

      await page.goto("/");
      await page.getByRole("button", { name: "Create new app" }).click();
      await page.getByRole("button", { name: "Toggle source" }).click();
      const sourcePanel = page.locator('aside[aria-label="Source"]');
      await sourcePanel.locator("textarea").first().fill(generatedApp.sourceCode);
      await sourcePanel.getByRole("button", { name: "Save" }).click();
      await expect(sourcePanel.getByText("Saved.")).toBeVisible({ timeout: 20_000 });
      await page.getByRole("button", { name: "Toggle source" }).click();

      const sandbox = page.frameLocator('iframe[sandbox="allow-scripts"]');
      await expect(sandbox.locator("body")).not.toBeEmpty();
      const startButton = sandbox.getByRole("button", { name: /start/i }).first();
      await expect(startButton).toBeVisible({ timeout: 10_000 });
      await startButton.click();
      await page.waitForTimeout(350);

      const finishButton = sandbox.getByRole("button", { name: /^finish.*save(?: time)?$/i }).first();
      await expect(finishButton).toBeEnabled();
      await finishButton.click();
      await page.waitForTimeout(100);
      const dialog = sandbox.locator("dialog[open]");
      if (await dialog.isVisible()) {
        await dialog.getByRole("button", { name: /save|finish/i }).last().click();
      }

      await page.screenshot({ fullPage: true, path: resolve(runDirectory, `${generatedApp.profile}-${testInfo.project.name}.png`) });
      let diagnostics = await readDiagnostics();
      for (let attempt = 0; attempt < 20 && diagnostics.persistedSavedTimes === 0; attempt += 1) {
        await page.waitForTimeout(250);
        diagnostics = await readDiagnostics();
      }
      console.log(`${generatedApp.profile} diagnostics: ${JSON.stringify(diagnostics)}`);
      expect(diagnostics.persistedSavedTimes).toBeGreaterThan(0);
      expect(sandboxErrors).toEqual([]);

      async function readDiagnostics() {
        return sandbox.locator("body").evaluate(async () => {
          const runtimeWindow = window as typeof window & {
            Alpine?: { $data: (element: Element) => Record<string, unknown> };
            AppLab?: { getData: (fallback: unknown) => Promise<unknown> };
          };
          const persisted = (await runtimeWindow.AppLab?.getData(null)) as { savedTimes?: unknown[] } | null | undefined;
          const root = document.querySelector("[x-data]");
          const state = root && runtimeWindow.Alpine ? runtimeWindow.Alpine.$data(root) : {};
          return {
            activeTab: state.activeTab ?? null,
            elapsedMs: state.elapsedMs ?? null,
            errorMessage: state.errorMessage ?? null,
            isSaving: state.isSaving ?? null,
            persistedSavedTimes: Array.isArray(persisted?.savedTimes) ? persisted.savedTimes.length : 0,
            stateSavedTimes: Array.isArray(state.savedTimes) ? state.savedTimes.length : 0,
          };
        });
      }
    });
  }
});
