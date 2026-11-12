# CBP-703 — Document Code Review review levels and org-wide repo selection

## Summary

Claude Code v2.1.304 adds two admin-facing Code Review features:
- **Review levels**: Owners choose Quick, Standard (the default), or Deep for the organization, and can give individual repositories their own level.
- **Org-wide repo selection**: an option in Code Review admin settings to review every repository in a GitHub organization, including ones added later, without selecting them one by one.

## Assessment

The Code Review Agent setup guide (`src/pages/practices.html`, section `#code-review`, "Setup Guide" step cards starting at line ~993) covers enabling Code Review and selecting repositories (step 2, line ~1001) and choosing the review trigger (step 3, line ~1007). Both new features fit naturally into the existing step cards rather than requiring a new step.

## Plan

1. Open `src/pages/practices.html`.
2. In step 2 ("Install the Claude GitHub App", line ~1002), after "Select which repositories to enable — start with 1–2 repos to test.", add a sentence on the org-wide option:

```html
<p>Grant <strong>Contents</strong>, <strong>Issues</strong>, and <strong>Pull Requests</strong> read/write permissions. Select which repositories to enable — start with 1–2 repos to test. As of v2.1.304, admins can instead choose to review every repository in the GitHub organization, including ones added later, without selecting them one by one.</p>
```

3. In step 3 ("Choose Your Review Trigger", line ~1008), add a line about review levels:

```html
<p><strong>After PR creation only</strong> — runs once when opened (recommended to start). <strong>After every push</strong> — runs on each push, auto-resolves threads when issues are fixed. As of v2.1.304, owners also choose a review level — <strong>Quick</strong>, <strong>Standard</strong> (the default), or <strong>Deep</strong> — for the organization, and can override it per repository.</p>
```

4. Save the file.

## Acceptance Criteria

- Step 2's text documents the org-wide "review every repository" option.
- Step 3's text documents the Quick/Standard/Deep review levels and per-repository override.
- No other steps are affected.
