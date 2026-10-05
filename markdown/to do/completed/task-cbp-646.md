# CBP-646 — Fix topic footer rendering mid-topic for split topics

## Source

Found during CBP-645 (scroll spy fix, 2026-10-05).

## Summary

Two Claude topics are split into two `.topic-view` containers. `renderTopicFooter()` adds the "← All Topics / Next topic" footer to the first container only. For those topics, the footer shows in the middle of the page, not at the end.

## Assessment

`renderTopicFooter()` uses `document.querySelector(...)`. This returns the first `.topic-view[data-topic="<topic>"]:not([hidden])` only.

Split topics in `src/pages/practices.html`:
- `skills-hooks`: line 1146 (`#building-skills`) and line 2956 (`#hooks-deep-dive`, `#cloud-integrations`, `#mods`).
- `operations`: line 1559 (`#best-practices`) and line 3930 (`#monitoring`, `#production-monitoring`).

**Location:** `src/js/router-nav/03-topic-nav.js` — `renderTopicFooter()` (about line 70).

## Plan

1. In `renderTopicFooter()`, select all visible containers of the topic. Append the footer to the last one.
2. Run `python3 scripts/build-source.py` and `python3 scripts/build-dist.py`.
3. Verify in a browser over HTTP.

## Acceptance Criteria

- [x] On `#practices/skills-hooks`, `.topic-footer` is the last child element of the second `.topic-view[data-topic="skills-hooks"]` container (the one that holds `#mods`).
- [x] On `#practices/operations`, `.topic-footer` is in the container that holds `#production-monitoring`.
- [x] On `#practices/foundations` (one container), exactly 1 `.topic-footer` exists, and it is in that container.
- [x] `build-dist.py` logs `Injected PLAYBOOK_EMBEDDINGS`.

All criteria verified 2026-10-05 before commit.
