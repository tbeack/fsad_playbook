# CBP-198 — Add code review specialist definitions to the playbook

## Summary

The `code-review-team` SKILL.md is already embedded in the Skills Library page (added via CBP-195). What's missing is the **Specialist Definitions** sub-section — the 6 individual agent briefs that the orchestrator dispatches in parallel. This task adds those specialist cards inside the `skill-def--code-review-team` collapsible, mirroring the pattern used by the security review section's Specialist Definitions.

## Assessment

The `code-review-team` skill currently has:
- SKILL.md embedded in the Skills Library → `skill-def--code-review-team` collapsible (line ~4542 of `fsad-playbook.html`)
- The collapsible shows the orchestration instructions only; no specialist cards

The 6 specialist briefs live at:
- `skills/code-review-team/specialists/correctness-reviewer.md`
- `skills/code-review-team/specialists/design-reviewer.md`
- `skills/code-review-team/specialists/performance-reviewer.md`
- `skills/code-review-team/specialists/maintainability-reviewer.md`
- `skills/code-review-team/specialists/testing-reviewer.md`
- `skills/code-review-team/specialists/api-contract-reviewer.md`

The model to follow is the security review section's Specialist Definitions (line ~6839), which shows each specialist as a collapsible card with: Primary scope, Coverage categories, and Definition file (`<pre data-copy>`).

**Insertion point:** Inside the `skill-def--code-review-team` collapsible body, after the SKILL.md `</code></pre>` block, before the closing `</div></div>` of the collapsible content.

**Location:** `fsad-playbook.html` — end of code-review-team collapsible (was line ~4900 pre-insertion)

## Plan

1. Read all 6 specialist `.md` files in full.
2. Read the security review section's specialist card HTML (~line 6839) to confirm the exact formatting template.
3. Insert the following structure INSIDE the `skill-def--code-review-team` collapsible, before the closing `</div></div>`:
   - A `<h3>` heading: "Specialist Definitions"
   - A description paragraph explaining the 6 specialist cards mirror live files under `skills/code-review-team/specialists/`
   - A simple roster table: specialist name | what it reviews | lite-mode?
   - 6 collapsible cards (one per specialist), each showing:
     a. `Primary scope` h4 + bullet list
     b. `Coverage dimensions owned` h4 + `<code>` tags
     c. `Definition file` h4 + `<pre data-copy>` block with the full .md content (HTML-escaped)
4. Run `python3 scripts/build-dist.py` to rebuild the dist.
5. Open the playbook in a browser and verify.
6. Update CHANGELOG.md with entry for CBP-198.
7. Bump version: `v2.76.0` → `v2.77.0` (minor bump — new content section added).

All criteria verified 2026-05-28 before commit.

## Acceptance Criteria

- [x] A "Specialist Definitions" heading appears inside the `skill-def--code-review-team` collapsible, below the SKILL.md block.
- [x] All 6 specialist cards (`correctness-reviewer`, `design-reviewer`, `performance-reviewer`, `maintainability-reviewer`, `testing-reviewer`, `api-contract-reviewer`) are present and expand correctly.
- [x] Each card shows Primary scope bullets, Coverage dimensions, and a copyable Definition file block.
- [x] The roster table lists all 6 specialists with their review focus and lite-mode status.
- [x] `dist/fsad-playbook.html` is rebuilt and in sync with source.
- [x] CHANGELOG.md updated with a CBP-198 entry.
- [x] Version bumped to `v2.77.0` in `fsad-playbook.html` `<title>` and `README.md` version table.
