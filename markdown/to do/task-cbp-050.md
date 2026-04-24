# CBP-050 — Add sub-topic children to the left nav for every Claude Best Practices section

## Source
User request — navigation density / discoverability improvement. Today the left nav stops at section level (e.g., `Reference → Power Usage`), but each section contains many collapsibles that are effectively hidden until the user scrolls into the section and opens them. Surfacing them as a 3rd nav level makes every sub-topic discoverable from the sidebar.

## Summary
Extend the Claude Best Practices left nav from a 2-level accordion (topic → section) to a 3-level accordion (topic → section → sub-topic), where each 3rd-level child corresponds to one collapsible within the section (e.g., `Power Usage → Agent Teams, Worktrees, Model & Effort Control, Hooks, Session Logs, …`).

Children **auto-expand when their parent section becomes the active scroll-spy target**, and collapse when another section takes over. Clicking a child scrolls to the collapsible **and** opens it.

Scope covers **all Claude Best Practices sections** — Getting Started, Project Anatomy, Config Cascade, Integrations (MCP), Code Review Agent, Security Review, Building Skills, Hooks (deep dive), Monitoring, Guidelines, Cheat Sheet, Power Usage, Open Source.

## Assessment

**Nav markup lives at lines 1910–1947** in `fsad-playbook.html` (the `GROUP 4: Claude Best Practices` nav-group). The current structure is:

```
nav-group (Claude Best Practices)
└── nav-sub-items[data-group="practices"]
    ├── Hub (link)
    ├── nav-topic-header "Foundations"
    │   └── nav-topic-sections[data-topic-sections="foundations"]
    │       ├── Getting Started
    │       ├── Project Anatomy
    │       └── Config Cascade
    ├── nav-topic-header "Integrations & Review"
    │   └── …
    ├── nav-topic-header "Skills & Hooks"
    ├── nav-topic-header "Operations"
    └── nav-topic-header "Reference"
        └── nav-topic-sections[data-topic-sections="reference"]
            ├── Cheat Sheet
            ├── Power Usage
            └── Open Source
```

Each `nav-sub-item` points to a `section[id]` on the page (e.g., `power-usage`). Those sections contain multiple `.collapsible` elements whose titles live in `.collapsible-header h3`. **Collapsibles currently have no `id` attribute**, so they aren't anchor-linkable yet.

**Scroll spy** (lines 7832–7863) uses an `IntersectionObserver` on `section[id]` and toggles `.active` on nav-sub-items whose `onclick` contains the matching id. It already scopes to the visible topic-view on the practices page. This is the hook we extend to drive auto-expansion of the 3rd nav level.

**Indicator pills** (lines 7790–7829) on the practices page already render per visible section — those stay as-is; this task is strictly about the left sidebar.

**Location:** `fsad-playbook.html` — nav markup ~1910–1947, scroll spy ~7832–7863, collapsible click handler ~7865–7870, sub-topic CSS to be added alongside `.nav-topic-sections` styles.

## Plan

### Step 1 — Inventory sub-topics per section
For each `section[id]` under `#page-practices`, walk every direct `.collapsible` child and record the `.collapsible-header h3` text. This is the source of truth for 3rd-level children.

Worked example for `#power-usage` (lines ~5102–6130): **Agent Teams, Worktrees, Model & Effort Control, Hooks, Session Logs, /insights, /loop, Remote Control & Cross-Device, Chrome Integration, Batch Operations, Plugins** (plus any others present).

Sections with no collapsibles (pure prose or single-topic) get **no 3rd level** — do not force one.

### Step 2 — Give every collapsible a stable slug `id`
Add `id="<slug>"` to each relevant `.collapsible` element. Slug = kebab-case of the header text, with `/` stripped (e.g., `Agent Teams` → `agent-teams`, `/insights` → `insights`, `Model & Effort Control` → `model-effort-control`).

Guard against collisions by prefixing the parent section id where needed (e.g., `power-usage--agent-teams`), but only if a plain slug already exists elsewhere on the page.

### Step 3 — Add a 3rd-level markup pattern
Extend each existing `nav-sub-item` that has sub-topics into a wrapper with a nested list. Proposed markup (keep the existing anchor clickable — it still jumps to the section top):

```html
<div class="nav-sub-item-wrap" data-section="power-usage">
  <a class="nav-sub-item" href="#practices/power-usage"
     onclick="event.preventDefault(); showTopic('reference'); setTimeout(()=>scrollToId('power-usage'),120)">
    Power Usage
  </a>
  <div class="nav-leaf-sections" data-leaf-for="power-usage">
    <a class="nav-leaf-item" href="#practices/power-usage/agent-teams"
       onclick="event.preventDefault(); openAndScrollToCollapsible('power-usage', 'agent-teams')">
      Agent Teams
    </a>
    <a class="nav-leaf-item" href="#practices/power-usage/worktrees"
       onclick="event.preventDefault(); openAndScrollToCollapsible('power-usage', 'worktrees')">
      Worktrees
    </a>
    <!-- … one per collapsible … -->
  </div>
</div>
```

Apply the same pattern to every section with collapsibles.

