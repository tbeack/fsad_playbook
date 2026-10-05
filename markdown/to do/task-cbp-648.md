# CBP-648 — Fix stale leaf highlight after page change or section-only band entry

## Source

Found during CBP-645 (scroll spy fix, 2026-10-05). The CBP-645 AC3 refuter also reported it.

## Summary

The active `.nav-leaf-item` changes only when a collapsible enters the detection band. When the user goes to another page, or scrolls to a section part with no collapsible in the band, the old leaf stays highlighted.

## Assessment

Seen in the browser on `main` and on the CBP-645 build:
- After scrolling Claude collapsibles, then going to `#fsad` or `#codex`, a Claude leaf (for example `production-monitoring--control-bands`) stays `.active`.
- When only a section enters the band, the hash changes to the section level, but the previous leaf stays highlighted.

**Location:** `src/js/scroll-spy.js` — `sectionObserver` callback and `reinitSectionObserver()`; `highlightLeaf()` (added in CBP-645).

## Plan

1. In `reinitSectionObserver()`, remove `.active` from every `.nav-leaf-item`.
2. When a section becomes active and no collapsible of that section is in the band, remove `.active` from every `.nav-leaf-item`.
3. Run `python3 scripts/build-source.py` and `python3 scripts/build-dist.py`.
4. Verify in a browser over HTTP.

## Acceptance Criteria

- [ ] After `scroll_to` `#production-monitoring--control-bands`, then navigation to `#fsad`, `.nav-leaf-item.active` matches 0 elements.
- [ ] After `scroll_to` `#hooks-deep-dive--recipes`, then `scroll_to` `#mods` (section top, above its first collapsible), no `.nav-leaf-item.active` has a `data-leaf` that starts with `hooks-deep-dive--`.
- [ ] The CBP-645 AC3 check still passes: after `scroll_to` `#hooks-deep-dive--recipes`, `.nav-leaf-item.active[data-leaf="hooks-deep-dive--recipes"]` matches, and the hash is `#practices/hooks-deep-dive/recipes`.
- [ ] `build-dist.py` logs `Injected PLAYBOOK_EMBEDDINGS`.
