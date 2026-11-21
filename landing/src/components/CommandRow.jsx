export default function CommandRow({ sel = 'no', fx = 'none', glyph = '', label = '', hotkey = '' }) {
  return (
    <div className="cr" data-sel={sel} data-fx={fx}>
      <i className="cg">{glyph}</i><span className="cl">{label}</span><kbd className="ck">{hotkey}</kbd>
    </div>
  );
}
