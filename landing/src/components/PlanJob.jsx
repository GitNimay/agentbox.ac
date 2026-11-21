export default function PlanJob({ fx = 'none', label = '', model = '' }) {
  return (
    <div className="pj" data-fx={fx}>
      <span className="psp" /><span className="pjl">{label}</span><em>{model}</em>
    </div>
  );
}
