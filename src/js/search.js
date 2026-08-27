  // ─── SEARCH SYSTEM ───
  const miniSearch = new MiniSearch({
    idField: 'docId',
    fields: ['title', 'label', 'text'],
    storeFields: ['title', 'label', 'sectionId', 'text'],
    searchOptions: {
      boost: { title: 3, label: 2 },
      fuzzy: 0.2,
      prefix: true,
      combineWith: 'OR'
    }
  });
  let selectedResultIndex = -1;
  // Semantic search state (Phase 2 — Transformers.js layer)
  let semanticReady = false;
  let semanticLoading = false;
  let semanticEmbedder = null;
  let semanticVectors = null; // Float32Array per chunk once computed

  function buildSearchIndex() {
    const docs = [];
    document.querySelectorAll('section, .hero').forEach(sec => {
      const title = sec.querySelector('.section-title, h1, h2')?.textContent || '';
      const label = sec.querySelector('.section-label, .hero-badge')?.textContent || '';
      if (title && sec.id) {
        docs.push({
          docId: 'sec_' + sec.id,
          sectionId: sec.id,
          title: title.trim(),
          label: label.trim(),
          text: sec.textContent.substring(0, 5000).replace(/\s+/g, ' ').trim()
        });
        sec.querySelectorAll('.collapsible').forEach((col, ci) => {
          const colTitle = col.querySelector('.collapsible-header h3')?.textContent || '';
          const colText = col.textContent.substring(0, 5000).replace(/\s+/g, ' ').trim();
          if (colTitle) {
            docs.push({
              docId: 'col_' + sec.id + '_' + ci,
              sectionId: sec.id,
              title: colTitle.trim(),
              label: label.trim(),
              text: colText
            });
          }
        });
      }
    });
    miniSearch.addAll(docs);
    // Kick off background semantic load if chunks are available
    if (typeof PLAYBOOK_EMBEDDINGS !== 'undefined' && PLAYBOOK_EMBEDDINGS.length > 0) {
      loadSemanticSearch();
    }
  }

  async function loadSemanticSearch() {
    if (semanticLoading || semanticReady) return;
    semanticLoading = true;
    updateSemanticStatus('loading');
    try {
      const { pipeline, env } = await import('https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2/dist/transformers.min.js');
      env.allowLocalModels = false;
      semanticEmbedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', { quantized: true });
      // Pre-embed all chunks and cache result
      const cached = await readSemanticCache();
      if (cached) {
        semanticVectors = cached;
      } else {
        const texts = PLAYBOOK_EMBEDDINGS.map(c => c.title + ' ' + c.text);
        const out = await semanticEmbedder(texts, { pooling: 'mean', normalize: true });
        semanticVectors = out.data; // Float32Array, length = chunks * 384
        writeSemanticCache(semanticVectors).catch(() => {});
      }
      semanticReady = true;
      semanticLoading = false;
      updateSemanticStatus('ready');
    } catch (err) {
      semanticLoading = false;
      updateSemanticStatus('offline');
    }
  }

  function updateSemanticStatus(state) {
    const el = document.getElementById('semanticSearchStatus');
    if (!el) return;
    if (state === 'loading') { el.textContent = '⟳ Loading smart search…'; el.style.display = 'block'; }
    else if (state === 'ready') { el.textContent = '✦ Smart search ready'; el.style.display = 'block'; setTimeout(() => { el.style.display = 'none'; }, 3000); }
    else if (state === 'offline') { el.textContent = 'Using keyword search'; el.style.display = 'block'; }
    else { el.style.display = 'none'; }
  }

  async function readSemanticCache() {
    try {
      return await new Promise((res, rej) => {
        const req = indexedDB.open('fsad-semantic', 1);
        req.onupgradeneeded = e => e.target.result.createObjectStore('vectors');
        req.onsuccess = e => {
          const tx = e.target.result.transaction('vectors', 'readonly');
          const get = tx.objectStore('vectors').get('v1');
          get.onsuccess = () => res(get.result ? new Float32Array(get.result) : null);
          get.onerror = () => res(null);
        };
        req.onerror = () => res(null);
      });
    } catch { return null; }
  }

  async function writeSemanticCache(vectors) {
    return new Promise((res, rej) => {
      const req = indexedDB.open('fsad-semantic', 1);
      req.onupgradeneeded = e => e.target.result.createObjectStore('vectors');
      req.onsuccess = e => {
        const tx = e.target.result.transaction('vectors', 'readwrite');
        tx.objectStore('vectors').put(vectors.buffer, 'v1');
        tx.oncomplete = res;
        tx.onerror = rej;
      };
      req.onerror = rej;
    });
  }

  function cosineSimilarity(a, b, offset, dims) {
    let dot = 0, na = 0, nb = 0;
    for (let i = 0; i < dims; i++) {
      dot += a[i] * b[offset + i];
      na += a[i] * a[i];
      nb += b[offset + i] * b[offset + i];
    }
    return dot / (Math.sqrt(na) * Math.sqrt(nb) + 1e-9);
  }

  async function semanticSearch(query, topK = 5) {
    if (!semanticReady || !semanticEmbedder || !semanticVectors) return [];
    const out = await semanticEmbedder([query], { pooling: 'mean', normalize: true });
    const qv = Array.from(out.data);
    const dims = 384;
    const scores = PLAYBOOK_EMBEDDINGS.map((chunk, i) => ({
      chunk,
      score: cosineSimilarity(qv, semanticVectors, i * dims, dims)
    }));
    scores.sort((a, b) => b.score - a.score);
    return scores.slice(0, topK).filter(s => s.score > 0.25).map(s => s.chunk);
  }

  function closeSidebarSearch() {
    const popover = document.getElementById('sidebarSearchPopover');
    if (popover) popover.classList.remove('open');
    selectedResultIndex = -1;
  }

  function handleSidebarSearch(query) {
    const popover = document.getElementById('sidebarSearchPopover');
    if (!popover) return;
    selectedResultIndex = -1;
    popover.innerHTML = '';

    if (!query || query.trim().length < 2) {
      popover.classList.remove('open');
      return;
    }

    const keywordResults = miniSearch.search(query, { fuzzy: 0.2, prefix: true, combineWith: 'OR' }).slice(0, 8);
    renderSearchResults(popover, keywordResults, false);

    // Overlay semantic results if model is ready and query looks natural-language
    const isNL = query.trim().split(/\s+/).length >= 3 || query.includes('?');
    if (isNL && semanticReady) {
      semanticSearch(query, 5).then(semChunks => {
        if (!semChunks.length) return;
        // Deduplicate against keyword results
        const kwIds = new Set(keywordResults.map(r => r.sectionId));
        const newHits = semChunks.filter(c => !kwIds.has(c.sectionId)).slice(0, 3);
        if (!newHits.length) return;
        const merged = [
          ...keywordResults,
          ...newHits.map(c => ({ ...c, _semantic: true }))
        ].slice(0, 8);
        renderSearchResults(popover, merged, true);
      });
    }
  }

  function renderSearchResults(popover, results, hadSemantic) {
    popover.innerHTML = '';
    if (results.length === 0) {
      const input = document.getElementById('sidebarSearchInput');
      const q = (input?.value || '').replace(/[<>"'&]/g, '');
      popover.innerHTML = '<div class="search-no-results">No results for "' + q + '"</div>';
      popover.classList.add('open');
      return;
    }
    results.forEach(item => {
      const sectionId = item.sectionId;
      const a = document.createElement('a');
      a.className = 'search-result-item';
      a.href = `#${sectionToPageMap[sectionId]}/${sectionId}`;
      a.onclick = (e) => {
        e.preventDefault();
        const targetPage = sectionToPageMap[sectionId];
        const navBtn = document.querySelector(`.nav-group-toggle[data-page="${targetPage}"]`);
        switchPage(targetPage, navBtn);
        if (targetPage === 'practices' && sectionToTopicMap[sectionId]) {
          showTopic(sectionToTopicMap[sectionId]);
        }
        setTimeout(() => scrollToId(sectionId), 150);
        const input = document.getElementById('sidebarSearchInput');
        if (input) { input.value = ''; input.blur(); }
        closeSidebarSearch();
      };
      const badge = item._semantic ? '<span class="search-semantic-badge">✦</span>' : '';
      a.innerHTML = `<h4>${item.label ? '<span>' + item.label + '</span> — ' : ''}${item.title}${badge}</h4><p>${(item.text || '').substring(0, 120)}...</p>`;
      popover.appendChild(a);
    });
    popover.classList.add('open');
  }

  function handleSidebarSearchKeydown(e) {
    const popover = document.getElementById('sidebarSearchPopover');
    if (!popover || !popover.classList.contains('open')) return;
    const results = popover.querySelectorAll('.search-result-item');
    if (!results.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedResultIndex = Math.min(selectedResultIndex + 1, results.length - 1);
      updateSelectedResult(results);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedResultIndex = Math.max(selectedResultIndex - 1, 0);
      updateSelectedResult(results);
    } else if (e.key === 'Enter' && selectedResultIndex >= 0) {
      e.preventDefault();
      results[selectedResultIndex].click();
    }
  }

  function updateSelectedResult(results) {
    results.forEach((r, i) => r.classList.toggle('selected', i === selectedResultIndex));
    if (results[selectedResultIndex]) results[selectedResultIndex].scrollIntoView({ block: 'nearest' });
  }

