# CBP-601: Add auto mode adoption recommendation to /insights collapsible (v2.1.281)

## Summary

v2.1.281 added an auto mode recommendation to `/insights` that estimates how many permission prompts auto mode could have handled in your recent sessions.

## Assessment

The `/insights — Workflow Analysis` collapsible in `src/pages/practices.html` (~line 2408-2413) lists what the report covers as a bullet list. This is a small additive bullet.

## Plan

Add a new `<li>` to the bullet list in `src/pages/practices.html` (~line 2412, after "Tracks which tools and models you use most"):

```html
<li>Estimates how many permission prompts auto mode could have handled based on your recent sessions, as an adoption recommendation (v2.1.281)</li>
```

## Acceptance Criteria

- The `/insights` bullet list mentions the auto mode adoption recommendation.
