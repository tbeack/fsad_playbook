# CBP-632: Expand `--bare` flag description — MCP/system-reminder/background-task scope and timeout behavior (v2.1.286)

## Summary

v2.1.286 changed `--bare` to: connect only the MCP servers named explicitly on the command line, send the model no system reminders, and start no background tasks. It also changed shell command timeout behavior under `--bare` — a command that reaches its timeout now stops instead of moving to the background.

## Assessment

- `src/pages/practices.html`'s CLI flags Cheat Sheet table has a terse `--bare` row (~line 2094: "Minimal mode — skip auto-discovery"). It needs the v2.1.286 specifics so readers know exactly what's restricted.

## Plan

1. In `src/pages/practices.html`, update the `--bare` row (~line 2094) to:
   `<tr><td><code>--bare</code></td><td>Minimal mode — skip auto-discovery of CLAUDE.md, plugins, skills, and hooks. As of v2.1.286, also connects only the MCP servers named explicitly on the command line, sends the model no system reminders, and starts no background tasks; a shell command that reaches its timeout under <code>--bare</code> stops instead of moving to the background (v2.1.286).</td></tr>`

## Acceptance Criteria

- The `--bare` row documents the v2.1.286 MCP/system-reminder/background-task scoping and the changed shell-timeout behavior.
