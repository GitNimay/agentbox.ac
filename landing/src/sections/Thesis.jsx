import { useEffect, useRef, useState } from 'react';
import { Linear, Notion, Slack } from '../components/Brands.jsx';
import Mark from '../components/Mark.jsx';
import { watch } from '../lib/motion.js';

/* The thesis: the tools a team runs on were built for people only. Three of them feed one
   place that people and agents share. The wires carry a pulse into Agentbox while the section
   is on screen. */
const TOOLS = [
  [Slack, 'Slack', 'Where people talk'],
  [Linear, 'Linear', 'Where the work is tracked'],
  [Notion, 'Notion', 'Where the docs live'],
];
const Y = [44, 150, 256];

export default function Thesis() {
  const ref = useRef(null);
  const [run, setRun] = useState(false);
  useEffect(() => watch(ref.current, setRun), []);

  return (
    <section id="one" className={run ? 'sec run' : 'sec'} ref={ref}>
      <div className="wrap thh">
        <h2 className="h2 rv">Slack, Linear and Notion were built for people.</h2>
        <p className="lede rv d1">Your team works with agents now. Agentbox puts the conversation, the work and the files in one place that people and agents share.</p>
      </div>
      <div className="wrap stage thv rv d2" aria-hidden="true">
        <div className="tht">
          {TOOLS.map(([Logo, name, does]) => (
            <div key={name} className="glassy thi"><span className="thl"><Logo /></span><span><b>{name}</b><em>{does}</em></span></div>
          ))}
        </div>
        <svg className="thw" viewBox="0 0 300 300" preserveAspectRatio="none">
          {Y.map(y => <path key={y} className="wire" d={`M0 ${y} C150 ${y} 150 150 300 150`} />)}
          {Y.map((y, i) => <path key={`p${y}`} className={`pulse d${i + 2}`} d={`M0 ${y} C150 ${y} 150 150 300 150`} />)}
        </svg>
        <div className="glassy thb">
          <span className="thm"><Mark /></span>
          <b>Agentbox</b>
          <em>Your team and its agents, in one place</em>
        </div>
      </div>
    </section>
  );
}
