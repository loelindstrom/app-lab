# Deployment

App Lab is a pure client-side Vite React app that needs only static hosting. This guide explains how committed source becomes a
repeatable release without mixing generated output into normal development work.

## Why This Strategy

App Lab needs only static hosting, but a deployment still needs to identify exactly which committed version is live. It should
also support rollbacks without mixing generated files into `main` or disturbing uncommitted work in a shared checkout.

The deployment therefore builds a chosen Git ref in a temporary directory and publishes only the result to a separate Pages
branch. The source commit remains the release identity, while the working tree remains development space.

## How It Works

The current implementation publishes static build output to a separate `gh-pages` branch. GitHub Pages serves it at:

```text
https://loelindstrom.github.io/app-lab/
```

- `main` contains source, docs, tests, and deployment tooling.
- `dist/` is ignored on `main`.
- `dist/` is also used as a local Git worktree for the `gh-pages` branch.
- The deploy script resolves a Git ref to a commit, archives that committed source tree into a temporary directory, builds there, then copies the finished static files into the `dist/` worktree.
- Vite builds with `/app-lab/` as the base path so asset URLs work from the project Pages URL.
- Each deployment writes `deploy.json` into the Pages output with the source ref, commit, version tag when present, deploy time, and base path.

Each part answers a requirement from the strategy above: the resolved Git ref and `deploy.json` identify the live source, the
temporary build and `gh-pages` worktree isolate generated output, and accepting an earlier ref provides the rollback path.

## First-Time GitHub Setup

In the GitHub repository settings:

1. Open **Settings > Pages**.
2. Set **Build and deployment > Source** to **Deploy from a branch**.
3. Select branch `gh-pages` and folder `/ (root)`.
4. Save the settings.

The `gh-pages` branch does not need to exist before the first deployment. The local deploy script can create it.

## Deploy Command

Run from the repository root:

```bash
pnpm deploy:pages
```

The script will:

1. Resolve the requested ref to a commit. By default this is `HEAD`.
2. Build the committed source tree in a temporary directory.
3. Replace any plain ignored `dist/` build output with a real `gh-pages` worktree.
4. Replace the branch contents with the new build output.
5. Add `.nojekyll` and `deploy.json`.
6. Commit and push `gh-pages` to `origin`.

Optional environment overrides:

```bash
DEPLOY_REMOTE=origin DEPLOY_BRANCH=gh-pages DEPLOY_WORKTREE=dist pnpm deploy:pages
```

## Version Tags

Release tags use the format `vX.Y.Z`, for example `v0.3.0`.

To create a version tag on `HEAD` and deploy it:

```bash
pnpm deploy:pages -- --version v0.3.0
```

To create a version tag on a specific commit and deploy it:

```bash
pnpm deploy:pages -- --ref abc1234 --version v0.3.0
```

The script will not create a second version tag on a commit that already has a `vX.Y.Z` tag. If the requested tag already exists and points at the requested commit, it is reused.

To avoid confusing version history, the script refuses to create a new version tag lower than or equal to the highest local `vX.Y.Z` tag. Override only for an intentional correction:

```bash
ALLOW_VERSION_REGRESSION=1 pnpm deploy:pages -- --version v0.2.9
```

## Deploying Earlier Versions

Deploy an existing version tag:

```bash
pnpm deploy:pages -- --ref v0.2.0
```

Deploy an earlier commit without creating a version tag:

```bash
pnpm deploy:pages -- --ref abc1234
```

Use this for rollback-style deployments. The `gh-pages` branch records the deployed source commit in both the deployment commit message and `deploy.json`.

## Parallel Work Safety

The deploy script is intentionally conservative because other agents or developers may be editing source files in the same checkout.

- It deploys a committed Git ref, not the live working tree.
- Uncommitted local source or docs edits are ignored by deployment.
- It writes deployment files only inside the ignored `dist/` worktree.
- It builds into a temporary directory first, so Vite never empties the deployment worktree directly.
- It resets and cleans `dist/` automatically because the `gh-pages` branch is generated output owned by this script.

If another agent is editing source files, deploy a known commit or tag. Do not use deployment as a way to publish unreviewed local changes; uncommitted work will not be included.

By default the temp source tree reuses the current checkout's `node_modules`. If dependencies changed and an older ref needs its own install, run:

```bash
DEPLOY_INSTALL=1 pnpm deploy:pages -- --ref v0.2.0
```

## Verification

Before deployment, the normal build checks are:

```bash
pnpm check
pnpm test:e2e
```

After deployment, open:

```text
https://loelindstrom.github.io/app-lab/
```

If the page loads but assets 404, confirm that the deployed build used the `/app-lab/` base path and that GitHub Pages is serving the `gh-pages` branch root.

For a local validation without tagging or changing `gh-pages`:

```bash
pnpm deploy:pages -- --dry-run --ref HEAD
```

## Routing Note

The app currently does not depend on browser deep-link routes. If route-based deep links are added later, update this deployment strategy with either hash routing or a GitHub Pages 404 fallback.
