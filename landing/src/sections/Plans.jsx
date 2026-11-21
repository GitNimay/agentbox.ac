import { Claude, Cursor, DeepSeek, Gemini, Grok, Hermes, OpenAI, OpenCode, Pi } from '../components/Brands.jsx';
import Mark from '../components/Mark.jsx';

/* Every harness and model, as a map around Agentbox: the two it runs today on the inner ring,
   lit, and the ones still to come on the outer ring, quieter and marked Soon. Positions are
   angles on two ellipses around the centre of a 1000 by 440 field. */
const LIVE = [[Claude, 'Claude Code', 180], [OpenAI, 'Codex', 0]];
const SOON = [[Grok, 'Grok', 212], [Hermes, 'Hermes Agent', 250], [Pi, 'Pi', 290], [DeepSeek, 'DeepSeek', 328], [Cursor, 'Cursor', 32], [OpenCode, 'OpenCode', 90], [Gemini, 'Gemini CLI', 148]];
const at = (deg, rx, ry) => ({ left: `calc(50% + ${Math.round(Math.cos(deg * Math.PI / 180) * rx)}px)`, top: `calc(50% + ${Math.round(Math.sin(deg * Math.PI / 180) * ry)}px)` });

const Tile = ({ Logo, name, live, style }) => (
  <div className={`${live ? 'hnt live' : 'hnt'}${name === 'Claude Code' ? ' hcc' : ''}`} style={style}>
    <span className="glassy hnl"><Logo /></span>
    <b>{name}</b>
    <em>{live ? 'Live' : 'Soon'}</em>
  </div>
);

export default function Plans() {
  return (
    <section id="plans" className="sec">
      <div className="wrap pnh" style={{ textAlign: 'center' }}>
        <h2 className="h2 rv">Every harness and every model.</h2>
        <p className="lede rv d1">Claude Code and Codex today, on the plans you already pay for, with no API key. More are on the way.</p>
      </div>
      <div className="wrap stage hnw rv d2" aria-hidden="true"><div className="hnm" data-fit="1000" data-wide>
        <svg className="hnr" viewBox="0 0 1000 440"><ellipse cx="500" cy="220" rx="215" ry="82" /><ellipse cx="500" cy="220" rx="440" ry="178" /></svg>
        <div className="glassy hnc"><Mark /></div>
        {LIVE.map(([Logo, name, deg]) => <Tile key={name} Logo={Logo} name={name} live style={at(deg, 215, 82)} />)}
        {SOON.map(([Logo, name, deg]) => <Tile key={name} Logo={Logo} name={name} style={at(deg, 440, 178)} />)}
      </div></div>
    </section>
  );
}
