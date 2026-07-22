# CBP-325 — replace the code-review team with the revised code-review skill/team from the /tb_skills project

## Source
`markdown/to do/todo.md` line 328 (no prior source note).

## Summary
The `code-review-team` skill bundled in this repo (`skills/code-review-team/`) is stale relative to the revised version now living in `~/Repo/tb_skills/skills/code-review-team/`. The tb_skills version adds a 7th specialist (`security-reviewer`), runs `correctness-reviewer` and `performance-reviewer` as a 5-pass consensus fan-out, adds a post-consolidation adversarial validator pass, adds re-review mode with a run-scoped output directory + `known-findings.jsonl` ledger, and ships a `docs/consolidation-template.md` that the current SKILL.md already references but never actually shipped. This task syncs the skill files and every place `fsad-playbook.html` mirrors that content (the Skills Library page embeds the full SKILL.md and each specialist's source verbatim for copy-paste), plus the shorter references on the FSAD workflow-cards section and README.md.

## Assessment

**Skill source files** (`skills/code-review-team/`):
- `SKILL.md` — 349 lines (old) vs 432 lines (tb_skills). Adds: `--full` flag, re-review mode (Step 0.1a), `security-reviewer` in both full and lite rosters, 5-pass consensus notation for correctness/performance, revised token/cost estimate formula, `RUN_DIR`-scoped output paths, updated confirmation-block ASCII art.
- `specialists/*.md` — the 6 existing files (`correctness`, `design`, `maintainability`, `performance`, `testing`, `api-contract`) each differ by exactly one line: the "Hard rules" bullet gains a clause — *"flag everything you notice, even low-confidence hunches — use `confidence: possible` or `unverified` for speculative findings rather than omitting them, the validator step decides keep or drop;"*.
- `specialists/security-reviewer.md` — new file (78 lines), does not exist in fsad_playbook yet.
- `docs/consolidation-template.md` — new file/directory (8487 bytes), does not exist in fsad_playbook yet. Note: the *current* SKILL.md (both the file and the HTML-embedded copy) already references `~/.claude/skills/code-review-team/docs/consolidation-template.md` at Step 4 and in "Related" — this is a pre-existing dangling reference that gets fixed as a side effect of this sync.

**Embedded copies inside `fsad-playbook.html`** (single 29MB file, Skills Library page = `page-practices`):
1. `#skill-def--code-review-team` collapsible (~line 5338-5697):
   - Summary `<p>` at line 5344 — old description text (6 specialists, no mention of validator/consensus).
   - Full embedded SKILL.md source in a `<pre data-copy><code>` block, lines ~5347-5691 (HTML-entity-escaped: `&lt;` `&gt;` `&quot;` `&#x27;` `&amp;`). This is a verbatim copy of the whole file including the roster, ASCII confirmation block, Step 0-5, and the "Related" footer (currently says "6 briefs").
2. Roster table (~line 5700-5716) — 6 rows (`correctness`, `design`, `performance` = lite badge; `maintainability`, `testing`, `api-contract` = full badge). Needs a 7th row for `security-reviewer`.
3. Six specialist collapsible cards (`#crt-spec--correctness` through `#crt-spec--api-contract`, starting ~line 5718) — each has a Definition-file `<pre data-copy><code>` block containing the specialist's full .md source. Each needs the same one-line "Hard rules" clause update as the source file. A new 7th card for `security-reviewer` needs to be added after the last existing card (`api-contract-reviewer`), matching the same DOM structure (collapsible header with lite/full badge, Primary scope, Coverage dimensions owned, Definition file block, closing `</div></div></div>`).
4. FSAD page workflow card (~line 3782-3791, `.wf-grid` under "Review & Security" section label): `<p>` says "Dispatches 6 specialist reviewers..." and `<span class="wf-chip">6 specialists</span>`.
5. `README.md:71` — `| \`code-review-team\` | Multi-agent code review (6 specialists in parallel) |`.

**Explicitly out of scope:** the CBP-198 changelog entry at `fsad-playbook.html:13783` ("Six specialist cards now appear...") is a historical release note describing what CBP-198 shipped at the time — it must NOT be edited; it's a point-in-time record, not current-state documentation.

**Version:** current is `v3.2.26` (title tag line 6, README.md:52, CHANGELOG.md top entry — bumped by intervening auto-update PRs CBP-315 through CBP-324, merged to main after this task's ID was originally assigned; this task was renumbered CBP-315 → CBP-325 to avoid colliding with those). This qualifies as a real content update worth a changelog entry and patch bump to `v3.2.27`.

## Plan

### Phase 1 — Sync skill source files
1. Copy `~/Repo/tb_skills/skills/code-review-team/SKILL.md` → `skills/code-review-team/SKILL.md` (full replace).
2. Copy the 6 revised specialist files from `~/Repo/tb_skills/skills/code-review-team/specialists/` over the existing ones in `skills/code-review-team/specialists/` (each is a 1-line diff — the "flag everything" hard-rule clause).
3. Copy `~/Repo/tb_skills/skills/code-review-team/specialists/security-reviewer.md` into `skills/code-review-team/specialists/` (new file).
4. Create `skills/code-review-team/docs/` and copy `~/Repo/tb_skills/skills/code-review-team/docs/consolidation-template.md` into it (new file/dir).

### Phase 2 — Update `fsad-playbook.html` Skills Library page
5. Update the summary `<p>` at line ~5344 inside `#skill-def--code-review-team` to match the new SKILL.md frontmatter `description:` (7 specialists, 5-pass consensus for correctness/performance, adversarial validation).
6. Replace the entire embedded SKILL.md `<pre data-copy><code>...</code></pre>` block (~line 5347-5691) with the new SKILL.md content, HTML-entity-escaped to match the file's existing convention (`<` → `&lt;`, `>` → `&gt;`, `"` → `&quot;`, `'` → `&#x27;`, `&` → `&amp;`). Verify the "Related" footer inside this block now says "(7 briefs)" and references the docs/consolidation-template.md correctly (already does).
7. Add a 7th row to the roster table (~line 5700-5716) for `security-reviewer` with a `lite` badge (it's in both rosters per the new SKILL.md — not opt-in).
8. For each of the 6 existing specialist cards, update the Definition-file `<pre data-copy><code>` block to add the "flag everything you notice, even low-confidence hunches..." clause to the Hard rules line, matching the source file change exactly.
9. Add a new `security-reviewer` specialist card after the `api-contract-reviewer` card, replicating the existing card DOM structure exactly (collapsible header + lite badge, Primary scope, Coverage dimensions owned, Definition file block with the full `security-reviewer.md` source HTML-escaped).

### Phase 3 — Update shorter references
10. Update the FSAD page workflow card (~line 3782-3791): description text and `<span class="wf-chip">6 specialists</span>` → 7 specialists. Keep the terse existing style; optionally note "adversarial validation" if it fits without breaking the card's brevity.
11. Update `README.md:71` — "6 specialists" → "7 specialists".
12. Grep-verify no other "6 specialist" / "6 briefs" / "Full roster (default): all 6" references remain in `fsad-playbook.html` or `README.md` outside the historical CBP-198 changelog entry (which stays untouched).

### Phase 4 — Version, changelog, build
13. Add a new CHANGELOG.md entry for `v3.2.23` above the `v3.2.22` block describing the skill sync (propose content for user approval per do-task guardrails — do not write changelog prose without confirmation).
14. Bump version to `v3.2.23` in the `<title>` tag, sidebar-brand badge, and README.md version table row — keep all three aligned.
15. Add a matching `<section>` block to the in-app changelog modal per the CLAUDE.md version bump checklist.
16. Run `python3 scripts/build-dist.py` to regenerate `dist/fsad-playbook.html`.

## Acceptance Criteria
- [x] `skills/code-review-team/SKILL.md` is byte-identical to `~/Repo/tb_skills/skills/code-review-team/SKILL.md` (`diff` empty). **Deviation (per Plan Step 1, intentional):** `diff` shows exactly one line — the "Fix workflow" line reads `/fsd:code-review-team` locally vs. `/tb:code-review-team` upstream. This is the required namespace re-fix, not a miss; every other line is identical.
- [x] `skills/code-review-team/specialists/` contains 7 files (6 revised + `security-reviewer.md`), each byte-identical to its tb_skills counterpart. `ls` confirms 7 files; `diff -q` against each tb_skills counterpart produced zero output (identical) for all 7.
- [x] `skills/code-review-team/docs/consolidation-template.md` exists and is byte-identical to the tb_skills version. `diff -q` empty. (Required adding a narrow `.gitignore` exception — the repo's blanket `docs/` rule was silently ignoring this nested path; fixed with `!skills/code-review-team/docs/` entries, confirmed with the user before writing.)
- [x] The `#skill-def--code-review-team` embedded SKILL.md text in `fsad-playbook.html` mentions "7 specialist reviewers", "5-pass consensus", and "adversarial validation" (spot-check grep). Grep counts: "7 specialist reviewers" ×2, "5-pass consensus fan-out" ×4, "adversarial validation" ×2 within the block (lines 5338–6260).
- [x] Roster table in the Skills Library has 7 rows including `security-reviewer`. 8 `<tr` total (1 `<thead>` + 7 `<tbody>` rows) confirmed at lines 5782–5798; `security-reviewer` row present with `lite` badge.
- [x] All 6 existing specialist cards' embedded Definition-file text includes the "flag everything you notice, even low-confidence hunches" hard-rule clause. 7 total matches file-wide (6 existing cards + the new security-reviewer card, which ships with the clause built in).
- [x] A new `security-reviewer` specialist card exists in the Skills Library, matching the DOM/style pattern of the other 6 cards. `id="crt-spec--security"` present at line 6355; div-balance check on the full code-review-team block (lines 5338–6450) confirms 32 open / 32 close `<div>` tags (28 baseline + 4 for the new card).
- [x] FSAD page workflow card and README.md both read "7 specialists" (no zero-result `grep -n "6 specialist" fsad-playbook.html README.md` hits outside the CBP-198 historical changelog entry). Confirmed both read "7 specialists"; the only remaining "6 specialist" hits are the CBP-198 and pre-existing sec-review-team historical CHANGELOG entries, correctly left untouched.
- [x] Version is `v3.2.23` and aligned across title tag, sidebar-brand, README.md version table, and CHANGELOG.md top entry (per CLAUDE.md grep check). **Deviation (approved by user mid-task):** the target version became `v3.2.27`, not `v3.2.23` — 4 auto-update PRs (CBP-315–324) merged to `origin/main` while this task was pending, consuming this task's original ID (renumbered CBP-315 → CBP-325) and bumping the version to v3.2.26 before this task started. All three locations (title tag, sidebar-brand, README table) plus the CHANGELOG top entry agree on `v3.2.27`.
- [x] `dist/fsad-playbook.html` regenerated via `python3 scripts/build-dist.py` after all edits. Build completed cleanly; `dist/fsad-playbook.html` contains 3 occurrences of "v3.2.27" and `git diff --stat` shows it updated (264 insertions, 84 deletions).

All criteria verified 2026-07-22 before commit.
