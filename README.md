# 🧪 App Lab

App Lab is a home in your browser for the small apps you make with AI. Create an app quickly, keep using it, improve it later,
and share it with friends without turning every idea into a software project.

Each app is a real, self-contained web app. App Lab keeps its source and data together, runs it inside a protected sandbox, and
gives you a quiet workspace for returning to it. Your browser is the starting point; cloud services are optional.

[Open App Lab](https://loelindstrom.github.io/app-lab/)

### 🏁 Start With Just Your Browser

App Lab works without an account or cloud setup:

- create, run, and edit small apps
- keep each app's data in this browser
- copy an App Lab-aware prompt and source into the AI service you already use
- paste the improved source back and run it immediately
- export source and app data whenever you want

This is what **local-first** means here: the local workspace is useful on its own. Adding a remote service extends it rather than
turning the remote service into a requirement.

### 🔗 Connect Your Own Services

You decide which integrations to add:

- **Firebase is available now.** Connect your own Firebase project for encrypted backup, device sync, app sharing, and live
  updates. App source and data are encrypted in the browser before they are stored remotely.
- **OpenRouter powers built-in AI editing.** Connect your own API key to ask App Lab's agent to update the active app directly.
  The prompt-and-source handoff remains available for using an external AI chat without setup.

Generated apps never receive your Firebase configuration, sync secrets, or AI key. They run inside sandboxed frames and
use a small App Lab bridge when they need to save JSON data.

## 👟 Choose Your Path

### 🚀 How To Use App Lab

[Read the user guide](./docs/user-guide.md)

### 🛠️ For Developers

[Read the developer guide](./docs/README.md)

### 🔐 Security

[Read the security model](./SECURITY.md)
