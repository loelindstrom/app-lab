import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import { readFirebaseE2eProfile, type FirebaseE2eProfile } from "./firebaseProfile";

const firebaseProfile = readFirebaseE2eProfile();
let ownerContext: BrowserContext | null = null;
let joinedContext: BrowserContext | null = null;

test.beforeAll(async ({ browser }) => {
  if (!firebaseProfile) return;
  ownerContext = await browser.newContext();
  joinedContext = await browser.newContext();
});

test.afterAll(async () => {
  await Promise.all([ownerContext?.close(), joinedContext?.close()]);
  ownerContext = null;
  joinedContext = null;
});

test.describe("@firebase source sync", () => {
  test.skip(!firebaseProfile, "Auth-capable Firebase E2E profile is required for Firebase-backed E2E tests.");

  test("queued offline source save syncs to another browser when the owner comes back online", async () => {
    if (!firebaseProfile) throw new Error("Auth-capable Firebase E2E profile is required.");

    const ownerBrowserContext = requireContext(ownerContext);
    const joinedBrowserContext = requireContext(joinedContext);
    const owner = await newCleanWorkspacePage(ownerBrowserContext);
    const joined = await newCleanWorkspacePage(joinedBrowserContext);
    const initialTitle = `E2E initial ${Date.now()}`;
    const offlineTitle = `E2E offline ${Date.now()}`;

    try {
      await configureStorage(owner, firebaseProfile.config, firebaseProfile);
      await createExampleApp(owner);
      await saveSource(owner, htmlForTitle(initialTitle));
      const inviteUrl = await createInvite(owner);

      await joined.goto(inviteUrl);
      await previewAndImportSharedApp(joined);
      await expect(joined.getByText(initialTitle).first()).toBeVisible({ timeout: 15_000 });
      await joined.getByRole("button", { name: "Open", exact: true }).click();
      await expect(joined.getByRole("heading", { name: initialTitle })).toBeVisible();

      await ownerBrowserContext.setOffline(true);
      await saveSource(owner, htmlForTitle(offlineTitle));
      await expect(owner.getByRole("heading", { name: offlineTitle })).toBeVisible();
      await owner.getByRole("button", { name: "‹ Apps" }).click();
      await owner.getByRole("button", { name: "Open", exact: true }).click();
      await expect(owner.getByRole("heading", { name: offlineTitle })).toBeVisible();

      await ownerBrowserContext.setOffline(false);
      await owner.evaluate(() => window.dispatchEvent(new Event("online")));

      await expect(joined.getByRole("heading", { name: offlineTitle })).toBeVisible({ timeout: 15_000 });
    } finally {
      await ownerBrowserContext.setOffline(false);
      await closePages(owner, joined);
    }
  });

  test("queued offline source wins after another browser updates the same app", async () => {
    if (!firebaseProfile) throw new Error("Auth-capable Firebase E2E profile is required.");

    const ownerBrowserContext = requireContext(ownerContext);
    const owner = await newCleanWorkspacePage(ownerBrowserContext);
    const joined = await newCleanWorkspacePage(requireContext(joinedContext));
    const initialTitle = `E2E conflict initial ${Date.now()}`;
    const offlineTitle = `E2E conflict offline ${Date.now()}`;
    const remoteTitle = `E2E conflict remote ${Date.now()}`;

    try {
      await configureStorage(owner, firebaseProfile.config, firebaseProfile);
      await createExampleApp(owner);
      await saveSource(owner, htmlForTitle(initialTitle));
      const inviteUrl = await createInvite(owner);

      await joined.goto(inviteUrl);
      await previewAndImportSharedApp(joined);
      await expect(joined.getByText(initialTitle).first()).toBeVisible({ timeout: 15_000 });
      await joined.getByRole("button", { name: "Open", exact: true }).click();

      await ownerBrowserContext.setOffline(true);
      await saveSource(owner, htmlForTitle(offlineTitle));
      await saveSource(joined, htmlForTitle(remoteTitle));
      await expect(joined.getByRole("heading", { name: remoteTitle })).toBeVisible();

      await ownerBrowserContext.setOffline(false);
      await owner.evaluate(() => window.dispatchEvent(new Event("online")));

      await expect(joined.getByRole("heading", { name: offlineTitle })).toBeVisible({ timeout: 15_000 });
    } finally {
      await ownerBrowserContext.setOffline(false);
      await closePages(owner, joined);
    }
  });

  test("open shared app receives repeated live source updates without reloading", async () => {
    if (!firebaseProfile) throw new Error("Auth-capable Firebase E2E profile is required.");

    const owner = await newCleanWorkspacePage(requireContext(ownerContext));
    const joined = await newCleanWorkspacePage(requireContext(joinedContext));
    const initialTitle = `E2E source initial ${Date.now()}`;

    try {
      await configureStorage(owner, firebaseProfile.config, firebaseProfile);
      await createExampleApp(owner);
      await saveSource(owner, htmlForTitle(initialTitle));
      const inviteUrl = await createInvite(owner);

      await joined.goto(inviteUrl);
      await previewAndImportSharedApp(joined);
      await expect(joined.getByText(initialTitle).first()).toBeVisible({ timeout: 15_000 });
      await joined.getByRole("button", { name: "Open", exact: true }).click();
      await expect(joined.getByRole("heading", { name: initialTitle })).toBeVisible();

      for (const title of [`E2E source one ${Date.now()}`, `E2E source two ${Date.now()}`, `E2E source three ${Date.now()}`]) {
        await saveSource(owner, htmlForTitle(title));
        await expect(joined.getByRole("heading", { name: title })).toBeVisible({ timeout: 15_000 });
      }
    } finally {
      await closePages(owner, joined);
    }
  });

  test("queued offline app data save syncs to another browser when the owner comes back online", async () => {
    if (!firebaseProfile) throw new Error("Auth-capable Firebase E2E profile is required.");

    const ownerBrowserContext = requireContext(ownerContext);
    const owner = await newCleanWorkspacePage(ownerBrowserContext);
    const joined = await newCleanWorkspacePage(requireContext(joinedContext));

    try {
      await configureStorage(owner, firebaseProfile.config, firebaseProfile);
      await createExampleApp(owner);
      const inviteUrl = await createInvite(owner);

      await joined.goto(inviteUrl);
      await previewAndImportSharedApp(joined);
      await expect(joined.getByText("Example App").first()).toBeVisible({ timeout: 15_000 });
      await joined.getByRole("button", { name: "Open", exact: true }).click();
      await expect(appFrame(joined).getByRole("heading", { name: "Example App" })).toBeVisible();

      await addExampleItem(owner, "Online item");
      await expect(appFrame(joined).getByText("Online item")).toBeVisible({ timeout: 15_000 });
      await expect(appFrame(owner).getByText("Online item")).toBeVisible();

      await ownerBrowserContext.setOffline(true);
      await addExampleItem(owner, "Offline item");
      await expect(appFrame(owner).getByText("Offline item")).toBeVisible();
      await owner.getByRole("button", { name: "‹ Apps" }).click();
      await owner.getByRole("button", { name: "Open", exact: true }).click();
      await expect(appFrame(owner).getByText("Offline item")).toBeVisible();

      await ownerBrowserContext.setOffline(false);
      await owner.evaluate(() => window.dispatchEvent(new Event("online")));

      await expect(appFrame(joined).getByText("Offline item")).toBeVisible({ timeout: 15_000 });
    } finally {
      await ownerBrowserContext.setOffline(false);
      await closePages(owner, joined);
    }
  });

  test("open shared app receives repeated live app data updates without reloading", async () => {
    if (!firebaseProfile) throw new Error("Auth-capable Firebase E2E profile is required.");

    const owner = await newCleanWorkspacePage(requireContext(ownerContext));
    const joined = await newCleanWorkspacePage(requireContext(joinedContext));

    try {
      await configureStorage(owner, firebaseProfile.config, firebaseProfile);
      await createExampleApp(owner);
      const inviteUrl = await createInvite(owner);

      await joined.goto(inviteUrl);
      await previewAndImportSharedApp(joined);
      await expect(joined.getByText("Example App").first()).toBeVisible({ timeout: 15_000 });
      await joined.getByRole("button", { name: "Open", exact: true }).click();
      await expect(appFrame(joined).getByRole("heading", { name: "Example App" })).toBeVisible();

      for (const item of ["Live one", "Live two", "Live three"]) {
        await addExampleItem(owner, item);
        await expect(appFrame(owner).getByText(item, { exact: true })).toBeVisible();
        await expect(appFrame(joined).getByText(item, { exact: true })).toBeVisible({ timeout: 15_000 });
      }
    } finally {
      await closePages(owner, joined);
    }
  });

  test("multiple offline app data edits keep updating locally before sync resumes", async () => {
    if (!firebaseProfile) throw new Error("Auth-capable Firebase E2E profile is required.");

    const ownerBrowserContext = requireContext(ownerContext);
    const owner = await newCleanWorkspacePage(ownerBrowserContext);

    try {
      await configureStorage(owner, firebaseProfile.config, firebaseProfile);
      await createExampleApp(owner);

      for (const item of ["One", "Two", "Three"]) {
        await addExampleItem(owner, item);
        await expect(appFrame(owner).getByText(item, { exact: true })).toBeVisible();
      }

      await ownerBrowserContext.setOffline(true);

      await deleteExampleItem(owner, "One");
      await expect(appFrame(owner).getByText("One", { exact: true })).toBeHidden();

      await addExampleItem(owner, "Four");
      await expect(appFrame(owner).getByText("Four", { exact: true })).toBeVisible();

      await deleteExampleItem(owner, "Two");
      await expect(appFrame(owner).getByText("Two", { exact: true })).toBeHidden();
      await expect(appFrame(owner).getByText("Three", { exact: true })).toBeVisible();
      await expect(appFrame(owner).getByText("Four", { exact: true })).toBeVisible();

      await ownerBrowserContext.setOffline(false);
      await owner.evaluate(() => window.dispatchEvent(new Event("online")));
    } finally {
      await ownerBrowserContext.setOffline(false);
      await closePages(owner);
    }
  });
});

