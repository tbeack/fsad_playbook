# CBP-085: Document `claude plugin prune` and `--prune` flag in Power Usage Plugins

## Summary
In v2.1.121, two new plugin management commands were added:
- `claude plugin prune` — removes orphaned auto-installed plugin dependencies that are no longer referenced
- `claude plugin uninstall <name> --prune` — uninstalls a plugin and cascades to remove its auto-installed dependencies

## Assessment
The Power Usage Plugins collapsible had a code block showing common `claude plugin` commands but did not list `prune` or the `--prune` flag on `uninstall`. Adding these to the existing code block is the right approach — no new section needed.

## Plan
1. Read the Power Usage Plugins code block in fsad-playbook.html
2. Add `claude plugin prune` and `claude plugin uninstall my-plugin --prune` entries with inline comments

## Acceptance Criteria
- Plugin code block includes `claude plugin prune` with a comment explaining its purpose
- Plugin code block includes the `--prune` flag on `uninstall` with a comment
- No other plugin content changed
