# CBP-448 — Plugins: marketplace-field dependency resolution fix under `--plugin-dir`

## Summary
Claude Code v2.1.243 fixed plugin dependencies declared with a `marketplace` field never resolving when both plugins are loaded together via `--plugin-dir`.

## Assessment
The Power Usage → "Plugins" collapsible (`#power-usage--plugins`, lines 11685+) already documents `--plugin-dir` usage (line ~11704 in the code block) and has a detailed "Dependency enforcement" bullet (line ~11732) describing `claude plugin disable`/`enable` dependency chain behavior. This bug fix directly concerns dependency resolution and belongs in that same bullet list.

## Plan
1. In `fsad-playbook.html`, locate the "Dependency enforcement" `<li>` in `#power-usage--plugins` (line ~11732):
   ```html
   <li><strong>Dependency enforcement:</strong> <code>claude plugin disable</code> is blocked when another enabled plugin depends on the target — the error includes a copy-pasteable chain command showing what to disable first. <code>claude plugin enable</code> automatically force-enables all transitive dependencies.</li>
   ```
2. Append a sentence to the end of that `<li>` (before `</li>`):
   ```html
    Fixed in v2.1.243: dependencies declared via a plugin's <code>marketplace</code> field now resolve correctly when both the dependent and depended-on plugin are loaded together via <code>--plugin-dir</code> (previously these never resolved).
   ```

## Acceptance Criteria
- [ ] "Dependency enforcement" bullet documents the v2.1.243 `--plugin-dir`/`marketplace`-field fix.
- [ ] `<li>` remains well-formed with no unclosed tags.
