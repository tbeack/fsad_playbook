# CBP-337 — [Codex] Update Plugins collapsible: Agent Plugin manifests + Amazon Bedrock and Claude Code plugin marketplaces

## Source
Codex rust-v0.146.0

## Summary
Codex rust-v0.146.0 adds:
- **Agent Plugins manifests** — structured manifests for bundling agent plugins
- **Workspace plugin publishing** — publish plugins to workspace for team sharing
- **Additional plugin marketplaces** — Amazon Bedrock and Claude Code are now additional plugin sources within Codex

## Assessment
In `fsad-playbook.html`, the Codex Plugins collapsible is at lines ~13298–13334:
- Currently mentions workspace-shared plugins and marketplace CLI commands
- The "Claude Code Equivalent" callout exists (line 13329–13332)
- Needs: mention that Amazon Bedrock and Claude Code are now additional marketplaces within Codex; mention Agent Plugin manifests

## Plan

### Step 1 — Update Plugins collapsible description paragraph (line 13328)
The current paragraph ends with: `...remote/local version indicators.`

Add a sentence about rust-v0.146.0 additions after the existing text:
```
As of rust-v0.146.0, Agent Plugin manifests provide structured declarations for bundling agent capabilities; the marketplace also connects to additional plugin sources including Amazon Bedrock and Claude Code, expanding the available plugin catalog.
```

### Step 2 — Update code block to add publish command
Add `codex plugin publish` example after the `codex plugin sync` line:
```
# Publish a plugin to the workspace marketplace
codex plugin publish <plugin-name>
```

## Acceptance Criteria
- Plugins collapsible paragraph mentions Agent Plugin manifests (rust-v0.146.0)
- Plugins collapsible paragraph mentions Amazon Bedrock and Claude Code as additional plugin marketplaces
- Code block shows `codex plugin publish` command
