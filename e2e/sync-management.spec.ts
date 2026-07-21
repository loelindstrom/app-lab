import { expect, test, type Page } from "@playwright/test";

const firebaseConfig = readFirebaseSmokeConfig();

test.describe("sync management", () => {
  test.skip(!firebaseConfig, "APP_LAB_FIREBASE_SMOKE_CONFIG is required for Firebase-backed E2E tests.");

  test("exports recovery material that restores apps in a clean browser", async ({ browser }) => {
    if (!firebaseConfig) throw new Error("APP_LAB_FIREBASE_SMOKE_CONFIG is required.");

    const ownerContext = await browser.newContext();
    const restoredContext = await browser.newContext();
    const owner = await ownerContext.newPage();
    const restored = await restoredContext.newPage();
    const title = `E2E recovery ${Date.now()}`;

    await owner.goto("/");
    await configureStorage(owner, firebaseConfig);
    await createExampleApp(owner);
    await saveSource(owner, htmlForTitle(title));

    const recoveryText = await exportRecoveryText(owner);

    await restored.goto("/");
    await restoreWorkspace(restored, recoveryText);

    await expect(restored.getByText(title).first()).toBeVisible({ timeout: 15_000 });

    await ownerContext.close();
    await restoredContext.close();
  });

  test("owner deletion tombstones a shared app for active collaborators", async ({ browser }) => {
    if (!firebaseConfig) throw new Error("APP_LAB_FIREBASE_SMOKE_CONFIG is required.");

    const ownerContext = await browser.newContext();
    const joinedContext = await browser.newContext();
    const owner = await ownerContext.newPage();
    const joined = await joinedContext.newPage();
    const title = `E2E delete ${Date.now()}`;

    await owner.goto("/");
    await configureStorage(owner, firebaseConfig);
    await createExampleApp(owner);
    await saveSource(owner, htmlForTitle(title));
    const inviteUrl = await createInvite(owner);

    await joined.goto(inviteUrl);
    await joined.getByRole("button", { name: "Import", exact: true }).click();
    await expect(joined.getByText(title).first()).toBeVisible();
    await joined.getByRole("button", { name: "Open", exact: true }).click();
    await expect(joined.getByRole("heading", { name: title })).toBeVisible();

    await deleteCurrentOwnerApp(owner, title);

    const syncWarning = joined.getByRole("button", { name: /Open sync status: This shared app was deleted by its owner/ });
    await expect(syncWarning).toBeVisible({ timeout: 15_000 });
    await syncWarning.click();
    await expect(joined.getByText("This shared app was deleted by its owner.")).toBeVisible();

    await ownerContext.close();
    await joinedContext.close();
  });
});

async function configureStorage(page: Page, config: Record<string, string>) {
  await page.getByRole("button", { name: "Open settings" }).click();
  await page.getByLabel("Display name").fill("E2E Firebase");
  await page.getByLabel("Firebase web app config").fill(JSON.stringify(config, null, 2));
  await page.getByLabel("Firebase Realtime Database URL").fill(config.databaseURL);
  await page.getByRole("button", { name: "Save storage profile" }).click();
  await expect(page.getByRole("button", { name: "Remove profile" })).toBeVisible();
  await page.getByRole("button", { name: "Close" }).click();
}

async function createExampleApp(page: Page) {
  await page.getByRole("button", { name: "Create new app" }).click();
  await expect(page.getByRole("button", { name: "Toggle source" })).toBeVisible({ timeout: 30_000 });
}

async function saveSource(page: Page, sourceCode: string) {
  const sourceToggle = page.getByRole("button", { name: "Toggle source" });
  await sourceToggle.click();
  const sourcePanel = page.locator('aside[aria-label="Source"]');
  await sourcePanel.locator("textarea").first().fill(sourceCode);
  await sourcePanel.getByRole("button", { name: "Save" }).click();
  await expect(sourcePanel.getByText("Saved.")).toBeVisible();
  await sourceToggle.click();
}

async function createInvite(page: Page): Promise<string> {
  await page.getByRole("button", { name: /^Share / }).click();
  const dialog = page.getByRole("dialog", { name: "Share app" });
  await dialog.getByRole("button", { name: "Create invite" }).click();
  const inviteText = dialog.getByRole("textbox");
  await expect.poll(() => inviteText.inputValue()).toContain("#applab-invite=");
  const inviteUrl = await inviteText.inputValue();
  await dialog.getByRole("button", { name: "Close share dialog" }).click();
  return inviteUrl;
}

async function exportRecoveryText(page: Page): Promise<string> {
  await page.getByRole("button", { name: "Open settings" }).click();
  await page.getByRole("button", { name: "Advanced" }).click();
  await page.getByRole("button", { name: "Export recovery text" }).click();
  await expect(page.getByText("Recovery material ready.")).toBeVisible({ timeout: 15_000 });
  const recoveryBox = page.getByPlaceholder("Exported recovery material will appear here.");
  await expect.poll(() => recoveryBox.inputValue()).toContain("applab-recovery:");
  const recoveryText = await recoveryBox.inputValue();
  await page.getByRole("button", { name: "Close" }).click();
  return recoveryText;
}

async function restoreWorkspace(page: Page, recoveryText: string) {
  await page.getByRole("button", { name: "Open settings" }).click();
  await page.getByRole("button", { name: "Restore device" }).click();
  await page.getByPlaceholder("Paste workspace recovery material").fill(recoveryText);
  await page.getByRole("button", { name: "Restore workspace metadata" }).click();
}

async function deleteCurrentOwnerApp(page: Page, title: string) {
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "‹ Apps" }).click();
  await page.getByRole("button", { name: `Edit ${title}` }).click();
  await page.getByRole("dialog", { name: "Edit app" }).getByRole("button", { name: "Delete", exact: true }).click();
  await expect(page.getByText(title)).not.toBeVisible({ timeout: 15_000 });
}

function htmlForTitle(title: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${title}</title>
  </head>
  <body style="font-family: system-ui; padding: 24px">
    <h1>${title}</h1>
  </body>
</html>`;
}

function readFirebaseSmokeConfig(): Record<string, string> | null {
  const value = process.env.APP_LAB_FIREBASE_SMOKE_CONFIG;
  if (!value) return null;
  return JSON.parse(value) as Record<string, string>;
}
