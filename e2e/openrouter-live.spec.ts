import { expect, test, type Page } from "@playwright/test";

const OPENROUTER_LIVE_MODEL = "google/gemini-3-flash-preview";
const MINIMAL_SOURCE = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Live AI Seed</title>
  </head>
  <body><main><h1>Live AI Seed</h1></main></body>
</html>`;

test.use({ trace: "off" });

test.describe("@openrouter BuilderAI live provider", () => {
  test("uses real tool calls to replace the active app source", async ({ page }) => {
    test.setTimeout(120_000);
    const apiKey = process.env.APP_LAB_OPENROUTER_TEST_API_KEY;
    if (!apiKey) throw new Error("APP_LAB_OPENROUTER_TEST_API_KEY is required for the paid OpenRouter E2E test.");

    await page.goto("/");
    await page.evaluate(
      ({ key, model }) => {
        localStorage.setItem("app-lab-ai-config-v1", JSON.stringify({ apiKey: key, model }));
      },
      { key: apiKey, model: OPENROUTER_LIVE_MODEL },
    );
    await page.reload();
    await page.getByRole("button", { name: "Create new app" }).click();
    await saveSource(page, MINIMAL_SOURCE);

    await page.getByRole("button", { name: "Toggle BuilderAI" }).click();
    await page.getByLabel("Message", { exact: true }).fill(
      "Use the tools now. First read the current app source. Then replace it with a complete minimal HTML document whose title and visible h1 are exactly OpenRouter Live Test. Do not ask questions.",
    );
    await page.getByRole("button", { name: "Send message" }).click();

    await expect(
      page.frameLocator('iframe[sandbox="allow-scripts"]').getByRole("heading", { name: "OpenRouter Live Test" }),
    ).toBeVisible({ timeout: 110_000 });
  });
});

async function saveSource(page: Page, sourceCode: string) {
  const sourceToggle = page.getByRole("button", { name: "Toggle source" });
  await sourceToggle.click();
  const sourcePanel = page.locator('aside[aria-label="Source"]');
  await sourcePanel.locator("textarea").first().fill(sourceCode);
  await sourcePanel.getByRole("button", { name: "Save" }).click();
  await expect(sourcePanel.getByText("Saved.")).toBeVisible();
  await sourceToggle.click();
}
