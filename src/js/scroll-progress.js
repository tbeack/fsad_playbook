  // ─── UTILITIES & SCROLL ───
  function updateScrollProgress() {
    const activePage = document.querySelector('.page.active');
    if (!activePage) return;

    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const pageTop = activePage.offsetTop;
    const pageHeight = activePage.scrollHeight;
    const viewportHeight = document.documentElement.clientHeight;
    const scrollInPage = Math.max(0, winScroll - pageTop);
    const maxScroll = Math.max(1, pageHeight - viewportHeight);
    const scrolled = Math.min(100, (scrollInPage / maxScroll) * 100);
    document.getElementById("progressBar").style.width = scrolled + "%";

    // Back to top visibility
    const btt = document.getElementById('backToTop');
    if (winScroll > 500) { btt.classList.add('visible'); }
    else { btt.classList.remove('visible'); }
  }

