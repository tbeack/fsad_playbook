# CBP-763: [Claude] Add Code Mode collapsible to Power Usage (v2.1.323)

## Summary
Claude Code v2.1.323 added Code Mode, an experimental opt-in execution mode in which Claude writes JavaScript to call its tools instead of making one tool call per turn. See https://code.claude.com/docs/en/code-mode to turn it on, or to turn it off for an organization.

## Assessment
`src/pages/practices.html`'s Power Usage section (`#power-usage`) already documents other opt-in, experimental execution modes as their own collapsibles — most notably Dynamic Workflows (`power-usage--dynamic-workflows`, ~line 2407-2447), which follows the pattern: intro paragraph, a `code-block` usage example, and a `callout-tip` explaining how to turn the feature on/off. Code Mode is a comparably significant, distinct execution-model change (how Claude calls tools at all, not just how it orchestrates subagents), so it warrants its own new collapsible immediately after Dynamic Workflows, following the same visual pattern.

## Plan
1. Open `src/pages/practices.html`.
2. Immediately after the closing `</div>` of `power-usage--dynamic-workflows` (~line 2447) and before the `<!-- Remote Control & Cross-Device -->` comment, insert a new collapsible:
   ```html
   <!-- Code Mode -->
   <div class="collapsible" id="power-usage--code-mode">
     <div class="collapsible-header">
       <h3>Code Mode</h3>
       <span class="collapsible-chevron">&#9660;</span>
     </div>
     <div class="collapsible-body"><div class="collapsible-content">
       <p>Code Mode is an experimental, opt-in execution mode (v2.1.323) in which Claude writes JavaScript to call its tools instead of making one tool call per turn — similar in spirit to how a dynamic workflow script calls <code>agent()</code>/<code>parallel()</code>, but applied to Claude's own ordinary tool use.</p>
       <div class="callout callout-tip" style="margin-top:0.75rem; margin-bottom:0;">
         <div class="callout-title">Opt-in, per-session or org-wide</div>
         <p>Code Mode is off by default. See the <a href="https://code.claude.com/docs/en/code-mode" target="_blank" rel="noopener" style="color:var(--accent-blue);">Code Mode docs</a> for how to turn it on for a session, or how an organization can turn it off (v2.1.323).</p>
       </div>
     </div></div>
   </div>
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- A new "Code Mode" collapsible appears in the Power Usage section, immediately after Dynamic Workflows, following the existing collapsible visual pattern.
- The collapsible states that Code Mode is experimental and opt-in, describes what it does in one sentence, and links to the docs for turning it on/off (including the org-wide off switch).
- HTML is valid (no unclosed tags).
