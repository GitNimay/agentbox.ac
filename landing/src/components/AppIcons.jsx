/* The app's own glyphs, copied from the Agentbox renderer so the mockups draw what the app draws. */
const L = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

export const IcSearch = () => <svg viewBox="0 0 24 24" {...L} strokeWidth="1.25"><circle cx="10.8" cy="10.8" r="6.6" /><path d="M15.6 15.6 20 20" /></svg>;
export const IcHome = () => <svg viewBox="0 0 24 24" {...L} strokeWidth="1.25"><path d="M5 10.4 12 5l7 5.4v8.6a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z" /><path d="M10 20v-4.6a2 2 0 0 1 4 0V20" /></svg>;
export const IcInbox = () => <svg viewBox="0 0 24 24" {...L} strokeWidth="1.25"><path d="M5 7h14M5 12h14M5 17h9" /></svg>;
export const IcLink = () => <svg viewBox="0 0 24 24" {...L} strokeWidth="1.25"><path d="M10 13.5a4 4 0 0 0 5.66 0l2.5-2.5a4 4 0 0 0-5.66-5.66l-1 1" /><path d="M14 10.5a4 4 0 0 0-5.66 0l-2.5 2.5a4 4 0 0 0 5.66 5.66l1-1" /></svg>;
export const IcFile = () => <svg viewBox="0 0 24 24" {...L} strokeWidth="1.25"><path d="M7 4.5h6.5l4 4V19a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5V5a.5.5 0 0 1 .5-.5z" /><path d="M13.5 4.5v4h4" /></svg>;
export const IcSend = () => <svg viewBox="0 0 24 24" {...L} strokeWidth="1.25"><path d="M2.5 11.5 21.5 3l-5 18-5-6.5z" /><path d="M11.5 14.5 21.5 3" /></svg>;
export const IcSliders = () => <svg viewBox="0 0 24 24" {...L} strokeWidth="1.25"><path d="M4.5 8h8M16.5 8h3M4.5 16h3M11.5 16h8" /><circle cx="14.5" cy="8" r="2" /><circle cx="9.5" cy="16" r="2" /></svg>;
export const IcBack = () => <svg viewBox="0 0 16 16" {...L} strokeWidth="1.6"><path d="M10 3.5 5.5 8l4.5 4.5" /></svg>;
export const IcFwd = () => <svg viewBox="0 0 16 16" {...L} strokeWidth="1.6"><path d="M6 3.5 10.5 8 6 12.5" /></svg>;
export const IcUp = () => <svg viewBox="0 0 16 16" {...L} strokeWidth="1.6"><path d="M3.5 10 8 5.5l4.5 4.5" /></svg>;
export const IcDown = () => <svg viewBox="0 0 16 16" {...L} strokeWidth="1.6"><path d="M3.5 6 8 10.5 12.5 6" /></svg>;
export const IcPen = () => <svg viewBox="0 0 24 24" {...L} strokeWidth="1.5"><path d="M12 20h8" /><path d="m4 20 1-4.5L15.5 5a2.1 2.1 0 0 1 3 3L8 18.5 4 20Z" /></svg>;
export const IcFilters = () => <svg viewBox="0 0 24 24" {...L} strokeWidth="1.5"><path d="M4 7h10M18 7h2M4 17h4M12 17h8" /><circle cx="16" cy="7" r="2" /><circle cx="10" cy="17" r="2" /></svg>;
export const IcDone = () => <svg viewBox="0 0 24 24" {...L} strokeWidth="1.5"><path d="m2.5 12.5 4 4L15 8M10.5 16.5 19 8" /></svg>;
export const IcMore = () => <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="6" cy="12" r="1.4" /><circle cx="12" cy="12" r="1.4" /><circle cx="18" cy="12" r="1.4" /></svg>;
export const IcSidebar = () => <svg viewBox="0 0 24 24" {...L} strokeWidth="1.4"><path d="M5 7h14M5 12h10M5 17h12" /></svg>;
export const IcDoc = () => <svg viewBox="0 0 16 16" {...L} strokeWidth="1.2"><path d="M4 1.8h5.2L12.5 5v9.2H4z" /><path d="M9 1.8V5h3.5" /></svg>;
export const IcCloud = () => <svg viewBox="2 5 21 15" {...L} strokeWidth="1.6"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" /></svg>;
export const IcRepeat = () => <svg viewBox="0 0 16 16" {...L} strokeWidth="1.3"><path d="M3 7a4.5 4.5 0 0 1 8-2.8M13 9a4.5 4.5 0 0 1-8 2.8" /><path d="M11.5 1.8v2.6H8.9M4.5 14.2v-2.6h2.6" /></svg>;
export const IcClip = () => <svg viewBox="0 0 24 24" {...L} strokeWidth="1.4"><path d="m20 11-8.5 8.5a5 5 0 0 1-7-7L13 4a3.5 3.5 0 0 1 5 5l-8.5 8.5a2 2 0 0 1-3-3L14 7" /></svg>;

/* the app's mark: nine dots, the top right one in the accent */
export function AppMark() {
  const dots = [[21, 21], [50, 21], [21, 50], [50, 50], [79, 50], [21, 79], [50, 79], [79, 79]];
  return (
    <svg viewBox="10 10 80 80" aria-hidden="true">
      {dots.map(([x, y]) => <circle key={x + '-' + y} cx={x} cy={y} r="10.5" fill="currentColor" fillOpacity=".38" />)}
      <circle cx="79" cy="21" r="10.5" fill="#ee6018" />
    </svg>
  );
}
