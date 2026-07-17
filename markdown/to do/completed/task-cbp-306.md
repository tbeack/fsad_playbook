# CBP-306 — Config: autoMode classifier defaults to Sonnet 5 for external sessions

**Source:** Claude Code v2.1.210  
**Type:** Update existing  
**Affects:** Claude Best Practices → Notable settings.json Keys callout (autoMode section)

## Summary

Claude Code v2.1.210 improved auto mode: the permission classifier that evaluates whether tool calls require approval now defaults to Sonnet 5 for external sessions (SDK, webhooks, headless). The classifier model is validated on the session's first request and pinned for the session's lifetime. This is a meaningful behavior note for teams using auto mode in CI/CD pipelines, webhook handlers, or SDK-driven workflows.

## Assessment

The playbook's "Notable settings.json Keys callout" documents several autoMode properties (`autoMode.classifyAllShell`, `settings.autoMode.hard_deny`, `autoMode settings location`, `disableAutoMode`). There is no existing bullet about the classifier model or its default for external sessions.

The new bullet should be placed near the other autoMode bullets (around lines 8674–8677).

## Plan

1. Read `fsad-playbook.html` around lines 8674–8677 to confirm exact context.
2. Add a new `<li>` immediately after the existing `autoMode settings location` bullet at line 8677, before the `Deny rule glob patterns` bullet at line 8678.
3. The new bullet should say:
   - **autoMode classifier model for external sessions** — In auto mode, the permission classifier that evaluates whether tool calls require approval defaults to **Sonnet 5** for external sessions (SDK, webhooks, headless `claude -p` runs). The model is validated on the session's first request and pinned for the rest of that session. This ensures consistent, low-latency classification for unattended pipelines without incurring per-call model selection overhead (v2.1.210).

## Acceptance Criteria

- New `<li>` appears in the Notable settings.json Keys callout near the other autoMode bullets
- Content accurately describes Sonnet 5 as the classifier default for external sessions
- Existing bullets are not disrupted
