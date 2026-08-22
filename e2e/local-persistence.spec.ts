import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import { readFirebaseE2eProfile, type FirebaseE2eProfile } from "./firebaseProfile";
import { addSyncTestItem, createSyncTestApp, SYNC_TEST_APP_TITLE } from "./syncTestApp";

const firebaseProfile = readFirebaseE2eProfile();

test.describe("local app persistence", () => {
  test("keeps the built-in board data after returning to the launcher", async ({ page }) => {
    await page.setViewportSize({ height: 844, width: 390 });
    await page.goto("/");
    await page.evaluate(async () => {
      indexedDB.deleteDatabase("app-lab-v2");
      indexedDB.deleteDatabase("app-lab-sync-queue-v1");
      localStorage.clear();
    });
    await page.reload();

    await createOpinionatedBoard(page);
    const frame = appFrame(page);
    await expect(frame.getByRole("heading", { name: "Active notes" })).toBeVisible();

    const boardViewport = frame.locator("[data-board-scroll]");
    const shareDragHandle = frame.getByRole("button", { name: "Drag Share live updates to reorder" });
    const viewportBounds = await boardViewport.boundingBox();
    if (!viewportBounds) throw new Error("Board viewport is not visible");

    await shareDragHandle.dragTo(boardViewport, {
      targetPosition: { x: viewportBounds.width - 2, y: viewportBounds.height - 2 }
    });
    await expect(frame.locator("article h3").last()).toHaveText("Share live updates");

    await shareDragHandle.dragTo(boardViewport, { targetPosition: { x: 2, y: 2 } });
    await expect(frame.locator("article h3").first()).toHaveText("Share live updates");

    await shareDragHandle.dragTo(page.locator("footer").getByRole("group", { name: "App tools" }));
    await expect(frame.locator("article h3").last()).toHaveText("Share live updates");

    await shareDragHandle.dragTo(boardViewport, { targetPosition: { x: 2, y: 2 } });
    await expect(frame.locator("article h3").first()).toHaveText("Share live updates");

    await addBoardNote(page, "Example persisted item", "This description should persist.");

    await page.getByRole("button", { name: "‹ Apps" }).click();
    await page.getByRole("button", { name: "Open", exact: true }).click();

    await expect(frame.getByRole("heading", { name: "Active notes" })).toBeVisible();
    await expect(frame.locator("article h3").first()).toHaveText("Example persisted item");
    await expect(frame.locator("article h3").nth(1)).toHaveText("Share live updates");

    const persistedArticle = frame.locator("article", { hasText: "Example persisted item" });
    const collapseButton = frame.getByRole("button", { name: "Collapse Example persisted item" });
    await expect(collapseButton.locator('svg[data-direction="up"]')).toBeVisible();
    await persistedArticle.locator("[data-note-toggle]").click();
    await expect(frame.getByText("This description should persist.", { exact: true })).toBeHidden();
    const expandButton = frame.getByRole("button", { name: "Expand Example persisted item" });
    await expect(expandButton.locator('svg[data-direction="down"]')).toBeVisible();
    await expandButton.click();
    await expect(frame.getByText("This description should persist.", { exact: true })).toBeVisible();

    await archiveBoardNote(page, "Example persisted item");
    await archiveBoardNote(page, "Share live updates");
    await frame.getByRole("button", { name: "Archived" }).click();
    await frame.getByRole("button", { name: "Move Share live updates up" }).click();
    await expect(frame.locator("article h3").first()).toHaveText("Share live updates");
    await frame.getByRole("button", { name: "Delete Example persisted item" }).click();
    await frame.getByRole("button", { name: "Delete", exact: true }).click();
    await expect(frame.getByText("Example persisted item", { exact: true })).toBeHidden();
  });

  test("keeps source and app data after returning to the launcher", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(async () => {
      indexedDB.deleteDatabase("app-lab-v2");
      indexedDB.deleteDatabase("app-lab-sync-queue-v1");
      localStorage.clear();
    });
    await page.reload();

    await createOpinionatedBoard(page);

    await saveSource(page, htmlForChecklistTitle("Persisted Source"));
    await expect(appFrame(page).getByRole("heading", { name: "Persisted Source" })).toBeVisible();

    await appFrame(page).getByLabel("New item").fill("Persisted item");
    await appFrame(page).getByRole("button", { name: "Add" }).click();
    await expect(appFrame(page).getByText("Persisted item")).toBeVisible();
    await expect(appFrame(page).locator("#status")).toHaveText("Saved.");

    await page.getByRole("button", { name: "‹ Apps" }).click();
    await page.getByRole("button", { name: "Open", exact: true }).click();

    await expect(appFrame(page).getByRole("heading", { name: "Persisted Source" })).toBeVisible();
    await expect(appFrame(page).getByText("Persisted item")).toBeVisible();
  });

  test("runs normal Alpine expressions and saves Alpine state objects", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(async () => {
      indexedDB.deleteDatabase("app-lab-v2");
      indexedDB.deleteDatabase("app-lab-sync-queue-v1");
      localStorage.clear();
    });
    await page.reload();

    await createOpinionatedBoard(page);
    await saveSource(page, htmlForNormalAlpine());

    await expect(appFrame(page).getByRole("heading", { name: "Normal Alpine" })).toBeVisible();
    await expect(appFrame(page).getByText("Empty")).toBeVisible();

    await appFrame(page).getByLabel("Name").fill("Ada");
    await expect(appFrame(page).getByText("Hello Ada")).toBeVisible();
    await expect(appFrame(page).locator("#name-status")).toHaveClass(/ready/);

    await appFrame(page).getByRole("button", { name: "Save" }).click();
    await expect(appFrame(page).getByText("Saved.")).toBeVisible();

    await page.getByRole("button", { name: "‹ Apps" }).click();
    await page.getByRole("button", { name: "Open", exact: true }).click();

    await expect(appFrame(page).getByText("Hello Ada")).toBeVisible();
    await expect(appFrame(page).locator("#name-status")).toHaveClass(/ready/);
  });

  test("reports blocked form submissions in the App Lab console", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(async () => {
      indexedDB.deleteDatabase("app-lab-v2");
      indexedDB.deleteDatabase("app-lab-sync-queue-v1");
      localStorage.clear();
    });
    await page.reload();

    await createOpinionatedBoard(page);
    await saveSource(page, htmlWithUnsupportedForm());
    await appFrame(page).getByRole("button", { name: "Submit" }).click();

    await expect(page.getByRole("button", { name: "Toggle console" }).locator("span")).toHaveText("1");
    await page.getByRole("button", { name: "Toggle console" }).click();
    await expect(page.getByText("Form submission is blocked by the App Lab sandbox", { exact: false })).toBeVisible();
  });
});

