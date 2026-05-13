/**
 * Breakpoint utilities for TypeScript / React use.
 * Mirrors the breakpoint primitive tokens.
 *
 * Usage:
 *   import { breakpoints, mq } from '@pluto/foundations';
 *   const styles = { [mq.md]: { padding: '24px' } };
 */

export const breakpoints = {
  xs: '320px',
  sm: '480px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1440px',
  '3xl': '1920px',
} as const;

export type Breakpoint = keyof typeof breakpoints;

/** Generates a min-width media query string for a given breakpoint. */
export const mq = Object.fromEntries(
  Object.entries(breakpoints).map(([key, val]) => [key, `@media (min-width: ${val})`]),
) as Record<Breakpoint, string>;

/** Generates a max-width media query (use sparingly — mobile-first preferred). */
export const mqMax = Object.fromEntries(
  Object.entries(breakpoints).map(([key, val]) => [key, `@media (max-width: calc(${val} - 1px))`]),
) as Record<Breakpoint, string>;

/** Returns true if the viewport matches a min-width breakpoint (runtime only). */
export function matchesBreakpoint(bp: Breakpoint): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(`(min-width: ${breakpoints[bp]})`).matches;
}
