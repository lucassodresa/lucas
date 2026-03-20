/**
 * @lucas/ui — Design Token Definitions (single source of truth)
 *
 * This file drives TWO outputs:
 *   1. CSS files — run `npm run tokens:generate` in packages/ui
 *   2. TypeScript exports — import directly in tests and Storybook
 *
 * Rule: never edit tokens.css or tokens-dark.css by hand.
 *       Edit here, then regenerate.
 */

// ── Helper ───────────────────────────────────────────────────

/** Produces a CSS var() reference, e.g. ref('color-blue-500') → 'var(--color-blue-500)' */
const ref = (name: string) => `var(--${name})`;

// ── Color scale primitives ────────────────────────────────────
// Used by semantic tokens below (via ref()) and exported for TS consumers.

export const colorNeutral = {
  0: '#ffffff',
  50: '#f8f9fa',
  100: '#f1f3f5',
  200: '#e9ecef',
  300: '#dee2e6',
  400: '#ced4da',
  500: '#adb5bd',
  600: '#868e96',
  700: '#495057',
  800: '#343a40',
  900: '#212529',
  950: '#0d0f12',
} as const;

export const colorBlue = {
  50: '#eff6ff',
  100: '#dbeafe',
  200: '#bfdbfe',
  300: '#93c5fd',
  400: '#60a5fa',
  500: '#3b82f6',
  600: '#2563eb',
  700: '#1d4ed8',
  800: '#1e40af',
  900: '#1e3a8a',
} as const;

export const colorGreen = {
  50: '#f0fdf4',
  100: '#dcfce7',
  400: '#4ade80',
  500: '#22c55e',
  600: '#16a34a',
  700: '#15803d',
  900: '#14532d',
} as const;

export const colorYellow = {
  50: '#fefce8',
  100: '#fef9c3',
  400: '#facc15',
  500: '#eab308',
  600: '#ca8a04',
  900: '#713f12',
} as const;

export const colorRed = {
  50: '#fff1f2',
  100: '#ffe4e6',
  400: '#f87171',
  500: '#ef4444',
  600: '#dc2626',
  700: '#b91c1c',
  900: '#7f1d1d',
} as const;

// ── Font sizes (modular scale — base 16px, ratio 1.25) ───────

export const fontSize = {
  '2xs': '0.64rem', // 10.24px
  xs: '0.8rem', // 12.8px
  sm: '0.875rem', // 14px
  md: '1rem', // 16px
  lg: '1.25rem', // 20px
  xl: '1.5625rem', // 25px
  '2xl': '1.953rem', // 31.25px
  '3xl': '2.441rem', // 39.06px
  '4xl': '3.052rem', // 48.83px
} as const;

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const lineHeight = {
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
} as const;

export const letterSpacing = {
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
} as const;

// ── Spacing (base-4 scale) ────────────────────────────────────

export const spacing = {
  0: '0',
  1: '0.25rem', //  4px
  2: '0.5rem', //  8px
  3: '0.75rem', // 12px
  4: '1rem', // 16px
  5: '1.25rem', // 20px
  6: '1.5rem', // 24px
  8: '2rem', // 32px
  10: '2.5rem', // 40px
  12: '3rem', // 48px
  16: '4rem', // 64px
  20: '5rem', // 80px
  24: '6rem', // 96px
} as const;

// ── Border radius ─────────────────────────────────────────────

export const borderRadius = {
  none: '0',
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  full: '9999px',
} as const;

// ── Z-index ───────────────────────────────────────────────────

export const zIndex = {
  below: '-1',
  base: '0',
  raised: '10',
  dropdown: '100',
  sticky: '200',
  overlay: '300',
  modal: '400',
  toast: '500',
  tooltip: '600',
} as const;

// ── Transitions ───────────────────────────────────────────────

export const duration = {
  fast: '100ms',
  normal: '200ms',
  slow: '300ms',
} as const;

