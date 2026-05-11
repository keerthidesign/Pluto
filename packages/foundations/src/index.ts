/**
 * @pluto/foundations
 *
 * TypeScript entry point. CSS is imported separately via package.json exports.
 *
 * Usage in your app:
 *   import '@pluto/tokens/css';
 *   import '@pluto/foundations/reset.css';
 *   import '@pluto/foundations/base.css';
 *
 * For JS utilities:
 *   import { focusRing, srOnly } from '@pluto/foundations';
 */

export * from './utils/focusRing';
export * from './utils/srOnly';
export * from './utils/mediaQuery';
