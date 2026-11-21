/* The inbox demo: one task at a time, answered with option 1, 2, 3 or a reply. It plays
   itself, slowly, on a loop while on screen; components are switched by their data-* states. */
import { prefersReducedMotion, q, qa, timers, watch } from '../lib/motion.js';

const TASKS = [
  { keys: ['SQLite', 'Sync server'], way: 1, opts: [{ go: 'Building it with SQLite' }, { go: 'Building the sync server' }], reply: 'Go with SQLite, and keep the schema ready for sync later.' },
  { keys: ['Merge it', 'Change it'], code: 1, opts: [{ go: 'Merging into main', done: 'Merged into main' }, { go: 'Back with the agent' }], reply: 'Also cover an undo on the last row.' },
  { keys: ['All clear', 'Big zero', 'Recap'], design: 1, opts: [{ go: 'Building All clear' }, { go: 'Building the big zero' }, { go: 'Building the recap' }], reply: 'None of these yet. Try one that shows what is still running.' },
  { keys: ['Publish', 'Shorter'], doc: 1, opts: [{ go: 'Publishing', done: 'Published' }, { go: 'Making them shorter' }], reply: 'Put the fixes first.' },
];
/* the answer the demo gives to each task, in order */
const SCRIPT = ['1', '1', '2', 'r'];
const P = { done: 1000, hold: 1500, holdDone: 2000, tmin: 30, tvar: 34, sent: 450, after: 1300 };

