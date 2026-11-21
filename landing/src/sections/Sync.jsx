import { useEffect, useRef, useState } from 'react';
import { Claude } from '../components/Brands.jsx';
import BentoCard from '../components/BentoCard.jsx';
import Who from '../components/Who.jsx';
import { watch } from '../lib/motion.js';

/* Coming soon: a Claude Code session started in your own terminal shows up in Agentbox beside the
   rest of the work. Two cards in the team cards' recipe: where it starts, and where it lands. */
const Status = ({ state, children }) => <span className="ust" data-state={state}><i className="gl" />{children}</span>;

const Terminal = (
  <div className="shot" aria-hidden="true">
    <div className="syt">
      <div className="syb"><span>~/storefront</span><em>zsh</em></div>
      <div className="sys2">
        <div><span className="cp">$</span>claude</div>
        <div className="syq">Fix the flaky checkout test</div>
        <div className="syw"><span className="ust" data-state="working"><i className="gl" /></span>Reading src/checkout/tax.ts</div>
      </div>
    </div>
  </div>
);

const Landed = (
  <div className="shot" aria-hidden="true">
    <div className="ui syi">
      <div className="syr2 on"><Who who="claude" size={24} /><span className="syn2">Fix the flaky checkout test<em>From your terminal</em></span><Status state="working">Working</Status></div>
      <div className="syr2"><Who who="claude" size={24} /><span className="syn2">Checkout fails for some carts<em>Storefront</em></span><Status state="waiting">Needs you</Status></div>
      <div className="syr2"><Who who="sam" size={24} /><span className="syn2">Can an agent take the Android bug?<em>Sam Ortiz</em></span><Status state="done">Answered</Status></div>
    </div>
  </div>
);

export default function Sync() {
  const grid = useRef(null);
  const [run, setRun] = useState(false);
  useEffect(() => watch(grid.current, setRun), []);
  return (
    <section id="sync" className={run ? 'sec run' : 'sec'}>
      <div className="wrap" style={{ marginBottom: 40 }}>
        <span className="soon rv">Coming soon</span>
        <h2 className="h2 rv">Agents you start in your own terminal show up in your inbox.</h2>
      </div>
      <div className="wrap bento syg2" ref={grid}>
        <BentoCard className="rv d1" title="Even agents started outside Agentbox" body="A Claude Code session someone runs in a terminal still reaches the team." visual={Terminal} />
        <BentoCard className="rv d2" title="One inbox, nothing scattered" body="It lands beside every other thread. Personal projects stay yours." visual={Landed} />
      </div>
    </section>
  );
}
