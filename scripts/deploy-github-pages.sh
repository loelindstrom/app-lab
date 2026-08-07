#!/usr/bin/env bash
set -euo pipefail

REMOTE="${DEPLOY_REMOTE:-origin}"
PAGES_BRANCH="${DEPLOY_BRANCH:-gh-pages}"
WORKTREE_DIR="${DEPLOY_WORKTREE:-dist}"
BASE_PATH="${DEPLOY_BASE:-/app-lab/}"
SOURCE_REF="${DEPLOY_REF:-HEAD}"
REQUESTED_VERSION="${DEPLOY_VERSION:-}"
INSTALL_DEPS="${DEPLOY_INSTALL:-0}"
DRY_RUN=0

usage() {
  cat <<'USAGE'
Usage:
  scripts/deploy-github-pages.sh [options]

Options:
  --ref <ref>          Commit, branch, or tag to deploy. Defaults to HEAD.
  --version <vX.Y.Z>  Create or reuse a semver release tag for the deployed commit.
  --dry-run           Resolve, validate, and build without tagging or publishing.
  --help              Show this help text.

Environment:
  DEPLOY_REMOTE       Git remote to push to. Defaults to origin.
  DEPLOY_BRANCH       Pages branch to publish. Defaults to gh-pages.
  DEPLOY_WORKTREE     Local Pages worktree path. Defaults to dist.
  DEPLOY_BASE         Vite base path. Defaults to /app-lab/.
  DEPLOY_INSTALL=1    Run pnpm install in the temp source tree instead of reusing node_modules.
  ALLOW_VERSION_REGRESSION=1
                      Allow creating a version lower than the highest local semver tag.
USAGE
}

while [ "$#" -gt 0 ]; do
  case "$1" in
    --ref)
      if [ "$#" -lt 2 ]; then
        echo "--ref requires a value." >&2
        exit 1
      fi
      SOURCE_REF="$2"
      shift 2
      ;;
    --version)
      if [ "$#" -lt 2 ]; then
        echo "--version requires a value." >&2
        exit 1
      fi
      REQUESTED_VERSION="$2"
      shift 2
      ;;
    --dry-run)
      DRY_RUN=1
      shift
      ;;
    --help|-h)
      usage
      exit 0
      ;;
    --)
      shift
      ;;
    *)
      echo "Unknown option: $1" >&2
      usage >&2
      exit 1
      ;;
  esac
done

SEMVER_TAG_REGEX='^v[0-9]+\.[0-9]+\.[0-9]+$'

is_semver_tag() {
  [[ "$1" =~ $SEMVER_TAG_REGEX ]]
}

latest_semver_tag() {
  git tag --list 'v[0-9]*.[0-9]*.[0-9]*' | grep -E "$SEMVER_TAG_REGEX" | sort -V | tail -n 1 || true
}

semver_tags_for_commit() {
  git tag --points-at "$1" --list 'v[0-9]*.[0-9]*.[0-9]*' | grep -E "$SEMVER_TAG_REGEX" | sort -V || true
}

version_gt() {
  [ "$1" != "$2" ] && [ "$(printf '%s\n%s\n' "$2" "$1" | sort -V | tail -n 1)" = "$1" ]
}

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

if ! command -v pnpm >/dev/null 2>&1; then
  echo "pnpm is required to build the GitHub Pages bundle." >&2
  exit 1
fi

if ! command -v node >/dev/null 2>&1; then
  echo "node is required to write deployment metadata." >&2
  exit 1
fi

TARGET_COMMIT="$(git rev-parse --verify "${SOURCE_REF}^{commit}")" || {
  echo "Could not resolve deploy ref '$SOURCE_REF' to a commit." >&2
  exit 1
}
TARGET_SHORT="$(git rev-parse --short=12 "$TARGET_COMMIT")"

if [ "$DRY_RUN" -eq 0 ]; then
  echo "Fetching tags from $REMOTE..."
  git fetch "$REMOTE" --tags
fi

TARGET_SEMVER_TAGS="$(semver_tags_for_commit "$TARGET_COMMIT")"
TARGET_VERSION="$(printf '%s\n' "$TARGET_SEMVER_TAGS" | tail -n 1)"
LATEST_VERSION="$(latest_semver_tag)"
CREATE_TAG=0
DEPLOY_VERSION="$TARGET_VERSION"

