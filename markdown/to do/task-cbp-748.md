# CBP-748 — Update GCP Vertex AI provider row (rust-v0.167.0)

## Summary
In Codex rust-v0.167.0, the GCP Vertex AI setup wizard is now accessible under "Sign in another way" in the TUI. Users can enable `gcp_setup_wizard` to set up Vertex AI with Application Default Credentials (ADC) or a credential file. The existing row only describes the config.toml approach.

## Assessment
The existing row is at `src/pages/codex.html` line 1373:
```html
<tr><td>Google Cloud Vertex AI</td><td>GPT-6.1 Sol, hosted Vertex models</td><td>Built-in provider — set <code>model_provider = "gcp"</code> in <code>config.toml</code>; uses GCP application default credentials. (rust-v0.165.0)</td></tr>
```

This needs to mention the `gcp_setup_wizard` and the "Sign in another way" UI entry point.

## Plan
1. Open `src/pages/codex.html`.
2. Replace the GCP Vertex AI row's third `<td>` content to add the setup wizard information.

New third column content:
```
Built-in provider — set <code>model_provider = "gcp"</code> in <code>config.toml</code>; uses GCP application default credentials. (rust-v0.165.0) As of rust-v0.167.0, enable <code>gcp_setup_wizard</code> to run a guided setup from the TUI under "Sign in another way" — supports Application Default Credentials or a credential file.
```

## Acceptance Criteria
- GCP Vertex AI row mentions `gcp_setup_wizard` and "Sign in another way".
- Version tag rust-v0.167.0 is included.
- Other provider rows are unchanged.
