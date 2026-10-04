# CBP-597: Auto mode server-side classifier now also reviews read-only/sandboxed shell commands (v2.1.281)

## Summary

v2.1.281 changed auto mode so that, where its classifier review runs server-side, read-only and sandboxed shell commands also wait for that review and are blocked when it flags them — previously these were auto-approved without a classifier round-trip.

## Assessment

`src/pages/practices.html`'s Notable Settings list already tracks several auto-mode classifier-scope changes chronologically (e.g. the v2.1.236 "Auto mode reviews Monitor commands like Bash" bullet at ~line 628). This new bullet fits the same theme — classifier coverage expanding to previously-exempt command categories.

## Plan

Insert a new `<li>` immediately after the "Auto mode reviews Monitor commands like Bash" bullet (~line 628) in `src/pages/practices.html`:

```html
<li style="margin-bottom:0.4rem;"><strong>Auto mode classifier now reviews read-only/sandboxed shell commands</strong> — Where auto mode's classifier review runs server-side, read-only and sandboxed shell commands also wait for that review and are blocked when it flags them, instead of being auto-approved without a classifier round-trip (v2.1.281).</li>
```

## Acceptance Criteria

- The Notable Settings list documents that server-side classifier review now covers read-only/sandboxed shell commands, not just mutating ones.
