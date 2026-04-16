# CBP-039 — Add `/cbp-commit-changes` as a fourth Workflows example

## Source
Own idea — direct follow-up to CBP-038 Phase 02, which added `/cbp-add-task` to the Workflows page. The `/cbp-commit-changes` skill is the natural counterpart (one creates tasks, the other ships them), and a playground artifact already exists (`cbp-commit-changes-playground.html`).

## Summary
Add a fourth section to the **Workflows** page featuring the `/cbp-commit-changes` skill, mirroring the exact pattern used for `cbp-add-task-skill`: the existing Workflows visual system (`section-label`, `wf-tabs`, `wf-panel`, `wf-grid`, `wf-card`) plus a removable embedded playground block. This gives the pair of CBP skills (add-task + commit-changes) symmetric representation as the repo's concrete, project-specific examples of workflow-encoding skills.

## Assessment
- **Existing Workflows page:** `fsad-playbook.html` now has three sections — `/project:initialize-context`, `/project:create-spec`, `/cbp-add-task`. The third section (`#cbp-add-task-skill`) lives at ~line 2751 and establishes the embed pattern.
- **Skill source of truth:** `.claude/skills/cbp-commit-changes/SKILL.md` defines an 8-step workflow (inputs + Steps 1–8: gather summaries, update CHANGELOG.md, update README.md, update HTML title, verify, commit, push, report).
- **Playground artifact:** `cbp-commit-changes-playground.html` (repo root) already exists — dynamic task list, scoped stage list, live previews of CHANGELOG/README/commit/shell, 4 presets. Ready to embed.
- **Closing callout:** Currently reads *"Three markdown files. The connective tissue of a working pod."* (updated during CBP-038 Phase 02). Will need to become *"Four markdown files."* or a slightly rephrased version that scales.
- **Nav + scroll-spy:** The Workflows nav group (line ~1900) has 4 entries; will need a 5th. `sectionToPageMap` (line ~7235) will need `'cbp-commit-changes-skill': 'workflows'`.

**Location:** `fsad-playbook.html` — new `<section id="cbp-commit-changes-skill">` inserted after the existing `<section id="cbp-add-task-skill">` closing tag and before the final `<hr class="divider">` + "Why these examples" callout.

## Plan

### Step 1 — Condense the 8 SKILL.md steps into 4 workflow tabs
Mirror the 4-tab pattern used by the other workflows:

| Tab | Step label | Covers |
|---|---|---|
| **Gather** | Inputs + Step 1 | Identify shipping CBPs (completed but not yet in CHANGELOG), detect next version, pull per-task summaries |
| **Update Docs** | Step 2–4 | Write new CHANGELOG.md block, bump README.md version row, update HTML title version |
| **Verify** | Step 5 | `git status` / `git diff --stat` and visual sanity check of the 3 edited docs |
| **Ship** | Step 6–8 | Scoped `git add` (no `-A`), commit with project message style, push, report back |

Keep copy short, declarative, and use inline `<pre>` blocks for file templates, commit message format, and shell commands — matching the existing cbp-add-task section.

### Step 2 — Add the new `<section>` markup
Insert after the closing `</section>` of `#cbp-add-task-skill` (after the playground embed `END` comment) and before the final `<hr class="divider">`:

```html
<hr class="divider">

<section id="cbp-commit-changes-skill">
  <span class="section-label">04 — Inside the CBP Commit-Changes Skill</span>
  <h2 class="section-title"><code style="font-family: var(--font-mono); font-size: 0.82em;">/cbp-commit-changes</code></h2>
  <p class="section-subtitle">The counterpart to <code>/cbp-add-task</code>. When a batch of tasks is done, this skill writes the CHANGELOG entry, bumps the version, and commits — in the exact sequence that keeps the artifact coherent.</p>

  <div class="wf-tabs" role="tablist">
    <!-- 4 tabs: Gather / Update Docs / Verify / Ship -->
  </div>

  <!-- 4 wf-panels with wf-grid + 2 wf-cards each -->

  <!-- Playground embed — same BEGIN/END contract as cbp-add-task section -->
</section>
```

Populate `wf-panel`s with 2 `wf-card`s each, echoing the copy weight of the `cbp-add-task` section.

### Step 3 — Add the removable playground embed module
Reuse the exact pattern established in CBP-038 Phase 02 — self-contained, inline-styled, wrapped in `BEGIN`/`END` comments, with a standalone fallback link:

