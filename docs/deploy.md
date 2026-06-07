# Deployment

App Lab is a pure client-side Vite React app. The GitHub Pages deployment publishes static build output to a separate `gh-pages` branch while keeping generated files out of `main`.

The default Pages URL is:

```text
https://loelindstrom.github.io/app-lab/
```

## Strategy

- `main` contains source, docs, tests, and deployment tooling.
- `dist/` is ignored on `main`.
- `dist/` is also used as a local Git worktree for the `gh-pages` branch.
- The deploy script builds into a temporary directory outside the repo, then copies the finished static files into the `dist/` worktree.
- Vite builds with `base: "/app-lab/"` so asset URLs work from the project Pages path.

This keeps deployment branch files separate from normal source work and avoids committing built assets to `main`.

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

1. Refuse to continue if tracked files on `main` are dirty or staged.
2. Run typecheck and the production Vite build into a temporary directory.
3. Replace any plain ignored `dist/` build output with a real `gh-pages` worktree.
4. Replace the branch contents with the new build output.
5. Add `.nojekyll`.
6. Commit and push `gh-pages` to `origin`.

Optional environment overrides:

```bash
DEPLOY_REMOTE=origin DEPLOY_BRANCH=gh-pages DEPLOY_WORKTREE=dist pnpm deploy:pages
```

## Parallel Work Safety

The deploy script is intentionally conservative because other agents or developers may be editing source files in the same checkout.

- It refuses tracked working tree changes and staged changes before building.
- It writes deployment files only inside the ignored `dist/` worktree.
- It builds into a temporary directory first, so Vite never empties the deployment worktree directly.
- It refuses to continue if `dist/` has uncommitted or staged changes.

If another agent is editing source files, wait until those changes are committed or stashed before deploying. Do not use the deploy script as a way to publish unreviewed local changes.

## Verification

Before deployment, the normal build checks are:

```bash
pnpm typecheck
pnpm test
pnpm build
```

After deployment, open:

```text
https://loelindstrom.github.io/app-lab/
```

If the page loads but assets 404, confirm that the deployed build used the `/app-lab/` base path and that GitHub Pages is serving the `gh-pages` branch root.

## Routing Note

The app currently does not depend on browser deep-link routes. If route-based deep links are added later, update this deployment strategy with either hash routing or a GitHub Pages 404 fallback.
