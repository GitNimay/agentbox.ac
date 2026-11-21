import { useEffect, useRef, useState } from 'react';
import { IcDoc } from '../components/AppIcons.jsx';
import Who from '../components/Who.jsx';
import startStreaks from '../effects/streaks.js';
import { watch } from '../lib/motion.js';

/* out of the mountains under the hero window: a dense, quiet rain, brightest at the top, gone by the bottom */
const FALL = { every: 4, alpha: 0.8, fade: f => Math.pow(1 - f, 0.8) };

/* Communication first: a teammate's question and an agent's finished work land in the same list,
   one after another, each with the way to answer it right there. */
const MSGS = [
  { who: 'maya', name: 'Maya Chen', role: 'Teammate', at: '9:41', text: 'Can you look at the tax fix before the 2pm deploy?', reply: 'Reply to Maya' },
  { who: 'claude', name: 'Claude Code', role: 'Agent', at: '9:43', text: 'Fixed and tested. Tax now rounds once, on the cart total. Merge it?', options: ['Merge it', 'Not yet'] },
  { who: 'sam', name: 'Sam Ortiz', role: 'Teammate', at: '9:44', text: 'I’m out tomorrow. Can one of your agents take the Android bug?', reply: 'Reply to Sam' },
  { who: 'codex', name: 'Codex', role: 'Agent', at: '9:46', text: 'Release notes are drafted from today’s nine merges.', file: 'Release notes' },
];

function Msg({ who, name, role, at, text, reply, options, file, i }) {
  return (
    <div className="gl2 ibc" style={{ '--i': i }}>
      <div className="ibh"><Who who={who} /><b>{name}</b><em>{role}</em><span>{at}</span></div>
      <p>{text}</p>
      {options && <div className="ibo">{options.map((o, n) => <span key={o} className={n ? '' : 'on'}><kbd>{n + 1}</kbd>{o}</span>)}</div>}
      {file && <div className="ibf"><IcDoc />{file}</div>}
      {reply && <div className="ibr">{reply}…<kbd>R</kbd></div>}
    </div>
  );
}

export default function Inbox() {
  const ref = useRef(null), fall = useRef(null);
  const [run, setRun] = useState(false);
  useEffect(() => startStreaks(fall.current, FALL), []);
  useEffect(() => watch(ref.current, v => v && setRun(true)), []);

  return (
    <section id="one-inbox" className={run ? 'sec run' : 'sec'} ref={ref}>
      <canvas ref={fall} className="fall" aria-hidden="true" />
      <div className="wrap ibhd">
        <h2 className="h2 rv">Your teammates and your agents reach you in one inbox.</h2>
        <p className="lede rv d1">A question from Maya and a finished fix from Claude Code land in the same list. Answer each one where it lands.</p>
      </div>
      <div className="wrap stage ibs rv d2" aria-hidden="true">
        <div className="ibl">{MSGS.filter((_, i) => i % 2 === 0).map(m => <Msg key={m.name + m.at} {...m} i={MSGS.indexOf(m)} />)}</div>
        <div className="ibl">{MSGS.filter((_, i) => i % 2 === 1).map(m => <Msg key={m.name + m.at} {...m} i={MSGS.indexOf(m)} />)}</div>
      </div>
    </section>
  );
}
