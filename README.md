# App Lab

App Lab is a browser workspace for creating, editing, running, exporting, and syncing small sandboxed HTML apps. The host is a
React/Vite application; user apps are complete HTML documents that run inside isolated iframes and persist JSON data through the
host-provided `window.AppLab` API.

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
