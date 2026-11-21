export default function DiffLine({ kind = 'ctx', num = '', code = '' }) {
  return (
    <div className="dl" data-kind={kind}>
      <em>{num}</em><span className="s" /><span className="c">{code}</span>
    </div>
  );
}
