# CBP-409: Document the `ANTHROPIC_DEFAULT_MODEL` environment variable

## Source
Claude Code v2.1.236 changelog: "Added `ANTHROPIC_DEFAULT_MODEL` environment variable: sets the model new sessions start on, while a `/model` pick still overrides it and persists across restarts (unlike `ANTHROPIC_MODEL`)."

## Summary
A new environment variable `ANTHROPIC_DEFAULT_MODEL` lets you set the starting model for new sessions, distinct from `ANTHROPIC_MODEL` (which the changelog implies has different override/persistence semantics). Neither `ANTHROPIC_MODEL` nor `ANTHROPIC_DEFAULT_MODEL` currently appears in the playbook; only `ANTHROPIC_DEFAULT_OPUS_MODEL` is documented (in the "Key Dates" callout, Claude Best Practices → Model & Effort section, for pinning model versions on Bedrock/Vertex/Foundry).

## Assessment
Does content exist? Partial — only `ANTHROPIC_DEFAULT_OPUS_MODEL` is mentioned (line ~10883). The general-purpose `ANTHROPIC_DEFAULT_MODEL` env var (for setting the default starting model, distinct from the Bedrock/Vertex/Foundry pinning use case) is undocumented.

## Plan
1. Open `fsad-playbook.html`, locate the "Claude Code model aliases" table in the Model & Effort section (`<p>...Claude Code model aliases</p>` at ~line 10802, table body ~10807-10813).
2. Add a new bullet or short paragraph near the model-aliases code block (the `<div class="code-block">` starting ~line 10818, which shows `/model opus`, `/model sonnet` etc. and the `CLAUDE_CODE_SUBAGENT_MODEL=haiku` example) documenting:
   - `ANTHROPIC_DEFAULT_MODEL` — sets the model new sessions start on.
   - Contrast with `ANTHROPIC_MODEL`: a `/model` pick still overrides `ANTHROPIC_DEFAULT_MODEL` and persists across restarts, which `ANTHROPIC_MODEL` does not do (per the changelog wording).
   - Added in v2.1.236.
3. Preferred insertion point: as a new comment+line inside the existing bash code block (~line 10828-10829, near the `CLAUDE_CODE_SUBAGENT_MODEL` example), e.g.:
   ```
   # Set the default model for new sessions (a /model pick still overrides and persists)
   export ANTHROPIC_DEFAULT_MODEL=sonnet
   ```
   Alternatively, if that code block is judged too crowded, add a bullet to the "Cost Optimization Checklist" callout (~line 10863-10873) is NOT appropriate (wrong topic) — prefer the code block or a new short paragraph directly below it.

## Acceptance Criteria
- [ ] `ANTHROPIC_DEFAULT_MODEL` is documented in the Model & Effort section with its purpose and its distinction from `ANTHROPIC_MODEL`.
- [ ] Version v2.1.236 is cited.
- [ ] Existing code block / table structure is not broken.
