/* Agentbox landing page. Each section's script is its own IIFE and only touches its own section. */

/* ===== Hero: one task at a time, answered with 1, 2, 3 or R ===== */
(function () {
  var s = document.getElementById('hero'); if (!s) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function q(r, sel) { return r.querySelector(sel); }
  function qa(r, sel) { return Array.prototype.slice.call(r.querySelectorAll(sel)); }
  function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function frac(el) { var r = el.getBoundingClientRect(), vh = window.innerHeight || 800; var v = Math.min(r.bottom, vh) - Math.max(r.top, 0); return v <= 0 ? 0 : v / Math.min(r.height || 1, vh); }

  if (reduce || !('IntersectionObserver' in window)) s.classList.add('on');
  else new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) s.classList.add('on'); }); }, { threshold: 0.05 }).observe(s);

  // On a wide screen the headline stays one line.
  var h1 = q(s, 'h1'), l1 = q(h1, '.l1');
  function fit() {
    h1.style.fontSize = '';
    if ((window.innerWidth || 1440) <= 860) return;
    var fs = parseFloat(getComputedStyle(h1).fontSize);
    for (var n = 0; n < 30 && fs > 44; n++) {
      var lh = parseFloat(getComputedStyle(h1).lineHeight) || fs * .98;
      if (l1.offsetHeight < lh * 1.5) break;
      fs -= 2; h1.style.fontSize = fs + 'px';
    }
  }
  fit(); window.addEventListener('resize', fit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);

  /* ---------- the four tasks that need you, highest priority first ---------- */
  var ICON = {
    doc: '<svg viewBox="0 0 14 14" fill="none" stroke="#c4bdb8" stroke-width="1.1"><path d="M3 1.5h5.5L11 4v8.5H3z"/><path d="M8.5 1.5V4H11M5 7h4M5 9.3h4"/></svg>',
    grid: '<svg viewBox="0 0 14 14" fill="none" stroke="#c4bdb8" stroke-width="1.1"><rect x="1.5" y="3" width="3.2" height="8"/><rect x="5.4" y="3" width="3.2" height="8"/><rect x="9.3" y="3" width="3.2" height="8"/></svg>',
    code: '<svg viewBox="0 0 14 14" fill="none" stroke="#c4bdb8" stroke-width="1.2"><path d="M5 4 2 7l3 3M9 4l3 3-3 3"/></svg>'
  };
  function L(n, sign, code) { var c = sign === '+' ? 'ad' : sign === '-' ? 'rm' : ''; return '<div class="' + c + '"><em>' + n + '</em><i>' + (sign === ' ' ? '' : sign) + '</i><span>' + esc(code) + '</span></div>'; }
  var T = [
    { proj: 'desktop', pr: 'h', tm: '4m', title: 'Offline mode for the desktop app', line: 'Two ways to build it, written up. Which should I build?',
      who: 'Claude Code · came back 4 min ago',
      did: 'Offline mode can go two ways, and the choice shapes everything after it. I wrote both up in approach.md.', ask: 'Which should I build?', q: 'Which should I build',
      opts: [{ l: 'SQLite on the device', k: 'SQLite', rec: 1, kind: 'build', go: 'Building it with SQLite' }, { l: 'A sync server', k: 'Sync server', kind: 'build', go: 'Building the sync server' }],
      reply: 'Go with SQLite, and keep the schema ready for sync later.',
      pane: { kind: 'doc', tab: 'approach.md', meta: 'Written by the agent', html:
        '<div class="doc"><h4>Offline mode, two ways</h4><p>The app opens, reads and saves with no network, then catches up when it is back.</p>' +
        '<div class="way" data-k="1"><strong><kbd>1</kbd>SQLite on the device<em>Recommended</em></strong><p>Reads and writes go to a local database first and sync in the background. The smallest change to the app.</p></div>' +
        '<div class="way" data-k="2"><strong><kbd>2</kbd>A sync server</strong><p>A server holds the truth and each device keeps a cache. Stronger across many devices, and one more service to run.</p></div>' +
        '<table><tr><th></th><th>SQLite</th><th>Sync server</th></tr>' +
        '<tr><td>Works with no network</td><td class="g">Fully</td><td>Reads only</td></tr>' +
        '<tr><td>New service to run</td><td class="g">None</td><td>One</td></tr>' +
        '<tr><td>Many devices</td><td>Later</td><td class="g">Built in</td></tr></table></div>' } },
    { proj: 'desktop', pr: 'h', tm: '12m', code: true, title: 'J and K stop skipping rows after undo', line: 'Fixed, with a test. 48 passed. Merge it?',
      who: 'Claude Code · came back 12 min ago',
      did: 'The cursor kept its old position after an undo, so the next J jumped a row. It now finds its row again, with a test for it.', ask: 'Tests pass. Merge it?', q: 'Merge the cursor fix',
      opts: [{ l: 'Merge it', k: 'Merge it', rec: 1, kind: 'merge', go: 'Merging into main', done: 'Merged into main' }, { l: 'Change it first', k: 'Change it', kind: 'back', go: 'Back with the agent' }],
      reply: 'Also cover an undo on the last row.',
      pane: { kind: 'code', tab: 'Code changes', meta: '<b>+9</b><s>&minus;1</s>', html:
        '<div class="codev"><div class="tests">48 passed &middot; 0 failed<span>npm test</span></div>' +
        '<div class="fl"><span>src/list/cursor.ts</span><span class="mono"><b>+3</b><s>&minus;1</s></span></div><pre>' +
        L(41, ' ', 'export function afterUndo(rows, cursor) {') + L(42, '-', '  return cursor.index') +
        L(42, '+', '  const at = rows.findIndex((r) => r.id === cursor.id)') + L(43, '+', '  if (at === -1) return Math.min(cursor.index, rows.length - 1)') +
        L(44, '+', '  return at') + L(45, ' ', '}') + '</pre>' +
        '<div class="fl"><span>tests/undo-keeps-the-cursor.test.ts</span><span class="mono"><b>+6</b></span></div><pre>' +
        L(12, '+', "it('lands on the next row after an undo', () => {") + L(13, '+', '  const rows = list(5)') + L(14, '+', '  undo(close(rows, 2))') +
        L(15, '+', '  expect(next(rows)).toBe(rows[3])') + L(16, '+', '})') + '</pre></div>' +
        '<div class="codeph"><span>The code change opens here when you want it.</span><span class="vcc"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M5 4 2 7l3 3M9 4l3 3-3 3"/></svg>View code changes</span></div>' } },
    { proj: 'desktop', pr: 'm', tm: '9m', design: true, title: 'Redesign the empty inbox', line: 'Three takes, drawn inside the app. Pick one.',
      who: 'Codex · came back 9 min ago',
      did: 'I drew three takes on the empty inbox, inside the app itself.', ask: 'Pick one and I will build it.', q: 'Pick a design',
      opts: [{ l: 'All clear', k: 'All clear', kind: 'build', go: 'Building All clear' }, { l: 'A big zero', k: 'Big zero', kind: 'build', go: 'Building the big zero' }, { l: 'A recap of today', k: 'Recap', kind: 'build', go: 'Building the recap' }],
      reply: 'None of these yet. Try one that shows what is still running.',
      pane: { kind: 'designs', tab: 'Empty inbox', meta: 'Drawn in your app' } },
    { proj: 'site', pr: 'l', tm: 'now', title: 'Release notes for 0.9', line: 'A draft from everything merged since 0.8. Publish them?',
      who: 'Claude Code · came back just now',
      did: 'I drafted the 0.9 notes from everything that merged since 0.8, in plain words.', ask: 'Publish them?', q: 'Publish the notes',
      opts: [{ l: 'Publish them', k: 'Publish', rec: 1, kind: 'pub', go: 'Publishing', done: 'Published' }, { l: 'Make them shorter', k: 'Shorter', kind: 'back', go: 'Making them shorter' }],
      reply: 'Put the fixes first.',
      pane: { kind: 'doc', tab: 'release-notes-0.9.md', meta: 'Draft', html:
        '<div class="doc"><h4>Version 0.9</h4><small>Drafted by the agent</small>' +
        '<h5>New</h5><ul><li class="new">Export any thread as markdown.</li><li class="new">The window remembers its size and place.</li></ul>' +
        '<h5>Fixed</h5><ul><li>J and K no longer skip a row after an undo.</li><li>Snoozed threads stay snoozed after a restart.</li><li>The unread count is right again.</li></ul>' +
        '<p style="margin-top:18px">Thanks to everyone who sent in a bug this month.</p></div>' } }
  ];
  var DESIGNS = [
    '<div class="dbd"><div class="dico"><i></i><i></i><i></i></div><div class="dbig">All clear</div><div class="dmono">Nothing needs you</div></div>',
    '<div class="dbd"><div class="dzero">0</div><div class="dmono">Need you</div><div class="dbar"></div><div class="dmono">12 done today</div></div>',
    '<div class="dbd drecap"><div class="dmono">Today</div><h6>You are all caught up</h6><p>Merged<b>9</b></p><p>Published<b>2</b></p><p>Being built<b>1</b></p></div>'
  ];
  function paneHTML(t) {
    var p = t.pane, body;
    if (p.kind === 'designs') {
      body = '<div class="dsx"><div class="ds">' + t.opts.map(function (o, j) {
        return '<button type="button" class="dz" data-k="' + (j + 1) + '" aria-label="Design ' + (j + 1) + ', ' + esc(o.l) + '"><div class="dw">' +
          '<div class="dwb"><u></u><u></u><u></u></div><div class="dih">Inbox<span>Needs you</span></div>' + DESIGNS[j] + '</div>' +
          '<div class="dl2"><kbd>' + (j + 1) + '</kbd></div></button>';
      }).join('') + '</div></div>';
    } else body = p.html;
    return '<div class="rp' + (p.kind === 'code' ? ' code' : '') + '"><div class="pb"><span class="tab">' + ICON[p.kind === 'designs' ? 'grid' : p.kind] + esc(p.tab) + '</span><span class="mono">' + p.meta + '</span></div>' +
      '<div class="pc">' + body + (p.kind === 'doc' ? '<div class="stamp">Sent</div>' : '') + '</div></div>';
  }
  function threadHTML(t) {
    return '<div class="lp"><div class="meta mono">' + esc(t.who) + '</div><h3>' + esc(t.title) + '</h3>' +
      '<p>' + esc(t.did) + '<b>' + esc(t.ask) + '</b></p><div class="live"><i></i><span></span></div>' +
      '<div class="opts"><div class="q mono">' + esc(t.q) + '</div>' + t.opts.map(function (o, j) {
        return '<div class="o" data-k="' + (j + 1) + '"><kbd>' + (j + 1) + '</kbd><span>' + esc(o.l) + '</span><span class="rec">' + (o.rec ? 'Recommended' : '') + '</span></div>';
      }).join('') + '<div class="rep" data-k="r"><kbd>R</kbd><span class="tx" data-ph="Reply to the agent"></span><span class="sent">Sent</span></div></div></div>' + paneHTML(t);
  }
  /* ---------- state ---------- */
  var body = q(s, '.body'), stage = q(s, '.stage'), toast = q(s, '.toast'), klist = q(s, '.kl-list'), calmEl = q(s, '.calm');
  var needEl = q(s, '[data-c="need"]'), posEl = q(s, '[data-pos]');
  var view = 'thread', cur = -1, el = null, handled, order, last, busy, timers = [], pend = [], calmT = null, toastT = null, keySig = '';

  function later(ms, fn, list) { var h = setTimeout(fn, reduce ? Math.min(ms, 60) : ms); (list || timers).push(h); return h; }
  function needs() { var a = []; T.forEach(function (t, i) { if (!handled[i]) a.push(i); }); return a; }
  function counts() {
    var n = needs().length;
    needEl.textContent = n; needEl.classList.toggle('z', !n);
    var behind = view === 'thread' ? Math.max(0, n - (handled[cur] ? 0 : 1)) : 0;
    qa(s, '.stk').forEach(function (k) { k.classList.toggle('gone', (k.classList.contains('a') ? 1 : 2) > behind); });
    if (view === 'thread') posEl.textContent = (T.length - n + (handled[cur] ? 0 : 1)) + ' of ' + T.length;
  }

  /* the keys on the left follow what is on screen */
  function keyList() {
    var t = T[cur], ks = t.opts.map(function (o, j) { return { k: String(j + 1), cap: String(j + 1), t: o.k, off: !!handled[cur], rec: !!o.rec && !handled[cur] }; });
    ks.push({ k: 'r', cap: 'R', t: 'Reply', off: !!handled[cur] });
    return { lbl: 'In a task', keys: ks };
  }
  // The calm moment shows no keys (the column fades out and keeps its space); a task brings its own keys in.
  function keys() {
    if (view !== 'thread') { keySig = ''; return; }
    var hidden = !keySig, L2 = keyList(), sig = L2.lbl + L2.keys.map(function (k) { return k.k + k.t; }).join('|'), redraw = sig !== keySig;
    function paint() {
      L2 = keyList();
      klist.innerHTML = L2.keys.map(function (k) {
        return '<button class="k' + (k.off ? ' off' : '') + (k.rec ? ' rec' : '') + '" type="button" data-k="' + k.k + '" aria-label="' + (k.aria || k.cap) + ', ' + esc(k.t) + '"><span class="cap">' + k.cap + '</span><span class="t">' + esc(k.t) + '</span></button>';
      }).join('');
    }
    if (!redraw) { L2.keys.forEach(function (k) { var b = q(klist, '[data-k="' + k.k + '"]'); if (b) { b.classList.toggle('off', !!k.off); b.classList.toggle('rec', !!k.rec); } }); return; }
    keySig = sig;
    if (reduce || hidden || !klist.children.length) { paint(); return; }
    klist.classList.add('swap');
    setTimeout(function () { paint(); klist.classList.remove('swap'); }, 120);
  }
  function press(k) {
    var b = q(klist, '[data-k="' + k + '"]'); if (!b || b.classList.contains('off')) return;
    b.classList.add('down'); setTimeout(function () { b.classList.remove('down'); }, 170);
  }
  function showToast(label) {
    q(toast, '.tt').innerHTML = 'Sent <b>' + esc(label) + '</b> to the agent';
    toast.classList.add('on'); clearTimeout(toastT);
    toastT = setTimeout(function () { toast.classList.remove('on'); }, reduce ? 2500 : 4200);
  }

  /* ---------- moving from task to task ---------- */
  function open(i) {
    var fromCalm = view === 'calm';
    clearTimeout(calmT); calmT = null;
    view = 'thread'; cur = i; s.classList.add('vth'); calmEl.classList.remove('on');
    var old = el;
    if (old) { old.classList.add('out'); setTimeout(function () { old.remove(); }, 700); if (!fromCalm) { stage.classList.add('adv'); setTimeout(function () { stage.classList.remove('adv'); }, 420); } }
    el = document.createElement('article'); el.className = 'th pre'; el.innerHTML = threadHTML(T[i]);
    body.insertBefore(el, toast); void el.offsetWidth; el.classList.remove('pre');
    counts(); keys();
    if (T[i].code) {
      var rp = q(el, '.rp'), vcc = q(el, '.vcc'), mine = el;
      later(1100, function () { if (el !== mine) return; vcc.classList.add('press'); later(260, function () { if (el === mine) rp.classList.add('open'); }); });
    }
  }
  // After the last task: a short calm moment, never a list, then the first task again.
  var CALM = 3000;
  function calm() {
    view = 'calm'; s.classList.remove('vth');
    if (el) { var old = el; old.classList.add('out'); setTimeout(function () { old.remove(); }, 700); el = null; }
    cur = -1; calmEl.classList.add('on'); counts(); keys();
    clearTimeout(calmT); calmT = setTimeout(reset, reduce ? 2500 : CALM);
  }
  function advance() {
    var need = needs(); if (!need.length) { calm(); return; }
    var nx = need.filter(function (i) { return i > cur; })[0]; open(nx != null ? nx : need[0]);
  }
  function record(i, h) { h.at = ++order; handled[i] = h; last = i; counts(); keys(); }

  // A key you press answers at once and the next task is in front of you in under half a
  // second. When the page plays on its own it holds on the answer longer, so it reads calmly.
  var FAST = { done: 220, hold: 380, holdDone: 460, typeMin: 5, typeVar: 4, sent: 80, after: 260 };
  var SLOW = { done: 1000, hold: 1500, holdDone: 2000, typeMin: 30, typeVar: 34, sent: 450, after: 1300 };
  var fin = null;
  function finish() { if (!fin) return; var f = fin; fin = null; pend.forEach(clearTimeout); pend = []; f(); }
  function choose(n, auto) {
    var t = T[cur], o = t.opts[n - 1]; if (!o) return;
    var P = auto ? SLOW : FAST;
    busy = true; pend = [];
    var th = el, row = q(th, '.o[data-k="' + n + '"]');
    row.classList.add('pick'); q(row, '.rec').textContent = 'Sent'; q(th, '.opts').classList.add('done');
    if (t.design) { var ds = q(th, '.ds'); ds.classList.add('picked'); qa(ds, '.dz')[n - 1].classList.add('on'); }
    var way = q(th, '.way[data-k="' + n + '"]'); if (way) { way.classList.add('on'); q(th, '.doc').classList.add('picked'); }
    var st = q(th, '.stamp'); if (st && !way) { st.textContent = 'Sent · ' + o.k; st.classList.add('on'); }
    var live = q(th, '.live'), lt = q(live, 'span');
    live.className = 'live go'; lt.textContent = o.go;
    if (o.done) later(P.done, function () { live.className = 'live ok'; lt.textContent = o.done; }, pend);
    record(cur, { kind: o.kind, go: o.go, done: o.done });
    showToast(o.l);
    fin = function () { busy = false; advance(); };
    later(o.done ? P.holdDone : P.hold, finish, pend);
  }
  function reply(auto) {
    var P = auto ? SLOW : FAST;
    busy = true; pend = [];
    var i = cur, th = el, rep = q(th, '.rep'), tx = q(rep, '.tx'), txt = T[i].reply, n = 0, sent = false;
    rep.classList.add('on'); q(th, '.opts').classList.add('done');
    function send() {
      if (sent) return; sent = true;
      tx.textContent = txt; rep.classList.add('sentok');
      var live = q(th, '.live'); live.className = 'live go'; q(live, 'span').textContent = 'Back with the agent';
      record(i, { kind: 'back', go: 'Back with the agent, with your reply' });
      showToast('your reply');
    }
    fin = function () { send(); busy = false; advance(); };
    (function go() {
      n += reduce ? txt.length : 1; tx.textContent = txt.slice(0, n);
      if (n < txt.length) { later(P.typeMin + Math.random() * P.typeVar, go, pend); return; }
      later(P.sent, function () { send(); later(P.after, finish, pend); }, pend);
    })();
  }
  function undo() {
    if (last == null) return;
    var i = last; last = null;
    pend.forEach(clearTimeout); pend = []; busy = false; fin = null;
    handled[i] = null; toast.classList.remove('on');
    open(i);
  }
  function reset() {
    timers.forEach(clearTimeout); timers = []; pend.forEach(clearTimeout); pend = [];
    handled = T.map(function () { return null; }); order = 0; last = null; busy = false; fin = null;
    toast.classList.remove('on');
    open(0);
  }
  function act(k, auto) {
    press(k);
    if (k === 'z') { undo(); return; }
    if (view === 'calm') { reset(); return; }
    // A key pressed while a task is on its way out brings the next one in now, never a wait.
    if (busy) { if (!auto) finish(); return; }
    if (handled[cur]) return;
    if (k === 'r') reply(auto); else if (/^[123]$/.test(k)) choose(+k, auto);
  }

  reset();

  /* ---------- it plays itself, slowly, until you touch it ---------- */
  var SCRIPT = ['1', '1', '2', 'r'], touched = false, inView = false, autoT = null;
  function dwell(i) { return T[i].code ? 6400 : T[i].design ? 5600 : 4800; }
  function nudge(k) {
    var b = q(klist, '[data-k="' + k + '"]'); if (b) { b.classList.remove('auto'); void b.offsetWidth; b.classList.add('auto'); }
    if (el && view === 'thread') { var o = q(el, '.o[data-k="' + k + '"]') || (k === 'r' && q(el, '.rep')); if (o) o.classList.add('nudge'); }
  }
  function schedule(ms) { clearTimeout(autoT); autoT = null; if (touched || !inView || reduce) return; autoT = setTimeout(step, ms); }
  function step() {
    autoT = null;
    if (touched || !inView) return;
    if (busy) { schedule(700); return; }
    if (view !== 'thread') { schedule(700); return; }
    var i = cur, k = SCRIPT[i], left = needs().length;
    nudge(k); setTimeout(function () { if (!touched && inView && cur === i) act(k, true); }, 650);
    var o = T[i].opts[+k - 1], move = k === 'r' ? 650 + T[i].reply.length * 47 + SLOW.sent + SLOW.after : 650 + (o && o.done ? SLOW.holdDone : SLOW.hold);
    var nx = needs().filter(function (j) { return j > i; })[0];
    schedule(left <= 1 ? move + CALM + 400 + dwell(0) : move + 400 + dwell(nx != null ? nx : needs()[0]));
  }
  function watch() {
    var on = frac(s) >= 0.35; if (on === inView) return; inView = on;
    if (on) schedule(3400); else { clearTimeout(autoT); autoT = null; }
  }
  function touch() { if (touched) return; touched = true; clearTimeout(autoT); autoT = null; }
  if ('IntersectionObserver' in window) new IntersectionObserver(watch, { threshold: [0, .1, .2, .3, .4, .5, .6] }).observe(s);
  window.addEventListener('scroll', watch, { passive: true });
  watch();

  /* ---------- clicks ---------- */
  klist.addEventListener('mousedown', function (e) { e.preventDefault(); });
  klist.addEventListener('click', function (e) { var b = e.target.closest && e.target.closest('.k'); if (!b) return; touch(); act(b.getAttribute('data-k')); });
  body.addEventListener('click', function (e) {
    var t = e.target; if (!t.closest) return;
    if (t.closest('.calm') && view === 'calm') { touch(); reset(); return; }
    var k = t.closest('[data-k]');
    if (k && el && el.contains(k) && view === 'thread') { touch(); act(k.getAttribute('data-k')); return; }
    if (t.closest('.vcc') && el) { touch(); q(el, '.vcc').classList.add('press'); q(el, '.rp').classList.add('open'); }
  });
  q(s, '.undo').addEventListener('click', function () { touch(); act('z'); });

  /* ---------- keys, only while the hero is mostly on screen ---------- */
  document.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey || e.defaultPrevented) return;
    var tg = e.target; if (tg && (tg.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(tg.tagName))) return;
    var k = e.key === 'Enter' ? 'enter' : (e.key && e.key.length === 1 ? e.key.toLowerCase() : '');
    if (!/^(enter|[123rz])$/.test(k)) return;
    if (frac(s) < 0.5) return;
    // Enter on a focused link or button belongs to that link or button.
    if (k === 'enter' && tg && tg.closest && tg.closest('a, button, summary, [role="button"]')) return;
    e.preventDefault();
    if (e.repeat) return;
    touch(); act(k);
  });
})();

