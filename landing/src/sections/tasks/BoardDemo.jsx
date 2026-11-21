import { useEffect, useRef } from 'react';
import AppShell, { ListTop, Tabs } from '../../components/AppShell.jsx';
import AppWindow from '../../components/AppWindow.jsx';
import BentoCard from '../../components/BentoCard.jsx';
import GroupHeader from '../../components/GroupHeader.jsx';
import ThreadRow from '../../components/ThreadRow.jsx';
import startBoardDemo from '../../effects/boardDemo.js';

/* the board's four columns, in the app's words and glyphs */
const COLUMNS = [['waiting', 'Needs you', 8], ['progress', 'In progress', 5], ['later', 'Later', 2], ['done', 'Done today', 12]];

/* the list shows Needs you; the board shows them all. Order within a state is the order on screen. */
const THREADS = [
  { state: 'waiting', priority: 'urgent', title: 'Search misses archived threads', project: 'API', age: '6 min ago', status: 'Answered' },
  { state: 'waiting', priority: 'high', title: 'Dark mode flashes white on launch', project: 'Desktop', age: '2 min ago', status: 'Answered' },
  { state: 'waiting', priority: 'high', title: 'Usage meter weekly total is off', project: 'API', age: '19 min ago', status: 'Answered' },
  { state: 'waiting', priority: 'medium', title: 'Redesign the empty inbox', project: 'Desktop', age: '11 min ago', status: 'Answered' },
  { state: 'waiting', priority: 'none', title: 'Snooze survives a restart', project: 'Desktop', age: '24 min ago', status: 'Answered' },
  { state: 'stopped', priority: 'none', title: 'Bump Electron to the latest', project: 'Desktop', age: '1 hour ago', status: 'Stopped' },
  { state: 'waiting', priority: 'low', title: 'Retry failed Stripe webhooks', project: 'API', age: '2 hours ago', status: 'Answered' },
  { state: 'waiting', priority: 'low', title: 'Fix broken links in the docs', project: 'Site', age: 'Yesterday', status: 'Answered' },
  { state: 'progress', priority: 'urgent', title: 'Crash when a folder is renamed', project: 'Desktop', status: 'Working' },
  { state: 'progress', priority: 'high', title: 'J and K skip rows after undo', project: 'Desktop', status: 'Working' },
  { state: 'progress', priority: 'medium', title: 'Rate limit the webhook endpoint', project: 'API', status: 'Working' },
  { state: 'progress', priority: 'none', title: 'Pricing page loads slowly on mobile', project: 'Site', status: 'Working' },
  { state: 'progress', priority: 'low', title: 'Export a thread as markdown', project: 'Desktop', status: 'Working' },
  { state: 'later', priority: 'low', title: 'Write the 2.4 changelog', project: 'Site', status: 'Scheduled' },
  { state: 'later', priority: 'none', title: 'Plan the offline mode', project: 'Desktop', status: 'Scheduled' },
  { state: 'done', priority: 'high', title: 'Flaky upload test on CI', project: 'Desktop', status: 'Done' },
  { state: 'done', priority: 'medium', title: 'Pick a queue for the email jobs', project: 'API', status: 'Done' },
  { state: 'done', priority: 'none', title: 'Tray icon is blurry on Retina', project: 'Desktop', status: 'Done' },
  { state: 'done', priority: 'low', title: 'Add an RSS feed to the blog', project: 'Site', status: 'Done' },
  { state: 'done', priority: 'medium', title: 'Command K matches words in any order', project: 'Desktop', status: 'Done' },
];

export default function BoardDemo() {
  const ref = useRef(null);
  useEffect(() => startBoardDemo(ref.current), []);

  return (
    <BentoCard ref={ref} id="inbox" className="rv d2" title="Every thread at a glance" body="Waiting, in progress, later and done, as an inbox or a board."
      visual={
        <div className="win">
          <AppWindow>
            <AppShell>
              <ListTop />
              <div className="ist">
                <div className="lh">
                  <Tabs on="needs" needs="8" progress="5" later="2" />
                  <div className="thd"><span>Thread</span><span>Status</span><span>Project</span><span>Priority</span><span>Sent</span></div>
                </div>
                {COLUMNS.map(([state, label, count]) => <GroupHeader key={label} view="board" state={state} label={label} count={count} />)}
                {THREADS.map(t => <ThreadRow key={t.title} {...t} />)}
                <div className="fade" />
              </div>
            </AppShell>
          </AppWindow>
        </div>
      }
    />
  );
}
