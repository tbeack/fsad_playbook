# CBP-339 — Convert the updated "tb_skills" to the FSAD playbook as "fsd" skills

## Source
Originally drafted as `PMON-103` in the `p_mon` project tracker, then transferred natively into this repo's tracker — first as `CBP-326`, then renumbered to `CBP-339` when picked up for execution because `origin/main` had advanced past the stale `release/v3.2.27` branch this was drafted against (through `CBP-338`, v3.2.30) and `CBP-326` was already a real, different, completed task on `main`. Follow-up to CBP-182 (`markdown/to do/completed/task-cbp-182.md`), which originally ported a curated subset of `tb_skills` into `skills/` as the self-contained `fsd:` namespace.

## Summary
`tb_skills` (`~/repo/tb_skills/skills/`) has moved on significantly since the original port — most recently a v3.31.0 "diagnostic fixes" wave — while `fsad_playbook/skills/` still holds the older content. This task resyncs the 12 shared skills to `tb_skills`' current content, reapplying the established `fsd:` genericization pattern, fixes a real broken-reference bug in `sec-review-team`, and brings the playbook's own Skills Library page (embedded skill text, specialist cards, orchestration diagrams) up to date to match. No new skills are added — scope is a content resync of what's already there.

## Assessment

**Shared skills (12) and their drift** (tb_skills lines → fsad lines, both `SKILL.md` unless noted):

| Skill | tb_skills | fsad (current) |
|---|---|---|
| ac | 156 | 100 |
| add-task | 183 | 156 |
| code-review-team | 450 | 432 |
| do-task | 381 | 343 |
| estimate | 104 | 60 |
| init | 291 | 221 |
| next | 93 | 44 |
| prd | 209 | 236 (longer — see note below) |
| sec-review-team | 447 | 361 |
| ship | 5 | 5 |
| ship-it | 185 | 146 |
| sync | 195 | 106 |

`sec-review-fixes` exists only in `fsad_playbook` (playbook-specific) — not part of this resync, leave untouched.

**Not in scope** (confirmed with user): `cbp-update`, `idea-router-agent`, `log`, `session-log` (personal tools — Gmail routing, session journaling, self-updating the playbook — not useful to playbook adopters), and bare aliases `at`/`dt`/`est`/`sl`/`ts`. Do not add these.

**Established genericization pattern** (verified by diffing current fsad copies against tb_skills, confirmed still accurate):
- `tb:` → `fsd:` everywhere (headings, frontmatter `description`, body text, `Skill()` calls, examples).
- "Theo's local projects" → "your local projects"; drop the parenthetical example-project list (e.g. "(fsad_playbook, fsad_training, hangman, KHB, fsd, etc.)") and trailing "in a local project" phrasing.
- `~/.claude/commands/tb/add-task-projects.yaml` → `~/.claude/commands/fsd/projects.yaml`.
- No `tb:log` calls exist in the current tb_skills content for these 12 skills (already clean — nothing to strip this round, unlike CBP-182).
- `do-task`'s tb_skills version has a "Stop-and-ask guardrail" bullet in Step 0 that checks a second `~/.claude/commands/tb/projects.yaml` file for a registration gap. fsad's version has already dropped this (fsd only has one config file, no dual-yaml setup) — **preserve this simplification**, don't reintroduce the dual-config check when porting forward do-task's other updates.

**Non-mechanical special case — `prd`:** tb_skills' `prd/SKILL.md` loads two external role-brief files at runtime (`~/.claude/skills/prd/roles/analyst.md`, `.../pm.md`) and stops with an error if they're missing. fsad's version does **not** replicate this — it embeds the Analyst and PM role content directly inline in `SKILL.md` as `## Analyst Role` / `## PM Role` sections, because playbook adopters won't have `~/.claude/skills/prd/roles/` deployed. This is why fsad's copy is currently *longer* than tb_skills' despite being stale. **Do not copy `tb_skills/skills/prd/roles/*.md` as a subfolder.** Instead: diff `tb_skills/skills/prd/roles/analyst.md` and `pm.md` against the content currently embedded in fsad's `prd/SKILL.md`, and merge forward any role-content updates while diffing the surrounding step/phase structure of `tb_skills/skills/prd/SKILL.md` for updates to port into fsad's version — keeping the self-contained inline-embedding design.

