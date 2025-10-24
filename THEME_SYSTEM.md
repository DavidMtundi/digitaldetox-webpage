# Theme System Documentation

This document explains how the centralized theme system works in the Digital Detox webpage.

## Overview

The theme system is designed to provide a centralized way to manage all styling, colors, and design tokens across the application. This makes it easy to:

- Switch between different themes
- Maintain consistency across components
- Customize the appearance without touching individual components
- Support dark mode and other theme variations

## File Structure

```
src/
├── styles/
│   ├── theme.ts          # Main theme configuration and utilities
│   ├── theme.css         # CSS custom properties and theme-aware classes
│   └── theme-config.ts   # Theme presets and configurations
├── components/
│   └── theme-provider.tsx # React context for theme management
└── app/
    └── globals.css       # Imports theme CSS
```

## Core Files

### 1. `theme.ts` - Main Theme Configuration

This file contains:
- **Theme object**: Centralized color, spacing, and typography definitions
- **Utility functions**: `getThemeColor()`, `getThemeSpacing()`
- **Style objects**: Pre-configured CSS-in-JS objects for easy use

```typescript
import { theme, themeStyles } from '../styles/theme'

// Use in components
<div style={themeStyles.background.primary}>
```

### 2. `theme.css` - CSS Custom Properties

This file provides:
- CSS custom properties (variables) for all theme values
- Theme-aware utility classes
- Dark mode support
- Smooth transitions between themes

```css
.bg-theme-primary { background-color: var(--bg-primary); }
.text-theme-primary { color: var(--text-primary); }
```

### 3. `theme-config.ts` - Theme Presets

This file contains:
- Multiple theme presets (default, dark, minimal, warm, cool)
- Easy switching between different theme styles
- Centralized theme customization

### 4. `theme-provider.tsx` - React Context

This file provides:
- React context for theme management
- Theme switching functionality
- Automatic system theme detection
- Local storage persistence

## Usage Examples

### Using Theme Styles in Components

```tsx
import { themeStyles } from '../styles/theme'

function MyComponent() {
  return (
    <div style={themeStyles.background.primary}>
      <h1 style={themeStyles.text.primary}>Hello World</h1>
    </div>
  )
}
```

### Using Theme Colors

```tsx
import { getThemeColor } from '../styles/theme'

function MyComponent() {
  const primaryColor = getThemeColor('brand.primary')
  return <div style={{ backgroundColor: primaryColor }} />
}
```

### Using Theme Provider

```tsx
import { ThemeProvider, useTheme } from '../components/theme-provider'

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <MyComponent />
    </ThemeProvider>
  )
}

function MyComponent() {
  const { theme, setTheme } = useTheme()
  return (
    <button onClick={() => setTheme('dark')}>
      Switch to Dark Mode
    </button>
  )
}
```

### Using CSS Classes

```tsx
function MyComponent() {
  return (
    <div className="bg-theme-primary text-theme-primary">
      <h1>Hello World</h1>
    </div>
  )
}
```

## Theme Customization

### Changing Colors

1. **Quick Change**: Update values in `theme-config.ts`
2. **CSS Variables**: Modify `theme.css` for CSS-based changes
3. **Runtime**: Use the theme provider for dynamic switching

### Adding New Themes

1. Add a new preset to `theme-config.ts`
2. Define the color scheme
3. Use the theme provider to switch between presets

### Customizing Individual Components

1. Use `themeStyles` objects for consistent styling
2. Import specific colors using `getThemeColor()`
3. Apply theme-aware CSS classes

## Best Practices

1. **Always use theme values**: Don't hardcode colors or spacing
2. **Use semantic naming**: Choose descriptive names for theme properties
3. **Test multiple themes**: Ensure your components work with different themes
4. **Consider accessibility**: Ensure sufficient contrast in all themes
5. **Performance**: Use CSS custom properties for better performance

## Migration Guide

### From Hardcoded Styles

**Before:**
```tsx
<div style={{ backgroundColor: '#ffffff', color: '#111827' }}>
```

**After:**
```tsx
<div style={themeStyles.background.primary}>
  <span style={themeStyles.text.primary}>Content</span>
</div>
```

### From Tailwind Classes

**Before:**
```tsx
<div className="bg-white text-gray-900">
```

**After:**
```tsx
<div className="bg-theme-primary text-theme-primary">
```

## Future Enhancements

- [ ] Theme editor interface
- [ ] User preference persistence
- [ ] More theme presets
- [ ] Animation theme support
- [ ] Component-specific theme overrides

## Troubleshooting

### Common Issues

1. **Theme not applying**: Check if ThemeProvider is wrapping your app
2. **Colors not updating**: Ensure you're using theme values, not hardcoded colors
3. **CSS not loading**: Verify the import in `globals.css`

### Debug Mode

Enable debug mode to see theme values in the console:

```typescript
// Add to your component
console.log('Current theme:', theme)
console.log('Theme colors:', theme.colors)
```

## Support

For questions or issues with the theme system, please refer to this documentation or contact the development team.
