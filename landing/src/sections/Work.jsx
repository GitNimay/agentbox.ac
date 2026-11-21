import { useEffect, useRef, useState } from 'react';
import { IcDoc } from '../components/AppIcons.jsx';
import BentoCard from '../components/BentoCard.jsx';
import Who from '../components/Who.jsx';
import { watch } from '../lib/motion.js';

/* Working together on what the agents made: a thread handed over with everything in it, a file
   shared with the team, the conversation in the thread, and every file in one place. Each is a
   few glass pieces on the dotted backdrop, the same recipe as the team cards. */

/* the thread as Maya receives it: who gave it, the note, and everything it carries */
const Handoff = (
  <div className="shot wkh" aria-hidden="true">
    <div className="ui wkt">
      <div className="wkg"><Who who="you" size={20} /><span><b>Alex</b> gave you this <em>just now</em></span><q>You know the tax code best.</q></div>
      <b className="wkn">Checkout fails for some carts</b>
      <div className="wkc">
        <span><Who who="claude" size={18} />Claude Code fixed it and ran 48 tests</span>
        <span><i className="wki"><IcDoc /></i>Checkout tax fix, written up</span>
        <span><i className="wki dif">±</i>src/checkout/tax.ts<em><b>+2</b> <s>−1</s></em></span>
      </div>
      <div className="wkr">Reply to Alex or the agent…<kbd>R</kbd></div>
    </div>
  </div>
);

/* a page the agent drew, shared with the team from its own menu */
const Share = (
  <div className="shot wks" aria-hidden="true">
    <div className="ui wkp">
      <div className="wkph"><IcDoc />Pricing page<em>Version 3</em></div>
      <div className="wkpg">
        <b>Pricing that grows with you</b>
        <div className="wk3"><i /><i className="hot" /><i /></div>
      </div>
    </div>
    <div className="ui wkm">
      <div className="wkmh">Share “Pricing page”</div>
      <div className="wkmr"><span className="wkte">S</span><span>Storefront team<em>4 people</em></span><u>Can comment</u></div>
      <div className="wkmr"><Who who="maya" size={22} /><span>Maya Chen<em>maya@storefront.dev</em></span><u>Can edit</u></div>
      <div className="wkmb"><span>Copy link</span><b>Share</b></div>
    </div>
  </div>
);

/* the conversation in the thread: the agent's two drafts, Maya's pick, and the agent building it */
const SAID = [
  ['claude', 'Claude Code', '2:14 PM', 'I drew two layouts. A puts the free plan first.'],
  ['maya', 'Maya Chen', '2:20 PM', 'A. Most people ask about free first.'],
  ['you', 'You', '2:22 PM', 'Agreed. Build A.'],
];
const Talk = (
  <div className="shot wkk" aria-hidden="true">
    <div className="ui wkv">
      <div className="wkvh">Pricing page<em>Storefront</em></div>
      {SAID.map(([who, name, at, text], i) => (
        <div key={at} className="wkl sl" style={{ '--i': i }}>
          <Who who={who} size={28} />
          <div><div className="wklh"><b>{name}</b><span>{at}</span></div><p>{text}</p></div>
        </div>
      ))}
      <div className="wkl sl" style={{ '--i': 3 }}>
        <Who who="claude" size={28} />
        <div><div className="wklh"><b>Claude Code</b><span>2:22 PM</span></div><p className="wkw"><span className="ust" data-state="working"><i className="gl" /></span>Building layout A</p></div>
      </div>
    </div>
  </div>
);

/* everything the team and its agents made, each with its version and who approved it */
const FILES = [
  ['doc', 'Checkout tax fix', 'Version 2 · Claude Code', 'Approved by Maya'],
  ['deck', 'Launch plan', 'Version 4 · Sam', '12 slides'],
  ['table', 'Usage by week', 'Version 1 · Codex', 'Approved by you'],
];
const Files = (
  <div className="shot wkf" aria-hidden="true"><div className="wkfan" data-fit="600">
    {FILES.map(([kind, name, meta, mark], i) => (
      <div key={name} className={`ui wkd ${kind}`} style={{ '--i': i }}>
        <div className="wkdp">
          {kind === 'doc' && <><b>Checkout tax fix</b><i /><i /><i className="s" /><i /></>}
          {kind === 'deck' && <><b>Launch plan</b><div className="wkdk"><span>Nov 24</span><span>Pricing</span><span>Press</span></div></>}
          {kind === 'table' && <div className="wkdt">{['Week', 'Threads', 'Merged', 'Nov 3', '41', '33', 'Nov 10', '57', '48', 'Nov 17', '73', '61'].map((c, n) => <span key={n}>{c}</span>)}</div>}
        </div>
        <div className="wkdm"><b>{name}</b><span>{meta}</span><em>{mark}</em></div>
      </div>
    ))}
  </div></div>
);

const CARDS = [
  { title: 'Hand off a thread with everything in it', body: 'The agent’s work, its files and your note arrive together.', visual: Handoff },
  { title: 'Share what your agents make', body: 'Pages, docs and decks go to the team from the file itself.', visual: Share },
  { title: 'Decide in the thread', body: 'Teammates and agents talk it over where the work is.', visual: Talk },
  { title: 'Every file in one place', body: 'Each one with its versions and who approved it.', visual: Files },
];

export default function Work() {
  const grid = useRef(null);
  const [run, setRun] = useState(false);
  useEffect(() => watch(grid.current, setRun), []);
  return (
    <section id="work" className={run ? 'sec run' : 'sec'}>
      <div className="wrap" style={{ marginBottom: 40 }}>
        <h2 className="h2 rv">Hand a thread to a teammate and the agent’s work, files and decisions go with it.</h2>
      </div>
      <div className="wrap bento wkb" ref={grid}>
        {CARDS.map((c, i) => <BentoCard key={c.title} className={`rv d${(i % 2) + 1}`} {...c} />)}
      </div>
    </section>
  );
}
