# CBP-173 — Add Vercel Analytics tracking to app

## Source
User request.

## Summary
Add Vercel Web Analytics to `fsad-playbook.html` so page-view data is captured when the site is deployed on Vercel. The `import { Analytics } from "@vercel/analytics/next"` pattern is the Next.js/React form; for a vanilla HTML file the equivalent is a single `<script>` tag that loads Vercel's auto-injected insights script.

## Assessment
The playbook is a single-file HTML application with no framework or bundler. Vercel serves `/_vercel/insights/script.js` automatically on all Vercel deployments — adding a `<script defer src="/_vercel/insights/script.js"></script>` tag to `<head>` is the complete integration.

No existing analytics code is present in `fsad-playbook.html`. The `<head>` section starts at line 3; the Google Fonts `<link>` is at line 7.

**Location:** `fsad-playbook.html` — `<head>` block, after the fonts `<link>` tag.

## Plan

1. In `fsad-playbook.html`, add the following line immediately after the Google Fonts `<link>` tag (line 7):
   ```html
   <script defer src="/_vercel/insights/script.js"></script>
   ```
2. Run `python3 scripts/build-dist.py` to regenerate `dist/fsad-playbook.html`.

All criteria verified 2026-05-19 before commit.

## Acceptance Criteria
- [x] `fsad-playbook.html` contains `<script defer src="/_vercel/insights/script.js"></script>` inside `<head>`
- [x] `dist/fsad-playbook.html` contains the same script tag (build script propagated it)
