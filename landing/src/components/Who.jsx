import { Claude, OpenAI } from './Brands.jsx';

/* Who said it: a person as their drawn face (the app's Notionists faces) on its paper, an agent
   as its engine's mark on a tile. */
const AGENTS = { claude: Claude, codex: OpenAI };
export const PEOPLE = { maya: '#d9d3f5', sam: '#cfe3dc', you: '#f6d9c8' };
const FILE = { maya: 'maya', sam: 'sam', you: 'alex' };

export default function Who({ who, size = 26 }) {
  const Logo = AGENTS[who];
  const style = { '--ws': `${size}px` };
  if (Logo) return <span className={`who bot ${who}`} style={style}><Logo /></span>;
  return <span className="who face" style={{ ...style, background: PEOPLE[who] }}><img src={`/assets/faces/${FILE[who]}.svg`} alt="" /></span>;
}
