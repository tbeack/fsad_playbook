# CBP-033 Phase 2 — Rename Squad Setup Skill to Project Initialize-Context

## Source
Follow-up to CBP-033 Phase 1 (Workflows page + Squad Setup Skill example).

## Summary
Rename the example workflow and all its terminology on the new `Workflows` page to match the broader FSAD vocabulary used elsewhere in the playbook. The skill itself is renamed from `/squad:setup-context` to `/project:initialize-context`, and the hierarchy terms shift from `squad` → `project` and `legion` → `pod`.

## Assessment
Phase 1 shipped the Workflows page with verbatim content from the team reference screenshots, which used an internal team vocabulary (`squad` / `legion`). That vocabulary doesn't match the rest of the playbook, which talks about *projects* and *pods*. This phase aligns the Workflows example with the playbook's canonical terminology.

**Location:** `fsad-playbook.html` — `page-workflows` section (`#squad-setup-skill`), nav entry for `Squad Setup Skill`, `sectionToPageMap`, and the v22 changelog modal entry.

## Plan

1. **Rename the skill command** — replace all occurrences of `/squad:setup-context` with `/project:initialize-context` in the Workflows section heading and any inline mentions.
2. **Rename terminology — `squad` → `project`:**
   - Section label: `Inside the Squad Setup Skill` → `Inside the Project Initialize-Context Skill`
   - Sidebar nav sub-item label: `Squad Setup Skill` → `Project Initialize-Context`
   - Section anchor id: `squad-setup-skill` → `project-initialize-context` (update `sectionToPageMap`, nav `href`, and `scrollToSection` call)
   - Phase 0 Discover bullets: `Pick squad (or auto-detect from path)` → `Pick project (or auto-detect from path)`; `Read squad CLAUDE.md → current state` → `Read project CLAUDE.md → current state`
   - Phase 0 classification paragraph: `Squad docs never repeat…` → `Project docs never repeat…`; `specific to the squad` → `specific to the project`
   - Phase 8–9 "Incremental by design" paragraph: `A squad's context builds up over time` → `A project's context builds up over time`
   - Phase 8–9 footnote: `the entire squad context setup process` → `the entire project context initialization process`
   - Closing pull-section subtitle: update any remaining "squad" references
3. **Rename terminology — `legion` → `pod`:**
   - Phase 0 Discover bullet: `Read legion CLAUDE.md → shared architecture` → `Read pod CLAUDE.md → shared architecture`
4. **Update the v22 changelog entry** (both the in-app modal and `CHANGELOG.md`) to reflect the new naming so the changelog stays truthful. Either rewrite the v22 entry or add a v23 entry that supersedes the naming — decide based on whether v22 has been widely shared yet.
5. **Verify in browser** — confirm the nav label reads `Project Initialize-Context`, the hash route `#workflows/project-initialize-context` loads the section, search finds the renamed terms, and no stale `squad` / `legion` strings remain on the page.

## Acceptance Criteria
- [x] No references to `/squad:setup-context` remain on the Workflows page — replaced with `/project:initialize-context`
- [x] No references to `squad` remain in the Workflows page copy — all replaced with `project`
- [x] No references to `legion` remain in the Workflows page copy — replaced with `pod`
- [x] Sidebar nav shows `Project Initialize-Context` (or equivalent) under the Workflows group
- [x] Section anchor id renamed from `squad-setup-skill` to `project-initialize-context`; `sectionToPageMap`, nav `href`, and `scrollToSection()` call all updated to match
- [x] Full-text search returns results for `project`, `initialize-context`, and `pod` on the Workflows page
- [x] Changelog (in-app modal + `CHANGELOG.md`) reflects the renamed terminology
- [x] Page renders correctly in light, dark, and auto theme modes with no broken links or stale anchors
