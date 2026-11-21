import { useEffect, useRef, useState } from 'react';
import { IcCloud } from '../components/AppIcons.jsx';
import BentoCard from '../components/BentoCard.jsx';
import { watch } from '../lib/motion.js';
import { variant } from '../lib/variant.js';

/* Agentcloud, drawn the way the team cards are drawn: one glass panel per card on the halftone
   backdrop. The loops are pure CSS and run only while the section is on screen. */

const Status = ({ state, children }) => <span className="ust" data-state={state}><i className="gl" />{children}</span>;
const InCloud = () => <span className="ust ucl"><IcCloud />Working</span>;

/* a computer per thread: the front one runs its tests while the ones behind it work */
const BOXES = [['w-b04e', 'Search misses archived threads'], ['w-7c21', 'Dark mode flashes white on launch'], ['w-3f9a', 'Snooze survives a restart']];
function Machines({ lines = 2 }) {
  return (
    <div className="shot mch" aria-hidden="true">
      <div className="mstk" data-lines={lines}>
        {BOXES.map(([id, title], i) => (
          <div key={id} className={`ui mbx m${i}`}>
            <div className="mbh"><strong>{id}</strong><span>Linux · 8 GB</span><em>{title}</em></div>
            {i === BOXES.length - 1 && (
              <div className="mbb">
                <div><span className="cp">$</span><span className="ty">npm test</span></div>
                <div className="ok1">✓ 48 passed</div>
                {lines > 2 && <div className="ok2">✓ agentbox/w-3f9a is clean</div>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* the In progress list while the Mac sleeps: every row runs in the cloud, and one comes back */
const AWAY = ['Dark mode flashes white on launch', 'Snooze survives a restart', 'Search misses archived threads'];
const Away = (
  <div className="shot" aria-hidden="true">
    <div className="ui awy">
      <div className="awh"><b>In progress</b><span>3</span></div>
      {AWAY.map((title, i) => (
        <div key={title} className={i === 1 ? 'awr flip' : 'awr'}>
          <span className="awt">{title}</span>
          <span className="pps"><InCloud />{i === 1 && <Status state="waiting">Needs you</Status>}</span>
        </div>
      ))}
    </div>
  </div>
);

/* the phone: the thread that came back, with its question and the two answers */
const Phone = (
  <div className="shot phs" aria-hidden="true">
    <div className="ui phn">
      <div className="phb"><b>9:41</b><i /></div>
      <div className="phh">Needs you<b>1</b></div>
      <div className="phc">
        <span className="phm">Desktop · just now</span>
        <b>Snooze survives a restart</b>
        <p>Every test passes. Merge it?</p>
        <div className="pho on"><span>1</span>Merge it</div>
        <div className="pho"><span>2</span>Not yet</div>
      </div>
    </div>
  </div>
);

const POINTS = [
  { title: 'A Linux machine per thread', body: 'Each one has 8 GB of memory to itself.', visual: <Machines /> },
  { title: 'Works with your laptop shut', body: 'Cloud threads keep going while your Mac sleeps.', visual: Away },
  { title: 'Answer from your phone', body: 'Reply to the threads that need you from anywhere.', visual: Phone },
];

const Head = ({ center }) => (
  <div className="wrap cdh" style={center ? { textAlign: 'center' } : undefined}>
    <h2 className="h2 rv">Every agent gets its own computer.</h2>
    <p className="lede rv d1">Agentcloud runs your threads in the cloud instead of on your Mac.</p>
  </div>
);

/* a: three cards, as the team section */
const Three = () => (
  <>
    <Head />
    <div className="wrap bento">{POINTS.map((c, i) => <BentoCard key={c.title} className={`rv d${i + 1}`} {...c} />)}</div>
  </>
);

/* b: the words on the left, one big card on the right */
const Split = () => (
  <div className="wrap csp">
    <div className="csl">
      <h2 className="h2 rv">Every agent gets its own computer.</h2>
      <p className="lede rv d1">Agentcloud runs your threads in the cloud instead of on your Mac.</p>
      <div className="csx rv d2">
        {POINTS.map(p => <div key={p.title}><h3>{p.title}</h3><p>{p.body}</p></div>)}
      </div>
    </div>
    <BentoCard className="rv d2 csr" visual={<Machines lines={3} />} />
  </div>
);

/* c: one wide card, a row of machines, and one caption */
const ROW = [['w-7c21', 'Dark mode flashes white', 'npm run build'], ['w-3f9a', 'Snooze survives a restart', 'npm test'], ['w-b04e', 'Search misses archived threads', 'pnpm playwright test'], ['w-91d2', 'Usage meter total is off', 'cargo check']];
const Row = ({ n = 4 }) => (
  <div className="shot crw" aria-hidden="true">
    {ROW.slice(0, n).map(([id, title, cmd], i) => (
      <div key={id} className={i === 1 ? 'ui crm fin' : 'ui crm'}>
        <div className="crt">
          <span>{title}</span>
          <span className="pps"><InCloud />{i === 1 && <Status state="waiting">Needs you</Status>}</span>
        </div>
        <div className="mbh"><strong>{id}</strong><span>Linux · 8 GB</span></div>
        <div className="crb"><span className="cp">$</span><span className="cty" style={{ '--n': `${cmd.length}ch` }}>{cmd}</span>{i === 1 ? <span className="cok">✓ 48 passed</span> : <span className="ccr" />}</div>
      </div>
    ))}
  </div>
);
const Wide = () => (
  <>
    <Head />
    <div className="wrap bento cwd">
      <BentoCard className="rv d2" span="full" title="Keeps working after you close your laptop" body="Answer the threads that need you from your phone." visual={<Row />} />
    </div>
  </>
);

/* d: two cards, the machines wide and the phone beside them */
const Two = () => (
  <>
    <Head />
    <div className="wrap bento ctw">
      <BentoCard className="rv d2" title="A Linux machine per thread, with 8 GB each" body="They keep working after you close your laptop." visual={<Row n={3} />} />
      <BentoCard className="rv d3" {...POINTS[2]} />
    </div>
  </>
);

const LAYOUTS = { a: Three, b: Split, c: Wide, d: Two };

export default function Cloud() {
  const ref = useRef(null);
  const [run, setRun] = useState(false);
  useEffect(() => watch(ref.current, setRun), []);
  const Layout = LAYOUTS[variant('cloud', ['d', 'a', 'b', 'c'])];

  return (
    <section id="cloud" className={run ? 'sec run' : 'sec'} ref={ref}>
      <Layout />
    </section>
  );
}
