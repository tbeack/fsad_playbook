# CBP-355 — [Claude] Add `claude self-hosted-runner` to Power Usage

## Source
Claude Code v2.1.224

## Summary
v2.1.224 added `claude self-hosted-runner` — turns your own machines or containers into a place Claude Code web, mobile, and desktop sessions can run, on Team and Enterprise plans. No existing playbook content covers self-hosted execution infrastructure for these session types (Remote Control covers device pairing for an existing local session; Managed Web Agents covers Anthropic-hosted cloud agents — neither covers running the infrastructure yourself).

## Assessment
`fsad-playbook.html`, Power Usage section. Nearest existing content: "Remote Control & Cross-Device" collapsible (~lines 11549–11574) and "Managed Web Agents" collapsible (~lines 12486–12581). Neither documents self-hosted runner infrastructure — this is a genuine new-section gap.

## Plan

### Step 1 — Add a new collapsible after the Remote Control & Cross-Device collapsible (after line 11574)
Follow the existing collapsible markup pattern (`<div class="collapsible" id="power-usage--self-hosted-runner">`, header, chevron, body):
```html
<!-- Self-Hosted Runner -->
<div class="collapsible" id="power-usage--self-hosted-runner">
  <div class="collapsible-header">
    <h3>Self-Hosted Runner</h3>
    <span class="collapsible-chevron">&#9660;</span>
  </div>
  <div class="collapsible-body"><div class="collapsible-content">
    <p><code>claude self-hosted-runner</code> turns your own machines or containers into a place Claude Code web, mobile, and desktop sessions can run — an alternative to Anthropic-hosted Managed Web Agents for teams that need sessions to execute on infrastructure they control (data residency, network access to internal systems, custom hardware). Available on Team and Enterprise plans (v2.1.224).</p>
    <div class="code-block" style="margin-top:0.75rem;">
      <pre><code class="language-bash"><span class="cm"># Register this machine/container as a runner</span>
<span class="kw">claude</span> self-hosted-runner</code></pre>
    </div>
    <p style="margin-top:0.75rem; font-size:0.88rem; color:var(--text-secondary);">Once registered, web, mobile, and desktop sessions started by your org can be scheduled onto the runner instead of Anthropic-hosted infrastructure.</p>
  </div></div>
</div>
```

## Acceptance Criteria
- New "Self-Hosted Runner" collapsible present in Power Usage, following the existing collapsible markup pattern
- Documents the Team/Enterprise plan requirement and v2.1.224 version tag
- HTML is valid, chevron/collapsible-body structure matches sibling collapsibles exactly
