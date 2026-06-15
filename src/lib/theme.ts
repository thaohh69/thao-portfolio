/**
 * Theme Utilities
 * 
 * Centralized color system utilities, consistent styling functions,
 * and responsive design utilities for the application.
 */

/**
 * Color palette interface
 */
export interface ColorPalette {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

/**
 * Extended color system with semantic meanings
 */
export const colors = {
  // Brand colors
  primary: {
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
    950: '#172554',
  },
  
  // Success colors (green)
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },
  
  // Warning colors (orange)
  warning: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
    950: '#431407',
  },
  
  // Error colors (red)
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },
  
  // Info colors (blue)
  info: {
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
    950: '#172554',
  },
  
  // Purple colors
  purple: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7c3aed',
    800: '#6b21a8',
    900: '#581c87',
    950: '#3b0764',
  },
  
  // Gray colors
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
    950: '#030712',
  },
} as const;

/**
 * Color mappings for different contexts
 */
export const colorMappings = {
  metrics: {
    'Cost Optimization': {
      text: 'text-green-600',
      bg: 'bg-green-50 dark:bg-green-950/20',
      border: 'border-green-200',
      class: 'text-green-600 bg-green-50 dark:bg-green-950/20 border-green-200',
    },
    'Revenue Growth': {
      text: 'text-blue-600',
      bg: 'bg-blue-50 dark:bg-blue-950/20',
      border: 'border-blue-200',
      class: 'text-blue-600 bg-blue-50 dark:bg-blue-950/20 border-blue-200',
    },
    'Performance Improvement': {
      text: 'text-purple-600',
      bg: 'bg-purple-50 dark:bg-purple-950/20',
      border: 'border-purple-200',
      class: 'text-purple-600 bg-purple-50 dark:bg-purple-950/20 border-purple-200',
    },
    'Infrastructure': {
      text: 'text-orange-600',
      bg: 'bg-orange-50 dark:bg-orange-950/20',
      border: 'border-orange-200',
      class: 'text-orange-600 bg-orange-50 dark:bg-orange-950/20 border-orange-200',
    },
  },
  status: {
    success: {
      text: 'text-green-700 dark:text-green-400',
      bg: 'bg-green-100 dark:bg-green-900/30',
      border: 'border-green-200 dark:border-green-800',
    },
    warning: {
      text: 'text-orange-700 dark:text-orange-400',
      bg: 'bg-orange-100 dark:bg-orange-900/30',
      border: 'border-orange-200 dark:border-orange-800',
    },
    error: {
      text: 'text-red-700 dark:text-red-400',
      bg: 'bg-red-100 dark:bg-red-900/30',
      border: 'border-red-200 dark:border-red-800',
    },
    info: {
      text: 'text-blue-700 dark:text-blue-400',
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      border: 'border-blue-200 dark:border-blue-800',
    },
  },
} as const;

/**
 * Spacing system based on Tailwind CSS
 */
export const spacing = {
  px: '1px',
  0: '0px',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  11: '2.75rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
} as const;

/**
 * Font sizes with line heights
 */
export const fontSize = {
  xs: ['0.75rem', { lineHeight: '1rem' }],
  sm: ['0.875rem', { lineHeight: '1.25rem' }],
  base: ['1rem', { lineHeight: '1.5rem' }],
  lg: ['1.125rem', { lineHeight: '1.75rem' }],
  xl: ['1.25rem', { lineHeight: '1.75rem' }],
  '2xl': ['1.5rem', { lineHeight: '2rem' }],
  '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
  '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
  '5xl': ['3rem', { lineHeight: '1' }],
  '6xl': ['3.75rem', { lineHeight: '1' }],
  '7xl': ['4.5rem', { lineHeight: '1' }],
  '8xl': ['6rem', { lineHeight: '1' }],
  '9xl': ['8rem', { lineHeight: '1' }],
} as const;

/**
 * Border radius values
 */
export const borderRadius = {
  none: '0px',
  sm: '0.125rem',
  DEFAULT: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
} as const;

/**
 * Box shadow values
 */
export const boxShadow = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: '0 0 #0000',
} as const;

/**
 * Breakpoints for responsive design
 */
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

/**
 * Gets color class for a specific metric type
 * 
 * @param metricType - The type of metric
 * @returns Color class string
 */
