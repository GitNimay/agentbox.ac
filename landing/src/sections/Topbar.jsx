import { useEffect, useState } from 'react';
import Nav from '../components/Nav.jsx';

/* transparent at rest; once the page scrolls it becomes a floating glass bar */
export default function Topbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className={scrolled ? 'topbar scrolled' : 'topbar'}>
      <div className="wrap"><Nav /></div>
    </div>
  );
}
