# `fsd:plan-review` — findings-document template

Assemble `target` from this template in Phase 6. Every section below is required. Sections marked *(conditional)* are omitted only when the stated condition holds, and their omission is recorded in **Coverage**.

House rules for the prose:

- Quote the plan **verbatim in italics** whenever the wording is the problem. Paraphrase hides the defect.
- Every finding carries its `path:line` or its runnable command. A finding with neither does not appear in this document at all — it belongs in *Considered and dropped*.
- Cite counts and diff stats. "Three of the seven entities" beats "several".
- No hedging adjectives. "Possibly problematic" is not a finding; either the evidence shows it or the finding was dropped.
- Do not propose fixes in the body. Offer at the end.

---

## Template

````markdown
# Plan review — <plan title>

## Header

| | |
|---|---|
| **Reviewed** | [<plan path or PR title>](<link>) |
| **Reviewed against** | [<baseline path or title>](<link>) — *chosen because: <how it resolved>* |
| **Reviewer** | `fsd:plan-review` — depth `<quick\|standard\|deep>`, <N> lenses |
| **Date** | YYYY-MM-DD |
| **Head SHA** | `<sha>` <version tag, if any> |
| **Base SHA** | `<sha>` <version tag, if any> — <N> commits behind `origin/<default>` |
| **Scope** | <verbatim `scope`, or "full plan"> |
| **Run artefacts** | `<RUN_DIR>` |

**Documents read** — every document opened during this review:

- `<path>` — <what it is> (<N> lines)
- `<path>` — <what it is> (<N> lines)
- …

*(If a document that would normally be read did not exist — a decisions sidecar, a testing document, a baseline — say so here explicitly. An absent document is a fact about the plan, not a blank in the report.)*

---

## Since the previous pass *(conditional — second pass only)*

Previous head `<sha>` → current head `<sha>`.

| | Count |
|---|---|
| Resolved | <n> |
| Still open | <n> |
| Newly raised | <n> |

- **Resolved** — <finding id and one-line claim>. <What changed, with the new `path:line`.>
- **Still open** — <finding id and one-line claim>. Surviving <n> passes.
- **Newly raised** — <finding id and one-line claim>. First seen this pass.

---

## Verdict

Three to six sentences. It must do four things:

1. Say whether the plan can be implemented as written.
2. Name what the plan is **stronger** at than its baseline, not only weaker — a verdict that reports losses alone misrepresents the plan.
3. Name the merge-blockers in one line, by number.
4. Point at the judgment call, separately, without resolving it.

> **Example shape:** *The plan is implementable after two blocking fixes. It is materially stronger than the baseline on <X> — it adds <specific thing the baseline never required>. It is weaker on <Y>: <baseline §n> requires <thing> and no step provides it. Blocking: (1) <one-line claim>, (2) <one-line claim>. One judgment call is the owner's, not the review's — see §(c).*

---

## (a) What is missing from the plan

### 🔴 Blocking

**1. <Bolded one-line claim.>**

- **Where in the plan:** `<path>:<line>` — Step <n>, *"<exact quoted phrase from the plan>"*
- **What the repository actually contains:** <the fact>, per `<path>:<line>` or `` `<runnable command>` `` → <observed output>
- **Consequence:** <what breaks, for whom, when>
- **Confidence:** <high|medium|low> · **Raised by:** `<lens>` <(+ `<lens>` — n lenses agreed)>

**2. …**

*(If there are none: "No blocking findings survived verification." — and say how many were raised and refuted.)*

### 🟠 Contract gaps

**3. <Bolded one-line claim.>**

- **Where in the plan:** `<path>:<line>` — Step <n>, *"<exact quoted phrase>"*
- **What the repository actually contains:** <fact> per `<path>:<line>` or `` `<command>` ``
- **Consequence:** <concrete downstream failure>
- **Confidence:** <…> · **Raised by:** `<lens>`

### 🟡 Minor / mechanical

- **<one-line claim>** — `<path>:<line>`; <fact>. (`<lens>`)
- …

---

## (b) Adherence to the baseline

*(Conditional — omitted only when no baseline resolved, in which case Coverage records `baseline: none` and the reason.)*

Full ledger: `<RUN_DIR>/baseline-diff-auditor.findings.jsonl` and the ledger rows in `<RUN_DIR>/adjudicated.json`. <N> baseline items: <n> adopted, <n> rewritten, <n> dropped, <n> reversed.

### Faithful, and in places stronger

- **§<n> — <baseline item>.** Adopted at `<plan path>:<line>`. <Where the plan exceeds it, if it does.>
- …

### Dropped or reversed

- **§<n> — <baseline item>.** *Dropped.* Baseline `<path>:<line>`: *"<verbatim>"*. Absent from the plan, the decisions sidecar, and the testing document — `` `<grep command>` `` returns no matches, and the plan's Non-goals at `<path>:<line>` does not list it. → finding (a)<n>.
- **§<n> — <baseline item>.** *Reversed.* Baseline requires *"<verbatim>"* (`<path>:<line>`); the plan states *"<verbatim>"* (`<path>:<line>`). → finding (a)<n>.

### Minor / mechanical

- **§<n>** — <stale reference, status-line mismatch, drift>. `<path>:<line>`.

---

## (c) Judgment calls for the owner

⚖️ Each one framed as a question this review deliberately does not answer.

**<Question?>**

- **What the plan does:** *"<verbatim>"* — `<path>:<line>`
- **Defensible answer A:** <answer>. Costs: <cost>.
- **Defensible answer B:** <answer>. Costs: <cost>.
- **Why the review will not decide:** <what the review cannot see — intent, roadmap, a constraint outside the repo>.

---

## Considered and dropped

Findings that were raised and did not survive verification. Kept because their absence is what proves the review checked rather than asserted.

| Finding | Raised by | Why it was dropped |
|---|---|---|
| <one-line claim> | `<lens>` | <verifier's reasoning, verbatim> |

---

## Coverage

- **Lenses run:** `<lens>`, `<lens>`, … (<N> of 7)
- **Lenses skipped:** `<lens>` — <reason>. *(Silent skipping is forbidden; every absent lens appears here.)*
- **Completeness-critic rounds:** <n> — round 1 surfaced <what>, round 2 surfaced <what>, round <n> returned nothing new.
- **Stopped by a cap:** <yes, at N rounds — what was still being surfaced when it stopped | no, the loop ran dry>.
- **Excluded by `scope`:** <what the scope narrowing removed from consideration, or "nothing — full plan reviewed">.
- **Documents not available:** <sidecar / testing doc / baseline that did not exist>.
- **Findings:** <n> raised, <n> survived verification, <n> dropped.

---

*Offer, once, at the end and not before:* "Want me to draft fixes for the blocking findings?"
````
