# CBP-720: `[1m]` suffix dropped from model names where it's redundant (v2.1.311)

## Summary
Claude Code v2.1.311 generalizes a behavior previously specific to Fable: model names and IDs now drop the `[1m]` suffix and its label wherever the suffix has no effect (i.e. the model already defaults to 1M context) — the suffix is still accepted as input, just no longer shown. The playbook already documents this for `fable[1m]` (v2.1.173) but the `opus[1m]` / `sonnet[1m]` alias row doesn't mention it, even though Opus 5.5 and Sonnet 5.5 both default to 1M context per the model comparison table.

## Assessment
`src/pages/practices.html` line ~1623 documents `fable[1m]` as "redundant and stripped automatically (v2.1.173)". Line ~1627 has a separate `opus[1m]` / `sonnet[1m]` row that just says "1M context variant" with no mention of the suffix being redundant/display-only now that both current default models include 1M context by default.

## Plan
1. Open `src/pages/practices.html`.
2. Update the `opus[1m]` / `sonnet[1m]` table row (~line 1627) to note that as of v2.1.311, this suffix is redundant and dropped from display for any model that already defaults to 1M context (Opus 5.5, Sonnet 5.5 included) — the suffix is still accepted if typed, generalizing the fable-specific behavior from v2.1.173.

## Acceptance Criteria
- The `opus[1m]` / `sonnet[1m]` row notes the suffix is now redundant/display-stripped for models that default to 1M context.
- Version-tagged `(v2.1.311)`.
- Existing `fable[1m]` (v2.1.173) sentence untouched.
