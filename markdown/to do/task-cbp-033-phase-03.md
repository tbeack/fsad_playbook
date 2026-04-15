# CBP-033 Phase 3 — Second workflow example: `/project:create-spec`

## Source
Follow-up to CBP-033 Phases 1–2. A fresh set of 4 reference screenshots landed in `markdown/examples/` (timestamps 17.40.58 through 17.41.21) showing the spec-generation skill — the natural next walkthrough after the context-initialization skill.

## Summary
Add a second example workflow to the `Workflows` page, positioned immediately **after** the existing *Inside the Project Initialize-Context Skill* section. This second workflow walks through the spec-generation skill — a 4-phase tabbed deep-dive (Setup → Mode → Drafting → Write) using the same `.wf-*` visual language as the first example. Content is transcribed from the new screenshots with three terminology renames applied and one meta-commentary sentence removed.

## Assessment
The first example (`/project:initialize-context`) ships as section `01` on the Workflows page. This phase adds section `02`. Source material lives as 4 screenshots in `markdown/examples/`:

- `Screenshot 2026-04-14 at 17.40.58.png` — Phase 0 Setup
- `Screenshot 2026-04-14 at 17.41.03.png` — Phase 1 Mode
- `Screenshot 2026-04-14 at 17.41.15.png` — Phase 2–8 Drafting
- `Screenshot 2026-04-14 at 17.41.21.png` — Phase 9 Write

Screenshots use internal team vocabulary (`/product:generate-spec`, `legion`, `squad`) and include one line of meta-commentary that doesn't belong in a methodology playbook. All get normalized during transcription.

**Location:** `fsad-playbook.html` — append a new `<section id="project-create-spec">` inside `#page-workflows` **after** the existing `#project-initialize-context` section; add nav sub-item, `sectionToPageMap` entry, and changelog note.

## Rename & Edit Rules (apply during transcription)

| Source term (screenshots) | Playbook term |
|---------------------------|---------------|
| `/product:generate-spec`  | `/project:create-spec` |
| `legion`                  | `project` |
| `squad`                   | `pod` |

**Sentence to remove entirely** (do not transcribe):
> *This is the part that can't be Sherlocked. It's your org's context, structured your way.*

Appears in the Phase 0 Setup "Why this matters" card. Delete it; keep the preceding paragraph.

## Plan

1. **Add section `02 — Inside the Project Create-Spec Skill`** after the existing section `01`. Use the same `.wf-tabs` / `.wf-panel` / `.wf-grid` / `.wf-card` pattern as Phase 1 so the two examples share a visual rhythm.
2. **Tab set:** Phase 0 Setup · Phase 1 Mode · Phase 2–8 Drafting · Phase 9 Write.
3. **Transcribe content from screenshots** with the three renames applied and the Sherlocked sentence removed. Phase-by-phase content (already rename-corrected):
   - **Phase 0 — Setup.** Left card *"Regular context / The skill loads your world"*: pick project (AI / IDMS / Platform); pick pod; read pod `CLAUDE.md`; follow context chain upward; read 2–3 existing specs for conventions; detect author from git config. Right card *"Why this matters"*: "Before a single word is drafted, Claude has the full product context: architecture, services, design standards, platform fundamentals, and examples of how this pod writes specs. The skill does the context loading — the human doesn't have to." *(stop there — do not add the removed sentence).*
   - **Phase 1 — Mode.** Three cards. Option A: *Brain Dump / Paste anything* — "Meeting notes, Slack threads, Gong snippets, half-formed thoughts. Claude structures them into the spec template. You review section by section." Option B: *Guided / Step-by-step questions* — "Claude walks through each section with targeted prompts. Probes for the right inputs: user analytics, customer feedback, competitive signals, success criteria." Right card *The key insight*: "Both paths converge on the same output — a structured spec with problem framing, competitive lens, use cases, architecture context, and acceptance criteria. The skill's job is to **solicit the right inputs** and **load the right context**. Then it hands off to Claude's plan mode for the actual writing. We built the funnel. Claude does the work."
   - **Phase 2–8 — Drafting.** Left card *Guided mode sections* (mono two-column list): Problem / Description → what + why inputs · Competitive Lens → web search, pattern detection · Use Cases → generated from context · Architecture → auto-populated from `CLAUDE.md` · Preconditions → flags, roles, regions · Acceptance Criteria → 2–3 rounds of iteration · Future Scope → planned / possible / out. Right card *Each section: review loop*: "Every section gets presented to you with three options:" + three chips `looks good` / `edit` / `redo`. Then: "The skill stays in the loop until you're satisfied. Competitive lens auto-searches the web. Architecture auto-populates from the context chain. You're directing — not writing."
   - **Phase 9 — Write.** Left card *Write & publish*: assembles full spec with YAML frontmatter; writes to `pod/dir/specs/feature-name.md`; regenerates pod roadmap from frontmatter; prints next steps (open PR, refine TODOs). Right card *Then what?*: "Open a PR. Start coding. The spec and code evolve together from here. When the feature ships, clean up the spec as a record of what was actually built." Then: "The entire skill is **a single markdown file** in `.claude/commands/` — ~300 lines. It encodes the process in plain English. Anyone can read it, anyone can PR changes to it."
4. **Wire the new section:** add `project-create-spec` to `sectionToPageMap`; add a sidebar nav sub-item `Project Create-Spec` linking to `#workflows/project-create-spec`.
5. **Closing pull-section.** Decide whether to keep the existing single closing *"One markdown file. An entire onboarding ritual."* section as-is (it still reads well as a one-example closer) or generalize it to cover both skills. Default: generalize the closing subtitle to reference "both skills" / "both rituals" so it doesn't read as specific to only the first example.
6. **Changelog.** Add a Phase 3 note to the in-app v22 changelog entry and `CHANGELOG.md` describing the second workflow, the three terminology renames, and the deleted Sherlocked sentence.
7. **Verify in browser.** Scroll through both workflow sections, click every tab on the new skill, confirm the rename rules held everywhere, confirm search finds `project:create-spec` / `create-spec` / `Drafting` on the new section, and confirm the Sherlocked sentence appears nowhere on the page.

## Acceptance Criteria
- [x] New section `02 — Inside the Project Create-Spec Skill` renders after section `01` on the Workflows page
- [x] 4 phase tabs (Setup · Mode · Drafting · Write) switch correctly — only one panel visible at a time
- [x] All transcribed copy uses `/project:create-spec`, `project` (not `legion`), and `pod` (not `squad`)
- [x] The sentence *"This is the part that can't be Sherlocked. It's your org's context, structured your way."* does not appear anywhere in the file
- [x] Sidebar nav shows `Project Create-Spec` under the Workflows group, below `Project Initialize-Context`
- [x] Section anchor `project-create-spec` is registered in `sectionToPageMap` and resolves via hash route `#workflows/project-create-spec`
- [x] Review-loop chips (`looks good` / `edit` / `redo`) render in the Drafting panel
- [x] Full-text search returns results for `create-spec`, `brain dump`, `guided mode`, and `review loop`
- [x] Both workflow sections render correctly in light, dark, and auto theme modes
- [x] Changelog (in-app modal + `CHANGELOG.md`) documents the second workflow addition and the three rename rules
