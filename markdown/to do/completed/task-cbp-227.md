# CBP-227 — Update `claude agents` row: done/total progress counts + longest-running peek (v2.1.161)

## Summary
Claude Code v2.1.161 added visual progress indicators to `claude agents`: when work is fanned out across subagents, each row now shows `done/total` counts before the detail text. The peek (expanded row) highlights the longest-running item. This helps users monitor parallel multi-agent workloads at a glance without attaching to each session.

## Assessment
The `claude agents` Cheat Sheet row (line ~9735 in current main) covers `--json`, `waitingFor`, dispatch flags, and background shell sessions, but does not mention `done/total` progress counts or the longest-running peek behavior.

**File:** `fsad-playbook.html`
**Location:** Line ~9735 — `<tr><td><code>claude agents</code></td><td>...`

## Plan
Append the done/total and longest-running detail to the end of the existing `claude agents` description.

**Find (end of current description):**
```
CLI equivalent: <code>claude --bg --exec '&lt;command&gt;'</code>.
```

**Replace with:**
```
CLI equivalent: <code>claude --bg --exec '&lt;command&gt;'</code>. When work is fanned out across subagents, each row shows <code>done/total</code> progress counts before the detail; the peek highlights the longest-running item (v2.1.161).
```

## Acceptance Criteria
- [ ] `claude agents` row mentions `done/total` counts when work is fanned out across subagents
- [ ] Row mentions that peek shows longest-running item
- [ ] Version attribution "(v2.1.161)" present
- [ ] Row remains a single `<tr><td>` entry with no broken HTML
