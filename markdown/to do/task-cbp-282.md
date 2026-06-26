# CBP-282 — Add `autoMode.classifyAllShell` to Notable settings.json Keys callout (v2.1.193)

## Summary
Claude Code v2.1.193 added a new `autoMode.classifyAllShell` setting. When set to `true`, it routes all Bash/PowerShell commands (not just arbitrary-code-execution patterns) through the auto-mode classifier before running. This gives teams tighter control over what Claude executes automatically.

## Assessment
The Notable settings.json Keys callout lives around line 8674–8685 in `fsad-playbook.html`. The existing `settings.autoMode.hard_deny` and "Auto mode built-in safety blocks" bullets already document auto-mode behaviour. The new `autoMode.classifyAllShell` setting should be added as a bullet right after the "Auto mode built-in safety blocks" bullet (line 8675), grouped with the other autoMode settings.

## Plan
1. Read lines 8674–8686 of `fsad-playbook.html` to confirm context.
2. Insert a new `<li>` bullet after line 8675 (after the "Auto mode built-in safety blocks" bullet):
   ```html
   <li style="margin-bottom:0.4rem;"><code>autoMode.classifyAllShell</code> — When set to <code>true</code>, routes all Bash/PowerShell commands through the auto-mode classifier, not just arbitrary-code-execution patterns. Use to tighten auto-mode coverage so every shell command is evaluated — at the cost of more classification overhead (v2.1.193).</li>
   ```
3. Mark CBP-282 complete in `todo.md`.

## Acceptance Criteria
- A new bullet for `autoMode.classifyAllShell` appears in the Notable settings.json Keys callout, grouped with the other autoMode entries.
- Describes the setting accurately: routes all shell commands through the classifier, notes the tradeoff.
- Version tag `(v2.1.193)` is present.
