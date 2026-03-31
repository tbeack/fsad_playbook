# FSAD Playbook — Todo

- [x] `CBP-001` Add Claude's code review agent to the list of advanced features
- [x] `CBP-002` Add example_claude.md file to the app, under the best practices section, under "Getting Started" → [task-cbp-002.md](task-cbp-002.md)
- [x] `CBP-003` Add a section about Claude's skill creator. Give a step-by-step guide how to use it. → [task-cbp-003.md](task-cbp-003.md)
- [x] `CBP-004` Add a section to cover Codex best practices equivalent to the Claude best practices in this playbook. → [task-cbp-004.md](task-cbp-004.md)
- [ ] `CBP-005` Address JZ's feedback (see `feedback.md`):
  - [ ] `CBP-005a` Task tracking: discuss Jira MCP as alternative to local markdown for multi-engineer scenarios
  - [ ] `CBP-005b` Outcomes vs. outputs mindset: add framing that FSAD amplifies good team culture but doesn't fix bad mindset; pod composition matters
- [x] `CBP-006` Bug: Left sidebar nav doesn't follow scroll on Best Practices page

## Bug Details: CBP-006

**File:** `fsad-playbook - v6.html`

**Problem:** The `sectionObserver` (IntersectionObserver) is registered once on `DOMContentLoaded` for all sections across all three pages. When switching to Best Practices, the observer's intersection ratios become stale because sections transition from `display: none` to `display: block`. Combined with `threshold: 0.3` and `rootMargin: '-60px 0px -60% 0px'`, long Best Practices sections (9 sub-sections) may never trigger the observer — so the sidebar and top indicator pills stop updating.

**Fix plan:**

1. **Re-register `sectionObserver` on page switch** — In `switchPage()`, after the target page becomes visible, unobserve all sections and re-observe only sections within the active page. This forces IntersectionObserver to recalculate.
2. **Lower threshold from `0.3` to `0.1`** — Long sections like "Guidelines" and "Cheat Sheet" may never have 30% visible at once given the shrunk rootMargin. A lower threshold ensures they still trigger.
3. **(Optional fallback)** Add a scroll-based position check for when no section is intersecting, to cover edge cases with very long sections.
