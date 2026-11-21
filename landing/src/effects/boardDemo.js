/* Inbox or board: the same threads flip between the Needs you list and the four columns, every
   few seconds while on screen. Rows are absolutely placed, so the CSS transitions animate the
   move; threads that are not in the list wait under it, hidden, and rise into their columns. */
import { on, prefersReducedMotion, q, qa, timers, watch } from '../lib/motion.js';

const COLS = ['waiting', 'progress', 'later', 'done'];
/* a stopped thread still needs you: it sits in the first column */
const column = r => (r.getAttribute('data-state') === 'stopped' ? 'waiting' : r.getAttribute('data-state'));

export default function startBoardDemo(s) {
  const REDUCE = prefersReducedMotion();
  const tm = timers();
  const stage = q(s, '.ist'), rows = qa(stage, '.tr'), cols = qa(stage, '.gh');
  let board = false, busy = false, auto = null, maxD = 0;

  function layout() {
    const W = stage.clientWidth, pad = W < 600 ? 12 : 24, gap = 12, cw = (W - 2 * pad - 3 * gap) / 4;
    cols.forEach((c, ci) => { c.style.left = (pad + ci * (cw + gap)) + 'px'; c.style.top = '8px'; c.style.width = cw + 'px'; });
    if (!board) {
      const rh = 54, top = 84;
      let k = 0;
      rows.forEach((r, i) => {
        const listed = column(r) === 'waiting';
        r.setAttribute('data-view', 'row'); r.setAttribute('data-out', listed ? 'no' : 'yes');
        r.style.cssText = '--d:' + (Math.min(i, 14) * 0.016).toFixed(3) + 's;left:0;top:' + (top + (listed ? k++ : 9) * rh) + 'px;width:' + W + 'px;height:' + rh + 'px';
      });
      maxD = 14 * 0.016;
    } else {
      const ch = 96, cg = 10, head = 54;
      maxD = 0;
      COLS.forEach((st, ci) => {
        const x = pad + ci * (cw + gap);
        let n = 0;
        rows.forEach(r => {
          if (column(r) !== st) return;
          const d = 0.03 + ci * 0.05 + Math.min(n, 6) * 0.03;
          r.setAttribute('data-view', 'card'); r.setAttribute('data-out', 'no');
          r.style.cssText = '--d:' + d.toFixed(3) + 's;left:' + x + 'px;top:' + (head + n * (ch + cg)) + 'px;width:' + cw + 'px;height:' + ch + 'px';
          maxD = Math.max(maxD, d); n++;
        });
      });
    }
  }
  function set(v) {
    if (busy || v === board) return;
    busy = true;
    rows.forEach(r => r.setAttribute('data-fx', 'swap'));
    tm.set(() => {
      board = v; s.classList.toggle('is-board', v); layout();
      /* the words come back only once every card has landed, so nothing is drawn mid flight */
      tm.set(() => { rows.forEach(r => r.setAttribute('data-fx', 'none')); busy = false; }, REDUCE ? 0 : Math.round(660 + maxD * 1000));
    }, REDUCE ? 0 : 140);
  }

  layout();
  const offResize = on(window, 'resize', layout);
  const unwatch = watch(s, v => {
    if (REDUCE) return;
    if (v && !auto) { tm.set(() => set(true), 1400); auto = setInterval(() => set(!board), 4200); }
    if (!v && auto) { clearInterval(auto); auto = null; }
  });
  return () => { offResize(); unwatch(); clearInterval(auto); tm.clearAll(); };
}
