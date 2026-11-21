import Keycap from './Keycap.jsx';

export default function Toast({ kind = 'sent', show = 'yes', what = '' }) {
  return (
    <div className="ts" data-kind={kind} data-show={show}>
      <span className="tt"><span className="f">Sent </span><b>{what}</b><span className="f"> to the agent</span></span>
      <span className="u"><Keycap size="sm">Z</Keycap>Undo</span>
    </div>
  );
}
