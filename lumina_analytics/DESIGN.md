---
name: Lumina Analytics
colors:
  surface: '#0c1324'
  surface-dim: '#0c1324'
  surface-bright: '#33394c'
  surface-container-lowest: '#070d1f'
  surface-container-low: '#151b2d'
  surface-container: '#191f31'
  surface-container-high: '#23293c'
  surface-container-highest: '#2e3447'
  on-surface: '#dce1fb'
  on-surface-variant: '#bcc9cd'
  inverse-surface: '#dce1fb'
  inverse-on-surface: '#2a3043'
  outline: '#869397'
  outline-variant: '#3d494c'
  surface-tint: '#4cd7f6'
  primary: '#4cd7f6'
  on-primary: '#003640'
  primary-container: '#06b6d4'
  on-primary-container: '#00424f'
  inverse-primary: '#00687a'
  secondary: '#d0bcff'
  on-secondary: '#3c0091'
  secondary-container: '#571bc1'
  on-secondary-container: '#c4abff'
  tertiary: '#c4c7c9'
  on-tertiary: '#2d3133'
  tertiary-container: '#a4a7a9'
  on-tertiary-container: '#393d3e'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#acedff'
  primary-fixed-dim: '#4cd7f6'
  on-primary-fixed: '#001f26'
  on-primary-fixed-variant: '#004e5c'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#e0e3e5'
  tertiary-fixed-dim: '#c4c7c9'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#444749'
  background: '#0c1324'
  on-background: '#dce1fb'
  surface-variant: '#2e3447'
typography:
  display:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1440px
  section-gap: 4rem
  card-gap: 1.5rem
  inner-padding: 1.5rem
  gutter: 2rem
  margin-mobile: 1rem
  margin-desktop: 2.5rem
---

## Brand & Style

The design system is engineered for high-stakes enterprise data environments where clarity is paramount and precision is a status symbol. The brand personality is authoritative yet ethereal, blending the structural rigor of developer tools with the polished aesthetics of high-end consumer hardware.

The design style is a **Precision-Glass Hybrid**. It leverages the dark-mode mastery of Linear (deep blacks and vibrant accents), the typographic hierarchy of Stripe, and the structural minimalism of Vercel. 

Key attributes include:
- **Luminous Depth:** Utilizing mesh gradients and backdrop filters to create a sense of multi-dimensional space.
- **Micro-Precision:** High-contrast borders and surgical-grade typography to ensure data remains the protagonist.
- **Premium Restraint:** Ample negative space that signals luxury and reduces cognitive load during complex analysis.

## Colors

The palette is anchored in a deep, nocturnal foundation to minimize eye strain and maximize the vibrance of data visualizations.

- **Foundational Navy (#020617):** Used for primary backgrounds to provide a "void-like" canvas that makes elements pop.
- **Slate Surfaces (#1E293B):** Reserved for interactive cards and sidebars, treated with varying levels of transparency.
- **Cyan Accent (#06B6D4):** The primary action color, used for success states, primary buttons, and critical data paths.
- **Violet Secondary (#8B5CF6):** Used for secondary data series and premium highlights.
- **Functional Gradients:** A signature mesh gradient (Cyan to Violet) should be applied sparingly to top-level headers and "hero" data points to evoke an expensive, high-fidelity feel.

## Typography

Typography in the design system focuses on legibility and technical sophistication. **Inter** is the workhorse for content, while **Geist** (or a similar monospaced/technical sans) is used for labels and data values to provide a "developer-centric" precision.

- **Headings:** Should feature tight tracking (letter-spacing) and high weight to create a strong visual anchor against the dark background.
- **Data Display:** Numerical values should always use `label-md` or `label-sm` to ensure tabular alignment and a technical aesthetic.
- **Contrast:** Maintain a high contrast ratio by using `Slate-100` for primary text and `Slate-400` for secondary descriptions.

## Layout & Spacing

The design system employs an **Airy Fluid Grid** model. It prioritizes "breathability" to prevent complex dashboards from feeling cramped.

- **Desktop:** A 12-column grid with a 1440px max-width. Gutters are generous (32px) to allow individual cards to feel like floating modules.
- **Scaling:** Spacing follows a strict 8px base unit. Use `section-gap` for major layout shifts and `card-gap` for related data clusters.
- **Mobile Reflow:** On mobile devices, the 12-column grid collapses to a 1-column stack. Margins reduce to 16px to maximize screen real estate, while maintaining a minimum touch target area of 44px.

## Elevation & Depth

This design system eschews traditional shadows in favor of **Luminous Layers** and **Backdrop Blurs**.

- **Surface Tiers:** Background is Level 0 (#020617). Primary cards are Level 1 (#1E293B at 80% opacity with 20px backdrop-blur). Modals and Popovers are Level 2 (a lighter Slate tint with a subtle 1px white border at 10% opacity).
- **The "Glow" Effect:** Active states or primary cards may utilize a "Radial Gradient Stroke"—a subtle 1px border that appears to catch light from a mesh gradient behind the element.
- **Glassmorphism:** All floating elements (headers, menus, cards) must use `backdrop-filter: blur(12px)` to maintain a sense of context with the layers beneath them.

## Shapes

The shape language is sophisticated and approachable. We use **Rounded (0.5rem base)** corners for standard UI elements to maintain a professional edge, but scale up to **rounded-xl (1.5rem)** for cards and main containers to achieve that "Apple-esque" softness.

- **Buttons & Inputs:** Use the base 0.5rem (8px) radius.
- **Main Dashboard Cards:** Use 1rem (16px) to 1.5rem (24px) for a more modern, premium container feel.
- **Icons:** Should follow a 2px stroke width with slightly rounded terminals to match the font weight of Inter.

## Components

### Buttons
- **Primary:** Solid Cyan (#06B6D4) with white text. Apply a subtle inner shadow to create a "pressed" tactile feel.
- **Ghost:** Transparent background with a 1px border of `rgba(255, 255, 255, 0.1)`. On hover, the background shifts to a subtle Slate tint.

### Cards
- **Analytics Card:** 1px border (#ffffff10), 1.5rem padding, and a backdrop blur. Titles should be in `label-sm` (uppercase) to act as a header.

### Input Fields
- Dark backgrounds (#020617) with a subtle 1px border. On focus, the border glows with the Cyan accent color, and a faint outer glow (box-shadow) is applied.

### Chips & Badges
- Use a pill-shape (rounded-full) with low-opacity fills of the accent colors (e.g., Cyan at 10% opacity) and high-contrast text.

### Progress & Data Viz
- Use the Cyan-to-Violet mesh gradient for progress bars and primary trend lines. Data points should have a "halo" effect (a soft glow) when hovered.

### Lists
- Clean, borderless rows separated by 1px dividers with 5% opacity. High-contrast labels for the primary data point and muted colors for metadata.