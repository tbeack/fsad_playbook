# CBP-044 — Update search index to capture new content from recent updates

## Source
Maintenance — the search system hasn't been audited since the Workflows page (v22) and Practices topic-routing (v21) were added.

## Summary
The search index built by `buildSearchIndex()` has two problems: (1) it truncates section text at 2,000 characters, which means large sections like Cheat Sheet and Power Usage lose most of their searchable content, and (2) search result navigation doesn't handle the Practices page's topic-group routing — clicking a Practices result calls `switchPage()` but never calls `showTopic()`, so the target section stays hidden inside an inactive topic view.

## Assessment

### Search indexing (`buildSearchIndex`, line ~7616)
- Indexes all `<section>` and `.hero` elements that have an `id` and a title
- Also indexes `.collapsible` elements nested within sections
- **Text truncation**: sections cap at `substring(0, 2000)`, collapsibles at `substring(0, 3000)`
- Sections like `cheat-sheet` (~400 lines of tables), `power-usage` (~400 lines), and `hooks-deep-dive` (~400 lines) almost certainly exceed 2,000 chars — content past that point is unsearchable
- The Workflows page sections (`add-task-skill`, `commit-changes-skill`) include tabbed panel content that *is* captured (it's in the DOM), but the 2,000-char cap may cut off later tabs

### Search navigation (`handleSidebarSearch`, line ~7674)
- Search result `onclick` handler: `switchPage(targetPage, navBtn)` → `scrollToId(item.id)`
- **Bug**: For Practices sections, `switchPage('practices')` defaults to showing the Hub topic view. Since `showTopic()` is never called with the correct topic, the target section (e.g., `hooks-deep-dive` inside topic `skills-hooks`) remains `hidden`, and `scrollToId` silently fails
- The router (`handleRoute`, line ~7384) correctly handles this via `sectionToTopicMap` — but search bypasses the router entirely

**Location:** `fsad-playbook.html` — lines ~7616–7692 (search system JS)

## Plan

1. **Fix Practices topic routing in search results** (line ~7678–7683)

   In the `onclick` handler inside `handleSidebarSearch`, after `switchPage()`, add topic routing for Practices sections:

   ```js
   if (targetPage === 'practices' && sectionToTopicMap[item.id]) {
     showTopic(sectionToTopicMap[item.id]);
   }
   ```

   This mirrors the logic already in `handleRoute()` at line ~7396.

2. **Increase text capture limits for sections**

   Change `sec.textContent.substring(0, 2000)` to `substring(0, 5000)` for sections. This captures roughly 3x more content — enough for even the largest sections (Cheat Sheet, Power Usage). The index is in-memory and only built once, so the memory impact is negligible for a ~40-section app.

   Optionally increase collapsible text from 3,000 to 5,000 as well.

3. **Verify `sectionToPageMap` completeness**

   Cross-reference all `<section id="...">` elements against `sectionToPageMap` entries. Currently all 38 sections + 6 heroes appear accounted for, but verify no new sections were added in v23–v26 without map entries.

4. **Test the fixes**

   - Search for "prompt caching" — should find the Power Usage collapsible (added in CBP-036, deep in the section)
   - Search for "hooks" — click the result, verify it navigates to Practices → Skills & Hooks topic and scrolls to the Hooks section
   - Search for "/tui" — should find the Cheat Sheet row (added in CBP-040)
   - Search for "sandbox" — should find the Power Usage collapsible (added in CBP-020)

## Acceptance Criteria
- [x] Searching for content deep in large sections (e.g., "/tui" in Cheat Sheet, "prompt caching TTL" in Power Usage) returns results
- [x] Clicking a Practices search result navigates to the correct topic group (not left on Hub with hidden content)
- [x] All section IDs in the HTML have corresponding entries in `sectionToPageMap`
- [x] No duplicate entries in the search index
- [x] Search still limits results to 8 items and performs responsively
