  // ─── WORKFLOW PHASES ───
  function showPhase(index) {
    document.querySelectorAll('.workflow-phase').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.workflow-detail').forEach(d => d.classList.remove('visible'));
    document.querySelector(`.workflow-phase[data-phase="${index}"]`).classList.add('active');
    document.getElementById('detail-' + index).classList.add('visible');
  }

