# CBP-652 — Fix Guidelines rendering first in the Operations topic while the sidebar lists it last

## Source

Found during the CBP-045 do-task run (2026-10-05). The agent could not meet CBP-045 AC1 ("between Monitoring and Guidelines") because of this order mismatch.

## Summary

The sidebar lists the Operations topic as Monitoring → Production Monitoring → Guidelines. The page renders Guidelines (`#best-practices`) first, because it sits in the first `data-topic="operations"` container. A reader who follows the sidebar top to bottom sees the page jump backwards.

## Assessment

- `src/pages/practices.html` line 1559: the first `<div class="topic-view" data-topic="operations">` holds `<section id="best-practices">` (line 1560).
- `src/pages/practices.html` line 3931: the second `operations` container holds `#monitoring` (line 3932) and `#production-monitoring` (line 4229).
- `src/playbook.tmpl.html` lines 231–249: the sidebar lists Monitoring, Production Monitoring, then Guidelines.
- `showTopic('operations')` shows both containers in DOM order.

**Location:** `src/pages/practices.html` — lines 1559–1560 and 3931–4229; `src/playbook.tmpl.html` — lines 231–249

## Plan

1. Move the `#best-practices` section out of the first `operations` container, to the end of the second `operations` container (after `#production-monitoring`).
2. Remove the first `operations` container if it is empty after the move.
3. Check the CBP-646 topic footer: it must still render once, as the last child of the last `operations` container.
4. Run `build-source.py` and `build-dist.py`.

## Acceptance Criteria

- [x] In `src/pages/practices.html`, `#best-practices` comes after `#production-monitoring` in the DOM (`grep -n 'id="production-monitoring"\|id="best-practices"'` shows the larger line number for `best-practices`).
- [x] With the Operations topic shown, the top-to-bottom order of the section headings on the page matches the order of the Operations sub-items in the sidebar.
- [x] The Operations topic shows exactly one `.topic-footer`, and it is the last element in the topic.
- [x] `#practices/best-practices` opens the Operations topic and scrolls to Guidelines.

All criteria verified 2026-10-05 before commit.
