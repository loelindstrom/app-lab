import { normalizeAiConfig } from "./config";
import type { AiConfig, AiConnectionResult } from "./types";

const OPENROUTER_CHAT_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_KEY_URL = "https://openrouter.ai/api/v1/key";
const OPENROUTER_TOOL_MODELS_URL = "https://openrouter.ai/api/v1/models?supported_parameters=tools";

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
  signal?: AbortSignal;
  tools: OpenRouterTool[];
}

export interface OpenRouterClient {
  sendChat(input: SendOpenRouterChatInput): Promise<OpenRouterMessage>;
  testConnection(config: AiConfig, signal?: AbortSignal): Promise<AiConnectionResult>;
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
          stream: false,
          tool_choice: "auto",
          tools: input.tools,
        }),
        headers: createHeaders(config, options.referer),
        method: "POST",
        signal: input.signal,
      });
      const payload = await readJsonResponse(response);
      assertSuccessfulResponse(response, payload);

      const rawMessage = readRecord(readArray(payload.choices)[0])?.message;
      return parseAssistantMessage(rawMessage);
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
  if (!content && toolCalls.length === 0) throw new Error("OpenRouter returned an empty assistant response.");
  return {
    content,
    role: "assistant",
    ...(toolCalls.length ? { tool_calls: toolCalls } : {}),
  };
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

function readArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function readRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
}
