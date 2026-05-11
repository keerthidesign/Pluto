# Token Architecture — Pluto Design System

## Overview

Pluto uses a **three-tier token system** aligned with the W3C Design Token Community Group
(DTCG) specification. Every design decision in the system flows through this hierarchy.

```
Primitive Tokens
    ↓
Semantic Tokens
    ↓
Component Tokens  ← (Phase 2)
```

---

## Tier 1 — Primitive Tokens

Raw values with no semantic meaning. These are the source of truth for all design decisions.

```json
{
  "color": {
    "primary": {
      "600": { "$value": "#7950F2", "$type": "color" }
    }
  }
}
```

**Rules:**
- Never used directly in components
- Never referenced in application code
- Change infrequently (palette additions/corrections only)
- Named by scale, not intent: `color.primary.600`, not `color.brand`

**Location:** `packages/tokens/src/primitives/`

---

## Tier 2 — Semantic Tokens

Intent-based aliases that reference primitive tokens. These are what components consume.

```json
{
  "color": {
    "action": {
      "primary": {
        "default": { "$value": "{color.primary.600}", "$type": "color" }
      }
    }
  }
}
```

**Rules:**
- Always reference primitives, never hardcode values
- Carry intent: `color.action.primary.default`, `color.text.secondary`
- Overridden per theme (dark, high-contrast, brand)
- Change occasionally (new status, new interaction state)

**Location:** `packages/tokens/src/semantic/`

---

## Tier 3 — Component Tokens (Phase 2)

Component-scoped tokens that reference semantic tokens. Allows per-component overrides
without touching the global semantic layer.

```json
{
  "button": {
    "background": {
      "default": { "$value": "{color.action.primary.default}" }
    },
    "radius": {
      "default": { "$value": "{radius.md}" }
    }
  }
}
```

**Location:** `packages/tokens/src/components/` _(to be created in Phase 2)_

---

## DTCG Format

All tokens follow the W3C DTCG specification:

| Field | Purpose |
|-------|---------|
| `$value` | The token's value (required) |
| `$type` | The value type: `color`, `dimension`, `fontFamily`, `fontWeight`, `duration`, `cubicBezier`, `shadow`, `number`, `string` |
| `$description` | Human-readable context (required on all semantic tokens) |
| `$extensions` | Custom metadata: Figma variable IDs, WCAG contrast, usage hints |

---

## Build Pipeline

```
DTCG JSON Sources
       ↓
  Style Dictionary v4
  (style-dictionary.config.js)
       ↓
  ┌────────────────────────────────┐
  │  CSS Custom Properties         │ → dist/css/tokens.css
  │  TypeScript constants          │ → dist/js/tokens.ts
  │  Flat JSON                     │ → dist/json/tokens.json
  │  Figma Variables JSON          │ → dist/figma/tokens.json
  └────────────────────────────────┘
```

### CSS Output Example

```css
:root, [data-theme="light"] {
  --pluto-color-action-primary-default: var(--pluto-color-primary-600);
  --pluto-color-text-default: var(--pluto-color-neutral-900);
}

[data-theme="dark"] {
  --pluto-color-action-primary-default: var(--pluto-color-primary-500);
  --pluto-color-text-default: var(--pluto-color-neutral-50);
}
```

### Theme Switching

Themes are applied via `data-theme` attribute on the root element:

```html
<html data-theme="dark">
```

```ts
document.documentElement.setAttribute('data-theme', 'dark');
```

No JavaScript token swapping. Pure CSS cascade. Zero runtime overhead.

---

## Multi-Brand Scaling

To add a new brand (e.g., "Pluto Pro"):

1. Create `packages/tokens/src/brands/pluto-pro.json` with primitive overrides
2. Create `packages/tokens/src/themes/pluto-pro-light.json` (semantic overrides)
3. Add a new Style Dictionary build config targeting that brand's sources
4. Output to `dist/css/brands/pluto-pro.css`

Consumer applies: `<html data-brand="pluto-pro" data-theme="light">`

---

## AI Metadata (`$extensions`)

All production tokens carry `$extensions` for AI tooling and governance:

```json
{
  "$value": "#7950F2",
  "$type": "color",
  "$extensions": {
    "com.pluto.figma-variable-id": "VariableID:123:456",
    "com.pluto.wcag-contrast-on-white": "4.8:1",
    "com.pluto.usage": ["button.background", "link.color"],
    "com.pluto.deprecated": false,
    "com.pluto.tier": "primitive"
  }
}
```

This enables:
- AI-assisted component generation with correct tokens
- Automated WCAG contrast auditing
- Figma ↔ code synchronization
- Token usage analytics
