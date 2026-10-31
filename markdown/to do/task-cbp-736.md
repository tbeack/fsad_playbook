# CBP-736: Add `CLAUDE_CODE_DISABLE_ULTRATHINK` env var (v2.1.316)

## Summary
Claude Code v2.1.316 added `CLAUDE_CODE_DISABLE_ULTRATHINK`, which turns the `ultrathink` keyword off entirely.

## Assessment
The playbook documents the `ultrathink` keyword shortcut in two places in `src/pages/practices.html`: the Model & Effort code example (~line 1662-1673, including the v2.1.311 rainbow-highlight note), and the env var reference table's cluster of `CLAUDE_CODE_DISABLE_*` toggles (~lines 2769-2792, e.g. `CLAUDE_CODE_DISABLE_MOUSE_CLICKS`, `CLAUDE_CODE_DISABLE_BG_SHELL_PRESSURE_REAP`). The new opt-out var belongs in both spots: a short note after the existing rainbow-highlight callout, and a new row in the `CLAUDE_CODE_DISABLE_*` table cluster.

## Plan
1. Open `src/pages/practices.html`.
2. Immediately after the existing v2.1.311 rainbow-highlight callout paragraph (the one starting "As of v2.1.311, the `ultrathink` rainbow highlight appears only where..."), add a new paragraph:
   ```html
   <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.5rem;">Set <code>CLAUDE_CODE_DISABLE_ULTRATHINK=1</code> to turn the keyword off entirely — typing "ultrathink" in a prompt no longer raises effort or shows the rainbow highlight. Use this where effort should be controlled only via <code>/effort</code> or <code>--effort</code>, not by prompt text (v2.1.316).</p>
   ```
3. In the env var reference table, add a row near the other `CLAUDE_CODE_DISABLE_*` toggles (e.g. directly after the `CLAUDE_CODE_DISABLE_MOUSE_CLICKS` row):
   ```html
   <tr><td><code>CLAUDE_CODE_DISABLE_ULTRATHINK=1</code></td><td>Turns off the <code>ultrathink</code> keyword shortcut entirely — typing it in a prompt no longer raises effort to <code>xhigh</code> or shows the rainbow highlight. Use where effort should be controlled only via <code>/effort</code> or <code>--effort</code>, not by prompt text (v2.1.316).</td></tr>
   ```
4. No other files require changes for this task.

## Acceptance Criteria
- `CLAUDE_CODE_DISABLE_ULTRATHINK` appears both as an inline note under the ultrathink code example and as a row in the env var reference table.
- HTML is valid (no unclosed tags).