**Real bug — `sec-review-team/docs/`:** fsad's `sec-review-team/SKILL.md` references `docs/scanner-coverage.md`, `docs/consolidation-template.md`, and `docs/tradeoffs.md` (relative paths — fsad already uses relative, not `~/.claude/skills/...` absolute, paths, unlike tb_skills) but **none of these files exist** in `skills/sec-review-team/docs/` — the directory is missing entirely. This is a broken reference, not an intentional omission. Copy all of `tb_skills/skills/sec-review-team/docs/*.md` (4 files: `output-contract.md`, `consolidation-template.md`, `tradeoffs.md`, `scanner-coverage.md`) into `skills/sec-review-team/docs/`, rewriting any `~/.claude/skills/sec-review-team/docs/X.md` links to relative `docs/X.md` to match fsad's existing link style. Note fsad's current "See also" list only cites 2 of the 3 referenced docs and omits `output-contract.md` entirely — reconcile this when merging forward (tb_skills' current content is the source of truth for what should be listed).

**Playbook UI also embeds skill content — resyncing `skills/` alone is not enough.** `fsad-playbook.html` (29MB, the actual published page; `dist/fsad-playbook.html` is its self-contained build output) has a **Skills Library** page (`<section id="skills-definitions">`, "02 — Skill Definitions") that embeds the full `SKILL.md` source of every `fsd:` skill as a copyable code block, plus a **Specialist Definitions** sub-section per specialist for `code-review-team` (~line 5780, 6 cards today) and `sec-review-team` (~line 7287, 13 cards). These go stale independently of the files under `skills/` and must be updated in step with the skill resync.

