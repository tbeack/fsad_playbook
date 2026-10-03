# CBP-593 — Update /worktree row + collapsible — no longer experimental (rust-v0.156.0)

## Summary

In rust-v0.156.0, worktree support is enabled by default (no longer experimental). The agent command center also gained the ability to filter tasks by status and create worktree sessions directly from it.

## Assessment

Two locations need updating in `src/pages/codex.html`:

1. **Cheat Sheet `/worktree` row (line 1005):** Currently says "(experimental)". Remove this qualifier and add a note that worktree is now enabled by default as of rust-v0.156.0, and that you can create worktree sessions from the agent command center.

2. **Worktree Sessions collapsible (line 1174):** Currently says "Codex supports **experimental worktree sessions**". Update to remove experimental qualifier, note that worktree is now default, and add mention of filtering tasks by status in the agent command center.

## Plan

### Edit 1 — Cheat Sheet `/worktree` row (line 1005)

Replace:
```
Create an isolated checkout for a new or forked session (experimental); browse and resume existing worktree sessions. Equivalent to the <code>--worktree</code> CLI flag. (rust-v0.154.0) As of rust-v0.155.0, the worktree browser shows ownership details for each worktree, and deleting a clean, managed worktree asks for confirmation first.
```
With:
```
Create an isolated checkout for a new or forked session; browse and resume existing worktree sessions. Equivalent to the <code>--worktree</code> CLI flag. (rust-v0.154.0) As of rust-v0.155.0, the worktree browser shows ownership details for each worktree, and deleting a clean, managed worktree asks for confirmation first. As of rust-v0.156.0, worktree support is enabled by default and you can create worktree sessions directly from the agent command center, which also supports filtering tasks by status.
```

### Edit 2 — Worktree Sessions collapsible (line 1174)

Replace:
```
As of rust-v0.154.0, Codex supports <strong>experimental worktree sessions</strong> — starting a new or forked session with <code>--worktree</code> or <code>/worktree</code> creates an isolated git worktree checkout for that session, so it can make changes without touching your main working directory. Use <code>/worktree</code> to browse and resume existing worktree sessions from the TUI. As of rust-v0.155.0, the worktree browser shows ownership details for each worktree, and deleting a clean, managed worktree asks for confirmation first.
```
With:
```
As of rust-v0.154.0, Codex supports <strong>worktree sessions</strong> — starting a new or forked session with <code>--worktree</code> or <code>/worktree</code> creates an isolated git worktree checkout for that session, so it can make changes without touching your main working directory. Use <code>/worktree</code> to browse and resume existing worktree sessions from the TUI. As of rust-v0.155.0, the worktree browser shows ownership details for each worktree, and deleting a clean, managed worktree asks for confirmation first. As of rust-v0.156.0, worktree support is <strong>enabled by default</strong> — no experimental flag needed. The agent command center (<code>codex agents</code>) can now create worktree sessions directly and supports filtering tasks by status.
```

## Acceptance Criteria

- The `/worktree` cheat sheet row no longer says "(experimental)".
- The Worktree Sessions collapsible no longer says "experimental worktree sessions".
- Both locations mention rust-v0.156.0 and "enabled by default".
- Agent command center task filtering by status is mentioned.
