# CBP-159: [Codex] Plugin details view shows bundled hooks

## Source
Codex CLI v0.130.0 — plugin details now show bundled hooks alongside skills and tools.

## Summary
Update the Plugins collapsible in Codex Power Usage (`#codex-power-usage`) to note that as of v0.130.0, the plugin details view shows all bundled hooks alongside skills and tools.

## Assessment
- Line ~9417: "Plugins can bundle skills (SKILL.md), hooks, and tool allowlists in a single installable unit. Plugin-bundled hooks are enabled/disabled via the plugin's configuration."
- This sentence needs a follow-up note about the v0.130.0 details view change

## Plan
1. Locate the Plugins collapsible paragraph at line ~9417
2. Append a sentence noting that the plugin details view (accessible from `/plugins`) now shows all bundled hooks alongside skills and tools

## Acceptance Criteria
- The Plugins collapsible text mentions the v0.130.0 details view showing bundled hooks