/* ===== Inbox or board, Command K, the feature grid, your own plan ===== */
(function () {
'use strict';
var REDUCE = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function q(root, s) { return root.querySelector(s); }
function qa(root, s) { return Array.prototype.slice.call(root.querySelectorAll(s)); }
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
/* how much of an element is on screen, 0 to 1, against the smaller of its height and the viewport */
function visibleFrac(el) {
  var r = el.getBoundingClientRect(), vh = window.innerHeight || 800;
  var vis = Math.min(r.bottom, vh) - Math.max(r.top, 0);
  if (vis <= 0) return 0;
  return vis / Math.min(r.height || 1, vh);
}
function typing(e) {
  var t = e.target;
  if (!t || t === document.body) return false;
  var n = (t.tagName || '').toLowerCase();
  return n === 'input' || n === 'textarea' || n === 'select' || t.isContentEditable;
}
/* run cb once when el is a fraction on screen */
function onceSeen(el, cb, frac) {
  if (!('IntersectionObserver' in window)) { cb(); return; }
  var io = new IntersectionObserver(function (ents) {
    ents.forEach(function (en) { if (en.isIntersecting) { io.disconnect(); cb(); } });
  }, { threshold: frac == null ? 0.3 : frac });
  io.observe(el);
}
/* track whether el is on screen, so loops can pause */
function watch(el, cb) {
  if (!('IntersectionObserver' in window)) { cb(true); return; }
  new IntersectionObserver(function (ents) { ents.forEach(function (en) { cb(en.isIntersecting); }); }, { threshold: 0.15 }).observe(el);
}
function pressKey(el) { if (!el) return; el.classList.add('down'); setTimeout(function () { el.classList.remove('down'); }, 150); }
/* reveal on scroll */
['inbox', 'command-k', 'features', 'plans'].forEach(function (id) {
  var s = document.getElementById(id); if (!s) return;
  qa(s, '.fx-rv').forEach(function (el) { onceSeen(el, function () { el.classList.add('fx-on'); }, 0.15); });
});
/* one keyboard router for the whole part: a handler only ever sees a key while its own
   element is mostly on screen and nobody is typing in a field. */
var KEYS = [];
document.addEventListener('keydown', function (e) {
  if (e.defaultPrevented) return;
  var best = null, bf = 0;
  KEYS.forEach(function (h) { var f = visibleFrac(h.el); if (f > bf) { bf = f; best = h; } });
  if (!best || bf < 0.6) return;
  if (typing(e) && !(best.inside && best.el.contains(e.target))) return;
  if (best.fn(e)) e.preventDefault();
});


/* ---------------- inbox  inbox or board, B flips the same threads between them ---------------- */
(function () {
  var s = document.getElementById('inbox'); if (!s) return;
  var COLS = [['w', 'Waiting'], ['i', 'In progress'], ['l', 'Later'], ['d', 'Done today']];
  var PC = { desktop: '#ee6018', api: '#c4bdb8', site: '#8a7d70' };
  var PR = { u: 'Urgent', h: 'High', m: 'Medium', l: 'Low' };
  var T = [
    ['w', 'Search misses archived threads', 'api', 'u', '6m', 'Now indexed and tested. Merge it?'],
    ['w', 'Dark mode flashes white on launch', 'desktop', 'h', '2m', 'Fixed, tests pass. Merge it?'],
    ['w', 'Usage meter weekly total is off', 'api', 'h', '19m', 'It counted Sunday twice. Merge it?'],
    ['w', 'Redesign the empty inbox', 'desktop', 'm', '11m', 'Three designs for you to pick from.'],
    ['i', 'Crash when a folder is renamed', 'desktop', 'u', '7m', 'Reading src/fs/watcher.ts'],
    ['i', 'J and K skip rows after undo', 'desktop', 'h', '4m', 'Running the list tests'],
    ['i', 'Rate limit the webhook endpoint', 'api', 'm', '3m', 'Editing api/webhooks.ts'],
    ['i', 'Pricing page loads slowly on mobile', 'site', 'm', '9m', 'Profiling the pricing page'],
    ['i', 'Export a thread as markdown', 'desktop', 'l', '1m', 'Writing the export menu'],
    ['l', 'Write the 2.4 changelog', 'site', 'l', 'Tue 9am', 'Starts Tuesday at 9am'],
    ['l', 'Bump Electron to the latest', 'desktop', 'l', 'Mon', 'Snoozed until Monday'],
    ['d', 'Snooze survives a restart', 'desktop', 'h', '12m', 'Merged into main'],
    ['d', 'Retry failed Stripe webhooks', 'api', 'm', '34m', 'Merged into main'],
    ['d', 'Flaky upload test on CI', 'desktop', 'h', '51m', 'Merged, the race is gone'],
    ['d', 'Pick a queue for the email jobs', 'api', 'm', '1h', 'You chose the Postgres queue'],
    ['d', 'Tray icon is blurry on Retina', 'desktop', 'l', '1h', 'Merged into main'],
    ['d', 'Migrate sessions to UUID keys', 'api', 'h', '2h', 'Merged with a migration'],
    ['d', 'Add an RSS feed to the blog', 'site', 'l', '2h', 'Merged into main'],
    ['d', 'Command K matches words in any order', 'desktop', 'm', '3h', 'Merged into main'],
    ['d', 'Upgrade the API to Node 22', 'api', 'm', '4h', 'Merged, CI is green'],
    ['d', 'Fix broken links in the docs', 'site', 'l', '5h', 'Merged, 14 links fixed'],
    ['d', 'Plan the offline mode', 'desktop', 'm', '6h', 'Plan approved'],
    ['d', 'Cache the project list on launch', 'desktop', 'l', '7h', 'Merged into main']
  ];
  var stage = q(s, '.inbox-stage'), scroll = q(s, '.inbox-scroll'), keyB = q(s, '.inbox-b');
  var segBtns = qa(s, '.inbox-seg button');
  var board = false, busy = false, touched = false, onScreen = false, auto = null;
  var cols = COLS.map(function (c) {
    var n = T.filter(function (t) { return t[0] === c[0]; }).length;
    var d = document.createElement('div'); d.className = 'inbox-col c-' + c[0];
    d.innerHTML = '<header><span class="inbox-g"></span>' + c[1] + ' <b>' + n + '</b></header>';
    stage.appendChild(d); return d;
  });
  var fade = document.createElement('div'); fade.className = 'inbox-fade'; fade.setAttribute('aria-hidden', 'true');
  var maxD = 0;
  var cards = T.map(function (t) {
    var d = document.createElement('div'); d.className = 'inbox-c s-' + t[0];
    d.innerHTML = '<div class="inbox-ci"><span class="inbox-g"></span><span class="inbox-t">' + esc(t[1]) + '</span>' +
      '<span class="inbox-p" style="--pc:' + PC[t[2]] + '">' + t[2] + '</span>' +
      '<span class="inbox-pr pr-' + t[3] + '"><span>' + PR[t[3]] + '</span></span><span class="inbox-tm">' + t[4] + '</span>' +
      '<span class="inbox-s">' + esc(t[5]) + '</span></div>';
    stage.appendChild(d); return d;
  });
  stage.appendChild(fade);
  /* both views share one height, so a long Done today column, or a long list, fades out at the bottom */
  var SHOW = 5;
  function layout() {
    var W = scroll.clientWidth, narrow = W < 700;
    scroll.classList.toggle('narrow', narrow);
    if (!board) {
      var rh = narrow ? 48 : 42, top = 40, rows = narrow ? 11 : 14;
      stage.style.width = W + 'px';
      cards.forEach(function (c, i) { c.style.cssText = '--d:' + (Math.min(i, rows) * 0.016).toFixed(3) + 's;left:0;top:' + (top + i * rh) + 'px;width:' + W + 'px;height:' + rh + 'px'; });
      maxD = Math.min(T.length - 1, rows) * 0.016;
      stage.style.height = (top + rows * rh) + 'px';
      fade.style.left = '0px'; fade.style.width = W + 'px'; fade.style.height = (rh * 2.6) + 'px';
    } else {
      var pad = narrow ? 12 : 16, gap = narrow ? 10 : 12, sw = Math.max(W, narrow ? 4 * 190 + 3 * gap + 2 * pad : 0);
      var cw = (sw - 2 * pad - 3 * gap) / 4, ch = 98, cg = 8, head = 14 + 42 + 10, maxN = 0;
      stage.style.width = sw + 'px';
      COLS.forEach(function (c, ci) {
        var x = pad + ci * (cw + gap);
        cols[ci].style.left = x + 'px'; cols[ci].style.width = cw + 'px';
        var n = 0;
        T.forEach(function (t, i) {
          if (t[0] !== c[0]) return;
          var d = 0.03 + ci * 0.05 + Math.min(n, SHOW + 1) * 0.03;
          cards[i].style.cssText = '--d:' + d.toFixed(3) + 's;left:' + (x + 8) + 'px;top:' + (head + n * (ch + cg)) + 'px;width:' + (cw - 16) + 'px;height:' + ch + 'px';
          maxD = Math.max(maxD, d);
          n++;
        });
        maxN = Math.max(maxN, n);
        if (c[0] === 'd') { fade.style.left = (x + 1) + 'px'; fade.style.width = (cw - 2) + 'px'; }
      });
      maxD = 0; COLS.forEach(function (c, ci) { maxD = Math.max(maxD, 0.03 + ci * 0.05 + (SHOW + 1) * 0.03); });
      stage.style.height = (head + Math.min(maxN, SHOW) * (ch + cg) + 60) + 'px';
      fade.style.height = '150px';
    }
  }
  function set(v) {
    if (busy || v === board) return;
    busy = true;
    stage.classList.add('swap');
    segBtns.forEach(function (b) { b.setAttribute('aria-pressed', String((b.getAttribute('data-v') === 'board') === v)); });
    setTimeout(function () {
      board = v; s.classList.toggle('is-board', v); layout();
      if (!v) scroll.scrollLeft = 0;
      /* the words come back only once every card has landed, so nothing is drawn mid flight */
      setTimeout(function () { stage.classList.remove('swap'); busy = false; }, REDUCE ? 0 : Math.round(660 + maxD * 1000));
    }, REDUCE ? 0 : 140);
  }
  function user() { touched = true; if (auto) { clearInterval(auto); auto = null; } }
  segBtns.forEach(function (b) { b.addEventListener('click', function () { user(); set(b.getAttribute('data-v') === 'board'); }); });
  keyB.addEventListener('click', function () { user(); pressKey(keyB); set(!board); });
  KEYS.push({ el: q(s, '.inbox-win'), fn: function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey || e.repeat) return false;
    if (e.key === 'b' || e.key === 'B') { user(); pressKey(keyB); set(!board); return true; }
    return false;
  } });
  layout();
  window.addEventListener('resize', layout);
  /* untouched, it shows itself off: flip every few seconds while on screen */
  watch(s, function (v) {
    onScreen = v;
    if (touched || REDUCE) return;
    if (v && !auto) { setTimeout(function () { if (onScreen && !touched) set(true); }, 1400); auto = setInterval(function () { if (onScreen && !touched) set(!board); }, 4200); }
    if (!v && auto) { clearInterval(auto); auto = null; }
  });
})();

