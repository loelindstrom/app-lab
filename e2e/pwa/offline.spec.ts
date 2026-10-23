import { expect, test, type Page } from "@playwright/test";
import { resolveConfig } from "vite";

const PRODUCTION = "/app-lab/";
const STAGING = "/app-lab/staging/";
const SOURCE = `<!doctype html><html><head>
<meta name="app-lab-tailwind" content="enabled"><title>Offline counter</title>
</head><body><main class="p-4"><h1>Offline counter</h1><p id="count">Loading</p>
<button id="increment">Add one</button></main><script>
let data;
AppLab.getData({count:0}).then(value => { data=value; render(); });
function render(){ document.getElementById('count').textContent=String(data.count); }
document.getElementById('increment').onclick=async()=>{data.count++;await AppLab.saveData(data);render();};
</script></body></html>`;

async function install(page: Page, base: string) {
  await page.goto(base);
  // Production may initially control staging, so wait for the exact registration.
  await expect.poll(() => page.evaluate(async (path) => {
    const scope = new URL(path, location.origin).href;
    const registration = await navigator.serviceWorker.getRegistration(scope);
    return registration?.scope === scope ? registration.active?.state : null;
  }, base), { timeout: 30_000 }).toBe("activated");
  await page.reload();
  expect(await page.evaluate(() => navigator.serviceWorker.controller?.scriptURL)).toContain(`${base}sw.js`);
}

for (const [target, base, otherBase] of [
  ["production", PRODUCTION, STAGING],
  ["staging", STAGING, PRODUCTION],
]) {
  test.describe(target, () => {
    test("rejects the other environment's worker scope", async () => {
      await expect(resolveConfig({ configFile: `vite.${target}.config.mjs`, base: otherBase }, "build"))
        .rejects.toThrow(`The app-lab-${target} worker requires base ${base}.`);
    });

    test("reopens offline, compiles Tailwind, and persists edits", async ({ page, context }) => {
      await install(page, base);
      await context.setOffline(true);
      await page.goto(base);
      await page.getByRole("button", { name: "New app", exact: true }).click();
      await page.getByLabel("App name", { exact: true }).fill("Offline draft");
      await page.getByRole("button", { name: "Create app", exact: true }).click();
      await page.getByRole("button", { name: "Open app tools" }).click();
      await page.getByRole("tab", { name: "Develop", exact: true }).click();
      await page.getByLabel("App source (HTML)").fill(SOURCE);
      await page.getByRole("button", { name: "Apply changes" }).click();
      const frame = page.frameLocator('iframe[sandbox="allow-scripts"]');
      await expect(frame.getByRole("heading", { name: "Offline counter" })).toBeVisible();
      await expect(frame.locator("main")).toHaveCSS("padding", "16px");
      await frame.getByRole("button", { name: "Add one" }).click();
      await expect(frame.locator("#count")).toHaveText("1");
      await page.reload();
      await expect(frame.locator("#count")).toHaveText("1");
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.fonts.check('16px "Inter Variable"'))).toBe(true);
      await page.goto(base);
      await page.getByRole("button", { name: "Open Offline counter", exact: true }).click();
      await expect(frame.locator("#count")).toHaveText("1");
    });

    test("caches its manifest and flask icons, but keeps deployment metadata live", async ({ page, context }) => {
      await install(page, base);
      const first = await page.evaluate(async () => (await fetch("deploy.json")).json());
      const second = await page.evaluate(async () => (await fetch("deploy.json")).json());
      expect(second.request).toBeGreaterThan(first.request);
      const entries = await page.evaluate(async () => {
        const keys = await caches.keys();
        return { keys, urls: (await Promise.all(keys.map(async (key) => (await (await caches.open(key)).keys()).map((request) => request.url)))).flat() };
      });
      expect(entries.keys.length).toBeGreaterThan(0);
      expect(entries.keys.every((key) => key.startsWith(`app-lab-${target}-`))).toBe(true);
      expect(entries.urls.every((url) => new URL(url).pathname.startsWith(base))).toBe(true);
      if (target === "production") expect(entries.urls.some((url) => new URL(url).pathname.startsWith(STAGING))).toBe(false);
      expect(entries.urls.some((url) => url.includes("deploy.json"))).toBe(false);
      expect((await page.request.get(`${base}next/`)).status()).toBe(404);
      await context.setOffline(true);
      const manifest = await page.evaluate(async () => (await fetch("manifest.webmanifest")).json());
      expect(manifest.scope).toBe(base);
      expect(manifest.start_url).toBe(base);
      for (const size of [192, 512]) {
        const src = `${base}icons/flask-${size}.png`;
        expect(manifest.icons).toContainEqual(expect.objectContaining({ src, sizes: `${size}x${size}` }));
        expect(await page.evaluate(async (url) => (await fetch(url)).ok, src)).toBe(true);
      }
      expect(await page.evaluate(() => fetch("deploy.json").then(() => true, () => false))).toBe(false);
      expect(await page.evaluate(() => fetch("missing-page/").then(() => true, () => false))).toBe(false);
    });

    test("updates wait for all its tabs to close", async ({ page, context, request }) => {
      await install(page, otherBase);
      await install(page, base);
      const other = await context.newPage();
      await other.goto(base);
      const update = await request.post(`/__pwa_test/update?target=${target}`);
      expect(update.ok()).toBe(true);
      const { version } = await update.json();
      await page.evaluate(async () => { await (await navigator.serviceWorker.ready).update(); });
      await expect.poll(() => page.evaluate(async () => (await navigator.serviceWorker.ready).waiting?.state)).toBe("installed");
      await page.reload();
      expect(await page.evaluate(() => document.querySelector('meta[name="pwa-test-build"]')?.getAttribute("content"))).not.toBe(version);
      await page.close();
      await expect.poll(() => other.evaluate(async () => !!(await navigator.serviceWorker.ready).waiting)).toBe(true);
      await other.close();
      const reopened = await context.newPage();
      await reopened.goto(base);
      await expect.poll(() => reopened.evaluate(async () => (await navigator.serviceWorker.ready).waiting?.state ?? null)).toBeNull();
      await context.setOffline(true);
      await reopened.reload();
      await expect(reopened.locator('meta[name="pwa-test-build"]')).toHaveAttribute("content", version);
      await reopened.goto(otherBase);
      await reopened.getByRole("button", { name: "New app", exact: true }).waitFor();
      expect(await reopened.evaluate(() => navigator.serviceWorker.controller?.scriptURL)).toContain(`${otherBase}sw.js`);
    });
  });
}

