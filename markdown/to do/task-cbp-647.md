# CBP-647 — Fix scroll spy substring match lighting more than one sidebar sub-item

## Source

Found during CBP-645 (scroll spy fix, 2026-10-05).

## Summary

The scroll spy marks a `.nav-sub-item` active when its `onclick` text contains the section id. When one id is a substring of another, both items light at the same time.

## Assessment

The section branch of the `sectionObserver` callback uses `item.getAttribute('onclick')?.includes(id)`. Seen in the browser:
- `#monitoring` lights `#practices/monitoring` and `#practices/production-monitoring`. This became visible after CBP-645, because `#monitoring` was never observed before.
- `#building-skills` lights `#practices/building-skills` and `#codex/codex-building-skills`.
- `#workflow` lights `#fsad/workflow` and `#workflows/workflows-hero`.

**Location:** `src/js/scroll-spy.js` — section branch of the `sectionObserver` callback (`onclick?.includes(id)`).

## Plan

1. Match on an exact id. Example: compare the last path part of the item's `href` (`#page/<id>`) with `id`. Check first that every `.nav-sub-item` in `src/playbook.tmpl.html` has a `#page/<id>` href.
2. Run `python3 scripts/build-source.py` and `python3 scripts/build-dist.py`.
3. Verify in a browser over HTTP.

## Acceptance Criteria

- [ ] After `scroll_to` `#monitoring` on `#practices/operations`, `.nav-sub-item.active` matches exactly 1 element, with `href="#practices/monitoring"`.
- [ ] After `scroll_to` `#building-skills` on `#practices/skills-hooks`, `.nav-sub-item.active` matches exactly 1 element, with `href="#practices/building-skills"`.
- [ ] After `scroll_to` `#workflow` on `#fsad`, `.nav-sub-item.active` matches exactly 1 element, with `href="#fsad/workflow"`.
- [ ] The CBP-645 checks still pass: `#mods`, `#hooks-deep-dive`, `#cloud-integrations` and `#getting-started` each highlight their own sub-item.
- [ ] `build-dist.py` logs `Injected PLAYBOOK_EMBEDDINGS`.
