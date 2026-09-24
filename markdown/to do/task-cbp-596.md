# CBP-596: Add `attribution: false` top-level settings.json key to Notable Settings (v2.1.281)

## Summary

v2.1.281 added `"attribution": false` in `settings.json` to hide **all** commit and PR attribution — a broader switch than the existing `attribution.sessionUrl` (which only omits the claude.ai session link). The changelog notes older CLI versions skip a settings file that holds it, so teams sharing settings files across versions should keep the object form (`{"sessionUrl": false}`) rather than the new bare boolean if they need backward compatibility.

## Assessment

`src/pages/practices.html` already documents `attribution.sessionUrl` in the Notable Settings list (~line 639). The new top-level boolean is a related but distinct key and belongs as its own bullet near it.

## Plan

Insert a new `<li>` immediately after the `attribution.sessionUrl` bullet in `src/pages/practices.html`:

```html
<li style="margin-bottom:0.4rem;"><code>attribution: false</code> — Top-level boolean that hides all commit and PR attribution lines entirely (broader than <code>attribution.sessionUrl</code>, which only omits the session URL). Older CLI versions skip a settings file holding this bare boolean, so keep the object form (<code>{"sessionUrl": false}</code>) in settings files shared across versions (v2.1.281).</li>
```

## Acceptance Criteria

- The Notable Settings list documents the new `attribution: false` key distinctly from `attribution.sessionUrl`.
- The backward-compatibility caveat about older CLI versions is included.
