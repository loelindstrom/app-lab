export const OPENROUTER_CHAT_URL = "https://openrouter.ai/api/v1/chat/completions";
export const OPENROUTER_MODELS_URL = "https://openrouter.ai/api/v1/models?supported_parameters=tools";

export async function callOpenRouter({ config, messages, tools, handlers = {} }) {
  if (!config.apiKey || !config.model) {
    throw new Error("Add an OpenRouter API key and model id in Settings first.");
  }

  const response = await fetch(OPENROUTER_CHAT_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": window.location.origin,
      "X-Title": "App Lab",
    },
    body: JSON.stringify({
      model: config.model,
      messages,
      tools,
      tool_choice: "auto",
      stream: true,
    }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error?.message || `OpenRouter request failed with ${response.status}`);
  }

  if (!response.body) {
    const body = await response.json().catch(() => null);
    return body?.choices?.[0]?.message;
  }

  return readOpenRouterStream(response.body, handlers);
}

export async function readOpenRouterStream(body, handlers = {}) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  const assistantMessage = {
    role: "assistant",
    content: "",
    tool_calls: [],
  };
  let buffer = "";
  let sawReasoning = false;

  while (true) {
    const { value, done } = await reader.read();
    buffer += decoder.decode(value || new Uint8Array(), { stream: !done });
    buffer = buffer.replace(/\r\n/g, "\n");

    let eventBoundary = buffer.indexOf("\n\n");
    while (eventBoundary !== -1) {
      const rawEvent = buffer.slice(0, eventBoundary);
      buffer = buffer.slice(eventBoundary + 2);
      processOpenRouterStreamEvent(rawEvent, assistantMessage, handlers, () => {
        if (!sawReasoning) {
          sawReasoning = true;
          handlers.onThinking?.();
        }
      });
      eventBoundary = buffer.indexOf("\n\n");
    }

    if (done) break;
  }

  if (buffer.trim()) {
    processOpenRouterStreamEvent(buffer, assistantMessage, handlers, () => {
      if (!sawReasoning) {
        sawReasoning = true;
        handlers.onThinking?.();
      }
    });
  }

  if (!assistantMessage.tool_calls.length) {
    delete assistantMessage.tool_calls;
  }

  return assistantMessage;
}

function processOpenRouterStreamEvent(rawEvent, assistantMessage, handlers, markThinking) {
  const data = rawEvent
    .split("\n")
    .filter((line) => line.startsWith("data:"))
    .map((line) => line.slice(5).trimStart())
    .join("\n")
    .trim();

  if (!data || data === "[DONE]") return;

  let payload;
  try {
    payload = JSON.parse(data);
  } catch (error) {
    console.warn("Could not parse OpenRouter stream event", error);
    return;
  }

  const delta = payload.choices?.[0]?.delta;
  if (!delta) return;

  if (delta.reasoning || delta.reasoning_content || delta.reasoning_details) {
    markThinking();
  }

  if (typeof delta.content === "string") {
    assistantMessage.content += delta.content;
    handlers.onContent?.(delta.content, assistantMessage.content);
  }

  for (const toolDelta of delta.tool_calls || []) {
    const index = toolDelta.index ?? assistantMessage.tool_calls.length;
    const toolCall = ensureToolCallDelta(assistantMessage.tool_calls, index);
    if (toolDelta.id) toolCall.id = toolDelta.id;
    if (toolDelta.type) toolCall.type = toolDelta.type;
    if (toolDelta.function?.name) toolCall.function.name += toolDelta.function.name;
    if (toolDelta.function?.arguments) toolCall.function.arguments += toolDelta.function.arguments;
    handlers.onToolDelta?.(toolCall);
  }
}

function ensureToolCallDelta(toolCalls, index) {
  if (!toolCalls[index]) {
    toolCalls[index] = {
      id: "",
      type: "function",
      function: {
        name: "",
        arguments: "",
      },
    };
  }

  return toolCalls[index];
}

export function formatTokenPrice(pricePerToken) {
  const price = Number(pricePerToken);
  if (!Number.isFinite(price)) return "?";
  if (price === 0) return "$0";
  return `$${(price * 1_000_000).toFixed(price * 1_000_000 < 1 ? 2 : 1)}`;
}
