# CBP-653 — Fix scroll spy rewriting the URL hash after a search result click

## Source

Found during the CBP-045 do-task run (2026-10-05). The agent saw a search result click for a section end with a neighbouring leaf hash (for example `#practices/monitoring/backends`).

## Summary

The search result click handler navigates by calling `switchPage()`, `showTopic()` and `scrollToId()` directly. It does not go through `handleRoute()`, so `routeSettling` stays `false`. While the page scrolls, the scroll spy rewrites the URL hash to whatever leaf or section passes the viewport, so the final hash is not the result the user clicked.

## Assessment

- `src/js/search.js` lines 196–207: the `onclick` calls `switchPage`, `showTopic` and `setTimeout(() => scrollToId(sectionId), 150)`. It never sets `routeSettling`.
- `src/js/router-nav/02-routing.js` lines 16–24: only `handleRoute()` sets `routeSettling = true` for 500 ms.
- `src/js/scroll-spy.js` lines 11 and 42: the hash rewrites run only when `!routeSettling`.

**Location:** `src/js/search.js` — lines 196–207; `src/js/router-nav/02-routing.js` — lines 16–24

## Plan

1. Make the search click handler suppress scroll-spy hash rewrites during its navigation. Prefer one shared helper over a copy of the timer logic, for example: expose a `settleRoute()` function from `02-routing.js` and call it from both `handleRoute()` and the search handler.
2. Set the hash to `#{page}/{sectionId}` after the scroll, so the URL matches the clicked result.
3. Run `build-source.py` and `build-dist.py`.

## Acceptance Criteria

- [x] Search for "rewind", click the `#session-review` result, and wait 1 s. `location.hash` is `#practices/session-review`.
- [x] Search for "monitoring", click the `#monitoring` result, and wait 1 s. `location.hash` is `#practices/monitoring`, not a leaf hash such as `#practices/monitoring/backends`.
- [x] After the route settles, scrolling by hand still updates the hash (the scroll spy is not left disabled).
- [x] `routeSettling` is set in exactly one function (`grep -n 'routeSettling = true' src/js -r` returns one line).

All criteria verified 2026-10-05 before commit.
