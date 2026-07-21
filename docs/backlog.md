# App Lab Backlog

This backlog captures the current next steps. It is not a roadmap promise; it is the working plan for the next implementation
passes.

## Current Baseline

App Lab is a React/Vite browser app with:

- sandboxed iframe apps
- local IndexedDB app/source/data persistence
- source editing and console logs
- source/data file export and BuilderAI prompt+code helper for external LLM workflows
- Firebase Realtime Database sync through encrypted rooms
- invite import/share
- active-app live source/data subscriptions
- local-first queue records for sync retries

## Highest-Value Next Work

1. Sync diagnostics

   Add a small developer/user-facing view for queued sync work and last provider errors. This should make problems like room
   conflicts, missing rooms, offline state, and retry state visible without opening browser devtools.

2. Sync UX polish

   Tighten copy and actions around cloud status, owner deletion, joined app deletion, and workspace recovery. Keep relationship
   labels separate from sync health.

3. Firebase setup polish

   Keep settings task-oriented: paste Firebase web config, paste RTDB URL, show required rules, export recovery material, restore
   another device.

4. Provider hardening decision

   Decide whether the prototype Firebase model is enough for the next public step, or whether room access must move to stronger
   provider-side enforcement before wider sharing.

5. BuilderAI loop

   Reintroduce the actual agent after the source/console workflow is stable. The first useful agent loop should be able to see
   app source, user request, and console errors, then propose or apply source edits.

6. Source history

   Add lightweight source snapshots only if manual experimentation shows real need. This should not block current sync work.

7. Better app-data merge

   Add ID-based merge only if shared/offline conflicts become common enough to justify the complexity. The current policy is
   latest-local-pending-data wins.

## Explicit Non-Goals For Now

- CRDT collaboration
- generated apps talking directly to Firebase
- read-only sharing
- revocation/key rotation
- provider-side server functions
- TanStack Query integration
- source-code merge

## Checkpoint Format

For future implementation slices, report:

- changed behavior
- files touched
- automated checks run
- manual test scenario, when needed
- known limitations
