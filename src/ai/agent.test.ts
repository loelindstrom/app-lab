import { describe, expect, it, vi } from "vitest";
import { createBuilderAgent } from "./agent";
import type { OpenRouterClient, OpenRouterMessage } from "./openrouter";

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
    });
    expect(tools.readCurrentAppSource).not.toHaveBeenCalled();
    expect(tools.replaceCurrentAppSource).not.toHaveBeenCalled();
  });

  it("reads and replaces only through host-supplied tools", async () => {
    const client = createClient([
      toolMessage("read-1", "read_current_app_source", "{}"),
      toolMessage("write-1", "replace_current_app_source", JSON.stringify({ sourceCode: "<!doctype html><html><title>New</title></html>" })),
      { content: "Rebuilt the app.", role: "assistant" },
    ]);
    const readCurrentAppSource = vi.fn(async () => ({ description: "Old", name: "Old", sourceCode: "<!doctype html><html></html>" }));
    const replaceCurrentAppSource = vi.fn(async (sourceCode: string) => ({ description: "New", name: "New", sourceCode }));
    const activities: string[] = [];
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
        tools: {
          readCurrentAppSource,
          readRecentConsoleOutput: vi.fn(async () => ""),
          replaceCurrentAppSource,
        },
      }),
    ).resolves.toEqual({ content: "Rebuilt the app.", toolRounds: 2 });

    expect(readCurrentAppSource).toHaveBeenCalledTimes(1);
    expect(replaceCurrentAppSource).toHaveBeenCalledWith("<!doctype html><html><title>New</title></html>");
    expect(activities).toContain("Reading current app...");
    expect(activities).toContain("Applying app source...");
    const sentMessages = vi.mocked(client.sendChat).mock.calls[0][0].messages;
    expect(sentMessages.some((message) => message.content === "Ignore me")).toBe(false);
    expect(sentMessages.some((message) => message.content === "Rebuild it")).toBe(true);
  });

  it("rejects malformed write-tool arguments", async () => {
    const client = createClient([toolMessage("write-1", "replace_current_app_source", "not-json")]);
    const agent = createBuilderAgent(client, async () => ({ apiKey: "sk-test", model: "provider/model" }));

    await expect(
      agent.runTurn({
        appId: "app-1",
        appName: "App",
        messages: [],
        tools: {
          readCurrentAppSource: vi.fn(),
          readRecentConsoleOutput: vi.fn(),
          replaceCurrentAppSource: vi.fn(),
        },
      }),
    ).rejects.toThrow("BuilderAI returned invalid arguments for replace_current_app_source.");
  });

  it("stops after the bounded number of tool rounds", async () => {
    const client = createClient(
      Array.from({ length: 4 }, (_, index) => toolMessage(`read-${index}`, "read_current_app_source", "{}")),
    );
    const readCurrentAppSource = vi.fn(async () => ({ description: "App", name: "App", sourceCode: "<!doctype html><html></html>" }));
    const agent = createBuilderAgent(client, async () => ({ apiKey: "sk-test", model: "provider/model" }));

    await expect(
      agent.runTurn({
        appId: "app-1",
        appName: "App",
        messages: [],
        tools: {
          readCurrentAppSource,
          readRecentConsoleOutput: vi.fn(),
          replaceCurrentAppSource: vi.fn(),
        },
      }),
    ).rejects.toThrow("BuilderAI stopped after 4 tool rounds.");
    expect(readCurrentAppSource).toHaveBeenCalledTimes(4);
  });
});

function createClient(responses: OpenRouterMessage[]): OpenRouterClient {
  return {
    sendChat: vi.fn(async () => {
      const response = responses.shift();
      if (!response) throw new Error("Missing fake response.");
      return response;
    }),
    testConnection: vi.fn(),
  };
}

function toolMessage(id: string, name: string, args: string): OpenRouterMessage {
  return {
    content: null,
    role: "assistant",
    tool_calls: [{ function: { arguments: args, name }, id, type: "function" }],
  };
}
