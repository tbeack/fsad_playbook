# SPEC-REVIEW.md structure

The orchestrator assembles the final report from this template. Every section is required; a section with nothing to say still appears, stating that explicitly (e.g. "No blocking issues found") rather than being omitted — an omitted section reads as "not reviewed," not "clean."

```markdown
# Spec Review — <document title>

Reviewed: <spec path> · <date> · depth: <quick|standard|deep> · stance: <1-5>

## Verdict

**<Ready | Ready with changes | Needs rework | Reject premise>**

<Two-sentence justification.> The single most load-bearing weakness: <one sentence>.

## Steelman

<From Phase 1 — the proposal's core claim, the problem it solves, the mechanism, and
the strongest case for it, in the author's best terms. The author should recognize
this as a fair restatement before reading anything critical.>

## Blocking issues

<Findings with severity: blocking, that survived Phase 3. If none, state
"No blocking issues — nothing here prevents this proposal from proceeding."
explicitly rather than omitting the section.>

### <finding title>
- **Anchor:** "<heading>" — "<quote>"
- **Refs:** <claim/assumption/decision/requirement IDs, e.g. C-03, A-01>
- **Problem:** <what's wrong>
- **Consequence:** <concrete downstream failure>
- **Confidence:** <high | medium | low>
- **Suggested fix:** <specific fix, or the specific question to answer>

## Major

<Same finding format as above, severity: major.>

## Minor

<Same finding format, severity: minor.>

## Nit

<Same finding format, severity: nit — reviewer preference, explicitly labeled as such.>

## Unanswered questions

<Ranked by how much of the proposal collapses if the answer is unfavourable —
most load-bearing first. This section is first-class, not an appendix; it is
often the most valuable output of the review.>

1. <question> — if the answer is unfavourable: <what collapses>

## Assumption register

| ID | Assumption | What breaks if false | Cheapest test |
|---|---|---|---|
| A-01 | <assumption> | <consequence> | <cheapest way to check> |

## Alternatives not considered

<From alternatives-analyst — at least "do nothing" and the cheapest 80% version,
honestly compared against the proposal as written. If the proposal already
considered alternatives fairly, say so rather than manufacturing a gap.>

## Considered and dropped

<Every finding a majority of validators refuted, kept visible with the refutation
reason — not deleted. This is what proves the review actually checked things,
not just generated plausible-sounding critiques.>

- <finding summary> — refuted: <reason>

## Coverage

<Which lenses ran (per --depth/--lens), which were skipped and why, which
document sections had no finding quoted against them (and whether that's because
they're clean or because nobody looked), and how many completeness-critic rounds
ran before converging.>

- Lenses run: <list>
- Lenses skipped: <list, with reason — "not applicable to this document type" is
  a valid reason, silent skipping is not>
- Sections with no findings quoted: <list, or "none">
- Completeness-critic rounds: <N> (<M> new findings surfaced total)
```

## Assembly notes for the orchestrator

- **Verdict** is a judgment call informed by the blocking-issue count and the severity distribution, not a mechanical formula — a document with zero blocking issues but a pile of unresolved major findings on its core mechanism can still warrant `Needs rework`.
- Only `validator_verdict.status: "survived"` findings appear in Blocking/Major/Minor/Nit. Everything with `status: "refuted"` goes to **Considered and dropped** instead, in full — never silently deleted.
- If a lens legitimately found nothing (empty `findings.jsonl`), that's a real "clean" result — it should read as confirmation the lens looked and found nothing, not as an absence.
- A padded report — findings manufactured to look thorough — is a failure of this skill, not a sign of rigor. If the document is genuinely solid, the report should be short and say so.
