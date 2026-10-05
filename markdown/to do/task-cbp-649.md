# CBP-649 — Fix two "Invalid or unexpected token" errors on page load

## Source

Found during CBP-645 (scroll spy fix, 2026-10-05).

## Summary

Each load of `dist/fsad-playbook.html` throws 2 `pageerror` events with the message `Invalid or unexpected token`. The error has no stack trace, so the source is not known. Some code fails to run.

## Assessment

- Seen with headless Chromium (Playwright) over HTTP, on `main` and on the CBP-645 build.
- The 3 top-level inline `<script>` blocks in `dist/fsad-playbook.html` compile cleanly. So the source is somewhere else. Candidates: inlined playground iframes (`srcdoc`), inline event-handler attributes, or a script that `build-dist.py` injects.
- Also seen, not part of this bug: a 404 for `/_vercel/insights/script.js` when the site is served locally. That is expected outside Vercel.

**Location:** unknown. Start with `dist/fsad-playbook.html` (built by `scripts/build-dist.py`) and check whether `fsad-playbook.html` (the `build-source.py` output) also shows the errors.

## Plan

1. Load `fsad-playbook.html` (the source build) and `dist/fsad-playbook.html` over HTTP. Find which build first shows the errors.
2. Find the source. Check frames (`page.frames()`), inline handlers and injected scripts.
3. Fix the code in `src/` or in the build script.
4. Run `python3 scripts/build-source.py` and `python3 scripts/build-dist.py`.

## Root Cause

`scripts/build-dist.py:124` (before the fix) called `obj_re.subn(iframe_tag, content)` with a string replacement. `re` expands backslash escapes in a string replacement. The playground JS has string literals with `\n` (for example `add-task-playground.html:361`). In the `srcdoc`, each `\n` became a real newline. This made an unterminated string literal, so each of the 2 playground iframes threw `Invalid or unexpected token`.

`fsad-playbook.html` (the `build-source.py` output) has no errors. It loads the playgrounds through `<object>`, not through `srcdoc`.

**Fix:** `scripts/build-dist.py:126` now passes a callable, `obj_re.subn(lambda _: iframe_tag, content)`. `re` does not process escapes in the return value of a callable.

## Acceptance Criteria

- [x] When `dist/fsad-playbook.html` loads over HTTP in headless Chromium, there are 0 `pageerror` events within 3 s.
- [x] The task file records the root cause, with a `file:line` reference.
- [x] `build-dist.py` logs `Injected PLAYBOOK_EMBEDDINGS`.

All criteria verified 2026-10-05 before commit.
