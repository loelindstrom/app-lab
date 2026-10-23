import { expect, test, type Download } from "@playwright/test";

async function downloadedText(download: Download) {
  const stream = await download.createReadStream();
  if (!stream) throw new Error("Download stream unavailable");
  const chunks: Buffer[] = [];
  for await (const chunk of stream) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks).toString("utf8");
}

test("one alphabetical grid mixes owned and shared apps", async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/mock/");
  await expect(page.getByRole("list", { name: "Apps", exact: true })).toBeVisible();
  await expect(page.locator(".launcher-heading")).toHaveCount(0);
  await expect(page.locator(".launcher-app-name")).toHaveText(["Dinner club", "Little wins", "Plant care", "Reading list", "Trip fund", "Weekend board"]);
  const columns = await page.locator(".launcher-grid").evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(" ").length);
  if (page.viewportSize()!.width < 760) expect(columns).toBe(2);
  else expect(columns).toBeGreaterThanOrEqual(6);
  const fab = page.getByRole("button", { name: "New app", exact: true });
  await expect(fab).toHaveText("");
  await expect(page.locator(".launcher-dock")).toHaveCount(0);
  await expect(page.getByText("On this device", { exact: true })).toHaveCount(0);
  const fabBounds = await fab.boundingBox();
  expect(fabBounds!.width).toBe(56);
  expect(fabBounds!.height).toBe(56);
  expect(await fab.evaluate((el) => getComputedStyle(el).borderRadius)).toBe("50%");
  await expect(page.getByRole("button", { name: "Open Dinner club", exact: true })).toContainText("With Alex");
  await page.getByRole("searchbox", { name: "Search apps" }).fill("BOARD");
  await expect(page.locator(".launcher-app-name")).toHaveText(["Weekend board"]);
  await page.getByRole("searchbox", { name: "Search apps" }).fill("nothing matches");
  await expect(page.getByRole("heading", { name: "No apps found" })).toBeVisible();
  await page.getByRole("button", { name: "Clear search", exact: true }).first().click();
  await expect(page.locator(".launcher-app-name")).toHaveCount(6);
  if (page.viewportSize()!.width === 390) {
    const lastName = await page.locator(".launcher-app-detail").last().boundingBox();
    expect(lastName!.y + lastName!.height).toBeLessThanOrEqual(fabBounds!.y);
  }
  await page.mouse.move(0, 0);
  await page.screenshot({ path: `/tmp/applab-launcher-${testInfo.project.name}.png`, fullPage: true });
  expect(errors).toEqual([]);
});

test("app interaction, chat isolation, unread badges, and browser navigation", async ({ page }, testInfo) => {
  await page.goto("/mock/");
  await page.getByRole("button", { name: "Open Weekend board", exact: true }).click();
  await expect(page.getByRole("heading", { name: "For the weekend" })).toBeVisible();
  await page.getByRole("button", { name: "Mark Dinner at ours complete", exact: true }).click();
  await expect(page.getByRole("button", { name: "Mark Dinner at ours incomplete", exact: true })).toHaveAttribute("aria-pressed", "true");
  await page.screenshot({ path: `/tmp/applab-app-${testInfo.project.name}.png` });
  await page.getByRole("button", { name: "Open app tools", exact: true }).click();
  let dialog = page.getByRole("dialog", { name: "App tools", exact: true });
  await expect(dialog.locator(".sheet-visible")).toBeInViewport({ ratio: .99 });
  await page.screenshot({ path: `/tmp/applab-app-tools-${testInfo.project.name}.png` });
  await dialog.getByRole("tab", { name: "Develop", exact: true }).click();
  await dialog.getByRole("tab", { name: "Log", exact: true }).click();
  await expect(dialog.getByRole("log", { name: "App iframe console", exact: true })).toContainText("ReferenceError: selectedNote is not defined");
  await dialog.getByRole("tab", { name: "AI", exact: true }).click();
  await dialog.getByRole("tab", { name: "Chat", exact: true }).click();
  await dialog.getByRole("textbox", { name: "Message", exact: true }).fill("Make it a bit simpler");
  await dialog.getByRole("button", { name: "Send message", exact: true }).click();
  await dialog.getByRole("tab", { name: "External", exact: true }).click();
  await dialog.getByRole("button", { name: "Close tools", exact: true }).click();
  await page.getByRole("button", { name: "Back to workspace", exact: true }).click();
  const board = page.getByRole("button", { name: "Open Weekend board", exact: true });
  await expect(board).toBeVisible();
  await expect(board.locator(".attention-dot--reply")).toHaveCount(1);
  await page.getByRole("button", { name: "Open Dinner club", exact: true }).click();
  await page.getByRole("button", { name: "Open app tools", exact: true }).click();
  dialog = page.getByRole("dialog", { name: "App tools", exact: true });
  await dialog.getByRole("tab", { name: "Chat", exact: true }).click();
  await expect(dialog.locator(".chat-message")).toHaveCount(1);
  await dialog.getByRole("button", { name: "Close tools", exact: true }).click();
  await page.goBack();
  await expect(board).toBeVisible();
  await board.click();
  await page.getByRole("button", { name: "Open app tools", exact: true }).click();
  await dialog.getByRole("tab", { name: "Chat", exact: true }).click();
  await expect(dialog.getByText("Make it a bit simpler", { exact: true })).toBeVisible();
  await expect(dialog.locator(".chat-message--assistant")).toHaveCount(2);
  await dialog.getByRole("button", { name: "Close tools", exact: true }).click();
  await expect(page.getByRole("button", { name: "Open app tools", exact: true }).locator(".attention-dot")).toHaveCount(0);
  await page.goBack();
  await expect(board).toBeVisible();
  await page.goForward();
  await expect(page.getByRole("heading", { name: "For the weekend" })).toBeVisible();
});