function requireContext(context: BrowserContext | null): BrowserContext {
  if (!context) throw new Error("Firebase E2E browser context was not initialized.");
  return context;
}

async function newCleanWorkspacePage(context: BrowserContext): Promise<Page> {
  await context.setOffline(false);
  const page = await context.newPage();
  await page.goto("/");
  await page.evaluate(async () => {
    localStorage.removeItem("app-lab-workspace-sync-v1");
    await Promise.all([
      clearObjectStores("app-lab-v2", ["apps_registry", "apps_data"]),
      clearObjectStores("app-lab-sync-queue-v1", ["sync_queue"]),
    ]);

    async function clearObjectStores(databaseName: string, storeNames: string[]): Promise<void> {
      if (indexedDB.databases) {
        const databases = await indexedDB.databases();
        if (!databases.some((database) => database.name === databaseName)) return;
      }
      const db = await new Promise<IDBDatabase>((resolve, reject) => {
        const request = indexedDB.open(databaseName);
        request.onerror = () => reject(request.error ?? new Error(`Could not open ${databaseName}.`));
        request.onsuccess = () => resolve(request.result);
      });
      const existingStoreNames = storeNames.filter((storeName) => db.objectStoreNames.contains(storeName));
      if (!existingStoreNames.length) {
        db.close();
        return;
      }
      await new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(existingStoreNames, "readwrite");
        for (const storeName of existingStoreNames) {
          transaction.objectStore(storeName).clear();
        }
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error ?? new Error(`Could not clear ${databaseName}.`));
        transaction.onabort = () => reject(transaction.error ?? new Error(`Could not clear ${databaseName}.`));
      });
      db.close();
    }
  });
  await page.reload();
  return page;
}

