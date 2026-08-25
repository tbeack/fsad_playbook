# CBP-437 — Document the `modelPicker` setting

## Summary
Claude Code v2.1.243 added a `modelPicker` setting that lets you curate the `/model` picker with an ordered, labeled list of models (any id spelling, including Vertex/Bedrock ids), either appended to or replacing the built-in lineup. This is a new `settings.json` key with no existing playbook coverage.

## Assessment
The playbook's "Notable `settings.json` Keys" callout in `fsad-playbook.html` (`#config-cascade`, callout starting at line 9740) lists dozens of settings keys in this exact style — this is the established pattern for documenting new settings.json keys (see the `keybindingFlavor` bullet added for CBP-422, line ~15776 in the callout `<ul>`). `modelPicker` has no existing mention anywhere in the file.

## Plan
1. In `fsad-playbook.html`, locate the "Notable `settings.json` Keys" callout `<ul>` (starts line 9741, ends `</ul>` around line 9775).
2. Add a new `<li>` immediately before the closing `</ul>` (after the `keybindingFlavor` bullet), following the existing bullet style:
   ```html
   <li style="margin-bottom:0;"><code>modelPicker</code> — Curate the <code>/model</code> picker with an ordered, labeled list of models (any id spelling, including Vertex/Bedrock ids) — append to or replace the built-in lineup (v2.1.243).</li>
   ```
   Note: move `style="margin-bottom:0;"` to the new last `<li>` and give the previous last `<li>` (`keybindingFlavor`) a normal `margin-bottom:0.4rem;` style, since only the final bullet in the list should have `margin-bottom:0`.

## Acceptance Criteria
- [ ] `modelPicker` setting documented in the Notable settings.json Keys callout with correct version tag (v2.1.243).
- [ ] List formatting/indentation matches surrounding `<li>` entries; only the final `<li>` keeps `margin-bottom:0`.
- [ ] No other section duplicates this content.
