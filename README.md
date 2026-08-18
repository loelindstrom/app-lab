# App Lab

App Lab is a browser workspace for creating, editing, running, exporting, and syncing small sandboxed HTML apps. The host is a
React/Vite application; user apps are complete HTML documents that run inside isolated iframes and persist JSON data through the
host-provided `window.AppLab` API.

## How It Fits Together

```mermaid
flowchart TB
  subgraph manual["Manual"]
    direction TB
    aimanual["<b>AI</b>\nManually copy from AppLab to external AI chat and then back again"]
  end

  subgraph browser["<b>In the browser</b> (App Lab code lives fully client-side.)"]
    ui["<b>src/ui</b>\nThe UI shell surrounding the sandboxed apps"]
    core["<b>src/core</b>\n Local-first persisting operations to IndexedDB"]
    runtime["<b>src/runtime</b>\nSandboxed app"]
    subgraph optional["Optional for user to set up"]
        ai["<b>src/ai</b>\nAi agent + integration with LLM"]
        sync["<b>src/sync</b>\n Enables sharing apps and cross-device support"]
    end
  end

  subgraph integrations["External Integrations"]
    direction TB
    subgraph aiBox["AI"]
        openrouter["<b>OpenRouter</b>\nMediates with LLM"]
    end
    subgraph syncBox["Sync"]
        firebase["<b>Firebase</b>\nRealtime Database (RTDB)"]
    end
  end

  ui <--> runtime
  ui <--> core

  
  ui <--> sync
  sync <--> core
  sync <--> syncBox
  
  ui <--> ai
  ai <--> core
  ai <--> aiBox
  
  ui <--> aimanual
  
```

App Lab itself is local-first: the workspace and each app's JSON data live in this browser first. The generated app cannot reach
the host, Firebase, or your settings directly; it only exchanges app-data messages with the sandbox runtime. Firebase sync and
AI assistance are opt-in integrations, not requirements for using the workspace.

The important architecture docs are:

- [Architecture overview](./docs/architecture.md)
- [General architecture](./docs/1.architecture-general.md)
- [Sync architecture](./docs/2.architecture-sync.md)
- [Deployment](./docs/deploy.md)
- [Backlog](./docs/backlog.md)

## Development

```bash
pnpm install
pnpm dev
pnpm typecheck
pnpm test
pnpm test:e2e
```

The normal local loop is `pnpm typecheck`, `pnpm test`, and `pnpm test:e2e`. These commands do not require Firebase credentials;
`pnpm test:e2e` excludes tests tagged `@firebase`.

Real Firebase checks are opt-in and load `.env.test.local`; copy the shape from
[.env.test.local.example](./.env.test.local.example). With that file configured:

```bash
pnpm test:firebase-smoke
pnpm test:firebase-e2e
```

`pnpm test:firebase-smoke` verifies low-level provider and RTDB rules behavior. `pnpm test:firebase-e2e` runs the browser-level
sync workflows tagged `@firebase`.