if [ -n "$REQUESTED_VERSION" ]; then
  if ! is_semver_tag "$REQUESTED_VERSION"; then
    echo "Version must match vX.Y.Z, for example v1.2.3." >&2
    exit 1
  fi

  EXISTING_TAG_COMMIT="$(git rev-parse -q --verify "refs/tags/$REQUESTED_VERSION^{commit}" 2>/dev/null || true)"
  if [ -n "$EXISTING_TAG_COMMIT" ]; then
    if [ "$EXISTING_TAG_COMMIT" != "$TARGET_COMMIT" ]; then
      echo "Tag $REQUESTED_VERSION already points at $EXISTING_TAG_COMMIT, not $TARGET_COMMIT." >&2
      exit 1
    fi
  else
    if [ -n "$TARGET_VERSION" ] && [ "$TARGET_VERSION" != "$REQUESTED_VERSION" ]; then
      echo "Commit $TARGET_SHORT already has version tag $TARGET_VERSION; refusing to add $REQUESTED_VERSION." >&2
      exit 1
    fi

    if [ -n "$LATEST_VERSION" ] && ! version_gt "$REQUESTED_VERSION" "$LATEST_VERSION"; then
      if [ "${ALLOW_VERSION_REGRESSION:-0}" != "1" ]; then
        echo "Latest local version tag is $LATEST_VERSION; refusing to create lower or equal version $REQUESTED_VERSION." >&2
        echo "Set ALLOW_VERSION_REGRESSION=1 to override intentionally." >&2
        exit 1
      fi
    fi

    CREATE_TAG=1
  fi

  DEPLOY_VERSION="$REQUESTED_VERSION"
fi

SOURCE_DIR="$(mktemp -d "${TMPDIR:-/tmp}/app-lab-source.XXXXXX")"
BUILD_DIR="$(mktemp -d "${TMPDIR:-/tmp}/app-lab-pages.XXXXXX")"
cleanup() {
  rm -rf "$SOURCE_DIR" "$BUILD_DIR"
}
trap cleanup EXIT

echo "Preparing source $SOURCE_REF at $TARGET_SHORT..."
git archive --format=tar "$TARGET_COMMIT" | tar -x -C "$SOURCE_DIR"

if [ "$INSTALL_DEPS" = "1" ]; then
  echo "Installing dependencies in temporary source tree..."
  (cd "$SOURCE_DIR" && pnpm install --frozen-lockfile)
else
  if [ ! -d "$REPO_ROOT/node_modules" ]; then
    echo "node_modules is missing. Run pnpm install, or rerun with DEPLOY_INSTALL=1." >&2
    exit 1
  fi
  ln -s "$REPO_ROOT/node_modules" "$SOURCE_DIR/node_modules"
fi

echo "Building App Lab for GitHub Pages..."
(
  cd "$SOURCE_DIR"
  pnpm exec tsc -b
  pnpm exec vite build --base "$BASE_PATH" --outDir "$BUILD_DIR" --emptyOutDir
)
touch "$BUILD_DIR/.nojekyll"

DEPLOYED_AT="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
node -e 'const fs = require("fs"); const [file, version, ref, commit, shortCommit, deployedAt, base] = process.argv.slice(1); fs.writeFileSync(file, JSON.stringify({ version: version || null, ref, commit, shortCommit, deployedAt, base }, null, 2) + "\n");' \
  "$BUILD_DIR/deploy.json" \
  "$DEPLOY_VERSION" \
  "$SOURCE_REF" \
  "$TARGET_COMMIT" \
  "$TARGET_SHORT" \
  "$DEPLOYED_AT" \
  "$BASE_PATH"

if [ "$DRY_RUN" -eq 1 ]; then
  echo "Dry run complete. Built $TARGET_SHORT${DEPLOY_VERSION:+ as $DEPLOY_VERSION}; no tag or Pages branch was changed."
  exit 0
fi

if [ "$CREATE_TAG" -eq 1 ]; then
  echo "Creating release tag $REQUESTED_VERSION at $TARGET_SHORT..."
  git tag -a "$REQUESTED_VERSION" "$TARGET_COMMIT" -m "Release $REQUESTED_VERSION"
fi

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

echo "Resetting generated Pages worktree..."
git -C "$WORKTREE_DIR" reset --hard HEAD
git -C "$WORKTREE_DIR" clean -fd

if git ls-remote --exit-code --heads "$REMOTE" "$PAGES_BRANCH" >/dev/null 2>&1; then
  git -C "$WORKTREE_DIR" fetch "$REMOTE" "$PAGES_BRANCH"
  git -C "$WORKTREE_DIR" merge --ff-only FETCH_HEAD
fi

DEPLOY_LABEL="$TARGET_SHORT"
if [ -n "$DEPLOY_VERSION" ]; then
  DEPLOY_LABEL="$DEPLOY_VERSION"
fi

echo "Publishing $DEPLOY_LABEL to $PAGES_BRANCH..."
(
  cd "$WORKTREE_DIR"
  git rm -rf --ignore-unmatch .
  find . -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
  cp -R "$BUILD_DIR"/. .
  git add -A

  if git diff --cached --quiet --ignore-submodules --; then
    echo "No GitHub Pages changes to publish."
    if [ -n "$DEPLOY_VERSION" ]; then
      git push "$REMOTE" "$DEPLOY_VERSION"
    fi
    exit 0
  fi

  git commit -m "Deploy $DEPLOY_LABEL to GitHub Pages" -m "Source: $TARGET_COMMIT"

  if [ -n "$DEPLOY_VERSION" ]; then
    git push --atomic "$REMOTE" "$PAGES_BRANCH" "$DEPLOY_VERSION"
  else
    git push "$REMOTE" "$PAGES_BRANCH"
  fi
)
