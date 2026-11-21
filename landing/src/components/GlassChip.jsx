export default function GlassChip({ icon, label = '' }) {
  return (
    <div className="gc">
      <img src={icon} alt="" width="14" height="14" />
      <span>{label}</span>
    </div>
  );
}
