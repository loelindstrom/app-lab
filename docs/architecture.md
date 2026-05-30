# System Architecture & Design Document: Gen-AI OS
**Target Audience:** LLM Software Engineers & Architects
**System Type:** Local-First, Browser-Native, Self-Modifying Virtual Operating System
## 1. Introduction & Core Concept
**Gen-AI OS** is an evolutionary, serverless, client-side personal computing platform hosted entirely on static infrastructure (e.g., GitHub Pages). It treats the web browser as an operating system environment, utilizing an architecture inspired by the **Unix Philosophy** ("Small, Sharp Tools") and **Microkernel Operating Systems**.
The system enables an AI agent (the **Manager AI**) to dynamically generate, modify, and compose single-file, client-side micro-applications (HTML/Alpine.js/Tailwind CSS) in response to natural language prompts. It enforces a "Zero Trust" security model where all user-generated apps run inside strictly sandboxed execution environments, isolating malicious or hallucinated code while maintaining frictionless deployment and absolute data privacy.
### Key Architectural Pillars
 * **Bring Your Own Key (BYOK):** All AI inference operations use the user’s private API keys stored securely in the client's local memory. No centralized servers process credentials.
 * **Local-First, Sync-Later:** Application definitions and user data are persisted locally via client-side storage, with asynchronous background synchronization to an external private repository.
 * **Immutable Kernel / Fluid Shell:** The security router, storage interfaces, and AI execution loops are hardcoded and unchangeable. The user interface, dashboards, and apps are completely fluid strings of data modified by the AI.
## 2. System Architecture Overview
The system is split cleanly between an immutable host execution layer (the Kernel Space) and an isolated, mutable app execution layer (the User Space).
```
+---------------------------------------------------------------------------------+
|                                 INDEX.HTML (Host)                               |
|  +---------------------------------------------------------------------------+  |
|  |                             KERNEL.JS (Kernel)                            |  |
|  |  +------------------+  +-----------------+  +--------------------------+  |  |
|  |  | Storage Manager  |  |   Sync Engine   |  |    Manager AI Harness    |  |  |
|  |  +------------------+  +-----------------+  +--------------------------+  |  |
|  |  +---------------------------------------------------------------------+  |  |
|  |  |                    RPC Message Router (Firewall)                    |  |  |
|  |  +---------------------------------------------------------------------+  |  |
|  +--+---------------------------------------------------------------------+--+  |
|     | (postMessage API)                                                   |     |
|     v                                                                     v     |
| +-----------------------------------------+   +-------------------------------+ |
| |       IFRAME #0: DASHBOARD SHELL        |   |    IFRAME #1..N: SUB-APPS     | |
| | sandbox="allow-scripts"                 |   | sandbox="allow-scripts"       | |
| | Origin: null                            |   | Origin: null                  | |
| +-----------------------------------------+   +-------------------------------+ |
+---------------------------------------------------------------------------------+

```
## 3. Core Component Breakdown
### 3.1 Layer 1: The Bootloader (index.html)
The static landing page. It acts as the physical host and window wrapper.
 * **UI Footprint:** Contains a full-viewport root wrapper div and a native HTML5 \<dialog> element.
 * **Secure Settings Modal:** The \<dialog> element captures sensitive user configurations (AI API keys, GitHub Sync tokens). Because it resides in the host window, sandboxed sub-apps cannot intercept keystrokes or read its inputs.
 * **Sandboxed Viewport:** Houses a single \<iframe> tag configured strictly with sandbox="allow-scripts". The absence of allow-same-origin forces the iframe into a unique, anonymous null origin, blocking direct DOM/cookie/storage access to the parent page.
### 3.2 Layer 2: The Core Microkernel (kernel.js)
An unchangeable script loaded by index.html. It runs in the secure host context and acts as an absolute firewall. It is divided into four functional modules:
#### Module A: Storage Manager
Interacts with the browser's native IndexedDB API. It enforces three distinct isolated tables:
 1. system_config: Stores local state, encrypted or raw API keys, and synchronization credentials.
 2. apps_registry: Stores application manifests and executable source code strings.
   * *Schema:* { appId: string, name: string, systemPrompt: string, sourceCode: string }
 3. apps_data: Stores domain-specific application states.
   * *Schema:* { appId: string, data: array|object }
