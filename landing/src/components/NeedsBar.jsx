import { IcBack, IcDone, IcDown, IcFwd, IcMore, IcSidebar, IcUp } from './AppIcons.jsx';

/* The thread page's top bar in Needs you: the trail on the left, and on the right the place
   in the queue with the arrows beside Done and the menu. effects/inboxDemo.js writes the count
   into the <b> and the place into the second .nm. */
export default function NeedsBar({ empty = 'no', count = '', position = '' }) {
  return (
    <div className="nbr" data-empty={empty}>
      <span className="nbl">
        <IcSidebar /><span className="anv"><IcBack /><IcFwd /></span>
        <span className="nm">Inbox<i>/</i>Needs you<b>{count}</b></span>
      </span>
      <span className="nbt">
        <span className="nm">{position}</span>
        <span className="anv"><IcUp /><IcDown /></span>
        <span className="abt"><IcDone />Done</span>
        <span className="abt ic"><IcMore /></span>
      </span>
    </div>
  );
}
