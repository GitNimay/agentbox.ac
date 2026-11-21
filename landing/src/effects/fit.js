/* Fit: the layout is drawn for a 1200px column. On a wide window the whole page is scaled up to
   fill it, so a big monitor does not show a small page in the middle. The scale is read from the
   window's own size (outerWidth), which the browser's zoom does not change, so zooming in and out
   works on top of it as on any site. It never scales below 1: a narrower window gets the fluid
   layout, and below 900px the mobile layer at the end of site.css. The few pictures drawn at a
   fixed width ([data-fit]) shrink to their column.
   Runs as a layout effect, before the canvases (which read the zoom) size themselves. */
import { on, qa } from '../lib/motion.js';

const RAIL = 40, GAP = 48; // screen px: the hatched gutter's width, and the room kept between rail and content
const MOST = 1.8; // past this a wide screen gets more room around the page rather than bigger type

function fit() {
  const w = window.innerWidth, h = window.innerHeight, s = document.body.style;
  let z = 1;
  if (w >= 900) {
    const ow = window.outerWidth || w, oh = window.outerHeight ? window.outerHeight - 90 : h;
    const byWidth = (ow - 2 * (RAIL + GAP)) / 1200, byHeight = oh / 820;
    // never so large that the column the browser leaves is cramped (a very deep browser zoom)
    z = Math.max(1, Math.min(MOST, byWidth, byHeight, w / 1100));
  }
  s.zoom = z === 1 ? '' : z;
  s.setProperty('--sh', (h / z) + 'px');
  s.setProperty('--rg', (w < 900 ? 12 : RAIL / z) + 'px');
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
