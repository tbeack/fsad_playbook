# CBP-592 — Add `/tui` cheat sheet row (rust-v0.156.0)

## Summary

In rust-v0.156.0, Codex added a `/tui` slash command to switch to an optional fullscreen TUI mode. Features include transcript search, mouse selection, and right-click copying.

## Assessment

The `/tui` command is not present anywhere in `src/pages/codex.html`. A new row is needed in the Slash Commands table (lines 1000–1019).

The best place to insert it is after the `/worktree` row (line 1005) and before `/voice` (line 1006) — these are all TUI-related navigation commands.

## Plan

### Edit — Insert `/tui` row after `/worktree` (after line 1005)

Add after line 1005:
```html
          <tr><td><code>/tui</code></td><td>Switch to the optional fullscreen TUI for your next launch. The fullscreen mode adds transcript search, mouse-based text selection, and right-click copying. (rust-v0.156.0)</td></tr>
```

## Acceptance Criteria

- A `/tui` row is present in the Slash Commands table.
- The description mentions fullscreen UI, transcript search, mouse selection, and right-click copying.
- The row is placed near other TUI-related commands (`/worktree`, `/voice`).
