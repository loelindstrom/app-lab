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


## MVP Must-Have

1. Invite and provider access hardening

   The current Firebase prototype treats invite and recovery material as sensitive bearer access material. A decoded invite
   includes enough Firebase connection metadata and room capabilities for a recipient to connect to the same RTDB-backed
   workspace, and open prototype RTDB rules do not enforce App Lab's room-level intent on the provider side.

   Before wider sharing or MVP, redesign this so accepting an invite does not let another user use the owner's Firebase project
   as generic sync storage. Decide whether that means stricter Firebase rules, an auth-mediated provider, per-user storage,
   server-side mediation, constrained room paths, revocation/key rotation, or a different provider model.

## Nice-To-Have After MVP

1. BuilderAI loop

   Reintroduce the actual agent after the source/console workflow is stable. The first useful agent loop should be able to see
   app source, user request, and console errors, then propose or apply source edits.

2. Source history

   Add lightweight source snapshots only if manual experimentation shows real need. This should not block current sync work.

3. Better app-data merge

   Add ID-based merge only if shared/offline conflicts become common enough to justify the complexity. The current policy is
   latest-local-pending-data wins.

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
