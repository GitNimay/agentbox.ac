/* Falling streaks: thin vertical lines of dots, in the hero's dot language (2px squares on a 3px
   grid, accent orange, four levels picked by a 4x4 Bayer matrix). Each streak is bright at its head
   and thins toward its tail; fade(rowFraction) shapes where they show. Sparse, slow, and only
   running while on screen. Used under the hero's mountains and behind the download section. */
import { loopWhileVisible, on, pageZoom, prefersReducedMotion } from '../lib/motion.js';

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

export default function startStreaks(cv, { every, alpha, fade }) {
  const g = cv.getContext('2d');
  if (!g) return () => {};
  let P = 3, D = 2, W = 0, H = 0, cols = 0, rows = 0, list = [];
  function size() {
    const z = pageZoom(), dpr = Math.min(2, window.devicePixelRatio || 1);
    cv.width = Math.round(cv.clientWidth * z * dpr); cv.height = Math.round(cv.clientHeight * z * dpr);
    P = 3 * dpr; D = 2 * dpr; W = cv.width; H = cv.height; cols = Math.floor(W / P); rows = Math.ceil(H / P);
  }
  function spawn(s, fresh) {
    s.c = Math.floor(Math.random() * cols);
    s.len = 6 + Math.floor(Math.pow(Math.random(), 1.6) * 34);   // mostly short, a few long
    s.v = 9 + Math.random() * 16;                                  // rows per second
    s.y = fresh ? Math.random() * (rows + s.len) : -Math.random() * rows * .6;
    s.k = .55 + Math.random() * .45;                               // its own brightness
  }
  function seed() {
    list = [];
    const n = Math.max(10, Math.round(cols / every));
    for (let i = 0; i < n; i++) { const s = {}; spawn(s, true); list.push(s); }
  }
  function draw() {
    g.clearRect(0, 0, W, H);
    list.forEach(s => {
      const head = Math.floor(s.y);
      for (let i = 0; i < s.len; i++) {
        const r = head - i; if (r < 0 || r >= rows) continue;
        const v = (1 - i / s.len) * s.k * fade(r / rows) * 3;
        const lv = Math.floor(v) + ((BAYER[(r % 4) * 4 + (s.c % 4)] + .5) / 16 < v - Math.floor(v) ? 1 : 0);
        if (lv < 1) continue;
        g.fillStyle = 'rgba(238,96,24,' + (Math.min(lv, 3) / 3 * alpha).toFixed(3) + ')';
        g.fillRect(s.c * P, r * P, D, D);
      }
    });
  }
  function step(dt) { list.forEach(s => { s.y += s.v * dt; if (s.y - s.len > rows) spawn(s, false); }); }

  size(); seed(); draw();
  const offs = [on(window, 'resize', () => { size(); seed(); draw(); })];
  if (!prefersReducedMotion()) {
    let prev = 0;
    offs.push(loopWhileVisible(cv, ms => {
      if (ms - prev < 33) return;
      step(Math.min(.1, (ms - (prev || ms)) / 1000)); prev = ms; draw();
    }));
  }
  return () => offs.forEach(off => off());
}
