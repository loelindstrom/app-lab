# AI Integration Feature Brief

This is a temporary working document for bringing BuilderAI back into App Lab. It can become a formal architecture document after
the first implementation slice proves the shape. Start with the [developer guide](../README.md) for the surrounding module map and
shared terminology.

## Goal

BuilderAI should let a user ask for changes to the active sandbox app and apply those changes without leaving App Lab.

The MVP goal is not to build a sophisticated browser-native coding agent. The MVP goal is to make the existing copy-prompt
workflow feel native: the app can send the same high-quality App Lab instructions, current source, and relevant console output to
an OpenRouter model, then apply a complete rewritten HTML document with a small safety net and synced per-app chat history.

## Product Thesis

App Lab is strongest when it feels like a small local workshop:

- create or open a tiny app
- ask AI to reshape it
- run it immediately in the sandbox
- persist data through `AppLab`
- continue the builder conversation from another synced browser
- share it with another person when useful

The AI integration is likely one of the product's strongest differentiators for indie developers and AI-curious users. The first
version only needs to show that this loop works reliably enough to be useful.

## Principles

- BuilderAI edits only the active app.
- The user stays in control of applying and undoing AI edits.
- Chat history belongs to one app. Switching apps should switch BuilderAI history.
- Per-app chat history should persist across reloads and sync across the user's own browsers when workspace sync is configured.
- The agent gets app source and console context by default, not app-owned JSON data.
- OpenRouter configuration stays local to the browser and is not included in workspace sync material or app invites.
- Chat history can sync through the user's encrypted workspace storage, but it must not be included in app invite links by default.
- Generated app code must continue to use the V2 App Lab runtime API: `AppLab.getData`, `AppLab.saveData`, `AppLab.onDataChange`,
  and `AppLab.onError`.
- Generated app code must not talk directly to OpenRouter, Firebase, browser storage, remote URLs, or hidden host internals.
- Reuse the same prompt rules as the existing "Copy prompt + code" helper so manual and native AI workflows teach the same model
  behavior.
- Keep `src/ai` behind a public `index.ts` contract. The agent should receive narrow host-supplied tool callbacks instead of
  importing core, runtime, or sync implementation files.
- Route manual edits, AI replacements, and AI undo through one host-owned source-save operation. That operation should validate
  and compile the source, persist it through `AppLabCore`, queue normal source sync, and return the updated app to the UI.
- Do not use generic IndexedDB observation as the source-sync trigger. Explicit source-save commands preserve whether a write was
  local or remote and avoid accidental synchronization loops.
- Prefer simple, observable behavior over clever source-edit machinery until there is evidence it is needed.

## Intended Module Boundary

The boundary turns the principles above into code: BuilderAI may propose and request changes, while the host remains responsible
for app source, persistence, sync, and sandbox reloads. `src/ai` should own OpenRouter communication, the bounded agent loop, AI
configuration, and per-app chat behavior. It should expose its production API through `src/ai/index.ts`, following the same
boundary convention as core, runtime, sync, and UI.

The UI/application composition should supply implementations of the agent tools. In particular,
`replace_current_app_source` should call the same source-save operation used by the manual Source tool; it should not write
IndexedDB or Firebase directly. This keeps the agent unaware of persistence and sync implementation details while guaranteeing
that AI edits update local state, remote rooms, sync status, and the active sandbox in the same way as manual edits.

The source-save operation can initially remain a focused function owned by the workspace shell and be passed to both the manual
Source tool and BuilderAI. If it later needs callers outside that composition boundary, move it behind a small application-level
contract rather than duplicating the orchestration.

This preserves both user expectations and the local-first model: an AI edit is a normal source edit with a different initiator,
so apply, undo, sync status, remote updates, and sandbox reload all follow the same path.

## Must Have For MVP

1. OpenRouter configuration

   Settings needs a real AI section where the user can save an OpenRouter API key and model id. The key should be stored locally
   in this browser only.

2. Builder panel connection state

   If AI config is missing, BuilderAI should show inviting chat-style messages in the same area where normal conversation appears.
   The first action should be the zero-setup path: open/copy the existing "Copy prompt + code" package for use in another AI chat.
   The second action should open the OpenRouter setup in Settings.

   This keeps App Lab useful for users who do not want to configure AI yet.

3. First-run chat state

   When AI config exists and the app has no chat history yet, BuilderAI should show a hardcoded introductory assistant message that
   clearly scopes the interaction to the active app. It should invite the user to describe the app or change they want.

4. Per-app persisted chat history

   BuilderAI should keep one chat history per app. Reloading the page, leaving an app, and reopening it should not wipe the
   conversation.

   Chat messages should be host-owned state, not generated-app data. Generated app code must not be able to read BuilderAI chat
   history through `AppLab.getData`.

