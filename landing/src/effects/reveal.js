/* reveal on scroll: every .rv fades and rises in once, the first time it comes on screen */
import { prefersReducedMotion, qa } from '../lib/motion.js';

export default function startReveal(root) {
  const els = qa(root, '.rv');
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    els.forEach(e => e.classList.add('on'));
    return () => {};
  }
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('on'); io.unobserve(en.target); }
  }), { threshold: 0.15 });
  els.forEach(e => io.observe(e));
  return () => io.disconnect();
}
