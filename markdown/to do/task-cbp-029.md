# CBP-029 — Add /proactive as alias for /loop

## Source
Claude Code v2.1.105: "`/proactive` is now an alias for `/loop`"

## Summary
The Cheat Sheet automation table (line 3795) shows `/loop` but does not mention `/proactive` as an alias. The `/loop` collapsible section heading (line 4295) also doesn't reference the alias.

## Assessment
Content exists and is incomplete. Two minor additions needed.

## Plan

### Edit 1 — Cheat Sheet automation table (line 3795)
Current:
```html
<tr><td><code>/loop</code> <code>[interval] &lt;prompt&gt;</code></td><td>Run prompt on recurring interval (e.g. <code>/loop 5m check tests</code>)</td></tr>
```
Change to:
```html
<tr><td><code>/loop</code> <code>[interval] &lt;prompt&gt;</code></td><td>Run prompt on recurring interval (e.g. <code>/loop 5m check tests</code>). Alias: <code>/proactive</code></td></tr>
```

### Edit 2 — /loop collapsible heading (line 4295)
Current:
```html
<h3>/loop — Built-in Scheduler</h3>
```
Change to:
```html
<h3>/loop — Built-in Scheduler <span style="font-weight:400; font-size:0.85em; color:var(--text-secondary);">(alias: /proactive)</span></h3>
```

## Acceptance Criteria
- [ ] Cheat Sheet /loop row mentions /proactive alias
- [ ] /loop collapsible header shows alias
