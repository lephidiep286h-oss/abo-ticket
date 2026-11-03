'use strict';

/* ---------- Header elevation on scroll ---------- */

const topbar = document.getElementById('topbar');
let scrollFrame = 0;

function syncScrollState() {
  if (topbar) topbar.classList.toggle('is-scrolled', window.scrollY > 4);
  scrollFrame = 0;
}

window.addEventListener('scroll', () => {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(syncScrollState);
}, { passive: true });

syncScrollState();

/* ---------- Minimal interactions (no invented screens) ---------- */

document.querySelector('.back-button')?.addEventListener('click', () => {
  if (history.length > 1) history.back();
});

document.querySelectorAll('.tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    if (tab.classList.contains('is-active') || typeof tab.animate !== 'function') return;
    tab.animate(
      [{ transform: 'scale(1)' }, { transform: 'scale(.94)' }, { transform: 'scale(1)' }],
      { duration: 170, easing: 'ease-out' }
    );
  });
});

/* ---------- Deutschland-Tarif logo drift ---------- */

const tarifTrack = document.querySelector('.tarif-track');
const tarifLogo = document.querySelector('.tarif-logo');

function layoutTarifLogo() {
  if (!tarifTrack || !tarifLogo) return;
  const travel = Math.max(0, tarifTrack.clientWidth - tarifLogo.offsetWidth);
  tarifTrack.style.setProperty('--tarif-travel', `${travel}px`);
}

window.addEventListener('resize', layoutTarifLogo, { passive: true });
window.addEventListener('load', layoutTarifLogo);

if (tarifTrack && typeof ResizeObserver !== 'undefined') {
  new ResizeObserver(layoutTarifLogo).observe(tarifTrack);
}

layoutTarifLogo();

/* ---------- PWA (installable web app) ---------- */

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}
