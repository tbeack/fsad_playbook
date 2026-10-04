# CBP-645 — Scroll spy never highlights the sub-item of tall Claude sections

## Source

Found during CBP-644 browser verification (2026-10-04).

## Summary

On the Claude page, the scroll spy does not highlight the sidebar sub-item of a tall section after you scroll to it. The new `#mods` section and the existing `#hooks-deep-dive` and `#cloud-integrations` sections all show the bug.

## Assessment

`src/js/scroll-spy.js` builds `sectionObserver` with `threshold: 0.1` and `rootMargin: '-60px 0px -60% 0px'`. The detection band is about 40% of the viewport height minus 60px (about 230px on a 720px viewport). A section taller than about 10× that band can never have 10% of its area inside the band, so it never fires `isIntersecting` and its `.nav-sub-item` never gets `.active`. This is the likely cause. It is not yet proven.

Evidence: tb:browser-verify run on the CBP-644 build. A `scroll` check with `scroll_to: "#<section>"` and `expect_matches: ".nav-sub-item.active[href=\"#practices/<section>\"]"` failed (0 matches after 5s) for `mods`, `hooks-deep-dive`, and `cloud-integrations`.

**Location:** `src/js/scroll-spy.js` — `sectionObserver` options (~line 41).

## Plan

1. Confirm the cause in a browser: log `IntersectionObserver` entries for `#hooks-deep-dive` while you scroll.
2. Change the section detection so tall sections register. Options: `threshold: 0` for sections, or a separate observer for sections and collapsibles.
3. Make sure leaf (collapsible) highlighting and the leaf deep-link URL update still work.
4. Run `python3 scripts/build-source.py` and `python3 scripts/build-dist.py`.

## Acceptance Criteria

- [ ] After `scroll_to` `#mods`, `#hooks-deep-dive`, and `#cloud-integrations`, `.nav-sub-item.active[href="#practices/<id>"]` matches for each one.
- [ ] A short section (for example `#getting-started`) still highlights its sub-item after scrolling to it.
- [ ] Scrolling to a collapsible (for example `#hooks-deep-dive--recipes`) still highlights its `.nav-leaf-item` and updates the hash to the leaf deep link.
- [ ] `build-dist.py` logs `Injected PLAYBOOK_EMBEDDINGS`.
