export default function Keycap({ size = 'md', state = 'idle', children }) {
  return <span className="kc" data-size={size} data-state={state}>{children}</span>;
}
