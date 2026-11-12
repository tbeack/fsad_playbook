# CBP-733: Update `codex queue` row with `--resume` option (rust-v0.166.0)

## Summary
Codex rust-v0.166.0 added `codex queue --resume` to resume unloaded threads after queueing a message. This lets a headless workflow both send a message and resume the thread in one command.

## Assessment
The playbook documents `codex queue` in the CLI Commands table at `src/pages/codex.html` line 1059. The current description does not mention `--resume`. The row needs an update.

## Plan
1. Open `src/pages/codex.html`.
2. Find the `codex queue` table row at line 1059.
3. Replace the existing `<td>` description to add the new flag:
   - Current: `Send a message to an existing local or remote session without switching into it; reliably wakes idle sessions and resolves duplicate session names (rust-v0.149.0).`
   - New: `Send a message to an existing local or remote session without switching into it; reliably wakes idle sessions and resolves duplicate session names (rust-v0.149.0). Pass <code>--resume</code> to also resume an unloaded thread after queueing the message (rust-v0.166.0).`

## Acceptance Criteria
- The `codex queue` row in the built playbook mentions `--resume` and `rust-v0.166.0`.
- No other rows are changed.
