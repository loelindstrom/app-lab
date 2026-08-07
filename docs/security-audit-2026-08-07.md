# Security Audit - 2026-08-07

Reviewed commit: `fc849ef` (`main`, `origin/main`)

## Scope

This review covered the current App Lab documentation and the security-sensitive implementation paths added since the previous sync/security planning work:

- `docs/architecture.md`
- `docs/1.architecture-general.md`
- `docs/2.architecture-sync.md`
- `docs/backlog.md`
- `src/runtime/*`
- `src/sync/*`
- sync-related UI in `src/ui/*`
- Firebase/E2E setup docs and tests

I treated the current worktree as authoritative. It was clean at the start of the review.

## Executive Summary

The product has moved from a prototype sync plan to a substantially more complete local-first, Firebase-backed sync system. The current design is notably stronger than the earlier rough sync direction in several areas:

- generated apps remain isolated from Firebase and use only `window.AppLab`
- remote source/data/workspace payloads are encrypted before Firebase storage
- room encryption authenticates room id, room type, and version
- Firebase `auth-v1` rules prevent anonymous invite recipients from creating arbitrary unrelated rooms
- invite material no longer includes the owner setup secret
- docs now clearly state that app invites are full-access bearer material, not read-only sharing
- owner deletion tombstones are modeled for shared apps

The main unresolved risks are around integrity and trust UX rather than basic sandbox escape. The most important issue is that stale workspace recovery/manifest material can overwrite newer remote manifest state. There is also a documentation/implementation mismatch around where write-token/version enforcement actually lives for Firebase, and the invite import confirmation is still too thin for executable remote source.

## Findings

### High: Stale workspace recovery or stale manifest saves can overwrite newer remote workspace state

Evidence:

- `loadWorkspaceManifest` returns embedded recovery `workspaceState` immediately when present, without first loading the latest remote manifest: `src/sync/workspaceManifest.ts:77-83`.
- On manifest room version conflict, `saveManifestRoom` loads the current remote version and then saves the local `state` over it at the current remote version: `src/sync/workspaceManifest.ts:171-188`.

Impact:

A browser restored from old workspace sync material can reintroduce an old manifest snapshot. Because conflict handling updates the expected version and writes the stale local manifest, this can drop apps created on other synced devices, lose tombstones, or revert room metadata. This is a workspace integrity/availability issue.

This is more severe than the documented app-data policy of "latest local pending data wins" because the workspace manifest is the index of app room memberships and deletion markers. Losing it can make apps disappear or make deletion state unreliable across devices.

Recommendation:

- On restore, prefer loading/decrypting the current remote manifest when the manifest room is reachable. Use embedded `workspaceState` only as an offline/bootstrap fallback.
- On workspace manifest version conflict, do not blindly overwrite the current remote manifest. Either fail with a conflict or merge by app id/tombstone using explicit rules.
- Add tests for:
  - restoring from old recovery material after another device created an app
  - concurrent app creation on two synced devices
  - tombstone preservation when a stale manifest tries to save later

### Medium: Firebase rules grant room members broad write authority; token/version checks are client-side

Evidence:

- RTDB rules allow any room member to write an existing room record as long as `newData.exists()`: `src/sync/firebaseAccessRules.ts:41-45`.
- The write-token hash and expected-version checks happen in the TypeScript provider before/inside the client transaction path: `src/sync/firebaseRealtimeProvider.ts:61-87`.

Impact:

For the current MVP, docs say app sharing is full-access bearer sharing, so a recipient with an invite is already trusted to edit the shared app rooms. However, the docs also say the sync provider checks token hashes and version checks. In Firebase, the rules do not enforce those checks against a modified or custom client. A room member can bypass the App Lab client and write a syntactically valid room record directly.

This matters because:

- room members can brick or rewrite shared rooms outside App Lab's optimistic-write path
- Firebase rules are not ready for future read-only sharing without a new enforcement model
- token hash fields give a stronger impression of provider-side enforcement than the rules actually provide

