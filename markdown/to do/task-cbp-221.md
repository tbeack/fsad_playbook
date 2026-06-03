# CBP-221 — Pod image hover + lightbox expand

## Summary
Add an interactive hover effect to all pod diagram images in the playbook, and a click-to-expand lightbox so users can view any pod diagram at full size. Two interaction layers: a subtle scale/cursor hint on hover, and a full-screen overlay on click.

## Assessment
There are two places in the app that render pod images:

1. **Section 03 — The FSAD Pod** (`#pod`, ~line 2272): The FSAD Operating Model diagram in `.pod-visual` → `.fsad-pod-img-wrap` → two `<img class="fsad-pod-diagram fsad-pod-diagram-dark/light">` tags.
2. **Pod Explorer** (`#pod-explorer`, ~line 2502–2640): Seven pod panels, each with `.pod-visual-wrap` → two `<img class="triad-diagram/platform-diagram/discovery-diagram/qa-diagram/experience-diagram">` tags (dark + light pair).

Images are always in dark/light pairs — one is `display: none` based on the current theme. The hover and lightbox must show only the currently visible image.

The app has an existing changelog modal pattern (`#changelogModal`, `.changelog-modal / .open`) at ~line 567 (CSS), ~line 12800 (HTML), ~line 13108 (JS). The lightbox will follow this exact pattern.

No external dependencies needed — pure CSS + vanilla JS, consistent with the rest of the codebase.

**Location:**
- `fsad-playbook.html` — CSS ~line 567 (near changelog-modal block), HTML before `</body>` (~line 12800 area), JS ~line 13108

## Plan

1. **Add hover CSS** — insert a new `/* ─── POD IMAGE HOVER ─── */` block after the existing `/* ─── POD VISUAL (Page 1) ─── */` block (~line 901). Target both wrapper containers:
   ```css
   .fsad-pod-img-wrap,
   .pod-visual-wrap { cursor: zoom-in; overflow: hidden; }
   .fsad-pod-diagram,
   .triad-diagram, .platform-diagram, .discovery-diagram, .qa-diagram, .experience-diagram {
     transition: transform 0.2s ease, filter 0.2s ease;
   }
   .fsad-pod-img-wrap:hover img,
   .pod-visual-wrap:hover img {
     transform: scale(1.03);
     filter: brightness(1.04);
   }
   ```
   Note: `overflow: hidden` on `.pod-visual-wrap` clips the scale to the rounded container. Several pod panels already reset padding/border to `transparent`; the overflow clip won't break layout.

2. **Add lightbox CSS** — insert a `/* ─── POD LIGHTBOX ─── */` block adjacent to the `.changelog-modal` block (~line 567):
   ```css
   .pod-lightbox-modal {
     display: none; position: fixed; inset: 0;
     background: rgba(0,0,0,0.88); z-index: 500;
     align-items: center; justify-content: center;
     padding: 1rem; cursor: zoom-out;
   }
   .pod-lightbox-modal.open { display: flex; animation: fadeIn 0.18s ease; }
   .pod-lightbox-inner { position: relative; max-width: 90vw; max-height: 90vh; }
   #podLightboxImg {
     display: block; max-width: 100%; max-height: 90vh;
     border-radius: var(--radius-lg);
     box-shadow: 0 32px 80px rgba(0,0,0,0.6);
     cursor: default;
   }
   .pod-lightbox-close {
     position: absolute; top: -14px; right: -14px;
     width: 32px; height: 32px; border-radius: 50%;
     background: var(--bg-card); border: 1px solid var(--border);
     color: var(--text-secondary); font-size: 1.2rem;
     line-height: 1; display: flex; align-items: center; justify-content: center;
     cursor: pointer;
   }
   .pod-lightbox-close:hover { color: var(--text-primary); }
   ```

3. **Add lightbox HTML** — insert before the existing `<div class="changelog-modal"` element (~line 12800):
   ```html
   <div class="pod-lightbox-modal" id="podLightboxModal" role="dialog" aria-modal="true" aria-hidden="true" onclick="if(event.target===this||event.target.closest('.pod-lightbox-modal')===this)closePodLightbox()">
     <div class="pod-lightbox-inner" onclick="event.stopPropagation()">
       <img id="podLightboxImg" src="" alt="">
       <button class="pod-lightbox-close" onclick="closePodLightbox()" aria-label="Close image">×</button>
     </div>
   </div>
   ```

4. **Add JS functions** — insert after the `closeChangelog()` function and before the Escape key listener (~line 13123):
   ```js
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
   ```

5. **Extend Escape key handler** — update the existing `keydown` listener (~line 13123) to also close the pod lightbox:
   ```js
   document.addEventListener('keydown', (e) => {
     if (e.key === 'Escape') { closeChangelog(); closePodLightbox(); }
   });
   ```

6. **Wire click handlers** — add a new initialisation block (after DOMContentLoaded or after the lightbox functions) that attaches click listeners to all pod image wrappers:
   ```js
   document.querySelectorAll('.fsad-pod-img-wrap, .pod-visual-wrap').forEach(wrap => {
     wrap.addEventListener('click', () => {
       const visible = Array.from(wrap.querySelectorAll('img'))
         .find(img => getComputedStyle(img).display !== 'none');
       if (visible) openPodLightbox(visible.src, visible.alt);
     });
   });
   ```
   This correctly handles dark/light image pairs — only the currently rendered image is opened.

7. **Bump version** — update all three version locations in `fsad-playbook.html`:
   - `<title>` tag
   - sidebar brand badge
   - changelog modal (add new entry)
   from `v2.86.0` → `v2.87.0`

8. **Run build** — `python3 scripts/build-dist.py` to regenerate `dist/fsad-playbook.html`.

9. **Verify in browser** — open `fsad-playbook.html`, confirm hover effect and lightbox on FSAD Operating Model (Section 03) and at least three Pod Explorer diagrams (Triad, Platform, QA). Confirm Escape and backdrop-click close the lightbox.

All criteria verified 2026-06-03 before commit.

## Acceptance Criteria
- [x] Hovering over the FSAD Operating Model image (Section 03) shows `cursor: zoom-in` and a subtle scale-up
- [x] Hovering over any Pod Explorer diagram (Triad, Builder Duo, Experience, Full-Stack, Platform, Discovery, QA) shows `cursor: zoom-in` and a subtle scale-up
- [x] Clicking any pod diagram image opens a full-screen lightbox overlay with the correct (theme-matching) image at full size
- [x] Lightbox closes on Escape key press
- [x] Lightbox closes on clicking the `×` button
- [x] Lightbox closes on clicking the dark backdrop
- [x] Lightbox does not close when clicking the image itself
- [x] Body scroll is locked while lightbox is open and restored on close
- [x] Dark mode and light mode both show the correct image in the lightbox
- [x] `python3 scripts/build-dist.py` runs cleanly and `dist/fsad-playbook.html` is updated
- [x] Version updated to `v2.87.0` in all three locations (title, sidebar badge, changelog modal)
