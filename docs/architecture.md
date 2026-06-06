# App Lab Architecture

App Lab is a React and TypeScript browser app for creating and running small sandboxed HTML/CSS/JavaScript apps. The shell is host-owned React UI. Generated apps run in sandboxed iframes and persist app-owned JSON data through host-mediated APIs.

The security model is pragmatic: App Lab protects host secrets, host UI, and other apps' data from generated apps. Generated apps can read their own saved data, so source inspection, backup, and future guardrails are product features rather than hard guarantees that arbitrary app code cannot disclose app-owned data.

## Core

`src/core` is headless browser-bound logic. It does not import React or render UI.

Responsibilities:

- app registry records: create, list, read, update, and delete apps
- per-app data: read/write normalized JSON with a size limit
- browser persistence through IndexedDB
- in-memory implementation for tests
- future export/import, sync, OpenRouter config, and BuilderAI service contracts

The browser core currently uses IndexedDB database `app-lab-v2`. That name is intentionally retained after the root-folder move so existing local apps and app data continue to load.

Core rules:

- APIs receive explicit ids and data objects
- returned values are plain serializable objects
- generated app source is stored as data, not executed by core
- app data is persisted as normalized JSON through host-mediated APIs, iframes do not have direct IndexedDB access

## Runtime

`src/runtime` owns the iframe boundary around generated apps.

Responsibilities:

- prepare sandbox HTML before iframe load
- inject the app CSP, runtime capability, `window.AppLab` helper, unload recovery, and console forwarding
- load active app source into the iframe
- validate app-to-host messages by iframe source and per-load capability
- route app data requests to core
- forward app console output to the host Console tool

Runtime security posture:

- `sandbox="allow-scripts"` without `allow-same-origin`
- injected app CSP blocks network, remote resources, forms, frames, workers, objects, and base URL rewriting
- app data RPC is scoped to the active app id chosen by the host
- app data is normalized JSON and limited by size
- generated apps should use `AppLab.getData()`, `AppLab.saveData()`, and `AppLab.onError()`

## UI

`src/ui` is the React view layer. Styling uses Tailwind CSS with pinned package versions.

The shell is a lightweight workspace frame:

- launcher lists apps and supports create, rename, description edit, and delete
- active app remains the main surface
- desktop tools open as a right drawer
- mobile tools open as a bottom sheet with a compact dock
- Source is a host-owned editor for the app HTML
- Console shows sandbox logs/errors and makes them easy to copy
- BuilderAI is present as a placeholder for the future agent loop
- Settings is present as a placeholder for future host configuration

UI rules:

- React owns view state such as launcher/app mode, active app, selected tool, dialogs, and console entries
- UI calls core/runtime through explicit props and service objects
- UI does not access IndexedDB or OpenRouter directly
- host tools stay available around apps without turning the shell into a heavy dashboard

## Source Workflow

The Source tool edits the complete HTML document for the active app. Saving source updates the app record, clears the current console, and reloads the sandbox.

The source tool can also generate a copyable prompt+code bundle for external LLMs. The prompt steers models toward the stable `AppLab` helper, visible error reporting, defensive data migrations, and sandbox-compatible browser APIs.

## Testing

Vitest covers the core and runtime boundaries:

- memory core create/list/update/delete/data behavior
- JSON normalization for app data
- sandbox document CSP/helper injection
- iframe capability revocation and unexpected navigation recovery
- console forwarding from sandbox to host

Build verification uses:

```bash
pnpm typecheck
pnpm test
pnpm build
```