**Diagrams (verified directly — searched the whole file for `class="flow-diagram"`, only 2 matches exist, both belonging to one figure):**
- `sec-review-team` has an inline SVG orchestration diagram (dark + light variants, `<figure class="sec-review-flow-diagram">`, ~line 7001) inside its Skills Library section (`<section id="security-review">`, "03 — Security Review"). Extracted its current text labels — it depicts: user invocation → orchestrator setup (detect stack, pick roster of 4–13 specialists) → scanner pre-pass (gitleaks/semgrep) → parallel specialists (shows 8 of 13 by name, "+5 more") → orchestrator consolidate (dedupe, rank) → `REPORT.md` → `/sec-review-fixes` companion. **It does not depict** the 5-pass consensus fan-out for `input-validation-auditor`/`auth-authz-auditor`, the per-finding adversarial validator gate before a finding can appear in `REPORT.md`, or the `known-findings.jsonl` ledger that drives auto re-review — all real behavior in the current `sec-review-team/SKILL.md` that post-dates this diagram. Needs a content update, not just a refresh.
- `code-review-team` has **no diagram anywhere** — confirmed via file search (no `code-review-team-anatomy.html` exists) and via the `class="flow-diagram"` count above. Its Skills Library section has only the embedded `SKILL.md` text and specialist cards. There's an unrelated ASCII box diagram in a completely different section (`<section id="code-review">`, "10.5 — Code Review Agent") describing a generic 5-agent PR-review feature that is **not** the `fsd:code-review-team` skill — do not touch it, it's out of scope.
- A standalone, unlinked deep-dive page `sec-review-team-anatomy.html` (84KB, repo root) also exists but is referenced from nowhere in the playbook or its JS. **Confirmed out of scope with user — leave it untouched.**
- **Confirmed with user:** create a new inline SVG orchestration diagram for `code-review-team` (dark + light, matching `sec-review-team`'s visual style — the solid/dashed-border convention, color tokens, figure/caption structure) and place it in the Skills Library's `code-review-team` section, not the unrelated 10.5 section.

**Build pipeline:** `fsad-playbook.html` (repo root) is the source of truth; `dist/fsad-playbook.html` and `dist/embeddings.json` are generated from it via `scripts/build-dist.py` (inlines fonts/playgrounds) and `scripts/build-embeddings.py` (extracts text chunks for the in-page semantic search). Both must be regenerated after editing the root file, or the shipped `dist/` build silently serves stale content.

**Version state (re-verified on the `origin/main`-based branch at execution time — the `v3.2.27` figures noted during planning were from the stale `release/v3.2.27` branch and are superseded):**
- `README.md` version table: `v3.2.30`
- `CHANGELOG.md` latest entry: `### v3.2.30 — 2026-07-29` (Codex rust-v0.146.0 auto-update, CBP-336 through CBP-338)
- `fsad-playbook.html` `<title>`: `FSAD — Full Stack Agentic Development (v3.2.30)`
- No `package.json` in this repo — version lives only in the two files above plus the HTML title.
- Bump to **v3.2.31** (patch, semver) as part of this task — same bump rationale user confirmed during planning (content resync, no version-worthy feature on its own, but the user directed a bump regardless).

**Git state (verified directly):** repo was checked out on `release/v3.2.27` when this task was picked up in planning, but `origin/main` had newer commits not in that branch. Per user direction, isolated this work on a fresh branch `release/v3.2.28` cut from `origin/main` (346c935) — kept that branch name even though the version target is now v3.2.31, since renaming a branch mid-flight is unnecessary churn; `tb:ship-it` will detect and fix the stale name at ship time per project convention.

**Re-verified: `skills/` is byte-identical between `release/v3.2.27` and this `origin/main`-based branch** — none of the Assessment above needed correction for the skill files themselves, only the playbook HTML surrounding them (see next note).

**Scope correction discovered at execution time — `code-review-team` already partially reworked:** `CBP-325` (already completed, merged to `main`, listed in `CHANGELOG.md`) already ported an earlier version of tb_skills' `code-review-team` rework directly into this repo: the `security-reviewer` specialist already exists in `skills/code-review-team/specialists/`, its Skills Library card already exists (7 cards total, not 6 — confirmed by direct inspection of `<h3>` headers in the Specialist Definitions sub-section), and the roster table already shows it in both lite and full rosters. **Phase 3 step 2 (add a 7th specialist card) is therefore already done — do not duplicate it.** However, `tb_skills/skills/code-review-team/SKILL.md` has continued to evolve *since* CBP-325 (confirmed by direct diff): a `<RUN_DIR>` token added throughout, a completeness-score denominator fix for the coverage matrix, **category-specific proof standards** for the adversarial validator (different specialists get different "prove it's real" phrasing — input-triggerable for correctness/performance/security, cited-sites for design/maintainability, etc.), and a new **3-validator majority-panel gate for critical/major severity findings** (single validator remains for minor/nit) replacing the single-validator-only gate CBP-325 shipped. Phase 1's `code-review-team` merge is real but narrower than the other 11 skills — bring forward these specific deltas, not a wholesale rewrite. Phase 4 step 2 (new diagram) still applies as planned — the diagram doesn't exist yet either way (`flow-diagram` count re-confirmed as 2 on this branch, unchanged) — but its content should reflect the current severity-based single/panel validator split, not the simpler single-validator description originally planned.

**Location:** all work happens in `skills/` and `{README.md,CHANGELOG.md,fsad-playbook.html}` at the repo root, plus `dist/` regeneration via the existing build scripts.

## Plan

### Phase 1 — Resync the 12 shared skills

For each of `ac`, `add-task`, `code-review-team`, `do-task`, `estimate`, `init`, `next`, `sec-review-team`, `ship`, `ship-it`, `sync` (11 — standard case) plus `prd` (1 — special case, see Assessment):

1. Read the current `~/repo/tb_skills/skills/{skill}/SKILL.md` (and any sub-files: `add-task/add-task-projects.yaml`, `code-review-team/{docs,specialists}/*`, `init/templates/*`, `sec-review-team/{docs,specialists,schema,fixtures}/*`).
2. Read the current `skills/{skill}/SKILL.md` (and sub-files) in this repo to identify what's already been genericized vs. what's stale content.
3. Merge forward: apply the genericization pattern from Assessment to tb_skills' current content, while preserving any fsd-specific simplification already established in the fsad copy (dual-config guardrail drop in `do-task`, inline role-embedding in `prd`). If a new fsd-specific adaptation is needed for content that didn't exist at the last sync, use judgment consistent with the existing pattern (self-contained, no dependency on files outside `skills/{skill}/`, no personal references).
4. Write the merged result to `skills/{skill}/SKILL.md` (and sub-files).
5. `code-review-team`'s `specialists/*.md` and `docs/consolidation-template.md`, and `init`'s `templates/*` — diff tb_skills vs fsad for each; these had matching file lists (no drift detected in the initial file-listing pass) but re-check content for staleness during this phase since only line counts on `SKILL.md` were checked, not sub-file content.

### Phase 2 — Fix `sec-review-team/docs/`

1. Create `skills/sec-review-team/docs/`.
2. Copy `output-contract.md`, `consolidation-template.md`, `tradeoffs.md`, `scanner-coverage.md` from `~/repo/tb_skills/skills/sec-review-team/docs/`, rewriting `~/.claude/skills/sec-review-team/docs/X.md` references to relative `docs/X.md`.
3. In `sec-review-team/SKILL.md`, reconcile the "See also" list to include all docs actually referenced/relevant (currently omits `output-contract.md`).

### Phase 3 — Update the Skills Library's embedded skill/specialist text

1. For each of the 12 resynced skills, replace its embedded `SKILL.md` source block inside `<section id="skills-definitions">` with the updated content from Phase 1 (HTML-escape as the existing blocks already do — match current escaping convention, e.g. `&quot;`/`&#x27;`/`&amp;`).
2. `code-review-team`'s Specialist Definitions sub-section (~line 5780) already has 7 cards including `security-reviewer` (added by the already-completed `CBP-325` — see Assessment correction). **Do not add another card.** Instead: spot-check the `security-reviewer` card's Definition file block against the current `skills/code-review-team/specialists/security-reviewer.md` (post Phase 1 resync) to confirm it's still in sync, and update the roster table only if Phase 1's merge changed anything about which rosters `security-reviewer` belongs to (it shouldn't — verify, don't assume).
3. Spot-check `sec-review-team`'s 13 Specialist Definitions cards (~line 7287) against the current `~/repo/tb_skills/skills/sec-review-team/specialists/*.md` files — update any card whose scope/coverage text has drifted, and reconcile the "Related" doc links per the Phase 2 fix.
4. Search the live page (excluding the historical "Recent Updates"/changelog log starting ~line 13600, which is a point-in-time record and must NOT be edited) for other stale hardcoded facts tied to these two skills — e.g. specialist counts, roster descriptions in wf-cards or KPI callouts — and update anything found to match current behavior.

### Phase 4 — Update diagrams

1. **`sec-review-team` orchestration diagram** (dark + light SVGs, `<figure class="sec-review-flow-diagram">`, ~line 7001–7127): add the 5-pass consensus fan-out step for `input-validation-auditor`/`auth-authz-auditor`, the per-finding adversarial validator gate before `REPORT.md`, and the `known-findings.jsonl` ledger/auto-re-review loop. Preserve the existing visual language (solid border = baseline/always-run, dashed = stack-specific/conditional; dark/light color tokens; `<title>`/`<desc>` accessibility text) — update, don't redesign.
2. **`code-review-team` orchestration diagram (new)**: create a matching inline SVG figure (dark + light variants) and insert it into the Skills Library's `code-review-team` section (near its Specialist Definitions header, ~line 5780) — not into the unrelated `id="code-review"` (10.5) section. Depict: user invocation → orchestrator (lite: 4 specialists always-run vs full: +3 more including `security-reviewer`, already reflected in the roster table) → parallel specialists (solid border = lite/always-run, dashed = full-mode-only, matching sec-review-team's convention) → `correctness-reviewer`/`performance-reviewer` 5-pass consensus fan-out (rotated file order, kept if seen in ≥2 of 5 passes) → orchestrator consolidate (dedupe, rank by severity, coverage matrix) → **severity-based validator gate**: minor/nit findings get a single validator, critical/major findings get a 3-validator majority panel (2-of-3 confirms) — depict both paths, not just one generic gate → `REVIEW-REPORT.md` → `known-findings.jsonl` ledger driving auto-skip on re-review. Match `sec-review-team`'s figure structure, caption, and `<title>`/`<desc>` accessibility pattern.
3. Do not touch `sec-review-team-anatomy.html` or the unrelated `id="code-review"` (10.5) section — both confirmed out of scope.

