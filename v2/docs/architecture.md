# App Lab v2 Architecture

App Lab v2 is a React and TypeScript rebuild of the PoC. The PoC remains the behavioral reference, but v2 separates browser-bound core logic from the React shell so storage, app runtime, BuilderAI, and UI can be tested and evolved independently.

The product model stays pragmatic: generated apps are arbitrary HTML/CSS/JavaScript running in a sandboxed iframe. App Lab protects host secrets, host UI, and other apps' data from generated apps. Generated apps can read and potentially disclose their own app data, so source inspection, backup, and future guardrails are product features rather than hard security guarantees.

## Core

`src/core` is headless browser-bound logic. It must not import React or render UI.

Responsibilities:

- app registry records: create, list, read, update, and delete apps
- per-app data: read/write normalized JSON data with a size limit
- host config: OpenRouter API key and selected model id
- BuilderAI service contract: read current app, write current app, stream progress and final text
- export/import contracts for future backup and sync work

The test implementation can use an in-memory core to prove behavior. The browser app uses an IndexedDB-backed core behind the same interface.

Core rules:

- core APIs receive explicit ids and data objects; they do not reach into React state
- core returns plain serializable values
- OpenRouter key access stays host-owned and never crosses into iframe app code
- generated app source is stored as data, not executed by core
- app data is persisted as normalized JSON through host-mediated APIs, not direct iframe IndexedDB access

## App Runtime

`src/runtime` owns the iframe boundary around generated apps.

Responsibilities:

- prepare sandbox HTML before iframe load
- inject the app CSP and runtime capability
- load active app source into the iframe
- validate and route app-to-host messages
- expose a narrow runtime event surface to UI/core

The v2 runtime should preserve the PoC security posture:

- `sandbox="allow-scripts"` without `allow-same-origin`
- injected app CSP blocks network, remote resources, forms, frames, workers, and base URL rewriting
- app data RPC is scoped to the active app id chosen by the host
- app data is normalized JSON and limited by size
- app RPC currently supports `GET_MY_DATA` and `SAVE_MY_DATA`

The runtime is browser-bound but still UI-independent. React components should render the iframe and call runtime helpers; runtime code should not know about drawers, dialogs, or layout.

## UI

`src/ui` is the React view layer. Styling uses Tailwind CSS with pinned stable package versions, so visual states stay close to the components without growing another large hand-written CSS shell.

The intended shell is a lightweight workspace frame:

- the current app remains the main object on screen
- Home/launcher is host-owned React UI, not an iframe app
- BuilderAI is always nearby but not in the way
- desktop uses a right drawer
- mobile uses a bottom sheet and a compact bottom dock
- source/settings are host-owned dialogs
- source editing is a host-owned tool panel; saving source updates the app record and reloads the sandbox
- the source tool can generate a copyable prompt+code bundle for external LLMs

Initial UI map:

```text
AppRoot
  WorkspaceShell
    ShellHeader
      AppSwitcherButton
      ActiveAppTitle
      NewAppButton
      MoreMenu

    MainSurface
      LauncherView
        AppList
        NewAppCard

      AppView
        SandboxFrame

    MobileToolDock
      SourceButton
      BuilderButton

    BuilderPanel
      BuilderHeader
      BuilderMessages
      BuilderProgress
      BuilderComposer

    SourceDialog
    SettingsDialog
```

UI rules:

- React owns view state such as active mode, open dialogs, drawer/sheet state, and selected app
- UI calls core/runtime through explicit hooks or service objects
- UI does not access IndexedDB or OpenRouter directly
- host tools are available around apps without making the app feel trapped inside a heavy dashboard

## First Vertical Slice

The first v2 slice should prove the shape before full feature parity:

- boot into a host-owned launcher
- create an example app through the core service
- open an app in the iframe runtime
- open/close BuilderAI as right drawer on desktop and bottom sheet on mobile
- edit and save source for the active app
- export prompt+code text for use with external browser LLMs
- keep settings as a placeholder until OpenRouter is moved into core

After that slice feels right, move persistence and OpenRouter from the PoC into `src/core`, then replace placeholders one behavior at a time.

## Testing Strategy

Core tests should use Vitest without React rendering. UI tests should use React Testing Library for stateful components and Playwright-style smoke tests for browser behavior.

Initial tests:

- app registry can list/create/update apps through the core interface
- source viewer shows active app source as text
- launcher vs app mode toggles the correct host controls
- mobile BuilderAI opens without focusing the composer
- sandbox runtime injects CSP and does not expose host-owned config

## Migration Notes

The PoC remains in the repo until v2 reaches useful parity. When v2 becomes the default, move the old files into `poc/` or `old/` in one intentional cleanup step.

Existing PoC app records are not migrated in the first slice. Migration should be designed after v2 storage and export/import contracts are settled.
