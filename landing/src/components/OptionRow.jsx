export default function OptionRow({ state = 'plain', nudge = 'no', hotkey = '', label = '', note = '' }) {
  return (
    <div className="or" data-state={state} data-nudge={nudge}>
      <b>{hotkey}</b><span className="olb">{label}</span><span className="onote">{note}</span>
    </div>
  );
}
