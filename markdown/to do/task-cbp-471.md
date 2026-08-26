# CBP-471 — Fix alignment of security-review-team section following code-review-team section

## Source
User-reported visual bug: the Security Review Team section (which follows Code Review Team on the Skills Library page) is misaligned and should be centered like the rest of the page.

## Summary
`<section id="security-review">` renders as a direct child of `<body>` instead of nested inside `#page-skills`, so it doesn't get the page's centered/padded layout — it spans a different width than every other section on the page. Root cause is a div-nesting bug in `fsad-playbook.html`, not a CSS/alignment property issue.

## Assessment
Commit `a6ff9707` (2026-08-26) added a 7th specialist collapsible (`security-reviewer`) to the `code-review-team` section to match parity with `sec-review-team`. The new collapsible itself opens/closes correctly (`<div class="collapsible" id="crt-ov-spec--security">` … `</div></div></div>`, verified balanced), but immediately after it, 3 extra stray closing `</div>` tags were left behind — duplicates of the pattern that used to close the *previous* (`api-contract-reviewer`) collapsible right before `</section>`.

Verified via browser DOM inspection (`getBoundingClientRect`/`parentElement`):
- `#code-review-team`'s parent is `#page-skills` (correct).
- `#security-review`'s parent is `<body>` (wrong) — confirming the extra closes walk back out past `#page-skills`.

Verified via a div open/close depth trace of `fsad-playbook.html` from `#page-skills`'s opening tag (line 3694) through `<section id="security-review">` (line 8598): depth returns to exactly 0 (balanced) through every one of the 7 specialist collapsibles, then goes to `-1` and `-3` at the stray lines below.

**Location:** `fsad-playbook.html` lines 8588–8593 (current state):
```html
      </div></div>
    </div>

      </div></div>      <!-- line 8591: stray, extra -->
    </div>              <!-- line 8592: stray, extra -->
</section>
```
Lines 8588–8589 correctly close the `security-reviewer` collapsible (`.collapsible-content`, `.collapsible-body`, `.collapsible`). Lines 8591–8592 have no matching opening tags anywhere in the section and must be deleted.

## Plan
1. In `fsad-playbook.html`, delete the stray `</div></div>` (line 8591) and `</div>` (line 8592) immediately before `</section>` that closes `#code-review-team`, leaving a single blank line (or none) before `</section>`.
2. Reload the page and re-run the DOM check: confirm `#security-review`'s `parentElement` is `#page-skills` (matching `#code-review-team`'s parent).
3. Confirm via `getBoundingClientRect()` that `.sec-review-flow-diagram` and `.crt-flow-diagram` report the same `left` offset relative to their respective sections, and that `#security-review`'s computed width/margins now match `#code-review-team`'s.
4. Visually re-check the Skills Library page in browser (light + dark) around the code-review-team → security-review transition to confirm no visual regression (divider, spacing, collapsibles above/below still intact).
5. Run `python3 scripts/build-dist.py` to rebuild `dist/fsad-playbook.html`.

## Acceptance Criteria
- [x] `fsad-playbook.html` has no unmatched/stray closing `</div>` tags between `<section id="code-review-team">` and `<section id="security-review">` (div open/close count balances to exactly 0 across that range).
- [x] In a live DOM check, `document.getElementById('security-review').parentElement` is `#page-skills`, same as `document.getElementById('code-review-team').parentElement`.
- [x] `#security-review` and `#code-review-team` report equal `left`/`width` bounding-rect values in the browser (i.e., both centered identically within `#page-skills`).
- [ ] No other section on the Skills Library page regressed (spot-check that page still renders end-to-end without console errors after the fix). **FAIL (refuter-downgraded):** no console errors and correct DOM nesting for all 4 sections were independently confirmed, but the verifier's evidence bundle also claimed the sidebar correctly scroll-spies to "Security Review" when that section scrolls into view — the refuter could not reproduce this; the nav item never gains the `active` class. The `sectionObserver` registration logic (`pageEl.querySelectorAll('section[id], .hero[id]')`, ~line 17229) is byte-identical to `main`, so this scroll-spy gap is not new behavior introduced by the div fix — but that has not been independently confirmed pre-existing due to context limits, and fixing scroll-spy is outside this task's plan/scope. Stopping to ask the user rather than expanding scope.
- [x] `dist/fsad-playbook.html` rebuilt via `scripts/build-dist.py` and matches the source change.
