  // ─── INITIALIZATION ───
  window.addEventListener('scroll', updateScrollProgress);
  window.addEventListener('keydown', (e) => {
    const tag = document.activeElement.tagName;
    const isTyping = tag === 'INPUT' || tag === 'TEXTAREA';
    if (e.key === '/' && !isTyping) {
      e.preventDefault();
      const input = document.getElementById('sidebarSearchInput');
      if (input) { input.focus(); input.select(); }
      return;
    }
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const input = document.getElementById('sidebarSearchInput');
      if (input) { input.focus(); input.select(); }
      return;
    }
    if (e.key === 'Escape') {
      const input = document.getElementById('sidebarSearchInput');
      if (input && document.activeElement === input) {
        input.value = '';
        closeSidebarSearch();
        input.blur();
      } else {
        closeSidebarSearch();
      }
    }
  });

  // Sidebar search keyboard nav (scoped to input)
  document.addEventListener('keydown', (e) => {
    if (document.activeElement && document.activeElement.id === 'sidebarSearchInput') {
      handleSidebarSearchKeydown(e);
    }
  });

  // Dismiss popover on outside click
  document.addEventListener('mousedown', (e) => {
    const searchWrap = document.querySelector('.sidebar-search');
    if (searchWrap && !searchWrap.contains(e.target)) {
      closeSidebarSearch();
    }
  });

  // ── What's new this week panel ──
  function initWhatsNew() {
    const pageBody = document.getElementById('wnPageBody');
    const trigger = document.getElementById('swnTrigger');
    const badgeEl = document.getElementById('swnTriggerBadge');
    if (!pageBody || !trigger) return;

    const now = new Date();
    const cutoff = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const CATEGORIES = [
      { keywords: ['hook','Stop','SubagentStop','PreToolUse','PostToolUse','additionalContext'], label: 'Hooks', icon: '⚡', cls: 'swn-cat-hooks' },
      { keywords: ['Security Review','sec-review','security'], label: 'Security', icon: '🔒', cls: 'swn-cat-skills' },
      { keywords: ['skill','SKILL.md','Skills Library'], label: 'Skills', icon: '✦', cls: 'swn-cat-skills' },
      { keywords: ['nav','navigation','deeplink','top-level','sidebar'], label: 'Navigation', icon: '🔗', cls: 'swn-cat-nav' },
      { keywords: ['pod','image','diagram','lightbox','hover','theme','design'], label: 'UI / Design', icon: '🎨', cls: 'swn-cat-ui' },
      { keywords: ['CLI','command','agents','subcommand','flag','claude plugin'], label: 'CLI', icon: '⌘', cls: 'swn-cat-cli' },
      { keywords: ['config','settings','env var','env vars'], label: 'Config', icon: '⚙', cls: 'swn-cat-config' },
      { keywords: ['auto-update','v2.1.','v0.1'], label: 'Auto-update', icon: '🤖', cls: 'swn-cat-auto' },
    ];

    function detectCategory(text) {
      const lower = text.toLowerCase();
      for (const cat of CATEGORIES) {
        if (cat.keywords.some(kw => lower.includes(kw.toLowerCase()))) return cat;
      }
      return { label: 'Update', icon: '◆', cls: '' };
    }

    function extractImpact(pEl, strongText) {
      const full = pEl.textContent;
      const after = full.slice(full.indexOf(strongText) + strongText.length).trim();
      const dot = after.indexOf('.');
      let sentence = dot >= 0 ? after.slice(0, dot + 1) : after;
      if (sentence.length > 160) sentence = sentence.slice(0, 157) + '…';
      return sentence;
    }

    const sections = document.querySelectorAll('#changelogModal .changelog-body section');
    const cards = [];

    function extractLiImpact(liEl, strongText) {
      const full = liEl.textContent;
      const after = full.slice(full.indexOf(strongText) + strongText.length).trim();
      if (after.length > 220) return after.slice(0, 217) + '…';
      return after;
    }

    sections.forEach(sec => {
      const dateEl = sec.querySelector('.changelog-date');
      if (!dateEl) return;
      const dateText = dateEl.textContent.replace(/^·\s*/, '').trim();
      const d = new Date(dateText);
      if (isNaN(d) || d < cutoff) return;
      const h3 = sec.querySelector('h3');
      const versionMatch = h3 ? h3.textContent.match(/v[\d.]+/) : null;
      const version = versionMatch ? versionMatch[0] : '';
      const pEl = sec.querySelector('p');
      const strongEl = pEl ? pEl.querySelector('strong') : null;
      const headline = strongEl ? strongEl.textContent.replace(/\.$/, '') : '';
      if (!headline) return;

      // Only show entries from the Auto Updater agent
      if (!headline.toLowerCase().includes('auto-update')) return;

      const liEls = sec.querySelectorAll('ul li');
      if (liEls.length > 0) {
        // Generate one card per individual CBP task
        liEls.forEach(li => {
          const liStrong = li.querySelector('strong');
          const liHeadline = liStrong ? liStrong.textContent.replace(/\.$/, '') : li.textContent.slice(0, 60);
          const liImpact = liStrong ? extractLiImpact(li, liStrong.textContent) : '';
          const cat = detectCategory(liHeadline + ' ' + liImpact);
          cards.push({ version, dateText, headline: liHeadline, impact: liImpact, cat });
        });
      } else {
        // Fallback: single card for single-task auto-update entries
        const impact = pEl ? extractImpact(pEl, strongEl.textContent) : '';
        const cat = detectCategory(headline + ' ' + impact);
        cards.push({ version, dateText, headline, impact, cat });
      }
    });

    if (cards.length === 0) return;

    // Show sidebar trigger, subtitle, and nav group
    if (badgeEl) badgeEl.textContent = cards.length;
    trigger.style.display = '';

    // Populate page cards
    cards.forEach(({ version, dateText, headline, impact, cat }) => {
      const card = document.createElement('div');
      card.className = 'swn-card' + (cat.cls ? ' ' + cat.cls : '');
      card.onclick = () => openChangelog();
      card.innerHTML =
        '<div class="swn-card-meta">' +
          '<span class="swn-category"><span class="swn-category-icon">' + cat.icon + '</span>' + cat.label + '</span>' +
          '<span class="swn-version-badge">' + version + ' · ' + dateText + '</span>' +
        '</div>' +
        '<div class="swn-headline">' + headline + '</div>' +
        (impact ? '<div class="swn-impact">' + impact + '</div>' : '');
      pageBody.appendChild(card);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    buildSectionToTopicMap();
    initRouter();
    buildSearchIndex();
    initCopyButtons();
    
    document.querySelectorAll('section[id], .hero[id]').forEach(s => sectionObserver.observe(s));
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      document.querySelectorAll('.overview-card, .proscons-col, .anti-card, .role-card, .meta-box, .card, .step-card, .framework-card, .bp-anti-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(14px)';
        el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        animObserver.observe(el);
      });
    }
    initWhatsNew();
    initialLoadComplete = true;
  });
