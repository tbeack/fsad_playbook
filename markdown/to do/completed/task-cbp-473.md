# CBP-473 — Document `spinnerTipsOverride` in Notable settings.json Keys

## Summary
Claude Code v2.1.247 added `{id, text, cooldownSessions, priority}` entries, a `tipsFile`, and a `label` field to `spinnerTipsOverride`, so organizations can rotate their own spinner tips alongside the built-in ones.

## Assessment
`spinnerTipsOverride` was never previously documented in the playbook (grep across `src/` returns no matches), so this is a first-time entry, not an update to existing text. It fits the established granular settings.json-key documentation pattern used for dozens of similar org-customization keys in the same callout.

## Plan
1. In `src/pages/practices.html`, append a new bullet to the "Notable settings.json Keys" callout (end of the list, ~line 650):
   ```html
   <li style="margin-bottom:0;"><code>spinnerTipsOverride</code> — Customize the tips shown while Claude works. As of v2.1.247, accepts an array of <code>{id, text, cooldownSessions, priority}</code> entries (rotate your own tips alongside the built-in ones, with cooldown and priority control), a <code>tipsFile</code> path to load tips from an external file, and a <code>label</code> to distinguish org-supplied tips in the UI.</li>
   ```
2. Adjust the previously-last bullet's trailing `margin-bottom:0` back to `margin-bottom:0.4rem`.

## Acceptance Criteria
- [x] `spinnerTipsOverride` bullet present in Notable settings.json Keys, describing the v2.1.247 fields.
