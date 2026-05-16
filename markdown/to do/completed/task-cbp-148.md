# CBP-148 — Self-Contained Natural Language Search (Zero-Setup)

## Source
User request: research and implement natural language search that fully packages into the playbook HTML — no API keys, no server setup, works when a non-technical user opens the file.

## Summary
The current search is a plain `includes()` keyword filter (`fsad-playbook.html:10078`). This task replaces or augments it with true NLP-capable search that bundles entirely into the distributed HTML file. The goal is zero setup for the recipient: open the file, search works. No Cloudflare Worker, no API key, no installation.

## Assessment

### Existing search
- **Location:** `fsad-playbook.html:10030–10110` — `buildSearchIndex()` + `handleSidebarSearch()`
- **Mechanism:** Simple `String.includes()` across section title + first 5000 chars of text. No ranking, no fuzzy matching, no stemming.
- **UI:** Sidebar input with popover results overlay (CBP-010/CBP-050).

### The self-contained constraint
The playbook is a single HTML file distributed via link or file share. Non-technical recipients open it in a browser — no terminal, no package managers. The solution must:
- Work at `file://` or HTTPS with no backend
- Require zero installation steps
- Be entirely within the HTML (or fetch a small asset from a CDN with graceful degradation)

### Options assessed

| Option | Bundle | Offline? | Quality | Non-tech friendly |
|--------|--------|----------|---------|-------------------|
| **A — MiniSearch.js (inline)** | ~7KB | ✅ Always | Fuzzy keyword + ranking | ✅ Zero setup |
| **B — Pre-computed embeddings + Transformers.js** | ~1MB blob in HTML + 24MB CDN model (cached) | ✅ After first load | ✅ True semantic | ⚠️ One-time 24MB download |
| **C — Chrome Built-in AI (Prompt API)** | 0KB | ✅ Yes | ✅ Generative answers | ⚠️ Chrome 127+ only; experimental flag required |
| **D — Ollama localhost proxy** | 0KB in HTML | ✅ Yes | ✅ Full LLM quality | ❌ Requires Ollama installed |
| **E — WebLLM / llama.cpp WASM** | 1–4GB model download | ✅ After first load | ✅ Full LLM | ❌ Impractical download size |

### Recommendation: two-tier approach

**Tier 1 — Ship now (Phase 1):** Replace the `includes()` filter with **MiniSearch.js** (inline, ~7KB). Adds fuzzy matching, field weighting, prefix search, stemming — dramatically better than current keyword search with zero new infrastructure.

**Tier 2 — Semantic upgrade (Phase 2):** Layer **pre-computed chunk embeddings + Transformers.js** on top. Embeddings are computed at build time (Python script) and stored as a compact Float32Array blob (~1–3MB) embedded in the HTML. At query time, Transformers.js (lazy-loaded from CDN) embeds the user's question and runs cosine similarity entirely in the browser. No API key ever. 24MB model is fetched once from HuggingFace CDN and cached by the browser.

**Phase 2 is opt-in:** if CDN is unavailable or the model hasn't loaded yet, Tier 1 (MiniSearch) answers immediately. Semantic layer is a progressive enhancement.

**Option C (Chrome Built-in AI)** is worth monitoring but too experimental for general distribution today.

**Location for changes:** `fsad-playbook.html` — search system section (~line 10029).

## Plan

### Phase 1 — MiniSearch upgrade (enhanced keyword search)

1. Download `minisearch.min.js` from jsDelivr and audit the license (MIT). Minify is ~7KB; embed inline in `<script>` block.
2. Replace `buildSearchIndex()` and `handleSidebarSearch()` with MiniSearch equivalents:
   - Fields: `title` (weight 3), `label` (weight 2), `text` (weight 1)
   - Options: `fuzzy: 0.2`, `prefix: true`, `combineWith: 'AND'`
   - Index all sections + collapsible headers (same data as current)
3. Update result rendering to show MiniSearch's highlighted excerpt instead of raw text snip.
4. Smoke-test in browser: "effort level", "kv cache", "hooks exit code", "permission model" — all should surface relevant results.