export const easing = {
  default: 'cubic-bezier(0.4, 0, 0.2, 1)',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  out: 'cubic-bezier(0, 0, 0.2, 1)',
} as const;

// ── Semantic color names ──────────────────────────────────────

export const semanticColors = ['primary', 'success', 'warning', 'danger'] as const;
export type SemanticColor = (typeof semanticColors)[number];

// ─────────────────────────────────────────────────────────────
// CSS VARIABLE MAPS
// These are consumed by scripts/generate-tokens.ts to produce
// tokens.css and tokens-dark.css. Not intended for direct use
// in component code — reference the CSS vars in .module.css files.
// ─────────────────────────────────────────────────────────────

/** All tokens that belong in :root (light mode). */
export const lightTokens: Record<string, string> = {
  // ── Color primitives ──────────────────────────────────────
  'color-neutral-0': colorNeutral[0],
  'color-neutral-50': colorNeutral[50],
  'color-neutral-100': colorNeutral[100],
  'color-neutral-200': colorNeutral[200],
  'color-neutral-300': colorNeutral[300],
  'color-neutral-400': colorNeutral[400],
  'color-neutral-500': colorNeutral[500],
  'color-neutral-600': colorNeutral[600],
  'color-neutral-700': colorNeutral[700],
  'color-neutral-800': colorNeutral[800],
  'color-neutral-900': colorNeutral[900],
  'color-neutral-950': colorNeutral[950],

  'color-blue-50': colorBlue[50],
  'color-blue-100': colorBlue[100],
  'color-blue-200': colorBlue[200],
  'color-blue-300': colorBlue[300],
  'color-blue-400': colorBlue[400],
  'color-blue-500': colorBlue[500],
  'color-blue-600': colorBlue[600],
  'color-blue-700': colorBlue[700],
  'color-blue-800': colorBlue[800],
  'color-blue-900': colorBlue[900],

  'color-green-50': colorGreen[50],
  'color-green-100': colorGreen[100],
  'color-green-400': colorGreen[400],
  'color-green-500': colorGreen[500],
  'color-green-600': colorGreen[600],
  'color-green-700': colorGreen[700],
  'color-green-900': colorGreen[900],

  'color-yellow-50': colorYellow[50],
  'color-yellow-100': colorYellow[100],
  'color-yellow-400': colorYellow[400],
  'color-yellow-500': colorYellow[500],
  'color-yellow-600': colorYellow[600],
  'color-yellow-900': colorYellow[900],

  'color-red-50': colorRed[50],
  'color-red-100': colorRed[100],
  'color-red-400': colorRed[400],
  'color-red-500': colorRed[500],
  'color-red-600': colorRed[600],
  'color-red-700': colorRed[700],
  'color-red-900': colorRed[900],

  // ── Surface & background ──────────────────────────────────
  'color-bg-base': ref('color-neutral-0'),
  'color-bg-subtle': ref('color-neutral-50'),
  'color-bg-muted': ref('color-neutral-100'),
  'color-bg-overlay': ref('color-neutral-200'),

  // ── Border ────────────────────────────────────────────────
  'color-border-default': ref('color-neutral-300'),
  'color-border-strong': ref('color-neutral-400'),
  'color-border-focus': ref('color-blue-500'),

  // ── Text ──────────────────────────────────────────────────
  'color-text-primary': ref('color-neutral-900'),
  'color-text-secondary': ref('color-neutral-700'),
  'color-text-muted': ref('color-neutral-500'),
  'color-text-disabled': ref('color-neutral-400'),
  'color-text-inverse': ref('color-neutral-0'),
  'color-text-on-accent': ref('color-neutral-0'),

  // ── Primary ───────────────────────────────────────────────
  'color-primary': ref('color-blue-600'),
  'color-primary-hover': ref('color-blue-700'),
  'color-primary-active': ref('color-blue-800'),
  'color-primary-subtle': ref('color-blue-50'),
  'color-primary-muted': ref('color-blue-100'),
  'color-primary-border': ref('color-blue-200'),

  // ── Success ───────────────────────────────────────────────
  'color-success': ref('color-green-600'),
  'color-success-hover': ref('color-green-700'),
  'color-success-subtle': ref('color-green-50'),
  'color-success-muted': ref('color-green-100'),
  'color-success-text': ref('color-green-700'),

  // ── Warning ───────────────────────────────────────────────
  'color-warning': ref('color-yellow-500'),
  'color-warning-hover': ref('color-yellow-600'),
  'color-warning-subtle': ref('color-yellow-50'),
  'color-warning-muted': ref('color-yellow-100'),
  'color-warning-text': ref('color-yellow-600'),

  // ── Danger ────────────────────────────────────────────────
  'color-danger': ref('color-red-600'),
  'color-danger-hover': ref('color-red-700'),
  'color-danger-active': ref('color-red-700'),
  'color-danger-subtle': ref('color-red-50'),
  'color-danger-muted': ref('color-red-100'),
  'color-danger-border': ref('color-red-200'),
  'color-danger-text': ref('color-red-700'),

  // ── Typography ────────────────────────────────────────────
  'font-family-base':
    "'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  'font-family-mono':
    "'JetBrains Mono', 'Fira Code', 'Cascadia Code', ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace",

  'font-size-2xs': fontSize['2xs'],
  'font-size-xs': fontSize.xs,
  'font-size-sm': fontSize.sm,
  'font-size-md': fontSize.md,
  'font-size-lg': fontSize.lg,
  'font-size-xl': fontSize.xl,
  'font-size-2xl': fontSize['2xl'],
  'font-size-3xl': fontSize['3xl'],
  'font-size-4xl': fontSize['4xl'],

  'font-weight-regular': fontWeight.regular,
  'font-weight-medium': fontWeight.medium,
  'font-weight-semibold': fontWeight.semibold,
  'font-weight-bold': fontWeight.bold,

  'line-height-tight': lineHeight.tight,
  'line-height-snug': lineHeight.snug,
  'line-height-normal': lineHeight.normal,
  'line-height-relaxed': lineHeight.relaxed,

  'letter-spacing-tight': letterSpacing.tight,
  'letter-spacing-normal': letterSpacing.normal,
  'letter-spacing-wide': letterSpacing.wide,
  'letter-spacing-wider': letterSpacing.wider,

  // ── Spacing ───────────────────────────────────────────────
  'spacing-0': spacing[0],
  'spacing-1': spacing[1],
  'spacing-2': spacing[2],
  'spacing-3': spacing[3],
  'spacing-4': spacing[4],
  'spacing-5': spacing[5],
  'spacing-6': spacing[6],
  'spacing-8': spacing[8],
  'spacing-10': spacing[10],
  'spacing-12': spacing[12],
  'spacing-16': spacing[16],
  'spacing-20': spacing[20],
  'spacing-24': spacing[24],

  // ── Border radius ─────────────────────────────────────────
  'radius-none': borderRadius.none,
  'radius-sm': borderRadius.sm,
  'radius-md': borderRadius.md,
  'radius-lg': borderRadius.lg,
  'radius-xl': borderRadius.xl,
  'radius-2xl': borderRadius['2xl'],
  'radius-full': borderRadius.full,

  // ── Shadows ───────────────────────────────────────────────
  'shadow-none': 'none',
  'shadow-xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  'shadow-sm': '0 1px 3px 0 rgb(0 0 0 / 0.10), 0 1px 2px -1px rgb(0 0 0 / 0.10)',
  'shadow-md': '0 4px 6px -1px rgb(0 0 0 / 0.10), 0 2px 4px -2px rgb(0 0 0 / 0.10)',
  'shadow-lg': '0 10px 15px -3px rgb(0 0 0 / 0.10), 0 4px 6px -4px rgb(0 0 0 / 0.10)',
  'shadow-xl': '0 20px 25px -5px rgb(0 0 0 / 0.10), 0 8px 10px -6px rgb(0 0 0 / 0.10)',

  // ── Z-index ───────────────────────────────────────────────
  'z-below': zIndex.below,
  'z-base': zIndex.base,
  'z-raised': zIndex.raised,
  'z-dropdown': zIndex.dropdown,
  'z-sticky': zIndex.sticky,
  'z-overlay': zIndex.overlay,
  'z-modal': zIndex.modal,
  'z-toast': zIndex.toast,
  'z-tooltip': zIndex.tooltip,

  // ── Transitions ───────────────────────────────────────────
  'duration-fast': duration.fast,
  'duration-normal': duration.normal,
  'duration-slow': duration.slow,
  'ease-default': easing.default,
  'ease-in': easing.in,
  'ease-out': easing.out,

  // ── Focus ring ────────────────────────────────────────────
  'focus-ring-width': '3px',
  'focus-ring-offset': '2px',
  'focus-ring-color': ref('color-blue-400'),
};

