  // ─── POD SWITCHER ───
  function switchPod(podId) {
    document.querySelectorAll('.pod-tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.pod-tab[data-pod="${podId}"]`).classList.add('active');
    document.querySelectorAll('.pod-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('pod-' + podId).classList.add('active');
  }

  function switchWorkflow(wfId) {
    document.querySelectorAll('.wf-tab').forEach(t => t.classList.remove('active'));
    const tab = document.querySelector(`.wf-tab[data-wf="${wfId}"]`);
    if (tab) tab.classList.add('active');
    document.querySelectorAll('.wf-panel').forEach(p => p.classList.remove('active'));
    const panel = document.getElementById('wf-' + wfId);
    if (panel) panel.classList.add('active');
  }