#### Module B: RPC Message Router (The Firewall)
Listens for inbound cross-document messages (window.addEventListener('message')).
 * **Identity Validation:** Verifies that event.source matches the currently active application iframe window object.
 * **Whitelisted Command Execution:** Evaluates incoming payloads against a rigid command list. Unauthorized commands (e.g., requesting the raw API key) are dropped instantly.
#### Module C: Manager AI Harness
An internal JavaScript agentic loop replacing local CLI dependencies (like Aider). It translates user modification requests into app code updates using standard LLM tool-calling APIs.
 * **System Prompt Constraint:** Hardcoded meta-instructions directing the LLM to write only valid single-file web documents adhering to the platform's architectural limits.
 * **Tool Schema Definitions:** Exposes system capabilities as JSON schemas to the LLM (see Section 4).
#### Module D: Sync Engine
An automated asynchronous routine that serializes apps_registry and apps_data into structured JSON objects and commits them to a designated cloud backup location via standard HTTPS REST calls.
## 4. Communication Protocols & RPC API
All communication between the sandboxed user space and the microkernel occurs via the browser's window.parent.postMessage API. The Kernel interceptor verifies payloads using strict data schema routing.
### 4.1 Sub-App to Kernel Data API
#### Read Data Request (GET_MY_DATA)
Sent by a sub-app on initialization to pull its stored states.
```json
{
  "type": "GET_MY_DATA",
  "appId": "quick-notes"
}

```
*Kernel Action:* Validates that the iframe sender corresponds to quick-notes. Fetches the matching record from the apps_data table, and emits a structured data payload downwards (DATA_DELIVERY).
#### Write Data Request (SAVE_MY_DATA)
Sent by a sub-app whenever state changes.
```json
{
  "type": "SAVE_MY_DATA",
  "appId": "quick-notes",
  "payload": {
    "data": ["Buy bread", "Call insurance"]
  }
}

```
*Kernel Action:* Overwrites the specific record within apps_data tied strictly to the sender's validation token.
### 4.2 Sub-App to Kernel AI Proxy API
#### Proxy LLM Request (PROXY_LLM_REQUEST)
Executed when an isolated app contains its own embedded conversational agent features.
```json
{
  "type": "PROXY_LLM_REQUEST",
  "appId": "quick-notes",
  "payload": {
    "prompt": "Summarize my layout notes"
  }
}

```
*Kernel Action:* Intercepts the request, prepends the app's specific systemPrompt pulled from apps_registry, appends the hidden API keys from system_config, executes the HTTPS fetch request to the AI vendor endpoint, and passes **only** the textual string answer back down to the calling iframe via an AI_RESPONSE event. **The API key never enters the iframe memory.**
## 5. Agentic Tool Definitions for the Manager AI
When modifying the system, the **Manager AI Harness** activates an agentic execution loop, supplying the LLM with these two core capabilities:
### Tool 1: read_app_code
Allows the LLM to inspect the current markup of a targeted application before editing.
```json
{
  "name": "read_app_code",
  "description": "Retrieves the current single-file HTML source code for an application from the registry.",
  "parameters": {
    "type": "object",
    "properties": {
      "appId": { "type": "string", "description": "The unique identifier of the app to inspect." }
    },
    "required": ["appId"]
  }
}

```
### Tool 2: write_app_code
Allows the LLM to write out structural layout updates or create entirely new micro-applications.
```json
{
  "name": "write_app_code",
  "description": "Writes or completely overwrites an application's single-file HTML source code inside the system registry.",
  "parameters": {
    "type": "object",
    "properties": {
      "appId": { "type": "string", "description": "The unique identifier of the target application." },
      "newHtmlString": { "type": "string", "description": "The full, self-contained HTML/AlpineJS string code document." }
    },
    "required": ["appId", "newHtmlString"]
  }
}

```
