import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import { readFirebaseE2eProfile, type FirebaseE2eProfile } from "./firebaseProfile";
import { createSyncTestApp } from "./syncTestApp";

const firebaseProfile = readFirebaseE2eProfile();
let primaryContext: BrowserContext | null = null;
let secondaryContext: BrowserContext | null = null;

test.beforeAll(async ({ browser }) => {
  if (!firebaseProfile) return;
  primaryContext = await browser.newContext();
  secondaryContext = await browser.newContext();
});

test.afterAll(async () => {
  await Promise.all([primaryContext?.close(), secondaryContext?.close()]);
  primaryContext = null;
  secondaryContext = null;
});

test.describe("@firebase sync management", () => {
  test.skip(!firebaseProfile, "Auth-capable Firebase E2E profile is required for Firebase-backed tests.");

  test("exports recovery material that restores apps in a clean browser", async () => {
    if (!firebaseProfile) throw new Error("Auth-capable Firebase E2E profile is required.");

    const owner = await newCleanWorkspacePage(requireContext(primaryContext));
    const restored = await newCleanWorkspacePage(requireContext(secondaryContext));
    const title = `E2E recovery ${Date.now()}`;

    try {
      await configureStorage(owner, firebaseProfile.config, firebaseProfile);
      await createSyncTestApp(owner);
      await saveSource(owner, htmlForTitle(title));
      await waitForSyncQueueDrained(owner);

      const recoveryText = await exportRecoveryText(owner);

      await restoreWorkspace(restored, recoveryText);

      await expect(restored.getByText(title).first()).toBeVisible({ timeout: 15_000 });
    } finally {
      await closePages(owner, restored);
    }
  });

  test("owner deletion tombstones a shared app for active collaborators", async () => {
    if (!firebaseProfile) throw new Error("Auth-capable Firebase E2E profile is required.");

    const owner = await newCleanWorkspacePage(requireContext(primaryContext));
    const joined = await newCleanWorkspacePage(requireContext(secondaryContext));
    const title = `E2E delete ${Date.now()}`;

    try {
      await configureStorage(owner, firebaseProfile.config, firebaseProfile);
      await createSyncTestApp(owner);
      await saveSource(owner, htmlForTitle(title));
      const inviteUrl = await createInvite(owner);

      await joined.goto(inviteUrl);
      await previewAndImportSharedApp(joined);
      await expect(joined.getByText(title).first()).toBeVisible();
      await joined.getByRole("button", { name: "Open", exact: true }).click();
      await expect(joined.getByRole("heading", { name: title })).toBeVisible();

      await deleteCurrentOwnerApp(owner, title);

      const syncWarning = joined.getByRole("button", { name: /Open sync status: This shared app was deleted by its owner/ });
      await expect(syncWarning).toBeVisible({ timeout: 15_000 });
      await syncWarning.click();
      await expect(joined.getByText("This shared app was deleted by its owner.")).toBeVisible();
    } finally {
      await closePages(owner, joined);
    }
  });
});

