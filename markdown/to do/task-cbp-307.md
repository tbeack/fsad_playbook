# CBP-307 — CLI Flags: Add `--forward-subagent-text` to Print/programmatic mode table

## Summary

Claude Code v2.1.211 added a new CLI flag `--forward-subagent-text` (and equivalent env var `CLAUDE_CODE_FORWARD_SUBAGENT_TEXT`) that causes subagent text output and thinking to be included in the stream-json output format. This is relevant to users building automated pipelines that process Claude Code's machine-readable output and want visibility into what subagents are doing.

## Assessment

The playbook has a "Print / programmatic mode" CLI flags table in the Claude Best Practices Cheat Sheet section (around line 10040–10055). It already lists `--output-format stream-json` (line 10048). The new `--forward-subagent-text` flag is a direct companion to stream-json mode and is not currently documented.

**Status:** New content — not in playbook.

## Plan

1. Read lines 10040–10055 of `fsad-playbook.html` to confirm the exact table structure.
2. Add a new `<tr>` row after the `--output-format stream-json` row (line 10048), before `--json-schema`:
   ```html
   <tr><td><code>--forward-subagent-text</code></td><td>Include subagent text and thinking in stream-json output. Env var: <code>CLAUDE_CODE_FORWARD_SUBAGENT_TEXT=1</code> (v2.1.211).</td></tr>
   ```

## Acceptance Criteria

- [ ] `--forward-subagent-text` appears as a new row in the "Print / programmatic mode" flags table
- [ ] Row appears after `--output-format stream-json` and before `--json-schema`
- [ ] Description includes the env var equivalent and version tag
- [ ] No surrounding HTML is disturbed
