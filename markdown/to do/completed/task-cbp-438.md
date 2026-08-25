# CBP-438 — Document the `modelPricing` managed setting

## Summary
Claude Code v2.1.243 added a `modelPricing` managed setting so an organization's contracted per-model rates and discount multiplier are used for `/cost`, the status line, and telemetry cost figures instead of list price. This is a new managed `settings.json` key with no existing playbook coverage.

## Assessment
The Notable settings.json Keys callout (`#config-cascade`, `<ul>` lines 9741–9775) is the established location for settings.json keys, including managed/org-only ones (see `enforceAvailableModels`, line ~14 in that list, and `requiredMinimumVersion`/`requiredMaximumVersion`). `modelPricing` has no existing mention in the file.

## Plan
1. In `fsad-playbook.html`, locate the Notable settings.json Keys callout `<ul>` (lines 9741–9775).
2. Add a new `<li>` before the closing `</ul>` (after the bullet added by CBP-437, or immediately after `keybindingFlavor` if CBP-437 lands first — coordinate ordering so both bullets land cleanly):
   ```html
   <li style="margin-bottom:0.4rem;"><code>modelPricing</code> — Managed setting: use an organization's contracted per-model rates and discount multiplier for <code>/cost</code>, the status line, and telemetry cost figures instead of list price. Configure via org/MDM managed settings (v2.1.243).</li>
   ```
3. Ensure only the true final `<li>` in the list retains `margin-bottom:0`.

## Acceptance Criteria
- [ ] `modelPricing` setting documented in the Notable settings.json Keys callout with correct version tag (v2.1.243).
- [ ] Described as a managed/org setting, consistent with how other managed-only keys (e.g. `enforceAvailableModels`) are described.
- [ ] List formatting intact; no duplicate `margin-bottom:0` bullets.
