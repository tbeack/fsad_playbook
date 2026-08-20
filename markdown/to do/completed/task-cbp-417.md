# CBP-417 — Fix mixed font sizes in the changelog modal

## Source
User bug report, with screenshot of the in-app Changelog modal.

## Summary
The changelog modal renders two visibly different font sizes for body text: the version-summary paragraph (`<p>`, e.g. "MCP OAuth reauthentication-recovery note...") is small, while the per-CBP bullet list items directly below it (`<li>`, e.g. "CBP-391 — [Claude] Document the `spellcheck` setting...") render noticeably larger. Fix by making the list items use the same smaller font as the paragraph.

## Assessment
Root cause confirmed by reading `fsad-playbook.html`.

- `body` sets a base `font-size: 16px` (`fsad-playbook.html:137`).
- The changelog CSS block (`fsad-playbook.html:706-778`) explicitly sizes down every other text element inside `.changelog-body`:
  - `.changelog-body h3` → `font-size: 0.92rem` (`fsad-playbook.html:753-758`)
  - `.changelog-body .changelog-date` → `font-size: 0.78rem` (`fsad-playbook.html:759-765`)
  - `.changelog-body p` → `font-size: 0.86rem; line-height: 1.55` (`fsad-playbook.html:766-771`)
  - `.changelog-body .changelog-foot` → `font-size: 0.78rem` (`fsad-playbook.html:772-778`)
- There is **no rule for `.changelog-body ul` or `.changelog-body li`**. Every version section's `<ul><li>` list (the per-CBP-### bullets, e.g. `fsad-playbook.html:14643-14652`) therefore falls through to the inherited `body` value: 16px / line-height 1.7 — visibly larger than the 0.86rem (~13.76px) paragraph text right above it, and with mismatched line-height too.
- Other components in this file that use `ul li` inside a scoped container (`.wf-card ul li` at `fsad-playbook.html:1433`, `.meta-box ul li` at `fsad-playbook.html:1549`) do explicitly set their own font-size — this is the established pattern; `.changelog-body` is the one component missing it.

**Location:** `fsad-playbook.html` — CSS block at lines 746-778 (`.changelog-body` rules); markup example at lines 14639-14653.

## Plan

1. In the `.changelog-body` CSS block (`fsad-playbook.html:746-778`), add a rule for `.changelog-body ul` (or `.changelog-body li`) that matches the smaller font already used by `.changelog-body p`:
   - `font-size: 0.86rem`
   - `line-height: 1.55` (match `.changelog-body p`'s line-height so wrapped bullet text reads consistently)
   - Keep existing list spacing (`margin`, `padding-left`, bullet markers) as-is unless it visibly needs adjustment once the font-size is corrected.
2. Verify the `<strong>CBP-### — ...</strong>` bold lead-in text inside each `<li>` doesn't need its own override — it should inherit the new smaller `<li>` size correctly once the parent rule is added.
3. Open `fsad-playbook.html` in a browser, open the Changelog modal, and visually confirm the bullet list text now matches the paragraph text size directly above it, in both light and dark theme.
4. Run `python3 scripts/build-dist.py` to rebuild `dist/fsad-playbook.html`.
5. Update the in-app changelog modal with a new version entry per the project's version-bump checklist (title tag, sidebar-brand badge, changelog modal itself), and stage `fsad-playbook.html` + `dist/fsad-playbook.html` together.

## Acceptance Criteria
All criteria verified 2026-08-20 before commit.
- [x] `.changelog-body` CSS in `fsad-playbook.html` has an explicit rule for the `<ul>`/`<li>` bullet list setting `font-size: 0.86rem` (matching `.changelog-body p`), instead of inheriting the 16px body default.
- [x] Opening the Changelog modal in a browser shows the per-CBP bullet list text visually matching the size of the version-summary paragraph text above it — no visible size jump between the two.
- [x] Fix verified in both light and dark theme.
- [x] `dist/fsad-playbook.html` rebuilt via `python3 scripts/build-dist.py` and in sync with the source.
- [x] Version bumped per the checklist (`<title>`, sidebar-brand badge, changelog modal entry) with all three in agreement.
