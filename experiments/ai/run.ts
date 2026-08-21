import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { basename, resolve } from "node:path";
import { BUILDER_TOOLS, MAX_BUILDER_TOOL_ROUNDS } from "../../src/ai/agent.ts";
import { createOpenRouterClient, type OpenRouterMessage } from "../../src/ai/openrouter.ts";
import { analyzeGeneratedApp, type GeneratedAppAnalysis } from "./analyze.ts";
import { AI_EVALUATION_PROFILES, STOPWATCH_SCENARIO, type AiEvaluationProfile } from "./profiles.ts";

const DEFAULT_MODEL = "google/gemini-3.7-flash";
const CHAT_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODELS_URL = "https://openrouter.ai/api/v1/models?supported_parameters=tools";

interface ApiCallMetric {
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

interface EvaluationResult {
  analysis: GeneratedAppAnalysis;
  apiCalls: ApiCallMetric[];
  description: string;
  finalAssistantMessage: string;
  model: string;
  profile: string;
  scenario: string;
  toolCalls: string[];
  totals: {
    cachedTokens: number;
    completionTokens: number;
    cost: number;
    durationMs: number;
    promptTokens: number;
    reasoningTokens: number;
    totalTokens: number;
  };
}

const resultSource = new Map<string, string>();
await main();

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const model = args.model ?? DEFAULT_MODEL;
  const selectedProfiles = selectProfiles(args.profiles);
  if (args.reanalyze) {
    await reanalyzeRun(args.reanalyze);
    return;
  }
  if (args.dryRun) {
    for (const profile of selectedProfiles) {
      console.log(`${profile.id}: prompt=${profile.systemPrompt(STOPWATCH_SCENARIO.appName).length} chars, source=${profile.sourceCode.length} chars`);
    }
    return;
  }

  const apiKey = process.env.APP_LAB_OPENROUTER_TEST_API_KEY;
  if (!apiKey) throw new Error("APP_LAB_OPENROUTER_TEST_API_KEY is required. Use the ignored .env.test.local file.");
  if (args.listModels !== undefined) {
    await listModels(apiKey, args.listModels);
    return;
  }

  const runId = new Date().toISOString().replace(/[:.]/g, "-");
  const outputDirectory = resolve("artifacts", "ai-evals", runId);
  await mkdir(outputDirectory, { recursive: true });

  const results: EvaluationResult[] = [];
  for (const profile of selectedProfiles) {
    process.stdout.write(`Running ${profile.id} with ${model}...\n`);
    const result = await runProfile(profile, model, apiKey);
    results.push(result);
    await writeFile(resolve(outputDirectory, `${profile.id}.html`), resultSource.get(profile.id) ?? "", "utf8");
    await writeFile(resolve(outputDirectory, `${profile.id}.json`), `${JSON.stringify(result, null, 2)}\n`, "utf8");
    process.stdout.write(
      `  ${result.totals.totalTokens} tokens, $${result.totals.cost.toFixed(4)}, ${(result.totals.durationMs / 1000).toFixed(1)}s, ${result.analysis.sourceChars} source chars\n`,
    );
  }

  await writeFile(resolve(outputDirectory, "report.md"), createReport(results, runId), "utf8");
  process.stdout.write(`Report: ${resolve(outputDirectory, "report.md")}\n`);
}

async function listModels(apiKey: string, filter: string) {
  const response = await fetch(MODELS_URL, { headers: { Authorization: `Bearer ${apiKey}` } });
  if (!response.ok) throw new Error(`OpenRouter model listing failed with ${response.status}.`);
  const payload = readRecord(await response.json()) ?? {};
  const normalizedFilter = filter.trim().toLowerCase();
  const models = readArray(payload.data)
    .map(readRecord)
    .filter((model): model is Record<string, unknown> => Boolean(model))
    .filter((model) => {
      if (!normalizedFilter) return true;
      return [model.id, model.name].some((value) => typeof value === "string" && value.toLowerCase().includes(normalizedFilter));
    });

  for (const model of models) {
    const pricing = readRecord(model.pricing);
    const promptPerMillion = readPricePerMillion(pricing?.prompt);
    const completionPerMillion = readPricePerMillion(pricing?.completion);
    console.log(
      `${String(model.id)}\t${String(model.name ?? model.id)}\tprompt=$${promptPerMillion.toFixed(2)}/M\tcompletion=$${completionPerMillion.toFixed(2)}/M`,
    );
  }
}

async function reanalyzeRun(directory: string) {
  const outputDirectory = resolve(directory);
  const jsonFiles = (await readdir(outputDirectory)).filter((file) => file.endsWith(".json")).sort();
  if (!jsonFiles.length) throw new Error(`No evaluation JSON files found in ${outputDirectory}.`);

  const results: EvaluationResult[] = [];
  for (const jsonFile of jsonFiles) {
    const profile = jsonFile.slice(0, -".json".length);
    const result = JSON.parse(await readFile(resolve(outputDirectory, jsonFile), "utf8")) as EvaluationResult;
    const sourceCode = await readFile(resolve(outputDirectory, `${profile}.html`), "utf8");
    result.analysis = analyzeGeneratedApp(sourceCode);
    results.push(result);
    await writeFile(resolve(outputDirectory, jsonFile), `${JSON.stringify(result, null, 2)}\n`, "utf8");
  }

  await writeFile(resolve(outputDirectory, "report.md"), createReport(results, basename(outputDirectory)), "utf8");
  process.stdout.write(`Reanalyzed: ${resolve(outputDirectory, "report.md")}\n`);
}

