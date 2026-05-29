# CBP-207 — Add FSAD Training link to sidebar nav

## Summary
Add an external link to the FSAD Training playbook (`https://fsad-training.vercel.app/`) as a nav entry in the left sidebar, positioned directly after the Workflows group.

## Assessment
The sidebar nav currently has five page-level groups (FSAD, Pod Compositions, Workflows, Skills Library, Claude Best Practices, Codex Best Practices, KPIs). None of them are external links — they all use `<button class="nav-group-toggle" onclick="navigateTo(...)">`. A new entry styled consistently with those groups but using an `<a>` tag is the cleanest approach.

**Location:** `fsad-playbook.html` — sidebar `<nav class="sidebar-nav">`, between GROUP 3 (Workflows, ~line 1962) and GROUP 3.5 (Skills Library, ~line 1964).

## Plan

1. In `fsad-playbook.html`, insert a new `div.nav-group` immediately after the closing `</div>` of GROUP 3 (Workflows) and before the `<!-- GROUP 3.5: Skills Library -->` comment.

   New HTML to insert:
   ```html
   <!-- External: FSAD Training -->
   <div class="nav-group">
     <a class="nav-group-toggle" href="https://fsad-training.vercel.app/" target="_blank" rel="noopener">
       <span class="nav-icon" aria-hidden="true">◆</span>
       FSAD Training
       <span class="nav-chevron" style="font-size:0.7rem;">↗</span>
     </a>
   </div>
   ```

   The `↗` replaces the `›` chevron to signal it's an external link, consistent with web conventions.

2. Run the build script: `python3 scripts/build-dist.py`

3. Open the playbook in the browser and verify the new item appears in the correct position and navigates to `https://fsad-training.vercel.app/` in a new tab.

All criteria verified 2026-05-29 before commit.

## Acceptance Criteria
- [x] "FSAD Training" appears in the sidebar nav directly below "Workflows"
- [x] Clicking "FSAD Training" opens `https://fsad-training.vercel.app/` in a new browser tab
- [x] The entry renders with the ◆ icon and ↗ indicator, visually consistent with other nav groups
- [x] The entry does not expand a sub-menu (it is a direct external link)
- [x] `dist/fsad-playbook.html` is rebuilt and in sync with the source
