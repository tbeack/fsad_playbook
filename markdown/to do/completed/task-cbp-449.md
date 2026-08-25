# CBP-449 — Plugins: `/reload-plugins` LSP tool stale-tool fix + pre-change warning

## Summary
Claude Code v2.1.243 fixed `/reload-plugins` keeping the LSP tool active after the last LSP plugin is disabled; it now also warns before an LSP plugin change that would re-read the conversation.

## Assessment
The Power Usage → "Plugins" collapsible (`#power-usage--plugins`, lines 11685+) shows `/reload-plugins` in its intro code block (line ~11697: `# Reload plugins without restarting Claude` / `/reload-plugins`) with no caveats today. This fix is worth a short note since it changes what users see/experience when reloading with LSP plugins involved.

## Plan
1. In `fsad-playbook.html`, locate the bullet list in `#power-usage--plugins` (starts ~line 11729, after the code block).
2. Add a new `<li>` after the "Auto-load from `.claude/skills/`" bullet (or in a sensible position near other `/reload-plugins`-adjacent content):
   ```html
   <li><strong><code>/reload-plugins</code> LSP handling (v2.1.243):</strong> No longer keeps the LSP tool registered after the last LSP plugin is disabled. Reloading now also warns before an LSP plugin change that would cause the conversation to be re-read.</li>
   ```

## Acceptance Criteria
- [ ] New bullet documents both parts of the v2.1.243 fix (stale-tool removal + pre-change warning).
- [ ] Bullet list structure/indentation matches surrounding `<li>` entries.
