import { expect, type Page } from "@playwright/test";

const SYNC_TEST_PROFILE_ID = "e2e-sync-test-profile";

export const SYNC_TEST_APP_TITLE = "E2E Sync Test App";

export const SYNC_TEST_APP_SOURCE = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Stable browser-test fixture for App Lab persistence and sync.">
    <title>${SYNC_TEST_APP_TITLE}</title>
  </head>
  <body>
    <main>
      <h1>${SYNC_TEST_APP_TITLE}</h1>
      <label>New item <input id="draft"></label>
      <button id="add" type="button">Add</button>
      <ul id="items"></ul>
      <output id="status">Loading...</output>
    </main>

    <script>
      "use strict";

      const draft = document.querySelector("#draft");
      const add = document.querySelector("#add");
      const items = document.querySelector("#items");
      const status = document.querySelector("#status");
      let state = { schemaVersion: 1, items: [] };

      function normalize(data) {
        const source = data && typeof data === "object" ? data : {};
        return {
          schemaVersion: 1,
          items: Array.isArray(source.items)
            ? source.items.map((item) => ({
                id: typeof item.id === "string" ? item.id : createId(),
                text: typeof item.text === "string" ? item.text : ""
              }))
            : []
        };
      }

      function render() {
        items.replaceChildren();
        for (const item of state.items) {
          const row = document.createElement("li");
          const text = document.createElement("span");
          const remove = document.createElement("button");
          text.textContent = item.text;
          remove.type = "button";
          remove.textContent = "Delete";
          remove.setAttribute("aria-label", "Delete " + item.text);
          remove.addEventListener("click", () => removeItem(item.id));
          row.append(text, remove);
          items.append(row);
        }
      }

      async function persist() {
        status.textContent = "Saving...";
        await AppLab.saveData(JSON.parse(JSON.stringify(state)));
        status.textContent = "Saved.";
      }

      async function addItem() {
        const text = draft.value.trim();
        if (!text) return;
        state = { ...state, items: [...state.items, { id: createId(), text }] };
        draft.value = "";
        render();
        await persist();
      }

      async function removeItem(itemId) {
        state = { ...state, items: state.items.filter((item) => item.id !== itemId) };
        render();
        await persist();
      }

      function createId() {
        if (window.crypto && typeof window.crypto.randomUUID === "function") return window.crypto.randomUUID();
        return "item_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2);
      }

      AppLab.onDataChange((nextData) => {
        state = normalize(nextData);
        render();
        status.textContent = "Updated.";
      });
      AppLab.onError((message) => { status.textContent = String(message || "App Lab error"); });
      add.addEventListener("click", () => { void addItem(); });

      void AppLab.getData(state).then((data) => {
        state = normalize(data);
        render();
        status.textContent = "Loaded.";
      });
    </script>
  </body>
</html>`;

export async function createSyncTestApp(page: Page): Promise<void> {
  await page.evaluate(
    ({ profileId, starterSource }) => {
      localStorage.setItem(
        "app-lab-builder-profiles-v1",
        JSON.stringify({
          profiles: [
            {
              builtIn: false,
              name: "E2E sync fixture",
              profileId,
              promptTemplate: "E2E fixture",
              starterSource,
            },
          ],
          version: 1,
        }),
      );
      localStorage.setItem(
        "app-lab-builder-preferences-v1",
        JSON.stringify({ activeProfileId: profileId, conversationMemory: "short", version: 1 }),
      );
    },
    { profileId: SYNC_TEST_PROFILE_ID, starterSource: SYNC_TEST_APP_SOURCE },
  );

  await page.getByRole("button", { name: "Create new app" }).click();
  await expect(page.getByRole("button", { name: "Toggle source" })).toBeVisible({ timeout: 30_000 });
  await expect(page.frameLocator('iframe[title$=" app"]').getByRole("heading", { name: SYNC_TEST_APP_TITLE })).toBeVisible();
}

export async function addSyncTestItem(page: Page, text: string): Promise<void> {
  const frame = page.frameLocator('iframe[title$=" app"]');
  await frame.getByLabel("New item").fill(text);
  await frame.getByRole("button", { name: "Add" }).click();
  await expect(frame.getByText(text, { exact: true })).toBeVisible();
}

export async function deleteSyncTestItem(page: Page, text: string): Promise<void> {
  const frame = page.frameLocator('iframe[title$=" app"]');
  await frame.getByRole("button", { name: `Delete ${text}` }).click();
  await expect(frame.getByText(text, { exact: true })).toBeHidden();
}
