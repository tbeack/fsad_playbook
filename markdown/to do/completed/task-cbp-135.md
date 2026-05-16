# CBP-135 — Small Language Models: NL Interaction & Search

## Source
User request: research and document how FSAD teams can integrate Small Language Models (SLMs) to add natural language interaction and search capabilities to their workflows and applications.

## Summary
The playbook has no coverage of SLMs — the growing class of compact, fast, locally-runnable models (Phi-4, Gemma, Qwen, Llama 3.2 1B/3B) that are practical for in-browser or on-device deployment without API costs or latency. A new section under the Integrations topic should document the SLM landscape, key deployment patterns (in-browser via Transformers.js, local server via Ollama, lightweight cloud APIs), and four FSAD-specific integration patterns: MCP server wrapper, hooks, skills, and RAG-based semantic search.

## Assessment
**Existing coverage:** None. The playbook covers Claude frontier models throughout but never addresses smaller, locally-runnable, or privacy-first model options.

**Target topic:** `integrations` (alongside MCP, Code Review, Security Review — all represent AI/tool integrations teams embed in their workflow).

**Section ID:** `slm-integration`
**Nav label:** `Small Language Models`
**Nav topic group:** `integrations`
**Placement (HTML):** After `<section id="security-review">…</section>` closing tag, before the `</div>` that closes the `integrations` topic-view div.
**Nav placement:** After the `security-review` nav entry in the `integrations` nav-topic-sections.

**Hub card update:** The Integrations hub card chip list currently reads `MCP, Code Review, Security Review`. Add `SLMs` as a fourth chip.

**Practices hub topic-view for integrations:** `<div class="topic-view" data-topic="integrations" hidden>` at line ~3874.

**Current version:** v56 → bump to v57.

## Plan

### Phase 1 — Research (execute mode)
1. Web-search for the current SLM landscape: key models, benchmark scores, practical size/speed tradeoffs, and which are available for WASM/WebGPU in-browser use.
2. Web-search for Transformers.js (Hugging Face) capabilities: which tasks, which pipelines, how to embed in a vanilla JS/HTML app.
3. Web-search for Ollama API: REST endpoint, model list, how to wrap as an MCP server.
4. Web-search for real-world FSAD/agentic workflow SLM integration examples (semantic search, local code review, offline CLI tooling).
5. Determine the 4–6 best SLM candidates to highlight in the model landscape table.

### Phase 2 — Write new HTML section
Insert a new `<section id="slm-integration">` block inside the `integrations` topic-view div, after the closing `</section>` of `security-review`.

**Section structure — 4 collapsibles:**

**Collapsible A — The SLM Landscape**
- Opening prose: what makes a model "small", why they matter for FSAD (cost, privacy, latency, offline)
- Comparison table: 5–6 models × columns (Params, Context Window, In-browser, Local server, Best for)
  - Phi-4 Mini / Phi-3.5 Mini (Microsoft)
  - Gemma 3 2B/7B (Google)
  - Qwen 2.5 3B/7B (Alibaba)
  - Llama 3.2 1B/3B (Meta)
  - TinyLlama (1.1B, reference/embedding baseline)
- Decision callout: "SLM vs. Claude Frontier" — when size wins (offline, cost, latency) vs. when capability wins (complex reasoning, long context)

**Collapsible B — Deployment Patterns**
Three patterns with code snippets:
1. **In-browser via Transformers.js** — WASM pipeline, zero-install, works in fsad-playbook.html-style apps; show `pipeline('text-generation', 'Xenova/...')` snippet
2. **Local server via Ollama** — `ollama serve`, REST endpoint at `localhost:11434/api/generate`, curl example; show how to wrap as an MCP server in `settings.json`
3. **Lightweight cloud API** — Claude Haiku 4.5 / GPT-4o mini / Gemini Flash as a "micro" tier; same API surface as frontier, fraction of the cost; show cost comparison callout

**Collapsible C — FSAD Integration Patterns**
Four recipes linking SLMs to the FSAD toolkit:
1. **MCP Server Wrapper** — Ollama MCP bridge (`settings.json` snippet); FSAD agent calls `@ollama/generate` as a tool
2. **PreToolUse Hook** — SLM-powered intent classifier: before a destructive shell command, call local model to confirm intent matches context
3. **Custom Skill** — `local-review` skill that calls Ollama to generate a lightweight code summary before handing off to Claude Opus for the full review
4. **Semantic Search Hook** — PostMessage hook: embed the user prompt with a local embedding model, rank results from a local knowledge base, inject top-3 chunks as context

**Collapsible D — Natural Language Search: RAG Patterns**
- Brief explainer: dense retrieval vs. BM25 keyword search, why semantic search matters for codebases and docs
- Architecture diagram (Mermaid): Query → Embedding model → Vector store → Top-k retrieval → LLM synthesis
- Three vector store options for FSAD teams: in-memory (Transformers.js + cosine similarity), local (SQLite-vec / LanceDB), cloud (Pinecone / Weaviate)
- Code sketch: FSAD skill that builds a vector index over `spec.md` + `CLAUDE.md` and answers NL queries
- Callout: "Gotchas": chunk size vs. recall tradeoff; embeddings staleness when files change; GPU vs CPU fallback

### Phase 3 — Update left nav
Add a nav entry for `slm-integration` inside the `integrations` nav-topic-sections block, after the `security-review` entry:
```html
<a class="nav-sub-item" href="#practices/slm-integration" onclick="event.preventDefault(); showTopic('integrations'); setTimeout(()=>scrollToId('slm-integration'),120)">Small Language Models</a>
```

### Phase 4 — Update hub card chips
Add `SLMs` chip to the Integrations hub card `hub-card-chips` div.

### Phase 5 — Update `sectionToPageMap` in JS router
Add `'slm-integration': 'practices'` to the `sectionToPageMap` object.

### Phase 6 — Update search index
Add key terms from the new section to the `searchData` array: model names, "SLM", "Transformers.js", "Ollama", "RAG", "semantic search", "embeddings", "local model".

### Phase 7 — CHANGELOG + version bump
- Add entry to CHANGELOG.md under `## [Unreleased]` (or create the block if absent)
- Bump `<title>` in `fsad-playbook.html` from v56 → v57
- Bump version row in `README.md`

## Acceptance Criteria
- [ ] New section exists at `#practices/slm-integration` and scrolls correctly from the nav entry
- [ ] Collapsible A includes a model landscape table with ≥5 SLMs and a "SLM vs. frontier" decision callout
- [ ] Collapsible B documents all three deployment patterns (Transformers.js, Ollama, lightweight API) with code snippets
- [ ] Collapsible C documents all four FSAD integration recipes (MCP wrapper, hook, skill, search hook)
- [ ] Collapsible D includes the RAG architecture diagram (Mermaid), three vector store options, and a gotchas callout
- [ ] Left nav entry "Small Language Models" appears under Integrations and routes correctly
- [ ] Integrations hub card chips include `SLMs`
- [ ] `sectionToPageMap` includes `'slm-integration': 'practices'`
- [ ] Search index updated with key SLM terms
- [ ] `fsad-playbook.html` title shows v57
- [ ] `README.md` version table row added for v57
- [ ] `CHANGELOG.md` entry written for CBP-135