test("create, edit, copy without data, share, and delete stay in the mock", async ({ page }) => {
  await page.goto("/mock/");
  await page.getByRole("button", { name: "New app", exact: true }).click();
  let dialog = page.getByRole("dialog", { name: "New app", exact: true });
  await dialog.getByRole("textbox", { name: "App name", exact: true }).fill("A paper moon");
  await dialog.getByRole("button", { name: "Create app", exact: true }).click();
  await expect(page.getByRole("heading", { name: "A paper moon", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Add a plan", exact: true }).click();
  await page.getByRole("textbox", { name: "New item", exact: true }).fill("A new plan");
  await page.getByRole("button", { name: "Add item", exact: true }).click();
  await expect(page.getByRole("button", { name: "Mark A new plan complete", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Open app tools", exact: true }).click();
  dialog = page.getByRole("dialog", { name: "App tools", exact: true });
  await dialog.getByRole("tab", { name: "Develop", exact: true }).click();
  await dialog.getByRole("textbox", { name: "App source (HTML)", exact: true }).fill('<!doctype html><html><head><title>A pocket atlas</title></head><body><h1>Somewhere new</h1><script>window.executedMockCode = true;</script></body></html>');
  await dialog.getByRole("button", { name: "Apply changes", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Somewhere new", exact: true })).toBeVisible();
  expect(await page.evaluate(() => Reflect.get(window, "executedMockCode"))).toBeUndefined();
  await page.getByRole("button", { name: "Back to workspace", exact: true }).click();
  await page.getByRole("button", { name: "Options for A pocket atlas", exact: true }).click();
  await page.getByRole("button", { name: "Copy app", exact: true }).click();
  dialog = page.getByRole("dialog", { name: "Copy app", exact: true });
  await dialog.getByRole("checkbox", { name: "Include app data", exact: true }).uncheck();
  await dialog.getByRole("button", { name: "Copy app", exact: true }).click();
  await page.getByRole("button", { name: "Open A pocket atlas copy", exact: true }).click();
  await expect(page.locator(".sample-app-note")).toHaveCount(0);
  await page.getByRole("button", { name: "Back to workspace", exact: true }).click();
  await page.getByRole("button", { name: "Options for A pocket atlas copy", exact: true }).click();
  await page.getByRole("button", { name: "Share app", exact: true }).click();
  dialog = page.getByRole("dialog", { name: "App tools", exact: true });
  await expect(dialog.getByRole("tab", { name: "Share", exact: true })).toHaveAttribute("aria-selected", "true");
  await dialog.getByRole("button", { name: "Close tools", exact: true }).click();
  await page.getByRole("button", { name: "Back to workspace", exact: true }).click();
  await page.getByRole("button", { name: "Options for A pocket atlas copy", exact: true }).click();
  await page.getByRole("button", { name: "Delete app", exact: true }).click();
  dialog = page.getByRole("dialog", { name: "Delete app?", exact: true });
  await dialog.getByRole("button", { name: "Delete", exact: true }).click();
  await expect(page.getByRole("button", { name: "Open A pocket atlas copy", exact: true })).toHaveCount(0);
  await page.reload();
  await expect(page.locator(".launcher-app-name")).toHaveCount(6);
  expect(await page.evaluate(() => localStorage.length)).toBe(0);
});

test("system appearance follows live device changes and explicit overrides", async ({ page }, testInfo) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/mock/");
  await page.getByRole("button", { name: "Settings", exact: true }).click();
  const settings = page.locator(".settings-screen");
  await expect(page.getByRole("heading", { name: "Settings", exact: true })).toBeVisible();
  const phone = page.viewportSize()!.width < 1024;
  if (phone) {
    await page.screenshot({ path: "/tmp/applab-settings-menu-phone.png" });
    await settings.getByRole("button", { name: "General", exact: true }).click();
  }
  await expect(settings.getByRole("radio", { name: "System", exact: true })).toBeChecked();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.screenshot({ path: `/tmp/applab-settings-${testInfo.project.name}.png` });
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await settings.getByText("Light", { exact: true }).click();
  await expect(settings.getByRole("radio", { name: "Light", exact: true })).toBeChecked();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.emulateMedia({ colorScheme: "light" });
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await settings.getByText("System", { exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  if (phone) await settings.getByRole("button", { name: "Back to settings", exact: true }).click();
  await settings.getByRole("button", { name: "AI", exact: true }).click();
  await settings.getByRole("combobox", { name: "Default profile", exact: true }).selectOption("Minimal");
  if (phone) await settings.getByRole("button", { name: "Back to settings", exact: true }).click();
  await settings.getByRole("button", { name: "Back to workspace", exact: true }).click();
  await expect(page.getByRole("button", { name: "Settings", exact: true })).toBeFocused();
  await page.mouse.move(0, 0);
  await page.screenshot({ path: `/tmp/applab-launcher-dark-${testInfo.project.name}.png`, fullPage: true });
  await page.getByRole("button", { name: "Settings", exact: true }).click();
  await page.goBack();
  await expect(page.getByRole("list", { name: "Apps", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "New app", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "New app", exact: true })).toContainText("Minimal");
});

test("settings categories and launcher/app icons remain distinct", async ({ page }, testInfo) => {
  await page.goto("/mock/");
  const settingsButton = page.getByRole("button", { name: "Settings", exact: true });
  await expect(settingsButton.locator("svg.lucide-settings")).toHaveCount(1);
  await settingsButton.click();
  const settings = page.locator(".settings-screen");
  const phone = page.viewportSize()!.width < 1024;
  await expect(settings.getByRole("navigation", { name: "Settings sections", exact: true }).getByRole("button")).toHaveText(["General", "Storage", "AI"]);
  await settings.getByRole("button", { name: "Storage", exact: true }).click();
  await expect(settings.getByRole("heading", { name: "Storage", exact: true })).toBeVisible();
  await expect(settings.getByText("Not connected", { exact: true })).toBeVisible();
  await expect(settings.getByRole("radio")).toHaveCount(0);
  await page.screenshot({ path: `/tmp/applab-settings-storage-${testInfo.project.name}.png` });
  if (phone) {
    await settings.getByRole("button", { name: "Back to settings", exact: true }).click();
    await expect(settings.getByRole("button", { name: "Storage", exact: true })).toBeFocused();
  }
  await settings.getByRole("button", { name: "AI", exact: true }).click();
  await expect(settings.getByRole("heading", { name: "AI", exact: true })).toBeVisible();
  await expect(settings.getByRole("combobox", { name: "Default profile", exact: true })).toBeVisible();
  await settings.getByRole("checkbox", { name: "AI animation", exact: true }).uncheck();
  await page.screenshot({ path: `/tmp/applab-settings-ai-${testInfo.project.name}.png` });
  if (phone) await settings.getByRole("button", { name: "Back to settings", exact: true }).click();
  await settings.getByRole("button", { name: "General", exact: true }).click();
  await expect(settings.getByRole("radio", { name: "System", exact: true })).toBeVisible();
  await expect(settings.getByRole("combobox", { name: "Default profile", exact: true })).toHaveCount(0);
  if (phone) await settings.getByRole("button", { name: "Back to settings", exact: true }).click();
  await settings.getByRole("button", { name: "AI", exact: true }).click();
  await expect(settings.getByRole("checkbox", { name: "AI animation", exact: true })).not.toBeChecked();
  if (phone) await settings.getByRole("button", { name: "Back to settings", exact: true }).click();
  await settings.getByRole("button", { name: "Back to workspace", exact: true }).click();
  await page.getByRole("button", { name: "Open Weekend board", exact: true }).click();
  await expect(page.getByRole("button", { name: "Open app tools", exact: true }).locator("svg.lucide-sparkles")).toHaveCount(1);
  await expect(page.getByRole("button", { name: "Open app tools", exact: true })).toHaveAttribute("data-shimmer", "false");
});

test("gallery remains accessible and narrow viewports do not overflow", async ({ page }) => {
  for (const width of [320, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/mock/");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    const nameBounds = await page.locator(".launcher-app-name").evaluateAll((nodes) => nodes.every((node) => node.scrollWidth <= node.clientWidth));
    expect(nameBounds).toBe(true);
  }
  await page.goto("/mock/gallery/");
  await expect(page.getByRole("heading", { name: "App shell", exact: true })).toBeVisible();
  await expect(page.getByRole("radio", { name: "System", exact: true })).toBeChecked();
  await page.getByRole("button", { name: "Open app tools", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "App tools", exact: true })).toBeVisible();
});

test("launcher header sticks while scrolling and FAB remains reachable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 600 });
  await page.goto("/mock/");
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  const header = await page.locator(".launcher-header").boundingBox();
  expect(header!.y).toBe(0);
  await expect(page.getByRole("button", { name: "Settings", exact: true })).toBeInViewport();
  const search = page.getByRole("searchbox", { name: "Search apps", exact: true });
  await expect(search).toBeInViewport({ ratio: 1 });
  const searchBar = await page.locator(".launcher-search-bar").boundingBox();
  const brandRow = await page.locator(".launcher-header-inner").boundingBox();
  expect(searchBar!.y).toBeGreaterThanOrEqual(brandRow!.y + brandRow!.height - 1);
  const fab = page.getByRole("button", { name: "New app", exact: true });
  await expect(fab).toBeInViewport({ ratio: 1 });
  await fab.click();
  await expect(page.getByRole("dialog", { name: "New app", exact: true })).toBeVisible();
});

test("desktop tools sit beside the interactive app and adapt without losing drafts", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto("/mock/");
  await page.getByRole("button", { name: "Open Weekend board", exact: true }).click();
  await page.getByRole("button", { name: "Open app tools", exact: true }).click();
  let panel = page.getByRole("dialog", { name: "App tools", exact: true });
  await expect(panel).toHaveAttribute("data-placement", "right");
  await expect(panel).toBeInViewport({ ratio: .99 });
  await expect(page.locator(".sheet-backdrop")).toHaveCount(0);
  const normal = await panel.boundingBox();
  expect(normal!.y).toBe(0);
  expect(normal!.height).toBe(960);
  await expect.poll(async () => { const bounds = (await panel.boundingBox())!; return Math.abs(bounds.x + bounds.width - 1440); }).toBeLessThan(1);
  await expect.poll(async () => (await page.locator(".workspace-app").boundingBox())!.width).toBeLessThanOrEqual(normal!.x + 1);
  await page.getByRole("button", { name: "Mark Dinner at ours complete", exact: true }).click();
  await expect(panel).toBeVisible();
  await panel.getByRole("button", { name: "Expand tools", exact: true }).click();
  await expect.poll(async () => (await panel.boundingBox())!.width).toBeGreaterThan(normal!.width + 50);
  const expanded = await panel.boundingBox();
  await expect.poll(async () => (await page.locator(".workspace-app").boundingBox())!.width).toBeLessThanOrEqual(expanded!.x + 1);
  await panel.getByRole("button", { name: "Reduce tools", exact: true }).click();
  await panel.getByRole("tab", { name: "Develop", exact: true }).click();
  const draft = '<!doctype html><html><title>A retained draft</title><body></body></html>';
  await panel.getByRole("textbox", { name: "App source (HTML)", exact: true }).fill(draft);
  await page.setViewportSize({ width: 390, height: 844 });
  panel = page.getByRole("dialog", { name: "App tools", exact: true });
  await expect(panel).toHaveAttribute("data-placement", "bottom");
  await expect(page.locator(".sheet-backdrop")).toBeVisible();
  await expect(panel.getByRole("textbox", { name: "App source (HTML)", exact: true })).toHaveValue(draft);
  await expect(panel.locator("[data-vaul-handle]")).toBeVisible();
  await page.setViewportSize({ width: 1280, height: 800 });
  panel = page.getByRole("dialog", { name: "App tools", exact: true });
  await expect(panel).toHaveAttribute("data-placement", "right");
  await expect(panel.getByRole("textbox", { name: "App source (HTML)", exact: true })).toHaveValue(draft);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.keyboard.press("Escape");
  await expect(panel).toBeHidden();
  await expect(page.getByRole("button", { name: "Open app tools", exact: true })).toBeFocused();
});

test("external AI follows describe, copy, open, paste, and apply in one view", async ({ page, context }, testInfo) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/mock/");
  await page.getByRole("button", { name: "Open Weekend board", exact: true }).click();
  await page.getByRole("button", { name: "Open app tools", exact: true }).click();
  const panel = page.getByRole("dialog", { name: "App tools", exact: true });
  const workflow = panel.getByRole("list", { name: "Edit with external AI", exact: true });
  await expect(workflow.locator(":scope > li")).toHaveCount(4);
  await expect(panel.getByRole("button", { name: "Apply code", exact: true })).toBeDisabled();
  await panel.getByRole("textbox", { name: "Describe your idea", exact: true }).fill("Make a tiny travel journal");
  await panel.getByRole("button", { name: "Copy prompt + code", exact: true }).click();
  await expect(panel.getByRole("button", { name: "Copied", exact: true })).toBeVisible();
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied).toContain("Make a tiny travel journal");
  expect(copied).toContain("<title>Weekend board</title>");
  for (const [name, url] of [["ChatGPT", "https://chatgpt.com/"], ["Claude", "https://claude.ai/new"], ["Gemini", "https://gemini.google.com/app"]]) {
    const link = panel.getByRole("link", { name: new RegExp(`^${name} `) });
    await expect(link).toHaveAttribute("href", url);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }
  await panel.locator(".sheet-scroll").evaluate((el) => { el.scrollTop = 0; });
  await page.screenshot({ path: `/tmp/applab-external-flow-${testInfo.project.name}.png` });
  const reply = '<!doctype html><html><head><title>Travel journal</title></head><body><h1>Places to remember</h1></body></html>';
  await page.evaluate((html) => navigator.clipboard.writeText(html), reply);
  await panel.getByRole("button", { name: "Paste", exact: true }).click();
  await expect(panel.getByRole("textbox", { name: "Paste the new code", exact: true })).toHaveValue(reply);
  await panel.getByRole("tab", { name: "Chat", exact: true }).click();
  await panel.getByRole("tab", { name: "External", exact: true }).click();
  await expect(panel.getByRole("textbox", { name: "Paste the new code", exact: true })).toHaveValue(reply);
  await panel.getByRole("button", { name: "Apply code", exact: true }).click();
  await expect(panel).toBeHidden();
  await expect(page.getByRole("heading", { name: "Places to remember", exact: true })).toBeVisible();
  await expect(page.locator(".workspace-app-identity strong")).toHaveText("Travel journal");
});

test("external workflow hierarchy stays readable across widths and themes", async ({ page }, testInfo) => {
  await page.goto("/mock/");
  await page.getByRole("button", { name: "Open Weekend board", exact: true }).click();
  await page.getByRole("button", { name: "Open app tools", exact: true }).click();
  const panel = page.getByRole("dialog", { name: "App tools", exact: true });
  const widths = testInfo.project.name === "phone" ? [320, 390] : [1024, 1440];
  for (const width of widths) {
    await page.setViewportSize({ width, height: 844 });
    for (const theme of ["light", "dark"] as const) {
      await page.emulateMedia({ colorScheme: theme });
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      await expect(panel.locator(".sheet-visible")).toBeInViewport({ ratio: .99 });
      const hierarchy = await panel.locator(".external-workflow").evaluate((el) => {
        const headings = Array.from(el.querySelectorAll<HTMLElement>(".workflow-heading, .editor-toolbar > label"));
        const sizes = headings.map((heading) => parseFloat(getComputedStyle(heading).fontSize));
        return {
          sizes,
          weights: headings.map((heading) => Number(getComputedStyle(heading).fontWeight)),
          inputSize: parseFloat(getComputedStyle(el.querySelector("textarea")!).fontSize),
          hintSize: parseFloat(getComputedStyle(el.querySelector(".workflow-hint")!).fontSize),
          fits: headings.every((heading) => heading.scrollWidth <= heading.clientWidth + 1),
        };
      });
      expect(hierarchy.sizes).toHaveLength(4);
      expect(new Set(hierarchy.sizes).size).toBe(1);
      expect(hierarchy.weights.every((weight) => weight >= 600)).toBe(true);
      expect(hierarchy.inputSize).toBeLessThanOrEqual(hierarchy.sizes[0]);
      expect(hierarchy.hintSize).toBeLessThan(hierarchy.sizes[0]);
      expect(hierarchy.fits).toBe(true);
      await panel.locator(".sheet-scroll").evaluate((el) => { el.scrollTop = 0; });
      await page.screenshot({ path: `/tmp/applab-flow-hierarchy-${width}-${theme}.png` });
    }
    await panel.getByRole("button", { name: "About the prompt", exact: true }).click();
    const help = await panel.getByRole("tooltip").boundingBox();
    const bounds = await panel.boundingBox();
    expect(help!.x).toBeGreaterThanOrEqual(bounds!.x);
    expect(help!.x + help!.width).toBeLessThanOrEqual(bounds!.x + bounds!.width);
    await page.keyboard.press("Escape");
    await expect(panel).toBeVisible();
    await expect(panel.getByRole("tooltip")).toHaveCount(0);
  }
});

test("iframe console and preview share link support copying", async ({ page, context }, testInfo) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/mock/");
  await page.getByRole("button", { name: "Open Weekend board", exact: true }).click();
  await page.getByRole("button", { name: "Open app tools", exact: true }).click();
  const panel = page.getByRole("dialog", { name: "App tools", exact: true });
  await panel.getByRole("tab", { name: "Develop", exact: true }).click();
  await panel.getByRole("tab", { name: "Log", exact: true }).click();
  const output = panel.getByRole("log", { name: "App iframe console", exact: true });
  await expect(panel.getByRole("heading", { name: "App console", exact: true })).toBeVisible();
  await expect(output).toContainText("Loaded data:");
  await expect(output).toContainText("app.html:27:18");
  await expect(output.locator('[data-level="warn"]')).toHaveCount(1);
  await expect(output.locator('[data-level="error"]')).toHaveCount(1);
  await panel.getByRole("button", { name: "Copy log", exact: true }).click();
  await expect(panel.getByRole("button", { name: "Copied", exact: true })).toBeVisible();
  const consoleText = await page.evaluate(() => navigator.clipboard.readText());
  expect(consoleText).toContain("INFO [App] Initialized");
  expect(consoleText).toContain("ERROR ReferenceError: selectedNote is not defined");
  expect(consoleText).toContain("at toggleNote (app.html:27:18)");
  await page.screenshot({ path: `/tmp/applab-console-${testInfo.project.name}.png` });
  await panel.getByRole("button", { name: "Clear console", exact: true }).click();
  await expect(panel.getByText("No console output.", { exact: true })).toBeVisible();
  await expect(panel.getByRole("button", { name: "Copy log", exact: true })).toBeDisabled();
  await panel.getByRole("tab", { name: "Share", exact: true }).click();
  const link = panel.getByRole("textbox", { name: "Share link", exact: true });
  await expect(link).toHaveValue("https://app-lab.example/invite/weekend");
  await expect(link).toHaveAttribute("readonly", "");
  await panel.getByRole("button", { name: "Copy link", exact: true }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(await link.inputValue());
  await expect(panel.getByRole("button", { name: "Copied", exact: true })).toBeVisible();
  await page.screenshot({ path: `/tmp/applab-share-${testInfo.project.name}.png` });
  await page.evaluate(() => { navigator.clipboard.writeText = async () => { throw new Error("Denied"); }; });
  await panel.getByRole("button", { name: "Copied", exact: true }).click();
  await expect(panel.getByRole("alert")).toHaveText("Couldn't copy. Select the link to copy it.");
});

test("AI tool shimmer moves, stops after five seconds, and respects reduced motion", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/mock/");
  await page.getByRole("button", { name: "Open Weekend board", exact: true }).click();
  const button = page.getByRole("button", { name: "Open app tools", exact: true });
  await expect(button).toHaveAttribute("data-shimmer", "true");
  await expect.poll(() => button.evaluate((el) => getComputedStyle(el, "::before").animationName)).toBe("tools-button-sheen");
  await button.evaluate((el) => el.getAnimations({ subtree: true }).forEach((animation) => { animation.pause(); animation.currentTime = 800; }));
  const first = await button.screenshot();
  const firstBackground = await button.evaluate((el) => getComputedStyle(el, "::before").transform);
  await button.evaluate((el) => el.getAnimations({ subtree: true }).forEach((animation) => { animation.currentTime = 1800; }));
  const second = await button.screenshot({ path: `/tmp/applab-shimmer-${testInfo.project.name}.png` });
  expect(first.equals(second)).toBe(false);
  expect(await button.evaluate((el) => getComputedStyle(el, "::before").transform)).not.toBe(firstBackground);
  await expect(button).toHaveAttribute("data-shimmer", "false", { timeout: 6000 });
  expect(await button.evaluate((el) => getComputedStyle(el, "::before").animationName)).toBe("none");
  await page.getByRole("button", { name: "Back to workspace", exact: true }).click();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.getByRole("button", { name: "Open Weekend board", exact: true }).click();
  expect(await button.evaluate((el) => getComputedStyle(el, "::before").animationName)).toBe("none");
  expect(await button.locator(".ai-tools-stars > path").first().evaluate((el) => getComputedStyle(el).animationName)).toBe("none");
});

test("empty workspace offers creation and blank names can be replaced by source titles", async ({ page }, testInfo) => {
  await page.goto("/mock/");
  const names = await page.locator(".launcher-app-name").allTextContents();
  for (const name of names) {
    await page.getByRole("button", { name: `Options for ${name}`, exact: true }).click();
    await page.getByRole("button", { name: "Delete app", exact: true }).click();
    await page.getByRole("dialog", { name: "Delete app?", exact: true }).getByRole("button", { name: "Delete", exact: true }).click();
    await expect(page.getByRole("button", { name: `Open ${name}`, exact: true })).toHaveCount(0);
  }
  const empty = page.locator(".launcher-empty");
  await expect(empty).toHaveText('Press "+" to create your first app');
  await expect(empty.locator("svg")).toHaveCount(0);
  await page.screenshot({ path: `/tmp/applab-empty-workspace-${testInfo.project.name}.png` });
  await page.getByRole("button", { name: "New app", exact: true }).click();
  const create = page.getByRole("dialog", { name: "New app", exact: true });
  await expect(create.getByRole("textbox", { name: "App name", exact: true })).toHaveValue("");
  await expect(create.getByText("Optional. Leave blank to let AI name your app.", { exact: true })).toBeVisible();
  await expect(create.getByRole("button", { name: "Create app", exact: true })).toBeEnabled();
  await expect(create).toBeInViewport({ ratio: .99 });
  await page.screenshot({ path: `/tmp/applab-create-optional-name-${testInfo.project.name}.png` });
  await create.getByRole("button", { name: "Create app", exact: true }).click();
  await expect(page.locator(".workspace-app-identity strong")).toHaveText("Untitled app");
  await page.getByRole("button", { name: "Open app tools", exact: true }).click();
  const tools = page.getByRole("dialog", { name: "App tools", exact: true });
  await tools.getByRole("tab", { name: "Develop", exact: true }).click();
  await tools.getByRole("textbox", { name: "App source (HTML)", exact: true }).fill("<!doctype html><html><head><title>Pocket garden</title></head><body><h1>Grow something</h1></body></html>");
  await tools.getByRole("button", { name: "Apply changes", exact: true }).click();
  await expect(page.locator(".workspace-app-identity strong")).toHaveText("Pocket garden");
  await page.getByRole("button", { name: "Back to workspace", exact: true }).click();
  await expect(page.getByRole("button", { name: "Open Pocket garden", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "New app", exact: true }).click();
  await create.getByRole("textbox", { name: "App name", exact: true }).fill("   ");
  await create.getByRole("button", { name: "Create app", exact: true }).click();
  await expect(page.locator(".workspace-app-identity strong")).toHaveText("Untitled app");
});

test("toolbar back after browser forward does not duplicate the launcher in history", async ({ page }) => {
  await page.goto("/mock/gallery/");
  await page.goto("/mock/");
  await page.getByRole("button", { name: "Open Weekend board", exact: true }).click();
  await page.getByRole("button", { name: "Back to workspace", exact: true }).click();
  await expect(page.getByRole("list", { name: "Apps", exact: true })).toBeVisible();
  await page.goForward();
  await expect(page.getByRole("heading", { name: "For the weekend", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Back to workspace", exact: true }).click();
  await expect(page.getByRole("list", { name: "Apps", exact: true })).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/\/mock\/gallery\/$/);
});

test("file editors import, copy, export, and validate without losing drafts", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/mock/");
  await page.getByRole("button", { name: "Open Weekend board", exact: true }).click();
  await page.getByRole("button", { name: "Open app tools", exact: true }).click();
  const panel = page.getByRole("dialog", { name: "App tools", exact: true });
  await panel.getByRole("tab", { name: "Develop", exact: true }).click();
  const source = '<!doctype html><html><head><title>Imported source</title></head><body><h1>From a file</h1></body></html>';
  const sourcePicker = page.waitForEvent("filechooser");
  await panel.getByRole("button", { name: "Import code file", exact: true }).click();
  await (await sourcePicker).setFiles({ name: "app.html", mimeType: "text/html", buffer: Buffer.from(source) });
  const sourceEditor = panel.getByRole("textbox", { name: "App source (HTML)", exact: true });
  await expect(sourceEditor).toHaveValue(source);
  await panel.getByText("HTML", { exact: true }).click();
  await expect(sourceEditor).toBeFocused();
  await panel.getByRole("button", { name: "Copy code", exact: true }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(source);
  const sourceDownload = page.waitForEvent("download");
  await panel.getByRole("button", { name: "Export code file", exact: true }).click();
  const html = await sourceDownload;
  expect(html.suggestedFilename()).toBe("app.html");
  expect(await downloadedText(html)).toBe(source);
  await panel.getByRole("tab", { name: "Data", exact: true }).click();
  const dataEditor = panel.getByRole("textbox", { name: "App data (JSON)", exact: true });
  await dataEditor.fill("{broken");
  await panel.getByRole("button", { name: "Apply data", exact: true }).click();
  await expect(panel.getByRole("alert")).toHaveText("Enter valid JSON before applying changes.");
  await expect(dataEditor).toHaveValue("{broken");
  const data = '{"notes":[{"title":"From JSON"}]}';
  const dataPicker = page.waitForEvent("filechooser");
  await panel.getByRole("button", { name: "Import data file", exact: true }).click();
  await (await dataPicker).setFiles({ name: "notes.json", mimeType: "application/json", buffer: Buffer.from(data) });
  await expect(dataEditor).toHaveValue(data);
  await expect(panel.getByRole("alert")).toHaveCount(0);
  const dataDownload = page.waitForEvent("download");
  await panel.getByRole("button", { name: "Export data file", exact: true }).click();
  const json = await dataDownload;
  expect(json.suggestedFilename()).toBe("app-data.json");
  expect(await downloadedText(json)).toBe(data);
  await page.evaluate(() => { navigator.clipboard.readText = async () => { throw new Error("Denied"); }; });
  await panel.getByRole("button", { name: "Paste", exact: true }).click();
  await expect(panel.getByRole("status")).toHaveText("Clipboard unavailable. Paste directly into the editor.");
  await expect(dataEditor).toHaveValue(data);
  await panel.getByRole("tab", { name: "Code", exact: true }).click();
  await expect(sourceEditor).toHaveValue(source);
});
