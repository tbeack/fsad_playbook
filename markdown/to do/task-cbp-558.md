# CBP-558: [Claude] Add per-command `allowed_domains` for Bash/PowerShell/Monitor in auto mode — Subprocess Sandboxing collapsible (v2.1.271)

## Summary
Claude Code v2.1.271 added per-command `allowed_domains` to Bash, PowerShell, and Monitor in auto mode with sandboxing: the hosts a specific command needs are reviewed alongside it and opened for that command alone, rather than widening the session's whole domain allowlist.

## Assessment
The Subprocess Sandboxing collapsible (`src/pages/practices.html`, `power-usage--subprocess-sandboxing`) already documents `sandbox.network.allowedDomains` as a session-wide list and tracks incremental sandboxing changes by version in its intro paragraph (most recently the v2.1.261 dangerous-`rm` catch). The new per-command scoping is a meaningful precision improvement for auto mode users and belongs in that same paragraph, next to the other auto-mode/sandboxing version notes.

**Action:** Append a sentence to the intro paragraph of the Subprocess Sandboxing collapsible.

## Plan
1. Locate the intro paragraph in `src/pages/practices.html` (`power-usage--subprocess-sandboxing`) ending "...inside double-quoted `sh -c` scripts."
2. Append: "As of v2.1.271, auto mode with sandboxing supports per-command `allowed_domains` for Bash, PowerShell, and Monitor — the hosts a specific command needs are reviewed with it and opened for that command alone, instead of widening the session's whole domain allowlist."

## Acceptance Criteria
- The Subprocess Sandboxing collapsible mentions per-command `allowed_domains`
- Version attribution (v2.1.271) included
- No existing content removed
