# CBP-727: [Codex] Add Google Cloud Vertex AI built-in provider to Multi-Provider Models table (rust-v0.165.0)

## Summary

Codex rust-v0.165.0 added a built-in Google Cloud Vertex AI provider configured with `model_provider = "gcp"` in `config.toml`. Previously Codex supported Gemini via Google AI API key, but this is a separate native Vertex AI integration with GCP authentication.

## Assessment

The Multi-Provider Models table at `src/pages/codex.html` around line 1371 lists providers:
- OpenAI, Azure OpenAI, Amazon Bedrock, Ollama, Gemini, Mistral, DeepSeek, OpenRouter

Google Cloud Vertex AI is not listed. This is a new native built-in provider added in rust-v0.165.0. It belongs after Amazon Bedrock (also a built-in provider) or after the existing Gemini row since both are Google-related. Place it after Gemini (line 1372) since both use Google infrastructure.

## Plan

1. Read `src/pages/codex.html` around lines 1371-1376.
2. Add a new row for Google Cloud Vertex AI after the Gemini row.

**Insert after the Gemini row:**
```html
<tr><td>Google Cloud Vertex AI</td><td>GPT-6.1 Sol, hosted Vertex models</td><td>Built-in provider — set <code>model_provider = "gcp"</code> in <code>config.toml</code>; uses GCP application default credentials. (rust-v0.165.0)</td></tr>
```

## Acceptance Criteria

- Google Cloud Vertex AI row appears in the Multi-Provider Models table.
- Row includes `model_provider = "gcp"` configuration key.
- Row cites rust-v0.165.0.
- Table structure is preserved.
