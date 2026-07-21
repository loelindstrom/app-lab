import { expect, test, type Page } from "@playwright/test";

const firebaseConfig = readFirebaseSmokeConfig();

test.describe("local app persistence", () => {
  test("keeps the built-in example app data after returning to the launcher", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(async () => {
      indexedDB.deleteDatabase("app-lab-v2");
      indexedDB.deleteDatabase("app-lab-sync-queue-v1");
      localStorage.clear();
    });
    await page.reload();

    await createExampleApp(page);
    await expect(appFrame(page).getByRole("heading", { name: "Example App" })).toBeVisible();

    await addExampleItem(page, "Example persisted item", "This description should persist.");

    await page.getByRole("button", { name: "‹ Apps" }).click();
    await page.getByRole("button", { name: "Open", exact: true }).click();

    await expect(appFrame(page).getByRole("heading", { name: "Example App" })).toBeVisible();
    await expect(appFrame(page).getByText("Example persisted item", { exact: true })).toBeVisible();
  });

  test("keeps source and app data after returning to the launcher", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(async () => {
      indexedDB.deleteDatabase("app-lab-v2");
      indexedDB.deleteDatabase("app-lab-sync-queue-v1");
      localStorage.clear();
    });
    await page.reload();

    await createExampleApp(page);

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

    await createExampleApp(page);
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
});

test.describe("synced app persistence", () => {
  test.skip(!firebaseConfig, "APP_LAB_FIREBASE_SMOKE_CONFIG is required for Firebase-backed E2E tests.");

  test("keeps built-in example data after returning to the launcher with storage configured", async ({ page }) => {
    if (!firebaseConfig) throw new Error("APP_LAB_FIREBASE_SMOKE_CONFIG is required.");

    await page.goto("/");
    await page.evaluate(async () => {
      indexedDB.deleteDatabase("app-lab-v2");
      indexedDB.deleteDatabase("app-lab-sync-queue-v1");
      localStorage.clear();
    });
    await page.reload();
    await configureStorage(page, firebaseConfig);

    await createExampleApp(page);
    await expect(appFrame(page).getByRole("heading", { name: "Example App" })).toBeVisible();
    await page.getByRole("button", { name: "‹ Apps" }).click();
    await expect(page.getByTitle("Synced with remote storage.")).toBeVisible({ timeout: 15_000 });
    await page.getByRole("button", { name: "Open", exact: true }).click();

    await addExampleItem(page, "Synced persisted item");

    await page.getByRole("button", { name: "‹ Apps" }).click();
    await page.getByRole("button", { name: "Open", exact: true }).click();

    await expect(appFrame(page).getByRole("heading", { name: "Example App" })).toBeVisible();
    await expect(appFrame(page).getByText("Synced persisted item", { exact: true })).toBeVisible();
  });

  test("keeps source edits after returning to the launcher with storage configured", async ({ page }) => {
    if (!firebaseConfig) throw new Error("APP_LAB_FIREBASE_SMOKE_CONFIG is required.");

    await page.goto("/");
    await page.evaluate(async () => {
      indexedDB.deleteDatabase("app-lab-v2");
      indexedDB.deleteDatabase("app-lab-sync-queue-v1");
      localStorage.clear();
    });
    await page.reload();
    await configureStorage(page, firebaseConfig);

    await createExampleApp(page);
    await saveSource(page, htmlForChecklistTitle("Synced Source Persisted"));
    await expect(appFrame(page).getByRole("heading", { name: "Synced Source Persisted" })).toBeVisible();

    await page.getByRole("button", { name: "‹ Apps" }).click();
    await page.getByRole("button", { name: "Open", exact: true }).click();

    await expect(appFrame(page).getByRole("heading", { name: "Synced Source Persisted" })).toBeVisible();
  });

  test("keeps offline app data edits across repeated launcher re-entry with storage configured", async ({ page, context }) => {
    if (!firebaseConfig) throw new Error("APP_LAB_FIREBASE_SMOKE_CONFIG is required.");

    await page.goto("/");
    await page.evaluate(async () => {
      indexedDB.deleteDatabase("app-lab-v2");
      indexedDB.deleteDatabase("app-lab-sync-queue-v1");
      localStorage.clear();
    });
    await page.reload();
    await configureStorage(page, firebaseConfig);

    await createExampleApp(page);
    await expect(appFrame(page).getByRole("heading", { name: "Example App" })).toBeVisible();
    await page.getByRole("button", { name: "‹ Apps" }).click();
    await expect(page.getByTitle("Synced with remote storage.")).toBeVisible({ timeout: 15_000 });
    await page.getByRole("button", { name: "Open", exact: true }).click();

    await context.setOffline(true);
    await page.evaluate(() => window.dispatchEvent(new Event("offline")));

    await addExampleItem(page, "Offline first");
    await expect(appFrame(page).getByText("Offline first", { exact: true })).toBeVisible();

    await page.getByRole("button", { name: "‹ Apps" }).click();
    await expect(page.getByRole("button", { name: /Open sync status: Offline/ })).toBeVisible();
    await page.getByRole("button", { name: "Open", exact: true }).click();
    await expect(appFrame(page).getByText("Offline first", { exact: true })).toBeVisible();

    await addExampleItem(page, "Offline second");
    await expect(appFrame(page).getByText("Offline second", { exact: true })).toBeVisible();

    await page.getByRole("button", { name: "‹ Apps" }).click();
    await page.getByRole("button", { name: "Open", exact: true }).click();
    await expect(appFrame(page).getByText("Offline first", { exact: true })).toBeVisible();
    await expect(appFrame(page).getByText("Offline second", { exact: true })).toBeVisible();

    await context.setOffline(false);
    await page.evaluate(() => window.dispatchEvent(new Event("online")));
    await page.getByRole("button", { name: "‹ Apps" }).click();
    await expect(page.getByTitle("Synced with remote storage.")).toBeVisible({ timeout: 15_000 });
  });

  test("keeps offline source edits across repeated launcher re-entry with storage configured", async ({ page, context }) => {
    if (!firebaseConfig) throw new Error("APP_LAB_FIREBASE_SMOKE_CONFIG is required.");

    await page.goto("/");
    await page.evaluate(async () => {
      indexedDB.deleteDatabase("app-lab-v2");
      indexedDB.deleteDatabase("app-lab-sync-queue-v1");
      localStorage.clear();
    });
    await page.reload();
    await configureStorage(page, firebaseConfig);

    await createExampleApp(page);
    await expect(appFrame(page).getByRole("heading", { name: "Example App" })).toBeVisible();
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
  });
});

