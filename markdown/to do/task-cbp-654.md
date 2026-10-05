# CBP-654 — Fix leaf highlight staying on after its collapsible leaves the band

## Source

Found by the AC3 refuter during the CBP-648 do-task run (2026-10-05).

## Summary

When you scroll from a collapsible into a part of the same section that has no collapsible in the detection band, the sidebar leaf for the old collapsible stays highlighted. No section entry fires, and the leaf block only runs when another collapsible is in the band.

## Assessment

- `src/js/scroll-spy.js` line 55: `if (leavesChanged && leavesInBand.size)` only re-highlights when the band still holds a collapsible. When the last one leaves, `leavesChanged` is true but nothing clears the leaf.
- The CBP-648 fix clears leaves only when a section becomes active with none of its collapsibles in the band (line 53), or on `reinitSectionObserver()`. Neither runs while you scroll inside one section.
- `clearLeaves()` (added in CBP-648) already exists.

**Location:** `src/js/scroll-spy.js` — `sectionObserver` callback, lines 52–60

## Plan

1. In the `sectionObserver` callback, when `leavesChanged` is true and `leavesInBand` is empty, call `clearLeaves()`.
2. Run `build-source.py`, then `build-dist.py`.

## Acceptance Criteria

- [ ] Open a Claude section with a collapsible followed by plain text in the same section. Scroll until the collapsible is in the band: its leaf is active. Scroll on until only plain text of the same section is in the band: no `.nav-leaf-item` has `active`.
- [ ] Scrolling between two collapsibles in one section still moves the highlight to the topmost one in the band (CBP-645 behaviour).
- [ ] The CBP-648 checks still pass: no stale leaf after a page change or a section-only band entry.
