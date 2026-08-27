  // ─── CLAUDE PAGE: Hub + Topic views ───
  const TOPIC_IDS = ['hub', 'foundations', 'integrations', 'skills-hooks', 'operations', 'reference'];
  const TOPIC_ORDER = ['foundations', 'integrations', 'skills-hooks', 'operations', 'reference'];
  const TOPIC_LABELS = {
    'hub': 'Hub',
    'foundations': 'Foundations',
    'integrations': 'Integrations & Review',
    'skills-hooks': 'Skills & Hooks',
    'operations': 'Operations',
    'reference': 'Reference'
  };
  const sectionToTopicMap = {};

  function buildSectionToTopicMap() {
    document.querySelectorAll('#page-practices .topic-view[data-topic]').forEach(view => {
      const topic = view.dataset.topic;
      view.querySelectorAll('section[id]').forEach(sec => {
        sectionToTopicMap[sec.id] = topic;
      });
    });
  }

  function showTopic(topicId) {
    if (!TOPIC_IDS.includes(topicId)) topicId = 'hub';
    window.__currentTopic = topicId;
    document.querySelectorAll('#page-practices .topic-view').forEach(v => {
      v.hidden = (v.dataset.topic !== topicId);
    });
    renderTopicFooter(topicId);
    updatePracticesBreadcrumb(topicId);
    const practicesEl = document.getElementById('page-practices');
    if (practicesEl) reinitSectionObserver(practicesEl);
    buildIndicatorPills('practices');
    updateSidebarTopicActive(topicId);
    // Update hash without triggering full route handling
    const currentHash = window.location.hash.substring(1);
    const desired = topicId === 'hub' ? 'practices' : `practices/${topicId}`;
    if (currentHash.split('/')[0] === 'practices' && currentHash !== desired) {
      history.replaceState(null, '', '#' + desired);
    }
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }

  function updatePracticesBreadcrumb(topicId) {
    const titleEl = document.getElementById('pageTitle');
    if (!titleEl) return;
    if (topicId === 'hub' || !topicId) {
      titleEl.textContent = 'Claude Best Practices';
      return;
    }
    titleEl.innerHTML = '';
    const crumb = document.createElement('a');
    crumb.className = 'page-indicator-crumb';
    crumb.textContent = 'Claude';
    crumb.href = '#practices';
    crumb.addEventListener('click', (e) => { e.preventDefault(); showTopic('hub'); });
    const sep = document.createElement('span');
    sep.textContent = ' / ';
    sep.style.color = 'var(--text-muted)';
    const label = document.createElement('span');
    label.textContent = TOPIC_LABELS[topicId] || topicId;
    titleEl.appendChild(crumb);
    titleEl.appendChild(sep);
    titleEl.appendChild(label);
  }

  function renderTopicFooter(topicId) {
    // Remove any existing footers across topic-views
    document.querySelectorAll('#page-practices .topic-footer').forEach(f => f.remove());
    if (topicId === 'hub') return;
    const view = document.querySelector(`#page-practices .topic-view[data-topic="${topicId}"]:not([hidden])`);
    if (!view) return;
    const idx = TOPIC_ORDER.indexOf(topicId);
    const next = TOPIC_ORDER[(idx + 1) % TOPIC_ORDER.length];
    const footer = document.createElement('div');
    footer.className = 'topic-footer';
    const back = document.createElement('a');
    back.className = 'topic-footer-back';
    back.textContent = '← All Topics';
    back.href = '#practices';
    back.addEventListener('click', (e) => { e.preventDefault(); showTopic('hub'); });
    const fwd = document.createElement('a');
    fwd.className = 'topic-footer-next';
    fwd.textContent = `Next: ${TOPIC_LABELS[next]} →`;
    fwd.href = '#practices/' + next;
    fwd.addEventListener('click', (e) => { e.preventDefault(); showTopic(next); });
    footer.appendChild(back);
    footer.appendChild(fwd);
    view.appendChild(footer);
  }

  function updateSidebarTopicActive(topicId) {
    document.querySelectorAll('.nav-topic-header').forEach(h => {
      const match = h.dataset.topic === topicId;
      h.classList.toggle('active', match);
    });
    document.querySelectorAll('.nav-topic-sections').forEach(s => {
      s.classList.toggle('open', s.dataset.topicSections === topicId);
    });
    document.querySelectorAll('.nav-topic-header').forEach(h => {
      h.classList.toggle('open', h.dataset.topic === topicId);
    });
  }

  function toggleTopicNav(btn, topicId) {
    showTopic(topicId);
  }

  function scrollToSection(sectionId) {
    const targetPage = sectionToPageMap[sectionId] || 'fsad';
    window.location.hash = `${targetPage}/${sectionId}`;
  }

  function scrollToId(id, instant, targetHash) {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      // 'auto' defers to the page's CSS `scroll-behavior: smooth` (html { ... }
      // above) rather than forcing an instant jump — use the spec's 'instant'
      // value to actually bypass it for route-entry landings.
      window.scrollTo({ top: offsetPosition, behavior: instant ? 'instant' : 'smooth' });
      // Instant landings skip the scroll-spy's mid-scroll crossing, so tall
      // sections may never register past its intersection threshold — pin
      // the hash directly instead of relying on the observer to correct it.
      if (instant && targetHash && window.location.hash !== targetHash) {
        history.replaceState(null, '', targetHash);
      }
    }
  }

  // Open a collapsible (3rd-level leaf) and scroll to it. Ensures the right
  // practices topic view is visible first so getBoundingClientRect is sane.
  function openAndScrollToLeaf(collapsibleId, topicId, instant, targetHash) {
    const el = document.getElementById(collapsibleId);
    if (!el) return;
    if (topicId && TOPIC_IDS.includes(topicId) && window.__currentTopic !== topicId) {
      showTopic(topicId);
    }
    el.classList.add('open');
    setTimeout(() => scrollToId(collapsibleId, instant, targetHash), 140);
  }

  function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('sidebarBackdrop').classList.toggle('visible');
  }

