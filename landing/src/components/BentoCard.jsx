/* A bento card: a live app screen on a soft textured backdrop, then a title and a line of
   copy. span="full" takes the whole row; `aside` sits right of the copy. */
export default function BentoCard({ ref, id, className, span = 'one', title = '', body = '', visual, aside }) {
  return (
    <article ref={ref} className={className ? `bc ${className}` : 'bc'} id={id} data-span={span}>
      <div className="bv">{visual}</div>
      <div className="bt">
        <div><h3>{title}</h3><p>{body}</p></div>
        <div className="ba">{aside}</div>
      </div>
    </article>
  );
}
