  // ─── THEME TOGGLE ───
  function getEffectiveTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme() {
    const effective = getEffectiveTheme();
    const icon = document.getElementById('themeIcon');
    const label = document.getElementById('themeLabel');
    document.documentElement.setAttribute('data-theme', effective);
    if (icon) icon.textContent = effective === 'light' ? '☀' : '☾';
    if (label) label.textContent = effective === 'light' ? 'Light' : 'Dark';
  }

  function cycleTheme() {
    // 2-state toggle (Phase 3): light ↔ dark. Default on first load follows OS.
    const current = getEffectiveTheme();
    localStorage.setItem('theme', current === 'light' ? 'dark' : 'light');
    applyTheme();
  }

  // Apply theme immediately to prevent flash
  applyTheme();

