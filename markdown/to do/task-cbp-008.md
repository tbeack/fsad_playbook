# CBP-008 — Add "Security Review" Sub-section to Claude Best Practices

Add a new sub-section titled **Security Review** under the **Claude Best Practices** page in `fsad-playbook.html`. The sub-section showcases a reusable multi-agent security review team prompt as a copy-pasteable example.

Source of the example prompt: [../design/Team_of_security_agents.md](../design/Team_of_security_agents.md)

**Out of scope:** actually running the agents. This task is documentation only.

## Research

Before editing, read `fsad-playbook.html` and confirm:

1. Where `page-practices` lives and how its sub-sections are structured (section IDs, heading hierarchy, collapsibles).
2. How existing sub-sections in Best Practices are registered in the **left sidebar nav** for that page.
3. How existing sub-sections appear in the **top indicator pills** (if applicable).
4. The pattern used for code/prompt example blocks (Highlight.js class, copy button, styling).
5. Scroll spy — confirm `sectionObserver` will pick up the new section automatically once it's inside `page-practices` (per CBP-006 fix).

## Plan

### 1. Add the new section to `page-practices`

- Create `<section id="practices-security-review">` placed in a logical order among sibling sub-sections (suggested: after `Code Review Agent` / before `Skills` — confirm during research).
- Heading: `Security Review`
- Intro copy (~2–3 sentences):
  - Explain that Claude Code can orchestrate a team of specialized review agents in parallel.
  - Frame the use case: pre-merge/pre-release hardening pass, no fixes, review only.
  - Note that each specialist writes findings to its own file and the lead agent consolidates.
- Brief bullet list of the 6 specialists and their focus areas (one line each).
- Example prompt block — full contents of `Team_of_security_agents.md`, rendered in a code/prompt example block matching existing styling (copy button if that pattern exists).
- Short "How to adapt" note: replace `<PATH>` and `<scope>` placeholders, adjust agent roster to match your stack.

### 2. Wire it into navigation

- Add the new section's entry to the **left sidebar nav** for `page-practices`, with matching `href="#practices/security-review"` (or whatever slug format the existing entries use — confirm in research).
- Add to **top indicator pills** if the Best Practices page uses them.
- Verify scroll spy highlights the new entry when scrolled into view.

### 3. Embed the example prompt

- Paste the full team prompt from `markdown/design/Team_of_security_agents.md` verbatim.
- Use the same code/prompt block pattern as other example blocks in the page (matching language class, border, copy affordance).
- Escape any HTML entities if needed (e.g., `<PATH>`, `<all backend services | specific dirs | recent diff vs main>`).

### 4. Visual + functional verification

- Open `fsad-playbook.html` in browser.
- Navigate to Best Practices → Security Review via sidebar click.
- Verify hash routing (`#practices/security-review`) works on direct load.
- Verify scroll spy updates sidebar + pills when scrolling through the new section.
- Verify light, dark, and auto themes all render correctly.
- Verify the example prompt block is readable, copy works (if copy pattern exists), and no content is cut off.
- Confirm search indexes the new content (if search re-indexes on load, this should be automatic).

### 5. Update docs

- Update `README.md` version notes with a brief mention of the new Security Review sub-section.
- Mark `CBP-008` complete in `markdown/to do/todo.md`.

## Guardrails

- Match existing patterns — do not introduce new component styles if an existing one fits.
- No JS framework additions. Vanilla only.
- Do not modify unrelated sections.
- Keep the example prompt verbatim from the design file so the two stay in sync (if the design file changes later, we re-copy).

## Deliverables

- [ ] New `<section id="practices-security-review">` in `page-practices`
- [ ] Sidebar nav entry added
- [ ] Top pills entry added (if applicable)
- [ ] Full team prompt embedded as example block
- [ ] Verified in browser (nav, scroll spy, themes, search)
- [ ] `README.md` updated
- [ ] `todo.md` CBP-008 marked complete
