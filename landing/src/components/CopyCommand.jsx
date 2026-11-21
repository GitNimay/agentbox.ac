import { useEffect, useRef, useState } from 'react';

/* A shell command that copies itself; falls back to selecting the text. */
export default function CopyCommand({ command }) {
  const [done, setDone] = useState(false);
  const ref = useRef(null);
  const timer = useRef(0);
  useEffect(() => () => clearTimeout(timer.current), []);

  function copy() {
    (navigator.clipboard ? navigator.clipboard.writeText(command) : Promise.reject())
      .catch(() => {
        const range = document.createRange();
        range.selectNodeContents(ref.current);
        const sel = getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      })
      .then(() => {
        setDone(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setDone(false), 1400);
      });
  }

  return (
    <button ref={ref} className={done ? 'copy done' : 'copy'} type="button" onClick={copy} aria-label={`Copy ${command}`}>
      <span style={{ color: 'var(--color-accent)' }}>$</span>{command}
      <span className="cc2"><img src="/assets/icons/copy.svg" width="14" height="14" alt="" /></span>
    </button>
  );
}
