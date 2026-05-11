# Naming Conventions — Pluto Design System

## Core Principle

Token names encode **intent**, not value. A token name should answer:
> "What is this for?" not "What does it look like?"

❌ `color.purple-600`  
✅ `color.action.primary.default`

---

## Token Name Structure

```
{category}.{group}.{variant}.{state}
```

| Segment | Purpose | Examples |
|---------|---------|----------|
| `category` | Top-level type | `color`, `font`, `spacing`, `radius`, `elevation`, `motion` |
| `group` | Semantic grouping | `text`, `background`, `border`, `action`, `status` |
| `variant` | Sub-group or scale | `primary`, `secondary`, `h1`, `md`, `success` |
| `state` | Interactive state | `default`, `hover`, `active`, `disabled`, `focus` |

---

## CSS Custom Property Convention

```
--pluto-{category}-{group}-{variant}-{state}
```

Examples:
```css
--pluto-color-text-default
--pluto-color-action-primary-hover
--pluto-color-status-danger-bg
--pluto-font-size-md
--pluto-spacing-4
--pluto-radius-md
--pluto-elevation-sm
--pluto-motion-duration-normal
--pluto-motion-easing-ease-out
```

**Prefix:** `--pluto-` is the global namespace. Never omit it — prevents collisions
with third-party CSS.

---

## Scale Naming

### Numeric T-shirt sizes (semantic)
Use for semantic tokens where relative sizing matters:

```
xs → sm → md → lg → xl → 2xl → 3xl
```

### Numeric steps (primitives)
Use for primitive palette tokens:

```
50 → 100 → 200 → ... → 900 → 950
```

### Heading scales
```
h1 → h2 → h3 → h4 → h5 → h6
```

---

## State Naming

| State | When to use |
|-------|------------|
| `default` | Resting state (not hover/focus) |
| `hover` | Mouse hover |
| `active` | Mouse pressed / keyboard activated |
| `focus` | Keyboard focus |
| `focus-visible` | Keyboard focus (not mouse) |
| `disabled` | Non-interactive |
| `selected` | Toggle selected / tab active |
| `checked` | Checkbox / radio checked |
| `error` | Validation error |
| `loading` | Async pending |

---

## Category Conventions

### Color

```
color.background.*        → surface colors
color.surface.*           → raised surface colors (cards, modals)
color.text.*              → text colors
color.border.*            → border colors
color.action.*            → interactive element colors
color.status.*            → feedback/status colors
color.{palette}.*         → primitive palette (neutral, primary, etc.)
```

### Typography

```
font.family.*             → font stacks
font.size.*               → font size scale
font.weight.*             → font weights
font.lineHeight.*         → line height scale
font.letterSpacing.*      → letter spacing scale
text.*                    → semantic text size roles
typeStyle.*               → composite style roles (weight + line-height)
```

### Spacing

```
spacing.*                 → primitive scale (1, 2, 3...)
space.component.*         → component padding/gap
space.layout.*            → page-level spacing
space.inset.*             → padding presets
space.stack.*             → vertical gaps
space.inline.*            → horizontal gaps
space.touch.*             → touch target sizes
```

---

## What NOT to name tokens

| Avoid | Use Instead | Why |
|-------|-------------|-----|
| `color.purple` | `color.primary.600` | Values change, intent doesn't |
| `color.button-background` | `color.action.primary.default` | Component-specific names don't generalize |
| `spacing.16px` | `spacing.4` | Value-based names break when scale changes |
| `color.dark-text` | `color.text.default` | Describes appearance, not role |
| `color.error` | `color.status.danger.bg` or `.text` | Too vague — danger has bg, text, border, icon |

---

## File Naming

| Type | Convention | Example |
|------|-----------|---------|
| Token files | `kebab-case.json` | `color.json`, `high-contrast.json` |
| TypeScript | `camelCase.ts` | `mediaQuery.ts`, `focusRing.ts` |
| Story files | `PascalCase.stories.tsx` | `Colors.stories.tsx` |
| CSS files | `kebab-case.css` | `reset.css`, `base.css` |

---

## Versioning & Deprecation

When a token must be renamed or removed:

1. Add `"$extensions": { "com.pluto.deprecated": true, "com.pluto.replacement": "new.token.name" }` to the old token
2. Keep the old token for one minor version cycle
3. Add a TypeScript `@deprecated` JSDoc to the generated JS output
4. Document in CHANGELOG and PR
5. Remove in the next version bump
