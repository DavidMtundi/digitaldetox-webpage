// Centralized Theme Configuration
// This file manages all theme-related colors, spacing, and design tokens

export const theme = {
  colors: {
    // Background Colors
    background: {
      primary: '#ffffff',      // Pure white
      secondary: '#f8fafc',    // Light gray for subtle sections
      hero: '#ffffff',         // Hero section background
      features: '#ffffff',     // Features section background
      stats: '#ffffff',        // Stats section background
      cta: '#4f46e5',         // CTA section background (blue gradient)
    },
    
    // Text Colors
    text: {
      primary: '#111827',      // Main text (dark gray)
      secondary: '#6b7280',    // Secondary text (medium gray)
      muted: '#9ca3af',        // Muted text (light gray)
      accent: '#4f46e5',       // Accent text (blue)
    },
    
    // Brand Colors
    brand: {
      primary: '#4f46e5',      // Main brand blue
      secondary: '#7c3aed',    // Purple accent
      success: '#059669',      // Green for success states
      warning: '#d97706',      // Orange for warnings
      error: '#dc2626',        // Red for errors
    },
    
    // UI Element Colors
    ui: {
      card: '#ffffff',         // Card backgrounds
      border: '#e5e7eb',       // Border colors
      shadow: 'rgba(0, 0, 0, 0.1)', // Shadow colors
      overlay: 'rgba(0, 0, 0, 0.5)', // Overlay colors
    },
    
    // Geometric Pattern Colors
    patterns: {
      primary: '#3b82f6',      // Blue for patterns
      secondary: '#8b5cf6',    // Purple for patterns
      opacity: {
        low: 0.05,             // Very subtle patterns
        medium: 0.1,           // Medium opacity patterns
        high: 0.2,             // More visible patterns
      }
    }
  },
  
  spacing: {
    // Section padding
    section: {
      small: '4rem',           // py-16
      medium: '5rem',          // py-20
      large: '6rem',           // py-24
      xlarge: '8rem',          // py-32
    },
    
    // Container padding
    container: {
      mobile: '1rem',          // px-4
      tablet: '1.5rem',        // px-6
      desktop: '2rem',         // px-8
    }
  },
  
  typography: {
    // Font sizes
    sizes: {
      hero: {
        mobile: '2.25rem',     // text-4xl
        tablet: '3rem',        // text-5xl
        desktop: '4rem',       // text-6xl
        xlarge: '4.5rem',      // text-7xl
      },
      section: {
        mobile: '1.5rem',      // text-2xl
        tablet: '1.875rem',    // text-3xl
        desktop: '2.25rem',    // text-4xl
        xlarge: '3rem',        // text-5xl
      }
    }
  },
  
  effects: {
    // Geometric patterns
    patterns: {
      hero: {
        size: '20px 20px',
        opacity: 0.03,
        color: '#3b82f6'
      },
      features: {
        size: '40px 40px',
        opacity: 0.05,
        color: '#6366f1'
      },
      stats: {
        size: '50px 50px',
        opacity: 0.08,
        color: '#8b5cf6'
      }
    },
    
    // Floating elements
    floating: {
      size: {
        small: '1px',
        medium: '2px',
        large: '3px'
      },
      opacity: 0.1,
      colors: {
        blue: '#3b82f6',
        purple: '#8b5cf6'
      }
    }
  }
}

// Theme utility functions
export const getThemeColor = (path: string): string => {
  const keys = path.split('.')
  let value: any = theme.colors
  
  for (const key of keys) {
    value = value[key]
    if (value === undefined) {
      console.warn(`Theme color not found: ${path}`)
      return '#000000'
    }
  }
  
  return value
}

export const getThemeSpacing = (path: string): string => {
  const keys = path.split('.')
  let value: any = theme.spacing
  
  for (const key of keys) {
    value = value[key]
    if (value === undefined) {
      console.warn(`Theme spacing not found: ${path}`)
      return '1rem'
    }
  }
  
  return value
}

// CSS-in-JS style objects for easy use
export const themeStyles = {
  background: {
    primary: { backgroundColor: theme.colors.background.primary },
    secondary: { backgroundColor: theme.colors.background.secondary },
    hero: { backgroundColor: theme.colors.background.hero },
    features: { backgroundColor: theme.colors.background.features },
    stats: { backgroundColor: theme.colors.background.stats },
    cta: { backgroundColor: theme.colors.background.cta },
  },
  
  text: {
    primary: { color: theme.colors.text.primary },
    secondary: { color: theme.colors.text.secondary },
    muted: { color: theme.colors.text.muted },
    accent: { color: theme.colors.text.accent },
  },
  
  cards: {
    default: {
      backgroundColor: theme.colors.ui.card,
      borderColor: theme.colors.ui.border,
      boxShadow: `0 1px 3px ${theme.colors.ui.shadow}`,
    }
  }
}

// Export theme as default for easy importing
export default theme
