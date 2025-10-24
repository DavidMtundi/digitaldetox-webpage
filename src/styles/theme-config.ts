// Theme Configuration - Easy customization point for all themes
// This file allows you to easily switch between different theme presets

export const themePresets = {
  // Default Digital Detox Theme
  default: {
    name: 'Digital Detox Default',
    colors: {
      background: {
        primary: '#ffffff',
        secondary: '#f8fafc',
        hero: '#ffffff',
        features: '#ffffff',
        stats: '#ffffff',
        cta: '#4f46e5',
      },
      text: {
        primary: '#111827',
        secondary: '#6b7280',
        muted: '#9ca3af',
        accent: '#4f46e5',
      },
      brand: {
        primary: '#4f46e5',
        secondary: '#7c3aed',
        success: '#059669',
        warning: '#d97706',
        error: '#dc2626',
      },
      patterns: {
        primary: '#3b82f6',
        secondary: '#8b5cf6',
        opacity: {
          low: 0.03,
          medium: 0.05,
          high: 0.08,
        }
      }
    }
  },

  // Dark Theme
  dark: {
    name: 'Digital Detox Dark',
    colors: {
      background: {
        primary: '#1f2937',
        secondary: '#111827',
        hero: '#1f2937',
        features: '#1f2937',
        stats: '#1f2937',
        cta: '#4f46e5',
      },
      text: {
        primary: '#f9fafb',
        secondary: '#d1d5db',
        muted: '#9ca3af',
        accent: '#60a5fa',
      },
      brand: {
        primary: '#60a5fa',
        secondary: '#a78bfa',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
      },
      patterns: {
        primary: '#3b82f6',
        secondary: '#8b5cf6',
        opacity: {
          low: 0.05,
          medium: 0.1,
          high: 0.15,
        }
      }
    }
  },

  // Minimal Theme
  minimal: {
    name: 'Minimal Clean',
    colors: {
      background: {
        primary: '#ffffff',
        secondary: '#ffffff',
        hero: '#ffffff',
        features: '#ffffff',
        stats: '#ffffff',
        cta: '#000000',
      },
      text: {
        primary: '#000000',
        secondary: '#666666',
        muted: '#999999',
        accent: '#000000',
      },
      brand: {
        primary: '#000000',
        secondary: '#333333',
        success: '#000000',
        warning: '#000000',
        error: '#000000',
      },
      patterns: {
        primary: '#000000',
        secondary: '#000000',
        opacity: {
          low: 0.02,
          medium: 0.05,
          high: 0.1,
        }
      }
    }
  },

  // Warm Theme
  warm: {
    name: 'Warm & Cozy',
    colors: {
      background: {
        primary: '#fef7ed',
        secondary: '#fff7ed',
        hero: '#fef7ed',
        features: '#fef7ed',
        stats: '#fef7ed',
        cta: '#ea580c',
      },
      text: {
        primary: '#431407',
        secondary: '#9a3412',
        muted: '#c2410c',
        accent: '#ea580c',
      },
      brand: {
        primary: '#ea580c',
        secondary: '#f97316',
        success: '#16a34a',
        warning: '#eab308',
        error: '#dc2626',
      },
      patterns: {
        primary: '#ea580c',
        secondary: '#f97316',
        opacity: {
          low: 0.03,
          medium: 0.05,
          high: 0.08,
        }
      }
    }
  },

  // Cool Theme
  cool: {
    name: 'Cool & Professional',
    colors: {
      background: {
        primary: '#f0f9ff',
        secondary: '#e0f2fe',
        hero: '#f0f9ff',
        features: '#f0f9ff',
        stats: '#f0f9ff',
        cta: '#0369a1',
      },
      text: {
        primary: '#0c4a6e',
        secondary: '#075985',
        muted: '#0ea5e9',
        accent: '#0369a1',
      },
      brand: {
        primary: '#0369a1',
        secondary: '#0284c7',
        success: '#059669',
        warning: '#d97706',
        error: '#dc2626',
      },
      patterns: {
        primary: '#0369a1',
        secondary: '#0284c7',
        opacity: {
          low: 0.03,
          medium: 0.05,
          high: 0.08,
        }
      }
    }
  }
}

// Current active theme (can be changed here or dynamically)
export const currentTheme = themePresets.default

// Theme utility functions
export const getThemeColors = (themeName: keyof typeof themePresets = 'default') => {
  return themePresets[themeName].colors
}

export const getAllThemeNames = () => {
  return Object.keys(themePresets)
}

export const getThemeByName = (name: string) => {
  return themePresets[name as keyof typeof themePresets] || themePresets.default
}

// Export current theme as default
export default currentTheme
