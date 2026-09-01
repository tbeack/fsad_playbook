  // ─── ROUTING & NAVIGATION ───
  function initRouter() {
    window.addEventListener('hashchange', handleRoute);
    if (window.location.hash) {
      handleRoute();
    } else {
      navigateTo('fsad');
    }
  }

  // While a route is landing, switchPage()'s reinitSectionObserver() re-observes
  // sections and fires an immediate "isIntersecting" callback for whatever is at
  // scroll position 0 (the hero) before the route's own instant scroll runs —
  // suppress the scroll-spy's hash rewrites until the route settles so it can't
  // clobber the target hash with an intermediate one.
  let routeSettling = false;

  function handleRoute() {
    const hash = window.location.hash.substring(1);
    if (!hash) return;

    routeSettling = true;
    clearTimeout(handleRoute._settleTimer);
    handleRoute._settleTimer = setTimeout(() => { routeSettling = false; }, 500);

    const [pageId, sectionId, leafSlug] = hash.split('/');
    const navBtn = document.querySelector(`.nav-group-toggle[data-page="${pageId}"]`);

    if (navBtn) {
      switchPage(pageId, navBtn);
    } else if (sectionToPageMap[pageId]) {
      // Direct section reference in hash (e.g. #overview)
      switchPage(sectionToPageMap[pageId], document.querySelector(`.nav-group-toggle[data-page="${sectionToPageMap[pageId]}"]`));
      if (sectionToPageMap[pageId] === 'practices') {
        const topic = TOPIC_IDS.includes(pageId) ? pageId : (sectionToTopicMap[pageId] || 'hub');
        showTopic(topic);
        if (!TOPIC_IDS.includes(pageId)) setTimeout(() => scrollToId(pageId, true, '#' + hash), 120);
      } else {
        scrollToId(pageId, true, '#' + hash);
      }
      return;
    }

    if (pageId === 'practices') {
      // Second segment may be a topic or a section
      if (sectionId && TOPIC_IDS.includes(sectionId)) {
        showTopic(sectionId);
        return;
      }
      if (sectionId && sectionToTopicMap[sectionId]) {
        const topic = sectionToTopicMap[sectionId];
        showTopic(topic);
        // Third segment: open a specific collapsible within the section
        if (leafSlug) {
          const leafId = `${sectionId}--${leafSlug}`;
          setTimeout(() => openAndScrollToLeaf(leafId, topic, true, '#' + hash), 140);
        } else {
          setTimeout(() => scrollToId(sectionId, true, '#' + hash), 120);
        }
        return;
      }
      showTopic('hub');
      return;
    }

    if (sectionId) {
      // switchPage() sets display:block synchronously (only its fade-in
      // transition is deferred to the next frames), so layout is already
      // readable here — scroll now, before that fade-in paints, instead of
      // waiting on a timer and letting the hero be visible in the interim.
      scrollToId(sectionId, true, '#' + hash);
    }
  }

  function navigateTo(pageId, btn) {
    if (window.location.hash.substring(1).split('/')[0] === pageId) {
       // Already on this page, just go to hero
       window.location.hash = `${pageId}/${pageId}-hero`;
    } else {
       window.location.hash = pageId;
    }
    if (btn) switchPage(pageId, btn);
  }

  function switchPage(pageId, btn) {
    window.scrollTo(0, 0);

    document.querySelectorAll('.page').forEach(p => {
      p.classList.remove('active');
      p.style.display = 'none';
      p.style.opacity = '';
    });

    const targetPage = document.getElementById('page-' + pageId);
    if (targetPage) {
      targetPage.style.display = 'block';
      targetPage.style.opacity = '0';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          targetPage.style.opacity = '';
          targetPage.classList.add('active');
          reinitAnimObserver(targetPage);
          reinitSectionObserver(targetPage);
        });
      });
    }

    document.querySelectorAll('.nav-group-toggle').forEach(t => t.classList.remove('active', 'expanded'));
    if (btn && !btn.classList.contains('disabled')) {
      btn.classList.add('active', 'expanded');
    }

    document.querySelectorAll('.nav-sub-items').forEach(s => s.classList.remove('open'));
    const subItems = document.querySelector(`.nav-sub-items[data-group="${pageId}"]`);
    if (subItems) subItems.classList.add('open');

    document.getElementById('sidebar').classList.remove('open');
    const backdrop = document.getElementById('sidebarBackdrop');
    if (backdrop) backdrop.classList.remove('visible');
    const pageTitles = { fsad: 'Full Stack Agentic Development', pods: 'Pod Compositions', workflows: 'Workflows', harness: 'Harness Engineering', skills: 'Skills Library', practices: 'Claude Best Practices', codex: 'Codex Best Practices', kpis: 'KPIs to Measure Impact', 'open-source': 'Open Source Frameworks' };
    const titleEl = document.getElementById('pageTitle');
    if (titleEl) titleEl.textContent = pageTitles[pageId] || '';
    if (pageId === 'practices' && !window.__currentTopic) {
      showTopic('hub');
    } else {
      buildIndicatorPills(pageId);
    }
    initCopyButtons();
  }

