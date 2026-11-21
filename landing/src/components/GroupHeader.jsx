/* A board column's head (status glyph, mono name, count) or, in the list, a plain section name. */
export default function GroupHeader({ state = 'none', tone = 'plain', view = 'list', label = '', count = '' }) {
  return (
    <div className="gh" data-state={state} data-tone={tone} data-view={view}>
      <i className="gl" /><span>{label}</span><b>{count}</b>
    </div>
  );
}
