# Specialist output-format contract

Every `spec-review` lens — regardless of `--depth`/`--lens` selection — writes one file, `<lens-name>.findings.jsonl`, to `<RUN_DIR>` (`<dir of spec>/.planning/spec-review/runs/<run_id>/`). This doc is the single source of truth for that contract; specialist briefs reference this file instead of repeating it.

## Output contract

**`<lens-name>.findings.jsonl`** — one JSON object per line, one per finding, conforming to `schema/finding.schema.json`. Omit `validator_verdict` — the orchestrator populates that after Phase 3.

If the lens finds nothing in its scope, write an empty file (zero lines) — do not skip writing it. An empty file is a real, checkable "clean" signal; a missing file is indistinguishable from a crashed agent.

## Anchor rule (non-negotiable)

Every finding's `anchor.quote` must be an exact substring of the document being reviewed, paired with the heading it falls under. **A finding with no anchor is not a finding** — if you can't quote it, don't report it. Do not paraphrase the document into a quote; copy the actual text.

## Severity guidance

- `blocking` — must be resolved before this proposal can proceed at all; the document is not actionable until this is answered.
- `major` — a real defect with a concrete, non-trivial consequence; doesn't block reading the rest of the document but must be fixed before this ships.
- `minor` — a real defect, but narrow in impact or easily worked around.
- `nit` — reviewer preference/taste, not a defect. If you can't articulate a concrete consequence, it's a `nit`, not a `major`.

## Confidence guidance

- `high` — the anchor alone proves the claim; no inference needed.
- `medium` — the anchor plus one reasonable inference step.
- `low` — inferred from indirect signals (omission, tone, structure) rather than a direct statement.

## Consequence, not vibe

`consequence` must name a concrete failure mode, not restate the problem in different words. "This is vague" is not a consequence. "Section 4 says 'low latency' with no target; at 500ms the batch job in §6 misses its window" is.

## Hard rules

- Read-only. Tools are allowlisted to prove it.
- Cite the document's actual text — no invented content, no critiquing a section you didn't read.
- Attack the proposal, not the author — neutral tone, adversarial toward the idea.
- Flag everything you notice, even low-confidence hunches — use `confidence: low` for speculative findings rather than omitting them. Phase 3's validator decides keep or drop; lenses don't self-filter on confidence.
- Don't overlap with another lens's stated primary scope — if you notice something squarely owned by another lens, leave it for them.

## Allowed tools

- `Read` — the spec document, the Phase 1 inventory file, and any file in the repo a claim references (e.g. checking whether code/config the spec cites actually exists).
- `Grep`, `Glob` — repo-wide, read-only.
- `Bash` allowlist: `ls`, `cat`, `head`, `tail`, `wc`, `find`, `grep`.
- `Write` — **scoped** to this lens's own `<RUN_DIR>/<lens-name>.findings.jsonl` only.
- **Denied:** `Edit` (this skill never edits the spec — see SKILL.md's review-only rule), arbitrary `Bash`, `Write` outside the one output file, `WebFetch`, `WebSearch`.

## Report-back

Every lens reports back: the absolute path of its findings file, and a one-line count by severity (e.g. `0 blocking, 2 major, 1 minor, 0 nit`).