/** Semantic token overrides for dark mode. Primitives stay unchanged. */
export const darkTokens: Record<string, string> = {
  'color-bg-base': ref('color-neutral-950'),
  'color-bg-subtle': ref('color-neutral-900'),
  'color-bg-muted': ref('color-neutral-800'),
  'color-bg-overlay': ref('color-neutral-700'),

  'color-border-default': ref('color-neutral-700'),
  'color-border-strong': ref('color-neutral-600'),
  'color-border-focus': ref('color-blue-400'),

  'color-text-primary': ref('color-neutral-50'),
  'color-text-secondary': ref('color-neutral-300'),
  'color-text-muted': ref('color-neutral-500'),
  'color-text-disabled': ref('color-neutral-600'),
  'color-text-inverse': ref('color-neutral-900'),
  'color-text-on-accent': ref('color-neutral-0'),

  'color-primary': ref('color-blue-400'),
  'color-primary-hover': ref('color-blue-300'),
  'color-primary-active': ref('color-blue-200'),
  'color-primary-subtle': ref('color-blue-900'),
  'color-primary-muted': ref('color-blue-800'),
  'color-primary-border': ref('color-blue-700'),

  'color-success': ref('color-green-400'),
  'color-success-hover': ref('color-green-500'),
  'color-success-subtle': ref('color-green-900'),
  'color-success-muted': ref('color-green-900'),
  'color-success-text': ref('color-green-400'),

  'color-warning': ref('color-yellow-400'),
  'color-warning-hover': ref('color-yellow-500'),
  'color-warning-subtle': ref('color-yellow-900'),
  'color-warning-muted': ref('color-yellow-900'),
  'color-warning-text': ref('color-yellow-400'),

  'color-danger': ref('color-red-400'),
  'color-danger-hover': ref('color-red-500'),
  'color-danger-active': ref('color-red-400'),
  'color-danger-subtle': ref('color-red-900'),
  'color-danger-muted': ref('color-red-900'),
  'color-danger-border': ref('color-red-700'),
  'color-danger-text': ref('color-red-400'),

  'shadow-xs': '0 1px 2px 0 rgb(0 0 0 / 0.25)',
  'shadow-sm': '0 1px 3px 0 rgb(0 0 0 / 0.40), 0 1px 2px -1px rgb(0 0 0 / 0.40)',
  'shadow-md': '0 4px 6px -1px rgb(0 0 0 / 0.40), 0 2px 4px -2px rgb(0 0 0 / 0.40)',
  'shadow-lg': '0 10px 15px -3px rgb(0 0 0 / 0.40), 0 4px 6px -4px rgb(0 0 0 / 0.40)',
  'shadow-xl': '0 20px 25px -5px rgb(0 0 0 / 0.40), 0 8px 10px -6px rgb(0 0 0 / 0.40)',

  'focus-ring-color': ref('color-blue-400'),
};
