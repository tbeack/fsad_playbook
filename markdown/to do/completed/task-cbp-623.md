# CBP-623: Add `allowedProviders` managed setting to Notable settings.json Keys (v2.1.285)

## Summary

v2.1.285 added an `allowedProviders` managed setting to limit which API providers a machine may use (Anthropic API, a custom endpoint, Bedrock, Mantle, Vertex AI, Foundry, Claude Platform on AWS, or a Cloud gateway).

## Assessment

- `src/pages/practices.html`'s "Notable settings.json Keys" callout (~line 611-665) already documents several enterprise managed-settings-only keys (e.g. `availableModelsMatch` / `deniedModels`, ~line 664). `allowedProviders` fits the same list.

## Plan

1. In `src/pages/practices.html`, append a new `<li>` after the `availableModelsMatch` / `deniedModels` bullet:
   `<li><code>allowedProviders</code> — Enterprise managed setting restricting which API providers a machine may use: Anthropic API, a custom endpoint, Bedrock, Mantle, Vertex AI, Foundry, Claude Platform on AWS, or a Cloud gateway. Set via org/MDM managed settings only (v2.1.285).</li>`

## Acceptance Criteria

- The Notable settings.json Keys list documents `allowedProviders`, version-tagged v2.1.285.
