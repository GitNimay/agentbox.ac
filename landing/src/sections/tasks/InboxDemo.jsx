import { useEffect, useRef } from 'react';
import AppShell from '../../components/AppShell.jsx';
import AppWindow from '../../components/AppWindow.jsx';
import BentoCard from '../../components/BentoCard.jsx';
import Button from '../../components/Button.jsx';
import ChoiceCard from '../../components/ChoiceCard.jsx';
import DesignTile from '../../components/DesignTile.jsx';
import DiffLine from '../../components/DiffLine.jsx';
import FileHeader from '../../components/FileHeader.jsx';
import InboxTask from '../../components/InboxTask.jsx';
import NeedsBar from '../../components/NeedsBar.jsx';
import OptionRow from '../../components/OptionRow.jsx';
import Toast from '../../components/Toast.jsx';
import startInboxDemo from '../../effects/inboxDemo.js';

/* the reply bar under every thread; the demo types into it when it answers in its own words */
const reply = <OptionRow hotkey="R" label="Reply…" note="Opus 5.5" state="reply" />;

/* The four tasks the demo answers in turn. Their order matches TASKS in effects/inboxDemo.js. */
function OfflineMode() {
  return (
    <InboxTask meta="Desktop · came back 4 min ago" title="Offline mode for the desktop app" summary="Planning offline mode. Two ways to build it, written up and waiting on which." ask="Which should I build?" body="Offline mode can go two ways, and the choice shapes everything after it. I wrote both up in approach.md." optionsTitle="Which should I build" paneTitle="approach.md" paneNote="Written by the agent"
      options={<><OptionRow hotkey="1" label="SQLite on the device" note="recommended" state="recommended" /><OptionRow hotkey="2" label="A sync server" /></>} reply={reply}
      pane={
        <div className="doc">
          <h4>Offline mode, two ways</h4>
          <p style={{ marginTop: 6 }}>The app opens, reads and saves with no network, then catches up when it is back.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
            <ChoiceCard num="1" title="SQLite on the device" body="Reads and writes go to a local database first and sync in the background. The smallest change to the app." recommended="true" />
            <ChoiceCard num="2" title="A sync server" body="A server holds the truth and each device keeps a cache. Stronger across many devices, and one more service to run." />
          </div>
          <table className="cmp">
            <tbody>
              <tr><th /><th>SQLite</th><th>Sync server</th></tr>
              <tr><td>Works with no network</td><td className="g">Fully</td><td>Reads only</td></tr>
              <tr><td>New service to run</td><td className="g">None</td><td>One</td></tr>
              <tr><td>Many devices</td><td>Later</td><td className="g">Built in</td></tr>
            </tbody>
          </table>
        </div>
      }
    />
  );
}

function CursorFix() {
  return (
    <InboxTask meta="Desktop · came back 12 min ago" title="J and K stop skipping rows after undo" summary="Fixed the cursor after an undo. Tests pass, waiting on the merge." ask="Tests pass. Merge it?" body="The cursor kept its old position after an undo, so the next J jumped a row. It now finds its row again, with a test for it." optionsTitle="Merge the cursor fix?" paneTitle="Code changes" paneNote="+9 −1"
      options={<><OptionRow hotkey="1" label="Merge it" note="recommended" state="recommended" /><OptionRow hotkey="2" label="Change it first" /></>} reply={reply}
      pane={<>
        <FileHeader tone="pass" path="✓ 48 passed · 0 failed" stat="npm test" />
        <FileHeader path="src/list/cursor.ts" stat="+3 −1" />
        <DiffLine num="41" code="export function afterUndo(rows, cursor) {" />
        <DiffLine kind="del" num="42" code="  return cursor.index" />
        <DiffLine kind="add" num="42" code="  const at = rows.findIndex((r) => r.id === cursor.id)" />
        <DiffLine kind="add" num="43" code="  if (at === -1) return Math.min(cursor.index, rows.length - 1)" />
        <DiffLine kind="add" num="44" code="  return at" />
        <DiffLine num="45" code="}" />
        <div style={{ height: 10 }} />
        <FileHeader path="tests/undo-keeps-the-cursor.test.ts" stat="+6" />
        <DiffLine kind="add" num="12" code="it('lands on the next row after an undo', () => {" />
        <DiffLine kind="add" num="13" code="  const rows = list(5)" />
        <DiffLine kind="add" num="14" code="  undo(close(rows, 2))" />
        <DiffLine kind="add" num="15" code="  expect(next(rows)).toBe(rows[3])" />
        <DiffLine kind="add" num="16" code="})" />
        <div className="codeph">
          <span>The code change opens here when you want it.</span>
          <span className="vcc"><Button tone="glass">View code changes</Button></span>
        </div>
      </>}
    />
  );
}

