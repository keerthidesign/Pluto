import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

/**
 * Color Foundation Stories
 *
 * Organized by tier:
 *   1. Primitives  — raw palette (neutral, primary, secondary, status scales)
 *   2. Semantic    — all 116 intent-based tokens across 8 groups
 *   3. Status      — success / warning / danger / info feedback tokens
 *
 * Switch themes using the toolbar (Light / Dark / High Contrast) to see
 * how every token adapts automatically.
 */

// ─── Shared Components ────────────────────────────────────────────────────────

interface SwatchProps {
  name: string;
  cssVar: string;
  description?: string;
  textOnTop?: boolean;
}

function Swatch({ name, cssVar, description, textOnTop }: SwatchProps) {
  const label = name.split('/').pop() ?? name;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        minWidth: '110px',
        maxWidth: '140px',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '56px',
          backgroundColor: `var(${cssVar})`,
          borderRadius: '6px',
          border: '1px solid var(--pluto-color-border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        title={`${cssVar} = var(${cssVar})`}
        aria-label={`Color swatch: ${name}`}
      >
        {textOnTop && (
          <span style={{ fontSize: '11px', fontWeight: 600, color: `var(${cssVar})`, filter: 'invert(1) grayscale(1)' }}>
            Aa
          </span>
        )}
      </div>
      <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--pluto-color-text-default)' }}>
        {label}
      </div>
      <code style={{ fontSize: '10px', color: 'var(--pluto-color-text-tertiary)', wordBreak: 'break-all' }}>
        {cssVar}
      </code>
      {description && (
        <span style={{ fontSize: '10px', color: 'var(--pluto-color-text-tertiary)' }}>{description}</span>
      )}
    </div>
  );
}

interface GroupProps {
  label: string;
  description?: string;
  tokens: Array<{ name: string; var: string; desc?: string }>;
}

function TokenGroup({ label, description, tokens }: GroupProps) {
  return (
    <div style={{ marginBottom: '40px' }}>
      <div style={{ marginBottom: '12px' }}>
        <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--pluto-color-text-default)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {label}
        </h3>
        {description && (
          <p style={{ fontSize: '12px', color: 'var(--pluto-color-text-tertiary)', margin: '4px 0 0' }}>{description}</p>
        )}
      </div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {tokens.map((token) => (
          <Swatch key={token.var} name={token.name} cssVar={token.var} description={token.desc} />
        ))}
      </div>
    </div>
  );
}

// ─── Section 1: Primitive Palette ─────────────────────────────────────────────

