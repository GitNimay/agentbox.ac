import { useEffect, useRef, useState } from 'react';
import { IcDoc } from '../components/AppIcons.jsx';
import { Linear, Notion, Slack } from '../components/Brands.jsx';
import Mark from '../components/Mark.jsx';
import Who from '../components/Who.jsx';
import { watch } from '../lib/motion.js';

/* Why Agentbox and not the agent each tool added: those tools were built around people, so an
   agent's work in them becomes one more message, status or page. Agentbox's thread is built
   around the agent's work: what it changed, whether the tests pass, the file it made, the one
   decision it needs, and the teammate who makes it. */
const TOOLS = [
  [Slack, 'Slack', 'Built for chat. An agent’s work becomes one more message in a busy channel.'],
  [Linear, 'Linear', 'Built for tickets. An agent’s work becomes a status on an issue.'],
  [Notion, 'Notion', 'Built for pages. An agent’s work becomes a doc someone has to find.'],
];
const Y = [54, 160, 266];

export default function Thesis() {
  const ref = useRef(null);
  const [run, setRun] = useState(false);
  useEffect(() => watch(ref.current, setRun), []);

  return (
    <section id="one" className={run ? 'sec run' : 'sec'} ref={ref}>
      <div className="wrap thh">
        <h2 className="h2 rv">Slack, Linear and Notion added agents. Agentbox is built around them.</h2>
        <p className="lede rv d1">In a tool made for people, an agent’s work becomes one more message, ticket or page. In Agentbox the thread is the work itself: the change, the tests, the files and the one decision your team makes.</p>
      </div>
      <div className="wrap stage thv rv d2" aria-hidden="true">
        <div className="tht">
          <span className="thk">An agent added to one tool</span>
          {TOOLS.map(([Logo, name, does]) => (
            <div key={name} className="glassy thi"><span className="thl"><Logo /></span><span><b>{name}</b><em>{does}</em></span></div>
          ))}
        </div>
        <svg className="thw" viewBox="0 0 300 320" preserveAspectRatio="none">
          {Y.map(y => <path key={y} className="wire" d={`M0 ${y} C150 ${y} 150 160 300 160`} />)}
          {Y.map((y, i) => <path key={`p${y}`} className={`pulse d${i + 2}`} d={`M0 ${y} C150 ${y} 150 160 300 160`} />)}
        </svg>
        <div className="thr">
          <span className="thk">A thread in Agentbox</span>
          <div className="glassy thb">
            <div className="thbh"><span className="thm"><Mark /></span><b>Checkout fails for some carts</b><em>Storefront</em></div>
            <div className="thbl"><Who who="claude" size={24} /><p><b>Claude Code</b>Tax now rounds once, on the cart total. Merge it?</p></div>
            <div className="thbw">
              <span className="thbx"><i className="ok">✓</i>48 tests pass</span>
              <span className="thbx"><i>±</i>src/checkout/tax.ts<s><b>+2</b> −1</s></span>
              <span className="thbx"><IcDoc />Checkout tax fix</span>
            </div>
            <div className="thbl"><Who who="maya" size={24} /><p><b>Maya</b>That matches the invoices.</p></div>
            <div className="thbo"><span className="on"><kbd>1</kbd>Merge it</span><span><kbd>2</kbd>Not yet</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
