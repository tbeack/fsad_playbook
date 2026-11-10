# CBP-761: [Claude] Mods get fewer permission prompts (v2.1.321)

## Summary
Claude Code v2.1.321 changed mods Claude writes to turn on without asking in auto and bypass modes — even under a managed `allowUnsandboxedCommands: false` or `allowManagedDomainsOnly` policy, though not in `dontAsk` mode — and changed a mod's own tool calls (`$.tool.call`, `$.mcp.call`) to raise no permission prompt at all, even under the user's own ask rules or in `dontAsk`/`-p` runs; deny rules and organization policy still apply.

## Assessment
`src/pages/practices.html` has a Mods section (`#mods`, ~line 3695+) with an "Install, Trust, and Turn Off" collapsible whose first callout, "Mods Are Not Sandboxed" (~line 3789-3792), already warns that a mod runs with the user's permissions. This v2.1.321 change reduces prompting specifically, so it warrants its own adjacent callout rather than editing the existing one.

## Plan
1. Open `src/pages/practices.html`.
2. In the "Install, Trust, and Turn Off" collapsible, immediately after the "Mods Are Not Sandboxed" callout, add a new callout:
   ```html
   <div class="callout callout-warning" style="margin-top:0.75rem;">
     <div class="callout-title">Mods Get Fewer Permission Prompts (v2.1.321)</div>
     <p>As of v2.1.321, a mod Claude writes itself turns on without asking in auto and bypass permission modes — even under a managed <code>allowUnsandboxedCommands: false</code> or <code>allowManagedDomainsOnly</code> policy — and a mod's own tool calls (<code>$.tool.call</code>, <code>$.mcp.call</code>) raise no permission prompt at all, even under your own ask rules or in <code>dontAsk</code> and <code>-p</code> runs. Deny rules and organization policy still apply, and no mod loads automatically in <code>dontAsk</code> mode. Review a mod's <code>calls:</code> lines (see below) before trusting it with less friction than other tools get.</p>
   </div>
   ```

## Acceptance Criteria
- The Mods section documents the v2.1.321 reduction in permission prompts for Claude-authored mods and mod tool calls, including the deny-rule/org-policy and `dontAsk` carve-outs.
- HTML is valid (no unclosed tags).
