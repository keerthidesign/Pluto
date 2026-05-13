/**
 * Focus ring utilities — programmatic focus management.
 * Implements WCAG 2.4.7 (Focus Visible) and 2.4.11 (Focus Appearance).
 */

export const focusRingStyles = {
  outline: '2px solid var(--pluto-color-border-focus)',
  outlineOffset: '2px',
} as const;

export const focusRingWithinStyles = {
  boxShadow: '0 0 0 2px var(--pluto-color-border-focus)',
} as const;

/** Inline style object for focus ring on custom interactive elements. Compatible with React.CSSProperties. */
export function getFocusRingStyle(
  inset = false,
): typeof focusRingWithinStyles | typeof focusRingStyles {
  if (inset) return focusRingWithinStyles;
  return focusRingStyles;
}