async function createExampleApp(page: Page) {
  await page.getByRole("button", { name: "Create new app" }).click();
  await expect(page.getByRole("button", { name: "Toggle source" })).toBeVisible({ timeout: 30_000 });
}

async function addExampleItem(page: Page, title: string, description = "") {
  const frame = appFrame(page);
  await frame.getByRole("button", { name: "New item" }).click();
  await frame.getByLabel("Title").fill(title);
  if (description) await frame.getByLabel("Description").fill(description);
  await frame.getByRole("button", { name: "Save" }).click();
  await expect(frame.getByText(title, { exact: true })).toBeVisible();
}

async function configureStorage(page: Page, config: Record<string, string>) {
  await page.getByRole("button", { name: "Open settings" }).click();
  await page.getByLabel("Display name").fill("E2E Firebase");
  await page.getByLabel("Firebase web app config").fill(JSON.stringify(config, null, 2));
  await page.getByLabel("Firebase Realtime Database URL").fill(config.databaseURL);
  await page.getByRole("button", { name: "Save storage profile" }).click();
  await expect(page.getByRole("button", { name: "Remove profile" })).toBeVisible();
  await page.getByRole("button", { name: "Close" }).click();
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

function appFrame(page: Page) {
  return page.frameLocator('iframe[title$=" app"]');
}

function readFirebaseSmokeConfig(): Record<string, string> | null {
  const raw = process.env.APP_LAB_FIREBASE_SMOKE_CONFIG;
  if (!raw) return null;
  return JSON.parse(raw) as Record<string, string>;
}
