import { useEffect, useRef } from 'react';
import AppShell, { ListTop, Tabs } from '../../components/AppShell.jsx';
import AppWindow from '../../components/AppWindow.jsx';
import BentoCard from '../../components/BentoCard.jsx';
import CommandRow from '../../components/CommandRow.jsx';
import GroupHeader from '../../components/GroupHeader.jsx';
import Palette from '../../components/Palette.jsx';
import ThreadRow from '../../components/ThreadRow.jsx';
import startPrioritiesDemo from '../../effects/prioritiesDemo.js';

/* In progress: three running, five queued. The effect makes the fifth thread (Sign in fails)
   urgent through Command K and pauses the third. */
const THREADS = [
  { state: 'working', priority: 'high', title: 'Dark mode flashes white on launch', project: 'Desktop', age: '4 min ago', status: 'Working' },
  { state: 'working', priority: 'high', title: 'J and K skip rows after undo', project: 'Desktop', age: '9 min ago', status: 'Working' },
  { state: 'working', priority: 'medium', title: 'Export a thread as markdown', project: 'Desktop', age: '12 min ago', status: 'Working' },
  { state: 'queued', priority: 'medium', title: 'Rate limit the webhook endpoint', project: 'API', age: '20 min ago', status: 'Up next' },
  { state: 'queued', priority: 'medium', title: 'Sign in fails for new accounts', project: 'API', age: '22 min ago', status: 'Queued' },
  { state: 'queued', priority: 'low', title: 'Retry failed Stripe webhooks', project: 'API', age: '31 min ago', status: 'Queued' },
  { state: 'queued', priority: 'medium', title: 'Pricing page loads slowly on mobile', project: 'Site', age: '1 hour ago', status: 'Queued' },
  { state: 'queued', priority: 'low', title: 'Write the 2.4 changelog', project: 'Site', age: '2 hours ago', status: 'Queued' },
];
/* the palette's priority commands, as the app words them */
const COMMANDS = [['↑', 'Priority: Urgent'], ['↑', 'Priority: High'], ['↓', 'Priority: Medium (current)'], ['↓', 'Priority: Low']];

export default function PrioritiesDemo() {
  const ref = useRef(null);
  useEffect(() => startPrioritiesDemo(ref.current), []);

  return (
    <BentoCard ref={ref} id="priorities" className="rv d3" title="Urgent work runs first" body="Flag what is urgent and it starts first. The rest waits its turn."
      visual={
        <div className="win">
          <AppWindow>
            <AppShell>
              <ListTop />
              <div className="pst">
                <div className="lh">
                  <Tabs on="progress" needs="3" progress="8" later="2" />
                  <div className="thd"><span>Thread</span><span>Status</span><span>Project</span><span>Priority</span><span>Sent</span></div>
                </div>
                <GroupHeader tone="urgent" label="Urgent" />
                <GroupHeader label="Everything else" />
                {THREADS.map(t => <ThreadRow key={t.title} {...t} />)}
                <div className="dim" />
                <div className="pp">
                  <Palette show="no">
                    {COMMANDS.map(([glyph, label]) => <CommandRow key={label} glyph={glyph} label={label} />)}
                  </Palette>
                </div>
              </div>
            </AppShell>
          </AppWindow>
        </div>
      }
    />
  );
}