/* ---------------- command-k  command k ---------------- */
(function () {
  var s = document.getElementById('command-k'); if (!s) return;
  var stage = q(s, '.command-k-stage'), input = q(s, '.command-k-in'), list = q(s, '.command-k-list'), toastEl = q(s, '.command-k-toast');
  var term = q(s, '.command-k-term'), pri = q(s, '.command-k-pri'), tries = q(s, '.command-k-tries');
  var CTX = 'Dark mode flashes white on launch';
  /* [group, glyph, label, key, what happens] all real rows from the app */
  var ROWS = [
    ['t', '✓', 'Approve Recommended', '', 'Merging into main'],
    ['t', '↩', 'Reply', 'R', 'Reply box focused'],
    ['t', '□', 'Done', 'E', 'Closed. Z brings it back'],
    ['t', '●', 'Mark Unread', '', 'Marked unread'],
    ['t', '◷', 'Remind Me', 'L', 'Snoozed until 8am'],
    ['t', '↻', 'Resume This Agent', '', 'Agent resumed'],
    ['t', '■', 'Stop Agent', '', 'Agent stopped'],
    ['t', '↶', 'Send Back to Agent', '', 'Sent back to the agent'],
    ['t', '↺', 'Restart the Agent', '', 'Agent restarted'],
    ['t', '↑', 'Priority Urgent', '', 'Priority set to Urgent', 'u'],
    ['t', '↑', 'Priority High', '', 'Priority set to High', 'h'],
    ['t', '↓', 'Priority Medium', '', 'Priority set to Medium', 'm'],
    ['t', '↓', 'Priority Low', '', 'Priority set to Low', 'l'],
    ['t', '>_', 'Open Terminal', '⌘J', 'term'],
    ['a', '+', 'New project', '', 'New project'],
    ['a', '▤', 'Projects', '', 'Projects'],
    ['a', '↑', 'Rank site first', '', 'rank:site'],
    ['a', '↑', 'Rank api first', '', 'rank:api'],
    ['a', '↑', 'Rank desktop first', '', 'rank:desktop'],
    ['a', '/', 'Search threads', '/', 'Searching every thread'],
    ['a', '‖', 'Pause agents', '', 'pause'],
    ['a', '▶', 'Resume interrupted agents', '', 'resume'],
    ['a', '¶', 'General agent instructions', '', 'Instructions for every agent'],
    ['a', '⚙', 'Settings', '', 'Settings'],
    ['a', '⌨', 'Keyboard shortcuts', '', 'Keyboard shortcuts'],
    ['a', '▦', 'Show as a board', 'B', 'Showing as a board'],
    ['a', '↓', 'Import your Claude Code agents', '', 'Importing 7 Claude Code sessions'],
    ['a', '?', 'Take the tutorial', '', 'Tutorial opened'],
    ['a', '◇', 'Open a demo inbox', '', 'Demo inbox opened']
  ];
  var open = false, sel = 0, shown = [], touched = false, onScreen = false, timers = [], toastT = null;
  /* every word must start a word in the row, or failing that sit inside it. Any order. */
  function match(label, words) {
    var lw = label.toLowerCase(), marks = [];
    for (var i = 0; i < words.length; i++) {
      var w = words[i], at = -1, re = /\S+/g, m;
      while ((m = re.exec(lw))) { if (m[0].indexOf(w) === 0 && !marks.some(function (r) { return r[0] === m.index; })) { at = m.index; break; } }
      if (at < 0) at = lw.indexOf(w);
      if (at < 0) return null;
      marks.push([at, at + w.length]);
    }
    return marks;
  }
  function hl(label, marks) {
    var on = []; marks.forEach(function (r) { for (var i = r[0]; i < r[1]; i++) on[i] = 1; });
    var out = '', inM = false;
    for (var i = 0; i < label.length; i++) {
      if (on[i] && !inM) { out += '<mark>'; inM = true; }
      if (!on[i] && inM) { out += '</mark>'; inM = false; }
      out += esc(label[i]);
    }
    return out + (inM ? '</mark>' : '');
  }
  function render() {
    var words = input.value.toLowerCase().split(/\s+/).filter(Boolean);
    shown = [];
    var html = '', last = '';
    ROWS.forEach(function (r) {
      var mk = words.length ? match(r[2], words) : [];
      if (!mk) return;
      if (r[0] !== last) {
        html += r[0] === 't' ? '<div class="command-k-gh">This thread <span>' + esc(CTX) + '</span></div>' : '<div class="command-k-gh">Anywhere</div>';
        last = r[0];
      }
      html += '<div class="command-k-r" role="option" data-i="' + shown.length + '"><i>' + esc(r[1]) + '</i><span>' + hl(r[2], mk) + '</span>' + (r[3] ? '<kbd>' + esc(r[3]) + '</kbd>' : '') + '</div>';
      shown.push(r);
    });
    list.innerHTML = html || '<div class="command-k-none">Nothing matches every word yet</div>';
    sel = Math.min(sel, Math.max(0, shown.length - 1));
    paintSel();
  }
  function paintSel() {
    qa(list, '.command-k-r').forEach(function (el, i) {
      el.classList.toggle('sel', i === sel);
      el.setAttribute('aria-selected', String(i === sel));
      if (i === sel) { var lt = el.offsetTop, lb = lt + el.offsetHeight; if (lt < list.scrollTop + 30) list.scrollTop = lt - 30; else if (lb > list.scrollTop + list.clientHeight) list.scrollTop = lb - list.clientHeight + 6; }
    });
  }
  function setOpen(v, focus) {
    open = v; stage.classList.toggle('open', v);
    if (v) { input.value = ''; sel = 0; render(); list.scrollTop = 0; if (focus) input.focus({ preventScroll: true }); }
    else if (document.activeElement === input) input.blur();
  }
  function toast(t) {
    toastEl.textContent = t; toastEl.classList.add('on');
    clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove('on'); }, 2200);
  }
  function run(r) {
    var el = q(list, '.command-k-r.sel'); if (el) el.classList.add('run');
    setTimeout(function () {
      setOpen(false);
      var a = r[4];
      if (r[5]) { pri.textContent = r[2].replace('Priority ', ''); pri.classList.toggle('u', r[5] === 'u'); pri.classList.remove('flash'); void pri.offsetWidth; pri.classList.add('flash'); toast(a); }
      else if (a === 'term') { term.classList.add('on'); toast('Terminal open in agentbox/w-7c21'); timers.push(setTimeout(function () { term.classList.remove('on'); }, 3200)); }
      else if (a.indexOf('rank:') === 0) { rank(a.slice(5)); toast(a.slice(5) + ' now ranks first. Its work starts first'); }
      else if (a === 'pause') { stage.classList.add('paused'); q(s, '.command-k-livet').textContent = 'Agents paused, nothing new starts'; toast('Every agent paused'); }
      else if (a === 'resume') { stage.classList.remove('paused'); q(s, '.command-k-livet').textContent = 'Finished 2m ago, 14 steps, 31 tests passed'; toast('Agents resumed'); }
      else toast(a);
    }, 160);
  }
  function rank(p) {
    var box = q(s, '.command-k-projs'), el = q(box, '[data-p="' + p + '"]');
    if (!el || box.firstElementChild === el) return;
    var before = qa(box, '.command-k-proj').map(function (x) { return x.getBoundingClientRect().top; });
    var items = qa(box, '.command-k-proj');
    box.insertBefore(el, box.firstElementChild);
    items.forEach(function (x, i) { var d = before[i] - x.getBoundingClientRect().top; x.style.transition = 'none'; x.style.transform = 'translateY(' + d + 'px)'; void x.offsetWidth; x.style.transition = ''; x.style.transform = ''; });
  }
  input.addEventListener('input', function () { sel = 0; render(); });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') { sel = Math.min(shown.length - 1, sel + 1); paintSel(); e.preventDefault(); }
    else if (e.key === 'ArrowUp') { sel = Math.max(0, sel - 1); paintSel(); e.preventDefault(); }
    else if (e.key === 'Enter') { if (shown[sel]) run(shown[sel]); e.preventDefault(); }
    else if (e.key === 'Escape') { setOpen(false); e.preventDefault(); }
  });
  list.addEventListener('mousemove', function (e) { var r = e.target.closest('.command-k-r'); if (r && +r.dataset.i !== sel) { sel = +r.dataset.i; paintSel(); } });
  list.addEventListener('click', function (e) { var r = e.target.closest('.command-k-r'); if (r) { user(); sel = +r.dataset.i; paintSel(); run(shown[sel]); } });
  q(s, '.command-k-esc').addEventListener('click', function (e) { e.preventDefault(); user(); setOpen(false); });
  q(s, '.command-k-dim').addEventListener('click', function () { user(); setOpen(false); });
  function user() { if (touched) return; touched = true; timers.forEach(clearTimeout); timers = []; }
  function openByUser() { user(); term.classList.remove('on'); setOpen(!open, true); }
  var keyCaps = qa(s, '.command-k-k');
  function pressCaps() { keyCaps.forEach(pressKey); }
  keyCaps.forEach(function (k) { k.addEventListener('click', function () { pressCaps(); openByUser(); }); });
  input.addEventListener('pointerdown', user);
  input.addEventListener('keydown', user);
  ['urg pri', 'term', 'rank site', 'pause', 'resume int', 'import cl'].forEach(function (t) {
    var b = document.createElement('button'); b.type = 'button'; b.className = 'command-k-try'; b.textContent = t;
    b.addEventListener('click', function () { user(); term.classList.remove('on'); if (!open) setOpen(true, false); input.value = ''; typeOut(t, function () { input.focus({ preventScroll: true }); }); });
    tries.appendChild(b);
  });
  function typeOut(t, done, tm) {
    var i = 0;
    (function step() {
      input.value = t.slice(0, ++i); sel = 0; render();
      if (i < t.length) { var id = setTimeout(step, REDUCE ? 0 : 70 + Math.random() * 70); (tm || []).push(id); }
      else if (done) done();
    })();
  }
  /* Command K, only while the palette's stage is mostly on screen */
  KEYS.push({ el: stage, inside: true, fn: function (e) {
    if ((e.metaKey || e.ctrlKey) && !e.altKey && !e.shiftKey && (e.key === 'k' || e.key === 'K')) { pressCaps(); openByUser(); return true; }
    return false;
  } });
  /* untouched, it plays itself */
  var SCRIPT = ['urg pri', 'term', 'rank site', 'pause', 'resume int', 'import cl'];
  function play(n) {
    if (touched || !onScreen) return;
    var t = SCRIPT[n % SCRIPT.length];
    if (!open) pressCaps();
    setOpen(true, false);
    timers.push(setTimeout(function () {
      typeOut(t, function () {
        timers.push(setTimeout(function () {
          if (touched) return;
          run(shown[0]);
          timers.push(setTimeout(function () { play(n + 1); }, t === 'term' ? 4200 : 2600));
        }, 900));
      }, timers);
    }, 1100));
  }
  var started = false;
  render();
  watch(stage, function (v) {
    onScreen = v;
    if (v && !started && !touched && !REDUCE) { started = true; timers.push(setTimeout(function () { play(0); }, 900)); }
    if (!v && started && !touched) { timers.forEach(clearTimeout); timers = []; started = false; setOpen(false); }
  });
})();

