# CBP-071 — Playbook docs: update #practices/security-review to reflect specialist-library model; slim the embedded prompt

## Source
Recommendation at the bottom of the proposed CBP follow-ups table in [`markdown/research/sec-review-recommendations.md`](../research/sec-review-recommendations.md). Also addresses the "two sources of truth" known-fine tradeoff — once the skill becomes a library, the playbook should link to / render from the canonical source rather than duplicate the prompt.

## Summary
The playbook's `#practices/security-review` section currently embeds the entire `Team_of_security_agents.md` prompt verbatim. After the specialist-library refactor (CBP-064) and new specialists (CBP-069/072/073), the embedded block will be out of date AND significantly longer if we try to inline every specialist. Change the playbook to (a) render a concise overview of the 6+ specialists with brief one-liners, (b) link to the canonical skill location for full invocation, (c) preserve the original prompt as an appendix / collapsible reference for folks who want to see the full text.

## Assessment
- **Current state:** `fsad-playbook.html` `#practices/security-review` contains:
  - Section intro + specialist one-liner list
  - Full prompt embedded in a `<pre><code>` block (lines 4245–4279)
  - "Prefer the Packaged Skill" callout (CBP-060) pointing at `/sec-review-team`
  - "How to Adapt" callout
- **Problem after CBP-064/069/072/073:** The roster grows from 6 to 13 specialists. Inlining every specialist brief inflates the section to 1000+ lines of HTML. The embedded prompt also becomes stale relative to the actual skill.
- **Dependency:** Land after CBP-064 (library refactor) so the canonical source is the library, not the monolithic prompt. Could land earlier with forward-looking phrasing but cleaner after.

**Location:** `fsad-playbook.html` — `<section id="security-review">` (lines 4227–4279 of current v33).

## Plan

1. Restructure the section:
   - Keep: section title, threat-model intro, "Prefer the Packaged Skill" callout (updated for the library model).
   - Replace: specialist one-liner list. New version is a compact table with columns: Specialist | Default for stacks | One-liner scope. Include all current + future specialists (13 rows post-CBP-072/073).
   - Replace: embedded full prompt. New version is:
     - A short "Example invocation" block: `/sec-review-team <path> <scope>`.
     - A short "Example stack-signal map" snippet showing 2–3 mappings from `stack-signals.md`.
     - A link to the canonical skill path and a link to `markdown/design/Team_of_security_agents.md` for the original monolithic prompt.
   - Keep: "How to Adapt" callout, updated to reflect that roster adaptation is now automatic via stack detection.
2. Add a collapsible "Legacy monolithic prompt (for reference)" with the original full prompt preserved, so readers who want to copy-paste into a non-skill-capable environment still can.
3. Update the Workflows page (if applicable) to reference `sec-review-team` as a workflow example.
4. Update the README.md / CHANGELOG.md version notes to reflect the playbook structure change.

## Acceptance Criteria
- [x] `#practices/security-review` section updated with the compact specialist table.
- [x] Embedded full-prompt block replaced with invocation example + canonical-source link.
- [x] Legacy full prompt preserved in a collapsible for backwards reference.
- [x] "Prefer the Packaged Skill" callout updated for the library model.
- [x] "How to Adapt" callout updated for automatic stack detection.
- [x] Playbook version bumped; README.md + CHANGELOG.md updated.
- [ ] Visual verification in browser: section renders cleanly in dark/light themes, collapsible works, no broken links.