async function closePages(...pages: Page[]): Promise<void> {
  await Promise.all(pages.map((page) => page.close().catch(() => {})));
}

async function configureStorage(page: Page, config: Record<string, string>, profile: FirebaseE2eProfile) {
  await page.evaluate(({ firebaseConfig, profile }) => {
    const now = new Date().toISOString();
    const databaseUrl = String(firebaseConfig.databaseURL ?? "").replace(/\/+$/, "");
    const raw = localStorage.getItem("app-lab-workspace-sync-v1");
    const existing = raw ? JSON.parse(raw) : {};
    localStorage.setItem(
      "app-lab-workspace-sync-v1",
      JSON.stringify({
        schemaVersion: 1,
        workspaceId: typeof existing.workspaceId === "string" ? existing.workspaceId : `workspace_${crypto.randomUUID()}`,
        manifestRoom: existing.manifestRoom,
        apps: existing.apps && typeof existing.apps === "object" ? existing.apps : {},
        deletedApps: existing.deletedApps && typeof existing.deletedApps === "object" ? existing.deletedApps : {},
        storageProfile: {
          accessModel: profile.accessModel,
          profileId: `profile_${crypto.randomUUID()}`,
          provider: "firebase-rtdb",
          displayName: "E2E Firebase",
          databaseUrl,
          firebaseConfig: { ...firebaseConfig, databaseURL: databaseUrl },
          ownerSetupSecret: profile.ownerSetupSecret,
          createdAt: now,
          updatedAt: now,
        },
        updatedAt: now,
      }),
    );
  }, { firebaseConfig: config, profile });
  await page.reload();
}

async function createExampleApp(page: Page) {
  await page.evaluate(() => {
    localStorage.setItem(
      "app-lab-builder-preferences-v1",
      JSON.stringify({ activeProfileId: "builtin-guided-v1", conversationMemory: "short", version: 1 }),
    );
  });
  await page.getByRole("button", { name: "Create new app" }).click();
  await expect(page.getByRole("button", { name: "Toggle source" })).toBeVisible({ timeout: 30_000 });
}

async function addExampleItem(page: Page, title: string) {
  const frame = appFrame(page);
  await frame.getByRole("button", { name: "New item" }).click();
  await frame.getByLabel("Title").fill(title);
  await frame.getByRole("button", { name: "Save" }).click();
  await expect(frame.getByText(title, { exact: true })).toBeVisible();
}

async function deleteExampleItem(page: Page, title: string) {
  const frame = appFrame(page);
  await frame.locator("details", { hasText: title }).getByRole("button", { name: "Edit item" }).click();
  await frame.getByRole("button", { name: "Delete this item" }).click();
  await frame.getByRole("button", { name: "Delete" }).click();
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

async function previewAndImportSharedApp(page: Page) {
  const dialog = page.getByRole("dialog", { name: "Import shared app" });
  await dialog.getByRole("button", { name: "Preview app" }).click();
  await expect(dialog.getByText("Preview loaded. Review before importing.")).toBeVisible({ timeout: 15_000 });
  await dialog.getByRole("button", { name: "Import", exact: true }).click();
  await expect(dialog).toBeHidden({ timeout: 15_000 });
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