/* ---------------- features  the feature index ---------------- */
(function () {
  var s = document.getElementById('features'); if (!s) return;
  watch(q(s, '.features-grid'), function (v) { s.classList.toggle('features-run', v); });
  qa(s, '.features-t').forEach(function (t) {
    t.addEventListener('pointermove', function (e) {
      var r = t.getBoundingClientRect();
      t.style.setProperty('--mx', (e.clientX - r.left) + 'px'); t.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });
})();

/* ---------------- plans  your own plan: tasks flow out of the app to Claude Code and Codex ---------------- */
(function () {
  var s = document.getElementById('plans'); if (!s) return;
  var stage = q(s, '.plans-stage'), icon = q(s, '.plans-icon'), wk = q(s, '.plans-wk'), wt = q(s, '.plans-wt');
  var SIDES = {
    claude: { card: q(s, '[data-e="claude"]'), wire: q(s, '.plans-wire.l i'), model: 'OPUS 5.5',
      tasks: ['Snooze survives a restart', 'Dark mode flashes white on launch', 'Untangle the auth middleware', 'Flaky e2e on CI', 'Tray icon blurry on Retina'] },
    codex: { card: q(s, '[data-e="codex"]'), wire: q(s, '.plans-wire.r i'), model: 'GPT-6-ASTRA',
      tasks: ['Search misses archived threads', 'Blog RSS feed', 'Usage meter onto the billing week', 'Export a thread as markdown', 'Settings page loses focus'] }
  };
  Object.keys(SIDES).forEach(function (k) {
    var d = SIDES[k]; d.rows = q(d.card, '.plans-rows'); d.n = 2; d.list = [];
    d.bars = qa(d.card, '.plans-bar i'); d.pv = qa(d.card, '.plans-pv');
    d.p = d.pv.map(function (b) { return parseInt(b.textContent, 10); });
    [d.tasks[1], d.tasks[0]].forEach(function (t, i) { d.list.push(addRow(d, t, i)); });
  });
  function addRow(d, t, slot) {
    var r = document.createElement('div'); r.className = 'plans-row';
    r.innerHTML = '<span>' + esc(t) + '</span><em>' + d.model + '</em>';
    r.style.transform = 'translateY(' + (slot * 42) + 'px)';
    d.rows.appendChild(r); return r;
  }
  var waiting = 7;
  function send(k) {
    var d = SIDES[k];
    icon.classList.remove('beat'); void icon.offsetWidth; icon.classList.add('beat');
    d.wire.classList.remove('go'); void d.wire.offsetWidth; d.wire.classList.add('go');
    waiting = waiting > 2 ? waiting - 1 : 8; wt.textContent = waiting;
    setTimeout(function () {
      /* the oldest one finishes and leaves, the new one lands on top */
      var old = d.list.pop(); old.style.opacity = '0'; old.style.transform = 'translateY(84px)';
      setTimeout(function () { old.remove(); }, 650);
      d.list.forEach(function (r) { r.classList.remove('new'); r.style.transform = 'translateY(42px)'; });
      var r = addRow(d, d.tasks[d.n++ % d.tasks.length], 0);
      r.classList.add('new'); r.style.opacity = '0'; r.style.transform = 'translateY(-40px)';
      void r.offsetWidth; r.style.opacity = '1'; r.style.transform = 'translateY(0)';
      d.list.unshift(r);
      /* each piece of work uses a little of that plan */
      d.p = d.p.map(function (v, i) { return Math.min(i ? 96 : 92, v + (i ? 1 : 2)); });
      d.bars.forEach(function (b, i) { b.style.setProperty('--p', d.p[i] + '%'); });
      d.pv.forEach(function (b, i) { b.textContent = d.p[i] + '%'; });
    }, 900);
  }
  var timer = null, turn = 0;
  function loop() { send(turn++ % 2 ? 'codex' : 'claude'); timer = setTimeout(loop, 2600); }
  if (REDUCE) return;
  watch(stage, function (v) {
    if (v && !timer) timer = setTimeout(loop, 900);
    if (!v && timer) { clearTimeout(timer); timer = null; }
  });
})();

})();

