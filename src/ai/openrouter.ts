import { createParser } from "eventsource-parser";
import { normalizeAiConfig } from "./config";
import type { AiConfig, AiConnectionResult, AiUsage } from "./types";

const OPENROUTER_CHAT_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_KEY_URL = "https://openrouter.ai/api/v1/key";
const OPENROUTER_TOOL_MODELS_URL = "https://openrouter.ai/api/v1/models?supported_parameters=tools";
const MAX_OPENROUTER_STREAM_BYTES = 20 * 1024 * 1024;

export type OpenRouterReasoningDetail = Record<string, unknown>;

export interface OpenRouterToolCall {
  function: {
    arguments: string;
    name: string;
  };
  id: string;
  type: "function";
}

export interface OpenRouterMessage {
  content: string | null;
  name?: string;
  reasoning?: string;
  reasoning_details?: OpenRouterReasoningDetail[];
  role: "assistant" | "system" | "tool" | "user";
  tool_call_id?: string;
  tool_calls?: OpenRouterToolCall[];
}

export interface OpenRouterTool {
  function: {
    description: string;
    name: string;
    parameters: Record<string, unknown>;
  };
  type: "function";
}

export interface SendOpenRouterChatInput {
  config: AiConfig;
  messages: OpenRouterMessage[];
  onContent?: (content: string) => void;
  onReasoning?: (reasoning: string) => void;
  signal?: AbortSignal;
  tools: OpenRouterTool[];
}

export interface OpenRouterClient {
  sendChat(input: SendOpenRouterChatInput): Promise<OpenRouterChatResult>;
  testConnection(config: AiConfig, signal?: AbortSignal): Promise<AiConnectionResult>;
}

export interface OpenRouterChatResult {
  message: OpenRouterMessage;
  usage: AiUsage;
}

interface CreateOpenRouterClientOptions {
  fetchImpl?: typeof fetch;
  referer?: string;
}

export function createOpenRouterClient(options: CreateOpenRouterClientOptions = {}): OpenRouterClient {
  const fetchImpl = options.fetchImpl ?? fetch;

  return {
    async sendChat(input) {
      const config = normalizeAiConfig(input.config);
      const response = await fetchImpl(OPENROUTER_CHAT_URL, {
        body: JSON.stringify({
          messages: input.messages,
          model: config.model,
          parallel_tool_calls: false,
          stream: true,
          tool_choice: "auto",
          tools: input.tools,
        }),
        headers: createHeaders(config, options.referer),
        method: "POST",
        signal: input.signal,
      });
      if (!response.ok) {
        const payload = await readJsonResponse(response);
        assertSuccessfulResponse(response, payload);
      }
      return readStreamingChatResponse(response, input);
    },

    async testConnection(input, signal) {
      const config = normalizeAiConfig(input);
      const headers = createHeaders(config, options.referer);
      const keyResponse = await fetchImpl(OPENROUTER_KEY_URL, { headers, signal });
      const keyPayload = await readJsonResponse(keyResponse);
      assertSuccessfulResponse(keyResponse, keyPayload);

      const modelsResponse = await fetchImpl(OPENROUTER_TOOL_MODELS_URL, { headers, signal });
      const modelsPayload = await readJsonResponse(modelsResponse);
      assertSuccessfulResponse(modelsResponse, modelsPayload);
      const models = readArray(modelsPayload.data).map(readRecord).filter((model): model is Record<string, unknown> => Boolean(model));
      const selected = models.find((model) => model.id === config.model);
      if (!selected) throw new Error(`OpenRouter model '${config.model}' was not found among tool-capable models.`);

      const supportedParameters = readArray(selected.supported_parameters);
      if (!supportedParameters.includes("tools")) throw new Error(`OpenRouter model '${config.model}' does not advertise tool support.`);

      const keyData = readRecord(keyPayload.data);
      return {
        keyLabel: typeof keyData?.label === "string" ? keyData.label : null,
        model: config.model,
        modelName: typeof selected.name === "string" ? selected.name : config.model,
      };
    },
  };
}

