# CBP-021 — Add Vertex AI / Bedrock Interactive Setup Wizard Note

## Summary
Claude Code v2.1.92 added an interactive Bedrock setup wizard and v2.1.98 added an interactive Vertex AI setup wizard — both accessible from the login screen when selecting "3rd-party platform." These wizards guide through authentication, project/region configuration, credential verification, and model pinning. The playbook mentions GCP MCP setup but doesn't cover using Vertex AI or Bedrock as Claude Code's model provider.

## Assessment
The Getting Started section (section 08) and the Integrations section (section 09) are the most relevant. The Integrations section (line 2739) covers MCP integrations but not model provider setup. The best approach is a callout note in the Getting Started section about the interactive 3rd-party provider setup, or a small addition to the Integrations section.

After reading the Integrations section structure, add a tip callout near the top or within the relevant setup area noting that Vertex AI and Bedrock can be configured via the interactive login wizard.

## Plan

1. Read the Integrations section header area (lines 2739–2800) to find a good insertion point
2. Add a callout tip near the integrations section intro about the 3rd-party provider setup wizard:
   ```html
   <div class="callout callout-tip" style="margin-bottom:1.5rem;">
     <div class="callout-title">3rd-Party Model Providers</div>
     <p>Running Claude Code with <strong>Amazon Bedrock</strong> or <strong>Google Vertex AI</strong>? Use the interactive setup wizard: run <code>claude</code>, select <strong>"3rd-party platform"</strong> from the login screen, and follow the guided setup for authentication, region, and model pinning — no manual env var configuration needed.</p>
   </div>
   ```

## Acceptance Criteria
- [ ] Callout appears in Integrations section (or Getting Started)
- [ ] Mentions both Bedrock and Vertex AI
- [ ] Explains how to access the wizard (login screen → "3rd-party platform")
- [ ] Matches existing callout-tip HTML pattern
