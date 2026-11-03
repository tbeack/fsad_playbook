# CBP-742: Subagents/teammates on a different model use that model's saved effort (v2.1.317)

## Summary
Claude Code v2.1.317 changed subagents and teammates on a different model from the main conversation to use that model's saved effort level or its default, instead of the session's effort level.

## Assessment
`src/pages/practices.html`'s Cost Optimization Checklist has a bullet (~line 1697) documenting the Agent tool's `effort` parameter and `CLAUDE_CODE_SUBAGENT_EFFORT` (added in v2.1.316, CBP-735). This v2.1.317 change is a direct refinement of that same fallback-resolution chain — it only changes what a subagent falls back to when its model differs from the main session's — so it extends that existing bullet rather than needing a new section. It also ties into the already-documented fact (v2.1.251) that `/effort` saves a default per model.

## Plan
1. Open `src/pages/practices.html`.
2. Append to the existing bullet (~line 1697):
   ```
   As of v2.1.317, a subagent or teammate running on a different model than the main conversation uses that model's own saved `/effort` level (or its default) instead of inheriting the session's effort — each model's effort setting (saved per-model since v2.1.251) now follows its own model wherever that model runs.
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The Agent-tool-effort bullet in the Cost Optimization Checklist documents the v2.1.317 per-model effort fallback for subagents/teammates on a different model.
- HTML is valid (no unclosed tags).
