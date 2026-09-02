# CBP-507 — Document `CLAUDE_CODE_SUBAGENT_MODEL_FORCE`

## Summary
Claude Code v2.1.257 added `CLAUDE_CODE_SUBAGENT_MODEL_FORCE` to apply `CLAUDE_CODE_SUBAGENT_MODEL` (or the main model) to every subagent, ignoring per-spawn and agent-definition `model:` overrides. This is a direct follow-on to the v2.1.251 change (already documented, CBP-494) where `CLAUDE_CODE_SUBAGENT_MODEL` became a default-only setting that per-agent/per-spawn overrides could beat — this new env var is the escape hatch to force it anyway.

## Assessment
`src/pages/practices.html` documents `CLAUDE_CODE_SUBAGENT_MODEL` in three places:
- `#model-effort` code block (line 1719): `export CLAUDE_CODE_SUBAGENT_MODEL=haiku`, with a comment above it (line 1718) noting the v2.1.251 default-only/precedence behavior.
- `#model-effort` Cost Optimization Checklist callout (line 1760): bullet documenting the same default-only/precedence behavior.
- `#power-usage` env var reference table (lines 2795-2797) documents `CLAUDE_CODE_MAX_SUBAGENTS_PER_SESSION`, `CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS`, `CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH` but has no row for any `CLAUDE_CODE_SUBAGENT_MODEL*` variable at all.

This is "update existing" — the precedence behavior this new variable overrides is already documented, so the FORCE escape hatch belongs right next to it, plus a new reference-table row in Power Usage for completeness (the env var table is the canonical place other subagent-scoping vars live).

## Plan
1. In `src/pages/practices.html`, code block in `#model-effort` (after line 1719), add a new line:
   ```
   export CLAUDE_CODE_SUBAGENT_MODEL_FORCE=1  # Force CLAUDE_CODE_SUBAGENT_MODEL (or the main model) onto every subagent, ignoring per-spawn/agent model: overrides (v2.1.257)
   ```
2. In the Cost Optimization Checklist callout (line 1760), append a clause or new bullet noting `CLAUDE_CODE_SUBAGENT_MODEL_FORCE=1` overrides the default-only behavior when strict cost control is required.
3. In the `#power-usage` env var reference table, add a new row after the `CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH` row (line 2797):
   ```html
   <tr><td><code>CLAUDE_CODE_SUBAGENT_MODEL_FORCE</code></td><td>Forces <code>CLAUDE_CODE_SUBAGENT_MODEL</code> (or the main model, if unset) onto every subagent, ignoring per-spawn and agent-definition <code>model:</code> overrides — the opposite of the default-only behavior introduced in v2.1.251. Use for strict cost enforcement when you cannot audit every agent definition (v2.1.257).</td></tr>
   ```

## Acceptance Criteria
- [ ] `CLAUDE_CODE_SUBAGENT_MODEL_FORCE` example line added to the `#model-effort` code block with a version marker.
- [ ] Cost Optimization Checklist callout mentions the FORCE variable and what it overrides.
- [ ] A new row for `CLAUDE_CODE_SUBAGENT_MODEL_FORCE` exists in the `#power-usage` env var reference table.
- [ ] `python3 scripts/build-source.py` runs clean after the edit.
