/* A tiny drawing of the empty inbox; `variant` picks which of the three designs shows. */
export default function DesignTile({ variant = 'allclear', pick = 'none', num = '' }) {
  return (
    <div className="dt" data-variant={variant} data-pick={pick}>
      <div className="dw">
        <div className="dwb"><u /><u /><u /></div>
        <div className="dih">Inbox<span>Needs you</span></div>
        <div className="dbd va">
          <div className="dico"><i /><i /><i /></div>
          <div className="dbig">All clear</div>
          <div className="dmono">Nothing needs you</div>
        </div>
        <div className="dbd vz">
          <div className="dzero">0</div>
          <div className="dmono">Need you</div>
          <div className="dbar" />
          <div className="dmono">12 done today</div>
        </div>
        <div className="dbd vr">
          <div className="dmono">Today</div>
          <h6>You are all caught up</h6>
          <p>Merged<b>9</b></p><p>Published<b>2</b></p><p>Being built<b>1</b></p>
        </div>
      </div>
      <div className="dk"><span>{num}</span></div>
    </div>
  );
}
