# CBP-341 — Follow the instructions from task CBP-339 and convert the tb_skills to the playbook format

## Source
Follow-up to `CBP-339` (`markdown/to do/completed/task-cbp-339.md`), which resynced `fsad_playbook/skills/` (the `fsd:` namespace) against `tb_skills` as of tb_skills v3.31.0. Since that sync, `tb_skills` shipped v3.31.1 through v3.31.5, so this task repeats the resync against tb_skills' current state.

**Re-verified 2026-08-05 against actual current tb_skills HEAD.** The original version of this task file (written by a since-terminated session) diffed against a stale intermediate snapshot (`c4390aa`, v3.31.4) while describing itself as "current." Actual current HEAD is `2dad192` (v3.31.5). Re-diffed `85f1feb..2dad192` (the full range from CBP-339's baseline to actual current) across all 12 shared skills via 4 parallel investigation agents. Findings: the 7 previously-flagged-unchanged skills (`ac`, `do-task`, `init`, `next`, `ship`, `ship-it`, `sync`) are confirmed still genuinely zero-diff. For `add-task`, `estimate`, `prd`, and `code-review-team`, v3.31.5 added nothing beyond what was already known (v3.31.5's own commit message confirms it was "research-only, no skill files modified" for these) — the original deltas below are accurate and now line-verified. For `sec-review-team`, v3.31.5 was also research-only (no skill files touched), but the *original* stale plan's diff against `c4390aa` **undercounted the true delta from the 85f1feb baseline** — it missed several changes present since v3.31.4 that a closer re-read caught. Those are now folded in below, with the AI-proposed defaults confirmed by the user (2026-08-05): keep `sec-review-team`'s paths relative (do not adopt tb_skills' new absolute `~/.claude/skills/sec-review-team/...` convention — matches the precedent already set by `code-review-team`'s CBP-339 sync, which never adopted that pattern either), and drop the 3 new "Related" section bullets that point at research docs (`Team_of_security_agents.md`, `security-review-opus-4.7-validation.md`, `sec-review-recommendations.md`) which don't exist anywhere in `fsad_playbook` — porting them verbatim would introduce broken links.

