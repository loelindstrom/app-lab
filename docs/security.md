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
- Before assignment to `srcdoc`, the host parses the app HTML, removes app-supplied CSP meta tags, injects a host-owned Content Security Policy meta tag, and injects a per-load RPC capability.

The sandbox does not make app code harmless. It limits browser capabilities and forces app interaction through the host RPC boundary.

## App Content Security Policy

`src/platform.js` injects an enforced app-document CSP before every iframe load. The host uses `DOMParser` and DOM serialization for injection rather than regex replacement, so commented or malformed textual `<head>` fragments cannot absorb the CSP meta tag. App-supplied CSP meta tags are removed before the host CSP is prepended.

The policy is intentionally restrictive:

```text
default-src 'none';
script-src 'unsafe-inline';
style-src 'unsafe-inline';
img-src data: blob:;
font-src data:;
connect-src 'none';
media-src data: blob:;
object-src 'none';
frame-src 'none';
worker-src 'none';
form-action 'none';
base-uri 'none'
```

This keeps generated apps usable with inline HTML/CSS/JavaScript while blocking common exfiltration paths:

- `fetch`, `XMLHttpRequest`, WebSocket, EventSource, and `sendBeacon` through `connect-src 'none'`
- remote images through `img-src data: blob:`
- remote scripts because only inline scripts are allowed
- forms through `form-action 'none'`
- nested frames and workers
- base URL rewriting

The host also listens for iframe load events. If the iframe loads unexpectedly after the host's own `srcdoc` load, the host reloads the active app. This is the navigation hardening layer; App Lab does not use the CSP `navigate-to` directive because some supported browsers report it as unrecognized.

## RPC Firewall

Apps communicate with the host through `window.parent.postMessage`.

`src/platform.js` accepts an incoming message only when:

```js
event.source === iframe.contentWindow
message.appLabCapability === activeFrameCapability
```

The capability is generated for each `loadApp()` call and injected into the app document as `window.__APP_LAB_CAPABILITY__`. Seed apps and generated apps include it as `appLabCapability` in each host RPC message.

This prevents ordinary stale-frame and document-confusion cases: other windows, old iframe documents, and unrelated scripts cannot use the app RPC API after the host has loaded a different app document and rotated the capability. It is not a secrecy boundary against the currently running app itself, because that app can read and deliberately disclose its own current capability before navigating away.

Supported message types are intentionally small:

- `LIST_APPS`
- `NAVIGATE_APP`
- `GET_MY_DATA`
- `SAVE_MY_DATA`

There is no generic "run command" API. Unknown message types are ignored.

## Data Isolation

App data is keyed by the host's frame-bound app id, not by an app-provided id. For `GET_MY_DATA` and `SAVE_MY_DATA`, the host chooses the storage row from the active validated frame capability.

This prevents an app from claiming another app id in the payload to read or overwrite that app's data.

`SAVE_MY_DATA` accepts only JSON-serializable payloads up to 1MB after serialization. Oversized or non-serializable payloads are rejected and return `MY_DATA_SAVE_FAILED`.

Current limitation: the model is single-active-iframe. If App Lab later supports multiple simultaneous iframes, storage routing must be changed from a single active frame capability to a frame-to-app capability map.

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

These prompt-level constraints are backed by the iframe sandbox, host RPC boundary, and injected app CSP. Browser policy is the primary control for network and navigation restrictions; the prompt is defense in depth and guidance for generation quality.

## Remaining Navigation Limitation

The browser sandbox and CSP do not fully prevent a script-enabled iframe from navigating itself in all supported browsers. App Lab intentionally does not rely on `navigate-to` because major browsers either do not support it or report it as unrecognized.

That means a malicious app that already has app-owned data can still navigate its own iframe to a remote URL with that data in the query string. The host reloads after unexpected navigation, but the outbound request may already have happened. The per-load capability reduces stale-frame and data-confusion risk, but it does not make arbitrary app JavaScript unable to leak data, messages, or capabilities it already received.

Treat generated app code as able to see and potentially disclose its own app data. The host API key, host DOM, host IndexedDB, and other apps' data remain outside the intended app boundary.

## Streaming and Progress UI

OpenRouter streaming is parsed in host code. Reasoning-related stream fields are used only to trigger generic progress text such as "Thinking through the request..." and are not displayed as hidden chain-of-thought.

Final assistant text and tool progress are rendered in the host BuilderAI panel, outside the iframe.

## Test Harness

Production startup does not expose diagnostics. `src/main.js` only starts the app through `src/app.js`.

Browser smoke tests use a separate entry point:

- `tests/smoke.mjs` starts a server bound to `127.0.0.1`.
- While that server is running, it serves a virtual page at `/__app_lab_test__.html`.
- The virtual page is based on `index.html`, but swaps `src/main.js` for `tests/test-main.js`.
- `tests/test-main.js` exposes `window.__appLabTest` for assertions.
- `tests/test-main.js` refuses to run unless the page is local and the path is exactly `/__app_lab_test__.html`.

There is no committed `index.test.html` page to deploy accidentally. If someone manually browses to `/tests/test-main.js` on a static host, they are only requesting a JavaScript source file; it does not run as the app page. If a production host has a catch-all fallback for `/__app_lab_test__.html`, it will normally return the real `index.html`, which loads `src/main.js` and does not expose diagnostics.

The remaining risk is operational: deploying the `tests/` folder is unnecessary. It is still better to exclude tests from a published static bundle if the app later gets a deployment pipeline.

## Known Non-Goals

Current App Lab security does not attempt to provide:

- protection against malicious browser extensions
- protection against local device compromise
- cryptographic encryption of API keys at rest
- multi-user authorization

The intended boundary is local, single-user browser containment: untrusted app HTML should not be able to read host secrets or arbitrary app data.
