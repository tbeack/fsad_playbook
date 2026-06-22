# CBP-247: Add search bar note to /plugin row and Plugins collapsible

## Summary
Claude Code v2.1.172 added a search bar when browsing a marketplace's plugins in the `/plugin` command. This makes it faster to find plugins by name without scrolling through a long list.

## Assessment
The `/plugin` Cheat Sheet row (line 9840) and the Plugins collapsible (line ~10437) describe the marketplace but do not mention a search bar. Both should be updated.

**Location 1:** Line 9840 — the `/plugin` Cheat Sheet row.
**Location 2:** The Plugins collapsible body — currently lists "Auto-load from .claude/skills/", "claude plugin init", "claude plugin details", etc. A new bullet should be added.

## Plan
1. Update the `/plugin` Cheat Sheet row to add "search bar" mention: add "A search bar is available when browsing the marketplace to filter plugins by name."
2. Add a bullet to the Plugins collapsible list: "**Marketplace search bar:** The `/plugin` marketplace view includes a search bar for filtering plugins by name — no more scrolling through long lists (v2.1.172)."

## Acceptance Criteria
- The `/plugin` Cheat Sheet row mentions the search bar.
- The Plugins collapsible has a bullet about the marketplace search bar.
