import Mark from './Mark.jsx';
import GitHubIcon from './GitHubIcon.jsx';
import { GITHUB_URL } from '../lib/links.js';

/* The brand on the left and one quiet link on the right; the hero carries the download. */
export default function Nav() {
  return (
    <nav className="nv">
      <a className="brand" href="/"><span className="tile"><Mark tone="ink" /></span>Agentbox</a>
      <div className="act">
        <div className="links">
          <a href={GITHUB_URL} target="_blank" rel="noopener"><GitHubIcon />GitHub</a>
        </div>
      </div>
    </nav>
  );
}
