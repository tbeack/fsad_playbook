# CBP-620: Add `claude --desktop` flag to Session & Resume Cheat Sheet table (v2.1.285)

## Summary

v2.1.285 added `claude --desktop` to open the Claude desktop app on the current directory, or on a session with `--continue` / `--resume <id>`, instead of starting a terminal session.

## Assessment

- `src/pages/practices.html`'s Cheat Sheet "Session & resume" flags table (~line 2018-2027) lists `--continue`, `--resume`, `--name`, `--fork-session`, `--worktree`, `--tmux`, `--add-dir`. `--desktop` belongs in the same table as a session-launch flag.

## Plan

1. In `src/pages/practices.html`, append a new row after the `--add-dir` row:
   `<tr><td><code>--desktop</code></td><td>Open the Claude desktop app on the current directory, or on a session opened with <code>--continue</code> / <code>--resume &lt;id&gt;</code>, instead of starting the terminal session (v2.1.285)</td></tr>`

## Acceptance Criteria

- The Session & resume flags table documents `--desktop`, version-tagged v2.1.285.
