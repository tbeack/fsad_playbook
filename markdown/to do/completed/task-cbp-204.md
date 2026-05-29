# CBP-204 — Update `claude agents` Cheat Sheet row: add `! <command>` and `--bg --exec` (v2.1.154)

## Summary

v2.1.154 added two new ways to run shell commands as background sessions from `claude agents`:
- Type `! <command>` in the agents dispatch input to run a shell command as a background session you can attach to and detach from.
- `claude --bg --exec '<command>'` is the CLI equivalent.

## Assessment

**File:** `fsad-playbook.html`  
**Line:** 9159 — the `claude agents` row  
**Current text ends with:** `..., --effort, --dangerously-skip-permissions.`  
**Change needed:** Append information about `! <command>` and `claude --bg --exec '<command>'`.

## Plan

1. Locate the `claude agents` row at line 9159.
2. Append to the description: ` In the agents view, type <code>! &lt;command&gt;</code> to launch any shell command as a background session you can attach to and detach from. CLI equivalent: <code>claude --bg --exec '&lt;command&gt;'</code>.`
3. Mark task complete in `todo.md`.

## Acceptance Criteria

- The `claude agents` Cheat Sheet row mentions `! <command>` for running shell commands as background sessions.
- The CLI flag `claude --bg --exec '<command>'` is also documented.