test.describe("@firebase workspace sync management", () => {
  test.describe.configure({ timeout: 60_000 });

  test.skip(!firebaseProfile, "Auth-capable Firebase E2E profile is required for workspace-sync E2E tests.");

  test("syncs apps created after workspace recovery in both browsers", async () => {
    if (!firebaseProfile) throw new Error("Auth-capable Firebase E2E profile is required.");

    const original = await newCleanWorkspacePage(requireContext(primaryContext));
    const synced = await newCleanWorkspacePage(requireContext(secondaryContext));
    const initialTitle = `E2E workspace initial ${Date.now()}`;
    const originalLaterTitle = `E2E workspace original ${Date.now()}`;
    const syncedLaterTitle = `E2E workspace synced ${Date.now()}`;

    try {
      await configureStorage(original, firebaseProfile.config, firebaseProfile);
      await createSyncTestApp(original);
      await saveSource(original, htmlForTitle(initialTitle));
      await waitForSyncQueueDrained(original);

      const recoveryText = await exportRecoveryText(original);

      await restoreWorkspace(synced, recoveryText);
      await expect(synced.getByText(initialTitle).first()).toBeVisible({ timeout: 15_000 });

      await original.getByRole("button", { name: "‹ Apps" }).click();
      await createSyncTestApp(original);
      await saveSource(original, htmlForTitle(originalLaterTitle));

      await expect(synced.getByText(originalLaterTitle).first()).toBeVisible({ timeout: 20_000 });

      await createSyncTestApp(synced);
      await saveSource(synced, htmlForTitle(syncedLaterTitle));

      await original.getByRole("button", { name: "‹ Apps" }).click();
      await expect(original.getByText(syncedLaterTitle).first()).toBeVisible({ timeout: 20_000 });
    } finally {
      await closePages(original, synced);
    }
  });

  test("merges offline workspace app additions with remote app additions", async () => {
    if (!firebaseProfile) throw new Error("Auth-capable Firebase E2E profile is required.");

    const originalContext = requireContext(primaryContext);
    const offlineContext = requireContext(secondaryContext);
    const original = await newCleanWorkspacePage(originalContext);
    const offline = await newCleanWorkspacePage(offlineContext);
    const initialTitle = `E2E manifest base ${Date.now()}`;
    const originalLaterTitle = `E2E manifest remote ${Date.now()}`;
    const offlineLaterTitle = `E2E manifest offline ${Date.now()}`;

    try {
      await configureStorage(original, firebaseProfile.config, firebaseProfile);
      await createSyncTestApp(original);
      await saveSource(original, htmlForTitle(initialTitle));
      await waitForSyncQueueDrained(original);

      const recoveryText = await exportRecoveryText(original);

      await restoreWorkspace(offline, recoveryText);
      await expectLauncherApp(offline, initialTitle);

      await offlineContext.setOffline(true);

      await returnToLauncher(original);
      await createSyncTestApp(original);
      await saveSource(original, htmlForTitle(originalLaterTitle));
      await expectLauncherApp(original, originalLaterTitle);
      await waitForSyncQueueDrained(original);

      await createSyncTestApp(offline);
      await saveSource(offline, htmlForTitle(offlineLaterTitle));
      await expectLauncherApp(offline, offlineLaterTitle);

      await offlineContext.setOffline(false);
      await offline.evaluate(() => window.dispatchEvent(new Event("online")));
      await waitForSyncQueueDrained(offline, 45_000);

      await expectLauncherApp(offline, originalLaterTitle, 30_000);
      await expectLauncherApp(original, offlineLaterTitle, 30_000);
    } finally {
      await offlineContext.setOffline(false);
      await closePages(original, offline);
    }
  });

  test("preserves remote workspace tombstones when a stale offline browser adds another app", async () => {
    if (!firebaseProfile) throw new Error("Auth-capable Firebase E2E profile is required.");

    const originalContext = requireContext(primaryContext);
    const staleContext = requireContext(secondaryContext);
    const original = await newCleanWorkspacePage(originalContext);
    const stale = await newCleanWorkspacePage(staleContext);
    const deletedTitle = `E2E manifest delete ${Date.now()}`;
    const preservedTitle = `E2E manifest preserve ${Date.now()}`;

    try {
      await configureStorage(original, firebaseProfile.config, firebaseProfile);
      await createSyncTestApp(original);
      await saveSource(original, htmlForTitle(deletedTitle));
      await waitForSyncQueueDrained(original);

      const recoveryText = await exportRecoveryText(original);

      await restoreWorkspace(stale, recoveryText);
      await expectLauncherApp(stale, deletedTitle, 30_000);

      await staleContext.setOffline(true);

      await deleteCurrentOwnerApp(original, deletedTitle);
      await waitForSyncQueueDrained(original);

      await createSyncTestApp(stale);
      await saveSource(stale, htmlForTitle(preservedTitle));
      await expectLauncherApp(stale, preservedTitle);

      await staleContext.setOffline(false);
      await stale.evaluate(() => window.dispatchEvent(new Event("online")));
      await waitForSyncQueueDrained(stale, 45_000);

      await expectLauncherApp(stale, preservedTitle, 30_000);
      await expectLauncherApp(original, preservedTitle, 30_000);
      await expectLauncherAppAbsent(stale, deletedTitle, 30_000);
      await expectLauncherAppAbsent(original, deletedTitle, 30_000);
    } finally {
      await staleContext.setOffline(false);
      await closePages(original, stale);
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

async function returnToLauncher(page: Page) {
  await page.bringToFront();
  await page.evaluate(() => window.dispatchEvent(new Event("focus")));
  const appsButton = page.getByRole("button", { name: "‹ Apps" });
  if (await appsButton.isVisible().catch(() => false)) {
    await appsButton.click();
  }
}

async function expectLauncherApp(page: Page, title: string, timeout = 20_000) {
  await returnToLauncher(page);
  await expect(page.locator("article", { hasText: title })).toBeVisible({ timeout });
}

async function expectLauncherAppAbsent(page: Page, title: string, timeout = 20_000) {
  await returnToLauncher(page);
  await expect(page.locator("article", { hasText: title })).toHaveCount(0, { timeout });
}

async function waitForSyncQueueDrained(page: Page, timeout = 30_000) {
  await expect.poll(() => syncQueueItemCount(page), { timeout }).toBe(0);
}

async function syncQueueItemCount(page: Page): Promise<number> {
  return page.evaluate(async () => {
    const db = await new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open("app-lab-sync-queue-v1", 1);
      request.onerror = () => reject(request.error ?? new Error("Could not open sync queue."));
      request.onsuccess = () => resolve(request.result);
    });
    try {
      if (!db.objectStoreNames.contains("sync_queue")) return 0;
      return await new Promise<number>((resolve, reject) => {
        const request = db.transaction("sync_queue", "readonly").objectStore("sync_queue").count();
        request.onerror = () => reject(request.error ?? new Error("Could not read sync queue."));
        request.onsuccess = () => resolve(request.result);
      });
    } finally {
      db.close();
    }
  });
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

async function exportRecoveryText(page: Page): Promise<string> {
  await page.getByRole("button", { name: "Open settings" }).click();
  await page.getByRole("button", { name: "Sync device" }).click();
  await page.getByRole("button", { name: "Generate sync material" }).click();
  await expect(page.getByText("Sync material ready.")).toBeVisible({ timeout: 15_000 });
  const recoveryBox = page.getByPlaceholder("Generated workspace sync material will appear here.");
  await expect.poll(() => recoveryBox.inputValue()).toContain("applab-recovery:");
  const recoveryText = await recoveryBox.inputValue();
  await page.getByRole("button", { name: /Back/ }).click();
  return recoveryText;
}

async function restoreWorkspace(page: Page, recoveryText: string) {
  await page.getByRole("button", { name: "Open settings" }).click();
  await page.getByRole("button", { name: "Sync device" }).click();
  await page.getByPlaceholder("Paste workspace sync material").fill(recoveryText);
  await page.getByRole("button", { name: "Sync this device" }).click();
  await expect(page.getByText("Workspace synced. Apps are being hydrated from their rooms.")).toBeVisible({ timeout: 15_000 });
  await page.getByRole("button", { name: /Back/ }).click();
}

async function deleteCurrentOwnerApp(page: Page, title: string) {
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "‹ Apps" }).click();
  await page.getByRole("button", { name: `Open app actions for ${title}` }).click();
  await page.getByRole("dialog", { name: "App actions" }).getByRole("button", { name: "Delete", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "App actions" })).toBeHidden({ timeout: 15_000 });
  await expect(page.locator("article", { hasText: title })).toHaveCount(0);
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
