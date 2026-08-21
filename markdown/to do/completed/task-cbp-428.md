# CBP-428 — [Codex] `codex queue` command

## Source
Codex CLI rust-v0.149.0 release notes: "Added `codex queue` for sending messages to existing local or remote sessions." Related reliability fixes in the same release: "Queued messages now wake idle sessions reliably, resolve duplicate session names more usefully, and preserve pasted or deferred command semantics."

## Summary
`codex queue` is a new top-level CLI command for sending messages to existing local or remote Codex sessions. Two natural homes: the Codex Cheat Sheet's CLI Flags table (same pattern as `codex resume`/`codex archive`/`codex delete`) and the Power Usage Session Management collapsible (which already documents `codex resume`/`archive`/`delete` for existing sessions).

## Assessment
Content does not exist. `id="codex-cheat-sheet"` CLI Flags table (~line 13939-13942) has no `codex queue` row. `id="codex-power-usage"` Session Management collapsible (~line 14080-14115) documents resume/archive/delete but not queueing messages to a session.

## Plan
1. In `fsad-playbook.html`, CLI Flags table (`id="codex-cheat-sheet"`, near line 13940-13942): add a new `<tr>` for `codex queue` — "Send a message to an existing local or remote session without switching into it; reliably wakes idle sessions and resolves duplicate session names (rust-v0.149.0)."
2. In `fsad-playbook.html`, Session Management collapsible code block (`id="codex-power-usage"`, ~line 14088-14112, after the `codex delete` example at line 14108-14109): add a new example command `codex queue <session> "message"` with an explanatory comment, and a sentence in the prose above (around line 14087) noting the new command and its reliability improvements (idle-session wake, duplicate-name resolution, preserved paste/deferred semantics). Tag `(rust-v0.149.0)`.

## Acceptance Criteria
- [ ] `codex queue` row added to the Codex Cheat Sheet CLI Flags table, tagged `(rust-v0.149.0)`.
- [ ] Session Management collapsible documents `codex queue` with an example and its reliability behavior, tagged `(rust-v0.149.0)`.
- [ ] No existing rows/content removed or altered.
