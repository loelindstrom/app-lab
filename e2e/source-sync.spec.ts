import { expect, test, type Page } from "@playwright/test";

const firebaseConfig = readFirebaseSmokeConfig();

test.describe("source sync", () => {
  test.skip(!firebaseConfig, "APP_LAB_FIREBASE_SMOKE_CONFIG is required for Firebase-backed E2E tests.");

  test("queued offline source save syncs to another browser when the owner comes back online", async ({ browser }) => {
    if (!firebaseConfig) throw new Error("APP_LAB_FIREBASE_SMOKE_CONFIG is required.");

    const ownerContext = await browser.newContext();
    const joinedContext = await browser.newContext();
    const owner = await ownerContext.newPage();
    const joined = await joinedContext.newPage();
    const initialTitle = `E2E initial ${Date.now()}`;
    const offlineTitle = `E2E offline ${Date.now()}`;

    await owner.goto("/");
    await configureStorage(owner, firebaseConfig);
    await createExampleApp(owner);
    await saveSource(owner, htmlForTitle(initialTitle));
    const inviteUrl = await createInvite(owner);

    await joined.goto(inviteUrl);
    await joined.getByRole("button", { name: "Import", exact: true }).click();
    await expect(joined.getByText(initialTitle).first()).toBeVisible();
    await joined.getByRole("button", { name: "Open", exact: true }).click();
    await expect(joined.getByRole("heading", { name: initialTitle })).toBeVisible();

    await ownerContext.setOffline(true);
    await saveSource(owner, htmlForTitle(offlineTitle));
    await expect(owner.getByRole("heading", { name: offlineTitle })).toBeVisible();
    await owner.getByRole("button", { name: "‹ Apps" }).click();
    await owner.getByRole("button", { name: "Open", exact: true }).click();
    await expect(owner.getByRole("heading", { name: offlineTitle })).toBeVisible();

    await ownerContext.setOffline(false);
    await owner.evaluate(() => window.dispatchEvent(new Event("online")));

    await expect(joined.getByRole("heading", { name: offlineTitle })).toBeVisible({ timeout: 15_000 });

    await ownerContext.close();
    await joinedContext.close();
  });

  test("open shared app receives repeated live source updates without reloading", async ({ browser }) => {
    if (!firebaseConfig) throw new Error("APP_LAB_FIREBASE_SMOKE_CONFIG is required.");

    const ownerContext = await browser.newContext();
    const joinedContext = await browser.newContext();
    const owner = await ownerContext.newPage();
    const joined = await joinedContext.newPage();
    const initialTitle = `E2E source initial ${Date.now()}`;

    await owner.goto("/");
    await configureStorage(owner, firebaseConfig);
    await createExampleApp(owner);
    await saveSource(owner, htmlForTitle(initialTitle));
    const inviteUrl = await createInvite(owner);

    await joined.goto(inviteUrl);
    await joined.getByRole("button", { name: "Import", exact: true }).click();
    await expect(joined.getByText(initialTitle).first()).toBeVisible();
    await joined.getByRole("button", { name: "Open", exact: true }).click();
    await expect(joined.getByRole("heading", { name: initialTitle })).toBeVisible();

    for (const title of [`E2E source one ${Date.now()}`, `E2E source two ${Date.now()}`, `E2E source three ${Date.now()}`]) {
      await saveSource(owner, htmlForTitle(title));
      await expect(joined.getByRole("heading", { name: title })).toBeVisible({ timeout: 15_000 });
    }

    await ownerContext.close();
    await joinedContext.close();
  });

  test("queued offline app data save syncs to another browser when the owner comes back online", async ({ browser }) => {
    if (!firebaseConfig) throw new Error("APP_LAB_FIREBASE_SMOKE_CONFIG is required.");

    const ownerContext = await browser.newContext();
    const joinedContext = await browser.newContext();
    const owner = await ownerContext.newPage();
    const joined = await joinedContext.newPage();

    await owner.goto("/");
    await configureStorage(owner, firebaseConfig);
    await createExampleApp(owner);
    const inviteUrl = await createInvite(owner);

    await joined.goto(inviteUrl);
    await joined.getByRole("button", { name: "Import", exact: true }).click();
    await expect(joined.getByText("Example App").first()).toBeVisible();
    await joined.getByRole("button", { name: "Open", exact: true }).click();
    await expect(appFrame(joined).getByRole("heading", { name: "Sandbox checklist" })).toBeVisible();

    await appFrame(owner).getByLabel("New item").fill("Online item");
    await appFrame(owner).getByRole("button", { name: "Add" }).click();
    await expect(appFrame(joined).getByText("Online item")).toBeVisible();
    await expect(appFrame(owner).getByText("Online item")).toBeVisible();

    await ownerContext.setOffline(true);
    await appFrame(owner).getByLabel("New item").fill("Offline item");
    await appFrame(owner).getByRole("button", { name: "Add" }).click();
    await expect(appFrame(owner).getByText("Offline item")).toBeVisible();
    await owner.getByRole("button", { name: "‹ Apps" }).click();
    await owner.getByRole("button", { name: "Open", exact: true }).click();
    await expect(appFrame(owner).getByText("Offline item")).toBeVisible();

    await ownerContext.setOffline(false);
    await owner.evaluate(() => window.dispatchEvent(new Event("online")));

    await expect(appFrame(joined).getByText("Offline item")).toBeVisible({ timeout: 15_000 });

    await ownerContext.close();
    await joinedContext.close();
  });

  test("open shared app receives repeated live app data updates without reloading", async ({ browser }) => {
    if (!firebaseConfig) throw new Error("APP_LAB_FIREBASE_SMOKE_CONFIG is required.");

    const ownerContext = await browser.newContext();
    const joinedContext = await browser.newContext();
    const owner = await ownerContext.newPage();
    const joined = await joinedContext.newPage();

    await owner.goto("/");
    await configureStorage(owner, firebaseConfig);
    await createExampleApp(owner);
    const inviteUrl = await createInvite(owner);

    await joined.goto(inviteUrl);
    await joined.getByRole("button", { name: "Import", exact: true }).click();
    await expect(joined.getByText("Example App").first()).toBeVisible();
    await joined.getByRole("button", { name: "Open", exact: true }).click();
    await expect(appFrame(joined).getByRole("heading", { name: "Sandbox checklist" })).toBeVisible();

    for (const item of ["Live one", "Live two", "Live three"]) {
      await appFrame(owner).getByLabel("New item").fill(item);
      await appFrame(owner).getByRole("button", { name: "Add" }).click();
      await expect(appFrame(owner).getByText(item, { exact: true })).toBeVisible();
      await expect(appFrame(joined).getByText(item, { exact: true })).toBeVisible({ timeout: 15_000 });
    }

    await ownerContext.close();
    await joinedContext.close();
  });

  test("multiple offline app data edits keep updating locally before sync resumes", async ({ browser }) => {
    if (!firebaseConfig) throw new Error("APP_LAB_FIREBASE_SMOKE_CONFIG is required.");

    const ownerContext = await browser.newContext();
    const owner = await ownerContext.newPage();

    await owner.goto("/");
    await configureStorage(owner, firebaseConfig);
    await createExampleApp(owner);

    for (const item of ["One", "Two", "Three"]) {
      await appFrame(owner).getByLabel("New item").fill(item);
      await appFrame(owner).getByRole("button", { name: "Add" }).click();
      await expect(appFrame(owner).getByText(item, { exact: true })).toBeVisible();
    }

    await ownerContext.setOffline(true);

    await appFrame(owner).getByRole("button", { name: "Delete" }).first().click();
    await expect(appFrame(owner).getByText("One", { exact: true })).toBeHidden();

    await appFrame(owner).getByLabel("New item").fill("Four");
    await appFrame(owner).getByRole("button", { name: "Add" }).click();
    await expect(appFrame(owner).getByText("Four", { exact: true })).toBeVisible();

    await appFrame(owner).getByRole("button", { name: "Delete" }).first().click();
    await expect(appFrame(owner).getByText("Two", { exact: true })).toBeHidden();
    await expect(appFrame(owner).getByText("Three", { exact: true })).toBeVisible();
    await expect(appFrame(owner).getByText("Four", { exact: true })).toBeVisible();

    await ownerContext.setOffline(false);
    await owner.evaluate(() => window.dispatchEvent(new Event("online")));

    await ownerContext.close();
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

function appFrame(page: Page) {
  return page.frameLocator('iframe[title$=" app"]');
}

function readFirebaseSmokeConfig(): Record<string, string> | null {
  const value = process.env.APP_LAB_FIREBASE_SMOKE_CONFIG;
  if (!value) return null;
  return JSON.parse(value) as Record<string, string>;
}
