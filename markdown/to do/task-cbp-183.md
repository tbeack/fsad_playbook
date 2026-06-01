# CBP-183 — Add pinned background sessions to `claude agents` cheat sheet row

## Summary

In v2.1.147, `claude agents` gained the ability to pin background sessions via `Ctrl+T`:
- Pinned sessions stay alive when idle (non-pinned can be reaped)
- Pinned sessions are restarted in-place when Claude Code updates are applied
- Under memory pressure, pinned sessions are shed only after non-pinned ones

The playbook's `claude agents` cheat sheet row does not mention `Ctrl+T` or pinned sessions.

The main keyboard shortcut table already lists `Ctrl+T` as "Toggle task list" in the main session context — the Agent View usage is different (pin/unpin a session) and belongs in the `claude agents` row description.

## Assessment

**Existing content:** Line 6328 in the Cheat Sheet (Info & account table):
```html
<tr><td><code>claude agents</code></td><td>Agent View — a unified list of every Claude Code session: running, blocked on you, or done. Use <code>--cwd &lt;path&gt;</code> to scope the list to a directory. Add <code>--json</code> to output the session list as JSON for scripting (tmux-resurrect, status bars, session pickers). When dispatching a background session, configure it with: <code>--add-dir</code>, <code>--settings</code>, <code>--mcp-config</code>, <code>--plugin-dir</code>, <code>--permission-mode</code>, <code>--model</code>, <code>--effort</code>, <code>--dangerously-skip-permissions</code>.</td></tr>
```

**What needs to change:**
Append a sentence about `Ctrl+T` pinning sessions in Agent View.

## Plan

Edit line 6328 of `fsad-playbook.html` — append pin-session info to the existing row:

**Old:**
```
...configure it with: <code>--add-dir</code>, <code>--settings</code>, <code>--mcp-config</code>, <code>--plugin-dir</code>, <code>--permission-mode</code>, <code>--model</code>, <code>--effort</code>, <code>--dangerously-skip-permissions</code>.</td></tr>
```

**New (append before `</td></tr>`):**
```
...configure it with: <code>--add-dir</code>, <code>--settings</code>, <code>--mcp-config</code>, <code>--plugin-dir</code>, <code>--permission-mode</code>, <code>--model</code>, <code>--effort</code>, <code>--dangerously-skip-permissions</code>. In Agent View, press <kbd>Ctrl+T</kbd> to pin a session — pinned sessions stay alive when idle, restart in-place on Claude Code updates, and are shed under memory pressure only after non-pinned sessions.</td></tr>
```

## Acceptance Criteria
- `claude agents` row mentions `Ctrl+T` and pinned session behavior
- Description is clear about what "pinned" means vs non-pinned
