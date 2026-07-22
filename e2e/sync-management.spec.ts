import { expect, test, type Page } from "@playwright/test";
import { readFirebaseE2eProfile, type FirebaseE2eProfile } from "./firebaseProfile";

const firebaseProfile = readFirebaseE2eProfile();

test.describe("sync management", () => {
  test.skip(!firebaseProfile, "Auth-capable Firebase E2E profile is required for Firebase-backed tests.");

  test("exports recovery material that restores apps in a clean browser", async ({ browser }) => {
    if (!firebaseProfile) throw new Error("Auth-capable Firebase E2E profile is required.");

    const ownerContext = await browser.newContext();
    const restoredContext = await browser.newContext();
    const owner = await ownerContext.newPage();
    const restored = await restoredContext.newPage();
    const title = `E2E recovery ${Date.now()}`;

    await owner.goto("/");
    await configureStorage(owner, firebaseProfile.config, firebaseProfile);
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
    if (!firebaseProfile) throw new Error("Auth-capable Firebase E2E profile is required.");

    const ownerContext = await browser.newContext();
    const joinedContext = await browser.newContext();
    const owner = await ownerContext.newPage();
    const joined = await joinedContext.newPage();
    const title = `E2E delete ${Date.now()}`;

    await owner.goto("/");
    await configureStorage(owner, firebaseProfile.config, firebaseProfile);
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

test.describe("workspace sync management", () => {
  test.skip(!firebaseProfile, "Auth-capable Firebase E2E profile is required for workspace-sync E2E tests.");

  test("syncs apps created after workspace recovery in both browsers", async ({ browser }) => {
    if (!firebaseProfile) throw new Error("Auth-capable Firebase E2E profile is required.");

    const originalContext = await browser.newContext();
    const syncedContext = await browser.newContext();
    const original = await originalContext.newPage();
    const synced = await syncedContext.newPage();
    const initialTitle = `E2E workspace initial ${Date.now()}`;
    const originalLaterTitle = `E2E workspace original ${Date.now()}`;
    const syncedLaterTitle = `E2E workspace synced ${Date.now()}`;

    await original.goto("/");
    await configureStorage(original, firebaseProfile.config, firebaseProfile);
    await createExampleApp(original);
    await saveSource(original, htmlForTitle(initialTitle));

    const recoveryText = await exportRecoveryText(original);

    await synced.goto("/");
    await restoreWorkspace(synced, recoveryText);
    await expect(synced.getByText(initialTitle).first()).toBeVisible({ timeout: 15_000 });

    await original.getByRole("button", { name: "‹ Apps" }).click();
    await createExampleApp(original);
    await saveSource(original, htmlForTitle(originalLaterTitle));

    await expect(synced.getByText(originalLaterTitle).first()).toBeVisible({ timeout: 20_000 });

    await createExampleApp(synced);
    await saveSource(synced, htmlForTitle(syncedLaterTitle));

    await original.getByRole("button", { name: "‹ Apps" }).click();
    await expect(original.getByText(syncedLaterTitle).first()).toBeVisible({ timeout: 20_000 });

    await originalContext.close();
    await syncedContext.close();
  });
});

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
