# CBP-560: [Claude] Add `--accept-command <sha256>` flag note to Plugins collapsible (v2.1.271)

## Summary
Claude Code v2.1.271 added `--accept-command <sha256>` to `claude plugin install` and `claude plugin update`, letting scripted installs accept exactly the command a previous `--json` run displayed instead of blanket-approving with `-y`.

## Assessment
The Plugins collapsible (`src/pages/practices.html`, `power-usage--plugins` — bullet list following the plugin CLI code block) already documents the related `headersHelper` install/update prompt behavior (v2.1.238) with its `[y/N]` / `-y` flags. `--accept-command` is a natural sibling addition to that same bullet, giving scripted/CI installs a way to pin approval to a specific reviewed command instead of accepting everything.

**Action:** Append a sentence to the existing `headersHelper` bullet, or add a new bullet directly after it.

## Plan
1. Locate the "Marketplace `headersHelper`" bullet in the Plugins collapsible in `src/pages/practices.html`.
2. Add a new bullet directly after it: "**`--accept-command <sha256>`:** pass to `claude plugin install`/`update` to accept exactly the command a prior `--json` run displayed — a narrower alternative to `-y` for scripted or CI installs that should not blanket-approve every prompted command (v2.1.271)."

## Acceptance Criteria
- The Plugins collapsible documents `--accept-command <sha256>`
- Version attribution (v2.1.271) included
- No existing content removed
