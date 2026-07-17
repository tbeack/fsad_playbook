# CBP-279 — Update `/rewind` Cheat Sheet row for resume-from-before-clear (v2.1.191)

## Summary

Claude Code v2.1.191 added `/rewind` support for resuming a conversation from before `/clear` was run. The existing `/rewind` row describes it as a checkpoint rewind with "Summarize up to here" functionality, but does not mention the new ability to recover the session state that existed before a `/clear` command was executed.

## Assessment

Current `/rewind` row (line 9878 of `fsad-playbook.html`):
```
<tr><td><code>/rewind</code></td><td>Rewind to previous checkpoint (aliases: <code>/undo</code>, <code>/checkpoint</code>). The Rewind menu also offers <strong>Summarize up to here</strong> — compress earlier context while preserving recent turns, without rolling back state.</td></tr>
```

Content exists but is outdated — it doesn't mention the `/clear` recovery capability.

## Plan

Update the `<td>` description of the `/rewind` row to append the `/clear` recovery note.

**New text:**
```
Rewind to previous checkpoint (aliases: <code>/undo</code>, <code>/checkpoint</code>). The Rewind menu also offers <strong>Summarize up to here</strong> — compress earlier context while preserving recent turns, without rolling back state. As of v2.1.191, the Rewind menu also lets you resume from before a <code>/clear</code> was run, recovering the conversation state that existed before the context was cleared.
```

**File:** `fsad-playbook.html`, line 9878
**Pattern:** Edit the `<td>` content of the `/rewind` row in the session/context/history table.

## Acceptance Criteria

- [ ] `/rewind` Cheat Sheet row mentions resume-from-before-/clear capability
- [ ] Description accurately describes the feature as a Rewind menu option
- [ ] Version attribution (v2.1.191) is included
- [ ] No HTML structure broken
