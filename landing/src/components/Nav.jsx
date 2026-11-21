import Mark from './Mark.jsx';
import Button from './Button.jsx';
import GitHubIcon from './GitHubIcon.jsx';
import { GITHUB_URL } from '../lib/links.js';

export default function Nav() {
  return (
    <nav className="nv">
      <a className="brand" href="/"><span className="tile"><Mark tone="ink" /></span>Agentbox</a>
      <div className="act">
        <div className="links">
          <a href="/guides">Guides</a>
          <a href={GITHUB_URL} target="_blank" rel="noopener"><GitHubIcon />GitHub</a>
        </div>
        <Button href="#get">Mac and Linux</Button>
      </div>
    </nav>
  );
}
