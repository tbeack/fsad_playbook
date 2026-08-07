# CBP-358 — [Codex] Document persistent thread sections in Session Management

## Source
Codex CLI rust-v0.147.0

## Summary
rust-v0.147.0: "Organize conversations into persistent, manually ordered sections and browse long transcripts incrementally." This extends the thread-picker narrative already being tracked across recent versions (pinning, side conversations, temporary forks — all tagged rust-v0.146.0).

## Assessment
Two locations in `fsad-playbook.html`:
1. Line 13801, Codex Cheat Sheet, `/new` `/clear` row — already mentions pinning threads (rust-v0.146.0).
2. Lines 13993–13994, Power Usage → Session Management collapsible — already documents the redesigned picker, pinning, side conversations, and temporary forks.

## Plan

### Step 1 — Extend the Session Management collapsible paragraph (line 13994)
Append to the existing paragraph, after "...ideal for exploratory side work.":
```html
 As of rust-v0.147.0, you can organize threads into <strong>persistent, manually ordered sections</strong> in the picker, and browse long transcripts <strong>incrementally</strong> instead of loading the full history at once.
```

### Step 2 — Extend the `/new` `/clear` cheat sheet row (line 13801)
```html
<tr><td><code>/new</code> <code>/clear</code></td><td>Start a fresh conversation within the same CLI session (both commands are equivalent). Use the thread picker to <strong>pin</strong> important threads for quick access, and organize them into persistent, manually ordered sections (rust-v0.146.0, extended rust-v0.147.0).</td></tr>
```

## Acceptance Criteria
- Session Management collapsible documents persistent thread sections and incremental transcript browsing (rust-v0.147.0)
- `/new` `/clear` cheat sheet row mentions thread sections
- HTML is valid