Recommendation:

- Document explicitly that, under `auth-v1`, room membership is the real Firebase-side write authority for existing app rooms.
- Keep the "no read-only sharing" warning until rules or a server-side mediator can enforce read/write distinctions.
- If stronger integrity is desired, move version/hash validation into enforceable RTDB rules where possible, or mediate writes through a trusted backend/Cloud Function.

### Medium: Invite import confirmation does not preview the app identity before importing executable source

Evidence:

- The import dialog shows generic warning text plus provider URL and invite creation time, but not the app title, description, source metadata, or a source preview: `src/ui/shell/WorkspaceShell.tsx:1079-1124`.
- The actual import path claims room access, loads/decrypts rooms, writes the app locally, and marks it joined in one operation: `src/sync/workspaceSyncActions.ts:102-127`.

Impact:

The dialog correctly warns that shared source is executable code, but the user cannot tell what app they are about to import before pressing Import. This weakens the "explicit confirmation" boundary and makes social-engineering links harder to evaluate.

Recommendation:

- Add a preview step before local import/upsert. It should load/decrypt the source room after an explicit user action, then show at least title, description, provider, and a stable room/provider fingerprint.
- Consider a source-review affordance for unknown invite senders.
- Keep import as a separate second action after preview.

### Medium/Low: Tailwind compilation runs in a separate unsandboxed compiler iframe

Evidence:

- `compileTailwind` creates a hidden iframe without a `sandbox` attribute: `src/runtime/tailwindCompiler.ts:40-53`.
- The compiler document includes user-derived Tailwind CSS input and sanitized user markup with the trusted Tailwind browser runtime: `src/runtime/tailwindCompiler.ts:122-135`.
- The actual generated app iframe is sandboxed with `allow-scripts` and no `allow-same-origin`: `src/runtime/SandboxFrame.tsx:202-212`.

Impact:

The app runtime sandbox is strong, but Tailwind compilation is a different trust boundary. The compiler path sanitizes markup and only runs the trusted Tailwind runtime, so I did not find a direct exploit path. Still, the compiler iframe is same-origin and unsandboxed. If the Tailwind browser runtime or compiler sanitization ever mishandles attacker-controlled CSS/class input, the compiler document has a much more privileged origin than the generated app iframe.

Recommendation:

- Document the Tailwind compiler iframe as a separate host-side trust boundary.
- Consider moving compilation to a sandboxed iframe with a postMessage result protocol, or to a worker-like isolation boundary if feasible.
- Add a CSP to the compiler document that blocks network, frames, forms, and objects.
- Keep input length/candidate limits tight for CSS and class extraction.

### Operational: Local verification currently fails in this checkout

Commands run:

```bash
pnpm typecheck
pnpm test
```

Observed result:

- `pnpm typecheck` failed.
- `pnpm test` failed.
- The immediate cause in this checkout is unresolved imports for `firebase/*`, `alpinejs/dist/cdn.js?raw`, and `@tailwindcss/browser?raw`.
- TypeScript also reports missing Node globals for `process` in `src/sync/firebaseRealtimeProvider.smoke.test.ts`.

Notes:

`package.json` and `pnpm-lock.yaml` do list `firebase`, `alpinejs`, and `@tailwindcss/browser`, so the unresolved package imports may be a stale `node_modules` issue in this local checkout. The missing Node typings are more likely a repo config/dependency issue unless another installed package happens to expose them.

Recommendation:

- For a fresh clone, document and verify this baseline:

  ```bash
  pnpm install --frozen-lockfile
  pnpm typecheck
  pnpm test
  pnpm build
  ```

- Add `@types/node` as a direct dev dependency or exclude Node/env-dependent smoke tests from the browser `tsconfig` build.
- Keep `.env.test.local`-dependent Firebase smoke/E2E tests separate from normal unit tests, but make sure normal `pnpm typecheck` and `pnpm test` are reproducible from a clean install.

