# App Lab Security Model

App Lab separates trusted host code from untrusted app code. The host owns storage, settings, BuilderAI, and the iframe boundary. Apps receive only a narrow message-based API.

## Trust Boundaries

Trusted code:

- `index.html`
- `styles.css`
- `src/**`
- tests and docs during development

Untrusted or lower-trust code:

- app HTML stored in `apps_registry`
- generated app HTML written by BuilderAI
- seed app HTML once loaded into the iframe

Seed apps are bundled with the repo, but at runtime they still execute inside the same sandbox as generated apps. This keeps the security model uniform.

## Iframe Sandbox

The active app is loaded with:

```html
<iframe id="app-sandbox" sandbox="allow-scripts"></iframe>
```

Important properties:

- `allow-scripts` lets app JavaScript run.
- `allow-same-origin` is intentionally absent.
- The iframe receives an opaque origin.
- App code cannot directly read host DOM, host IndexedDB, host local storage, cookies, or settings inputs.
- The host injects app HTML through `srcdoc`, not by navigating to arbitrary remote URLs.

The sandbox does not make app code harmless. It limits browser capabilities and forces app interaction through the host RPC boundary.

## RPC Firewall

Apps communicate with the host through `window.parent.postMessage`.

`src/platform.js` accepts an incoming message only when:

```js
event.source === iframe.contentWindow
```

This prevents other windows, stale frames, or unrelated scripts from using the app RPC API.

Supported message types are intentionally small:

- `LIST_APPS`
- `NAVIGATE_APP`
- `GET_MY_DATA`
- `SAVE_MY_DATA`

There is no generic "run command" API. Unknown message types are ignored.

## Data Isolation

App data is keyed by the host's active app id, not by an app-provided id. For `GET_MY_DATA` and `SAVE_MY_DATA`, the host chooses the storage row from `state.activeAppId`.

This prevents an app from claiming another app id in the payload to read or overwrite that app's data.

Current limitation: the model is single-active-iframe. If App Lab later supports multiple simultaneous iframes, storage routing must be changed from active-app state to a frame-to-app mapping.

## API Key Handling

OpenRouter API key and model id are stored in the host-owned `system_config` store. The settings dialog lives outside the iframe, so app code cannot read its inputs directly.

The API key is used only by host code in `src/builder/openrouter.js`. It is not sent to iframe apps through RPC and is not included in app HTML.

Current limitation: the key is stored in browser IndexedDB as local app configuration. This protects it from sandboxed app code, not from someone with access to the browser profile or device.

## BuilderAI Constraints

BuilderAI is host-owned and can use two tools:

- `read_current_app_code`
- `write_current_app`

The tools operate only on the current active app. The write tool requires a complete HTML document and then reloads the iframe from the updated registry record.

The BuilderAI prompt also instructs generated apps not to use:

- external scripts
- CDNs/imports
- remote images
- network requests
- cookies
- localStorage/sessionStorage
- IndexedDB

These are prompt-level constraints, not hard browser enforcement for every case. The iframe sandbox and host RPC boundary are the primary security controls.

## Streaming and Progress UI

OpenRouter streaming is parsed in host code. Reasoning-related stream fields are used only to trigger generic progress text such as "Thinking through the request..." and are not displayed as hidden chain-of-thought.

Final assistant text and tool progress are rendered in the host BuilderAI panel, outside the iframe.

## Test Hook

When the host is loaded with `?test=1`, `src/main.js` exposes `window.__appLabTest` for browser smoke tests.

This hook is absent during normal app loads. It should stay small and should expose only functions needed by tests.

## Known Non-Goals

Current App Lab security does not attempt to provide:

- protection against malicious browser extensions
- protection against local device compromise
- cryptographic encryption of API keys at rest
- network isolation for generated app code beyond prompt instructions
- multi-user authorization

The intended boundary is local, single-user browser containment: untrusted app HTML should not be able to read host secrets or arbitrary app data.