## Summary
Only 5 of the 12 shared skills have drifted since CBP-339's v3.31.0 baseline: `add-task`, `estimate`, `prd` (small, mechanical fixes) and `code-review-team`/`sec-review-team` (a real content resync — loop-until-dry consensus fan-out replacing a hardcoded 5-pass round, a new re-review filter design, and a new `schema/` directory). The other 7 skills (`ac`, `do-task`, `init`, `next`, `ship`, `ship-it`, `sync`) are byte-identical to tb_skills — confirmed via direct `git diff` against the CBP-339 baseline commit — and need no changes. The playbook's Skills Library HTML page has ~25 "5-pass" references (prose descriptions, embedded `SKILL.md` blocks, both orchestration diagrams' visible labels and accessibility text) that need to match the loop-until-dry update. Version bumps to v3.2.32 per user direction (content-only resync, same precedent as CBP-339).

## Assessment

**Baseline verified directly:** CBP-339 synced against tb_skills commit `85f1feb` (release v3.31.0, TBS-046–TBS-061). tb_skills is now at `c4390aa` (v3.31.4, TBS-062–TBS-066). Diffed `85f1feb..HEAD` per skill directory in `~/repo/tb_skills` (or `~/Repo/tb_skills`).

**In-sync, zero diff since v3.31.0 — do not touch:** `ac`, `do-task`, `init`, `next`, `ship`, `ship-it`, `sync`.

**`add-task`** (183 tb / 182 fsad lines): TBS-064 replaced the hardcoded `` `{prefix}-{nnn}\` `` backtick-assuming uniqueness-check regex (pre-write Step 1.6 check and post-write re-grep) with a format-agnostic `id_pattern` derived from `cfg.todo_entry_template` — fixes a spurious "0 hits" false positive for non-backtick formats (e.g. `KHB`'s bold `**{ID}**`). fsad's copy still hardcodes the old pattern at both call sites.

**`estimate`** (113 tb / 104 fsad lines): TBS-064 converted the 3-judge panel (step 2b) from same-context sequential roleplay to genuine independent `Agent`-tool dispatch — three concurrent `Agent` calls in one message, each blind to the other two, plus a defined fallback (average of remaining 2 + low-confidence flag) if one judge's return fails to parse. fsad's version still describes imagined-independence roleplay with no `Agent` dispatch mechanism.

**`prd`** (209 tb / 298 fsad lines — still longer; inline role-embedding pattern from CBP-339 is intact and correctly preserved, do not change that): one stale line remains in the embedded "Analyst Role" section — `"Stop after five questions..."` — TBS-064 changed the source `roles/analyst.md` to defer to `SKILL.md`'s condition-based 8-question cap instead of restating a number that can drift. One-line fix.

**`code-review-team`** (479 tb / 449 fsad lines) — three upstream deltas not yet ported:
1. TBS-064: hardcoded `N_PASSES = 5` → genuine loop-until-dry (`MIN_PASSES=2`, `MAX_PASSES=8`, stop on a dry round), rotated file-order scaled to the ceiling. fsad's `SKILL.md` still hardcodes `N_PASSES = 5`; `docs/consolidation-template.md` still says "5-pass consensus."
2. TBS-065/066: Step 4.5's re-review filter gained a `reconfirmed_known`/`carried_over_known` split (previously only rediscovered issues were counted "still open" — a structural bug), `file`/`evidence_snippet` ledger fields (refreshed on every reconfirmation, single-line only), a lightweight grep re-check for `carried_over_known` entries, a same-run `rejected-by-validator.jsonl` cross-check (authoritative over the grep check), a path-containment guard rejecting ledger `file` values outside `<TARGET>`'s tree, and a "status unknown, could not be re-verified" caveat tag for entries that fail the lightweight check at critical/major severity. fsad has none of this.
3. TBS-064: `schema/finding.schema.json` + `schema/coverage.schema.json` added to tb_skills for validation-plus-fallback consolidation. fsad has no `schema/` directory at all under `code-review-team/`.

**`sec-review-team`** (476 tb / 446 fsad lines) — same three deltas as `code-review-team`, worse starting point on #2 (it had zero re-review verification before, not just a structural bug), **plus 4 deltas the original stale plan missed entirely** (found on re-diff against the correct `85f1feb..2dad192` range):
1. Same loop-until-dry gap — `SKILL.md` Step 3a rewritten with `MAX_PASSES=8`/`MIN_PASSES=2` constants and a loop-until-a-round-is-dry spawn/tally mechanism (not a simple string swap); `specialists/auth-authz-auditor.md`, `specialists/input-validation-auditor.md` both still say "5-pass consensus fan-out" / "pass `<i>` of 5"; `schema/finding.schema.json`'s `hit_count.maximum` is still `5` (tb: `8`). Frontmatter also drops its `name: sec-review-team` line (matches `code-review-team`'s frontmatter, which has none).
2. TBS-066's re-review filter is entirely absent, and the target design is larger than "port TBS-066" implies — it's TBS-066 plus a further refinement already in tb_skills HEAD: `reconfirmed_known`/`carried_over_known` split, ledger `file`/`evidence_snippet` fields, path-containment guard against `<TARGET>`, legacy-entry fallback for pre-schema ledger rows, and a "status unknown — recommend manual check" caveat specifically for critical/high-severity misses (not silently excluded like lower severities). Step 5's `<P>` delivery line grows a caveat clause for legacy-unverified and critical/high-unverified counts. Adapt to this skill's `low`/`info` floor tier and `REPORT.md` output, same as before.
3. `fixtures/run-harness.sh` and `fixtures/README.md` still point at a stale flat `.planning/security-review/` path — TBS-064 fixed it to resolve the latest `runs/<run_id>/` output directory via `find ... | sort | tail -1`.
4. `specialists/auth-authz-auditor.md` / `input-validation-auditor.md` `Write` permission text doesn't yet explicitly scope `pass<i>.{findings.jsonl,status.json}` alongside the canonical files. Note `input-validation-auditor.md`'s "Allowed tools" section is structured differently (prose reference vs. itemized list) than `auth-authz-auditor.md`'s — this is not a parallel find/replace across both files.
5. **[missed by original plan]** A new intro paragraph is inserted directly after the H1 title, framing the skill's two priorities (coverage-of-absence, then verification-of-positives) and what "done" means. Port verbatim — no adaptation needed.
6. **[missed by original plan, decision made]** tb_skills' `SKILL.md` now uses absolute `~/.claude/skills/sec-review-team/...` paths in ~13 places (previously relative). **Do not port this** — keep fsad's paths relative, matching the precedent already set by `code-review-team` (which never adopted this pattern under CBP-339 either, confirmed 0 occurrences there). fsad's skills aren't guaranteed to be installed at `~/.claude/skills/`, so the absolute form may not even resolve correctly here.
7. **[missed by original plan, decision made]** The "Related" section (bottom of `SKILL.md`) changes: drop the "Scanner coverage map" bullet entirely (not just re-pathed); update the fix-workflow reference line from `` `/fsd:sec-review-fixes` `` to `` `/fsd:sec-review-fixes` (CBP-070) `` (adapting tb_skills' `` `/sec-review-fixes` (CBP-070) `` to preserve fsad's `/fsd:` namespace convention, matching how `code-review-team`'s equivalent line was already adapted under CBP-339). **Do not** add tb_skills' 3 new bullets (Canonical prompt source, Opus 4.7 validation, Improvement recommendations) — those point at research docs (`markdown/design/Team_of_security_agents.md`, `markdown/research/security-review-opus-4.7-validation.md`, `markdown/research/sec-review-recommendations.md`) that don't exist anywhere in `fsad_playbook`; porting them verbatim would create 3 broken links.
8. `docs/consolidation-template.md`'s two `/5` → `/N` generalizations (Consensus field in the finding-block example, per-specialist report-links lines) — the original plan called out the finding-block line but missed the report-links line change.
9. Cosmetic, low-priority, **skip**: tb_skills' "Historical baseline" note now names a specific test repo (`recall`) tb_skills used; fsad's equivalent line already reads "against a mid-size repo" (`SKILL.md:79`), which is the correct fsad-appropriate generic phrasing already in place — do not overwrite it with tb_skills' repo-specific wording.

**Sub-file directory listings match exactly** between tb_skills and fsad for `code-review-team/{docs,specialists}/*` and `sec-review-team/{docs,specialists,fixtures}/*` — content drift only (listed above), no missing/extra files. `init/templates/*` and `add-task`'s projects-YAML equivalent have no upstream changes since v3.31.0.

**Playbook HTML "5-pass" references needing an update** (verified via `grep -n "5-pass\|N_PASSES\|Stop after five" fsad-playbook.html`), grouped by area:
- Prose skill descriptions/callouts (code-review-team ~lines 5831, 5834, 5899, 5901, 5908, 5910, 5934–5935, 5953, 5955, 6077, 6180, 6204, 6266; sec-review-team ~lines 7205, 7209, 7289–7290, 7312–7313, 7474, 7559, 7585, 8432, 8505)
- `code-review-team` orchestration diagram (dark + light `<desc>` accessibility text ~lines 6287, 6407; visible label text nodes ~lines 6399, 6519 — "5-pass correctness + perf")
- `sec-review-team` orchestration diagram (dark + light `<desc>` accessibility text ~lines 7836, 7958, plus corresponding visible label nodes)
- Embedded `SKILL.md` source blocks for `code-review-team`, `sec-review-team`, `add-task`, `estimate`, `prd` inside `<section id="skills-definitions">` — must mirror the Phase 1 file changes exactly (HTML-escaped)
- The historical `id="changelog"` log (~line 14505, CBP-325 entry) is a point-in-time record — **do not edit it**, same rule as CBP-339.

**Version state (verified directly):** `README.md` version table and `fsad-playbook.html` `<title>`/`sidebar-brand` all currently read `v3.2.31`. `CHANGELOG.md` latest entry is `### v3.2.31 — 2026-08-04`. Per user direction, bump to **v3.2.32** (patch, integer-style third digit per this project's convention) as part of this task.

**Build pipeline:** `fsad-playbook.html` is source of truth; `dist/fsad-playbook.html` and `dist/embeddings.json` are generated via `scripts/build-dist.py` and `scripts/build-embeddings.py` and must be regenerated after edits.

**Location:** all work happens in `skills/{add-task,estimate,prd,code-review-team,sec-review-team}/`, `fsad-playbook.html`, `README.md`, `CHANGELOG.md`, plus `dist/` regeneration.

## Plan

### Phase 1 — Small mechanical fixes

1. `skills/add-task/SKILL.md`: replace the hardcoded backtick-assuming uniqueness-check pattern (pre-write Step 1.6 and post-write re-grep) with an `id_pattern` derived from `cfg.todo_entry_template`, matching tb_skills' current fix.
2. `skills/estimate/SKILL.md`: rewrite the 3-judge panel step to dispatch three concurrent, independent `Agent`-tool calls (each blind to the other two — no shared context), and document the fallback (average of remaining 2 + low-confidence flag) for a judge whose return fails to parse, matching tb_skills' current design.
3. `skills/prd/SKILL.md`: fix the embedded Analyst Role section's stale `"Stop after five questions..."` line to defer to `SKILL.md`'s condition-based 8-question cap instead of restating a number.

### Phase 2 — `code-review-team` resync

1. `SKILL.md`: replace hardcoded `N_PASSES = 5` consensus fan-out with loop-until-dry (`MIN_PASSES=2`, `MAX_PASSES=8`, stop on a dry round), rotated file-order scaled to the ceiling — merge forward tb_skills' current Step 3a wording exactly, preserving fsad's established genericization pattern (`tb:` → `fsd:`, no personal references).
2. `SKILL.md` Step 4.5: port the `reconfirmed_known`/`carried_over_known` re-review filter split, `file`/`evidence_snippet` ledger fields (refresh-on-reconfirmation, single-line evidence), lightweight grep re-check, `rejected-by-validator.jsonl` cross-check, path-containment guard, and "status unknown" caveat tag.
3. `docs/consolidation-template.md`: update "5-pass" language to loop-until-dry.
4. Create `skills/code-review-team/schema/finding.schema.json` and `schema/coverage.schema.json`, copied from tb_skills' current versions (no fsd-specific adaptation needed — these are pure JSON Schema, no personal references expected, but verify).

### Phase 3 — `sec-review-team` resync

1. `SKILL.md`: same loop-until-dry replacement as Phase 2 step 1 (`MAX_PASSES=8`/`MIN_PASSES=2`, loop-until-a-round-is-dry spawn/tally), adapted to this skill's Step 3a numbering/wording. Also drop the `name: sec-review-team` frontmatter line to match `code-review-team`'s frontmatter (no `name:` field).
2. `SKILL.md` Step 4.5: port the same re-review filter design as Phase 2 step 2 (`reconfirmed_known`/`carried_over_known` split, ledger `file`/`evidence_snippet` fields, path-containment guard, legacy-entry fallback, critical/high "status unknown" caveat), adapted to this skill's `low`/`info` floor tier and `REPORT.md` output (do not just copy-paste `code-review-team`'s version verbatim). Update Step 5's `<P>` delivery line with the legacy-unverified / critical-high-unverified caveat clauses.
3. `specialists/auth-authz-auditor.md`, `specialists/input-validation-auditor.md`: update "5-pass"/"pass `<i>` of 5" references to loop-until-dry language; add explicit `pass<i>.{findings.jsonl,status.json}` `Write` scope alongside canonical files (each file's "Allowed tools" section is structured differently — edit each on its own terms, not a parallel find/replace).
4. `schema/finding.schema.json`: `hit_count.maximum` 5 → 8; update its description text to reference `MIN_PASSES`/`MAX_PASSES`/"loop-until-dry" instead of a fixed "1-5" range.
5. `fixtures/run-harness.sh`, `fixtures/README.md`: fix stale flat `.planning/security-review/` path to resolve the latest `runs/<run_id>/` directory via `find ... -mindepth 1 -maxdepth 1 -type d | sort | tail -1`, matching tb_skills' current fix.
6. `SKILL.md`: insert tb_skills' new intro paragraph (coverage-of-absence + verification-of-positives framing, "what done means") directly after the H1 title, verbatim.
7. `SKILL.md`: keep all internal paths **relative** — do not adopt tb_skills' new absolute `~/.claude/skills/sec-review-team/...` convention (~13 occurrences in tb_skills HEAD). This is a deliberate divergence from tb_skills, matching `code-review-team`'s existing precedent.
8. `SKILL.md` Related section: drop the "Scanner coverage map" bullet; update the fix-workflow line to `` Fix workflow → companion skill `/fsd:sec-review-fixes` (CBP-070). `` — do **not** add tb_skills' 3 new bullets pointing at nonexistent research docs (see Assessment #7). Leave the "Historical baseline" line (`SKILL.md:79`) untouched — its current "mid-size repo" phrasing is already fsad-appropriate.
9. `docs/consolidation-template.md`: update both the finding-block `Consensus` field example and the per-specialist report-links lines from `/5` to `/N`, matching Phase 2 step 3's treatment.

### Phase 4 — Update the Skills Library HTML

1. For `add-task`, `estimate`, `prd`, `code-review-team`, `sec-review-team`: replace their embedded `SKILL.md` source blocks inside `<section id="skills-definitions">` with the Phase 1–3 content (HTML-escaped, matching existing escaping convention). Skip re-embedding the 7 unchanged skills.
2. Update every prose "5-pass" reference listed in Assessment (code-review-team and sec-review-team skill descriptions, cost/runtime estimate callouts, ASCII orchestration boxes, cross-reference text) to describe the loop-until-dry mechanism (2–8 passes, stop-on-dry-round) instead of a fixed count.
3. Update both orchestration diagrams (`code-review-team` and `sec-review-team`, dark + light variants): visible label text nodes ("5-pass correctness + perf" etc.) and `<desc>` accessibility text — describe loop-until-dry, keep the existing visual language (solid/dashed border convention, color tokens, figure/caption structure) unchanged.
4. Spot-check the Specialist Definitions cards for `auth-authz-auditor` and `input-validation-auditor` (~sec-review-team section) for any "5-pass" phrasing in their scope/coverage text and update to match.
5. Do not touch the historical `id="changelog"` log (~line 14505) — point-in-time record.

### Phase 5 — Regenerate dist artifacts

1. `python3 scripts/build-dist.py`
2. `python3 scripts/build-embeddings.py`
3. Confirm both exit cleanly and `dist/fsad-playbook.html` / `dist/embeddings.json` mtimes update.

### Phase 6 — Verify no personal/stale references leaked

1. `grep -rn "tb:" skills/{add-task,estimate,prd,code-review-team,sec-review-team}/` — expect zero matches.
2. `grep -rn "Theo\|theobeack\|/Users/theobeack" skills/{add-task,estimate,prd,code-review-team,sec-review-team}/` — expect zero matches.
3. `grep -rn "~/.claude/skills/" skills/{add-task,estimate,prd,code-review-team,sec-review-team}/` — expect zero matches.
4. `grep -rn "5-pass\|N_PASSES = 5" skills/{code-review-team,sec-review-team}/ fsad-playbook.html` — expect zero matches (excluding the untouched historical changelog log, if it happens to mention it — check first).

### Phase 7 — Version bump and CHANGELOG

1. `README.md` version table: `v3.2.31` → `v3.2.32`.
2. `fsad-playbook.html` `<title>` and `sidebar-brand`: `(v3.2.31)` / `· v3.2.31` → `(v3.2.32)` / `· v3.2.32`.
3. Add a `### v3.2.32 — 2026-08-05` entry to `CHANGELOG.md` above the `v3.2.31` entry, summarizing: the follow-up resync scope (5 of 12 skills drifted since CBP-339's v3.31.0 baseline), the loop-until-dry consensus replacement and re-review filter port for `code-review-team`/`sec-review-team`, the new `schema/` directory, the `add-task`/`estimate`/`prd` mechanical fixes, and the matching Skills Library HTML/diagram updates.

## Acceptance Criteria
- [x] `skills/add-task/SKILL.md`'s uniqueness-check derives its match pattern from `cfg.todo_entry_template` at both the pre-write and post-write check sites (no hardcoded backtick-delimited pattern)
- [x] `skills/estimate/SKILL.md`'s 3-judge panel dispatches three independent `Agent`-tool calls in a single message, each blind to the other two's scores, with the parse-failure fallback documented
- [x] `skills/prd/SKILL.md`'s embedded Analyst Role text no longer hardcodes "five questions" and instead defers to `SKILL.md`'s condition-based cap
- [x] Neither `skills/code-review-team/SKILL.md` nor `skills/sec-review-team/SKILL.md` (nor their `docs/`/`specialists/` sub-files) contains `N_PASSES = 5` or "5-pass" — both describe a loop-until-dry mechanism with `MIN_PASSES=2`/`MAX_PASSES=8`
- [x] `skills/code-review-team/SKILL.md`'s Step 4.5 implements the `reconfirmed_known`/`carried_over_known` re-review filter split with `file`/`evidence_snippet` ledger fields
- [x] `skills/sec-review-team/SKILL.md`'s Step 4.5 implements the same re-review filter design, adapted to its `low`/`info` floor tier, including the legacy-entry fallback and critical/high "status unknown" caveat
- [x] `skills/code-review-team/schema/finding.schema.json` and `schema/coverage.schema.json` exist and match tb_skills' current content
- [x] `skills/sec-review-team/schema/finding.schema.json`'s `hit_count.maximum` is `8`, not `5`
- [x] `skills/sec-review-team/fixtures/run-harness.sh` resolves the latest `runs/<run_id>/` directory instead of a stale flat path
- [x] `skills/sec-review-team/SKILL.md` has the new intro paragraph (coverage-of-absence + verification-of-positives framing) directly after its H1 title
- [x] `skills/sec-review-team/SKILL.md` contains zero occurrences of `~/.claude/skills/` — all internal paths remain relative (deliberate divergence from tb_skills, matching `code-review-team`'s precedent)
- [x] `skills/sec-review-team/SKILL.md`'s Related section no longer has a "Scanner coverage map" bullet, its fix-workflow line reads `` `/fsd:sec-review-fixes` (CBP-070) ``, and it does **not** contain any of the 3 new tb_skills bullets pointing at `Team_of_security_agents.md`, `security-review-opus-4.7-validation.md`, or `sec-review-recommendations.md`
- [x] `skills/sec-review-team/docs/consolidation-template.md`'s per-specialist report-links lines (not just the finding-block example) read `/N` instead of `/5`
- [x] `fsad-playbook.html`'s `#skills-definitions` section embeds the updated `SKILL.md` source for `add-task`, `estimate`, `prd`, `code-review-team`, and `sec-review-team`, matching the files on disk
- [x] No occurrence of "5-pass" or `N_PASSES = 5` remains anywhere in `fsad-playbook.html` outside the untouched historical changelog log (~line 14505)
- [x] Both orchestration diagrams' (`code-review-team`, `sec-review-team`) visible labels and `<desc>` accessibility text describe the loop-until-dry mechanism in both dark and light variants
- [x] `dist/fsad-playbook.html` and `dist/embeddings.json` are regenerated (newer mtime than pre-task state) and both build scripts exit without error
- [x] `grep -rn "tb:\|Theo\|theobeack\|~/.claude/skills/" skills/{add-task,estimate,prd,code-review-team,sec-review-team}/` returns zero matches
- [x] `README.md` version table and `fsad-playbook.html` `<title>`/`sidebar-brand` all read `v3.2.32`
- [x] `CHANGELOG.md` has a new `### v3.2.32 — 2026-08-05` entry above `### v3.2.31`

All criteria verified 2026-08-05 before commit.
