  // ─── INDICATOR PILLS ───
  function buildIndicatorPills(pageId) {
    const container = document.getElementById('pageIndicatorPills');
    if (!container) return;
    container.innerHTML = '';
    if (pageId === 'practices') {
      const topic = window.__currentTopic || 'hub';
      if (topic === 'hub') return;
      const visibleSections = document.querySelectorAll(`#page-practices .topic-view[data-topic="${topic}"]:not([hidden]) section[id]`);
      visibleSections.forEach(sec => {
        const pill = document.createElement('a');
        pill.className = 'page-indicator-pill';
        const heading = sec.querySelector('.section-title');
        pill.textContent = heading ? heading.textContent.trim().slice(0, 40) : sec.id;
        pill.href = `#practices/${sec.id}`;
        pill.dataset.section = sec.id;
        pill.addEventListener('click', (e) => {
          e.preventDefault();
          scrollToId(sec.id);
        });
        container.appendChild(pill);
      });
      return;
    }
    const subItems = document.querySelectorAll(`.nav-sub-items[data-group="${pageId}"] .nav-sub-item`);
    subItems.forEach(item => {
      const pill = document.createElement('a');
      pill.className = 'page-indicator-pill';
      pill.textContent = item.textContent;
      pill.href = item.getAttribute('href') || '#';
      const onclick = item.getAttribute('onclick') || '';
      const match = onclick.match(/scrollToSection\('([^']+)'\)/);
      if (match) pill.dataset.section = match[1];
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        if (match) scrollToSection(match[1]);
      });
      if (item.classList.contains('active')) pill.classList.add('active');
      container.appendChild(pill);
    });
  }

