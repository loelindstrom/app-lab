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
```

Firebase-backed E2E tests need a local `.env.test.local`; copy the shape from [.env.test.local.example](./.env.test.local.example).
With that file configured:

```bash
pnpm test:e2e
pnpm test:firebase-smoke
```

