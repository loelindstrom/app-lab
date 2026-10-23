import { createServer } from "node:http";
import { copyFileSync, existsSync, mkdtempSync, readFileSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { extname, join, resolve } from "node:path";
import { build } from "vite";

const output = mkdtempSync(join(tmpdir(), "app-lab-pwa-test-"));
const production = join(output, "app-lab");
const staging = join(production, "staging");

process.on("exit", () => rmSync(output, { recursive: true, force: true }));

for (const [directory, config] of [[production, "vite.config.ts"], [staging, "vite.staging.config.mjs"]]) {
  await build({
    configFile: config,
    build: { outDir: directory, emptyOutDir: true },
  });
}

const types = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};
let metadataRequest = 0;
const server = createServer(async (request, response) => {
  const { pathname } = new URL(request.url, "http://127.0.0.1:5186");
  response.setHeader("Cache-Control", "no-store");
  // Rebuild changed HTML so Workbox must install a real precache update.
  if (request.method === "POST" && ["/__pwa_test/update", "/__pwa_test/retire"].includes(pathname)) {
    const retire = pathname === "/__pwa_test/retire";
    const version = String(Date.now());
    try {
      await build({
        configFile: retire ? "vite.config.ts" : "vite.staging.config.mjs",
        base: "/app-lab/staging/",
        build: { outDir: staging, emptyOutDir: true },
        plugins: [{
          name: "pwa-update-fixture",
          transformIndexHtml: () => [{ tag: "meta", attrs: { name: "pwa-test-build", content: version } }],
        }],
      });
      if (retire) copyFileSync("scripts/retire-staging-worker.js", join(staging, "sw.js"));
      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify({ version }));
    } catch (error) {
      response.writeHead(500).end(String(error));
    }
    return;
  }
  if (pathname === "/app-lab/staging/deploy.json") {
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify({ target: "staging", request: ++metadataRequest }));
    return;
  }
  let file = resolve(output, `.${decodeURIComponent(pathname)}`);
  if (!file.startsWith(`${output}/`)) {
    response.writeHead(403).end();
    return;
  }
  if (existsSync(file) && statSync(file).isDirectory()) {
    if (!pathname.endsWith("/")) {
      response.writeHead(301, { Location: `${pathname}/` }).end();
      return;
    }
    file = join(file, "index.html");
  }
  if (!existsSync(file) || !statSync(file).isFile()) {
    response.writeHead(404).end("Not found");
    return;
  }
  response.setHeader("Content-Type", types[extname(file)] ?? "application/octet-stream");
  response.end(readFileSync(file));
});
server.listen(5186, "127.0.0.1");
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
