# CBP-447 — Hooks: `if` condition command-substitution false-fire fix

## Summary
Claude Code v2.1.243 fixed hook `if` conditions like `Bash(cat *)` firing on unrelated Bash commands when the command contained `$()` or backtick command substitution followed by more arguments.

## Assessment
The Hooks deep-dive "Configuration" collapsible (`#hooks-deep-dive--configuration`, lines 12104+) documents the `if` field's `Bash(git *)` / `Bash(rm *)` style patterns (lines ~12157–12163) and already carries a similarly-scoped version-stamped caveat for path-scoping (v2.1.214, line ~12167). A parallel caveat noting this false-positive fix fits the same pattern.

## Plan
1. In `fsad-playbook.html`, locate the path-scoping caveat paragraph in `#hooks-deep-dive--configuration` (line ~12167):
   ```html
   <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.5rem;"><strong>Path-scoping (v2.1.214):</strong> ... this scoping applies only to hook <code>if:</code> conditions.</p>
   ```
2. Add a new paragraph immediately after it, before the "Environment variables available in hooks" heading:
   ```html
   <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.5rem;"><strong>Command-substitution false-fires fixed (v2.1.243):</strong> Earlier versions could false-fire an <code>if</code> condition like <code>"Bash(cat *)"</code> on an unrelated command if it contained <code>$()</code> or backtick command substitution followed by more arguments. This is fixed as of v2.1.243 — such conditions now match only the intended command.</p>
   ```

## Acceptance Criteria
- [ ] New caveat paragraph added directly after the path-scoping note, before the environment-variables table.
- [ ] Version tag v2.1.243 present.
- [ ] No unclosed `<p>` tags; matches surrounding paragraph style exactly.