### Step 4 — CSS for the 3rd level
Add styles next to the existing `.nav-topic-sections` rules. Keep them visually lighter than level 2 — smaller font, extra left indent, no icon.

```css
.nav-leaf-sections { display: none; flex-direction: column; gap: 0.1rem; padding-left: 1.1rem; margin: 0.15rem 0 0.35rem 0; border-left: 1px solid var(--border-subtle); }
.nav-sub-item-wrap.expanded .nav-leaf-sections { display: flex; }
.nav-leaf-item { font-size: 0.78rem; padding: 0.25rem 0.5rem; color: var(--text-secondary); border-radius: 4px; text-decoration: none; }
.nav-leaf-item:hover { color: var(--text-primary); background: var(--bg-hover); }
.nav-leaf-item.active { color: var(--accent); background: var(--accent-soft); }
```

### Step 5 — Auto-expand on scroll spy
Modify the `IntersectionObserver` callback (~line 7832) so that when a section becomes active:
1. Remove `.expanded` from every `.nav-sub-item-wrap` in the practices group.
2. Add `.expanded` to the `.nav-sub-item-wrap[data-section="<active-id>"]`.

This gives the "auto-expand children when parent section is visible" behavior the user asked for. Only one section's children show at a time.

### Step 6 — Click handler: scroll + open
Add a small helper near the existing `scrollToId` / collapsible handlers:

```js
function openAndScrollToCollapsible(sectionId, collapsibleId) {
  // Ensure the right practices topic is visible first
  const anchor = document.getElementById(collapsibleId);
  if (!anchor) return;
  const parentSection = anchor.closest('section[id]');
  if (parentSection) {
    const topicView = parentSection.closest('.topic-view[data-topic]');
    if (topicView?.hidden) showTopic(topicView.dataset.topic);
  }
  // Open the collapsible
  anchor.classList.add('open');
  // Scroll with a small offset so the header isn't under the sticky nav
  setTimeout(() => anchor.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
}
```

Reuse the existing `.collapsible.open` class toggled by the click handler at line ~7866 — don't duplicate the toggle logic.

### Step 7 — Active-leaf highlight via scroll spy
Extend the observer to also observe every `.collapsible[id]`. When a collapsible intersects, toggle `.active` on the matching `.nav-leaf-item` (mirror the existing pattern that drives `.nav-sub-item` highlighting). This gives live highlighting as the reader scrolls down within a long section like Power Usage.

### Step 8 — Hash routing
Support deep-linking to a specific collapsible via hash `#practices/<section>/<collapsible-id>`. Update the hash-routing code (see calls to `scrollToId` in `navigateTo` / topic-handling around lines 7411–7417 and 7703–7705) to detect a third segment and call `openAndScrollToCollapsible(section, third)` after the topic is shown. Keep the 2-segment legacy form working.

### Step 9 — Keep indicator pills unchanged
The top-of-page indicator pills (lines 7790–7829) remain section-level only — don't add leaf-level pills, that would overcrowd the header.

### Step 10 — Search integration (verify only)
Confirm the in-app search still returns the section-level hits correctly. No search-index changes are required by this task unless CBP-044's indexer explicitly lists sub-topic anchors — verify quickly and open a follow-up CBP only if broken.

### Step 11 — Browser smoke test
- Open `fsad-playbook.html`; for each Claude Best Practices section, expand the parent nav and scroll through. Confirm:
  - Parent nav auto-expands only when its section is the active scroll-spy target.
  - Leaf click scrolls to the collapsible and opens it.
  - Active leaf highlights as you scroll within a section.
  - Deep link `#practices/power-usage/agent-teams` opens the practices page, shows the right topic, expands the Agent Teams collapsible, and scrolls to it.
  - Works in both light and dark themes; no layout shift on the sidebar when leaf lists appear.
  - Mobile / narrow-width: the extra nesting doesn't blow out the sidebar. Adjust CSS if needed.

## Acceptance Criteria
- [x] Every Claude Best Practices section with multiple `.collapsible` children has a 3rd-level nav list (one item per collapsible, in document order)
- [x] Each targeted `.collapsible` has a stable `id` slug; no collisions on the page
- [x] Leaf lists are hidden by default and auto-expand only when their parent section is the active scroll-spy target (one section's leaves visible at a time)
- [x] Clicking a leaf opens the collapsible AND scrolls to it with proper header offset
- [x] The matching leaf is highlighted as the user scrolls through the section
- [x] Deep link of the form `#practices/<section>/<collapsible-id>` works (shows correct topic, opens correct collapsible)
- [x] Legacy 2-segment links `#practices/<section>` still work unchanged
- [x] Sections without collapsibles show no 3rd level (no empty wrappers)
- [x] Indicator pills behavior unchanged
- [x] Works in both light and dark themes; no sidebar overflow on narrow widths
- [x] No broken HTML or console errors

## Out of Scope
- Applying the same 3-level pattern to the Codex Best Practices nav (can follow as a separate CBP if useful).
- Applying it to FSAD, Pod Compositions, Workflows, or KPIs pages.
- Refactoring the indicator-pill system to include leaf entries.
- Adding search-index entries for sub-topics (track separately if gaps are found).
