/* A coding agent's plan: its logo, the plan, how much of the week is used, and what it is
   working on now (the children). Glass, like the hero's surfaces. */
export default function PlanCard({ logo = '', name = '', plan = '', week = '', children }) {
  return (
    <div className="pc glassy">
      <div className="pch">
        <span className="pmk"><img src={logo} alt="" width="16" height="16" /></span>
        <div><b>{name}</b><span>{plan}</span></div>
        <i className="pok" title="Signed in" />
      </div>
      <div className="pm">
        <div className="pml"><span>This week</span><b className="pv">{week}</b></div>
        <div className="pbar"><i /></div>
      </div>
      <div className="prows">{children}</div>
    </div>
  );
}
