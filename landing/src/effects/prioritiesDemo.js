/* Priorities: one task is made Urgent through Command K, rises under its own heading, and
   the agents follow. Plays on a loop while on screen; off screen it rests on the end state. */
import { prefersReducedMotion, q, qa, timers, watch } from '../lib/motion.js';

/* the table head sits above the rows; a section name is a row of its own */
const TOP = 84, RH = 54, GH = 40;

export default function startPrioritiesDemo(s) {
  const tm = timers();
  const stage = q(s, '.pst'), pal = q(s, '.pal'), ptx = q(pal, '.ptx'), cmds = qa(pal, '.cr');
  const [ghU, ghR] = qa(stage, '.gh');
  const A = qa(stage, '.tr').map(el => ({ el, lv: el.getAttribute('data-priority'), run: q(el, '.s').textContent }));
  const star = A[4], bump = A[2];
  let urgent = false;

  function state(r, st, t) { r.el.setAttribute('data-state', st); q(r.el, '.s').textContent = t; }
  function layout() {
    let y = TOP;
    ghU.classList.toggle('on', urgent); ghR.classList.toggle('on', urgent);
    if (urgent) { ghU.style.top = y + 'px'; y += GH; star.el.style.top = y + 'px'; y += RH; ghR.style.top = y + 'px'; y += GH; }
    else { ghU.style.top = TOP + 'px'; ghR.style.top = (TOP + RH) + 'px'; }
    A.forEach(r => { r.el.style.height = RH + 'px'; if (urgent && r === star) return; r.el.style.top = y + 'px'; y += RH; });
  }
  function base() {
    urgent = false;
    A.forEach((r, i) => {
      r.el.setAttribute('data-priority', r.lv); r.el.setAttribute('data-sel', 'no'); r.el.setAttribute('data-fx', 'none');
      if (i < 3) state(r, 'working', r.run); else state(r, 'queued', i === 3 ? 'Up next' : 'Queued');
    });
    layout();
  }
  function after() {
    urgent = true; star.el.setAttribute('data-priority', 'urgent');
    A.forEach(r => { r.el.setAttribute('data-sel', 'no'); r.el.setAttribute('data-fx', 'none'); });
    state(star, 'working', 'Working'); state(bump, 'paused', 'Paused'); state(A[3], 'queued', 'Queued');
    layout();
  }
  /* the palette filters its commands by word prefix and selects the first match */
  function palette(typed) {
    ptx.textContent = typed;
    const words = typed.toLowerCase().split(/\s+/).filter(Boolean);
    let first = true;
    cmds.forEach(c => {
      const l = q(c, '.cl').textContent.toLowerCase(), hit = words.every(w => l.split(' ').some(x => x.startsWith(w)));
      c.style.display = hit ? '' : 'none'; c.setAttribute('data-sel', hit && first ? 'yes' : 'no'); q(c, '.ck').textContent = hit && first ? '↵' : ''; c.setAttribute('data-fx', 'none');
      if (hit) first = false;
    });
  }
  /* apply a state with no transitions */
  function snap(fn) { stage.classList.add('snap'); fn(); void stage.offsetHeight; stage.classList.remove('snap'); }

  snap(base);
  if (prefersReducedMotion()) { snap(after); return () => {}; }

  let running = false;
  const at = (ms, f) => tm.set(f, ms);
  function play() {
    tm.clearAll();
    stage.classList.remove('k', 'fade'); pal.setAttribute('data-show', 'no'); snap(base);
    /* the cursor walks down to the sign in bug */
    at(900, () => A[3].el.setAttribute('data-sel', 'yes'));
    at(1350, () => { A[3].el.setAttribute('data-sel', 'no'); star.el.setAttribute('data-sel', 'yes'); });
    /* Command K, "urg", Enter */
    at(2100, () => { palette(''); stage.classList.add('k'); pal.setAttribute('data-show', 'yes'); });
    [...'urg'].forEach((_, c) => at(2500 + (c + 1) * 120, () => palette('urg'.slice(0, c + 1))));
    at(3350, () => cmds.find(c => c.getAttribute('data-sel') === 'yes')?.setAttribute('data-fx', 'run'));
    at(3550, () => { stage.classList.remove('k'); pal.setAttribute('data-show', 'no'); star.el.setAttribute('data-priority', 'urgent'); star.el.setAttribute('data-fx', 'pop'); });
    /* it rises to the top under its own heading */
    at(4250, () => { star.el.setAttribute('data-fx', 'lift'); urgent = true; layout(); });
    at(5100, () => { star.el.setAttribute('data-fx', 'none'); star.el.setAttribute('data-sel', 'no'); });
    /* and the agents follow the order: it takes a slot, the lowest running task waits its turn */
    at(5500, () => { state(bump, 'paused', 'Paused'); state(A[3], 'queued', 'Queued'); });
    at(6000, () => state(star, 'working', 'Working'));
    at(11800, () => stage.classList.add('fade'));
    at(12400, () => { stage.classList.remove('fade'); play(); });
  }
  function stop() { running = false; tm.clearAll(); stage.classList.remove('k', 'fade'); pal.setAttribute('data-show', 'no'); snap(after); }
  const unwatch = watch(stage, v => {
    if (v && !running) { running = true; play(); }
    if (!v && running) stop();
  }, 0.35);
  return () => { unwatch(); tm.clearAll(); };
}
