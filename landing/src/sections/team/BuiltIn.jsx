import { useEffect, useRef, useState } from 'react';
import { AppMark, IcDoc, IcRepeat } from '../../components/AppIcons.jsx';
import BentoCard from '../../components/BentoCard.jsx';
import { watch } from '../../lib/motion.js';

/* The second half of the team section: what every thread has built in, drawn the way the
   team cards are drawn (one glass panel per card on the halftone backdrop). The loops are
   pure CSS and run only while the section is on screen. */

const Status = ({ state, children }) => <span className="ust" data-state={state}><i className="gl" />{children}</span>;

/* one worktree per thread, each with its agent working */
const WORKTREES = [['Dark mode flashes white on launch', 'w-7c21'], ['Snooze survives a restart', 'w-3f9a'], ['Search misses archived threads', 'w-b04e']];
const Worktrees = (
  <div className="shot" aria-hidden="true">
    <div className="ui wtr">
      <div className="wth"><IcDoc />~/code/desktop<span>main</span></div>
      <div className="wtl">
        {WORKTREES.map(([title, id], i) => (
          <div key={id} className="wt" style={{ '--i': i }}>
            <div className="wtt"><Status state="working" />{title}</div>
            <div className="wtp">.claude/worktrees/{id} · <span>agentbox/{id}</span></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* the task terminal, opened under a thread with ⌘J */
const Terminal = (
  <div className="shot" aria-hidden="true">
    <div className="ui term">
      <div className="ttb"><strong>Terminal</strong><span className="tfo">.claude/worktrees/w-3f9a</span><span className="tpr">zsh</span></div>
      <div className="tsc">
        <div><span className="tpm">w-3f9a $</span> <span className="ty">npm test</span></div>
        <div className="ok1">✓ 48 passed</div>
        <div className="ok2">✓ agentbox/w-3f9a is clean</div>
      </div>
    </div>
  </div>
);

/* the change a thread made, file by file: the old line goes, the new ones arrive */
const DIFF = [
  ['ctx', '12', 'function tax(cart) {'],
  ['del', '13', '  return round(cart.sum * cart.rate)'],
  ['add', '13', '  const cents = cart.sum * cart.rate * 100'],
  ['add', '14', '  return round(cents) / 100'],
  ['ctx', '15', '}'],
];
const Diff = (
  <div className="shot" aria-hidden="true">
    <div className="ui dif">
      <div className="dfh"><span><IcDoc />src/checkout/tax.ts</span><span><b>+2</b><b>−1</b></span></div>
      <div className="dfb">
        {DIFF.map(([kind, num, code], i) => (
          <div key={kind + num} className={kind === 'add' ? 'dr sl' : 'dr'} data-kind={kind} style={kind === 'add' ? { '--i': i - 2 } : undefined}>
            <em>{num}</em><i /><span>{code}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* the New thread composer, with a repeat set; under it, the runs it made */
const Repeat = (
  <div className="shot" aria-hidden="true">
    <div className="ui cmp">
      <div className="cmt">Update our dependencies, run the tests, and fix anything that breaks</div>
      <div className="cmb">
        <span className="chip">Opus 5.5</span>
        <span className="chip rp"><IcRepeat />Every Monday 8am</span>
        <span className="snd">Send<kbd>⌘↵</kbd></span>
      </div>
    </div>
    <div className="ui runs">
      <div><b>Sep 28</b><span>Vite 8 broke the build, fixed it</span><Status state="done">Done</Status></div>
      <div className="nw"><b>Oct 5</b><span>14 packages updated, tests pass</span><Status state="waiting">Needs you</Status></div>
    </div>
  </div>
);

/* a macOS banner, and the dock badge */
const Notified = (
  <div className="shot ntf" aria-hidden="true">
    <div className="ban">
      <span className="appic"><AppMark /></span>
      <span><b>Agentbox</b><span>Checkout fails for some carts needs you</span></span>
      <em>now</em>
    </div>
    <div className="dock">
      <i /><i />
      <span className="appic"><AppMark /><b className="badge">3</b></span>
      <i />
    </div>
  </div>
);

/* the Later picker: type 3h, pick it, and the thread moves to Later */
const Snooze = (
  <div className="shot snz" aria-hidden="true">
    <div className="ui lat">
      <div className="lth"><b>Later</b><span>Bump Electron to the latest</span></div>
      <div className="lti"><span className="ph">Try: 3h, tomorrow, next week</span><span className="in"><b>3h</b></span></div>
      <div className="lto on"><span>In 3 hours</span><span>Sat 1:16 PM</span></div>
      <div className="lto r2"><span>This evening</span><span>Sat 6:00 PM</span></div>
      <div className="lto r3"><span>Tomorrow</span><span>Sun 8:00 AM</span></div>
    </div>
  </div>
);

const CARDS = [
  { title: 'A git worktree per task', body: 'Parallel agents never touch each other’s files.', visual: Worktrees },
  { title: 'A terminal in every thread', body: 'Open a shell in any thread’s worktree with ⌘J.', visual: Terminal },
  { title: 'Review work in the app', body: 'Diffs, pages and docs open beside the question.', visual: Diff },
  { title: 'Set a task to repeat', body: 'Schedule recurring work and review every run.', visual: Repeat },
  { title: 'Notified wherever you are', body: 'Get a nudge the moment a thread needs you.', visual: Notified },
  { title: 'Snooze until later', body: 'Press L to hide a thread until a time you pick.', visual: Snooze },
];

/* For developers: the three that matter when the work is code. */
export default function BuiltIn() {
  const grid = useRef(null);
  const [run, setRun] = useState(false);
  useEffect(() => watch(grid.current, setRun), []);
  return (
    <section id="dev" className={run ? 'sec run' : 'sec'}>
      <div className="wrap" style={{ marginBottom: 40 }}>
        <h2 className="h2 rv">Everything a developer needs, built in.</h2>
        <p className="lede rv d1" style={{ marginTop: 12, fontSize: 15, lineHeight: '22px' }}>A git worktree, a terminal and a diff for every thread.</p>
      </div>
      <div className="wrap bento" ref={grid}>
        {CARDS.slice(0, 3).map((c, i) => <BentoCard key={c.title} className={`rv d${i + 1}`} {...c} />)}
      </div>
    </section>
  );
}
