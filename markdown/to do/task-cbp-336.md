# CBP-336 — [Codex] Update `/new` cheat sheet row: `/clear` alias + thread pinning + side conversations; update Session Management collapsible

## Source
Codex rust-v0.146.0

## Summary
Codex rust-v0.146.0 adds:
- `/clear` as an alias for `/new` (name new sessions with either command)
- Thread **pinning** — pin important threads so they're easy to find
- **Side conversations** — switch between side conversations without closing them

## Assessment
In `fsad-playbook.html`:
- **Cheat Sheet** (line 12904): `/new` row reads: `Start a fresh conversation within the same CLI session`
  - Needs: add `/clear` as alias; mention pinning
- **Session Management** collapsible (line 13097–13124): describes resume/fork/archive/delete
  - Needs: add a sentence about pinning threads and side conversations

## Plan

### Step 1 — Update `/new` row in Codex Cheat Sheet (line 12904)
Old:
```html
<tr><td><code>/new</code></td><td>Start a fresh conversation within the same CLI session</td></tr>
```
New (add `/clear` alias, mention pinning):
```html
<tr><td><code>/new</code> <code>/clear</code></td><td>Start a fresh conversation within the same CLI session (both commands are equivalent). Use the thread picker to <strong>pin</strong> important threads for quick access (rust-v0.146.0).</td></tr>
```

### Step 2 — Add side conversations note to `/side` row (line 12903)
The `/side` row currently reads: `Open an ephemeral branch for a focused follow-up; doesn't pollute main context`
Update to mention you can switch between side conversations without closing them:
```html
<tr><td><code>/side</code></td><td>Open an ephemeral branch for a focused follow-up; doesn't pollute main context. Switch between open side conversations without closing them (rust-v0.146.0).</td></tr>
```

### Step 3 — Update Session Management collapsible (line 13097)
Append to the opening paragraph a note about pinning and side conversations.

## Acceptance Criteria
- `/new` row shows `/clear` alias
- `/new` row mentions thread pinning
- `/side` row mentions switching between side conversations without closing
- Session Management collapsible intro mentions pinning
