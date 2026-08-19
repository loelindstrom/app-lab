# Core

Core is App Lab's local source of truth for generated apps and their JSON data.

## Summary

- **Public contract:** `AppLabCore` from `src/core/index.ts`.
- **Production store:** IndexedDB database `app-lab-v2`.
- **Owns:** app records, app data, HTML metadata extraction, and the starter app.

## Why

The workspace must remain useful without an account, network, storage provider, or LLM provider. Core gives every workflow the same
small persistence contract while keeping IndexedDB details out of UI and optional modules.

## Model

The IndexedDB database `app-lab-v2` contains two object stores:

| IndexedDB object store | Value |
| --- | --- |
| `apps_registry` | `AppRecord`: id, metadata, complete HTML source, compiled CSS, and timestamps. |
| `apps_data` | App-owned JSON keyed by app id. |

`createIndexedDbCore()` implements the browser store. `createMemoryCore()` implements the same contract for focused tests.

## Main Flows

1. **Create:** derive title and description from the HTML, assign an app id, and store the complete `AppRecord`.
2. **Update source:** re-read HTML metadata, preserve app identity, and replace the stored app record.
3. **Save data:** normalize the value to JSON and store it separately from source.
4. **Remote hydration:** sync calls `upsertApp` and `saveAppData` through the same public contract.
5. **Delete:** remove both the app record and its data in one IndexedDB transaction.

## Rules

- Core owns local persistence, not sync policy, sandbox behavior, or React state.
- App data must be JSON-compatible; transient UI state does not belong here by default.
- Source is stored as one complete HTML document rather than as files or patches.
- Database names, versions, object stores, and record shapes are compatibility contracts.
- Core must not import UI, runtime, sync, or AI.

## Code Map

```text
src/core/
├── index.ts             Public exports
├── types.ts             AppLabCore and record contracts
├── indexedDbCore.ts     Browser implementation
├── memoryCore.ts        Test implementation
├── htmlMetadata.ts      Title and description extraction
└── alpineExampleApp.ts  Starter app source
```

## Verification

`memoryCore.test.ts` exercises the contract without browser persistence. Browser persistence is covered by Playwright workflows.

```bash
pnpm test
pnpm test:e2e
```
