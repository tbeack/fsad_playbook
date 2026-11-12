# CBP-734: Update `codex doctor` row with `--network-only` option (rust-v0.166.0)

## Summary
Codex rust-v0.166.0 added `codex doctor --network-only` for focused configuration, connectivity, and WebSocket diagnostics — a subset of the full `codex doctor` diagnostics.

## Assessment
The playbook documents `codex doctor` in the CLI Commands table at `src/pages/codex.html` line 1057. The current description does not mention `--network-only`. The row needs an update.

## Plan
1. Open `src/pages/codex.html`.
2. Find the `codex doctor` table row at line 1057.
3. Replace the existing `<td>` description to add the new flag:
   - Current: `Run support-ready diagnostics across runtime, auth, terminal, network, config, storage, and local state. Added in v0.131.0; storage diagnostics added in rust-v0.148.0.`
   - New: `Run support-ready diagnostics across runtime, auth, terminal, network, config, storage, and local state. Added in v0.131.0; storage diagnostics added in rust-v0.148.0. Pass <code>--network-only</code> for focused configuration, connectivity, and WebSocket diagnostics (rust-v0.166.0).`

## Acceptance Criteria
- The `codex doctor` row in the built playbook mentions `--network-only` and `rust-v0.166.0`.
- No other rows are changed.