function EmptyInbox() {
  return (
    <InboxTask meta="Desktop · came back 9 min ago" title="Redesign the empty inbox" summary="Three takes on the empty inbox are drawn. Nothing is built yet." ask="Pick one and I will build it." body="I drew three takes on the empty inbox, inside the app itself." optionsTitle="Pick a design" paneTitle="empty-inbox.html" paneNote="Drawn in your app"
      options={<><OptionRow hotkey="1" label="All clear" /><OptionRow hotkey="2" label="A big zero" /><OptionRow hotkey="3" label="A recap of today" /></>} reply={reply}
      pane={
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, padding: '44px 28px' }}>
          <DesignTile num="1" variant="allclear" /><DesignTile num="2" variant="zero" /><DesignTile num="3" variant="recap" />
        </div>
      }
    />
  );
}

function ReleaseNotes() {
  return (
    <InboxTask meta="Site · came back just now" title="Release notes for 0.9" summary="Drafted the 0.9 notes from everything merged since 0.8." ask="Publish them?" body="I drafted the 0.9 notes from everything that merged since 0.8, in plain words." optionsTitle="Publish the notes?" paneTitle="release-notes-0.9.md" paneNote="Draft"
      options={<><OptionRow hotkey="1" label="Publish them" note="recommended" state="recommended" /><OptionRow hotkey="2" label="Make them shorter" /></>} reply={reply}
      pane={<>
        <div className="doc">
          <h4>Version 0.9</h4>
          <div className="hint" style={{ marginTop: 6, color: 'var(--color-night-faint)' }}>Drafted by the agent</div>
          <h5>New</h5>
          <ul><li className="new">Export any thread as markdown.</li><li className="new">The window remembers its size and place.</li></ul>
          <h5>Fixed</h5>
          <ul><li>J and K no longer skip a row after an undo.</li><li>Snoozed threads stay snoozed after a restart.</li><li>The unread count is right again.</li></ul>
          <p style={{ marginTop: 18 }}>Thanks to everyone who sent in a bug this month.</p>
        </div>
        <div className="stamp">Sent</div>
      </>}
    />
  );
}

const TASKS = [OfflineMode, CursorFix, EmptyInbox, ReleaseNotes];

export default function InboxDemo() {
  const ref = useRef(null);
  useEffect(() => startInboxDemo(ref.current), []);

  return (
    <BentoCard ref={ref} id="demo" span="full" className="rv d1" title="Every decision arrives ready to answer" body="Agents come back with context, a recommendation and options you answer in one key."
      visual={
        <div className="stage">
          <div className="stk b gone" /><div className="stk a gone" />
          <AppWindow>
            <AppShell>
              <NeedsBar count="4" position="1 of 4" />
              <div className="tbody" aria-live="polite">
                <div className="calm"><span className="cl">Nothing needs you right now.</span><span className="cm"><i />Your agents are working</span></div>
                {TASKS.map((Task, i) => <div key={i} className="task" data-i={i}><Task /></div>)}
                <div className="tw"><Toast what="Merge it" show="no" /></div>
              </div>
            </AppShell>
          </AppWindow>
        </div>
      }
    />
  );
}
