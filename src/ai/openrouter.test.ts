import { describe, expect, it, vi } from "vitest";
import { createOpenRouterClient } from "./openrouter";

describe("OpenRouter client", () => {
  it("sends a non-streaming tool-capable chat request", async () => {
    const fetchImpl = vi.fn(async () =>
      jsonResponse({
        choices: [
          {
            message: {
              content: null,
              role: "assistant",
              tool_calls: [
                {
                  function: { arguments: "{}", name: "read_current_app_source" },
                  id: "call-1",
                  type: "function",
                },
              ],
            },
          },
        ],
      }),
    ) as unknown as typeof fetch;
    const client = createOpenRouterClient({ fetchImpl, referer: "https://example.test" });

    const message = await client.sendChat({
      config: { apiKey: "sk-secret", model: "provider/model" },
      messages: [{ content: "Change the app", role: "user" }],
      tools: [],
    });

    expect(message.tool_calls?.[0]).toEqual({
      function: { arguments: "{}", name: "read_current_app_source" },
      id: "call-1",
      type: "function",
    });
    const [url, request] = vi.mocked(fetchImpl).mock.calls[0];
    expect(url).toBe("https://openrouter.ai/api/v1/chat/completions");
    expect(request?.headers).toMatchObject({
      Authorization: "Bearer sk-secret",
      "HTTP-Referer": "https://example.test",
      "X-Title": "App Lab",
    });
    expect(JSON.parse(String(request?.body))).toMatchObject({
      model: "provider/model",
      parallel_tool_calls: false,
      stream: false,
      tool_choice: "auto",
    });
  });

  it("tests the key and selected tool-capable model without a completion", async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ data: { label: "App Lab key" } }))
      .mockResolvedValueOnce(
        jsonResponse({
          data: [{ id: "provider/model", name: "Useful Model", supported_parameters: ["tools"] }],
        }),
      ) as unknown as typeof fetch;
    const client = createOpenRouterClient({ fetchImpl });

    await expect(client.testConnection({ apiKey: "sk-secret", model: "provider/model" })).resolves.toEqual({
      keyLabel: "App Lab key",
      model: "provider/model",
      modelName: "Useful Model",
    });
    expect(vi.mocked(fetchImpl).mock.calls.map(([url]) => url)).toEqual([
      "https://openrouter.ai/api/v1/key",
      "https://openrouter.ai/api/v1/models?supported_parameters=tools",
    ]);
  });

  it("rejects a selected model that is not in the tool-capable model list", async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ data: { label: "App Lab key" } }))
      .mockResolvedValueOnce(jsonResponse({ data: [{ id: "provider/other-model", supported_parameters: ["tools"] }] })) as unknown as typeof fetch;
    const client = createOpenRouterClient({ fetchImpl });

    await expect(client.testConnection({ apiKey: "sk-secret", model: "provider/model" })).rejects.toThrow(
      "OpenRouter model 'provider/model' was not found among tool-capable models.",
    );
  });

  it("surfaces OpenRouter errors without including the API key", async () => {
    const fetchImpl = vi.fn(async () => jsonResponse({ error: { message: "Invalid credentials." } }, 401)) as unknown as typeof fetch;
    const client = createOpenRouterClient({ fetchImpl });

    const error = await client
      .sendChat({ config: { apiKey: "sk-do-not-leak", model: "provider/model" }, messages: [], tools: [] })
      .catch((reason: unknown) => reason);
    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toBe("Invalid credentials.");
    expect((error as Error).message).not.toContain("sk-do-not-leak");
  });
});

function jsonResponse(value: unknown, status = 200): Response {
  return new Response(JSON.stringify(value), {
    headers: { "Content-Type": "application/json" },
    status,
  });
}
