# CBP-255 — Add `Tool(param:value)` permission rule syntax to Notable settings.json Keys callout

## Summary

Claude Code v2.1.178 added a new `Tool(param:value)` syntax for permission rules. This lets you match a tool's input parameters (with `*` wildcard support) rather than just the tool name. The primary example from the changelog is `Agent(model:opus)` to block Opus subagents. This is a significant permissions authoring capability that isn't documented in the playbook.

## Assessment

The playbook already covers some permission rule patterns:
- Line 9127: `allowed-tools` frontmatter row mentions `Bash(grep:*)` and `Bash(git *)` patterns
- Lines 10881–10884: Hook `if` condition examples show `Bash(rm *)`, `Edit(*.ts)`, etc.
- Lines 8586: Deny rule glob patterns are documented in the Notable settings.json Keys callout

However, the general `Tool(param:value)` pattern — matching by **input parameter value** rather than just the command/path glob — is not documented anywhere. This is distinct from the existing `Bash(grep:*)` pattern (which matches the command string); the new syntax matches tool input parameters generically.

The best place to add this is the Notable settings.json Keys callout (line ~8586), as a new bullet point after the existing deny rule glob patterns bullet.

## Plan

1. Read lines 8584–8594 of `fsad-playbook.html` to confirm the exact text
2. Add a new `<li>` bullet after the deny rule glob patterns bullet (after line 8586) with text describing the `Tool(param:value)` syntax
3. The bullet should explain: matches a tool's input parameters, supports `*` wildcard, example `Agent(model:opus)` blocks Opus subagents

## Acceptance Criteria

- A new bullet in the Notable settings.json Keys callout documents `Tool(param:value)` syntax
- The bullet includes the `Agent(model:opus)` example from the changelog
- No existing content is changed
