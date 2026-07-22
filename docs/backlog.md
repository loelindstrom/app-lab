# App Lab Backlog

This backlog captures the current next steps. It is not a roadmap promise; it is the working plan for the next implementation
passes.

## Current Baseline

App Lab is a React/Vite browser app with:

- sandboxed iframe apps
- local IndexedDB app/source/data persistence
- source editing and console logs
- source/data file export and BuilderAI prompt+code helper for external LLM workflows
- Firebase Realtime Database sync through encrypted auth-v1 rooms
- invite import/share
- workspace sync material for restoring/syncing the whole workspace on another browser
- active-app live source/data subscriptions
- live workspace manifest sync for apps created on another synced browser
- owner-deletion tombstones for shared apps
- local-first queue records for sync retries

## MVP Must-Have

No open must-have item is documented here right now. Add an item only when it is concrete enough to guide the next implementation
slice.

Known limitations that are intentionally not blockers for the current MVP:

- invite links are sensitive full-access bearer material for the shared app rooms
- workspace sync material is sensitive whole-workspace bearer material and includes owner setup material
- there is no revocation/key rotation UI
- there is no read-only sharing

## Nice-To-Have After MVP

1. BuilderAI loop

   Reintroduce the actual agent after the source/console workflow is stable. The first useful agent loop should be able to see
   app source, user request, and console errors, then propose or apply source edits.

2. Source history

   Add lightweight source snapshots only if manual experimentation shows real need. This should not block current sync work.

3. Better app-data merge

   Add ID-based merge only if shared/offline conflicts become common enough to justify the complexity. The current policy is
   latest-local-pending-data wins.

4. Import app data

   Export exists for source and app data. Add app-data import only when manual backup/restore workflows show enough demand to
   justify UI and safety checks.

## Explicit Non-Goals For Now

- CRDT collaboration
- generated apps talking directly to Firebase
- read-only sharing
- TanStack Query integration
- source-code merge

## Checkpoint Format

For future implementation slices, report:

- changed behavior
- files touched
- automated checks run
- manual test scenario, when needed
- known limitations
