/* The Command K palette; the command rows are its children. */
export default function Palette({ show = 'yes', query = '', children }) {
  return (
    <div className="pal" data-show={show}>
      <div className="pq">
        <img src="/assets/icons/search.svg" width="17" height="17" alt="" />
        <span className="ptx">{query}</span><i className="pcur" /><span className="pesc">ESC</span>
      </div>
      <div className="pls">{children}</div>
      <div className="pf"><span><b>↑ ↓</b> move</span><span><b>↵</b> select</span></div>
    </div>
  );
}
