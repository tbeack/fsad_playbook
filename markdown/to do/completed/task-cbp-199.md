# CBP-199 — Add `Dynamic Workflows` subsection to Power Usage

## Source
User request: add a new subsection about Dynamic Workflows to the Power Usage section. Relevant to Claude Code's `/loop` command invoked without a fixed interval — the "self-paced" loop mode where Claude uses `ScheduleWakeup` to choose its own wakeup delay based on what it's waiting for.

## Summary
The playbook's `/loop` collapsible only covers fixed-interval usage. The more powerful pattern — omitting the interval so Claude self-paces with `ScheduleWakeup` — has no documented home. This adds a dedicated "Dynamic Workflows" collapsible explaining when and how to use self-paced loops, prompt-cache-aware delay picking, and practical examples.

## Assessment
The existing `/loop` collapsible (`power-usage--loop`, ~line 9566) covers fixed-interval scheduling only. There is no documentation for the dynamic (no-interval) mode.

**Location:**
- Nav leaf items: `fsad-playbook.html` ~line 2078–2079 (after the existing `/loop` leaf)
- Content collapsible: `fsad-playbook.html` ~line 9592 (after the closing `</div>` of `/loop`)

## Plan

### Phase 1 — Add nav leaf item
Insert a new `<a class="nav-leaf-item">` entry after the existing `/loop` leaf (~line 2079):
```html
<a class="nav-leaf-item" href="#practices/power-usage/dynamic-workflows" data-leaf="power-usage--dynamic-workflows" onclick="event.preventDefault(); openAndScrollToLeaf('power-usage--dynamic-workflows', 'reference')">Dynamic Workflows</a>
```

### Phase 2 — Add content collapsible
Insert a new collapsible block after the closing `</div>` of the `/loop` collapsible (~line 9592). Content:

```html
<!-- Dynamic Workflows -->
<div class="collapsible" id="power-usage--dynamic-workflows">
  <div class="collapsible-header">
    <h3>Dynamic Workflows — Self-Paced Loops</h3>
    <span class="collapsible-chevron">&#9660;</span>
  </div>
  <div class="collapsible-body"><div class="collapsible-content">
    <p>Omit the interval from <code>/loop</code> and Claude decides its own wakeup schedule. Instead of sleeping a fixed duration, it calls <code>ScheduleWakeup</code> with a delay it reasons about — matching the wait to what it's actually watching.</p>

    [code examples: no-interval loop invocations]

    [prompt cache warmth callout: 270s threshold]

    [best-delay guidance table: under 270s / 300s–3600s / idle 1200s–1800s]

    [closing tip about the same /loop prompt passed each turn]
  </div></div>
</div>
```

### Phase 3 — Verify in browser
Open `fsad-playbook.html`, navigate to Power Usage → verify "Dynamic Workflows" appears in the left nav after "/loop", open the collapsible, confirm content renders.

### Phase 4 — Build dist
Run `python3 scripts/build-dist.py` to regenerate `dist/fsad-playbook.html`.

All criteria verified 2026-05-28 before commit.

## Acceptance Criteria
- [x] Left nav under Power Usage has a "Dynamic Workflows" leaf item, positioned after "/loop"
- [x] Collapsible `power-usage--dynamic-workflows` is inserted after the `/loop` collapsible in the DOM
- [x] Section heading is "Dynamic Workflows — Self-Paced Loops"
- [x] Content explains no-interval `/loop` syntax and how `ScheduleWakeup` drives wakeup scheduling
- [x] Code examples show realistic no-interval `/loop` invocations (at least 2 examples)
- [x] Callout covers prompt cache warmth: sleep ≤270s keeps cache warm; ≥300s pays cache miss; idle default 1200–1800s
- [x] `dist/fsad-playbook.html` regenerated and in sync with source
