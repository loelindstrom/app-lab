import { createParser } from "eventsource-parser";

const CHAT_URL = "https://openrouter.ai/api/v1/chat/completions";

export interface ApiCallMetric {
  cachedTokens: number;
  completionTokens: number;
  cost: number;
  durationMs: number;
  finishReason: string;
  promptTokens: number;
  reasoningTokens: number;
  requestChars: number;
  responseChars: number;
  toolCalls: string[];
  totalTokens: number;
}

export function createRecordingFetch(metrics: ApiCallMetric[], fetchImpl: typeof fetch = fetch): typeof fetch {
  return async (input, init) => {
    const startedAt = performance.now();
    const response = await fetchImpl(input, init);
    if (String(input) !== CHAT_URL) return response;

    const responseText = await response.clone().text();
    const recorded = readRecordedResponse(responseText, response.headers.get("Content-Type"));
    const usage = readRecord(recorded.usage);
    const completionDetails = readRecord(usage?.completion_tokens_details);
    const promptDetails = readRecord(usage?.prompt_tokens_details);
    const requestBody = typeof init?.body === "string" ? init.body : "";

    metrics.push({
      cachedTokens: readNumber(promptDetails?.cached_tokens),
      completionTokens: readNumber(usage?.completion_tokens),
      cost: readNumber(usage?.cost),
      durationMs: performance.now() - startedAt,
      finishReason: recorded.finishReason,
      promptTokens: readNumber(usage?.prompt_tokens),
      reasoningTokens: readNumber(completionDetails?.reasoning_tokens),
      requestChars: requestBody.length,
      responseChars: responseText.length,
      toolCalls: recorded.toolCalls,
      totalTokens: readNumber(usage?.total_tokens),
    });
    return response;
  };
}

interface RecordedResponse {
  finishReason: string;
  toolCalls: string[];
  usage: unknown;
}

function readRecordedResponse(responseText: string, contentType: string | null): RecordedResponse {
  if (contentType?.toLowerCase().includes("text/event-stream") || responseText.trimStart().startsWith("data:")) {
    return readSseResponse(responseText);
  }

  const payload = parseRecord(responseText);
  const choice = readRecord(readArray(payload.choices)[0]);
  return {
    finishReason: typeof choice?.finish_reason === "string" ? choice.finish_reason : "unknown",
    toolCalls: readToolCallNames(readRecord(choice?.message)?.tool_calls),
    usage: payload.usage,
  };
}

function readSseResponse(responseText: string): RecordedResponse {
  let finishReason = "unknown";
  let usage: unknown;
  const toolCallNames = new Map<number, string>();
  const parser = createParser({
    onEvent(event) {
      if (event.data === "[DONE]") return;
      const payload = parseRecord(event.data);
      if (readRecord(payload.usage)) usage = payload.usage;

      const choice = readRecord(readArray(payload.choices)[0]);
      if (typeof choice?.finish_reason === "string") finishReason = choice.finish_reason;
      const delta = readRecord(choice?.delta);
      readArray(delta?.tool_calls).forEach((value, position) => {
        const toolCall = readRecord(value);
        const fn = readRecord(toolCall?.function);
        const index = typeof toolCall?.index === "number" && Number.isInteger(toolCall.index) ? toolCall.index : position;
        if (typeof fn?.name === "string") toolCallNames.set(index, `${toolCallNames.get(index) ?? ""}${fn.name}`);
      });
    },
  });
  parser.feed(responseText);
  parser.reset({ consume: true });

  return {
    finishReason,
    toolCalls: [...toolCallNames.entries()].sort(([left], [right]) => left - right).map(([, name]) => name),
    usage,
  };
}

function readToolCallNames(value: unknown): string[] {
  return readArray(value)
    .map(readRecord)
    .map((toolCall) => readRecord(toolCall?.function)?.name)
    .filter((name): name is string => typeof name === "string");
}

function parseRecord(value: string): Record<string, unknown> {
  try {
    return readRecord(JSON.parse(value)) ?? {};
  } catch (_) {
    return {};
  }
}

function readRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
}

function readArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function readNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}