5. Owner/workspace chat sync

   When workspace sync is configured, the user's per-app chat history should sync across that user's browsers/devices.

   Chat history likely needs a new encrypted room type such as `builder-chat`. The room capability should be referenced from the
   user's workspace manifest or app sync metadata, not from app invite links. This should reuse the existing provider/crypto/queue
   shape rather than using generated-app data rooms.

   Chat is append-heavy, so it should not use blind latest-wins conflict behavior if that risks dropping messages from another
   synced browser. Message ids and created timestamps should allow simple union-by-id merging for normal conflicts.

   Chat history should not be included in app invite links by default. If another user imports a shared app and configures their
   own AI/storage, they should get their own per-app chat history for that app in their own workspace. The app source/data may be
   shared, but BuilderAI conversations stay user/workspace-local unless a future feature explicitly introduces shared AI sessions.

6. Bounded agent loop

   The first agent should support a small tool set:

   - `read_current_app_source`
   - `read_recent_console_output`
   - `replace_current_app_source`

   The write tool should accept one complete HTML document and invoke the host-supplied source replacement callback. The agent
   module itself should not write to core or sync. Partial patch tools can wait.

7. Prompting based on the current helper

   The system/developer prompt should embed the same App Lab runtime rules already used by `createPromptWithCode`: sandbox
   restrictions, host-injected Alpine, host-compiled Tailwind, `AppLab` persistence, live data updates, and JSON-only saved data.

8. Source replacement validation

   Before saving, App Lab should reject obviously invalid writes: empty source, non-HTML output, or responses that do not look like
   a complete document. Existing source-save behavior should still parse title/description and compile Tailwind when enabled. The
   manual Source tool and BuilderAI should share this implementation rather than merely duplicate the same validation rules.

9. Immediate apply plus undo last AI edit

   The MVP write flow should apply AI source edits immediately. The safety net should be one-click undo for the most recent
   AI-applied source edit.

   To make this behave well with sync, the last AI edit should be represented as host-owned metadata for the app. It can store the
   previous source and applied source for one edit, separate from the normal chat messages and excluded from model context. Undo
   should call the same source-save path as a manual Source save, so shared apps sync the undo like any other source edit.

   A full source history, persistent snapshots for every save, and visual diffs are valuable but not required for the first MVP
   slice.

10. Clear chat

   The user should be able to clear the BuilderAI chat for the current app. If chat sync is configured, clearing chat should sync
   as an intentional reset for that user's workspace-local chat history. Clearing chat should not delete the app source or app
   data.

11. Bounded model context

   Persisted chat history and model context are not the same thing. App Lab may keep a longer per-app chat history for UX, but each
   OpenRouter request should include a bounded slice:

   - the current App Lab system/developer instructions
   - the latest user request
   - recent relevant chat turns up to a size limit
   - current source through the read-source tool
   - recent console output through the console tool

   The first implementation can use a simple character/byte budget and omit older chat messages from the model request. It should
   not silently delete older stored messages just because they were omitted from one request.

12. Progress and errors

   The panel should show concise working states such as reading source, reading console, generating change, and applying source.
   OpenRouter/API/model errors should be visible in the chat instead of only in DevTools.

13. Tests

   Cover the agent loop with mocked OpenRouter responses, including:

   - missing config
   - assistant text-only response
   - per-app chat persistence
   - tool call to read source
   - tool call to replace source
   - undo after an AI edit
   - clear chat
   - visible API error

## Should Have Soon

1. OpenRouter setup guide polish

   The AI section in Settings should feel similar to Firebase setup: clean, step-based, and easy to resume. Steps could include
   opening OpenRouter, creating an API key, pasting the key, choosing a model id, and testing the connection.

2. Console-aware repair loop

   After an edit reloads the app, the user should be able to ask "fix the error" and have the agent read recent console output
   without manual copying.

3. Model setup polish

   Settings should make model id entry less error-prone. A plain text field is acceptable for MVP, but common model presets or a
   fetched model picker would reduce setup friction.

4. Token budgeting

   Show or enforce practical limits when app source grows large. The first version can send full source, but it should fail
   clearly if the selected model cannot handle the request.

5. One-step redo

   Redo is not required for the first MVP slice, but the one-edit undo metadata can be shaped so redo is easy later: store both the
   previous source and the applied source until another source edit supersedes that edit.

## Could Have Later

1. Partial edit tools

   Add source-aware tools such as `replace_source_range` or `replace_named_section` if full-document rewrites become too slow,
   expensive, or error-prone. Line-number tools should include enough context to avoid off-by-one edits.

2. Apply preview

   A review step before saving could show that BuilderAI has a proposed source change and let the user choose Apply or Discard. A
   line diff would make this more useful. For the first MVP, immediate apply plus undo is probably faster and more inviting.

3. Persistent source history

   Add local snapshots for AI edits and manual Source saves if users need longer rollback windows. This should be designed as a
   general Source feature rather than an AI-only feature.

4. Diff viewer

   A visual diff would make AI edits easier to review, especially once partial edits exist.

5. App-data opt-in context

   Let users explicitly include app-owned JSON data in a request when debugging data behavior. This should be opt-in per request
   because app data may contain personal content.

6. Multi-step self-check

   The agent could apply a change, observe console output, and attempt one repair pass automatically. This should stay bounded and
   visible to avoid surprising source churn.

