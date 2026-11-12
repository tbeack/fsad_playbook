# CBP-762 — Update GCP Vertex AI row: incremental tool updates default (rust-v0.167.2)

## Summary

Codex rust-v0.167.2 adds one behavioral change for the Google Cloud Vertex AI provider:
- Tool updates now stream **incrementally by default** on GCP Vertex AI.
- Users who need the legacy non-incremental behavior can opt out by setting `incremental_tools_legacy_gcp = false` under the `[features]` section in `config.toml`.

## Assessment

**File:** `src/pages/codex.html`

The Multi-Provider Models table (around line 1376) has a Google Cloud Vertex AI row. Current text:

> Built-in provider — set `model_provider = "gcp"` in `config.toml`; uses GCP application default credentials. (rust-v0.165.0) As of rust-v0.167.0, enable `gcp_setup_wizard` to run a guided setup from the TUI under "Sign in another way" — supports Application Default Credentials or a credential file.

The `incremental_tools_legacy_gcp` config key is **not mentioned** anywhere in the playbook. This is an "Update existing" task.

## Plan

1. Read the Google Cloud Vertex AI `<tr>` in `src/pages/codex.html`.
2. Append to the Configuration cell: `As of rust-v0.167.2, tool updates stream incrementally by default; set <code>incremental_tools_legacy_gcp = false</code> under <code>[features]</code> in <code>config.toml</code> to opt out.`
3. No new HTML structure required — extend the existing `<td>` text.

## Acceptance Criteria

- The Google Cloud Vertex AI row mentions `incremental_tools_legacy_gcp`.
- The opt-out mechanism (`[features]` in `config.toml`) is clear.
- No other rows or sections are changed.
- Build scripts complete without error.
