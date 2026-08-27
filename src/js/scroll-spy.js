  // ─── SCROLL SPY ───
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      const isLeaf = entry.target.classList.contains('collapsible');
      if (isLeaf) {
        // A collapsible became visible → highlight the matching leaf nav item
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
        return;
      }
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
  }, { threshold: 0.1, rootMargin: '-60px 0px -60% 0px' });

  function reinitSectionObserver(pageEl) {
    // Unobserve everything we might have been watching
    document.querySelectorAll('section[id], .hero[id], .collapsible[id]').forEach(s => sectionObserver.unobserve(s));
    // On practices page, scope to the visible topic-view only
    if (pageEl.id === 'page-practices') {
      const visible = pageEl.querySelector('.topic-view:not([hidden])');
      if (visible) {
        visible.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));
        // Also observe collapsibles for 3rd-level active-leaf highlighting
        visible.querySelectorAll('.collapsible[id]').forEach(c => sectionObserver.observe(c));
      }
      const hero = pageEl.querySelector('.hero[id]');
      if (hero) sectionObserver.observe(hero);
      return;
    }
    pageEl.querySelectorAll('section[id], .hero[id]').forEach(s => sectionObserver.observe(s));
  }

