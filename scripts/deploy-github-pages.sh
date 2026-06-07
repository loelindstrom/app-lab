#!/usr/bin/env bash
set -euo pipefail

REMOTE="${DEPLOY_REMOTE:-origin}"
PAGES_BRANCH="${DEPLOY_BRANCH:-gh-pages}"
WORKTREE_DIR="${DEPLOY_WORKTREE:-dist}"

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

if ! git diff --quiet --ignore-submodules --; then
  echo "Refusing to deploy: tracked working tree changes are present." >&2
  echo "Commit or stash source changes before publishing GitHub Pages." >&2
  exit 1
fi

if ! git diff --cached --quiet --ignore-submodules --; then
  echo "Refusing to deploy: staged changes are present." >&2
  echo "Commit or unstage changes before publishing GitHub Pages." >&2
  exit 1
fi

if ! command -v pnpm >/dev/null 2>&1; then
  echo "pnpm is required to build the GitHub Pages bundle." >&2
  exit 1
fi

BUILD_DIR="$(mktemp -d "${TMPDIR:-/tmp}/app-lab-pages.XXXXXX")"
cleanup() {
  rm -rf "$BUILD_DIR"
}
trap cleanup EXIT

echo "Building App Lab for GitHub Pages..."
pnpm exec tsc -b
pnpm exec vite build --outDir "$BUILD_DIR" --emptyOutDir
touch "$BUILD_DIR/.nojekyll"

if [ -d "$WORKTREE_DIR" ] && [ ! -e "$WORKTREE_DIR/.git" ]; then
  echo "Removing existing non-worktree $WORKTREE_DIR build output..."
  rm -rf "$WORKTREE_DIR"
fi

if [ -e "$WORKTREE_DIR/.git" ] && git -C "$WORKTREE_DIR" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  CURRENT_BRANCH="$(git -C "$WORKTREE_DIR" branch --show-current)"
  if [ "$CURRENT_BRANCH" != "$PAGES_BRANCH" ]; then
    echo "Refusing to deploy: $WORKTREE_DIR is checked out on '$CURRENT_BRANCH', not '$PAGES_BRANCH'." >&2
    exit 1
  fi
else
  if git show-ref --verify --quiet "refs/heads/$PAGES_BRANCH"; then
    git worktree add "$WORKTREE_DIR" "$PAGES_BRANCH"
  elif git ls-remote --exit-code --heads "$REMOTE" "$PAGES_BRANCH" >/dev/null 2>&1; then
    git fetch "$REMOTE" "$PAGES_BRANCH:$PAGES_BRANCH"
    git worktree add "$WORKTREE_DIR" "$PAGES_BRANCH"
  else
    git worktree add --detach "$WORKTREE_DIR" HEAD
    git -C "$WORKTREE_DIR" switch --orphan "$PAGES_BRANCH"
    git -C "$WORKTREE_DIR" rm -rf --ignore-unmatch .
  fi
fi

if ! git -C "$WORKTREE_DIR" diff --quiet --ignore-submodules --; then
  echo "Refusing to deploy: $WORKTREE_DIR has uncommitted changes." >&2
  exit 1
fi

if ! git -C "$WORKTREE_DIR" diff --cached --quiet --ignore-submodules --; then
  echo "Refusing to deploy: $WORKTREE_DIR has staged changes." >&2
  exit 1
fi

if git ls-remote --exit-code --heads "$REMOTE" "$PAGES_BRANCH" >/dev/null 2>&1; then
  git -C "$WORKTREE_DIR" fetch "$REMOTE" "$PAGES_BRANCH"
  git -C "$WORKTREE_DIR" merge --ff-only FETCH_HEAD
fi

echo "Publishing build output to $PAGES_BRANCH..."
(
  cd "$WORKTREE_DIR"
  git rm -rf --ignore-unmatch .
  find . -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
  cp -R "$BUILD_DIR"/. .
  git add -A

  if git diff --cached --quiet --ignore-submodules --; then
    echo "No GitHub Pages changes to publish."
    exit 0
  fi

  git commit -m "Deploy GitHub Pages"
  git push "$REMOTE" "$PAGES_BRANCH"
)
