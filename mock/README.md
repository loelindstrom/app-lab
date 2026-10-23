# UI Mock

Run `pnpm --dir mock install` once, then `pnpm dev` from the repository root and
open `/mock/` on the printed URL.

This is a separate React entry point for exploring the UI together. It has no
connection to App Lab's modules, browser storage, or external services. The normal
production build still uses the root `index.html` only.

`/mock/` is the app-shaped prototype: one alphabetical launcher grid, sample
apps, app actions, settings, and tools. `/mock/gallery/` preserves the component
showcase. Sample state resets on reload. No real workspace, keys, or network
services are used. Applying source reads only its title and heading; pasted HTML
is never executed. Sharing and AI replies are simulated.

The launcher has a sticky brand/settings bar and a separate sticky search row,
one alphabetical grid, and a circular create button. Phones use two columns;
larger screens add columns as space allows.
Tools open as a draggable bottom sheet below 1024px, and as a right-hand panel
beside the interactive app on desktop. The expand control changes panel width
on desktop and sheet height on mobile. Resizing keeps per-app drafts intact.

Settings has General (appearance), Storage (connection placeholder), and AI
(builder preferences). Phones use a category menu and section pages; desktop
keeps category navigation beside the content.

## Structure

- `App.tsx`: mock state, navigation, and per-app sessions.
- `screens/`: launcher, app view, and settings; receive state and callbacks.
- `components/`: shared controls, sheets, and HTML/JSON editor.
- `theme/`: semantic tokens and System/Light/Dark appearance controls.
- `gallery/`: the component showcase, using the same controls and themes.
- `sampleApps.ts`: sample app records, separate from presentation.
- `tests/`: mock-only browser checks.

System is the default appearance and follows live OS changes. Preferences,
app edits, and each app's conversations stay in React memory for this phase.
The future live UI can supply real state and callbacks without making App Lab's
production modules depend on this folder.

Tools are grouped under AI, Develop, and Share. AI has External and Chat
views; Develop has Code, Data, and Log. Second-level tabs use a lighter underline
style. Editors can paste, copy, import a file for review, or export their draft.
The JSON example is independent of the sample board and lives only in memory.

External AI follows one vertical flow: describe, copy, open an AI, paste its HTML
reply, and apply. Provider links open new tabs without sending the prompt. Reply
code stays in its own draft until applied; Develop keeps the full editor tools.

Unread log errors and AI replies appear as dots on their view, parent tab, and
app-tools button. Opening the relevant view clears its unread indicator, not its
content. Weekend board has one sample error to demonstrate this. Switch away
from Chat before its simulated reply to see an unread reply. The launcher also
reflects unread attention per app.

The prompt has tappable help. Drafts survive switching tabs, and the mobile sheet
opens expanded. AI activity uses a gentle icon pulse; reduced-motion preferences
disable it.

The app-tools button shimmers for five seconds on app entry, including a moving
background sheen. Both the AI animation setting and OS reduced-motion preference
disable motion. Log previews the iframe console entry shape (level, timestamp,
and string arguments), with copy/clear actions. It is not a host activity feed.
Share shows a copyable `.example` preview link, not a working invite. Console
entries remain sample data until the new UI is connected to runtime.

Inter Variable is served locally. [Lucide](https://lucide.dev/guide/react) supplies
the icons; [Vaul](https://vaul.emilkowal.ski/getting-started) supplies drag gestures
for mobile sheets, and [Radix Dialog](https://www.radix-ui.com/primitives/docs/components/dialog)
supplies the non-modal desktop panel. Packages and their lockfile are scoped to this folder;
the main App Lab dependencies are unchanged.

## Checks

Run `pnpm --dir mock typecheck` to check the UI and browser test code.

Run `pnpm exec playwright test --config mock/playwright.config.ts` from the repo
root. It reuses or starts the preview on port 5180 and tests phone/desktop flows,
per-app chat isolation, themes, and layout. It requires no provider credentials.
These checks are separate from the normal production test suite.

## Before Live Wiring

These are prototype choices, not changes to the existing business contracts:

| Area | Resolve when connecting |
| --- | --- |
| Creation | Optional names, AI naming, and real profile starter templates. |
| Source editing | Shared prompt assembly, validation, compilation, and app-id-scoped saves. |
| App content/data | Replace sample boards with the sandbox; connect JSON edits to real app data. |
| Chat/attention | Real agent progress, cancellation, errors, usage, and unread-state lifetimes. |
| Sharing/settings | Storage setup requirements, actual invites, permissions, and preference persistence. |
| App metadata | Icons, colours, and shared-by names are fixtures, not current core fields. |

Reuse existing module contracts and the main app's React instance when integrating.
Production modules must not depend on this mock folder.