test.describe("@firebase synced app persistence", () => {
  let firebaseContext: BrowserContext | null = null;

  test.beforeAll(async ({ browser }) => {
    if (!firebaseProfile) return;
    firebaseContext = await browser.newContext();
  });

  test.afterAll(async () => {
    await firebaseContext?.close();
    firebaseContext = null;
  });

  test.skip(!firebaseProfile, "Auth-capable Firebase E2E profile is required for Firebase-backed E2E tests.");

  test("keeps app data after returning to the launcher with storage configured", async () => {
    if (!firebaseProfile) throw new Error("Auth-capable Firebase E2E profile is required.");

    const context = requireContext(firebaseContext);
    const page = await newCleanWorkspacePage(context);

    try {
      await configureStorage(page, firebaseProfile.config, firebaseProfile);

      await createSyncTestApp(page);
      await expect(appFrame(page).getByRole("heading", { name: SYNC_TEST_APP_TITLE })).toBeVisible();
      await page.getByRole("button", { name: "‹ Apps" }).click();
      await expect(page.getByTitle("Synced with remote storage.")).toBeVisible({ timeout: 15_000 });
      await page.getByRole("button", { name: "Open", exact: true }).click();

      await addSyncTestItem(page, "Synced persisted item");

      await page.getByRole("button", { name: "‹ Apps" }).click();
      await page.getByRole("button", { name: "Open", exact: true }).click();

      await expect(appFrame(page).getByRole("heading", { name: SYNC_TEST_APP_TITLE })).toBeVisible();
      await expect(appFrame(page).getByText("Synced persisted item", { exact: true })).toBeVisible();
    } finally {
      await context.setOffline(false);
      await closePages(page);
    }
  });

  test("keeps source edits after returning to the launcher with storage configured", async () => {
    if (!firebaseProfile) throw new Error("Auth-capable Firebase E2E profile is required.");

    const context = requireContext(firebaseContext);
    const page = await newCleanWorkspacePage(context);

    try {
      await configureStorage(page, firebaseProfile.config, firebaseProfile);

      await createSyncTestApp(page);
      await saveSource(page, htmlForChecklistTitle("Synced Source Persisted"));
      await expect(appFrame(page).getByRole("heading", { name: "Synced Source Persisted" })).toBeVisible();

      await page.getByRole("button", { name: "‹ Apps" }).click();
      await page.getByRole("button", { name: "Open", exact: true }).click();

      await expect(appFrame(page).getByRole("heading", { name: "Synced Source Persisted" })).toBeVisible();
    } finally {
      await context.setOffline(false);
      await closePages(page);
    }
  });

  test("repairs a local workspace manifest version that is ahead of Firebase", async () => {
    if (!firebaseProfile) throw new Error("Auth-capable Firebase E2E profile is required.");

    const context = requireContext(firebaseContext);
    const page = await newCleanWorkspacePage(context);

    try {
      await configureStorage(page, firebaseProfile.config, firebaseProfile);
      await createSyncTestApp(page);
      await page.getByRole("button", { name: "‹ Apps" }).click();
      await expect(page.getByTitle("Synced with remote storage.")).toBeVisible({ timeout: 15_000 });
      await expect
        .poll(() => readLocalManifestVersion(page), { timeout: 15_000 })
        .toBeGreaterThan(0);

      const poisonedVersion = await page.evaluate(() => {
        const key = "app-lab-workspace-sync-v1";
        const raw = localStorage.getItem(key);
        if (!raw) throw new Error("Workspace sync state was not stored.");
        const state = JSON.parse(raw);
        if (!state.manifestRoom) throw new Error("Workspace manifest room was not stored.");
        state.manifestRoom.lastSeenVersion += 5;
        localStorage.setItem(key, JSON.stringify(state));
        return state.manifestRoom.lastSeenVersion as number;
      });

      await page.getByRole("button", { name: "Create new app" }).click();
      await expect(page.getByRole("button", { name: "Toggle source" })).toBeVisible({ timeout: 30_000 });
      await page.getByRole("button", { name: "‹ Apps" }).click();
      await expect(page.getByTitle("Synced with remote storage.")).toBeVisible({ timeout: 15_000 });
      await expect
        .poll(() => readLocalManifestVersion(page), { timeout: 15_000 })
        .toBeLessThan(poisonedVersion);

      await page.reload();
      await expect(page.getByTitle("Synced with remote storage.").first()).toBeVisible({ timeout: 15_000 });
    } finally {
      await context.setOffline(false);
      await closePages(page);
    }
  });

  test("keeps offline app data edits across repeated launcher re-entry with storage configured", async () => {
    if (!firebaseProfile) throw new Error("Auth-capable Firebase E2E profile is required.");

    const context = requireContext(firebaseContext);
    const page = await newCleanWorkspacePage(context);

    try {
      await configureStorage(page, firebaseProfile.config, firebaseProfile);

      await createSyncTestApp(page);
      await expect(appFrame(page).getByRole("heading", { name: SYNC_TEST_APP_TITLE })).toBeVisible();
      await page.getByRole("button", { name: "‹ Apps" }).click();
      await expect(page.getByTitle("Synced with remote storage.")).toBeVisible({ timeout: 15_000 });
      await page.getByRole("button", { name: "Open", exact: true }).click();

      await context.setOffline(true);
      await page.evaluate(() => window.dispatchEvent(new Event("offline")));

      await addSyncTestItem(page, "Offline first");
      await expect(appFrame(page).getByText("Offline first", { exact: true })).toBeVisible();

      await page.getByRole("button", { name: "‹ Apps" }).click();
      await expect(page.getByRole("button", { name: /Open sync status: Offline/ })).toBeVisible();
      await page.getByRole("button", { name: "Open", exact: true }).click();
      await expect(appFrame(page).getByText("Offline first", { exact: true })).toBeVisible();

      await addSyncTestItem(page, "Offline second");
      await expect(appFrame(page).getByText("Offline second", { exact: true })).toBeVisible();

      await page.getByRole("button", { name: "‹ Apps" }).click();
      await page.getByRole("button", { name: "Open", exact: true }).click();
      await expect(appFrame(page).getByText("Offline first", { exact: true })).toBeVisible();
      await expect(appFrame(page).getByText("Offline second", { exact: true })).toBeVisible();

      await context.setOffline(false);
      await page.evaluate(() => window.dispatchEvent(new Event("online")));
      await page.getByRole("button", { name: "‹ Apps" }).click();
      await expect(page.getByTitle("Synced with remote storage.")).toBeVisible({ timeout: 15_000 });
    } finally {
      await context.setOffline(false);
      await closePages(page);
    }
  });

  test("keeps offline source edits across repeated launcher re-entry with storage configured", async () => {
    if (!firebaseProfile) throw new Error("Auth-capable Firebase E2E profile is required.");

    const context = requireContext(firebaseContext);
    const page = await newCleanWorkspacePage(context);

    try {
      await configureStorage(page, firebaseProfile.config, firebaseProfile);

      await createSyncTestApp(page);
      await expect(appFrame(page).getByRole("heading", { name: SYNC_TEST_APP_TITLE })).toBeVisible();
      await page.getByRole("button", { name: "‹ Apps" }).click();
      await expect(page.getByTitle("Synced with remote storage.")).toBeVisible({ timeout: 15_000 });
      await page.getByRole("button", { name: "Open", exact: true }).click();

      await context.setOffline(true);
      await page.evaluate(() => window.dispatchEvent(new Event("offline")));

      await saveSource(page, htmlForChecklistTitle("Offline Source One"));
      await expect(appFrame(page).getByRole("heading", { name: "Offline Source One" })).toBeVisible();
      await page.getByRole("button", { name: "‹ Apps" }).click();
      await expect(page.getByRole("button", { name: /Open sync status: Offline/ })).toBeVisible();
      await page.getByRole("button", { name: "Open", exact: true }).click();
      await expect(appFrame(page).getByRole("heading", { name: "Offline Source One" })).toBeVisible();

      await saveSource(page, htmlForChecklistTitle("Offline Source Two"));
      await expect(appFrame(page).getByRole("heading", { name: "Offline Source Two" })).toBeVisible();
      await page.getByRole("button", { name: "‹ Apps" }).click();
      await page.getByRole("button", { name: "Open", exact: true }).click();
      await expect(appFrame(page).getByRole("heading", { name: "Offline Source Two" })).toBeVisible();

      await context.setOffline(false);
      await page.evaluate(() => window.dispatchEvent(new Event("online")));
      await page.getByRole("button", { name: "‹ Apps" }).click();
      await expect(page.getByTitle("Synced with remote storage.")).toBeVisible({ timeout: 15_000 });
    } finally {
      await context.setOffline(false);
      await closePages(page);
    }
  });
});

