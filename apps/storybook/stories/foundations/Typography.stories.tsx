import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

function TypeScale() {
  const scale = [
    { name: 'display.2xl', size: 'var(--pluto-font-size-7xl)', label: 'Display 2XL — 72px' },
    { name: 'display.xl', size: 'var(--pluto-font-size-6xl)', label: 'Display XL — 60px' },
    { name: 'display.lg', size: 'var(--pluto-font-size-5xl)', label: 'Display LG — 48px' },
    { name: 'heading.h1', size: 'var(--pluto-font-size-4xl)', label: 'Heading H1 — 36px' },
    { name: 'heading.h2', size: 'var(--pluto-font-size-3xl)', label: 'Heading H2 — 30px' },
    { name: 'heading.h3', size: 'var(--pluto-font-size-2xl)', label: 'Heading H3 — 24px' },
    { name: 'heading.h4', size: 'var(--pluto-font-size-xl)', label: 'Heading H4 — 20px' },
    { name: 'heading.h5', size: 'var(--pluto-font-size-lg)', label: 'Heading H5 — 18px' },
    { name: 'body.lg', size: 'var(--pluto-font-size-lg)', label: 'Body LG — 18px' },
    { name: 'body.md', size: 'var(--pluto-font-size-md)', label: 'Body MD — 16px (Base)' },
    { name: 'body.sm', size: 'var(--pluto-font-size-sm)', label: 'Body SM — 14px' },
    { name: 'label.md', size: 'var(--pluto-font-size-sm)', label: 'Label MD — 14px' },
    { name: 'caption.md', size: 'var(--pluto-font-size-xs)', label: 'Caption MD — 12px' },
    { name: 'caption.sm', size: 'var(--pluto-font-size-2xs)', label: 'Caption SM — 10px' },
  ];

  return (
    <div style={{ padding: '24px', fontFamily: 'var(--pluto-font-family-sans)' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Type Scale</h1>
      <p
        style={{
          fontSize: '14px',
          color: 'var(--pluto-color-text-secondary)',
          marginBottom: '40px',
        }}
      >
        Major Third (1.25) modular scale. Base: 16px. All sizes reference{' '}
        <code>--pluto-font-size-*</code> CSS custom properties.
      </p>

      <div
        style={{ borderLeft: '2px solid var(--pluto-color-border-default)', paddingLeft: '24px' }}
      >
        {scale.map((item) => (
          <div
            key={item.name}
            style={{
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'baseline',
              gap: '24px',
            }}
          >
            <div style={{ fontSize: item.size, lineHeight: 1.2, flex: 1 }}>The quick brown fox</div>
            <div style={{ minWidth: '220px', textAlign: 'right' }}>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--pluto-color-text-secondary)',
                }}
              >
                {item.name}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--pluto-color-text-tertiary)' }}>
                {item.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FontWeights() {
  const weights = [
    { name: 'thin', value: 100 },
    { name: 'extralight', value: 200 },
    { name: 'light', value: 300 },
    { name: 'regular', value: 400 },
    { name: 'medium', value: 500 },
    { name: 'semibold', value: 600 },
    { name: 'bold', value: 700 },
    { name: 'extrabold', value: 800 },
    { name: 'black', value: 900 },
  ];

  return (
    <div style={{ padding: '24px', fontFamily: 'var(--pluto-font-family-sans)' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Font Weights</h1>
      <p
        style={{
          fontSize: '14px',
          color: 'var(--pluto-color-text-secondary)',
          marginBottom: '40px',
        }}
      >
        Nine-step weight scale. Use semantic weight tokens (heading-weight, body-weight) in
        components rather than raw numeric values.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {weights.map((w) => (
          <div key={w.name} style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div
              style={{
                fontSize: '20px',
                fontWeight: w.value,
                width: '320px',
              }}
            >
              Pluto Design System
            </div>
            <code style={{ fontSize: '12px', color: 'var(--pluto-color-text-tertiary)' }}>
              font.weight.{w.name} — {w.value}
            </code>
          </div>
        ))}
      </div>
    </div>
  );
}

function FontFamilies() {
  const families = [
    {
      name: 'Sans (UI)',
      cssVar: 'var(--pluto-font-family-sans)',
      sample: 'ABCDEFGHIJKLM abcdefghijklm 0123456789',
      usage: 'All UI text, body copy, labels',
    },
    {
      name: 'Mono (Code)',
      cssVar: 'var(--pluto-font-family-mono)',
      sample: 'const token = { $value: "#845EF7" }',
      usage: 'Code blocks, tokens, IDs',
    },
    {
      name: 'Serif (Editorial)',
      cssVar: 'var(--pluto-font-family-serif)',
      sample: 'The quick brown fox jumps over the lazy dog',
      usage: 'Long-form reading, editorial content',
    },
    {
      name: 'Display (Hero)',
      cssVar: 'var(--pluto-font-family-display)',
      sample: 'Pluto Design System',
      usage: 'Hero sections, marketing headings',
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <h1
        style={{
          fontSize: '24px',
          fontWeight: 700,
          marginBottom: '8px',
          fontFamily: 'var(--pluto-font-family-sans)',
        }}
      >
        Font Families
      </h1>
      <p
        style={{
          fontSize: '14px',
          color: 'var(--pluto-color-text-secondary)',
          marginBottom: '40px',
          fontFamily: 'var(--pluto-font-family-sans)',
        }}
      >
        System-first font stacks for performance. Inter loads progressively from the CDN.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {families.map((f) => (
          <div
            key={f.name}
            style={{
              padding: '24px',
              background: 'var(--pluto-color-surface-sunken)',
              borderRadius: '8px',
              border: '1px solid var(--pluto-color-border-default)',
            }}
          >
            <div
              style={{
                fontSize: '28px',
                fontFamily: f.cssVar,
                marginBottom: '12px',
                lineHeight: 1.3,
              }}
            >
              {f.sample}
            </div>
            <div
              style={{
                display: 'flex',
                gap: '24px',
                fontFamily: 'var(--pluto-font-family-sans)',
                fontSize: '12px',
              }}
            >
              <span style={{ fontWeight: 600 }}>{f.name}</span>
              <code style={{ opacity: 0.6 }}>
                --pluto-font-family-{f.name.toLowerCase().split(' ')[0]}
              </code>
              <span style={{ opacity: 0.6 }}>{f.usage}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const meta: Meta = {
  title: 'Foundations/Typography',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Typography foundation: Major Third scale, Inter font stack, nine-step weight scale, and line-height rhythm tokens.',
      },
    },
  },
};

export default meta;

export const Scale: StoryObj = { render: () => <TypeScale />, name: 'Type Scale' };
export const Weights: StoryObj = { render: () => <FontWeights />, name: 'Font Weights' };
export const Families: StoryObj = { render: () => <FontFamilies />, name: 'Font Families' };
