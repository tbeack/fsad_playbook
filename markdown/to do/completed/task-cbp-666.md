# CBP-666 — [Codex] Opt-in cli_daybreak feature and exec --cyber-access-program (rust-v0.161.0)

## Summary
[Codex] Opt-in cli_daybreak feature and exec --cyber-access-program (rust-v0.161.0)

## Source
Codex CLI rust-v0.161.0 (2026-10-07)

## Assessment
Not covered or outdated in src/pages/codex.html.

## Plan
Add a `cli_daybreak` row to the config feature table (after `instant_interrupt`, ~line 1082) and a `codex exec --cyber-access-program` row near the `codex exec fork` row (~line 1052).
Then run `python3 scripts/build-source.py`.

## Acceptance Criteria
- The change appears in src/pages/codex.html with the version tag.
- Build passes.
