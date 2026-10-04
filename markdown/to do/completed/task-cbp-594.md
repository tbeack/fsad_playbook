# CBP-594 — Add /daemon cheat sheet row + --no-daemon CLI flag (rust-v0.156.0)

## Summary

In rust-v0.156.0, Codex added a `/daemon` slash command to update the local background server from within the TUI, and a `--no-daemon` CLI flag to bypass the daemon entirely.

## Assessment

Neither `/daemon` nor `--no-daemon` is present in `src/pages/codex.html`.

Two additions needed:

1. **New `/daemon` row** in the Slash Commands table. Best placement: after `/statusline` (line 1009) as it relates to the background server/TUI setup.

2. **New `--no-daemon` row** in the CLI Flags table. Best placement: after `codex remote-control` (line 1043) since that row already covers the daemon.

## Plan

### Edit 1 — Insert /daemon row after /statusline (line 1009)

Add after line 1009:
```html
          <tr><td><code>/daemon</code></td><td>Update the local background server from within the TUI. Use the <code>--no-daemon</code> CLI flag at startup to bypass the daemon entirely. (rust-v0.156.0)</td></tr>
```

### Edit 2 — Insert --no-daemon row after codex remote-control (line 1043)

Add after line 1043:
```html
          <tr><td><code>--no-daemon</code></td><td>Bypass the local background server and run without a daemon process. Useful for environments where the daemon is not desired or when troubleshooting daemon issues. (rust-v0.156.0)</td></tr>
```

## Acceptance Criteria

- A `/daemon` row is present in the Slash Commands table.
- A `--no-daemon` row is present in the CLI Flags table.
- Both mention rust-v0.156.0.
