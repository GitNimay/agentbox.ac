import { useEffect, useRef, useState } from 'react';
import BentoCard from '../components/BentoCard.jsx';
import Face from '../components/Face.jsx';
import { watch } from '../lib/motion.js';

/* Multiplayer: three small looping shots of the app's team pieces (renderer/src/team). The
   loops are pure CSS and only run while the grid is on screen. */

const Status = ({ state, children }) => <span className="ust" data-state={state}><i className="gl" />{children}</span>;

/* Maya opens the picker under her thread and gives it to you with a note; the picker folds
   away and the thread opens for you with her line on top, as renderer/src/team/HandedBy.tsx draws it */
const Handover = (
  <div className="shot ho" aria-hidden="true">
    <div className="ui hot">
      <div className="hgo hgo-in"><div><div className="hdl"><Face name="Maya Chen" size={20} /><span><b>Maya</b> gave you this <em>just now</em></span><span className="hdn">You know the tax code best.</span></div></div></div>
      <b className="hot-t">Checkout fails for some carts</b>
      <p className="hot-s">Fixed tax rounding on big carts. Merge it?</p>
      <div className="hob"><span><Face name="Maya Chen" size={16} />Storefront</span><span className="hgv">Give to…</span></div>
    </div>
    <div className="hgo hgo-out"><div>
      <div className="ui pick">
        <div className="pko"><Face name="Sam Ortiz" size={18} />Sam Ortiz</div>
        <div className="pko pk"><Face name="You" tone="you" size={18} />You<em>↵</em></div>
        <div className="pkn">Note<span>You know the tax code best.</span></div>
      </div>
    </div></div>
  </div>
);

/* the Inbox with its Person column: whose thread, and where it is */
const PEOPLE = [
  ['Checkout tax rounding', 'Maya Chen', 'mate', 'working', 'Working'],
  ['Empty inbox designs', 'Sam Ortiz', 'mate', 'waiting', 'Needs you'],
  ['Snooze survives a restart', 'You', 'you', 'working', 'Working'],
  ['Android sign in loop', 'Maya Chen', 'mate', 'done', 'Done'],
];
const Who = (
  <div className="shot" aria-hidden="true">
    <div className="ui ppl">
      <div className="ppr pph"><span>Thread</span><span>Person</span><span>Status</span></div>
      {PEOPLE.map(([title, name, tone, state, word], i) => (
        <div key={title} className={i === 2 ? 'ppr flip' : 'ppr'}>
          <span className="ppt">{title}</span>
          <span className="ppn"><Face name={name} tone={tone} size={16} />{name.split(' ')[0]}</span>
          <span className="pps"><Status state={state}>{word}</Status>{i === 2 && <Status state="waiting">Needs you</Status>}</span>
        </div>
      ))}
    </div>
  </div>
);

/* the Standup page: one post per person, written from what moved since the last one */
const Standup = (
  <div className="shot" aria-hidden="true">
    <div className="ui su">
      <div className="sut"><b>Monday</b><span>Nov 23</span></div>
      <div className="sup">
        <Face name="Maya Chen" size={28} />
        <div>
          <div className="suh"><b>Maya Chen</b><span>9:00 AM</span></div>
          <p className="sux sl" style={{ '--i': 0 }}>Shipped <u>Retry failed Stripe webhooks</u> and <u>Tax rounding on big carts</u>.</p>
          <p className="sux sl" style={{ '--i': 1 }}>Working on <u>Search misses archived threads</u>.</p>
          <p className="sun sl" style={{ '--i': 2 }}>Needs you on <u>Empty inbox designs</u></p>
        </div>
      </div>
    </div>
  </div>
);

const CARDS = [
  { title: 'Hand a thread to a teammate', body: 'It lands in their inbox with your note.', visual: Handover },
  { title: 'See who is on what', body: 'Everyone’s threads, person by person.', visual: Who },
  { title: 'A standup that writes itself', body: 'One post per person, from what moved.', visual: Standup },
];

export default function Team() {
  const grid = useRef(null);
  const [run, setRun] = useState(false);
  useEffect(() => watch(grid.current, setRun), []);

  return (
    <section id="team" className={run ? 'sec run' : 'sec'}>
      <div className="wrap" style={{ marginBottom: 40 }}>
        <h2 className="h2 rv">Your whole team, one inbox.</h2>
        <p className="lede rv d1" style={{ marginTop: 12, fontSize: 15, lineHeight: '22px' }}>Share a project, and its threads reach everyone on it.</p>
      </div>
      <div className="wrap bento" ref={grid}>
        {CARDS.map((c, i) => <BentoCard key={c.title} className={`rv d${i + 1}`} {...c} />)}
      </div>
    </section>
  );
}