```html
<!-- BEGIN: cbp-commit-changes playground embed (safe to remove) -->
<div id="cbp-commit-changes-playground-embed" style="margin-top: 3rem;">
  <span class="section-label" style="display:block; margin-bottom: 0.5rem;">Try it yourself</span>
  <h3 style="font-family: var(--font-display); font-size: 1.3rem; margin: 0 0 0.5rem;">Interactive playground</h3>
  <p style="color: var(--text-secondary); font-size: 0.95rem; margin: 0 0 1rem; max-width: 720px;">
    Build a batch of shipping tasks on the left, watch the generated <code>CHANGELOG.md</code> block, <code>README.md</code> version rows, commit message, and shell commands update live on the right.
  </p>
  <div style="position: relative; border: 1px solid var(--border); border-radius: 12px; overflow: hidden; background: #0b0b10;">
    <iframe src="cbp-commit-changes-playground.html" title="cbp-commit-changes interactive playground" loading="lazy"
      style="width: 100%; height: 720px; border: 0; display: block; color-scheme: dark;"></iframe>
  </div>
  <p style="margin-top: 0.75rem; font-size: 0.85rem; color: var(--text-secondary);">
    Prefer a new tab? <a href="cbp-commit-changes-playground.html" target="_blank" rel="noopener">Open the playground standalone →</a>
  </p>
</div>
<!-- END: cbp-commit-changes playground embed -->
```

**Removal contract** (same as CBP-038 Phase 02): deleting everything between `BEGIN` / `END` comments must leave the section fully functional. No external CSS/JS references.

### Step 4 — Update navigation and scroll-spy
- **Left-nav (workflows group, ~line 1900):** Add a fifth entry after `CBP Add-Task`:
  ```html
  <a class="nav-sub-item" href="#workflows/cbp-commit-changes-skill" onclick="scrollToSection('cbp-commit-changes-skill')">CBP Commit-Changes</a>
  ```
- **`sectionToPageMap` (~line 7235):** Add `'cbp-commit-changes-skill': 'workflows'`.
- **Deep-link verify:** `#workflows/cbp-commit-changes-skill` activates the sidebar entry and scrolls correctly.

### Step 5 — Update the closing callout copy
Current: *"Three markdown files. The connective tissue of a working pod."*
Candidate: *"Four markdown files. The connective tissue of a working pod."* — smallest possible diff. Get user sign-off before shipping.

Alternative framing (if "Four" starts to sound mechanical): *"A handful of markdown files. The connective tissue of a working pod."* — future-proofs the callout against more examples landing.

### Step 6 — Verify in browser
- Navigate: sidebar → Workflows → *Inside the CBP Commit-Changes Skill*.
- Click each of the 4 tabs; confirm panel switching works (reuses `switchWorkflow()` — no new JS).
- Confirm the embedded playground loads, is keyboard-reachable, and matches the height of the cbp-add-task embed for visual rhythm.
- Confirm standalone fallback link opens the playground in a new tab.
- Test dark + light theme; iframe remains dark (same known trade-off as cbp-add-task embed — revisit if it becomes a real issue).
- Test mobile width (≤900px): tabs wrap or scroll; iframe stays usable.
- **Removal smoke test:** delete the BEGIN/END block in a copy of the file, reload, confirm Workflows section still renders cleanly with no orphaned references.

## Acceptance Criteria
- [x] New section `#cbp-commit-changes-skill` exists on the Workflows page, using the same `section-label` / `wf-tabs` / `wf-panel` / `wf-grid` / `wf-card` classes as the other three Workflows entries.
- [x] 4 tabs (Gather / Update Docs / Verify / Ship) cover all 8 SKILL.md steps without content gaps.
- [x] Tab switching works via the existing `switchWorkflow()` handler (no new JS).
- [x] Playground embed block is wrapped in `<!-- BEGIN -->` / `<!-- END -->` comments, uses only inline styles, and is removable in a single cut.
- [x] "Open the playground standalone →" fallback link works when iframe is blocked.
- [x] Left-nav Workflows group lists the new section; deep link `#workflows/cbp-commit-changes-skill` activates correctly.
- [x] `sectionToPageMap` routes the new section ID to the workflows page; scroll-spy highlights it when in view.
- [x] Closing callout copy updated to reflect four examples (final wording signed off with user).
- [x] Embedded playground matches visual rhythm of the cbp-add-task embed (same height, same frame styling).
- [x] Removal smoke test passes: deleting the BEGIN/END block leaves the section fully functional.
- [x] Renders correctly in dark theme; light-theme iframe trade-off documented (or addressed).
