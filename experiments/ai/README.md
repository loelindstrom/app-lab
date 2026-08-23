# BuilderAI Experiments

This opt-in R&D suite compares prompt and starter-context strategies against real OpenRouter responses without adding experimental
agents to the product UI.

It may be run directly by a developer or orchestrated by an AI coding agent. In both cases, a human should choose the question being
tested and review the generated apps before treating the measurements as evidence; the automated compatibility and scope checks are
heuristics, not a quality verdict.

The default scenario asks for a stopwatch whose finished times are stored in a separate tab. Every profile uses the same model,
user request, and production read-source, read-console, and replace-source protocol. Generated source and raw metrics are written
under ignored `artifacts/ai-evals/`.

## Profiles

1. `baseline`: current production prompt and full Minimal Board source.
2. `restrained`: Copy-prompt-aligned scope guidance and the full Minimal Board source.
3. `compact-starter`: the restrained prompt and a minimal starter showing only App Lab-specific integration.
4. `strict-compact`: the compact starter plus an explicit prohibition on common speculative secondary workflows.

## Run

Add the capped test key to `.env.test.local` using `.env.test.local.example`, then run:

```bash
pnpm experiment:ai
```

The suite currently defaults to `google/gemini-3.7-flash`; override it with `--model` when comparing models.

Inspect selected profile sizes without loading a key or making network requests:

```bash
pnpm experiment:ai -- --dry-run
```

Re-run static analysis and rebuild an existing report without another paid request:

```bash
pnpm experiment:ai -- --reanalyze=artifacts/ai-evals/<run-id>
```

List current tool-capable models and per-million-token pricing without making a completion request:

```bash
pnpm experiment:ai -- --list-models=google
```

Run selected profiles or another model without adding model configuration to the environment file:

```bash
pnpm experiment:ai -- --profiles=restrained,compact-starter --model=provider/model
```

This is paid, stochastic evaluation. A single run is directional rather than statistically conclusive. Compare token counts, actual
cost, latency, static compatibility findings, and the generated HTML before selecting a production strategy. Never commit generated
HTML or reports from `artifacts`; they can contain complete model output and conversation content.

## Browser Check

Validate every generated app in one run through App Lab's real source-save and sandbox path:

```bash
APP_LAB_AI_EVAL_RUN=artifacts/ai-evals/<run-id> pnpm experiment:ai:browser
```

The check starts the stopwatch, saves a finished time through the generated UI, verifies `savedTimes` through `AppLab.getData`, fails
on sandbox console errors, and writes ignored screenshots beside the raw evaluation results.
