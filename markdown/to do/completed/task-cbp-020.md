# CBP-020 — Add Subprocess Sandboxing Env Vars to Power Usage

## Summary
Claude Code v2.1.98 added subprocess sandboxing with two new env vars:
- `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB` — Enables PID namespace isolation on Linux for sandboxed commands
- `CLAUDE_CODE_SCRIPT_CAPS` — Limits per-session script invocations (rate cap)

These are security-hardening features relevant to teams running Claude Code in shared environments, CI/CD, or with untrusted scripts. Currently not documented anywhere in the playbook.

## Assessment
The Power Usage section is the right home. There's no dedicated security/sandboxing collapsible, but these env vars could be added as a callout or note within the existing content. The best approach is a new collapsible "Subprocess Sandboxing" after Monitor Tool, following the same pattern as other Power Usage collapsibles.

## Plan

1. Read the area after the Monitor Tool collapsible insertion point (after Context Management, ~line 4465)
2. Add a new "Subprocess Sandboxing" collapsible:
   ```html
   <!-- Subprocess Sandboxing -->
   <div class="collapsible">
     <div class="collapsible-header">
       <h3>Subprocess Sandboxing</h3>
       <span class="collapsible-chevron">&#9660;</span>
     </div>
     <div class="collapsible-body"><div class="collapsible-content">
       <p>Two env vars harden Claude Code's Bash tool for shared environments and CI/CD:</p>
       <div class="table-wrap" style="margin-top:0.75rem;">
         <table class="styled-table">
           <thead><tr><th>Env Var</th><th>Effect</th></tr></thead>
           <tbody>
             <tr><td><code>CLAUDE_CODE_SUBPROCESS_ENV_SCRUB=1</code></td><td>Enables PID namespace isolation on Linux — sandboxed commands can't see or signal processes outside their namespace</td></tr>
             <tr><td><code>CLAUDE_CODE_SCRIPT_CAPS=N</code></td><td>Limits the total number of script invocations per session to N — prevents runaway automation</td></tr>
           </tbody>
         </table>
       </div>
       <div class="callout callout-tip" style="margin-top:0.75rem; margin-bottom:0;">
         <div class="callout-title">Use Case</div>
         <p>Set these in CI/CD pipelines or shared dev environments where multiple users or agents run on the same machine. Prevents one session from interfering with another.</p>
       </div>
     </div></div>
   </div>
   ```

## Acceptance Criteria
- [ ] New "Subprocess Sandboxing" collapsible appears in Power Usage section
- [ ] Both env vars documented with descriptions
- [ ] Use-case callout explains when to enable
- [ ] Matches existing collapsible and table HTML patterns
