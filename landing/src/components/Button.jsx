/* External links open in a new tab. */
export default function Button({ tone = 'light', href = '#', children }) {
  const external = href.startsWith('http');
  return (
    <a className="btn" data-tone={tone} href={href} {...(external && { target: '_blank', rel: 'noopener' })}>
      {children}
    </a>
  );
}
