# CBP-465 — `/permissions`: Auto mode tab for viewing/editing classifier rules

## Summary
Claude Code v2.1.246 added an Auto mode tab to `/permissions` for viewing and editing auto mode classifier rules directly from the same interactive dialog used for regular allow/deny/ask permission rules.

## Assessment
The `/permissions` Cheat Sheet row (line 11710) documents the mid-turn-opening behavior added in v2.1.234 but has no mention of an Auto mode tab. Auto mode classifier rules (`hard_deny`, etc.) are currently only configurable via `settings.json` per the Notable settings.json Keys callout (line ~10450) — this is the first mention of an in-app UI for them.

## Plan
1. In `fsad-playbook.html`, locate the `/permissions` Cheat Sheet row (line 11710):
   ```html
   <tr><td><code>/permissions</code></td><td>View &amp; edit tool permissions (alias: <code>/allowed-tools</code>). As of v2.1.234 it can be opened while Claude is working — rule changes apply to the rest of the current turn, so you can widen or tighten a rule without interrupting a long run (v2.1.234)</td></tr>
   ```
2. Append a sentence documenting the new Auto mode tab:
   ```html
   <tr><td><code>/permissions</code></td><td>View &amp; edit tool permissions (alias: <code>/allowed-tools</code>). As of v2.1.234 it can be opened while Claude is working — rule changes apply to the rest of the current turn, so you can widen or tighten a rule without interrupting a long run (v2.1.234). As of v2.1.246, an Auto mode tab lets you view and edit auto mode classifier rules from the same dialog, instead of editing them only via <code>settings.json</code>.</td></tr>
   ```

## Acceptance Criteria
- [ ] `/permissions` row documents the v2.1.246 Auto mode tab.
- [ ] Row remains a single well-formed `<tr>`.
