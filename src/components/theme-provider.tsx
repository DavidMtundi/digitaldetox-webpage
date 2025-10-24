"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

// Theme types
export type Theme = 'light' | 'dark' | 'auto'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: 'light' | 'dark'
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: Theme
}

export function ThemeProvider({ children, defaultTheme = 'light' }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')

  // Resolve theme based on user preference and system setting
  useEffect(() => {
    const resolveTheme = () => {
      if (theme === 'auto') {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        return systemPrefersDark ? 'dark' : 'light'
      }
      return theme as 'light' | 'dark'
    }

    setResolvedTheme(resolveTheme())

    // Listen for system theme changes when auto is selected
    if (theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = () => setResolvedTheme(resolveTheme())
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [theme])

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', resolvedTheme)
    
    // Update CSS custom properties based on theme
    if (resolvedTheme === 'dark') {
      root.style.setProperty('--bg-primary', '#1f2937')
      root.style.setProperty('--bg-secondary', '#111827')
      root.style.setProperty('--bg-hero', '#1f2937')
      root.style.setProperty('--bg-features', '#1f2937')
      root.style.setProperty('--bg-stats', '#1f2937')
      root.style.setProperty('--text-primary', '#f9fafb')
      root.style.setProperty('--text-secondary', '#d1d5db')
      root.style.setProperty('--text-muted', '#9ca3af')
      root.style.setProperty('--ui-card', '#374151')
      root.style.setProperty('--ui-border', '#4b5563')
      root.style.setProperty('--ui-shadow', 'rgba(0, 0, 0, 0.3)')
    } else {
      root.style.setProperty('--bg-primary', '#ffffff')
      root.style.setProperty('--bg-secondary', '#f8fafc')
      root.style.setProperty('--bg-hero', '#ffffff')
      root.style.setProperty('--bg-features', '#ffffff')
      root.style.setProperty('--bg-stats', '#ffffff')
      root.style.setProperty('--text-primary', '#111827')
      root.style.setProperty('--text-secondary', '#6b7280')
      root.style.setProperty('--text-muted', '#9ca3af')
      root.style.setProperty('--ui-card', '#ffffff')
      root.style.setProperty('--ui-border', '#e5e7eb')
      root.style.setProperty('--ui-shadow', 'rgba(0, 0, 0, 0.1)')
    }
  }, [resolvedTheme])

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme && ['light', 'dark', 'auto'].includes(savedTheme)) {
      setTheme(savedTheme)
    }
  }, [])

  // Save theme to localStorage when changed
  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Theme toggle component
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const cycleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'auto']
    const currentIndex = themes.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  return (
    <button
      onClick={cycleTheme}
      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'auto' : 'light'} theme`}
    >
      {theme === 'light' && '🌞'}
      {theme === 'dark' && '🌙'}
      {theme === 'auto' && '🔄'}
    </button>
  )
}
