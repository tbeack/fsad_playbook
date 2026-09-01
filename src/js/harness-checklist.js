  // ─── HARNESS ENGINEERING CHECKLIST ───
  function initHarnessChecklist() {
    const grid = document.getElementById('harnessChecklist');
    if (!grid) return;
    const storageKey = 'harness-checklist:' + (grid.dataset.checklistId || 'default');
    const inputs = Array.from(grid.querySelectorAll('.harness-check-input'));
    const progressEl = document.getElementById('harnessChecklistProgress');

    function loadState() {
      try {
        const raw = localStorage.getItem(storageKey);
        return raw ? JSON.parse(raw) : {};
      } catch (e) {
        return {};
      }
    }

    function saveState(state) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(state));
      } catch (e) { /* ignore storage errors (private mode, quota) */ }
    }

    function updateProgress() {
      if (!progressEl) return;
      const checked = inputs.filter(i => i.checked).length;
      progressEl.textContent = checked + ' / ' + inputs.length + ' checked';
    }

    const state = loadState();
    inputs.forEach(input => {
      if (state[input.id]) input.checked = true;
      input.addEventListener('change', () => {
        const next = loadState();
        next[input.id] = input.checked;
        saveState(next);
        updateProgress();
      });
    });

    updateProgress();
  }

  document.addEventListener('DOMContentLoaded', initHarnessChecklist);
