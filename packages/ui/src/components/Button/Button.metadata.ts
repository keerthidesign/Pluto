import type { ButtonProps } from './Button';

// ─── Component Metadata ───────────────────────────────────────────────────────
// Generated with the ai-component-metadata skill (https://www.giorris.dev/skills/ai-component-metadata)
// Describes the Button component for AI-assisted generation, documentation, and design tooling.

export const componentMetadata = {
  component: {
    name: 'Button',
    category: 'atoms' as const,
    description:
      'A pressable element that triggers an action. Supports four semantic variants, three sizes, optional leading or trailing icon, a loading state, and full keyboard/focus accessibility. Never place icons on both sides simultaneously.',
    type: 'interactive' as const,
  },

  usage: {
    useCases: [
      'Submitting forms (Save, Create, Confirm)',
      'Triggering navigation or flows (Get started, Continue)',
      'Destructive operations (Delete, Remove)',
      'Secondary actions alongside a primary CTA (Cancel, Export)',
      'Ghost/inline actions within cards or toolbars (Add field, Learn more)',
    ],
    requiredProps: ['children'] satisfies (keyof ButtonProps)[],
    commonPatterns: [
      {
        name: 'Primary CTA',
        description: 'The most prominent action on a page or dialog — use sparingly (one per context).',
        composition: `<Button variant="primary">Save changes</Button>`,
      },
      {
        name: 'Primary with leading icon',
        description: 'Use a leading icon to reinforce the action meaning (create, add, upload).',
        composition: `<Button variant="primary" iconLeft={<PlusIcon size={16} />}>New project</Button>`,
      },
      {
        name: 'Primary with trailing icon',
        description: 'Use a trailing arrow/chevron to signal navigation or progression.',
        composition: `<Button variant="primary" iconRight={<ArrowRight size={16} />}>Get started</Button>`,
      },
      {
        name: 'Secondary paired with primary',
        description: 'Pair with a primary button for cancel/confirm dialogs.',
        composition: `
<div style={{ display: 'flex', gap: 8 }}>
  <Button variant="secondary">Cancel</Button>
  <Button variant="primary">Confirm</Button>
</div>`,
      },
      {
        name: 'Destructive action',
        description: 'Use only for irreversible operations. Pair with a confirmation dialog.',
        composition: `<Button variant="destructive" iconLeft={<TrashIcon size={16} />}>Delete record</Button>`,
      },
      {
        name: 'Loading state',
        description: 'Pass loading=true while an async operation is in progress. Button is automatically disabled and shows a spinner in place of iconLeft.',
        composition: `<Button variant="primary" loading>Saving…</Button>`,
      },
      {
        name: 'Small size in dense UIs',
        description: 'Use sm (32px) in tables, toolbars, or compact cards.',
        composition: `<Button size="sm" variant="secondary" iconLeft={<PlusIcon size={14} />}>Add row</Button>`,
      },
      {
        name: 'Large size for hero/marketing',
        description: 'Use lg (48px) in hero sections or onboarding flows.',
        composition: `<Button size="lg" variant="primary" iconRight={<ArrowRight size={20} />}>Start free trial</Button>`,
      },
    ],
    antiPatterns: [
      {
        scenario: 'Icons on both sides simultaneously',
        reason: 'Creates visual clutter and ambiguity about the button\'s direction/intent. The component renders only iconLeft OR iconRight — never both.',
        alternative: 'Pick a single icon position that best reinforces the action. Use iconLeft for action type (add, delete, download) and iconRight for direction/progression (→, ↓).',
      },
      {
        scenario: 'Using primary variant for every button in a group',
        reason: 'Multiple primary buttons compete for attention and dilute hierarchy.',
        alternative: 'Use one primary per context; demote supporting actions to secondary or ghost.',
      },
      {
        scenario: 'Using destructive variant for non-destructive actions',
        reason: 'Trains users to ignore danger signals, reducing safety of real destructive operations.',
        alternative: 'Reserve destructive exclusively for delete / remove / permanently clear actions.',
      },
      {
        scenario: 'Wrapping long paragraphs of text in a button',
        reason: 'Button labels should be short and scannable (1–4 words). white-space: nowrap is intentional.',
        alternative: 'Use a concise verb-noun label ("Export CSV", "Delete account").',
      },
      {
        scenario: 'Manually adding disabled styles with className instead of the disabled prop',
        reason: 'The native disabled attribute is required for keyboard and screen-reader accessibility.',
        alternative: 'Pass disabled={true} or loading={true} — both paths apply the correct opacity and pointer-events styles.',
      },
      {
        scenario: 'Passing loading=true without updating the label',
        reason: 'Screen readers announce the visible label; a static label while loading is confusing.',
        alternative: 'Change children to an in-progress label: "Saving…", "Deleting…", "Loading…".',
      },
    ],
  },

  composition: {
    slots: {
      children: {
        type: 'React.ReactNode',
        required: true,
        description: 'Button label text. Keep concise (1–4 words).',
      },
      iconLeft: {
        type: 'React.ReactNode',
        required: false,
        description: 'SVG icon rendered before the label. Recommended sizes: 14px (sm), 16px (md), 20px (lg). Mutually exclusive with the spinner shown during loading.',
      },
      iconRight: {
        type: 'React.ReactNode',
        required: false,
        description: 'SVG icon rendered after the label. Recommended sizes: 14px (sm), 16px (md), 20px (lg). Hidden when loading=true.',
      },
    },
    nestedComponents: ['Spinner (internal — shown automatically when loading=true)'],
    commonPartners: [
      'Input — primary submit button beside a text field',
      'Dialog / Modal — primary + secondary button pair in footer',
      'Toolbar — ghost or secondary buttons grouped horizontally',
      'Card — ghost button as inline link-like action',
      'Form — primary submit, secondary reset or cancel',
    ],
    parentConstraints: [
      'Works inside any flex/grid container',
      'Full-width: set style={{ width: "100%" }} on the consumer side',
    ],
  },

  behavior: {
    states: [
      'default   — resting state, full opacity',
      'hover     — background shifts to *-hover token (120ms ease transition)',
      'active    — background shifts to *-active token on mousedown',
      'focus-visible — 2px offset ring using --pluto-color-border-focus (WCAG 2.4.11)',
      'disabled  — opacity 0.4, cursor not-allowed, pointer-events none',
      'loading   — disabled + spinner replaces iconLeft, aria-busy="true"',
    ],
    interactions: {
      click: 'Fires the native onClick handler unless disabled or loading',
      keyboard: 'Space and Enter activate; Tab moves focus in/out',
      loading: 'While loading, button is disabled and aria-busy signals the async state to screen readers',
    },
    responsive: {
      default: 'Inline-flex, shrinks to content width',
      fullWidth: 'Set width: 100% on the parent or via className for full-bleed CTAs',
    },
  },

  accessibility: {
    role: 'button (native <button> element)',
    keyboardSupport: 'Enter and Space activate. Natively focusable with Tab. Focus ring always visible on keyboard navigation (focus-visible).',
    screenReader: 'Label announced from children. aria-busy="true" is set during loading. Disabled state communicated via native disabled attribute.',
    focusManagement: 'Focus ring uses a double-box-shadow offset ring: 2px background gap + 4px focus color ring. Never hidden — always shown on :focus-visible.',
    wcag: 'AA — meets 2.4.11 (focus appearance), 1.4.3 (contrast on all variants), 4.1.2 (name, role, value)',
  },

  tokens: {
    sizing: {
      sm: { height: '32px', padding: '0 12px', gap: '6px', fontSize: '12px', iconSize: '14px' },
      md: { height: '40px', padding: '0 16px', gap: '8px', fontSize: '14px', iconSize: '16px' },
      lg: { height: '48px', padding: '0 20px', gap: '8px', fontSize: '16px', iconSize: '20px' },
    },
    colorTokens: {
      primary: {
        default: '--pluto-color-action-primary-default',
        hover: '--pluto-color-action-primary-hover',
        active: '--pluto-color-action-primary-active',
        text: '--pluto-color-action-primary-text',
      },
      secondary: {
        default: '--pluto-color-action-secondary-default',
        hover: '--pluto-color-action-secondary-hover',
        active: '--pluto-color-action-secondary-active',
        text: '--pluto-color-action-secondary-text',
        border: '--pluto-color-border-default',
        borderHover: '--pluto-color-border-strong',
      },
      ghost: {
        default: '--pluto-color-action-ghost-default',
        hover: '--pluto-color-action-ghost-hover',
        active: '--pluto-color-action-ghost-active',
        text: '--pluto-color-action-ghost-text',
      },
      destructive: {
        default: '--pluto-color-action-destructive-default',
        hover: '--pluto-color-action-destructive-hover',
        active: '--pluto-color-action-destructive-active',
        text: '--pluto-color-action-destructive-text',
      },
      focus: '--pluto-color-border-focus',
    },
  },

  aiHints: {
    priority: 'high' as const,
    keywords: [
      'button', 'cta', 'action', 'submit', 'confirm', 'cancel', 'delete',
      'save', 'create', 'icon', 'loading', 'spinner', 'primary', 'secondary',
      'ghost', 'destructive', 'interactive', 'pressable',
    ],
    context:
      'Use Button whenever a user needs to trigger a discrete action. Prefer primary for the most important action in a context (max one), secondary for supporting actions, ghost for low-emphasis inline actions, and destructive exclusively for irreversible delete/remove operations. Always pair loading=true with an in-progress label.',
    generationRules: [
      'Never set both iconLeft and iconRight on the same instance',
      'Scale icon size with button size: sm→14px, md→16px, lg→20px',
      'Use loading=true + updated label for async operations — not disabled alone',
      'One primary button maximum per view/dialog',
      'Destructive variant requires confirmation before the action executes',
    ],
  },
};