## Positive Observations

- The generated app iframe remains sandboxed without `allow-same-origin`, and app CSP blocks network, forms, frames, workers, objects, and base URI rewriting.
- `window.AppLab` keeps Firebase, room ids, recovery material, queue records, and encryption keys out of generated app APIs.
- App data is normalized and size-limited before persistence.
- Room payload encryption uses AES-GCM with room id, room type, and version as associated data.
- Invite links use URL fragments, so invite material is not sent as a normal HTTP path/query to the static host.
- The docs correctly state that generated app code can read its own app data and that users should trust shared source before running it.
- The current docs correctly avoid claiming read-only sharing is implemented.

## Documentation Review

The new documentation structure is a significant improvement. The read order is clear:

1. `docs/architecture.md`
2. `docs/1.architecture-general.md`
3. `docs/2.architecture-sync.md`
4. `docs/backlog.md`

The docs are not overly redundant. `architecture.md` works as a short index/summary, while the two numbered architecture files carry most details.

Recommended doc refinements:

- Add a compact "secret material table" that lists where each secret lives and what compromise means:
  - local workspace sync store
  - workspace recovery material
  - app invite link
  - Firebase owner setup secret
  - room decrypt secret/access token
- Clarify that Firebase `auth-v1` rules enforce owner/member access to room records, while App Lab client code enforces token-hash and optimistic-version checks for honest clients.
- Document workspace manifest conflict policy separately from app-data conflict policy.
- State whether embedded workspace recovery snapshots are intended as offline fallback or authoritative restore state.
- Document the Tailwind compiler iframe separately from the generated app runtime sandbox.
- In `docs/architecture.md`, the normal confidence loop lists `pnpm test:e2e`; in `docs/1.architecture-general.md`, the build verification lists `pnpm build`. Consider one canonical "local gates" block plus a separate "Firebase/E2E gates" block.

## Open-Source Readiness Notes

Because this is intended to be an open-source project that external users may scrutinize before trusting, the security model should be easy to find without reading all implementation files.

Recommended additions before broader promotion:

- Add a top-level `SECURITY.md` or focused `docs/security.md`.
- Include a short threat model:
  - App Lab protects the host shell, other apps, local sync secrets, and Firebase room material from generated app code.
  - App Lab does not make arbitrary generated/shared app source trustworthy.
  - App code can read and potentially disclose its own app-owned data.
- Include a secret-material table for recovery material, invite links, owner setup secrets, room decrypt secrets, and room access tokens.
- Explain the "bring your own storage" model precisely. Today the storage provider is Firebase Realtime Database configured by the user; this gives users control over the backing project, but it is still a cloud storage provider.
- Add a vulnerability reporting path, preferably GitHub Security Advisories or a clearly documented contact route.
- Keep the public security summary simple and accurate:

  > Apps run locally in sandboxed iframes. App Lab stores data locally first. Optional sync encrypts app source/data before writing to your Firebase Realtime Database. Generated apps never get Firebase credentials or room secrets; they only use `AppLab.getData`, `AppLab.saveData`, and `AppLab.onDataChange`. Invite links and recovery material are powerful bearer secrets.

## Open Questions

- Should old workspace recovery material be allowed to overwrite newer workspace manifests, or should it only unlock the current remote manifest?
- Is full-access invite forwarding an intentional MVP feature for joined apps, or should forwarding be owner-only later?
- Should imported shared apps require a source preview/review step before the first run?
- Is the current "latest local pending app data wins" policy also intended for source and workspace manifest conflicts, or only app data?

## Suggested Priority Order

1. Fix the stale workspace manifest overwrite behavior.
2. Make local verification reproducible from a clean checkout.
3. Clarify Firebase rule enforcement boundaries in docs.
4. Add invite preview metadata before import.
5. Add a dedicated security/threat-model document for external reviewers.
6. Harden or document the Tailwind compiler trust boundary.
