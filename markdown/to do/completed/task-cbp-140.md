# CBP-140 — Decrease version number font size by 50%

## Summary
The version number (`· v2.57.0`) in the sidebar brand is visually too prominent. Reduce its font size by 50% relative to the parent `.sidebar-brand` size.

## Assessment
The version number is rendered as a `<a>` tag inside `.sidebar-brand` at line 1886 of `fsad-playbook.html`:

```html
<span class="sidebar-brand">FSAD <a href="#changelog" ... style="color: var(--text-muted); font-weight: 400; ...">· v2.57.0</a></span>
```

`.sidebar-brand` is defined at line 361 with `font-size: 1.44rem`. The `<a>` inherits this size — no font-size override exists.

**Location:** `fsad-playbook.html:1886` — inline `style` on the `<a>` tag

## Plan

1. Add `font-size: 0.5em` to the inline `style` on the `<a>` tag at line 1886. This sets the version number to 50% of `.sidebar-brand`'s `1.44rem` (= `0.72rem`), matching the task requirement exactly.
2. Run `python3 scripts/build-dist.py` to regenerate `dist/fsad-playbook.html`.
3. Verify in browser that the FSAD brand text is unchanged and the version number is visibly smaller.

All criteria verified 2026-05-13 before commit.

## Acceptance Criteria
- [x] The `· v2.57.0` text renders at half the size of the "FSAD" brand text in the sidebar.
- [x] The "FSAD" brand text size is unchanged (still `1.44rem`).
- [x] The version link is still clickable and opens the changelog.
- [x] `dist/fsad-playbook.html` is regenerated and reflects the change.
