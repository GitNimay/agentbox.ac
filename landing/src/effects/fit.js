/* Fit: the page is never zoomed as a whole, so the browser's own zoom works as on any site.
   The content column is at most 1200px and narrows with the window; the few pictures drawn at
   a fixed width ([data-fit]) shrink to their column instead. Below 900px the mobile layer at the
   end of site.css reflows the page, and the hero inbox is zoomed to fit its card.
   Runs as a layout effect, before the canvases size themselves. */
import { on, qa } from '../lib/motion.js';

const RAIL = 40; // the hatched gutter's width on each side

function fit() {
  const w = window.innerWidth, h = window.innerHeight, s = document.body.style;
  s.zoom = '';
  s.setProperty('--sh', h + 'px');
  s.setProperty('--rg', (w < 900 ? 12 : RAIL) + 'px');
  if (w < 900) s.setProperty('--hz', (w - 56) / (w < 600 ? 560 : 1080)); // hero inbox: 560px wide on phones, 1080px on tablets
  for (const el of qa(document, '[data-fit]')) {
    el.style.zoom = '';
    if (el.dataset.wide !== undefined && w < 900) continue; // below 900px it reflows instead
    const box = el.parentElement, pad = getComputedStyle(box);
    const room = box.clientWidth - parseFloat(pad.paddingLeft) - parseFloat(pad.paddingRight), want = Number(el.dataset.fit);
    if (room && want > room) el.style.zoom = room / want;
  }
}

export default function startFit() {
  fit();
  return on(window, 'resize', fit);
}
