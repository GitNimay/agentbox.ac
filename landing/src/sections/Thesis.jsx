import { useEffect, useRef, useState } from 'react';
import { Linear, Notion, Slack } from '../components/Brands.jsx';
import Who from '../components/Who.jsx';
import { watch } from '../lib/motion.js';

/* The headline names no other tool; the logos make the comparison. Each of those tools holds one
   part of the work, so a team with agents watches several. In Agentbox the agents are on the team,
   beside the people. */
const TOOLS = [
  [Slack, 'Slack', 'Built for chat. An agent’s work becomes one more message in a busy channel.'],
  [Linear, 'Linear', 'Built for tickets. Agents work there, but your team talks somewhere else.'],
  [Notion, 'Notion', 'Built for docs. Agents write there, but the work happens somewhere else.'],
];
/* where each wire leaves a tool card, and where they meet on the team card, in the svg's own units */
const Y = [48, 159, 271];
const MEET = 137;

const Status = ({ state, children }) => <span className="ust" data-state={state}><i className="gl" />{children}</span>;

const TEAM = [
  { who: 'maya', name: 'Maya Chen', role: 'Teammate', on: 'Reviewing the tax fix', state: 'working', word: 'Working' },
  { who: 'claude', name: 'Claude Code', role: 'Agent', on: 'Fixed checkout tax', state: 'waiting', word: 'Needs Maya' },
  { who: 'sam', name: 'Sam Ortiz', role: 'Teammate', on: 'Android sign-in bug', state: 'working', word: 'Working' },
  { who: 'codex', name: 'Codex', role: 'Agent', on: 'Release notes', state: 'done', word: 'Done' },
];

export default function Thesis() {
  const ref = useRef(null);
  const [run, setRun] = useState(false);
  useEffect(() => watch(ref.current, setRun), []);

  return (
    <section id="one" className={run ? 'sec run' : 'sec'} ref={ref}>
      <div className="wrap thh">
        <h2 className="h2 rv">Agentbox is made for agent-native teams.</h2>
      </div>
      <div className="wrap stage thv rv d2" aria-hidden="true">
        <div className="tht">
          <span className="thk">Tools made for people</span>
          {TOOLS.map(([Logo, name, does]) => (
            <div key={name} className="glassy thi"><span className="thl"><Logo /></span><span><b>{name}</b><em>{does}</em></span></div>
          ))}
        </div>
        <svg className="thw" viewBox="0 0 300 320" preserveAspectRatio="none">
          {Y.map(y => <path key={y} className="wire" d={`M0 ${y} C150 ${y} 150 ${MEET} 300 ${MEET}`} />)}
          {Y.map((y, i) => <path key={`p${y}`} className={`pulse d${i + 2}`} d={`M0 ${y} C150 ${y} 150 ${MEET} 300 ${MEET}`} />)}
        </svg>
        <div className="thr">
          <span className="thk">A team in Agentbox</span>
          <div className="glassy thb tcx">
            <div className="tch"><b>Storefront</b><em>2 people, 2 agents</em></div>
            {TEAM.map(m => (
              <div key={m.name} className="tct">
                <Who who={m.who} size={30} />
                <div><div className="tcn"><b>{m.name}</b><em>{m.role}</em></div><p>{m.on}</p></div>
                <Status state={m.state}>{m.word}</Status>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
