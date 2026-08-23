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

The deployed commit and target are available at `/staging/deploy.json` or `/deploy.json`. Staging intentionally uses the same browser
origin and therefore the same IndexedDB and local storage as production.

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
- The app includes a web manifest and mobile standalone metadata. It has no service worker, so browser caching remains straightforward.

## Verification

Before deployment:

```bash
pnpm check
pnpm test:e2e
pnpm deploy:pages -- --dry-run --ref HEAD
pnpm deploy:pages -- --dry-run --target staging --ref HEAD
```

After deployment, open the relevant URL and inspect its `deploy.json`. Asset 404s normally mean the build did not use `/app-lab/`
or Pages is not serving the `gh-pages` branch root.

App Lab currently has no route-based deep links. Add hash routing or a Pages 404 fallback before introducing them.
