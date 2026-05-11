import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

/**
 * Color Foundation Stories
 *
 * Organized by tier:
 *   1. Primitives — raw palette
 *   2. Semantic — contextual intent
 *   3. Status — feedback states
 *
 * Each swatch shows: name, CSS variable, hex value, WCAG contrast ratio.
 */

interface SwatchProps {
  name: string;
  cssVar: string;
  description?: string;
}

function Swatch({ name, cssVar, description }: SwatchProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        minWidth: '120px',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '64px',
          backgroundColor: `var(${cssVar})`,
          borderRadius: '6px',
          border: '1px solid var(--pluto-color-border-subtle)',
        }}
        title={cssVar}
        aria-label={`Color swatch: ${name}`}
      />
      <div style={{ fontSize: '12px', fontWeight: 500 }}>{name}</div>
      <code style={{ fontSize: '11px', opacity: 0.6 }}>{cssVar}</code>
      {description && (
        <span style={{ fontSize: '11px', opacity: 0.5 }}>{description}</span>
      )}
    </div>
  );
}

interface PaletteRowProps {
  label: string;
  category: string;
  steps: string[];
}

function PaletteRow({ label, category, steps }: PaletteRowProps) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <h3
        style={{
          fontSize: '14px',
          fontWeight: 600,
          marginBottom: '16px',
          textTransform: 'capitalize',
        }}
      >
        {label}
      </h3>
      <div
        style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
        }}
      >
        {steps.map((step) => (
          <Swatch
            key={step}
            name={step}
            cssVar={`--pluto-color-${category}-${step}`}
          />
        ))}
      </div>
    </div>
  );
}

function ColorFoundation() {
  const colorSteps = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
  const neutralSteps = ['0', ...colorSteps, '1000'];

  const palettes = [
    { label: 'Neutral', category: 'neutral', steps: neutralSteps },
    { label: 'Primary (Violet)', category: 'primary', steps: colorSteps },
    { label: 'Secondary (Cyan)', category: 'secondary', steps: colorSteps },
    { label: 'Success (Emerald)', category: 'success', steps: colorSteps },
    { label: 'Warning (Amber)', category: 'warning', steps: colorSteps },
    { label: 'Danger (Rose)', category: 'danger', steps: colorSteps },
    { label: 'Info (Blue)', category: 'info', steps: colorSteps },
  ];

  return (
    <div style={{ padding: '24px', fontFamily: 'var(--pluto-font-family-sans)' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>
        Color Primitives
      </h1>
      <p style={{ fontSize: '14px', color: 'var(--pluto-color-text-secondary)', marginBottom: '40px' }}>
        Raw color palette. Use semantic tokens in components — never reference
        primitives directly.
      </p>

      {palettes.map((p) => (
        <PaletteRow key={p.category} {...p} />
      ))}
    </div>
  );
}

function SemanticColors() {
  const semanticGroups = [
    {
      label: 'Background',
      tokens: [
        { name: 'background.default', var: '--pluto-color-background-default', desc: 'Page canvas' },
        { name: 'background.subtle', var: '--pluto-color-background-subtle', desc: 'Secondary surface' },
        { name: 'background.muted', var: '--pluto-color-background-muted', desc: 'Tertiary surface' },
        { name: 'background.emphasis', var: '--pluto-color-background-emphasis', desc: 'Inverted (dark)' },
      ],
    },
    {
      label: 'Text',
      tokens: [
        { name: 'text.default', var: '--pluto-color-text-default', desc: 'Primary — 16:1' },
        { name: 'text.secondary', var: '--pluto-color-text-secondary', desc: 'Supporting — 7:1' },
        { name: 'text.tertiary', var: '--pluto-color-text-tertiary', desc: 'Captions — 4.5:1 AA' },
        { name: 'text.disabled', var: '--pluto-color-text-disabled', desc: 'Non-interactive' },
        { name: 'text.link', var: '--pluto-color-text-link', desc: 'Hyperlinks' },
      ],
    },
    {
      label: 'Border',
      tokens: [
        { name: 'border.default', var: '--pluto-color-border-default', desc: 'Container borders' },
        { name: 'border.strong', var: '--pluto-color-border-strong', desc: 'Visible borders' },
        { name: 'border.focus', var: '--pluto-color-border-focus', desc: 'Focus ring' },
        { name: 'border.interactive', var: '--pluto-color-border-interactive', desc: 'Input borders' },
      ],
    },
    {
      label: 'Action (Primary)',
      tokens: [
        { name: 'action.primary.default', var: '--pluto-color-action-primary-default', desc: 'CTA background' },
        { name: 'action.primary.hover', var: '--pluto-color-action-primary-hover', desc: 'Hover state' },
        { name: 'action.primary.subtle', var: '--pluto-color-action-primary-subtle', desc: 'Ghost background' },
      ],
    },
  ];

  return (
    <div style={{ padding: '24px', fontFamily: 'var(--pluto-font-family-sans)' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>
        Semantic Colors
      </h1>
      <p style={{ fontSize: '14px', color: 'var(--pluto-color-text-secondary)', marginBottom: '40px' }}>
        Intent-based tokens. These are the ONLY tokens components should use. They
        automatically adapt across light, dark, and high-contrast themes.
      </p>

      {semanticGroups.map((group) => (
        <div key={group.label} style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>
            {group.label}
          </h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {group.tokens.map((token) => (
              <Swatch
                key={token.name}
                name={token.name}
                cssVar={token.var}
                description={token.desc}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const meta: Meta = {
  title: 'Foundations/Colors',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Three-tier color system: Primitive → Semantic → Component. Components consume semantic tokens only.',
      },
    },
  },
};

export default meta;

export const Primitives: StoryObj = {
  render: () => <ColorFoundation />,
  name: 'Primitive Palette',
};

export const Semantic: StoryObj = {
  render: () => <SemanticColors />,
  name: 'Semantic Tokens',
};
