# CBP-292 — Cheat Sheet: `/doctor` upgrade + `/checkup` alias (v2.1.205)

## Summary

Claude Code v2.1.205 upgraded `/doctor` from a passive diagnostics viewer to a **full setup checkup** that can also **diagnose and fix** environment issues. The release also introduced `/checkup` as an alias for `/doctor`.

From the v2.1.205 changelog:
> `/doctor` is now a full setup checkup that can diagnose and fix issues; `/checkup` is its alias

## Assessment

**Current playbook entry (line 9938):**
```
/doctor — Environment diagnostics & health check. Shows an exec-form example hint when a command hook is missing the `command` field. Run for the full skill-listing breakdown (truncation no longer shown as a startup notification).
```

**What needs to change:**
- The description undersells the new capability: it's no longer just a viewer — it can actively fix issues too.
- `/checkup` alias is not mentioned anywhere in the playbook.
- The exec-form hook hint and skill-listing notes should be retained but reframed.

## Plan

1. Read `fsad-playbook.html` around line 9938 (Utility & config table in the Claude Cheat Sheet)
2. Update the `/doctor` row to:
   - Lead with "Full setup checkup" framing
   - Add "diagnoses and fixes environment issues" (the new capability)
   - Keep the exec-form hook hint reference
   - Keep the skill-listing reference
   - Add `Alias: /checkup` note with version tag
3. Mark CBP-292 complete in `todo.md`

## Implementation

**Replace (line 9938):**
```html
<tr><td><code>/doctor</code></td><td>Environment diagnostics &amp; health check. Shows an exec-form example hint when a command hook is missing the <code>command</code> field. Run for the full skill-listing breakdown (truncation no longer shown as a startup notification).</td></tr>
```

**With:**
```html
<tr><td><code>/doctor</code></td><td>Full setup checkup — diagnoses <em>and fixes</em> environment issues. Shows an exec-form example hint when a command hook is missing the <code>command</code> field; lists installed skills and components. Alias: <code>/checkup</code> (v2.1.205).</td></tr>
```

## Acceptance Criteria

- [ ] The `/doctor` row description starts with "Full setup checkup" and mentions fix capability
- [ ] `/checkup` alias is visible in the row with a version tag
- [ ] The exec-form hook hint and skill-listing references are preserved (shortened)
- [ ] No surrounding rows are affected
- [ ] Version bumped to v3.2.15 in title, sidebar, and changelog modal
