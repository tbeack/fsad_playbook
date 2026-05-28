# CBP-201 — Deep research: real-world dynamic workflow use in legacy code refactoring

## Source
User request: research credible real-world examples of engineers/teams using dynamic workflows
(multi-agent orchestration, agentic loops) to refactor complex legacy codebases.

## Summary
"Dynamic workflows" in the FSAD Playbook context means self-paced multi-agent orchestration —
`/loop`-driven agents that fan out work, iterate autonomously, and synthesise results. This task
finds documented case studies where that pattern (or a close equivalent) has been applied to
legacy refactoring, evaluates their credibility, and captures findings in a research file.

## Assessment
No existing research file for this topic. The playbook added a Dynamic Workflows subsection in
CBP-199 with three `/loop` examples but no real-world validation stories. The research should
extend that section's credibility with external evidence.

**Location:** `markdown/research/` — write to `research-cbp-201-dynamic-workflows-legacy.md`

## Plan

### Phase 1 — Web research (multi-modal sweep)

Spawn the `deep-research` skill (or equivalent multi-source web search) targeting:

1. Case studies of **Claude Code / Anthropic agentic workflows** applied to legacy refactoring
   (e.g. Anthropic blog, engineering blogs at companies known to use Claude Code)
2. Case studies of **multi-agent AI code refactoring** in general
   (GitHub Copilot Workspace, GPT-4 agents, open-source agents like AutoCodeRover, SWE-agent)
3. **Conference talks / engineering blog posts** (InfoQ, StackOverflow Blog, the Pragmatic
   Engineer, LeadDev) mentioning AI-driven large-scale legacy migrations
4. Academic / preprint work on **LLM-assisted automated refactoring** of real codebases
   (ACM, arXiv, MSR/ICSE/FSE proceedings)

For each source, record: organisation/author, codebase description, approach used,
scale (LOC, file count, time span), measurable outcome, and URL.

### Phase 2 — Credibility filter

Exclude:
- Marketing copy with no technical detail
- Demos on toy repos
- Purely benchmark/synthetic experiments without real production use

Include only:
- Named organisations or credible researchers
- Described approach with enough detail to replicate or learn from
- Stated outcome (speed, defect rate, test pass rate, or similar)

### Phase 3 — Write research file

Write `markdown/research/research-cbp-201-dynamic-workflows-legacy.md` with:
- **Executive summary** (3–5 sentences)
- One section per example, structured as:
  - **Organisation / Author** + link
  - **Codebase** (language, scale)
  - **Approach** (which agentic pattern, which model/tool)
  - **Outcome** (what was measured, what improved)
  - **Relevance to Dynamic Workflows** (how it maps to the /loop pattern)
- **Gaps & caveats** section (what was hard to find, what remains unverified)
- **Implications for the playbook** (optional short section)

All criteria verified 2026-05-28 before commit.

## Acceptance Criteria
- [x] Research file written to `markdown/research/research-cbp-201-dynamic-workflows-legacy.md`
- [x] At least 3 credible real-world examples documented (named org or researcher, real codebase)
- [x] Each example includes: who, what codebase, what approach, measurable outcome, source URL
- [x] Credibility filter applied — marketing-only or toy-repo examples excluded with a note
- [x] Gaps & caveats section present (honest about what could not be verified)
