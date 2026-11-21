import { useEffect, useRef } from 'react';
import Button from '../components/Button.jsx';
import CopyCommand from '../components/CopyCommand.jsx';
import startStreaks from '../effects/streaks.js';

/* behind the download cards: the whole section, a little brighter, fading in at the top and out at the bottom */
const FIELD = { every: 2, alpha: 0.85, fade: f => Math.min(1, 1.5 * Math.sin(Math.PI * f)) };
const subtitle = { marginTop: 12, fontSize: 15, lineHeight: '22px', color: 'var(--color-ink-soft)' };

export default function Get() {
  const field = useRef(null);
  useEffect(() => startStreaks(field.current, FIELD), []);

  return (
    <section id="get" className="sec">
      <canvas ref={field} className="field" aria-hidden="true" />
      <div className="wrap" style={{ textAlign: 'center' }}>
        <h2 className="h2 rv">Get Agentbox for Mac or Linux.</h2>
        <p className="rv d1" style={subtitle}>Free and open source. Runs on your machine.</p>
      </div>
      <div className="wrap gg rv d2">
        <div className="gk glassy">
          <span className="gt"><img src="/assets/icons/apple.svg" width="16" height="16" alt="" /></span>
          <h3>macOS</h3>
          <p>Native app for Apple silicon and Intel.</p>
          <Button href="/download">Download for Mac</Button>
        </div>
        <div className="gk glassy">
          <span className="gt"><img src="/assets/icons/linux.svg" width="16" height="16" alt="" /></span>
          <h3>Linux</h3>
          <p>Runs locally, right in your browser.</p>
          <CopyCommand command="npx agentbox-app" />
        </div>
      </div>
    </section>
  );
}
