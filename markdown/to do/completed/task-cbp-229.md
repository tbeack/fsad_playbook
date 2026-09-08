# CBP-229 — Move security review section to Skills Library

## Summary

The Multi-Agent Security Review Team section currently lives under Claude Best Practices → Integrations & Review. Move it to the Skills Library page, where it belongs alongside the `fsd:sec-review-team` and `fsd:sec-review-fixes` skill definitions that are already there.

## Assessment

**Security review section location:** `fsad-playbook.html` lines 7705–8922 — `<section id="security-review">` inside `<div class="topic-view" data-topic="integrations" hidden>` on `page-practices`. Contains the full section: label "10.6 — Security Review", heading, subtitle, SVG flow diagram (dark + light), prose explanation, collapsibles, and install code block.

**Skills Library page:** `page-skills`, lines 3539–6603. Two sections today:
- `01 — Skills in this Playbook` (id="skills-library", line 3549)
- `02 — Skill Definitions` (id="skills-definitions", line 3686)

Footer at line 6599; `</div><!-- end page-skills -->` at line 6603.

**Nav items to update:**
- Remove: line 2188 — Security Review nav-sub-item under "Integrations & Review" in practices sidebar
- Add: after line 2146 — "Security Review" nav-sub-item in skills sidebar

**sectionToPageMap:** line 13507 — `'security-review': 'practices'` → `'security-review': 'skills'`

**Cross-reference link:** line 12330 — Codex page has a link `href="#practices/security-review"` with `switchPage('practices')` — needs to update to `#skills/security-review` and `switchPage('skills')`

## Plan

### Step 1 — Move the HTML section from practices to skills

Use a Python script to:

1a. Read the full HTML file into memory.

1b. Locate the security review section by finding `<section id="security-review">` and its matching `</section>`, plus the trailing `<hr class="divider">` that follows it (up to the closing `</div>` of the topic-view, which must be preserved).

1c. Extract the section HTML block.

1d. In the extracted block, change the section label from `10.6 — Security Review` to `03 — Security Review`.

1e. Remove the extracted block (plus trailing `<hr>` and blank lines) from its current location in practices.

1f. Insert `\n\n<hr class="divider">\n\n` + extracted section block before the `<footer>` tag that closes the skills page.

1g. Write the modified file back.

### Step 2 — Update the practices sidebar nav

Remove the Security Review nav-sub-item from line 2188:
```
<a class="nav-sub-item" href="#practices/security-review" onclick="event.preventDefault(); showTopic('integrations'); setTimeout(()=>scrollToId('security-review'),120)">Security Review</a>
```

### Step 3 — Add Security Review to the skills sidebar nav

After the Definitions item (line 2146), add:
```
<a class="nav-sub-item" href="#skills/security-review" onclick="scrollToSection('security-review')">Security Review</a>
```

### Step 4 — Update sectionToPageMap

Change `'security-review': 'practices'` to `'security-review': 'skills'` in the JS routing map.

### Step 5 — Update cross-reference link on Codex page

Update the link that currently points to `#practices/security-review` with `switchPage('practices')`:
- Change `href` to `#skills/security-review`
- Change `switchPage('practices')` to `switchPage('skills')`

### Step 6 — Bump version and CHANGELOG

Bump from v2.88.0 → v2.89.0. Update all three version locations:
1. `<title>` tag
2. Sidebar brand badge
3. Changelog modal (new `<section>` block)

CHANGELOG entry:
> **Moved Multi-Agent Security Review Team to Skills Library.** Relocated the Security Review section from Claude Best Practices → Integrations & Review to the Skills Library page, where it now appears as section 03 alongside the `fsd:sec-review-team` and `fsd:sec-review-fixes` skill definitions. Updated sidebar nav, deep-link routing, and a cross-reference on the Codex page.

### Step 7 — Build dist and verify

Run `python3 scripts/build-dist.py` and open the playbook in a browser to verify:
- Skills Library page shows the Security Review section as section 03
- Nav in skills sidebar shows "Security Review" item and scrolls correctly
- The Security Review link no longer appears in the Claude Best Practices sidebar
- Deep link `#skills/security-review` works
- Codex page cross-reference links correctly to the new location

All criteria verified 2026-06-04 before commit.

## Acceptance Criteria

- [x] `<section id="security-review">` is no longer inside `page-practices`
- [x] `<section id="security-review">` appears in `page-skills`, after the `skills-definitions` section and before the footer, with section label "03 — Security Review"
- [x] Skills sidebar nav has a "Security Review" item that navigates to the section
- [x] "Security Review" nav item no longer appears in the Claude Best Practices → Integrations & Review topic group
- [x] `sectionToPageMap['security-review']` is `'skills'` (not `'practices'`)
- [x] Cross-reference link on Codex page points to `#skills/security-review`
- [x] Version bumped to v2.91.0 in all three locations (title, brand badge, changelog modal)
- [x] `dist/fsad-playbook.html` rebuilt and in sync with source
