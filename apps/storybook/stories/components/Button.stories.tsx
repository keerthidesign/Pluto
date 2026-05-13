import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Button } from '@pluto/ui';

// ─── Icon SVGs ────────────────────────────────────────────────────────────────

const ArrowRight = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M3 8h10M9 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PlusIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M8 3v10M3 8h10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const DownloadIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M8 3v7M5 7l3 3 3-3M3 13h10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TrashIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M2 4h12M5 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1M6 7v5M10 7v5M3 4l1 9a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1l1-9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronDown = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M4 6l4 4 4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── Icon resolver ────────────────────────────────────────────────────────────

type IconPosition = 'none' | 'left' | 'right';

/** Map an iconPosition value to the correct Button icon props */
function resolveIconProps(
  position: IconPosition,
  variant: string,
): { iconLeft?: React.ReactNode; iconRight?: React.ReactNode } {
  const icon = variant === 'destructive' ? <TrashIcon /> : <PlusIcon />;
  const iconR = <ArrowRight />;

  if (position === 'left')  return { iconLeft: icon };
  if (position === 'right') return { iconRight: iconR };
  return {};
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Interactive button supporting 4 variants, 3 sizes, and optional leading or trailing icon. Never place icons on both sides simultaneously.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'destructive'],
      description: 'Visual style of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Height — sm 32px / md 40px / lg 48px',
    },
    iconPosition: {
      control: 'select',
      options: ['none', 'left', 'right'],
      description: 'Icon placement — left, right, or none (never both)',
      table: { category: 'Icon' },
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
    // Hide raw ReactNode props from the controls panel — use iconPosition instead
    iconLeft:  { table: { disable: true } },
    iconRight: { table: { disable: true } },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    iconPosition: 'none',
  } as React.ComponentProps<typeof Button> & { iconPosition?: IconPosition },
};

export default meta;
type Story = StoryObj<typeof Button & { iconPosition?: IconPosition }>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: { children: 'Click me', iconPosition: 'left' } as Story['args'],
  render: ({ iconPosition = 'none', variant = 'primary', ...rest }) => (
    <Button
      variant={variant}
      {...resolveIconProps(iconPosition, variant)}
      {...rest}
    />
  ),
};

// ─── All Variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Primary */}
      <Row label="Primary">
        <Button variant="primary" iconLeft={<PlusIcon />}>New item</Button>
        <Button variant="primary">Label only</Button>
        <Button variant="primary" iconRight={<ArrowRight />}>Continue</Button>
      </Row>

      {/* Secondary */}
      <Row label="Secondary">
        <Button variant="secondary" iconLeft={<DownloadIcon />}>Download</Button>
        <Button variant="secondary">Label only</Button>
        <Button variant="secondary" iconRight={<ChevronDown />}>Options</Button>
      </Row>

      {/* Ghost */}
      <Row label="Ghost">
        <Button variant="ghost" iconLeft={<PlusIcon />}>Add more</Button>
        <Button variant="ghost">Label only</Button>
        <Button variant="ghost" iconRight={<ArrowRight />}>Learn more</Button>
      </Row>

      {/* Destructive */}
      <Row label="Destructive">
        <Button variant="destructive" iconLeft={<TrashIcon />}>Delete</Button>
        <Button variant="destructive">Label only</Button>
        <Button variant="destructive" iconRight={<ArrowRight />}>Remove</Button>
      </Row>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  name: 'Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Row label="sm — 32px">
        <Button size="sm" variant="primary" iconLeft={<PlusIcon size={14} />}>Add item</Button>
        <Button size="sm" variant="primary">Label only</Button>
        <Button size="sm" variant="primary" iconRight={<ArrowRight size={14} />}>Next</Button>
      </Row>
      <Row label="md — 40px (default)">
        <Button size="md" variant="primary" iconLeft={<PlusIcon />}>Add item</Button>
        <Button size="md" variant="primary">Label only</Button>
        <Button size="md" variant="primary" iconRight={<ArrowRight />}>Next</Button>
      </Row>
      <Row label="lg — 48px">
        <Button size="lg" variant="primary" iconLeft={<PlusIcon size={20} />}>Add item</Button>
        <Button size="lg" variant="primary">Label only</Button>
        <Button size="lg" variant="primary" iconRight={<ArrowRight size={20} />}>Next</Button>
      </Row>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

