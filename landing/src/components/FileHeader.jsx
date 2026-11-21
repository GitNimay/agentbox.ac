export default function FileHeader({ tone = 'file', path = '', stat = '' }) {
  return <div className="fhd" data-tone={tone}><span>{path}</span><span>{stat}</span></div>;
}
