# CBP-241 — Add `/cd` command to Session/context/history slash commands table

## Summary
Claude Code v2.1.169 added a `/cd` slash command that moves a session to a new working directory without breaking the prompt cache mid-session. This is important for users working across multiple directories in a single session — previously changing working directory (via Bash `cd`) could invalidate the prompt cache.

## Assessment
- **`/cd` command:** Not mentioned anywhere in the playbook.
- Best fit: The Cheat Sheet "Session, context & history" slash commands table (around line 9762–9780 in fsad-playbook.html). The table already contains `/recap`, `/rewind`, `/compact`, `/memory`, etc.

## Plan

### Step 1 — Find the Session, context & history table
Location: around line 9762 in fsad-playbook.html.
The table starts with:
```
<p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:1rem;">Session, context &amp; history</p>
```

### Step 2 — Insert `/cd` row
Add a new row after the `/recap` row (line ~9772). Insert before `/rewind`:
```html
<tr><td><code>/cd</code> <code>&lt;path&gt;</code></td><td>Move the session to a new working directory without breaking the prompt cache mid-session</td></tr>
```

## Acceptance Criteria
- `/cd <path>` appears in the Session, context & history slash commands table in the Cheat Sheet
- The description explains it moves the working directory without breaking prompt cache
- Positioned logically within the session management commands group