async function readStreamingChatResponse(response: Response, input: SendOpenRouterChatInput): Promise<OpenRouterChatResult> {
  if (!response.body) throw new Error("OpenRouter returned an empty response stream.");

  let content = "";
  let rawReasoning = "";
  let reasoningDetails: OpenRouterReasoningDetail[] = [];
  let visibleReasoning = "";
  let usage = emptyUsage();
  let streamBytes = 0;
  let streamDone = false;
  let streamError: Error | null = null;
  const toolCalls = new Map<number, MutableToolCall>();
  const parser = createParser({
    onError(error) {
      streamError = new Error(`OpenRouter returned an invalid response stream: ${error.message}`);
    },
    onEvent(event) {
      if (streamDone) return;
      if (event.data === "[DONE]") {
        streamDone = true;
        return;
      }

      let payload: Record<string, unknown>;
      try {
        payload = readRecord(JSON.parse(event.data)) ?? {};
      } catch (_) {
        streamError = new Error("OpenRouter returned invalid JSON in its response stream.");
        return;
      }

      const error = readRecord(payload.error);
      if (error) {
        streamError = new Error(typeof error.message === "string" ? error.message : "OpenRouter streaming request failed.");
        return;
      }

      if (readRecord(payload.usage)) usage = parseUsage(payload.usage);
      const choice = readRecord(readArray(payload.choices)[0]);
      const delta = readRecord(choice?.delta);
      if (!delta) return;

      if (typeof delta.content === "string") {
        content += delta.content;
        input.onContent?.(content);
      }
      if (typeof delta.reasoning === "string") rawReasoning += delta.reasoning;
      reasoningDetails = mergeReasoningDetails(reasoningDetails, readArray(delta.reasoning_details));
      const nextVisibleReasoning = extractVisibleReasoning(reasoningDetails, rawReasoning);
      if (nextVisibleReasoning !== visibleReasoning) {
        visibleReasoning = nextVisibleReasoning;
        input.onReasoning?.(visibleReasoning);
      }
      mergeToolCallDeltas(toolCalls, readArray(delta.tool_calls));
    },
  });
  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      streamBytes += chunk.value.byteLength;
      if (streamBytes > MAX_OPENROUTER_STREAM_BYTES) throw new Error("OpenRouter response exceeded the 20 MB stream limit.");
      parser.feed(decoder.decode(chunk.value, { stream: true }));
      if (streamError) throw streamError;
      if (streamDone) {
        await reader.cancel().catch(() => undefined);
        break;
      }
    }
    if (!streamDone) {
      parser.feed(decoder.decode());
      parser.reset({ consume: true });
      if (streamError) throw streamError;
    }
  } catch (error) {
    await reader.cancel().catch(() => undefined);
    throw error;
  }

  return {
    message: parseAssistantMessage({
      content: content || null,
      reasoning: rawReasoning || undefined,
      reasoning_details: reasoningDetails.length ? reasoningDetails : undefined,
      role: "assistant",
      tool_calls: [...toolCalls.entries()].sort(([left], [right]) => left - right).map(([, toolCall]) => toolCall),
    }),
    usage,
  };
}

type MutableToolCall = OpenRouterToolCall;

function mergeToolCallDeltas(target: Map<number, MutableToolCall>, values: unknown[]): void {
  values.forEach((value, position) => {
    const delta = readRecord(value);
    if (!delta) return;
    const index = typeof delta.index === "number" && Number.isInteger(delta.index) ? delta.index : position;
    const fn = readRecord(delta.function);
    const current = target.get(index) ?? {
      function: { arguments: "", name: "" },
      id: "",
      type: "function" as const,
    };
    if (typeof delta.id === "string") current.id ||= delta.id;
    if (typeof fn?.name === "string") current.function.name += fn.name;
    if (typeof fn?.arguments === "string") current.function.arguments += fn.arguments;
    target.set(index, current);
  });
}

function mergeReasoningDetails(current: OpenRouterReasoningDetail[], values: unknown[]): OpenRouterReasoningDetail[] {
  const next = current.map((detail) => ({ ...detail }));
  for (const value of values) {
    const detail = readRecord(value);
    if (!detail) continue;
    const existingIndex = findReasoningDetail(next, detail);
    if (existingIndex < 0) {
      next.push({ ...detail });
      continue;
    }
    const existing = next[existingIndex];
    const merged = { ...existing, ...detail };
    for (const field of ["data", "summary", "text"] as const) {
      if (typeof detail[field] === "string") {
        merged[field] = `${typeof existing[field] === "string" ? existing[field] : ""}${detail[field]}`;
      }
    }
    next[existingIndex] = merged;
  }
  return next;
}

