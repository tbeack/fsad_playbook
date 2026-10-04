# CBP-610: Update Ultracode callout — now a standalone `/effort` toggle, no longer forces `xhigh` (v2.1.284)

## Summary

v2.1.284 changed Ultracode into its own toggle in `/effort` (press Tab, or run `/effort ultracode [on|off]`): it no longer forces `xhigh` effort and now stays on at any effort level.

## Assessment

- `src/pages/practices.html`'s Dynamic Workflows collapsible has a "Trigger keyword: `ultracode`" callout (~line 2499-2503) that already tracks Ultracode's behavior changes over several versions (v2.1.160, v2.1.178, v2.1.229, v2.1.269, v2.1.271) as appended paragraphs. This is the natural place for the v2.1.284 change.

## Plan

1. In `src/pages/practices.html`, in the "Trigger keyword: `ultracode`" callout (~line 2499-2503), add a new paragraph after the existing ones:
   ```html
   <p style="margin-top:0.5rem;">As of v2.1.284, Ultracode is its own toggle in <code>/effort</code> — press <kbd>Tab</kbd> in the interactive slider, or run <code>/effort ultracode on</code> / <code>/effort ultracode off</code> directly. Turning it on no longer forces <code>xhigh</code> effort, and it now stays enabled at whatever effort level you're already on.</p>
   ```

## Acceptance Criteria

- The Ultracode callout documents the v2.1.284 change: standalone toggle syntax, no longer tied to `xhigh` effort, persists across effort levels.
