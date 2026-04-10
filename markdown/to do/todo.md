# FSAD Playbook — Todo

- [x] `CBP-001` Add Claude's code review agent to the list of advanced features
- [x] `CBP-002` Add example_claude.md file to the app, under the best practices section, under "Getting Started" → [task-cbp-002.md](task-cbp-002.md)
- [x] `CBP-003` Add a section about Claude's skill creator. Give a step-by-step guide how to use it. → [task-cbp-003.md](task-cbp-003.md)
- [x] `CBP-004` Add a section to cover Codex best practices equivalent to the Claude best practices in this playbook. → [task-cbp-004.md](task-cbp-004.md)
- [ ] `CBP-005` Address JZ's feedback (see `feedback.md`):
  - [ ] `CBP-005a` Task tracking: discuss Jira MCP as alternative to local markdown for multi-engineer scenarios
  - [ ] `CBP-005b` Outcomes vs. outputs mindset: add framing that FSAD amplifies good team culture but doesn't fix bad mindset; pod composition matters
- [x] `CBP-006` Bug: Left sidebar nav doesn't follow scroll on Best Practices page
- [x] `CBP-007` Add light mode theme and auto mode detection (respect `prefers-color-scheme`)
- [x] `CBP-008` Add Security Review sub-section (10.6) to Claude Best Practices with multi-agent team prompt example → [task-cbp-008.md](task-cbp-008.md)
- [x] `CBP-009` Bug: Search result navigation broken for Security Review section — fixed by adding `'security-review': 'practices'` to `sectionToPageMap`
- [x] `CBP-010` Move search into a permanent sidebar input with popover results overlaying the left nav → [task-cbp-010.md](task-cbp-010.md)
- [x] `CBP-011` Add "The Claude Configuration Cascade" sub-section (09.5) to Claude Best Practices — org/project/user layers, cascade + precedence, multi-project example, 8 recommendations, anti-patterns → [task-cbp-011.md](task-cbp-011.md)
- [x] `CBP-012` Add a reference to the OpenSpec framework under the "Open Source" section — URL: https://github.com/Fission-AI/OpenSpec
- [x] `CBP-013` Add the Claude Permission model to the Claude Best Practices section — covered by CBP-014 (Cheat Sheet: 5 permission mode cards, CLI flag, slash command, cycle description)
- [x] `CBP-014` Review the Claude commands shown in the "Cheat Sheet" section and update → [task-cbp-014.md](task-cbp-014.md)
- [x] `CBP-015` Review and update the "Power Usage" section with latest Claude Code features → [task-cbp-015.md](task-cbp-015.md)
- [x] `CBP-016` Review and update the "Building Skills" section → [task-cbp-016.md](task-cbp-016.md)
- [x] `CBP-017` Add Monitor tool to Power Usage section → [task-cbp-017.md](task-cbp-017.md)
- [x] `CBP-018` Add /agents command to Cheat Sheet automation table → [task-cbp-018.md](task-cbp-018.md)
- [x] `CBP-019` Add --exclude-dynamic-system-prompt-sections flag to Cheat Sheet → [task-cbp-019.md](task-cbp-019.md)
- [x] `CBP-020` Add subprocess sandboxing env vars to Power Usage → [task-cbp-020.md](task-cbp-020.md)
- [x] `CBP-021` Add Vertex AI/Bedrock interactive setup wizard note → [task-cbp-021.md](task-cbp-021.md)
- [x] `CBP-022` Add a "Claude Monitoring" section to Claude Best Practices covering usage tracking & cost management → [task-cbp-022.md](task-cbp-022.md)

## Bug Details: CBP-006

**File:** `fsad-playbook - v6.html`

**Problem:** The `sectionObserver` (IntersectionObserver) is registered once on `DOMContentLoaded` for all sections across all three pages. When switching to Best Practices, the observer's intersection ratios become stale because sections transition from `display: none` to `display: block`. Combined with `threshold: 0.3` and `rootMargin: '-60px 0px -60% 0px'`, long Best Practices sections (9 sub-sections) may never trigger the observer — so the sidebar and top indicator pills stop updating.

**Fix plan:**

1. **Re-register `sectionObserver` on page switch** — In `switchPage()`, after the target page becomes visible, unobserve all sections and re-observe only sections within the active page. This forces IntersectionObserver to recalculate.
2. **Lower threshold from `0.3` to `0.1`** — Long sections like "Guidelines" and "Cheat Sheet" may never have 30% visible at once given the shrunk rootMargin. A lower threshold ensures they still trigger.
3. **(Optional fallback)** Add a scroll-based position check for when no section is intersecting, to cover edge cases with very long sections.
