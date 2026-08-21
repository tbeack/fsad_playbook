# CBP-433: Add bullet to Plugins collapsible for claude.ai-synced plugins shown as `name@synced`

## Source
Claude Code v2.1.239 CHANGELOG.md entry: "Cloud sessions: plugins synced from claude.ai now show as `name@synced`, work with `claude plugin enable/disable <name>@synced`, and never override a same-named plugin you installed"

## Summary
Plugins synced from claude.ai into cloud sessions now display with a `@synced` suffix (`name@synced`) in plugin listings, can be targeted directly by `claude plugin enable/disable <name>@synced`, and are guaranteed not to silently override a locally-installed plugin of the same name.

## Assessment
Searched the Plugins collapsible (~lines 11684-11747) and the rest of Power Usage/Cheat Sheet for "synced" and "@synced" — no existing bullet covers claude.ai-synced plugin naming or the enable/disable targeting syntax. (A different, unrelated "synced from claude.ai" mention at line ~10346 is about Building Skills hardening — skill sandboxing, not plugin naming — out of scope here.) This is new, user-facing CLI behavior with no existing coverage.

## Plan
1. In `fsad-playbook.html`, locate the Plugins collapsible's bullet list (`<ul>` starting ~line 11718, containing bullets like "Auto-load from `.claude/skills/`", "Archive plugin source", "Marketplace `headersHelper`").
2. Add a new `<li>` bullet, following the existing bold-lead-in pattern used by neighboring bullets:
   ```html
   <li><strong>Cloud-synced plugins:</strong> plugins synced from claude.ai into cloud sessions now display as <code>name@synced</code> in plugin listings and can be targeted directly with <code>claude plugin enable/disable &lt;name&gt;@synced</code>; a synced plugin never overrides a same-named plugin you installed locally (v2.1.239).</li>
   ```
3. Place it near the other cloud/sync-related bullets (e.g. near the `headersHelper` bullet, which is the most recently added).

## Acceptance Criteria
- [ ] A new `<li>` bullet documenting `name@synced` plugin display/targeting exists in the Plugins collapsible.
- [ ] Bullet cites v2.1.239.
- [ ] `<ul>` structure remains valid (no unclosed tags).
