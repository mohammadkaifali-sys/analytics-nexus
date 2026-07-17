---
name: Lumina Analytics Mobile
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#bcc9cd'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#869397'
  outline-variant: '#3d494c'
  surface-tint: '#4cd7f6'
  primary: '#4cd7f6'
  on-primary: '#003640'
  primary-container: '#06b6d4'
  on-primary-container: '#00424f'
  inverse-primary: '#00687a'
  secondary: '#bcc7de'
  on-secondary: '#263143'
  secondary-container: '#3e495d'
  on-secondary-container: '#aeb9d0'
  tertiary: '#b9c7e0'
  on-tertiary: '#233144'
  tertiary-container: '#99a7bf'
  on-tertiary-container: '#2f3d50'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#acedff'
  primary-fixed-dim: '#4cd7f6'
  on-primary-fixed: '#001f26'
  on-primary-fixed-variant: '#004e5c'
  secondary-fixed: '#d8e3fb'
  secondary-fixed-dim: '#bcc7de'
  on-secondary-fixed: '#111c2d'
  on-secondary-fixed-variant: '#3c475a'
  tertiary-fixed: '#d5e3fd'
  tertiary-fixed-dim: '#b9c7e0'
  on-tertiary-fixed: '#0d1c2f'
  on-tertiary-fixed-variant: '#3a485c'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  numeric-data:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: -0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  touch-target-min: 44px
  margin-mobile: 16px
  gutter-mobile: 12px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
---

## Brand & Style
The design system embodies a "Precision Dark" aesthetic, blending the technical rigor of Stripe with the premium hardware-software integration of Apple. The brand personality is authoritative yet approachable, prioritizing clarity and high-signal data visualization. 

The design style is **Corporate Modern with Glassmorphic accents**. It utilizes deep charcoal surfaces, vibrant cyan highlights, and subtle translucency to create a sense of depth and hierarchy on mobile screens. Every interaction must feel snappy and deliberate, evoking a sense of "expert-grade" tooling that fits in a pocket.

## Colors
The palette is rooted in a pure dark environment to maximize the brilliance of the primary accent.

- **Primary (#06b6d4):** Reserved for high-priority actions, active states, and critical data trends.
- **Surface Layering:** The background is `#0a0a0a`. Elevated cards and containers use a gradient or solid fill of `#1e293b` to create a "lifted" effect.
- **Semantic Colors:** Success, warning, and error states should maintain high saturation to remain legible against the dark backdrop, following the tonal intensity of the primary cyan.

## Typography
This design system utilizes **Inter** exclusively to leverage its exceptional legibility and systematic feel. 

On mobile, we prioritize vertical rhythm. Headlines are tightened to prevent excessive line-breaks. Numeric data—central to an analytics platform—is given slightly tighter letter-spacing and a medium weight to feel "instrument-like." For small labels and metadata, uppercase styling with increased tracking ensures readability on low-brightness mobile screens.

## Layout & Spacing
The layout follows a **Fluid Grid** model optimized for narrow viewports.

- **Mobile Grid:** A 4-column system with 16px side margins and 12px gutters.
- **Touch Fidelity:** All interactive elements (buttons, inputs, list items) must adhere to a minimum height of 44px. 
- **Vertical Rhythm:** Spacing is strictly based on a 4px baseline. Use 16px (stack-md) for standard grouping and 24px (stack-lg) for section separation.
- **Safe Areas:** Bottom navigation and floating action buttons must respect hardware safe-area insets (iOS/Android home indicators).

## Elevation & Depth
Depth is created through **Tonal Layers** and **Backdrop Blurs**, rather than heavy shadows which can appear muddy on dark OLED screens.

- **Base Layer:** `#0a0a0a` (The abyss).
- **Sheet Layer:** `#1e293b` with a subtle 1px border (`#ffffff10`) to define edges.
- **Glass Layer:** Used for sticky headers and navigation bars. Use a backdrop blur of 20px and a background color of `#0a0a0a80`.
- **Interactions:** Upon press, elements should slightly scale down (e.g., 98%) rather than changing shadow depth, providing tactile haptic-like feedback.

## Shapes
The design system uses a **Rounded** shape language to soften the "tech" aesthetic and feel more integrated with modern mobile OS styling. 

Main containers and cards use a 1rem (`rounded-lg`) corner radius. Primary buttons use a slightly smaller 0.5rem radius to maintain a sense of structural integrity. Small chips or tags may utilize "pill" shapes (full radius) to distinguish them from actionable buttons.

## Components

- **Buttons:** Primary buttons use the Cyan `#06b6d4` background with black text for maximum contrast. Minimum height is 48px for mobile.
- **Inputs:** Darker background than the card surface to create an "inset" look. The active state is signaled by a 1px Cyan border.
- **Data Cards:** Use a subtle 1px top-highlight border to simulate light hitting a physical edge.
- **Bottom Sheets:** For complex filters or actions, use modal bottom sheets instead of standard dropdowns. These should have a visible "grabber" handle at the top.
- **Charts:** Maintain a 2px stroke width for line charts. Use semi-transparent Cyan gradients for area charts to keep the dark background visible.
- **Navigation:** A fixed bottom tab bar with 24px icons and 10px labels. Use the Cyan accent only for the active state icon and indicator dot.