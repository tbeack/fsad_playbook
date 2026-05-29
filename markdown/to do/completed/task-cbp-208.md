# CBP-208 — Revise FSAD Training nav entry to bottom with line separator

## Summary
The FSAD Training external link currently sits between the Workflows and Skills Library nav groups, which interrupts the primary navigation flow. Move it to the bottom of the sidebar nav (after KPIs) with a `border-top` separator, matching the pattern used in the FSAD Training page for its "FSAD Playbook ↗" back-link.

## Assessment
Current state: The FSAD Training link is in a `<div class="nav-group">` block between Workflows (line ~1963) and Skills Library (line ~1974) — it uses the `nav-group-toggle` class and a custom `↗` chevron.

The FSAD Training page uses a dedicated `.nav-external-link` CSS class with `border-top: 1px solid var(--border)` to create the visual separator, placed as the last element inside `<nav>` before `</nav>`.

**Location:** `fsad-playbook.html` — sidebar `<nav class="sidebar-nav">` (~lines 1914–2139)

## Plan

1. **Add `.nav-external-link` CSS class** — Insert immediately after the `.nav-group-toggle` rule block (near line ~450) or in the sidebar nav CSS section. Match the FSAD Training implementation exactly:
   ```css
   .nav-external-link {
     display: flex;
     align-items: center;
     gap: 0.5rem;
     padding: 0.55rem 1.4rem;
     margin-top: 0.5rem;
     border-top: 1px solid var(--border);
     font-size: 0.78rem;
     font-weight: 500;
     color: var(--text-muted);
     text-decoration: none;
     letter-spacing: 0.01em;
     transition: color 0.15s;
   }
   .nav-external-link:hover { color: var(--text-primary); }
   ```

2. **Remove the current FSAD Training nav block** — Delete the `<!-- External: FSAD Training -->` `<div class="nav-group">` block (lines ~1965–1972).

3. **Insert the new external link at the bottom of the nav** — Add it as the last element inside `<nav class="sidebar-nav">`, just before `</nav>` (after the KPIs group closing `</div>`):
   ```html
   <!-- External: FSAD Training -->
   <a class="nav-external-link" href="https://fsad-training.vercel.app/" target="_blank" rel="noopener noreferrer">
     <span class="nav-icon" aria-hidden="true">◆</span>
     FSAD Training ↗
   </a>
   ```

4. **Run the build script** — `python3 scripts/build-dist.py` to sync `dist/fsad-playbook.html`.

5. **Bump version and update changelog** — Increment from current version by 1 patch (e.g. v2.81.2 → v2.81.3). Update `<title>`, sidebar brand badge, and changelog modal.

All criteria verified 2026-05-29 before commit.

## Acceptance Criteria
- [x] FSAD Training link appears at the bottom of the sidebar nav, below the KPIs group
- [x] A visible horizontal line separator appears above the FSAD Training link
- [x] The link opens `https://fsad-training.vercel.app/` in a new tab
- [x] The `◆` icon and `↗` indicator render correctly
- [x] The link is no longer between Workflows and Skills Library
- [x] Styling matches the FSAD Training page's "FSAD Playbook ↗" back-link pattern
- [x] `dist/fsad-playbook.html` is in sync (build script ran)
- [x] Version bumped and changelog entry added
