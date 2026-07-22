# App Lab Architecture

App Lab is a local-first browser workspace for small sandboxed HTML apps. The host shell owns persistence, sync, tools, and
security boundaries; generated apps own their HTML UI and JSON data model.

## Read Order

Start here, then read the focused documents as needed:

- [General architecture](./1.architecture-general.md)
- [Sync architecture](./2.architecture-sync.md)
- [Backlog](./backlog.md)

## Current Product Shape

- The launcher creates the built-in Alpine/Tailwind to-do example app.
- Apps are stored locally in IndexedDB and run as complete HTML documents in sandboxed iframes.
- The Source tool edits the full HTML document and can export source/data files.
- App title and description come from the HTML `<head>`: `<title>` and `<meta name="description">`.
- Generated apps persist JSON through `window.AppLab` and can subscribe to shared data updates with `AppLab.onDataChange`.
- Firebase Realtime Database sync is optional and uses encrypted rooms plus auth-v1 RTDB rules.
- App invite links share one app's source/data rooms. Workspace sync material restores the whole workspace on another browser.
- BuilderAI is still a placeholder chat surface; its useful current job is generating the copyable prompt+code package for use in
  another AI.

## Code Map

- `src/core`: app records, app data, HTML metadata parsing, IndexedDB and memory core implementations
- `src/runtime`: sandbox document construction, iframe capability checks, `window.AppLab`, console forwarding
- `src/sync`: room crypto, Firebase adapter, local sync registry, durable queues, sync workers, invites, workspace recovery
- `src/ui`: React workspace shell, launcher, tool panels, settings, share/import flows

## Invariants

- Generated apps never talk directly to Firebase. They only use the App Lab runtime API.
- App source is executable user data. Core stores it; runtime executes it in a sandbox; sync encrypts it before remote storage.
- Local writes happen first. Remote sync is retried in the background.
- Invite links are sensitive bearer material for the shared app rooms, but they do not include the owner setup secret needed to
  create arbitrary rooms in the owner's Firebase project.
- Sync metadata distinguishes owned apps from joined apps. Joined apps remain attached to the provider and room capabilities from
  the invite.
- Deleting an owned shared app tombstones the remote source room so collaborators see "Deleted by owner" instead of silently
  treating it like a normal local deletion.

## Verification

The normal confidence loop is:

```bash
pnpm typecheck
pnpm test
pnpm test:e2e
```

Firebase-backed E2E and smoke tests require `.env.test.local` values matching the example file at the repository root.