async function runProfile(profile: AiEvaluationProfile, selectedModel: string, key: string): Promise<EvaluationResult> {
  let sourceCode = profile.sourceCode;
  const apiCalls: ApiCallMetric[] = [];
  const toolCalls: string[] = [];
  const recordingFetch = createRecordingFetch(apiCalls);
  const client = createOpenRouterClient({ fetchImpl: recordingFetch });
  const messages: OpenRouterMessage[] = [
    { content: profile.systemPrompt(STOPWATCH_SCENARIO.appName), role: "system" },
    { content: STOPWATCH_SCENARIO.userMessage, role: "user" },
  ];
  let finalAssistantMessage = "";

  for (let round = 0; round < MAX_BUILDER_TOOL_ROUNDS; round += 1) {
    const response = await client.sendChat({
      config: { apiKey: key, model: selectedModel },
      messages,
      tools: BUILDER_TOOLS,
    });
    const assistant = response.message;
    messages.push(assistant);
    const requestedTools = assistant.tool_calls ?? [];
    if (!requestedTools.length) {
      finalAssistantMessage = assistant.content?.trim() || "Done.";
      break;
    }

    for (const toolCall of requestedTools) {
      toolCalls.push(toolCall.function.name);
      const result = executeTool(toolCall.function.name, toolCall.function.arguments, sourceCode);
      if (result.nextSource) sourceCode = result.nextSource;
      messages.push({
        content: JSON.stringify(result.output),
        name: toolCall.function.name,
        role: "tool",
        tool_call_id: toolCall.id,
      });
    }
  }

  if (!finalAssistantMessage) throw new Error(`${profile.id} did not finish within ${MAX_BUILDER_TOOL_ROUNDS} tool rounds.`);
  resultSource.set(profile.id, sourceCode);
  const totals = sumMetrics(apiCalls);
  return {
    analysis: analyzeGeneratedApp(sourceCode),
    apiCalls,
    description: profile.description,
    finalAssistantMessage,
    model: selectedModel,
    profile: profile.id,
    scenario: STOPWATCH_SCENARIO.id,
    toolCalls,
    totals,
  };
}

function executeTool(name: string, rawArguments: string, sourceCode: string): { nextSource?: string; output: unknown } {
  const args = parseToolArguments(name, rawArguments);
  if (name === "read_current_app_source") {
    return {
      output: {
        description: "App Lab starter used by the controlled AI evaluation.",
        name: STOPWATCH_SCENARIO.appName,
        sourceCode,
      },
    };
  }
  if (name === "read_recent_console_output") return { output: { output: "No recent console output." } };
  if (name === "replace_current_app_source") {
    if (typeof args.sourceCode !== "string") throw new Error("replace_current_app_source requires sourceCode.");
    assertCompleteDocument(args.sourceCode);
    return {
      nextSource: args.sourceCode,
      output: {
        name: readTitle(args.sourceCode),
        sourceChars: args.sourceCode.length,
        success: true,
      },
    };
  }
  throw new Error(`Unknown evaluation tool: ${name}`);
}

function createRecordingFetch(metrics: ApiCallMetric[]): typeof fetch {
  return async (input, init) => {
    const startedAt = performance.now();
    const response = await fetch(input, init);
    if (String(input) !== CHAT_URL) return response;

    const responseText = await response.clone().text();
    const durationMs = performance.now() - startedAt;
    const payload = parseRecord(responseText);
    const usage = readRecord(payload.usage);
    const choice = readRecord(readArray(payload.choices)[0]);
    const message = readRecord(choice?.message);
    const completionDetails = readRecord(usage?.completion_tokens_details);
    const promptDetails = readRecord(usage?.prompt_tokens_details);
    const requestBody = typeof init?.body === "string" ? init.body : "";

    metrics.push({
      cachedTokens: readNumber(promptDetails?.cached_tokens),
      completionTokens: readNumber(usage?.completion_tokens),
      cost: readNumber(usage?.cost),
      durationMs,
      finishReason: typeof choice?.finish_reason === "string" ? choice.finish_reason : "unknown",
      promptTokens: readNumber(usage?.prompt_tokens),
      reasoningTokens: readNumber(completionDetails?.reasoning_tokens),
      requestChars: requestBody.length,
      responseChars: responseText.length,
      toolCalls: readArray(message?.tool_calls)
        .map(readRecord)
        .map((toolCall) => readRecord(toolCall?.function)?.name)
        .filter((name): name is string => typeof name === "string"),
      totalTokens: readNumber(usage?.total_tokens),
    });
    return response;
  };
}