/* ===== Priorities ===== */
(function () {
'use strict';
var REDUCE = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function q(r, s) { return r.querySelector(s); }
function qa(r, s) { return Array.prototype.slice.call(r.querySelectorAll(s)); }
function el(tag, cls, html) { var d = document.createElement(tag); if (cls) d.className = cls; if (html != null) d.innerHTML = html; return d; }
function visibleFrac(e) {
  var r = e.getBoundingClientRect(), vh = window.innerHeight || 800;
  var vis = Math.min(r.bottom, vh) - Math.max(r.top, 0);
  return vis <= 0 ? 0 : vis / Math.min(r.height || 1, vh);
}
function onceSeen(e, cb, frac) {
  if (!('IntersectionObserver' in window)) { cb(); return; }
  var io = new IntersectionObserver(function (ents) {
    ents.forEach(function (en) { if (en.isIntersecting) { io.disconnect(); cb(); } });
  }, { threshold: frac == null ? 0.2 : frac });
  io.observe(e);
}
(function () {
  var s = document.getElementById('priorities'); if (!s) return;
  qa(s, '.rv').forEach(function (e) { if (REDUCE) e.classList.add('on'); else onceSeen(e, function () { e.classList.add('on'); }, 0.15); });
})();
var WORD = { u: 'Urgent', h: 'High', m: 'Medium', l: 'Low' };

/* ---------------- priorities  priorities ---------------- */
(function () {
  var s = document.getElementById('priorities'); if (!s) return;
  var stage = q(s, '.priorities-stage'), pal = q(s, '.priorities-pal'), qtx = q(pal, '.tx'), ks = q(pal, '.priorities-ks');
  var nW = q(s, '[data-n="w"]'), nQ = q(s, '[data-n="q"]');
  var PC = { desktop: '#ee6018', api: '#c4bdb8', site: '#8a7d70' };
  // In progress, in the user's order: desktop ranked above api, api above site, then each task's own tag.
  // Three agents are working; the rest wait their turn in that same order.
  var A = [
    { t: 'Dark mode flashes white on launch', p: 'desktop', lv: 'h', run: 'Editing src/theme/boot.ts' },
    { t: 'J and K skip rows after undo', p: 'desktop', lv: 'h', run: 'Running the list tests' },
    { t: 'Export a thread as markdown', p: 'desktop', lv: 'm', run: 'Writing the export menu' },
    { t: 'Rate limit the webhook endpoint', p: 'api', lv: 'm' },
    { t: 'Sign in fails for new accounts', p: 'api', lv: 'm', run: 'Reading api/auth/signup.ts' },
    { t: 'Retry failed Stripe webhooks', p: 'api', lv: 'l' },
    { t: 'Pricing page loads slowly on mobile', p: 'site', lv: 'm' },
    { t: 'Write the 2.4 changelog', p: 'site', lv: 'l' }
  ];
  var star = A[4], bump = A[2];
  var TOP = 40, RH = 46, GH = 32;
  function narrow() { return (s.clientWidth || 1440) <= 760; }
  var ghU = el('div', 'priorities-gh u', 'Urgent'), ghR = el('div', 'priorities-gh', 'Everything else');
  var fade = q(s, '.priorities-fade');
  stage.insertBefore(ghU, fade); stage.insertBefore(ghR, fade);
  A.forEach(function (r) {
    r.el = el('div', 'priorities-r', '<div class="priorities-ri"><span class="priorities-g"></span><span class="priorities-t"></span><span class="priorities-p"></span><span class="priorities-pr"></span><span class="priorities-st"></span></div>');
    q(r.el, '.priorities-t').textContent = r.t;
    var p = q(r.el, '.priorities-p'); p.textContent = r.p; p.style.setProperty('--pc', PC[r.p]);
    stage.insertBefore(r.el, fade);
  });
  function tag(r, lv, pop) {
    var p = q(r.el, '.priorities-pr');
    p.className = 'priorities-pr pr-' + lv + (pop ? ' pop' : '');
    p.textContent = WORD[lv];
  }
  function state(r, st, text) {
    r.el.classList.remove('w', 'q', 'pz', 'nx');
    r.el.classList.add(st);
    q(r.el, '.priorities-st').textContent = text;
  }
  function counts() {
    var w = A.filter(function (r) { return r.el.classList.contains('w'); }).length;
    nW.textContent = w; nQ.textContent = A.length - w;
  }
  var urgent = false;
  function layout() {
    var rh = narrow() ? 54 : RH, y = TOP;
    ghU.classList.toggle('on', urgent); ghR.classList.toggle('on', urgent);
    if (urgent) { ghU.style.top = y + 'px'; y += GH; star.el.style.top = y + 'px'; y += rh; ghR.style.top = y + 'px'; y += GH; }
    else { ghU.style.top = TOP + 'px'; ghR.style.top = (TOP + rh) + 'px'; }
    A.forEach(function (r) { r.el.style.height = rh + 'px'; if (urgent && r === star) return; r.el.style.top = y + 'px'; y += rh; });
  }
  function base() {
    urgent = false;
    A.forEach(function (r, i) {
      tag(r, r.lv); r.el.classList.remove('sel', 'lift');
      if (i < 3) state(r, 'w', r.run);
      else state(r, 'q', i === 3 ? 'Up next' : 'Waits its turn');
    });
    counts(); layout();
  }
  function after() {
    urgent = true; tag(star, 'u');
    A.forEach(function (r) { r.el.classList.remove('sel', 'lift'); });
    state(star, 'w', star.run);
    state(bump, 'pz', 'Paused, up next');
    state(A[3], 'q', 'Waits its turn');
    counts(); layout();
  }
  var CMDS = [['u', 'Priority Urgent'], ['h', 'Priority High'], ['m', 'Priority Medium'], ['l', 'Priority Low']];
  function palette(typed) {
    q(pal, '.priorities-on b').textContent = star.t;
    qtx.innerHTML = (typed ? esc(typed) : '<span class="ph">Type a command</span>') + '<span class="cur"></span>';
    var words = typed.toLowerCase().split(/\s+/).filter(Boolean);
    var hits = CMDS.filter(function (c) { return words.every(function (w) { return c[1].toLowerCase().split(' ').some(function (x) { return x.indexOf(w) === 0; }); }); });
    ks.innerHTML = hits.map(function (c, i) {
      var label = esc(c[1]);
      words.forEach(function (w) { label = label.replace(new RegExp('(^|\\s)(' + w + ')', 'i'), '$1<mark>$2</mark>'); });
      return '<div class="priorities-k' + (i === 0 ? ' sel' : '') + '"><span class="priorities-pr pr-' + c[0] + '"></span><span>' + label + '</span>' + (i === 0 ? '<kbd>&#8629;</kbd>' : '') + '</div>';
    }).join('');
  }
  function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  window.addEventListener('resize', layout);

  function snap(fn) { stage.classList.add('snap'); fn(); void stage.offsetHeight; stage.classList.remove('snap'); }
  snap(base);
  if (REDUCE) { snap(after); return; }

  var timers = [], running = false;
  function at(ms, fn) { timers.push(setTimeout(fn, ms)); }
  function play() {
    timers.forEach(clearTimeout); timers = [];
    stage.classList.remove('k', 'fade');
    snap(base);
    // the cursor walks down to the sign in bug
    at(900, function () { A[3].el.classList.add('sel'); });
    at(1350, function () { A[3].el.classList.remove('sel'); star.el.classList.add('sel'); });
    // Command K, "urg", Enter
    at(2100, function () { palette(''); stage.classList.add('k'); });
    var word = 'urg';
    for (var c = 1; c <= word.length; c++) (function (c) { at(2500 + c * 120, function () { palette(word.slice(0, c)); }); })(c);
    at(3350, function () { var r = q(ks, '.priorities-k.sel'); if (r) r.classList.add('run'); });
    at(3550, function () { stage.classList.remove('k'); tag(star, 'u', true); });
    // it rises to the top under its own heading
    at(4250, function () { star.el.classList.add('lift'); urgent = true; layout(); });
    at(5100, function () { star.el.classList.remove('lift', 'sel'); });
    // and the agents follow the order: it takes a slot, the lowest running task waits its turn
    at(5500, function () { state(bump, 'pz', 'Paused, up next'); state(A[3], 'q', 'Waits its turn'); counts(); });
    at(6000, function () { state(star, 'w', star.run); counts(); });
    at(11800, function () { stage.classList.add('fade'); });
    at(12400, function () { stage.classList.remove('fade'); play(); });
  }
  function stop() { running = false; timers.forEach(clearTimeout); timers = []; stage.classList.remove('k', 'fade'); snap(after); }
  if (!('IntersectionObserver' in window)) { running = true; play(); return; }
  new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting && !running) { running = true; play(); }
      if (!e.isIntersecting && running) stop();
    });
  }, { threshold: 0.35 }).observe(q(s, '.priorities-win'));
})();

})();

