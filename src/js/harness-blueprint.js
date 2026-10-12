  // ─── HARNESS BLUEPRINT ───
  (function () {
    const nodes = document.querySelectorAll('.hb-node');
    if (!nodes.length) return;
    const KEY = 'fsad-harness-blueprint-sel';
    const ids = Array.from(nodes, (n) => n.dataset.hb);

    function selectNode(id) {
      nodes.forEach((n) => n.setAttribute('aria-pressed', String(n.dataset.hb === id)));
      ids.forEach((x) => { document.getElementById('hb-detail-' + x).hidden = x !== id; });
      try { localStorage.setItem(KEY, id); } catch (e) {}
    }

    document.addEventListener('click', (e) => {
      const node = e.target.closest('.hb-node');
      if (node) selectNode(node.dataset.hb);
    });

    let start = ids[0];
    try { const saved = localStorage.getItem(KEY); if (ids.includes(saved)) start = saved; } catch (e) {}
    selectNode(start);
  })();
