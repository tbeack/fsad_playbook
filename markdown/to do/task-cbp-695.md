# CBP-695 — Update `features.cli_daybreak` default to `true` (rust-v0.163.0)

## Summary
Codex rust-v0.163.0 enables Daybreak by default for eligible accounts. The `features.cli_daybreak` config row previously documented a default of `false`. It now defaults to `true` for eligible accounts (requires an eligible ChatGPT sign-in, the OpenAI provider, and model/program support).

## Assessment
The `features.cli_daybreak` row in the config reference table (line 1085) currently states the default as `false` and describes it as an opt-in feature. The description needs updating to reflect that:
1. Daybreak is enabled by default for eligible accounts as of rust-v0.163.0.
2. Set `features.cli_daybreak=false` to opt out.
3. `codex exec` can also select Daybreak with an OpenAI API key when the server offers access.

File: `src/pages/codex.html`

## Plan
1. Read `src/pages/codex.html` line 1085 to confirm exact row HTML.
2. Update the description cell to say Daybreak is enabled by default for eligible accounts as of rust-v0.163.0, and update the default value cell from `false` to `true (eligible accounts)`.
3. Note that `codex exec` also supports Daybreak selection with an OpenAI API key.

## Acceptance Criteria
- `features.cli_daybreak` default column shows `true (eligible accounts)`.
- Description notes rust-v0.163.0 default-on change.
- Build passes without errors.
