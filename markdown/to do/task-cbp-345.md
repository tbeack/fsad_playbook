# CBP-345 — [Claude] Add `/status` row to Cheat Sheet Info & account table

## Source
Claude Code v2.1.221

## Summary
v2.1.221: "`/status` now shows the session kind: `interactive`, or a background job that is `attached` or `unattended`." The playbook's Claude Cheat Sheet has no `/status` row at all (the only `/status` mention in the file is on the unrelated Codex page).

## Assessment
`fsad-playbook.html`, Cheat Sheet → "Info & account" table, lines 11052–11073. No `/status` row exists.

## Plan

### Step 1 — Add a new row
Insert after the `/help` row (line 11057):
```html
<tr><td><code>/status</code></td><td>Show session config and token usage metrics. As of v2.1.221, also displays the session kind: <code>interactive</code>, or a background job that is <code>attached</code> or <code>unattended</code>.</td></tr>
```

## Acceptance Criteria
- `/status` row present in the Info & account table
- Row documents the v2.1.221 session-kind display
- HTML is valid
