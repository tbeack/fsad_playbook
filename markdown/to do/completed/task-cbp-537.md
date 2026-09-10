# CBP-537: Add `/worktree` row to the Cheat Sheet slash-commands table

## Source
Codex CLI rust-v0.154.0 release notes: "Experimental worktree support lets you create isolated checkouts for new/forked sessions using `--worktree` or `/worktree`, and browse/resume them."

## Summary
Codex CLI 0.154.0 adds experimental worktree support: a new `/worktree` TUI command (and `--worktree` CLI flag) creates an isolated checkout for a new or forked session, and lets you browse and resume existing worktree sessions. This is a brand-new slash command not currently listed anywhere in the playbook.

## Assessment
`src/pages/codex.html` Cheat Sheet slash-commands table (`#codex-cheat-sheet`, ~line 992-1017) lists all current slash commands (`/fork`, `/agent`, `/vim`, etc.) but has no `/worktree` entry — grep for "worktree" in the file returns no matches. This is a clean **new-section** addition (a new table row).

## Plan
1. Open `src/pages/codex.html`, locate the slash-commands table body in `#codex-cheat-sheet` (~line 1003-1005, near `/import` and `/vim`).
2. Add a new row after `/import` (line 1004) and before `/vim` (line 1005), or immediately after `/fork`-adjacent forking-related rows if a more natural grouping exists — table currently has no strict grouping, so insert near `/import`/`/vim`:
   ```html
   <tr><td><code>/worktree</code></td><td>Create an isolated checkout for a new or forked session (experimental); browse and resume existing worktree sessions. Equivalent to the <code>--worktree</code> CLI flag. (rust-v0.154.0)</td></tr>
   ```
3. Do not touch the CLI Flags table in this task — a separate task may cover `--worktree` if warranted; keep this task scoped to the Cheat Sheet slash-command row only.

## Acceptance Criteria
- [ ] `#codex-cheat-sheet` slash-commands table contains a `/worktree` row describing the experimental worktree feature and citing `(rust-v0.154.0)`.
- [ ] No other content in `src/pages/codex.html` is altered.
- [ ] `python3 scripts/build-source.py` completes without error after the edit.