export function getMetricColor(metricType: string): string {
  return colorMappings.metrics[metricType as keyof typeof colorMappings.metrics]?.class || 
         'text-gray-600 bg-gray-50 dark:bg-gray-950/20 border-gray-200';
}

/**
 * Gets status color classes
 * 
 * @param status - Status type (success, warning, error, info)
 * @returns Object with text, bg, and border classes
 */
export function getStatusColors(status: 'success' | 'warning' | 'error' | 'info') {
  return colorMappings.status[status];
}

/**
 * Generates a gradient background class
 * 
 * @param from - Starting color
 * @param to - Ending color
 * @param direction - Gradient direction
 * @returns Gradient class string
 */
export function createGradient(
  from: string,
  to: string,
  direction: 'to-r' | 'to-l' | 'to-t' | 'to-b' | 'to-tr' | 'to-tl' | 'to-br' | 'to-bl' = 'to-r'
): string {
  return `bg-gradient-${direction} from-${from} to-${to}`;
}

/**
 * Creates a CSS-in-JS style object for a color
 * 
 * @param color - Color value
 * @param alpha - Optional alpha value (0-1)
 * @returns CSS style object
 */
export function createColorStyle(color: string, alpha?: number): React.CSSProperties {
  if (alpha !== undefined) {
    // Convert hex to rgba if needed
    if (color.startsWith('#')) {
      const hex = color.slice(1);
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return { color: `rgba(${r}, ${g}, ${b}, ${alpha})` };
    }
  }
  return { color };
}

/**
 * Creates responsive utility classes
 * 
 * @param base - Base class
 * @param responsive - Responsive overrides
 * @returns Complete responsive class string
 */
export function createResponsiveClass(
  base: string,
  responsive: Partial<Record<keyof typeof breakpoints, string>> = {}
): string {
  let classes = base;
  
  Object.entries(responsive).forEach(([breakpoint, value]) => {
    if (value) {
      classes += ` ${breakpoint}:${value}`;
    }
  });
  
  return classes;
}

/**
 * Theme configuration object
 */
export const theme = {
  colors,
  colorMappings,
  spacing,
  fontSize,
  borderRadius,
  boxShadow,
  breakpoints,
} as const;

/**
 * Dark mode utilities
 */
export const darkMode = {
  /**
   * Creates a class that works in both light and dark modes
   * 
   * @param lightClass - Class for light mode
   * @param darkClass - Class for dark mode
   * @returns Combined class string
   */
  variant: (lightClass: string, darkClass: string): string => {
    return `${lightClass} dark:${darkClass}`;
  },
  
  /**
   * Common dark mode text colors
   */
  text: {
    primary: 'text-gray-900 dark:text-gray-100',
    secondary: 'text-gray-600 dark:text-gray-400',
    muted: 'text-gray-500 dark:text-gray-500',
  },
  
  /**
   * Common dark mode background colors
   */
  bg: {
    primary: 'bg-white dark:bg-gray-900',
    secondary: 'bg-gray-50 dark:bg-gray-800',
    muted: 'bg-gray-100 dark:bg-gray-700',
  },
  
  /**
   * Common dark mode border colors
   */
  border: {
    primary: 'border-gray-200 dark:border-gray-700',
    secondary: 'border-gray-300 dark:border-gray-600',
  },
} as const;

/**
 * Animation-safe color transitions
 */
export const transitions = {
  colors: 'transition-colors duration-200',
  all: 'transition-all duration-200',
  transform: 'transition-transform duration-200',
  opacity: 'transition-opacity duration-200',
} as const;

/**
 * Common component styling patterns
 */
export const patterns = {
  card: `${darkMode.bg.primary} ${darkMode.border.primary} ${transitions.colors} rounded-lg border shadow-sm`,
  button: {
    primary: `bg-primary-600 hover:bg-primary-700 text-white ${transitions.colors}`,
    secondary: `${darkMode.bg.secondary} ${darkMode.text.primary} ${darkMode.border.primary} border ${transitions.colors}`,
    ghost: `hover:${darkMode.bg.secondary} ${darkMode.text.primary} ${transitions.colors}`,
  },
  input: `${darkMode.bg.primary} ${darkMode.border.primary} ${darkMode.text.primary} border rounded-md ${transitions.colors}`,
} as const;