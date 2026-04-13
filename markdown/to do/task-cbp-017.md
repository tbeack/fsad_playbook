# CBP-017 — Add Monitor Tool to Power Usage Section

## Summary
Claude Code v2.1.98 added a new built-in `Monitor` tool for streaming events from background scripts. This is a significant capability for agentic workflows: it allows Claude to observe long-running processes, CI pipelines, and background tasks in real time. Currently the playbook has no coverage of the Monitor tool.

## Assessment
The Monitor tool is absent from all Claude Best Practices content. The Power Usage section (section 14) is the right home — it already covers Agent Teams, Work Trees, Background tasks (Ctrl+B), and the /loop scheduler. A new "Monitor Tool" collapsible fits naturally after the "Context Management" collapsible (line ~4465).

## Plan

1. Read the power usage section ending around line 4465 to find the exact close of the Context Management collapsible
2. Add a new collapsible after Context Management:
   ```html
   <!-- Monitor Tool -->
   <div class="collapsible">
     <div class="collapsible-header">
       <h3>Monitor Tool — Background Script Streaming</h3>
       <span class="collapsible-chevron">&#9660;</span>
     </div>
     <div class="collapsible-body"><div class="collapsible-content">
       <p>The <code>Monitor</code> tool streams stdout events from a background script you started with <code>Bash(run_in_background: true)</code>. Each line of stdout arrives as a notification, letting Claude observe long-running processes without blocking the conversation.</p>
       <div class="code-block" style="margin-top:0.75rem;">
         <pre><code class="language-bash"># Start a background script
claude "run the test suite in the background and tell me when done"
# Claude uses Bash(run_in_background: true) to launch tests
# Then Monitor streams each stdout line back as it arrives</code></pre>
       </div>
       <ul style="padding-left:1.25rem; color:var(--text-secondary); font-size:0.88rem; line-height:2; margin-top:0.75rem;">
         <li>Observe CI pipelines, build scripts, and servers without blocking</li>
         <li>React to output in real time — fail fast on errors, summarize on completion</li>
         <li>Works alongside Ctrl+B (background task backgrounding)</li>
       </ul>
     </div></div>
   </div>
   ```

## Acceptance Criteria
- [ ] New "Monitor Tool" collapsible appears in Power Usage section after Context Management
- [ ] Explains what Monitor does (stream background script stdout)
- [ ] Includes a practical use-case example
- [ ] Matches existing collapsible HTML pattern exactly
