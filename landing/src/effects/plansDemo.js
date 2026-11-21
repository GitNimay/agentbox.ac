/* Your own plan: tasks flow out of the app to Claude Code and Codex. Each new task lands on
   top of its card, the oldest leaves, and the weekly usage creeps up. */
import { prefersReducedMotion, q, qa, timers, watch } from '../lib/motion.js';

const TASKS = {
  claude: ['Snooze survives a restart', 'Dark mode flashes white on launch', 'Untangle the auth middleware', 'Flaky e2e on CI', 'Tray icon blurry on Retina'],
  codex: ['Search misses archived threads', 'Blog RSS feed', 'Usage meter onto the billing week', 'Export a thread as markdown', 'Settings page loses focus'],
};

export default function startPlansDemo(s) {
  const tm = timers();
  const sides = {};
  for (const k of Object.keys(TASKS)) {
    const card = q(s, `[data-e="${k}"]`);
    if (!card) continue;
    const list = qa(card, '.pj'), bars = qa(card, '.pbar i'), pv = qa(card, '.pv');
    const d = { card, tasks: TASKS[k], list, n: 2, tpl: list[0].cloneNode(true), bars, pv, p: pv.map(b => parseInt(b.textContent, 10)) };
    d.bars.forEach((b, i) => { b.style.width = d.p[i] + '%'; });
    d.list.forEach((r, i) => { r.style.transform = 'translateY(' + (i * 42) + 'px)'; });
    sides[k] = d;
  }
  function send(k) {
    const d = sides[k];
    tm.set(() => {
      /* the oldest one finishes and leaves, the new one lands on top */
      const old = d.list.pop(); old.style.opacity = '0'; old.style.transform = 'translateY(84px)'; tm.set(() => old.remove(), 650);
      d.list.forEach(r => { r.setAttribute('data-fx', 'none'); r.style.transform = 'translateY(42px)'; });
      const r = d.tpl.cloneNode(true); q(r, '.pjl').textContent = d.tasks[d.n++ % d.tasks.length];
      r.setAttribute('data-fx', 'new'); r.style.opacity = '0'; r.style.transform = 'translateY(-40px)';
      q(d.card, '.prows').appendChild(r); void r.offsetWidth; r.style.opacity = '1'; r.style.transform = 'translateY(0)'; d.list.unshift(r);
      /* each piece of work uses a little of that plan */
      d.p = d.p.map((v, i) => Math.min(i ? 96 : 92, v + (i ? 1 : 2)));
      d.bars.forEach((b, i) => { b.style.width = d.p[i] + '%'; });
      d.pv.forEach((b, i) => { b.textContent = d.p[i] + '%'; });
    }, 900);
  }
  const names = Object.keys(sides);
  if (prefersReducedMotion() || !names.length) return () => {};

  let timer = null, turn = 0;
  function loop() { send(names[turn++ % names.length]); timer = tm.set(loop, 2600); }
  const unwatch = watch(s, v => {
    if (v && !timer) timer = tm.set(loop, 900);
    if (!v && timer) { tm.clear(timer); timer = null; }
  });
  return () => { unwatch(); tm.clearAll(); };
}
