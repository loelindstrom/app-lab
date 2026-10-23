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
pnpm deploy:pages -- --target production --ref HEAD --version v0.4.0
```

The deployed commit and target are available at `/app-lab/staging/deploy.json` or `/app-lab/deploy.json`. Staging intentionally uses the same browser
origin and therefore the same IndexedDB and local storage as production.

### Offline Staging

Staging builds use `vite.staging.config.mjs`, which extends the normal Vite configuration with a Workbox service worker.
The worker is served at `/app-lab/staging/sw.js` and controls only `/app-lab/staging/`. Production builds use `vite.config.ts`
and do not register a worker. The deployment script selects the staging config when it exists in the chosen source commit;
older commits without it can still be built. When the chosen staging build has no `sw.js`, the script publishes
`scripts/retire-staging-worker.js` at that URL to unregister an existing worker and delete only its staging caches.
The staging config rejects base paths outside a trailing `/staging/` directory so an override cannot register it at production's root.

After one online visit finishes installing the worker, staging can reopen offline at `/app-lab/staging/`. The cache includes the
app shell, JavaScript, CSS, fonts, icons, and the local Tailwind compiler. Hash navigation keeps working. The worker follows the
build's HTML entry and assets; the old shell and temporary `next/` entry are no longer included.

App records and data remain in the existing shared IndexedDB stores. Source editing and local data changes work offline; Firebase
and OpenRouter still require connectivity. Existing sync queues retry when the app reconnects. Offline startup requires a completed
online installation, and the browser may evict cached files under storage pressure.

Updates download during an online visit and wait until **all staging tabs or installed app windows are closed**. Reopen staging to
use the new version. Reloading one tab while another is open can keep the previous version active. There is no forced reload.
This means the running UI can be older than `deploy.json`, which always stays outside the worker cache and reports published source.
Staging uses an `app-lab-staging` cache prefix; production's files and the shared app databases are not managed by this worker.

Build a local staging preview without writing to the `dist/` Pages worktree:

```bash
pnpm build:staging
pnpm exec vite preview --config vite.staging.config.mjs --outDir artifacts/staging --host 127.0.0.1 --port 5187
```

Open `http://127.0.0.1:5187/app-lab/staging/`. The manifest and `deploy.json` are added by the deployment script,
so this local preview tests the worker and application rather than installation metadata. Normal `pnpm dev` does not enable a worker.

To remove an installed staging worker during testing, use browser developer tools **Application > Service Workers > Unregister**
and delete only the `app-lab-staging` Cache Storage entries. Do not clear site data: the origin's databases are shared with production.
Close all staging windows before reopening online. For a rollback to a commit without offline support, use the current deployment
script so it publishes the retiring worker. Deleting `sw.js` alone does not retire workers already installed in browsers.

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
pnpm deploy:pages -- --version v0.3.0

# Tag and deploy a specific commit
pnpm deploy:pages -- --ref abc1234 --version v0.3.0

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
- Both targets include a web manifest and mobile standalone metadata. Only staging currently includes an offline service worker.

## Verification

Before deployment:

```bash
pnpm check
pnpm test:e2e
pnpm test:pwa
pnpm deploy:pages -- --dry-run --ref HEAD
pnpm deploy:pages -- --dry-run --target staging --ref HEAD
```

`test:pwa` builds both targets into a temporary directory and checks offline persistence, the main UI, local Tailwind compilation,
cache boundaries, uncached deployment metadata, updates, and rollback retirement in Chromium. It does not publish anything or modify `dist/`.

After deployment, open the relevant URL and inspect its `deploy.json`. Asset 404s normally mean the build used the wrong base path
(`/app-lab/` for production or `/app-lab/staging/` for staging) or Pages is not serving the `gh-pages` branch root.

The UI uses hash routing. Add a Pages 404 strategy before introducing additional path-based client routes.