function findReasoningDetail(details: OpenRouterReasoningDetail[], candidate: Record<string, unknown>): number {
  if (typeof candidate.index === "number") {
    return details.findIndex((detail) => detail.index === candidate.index && detail.type === candidate.type);
  }
  if (typeof candidate.id === "string") {
    return details.findIndex((detail) => detail.id === candidate.id && detail.type === candidate.type);
  }
  return -1;
}

function extractVisibleReasoning(details: OpenRouterReasoningDetail[], fallback: string): string {
  const text = details
    .filter((detail) => detail.type === "reasoning.text" && typeof detail.text === "string")
    .map((detail) => detail.text)
    .join("\n\n");
  if (text) return text;
  const summary = details
    .filter((detail) => detail.type === "reasoning.summary" && typeof detail.summary === "string")
    .map((detail) => detail.summary)
    .join("\n\n");
  return summary || fallback;
}

function createHeaders(config: AiConfig, referer?: string): Record<string, string> {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${config.apiKey}`,
    "Content-Type": "application/json",
    "X-Title": "App Lab",
  };
  if (referer) headers["HTTP-Referer"] = referer;
  return headers;
}

async function readJsonResponse(response: Response): Promise<Record<string, unknown>> {
  const payload = await response.json().catch(() => null);
  return readRecord(payload) ?? {};
}

function assertSuccessfulResponse(response: Response, payload: Record<string, unknown>): void {
  const error = readRecord(payload.error);
  if (response.ok && !error) return;
  const message = typeof error?.message === "string" ? error.message : `OpenRouter request failed with ${response.status}.`;
  throw new Error(message);
}

function parseAssistantMessage(value: unknown): OpenRouterMessage {
  const message = readRecord(value);
  if (!message || message.role !== "assistant") throw new Error("OpenRouter returned an invalid assistant response.");

  const toolCalls = readArray(message.tool_calls).map(parseToolCall);
  const content = typeof message.content === "string" ? message.content : null;
  const reasoning = typeof message.reasoning === "string" ? message.reasoning : undefined;
  const reasoningDetails = readArray(message.reasoning_details).map(readRecord).filter((detail): detail is Record<string, unknown> => Boolean(detail));
  if (!content && toolCalls.length === 0) throw new Error("OpenRouter returned an empty assistant response.");
  return {
    content,
    ...(reasoning ? { reasoning } : {}),
    ...(reasoningDetails.length ? { reasoning_details: reasoningDetails } : {}),
    role: "assistant",
    ...(toolCalls.length ? { tool_calls: toolCalls } : {}),
  };
}

function emptyUsage(): AiUsage {
  return { completionTokens: 0, costUsd: null, promptTokens: 0, reasoningTokens: 0, totalTokens: 0 };
}

function parseToolCall(value: unknown): OpenRouterToolCall {
  const toolCall = readRecord(value);
  const fn = readRecord(toolCall?.function);
  if (!toolCall || typeof toolCall.id !== "string" || !fn || typeof fn.name !== "string" || typeof fn.arguments !== "string") {
    throw new Error("OpenRouter returned an invalid tool call.");
  }
  return {
    function: { arguments: fn.arguments, name: fn.name },
    id: toolCall.id,
    type: "function",
  };
}

function parseUsage(value: unknown): AiUsage {
  const usage = readRecord(value);
  const completionDetails = readRecord(usage?.completion_tokens_details);
  return {
    completionTokens: readNumber(usage?.completion_tokens),
    costUsd: readNullableNumber(usage?.cost),
    promptTokens: readNumber(usage?.prompt_tokens),
    reasoningTokens: readNumber(completionDetails?.reasoning_tokens),
    totalTokens: readNumber(usage?.total_tokens),
  };
}

function readNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function readNullableNumber(value: unknown): number | null {
  const parsed = typeof value === "number" ? value : typeof value === "string" ? Number(value) : Number.NaN;
  return Number.isFinite(parsed) ? parsed : null;
}

function readArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function readRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
}
