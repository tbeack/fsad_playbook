  // ─── CHANGELOG MODAL ───
  function openChangelog() {
    const m = document.getElementById('changelogModal');
    if (!m) return;
    m.classList.add('open');
    m.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeChangelog() {
    const m = document.getElementById('changelogModal');
    if (!m) return;
    m.classList.remove('open');
    m.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeChangelog(); closePodLightbox(); }
  });

