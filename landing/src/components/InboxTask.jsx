import { IcDoc } from './AppIcons.jsx';

/* One thread in Needs you, as the app's thread page draws it: when it came back, the title and
   its summary, what the agent asks and says, the file it made, the options strip and the reply
   bar on the left; the file itself open beside it on the right. */
export default function InboxTask({ live = 'none', meta = '', title = '', summary = '', ask = '', body = '', optionsTitle = '', paneTitle = '', paneNote = '', options, reply, pane }) {
  return (
    <div className="it" data-live={live}>
      <div className="sp">
        <div className="l">
          <div className="mt">{meta}</div>
          <h3>{title}</h3>
          <p className="sm">{summary}</p>
          <p className="ask">{ask}</p>
          <p className="bd">{body}</p>
          <span className="fl"><IcDoc />{paneTitle}</span>
          <div className="lv"><i /><span /></div>
          <div className="ob">
            <div className="oh">{optionsTitle}</div>
            {options}
          </div>
          {reply}
        </div>
        <div className="r">
          <div className="ph"><span><IcDoc />{paneTitle}</span><span className="mt">{paneNote}</span></div>
          <div className="pb">{pane}</div>
        </div>
      </div>
    </div>
  );
}