// ─── Icon Positions ───────────────────────────────────────────────────────────

export const IconPositions: Story = {
  name: 'Icon Positions',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Row label="No icon">
        <Button variant="primary">Save changes</Button>
        <Button variant="secondary">Cancel</Button>
        <Button variant="ghost">Learn more</Button>
      </Row>
      <Row label="Icon left">
        <Button variant="primary"   iconLeft={<PlusIcon />}>Create new</Button>
        <Button variant="secondary" iconLeft={<DownloadIcon />}>Export</Button>
        <Button variant="ghost"     iconLeft={<PlusIcon />}>Add field</Button>
      </Row>
      <Row label="Icon right">
        <Button variant="primary"   iconRight={<ArrowRight />}>Get started</Button>
        <Button variant="secondary" iconRight={<ChevronDown />}>More options</Button>
        <Button variant="ghost"     iconRight={<ArrowRight />}>See all</Button>
      </Row>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

// ─── States ───────────────────────────────────────────────────────────────────

export const States: Story = {
  name: 'States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Row label="Default">
        <Button variant="primary">Default</Button>
        <Button variant="secondary">Default</Button>
        <Button variant="ghost">Default</Button>
        <Button variant="destructive">Default</Button>
      </Row>
      <Row label="Disabled">
        <Button variant="primary" disabled>Disabled</Button>
        <Button variant="secondary" disabled>Disabled</Button>
        <Button variant="ghost" disabled>Disabled</Button>
        <Button variant="destructive" disabled>Disabled</Button>
      </Row>
      <Row label="Loading">
        <Button variant="primary" loading>Saving…</Button>
        <Button variant="secondary" loading>Loading…</Button>
        <Button variant="ghost" loading>Fetching…</Button>
        <Button variant="destructive" loading>Deleting…</Button>
      </Row>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

// ─── Single-control stories ────────────────────────────────────────────────────

export const Primary: Story = {
  args: { variant: 'primary', children: 'Save changes', iconPosition: 'left' } as Story['args'],
  render: ({ iconPosition = 'left', variant = 'primary', ...rest }) => (
    <Button variant={variant} {...resolveIconProps(iconPosition, variant)} {...rest} />
  ),
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Cancel', iconPosition: 'right' } as Story['args'],
  render: ({ iconPosition = 'right', variant = 'secondary', ...rest }) => (
    <Button variant={variant} {...resolveIconProps(iconPosition, variant)} {...rest} />
  ),
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Learn more', iconPosition: 'right' } as Story['args'],
  render: ({ iconPosition = 'right', variant = 'ghost', ...rest }) => (
    <Button variant={variant} {...resolveIconProps(iconPosition, variant)} {...rest} />
  ),
};

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Delete record', iconPosition: 'left' } as Story['args'],
  render: ({ iconPosition = 'left', variant = 'destructive', ...rest }) => (
    <Button variant={variant} {...resolveIconProps(iconPosition, variant)} {...rest} />
  ),
};

export const Loading: Story = {
  args: { variant: 'primary', children: 'Saving…', loading: true, iconPosition: 'none' } as Story['args'],
  render: ({ iconPosition = 'none', variant = 'primary', ...rest }) => (
    <Button variant={variant} {...resolveIconProps(iconPosition, variant)} {...rest} />
  ),
};

// ─── Helper ───────────────────────────────────────────────────────────────────

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span
        style={{
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--pluto-color-text-tertiary)',
        }}
      >
        {label}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        {children}
      </div>
    </div>
  );
}
