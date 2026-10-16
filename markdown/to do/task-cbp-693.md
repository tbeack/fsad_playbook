# CBP-693 — Update `fable` and `best` alias rows: retry-on-previous-model note (v2.1.301)

## Summary
Claude Code v2.1.301 fixed the `fable` (and `best`) model alias erroring on the Anthropic API when the newest Fable model is not available to an organization. Claude Code now retries once on the previous Fable model. This is a user-visible behavioral improvement for enterprise organizations that control which model versions are available.

## Assessment
The model aliases table in `src/pages/practices.html` has:
- `fable` row at line 1603: no mention of the retry-on-previous behavior
- `best` / `opus` row at line 1604: no mention of the retry behavior

Both rows should note this behavior so enterprise users understand why `fable` may resolve to the previous model when the newest is unavailable.

## Plan
1. Read `src/pages/practices.html` around lines 1603–1604.
2. Append to the `fable` row description: "As of v2.1.301, when the newest Fable model is not available to your organization, Claude Code retries once on the previous Fable model instead of erroring."
3. Append to the `best` / `opus` row description: "As of v2.1.301, when the newest Fable model is unavailable to your organization, the `best` alias also retries on the previous Fable model."

## Acceptance Criteria
- The `fable` alias row notes the retry-on-previous behavior.
- The `best`/`opus` alias row notes the same behavior applies to it.
- No other rows are altered.
