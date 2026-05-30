import { callOpenRouter } from "./openrouter.js";

const MAX_TOOL_ROUNDS = 4;

export function createBuilderAgent({ builderUi, platform }) {
  function getBuilderSystemPrompt() {
    return `You are the Builder Agent for App Lab.

You edit exactly one current app. You cannot access other apps, API keys, app data, sync, or browser storage.

Rules:
- Use read_current_app_code before writing unless the user explicitly asks a general question.
- Use write_current_app when the user asks for an app change.
- write_current_app must provide a complete single-file HTML document.
- Use plain HTML, CSS, and JavaScript only.
- Do not use external scripts, CDNs, imports, remote images, network requests, cookies, localStorage, sessionStorage, or IndexedDB.
- For persistence inside the generated app, use window.parent.postMessage with GET_MY_DATA and SAVE_MY_DATA.
- Generated apps run inside sandbox="allow-scripts" without allow-same-origin.
- Keep the app useful on mobile and desktop.
- After writing, briefly summarize what changed.`;
  }

  function getBuilderTools() {
    return [
      {
        type: "function",
        function: {
          name: "read_current_app_code",
          description: "Read the active app's registry metadata and complete HTML source.",
          parameters: {
            type: "object",
            properties: {},
            additionalProperties: false,
          },
        },
      },
      {
        type: "function",
        function: {
          name: "write_current_app",
          description: "Overwrite only the active app's metadata and complete HTML source.",
          parameters: {
            type: "object",
            properties: {
              name: {
                type: "string",
                description: "Short display name for the app.",
              },
              description: {
                type: "string",
                description: "One-sentence description for the app shelf.",
              },
              sourceCode: {
                type: "string",
                description: "Complete standalone HTML document for the app.",
              },
            },
            required: ["name", "description", "sourceCode"],
            additionalProperties: false,
          },
        },
      },
    ];
  }

  async function executeBuilderTool(toolCall) {
    const toolName = toolCall.function?.name;
    const args = toolCall.function?.arguments ? JSON.parse(toolCall.function.arguments) : {};

    if (toolName === "read_current_app_code") {
      return {
        appId: platform.state.activeApp.appId,
        name: platform.state.activeApp.name,
        description: platform.state.activeApp.description,
        sourceCode: platform.state.activeApp.sourceCode,
      };
    }

    if (toolName === "write_current_app") {
      if (typeof args.sourceCode !== "string" || !args.sourceCode.toLowerCase().includes("<html")) {
        throw new Error("write_current_app requires a complete HTML document.");
      }

      await platform.putApp({
        appId: platform.state.activeAppId,
        name: args.name || platform.state.activeApp.name,
        description: args.description || platform.state.activeApp.description,
        sourceCode: args.sourceCode,
      });
      await platform.loadApp(platform.state.activeAppId);

      return {
        ok: true,
        appId: platform.state.activeAppId,
        name: platform.state.activeApp.name,
      };
    }

    throw new Error(`Unknown builder tool: ${toolName}`);
  }

  async function runBuilderAgent() {
    const messages = [
      { role: "system", content: getBuilderSystemPrompt() },
      ...builderUi.state.messages,
    ];
    const tools = getBuilderTools();

    for (let round = 0; round < MAX_TOOL_ROUNDS; round += 1) {
      let liveAssistantItem = null;
      let sawToolCall = false;
      const assistantMessage = await callOpenRouter({
        config: await platform.getOpenRouterConfig(),
        messages,
        tools,
        handlers: {
          onThinking: () => builderUi.updateBuilderActivity("Thinking through the request..."),
          onToolDelta: (toolCall) => {
            sawToolCall = true;
            builderUi.updateBuilderActivity(getToolActivityLabel(toolCall.function?.name));

            if (liveAssistantItem) {
              liveAssistantItem.remove();
              liveAssistantItem = null;
            }
          },
          onContent: (_chunk, content) => {
            if (sawToolCall) return;

            if (!liveAssistantItem) {
              builderUi.updateBuilderActivity("Writing response...");
              liveAssistantItem = builderUi.addBuilderMessage("assistant", "");
              liveAssistantItem.dataset.streaming = "true";
            }

            liveAssistantItem.textContent = content;
            builderUi.scrollBuilderMessages();
          },
        },
      });

      if (!assistantMessage) {
        throw new Error("OpenRouter returned an empty response.");
      }

      messages.push(assistantMessage);

      if (!assistantMessage.tool_calls?.length) {
        const content = assistantMessage.content || "Done.";
        if (liveAssistantItem) {
          liveAssistantItem.textContent = content;
          delete liveAssistantItem.dataset.streaming;
          builderUi.state.messages.push({ role: "assistant", content });
          builderUi.scrollBuilderMessages();
        } else {
          builderUi.addBuilderMessage("assistant", content, true);
        }
        return;
      }

      if (liveAssistantItem) {
        liveAssistantItem.remove();
      }

      for (const toolCall of assistantMessage.tool_calls) {
        builderUi.updateBuilderActivity(getToolActivityLabel(toolCall.function?.name, true));
        const result = await executeBuilderTool(toolCall);
        builderUi.updateBuilderActivity(getToolActivityLabel(toolCall.function?.name, false));
        messages.push({
          role: "tool",
          tool_call_id: toolCall.id,
          name: toolCall.function.name,
          content: JSON.stringify(result),
        });
      }
    }

    throw new Error("Builder stopped after too many tool rounds.");
  }

  return {
    executeBuilderTool,
    getBuilderSystemPrompt,
    getBuilderTools,
    getToolActivityLabel,
    runBuilderAgent,
  };
}

export function getToolActivityLabel(toolName, completed = null) {
  const labels = {
    read_current_app_code: ["Reading current app...", "Read current app."],
    write_current_app: ["Editing app...", "Edited app."],
  };
  const [activeLabel, doneLabel] = labels[toolName] || ["Using a tool...", "Tool finished."];
  return completed === false ? doneLabel : activeLabel;
}
