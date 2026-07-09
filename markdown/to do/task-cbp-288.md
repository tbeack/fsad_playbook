# CBP-288 — [Claude] Add `/dataviz` to Cheat Sheet Automation & agents table (v2.1.198)

## Summary
Claude Code v2.1.198 added `/dataviz` as a built-in skill providing chart and dashboard design guidance with a runnable color-palette validator. It guides users through chart selection, accessible color formulas, and visualization best practices.

## Assessment
The Cheat Sheet's "Automation & agents" table (page-practices, Cheat Sheet section) currently ends with:
- `/security-review` — Analyze pending changes for security issues (line ~9917)

`/dataviz` is not present anywhere in the playbook. It fits naturally after `/security-review` in the Automation & agents table since it's a built-in skill-based command.

## Plan
Add a new row after the `/security-review` row in the Automation & agents table:

```html
<tr><td><code>/dataviz</code></td><td>Chart and dashboard design guidance — guides through chart type selection, accessible color formulas (with a runnable palette validator), mark specs, and interaction rules for HTML/React, SVG, and plotting libraries. Use before writing any chart or visualization code (v2.1.198).</td></tr>
```

Target location: after line 9917 (`/security-review` row), before the closing `</tbody>`.

## Acceptance Criteria
- `/dataviz` row appears in the Automation & agents table of the Cheat Sheet
- Description accurately describes the skill's purpose
- Row is placed logically after `/security-review`
