  // ─── POD IMAGE LIGHTBOX ───
  function openPodLightbox(src, alt) {
    const m = document.getElementById('podLightboxModal');
    const img = document.getElementById('podLightboxImg');
    if (!m || !img) return;
    img.src = src;
    img.alt = alt || '';
    m.classList.add('open');
    m.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closePodLightbox() {
    const m = document.getElementById('podLightboxModal');
    const img = document.getElementById('podLightboxImg');
    if (!m) return;
    m.classList.remove('open');
    m.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (img) img.src = '';
  }
  document.querySelectorAll('.fsad-pod-img-wrap, .pod-visual-wrap').forEach(wrap => {
    wrap.addEventListener('click', () => {
      const visible = Array.from(wrap.querySelectorAll('img'))
        .find(img => getComputedStyle(img).display !== 'none');
      if (visible) openPodLightbox(visible.src, visible.alt);
    });
  });

