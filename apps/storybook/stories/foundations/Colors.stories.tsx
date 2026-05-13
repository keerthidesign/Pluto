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
    {
      label: 'Action — Primary',
      description: '7 states — default, hover, active, disabled, text, subtle, subtle-hover',
      tokens: [
        { name: 'action/primary/default',      var: '--pluto-color-action-primary-default',      desc: 'CTA fill' },
        { name: 'action/primary/hover',         var: '--pluto-color-action-primary-hover',         desc: 'Hover' },
        { name: 'action/primary/active',        var: '--pluto-color-action-primary-active',        desc: 'Pressed' },
        { name: 'action/primary/disabled',      var: '--pluto-color-action-primary-disabled',      desc: 'Disabled fill' },
        { name: 'action/primary/text',          var: '--pluto-color-action-primary-text',          desc: '⚠ Dark on golden 6:1' },
        { name: 'action/primary/subtle',        var: '--pluto-color-action-primary-subtle',        desc: 'Ghost bg' },
        { name: 'action/primary/subtle-hover',  var: '--pluto-color-action-primary-subtle-hover',  desc: 'Ghost hover' },
      ],
    },
    {
      label: 'Action — Secondary',
      description: '7 states — warm slate variant',
      tokens: [
        { name: 'action/secondary/default',      var: '--pluto-color-action-secondary-default' },
        { name: 'action/secondary/hover',         var: '--pluto-color-action-secondary-hover' },
        { name: 'action/secondary/active',        var: '--pluto-color-action-secondary-active' },
        { name: 'action/secondary/disabled',      var: '--pluto-color-action-secondary-disabled' },
        { name: 'action/secondary/text',          var: '--pluto-color-action-secondary-text',     desc: 'On secondary' },
        { name: 'action/secondary/subtle',        var: '--pluto-color-action-secondary-subtle' },
        { name: 'action/secondary/subtle-hover',  var: '--pluto-color-action-secondary-subtle-hover' },
      ],
    },
    {
      label: 'Action — Ghost',
      description: '7 states — transparent fill with visible border',
      tokens: [
        { name: 'action/ghost/default',      var: '--pluto-color-action-ghost-default',      desc: 'Transparent' },
        { name: 'action/ghost/hover',         var: '--pluto-color-action-ghost-hover',         desc: 'Subtle fill' },
        { name: 'action/ghost/active',        var: '--pluto-color-action-ghost-active' },
        { name: 'action/ghost/disabled',      var: '--pluto-color-action-ghost-disabled' },
        { name: 'action/ghost/text',          var: '--pluto-color-action-ghost-text',          desc: 'Label color' },
        { name: 'action/ghost/subtle',        var: '--pluto-color-action-ghost-subtle' },
        { name: 'action/ghost/subtle-hover',  var: '--pluto-color-action-ghost-subtle-hover' },
      ],
    },
    {
      label: 'Action — Destructive',
      description: '7 states — coral rose danger variant',
      tokens: [
        { name: 'action/destructive/default',      var: '--pluto-color-action-destructive-default' },
        { name: 'action/destructive/hover',         var: '--pluto-color-action-destructive-hover' },
        { name: 'action/destructive/active',        var: '--pluto-color-action-destructive-active' },
        { name: 'action/destructive/disabled',      var: '--pluto-color-action-destructive-disabled' },
        { name: 'action/destructive/text',          var: '--pluto-color-action-destructive-text',   desc: 'On danger fill' },
        { name: 'action/destructive/subtle',        var: '--pluto-color-action-destructive-subtle' },
        { name: 'action/destructive/subtle-hover',  var: '--pluto-color-action-destructive-subtle-hover' },
      ],
    },
    {
      label: 'Status — Success',
      description: '6 variants — emerald feedback tokens',
      tokens: [
        { name: 'status/success/bg',          var: '--pluto-color-status-success-bg',          desc: 'Light tint bg' },
        { name: 'status/success/bg-strong',   var: '--pluto-color-status-success-bg-strong',   desc: 'Bold fill' },
        { name: 'status/success/text',        var: '--pluto-color-status-success-text',        desc: '4.5:1 on bg' },
        { name: 'status/success/text-strong', var: '--pluto-color-status-success-text-strong', desc: 'On bold fill' },
        { name: 'status/success/border',      var: '--pluto-color-status-success-border' },
        { name: 'status/success/icon',        var: '--pluto-color-status-success-icon' },
      ],
    },
    {
      label: 'Status — Warning',
      description: '6 variants — orange feedback tokens',
      tokens: [
        { name: 'status/warning/bg',          var: '--pluto-color-status-warning-bg' },
        { name: 'status/warning/bg-strong',   var: '--pluto-color-status-warning-bg-strong' },
        { name: 'status/warning/text',        var: '--pluto-color-status-warning-text' },
        { name: 'status/warning/text-strong', var: '--pluto-color-status-warning-text-strong' },
        { name: 'status/warning/border',      var: '--pluto-color-status-warning-border' },
        { name: 'status/warning/icon',        var: '--pluto-color-status-warning-icon' },
      ],
    },
    {
      label: 'Status — Danger',
      description: '6 variants — coral rose feedback tokens',
      tokens: [
        { name: 'status/danger/bg',          var: '--pluto-color-status-danger-bg' },
        { name: 'status/danger/bg-strong',   var: '--pluto-color-status-danger-bg-strong' },
        { name: 'status/danger/text',        var: '--pluto-color-status-danger-text' },
        { name: 'status/danger/text-strong', var: '--pluto-color-status-danger-text-strong' },
        { name: 'status/danger/border',      var: '--pluto-color-status-danger-border' },
        { name: 'status/danger/icon',        var: '--pluto-color-status-danger-icon' },
      ],
    },
    {
      label: 'Status — Info',
      description: '6 variants — sky blue feedback tokens',
      tokens: [
        { name: 'status/info/bg',          var: '--pluto-color-status-info-bg' },
        { name: 'status/info/bg-strong',   var: '--pluto-color-status-info-bg-strong' },
        { name: 'status/info/text',        var: '--pluto-color-status-info-text' },
        { name: 'status/info/text-strong', var: '--pluto-color-status-info-text-strong' },
        { name: 'status/info/border',      var: '--pluto-color-status-info-border' },
        { name: 'status/info/icon',        var: '--pluto-color-status-info-icon' },
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

// ─── Story Definitions ────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Foundations/Colors',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Three-tier color system: Primitive → Semantic → Component. 116 semantic tokens across 8 groups (background, surface, text, icon, border, overlay, action, status). All tokens adapt across Light, Dark, and High Contrast themes via the toolbar.',
      },
    },
  },
};

export default meta;

export const Primitives: StoryObj = {
  render: () => <ColorFoundation />,
  name: 'Primitive Palette',
  parameters: {
    docs: { description: { story: 'Raw color scales — Warm Cream neutrals, Golden Yellow primary, Warm Slate secondary, Emerald success, Orange warning, Coral Rose danger, Sky Blue info. Never use these in components directly.' } },
  },
};

export const Semantic: StoryObj = {
  render: () => <SemanticColors />,
  name: 'Semantic Tokens (116)',
  parameters: {
    docs: { description: { story: 'All 116 semantic tokens in one view: background (11), surface (9), text (17), icon (10), border (15), overlay (2), action (28), status (24). Switch themes in the toolbar to see live adaptation.' } },
  },
};
