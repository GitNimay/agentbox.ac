/* Small helpers shared by the effects in src/effects. Browser only: call them from effects. */

export const prefersReducedMotion = () =>
  !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

/* the page zoom set by effects/fit.js */
export const pageZoom = () => parseFloat(document.body.style.zoom) || 1;

export const q = (root, sel) => root.querySelector(sel);
export const qa = (root, sel) => [...root.querySelectorAll(sel)];

/* addEventListener that returns its own remover */
export function on(target, type, fn, opts) {
  target.addEventListener(type, fn, opts);
  return () => target.removeEventListener(type, fn, opts);
}

/* call cb(true|false) as el comes on and off screen; returns a disconnect function */
export function watch(el, cb, threshold = 0.15) {
  if (!('IntersectionObserver' in window)) { cb(true); return () => {}; }
  const io = new IntersectionObserver(es => es.forEach(e => cb(e.isIntersecting)), { threshold });
  io.observe(el);
  return () => io.disconnect();
}

/* setTimeout that remembers every pending timer, so an effect can cancel them all on cleanup */
export function timers() {
  const live = new Set();
  return {
    set(fn, ms) {
      const h = setTimeout(() => { live.delete(h); fn(); }, ms);
      live.add(h);
      return h;
    },
    clear(h) { clearTimeout(h); live.delete(h); },
    clearAll() { live.forEach(clearTimeout); live.clear(); },
  };
}

/* run fn every frame at ~30fps while el is on screen and the tab is visible; returns a stop function */
export function loopWhileVisible(el, fn, threshold) {
  let raf = 0, visible = false;
  const tick = ms => { raf = requestAnimationFrame(tick); fn(ms); };
  const sync = () => {
    const want = visible && !document.hidden;
    if (want && !raf) raf = requestAnimationFrame(tick);
    else if (!want && raf) { cancelAnimationFrame(raf); raf = 0; }
  };
  const unwatch = watch(el, v => { visible = v; sync(); }, threshold);
  const offVis = on(document, 'visibilitychange', sync);
  return () => { unwatch(); offVis(); cancelAnimationFrame(raf); raf = 0; };
}