export default function startInboxDemo(S) {
  const tm = timers();
  const calmEl = q(S, '.calm'), toast = q(S, '.ts'), nb = q(S, '.nbr'), stA = q(S, '.stk.a'), stB = q(S, '.stk.b');
  const T = qa(S, '.task').map((el, i) => {
    const rows = qa(el, '.or');
    return {
      ...TASKS[i], el, it: q(el, '.it'), rows,
      init: rows.map(r => ({ s: r.getAttribute('data-state'), l: q(r, '.olb').textContent, n: q(r, '.onote').textContent })),
    };
  });
  let cur = -1, view = 'thread', handled = [], busy = false, pend = [], toastT, calmT;
  const later = (ms, f) => { const h = tm.set(f, ms); pend.push(h); return h; };
  const clearPend = () => { pend.forEach(tm.clear); pend = []; };
  const live = (d, state, text) => { d.it.setAttribute('data-live', state); q(d.it, '.lv span').textContent = text; };
  const markSent = row => { row.setAttribute('data-state', 'sent'); q(row, '.onote').textContent = 'Sent'; };

  function clean(i) {
    const d = T[i];
    d.rows.forEach((r, j) => { r.setAttribute('data-state', d.init[j].s); r.setAttribute('data-nudge', 'no'); q(r, '.olb').textContent = d.init[j].l; q(r, '.onote').textContent = d.init[j].n; });
    live(d, 'none', '');
    qa(d.el, '.cc,.dt').forEach(c => c.setAttribute('data-pick', 'none'));
    q(d.el, '.codeph')?.classList.remove('open');
    q(d.el, '.vcc')?.classList.remove('press');
    q(d.el, '.stamp')?.classList.remove('on');
  }
  const needs = () => T.flatMap((_, i) => (handled[i] ? [] : [i]));
  function counts() {
    const n = needs().length;
    q(nb, 'b').textContent = n; nb.setAttribute('data-empty', n ? 'no' : 'yes');
    const behind = view === 'thread' ? Math.max(0, n - (handled[cur] ? 0 : 1)) : 0;
    stA.classList.toggle('gone', behind < 1); stB.classList.toggle('gone', behind < 2);
    if (view === 'thread') qa(nb, '.nm')[1].textContent = (4 - n + (handled[cur] ? 0 : 1)) + ' of 4';
  }
  function showToast(label) {
    q(toast, 'b').textContent = label; toast.setAttribute('data-show', 'yes');
    tm.clear(toastT); toastT = tm.set(() => toast.setAttribute('data-show', 'no'), 4200);
  }
  function leave(el) { el.classList.remove('on'); el.classList.add('out'); tm.set(() => el.classList.remove('out'), 700); }
  function open(i) {
    tm.clear(calmT); view = 'thread'; calmEl.classList.remove('on');
    const old = cur >= 0 ? T[cur].el : null;
    if (old && old !== T[i].el) leave(old);
    cur = i; clean(i);
    const el = T[i].el; el.classList.remove('out'); void el.offsetWidth; el.classList.add('on');
    counts();
    if (T[i].code) {
      later(1100, () => {
        if (cur !== i) return;
        q(el, '.vcc').classList.add('press');
        later(260, () => { if (cur === i) q(el, '.codeph').classList.add('open'); });
      });
    }
  }
  /* after the last task: a short calm moment, never a list, then the first task again */
  function calm() {
    view = 'calm';
    if (cur >= 0) leave(T[cur].el);
    cur = -1; calmEl.classList.add('on'); counts();
    tm.clear(calmT); calmT = tm.set(reset, 3000);
  }
  function advance() {
    busy = false; clearPend();
    const n = needs();
    if (!n.length) { calm(); return; }
    const nx = n.find(i => i > cur);
    open(nx ?? n[0]);
  }
  function record(i) { handled[i] = true; counts(); }
  function choose(n) {
    const d = T[cur], o = d.opts[n - 1]; if (!o) return;
    busy = true; pend = [];
    const row = d.rows[n - 1]; markSent(row);
    if (d.way || d.design) qa(d.el, d.way ? '.cc' : '.dt').forEach((c, j) => c.setAttribute('data-pick', j === n - 1 ? 'picked' : 'dim'));
    else { const st = q(d.el, '.stamp'); if (st) { st.textContent = 'Sent · ' + d.keys[n - 1]; st.classList.add('on'); } }
    live(d, 'go', o.go);
    if (o.done) later(P.done, () => live(d, 'ok', o.done));
    record(cur); showToast(q(row, '.olb').textContent);
    later(o.done ? P.holdDone : P.hold, advance);
  }
  function reply() {
    busy = true; pend = [];
    const i = cur, d = T[i], rep = d.rows[d.rows.length - 1], tx = q(rep, '.olb'), txt = d.reply;
    let n = 0;
    rep.setAttribute('data-state', 'typing'); tx.textContent = '';
    function send() {
      tx.textContent = txt; markSent(rep);
      live(d, 'go', 'Back with the agent');
      record(i); showToast('your reply');
    }
    (function type() {
      n += 1; tx.textContent = txt.slice(0, n);
      if (n < txt.length) { later(P.tmin + Math.random() * P.tvar, type); return; }
      later(P.sent, () => { send(); later(P.after, advance); });
    })();
  }
  function reset() { clearPend(); handled = T.map(() => false); busy = false; toast.setAttribute('data-show', 'no'); open(0); }
  function act(k) {
    if (view === 'calm') { reset(); return; }
    if (busy || handled[cur]) return;
    if (k === 'r') reply(); else choose(+k);
  }
  reset();
  if (prefersReducedMotion()) return () => tm.clearAll();

  let inView = false, autoT = null;
  const dwell = i => (T[i].code ? 6400 : T[i].design ? 5600 : 4800);
  /* flash the option about to be picked */
  function nudge(k) {
    if (view !== 'thread') return;
    const d = T[cur], r = k === 'r' ? d.rows[d.rows.length - 1] : d.rows[+k - 1];
    if (r) { r.setAttribute('data-nudge', 'yes'); tm.set(() => r.setAttribute('data-nudge', 'no'), 900); }
  }
  function schedule(ms) { tm.clear(autoT); autoT = null; if (inView) autoT = tm.set(step, ms); }
  function step() {
    autoT = null; if (!inView) return;
    if (busy || view !== 'thread') { schedule(700); return; }
    const i = cur, k = SCRIPT[i], left = needs().length;
    nudge(k); tm.set(() => { if (inView && cur === i) act(k); }, 650);
    const o = T[i].opts[+k - 1], move = k === 'r' ? 650 + T[i].reply.length * 47 + P.sent + P.after : 650 + (o && o.done ? P.holdDone : P.hold);
    const nx = needs().find(j => j > i);
    schedule(left <= 1 ? move + 3000 + 400 + dwell(0) : move + 400 + dwell(nx ?? needs()[0]));
  }
  const unwatch = watch(S, v => {
    if (v === inView) return;
    inView = v;
    if (v) schedule(3400); else { tm.clear(autoT); autoT = null; }
  }, 0.35);
  return () => { unwatch(); tm.clearAll(); };
}