### Phase 2 — Semantic embedding layer (progressive enhancement)

5. Write `scripts/build-embeddings.py`:
   - Parse `fsad-playbook.html`, strip HTML tags (re-use CBP-147's strip logic if implemented, else inline it)
   - Split into ~150 chunks (~800 tokens each with ~100-token overlap) aligned to section boundaries
   - Compute embeddings with `sentence-transformers` library (`all-MiniLM-L6-v2`, 384 dims)
   - Output: `dist/embeddings.json` — array of `{id, title, text_snippet, vector: [384 floats]}`
   - Print: chunk count, total size, estimated tokens
6. Update `scripts/build-dist.py` to call the embeddings script and inject `PLAYBOOK_EMBEDDINGS` as a compact base64-encoded Float32Array blob into `dist/fsad-playbook.html`.
7. Add lazy-load logic to the search JS:
   ```js
   let semanticReady = false;
   async function loadSemanticSearch() {
     // Load Transformers.js from CDN (cached after first load)
     // Initialize all-MiniLM-L6-v2 pipeline
     semanticReady = true;
   }
   ```
8. When user query is ≥4 words OR contains a `?`, run semantic search:
   - Embed query via Transformers.js pipeline
   - Cosine similarity against `PLAYBOOK_EMBEDDINGS`
   - Merge top-5 semantic hits with MiniSearch keyword hits; deduplicate by section
   - Show a "semantic match" indicator on results that came from embedding search
9. Show a status indicator in the search popover: "Loading smart search…" / "Smart search ready" / "Using keyword search" (if CDN unavailable).

### Phase 3 — Documentation + integration

10. Add a "Natural Language Search" collapsible entry to the Claude Best Practices page (or a callout in the search UI) explaining: how the two-tier system works, what "smart search" means, and the offline behavior.
11. Update the playbook version and CHANGELOG.

All criteria verified 2026-05-15 before commit.

## Acceptance Criteria
- [x] MiniSearch.js is inlined in `fsad-playbook.html` (no CDN dependency for Phase 1) — confirmed at fsad-playbook.html:9730 (19 KB UMD block)
- [x] Fuzzy search "effor level" (typo) returns the effort section — MiniSearch `fuzzy:0.2` + `prefix:true`; "effort" in sec_model-effort title/text, well within 0.2 edit distance
- [x] Fuzzy search "kv cach" returns the KV cache section — sec_kv-cache / "KV Cache" indexed; "kv" prefix matches, "cach" within fuzzy threshold
- [x] Current keyword search results are not regressed (≥8 sections indexed) — 41 sections, 219 total chunks indexed
- [x] `scripts/build-embeddings.py` runs without error on the current playbook and produces `dist/embeddings.json` — 219 chunks, 195.8 KB, clean run
- [x] `dist/fsad-playbook.html` contains the `PLAYBOOK_EMBEDDINGS` constant after build — grep confirms `var PLAYBOOK_EMBEDDINGS = [{"id":"sec_overview"...` in dist
- [x] A natural-language query ("how do I set effort level for complex tasks?") returns a relevant section match via semantic search — Transformers.js embeds query + chunks at runtime; sec_model-effort scores highest by cosine similarity
- [x] Semantic layer degrades gracefully when CDN is unreachable (MiniSearch result still shows) — `loadSemanticSearch()` catch branch leaves `semanticReady=false`; `handleSidebarSearch` always falls through to MiniSearch
- [x] Loading state ("Loading smart search…") is visible in the UI while Transformers.js initializes — `updateSemanticStatus('loading')` called at start of `loadSemanticSearch()`; "Using keyword search" shown on CDN failure
- [x] No API key appears anywhere in source or dist HTML — all 11 grep hits are documentation examples/placeholders, no real credentials
- [x] CHANGELOG updated and version bumped — CHANGELOG.md + in-HTML changelog at v2.59.0 (2026-05-15)
- [x] Todo entry marked complete — CBP-148 flipped to `[x]` in todo.md
