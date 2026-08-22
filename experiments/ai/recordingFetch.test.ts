import { describe, expect, it, vi } from "vitest";
import { createRecordingFetch, type ApiCallMetric } from "./recordingFetch";

const CHAT_URL = "https://openrouter.ai/api/v1/chat/completions";

describe("AI experiment response recorder", () => {
  it("records usage, finish reason, and assembled tool names from SSE", async () => {
    const source = [
      event({ choices: [{ delta: { tool_calls: [{ function: { name: "read_current_" }, index: 0 }] } }] }),
      event({
        choices: [
          {
            delta: { tool_calls: [{ function: { name: "app_source" }, index: 0 }] },
            finish_reason: "tool_calls",
          },
        ],
        usage: {
          completion_tokens: 12,
          completion_tokens_details: { reasoning_tokens: 4 },
          cost: 0.0012,
          prompt_tokens: 30,
          prompt_tokens_details: { cached_tokens: 10 },
          total_tokens: 42,
        },
      }),
      "data: [DONE]\n\n",
    ].join("");
    const fetchImpl = vi.fn(async () =>
      new Response(source, { headers: { "Content-Type": "text/event-stream; charset=utf-8" } }),
    ) as unknown as typeof fetch;
    const metrics: ApiCallMetric[] = [];
    const recordingFetch = createRecordingFetch(metrics, fetchImpl);

    const response = await recordingFetch(CHAT_URL, { body: '{"messages":[]}', method: "POST" });

    expect(await response.text()).toBe(source);
    expect(metrics).toHaveLength(1);
    expect(metrics[0]).toMatchObject({
      cachedTokens: 10,
      completionTokens: 12,
      cost: 0.0012,
      finishReason: "tool_calls",
      promptTokens: 30,
      reasoningTokens: 4,
      requestChars: 15,
      responseChars: source.length,
      toolCalls: ["read_current_app_source"],
      totalTokens: 42,
    });
    expect(metrics[0].durationMs).toBeGreaterThanOrEqual(0);
  });

  it("continues to record non-streaming JSON responses", async () => {
    const fetchImpl = vi.fn(async () =>
      new Response(
        JSON.stringify({
          choices: [
            {
              finish_reason: "stop",
              message: {
                tool_calls: [{ function: { name: "read_recent_console_output" } }],
              },
            },
          ],
          usage: { completion_tokens: 2, prompt_tokens: 7, total_tokens: 9 },
        }),
        { headers: { "Content-Type": "application/json" } },
      ),
    ) as unknown as typeof fetch;
    const metrics: ApiCallMetric[] = [];

    await createRecordingFetch(metrics, fetchImpl)(CHAT_URL, { method: "POST" });

    expect(metrics[0]).toMatchObject({
      completionTokens: 2,
      finishReason: "stop",
      promptTokens: 7,
      toolCalls: ["read_recent_console_output"],
      totalTokens: 9,
    });
  });
});

function event(value: unknown): string {
  return `data: ${JSON.stringify(value)}\n\n`;
}
