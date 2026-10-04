# CBP-602: Add `maxProseWidth` setting to Notable settings.json Keys (v2.1.282)

## Summary

v2.1.282 added a `maxProseWidth` setting that caps the width of Claude's prose output in wide terminals, while tables and code blocks continue to use the full terminal width.

## Assessment

`src/pages/practices.html` maintains a "Notable `settings.json` Keys" callout list (~line 611–663) that already documents similar terminal-rendering settings such as `wheelScrollAccelerationEnabled`. `maxProseWidth` belongs as a new bullet at the end of that list.

## Plan

In `src/pages/practices.html`, append a new `<li>` to the Notable settings.json Keys list (after the current last item, `bashEditDiffEnabled`):

```html
<li style="margin-bottom:0;"><code>maxProseWidth</code> — Caps the width of Claude's prose output in wide terminals; tables and code blocks still render at the full terminal width (v2.1.282).</li>
```

Change the previous last item's `margin-bottom:0` to `margin-bottom:0.4rem` so only the new last item has `margin-bottom:0`.

## Acceptance Criteria

- The Notable settings.json Keys list documents `maxProseWidth`.
- List spacing (`margin-bottom`) stays consistent — only the true last item has `margin-bottom:0`.
