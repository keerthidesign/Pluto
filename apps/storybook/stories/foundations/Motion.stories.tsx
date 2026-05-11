import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

function DurationDemo() {
  const [active, setActive] = useState<string | null>(null);

  const durations = [
    { name: 'instant', value: '0ms', usage: 'Immediate state changes' },
    { name: 'fast', value: '100ms', usage: 'Hover, focus ring' },
    { name: 'normal', value: '200ms', usage: 'Default transitions' },
    { name: 'slow', value: '300ms', usage: 'Popovers, drawers' },
    { name: 'slower', value: '400ms', usage: 'Modals, page reveals' },
    { name: 'slowest', value: '700ms', usage: 'Skeleton, complex animations' },
  ];

  return (
    <div style={{ padding: '24px', fontFamily: 'var(--pluto-font-family-sans)' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Duration</h1>
      <p style={{ fontSize: '14px', color: 'var(--pluto-color-text-secondary)', marginBottom: '8px' }}>
        Click each row to preview the transition duration. Shorter durations for micro-interactions,
        longer for content entering/leaving the screen.
      </p>
      <p style={{ fontSize: '13px', color: 'var(--pluto-color-text-tertiary)', marginBottom: '32px' }}>
        Note: All animations are disabled when <code>prefers-reduced-motion: reduce</code> is set.
      </p>

      {durations.map((d) => (
        <div
          key={d.name}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            marginBottom: '16px',
            cursor: 'pointer',
          }}
          onClick={() => setActive(active === d.name ? null : d.name)}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor:
                active === d.name
                  ? 'var(--pluto-color-action-primary-default)'
                  : 'var(--pluto-color-primary-200)',
              transition: `all ${d.value} cubic-bezier(0, 0, 0.2, 1)`,
              transform: active === d.name ? 'scale(1.4)' : 'scale(1)',
              flexShrink: 0,
            }}
          />
          <div>
            <div style={{ fontSize: '14px', fontWeight: 500 }}>motion.duration.{d.name}</div>
            <div style={{ fontSize: '12px', color: 'var(--pluto-color-text-tertiary)' }}>
              {d.value} — {d.usage}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function EasingDemo() {
  const [active, setActive] = useState<string | null>(null);

  const easings: { name: string; value: string; usage: string }[] = [
    { name: 'linear', value: 'linear', usage: 'Progress bars, opacity' },
    { name: 'ease-in', value: 'cubic-bezier(0.4, 0, 1, 1)', usage: 'Elements leaving screen' },
    { name: 'ease-out', value: 'cubic-bezier(0, 0, 0.2, 1)', usage: 'Elements entering screen (most common)' },
    { name: 'ease-in-out', value: 'cubic-bezier(0.4, 0, 0.2, 1)', usage: 'Elements moving within screen' },
    { name: 'spring', value: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', usage: 'Playful, approachable' },
    { name: 'bounce', value: 'cubic-bezier(0.34, 1.56, 0.64, 1)', usage: 'Delight moments only' },
  ];

  return (
    <div style={{ padding: '24px', fontFamily: 'var(--pluto-font-family-sans)' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Easing Curves</h1>
      <p style={{ fontSize: '14px', color: 'var(--pluto-color-text-secondary)', marginBottom: '32px' }}>
        Click to animate. Ease-out is the default for most UI — elements decelerate as they enter,
        giving a physical, grounded feel.
      </p>

      {easings.map((e) => (
        <div
          key={e.name}
          style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '16px', cursor: 'pointer' }}
          onClick={() => setActive(active === e.name ? null : e.name)}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '8px',
              backgroundColor: 'var(--pluto-color-primary-500)',
              transition: `transform 500ms ${e.value}`,
              transform: active === e.name ? 'translateX(120px)' : 'translateX(0)',
              flexShrink: 0,
            }}
          />
          <div>
            <div style={{ fontSize: '14px', fontWeight: 500 }}>motion.easing.{e.name}</div>
            <code style={{ fontSize: '11px', color: 'var(--pluto-color-text-tertiary)' }}>{e.value}</code>
            <div style={{ fontSize: '12px', color: 'var(--pluto-color-text-tertiary)' }}>{e.usage}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

const meta: Meta = {
  title: 'Foundations/Motion',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Motion tokens for duration and easing. All values respect prefers-reduced-motion via the CSS layer.',
      },
    },
  },
};

export default meta;

export const Duration: StoryObj = { render: () => <DurationDemo />, name: 'Duration' };
export const Easing: StoryObj = { render: () => <EasingDemo />, name: 'Easing Curves' };
