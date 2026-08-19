# 🧪 App Lab

[![Live Demo](https://img.shields.io/badge/app-Open%20App%20Lab-brightgreen?style=for-the-badge)](https://loelindstrom.github.io/app-lab/) 
[![Local-First](https://img.shields.io/badge/Architecture-Local--First-blue?style=for-the-badge)](https://en.wikipedia.org/wiki/Local-first_software) 
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)

> **The home for all your AI-made apps**  
  
Create, run and edit your apps in seconds. ❤️‍🔥  
Share your creations with your friends. 🤝  
Stored locally and securely in your browser or encrypted remote - just one click away: [AppLab](https://loelindstrom.github.io/app-lab/) 🧪  

**_No SaaS subscriptions. No backend overhead. No vendor lock-in._**

---

### ⚡ Why App Lab?

* **🔒 100% Local-First & Private:** App source and data stay inside your browser’s `IndexedDB`. Works completely offline with zero tracking.
* **🤖 BYOAK (Bring Your Own API Key):** Hook up OpenRouter for inline AI code generation, or copy prompts to Claude/ChatGPT—no platform markups or artificial token limits.
* **🛡️ Sandboxed Iframe Isolation:** Executed code runs inside strict browser sandboxes with custom `postMessage` storage APIs—untrusted AI code can *never* access your host secrets or external storage keys.
* **🔄 End-to-End Encrypted Sync:** Optional zero-knowledge backup via Firebase RTDB. Sync your workspace across devices or share specific micro-apps with friends like a Google Doc.
* **💸 Zero Hosting Overhead:** Execution happens 100% client-side. Run dozens of custom micro-apps (gym loggers, pomodoros, scratchpads) without paying a single cent for server infrastructure.

---

### 🪛 Two Ways to Work

| Mode | Setup | Features |
| :--- | :--- | :--- |
| **Out-of-the-Box** | Zero Setup | Create & run apps locally, manual prompt + code handoff with any external LLM, full offline persistence via `IndexedDB`, JSON export. |
| **Connected (BYOAK)** | Optional Keys | Inline OpenRouter AI agent for direct code editing, live E2E encrypted cross-device workspace sync, and 1-click app sharing. |

> 💡 **Tip:** No need to clone this repo. Just go to the app which is hosted on this github's static page:  
> https://loelindstrom.github.io/app-lab/

---

## 👟 Choose Your Path

* 🚀 **[Try App Lab Live](https://loelindstrom.github.io/app-lab/)**
* 📖 **[User Guide](./docs/user-guide.md)**
* 🛠️ **[Developer Architecture Guide](./docs/README.md)**
* 🔐 **[Security Model & Threat Brief](./SECURITY.md)**

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for more information.