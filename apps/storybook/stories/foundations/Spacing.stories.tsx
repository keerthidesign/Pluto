import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

function SpacingScale() {
  const steps = [
    { key: '0', px: 0 },
    { key: '0.5', px: 2 },
    { key: '1', px: 4 },
    { key: '1.5', px: 6 },
    { key: '2', px: 8 },
    { key: '2.5', px: 10 },
    { key: '3', px: 12 },
    { key: '3.5', px: 14 },
    { key: '4', px: 16 },
    { key: '5', px: 20 },
    { key: '6', px: 24 },
    { key: '7', px: 28 },
    { key: '8', px: 32 },
    { key: '9', px: 36 },
    { key: '10', px: 40 },
    { key: '11', px: 44 },
    { key: '12', px: 48 },
    { key: '14', px: 56 },
    { key: '16', px: 64 },
    { key: '20', px: 80 },
    { key: '24', px: 96 },
    { key: '32', px: 128 },
  ];

  return (
    <div style={{ padding: '24px', fontFamily: 'var(--pluto-font-family-sans)' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Spacing Scale</h1>
      <p
        style={{
          fontSize: '14px',
          color: 'var(--pluto-color-text-secondary)',
          marginBottom: '8px',
        }}
      >
        4px base unit. Every value is a multiple of 4px, ensuring pixel-perfect alignment across all
        screen densities.
      </p>
      <p
        style={{
          fontSize: '13px',
          color: 'var(--pluto-color-text-tertiary)',
          marginBottom: '40px',
        }}
      >
        ⚠️ spacing.11 (44px) is the WCAG 2.5.5 minimum touch target size.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {steps.map(({ key, px }) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '80px',
                fontSize: '13px',
                fontWeight: 500,
                textAlign: 'right',
                color: 'var(--pluto-color-text-secondary)',
              }}
            >
              spacing.{key}
            </div>
            <div
              style={{
                width: `${Math.max(px, 2)}px`,
                height: '24px',
                backgroundColor: 'var(--pluto-color-primary-400)',
                borderRadius: '2px',
                minWidth: '2px',
              }}
            />
            <div style={{ fontSize: '12px', color: 'var(--pluto-color-text-tertiary)' }}>
              {px}px {key === '11' ? '← touch target min' : ''}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SemanticSpacing() {
  const groups = [
    {
      label: 'Inset (Padding)',
      tokens: ['xs (8px)', 'sm (12px)', 'md (16px)', 'lg (24px)', 'xl (32px)', '2xl (48px)'],
      cssVars: [
        '--pluto-space-inset-xs',
        '--pluto-space-inset-sm',
        '--pluto-space-inset-md',
        '--pluto-space-inset-lg',
        '--pluto-space-inset-xl',
        '--pluto-space-inset-2xl',
      ],
    },
    {
      label: 'Stack (Vertical Gap)',
      tokens: [
        'xs (4px)',
        'sm (8px)',
        'md (16px)',
        'lg (24px)',
        'xl (32px)',
        '2xl (48px)',
        '3xl (80px)',
      ],
      cssVars: [
        '--pluto-space-stack-xs',
        '--pluto-space-stack-sm',
        '--pluto-space-stack-md',
        '--pluto-space-stack-lg',
        '--pluto-space-stack-xl',
        '--pluto-space-stack-2xl',
        '--pluto-space-stack-3xl',
      ],
    },
    {
      label: 'Inline (Horizontal Gap)',
      tokens: ['xs (4px)', 'sm (8px)', 'md (12px)', 'lg (16px)', 'xl (24px)'],
      cssVars: [
        '--pluto-space-inline-xs',
        '--pluto-space-inline-sm',
        '--pluto-space-inline-md',
        '--pluto-space-inline-lg',
        '--pluto-space-inline-xl',
      ],
    },
  ];

  return (
    <div style={{ padding: '24px', fontFamily: 'var(--pluto-font-family-sans)' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Semantic Spacing</h1>
      <p
        style={{
          fontSize: '14px',
          color: 'var(--pluto-color-text-secondary)',
          marginBottom: '40px',
        }}
      >
        Named spacing roles replace ad-hoc numeric values. Inset = padding (all sides), Stack =
        vertical gaps, Inline = horizontal gaps.
      </p>
      {groups.map((g) => (
        <div key={g.label} style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>{g.label}</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {g.tokens.map((t, i) => (
              <div
                key={t}
                style={{
                  padding: '12px',
                  background: 'var(--pluto-color-surface-sunken)',
                  borderRadius: '6px',
                  border: '1px solid var(--pluto-color-border-default)',
                  textAlign: 'center',
                  minWidth: '100px',
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: 500 }}>{t}</div>
                <code style={{ fontSize: '10px', opacity: 0.6 }}>{g.cssVars[i]}</code>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const meta: Meta = {
  title: 'Foundations/Spacing',
  tags: ['autodocs'],
};

export default meta;

export const Scale: StoryObj = { render: () => <SpacingScale />, name: 'Spacing Scale' };
export const Semantic: StoryObj = { render: () => <SemanticSpacing />, name: 'Semantic Spacing' };