function ColorFoundation() {
  const colorSteps = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
  const neutralSteps = ['0', ...colorSteps, '1000'];

  const palettes = [
    { label: 'Neutral — Warm Cream',           category: 'neutral',   steps: neutralSteps },
    { label: 'Primary — Golden Yellow',         category: 'primary',   steps: colorSteps },
    { label: 'Secondary — Warm Slate',          category: 'secondary', steps: colorSteps },
    { label: 'Success — Emerald',               category: 'success',   steps: colorSteps },
    { label: 'Warning — Orange',                category: 'warning',   steps: colorSteps },
    { label: 'Danger — Coral Rose',             category: 'danger',    steps: colorSteps },
    { label: 'Info — Sky Blue',                 category: 'info',      steps: colorSteps },
  ];

  return (
    <div style={{ padding: '24px', fontFamily: 'var(--pluto-font-family-sans)', background: 'var(--pluto-color-background-default)', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', color: 'var(--pluto-color-text-heading)' }}>
        Color Primitives
      </h1>
      <p style={{ fontSize: '14px', color: 'var(--pluto-color-text-secondary)', marginBottom: '40px' }}>
        Raw color palette — Warm Cream + Golden Yellow system.
        Never reference these in components — use semantic tokens instead.
      </p>

      {palettes.map(({ label, category, steps }) => (
        <div key={category} style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '12px', color: 'var(--pluto-color-text-default)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {label}
          </h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {steps.map((step) => (
              <Swatch
                key={step}
                name={step}
                cssVar={`--pluto-color-${category}-${step}`}
              />
            ))}
          </div>
        </div>
      ))}

      <div style={{ marginTop: '40px' }}>
        <h3 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '12px', color: 'var(--pluto-color-text-default)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Alpha — Black
        </h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['0','4','8','12','16','24','32','48','64','80'].map((step) => (
            <Swatch key={step} name={`black/${step}`} cssVar={`--pluto-color-alpha-black-${step}`} />
          ))}
        </div>
      </div>

      <div style={{ marginTop: '32px' }}>
        <h3 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '12px', color: 'var(--pluto-color-text-default)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Alpha — White
        </h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['4','8','12','16','24','32','48','64','80'].map((step) => (
            <Swatch key={step} name={`white/${step}`} cssVar={`--pluto-color-alpha-white-${step}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Section 2: All 116 Semantic Tokens ───────────────────────────────────────

function SemanticColors() {
  const groups: GroupProps[] = [
    {
      label: 'Background',
      description: '11 tokens — page canvas, surfaces, status-tinted backgrounds',
      tokens: [
        { name: 'background/default',    var: '--pluto-color-background-default',    desc: 'Page canvas' },
        { name: 'background/subtle',     var: '--pluto-color-background-subtle',     desc: 'Secondary surfaces' },
        { name: 'background/muted',      var: '--pluto-color-background-muted',      desc: 'Tertiary, sidebar' },
        { name: 'background/emphasis',   var: '--pluto-color-background-emphasis',   desc: 'Inverted — dark nav' },
        { name: 'background/disabled',   var: '--pluto-color-background-disabled',   desc: 'Disabled surface' },
        { name: 'background/inverse',    var: '--pluto-color-background-inverse',    desc: 'Opposite theme bg' },
        { name: 'background/on-primary', var: '--pluto-color-background-on-primary', desc: 'Golden tint bg' },
        { name: 'background/on-success', var: '--pluto-color-background-on-success', desc: 'Success tint bg' },
        { name: 'background/on-warning', var: '--pluto-color-background-on-warning', desc: 'Warning tint bg' },
        { name: 'background/on-danger',  var: '--pluto-color-background-on-danger',  desc: 'Danger tint bg' },
        { name: 'background/on-info',    var: '--pluto-color-background-on-info',    desc: 'Info tint bg' },
      ],
    },
    {
      label: 'Surface',
      description: '9 tokens — card, modal, interactive, and inverse surfaces',
      tokens: [
        { name: 'surface/default',     var: '--pluto-color-surface-default',     desc: 'Base surface' },
        { name: 'surface/raised',      var: '--pluto-color-surface-raised',      desc: 'Cards + elevation' },
        { name: 'surface/overlay',     var: '--pluto-color-surface-overlay',     desc: 'Modals, drawers' },
        { name: 'surface/sunken',      var: '--pluto-color-surface-sunken',      desc: 'Code blocks, inset' },
        { name: 'surface/interactive', var: '--pluto-color-surface-interactive', desc: 'Hover rows' },
        { name: 'surface/disabled',    var: '--pluto-color-surface-disabled',    desc: 'Disabled' },
        { name: 'surface/primary',     var: '--pluto-color-surface-primary',     desc: 'Golden-tinted' },
        { name: 'surface/secondary',   var: '--pluto-color-surface-secondary',   desc: 'Slate-tinted' },
        { name: 'surface/inverse',     var: '--pluto-color-surface-inverse',     desc: 'Dark surface in light' },
      ],
    },
    {
      label: 'Text',
      description: '17 tokens — hierarchy, state, and on-color text',
      tokens: [
        { name: 'text/default',      var: '--pluto-color-text-default',      desc: '~16:1 AAA' },
        { name: 'text/secondary',    var: '--pluto-color-text-secondary',     desc: '7:1 AAA' },
        { name: 'text/tertiary',     var: '--pluto-color-text-tertiary',      desc: '4.5:1 AA' },
        { name: 'text/disabled',     var: '--pluto-color-text-disabled',      desc: 'Non-interactive' },
        { name: 'text/inverse',      var: '--pluto-color-text-inverse',       desc: 'On dark surfaces' },
        { name: 'text/link',         var: '--pluto-color-text-link',          desc: 'Hyperlinks 5:1' },
        { name: 'text/link-hover',   var: '--pluto-color-text-link-hover',    desc: 'Link hover' },
        { name: 'text/on-emphasis',  var: '--pluto-color-text-on-emphasis',   desc: 'On dark bg — 21:1' },
        { name: 'text/on-primary',   var: '--pluto-color-text-on-primary',    desc: '⚠ Dark on golden 6:1' },
        { name: 'text/placeholder',  var: '--pluto-color-text-placeholder',   desc: 'Input placeholder' },
        { name: 'text/heading',      var: '--pluto-color-text-heading',       desc: 'Headings' },
        { name: 'text/caption',      var: '--pluto-color-text-caption',       desc: 'Small metadata' },
        { name: 'text/code',         var: '--pluto-color-text-code',          desc: 'Inline code' },
        { name: 'text/error',        var: '--pluto-color-text-error',         desc: 'Error state' },
        { name: 'text/success',      var: '--pluto-color-text-success',       desc: 'Success state' },
        { name: 'text/warning',      var: '--pluto-color-text-warning',       desc: 'Warning state' },
        { name: 'text/info',         var: '--pluto-color-text-info',          desc: 'Info state' },
      ],
    },
    {
      label: 'Icon',
      description: '10 tokens — hierarchy and on-color icon fills',
      tokens: [
        { name: 'icon/default',     var: '--pluto-color-icon-default',     desc: 'Default icon' },
        { name: 'icon/secondary',   var: '--pluto-color-icon-secondary',   desc: 'Decorative' },
        { name: 'icon/tertiary',    var: '--pluto-color-icon-tertiary',    desc: 'Low emphasis' },
        { name: 'icon/disabled',    var: '--pluto-color-icon-disabled',    desc: 'Disabled' },
        { name: 'icon/inverse',     var: '--pluto-color-icon-inverse',     desc: 'On dark surfaces' },
        { name: 'icon/primary',     var: '--pluto-color-icon-primary',     desc: 'Primary accent' },
        { name: 'icon/on-emphasis', var: '--pluto-color-icon-on-emphasis', desc: 'On dark bg' },
        { name: 'icon/danger',      var: '--pluto-color-icon-danger',      desc: 'Error/danger' },
        { name: 'icon/success',     var: '--pluto-color-icon-success',     desc: 'Success' },
        { name: 'icon/warning',     var: '--pluto-color-icon-warning',     desc: 'Warning' },
      ],
    },
    {
      label: 'Border',
      description: '15 tokens — containers, inputs, focus, and status borders',
      tokens: [
        { name: 'border/default',           var: '--pluto-color-border-default',           desc: 'Container' },
        { name: 'border/subtle',            var: '--pluto-color-border-subtle',            desc: 'Hairline' },
        { name: 'border/strong',            var: '--pluto-color-border-strong',            desc: 'Prominent' },
        { name: 'border/emphasis',          var: '--pluto-color-border-emphasis',          desc: 'High contrast' },
        { name: 'border/focus',             var: '--pluto-color-border-focus',             desc: '⚠ Focus ring 3:1+' },
        { name: 'border/disabled',          var: '--pluto-color-border-disabled',          desc: 'Disabled' },
        { name: 'border/interactive',       var: '--pluto-color-border-interactive',       desc: 'Input default' },
        { name: 'border/interactive-hover', var: '--pluto-color-border-interactive-hover', desc: 'Input hover' },
        { name: 'border/primary',           var: '--pluto-color-border-primary',           desc: 'Golden accent' },
        { name: 'border/success',           var: '--pluto-color-border-success',           desc: 'Success' },
        { name: 'border/warning',           var: '--pluto-color-border-warning',           desc: 'Warning' },
        { name: 'border/danger',            var: '--pluto-color-border-danger',            desc: 'Danger' },
        { name: 'border/info',              var: '--pluto-color-border-info',              desc: 'Info' },
        { name: 'border/on-emphasis',       var: '--pluto-color-border-on-emphasis',       desc: 'On dark surfaces' },
        { name: 'border/neutral',           var: '--pluto-color-border-neutral',           desc: 'Neutral badge' },
      ],
    },
    {
      label: 'Overlay',
      description: '2 tokens — modal scrim and ghost tint',
      tokens: [
        { name: 'overlay/scrim', var: '--pluto-color-overlay-scrim', desc: 'Modal backdrop' },
        { name: 'overlay/ghost', var: '--pluto-color-overlay-ghost', desc: 'Ghost tint' },
      ],
    },
  ];

  return (
    <div style={{ padding: '24px', fontFamily: 'var(--pluto-font-family-sans)', background: 'var(--pluto-color-background-default)', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', color: 'var(--pluto-color-text-heading)' }}>
        Semantic Color Tokens
      </h1>
      <p style={{ fontSize: '14px', color: 'var(--pluto-color-text-secondary)', marginBottom: '8px' }}>
        116 intent-based tokens across 8 groups. Switch themes in the toolbar — every
        token adapts automatically. Components should <strong>only</strong> consume these.
      </p>
      <div style={{ display: 'inline-flex', gap: '8px', marginBottom: '40px', padding: '8px 12px', background: 'var(--pluto-color-background-on-primary)', borderRadius: '6px', border: '1px solid var(--pluto-color-border-primary)' }}>
        <span style={{ fontSize: '12px', color: 'var(--pluto-color-text-default)' }}>
          ⚠ <strong>text/on-primary</strong> + <strong>action/primary/text</strong> use dark text on golden — WCAG AA override (white fails 1.4:1)
        </span>
      </div>

      {groups.map((group) => (
        <TokenGroup key={group.label} {...group} />
      ))}
    </div>
  );
}

// ─── Section 3: Action Tokens ─────────────────────────────────────────────────

function ActionColors() {
  const variants = [
    { label: 'Primary',     prefix: 'action-primary' },
    { label: 'Secondary',   prefix: 'action-secondary' },
    { label: 'Ghost',       prefix: 'action-ghost' },
    { label: 'Destructive', prefix: 'action-destructive' },
  ];
  const states = ['default', 'hover', 'active', 'disabled', 'text', 'subtle', 'subtle-hover'];

  return (
    <div style={{ padding: '24px', fontFamily: 'var(--pluto-font-family-sans)', background: 'var(--pluto-color-background-default)', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', color: 'var(--pluto-color-text-heading)' }}>
        Action Tokens
      </h1>
      <p style={{ fontSize: '14px', color: 'var(--pluto-color-text-secondary)', marginBottom: '40px' }}>
        28 tokens — 4 variants × 7 states. Used for buttons, links, and interactive elements.
      </p>

      {variants.map(({ label, prefix }) => (
        <div key={prefix} style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--pluto-color-text-default)' }}>
            {label}
          </h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {states.map((state) => (
              <Swatch
                key={state}
                name={state}
                cssVar={`--pluto-color-${prefix}-${state}`}
                desc={state === 'text' && prefix === 'action-primary' ? '⚠ A11y: dark on golden' : undefined}
              />
            ))}
          </div>

          {/* Live button preview */}
          <div style={{ marginTop: '16px', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              style={{
                padding: '8px 20px',
                background: `var(--pluto-color-${prefix}-default)`,
                color: `var(--pluto-color-${prefix}-text)`,
                border: `1px solid var(--pluto-color-${prefix}-default)`,
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'var(--pluto-font-family-sans)',
              }}
            >
              {label} Button
            </button>
            <button
              style={{
                padding: '8px 20px',
                background: `var(--pluto-color-${prefix}-subtle)`,
                color: `var(--pluto-color-${prefix}-default)`,
                border: `1px solid var(--pluto-color-${prefix}-default)`,
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'var(--pluto-font-family-sans)',
              }}
            >
              {label} Subtle
            </button>
            <button
              style={{
                padding: '8px 20px',
                background: `var(--pluto-color-${prefix}-disabled)`,
                color: `var(--pluto-color-text-disabled)`,
                border: `1px solid var(--pluto-color-border-disabled)`,
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'not-allowed',
                fontFamily: 'var(--pluto-font-family-sans)',
              }}
              disabled
            >
              Disabled
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Section 4: Status Tokens ─────────────────────────────────────────────────

function StatusColors() {
  const statuses = [
    { label: 'Success', prefix: 'status-success' },
    { label: 'Warning', prefix: 'status-warning' },
    { label: 'Danger',  prefix: 'status-danger' },
    { label: 'Info',    prefix: 'status-info' },
  ];
  const variants = ['bg', 'bg-strong', 'text', 'text-strong', 'border', 'icon'];

  return (
    <div style={{ padding: '24px', fontFamily: 'var(--pluto-font-family-sans)', background: 'var(--pluto-color-background-default)', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', color: 'var(--pluto-color-text-heading)' }}>
        Status Tokens
      </h1>
      <p style={{ fontSize: '14px', color: 'var(--pluto-color-text-secondary)', marginBottom: '40px' }}>
        24 tokens — 4 statuses × 6 variants. Used for badges, alerts, and inline feedback.
        Switch themes to verify dark mode adaptations.
      </p>

      {statuses.map(({ label, prefix }) => (
        <div key={prefix} style={{ marginBottom: '48px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--pluto-color-text-default)' }}>
            {label}
          </h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
            {variants.map((v) => (
              <Swatch
                key={v}
                name={v}
                cssVar={`--pluto-color-${prefix}-${v}`}
              />
            ))}
          </div>

          {/* Live alert preview */}
          <div
            style={{
              padding: '12px 16px',
              background: `var(--pluto-color-${prefix}-bg)`,
              border: `1px solid var(--pluto-color-${prefix}-border)`,
              borderLeft: `4px solid var(--pluto-color-${prefix}-icon)`,
              borderRadius: '6px',
              display: 'flex',
              gap: '10px',
              alignItems: 'flex-start',
              maxWidth: '480px',
            }}
          >
            <span style={{ fontSize: '16px' }}>
              {label === 'Success' ? '✓' : label === 'Warning' ? '⚠' : label === 'Danger' ? '✕' : 'ℹ'}
            </span>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: `var(--pluto-color-${prefix}-text)`, marginBottom: '2px' }}>
                {label} Alert
              </div>
              <div style={{ fontSize: '12px', color: `var(--pluto-color-${prefix}-text)` }}>
                This is a {label.toLowerCase()} message using semantic status tokens.
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Story Definitions ────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Foundations/Colors',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Three-tier color system: Primitive → Semantic → Component. 116 semantic tokens across 8 groups. All tokens adapt across Light, Dark, and High Contrast themes.',
      },
    },
  },
};

export default meta;

export const Primitives: StoryObj = {
  render: () => <ColorFoundation />,
  name: 'Primitive Palette',
  parameters: {
    docs: { description: { story: 'Raw color scales — Warm Cream neutrals, Golden Yellow primary, Warm Slate secondary, Emerald success, Orange warning, Coral Rose danger, Sky Blue info.' } },
  },
};

export const Semantic: StoryObj = {
  render: () => <SemanticColors />,
  name: 'Semantic Tokens (116)',
  parameters: {
    docs: { description: { story: 'All 116 semantic color tokens: background (11), surface (9), text (17), icon (10), border (15), overlay (2). Switch themes to see live adaptation.' } },
  },
};

export const Actions: StoryObj = {
  render: () => <ActionColors />,
  name: 'Action Tokens (28)',
  parameters: {
    docs: { description: { story: '4 action variants × 7 states = 28 tokens. Includes live button previews for each variant.' } },
  },
};

export const Status: StoryObj = {
  render: () => <StatusColors />,
  name: 'Status Tokens (24)',
  parameters: {
    docs: { description: { story: '4 statuses × 6 variants = 24 tokens. Includes live alert previews.' } },
  },
};
