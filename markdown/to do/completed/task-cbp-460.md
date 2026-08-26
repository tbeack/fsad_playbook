# CBP-460 — Fix deeplink for the Code Review Team section

## Source
User request — asked for a deeplink/direct link to the Code Review Team section of the Skills Library page.

## Summary

The deeplink infrastructure for `#skills/code-review-team` already exists (nav `href`, `sectionToPageMap` entry, `handleRoute()` support — all built under CBP-230), but landing on it is broken: on a fresh page load or a hashchange-triggered navigation (including clicking the "Code Review" sidebar link), the page briefly flashes to the Skills Library hero and then does a slow, animated smooth-scroll down to the target section, with the URL flickering through intermediate section hashes along the way. This is a poor deeplink experience — a shared link should land the reader directly on the section, not mid-animation.

## Assessment

**Root cause**, verified live in browser (served `fsad-playbook.html` over a local HTTP server and navigated directly to `#skills/code-review-team`):

1. `handleRoute()` (`fsad-playbook.html:16562`) resolves the hash, calls `switchPage('skills', navBtn)`, then — because `pageId !== 'practices'` — falls through to `setTimeout(() => scrollToId(sectionId), 100)` (`fsad-playbook.html:16607`) to scroll to the target section.
2. `switchPage()` (`fsad-playbook.html:16621`) immediately does `window.scrollTo(0, 0)`, then (inside a double `requestAnimationFrame`) calls `reinitSectionObserver(targetPage)` (`fsad-playbook.html:16642`), which re-observes every `section[id]`/`.hero[id]` on the page.
3. `IntersectionObserver` fires its callback immediately for elements that are already intersecting at observe-time. Since the page is scrolled to `(0,0)`, that's the page's hero section (`skills-hero`). The `sectionObserver` callback (`fsad-playbook.html:17138`) then calls `history.replaceState(null, '', '#skills/skills-hero')` — overwriting the intended hash — **before** the 100ms `scrollToId` timeout has even fired.
4. `scrollToId()` (`fsad-playbook.html:16783`) always scrolls with `behavior: 'smooth'`. For a section far down a long page like `code-review-team` (Skills Library's 3rd major section, after a long Overview + Skill Definitions), the animated scroll takes long enough to be clearly visible — the reader sees the wrong hero content first, then watches the page scroll past everything to reach the target, with the URL hash visibly cycling through intermediate sections as `sectionObserver` fires during the scroll.

This same `handleRoute()` path is used both for a fresh/pasted URL **and** for in-app nav-link clicks (`scrollToSection()` at `fsad-playbook.html:16778` just sets `window.location.hash`, which triggers `handleRoute()` via `hashchange`) — so clicking "Code Review" in the sidebar has the identical flash/slow-scroll symptom.

**Location:** `fsad-playbook.html` — `scrollToId()` (~16783), `handleRoute()` (~16562–16609), `openAndScrollToLeaf()` (~16795)

## Plan

### Step 1 — Add an `instant` option to `scrollToId()`

```js
function scrollToId(id, instant) {
  const el = document.getElementById(id);
  if (el) {
    const headerOffset = 80;
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: instant ? 'auto' : 'smooth' });
  }
}
```

### Step 2 — Add an `instant` pass-through to `openAndScrollToLeaf()`

```js
function openAndScrollToLeaf(collapsibleId, topicId, instant) {
  const el = document.getElementById(collapsibleId);
  if (!el) return;
  if (topicId && TOPIC_IDS.includes(topicId) && window.__currentTopic !== topicId) {
    showTopic(topicId);
  }
  el.classList.add('open');
  setTimeout(() => scrollToId(collapsibleId, instant), 140);
}
```

### Step 3 — Pass `instant = true` from every `handleRoute()` call site

At `fsad-playbook.html:16577, 16579, 16596, 16598, 16607` — these are the route-entry paths that fire on initial page load and on any hashchange (URL paste, nav-link click, browser back/forward). Update each to pass `true`:

- `setTimeout(() => scrollToId(pageId, true), 120);`
- `scrollToId(pageId, true);`
- `setTimeout(() => openAndScrollToLeaf(leafId, topic, true), 140);`
- `setTimeout(() => scrollToId(sectionId, true), 120);`
- `setTimeout(() => scrollToId(sectionId, true), 100);`

Leave every other `scrollToId(...)` call site (practices-page sidebar sub-item `onclick` handlers, search-result click handler) as smooth — those are deliberate in-page jumps where an animated scroll is the better UX, not a fresh deeplink landing.

### Step 4 — Build dist artifact

Run `python3 scripts/build-dist.py` to regenerate `dist/fsad-playbook.html`.

### Step 5 — Version bump

Update all three version locations per the CLAUDE.md checklist (`<title>` tag, sidebar brand badge, changelog modal).

### Step 6 — Verify in browser

Serve the file locally (`python3 -m http.server`) and test:
- Fresh tab → `http://localhost:PORT/fsad-playbook.html#skills/code-review-team` lands directly on the Code Review Team section — no visible hero flash, no visible scroll animation.
- `window.location.hash` reads `#skills/code-review-team` immediately and does not revert to `#skills/skills-hero`.
- From a different page, click the "Code Review" sidebar link under Skills Library — same instant landing, no flash/slow-scroll.
- Confirm practices-page sidebar sub-item clicks (e.g. "Hooks") still animate smoothly — unchanged.
- Confirm a leaf-level deeplink (e.g. `#practices/hooks-deep-dive/lifecycle`) still opens its collapsible and lands instantly, no flash.

## Repair notes (beyond the original plan)

Independent verification surfaced two additional bugs beyond the original plan's `targetHash`-pinning approach, both fixed:

1. **Scroll-spy hash race**: `switchPage()`'s `reinitSectionObserver()` re-observes the hero on route entry, and its `IntersectionObserver` initial-fire unconditionally called `history.replaceState()` to the hero's hash before the route's own corrective pin ran. Fixed with a `routeSettling` module-level flag (set at the top of `handleRoute()`, auto-clears after 500ms) that guards both `replaceState` calls inside the `sectionObserver` callback.
2. **CSS transform landing drift**: `.page`/`.page.active` had a `transform: translateY(10px) → translateY(0)` slide alongside the opacity fade; `scrollToId()`'s `getBoundingClientRect()` was computed while that transform was still applied, causing the landed position to drift ~10px as the transform later animated. Removed the transform from `.page`/`.page.active` CSS and `switchPage()`'s inline styles entirely — only the opacity fade remains.
3. **`scroll-behavior: smooth` CSS override**: the page has `html { scroll-behavior: smooth; }` globally; `window.scrollTo({ behavior: 'auto' })` defers to that CSS property rather than forcing an instant jump, so the "instant" scroll was never actually instant. Changed `scrollToId()` to pass `behavior: 'instant'`, the spec value that explicitly bypasses CSS `scroll-behavior`.
4. The route-entry call site for plain section hashes (e.g. `#skills/code-review-team`) no longer waits on a `setTimeout` before scrolling — it now calls `scrollToId` synchronously, immediately after `switchPage()`, so the correct position is set before the page's fade-in ever paints.

A separate, pre-existing, out-of-scope issue was also found during final verification: `page-fsad` is hardcoded `active` in the static HTML markup, and all routing JS runs only after `DOMContentLoaded` — so there is a theoretical window, on *any* fresh load of *any* hash (not specific to this task), where the browser could paint the default FSAD hero before JS switches pages. This is universal to the whole app's load sequence, not introduced or worsened by this task, and fixing it would require redesigning page-load bootstrapping (e.g. an inline synchronous `<head>` script). Out of scope for CBP-460 — accepted as a known residual risk per user direction; worth its own task if it proves perceptible in practice.

All criteria verified 2026-08-26 before commit.

## Acceptance Criteria
- [x] Opening `#skills/code-review-team` in a fresh tab lands directly on the Code Review Team section with no visible flash to the Skills Library hero and no visible scroll-journey animation
- [x] `window.location.hash` reads `#skills/code-review-team` immediately after landing and is not overwritten to `#skills/skills-hero`
- [x] Clicking the "Code Review" sidebar link (Skills Library → Code Review) from another page lands directly on the section with the same instant behavior
- [x] A leaf-level deeplink (e.g. `#practices/hooks-deep-dive/lifecycle`) still opens its collapsible and lands instantly on load
- [x] Practices-page sidebar sub-item clicks still smooth-scroll (unchanged, not instant)
- [x] `dist/fsad-playbook.html` rebuilt via `scripts/build-dist.py` and matches source
- [x] Version bumped and in sync across `<title>` tag, sidebar brand badge, and changelog modal
