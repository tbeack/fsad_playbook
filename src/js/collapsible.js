  // ─── COLLAPSIBLE ───
  document.addEventListener('click', (e) => {
    const header = e.target.closest('.collapsible-header');
    if (!header) return;
    header.closest('.collapsible').classList.toggle('open');
  });

