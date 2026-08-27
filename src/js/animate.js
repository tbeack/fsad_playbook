  // ─── ANIMATE ON SCROLL ───
  let initialLoadComplete = false;
  const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  function reinitAnimObserver(pageEl) {
    if (!initialLoadComplete) return; // Skip on first load — DOMContentLoaded handles it
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    pageEl.querySelectorAll('.overview-card, .proscons-col, .anti-card, .role-card, .meta-box, .card, .step-card, .framework-card, .bp-anti-card').forEach(el => {
      animObserver.unobserve(el);
      el.style.opacity = '0';
      el.style.transform = 'translateY(14px)';
      el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      animObserver.observe(el);
    });
  }

