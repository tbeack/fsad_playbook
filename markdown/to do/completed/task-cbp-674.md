# CBP-674 — Add `CLAUDE_CODE_WORKFLOW_SUBAGENT_MODEL` env var (v2.1.296)

## Summary
Claude Code v2.1.296 added `CLAUDE_CODE_WORKFLOW_SUBAGENT_MODEL` — sets the model for every workflow agent while other subagents keep their configured models.

## Assessment
Not present in `src/pages/practices.html`. The env vars table already has `CLAUDE_CODE_OVERLOADED_RETRY_BASE_DELAY_MS` at line 2746 and nearby entries. The new env var belongs in the same table, logically grouped with other subagent/workflow configuration vars.

The best insertion point is after `CLAUDE_CODE_RETRY_WATCHDOG_MAX_WAIT_MS` (line 2745) and `CLAUDE_CODE_OVERLOADED_RETRY_BASE_DELAY_MS` (line 2746). Add it after line 2746 so all three overload/retry vars stay together, or add it near related workflow model vars if any exist.

Actually, this is a model-selection env var, not a retry var. Check the env vars table for existing model vars. Insert near `CLAUDE_CODE_MODEL` or similar. If none exist, add after the overload retry group since that's the nearest cluster.

## Plan
1. In `src/pages/practices.html`, add a new `<tr>` row to the env vars table after the `CLAUDE_CODE_OVERLOADED_RETRY_BASE_DELAY_MS` row (line 2746):
   ```html
   <tr><td><code>CLAUDE_CODE_WORKFLOW_SUBAGENT_MODEL</code></td><td>Sets the model for every workflow agent (Workflow tool subagents), while other subagents keep their own configured model. Useful when you want workflow steps to use a cheaper or faster model. Set to a model alias or full API ID (e.g. <code>haiku</code>). (v2.1.296)</td></tr>
   ```

## Acceptance Criteria
- The env vars table contains a row for `CLAUDE_CODE_WORKFLOW_SUBAGENT_MODEL`.
- The description accurately reflects the changelog entry.
- The (v2.1.296) version tag is present.