function createReport(results: EvaluationResult[], runId: string): string {
  const rows = results.map((result) =>
    `| ${result.profile} | ${result.totals.totalTokens} | ${result.totals.promptTokens} | ${result.totals.completionTokens} | $${result.totals.cost.toFixed(4)} | ${(result.totals.durationMs / 1000).toFixed(1)}s | ${result.analysis.sourceChars} | ${result.analysis.formCount} | ${result.analysis.topHeaderCount} | ${result.analysis.scopeSignals.join(", ") || "none"} |`,
  );
  const details = results.map((result) => `## ${result.profile}

${result.description}

- Tool calls: ${result.toolCalls.join(" -> ") || "none"}
- Required signals: stopwatch=${result.analysis.hasStopwatchSignal}, start=${result.analysis.hasStartSignal}, save=${result.analysis.hasSaveTimeSignal}, saved-times=${result.analysis.hasSavedTimesSignal}, separate-tab=${result.analysis.hasSeparateTabSignal}
- Persistence: load=${result.analysis.usesAppLabLoad}, save=${result.analysis.usesAppLabSave}
- Compatibility: forms=${result.analysis.formCount}, submit-controls=${result.analysis.submitControlCount}, missing-button-types=${result.analysis.buttonWithoutTypeCount}, browser-storage=${result.analysis.prohibitedBrowserStorageCount}, external-assets=${result.analysis.externalAssetCount}, script-errors=${result.analysis.scriptSyntaxErrors.length}
- Assistant summary: ${result.finalAssistantMessage.replace(/\s+/g, " ").trim()}
`).join("\n");

  return `# BuilderAI Evaluation Report

- Run: ${runId}
- Scenario: ${STOPWATCH_SCENARIO.id}
- Model: ${results[0]?.model ?? "unknown"}

This is a single-sample exploratory comparison. Token, cost, and latency measurements are objective; quality and scope still require human review.

| Profile | Total tokens | Prompt | Completion | Cost | Latency | Source chars | Forms | Headers | Scope signals |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
${rows.join("\n")}

${details}`;
}

function sumMetrics(metrics: ApiCallMetric[]) {
  return metrics.reduce(
    (total, metric) => ({
      cachedTokens: total.cachedTokens + metric.cachedTokens,
      completionTokens: total.completionTokens + metric.completionTokens,
      cost: total.cost + metric.cost,
      durationMs: total.durationMs + metric.durationMs,
      promptTokens: total.promptTokens + metric.promptTokens,
      reasoningTokens: total.reasoningTokens + metric.reasoningTokens,
      totalTokens: total.totalTokens + metric.totalTokens,
    }),
    { cachedTokens: 0, completionTokens: 0, cost: 0, durationMs: 0, promptTokens: 0, reasoningTokens: 0, totalTokens: 0 },
  );
}

function parseArgs(values: string[]): { dryRun?: boolean; listModels?: string; model?: string; profiles?: string[]; reanalyze?: string } {
  const output: { dryRun?: boolean; listModels?: string; model?: string; profiles?: string[]; reanalyze?: string } = {};
  for (const value of values) {
    if (value === "--dry-run") output.dryRun = true;
    if (value === "--list-models") output.listModels = "";
    if (value.startsWith("--list-models=")) output.listModels = value.slice("--list-models=".length);
    if (value.startsWith("--model=")) output.model = value.slice("--model=".length);
    if (value.startsWith("--profiles=")) output.profiles = value.slice("--profiles=".length).split(",").filter(Boolean);
    if (value.startsWith("--reanalyze=")) output.reanalyze = value.slice("--reanalyze=".length);
  }
  return output;
}

function selectProfiles(profileIds?: string[]): AiEvaluationProfile[] {
  if (!profileIds?.length) return AI_EVALUATION_PROFILES;
  const selected = AI_EVALUATION_PROFILES.filter((profile) => profileIds.includes(profile.id));
  const missing = profileIds.filter((id) => !selected.some((profile) => profile.id === id));
  if (missing.length) throw new Error(`Unknown AI evaluation profiles: ${missing.join(", ")}`);
  return selected;
}

function parseToolArguments(name: string, value: string): Record<string, unknown> {
  try {
    const parsed = JSON.parse(value || "{}");
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Expected an object.");
    return parsed as Record<string, unknown>;
  } catch (_) {
    throw new Error(`Invalid arguments for ${name}.`);
  }
}

function assertCompleteDocument(sourceCode: string) {
  if (!/^\s*(?:<!doctype\s+html(?:\s[^>]*)?>|<html(?:\s|>))/i.test(sourceCode)) {
    throw new Error("Generated source is not a complete HTML document.");
  }
}

function readTitle(sourceCode: string): string {
  return sourceCode.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() || "Generated App";
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

function readPricePerMillion(value: unknown): number {
  const perToken = typeof value === "number" ? value : typeof value === "string" ? Number(value) : 0;
  return Number.isFinite(perToken) ? perToken * 1_000_000 : 0;
}
