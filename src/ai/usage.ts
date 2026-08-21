import type { AiUsage } from "./types";

export function createEmptyAiUsage(): AiUsage {
  return {
    completionTokens: 0,
    costUsd: 0,
    promptTokens: 0,
    reasoningTokens: 0,
    totalTokens: 0,
  };
}

export function addAiUsage(current: AiUsage, next: AiUsage): AiUsage {
  return {
    completionTokens: current.completionTokens + next.completionTokens,
    costUsd: current.costUsd === null || next.costUsd === null ? null : current.costUsd + next.costUsd,
    promptTokens: current.promptTokens + next.promptTokens,
    reasoningTokens: current.reasoningTokens + next.reasoningTokens,
    totalTokens: current.totalTokens + next.totalTokens,
  };
}
