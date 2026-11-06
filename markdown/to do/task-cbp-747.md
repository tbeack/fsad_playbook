# CBP-747 — Update `codex agents` row and agent management paragraph (rust-v0.167.0)

## Summary
In Codex rust-v0.167.0, `codex agents` gained a `--no-daemon` flag that opens the command center without starting a daemon. The session picker and command center now mark unread results. The existing row and agent management paragraph need to reflect these additions.

## Assessment
Two locations to update:

1. `src/pages/codex.html` line 1058 — the `codex agents` table row:
   ```html
   <tr><td><code>codex agents</code></td><td>Open an interactive dashboard to search, start, open, rename, and stop tasks, with configurable shortcuts (rust-v0.149.0).</td></tr>
   ```
   Add: `--no-daemon` flag info and unread results marking.

2. `src/pages/codex.html` line 1160 — the agent management paragraph:
   ```
   <p style="margin-top:1rem;"><strong>Interactive dashboard (rust-v0.149.0):</strong> Run <code>codex agents</code> to open an interactive dashboard for day-to-day management...
   ```
   Add: mention of `--no-daemon` and unread results.

## Plan
1. Open `src/pages/codex.html`.
2. Update the `codex agents` table row to append the new flag info.
3. Update the agent management paragraph to append the new information.

Updated table row:
```html
<tr><td><code>codex agents</code></td><td>Open an interactive dashboard to search, start, open, rename, and stop tasks, with configurable shortcuts (rust-v0.149.0). As of rust-v0.167.0, pass <code>--no-daemon</code> to open the command center without starting a background daemon; the command center and session picker now mark unread results.</td></tr>
```

Updated paragraph — append sentence before closing `</p>`:
```
 As of rust-v0.167.0, run <code>codex agents --no-daemon</code> to open the command center without starting a background daemon; both the command center and the session picker now mark unread results so you can spot new activity at a glance.
```

## Acceptance Criteria
- `codex agents` row mentions `--no-daemon` and unread results, with rust-v0.167.0 version tag.
- Agent management paragraph includes the same information.
- No other rows or paragraphs are affected.
