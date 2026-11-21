import Who from './Who.jsx';

/* A person: their drawn face when the page knows them, else their initials in mono on a ringed
   disc, as the app draws one without a picture (renderer .tm-av). */
const KNOWN = { maya: 'maya', 'maya chen': 'maya', sam: 'sam', 'sam ortiz': 'sam', you: 'you', alex: 'you' };
export default function Face({ name = '', tone = 'mate', size = 22 }) {
  const known = KNOWN[name.toLowerCase()];
  if (known) return <Who who={known} size={size} />;
  const initials = name.split(/\s+/).map(w => w[0]).join('').slice(0, 2);
  return <i className="fc" data-tone={tone} style={{ '--fs': `${size}px` }}>{initials}</i>;
}
