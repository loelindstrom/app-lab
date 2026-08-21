# BuilderAI Evaluation

This note records the first controlled BuilderAI prompt and context experiments. It is R&D evidence, not production documentation or
a statistically conclusive benchmark.

## Question

Can a simpler prompt and smaller starter context produce a focused, working App Lab app with lower token use while keeping the agent
loop small?

The fixed request was:

> I'd like a stopwatch app, but where finished times are saved in separate tab

Each controlled profile used the same read-source, read-console, and whole-source replacement tools. Generated apps were checked for
required behavior, unsupported browser features, source structure, scope expansion, and App Lab persistence. The final candidate was
also exercised through the real App Lab UI and sandbox on desktop and mobile.

## Profiles

1. `baseline`: current production prompt and the 14,231-character Example App.
2. `restrained`: Copy-prompt-aligned wording and scope guidance, still using the full Example App.
3. `compact-starter`: restrained prompt with a 1,090-character App Lab starter.
4. `strict-compact`: compact starter plus an explicit prohibition on common speculative secondary workflows.

The opt-in suite lives in [`experiments/ai`](../../experiments/ai/README.md). It writes raw source, JSON measurements, reports, and
screenshots to ignored `artifacts/ai-evals`.

## Results

Each row is one stochastic sample, so differences in reasoning tokens must not be attributed entirely to the prompt.

| Profile | Model | Tokens | Cost | Latency | Source | Extra visible scope | Static compatibility |
| --- | --- | ---: | ---: | ---: | ---: | --- | --- |
| Original manual HAR | Gemini 3.6 Flash | 58,615 | $0.0965 | 75.3s | 48,044 chars | laps, categories, notes, statistics, search, sorting, editing, deletion | Two forms; browser warning |
| `baseline` | Gemini 3.6 Flash | 57,579 | $0.1150 | 104.8s | 35,124 chars | categories, laps, notes, sorting, statistics, deletion | Clean |
| `restrained` | Gemini 3.6 Flash | 42,466 | $0.0653 | 55.2s | 31,538 chars | laps, notes, statistics, editing, deletion | Clean |
| `compact-starter` | Gemini 3.6 Flash | 35,543 | $0.0612 | 56.8s | 31,459 chars | laps, notes, editing | Clean |
| `compact-starter` | Gemini 3.7 Flash | 33,663 | $0.0280 | 57.3s | 31,452 chars | laps, notes, deletion | Clean |
| `strict-compact` | Gemini 3.7 Flash | 20,640 | $0.0166 | 33.9s | 15,662 chars | deletion | Clean; desktop/mobile workflow passed |

The strict candidate used 64.2% fewer tokens, cost 85.6% less, completed 67.6% faster, and produced 55.4% less source than the fresh
3.6 baseline sample. Compared with the otherwise equivalent compact 3.7 profile, the stricter scope instruction reduced tokens by
38.7%, cost and latency by 40.7%, and source size by 50.2%.

## Findings

### The Full Example Is Not Needed as Teaching Material

With the same restrained prompt and model, replacing the full Example App with the compact starter reduced cumulative prompt usage by
7,268 tokens. Completion size, latency, and visual ambition remained nearly identical. In this sample, the full example did not
produce an observable quality advantage.

The full current source is still required when editing an established app. The result only supports using a compact context when the
user is replacing an untouched starter, not hiding source during normal edits.

### Scope Guidance Must Be Explicit

"Prefer a small app" was insufficient. Both restrained profiles still inferred laps, notes, and editing. Explicitly naming common
secondary workflows reduced the result to the requested timer, saved-times tab, persistence, and small delete controls. The candidate
remained polished rather than becoming a bare proof of concept.

### The Newer Flash Model Is the Better Economic Candidate

OpenRouter reported Gemini 3.7 Flash pricing at $0.38/M prompt and $1.88/M completion tokens, half the listed 3.6 Flash rates. On the
same compact profile it produced nearly identical source size and latency with slightly fewer tokens, while cost fell from $0.0612 to
$0.0280. This does not prove generally better code quality, but it is the stronger default candidate for another test scenario.

### Prompt-Only Compatibility Is Not Sufficient

The original HAR violated the form rule; the fresh baseline happened not to. That variability supports deterministic source checks for
known App Lab incompatibilities. Forms, submit controls, external dependencies, browser storage, and malformed documents should be
reported back as recoverable tool errors before source is applied.

### Whole-Source Protocol Duplication Was Expensive

The strict candidate's final summary request contained 11,529 prompt tokens and cost $0.0046 because the write call and write result
both carried the complete source. The production tool now returns compact confirmation metadata instead. The final model response
remains so the user-facing summary follows confirmed tool success; the resulting savings have not yet been measured in another paid
run.

An exact search-and-replace tool remains promising for later edits. It is not needed to create the first version and should be measured
separately with a small bug-fix scenario.

## Browser Validation

The strict candidate was saved through App Lab's real source editor and run in the sandbox at desktop and Pixel-sized viewports. The
test started the timer, finished and saved a result, verified one persisted record through `AppLab.getData`, and observed no sandbox
console errors. Both layouts were nonblank and readable without overlap.

This validates one core workflow, not every generated control. Deletion, clearing history, remote data updates, and offline conflict
behavior were not exercised.

## Recommendation

Use the strict, Copy-prompt-aligned wording as the next production prompt candidate, and test it on one different app scenario before
adopting it. Prefer Gemini 3.7 Flash as the initial default candidate. The first follow-up implemented compact write receipts and
recoverable checks for complete documents, forms, and submit controls. Remaining improvements are:

1. Extend deterministic validation to other known App Lab incompatibilities.
2. Render assistant Markdown safely with raw HTML disabled.
3. Bound in-memory conversation context while always retaining the system prompt and recent decisions.

Conversation persistence and chat sync are not required for the first MVP evaluation. Current React state already isolates chat by app
and survives launcher navigation; source remains the durable truth after a reload.

## Limitations

- One run per profile is directional; model output is stochastic.
- The strict profile should be checked against a task where optional detail is genuinely implied, so restraint does not become
  under-building.
- Static scope signals are heuristics and were reviewed against source and assistant summaries.
- The original HAR and first raw run artifacts were placed in Playwright's ephemeral `test-results` directory and were deleted when the
  first browser check started. Their extracted metrics and observations above were already recorded. The suite now uses `artifacts` and
  isolates Playwright output under `/tmp`.
