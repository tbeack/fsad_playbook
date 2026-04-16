# CBP-038 Phase 02 — Host `cbp-add-task` as a Workflows example with embedded playground

## Source
Follow-up from CBP-038 Phase 01 (Example Skills collapsible + standalone `cbp-add-task-playground.html` artifact). Decision to promote the skill into the Workflows page so it lands alongside `/project:initialize-context` and `/project:create-spec` as a peer example.

## Summary
Add a third section to the **Workflows** page featuring the `cbp-add-task` skill, using the existing Workflows visual system (`section-label`, `wf-tabs`, `wf-panel`, `wf-grid`, `wf-card`). End the section with an **Interactive example** block that embeds `cbp-add-task-playground.html` inline via `<iframe>`. Design the embed as an isolated, opt-out module so removing the playground is a single localized edit if we ever choose to drop it.

## Assessment
- **Existing Workflows page:** `fsad-playbook.html` lines 2503–2760. Two worked examples (`/project:initialize-context`, `/project:create-spec`) both follow a consistent 4-tab pattern with `wf-card`s per concept. Closing copy on line 2752 frames the page as "Two markdown files. An entire pod operating system." — will need a minor copy tweak (two → three) when the new section lands.
- **Playground artifact:** `cbp-add-task-playground.html` (repo root) — single-file HTML, dark theme already aligned with playbook tokens, ~620px comfortable embed height, responsive down to 900px.
- **Skill source of truth:** `.claude/skills/cbp-add-task/SKILL.md` defines the 6 steps to be condensed into 4 tabs.
- **Phase 01 collapsible:** currently under Best Practices → Building Skills → Example Skills (`fsad-playbook.html` ~line 4211). Decide whether to keep, slim down, or remove once the Workflows entry ships (see Open Questions).
- **Single-file trade-off:** embedding the playground via iframe introduces one sibling HTML dependency (`cbp-add-task-playground.html`). This is the explicit compromise approved in the option review — offset by designing the embed to be cleanly removable.

**Location:** `fsad-playbook.html` — new `<section id="cbp-add-task-skill">` inserted after line 2746 (closing `</section>` of `#project-create-spec`) and before the closing `hr.divider` + "Why these examples" summary section at line 2748.

## Plan

### Step 1 — Condense the 6 SKILL.md steps into 4 workflow tabs
Map the skill's 6 steps onto the existing 4-tab pattern used by the other workflows:

| Tab | Step label | Covers |
|---|---|---|
| **Intake** | Step 0 | Steps 1–2: read `todo.md`, get next `CBP-###`, capture title |
| **Interview** | Step 1–4 | Step 4: one-question-at-a-time (Source / Summary / Assessment / Plan / AC) |
| **Generate** | Step 5–6 | Step 3 + Step 5: append todo entry, write `task-cbp-NNN.md` from template |
| **Confirm** | Step 7 | Step 6: surface CBP number, todo link, task file path |

Draft copy for each panel mirroring the tone of the existing two sections (short, declarative, code-block accents for file paths / templates).

### Step 2 — Add the new `<section>` markup
After line 2746, insert:

```html
<hr class="divider">

<section id="cbp-add-task-skill">
  <span class="section-label">03 — Inside the CBP Add-Task Skill</span>
  <h2 class="section-title"><code style="font-family: var(--font-mono); font-size: 0.82em;">/cbp-add-task</code></h2>
  <p class="section-subtitle">A project-specific skill that encodes this repo's task-tracking convention: CBP numbering, todo.md entries, and the task-cbp-NNN.md template. Click each phase to walk the flow.</p>

  <div class="wf-tabs" role="tablist">
    <!-- 4 wf-tab buttons: Intake / Interview / Generate / Confirm -->
  </div>

  <!-- 4 wf-panel divs, each with wf-grid + 2 wf-cards matching existing style -->

  <!-- Playground embed (see Step 3 — designed to be removable) -->
</section>
```

Populate `wf-panel`s with `wf-card`s modeled on existing cards (label + heading + copy, or label + inline `<pre>` showing the file template / todo.md line format). Reuse `wf-chip`s for the Source options pill group if it helps visual rhythm.

### Step 3 — Add the removable playground embed module
At the end of the new section (inside the `<section>`, after the last `wf-panel`), add a **self-contained, clearly delimited block** so future removal is a single cut. Use HTML comments as bookends:

```html
<!-- BEGIN: cbp-add-task playground embed (safe to remove) -->
<div class="wf-playground" id="cbp-add-task-playground-embed" data-removable="true">
  <span class="section-label" style="margin-top: 2rem;">Try it yourself</span>
  <h3 class="wf-playground-title">Interactive playground</h3>
  <p class="wf-playground-sub">Fill sample inputs on the left, watch the generated <code>todo.md</code> line and <code>task-cbp-NNN.md</code> file update live on the right. Copy the prompt to invoke the skill.</p>
  <div class="wf-playground-frame">
    <iframe
      src="cbp-add-task-playground.html"
      title="cbp-add-task interactive playground"
      loading="lazy"
      style="width:100%; height:640px; border:1px solid var(--border); border-radius: 12px; background: var(--surface); display:block;"></iframe>
  </div>
  <p class="wf-playground-footnote" style="margin-top: 0.75rem; font-size: 0.85rem; color: var(--text-secondary);">
    Prefer a new tab? <a href="cbp-add-task-playground.html" target="_blank" rel="noopener">Open the playground standalone →</a>
  </p>
</div>
<!-- END: cbp-add-task playground embed (safe to remove) -->
```

