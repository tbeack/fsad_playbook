# CBP-427 — [Codex] `/cd`, `/pwd`, `/cwd` TUI working-directory commands

## Source
Codex CLI rust-v0.149.0 release notes: "Added `/cd`, `/pwd`, and `/cwd` commands for managing the working directory in TUI sessions."

## Summary
Three new TUI slash commands manage the working directory in Codex sessions: `/cd` (change), `/pwd` and `/cwd` (show current). The Codex Cheat Sheet's Slash Commands table (`id="codex-cheat-sheet"`, ~line 13880-13918) is exhaustive and versioned but has no rows for these.

## Assessment
Content does not exist. Note: Claude Code's Cheat Sheet already has an analogous `/cd <path>` row (line 10979) for reference/consistency of phrasing, but this is a separate Codex-page table.

## Plan
1. In `fsad-playbook.html`, Slash Commands table (`id="codex-cheat-sheet"`, insert after the `/diff` row at line 13894 or near `/init`/session-management rows — pick a logical spot near other session/workspace commands): add three new `<tr>` rows:
   - `/cd <path>` — "Change the session's working directory (rust-v0.149.0)."
   - `/pwd` — "Print the session's current working directory (rust-v0.149.0)."
   - `/cwd` — "Alias for `/pwd` (rust-v0.149.0)." (verify from source whether `/cwd` is a synonym or distinct; if unclear, describe both `/pwd` and `/cwd` as showing the current working directory)
2. Match the existing table's `<code>` command + description cell format.

## Acceptance Criteria
- [ ] `/cd`, `/pwd`, `/cwd` rows added to the Codex Cheat Sheet Slash Commands table, each tagged `(rust-v0.149.0)`.
- [ ] No existing rows removed or altered.
