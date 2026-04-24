# CBP-061 — sec-review-team: emit structured JSONL findings alongside prose markdown (P0.1)

## Source
Recommendation P0.1 in [`markdown/research/sec-review-recommendations.md`](../research/sec-review-recommendations.md). Flagged as the single highest-leverage change — the prerequisite that unlocks scripted dedupe, CI integration, re-run mode, fix-pass workflows, and trend analysis across runs.

## Summary
Each specialist in `sec-review-team` currently writes unstructured prose markdown; consolidation requires a human-scale read of ~1,000 lines per run, dedupe is subjective, and nothing downstream can consume the findings programmatically. Add a parallel JSONL output (`<agent>.findings.jsonl`) that emits one machine-parseable finding per line, validated against a JSON schema, so `REPORT.md` becomes a template-rendered dedupe rather than a fresh prose synthesis.

## Assessment
- **Current state:** Six specialist briefs in `.claude/skills/sec-review-team/SKILL.md` instruct each agent to write a single prose `.md` file. Consolidation (Step 4) is a manual read of all six files.
- **What's missing:** No structured schema, no JSONL output, no programmatic dedupe on `root_issue`, no CI-consumable artifact. The reference schema is already drafted in [`sec-review-recommendations.md` Appendix A](../research/sec-review-recommendations.md#appendix-a--reference-structured-finding-schema).
- **Why it's the highest-leverage change:** structured output is what makes P0.3 (confidence), P2.1 (re-run mode), P2.2 (ledger), P2.3 (test harness), P2.4 (`/sec-review-fixes` companion), and P3.2 (SARIF export) cheap. Without it, each of those becomes a bespoke parser.

**Location:** `.claude/skills/sec-review-team/SKILL.md` — specialist briefs in Step 3a (lines 46–108); consolidation in Step 4 (lines 110–123).

## Plan

1. Create `.claude/skills/sec-review-team/schema/finding.schema.json` with the JSON schema from Appendix A of the recommendations doc (fields: `id`, `specialist`, `severity`, `confidence`, `title`, `root_issue`, `file`, `line_range`, `exploit`, `fix`, `evidence`, `threat_model`, `cwe`, `cve`, `tags`, `related`).
2. Create `.claude/skills/sec-review-team/schema/coverage.schema.json` for per-category "checked-clean" records (fields: `category`, `specialist`, `status`, `confidence`, `searches`, `files_read`, `search_limits`).
3. Update each of the six specialist briefs in `SKILL.md` to instruct the agent to emit **both**: (a) the existing prose `<agent>.md` and (b) a new `<agent>.findings.jsonl` + `<agent>.coverage.jsonl`. Include the schema paths in the brief so agents validate before writing.
4. Update Step 4 (consolidation) to: read all `*.findings.jsonl` files, group by `root_issue`, take `max(severity, confidence)` across the group, collect `raised_by`, and render to `REPORT.md` via a template. Keep prose `.md` files as reference/backup.
5. Add a fallback path: if an agent fails to emit valid JSONL (schema validation fails), the orchestrator falls back to parsing the prose file for that specialist and logs a warning.
6. Add a small consolidation-template doc (`.claude/skills/sec-review-team/consolidation-template.md`) that defines the REPORT.md structure programmatically.
7. Re-run against the `recall` reference target (CBP-060 baseline). Confirm severity counts match, and that the deduped-high count (3) is reproduced by the scripted grouping.

## Acceptance Criteria
- [x] `.claude/skills/sec-review-team/schema/finding.schema.json` and `coverage.schema.json` exist and validate against draft 2020-12.
- [x] All six specialist briefs in `SKILL.md` instruct agents to emit JSONL + prose.
- [ ] Consolidation step reads JSONL and generates `REPORT.md` via a template; human-readable output matches the CBP-060 reference within severity counts. _(pending live re-run validation)_
- [x] JSONL schema-validation failure falls back to prose parse with a logged warning.
- [ ] Re-run against `recall` produces the same deduped count (0 critical, 3 high, 8 medium, 11 low) as CBP-060. _(pending: requires authorized ~30 min / 6-specialist run against recall)_
- [x] Schema illustration JSONL committed to `markdown/research/sec-review-recall-cbp060-schema-illustration.jsonl` — 35 findings (9H/12M/14L) derived from CBP-060 prose output, clearly labeled as schema illustration not a live run. Confirms schema design against real finding data; live re-run validation is a separate step.
