# CBP-343 — Import the anonymized Imprivata agentic skills framework

## Source
User directive, interviewed live during `/tb:do-task CBP-340` (originally filed as `CBP-340`; renumbered to `CBP-342` mid-interview to avoid an initial collision with the then-uncommitted `task-cbp-341.md`, then renumbered again to `CBP-343` after a concurrent session merged unrelated work into `main` as real `CBP-340`/`CBP-342` entries — see `git log` PR #166, `cbp-342-fix-duplicate-updater-defs`). Grounded in an existing scan document at `/Users/theobeack/Repo/imprivata/planning/plan/anonamization_plan.md` (dated 2026-07-30), which inventories every company-specific reference across the two source repos and proposes a per-class treatment.

## Summary
Import an anonymized copy of Theo's two personal-work skill/agent frameworks — `engineering-skills` and `product-skills`, both at `/Users/theobeack/Repo/imprivata/skills/` — into `fsad_playbook/skills/` as two new self-contained subfolders (`skills/engineering-skills/`, `skills/product-skills/`), stripped of all Imprivata-identifying content. No fictional stand-in company name is introduced (e.g. no "Acme") — branded paths and prose are genericized to bare/neutral form, consistent with how this repo's existing `fsd:` skills carry no company name. This task covers Plan phases **B (build the export) and C (verify)** only from the anonymization plan; **Phase D (packaging/release) is explicitly out of scope**, and — critical — **the resulting branch must not be pushed or merged past the local worktree**, since Imprivata legal/marketing sign-off (Phase A) has not happened yet and `fsad_playbook` is a public GitHub repo (`tbeack/fsad_playbook`).

## Assessment

**Source repos** (both private, not this project): `/Users/theobeack/Repo/imprivata/skills/engineering-skills/` and `/Users/theobeack/Repo/imprivata/skills/product-skills/`. Each carries its own `skills/`, `agents/`, `rules/` (engineering only), `templates/`, `context/`/`memory/` (engineering only), `docs/`, `scripts/`, `tests/`, `.github/workflows/`, plus a full `.git` history — unlike `fsad_playbook/skills/`, which is a flat list of 13 skill folders with no categories or sibling asset types.

- `engineering-skills/skills/` has 12 categories (`architecture`, `collaboration`, `correctness`, `debugging`, `meta`, `operations`, `orchestration`, `problem-solving`, `security`, `testing`, `tools`, `writing`) totaling ~91 skills; ~85 are already company-agnostic per the anonymization scan.
- `product-skills/skills/` has 24 skills, 4 of which are branded by name: `imprivata-figma`, `imprivata-product-design`, `imprivata-feature-discovery`, `imprivata-design-guide`. `product-skills/commands/` also has `imprivata-product-design.md` and `imprivata-figma.md`.
- Other branded paths: `engineering-skills/memory/imprivata-context.md`, `engineering-skills/templates/imprivata.yaml`.

**Nesting decision:** each source repo becomes one self-contained subfolder under `fsad_playbook/skills/` (`skills/engineering-skills/`, `skills/product-skills/`), preserving each framework's own internal `skills/agents/rules/templates/...` layout untouched — this keeps their internal cross-references intact rather than risking breakage from interleaving with `fsad_playbook`'s own conventions.

**No git history is carried over** — this is a working-tree file copy, not a `git init` clean-room export as the anonymization plan describes for a standalone repo release. That eliminates the plan's single largest leak vector (contributor names/emails in commit history) by construction; `.git` in both source repos must not be touched or read.

**Per-class treatment** (full detail in the anonymization plan doc; classes renumbered here to match its §2/§3 tables):

| Class | Treatment for this import |
|---|---|
| 1. "Imprivata" everywhere (103 product-skills files, 175 engineering-skills files) | **Excise/genericize to bare form** — no substitute company name. `author: imprivata-shared-tools` → `author: framework-maintainers` (or similar neutral value); `imprivata/artifact/v1` schema ID → a neutral equivalent. |
| 2. Branded paths (8: 4 skills, 2 commands, `memory/imprivata-context.md`, `templates/imprivata.yaml`) | **Rename to bare names**: `imprivata-figma`→`figma`, `imprivata-product-design`→`product-design`, `imprivata-design-guide`→`design-guide`, `imprivata-feature-discovery`→`feature-discovery`, `imprivata-context.md`→`company-context.md`, `imprivata.yaml`→`product-membership.yaml`. Update every cross-reference to the old names. |
| 3. GitHub org/repo URLs (`imprivata-shared-tools/*`, `imprivata-pas/*`, `imprivata/eam-client`, engineering-operating-model repo) | **Parameterize/remove** — generic `your-org/<repo>` placeholder in docs/install scripts; remove `imprivata-pas`, `imprivata/eam-client`, and engineering-operating-model references entirely. |
| 4. Internal domains (`jira.imprivata.com`, `imprivata.com`, Confluence/SharePoint instance paths) | **Genericize** — `jira.example.com`, strip instance-specific paths, keep tool names (Jira/Confluence/SharePoint) where the skill genuinely integrates with them. |
| 5. Product names (EAM, SecureLink, Mobile Access, EPCS, FairWarning, OneSign, ConfirmID) | **Genericize to invented examples** (e.g. "Access Manager", "Remote Connect"); EPCS/FairWarning compliance examples → generic "regulatory module." |
| 6. Design system (~2,674 duplicated lines in `imprivata-design-guide/references/` and `imprivata-product-design/references/`) | **Excise + stub** — replace both `references/` trees with a single shared stub structure (section headings + instructions to populate from the adopter's own design system). |
| 7. Figma links (119 `figma.com/design` + 88 `figma.com/files`, mostly in `source-registry.md`) | **Excise entirely** — `source-registry.md` becomes a template explaining the registry pattern with no real URLs. |
| 8. People (contributor names in docs; full names/emails in git history) | **Excise from docs.** Git history is moot here (not copied — see above). |
| 9. Jira conventions (`skills/tools/jira/`, 809-line skill + references) | **Genericize, keep the skill** — real custom field IDs → `customfield_XXXXX` placeholders, internal workflow states → Jira defaults, `jira.imprivata.com` → `jira.example.com`. |
| 10. Internal records (`context/wiki/` 13 pages, `changes/` + `changes/archive/` 142 files, `AGENT_RUN_PLAN.md`, `docs/start-product-backlog-intake-test-report.md`, filled `memory/imprivata-context.md` content) | **Excise entirely** — ship the already-existing empty templates for wiki/changes conventions instead; ship `company-context.md` as blank boilerplate. |
| 11. Org-scoped CI (`.github/workflows/*`: GitHub App tokens, org secrets) | **Genericize** — strip org-scoped secret/token names, keep workflow logic with a `# configure for your org` comment. |

**Prose-leakage risk (cannot be grepped away):** flagged large docs needing a manual read-through — `product-skills/docs/AI_NATIVE_PM_FRAMEWORK.md` (~1,600 lines), `product-skills/docs/TESTING.md`, `product-skills/docs/USER_GUIDE.md`, both repos' `README.md` (35.7K / 14K) and `CONTRIBUTING.md`, and the jira skill's workflow docs under `engineering-skills/skills/tools/jira/references/`.

**Reusability:** per the anonymization plan's own recommendation ("the deliverable is a script, not a one-time edit") and matching this repo's existing upstream-resync convention (`CBP-339`/`CBP-341` for `tb_skills`), the substitution/exclusion logic should live as a script + mapping/exclusion-manifest config committed to `fsad_playbook/scripts/`, so a future re-sync from the private repos is a re-run, not a re-derivation.

**Location:** new dirs `skills/engineering-skills/`, `skills/product-skills/`; new script `scripts/import-imprivata-skills.py` (or `.sh`) + its mapping/exclusion config; no changes to existing `skills/{ac,add-task,...}` folders.

## Plan

### Phase 1 — Build the import tooling
1. Write an exclusion manifest listing every class-10 path (`changes/`, `changes/archive/`, `context/wiki/`, `AGENT_RUN_PLAN.md`, `docs/start-product-backlog-intake-test-report.md`) and the class-6/7 design-reference paths, per repo.
2. Write a substitution mapping covering classes 1, 3, 4, 5, 9, 11 (string/regex → replacement pairs), sourced from the anonymization plan's §3 table.
3. Write `scripts/import-imprivata-skills.py`: for each of the two source repos, copies the working tree (excluding `.git` and the exclusion-manifest paths) into the corresponding `skills/{engineering-skills,product-skills}/` destination, applies the substitution mapping, and renames the class-2 branded paths.
4. Generate the class-6 stub `references/` structure (shared between the two design-related skills) and the class-10 stub replacements (blank `company-context.md`, empty `changes/` + README, existing empty wiki templates) — write these as inputs the script drops in place of the excised content.

### Phase 2 — Run the import
5. Run the script against both source repos, producing `skills/engineering-skills/` and `skills/product-skills/` in the fsad_playbook worktree.
6. Fix any internal cross-references broken by the class-2 renames (grep the output tree for the old branded names post-rename).

### Phase 3 — Verify (Phase C automated gate)
7. Run the anonymization plan's leak-scan verbatim against both new directories:
   ```
   grep -riE "imprivata|onesign|securelink|fairwarning|confirmid|patientsecure|groundcontrol|\bEAM\b|EPCS" skills/engineering-skills skills/product-skills
   grep -rE  "jira\.[a-z-]+\.(com|net)|atlassian\.net|figma\.com/(design|files)" skills/engineering-skills skills/product-skills
   grep -rE  "imprivata-shared-tools|imprivata-pas|niedelman|burleson|broderick|boreda" skills/engineering-skills skills/product-skills
   ```
   Every command must return zero hits; fix and re-run until clean.
8. Manually read through the flagged prose-heavy docs (Assessment, "Prose-leakage risk") for anecdotes/workflow descriptions that are recognizably Imprivata without containing a grep-able string; fix any found.

### Phase 4 — Land it
9. Confirm no `.git` directory exists inside either new `skills/` subfolder.
10. Leave the work on its worktree branch. Do **not** run `tb:ship-it`, commit-push, or open a PR — flag in the handoff that this is gated on Imprivata legal/marketing sign-off (per the anonymization plan's Phase A) before it can move past the local branch.

## Prose Review Notes (2026-08-05)

Manual read-through was delegated to an independent subagent (not the implementing context) with instructions to find leaks the grep gate can't catch. It read `AI_NATIVE_PM_FRAMEWORK.md`, `TESTING.md`, `USER_GUIDE.md`, both `README.md`/`CONTRIBUTING.md`/`AGENTS.md`, `FAQ.md`, and the full jira skill (`SKILL.md` + all of `references/`, including `references/workflows/*.md`).

**Found and fixed** (all via new substitution rules in `scripts/import_imprivata_skills.py`, re-run until the 3 leak-scan gates plus a 4th ad hoc gate for these specific terms all returned zero hits):
- Real employee usernames in dotted-name form: `alejo.castro` (Jira skill's `issue-fields.md`/`common-workflows.md` examples) → `jane.doe`; `preston.broderick` (a real full name that survived the surname-only redaction rule because it's a single dotted token, in `TESTING.md`'s dry-run logs) → `user.redacted`.
- The Jira skill's `references/workflows/*.md` files turned out to be lightly-edited real tickets, not synthetic examples: a real stack trace with real internal Java package names (`bug.md`), real internal repo names `rba-client`/`pas-orchestrator`/`dockerfiles-buildbox` (`story.md`, `task.md`), real ticket numbers under real project prefixes `PASTO-643`/`PAS-1394`/`SDK-378`/`BUILD-914`/`915` (`epic.md`, `task.md`, `SKILL.md`, `common-workflows.md`), a real Confluence space+page ID (`task.md`), and a real third-party product citation `digicert/-keylocker` (`SKILL.md`). All genericized in place (e.g. `PASTO-643`→`PROJ-643`, `rba-client`→`auth-client-lib`, the stack trace's package root → `com.example.app.*`) rather than excising the files wholesale, since `SKILL.md` loads `references/workflows/<type>.md` at runtime for required-field definitions — removing them would have broken the skill, not just removed examples.
- Real product/edition codes beyond the anonymization plan's original class-5 list, found enumerated together in a product-portfolio sentence and in several skills' edition-handling examples: `CPAM`/`VPAM` (incl. as `CPAM_MODE`-style env vars) → `ACCESSCONSOLE`/`VAULTCONSOLE`; `PAS`/`DDI`/`EAMA`/`MAMA` (case-aware — these double as lowercase example slugs like `product_id: pas`) → `Privileged Access`/`Directory Sync`/`Edition A`/`Edition B` (prose) or `privileged-access`/`directory-sync`/`edition-a`/`edition-b` (slug form).

**Deliberately left as-is (assessed, not leaks or out of proportionate scope):**
- `PAS` as a bare 3-letter Jira project-key convention prefix elsewhere in the (already-fixed) ticket examples — the prefix itself is now genericized via the substitutions above; no further action needed.
- A handful of real git commit SHAs preserved verbatim in `TESTING.md`'s historical dry-run sections — not identifying on their own (subagent flagged as low-confidence).
- Minor grammatical awkwardness introduced by mechanical company-name removal (e.g. "the organization design standards" missing a possessive) — not a leak, cosmetic only; left for a future polish pass rather than expanding this task's scope.

## Acceptance Criteria

- [x] `skills/engineering-skills/` and `skills/product-skills/` exist, each retaining its own internal `skills/`, `agents/`, `templates/`, etc. structure (self-contained subfolders, not merged/interleaved with `fsad_playbook`'s existing skill folders).
- [x] `grep -riE "imprivata|onesign|securelink|fairwarning|confirmid|patientsecure|groundcontrol|\bEAM\b|EPCS" -r skills/engineering-skills skills/product-skills` returns zero hits.
- [x] `grep -rE "jira\.[a-z-]+\.(com|net)|atlassian\.net|figma\.com/(design|files)" skills/engineering-skills skills/product-skills` returns zero hits.
- [x] `grep -rE "imprivata-shared-tools|imprivata-pas|niedelman|burleson|broderick|boreda" skills/engineering-skills skills/product-skills` returns zero hits.
- [x] Branded paths are renamed to bare names with no fictional company substituted anywhere in the two new directories: `imprivata-figma`→`figma`, `imprivata-product-design`→`product-design`, `imprivata-design-guide`→`design-guide`, `imprivata-feature-discovery`→`feature-discovery`, `memory/imprivata-context.md`→`memory/company-context.md`, `templates/imprivata.yaml`→`templates/product-membership.yaml`.
- [x] No `changes/archive/` content, no real `context/wiki/` pages, no `AGENT_RUN_PLAN.md`, and no `docs/start-product-backlog-intake-test-report.md` exist in either new directory (class-10 excisions applied).
- [x] The design-guide/product-design `references/` folders contain only stub template content (section headings + fill-in instructions), not the original ~2,674 lines of proprietary design detail.
- [x] Neither `skills/engineering-skills/` nor `skills/product-skills/` contains a `.git` directory.
- [x] `scripts/import-imprivata-skills.py` (or equivalent) exists, is committed, and documents how to re-run the import for a future sync. (Committed 2026-08-06 at `6975a22` after explicit user go-ahead — see below; initially FAIL because nothing is auto-committed per the `tb:do-task` no-auto-commit policy.)
- [x] A record exists (in this task file or a review note) confirming a manual read-through of `AI_NATIVE_PM_FRAMEWORK.md`, `TESTING.md`, `USER_GUIDE.md`, both `README.md`/`CONTRIBUTING.md` files, and the jira skill's workflow docs for prose-level leaks, with any findings fixed.
- [x] The task handoff explicitly states the branch has not been pushed, merged, or shipped, and is gated on Imprivata legal/marketing sign-off before any of that happens. (See handoff message.)

All criteria verified 2026-08-06 before commit (9 via independent verifier + adversarial refuter on 2026-08-05; the script-commit criterion re-verified the same way on 2026-08-06 after the user explicitly approved committing this worktree branch — commit `6975a22`, local only, not pushed).
