import { expect, type Page } from "@playwright/test";

export async function createApp(page: Page, name = "Opinionated Board") {
  await page.getByRole("button", { name: "New app", exact: true }).click();
  await page.getByLabel("App name", { exact: true }).fill(name);
  await page.getByRole("button", { name: "Create app", exact: true }).click();
  await expect(page.getByRole("button", { name: "Open app tools" })).toBeVisible({ timeout: 30_000 });
}

export async function openApp(page: Page, name?: string) {
  const app = name ? page.getByRole("button", { name: `Open ${name}`, exact: true }) : page.locator(".launcher-open").first();
  await app.click();
  await expect(page.locator('iframe[sandbox="allow-scripts"]')).toBeVisible();
}

export async function openTools(page: Page, tool: "AI" | "Develop" | "Share", view?: "Chat" | "External" | "Code" | "Data" | "Log") {
  const panel = page.getByRole("dialog", { name: "App tools" });
  if (!await panel.isVisible()) await page.getByRole("button", { name: "Open app tools" }).click();
  await panel.getByRole("tab", { name: tool, exact: true }).click();
  if (view) await panel.getByRole("tab", { name: view, exact: true }).click();
  return panel;
}

export async function saveSource(page: Page, source: string) {
  const panel = await openTools(page, "Develop", "Code");
  await panel.getByLabel("App source (HTML)").fill(source);
  await panel.getByRole("button", { name: "Apply changes" }).click();
  await expect(panel).toBeHidden({ timeout: 30_000 });
}

export async function createInvite(page: Page) {
  const panel = await openTools(page, "Share");
  await panel.getByRole("button", { name: "Create share link" }).click();
  const link = panel.getByLabel("Share link");
  await expect.poll(() => link.inputValue()).toContain("#applab-invite=");
  const url = await link.inputValue();
  await panel.getByRole("button", { name: "Close tools" }).click();
  return url;
}

export async function openSettings(page: Page, section: "AI" | "Storage") {
  if (await page.locator(".workspace-app-header").isVisible()) {
    const panel = await openTools(page, "AI", "Chat");
    await panel.getByRole("button", { name: /^BuilderAI/ }).click();
    if (section === "Storage") await page.getByRole("button", { name: section, exact: true }).click();
  } else {
    await page.getByRole("button", { name: "Settings", exact: true }).click();
    await page.getByRole("button", { name: section, exact: true }).click();
  }
}
