# CBP-303 — Document per-command `allowed_domains` in Subprocess Sandboxing (v2.1.271)

## Summary

Claude Code v2.1.271 added per-command `allowed_domains` to Bash, PowerShell, and Monitor in auto mode with sandboxing. When a sandboxed command needs a network host, that host is reviewed with the command and opened for that command alone. Hosts not in the per-command list are refused. This gives tighter network control than the session-wide `sandbox.network.allowedDomains` setting.

## Assessment

The Subprocess Sandboxing section already documents `sandbox.network.allowedDomains` and `sandbox.network.deniedDomains` at lines 10698–10699. The new per-command behavior is a runtime feature of auto+sandboxed mode, not a settings key, so it does not fit as a table row. A callout below the settings table (after the closing `</div>` at line 10708, before the "Hardening env vars" paragraph) is the right location.

## Plan

1. Read the sandbox settings table in `fsad-playbook.html` around lines 10700–10710.
2. Insert a `callout callout-tip` div after line 10708 (the closing `</div>` for the table wrapper) and before the "Hardening env vars" paragraph.

## New content

```html
        <div class="callout callout-tip" style="margin-top:0.75rem; margin-bottom:0.5rem;">
          <div class="callout-title">Per-command network access (v2.1.271)</div>
          <p>In auto mode with sandboxing, Bash, PowerShell, and Monitor commands can now declare their own <code>allowed_domains</code>. When a command needs a network host, Claude reviews the required hosts alongside the command and opens access for that command alone. Other commands cannot reach those hosts. This tightens network isolation beyond the session-wide <code>sandbox.network.allowedDomains</code> allowlist.</p>
        </div>
```

## Acceptance Criteria

- A callout about per-command `allowed_domains` appears after the sandbox settings table and before the "Hardening env vars" paragraph.
- The callout explains the feature and how it differs from the session-wide `sandbox.network.allowedDomains` setting.
- No other content is changed.
