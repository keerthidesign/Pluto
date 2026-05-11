/**
 * Screen-reader-only styles as a JS object.
 * Use with inline styles or CSS-in-JS when you cannot use the .pluto-sr-only class.
 */
export const srOnlyStyles = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: 0,
} as const satisfies Record<string, string | number>;
