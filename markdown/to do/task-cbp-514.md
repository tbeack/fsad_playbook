# CBP-514 — Add `tui.auto_recap` Config Row to Codex Config Reference

## Source
Codex rust-v0.153.0

## Summary
Codex rust-v0.153.0 adds a config.toml setting `tui.auto_recap = false` that disables automatic recaps while keeping the manual `/recap` command available. Previously automatic recaps could not be disabled separately from the `/recap` command.

## Assessment
The config.toml reference table in `src/pages/codex.html` (lines 1054–1073) lists model, reasoning, vim_mode, approval_policy, sandbox_mode, etc. A `[tui]` section setting does not exist in this table. `tui.auto_recap` is a new addition.

## Plan
1. Read `src/pages/codex.html` around lines 1069–1072
2. Add a new row after `tools.update_plan.enabled` and before `[otel]`:
   ```html
   <tr><td><code>tui.auto_recap</code></td><td>Set to <code>false</code> to disable automatic recaps — the manual <code>/recap</code> command remains available (rust-v0.153.0)</td><td><code>true</code></td></tr>
   ```

## Acceptance Criteria
- New row appears in the config.toml table
- Version attribution `rust-v0.153.0` included
- HTML is valid
