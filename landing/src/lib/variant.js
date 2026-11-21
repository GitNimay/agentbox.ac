/* While a section's design is being chosen, ?cloud=b or ?plans=c in the address picks an option.
   The prerendered page and a plain address get the first. */
export function variant(name, options) {
  if (typeof window === 'undefined') return options[0];
  const asked = new URLSearchParams(window.location.search).get(name);
  return options.includes(asked) ? asked : options[0];
}
