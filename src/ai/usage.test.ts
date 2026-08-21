import { describe, expect, it } from "vitest";
import { addAiUsage, createEmptyAiUsage } from "./usage";

describe("AI usage", () => {
  it("aggregates token counts and reported cost", () => {
    expect(
      addAiUsage(createEmptyAiUsage(), {
        completionTokens: 25,
        costUsd: 0.0025,
        promptTokens: 100,
        reasoningTokens: 5,
        totalTokens: 125,
      }),
    ).toEqual({
      completionTokens: 25,
      costUsd: 0.0025,
      promptTokens: 100,
      reasoningTokens: 5,
      totalTokens: 125,
    });
  });

  it("does not present a partial cost as a complete session cost", () => {
    const first = addAiUsage(createEmptyAiUsage(), {
      completionTokens: 5,
      costUsd: 0.001,
      promptTokens: 10,
      reasoningTokens: 0,
      totalTokens: 15,
    });

    expect(
      addAiUsage(first, {
        completionTokens: 2,
        costUsd: null,
        promptTokens: 8,
        reasoningTokens: 0,
        totalTokens: 10,
      }).costUsd,
    ).toBeNull();
  });
});