/* ===== The close ===== */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var secs = ['start'].map(function (id) { return document.getElementById(id); }).filter(Boolean);
  function $(r, s) { return r.querySelector(s); }
  function $$(r, s) { return Array.prototype.slice.call(r.querySelectorAll(s)); }
  function onView(el, cb, th) {
    if (!('IntersectionObserver' in window)) { cb(true); return; }
    new IntersectionObserver(function (es) { es.forEach(function (e) { cb(e.isIntersecting); }); }, { threshold: th || 0.2 }).observe(el);
  }

  // reveals
  secs.forEach(function (s) {
    $$(s, '.c-rv').forEach(function (el) {
      if (reduce) { el.classList.add('in'); return; }
      onView(el, function (on) { if (on) el.classList.add('in'); }, 0.2);
    });
  });

  /* ---------- start: a task is typed, Enter, and an agent is on it ---------- */
  var start = document.getElementById('start');
  if (start) (function () {
    var tasks = ['Fix the flaky login test', 'Split the store module', 'Handle expired tokens'];
    var type = $(start, '.start-type'), row = $(start, '.start-row'), name = $(start, '.start-name'), kc = $(start, '.start-kc');
    if (reduce) { type.textContent = ''; name.textContent = tasks[0]; row.classList.add('in'); return; }
    var timers = [], running = false, at = 0;
    function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
    function play() {
      var t = tasks[at++ % tasks.length], i = 0;
      row.classList.remove('in'); type.textContent = '';
      (function next() {
        if (!running) return;
        if (i <= t.length) { type.textContent = t.slice(0, i++); later(next, 45 + Math.random() * 45); return; }
        later(function () {
          kc.classList.add('down');
          later(function () { kc.classList.remove('down'); type.textContent = ''; name.textContent = t; row.classList.add('in'); }, 160);
          later(play, 4200);
        }, 500);
      })();
    }
    onView(start, function (on) {
      if (on && !running) { running = true; later(play, 600); }
      if (!on && running) { running = false; timers.forEach(clearTimeout); timers = []; }
    }, 0.3);
  })();
})();

