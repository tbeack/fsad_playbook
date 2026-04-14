# CBP-028 — Document PreCompact hook blocking behavior

## Source
Claude Code v2.1.105: "Added PreCompact hook support: hooks can now block compaction by exiting with code 2 or returning `{"decision":"block"}`"

## Summary
The hooks section documents the PreCompact event in the event table (line 4020) but does not explain that PreCompact hooks can block context compaction. The Exit Codes table (line 4710) lists exit code 2 as "blocks tool call, rejects prompt, or prevents stop" but doesn't mention blocking compaction.

Two locations need updates:

1. **Exit Codes table** (line 4710): Add "or blocks compaction (PreCompact)" to the exit code 2 description
2. **PreCompact permission decisions callout**: Add a note after the PreToolUse permission decisions table explaining PreCompact blocking

## Assessment
Content exists but is incomplete. Two surgical edits.

## Plan

### Edit 1 — Exit Codes table (line 4710)
Change:
```
blocks tool call, rejects prompt, or prevents stop (depending on event)
```
To:
```
blocks tool call, rejects prompt, prevents stop, or blocks compaction (depending on event)
```

### Edit 2 — After PreToolUse permission decisions section (after line 4733)
Add a new paragraph below the "When multiple hooks fire..." line:

```html
<p style="font-size:0.85rem; color:var(--text-secondary); margin-top:1.25rem; margin-bottom:0.5rem;"><strong>PreCompact blocking</strong> — prevent compaction from running:</p>
<div class="table-wrap" style="margin-top:0.5rem;">
  <table class="styled-table">
    <thead><tr><th>Method</th><th>Effect</th></tr></thead>
    <tbody>
      <tr><td>Exit with code <code>2</code></td><td>Block compaction; stderr shown as reason</td></tr>
      <tr><td>Return <code>{"decision":"block"}</code></td><td>Block compaction via JSON decision output</td></tr>
    </tbody>
  </table>
</div>
```

## Acceptance Criteria
- [ ] Exit code 2 description mentions blocking compaction
- [ ] PreCompact blocking section appears in Exit Codes & Decision Control collapsible
- [ ] Both methods (exit 2 and JSON decision) are documented