### Phase 5 — Regenerate dist artifacts

1. Run `python3 scripts/build-dist.py` from the repo root to regenerate `dist/fsad-playbook.html` from the updated root file.
2. Run `python3 scripts/build-embeddings.py` to regenerate `dist/embeddings.json` so in-page semantic search reflects the updated Skills Library/diagram text.
3. Confirm both scripts exit cleanly and `dist/fsad-playbook.html` / `dist/embeddings.json` timestamps update.

### Phase 6 — Verify no personal/stale references leaked through

1. `grep -rn "tb:" skills/` — expect zero matches across all 12 resynced skills (excluding `sec-review-fixes`, which is out of scope).
2. `grep -rn "Theo\|theobeack\|/Users/theobeack" skills/` — expect zero matches.
3. `grep -rn "~/.claude/skills/" skills/` — expect zero matches (fsad convention is relative paths within each skill's own directory).
4. Confirm `prd/SKILL.md` still has no dependency on external role files (`~/.claude/skills/prd/roles/...`) — role content stays embedded inline.
5. Confirm `do-task/SKILL.md` Step 0 does not reference a second `projects.yaml`/registration-gap check against a `tb`-namespaced file.
6. Spot-check that the Skills Library's embedded `SKILL.md` blocks (Phase 3) don't contain `tb:` or personal references either — the HTML embed is a separate copy from the file on disk and must be checked independently.

### Phase 7 — Version bump and CHANGELOG

1. Update `README.md` version table: `v3.2.30` → `v3.2.31`.
2. Update `fsad-playbook.html` `<title>`: `(v3.2.30)` → `(v3.2.31)`.
3. Add to `CHANGELOG.md`, above the `v3.2.30` entry:

   ```
   ### v3.2.31 — 2026-08-04

   **Skills Library resync: `fsd:` skills brought current with `tb_skills` (CBP-339)**

   - **CBP-339 — Resync the `fsd:` Skills Library with upstream `tb_skills`.** The 12 shared skills (`ac`, `add-task`, `code-review-team`, `do-task`, `estimate`, `init`, `next`, `prd`, `sec-review-team`, `ship`, `ship-it`, `sync`) were stale relative to `tb_skills`' latest diagnostic-fixes wave; content has been merged forward while preserving the Skills Library's established self-contained adaptations (no external file dependencies, no personal references). `code-review-team` needed a narrower delta since CBP-325 had already ported an earlier version of its rework — this brings forward the category-specific validator proof standards and the 3-validator majority panel for critical/major findings added since. Also fixed a broken-reference bug in `sec-review-team` — its `SKILL.md` linked to `docs/scanner-coverage.md`, `docs/consolidation-template.md`, and `docs/tradeoffs.md`, none of which existed in the shipped skill; the `docs/` directory is now included. The playbook's Skills Library page has been updated to match: embedded `SKILL.md`/specialist text refreshed, the `sec-review-team` orchestration diagram updated to show its consensus fan-out and adversarial validation gate, and a new matching orchestration diagram added for `code-review-team` (previously undocumented visually). `dist/` rebuilt to match.
   ```

All criteria verified 2026-08-04 before commit.

## Acceptance Criteria
- [x] No file under `skills/{ac,add-task,code-review-team,do-task,estimate,init,next,prd,sec-review-team,ship,ship-it,sync}/` contains the substring `tb:`
- [x] No file under those same 12 skill directories contains `Theo`, `theobeack`, or an absolute `/Users/theobeack` path
- [x] No file under those 12 skill directories references an external `~/.claude/skills/...` path (all cross-references are relative, within the skill's own directory)
- [x] `skills/prd/SKILL.md` still embeds the Analyst and PM role content inline (no dependency on `~/.claude/skills/prd/roles/*.md`), and its embedded role content matches the current content of `~/repo/tb_skills/skills/prd/roles/analyst.md` and `pm.md`
- [x] `skills/do-task/SKILL.md` Step 0 does not include the dual-config registration-gap guardrail (no reference to a second `tb`-namespaced `projects.yaml`)
- [x] `skills/sec-review-team/docs/` contains `output-contract.md`, `consolidation-template.md`, `tradeoffs.md`, and `scanner-coverage.md`, and every `docs/*.md` reference inside `sec-review-team/SKILL.md` resolves to an existing file
- [x] `skills/sec-review-fixes/` is unchanged (byte-identical to its state before this task)
- [x] `fsad-playbook.html`'s `#skills-definitions` section embeds the updated `SKILL.md` source (HTML-escaped) for all 12 resynced skills, matching the files on disk under `skills/`
- [x] `code-review-team`'s Specialist Definitions sub-section has 7 cards, including a `security-reviewer` card with Primary scope/Coverage dimensions/Definition file matching `skills/code-review-team/specialists/security-reviewer.md` (post Phase 1 resync)
- [x] `sec-review-team`'s inline orchestration SVG (both dark and light variants) depicts the 5-pass consensus fan-out for `input-validation-auditor`/`auth-authz-auditor`, the per-finding adversarial validator gate, and the `known-findings.jsonl` ledger
- [x] `code-review-team` has a new inline orchestration SVG (dark + light variants) in its Skills Library section depicting its current specialist roster (including `security-reviewer`), the correctness/performance 5-pass consensus fan-out, the severity-based single-validator (minor/nit) vs 3-validator-panel (critical/major) gate, and `REVIEW-REPORT.md` output
- [x] `sec-review-team-anatomy.html` and the unrelated `id="code-review"` (10.5) section are both byte-identical to their state before this task
- [x] `dist/fsad-playbook.html` and `dist/embeddings.json` are regenerated (newer mtime than the pre-task state) and `scripts/build-dist.py` / `scripts/build-embeddings.py` both exit without error
- [x] `README.md` version table and `fsad-playbook.html` `<title>` both read `v3.2.31`
- [x] `CHANGELOG.md` has a new `### v3.2.31 — 2026-08-04` entry above `### v3.2.30`
