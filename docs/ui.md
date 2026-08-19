# UI

UI renders the App Lab host and coordinates actions across core, runtime, sync, and AI.

## Summary

- **Entry point:** `WorkspaceShell` from `src/ui/index.ts`.
- **Owns:** React state, launcher and app views, tools, dialogs, and workflow ordering.
- **Depends on:** public module contracts supplied by the composition root.

## Why

A user action often crosses several modules: save locally, queue optional sync, update React state, and rebuild the sandbox. UI
owns that ordering so core stays persistence-focused, runtime stays callback-driven, and optional integrations remain explicit.

## Model

```text
App.tsx
  -> WorkspaceShell(core, syncActions, ...)
       -> LauncherView
       -> AppView
            -> SandboxFrame
            -> WorkspaceToolPanel
       -> SettingsDialog
```

`WorkspaceShell` is the application coordinator as well as the top-level rendered shell. Smaller components own presentation and
transient interaction state.

## Main Flows

### Create Or Edit App Source

1. **`src/ui -> src/runtime`:** Compile styles from the edited app source.
2. **`src/ui -> src/core`:** Persist the complete app locally.
3. **`src/ui -> src/sync`:** Offer the saved app source to optional sync.
4. **`src/ui`:** Update the active React state.

### Save Generated-App Data

1. **`src/runtime -> src/ui`:** Invoke the active app's data-save callback.
2. **`src/ui -> src/core`:** Save the JSON locally.
3. **`src/ui -> src/sync`:** Offer the saved app data to optional sync.

### Apply A Remote Update

1. **`src/sync -> src/ui`:** Report an accepted update after sync has written it through core.
2. **`src/ui`:** Refresh the affected React state.
3. **`src/ui -> src/runtime`:** Update app data or rebuild the generated-app iframe.

### Configure An Optional Integration

1. **User -> `src/ui`:** Enter storage-provider or LLM-provider settings.
2. **`src/ui`:** Pass the settings to the module that owns the integration.

## Rules

- Persist user changes through core before starting optional remote work.
- Pass values and narrow callbacks into runtime; do not give generated apps module objects or credentials.
- Keep tabs, dialogs, drafts, focus, and open/closed state in React unless a product requirement makes them durable.
- Import production dependencies through each module's public `index.ts`.
- Keep provider reconciliation inside sync and model behavior inside AI; UI coordinates but does not reimplement them.

## Code Map

```text
src/ui/
├── index.ts                    Public export
├── shell/WorkspaceShell.tsx    Host shell and workflow coordination
├── tools/WorkspaceToolPanel.tsx
└── dialogs/SettingsDialog.tsx
```

## Verification

`WorkspaceShell.test.tsx` covers orchestration and sync wake-ups. `WorkspaceToolPanel.test.tsx` covers tool behavior.

```bash
pnpm test
pnpm test:e2e
```
