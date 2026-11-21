import { AppMark, IcBack, IcFile, IcFilters, IcFwd, IcHome, IcInbox, IcLink, IcPen, IcSearch, IcSend, IcSliders } from './AppIcons.jsx';

/* The app's frame: the icon rail on the left (Inbox lit, with its unread dot) and the
   bordered page beside it. As in renderer/src/components/WorkspaceNavigation.tsx. */
export default function AppShell({ children }) {
  return (
    <div className="ash">
      <nav className="arl" aria-hidden="true">
        <span className="arm"><AppMark /></span>
        <i><IcSearch /></i>
        <i><IcHome /></i>
        <i className="on"><IcInbox /><b /></i>
        <i><IcLink /></i>
        <i><IcFile /></i>
        <span className="arsp" />
        <i><IcSend /></i>
        <i><IcSliders /></i>
      </nav>
      <div className="apn">{children}</div>
    </div>
  );
}

/* The Inbox page's top bar: back and forward, the page name, New thread and the view menu. */
export function ListTop({ title = 'Inbox' }) {
  return (
    <div className="atp">
      <span className="anv"><IcBack /><IcFwd /></span>
      <h4>{title}</h4>
      <span className="aac"><span className="abt"><IcPen />New thread</span><span className="abt ic"><IcFilters /></span></span>
    </div>
  );
}

/* Needs you, In progress, Later, Done: mono words, the open one underlined in the accent. */
export function Tabs({ on = 'needs', needs, progress, later }) {
  const tabs = [['needs', 'Needs you', needs], ['progress', 'In progress', progress], ['later', 'Later', later], ['done', 'Done']];
  return (
    <div className="atb">
      {tabs.map(([k, label, n]) => <span key={k} className={k === on ? 'on' : undefined}>{label}{n != null && <b>{n}</b>}</span>)}
    </div>
  );
}
