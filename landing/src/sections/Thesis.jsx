import { useEffect, useRef, useState } from 'react';
import { IcDoc } from '../components/AppIcons.jsx';
import { Linear, Notion, Slack } from '../components/Brands.jsx';
import Mark from '../components/Mark.jsx';
import Who from '../components/Who.jsx';
import { watch } from '../lib/motion.js';

/* The problem in three concrete steps: today an agent's finished work has to be carried by hand
   into Slack to discuss it, Linear to track it and Notion to keep it. On the right, the same
   work as one Agentbox thread: the agent's message, the teammate's reply, the task's status and
   the file, together. The wires carry a pulse while the section is on screen. */
const TOOLS = [
  [Slack, 'Slack', 'You paste the agent’s answer into a channel to discuss it.'],
  [Linear, 'Linear', 'You copy it into a ticket to track it.'],
  [Notion, 'Notion', 'You save the doc it wrote into a page to keep it.'],
];
const Y = [54, 160, 266];

export default function Thesis() {
  const ref = useRef(null);
  const [run, setRun] = useState(false);
  useEffect(() => watch(ref.current, setRun), []);

  return (
    <section id="one" className={run ? 'sec run' : 'sec'} ref={ref}>
      <div className="wrap thh">
        <h2 className="h2 rv">Slack, Linear and Notion were built for people.</h2>
        <p className="lede rv d1">So today an agent finishes in a terminal, and someone carries its work into three tools by hand. In Agentbox it arrives as one thread your team can answer.</p>
      </div>
      <div className="wrap stage thv rv d2" aria-hidden="true">
        <div className="tht">
          <span className="thk">Today</span>
          {TOOLS.map(([Logo, name, does]) => (
            <div key={name} className="glassy thi"><span className="thl"><Logo /></span><span><b>{name}</b><em>{does}</em></span></div>
          ))}
        </div>
        <svg className="thw" viewBox="0 0 300 320" preserveAspectRatio="none">
          {Y.map(y => <path key={y} className="wire" d={`M0 ${y} C150 ${y} 150 160 300 160`} />)}
          {Y.map((y, i) => <path key={`p${y}`} className={`pulse d${i + 2}`} d={`M0 ${y} C150 ${y} 150 160 300 160`} />)}
        </svg>
        <div className="thr">
          <span className="thk">In Agentbox</span>
          <div className="glassy thb">
            <div className="thbh"><span className="thm"><Mark /></span><b>Checkout fails for some carts</b><em>Storefront</em></div>
            <div className="thbl"><Who who="claude" size={24} /><p><b>Claude Code</b>Fixed and tested. Tax now rounds once, on the cart total.</p></div>
            <div className="thbl"><Who who="maya" size={24} /><p><b>Maya</b>That matches the invoices. Merge it.</p></div>
            <div className="thbf"><span className="ust" data-state="waiting"><i className="gl" />Needs you</span><span className="thbd"><IcDoc />Checkout tax fix</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
