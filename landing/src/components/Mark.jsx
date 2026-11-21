export default function Mark({ tone = 'light' }) {
  return (
    <svg className="mk" data-tone={tone} viewBox="0 0 30 30" aria-label="Agentbox">
      <g className="d">
        <circle cx="5" cy="5" r="3.2" /><circle cx="15" cy="5" r="3.2" />
        <circle cx="5" cy="15" r="3.2" /><circle cx="15" cy="15" r="3.2" /><circle cx="25" cy="15" r="3.2" />
        <circle cx="5" cy="25" r="3.2" /><circle cx="15" cy="25" r="3.2" /><circle cx="25" cy="25" r="3.2" />
      </g>
      <circle className="a" cx="25" cy="5" r="3.2" />
    </svg>
  );
}
