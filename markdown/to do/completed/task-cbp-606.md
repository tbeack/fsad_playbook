# CBP-606: Add `availableModelsMatch` / `deniedModels` managed settings to Notable settings.json Keys (v2.1.283)

## Summary

v2.1.283 added two enterprise managed settings that extend the `availableModels` allowlist:

- `availableModelsMatch: "exact"` — an `availableModels` entry allows only the exact model version it names, so a new model release stays blocked until explicitly added to the list.
- `deniedModels` — blocks specific models outright, even ones `availableModels` would otherwise allow.

## Assessment

- `src/pages/practices.html`'s "Notable settings.json Keys" callout (~line 611) already documents `enforceAvailableModels` (~line 636), a related managed setting for the same `availableModels` allowlist feature area. These two new settings extend that same area, so they belong as new bullets in the same list rather than a new section.

## Plan

1. In `src/pages/practices.html`, add a new bullet at the end of the Notable settings.json Keys list (after the `maxProseWidth` bullet, ~line 663):

```html
<li><code>availableModelsMatch</code> / <code>deniedModels</code> — Two more enterprise managed settings for the <code>availableModels</code> allowlist. Set <code>availableModelsMatch: "exact"</code> so an <code>availableModels</code> entry allows only the exact model version it names — a new model release stays blocked until explicitly added to the list. <code>deniedModels</code> blocks specific models outright, even ones <code>availableModels</code> would otherwise allow. Set via org/MDM managed settings only (v2.1.283).</li>
```

2. Move the `margin-bottom:0;` inline style (used to remove trailing margin on the last list item) from the `maxProseWidth` bullet to this new bullet.

## Acceptance Criteria

- The Notable settings.json Keys list documents both new managed settings, version-tagged v2.1.283, and the list's trailing-margin styling is preserved on the new last item.
