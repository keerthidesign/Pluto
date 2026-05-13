# Contribution Guide — Pluto Design System

## Who Can Contribute?

The Pluto Design System follows a **federated contribution model**:

| Role              | What They Can Do                                                    |
| ----------------- | ------------------------------------------------------------------- |
| **DS Core Team**  | All changes, final approval authority                               |
| **Brand Team**    | Brand-specific theme token overrides                                |
| **Product Teams** | Propose new semantic tokens, contribute component tokens (Phase 2+) |
| **Community**     | Bug reports, documentation improvements                             |

---

## Contribution Paths

### Path 1 — Bug Fix / Documentation

1. Open an issue describing the problem
2. Fork and branch: `fix/token-name` or `docs/description`
3. Make changes
4. Open PR against `develop` branch
5. CODEOWNERS review triggered automatically

### Path 2 — New Semantic Token

Semantic tokens are the **most impactful** change type. They affect every component.

1. **Proposal first** — open a GitHub Discussion with:
   - What role does this token serve?
   - Which components would use it?
   - Does an existing token cover the need?
   - WCAG contrast requirements (if color)
2. DS Core + Token Governance review
3. Approved → implement in `packages/tokens/src/semantic/`
4. Add dark + high-contrast theme override
5. Add Storybook story
6. PR requires 2 approvals from `@pluto/token-governance`

### Path 3 — New Primitive Color

Primitive color changes are **rare and high-impact**.

1. Open a Design RFC in Figma with:
   - Full color scale (50–950)
   - Contrast ratios for all planned semantic usages
   - Dark mode variants
2. DS Core review in Design Review meeting
3. If approved: update `src/primitives/color.json`
4. Update all semantic tokens that reference the new palette
5. PR requires 2 approvals from `@pluto/ds-core` + designer sign-off

### Path 4 — New Theme / Brand

1. Contact DS Core to set up brand workspace
2. Create `src/brands/{brand-name}.json` (primitive overrides only)
3. Create `src/themes/{brand-name}-light.json` + `dark.json`
4. Add Style Dictionary build config
5. Full PR review + brand team sign-off

---

## Token Governance Principles

### 1. Semantic tokens must have a reason

Every semantic token requires a written `$description` explaining its intent. Tokens without
descriptions will be rejected in PR review.

### 2. One source of truth

Values live in token JSON files only. No hardcoded hex values in CSS, TypeScript, or component
files. ESLint rules enforce this (see `eslint-plugin-no-hardcoded-tokens`).

### 3. Dark theme is not optional

Any new semantic color token must have a verified dark theme override. "Dark mode" is not an
afterthought — it ships with every token.

### 4. Accessibility first

- Text color tokens must document WCAG contrast ratio in `$description`
- Interactive elements must meet 3:1 minimum (WCAG 1.4.11)
- Focus tokens must meet 3:1 minimum (WCAG 2.4.11)
- High-contrast overrides are required for all interactive color tokens

### 5. No pixel values in semantic tokens

Semantic tokens reference primitives. Semantic spacing tokens say `{ "$value": "{spacing.4}" }` not
`{ "$value": "16px" }`.

---

## Branch Strategy

```
main          ← production releases only (protected)
develop       ← integration branch for next release
feature/*     ← new tokens, features
fix/*         ← bug fixes
docs/*        ← documentation only
chore/*       ← tooling, dependencies
```

All PRs target `develop`. `develop` → `main` via Release PR (Changesets).

---

## Versioning

We use **Semantic Versioning** via Changesets:

| Change Type              | Version Bump | Example                         |
| ------------------------ | ------------ | ------------------------------- |
| New token added          | `patch`      | New semantic status token       |
| Token renamed            | `minor`      | With deprecation path           |
| Token removed            | `major`      | Breaking change                 |
| Value change (no rename) | `minor`      | Color shift, spacing adjustment |

---

## Review SLA

| PR Type            | Target Review Time                       |
| ------------------ | ---------------------------------------- |
| Bug fix            | 1 business day                           |
| Documentation      | 2 business days                          |
| New semantic token | 5 business days (includes design review) |
| New primitive      | 10 business days (includes Design RFC)   |
| New brand/theme    | Negotiated per brand                     |

---

## Design ↔ Code Sync

The Figma Variables file is the **design source of truth**. When tokens change in Figma:

1. Figma exports updated `figma-tokens.json` via the Tokens Studio plugin
2. A PR is automatically created via `token-sync` GitHub Action
3. DS Core reviews for regressions
4. On merge, Style Dictionary rebuilds all output formats

When tokens change in code first (rare):

1. Code PR merged
2. DS Core manually updates Figma Variables to match
3. Figma sync verified by comparing `dist/figma/tokens.json` against Figma export

**Goal:** Zero drift between Figma and code. Drift is treated as a bug.
