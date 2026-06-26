# CBP-269 — Config: `autoMode.classifyAllShell` setting

## Summary
Claude Code v2.1.193 added a new `autoMode.classifyAllShell` setting. When enabled, it routes **all** Bash/PowerShell commands through the auto-mode classifier, not just those that match arbitrary-code-execution patterns. This gives operators finer control over which shell commands require classifier approval in auto mode.

## Assessment
The Notable settings.json Keys callout (around line 8574 in `fsad-playbook.html`) lists settings like `settings.autoMode.hard_deny` and the Auto mode built-in safety blocks. The `autoMode.classifyAllShell` setting is not currently documented anywhere in the playbook. It belongs alongside other `autoMode.*` settings in the Notable settings.json Keys callout.

## Plan
1. Read lines 8585–8597 of `fsad-playbook.html` to confirm surrounding context.
2. Add a new `<li>` for `autoMode.classifyAllShell` after the existing `settings.autoMode.hard_deny` bullet (line 8585) and before the "Auto mode built-in safety blocks" bullet (line 8586).
3. Text: `<code>autoMode.classifyAllShell</code> — Set <code>true</code> to route <strong>all</strong> Bash/PowerShell commands through the auto-mode classifier, not just those matching arbitrary-code-execution patterns. Useful when you want the classifier to evaluate every shell command regardless of how it was categorized (v2.1.193).`

## Acceptance Criteria
- `autoMode.classifyAllShell` appears in the Notable settings.json Keys callout
- Placed adjacent to the `settings.autoMode.hard_deny` bullet for logical grouping
- grep confirms `autoMode.classifyAllShell` appears in the playbook
