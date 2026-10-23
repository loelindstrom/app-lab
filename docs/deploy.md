# Deployment

App Lab is a static Vite application published to GitHub Pages.

## Summary

| Concern | Answer |
| --- | --- |
| Source branch | `main` |
| Published branch | `gh-pages` |
| Local Pages worktree | ignored `dist/` directory |
| Production URL | `https://loelindstrom.github.io/app-lab/` |
| Staging URL | `https://loelindstrom.github.io/app-lab/staging/` |
| Release identity | committed source ref, optionally tagged `vX.Y.Z` |
| Metadata | `deploy.json` in each published output |

## Why

Deployments must identify the exact committed source that is live without mixing generated files into `main` or disturbing
uncommitted work. The deploy script archives a chosen Git ref, builds it in a temporary directory, and publishes only the output
through a separate `gh-pages` worktree.

## First-Time Setup

1. Open **GitHub Settings > Pages**.
2. Choose **Deploy from a branch**.
3. Select `gh-pages` and `/ (root)`.

The script can create the branch on the first deployment.

## Staging

Staging is published into the `staging/` directory of the same `gh-pages` branch. Production and staging deployments preserve each
other, and each has its own metadata file:

```bash
pnpm deploy:pages -- --target staging --ref HEAD
pnpm deploy:pages -- --target production --ref HEAD --version v0.6.0
```

The deployed commit and target are available at `/app-lab/staging/deploy.json` or `/app-lab/deploy.json`. Staging intentionally uses the same browser
origin and therefore the same IndexedDB and local storage as production.

## Offline PWA

Production uses `vite.production.config.mjs`; staging uses `vite.staging.config.mjs`. Each extends the normal Vite configuration
with `scripts/pages-pwa.mjs`, without importing the other target's configuration. Both builds emit their manifest and a Workbox
service worker before publication. Normal `pnpm dev` uses `vite.config.ts` and does not register a worker.

| Target | Worker And Scope | Cache Prefix |
| --- | --- | --- |
| Production | `/app-lab/sw.js`, `/app-lab/` | `app-lab-production` |
| Staging | `/app-lab/staging/sw.js`, `/app-lab/staging/` | `app-lab-staging` |

Each target rejects a base-path override that differs from its configured scope. Production's browser scope includes the nested
staging URL, but its worker handles only exact production build assets. It has no catch-all navigation fallback or runtime cache,
so staging requests pass through until staging's more specific worker takes control. Production and staging never precache each
other's files. Cache cleanup and rollback retirement are limited to the worker's exact scope.
Workbox's broad cleanup of old cache formats is disabled because it matches nested scopes by substring; normal cleanup of obsolete
assets within each worker's own precache remains automatic.

After one online visit finishes installation, the app can reopen offline. The cache includes the shell, JavaScript, CSS, fonts,
flask icons, manifest, and local Tailwind compiler. Hash navigation works; the removed legacy shell and `next/` entry are not cached.
App records and data remain in the existing shared IndexedDB stores. Local source editing and data changes work offline; Firebase
and OpenRouter require connectivity. Existing sync queues retry when the app reconnects. The browser may evict cached files under
storage pressure.

Updates download during an online visit and wait until **all tabs or installed app windows controlled by that worker are closed**.
Reopen the app to use the new version. Reloading one tab while another is open can keep the previous version active. There is no
forced reload. The running UI can therefore be older than `deploy.json`, which stays outside the worker cache and reports published
source.

### Icons

The PWA uses PNG versions of the favicon's Lucide flask, with an opaque background and maskable-safe padding. Regenerate them from
`public/favicon.svg` after changing the artwork:

```bash
pnpm icons:generate
```

This development command requires ImageMagick's `convert`. Generated assets are committed, so deployment does not require
ImageMagick. The manifest and Apple touch icon use the new `icons/flask-192.png` and `icons/flask-512.png` URLs.

### Local Preview

Build a staging preview without writing to the `dist/` Pages worktree:

```bash
pnpm build:staging
pnpm exec vite preview --config vite.staging.config.mjs --outDir artifacts/staging --host 127.0.0.1 --port 5187
```

Open `http://127.0.0.1:5187/app-lab/staging/`. The local build includes the worker, manifest, and icons; `deploy.json` is added
only by the deployment script.

### Worker Rollback

The deployment script selects `vite.<target>.config.mjs` when it exists in the chosen source commit; older refs can still be built.
If a build has no `sw.js`, the current script publishes `scripts/retire-pages-worker.js` at that URL. It unregisters the installed
worker and deletes only App Lab caches belonging to that exact scope, preserving the other environment and all app databases.
Deleting `sw.js` alone does not retire a worker already installed in browsers.

For manual recovery, use browser developer tools **Application > Service Workers > Unregister** on the specific registration,
delete only that scope's Cache Storage entries, close its windows, and reopen online. Do not clear site data: the origin's databases
are shared with production.

## Deploy

Deploy committed `HEAD`:

```bash
pnpm deploy:pages
```

The script then:

1. Resolves the requested Git ref.
2. Builds it with the `/app-lab/` base path in a temporary directory.
3. Updates the `dist/` Pages worktree.
4. Writes `.nojekyll` and `deploy.json`.
5. Commits and pushes `gh-pages`.

### Versions And Rollback

```bash
# Tag HEAD and deploy it
pnpm deploy:pages -- --version v0.6.0

# Tag and deploy a specific commit
pnpm deploy:pages -- --ref abc1234 --version v0.6.0

# Redeploy an existing tag
pnpm deploy:pages -- --ref v0.2.0

# Deploy an earlier commit without tagging it
pnpm deploy:pages -- --ref abc1234
```

Release version tags are production-only. Staging is selected by target and tracked by its commit in `staging/deploy.json`.

Version tags must use `vX.Y.Z`. The script reuses a requested tag when it already points to the chosen commit and refuses a new
tag lower than or equal to the highest local version. Set `ALLOW_VERSION_REGRESSION=1` only for an intentional correction.

### Overrides

```bash
DEPLOY_REMOTE=origin DEPLOY_BRANCH=gh-pages DEPLOY_WORKTREE=dist pnpm deploy:pages
```

An older ref normally reuses this checkout's `node_modules`. Set `DEPLOY_INSTALL=1` when that ref needs its own dependency install.

## Safety Rules

- Only committed source is deployed; uncommitted changes are ignored.
- Generated output stays in the temporary build directory and `dist/` Pages worktree.
- The script may reset and clean `dist/` because that worktree contains generated deployment output.
- `deploy.json` records the ref, commit, version, deploy time, and base path for verification.
- Both targets include a web manifest, mobile standalone metadata, and their own offline worker and file cache.

## Verification

Before deployment:

```bash
pnpm check
pnpm test:e2e
pnpm test:pwa
pnpm deploy:pages -- --dry-run --ref HEAD
pnpm deploy:pages -- --dry-run --target staging --ref HEAD
```

`test:pwa` builds both targets into a temporary directory and checks offline persistence, local Tailwind compilation, manifest and
icon caching, cache boundaries, uncached deployment metadata, updates, and rollback retirement in Chromium. It also checks both
workers in the same browser context. It does not publish anything or modify `dist/`.

After deployment, open the relevant URL and inspect its `deploy.json`. Asset 404s normally mean the build used the wrong base path
(`/app-lab/` for production or `/app-lab/staging/` for staging) or Pages is not serving the `gh-pages` branch root.

The UI uses hash routing. Add a Pages 404 strategy before introducing additional path-based client routes.
