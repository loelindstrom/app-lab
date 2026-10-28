import { expect, test, type Page } from "@playwright/test";

const SOURCE = `<!doctype html><html><head><title>Shared counter</title></head><body>
<h1>Shared counter</h1><p id="count">Loading</p><button id="increment" type="button">Add one</button>
<script>
let data;
AppLab.getData({count:0}).then(value => { data=value; render(); });
function render(){ document.getElementById('count').textContent=String(data.count); }
document.getElementById('increment').onclick=async()=>{data.count++;await AppLab.saveData(data);render();};
AppLab.onDataChange(value=>{data=value;render();});
console.error('A real sandbox console error');
</script></body></html>`;

for (const viewport of [{ width: 390, height: 844 }, { width: 1440, height: 960 }]) {
  test.describe(`workspace UI (${viewport.width}px)`, () => {
    test.setTimeout(60_000);
    test.use({ viewport });

    test("archives and unarchives apps from their menu without losing source or data", async ({ page }) => {
      await createApp(page, "Archive me");
      await page.getByRole("button", { name: "Open app tools" }).click();
      await page.getByRole("tab", { name: "Develop", exact: true }).click();
      await page.getByLabel("App source (HTML)").fill(SOURCE.replaceAll("Shared counter", "Archive me"));
      await page.getByRole("button", { name: "Apply changes" }).click();
      await expect(frame(page).locator("#count")).toHaveText("0");
      await frame(page).getByRole("button", { name: "Add one" }).click();
      await expect(frame(page).locator("#count")).toHaveText("1");
      await page.getByRole("button", { name: "Back to workspace" }).click();
      await page.getByRole("button", { name: "Options for Archive me", exact: true }).click();
      await page.getByRole("button", { name: "Archive app", exact: true }).click();
      await expect(page.getByRole("button", { name: "Open Archive me", exact: true })).toBeHidden();
      await expect(page.getByRole("heading", { name: "No active apps", exact: true })).toBeVisible();
      await page.reload();
      await expect(page.getByRole("button", { name: "Open Archive me", exact: true })).toBeHidden();
      await page.getByRole("tab", { name: "Archived", exact: true }).click();
      await expect(page.getByRole("button", { name: "Open Archive me", exact: true })).toBeVisible();
      await page.getByRole("searchbox", { name: "Search apps" }).fill("no match");
      await expect(page.getByRole("heading", { name: "No apps found", exact: true })).toBeVisible();
      await page.getByRole("button", { name: "Clear search", exact: true }).first().click();
      await expect(page.getByRole("button", { name: "Open Archive me", exact: true })).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.screenshot({ path: test.info().outputPath(`launcher-archive-${viewport.width}.png`), fullPage: true, animations: "disabled" });
      await page.getByRole("button", { name: "Open Archive me", exact: true }).click();
      await expect(frame(page).locator("#count")).toHaveText("1");
      await page.getByRole("button", { name: "Back to workspace" }).click();
      await expect(page.getByRole("tab", { name: "Archived", exact: true })).toHaveAttribute("aria-selected", "true");
      await page.getByRole("button", { name: "Options for Archive me", exact: true }).click();
      await expect(page.getByRole("button", { name: "Archive app", exact: true })).toBeHidden();
      await page.getByRole("button", { name: "Unarchive app", exact: true }).click();
      await expect(page.getByRole("heading", { name: "No archived apps", exact: true })).toBeVisible();
      await page.getByRole("tab", { name: "Active", exact: true }).click();
      await page.getByRole("button", { name: "Open Archive me", exact: true }).click();
      await expect(frame(page).locator("#count")).toHaveText("1");
      await page.reload();
      await expect(frame(page).locator("#count")).toHaveText("1");
    });

    test("persists source and data across reloads without changing the sandbox boundary", async ({ page }) => {
      await page.goto("/");
      await page.getByRole("button", { name: "New app", exact: true }).click();
      await page.getByLabel("App name", { exact: true }).fill("Opinionated Board");
      await page.getByRole("button", { name: "Create app", exact: true }).click();
      await expect(page.locator('iframe[sandbox="allow-scripts"]')).toBeVisible();
      await page.goto("/");
      await expect(page.locator(".launcher-header-inner")).toHaveCSS("height", "56px");
      await page.getByRole("button", { name: "Open Opinionated Board" }).click();
      await expect(page.locator(".workspace-app-header")).toHaveCSS("height", "56px");
      await expect(frame(page).getByRole("heading", { name: "Active notes" })).toBeVisible();
      await page.getByRole("button", { name: "Open app tools" }).click();
      await page.getByLabel("Describe your idea").fill("Make a shared counter");
      await page.evaluate(() => Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async (text: string) => { (window as unknown as { copied: string }).copied = text; } } }));
      await page.getByRole("button", { name: "Copy prompt + code" }).click();
      await expect(page.getByRole("button", { name: "Copied", exact: true })).toBeVisible();
      await expect(page.getByRole("heading", { name: "1. Describe your idea" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "2. Copy the prompt" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "3. Ask your AI" })).toBeVisible();
      await expect(page.getByText("4. Paste the new code", { exact: true })).toBeVisible();
      const prompt = await page.evaluate(() => (window as unknown as { copied: string }).copied);
      expect(prompt).toContain("AppLab.saveData");
      expect(prompt).toContain("Opinionated Board");
      expect(prompt).toContain("Make a shared counter");
      await page.evaluate(() => Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async () => { throw new Error("Denied"); } } }));
      await page.getByRole("button", { name: "Copied", exact: true }).click();
      await expect(page.getByLabel("Prompt and code", { exact: true })).toHaveValue(prompt);
      await page.getByLabel("Paste the new code", { exact: true }).fill(SOURCE);
      await page.getByRole("button", { name: "Apply code" }).click();
      await expect(frame(page).getByRole("heading", { name: "Shared counter" })).toBeVisible();
      await expect(page.getByRole("dialog", { name: "App tools" })).toBeHidden();
      await expect(frame(page).locator("#count")).toHaveText("0");
      await frame(page).getByRole("button", { name: "Add one" }).click();
      await expect(frame(page).locator("#count")).toHaveText("1");
      await expect(page.locator('iframe[sandbox]')).toHaveAttribute("sandbox", "allow-scripts");
      await expect(page.locator(".ai-tools-button .attention-dot")).toBeVisible();
      await page.getByRole("button", { name: "Open app tools" }).click();
      await page.getByRole("tab", { name: "Develop", exact: true }).click();
      await page.getByRole("tab", { name: "Log", exact: true }).click();
      await expect(page.getByRole("log", { name: "App iframe console" })).toContainText("A real sandbox console error");
      await page.getByRole("button", { name: "Close tools" }).click();
      await expect(page.locator(".ai-tools-button .attention-dot")).toBeHidden();
      await page.goto("/");
      await page.getByRole("button", { name: "Open Shared counter", exact: true }).click();
      await expect(frame(page).locator("#count")).toHaveText("1");
      await page.getByRole("button", { name: "Open app tools" }).click();
      await page.getByRole("tab", { name: "Develop", exact: true }).click();
      await page.getByLabel("App source (HTML)").fill(SOURCE.replaceAll("Shared counter", "Edited source"));
      await page.getByRole("button", { name: "Apply changes" }).click();
      await expect(frame(page).getByRole("heading", { name: "Edited source" })).toBeVisible();
      await page.goto("/");
      await page.getByRole("button", { name: "Open Edited source" }).click();
      await expect(frame(page).locator("#count")).toHaveText("1");
    });

    test("imports real JSON, rejects invalid input, copies with and without data, and deletes", async ({ page }) => {
      await createApp(page, "Import test");
      await page.getByRole("button", { name: "Open app tools" }).click();
      await page.getByRole("tab", { name: "Develop", exact: true }).click();
      await page.getByLabel("App source (HTML)").fill("<p>Not a document</p>");
      await page.getByRole("button", { name: "Apply changes" }).click();
      await expect(page.getByRole("alert")).toContainText("complete HTML");
      await page.getByLabel("App source (HTML)").fill(SOURCE);
      await page.getByRole("button", { name: "Apply changes" }).click();
      await expect(frame(page).locator("#count")).toHaveText("0");
      await page.getByRole("button", { name: "Open app tools" }).click();
      await page.getByRole("tab", { name: "Develop", exact: true }).click();
      await page.getByRole("tab", { name: "Data", exact: true }).click();
      await expect(page.getByLabel("App data (JSON)")).toBeVisible();
      await page.getByLabel("App data (JSON)").fill("broken JSON");
      await page.getByRole("button", { name: "Apply data" }).click();
      await expect(page.getByRole("alert")).toBeVisible();
      await page.getByLabel("Choose data file").setInputFiles({ name: "counter.json", mimeType: "application/json", buffer: Buffer.from('{"count":42}') });
      await page.getByRole("button", { name: "Apply data" }).click();
      await expect(frame(page).locator("#count")).toHaveText("42");
      await page.getByRole("button", { name: "Back to workspace" }).click();
      await copyApp(page, true);
      await page.getByRole("button", { name: "Open Shared counter (copy)", exact: true }).click();
      await expect(frame(page).locator("#count")).toHaveText("42");
      await page.getByRole("button", { name: "Back to workspace" }).click();
      await copyApp(page, false);
      await page.getByRole("button", { name: "Open Shared counter (copy 2)", exact: true }).click();
      await expect(frame(page).locator("#count")).toHaveText("0");
      await page.getByRole("button", { name: "Back to workspace" }).click();
      await page.getByRole("button", { name: "Options for Shared counter (copy 2)", exact: true }).click();
      await page.getByRole("button", { name: "Delete app", exact: true }).click();
      await page.getByRole("button", { name: "Delete", exact: true }).click();
      await expect(page.getByRole("button", { name: "Open Shared counter (copy 2)", exact: true })).toBeHidden();
      await page.reload();
      await expect(page.getByRole("button", { name: "Open Shared counter (copy)", exact: true })).toBeVisible();
    });

    test("runs real agent orchestration with a mocked provider and saves shared AI settings", async ({ page }) => {
      const calls: Array<{ messages: Array<Record<string, unknown>> }> = [];
      await page.route("https://openrouter.ai/api/v1/chat/completions", async (route) => {
        calls.push(route.request().postDataJSON());
        const delta = calls.length === 1 ? { tool_calls: [{ index: 0, id: "read", type: "function", function: { name: "read_current_app_source", arguments: "{}" } }] }
          : calls.length === 2 ? { tool_calls: [{ index: 0, id: "write", type: "function", function: { name: "replace_current_app_source", arguments: JSON.stringify({ sourceCode: SOURCE }) } }] }
            : { content: "Created a **shared counter**." };
        await route.fulfill({ status: 200, contentType: "text/event-stream", body: `data: ${JSON.stringify({ choices: [{ delta }], usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15, cost: 0.001 } })}\n\ndata: [DONE]\n\n` });
      });
      await page.goto("/");
      await page.getByRole("button", { name: "Settings", exact: true }).click();
      await page.getByRole("button", { name: /^AI/ }).click();
      await page.getByLabel("OpenRouter API key").fill("sk-or-test-only");
      await page.getByLabel("Model id").fill("test/model");
      await page.getByRole("button", { name: "Save AI configuration" }).click();
      await expect(page.getByRole("status")).toContainText("AI configuration saved");
      await page.goto("/");
      await page.getByRole("button", { name: "Settings", exact: true }).click();
      await page.getByRole("button", { name: /^AI/ }).click();
      await expect(page.getByLabel("Model id")).toHaveValue("test/model");
      await createApp(page, "AI test");
      await page.getByRole("button", { name: "Open app tools" }).click();
      await page.getByRole("tab", { name: "Chat", exact: true }).click();
      await expect(page.getByText("test/model", { exact: true })).toBeVisible();
      await page.getByLabel("Message", { exact: true }).fill("Build a counter");
      await page.getByRole("button", { name: "Send message" }).click();
      await expect(page.locator(".chat-message strong")).toHaveText("shared counter");
      expect(calls).toHaveLength(3);
      expect(JSON.stringify(calls[1].messages)).toContain("read");
      expect(JSON.stringify(calls[2].messages)).toContain('sourceChars');
      await page.getByRole("button", { name: "Close tools" }).click();
      await expect(frame(page).getByRole("heading", { name: "Shared counter" })).toBeVisible();
      await page.getByRole("button", { name: "Back to workspace" }).click();
      await page.getByRole("button", { name: "Open Shared counter" }).click();
      await page.getByRole("button", { name: "Open app tools" }).click();
      await page.getByRole("tab", { name: "Chat", exact: true }).click();
      await expect(page.locator(".chat-message strong")).toHaveText("shared counter");
      await page.getByRole("button", { name: "Clear chat" }).click();
      await expect(page.locator(".chat-message strong")).toBeHidden();
    });

    test("edits app details, keeps icon color through copy and reload, and preserves data", async ({ page }) => {
      await createApp(page, "Weekend plans");
      await page.getByRole("button", { name: "Open app tools" }).click();
      await page.getByLabel("Paste the new code", { exact: true }).fill(SOURCE.replaceAll("Shared counter", "Weekend plans"));
      await page.getByRole("button", { name: "Apply code" }).click();
      await expect(frame(page).locator("#count")).toHaveText("0");
      await frame(page).getByRole("button", { name: "Add one" }).click();
      await expect(frame(page).locator("#count")).toHaveText("1");
      await page.getByRole("button", { name: "Back to workspace" }).click();
      await expect(page.getByRole("button", { name: "Open Weekend plans" }).locator(".launcher-app-initials")).toHaveText("WP");
      await page.getByRole("button", { name: "Options for Weekend plans" }).click();
      await page.getByRole("button", { name: "Edit app details", exact: true }).click();
      await page.getByLabel("App name", { exact: true }).fill("Travel journal");
      await page.getByRole("button", { name: "Blue", exact: true }).click();
      await expect(page.getByRole("dialog", { name: "Edit app details" }).locator(".launcher-app-initials")).toHaveText("TJ");
      await page.screenshot({ path: `test-results/next-${viewport.width}-app-details.png`, animations: "disabled" });
      await page.getByRole("button", { name: "Save changes", exact: true }).click();
      const tile = page.getByRole("button", { name: "Open Travel journal", exact: true });
      await expect(tile).toBeVisible();
      await page.reload();
      await expect(tile.locator(".launcher-app-initials")).toHaveText("TJ");
      expect(await tile.locator(".launcher-app-icon").evaluate((element) => (element as HTMLElement).style.getPropertyValue("--app-icon-color"))).toBe("#507ca6");
      await tile.click();
      await expect(frame(page).locator("#count")).toHaveText("1");
      await expect(page.locator(".workspace-app-identity strong")).toHaveText("Travel journal");
      expect(await page.locator(".workspace-app-identity strong").evaluate((element) => getComputedStyle(element).fontSize)).toBe("17px");
      await page.getByRole("button", { name: "Back to workspace" }).click();
      await page.getByRole("button", { name: "Options for Travel journal", exact: true }).click();
      await page.getByRole("button", { name: "Copy app", exact: true }).click();
      await page.getByRole("button", { name: "Copy app", exact: true }).click();
      await expect(page.getByRole("button", { name: "Open Travel journal (copy)", exact: true }).locator(".launcher-app-icon")).toHaveAttribute("data-custom-color", "true");
    });

    test("returns from AI setup to the same app and chat, keeping external drafts", async ({ page }) => {
      await createApp(page, "Settings round trip");
      await page.getByRole("button", { name: "Open app tools" }).click();
      await page.getByLabel("Describe your idea").fill("Keep this idea while I set up AI");
      await page.getByRole("tab", { name: "Chat", exact: true }).click();
      await page.getByRole("button", { name: "Set up AI", exact: true }).click();
      await expect(page.getByLabel("OpenRouter API key")).toBeVisible();
      await expect(page.getByRole("dialog", { name: "App tools" })).toBeHidden();
      await page.getByLabel("OpenRouter API key").fill("sk-or-test-only");
      await page.getByLabel("Model id").fill("test/model");
      await page.getByRole("button", { name: "Save AI configuration" }).click();
      await expect(page.getByRole("status")).toContainText("AI configuration saved");
      await page.getByRole("button", { name: "Back to app", exact: true }).click();
      const tools = page.getByRole("dialog", { name: "App tools" });
      await expect(tools).toBeVisible();
      await expect(tools.getByRole("tab", { name: "AI", exact: true })).toHaveAttribute("aria-selected", "true");
      await expect(tools.getByRole("tab", { name: "Chat", exact: true })).toHaveAttribute("aria-selected", "true");
      await expect(tools.getByText("Settings round trip", { exact: true })).toBeVisible();
      await expect(tools.getByLabel("Message", { exact: true })).toBeVisible();
      await tools.getByLabel("Message", { exact: true }).fill("Keep this chat draft too");
      await tools.getByRole("button", { name: /^BuilderAI/ }).click();
      await expect(page.getByLabel("OpenRouter API key")).toBeVisible();
      await page.goBack();
      await expect(tools.getByRole("tab", { name: "Chat", exact: true })).toHaveAttribute("aria-selected", "true");
      await expect(tools.getByLabel("Message", { exact: true })).toHaveValue("Keep this chat draft too");
      await tools.getByRole("tab", { name: "External", exact: true }).click();
      await expect(page.getByLabel("Describe your idea")).toHaveValue("Keep this idea while I set up AI");
    });

    test("supports profile settings, system appearance, sharing prerequisites, and browser navigation", async ({ page }) => {
      await page.goto("/");
      await page.getByRole("button", { name: "Settings", exact: true }).click();
      await page.getByRole("button", { name: "AI", exact: true }).click();
      await page.getByRole("button", { name: "AI Agent", exact: true }).click();
      await page.getByLabel("Active profile").selectOption("builtin-minimal-v1");
      await createApp(page, "Minimal live");
      await expect(frame(page).getByLabel("Note", { exact: true })).toBeVisible();
      await page.getByRole("button", { name: "Open app tools" }).click();
      const panel = page.getByRole("dialog", { name: "App tools" });
      const bounds = await panel.boundingBox();
      expect(bounds).not.toBeNull();
      expect(bounds!.width).toBeLessThanOrEqual(viewport.width);
      if (viewport.width >= 1024) {
        await frame(page).getByLabel("Note", { exact: true }).fill("The app stays interactive");
        await expect(frame(page).getByLabel("Note", { exact: true })).toHaveValue("The app stays interactive");
        await expect.poll(async () => {
          const app = await page.locator(".workspace-app").boundingBox();
          const tools = await panel.boundingBox();
          return app && tools ? app.x + app.width - tools.x : 1000;
        }).toBeLessThan(2);
      }
      await expect.poll(async () => {
        const visible = await panel.locator(".sheet-visible").boundingBox();
        return visible ? Math.abs(visible.y + visible.height - viewport.height) : 1000;
      }).toBeLessThan(2);
      await page.screenshot({ path: `test-results/next-${viewport.width}-tools.png`, animations: "disabled" });
      await page.getByRole("tab", { name: "Share", exact: true }).click();
      await page.getByRole("button", { name: "Set up storage" }).click();
      await expect(page.getByRole("button", { name: "First-time setup" })).toBeVisible();
      await expect(panel).toBeHidden();
      await page.getByTitle("Create or sign in to Firebase", { exact: true }).click();
      const completed = page.getByRole("checkbox", { name: "Create or sign in to Firebase", exact: true });
      const checkmark = completed.locator("..").locator(".setup-step-check");
      await expect(completed).toBeChecked();
      await expect(checkmark).toHaveCSS("background-color", "rgb(22, 125, 112)");
      await expect(checkmark).toHaveCSS("border-color", "rgb(22, 125, 112)");
      await expect(checkmark).toHaveCSS("color", "rgb(255, 255, 255)");
      await page.screenshot({ path: `test-results/next-${viewport.width}-setup-check-light.png`, animations: "disabled" });
      await page.emulateMedia({ colorScheme: "dark" });
      await expect(checkmark).toHaveCSS("background-color", "rgb(139, 211, 189)");
      await expect(checkmark).toHaveCSS("border-color", "rgb(139, 211, 189)");
      await expect(checkmark).toHaveCSS("color", "rgb(24, 61, 50)");
      await page.screenshot({ path: `test-results/next-${viewport.width}-setup-check-dark.png`, animations: "disabled" });
      await page.emulateMedia({ colorScheme: "light" });
      if (viewport.width < 1024) {
        await page.getByRole("button", { name: "3. Connect App Lab" }).click();
        await page.getByLabel("Firebase web app config", { exact: true }).scrollIntoViewIfNeeded();
        await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
        expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
        const header = await page.locator(".settings-page-header").boundingBox();
        expect(header?.y).toBe(0);
      }
      await page.screenshot({ path: `test-results/next-${viewport.width}-settings.png`, animations: "disabled" });
      await page.getByRole("button", { name: "Back to app", exact: true }).click();
      await expect(panel).toBeVisible();
      await expect(panel.getByRole("tab", { name: "Share", exact: true })).toHaveAttribute("aria-selected", "true");
      await expect(panel.getByRole("button", { name: "Set up storage" })).toBeVisible();
      await panel.getByRole("button", { name: "Close tools" }).click();
      await expect(frame(page).getByLabel("Note", { exact: true })).toBeVisible();
      await page.getByRole("button", { name: "Back to workspace" }).click();
      await expect(page.getByRole("button", { name: "Open Minimal live" })).toBeVisible();
      await page.goBack();
      await expect(frame(page).getByLabel("Note", { exact: true })).toBeVisible();
      await page.goForward();
      await expect(page.getByRole("button", { name: "Open Minimal live" })).toBeVisible();
      await page.screenshot({ path: `test-results/next-${viewport.width}-launcher.png` });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      await page.emulateMedia({ colorScheme: "dark" });
      await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
      await page.getByRole("button", { name: "Settings", exact: true }).click();
      await page.getByRole("button", { name: "General", exact: true }).click();
      await page.getByText("Light", { exact: true }).click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
      await page.reload();
      if (viewport.width < 1024) await page.getByRole("button", { name: "General", exact: true }).click();
      await expect(page.getByRole("radio", { name: "Light", exact: true })).toBeChecked();
    });
  });
}

function frame(page: Page) { return page.frameLocator('iframe[sandbox="allow-scripts"]'); }

async function createApp(page: Page, name: string) {
  await page.goto("/");
  await page.getByRole("button", { name: "New app", exact: true }).click();
  await page.getByLabel("App name", { exact: true }).fill(name);
  await page.getByRole("button", { name: "Create app", exact: true }).click();
  await expect(page.getByRole("button", { name: "Open app tools" })).toBeVisible();
}

async function copyApp(page: Page, withData: boolean) {
  await page.getByRole("button", { name: "Options for Shared counter", exact: true }).click();
  await page.getByRole("button", { name: "Copy app", exact: true }).click();
  await page.getByLabel("Include app data").setChecked(withData);
  await page.getByRole("button", { name: "Copy app", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "Copy app" })).toBeHidden();
}
