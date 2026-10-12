  // ═══════════════════════════════════════
  // SIDEBAR RESIZE + COLLAPSE (desktop only)
  // ═══════════════════════════════════════
  (function () {
    const W_KEY = 'fsad-sidebar-w';
    const C_KEY = 'fsad-sidebar-collapsed';
    const DEFAULT_W = 290, MIN_W = 220, MAX_W = 520, STEP = 16;
    const root = document.documentElement;
    const resizer = document.getElementById('sidebarResizer');
    if (!resizer) return;

    const clamp = (w) => Math.min(MAX_W, Math.max(MIN_W, Math.round(w)));
    const store = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
    const load = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };
    const currentW = () => parseInt(getComputedStyle(root).getPropertyValue('--sidebar-w'), 10) || DEFAULT_W;

    function setWidth(w, persist) {
      const v = clamp(w);
      root.style.setProperty('--sidebar-w', v + 'px');
      resizer.setAttribute('aria-valuenow', v);
      if (persist) store(W_KEY, v);
    }

    function setCollapsed(on) {
      document.body.classList.toggle('sidebar-collapsed', on);
      store(C_KEY, on ? '1' : '0');
    }

    const saved = parseInt(load(W_KEY), 10);
    resizer.setAttribute('aria-valuemin', MIN_W);
    resizer.setAttribute('aria-valuemax', MAX_W);
    setWidth(saved || DEFAULT_W, false);
    if (load(C_KEY) === '1') document.body.classList.add('sidebar-collapsed');

    resizer.addEventListener('pointerdown', (e) => {
      resizer.setPointerCapture(e.pointerId);
      document.body.classList.add('sidebar-resizing');
      e.preventDefault();
    });
    resizer.addEventListener('pointermove', (e) => {
      if (resizer.hasPointerCapture(e.pointerId)) setWidth(e.clientX, false);
    });
    resizer.addEventListener('pointerup', (e) => {
      if (!resizer.hasPointerCapture(e.pointerId)) return;
      resizer.releasePointerCapture(e.pointerId);
      document.body.classList.remove('sidebar-resizing');
      store(W_KEY, currentW());
    });
    resizer.addEventListener('dblclick', () => setWidth(DEFAULT_W, true));
    resizer.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault();
      setWidth(currentW() + (e.key === 'ArrowRight' ? STEP : -STEP), true);
    });

    document.getElementById('sidebarCollapseBtn').addEventListener('click', () => setCollapsed(true));
    document.getElementById('sidebarExpandBtn').addEventListener('click', () => setCollapsed(false));
  })();
