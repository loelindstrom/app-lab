import { describe, expect, it, vi } from "vitest";
import { createBuilderAgent } from "./agent";
import type { OpenRouterClient, OpenRouterMessage } from "./openrouter";
import type { AiChatMessage, AiUsage, BuilderProfile } from "./types";

const CALL_USAGE: AiUsage = {
  completionTokens: 3,
  costUsd: 0.001,
  promptTokens: 7,
  reasoningTokens: 1,
  totalTokens: 10,
};

describe("BuilderAI agent", () => {
  it("returns a text-only assistant response without invoking tools", async () => {
    const client = createClient([{ content: "Could you clarify the desired layout?", role: "assistant" }]);
    const tools = {
      readCurrentAppSource: vi.fn(),
      readRecentConsoleOutput: vi.fn(),
      replaceCurrentAppSource: vi.fn(),
    };
    const agent = createBuilderAgent(client, async () => ({ apiKey: "sk-test", model: "provider/model" }));

    await expect(agent.runTurn({ appId: "app-1", appName: "App", messages: [], tools })).resolves.toEqual({
      content: "Could you clarify the desired layout?",
      toolRounds: 0,
      usage: CALL_USAGE,
    });
    expect(tools.readCurrentAppSource).not.toHaveBeenCalled();
    expect(tools.replaceCurrentAppSource).not.toHaveBeenCalled();
  });

  it("uses the selected profile prompt and sends only the configured recent messages", async () => {
    const client = createClient([{ content: "Done.", role: "assistant" }]);
    const agent = createBuilderAgent(client, async () => ({ apiKey: "sk-test", model: "provider/model" }));
    const profile: BuilderProfile = {
      builtIn: false,
      name: "Focused",
      profileId: "custom-focused",
      promptTemplate: "Build {{appName}} carefully. The active app is {{appName}}.",
      starterSource: "<!doctype html><html></html>",
    };
    const messages: AiChatMessage[] = Array.from({ length: 7 }, (_, index) => ({
      appId: "app-1",
      content: `Message ${index + 1}`,
      createdAt: `2026-01-01T00:00:0${index}.000Z`,
      messageId: `message-${index + 1}`,
      role: index % 2 === 0 ? "user" : "assistant",
    }));
    messages.splice(5, 0, {
      appId: "other-app",
      content: "Other app message",
      createdAt: "2026-01-01T00:00:08.000Z",
      messageId: "other-message",
      role: "user",
    });

    await agent.runTurn({
      appId: "app-1",
      appName: "Timer",
      conversationMemory: "short",
      messages,
      profile,
      tools: {
        readCurrentAppSource: vi.fn(),
        readRecentConsoleOutput: vi.fn(),
        replaceCurrentAppSource: vi.fn(),
      },
    });

    const sentMessages = vi.mocked(client.sendChat).mock.calls[0][0].messages;
    expect(sentMessages).toEqual([
      { content: "Build Timer carefully. The active app is Timer.", role: "system" },
      { content: "Message 4", role: "assistant" },
      { content: "Message 5", role: "user" },
      { content: "Message 6", role: "assistant" },
      { content: "Message 7", role: "user" },
    ]);
  });

  it("reads and replaces only through host-supplied tools", async () => {
    const client = createClient([
      toolMessage("read-1", "read_current_app_source", "{}"),
      toolMessage("write-1", "replace_current_app_source", JSON.stringify({ sourceCode: "<!doctype html><html><title>New</title></html>" })),
      { content: "Rebuilt the app.", role: "assistant" },
    ]);
    const readCurrentAppSource = vi.fn(async () => ({ description: "Old", name: "Old", sourceCode: "<!doctype html><html></html>" }));
    const replaceCurrentAppSource = vi.fn(async (sourceCode: string) => ({
      name: "New",
      sourceChars: sourceCode.length,
      success: true as const,
    }));
    const activities: string[] = [];
    const usages: AiUsage[] = [];
    const agent = createBuilderAgent(client, async () => ({ apiKey: "sk-test", model: "provider/model" }));

    await expect(
      agent.runTurn({
        appId: "app-1",
        appName: "Old",
        messages: [
          { appId: "other-app", content: "Ignore me", createdAt: "2026-01-01T00:00:00.000Z", messageId: "other", role: "user" },
          { appId: "app-1", content: "Rebuild it", createdAt: "2026-01-01T00:00:01.000Z", messageId: "current", role: "user" },
        ],
        onActivity: (message) => activities.push(message),
        onUsage: (usage) => usages.push(usage),
        tools: {
          readCurrentAppSource,
          readRecentConsoleOutput: vi.fn(async () => ""),
          replaceCurrentAppSource,
        },
      }),
    ).resolves.toEqual({ content: "Rebuilt the app.", toolRounds: 2, usage: multipliedUsage(3) });

    expect(readCurrentAppSource).toHaveBeenCalledTimes(1);
    expect(replaceCurrentAppSource).toHaveBeenCalledWith("<!doctype html><html><title>New</title></html>");
    expect(activities).toContain("Reading current app...");
    expect(activities).toContain("Applying app source...");
    expect(usages).toEqual([CALL_USAGE, CALL_USAGE, CALL_USAGE]);
    const sentMessages = vi.mocked(client.sendChat).mock.calls[0][0].messages;
    expect(sentMessages.some((message) => message.content === "Ignore me")).toBe(false);
    expect(sentMessages.some((message) => message.content === "Rebuild it")).toBe(true);
    const finalMessages = vi.mocked(client.sendChat).mock.calls[2][0].messages;
    const writeResult = finalMessages.find((message) => message.tool_call_id === "write-1");
    expect(writeResult?.content).toContain('"sourceChars"');
    expect(writeResult?.content).not.toContain("sourceCode");
  });

  it("returns malformed write-tool arguments to the model for recovery", async () => {
    const client = createClient([
      toolMessage("write-1", "replace_current_app_source", "not-json"),
      { content: "I could not apply that update.", role: "assistant" },
    ]);
    const replaceCurrentAppSource = vi.fn();
    const agent = createBuilderAgent(client, async () => ({ apiKey: "sk-test", model: "provider/model" }));

    await expect(
      agent.runTurn({
        appId: "app-1",
        appName: "App",
        messages: [],
        tools: {
          readCurrentAppSource: vi.fn(),
          readRecentConsoleOutput: vi.fn(),
          replaceCurrentAppSource,
        },
      }),
    ).resolves.toMatchObject({ content: "I could not apply that update." });
    expect(replaceCurrentAppSource).not.toHaveBeenCalled();
    const malformedResult = vi.mocked(client.sendChat).mock.calls[1][0].messages.find((message) => message.tool_call_id === "write-1");
    expect(malformedResult?.content).toContain("INVALID_TOOL_ARGUMENTS");
  });

  it("returns unsupported forms to the model and accepts a corrected replacement", async () => {
    const correctedSource = '<!doctype html><html><body><button type="button">Save</button></body></html>';
    const client = createClient([
      toolMessage("write-1", "replace_current_app_source", {
        sourceCode: "<!doctype html><html><body><form><button>Save</button></form></body></html>",
      }),
      toolMessage("write-2", "replace_current_app_source", { sourceCode: correctedSource }),
      { content: "Applied the corrected app.", role: "assistant" },
    ]);
    const replaceCurrentAppSource = vi.fn(async (sourceCode: string) => ({
      name: "Corrected",
      sourceChars: sourceCode.length,
      success: true as const,
    }));
    const agent = createBuilderAgent(client, async () => ({ apiKey: "sk-test", model: "provider/model" }));

    await expect(
      agent.runTurn({
        appId: "app-1",
        appName: "App",
        messages: [],
        tools: {
          readCurrentAppSource: vi.fn(),
          readRecentConsoleOutput: vi.fn(),
          replaceCurrentAppSource,
        },
      }),
    ).resolves.toMatchObject({ content: "Applied the corrected app.", toolRounds: 2 });
    expect(replaceCurrentAppSource).toHaveBeenCalledOnce();
    expect(replaceCurrentAppSource).toHaveBeenCalledWith(correctedSource);
    const rejectedResult = vi.mocked(client.sendChat).mock.calls[1][0].messages.find((message) => message.tool_call_id === "write-1");
    expect(rejectedResult?.content).toContain("UNSUPPORTED_FORM");
  });

  it("stops after the bounded number of tool rounds", async () => {
    const client = createClient(
      Array.from({ length: 4 }, (_, index) => toolMessage(`read-${index}`, "read_current_app_source", "{}")),
    );
    const readCurrentAppSource = vi.fn(async () => ({ description: "App", name: "App", sourceCode: "<!doctype html><html></html>" }));
    const usages: AiUsage[] = [];
    const agent = createBuilderAgent(client, async () => ({ apiKey: "sk-test", model: "provider/model" }));

    await expect(
      agent.runTurn({
        appId: "app-1",
        appName: "App",
        messages: [],
        onUsage: (usage) => usages.push(usage),
        tools: {
          readCurrentAppSource,
          readRecentConsoleOutput: vi.fn(),
          replaceCurrentAppSource: vi.fn(),
        },
      }),
    ).rejects.toThrow("BuilderAI stopped after 4 tool rounds.");
    expect(readCurrentAppSource).toHaveBeenCalledTimes(4);
    expect(usages).toHaveLength(4);
  });
});

function createClient(responses: OpenRouterMessage[]): OpenRouterClient {
  return {
    sendChat: vi.fn(async () => {
      const response = responses.shift();
      if (!response) throw new Error("Missing fake response.");
      return { message: response, usage: CALL_USAGE };
    }),
    testConnection: vi.fn(),
  };
}

function toolMessage(id: string, name: string, args: Record<string, unknown> | string): OpenRouterMessage {
  return {
    content: null,
    role: "assistant",
    tool_calls: [{ function: { arguments: typeof args === "string" ? args : JSON.stringify(args), name }, id, type: "function" }],
  };
}

function multipliedUsage(calls: number): AiUsage {
  return {
    completionTokens: CALL_USAGE.completionTokens * calls,
    costUsd: (CALL_USAGE.costUsd ?? 0) * calls,
    promptTokens: CALL_USAGE.promptTokens * calls,
    reasoningTokens: CALL_USAGE.reasoningTokens * calls,
    totalTokens: CALL_USAGE.totalTokens * calls,
  };
}