7. Better model discovery

   Fetch compatible OpenRouter models and show pricing/context metadata in Settings. This is useful, but it should not block the
   initial agent loop.

8. Chat compaction/summarization

   If long-running chats become common, App Lab can add a compacted summary that is maintained locally or generated through the
   configured model. This should be explicit and observable. The MVP should not depend on a vendor-specific memory or compaction
   feature.

9. Shared AI sessions

   A future collaboration feature could let multiple users share one BuilderAI conversation for a shared app. That needs explicit
   product design because prompts and debugging context can be private even when app source/data is shared.

## Non-Goals For MVP

- Browser-native git or branch management.
- Multi-file generated apps.
- AI access to Firebase rooms, sync secrets, app invites, or workspace sync material.
- Sending app-owned JSON data to OpenRouter by default.
- Autonomous edits across multiple apps.
- Sharing BuilderAI chat history through app invite links.
- Source-code merge algorithms or CRDT collaboration.
- Read-only sharing enforcement.

## Implementation Order

The six slices below are the working implementation plan. Each slice should be reviewed, tested, and committed independently.

1. **Prepare the host boundary — complete**

   - Extract the inline source-save workflow from `WorkspaceShell`.
   - Let both the Source editor and BuilderAI invoke it.
   - Accept an explicit app id so an old AI request cannot overwrite whichever app happens to be open later.
   - Add basic complete-HTML validation.
   - Add no visible AI behavior yet.

2. **Add the headless `src/ai` module — complete**

   - Expose its production contract through `index.ts`.
   - Add OpenRouter configuration and the client.
   - Add the bounded agent loop, App Lab system prompt, and tool definitions.
   - Add dependency-cruiser rules protecting the module boundary.
   - Give `src/ai` host callbacks; it must not import UI, core, runtime, or sync.

3. **Build the first in-memory vertical slice — complete**

   - Store conversations in React memory, keyed by app id.
   - Configure OpenRouter in Settings.
   - Send a message.
   - Read current source and console output.
   - Replace source through the shared save operation.
   - Display assistant text, progress, and errors.
   - Clear the in-memory conversation.
   - Allow page reloads to erase chat at this stage.

   Messages should already have stable `messageId`, `appId`, `role`, `content`, and `createdAt` fields. This avoids changing the data
   model when persistence and merging arrive.

4. **Harden the integration — next**

   - Bound tool rounds and context size.
   - Reject malformed tool arguments and invalid HTML.
   - Cancel or invalidate a request when its app session changes.
   - Test text-only answers, tool calls, provider failures, stale requests, and malformed responses.
   - Start non-streaming if that gets the vertical slice working sooner. Streaming can then be added without changing the agent
     contract.

5. **Add local conversation persistence**

   - Give `src/ai` its own IndexedDB-backed chat store rather than putting AI history into app-owned data.
   - Hydrate per-app conversations when apps are opened.
   - Keep the hardcoded introductory message derived rather than storing it.
   - Persist only user-visible user/assistant messages; internal tool transcripts can remain request-local.

6. **Add private conversation sync**

   - Introduce the encrypted chat room and queue behavior.
   - Merge messages by stable id.
   - Add explicit clear/reset semantics so old messages cannot be resurrected.
   - Keep chat out of app invites.
   - Give invite recipients their own independent conversations.
   - Then decide whether undo availability itself must follow the owner across devices.

## Open Questions

- Should the default model be a documented recommendation, a placeholder, or no default at all?
   - Answer: Default to gemini pro extended (since it has been tested externally with app lab prompt and worked well). But also suggest other good coding agents. Perhaps one from open source model, one from Claude and one from ChatGPT. Then all the big ones are covered.
- Should OpenRouter config live in IndexedDB next to core app state, or in `localStorage` like sync registry metadata?
   - Answer: If sync registry metadat means the connection details for firebase I guess it makes sense to also put the OpenRouter configs there. Since both are API keys, so makes sense to keep them next to each other.
- Should per-app chat be stored in IndexedDB, with sync metadata in the workspace registry, or should the local chat payload live
  entirely in the sync registry store?
  - Answer: My gut feeling says IndexedDB is the correct place and then be synced afterwards if internet - following the "local-first" paradigm. But local-first is perhaps not so relevant since one needs internet to connect ot an AI model. Still I think Indexed db is right place. But I'm open to change my mind.
- Should synced chat rooms be added in the first implementation slice or immediately after the local BuilderAI loop works?
  - Answer: Better implement them as separate slices to not have to think of too much complexity at once.
- Should undo be available across devices by syncing one previous-source snapshot, or should undo remain local to the browser that
  applied the AI edit?
   - Answer: Hmm, very good question... I guess if we anyway implement sync it probably doesn't cost that much extra to sync both.
- Should an AI-applied source edit on a shared app publish immediately to collaborators through the normal source sync path, or
  should shared apps require an explicit confirmation before publishing the AI change?
   - I think immediately. It sounds the easiest and everything keeps behaving just as when manually edits the source iwthout AI.
