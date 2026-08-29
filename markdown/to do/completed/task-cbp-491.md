# CBP-491 — Document `claude attach` / `logs` / `stop` / `respawn` / `rm` background-session CLI subcommands

## Summary
Claude Code v2.1.251 added `attach`, `logs`, `stop`, `respawn`, and `rm` to `claude --help` as direct CLI subcommands for managing a background session without opening the agent view. The `--resume` message for a running background session now names the exact `claude attach <id>` command instead of a generic hint.

## Assessment
`src/pages/practices.html` Cheat Sheet, "Automation & agents" table (`#cheat-sheet`, ~line 1892-1910) already documents `claude agents` (Agent View) in depth, including the `! <command>` background-launch shortcut and its `claude --bg --exec '<command>'` CLI equivalent (~line 1971). It does not yet mention the standalone `attach`/`logs`/`stop`/`respawn`/`rm` subcommands for managing an already-running background session directly from the shell. No existing row covers this.

## Plan
1. In `src/pages/practices.html`, Cheat Sheet "Automation & agents" table (~line 1892-1910), add a new row immediately after the `claude agents` row (~line 1971):
   ```html
   <tr><td><code>claude attach</code> / <code>logs</code> / <code>stop</code> / <code>respawn</code> / <code>rm</code> <code>&lt;id&gt;</code></td><td>Manage a background session directly from the shell without opening the agent view: attach to its live output, tail its logs, stop it, respawn it, or remove it from the list. As of v2.1.251, the <code>--resume</code> message for a running background session names the exact <code>claude attach &lt;id&gt;</code> command instead of a generic hint.</td></tr>
   ```

## Acceptance Criteria
- [ ] New row documenting `claude attach`/`logs`/`stop`/`respawn`/`rm` added directly after the `claude agents` row in the Cheat Sheet's Automation & agents table.
- [ ] Row mentions the v2.1.251 `--resume` message improvement naming the exact `claude attach <id>` command.