async function createOpinionatedBoard(page: Page) {
  await selectOpinionatedBuilderProfile(page);
  await page.getByRole("button", { name: "Create new app" }).click();
  await expect(page.getByRole("button", { name: "Toggle source" })).toBeVisible({ timeout: 30_000 });
}

async function selectOpinionatedBuilderProfile(page: Page) {
  await page.evaluate(() => {
    localStorage.setItem(
      "app-lab-builder-preferences-v1",
      JSON.stringify({ activeProfileId: "builtin-opinionated-v1", conversationMemory: "short", version: 1 }),
    );
  });
}

async function addBoardNote(page: Page, title: string, description = "") {
  const frame = appFrame(page);
  await frame.getByRole("button", { name: "New note" }).click();
  await frame.getByLabel("Title").fill(title);
  await frame.getByLabel("Note", { exact: true }).fill(description || title);
  await frame.getByRole("button", { name: "Save" }).click();
  await expect(frame.getByText(title, { exact: true })).toBeVisible();
}

async function archiveBoardNote(page: Page, title: string) {
  const frame = appFrame(page);
  await frame.getByRole("button", { name: `Archive ${title}` }).click();
  await frame.getByRole("button", { name: "Archive", exact: true }).click();
}

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

async function readLocalManifestVersion(page: Page): Promise<number> {
  return page.evaluate(() => {
    const raw = localStorage.getItem("app-lab-workspace-sync-v1");
    if (!raw) return 0;
    const version = JSON.parse(raw).manifestRoom?.lastSeenVersion;
    return typeof version === "number" ? version : 0;
  });
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

async function saveSource(page: Page, sourceCode: string) {
  const sourceToggle = page.getByRole("button", { name: "Toggle source" });
  await sourceToggle.click();
  const sourcePanel = page.locator('aside[aria-label="Source"]');
  await sourcePanel.locator("textarea").first().fill(sourceCode);
  await sourcePanel.getByRole("button", { name: "Save" }).click();
  await expect(sourcePanel.locator("div.text-xs", { hasText: "Saved." })).toBeVisible();
  await sourceToggle.click();
}

function htmlForChecklistTitle(title: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${title}</title>
  </head>
  <body>
    <h1>${title}</h1>
    <label>New item <input id="draft"></label>
    <button id="add" type="button">Add</button>
    <ul id="items"></ul>
    <output id="status">Loading...</output>
    <script>
      const draft = document.querySelector("#draft");
      const add = document.querySelector("#add");
      const items = document.querySelector("#items");
      const status = document.querySelector("#status");
      let state = { items: [] };

      function render() {
        items.replaceChildren();
        for (const item of state.items) {
          const row = document.createElement("li");
          row.textContent = item;
          items.append(row);
        }
      }

      async function load() {
        state = await AppLab.getData({ items: [] });
        render();
        status.textContent = "Loaded.";
      }

      add.addEventListener("click", async () => {
        state = { items: [...state.items, draft.value] };
        draft.value = "";
        render();
        status.textContent = "Saving...";
        await AppLab.saveData(state);
        status.textContent = "Saved.";
      });

      load();
    </script>
  </body>
</html>`;
}

function htmlForNormalAlpine() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Normal Alpine</title>
    <style>
      [x-cloak] { display: none !important; }
      .ready { color: green; }
      .waiting { color: gray; }
    </style>
  </head>
  <body>
    <main x-data="normalAlpineApp()" x-init="init()" x-cloak>
      <h1>Normal Alpine</h1>
      <label>Name <input aria-label="Name" x-model="state.name"></label>
      <p x-show="state.name.length === 0">Empty</p>
      <p id="greeting" x-text="state.name ? 'Hello ' + state.name : 'No name'"></p>
      <p id="name-status" :class="state.name === 'Ada' ? 'ready' : 'waiting'" x-text="state.name === 'Ada' ? 'Ready' : 'Waiting'"></p>
      <button type="button" @click="save()">Save</button>
      <output x-text="status"></output>
    </main>
    <script>
      function normalAlpineApp() {
        return {
          state: { name: "" },
          status: "Loading...",
          async init() {
            this.state = await AppLab.getData({ name: "" });
            this.status = "Loaded.";
          },
          async save() {
            await AppLab.saveData(this.state);
            this.status = "Saved.";
          }
        };
      }
    </script>
  </body>
</html>`;
}

function htmlWithUnsupportedForm() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Unsupported form</title>
  </head>
  <body>
    <form>
      <button type="submit">Submit</button>
    </form>
  </body>
</html>`;
}

function appFrame(page: Page) {
  return page.frameLocator('iframe[title$=" app"]');
}
