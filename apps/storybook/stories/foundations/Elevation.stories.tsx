import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

function ElevationScale() {
  const levels = [
    { name: 'none', cssVar: '--pluto-elevation-none', usage: 'Flat — inline elements' },
    { name: 'xs', cssVar: '--pluto-elevation-xs', usage: 'Subtle lift — hover cards' },
    { name: 'sm', cssVar: '--pluto-elevation-sm', usage: 'Cards, focused inputs' },
    { name: 'md', cssVar: '--pluto-elevation-md', usage: 'Dropdowns, popovers' },
    { name: 'lg', cssVar: '--pluto-elevation-lg', usage: 'Dialogs, menus' },
    { name: 'xl', cssVar: '--pluto-elevation-xl', usage: 'Modals' },
    { name: '2xl', cssVar: '--pluto-elevation-2xl', usage: 'Full overlays, drawers' },
    { name: 'inner', cssVar: '--pluto-elevation-inner', usage: 'Pressed / inset states' },
  ];

  return (
    <div style={{ padding: '24px', fontFamily: 'var(--pluto-font-family-sans)' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Elevation</h1>
      <p style={{ fontSize: '14px', color: 'var(--pluto-color-text-secondary)', marginBottom: '40px' }}>
        Shadow scale creates perceived depth and layering hierarchy. Multi-layer shadows produce more
        natural-looking results than single shadows.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '32px',
        }}
      >
        {levels.map((level) => (
          <div key={level.name} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                width: '100%',
                height: '100px',
                backgroundColor: 'var(--pluto-color-surface-default)',
                borderRadius: '8px',
                boxShadow: `var(${level.cssVar})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: 600,
                color: 'var(--pluto-color-text-secondary)',
              }}
            >
              {level.name}
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 500 }}>elevation.{level.name}</div>
              <div style={{ fontSize: '12px', color: 'var(--pluto-color-text-tertiary)' }}>
                {level.usage}
              </div>
              <code style={{ fontSize: '11px', opacity: 0.5 }}>{level.cssVar}</code>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: '48px',
          padding: '16px',
          background: 'var(--pluto-color-status-info-bg)',
          border: '1px solid var(--pluto-color-status-info-border)',
          borderRadius: '8px',
          fontSize: '13px',
          color: 'var(--pluto-color-status-info-text)',
        }}
      >
        <strong>Accessibility note:</strong> Do not use shadows alone to convey meaning. Always pair
        elevation with sufficient border contrast for users in high-contrast mode.
      </div>
    </div>
  );
}

const meta: Meta = {
  title: 'Foundations/Elevation',
  tags: ['autodocs'],
};

export default meta;

export const Scale: StoryObj = { render: () => <ElevationScale />, name: 'Elevation Scale' };
