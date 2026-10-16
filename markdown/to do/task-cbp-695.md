# CBP-695 — [Codex] Update `features.cli_daybreak` row: Daybreak default-on (rust-v0.163.0)

## Summary
Codex rust-v0.163.0 enabled Daybreak by default for eligible accounts. Previously, `features.cli_daybreak` required explicit opt-in (`features.cli_daybreak=true` or `--enable cli_daybreak`). Now Daybreak is active by default for eligible accounts.

## Assessment
The `features.cli_daybreak` row in `src/pages/codex.html` at line 1085 currently shows `false` as the default and describes it as opt-in only. The default column and description need to be updated to reflect the new default-on behavior for eligible accounts. Non-eligible accounts are unaffected.

## Plan
1. Read `src/pages/codex.html` around line 1085.
2. Update the `features.cli_daybreak` row:
   - Change the description to note Daybreak is now enabled by default for eligible accounts as of rust-v0.163.0.
   - Update the default column from `false` to `true (eligible accounts)` or equivalent.
   - Keep the note that `codex exec` can also select it with an OpenAI API key when the server offers access.
   - Keep the existing opt-in routing requirements (eligible ChatGPT sign-in, OpenAI provider, model/program support).

## Acceptance Criteria
- The `features.cli_daybreak` row reflects the default-on behavior for eligible accounts.
- The description mentions rust-v0.163.0 as the version when this changed.
- No other configuration rows are altered.