for (const order of [[PRODUCTION, STAGING], [STAGING, PRODUCTION]]) {
  test(`workers coexist when ${order[0]} is installed first`, async ({ page, context }) => {
    for (const base of order) await install(page, base);
    await context.setOffline(true);
    for (const base of [PRODUCTION, STAGING]) {
      await page.goto(base);
      await page.getByRole("button", { name: "New app", exact: true }).waitFor();
      expect(await page.evaluate(() => navigator.serviceWorker.controller?.scriptURL)).toContain(`${base}sw.js`);
      const urls = await page.evaluate(async () => {
        const registration = await navigator.serviceWorker.ready;
        const name = (await caches.keys()).find(key => key.endsWith(registration.scope))!;
        return (await (await caches.open(name)).keys()).map(request => request.url);
      });
      if (base === PRODUCTION) expect(urls.some(url => new URL(url).pathname.startsWith(STAGING))).toBe(false);
    }
  });
}

for (const [target, base, otherBase] of [["production", PRODUCTION, STAGING], ["staging", STAGING, PRODUCTION]]) {
  test(`${target} rollback preserves app data and the other environment's worker`, async ({ page, request }) => {
    await install(page, base);
    await page.getByRole("button", { name: "New app", exact: true }).click();
    await page.getByLabel("App name", { exact: true }).fill("Offline board");
    await page.getByRole("button", { name: "Create app", exact: true }).click();
    await expect(page.locator('iframe[sandbox="allow-scripts"]')).toBeVisible();
    await install(page, otherBase);
    await page.goto(base);
    const otherScope = new URL(otherBase, page.url()).href;
    const preserved = await page.evaluate(async (scope) => (await caches.keys()).filter(key => key.endsWith(scope)), otherScope);
    try {
      const rollback = await request.post(`/__pwa_test/retire?target=${target}`);
      expect(rollback.ok()).toBe(true);
      const { version } = await rollback.json();
      await page.evaluate(async () => { await (await navigator.serviceWorker.ready).update(); });
      await expect.poll(() => page.evaluate(async (path) => {
        const scope = new URL(path, location.origin).href;
        return (await navigator.serviceWorker.getRegistrations()).some(registration => registration.scope === scope);
      }, base)).toBe(false);
      expect(await page.evaluate(() => caches.keys())).toEqual(preserved);
      await page.reload();
      await expect(page.locator('meta[name="pwa-test-build"]')).toHaveAttribute("content", version);
      await page.getByRole("button", { name: "Open Offline board", exact: true }).click();
      await expect(page.frameLocator('iframe[sandbox="allow-scripts"]').getByRole("heading", { name: "Active notes" })).toBeVisible();
      expect(await page.evaluate(async (scope) => (await navigator.serviceWorker.getRegistrations()).some(registration => registration.scope === scope), otherScope)).toBe(true);
    } finally {
      const restore = await request.post(`/__pwa_test/update?target=${target}`);
      expect(restore.ok()).toBe(true);
    }
  });
}