/* ===== TWEAKS PANEL (review only, remove before launch) =====
   A floating panel, bottom right, for trying a subheader under the hero headline.
   It only ever runs on localhost, 127.0.0.1 and *.vercel.app previews; on agentbox.ac and every
   other host it does nothing, whatever the URL says. ?tweaks opens it expanded.
   To remove: delete this block, the TWEAKS PANEL block at the end of css/site.css, and the
   README checklist line. */
(function () {
  var host = location.hostname;
  var allowed = host === 'localhost' || host === '127.0.0.1' || /\.vercel\.app$/.test(host);
  if (!allowed) return;
  var hero = document.getElementById('hero'), h1 = hero && hero.querySelector('h1');
  if (!h1) return;
  var forced = /[?&]tweaks(=|&|$)/.test(location.search);
  var SUBS = [
    { id: 'none', t: 'None' },
    { id: 'a', t: 'Hand off a dozen tasks. Each agent comes back when it needs you.' },
    { id: 'b', t: 'Every task gets its own agent. You answer the ones that need you.' },
    { id: 'c', t: 'Run more agents than you can watch, and step in only when one needs you.' },
    { id: 'd', t: 'A Mac app for managing many Claude Code and Codex agents.' },
    { id: 'e', t: 'Free and open source, on the Claude Code or Codex plan you already have.' }
  ];
  var SIZES = [{ id: 's', t: 'Small' }, { id: 'm', t: 'Medium' }, { id: 'l', t: 'Large' }];
  var KEY = 'agentbox-tweaks', st = { sub: 'none', size: 'm', open: false };
  try { var saved = JSON.parse(localStorage.getItem(KEY) || '{}'); if (saved && typeof saved === 'object') { for (var k in st) if (k in saved) st[k] = saved[k]; } } catch (e) {}
  if (!SUBS.some(function (x) { return x.id === st.sub; })) st.sub = 'none';
  if (!SIZES.some(function (x) { return x.id === st.size; })) st.size = 'm';
  if (forced) st.open = true;
  function save() { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} }
  function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  /* the subheader, under the headline: its height eases so the page below never jumps */
  var box = document.createElement('div'); box.className = 'tw-sub';
  var inner = document.createElement('p'); inner.className = 'tw-sub-p rv d1';
  box.appendChild(inner); h1.parentNode.insertBefore(box, h1.nextSibling);
  function paintSub(animate) {
    var s = SUBS.filter(function (x) { return x.id === st.sub; })[0], on = s.id !== 'none';
    var from = box.offsetHeight;
    if (on) inner.textContent = s.t;
    box.dataset.size = st.size; box.classList.toggle('on', on);
    box.style.transition = 'none'; box.style.height = 'auto';
    var to = on ? box.scrollHeight : 0;
    if (!animate) { box.style.height = to + 'px'; if (!on) inner.textContent = ''; return; }
    box.style.height = from + 'px'; void box.offsetHeight;
    box.style.transition = ''; box.style.height = to + 'px';
  }
  box.addEventListener('transitionend', function (e) { if (e.propertyName === 'height' && !box.classList.contains('on')) inner.textContent = ''; });
  window.addEventListener('resize', function () { paintSub(false); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { paintSub(false); });

  /* the panel */
  var p = document.createElement('aside'); p.className = 'tw-panel'; p.setAttribute('aria-label', 'Tweaks');
  p.innerHTML =
    '<button type="button" class="tw-head" aria-expanded="false"><span><i></i>Tweaks</span><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 7.5L6 4.5l3 3"/></svg></button>' +
    '<div class="tw-body">' +
      '<div class="tw-lbl">Subheader</div>' +
      '<div class="tw-subs">' + SUBS.map(function (x) { return '<button type="button" data-sub="' + x.id + '"><b>' + (x.id === 'none' ? '&ndash;' : x.id) + '</b><span>' + esc(x.t) + '</span></button>'; }).join('') + '</div>' +
      '<div class="tw-lbl">Size</div>' +
      '<div class="tw-sizes">' + SIZES.map(function (x) { return '<button type="button" data-size="' + x.id + '">' + x.t + '</button>'; }).join('') + '</div>' +
      '<div class="tw-note">Review only. Never shown on agentbox.ac.</div>' +
    '</div>';
  document.body.appendChild(p);
  var head = p.querySelector('.tw-head');
  function paintPanel() {
    p.classList.toggle('open', !!st.open); head.setAttribute('aria-expanded', st.open ? 'true' : 'false');
    Array.prototype.forEach.call(p.querySelectorAll('[data-sub]'), function (b) { b.setAttribute('aria-pressed', b.dataset.sub === st.sub ? 'true' : 'false'); });
    Array.prototype.forEach.call(p.querySelectorAll('[data-size]'), function (b) { b.setAttribute('aria-pressed', b.dataset.size === st.size ? 'true' : 'false'); b.disabled = st.sub === 'none'; });
  }
  head.addEventListener('click', function () { st.open = !st.open; save(); paintPanel(); });
  p.addEventListener('click', function (e) {
    var b = e.target.closest('[data-sub], [data-size]'); if (!b) return;
    if (b.dataset.sub) st.sub = b.dataset.sub; else st.size = b.dataset.size;
    save(); paintPanel(); paintSub(true);
  });
  /* keys typed into the panel stay in the panel (the hero answers 1, 2, 3 and R) */
  p.addEventListener('keydown', function (e) { if (e.key !== 'Tab' && e.key !== 'Enter' && e.key !== ' ') e.stopPropagation(); });
  paintPanel(); paintSub(false);
})();
/* ===== END TWEAKS PANEL ===== */
