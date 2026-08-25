# CBP-446 — `/resume`: pagination fix for >50 sessions

## Summary
Claude Code v2.1.243 fixed `/resume` only listing the 50 most recent sessions — the picker now loads more as you scroll.

## Assessment
The Cheat Sheet `/resume` row (line 10978) has an extensive existing version-note chain (v2.1.212 and others). This is a direct continuation.

## Plan
1. In `fsad-playbook.html`, locate the `/resume` Cheat Sheet row (line 10978) and append to the end of its `<td>` (before `</td></tr>`):
   ```html
    As of v2.1.243, the picker is no longer capped at the 50 most recent sessions — it loads more as you scroll.
   ```

## Acceptance Criteria
- [ ] `/resume` row documents the v2.1.243 pagination fix.
- [ ] Row remains a single well-formed `<tr>`.
