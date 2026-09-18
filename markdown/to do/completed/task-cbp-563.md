# CBP-563: [Claude] Add fast mode in Remote sessions note — Remote Control & Cross-Device collapsible (v2.1.271)

## Summary
Claude Code v2.1.271 added fast mode support to Claude Code Remote sessions (cloud and self-hosted runners): the host's fast-mode setting, or `/fast` typed in the session, applies where the organization allows it.

## Assessment
The Remote Control & Cross-Device collapsible (`src/pages/practices.html`, `power-usage--remote-control`) already tracks per-version Remote Control feature additions as bullets in its list, most recently the v2.1.265 VS Code auto-archive note (added by CBP-557). Fast mode reaching cloud and self-hosted-runner sessions is a direct extension of the effort-level/fast-mode sync already documented in the v2.1.234 bullet, so it belongs as a new bullet in the same list.

**Action:** Append a bullet to the Remote Control & Cross-Device collapsible's list.

## Plan
1. Locate the `<ul>` list in the Remote Control & Cross-Device collapsible in `src/pages/practices.html`, after the `[VS Code]` auto-archive bullet (v2.1.265, added by CBP-557).
2. Add a new bullet: "Fast mode now works in Claude Code Remote sessions (cloud and self-hosted runners): the host's fast-mode setting, or <code>/fast</code> typed in the session, applies where your organization allows it (v2.1.271)."

## Acceptance Criteria
- The Remote Control & Cross-Device collapsible documents fast mode in Remote sessions
- Version attribution (v2.1.271) included
- No existing content removed
