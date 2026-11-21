export default function ChoiceCard({ recommended = 'false', pick = 'none', num = '', title = '', body = '' }) {
  return (
    <div className="cc" data-recommended={recommended} data-pick={pick}>
      <strong><i>{num}</i><span>{title}</span><em>Recommended</em></strong>
      <p>{body}</p>
    </div>
  );
}
