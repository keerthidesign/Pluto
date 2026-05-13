import * as React from 'react';
import styles from './Button.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style of the button */
  variant?: ButtonVariant;
  /** Size of the button — sm (32px), md (40px), lg (48px) */
  size?: ButtonSize;
  /** Icon rendered before the label. Pass an SVG element. */
  iconLeft?: React.ReactNode;
  /** Icon rendered after the label. Pass an SVG element. */
  iconRight?: React.ReactNode;
  /** Shows a spinner and disables the button */
  loading?: boolean;
  /** Button label */
  children: React.ReactNode;
}

// ─── Spinner ──────────────────────────────────────────────────────────────────

const Spinner = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
    className={styles.spinner}
  >
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="28" strokeDashoffset="10" />
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      iconLeft,
      iconRight,
      loading = false,
      disabled,
      children,
      className,
      ...rest
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;
    const iconSize = size === 'lg' ? 20 : size === 'sm' ? 14 : 16;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading}
        className={[
          styles.btn,
          styles[variant],
          styles[size],
          isDisabled ? styles.disabled : '',
          className ?? '',
        ]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      >
        {loading ? (
          <Spinner size={iconSize} />
        ) : iconLeft ? (
          <span className={styles.icon} aria-hidden="true">
            {iconLeft}
          </span>
        ) : null}

        <span className={styles.label}>{children}</span>

        {!loading && iconRight ? (
          <span className={styles.icon} aria-hidden="true">
            {iconRight}
          </span>
        ) : null}
      </button>
    );
  },
);

Button.displayName = 'Button';
