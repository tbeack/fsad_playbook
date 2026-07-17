# CBP-310 — Add /fork and /subtask to Automation & agents cheat sheet table (v2.1.212)

## Summary
Claude Code v2.1.212 changed `/fork` behavior: it now copies the current conversation into a new background session (visible as its own row in `claude agents`) while the user keeps working. The old in-session subagent launch behavior is now `/subtask`. Neither command currently appears in the Claude Code Automation & agents cheat sheet table.

## Source
Claude Code v2.1.212 changelog entry:
> `/fork` now copies your conversation into a new background session (its own row in `claude agents`) while you keep working; the in-session subagent it used to launch is now `/subtask`

## Assessment
- The Automation & agents table (line 9913–9929 of fsad-playbook.html) does not contain `/fork` or `/subtask` rows.
- Both are new additions to the table.

## Plan
1. Read fsad-playbook.html around line 9913–9929 (Automation & agents table).
2. Insert two new rows after the `/dataviz` row (line 9926), before `</tbody>`:
   - `/fork` — Copies the current conversation into a new background session (own row in `claude agents`) while you keep working in the original (v2.1.212)
   - `/subtask` — Launch an in-session subagent (former `/fork` behavior) (v2.1.212)

### Target location
After line 9926:
```html
<tr><td><code>/dataviz</code></td><td>Chart and dashboard design guidance...</td></tr>
```
Insert:
```html
<tr><td><code>/fork</code></td><td>Copy the current conversation into a new background session (own row in <code>claude agents</code>) while you keep working in the original. The former in-session subagent behavior is now <code>/subtask</code> (v2.1.212).</td></tr>
<tr><td><code>/subtask</code></td><td>Launch an in-session subagent with its own context window — the former <code>/fork</code> behavior (v2.1.212).</td></tr>
```

## Acceptance Criteria
- `/fork` appears in the Automation & agents table with correct description
- `/subtask` appears in the Automation & agents table with correct description
- HTML renders correctly in browser