**Removal contract:** deleting everything between the `BEGIN` / `END` comments (and nothing else) must leave the Workflows section fully functional. No CSS or JS outside these bookends may reference `#cbp-add-task-playground-embed`, `.wf-playground*`, or the iframe.

### Step 4 — Minimal scoped CSS for the embed block only
Add styles *only* for classes prefixed `wf-playground*`, colocated near existing `wf-*` rules (around line 1168 area). Keep them additive so the same BEGIN/END removal contract still applies — if the embed block is deleted, these styles become dead but harmless. Document this trade-off with a single CSS comment: `/* wf-playground-*: only used by the cbp-add-task playground embed. Safe to delete alongside the embed block. */`

Alternative (lighter): inline all embed styles via `style=""` attributes on the embed block itself, so there's literally nothing to remove outside the BEGIN/END bookends. **Prefer this alternative** given the goal of clean opt-out — the embed is a single visual module, inline styling is acceptable.

### Step 5 — Update navigation and scroll-spy
- **Left-nav (workflows group):** Add an entry for the new section after the existing two workflow entries. Search for the Workflows sidebar group (around line 1893–1897) and mirror the existing link structure, pointing to `#workflows/cbp-add-task-skill`.
- **`sectionToPageMap` / scroll-spy:** ensure `cbp-add-task-skill` routes to the `workflows` page. Check the router/observer setup (around line 7241 and the `sectionObserver` configuration) and add the new ID if explicit mapping is required.
- **Deep-link:** verify `#workflows/cbp-add-task-skill` activates the sidebar entry and scrolls to the section.

### Step 6 — Update page-closing copy
Line 2752: change `"Two markdown files.<br><em>An entire pod operating system.</em>"` to a version that accommodates three examples without rewriting the whole callout. Candidate: `"Three markdown files.<br><em>The connective tissue of a working pod.</em>"` — get user sign-off on exact wording before shipping.

### Step 7 — Reconcile with the Phase 01 Example Skills collapsible
Decide one of:
- **(a) Keep both** — the collapsible under Example Skills remains as a reference card; Workflows section becomes the canonical walkthrough. Add a "See the full walkthrough in Workflows →" link at the top of the collapsible.
- **(b) Slim the collapsible** — reduce it to a one-paragraph pointer to the Workflows section; delete the frontmatter + step list (they now live in Workflows).
- **(c) Remove the collapsible** — the Workflows section supersedes it entirely.

**Recommendation: (b).** Keeps a discovery path from the Skills section without duplicating content.

### Step 8 — Verify
- Open `fsad-playbook.html` in browser.
- Navigate: sidebar → Workflows → *Inside the CBP Add-Task Skill*.
- Click each of the 4 tabs; confirm panel switching works (same JS as existing workflows — no new JS needed if we reuse `switchWorkflow()` IDs).
- Scroll to the playground embed; confirm iframe loads, is keyboard-reachable, and doesn't cause layout jumps.
- Confirm the standalone "Open the playground standalone →" link works in a new tab.
- Test dark and light themes — iframe inner page is dark-themed; verify contrast against playbook light mode (may need a note that the embed is dark-only).
- Test mobile width (≤900px): iframe should remain usable; playground itself already responds.
- Confirm Workflows closing callout reads correctly with the new count.
- **Removal smoke test:** copy the file, delete everything between the BEGIN/END bookends, reload — confirm Workflows section still renders cleanly with no console errors and no orphaned references.

## Acceptance Criteria
- [x] New section `#cbp-add-task-skill` exists on the Workflows page, using `section-label`, `wf-tabs`, `wf-panel`, `wf-grid`, `wf-card` classes identical to existing workflow examples.
- [x] 4 tabs (Intake / Interview / Generate / Confirm) cover all 6 SKILL.md steps without content gaps.
- [x] Tab-switching works via the existing `switchWorkflow()` handler (no new JS required).
- [x] Playground embed block is wrapped in `<!-- BEGIN: … -->` / `<!-- END: … -->` comments and is removable in a single cut with no orphaned CSS or JS references.
- [x] Embed styles are inline (no new global CSS) OR explicitly scoped with a comment calling out safe deletion alongside the embed block.
- [x] "Open the playground standalone →" link works as a non-iframe fallback.
- [x] Left-nav Workflows group lists the new section; deep link `#workflows/cbp-add-task-skill` activates correctly.
- [x] Scroll-spy highlights the new section when in view.
- [x] Workflows closing copy updated to reflect three examples instead of two (wording signed off).
- [x] Phase 01 Example Skills collapsible is reconciled per Step 7 (slim or remove) — no duplicated content.
- [x] Removal smoke test passes: deleting the BEGIN/END block leaves the Workflows section fully functional.
- [x] Renders correctly in dark theme; light-theme behavior of the embedded iframe documented.
