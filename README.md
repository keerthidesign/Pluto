# Pluto Design System

> Enterprise-grade, multi-brand design system built on DTCG token standards.
> Phase 1: Foundations + Token Architecture.

---

## Packages

| Package | Description |
|---------|-------------|
| [`@pluto/tokens`](packages/tokens) | DTCG design tokens — primitives, semantic, themes |
| [`@pluto/foundations`](packages/foundations) | CSS reset, base styles, accessibility utilities |
| [`@pluto/storybook`](apps/storybook) | Living documentation |

## Quick Start

```bash
# Install dependencies
pnpm install

# Build tokens
pnpm build:tokens

# Run Storybook
pnpm storybook

# Type check all packages
pnpm typecheck
```

## Using Tokens in Your App

```ts
// 1. Import CSS (once, at root)
import '@pluto/tokens/css';
import '@pluto/foundations/reset.css';
import '@pluto/foundations/base.css';

// 2. Use tokens in CSS
.my-component {
  background: var(--pluto-color-surface-raised);
  color: var(--pluto-color-text-default);
  padding: var(--pluto-space-inset-md);
  border-radius: var(--pluto-radius-md);
  box-shadow: var(--pluto-elevation-sm);
  transition: var(--pluto-motion-transition-colors);
}

// 3. Switch themes
document.documentElement.setAttribute('data-theme', 'dark');
```

## Token Architecture

Three-tier system: **Primitive → Semantic → Component**

```
color.neutral.600        ← primitive (raw value: #868E96)
  ↓ referenced by
color.text.tertiary      ← semantic (intent: captions, hints)
  ↓ referenced by
label.text.color         ← component (Phase 2)
```

See [Token Architecture](docs/architecture/token-architecture.md) for full details.

## Theming

| Theme | Selector |
|-------|----------|
| Light (default) | `:root` or `[data-theme="light"]` |
| Dark | `[data-theme="dark"]` |
| High Contrast (WCAG AAA) | `[data-theme="high-contrast"]` |

## Contributing

See [Contribution Guide](docs/governance/contribution-guide.md).

## License

MIT — Pluto Design System
