  // ─── SCROLL SPY ───
  // Collapsibles currently inside the detection band (several short ones can share it)
  const leavesInBand = new Set();

  function clearLeaves() {
    document.querySelectorAll('.nav-leaf-item.active').forEach(item => item.classList.remove('active'));
  }

  function highlightLeaf(id) {
    document.querySelectorAll('.nav-leaf-item').forEach(item => {
      item.classList.toggle('active', item.dataset.leaf === id);
    });
    // Update URL to leaf-level deeplink: #practices/sectionId/leafSlug
    const leafItem = document.querySelector(`.nav-leaf-item[data-leaf="${id}"]`);
    if (leafItem && !routeSettling) {
      const leafHref = leafItem.getAttribute('href');
      if (leafHref && window.location.hash !== leafHref) {
        history.replaceState(null, '', leafHref);
      }
    }
  }

  const sectionObserver = new IntersectionObserver((entries) => {
    let leavesChanged = false;
    let activeSection = null;
    entries.forEach(entry => {
      if (entry.target.classList.contains('collapsible')) {
        if (entry.isIntersecting) leavesInBand.add(entry.target);
        else leavesInBand.delete(entry.target);
        leavesChanged = true;
        return;
      }
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      activeSection = entry.target;
      // A section became visible → highlight the nav item whose href is exactly #page/<id>
      document.querySelectorAll('.nav-sub-item').forEach(item => {
        item.classList.toggle('active', item.getAttribute('href')?.split('/')[1] === id);
      });
      document.querySelectorAll('.page-indicator-pill').forEach(pill => {
        pill.classList.toggle('active', pill.dataset.section === id);
      });
      // Update URL to section-level deeplink: #page/sectionId
      const page = sectionToPageMap[id];
      if (page && !routeSettling) {
        const newHash = '#' + (page === 'practices' ? `practices/${id}` : `${page}/${id}`);
        if (window.location.hash !== newHash) {
          history.replaceState(null, '', newHash);
        }
      }
    });
    // A section became active with none of its collapsibles in the band → drop the stale leaf
    if (activeSection && ![...leavesInBand].some(c => activeSection.contains(c))) clearLeaves();
    // The last collapsible left the band → no leaf is in view any more
    if (leavesChanged && !leavesInBand.size) clearLeaves();
    // Highlight the topmost collapsible in the band, not the last one to enter it
    if (leavesChanged && leavesInBand.size) {
      const top = [...leavesInBand].reduce((a, b) =>
        a.getBoundingClientRect().top <= b.getBoundingClientRect().top ? a : b);
      highlightLeaf(top.id);
    }
  // threshold 0: a section taller than ~10× the band never reaches a 0.1 ratio
  }, { threshold: 0, rootMargin: '-60px 0px -60% 0px' });

  function reinitSectionObserver(pageEl) {
    // Unobserve everything we might have been watching
    document.querySelectorAll('section[id], .hero[id], .collapsible[id]').forEach(s => sectionObserver.unobserve(s));
    leavesInBand.clear();
    clearLeaves();
    // On practices page, scope to the visible topic-views only (a topic can span several containers)
    if (pageEl.id === 'page-practices') {
      pageEl.querySelectorAll('.topic-view:not([hidden])').forEach(visible => {
        visible.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));
        // Also observe collapsibles for 3rd-level active-leaf highlighting
        visible.querySelectorAll('.collapsible[id]').forEach(c => sectionObserver.observe(c));
      });
      const hero = pageEl.querySelector('.hero[id]');
      if (hero) sectionObserver.observe(hero);
      return;
    }
    pageEl.querySelectorAll('section[id], .hero[id]').forEach(s => sectionObserver.observe(s));
  }

