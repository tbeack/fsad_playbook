  // ─── SCROLL SPY ───
  // Collapsibles currently inside the detection band (several short ones can share it)
  const leavesInBand = new Set();

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
    entries.forEach(entry => {
      if (entry.target.classList.contains('collapsible')) {
        if (entry.isIntersecting) leavesInBand.add(entry.target);
        else leavesInBand.delete(entry.target);
        leavesChanged = true;
        return;
      }
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      // A section became visible → highlight matching section nav item
      document.querySelectorAll('.nav-sub-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('onclick')?.includes(id)) {
          item.classList.add('active');
        }
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

