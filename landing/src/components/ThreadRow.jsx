/* One thread, as the app's Inbox draws it: a table row (title, status, project, priority, sent)
   or a board card (title over a mono line of status, priority and project). Its look is driven
   entirely by the data-* states (see components.css), which the demos switch at runtime.
   The status glyph and the priority label are drawn by CSS. */
export default function ThreadRow({ state = 'waiting', priority = 'none', view = 'row', sel = 'no', fx = 'none', title = '', project = '', age = '', status = '' }) {
  return (
    <div className="tr" data-state={state} data-priority={priority} data-view={view} data-sel={sel} data-fx={fx}>
      <span className="t">{title}</span>
      <span className="st"><i className="gl" /><span className="s">{status}</span></span>
      <span className="pri"><span className="bars"><i /><i /><i /></span><span className="pl" /></span>
      <span className="proj">{project}</span>
      <span className="age">{age}</span>
    </div>
  );
}
