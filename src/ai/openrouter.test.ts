import { describe, expect, it, vi } from "vitest";
import { createOpenRouterClient } from "./openrouter";

describe("OpenRouter client", () => {
  it("streams and assembles a tool-capable chat response", async () => {
    const fetchImpl = vi.fn(async () =>
      sseResponse([
        {
          choices: [
            {
              delta: {
                reasoning_details: [
                  { format: "google-gemini-v1", id: "reasoning-1", index: 0, text: "Inspecting ", type: "reasoning.text" },
                ],
              },
            },
          ],
        },
        {
          choices: [
            {
              delta: {
                reasoning_details: [
                  { format: "google-gemini-v1", id: "reasoning-1", index: 0, text: "source.", type: "reasoning.text" },
                ],
                tool_calls: [
                  {
                    function: { arguments: "{", name: "read_current_app_source" },
                    id: "call-1",
                    index: 0,
                    type: "function",
                  },
                ],
              },
            },
          ],
        },
        {
          choices: [{ delta: { tool_calls: [{ function: { arguments: "}" }, index: 0 }] } }],
          usage: {
            completion_tokens: 25,
            completion_tokens_details: { reasoning_tokens: 5 },
            cost: 0.0025,
            prompt_tokens: 100,
            total_tokens: 125,
          },
        },
      ]),
    ) as unknown as typeof fetch;
    const client = createOpenRouterClient({ fetchImpl, referer: "https://example.test" });
    const reasoning: string[] = [];

    const result = await client.sendChat({
      config: { apiKey: "sk-secret", model: "provider/model" },
      messages: [{ content: "Change the app", role: "user" }],
      onReasoning: (value) => reasoning.push(value),
      tools: [],
    });

    expect(result.message.tool_calls?.[0]).toEqual({
      function: { arguments: "{}", name: "read_current_app_source" },
      id: "call-1",
      type: "function",
    });
    expect(result.message.reasoning_details).toEqual([
      {
        format: "google-gemini-v1",
        id: "reasoning-1",
        index: 0,
        text: "Inspecting source.",
        type: "reasoning.text",
      },
    ]);
    expect(reasoning).toEqual(["Inspecting ", "Inspecting source."]);
    expect(result.usage).toEqual({
      completionTokens: 25,
      costUsd: 0.0025,
      promptTokens: 100,
      reasoningTokens: 5,
      totalTokens: 125,
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
      stream: true,
      tool_choice: "auto",
    });
  });

  it("streams assistant content across split network chunks", async () => {
    const fetchImpl = vi.fn(async () =>
      sseResponse(
        [
          { choices: [{ delta: { content: "Updated " } }] },
          { choices: [{ delta: { content: "the app." } }] },
          { choices: [], usage: { completion_tokens: 3, prompt_tokens: 8, total_tokens: 11 } },
        ],
        13,
      ),
    ) as unknown as typeof fetch;
    const content: string[] = [];
    const client = createOpenRouterClient({ fetchImpl });

    const result = await client.sendChat({
      config: { apiKey: "sk-secret", model: "provider/model" },
      messages: [],
      onContent: (value) => content.push(value),
      tools: [],
    });

    expect(content).toEqual(["Updated ", "Updated the app."]);
    expect(result.message.content).toBe("Updated the app.");
    expect(result.usage).toMatchObject({ completionTokens: 3, promptTokens: 8, totalTokens: 11 });
  });

  it("stops reading when DONE arrives before the response body closes", async () => {
    let cancelled = false;
    const source = `data: ${JSON.stringify({ choices: [{ delta: { content: "Finished." } }] })}\n\ndata: [DONE]\n\n`;
    const fetchImpl = vi.fn(async () =>
      new Response(
        new ReadableStream({
          cancel() {
            cancelled = true;
          },
          start(controller) {
            controller.enqueue(new TextEncoder().encode(source));
          },
        }),
        { headers: { "Content-Type": "text/event-stream" } },
      ),
    ) as unknown as typeof fetch;
    const client = createOpenRouterClient({ fetchImpl });

    const result = await client.sendChat({
      config: { apiKey: "sk-secret", model: "provider/model" },
      messages: [],
      tools: [],
    });

    expect(result.message.content).toBe("Finished.");
    expect(cancelled).toBe(true);
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

function sseResponse(values: unknown[], chunkSize = 37): Response {
  const source = `${values.map((value) => `data: ${JSON.stringify(value)}\n\n`).join("")}data: [DONE]\n\n`;
  const bytes = new TextEncoder().encode(source);
  return new Response(
    new ReadableStream({
      start(controller) {
        for (let offset = 0; offset < bytes.length; offset += chunkSize) {
          controller.enqueue(bytes.slice(offset, offset + chunkSize));
        }
        controller.close();
      },
    }),
    { headers: { "Content-Type": "text/event-stream" } },
  );
}
