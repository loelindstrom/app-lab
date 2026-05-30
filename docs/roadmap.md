Here is the implementation roadmap formatted specifically for a CLI-based AI agent. You can save this as IMPLEMENTATION_PLAN.md and feed it directly to your AI assistant alongside the architectural document when you begin the project.
# Implementation Roadmap: Gen-AI OS (MVP)
**Target Audience:** AI Coding Agent (e.g., Claude, Aider, Cursor)
**Project Context:** A local-first, serverless browser OS where a core "Kernel" safely loads AI-generated micro-apps into sandboxed iframes.
**Execution Strategy:** Strict Agile/Iterative. Do not build advanced features (Sync, In-App Agents, Multi-App communication) until Phase 1 and Phase 2 are verified.
## Phase 1: The Bootloader & Sandbox Skeleton
**Goal:** Establish the physical HTML wrapper, the secure iframe sandbox, and the underlying database connection. Do not implement any AI functionality in this phase.
### Tasks:
 1. **Create index.html (The Host):**
   * Must contain a full-viewport \<div> wrapper.
   * Must contain an \<iframe id="app-sandbox" sandbox="allow-scripts"></iframe>. Do **not** include allow-same-origin.
   * **The Escape Hatch:** Include a native HTML \<button id="system-home">Back to Menu</button> floating outside the iframe. This ensures the user can always escape a crashed app.
   * Include a \<script src="kernel.js"></script>.
 2. **Create kernel.js (The Microkernel):**
   * Initialize a native IndexedDB wrapper.
   * Create two stores: apps_registry (holds HTML source code) and apps_data (holds app-specific JSON state).
   * Implement a loadApp(appId) function that fetches the HTML string from apps_registry and injects it into the iframe via the srcdoc property.
 3. **Verify with Dummy Data:**
   * On startup, programmatically insert a hardcoded "App #0" (Main Menu) HTML string into the apps_registry if it doesn't exist.
   * Load App #0 into the iframe on boot.
## Phase 2: Data Binding & RPC Router (The Plumbing)
**Goal:** Establish secure two-way communication between the sandboxed iframe apps and the Kernel's database using the postMessage API.
### Tasks:
 1. **Implement the Kernel Firewall (kernel.js):**
   * Add a window.addEventListener('message') listener.
   * **Security Check:** Validate that event.source strictly matches the contentWindow of the app-sandbox iframe. Reject all others.
   * Support two commands: GET_MY_DATA and SAVE_MY_DATA. Ensure an app can only read/write to the apps_data row matching its specific appId.
 2. **Create Dummy App #1 to Test Plumbing:**
   * Write a simple hardcoded HTML/Alpine.js string for App #1 (e.g., a basic Notes app with a textarea and a save button).
   * Inject it into apps_registry.
   * Verify the workflow: Open App #1 -> Type text -> Click Save (triggers SAVE_MY_DATA) -> Click Escape Hatch back to App #0 -> Reopen App #1 (triggers GET_MY_DATA). If the text persists, the plumbing is verified.
###  Phase 3: The Manager AI Harness (The Brain)
**Goal:** Introduce the LLM execution loop to allow the user to generate and modify apps using natural language. The Manager AI interface must live strictly in the Host layer to prevent accidental lockouts.
**Tasks:**
 1. **Secure Configuration & Chat UI (index.html):**
   * Build a persistent Host-level UI (e.g., a sliding drawer or floating panel) for the Manager AI chat, living completely outside the iframe.
   * Build a native HTML5 \<dialog> modal triggered by a Host-level settings button to capture and save the user's AI provider API key inside the Kernel's IndexedDB.
 2. **The Agentic Loop (kernel.js):**
   * Write a generic LLM fetch function utilizing the stored API key.
   * Define the System Prompt: *"You are the Manager AI for a sandbox OS. You generate single-file HTML/Alpine apps. No external scripts allowed."*
   * **Define Tools (JSON Schema):**
     * read_app_code(appId): Returns the current HTML string.
     * write_app_code(appId, newHtmlString): Overwrites the HTML string in the registry and triggers an iframe reload.
 3. **Hook up the Host Chat Interface:**
   * Wire the Host-level chat UI directly to the Agentic Loop in kernel.js using standard DOM event listeners (no postMessage required for the Manager AI).
   * Ensure that when write_app_code executes, the Kernel seamlessly refreshes the srcdoc of the iframe so the user sees the AI's updates instantly without dropping the chat context.
This makes the system essentially bulletproof. You have an unbreakable Kernel, an unbreakable Command Line (the chat), and a totally disposable, fluid User Space (the iframes).
Are you feeling ready to hand this off to your AI coding agent to start generating the Phase 1 skeleton, or is there any other structural detail you want to iron out first?
## Phase 4: Future-Proofing (Data Migrations & Persistence)
**Goal:** Prevent AI-generated layout updates from crashing apps due to mismatched data schemas.
### Tasks:
 1. **Data Migration Tool:**
   * Add a third tool to the LLM Schema: migrate_app_data(appId, migrationLogic).
   * Instruct the AI: *"If your code update changes the JSON schema expected by the app, you MUST call migrate_app_data to rewrite the user's existing data before calling write_app_code."*
 2. **Session Persistence:**
   * Ensure Manager AI chat histories are saved to IndexedDB so context isn't lost when reloading App #0.
**Strict Exclusion Notice for AI Agent:**
Do **NOT** attempt to build remote storage syncing, GitHub integrations, or App-specific internal LLM agents during these phases. Focus strictly on local IndexedDB persistence, iframe sandboxing, and the Manager AI code-generation loop.
