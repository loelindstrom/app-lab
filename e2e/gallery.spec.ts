import { expect, test } from "@playwright/test";

for (const width of [320, 390, 1440]) {
  test.describe(`component gallery (${width}px)`, () => {
    test.use({ viewport: { width, height: 960 } });

    test("shows the live sync controls and separates status from actions", async ({ page }) => {
      const errors: string[] = [];
      const providerRequests: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("request", (request) => { if (/openrouter|firebaseio|firebasedatabase|googleapis/.test(new URL(request.url()).hostname)) providerRequests.push(request.url()); });
      await page.goto("/gallery/");
      const header = page.locator(".workspace-app-toolbar");
      await expect(header).toHaveCSS("height", "56px");
      const toolsButton = header.getByRole("button", { name: "Open app tools" });
      await expect(toolsButton).toHaveCSS("width", "44px");
      await expect(toolsButton.locator(".ai-tools-button-surface")).toHaveCSS("width", "36px");
      const states = page.getByRole("group", { name: "Cloud sync states" });
      await expect(states.locator(".workspace-sync-button")).toHaveCount(5);
      await expect(states.locator(".lucide-cloud")).toHaveCount(5);
      await expect(states.locator(".gallery-sync-state > span")).toHaveText(["Synced", "Syncing", "Queued", "Offline", "Error"]);
      for (const name of ["Synced", "Syncing", "Queued", "Offline", "Error"]) {
        const button = states.getByRole("button", { name: `Sync status: ${name}`, exact: true });
        await expect(button).toHaveCSS("width", "44px");
        const cloud = await button.locator(".lucide-cloud").boundingBox();
        const mark = await button.locator(".sync-status-mark").boundingBox();
        expect(mark!.x).toBeGreaterThan(cloud!.x + cloud!.width / 2);
        await button.click();
        await expect(states.getByRole("region", { name: "Sync status" })).toBeVisible();
        await page.keyboard.press("Escape");
        await expect(button).toBeFocused();
      }
      await page.screenshot({ path: `test-results/gallery-${width}-light.png`, fullPage: true, animations: "disabled" });
      await page.getByTitle("Dark theme").first().click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
      await page.screenshot({ path: `test-results/gallery-${width}-dark.png`, fullPage: true, animations: "disabled" });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      expect(errors).toEqual([]);
      expect(providerRequests).toEqual([]);
    });

    test("uses working file controls and the real responsive tools panel", async ({ page }) => {
      await page.goto("/gallery/");
      await page.getByRole("tab", { name: "JSON", exact: true }).click();
      await page.getByLabel("Choose data file").setInputFiles({ name: "sample.json", mimeType: "application/json", buffer: Buffer.from('{"notes":["hello"]}') });
      await expect(page.getByLabel("App data (JSON)")).toHaveValue('{"notes":["hello"]}');
      const download = page.waitForEvent("download");
      await page.getByRole("button", { name: "Export data file" }).click();
      expect((await download).suggestedFilename()).toBe("app-data.json");
      await page.getByRole("button", { name: "Open app tools" }).click();
      const tools = page.getByRole("dialog", { name: "App tools" });
      await expect(tools).toHaveAttribute("data-placement", width < 1024 ? "bottom" : "right");
      await expect(tools.locator(".sheet-header")).toHaveCSS("height", width < 1024 ? "52px" : "56px");
      await expect(tools.locator(".sheet-header .ai-mark")).toHaveCount(0);
      const headingOffset = await tools.locator(".sheet-identity").evaluate((element) => {
        const title = element.querySelector("h2")!.getBoundingClientRect();
        const name = element.querySelector("span")!.getBoundingClientRect();
        return Math.abs(title.y + title.height / 2 - name.y - name.height / 2);
      });
      expect(headingOffset).toBeLessThan(2);
      await page.getByLabel("Panel source (HTML)").fill("Preview draft");
      await page.getByRole("button", { name: "Close preview" }).click();
      await expect(tools).toBeHidden();
      await page.getByRole("button", { name: "Open app tools" }).click();
      await expect(page.getByLabel("Panel source (HTML)")).toHaveValue("Preview draft");
      await page.getByRole("button", { name: "Close preview" }).click();
      await page.getByLabel("App name", { exact: true }).fill("A very long app name that should stay on one line without hiding any of the app tools controls");
      await page.getByRole("button", { name: "Save changes", exact: true }).click();
      await page.getByRole("button", { name: "Open app tools" }).click();
      await expect(tools.getByRole("button", { name: "Close tools" })).toBeVisible();
      await expect(tools.getByRole("button", { name: width < 1024 ? "Reduce tools" : "Expand tools" })).toBeVisible();
      const name = tools.locator(".sheet-identity > span");
      await expect(name).toHaveCSS("text-overflow", "ellipsis");
      expect(await name.evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(true);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      await page.screenshot({ path: `test-results/compact-tools-${width}-light.png`, animations: "disabled" });
      await tools.getByRole("button", { name: "Close tools" }).click();
      await page.getByTitle("Dark theme").first().click();
      await page.getByRole("button", { name: "Open app tools" }).click();
      await page.screenshot({ path: `test-results/compact-tools-${width}-dark.png`, animations: "disabled" });
    });
  });
}
