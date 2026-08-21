import { createBuilderSystemPrompt } from "./prompt";
import { validateBuilderSource } from "./sourceValidation";
import type { OpenRouterClient, OpenRouterMessage, OpenRouterTool, OpenRouterToolCall } from "./openrouter";
import type { AiConfig, BuilderAgentTools, BuilderToolSummary, BuilderTurnResult, RunBuilderTurnInput } from "./types";
import { addAiUsage, createEmptyAiUsage } from "./usage";

export const MAX_BUILDER_TOOL_ROUNDS = 4;

export const BUILDER_TOOLS: OpenRouterTool[] = [
  {
    function: {
      description: "Read the active app's metadata and complete HTML source.",
      name: "read_current_app_source",
      parameters: { additionalProperties: false, properties: {}, type: "object" },
    },
    type: "function",
  },
  {
    function: {
      description: "Read recent console output from the active app.",
      name: "read_recent_console_output",
      parameters: { additionalProperties: false, properties: {}, type: "object" },
    },
    type: "function",
  },
  {
    function: {
      description: "Replace the active app with one complete single-file HTML document.",
      name: "replace_current_app_source",
      parameters: {
        additionalProperties: false,
        properties: {
          sourceCode: {
            description: "Complete standalone HTML document for the active app.",
            type: "string",
          },
        },
        required: ["sourceCode"],
        type: "object",
      },
    },
    type: "function",
  },
];

export const BUILDER_TOOL_SUMMARIES: BuilderToolSummary[] = BUILDER_TOOLS.map(({ function: tool }) => ({
  description: tool.description,
  name: tool.name,
}));

export interface BuilderAgent {
  runTurn(input: RunBuilderTurnInput): Promise<BuilderTurnResult>;
}

export function createBuilderAgent(client: OpenRouterClient, getConfig: () => Promise<AiConfig>): BuilderAgent {
  return {
    async runTurn(input) {
      const messages: OpenRouterMessage[] = [
        { content: createBuilderSystemPrompt(input.appName), role: "system" },
        ...input.messages
          .filter((message) => message.appId === input.appId)
          .map((message) => ({ content: message.content, role: message.role })),
      ];
      const config = await getConfig();
      let usage = createEmptyAiUsage();

      for (let round = 0; round < MAX_BUILDER_TOOL_ROUNDS; round += 1) {
        input.onActivity?.("Thinking...");
        const response = await client.sendChat({ config, messages, signal: input.signal, tools: BUILDER_TOOLS });
        const assistant = response.message;
        usage = addAiUsage(usage, response.usage);
        input.onUsage?.(response.usage);
        messages.push(assistant);
        const toolCalls = assistant.tool_calls ?? [];
        if (toolCalls.length === 0) {
          return {
            content: assistant.content?.trim() || "Done.",
            toolRounds: round,
            usage,
          };
        }

        for (const toolCall of toolCalls) {
          const result = await executeTool(toolCall, input.tools, input.onActivity);
          messages.push({
            content: JSON.stringify(result),
            name: toolCall.function.name,
            role: "tool",
            tool_call_id: toolCall.id,
          });
        }
      }

      throw new Error(`BuilderAI stopped after ${MAX_BUILDER_TOOL_ROUNDS} tool rounds.`);
    },
  };
}

async function executeTool(
  toolCall: OpenRouterToolCall,
  tools: BuilderAgentTools,
  onActivity: RunBuilderTurnInput["onActivity"],
): Promise<unknown> {
  const args = parseToolArguments(toolCall);
  if (!args) {
    return toolFailure("INVALID_TOOL_ARGUMENTS", `Use one valid JSON object for ${toolCall.function.name}.`);
  }

  if (toolCall.function.name === "read_current_app_source") {
    onActivity?.("Reading current app...");
    return tools.readCurrentAppSource();
  }

  if (toolCall.function.name === "read_recent_console_output") {
    onActivity?.("Reading recent console output...");
    return { output: await tools.readRecentConsoleOutput() };
  }

  if (toolCall.function.name === "replace_current_app_source") {
    if (typeof args.sourceCode !== "string") {
      return toolFailure("INVALID_TOOL_ARGUMENTS", "replace_current_app_source requires one string field named sourceCode.");
    }
    const validationFailure = validateBuilderSource(args.sourceCode);
    if (validationFailure) return validationFailure;
    onActivity?.("Applying app source...");
    return tools.replaceCurrentAppSource(args.sourceCode);
  }

  return toolFailure("UNKNOWN_TOOL", `The tool ${toolCall.function.name} is not available.`);
}

function parseToolArguments(toolCall: OpenRouterToolCall): Record<string, unknown> | null {
  try {
    const parsed = JSON.parse(toolCall.function.arguments || "{}");
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Expected an object.");
    return parsed as Record<string, unknown>;
  } catch (_) {
    return null;
  }
}

function toolFailure(code: string, message: string) {
  return { code, message, success: false as const };
}
