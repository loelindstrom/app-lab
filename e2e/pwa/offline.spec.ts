import { expect, test, type Page } from "@playwright/test";
import { resolveConfig } from "vite";

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

async function install(page: Page, path = STAGING) {
  await page.goto(path);
  await page.evaluate(async () => {
    const registration = await navigator.serviceWorker.ready;
    if (registration.active?.state !== "activated") {
      await new Promise<void>((resolve) => registration.active!.addEventListener("statechange", () => {
        if (registration.active?.state === "activated") resolve();
      }));
    }
  });
  await page.reload();
  expect(await page.evaluate(() => navigator.serviceWorker.controller?.scriptURL)).toContain(`${STAGING}sw.js`);
}

test("staging refuses a worker scoped to the production base", async () => {
  await expect(resolveConfig({ configFile: "vite.staging.config.mjs", base: "/app-lab/" }, "build"))
    .rejects.toThrow("The staging worker requires an absolute base path ending in /staging/.");
});

test("the main UI reopens offline, compiles local Tailwind, and persists edits", async ({ page, context }) => {
  await install(page);
  // A fresh offline navigation must load the new shell and its precached assets.
  await context.setOffline(true);
  await page.goto(STAGING);
  await expect(page).toHaveTitle("App Lab");
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

  await page.goto(STAGING);
  await expect(page).toHaveTitle("App Lab");
  await page.getByRole("button", { name: "Open Offline counter", exact: true }).click();
  await expect(frame.locator("#count")).toHaveText("1");
  await frame.getByRole("button", { name: "Add one" }).click();
  await expect(frame.locator("#count")).toHaveText("2");
  await page.goto(STAGING);
  await page.getByRole("button", { name: "Open Offline counter", exact: true }).click();
  await expect(frame.locator("#count")).toHaveText("2");
});

test("production and live metadata stay outside the staging cache", async ({ page, context }) => {
  await install(page);
  const first = await page.evaluate(async () => (await fetch("deploy.json")).json());
  const second = await page.evaluate(async () => (await fetch("deploy.json")).json());
  expect(second.request).toBeGreaterThan(first.request);
  const cachedUrls = await page.evaluate(async () => {
    const keys = await caches.keys();
    return { keys, urls: (await Promise.all(keys.map(async (key) => (await (await caches.open(key)).keys()).map((request) => request.url)))).flat() };
  });
  expect(cachedUrls.keys.length).toBeGreaterThan(0);
  expect(cachedUrls.keys.every((key) => key.startsWith("app-lab-staging-"))).toBe(true);
  expect(cachedUrls.urls.every((url) => new URL(url).pathname.startsWith(STAGING))).toBe(true);
  expect(cachedUrls.urls.some((url) => url.includes("deploy.json"))).toBe(false);
  expect((await page.request.get(`${STAGING}next/`)).status()).toBe(404);
  expect((await page.request.get("/app-lab/sw.js")).status()).toBe(404);

  await page.goto("/app-lab/");
  expect(await page.evaluate(() => navigator.serviceWorker.controller)).toBeNull();
  await context.setOffline(true);
  await page.goto(STAGING);
  await expect(page).toHaveTitle("App Lab");
  expect(await page.evaluate(() => fetch("deploy.json").then(() => true, () => false))).toBe(false);
  expect(await page.evaluate(() => fetch("missing-page/").then(() => true, () => false))).toBe(false);
});

test("updates wait for all staging tabs to close", async ({ page, context, request }) => {
  await install(page);
  const other = await context.newPage();
  await other.goto(STAGING);
  const update = await request.post("/__pwa_test/update");
  expect(update.ok()).toBe(true);
  const { version } = await update.json();
  await page.evaluate(async () => { await (await navigator.serviceWorker.ready).update(); });
  await expect.poll(() => page.evaluate(async () => (await navigator.serviceWorker.ready).waiting?.state)).toBe("installed");
  await page.reload();
  expect(await page.evaluate(() => document.querySelector('meta[name="pwa-test-build"]')?.getAttribute("content")))
    .not.toBe(version);
  await expect.poll(() => page.evaluate(async () => !!(await navigator.serviceWorker.ready).waiting)).toBe(true);
  await page.close();
  await expect.poll(() => other.evaluate(async () => !!(await navigator.serviceWorker.ready).waiting)).toBe(true);
  await other.close();
  const reopened = await context.newPage();
  await reopened.goto(STAGING);
  await expect.poll(() => reopened.evaluate(async () => (await navigator.serviceWorker.ready).waiting?.state ?? null)).toBeNull();
  await expect(reopened.locator('meta[name="pwa-test-build"]')).toHaveAttribute("content", version);
  await context.setOffline(true);
  await reopened.goto(STAGING);
  await expect(reopened).toHaveTitle("App Lab");
  await expect(reopened.locator('meta[name="pwa-test-build"]')).toHaveAttribute("content", version);
});

test("rollback retires the worker while preserving app data and unrelated caches", async ({ page, request }) => {
  await install(page);
  await page.getByRole("button", { name: "New app", exact: true }).click();
  await page.getByLabel("App name", { exact: true }).fill("Offline board");
  await page.getByRole("button", { name: "Create app", exact: true }).click();
  await expect(page.locator('iframe[sandbox="allow-scripts"]')).toBeVisible();
  await page.evaluate(async () => {
    const cache = await caches.open("production-cache-sentinel");
    await cache.put("/app-lab/keep", new Response("keep"));
  });
  const rollback = await request.post("/__pwa_test/retire");
  expect(rollback.ok()).toBe(true);
  const { version } = await rollback.json();
  await page.evaluate(async () => { await (await navigator.serviceWorker.ready).update(); });
  await expect.poll(() => page.evaluate(async () => (await navigator.serviceWorker.getRegistrations()).length)).toBe(0);
  expect(await page.evaluate(() => caches.keys())).toEqual(["production-cache-sentinel"]);
  await page.reload();
  await expect(page.locator('meta[name="pwa-test-build"]')).toHaveAttribute("content", version);
  expect(await page.evaluate(() => navigator.serviceWorker.controller)).toBeNull();
  await page.goto(STAGING);
  await page.getByRole("button", { name: "Open Offline board", exact: true }).click();
  await expect(page.frameLocator('iframe[sandbox="allow-scripts"]').getByRole("heading", { name: "Active notes" })).toBeVisible();
});
