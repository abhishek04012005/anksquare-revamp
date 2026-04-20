# Loader & Skeleton Loader Implementation Guide

## Overview
This document provides a comprehensive guide on using the new Loader and SkeletonLoader components that have been implemented to fix the animation issues and provide a better loading experience throughout the application.

## Components Created

### 1. Loader Component
**Location:** `src/components/loader/Loader.tsx`

A flexible, animated loader component with multiple spinner types and sizes.

#### Props:
```typescript
interface LoaderProps {
    message?: string;           // Loading message to display (default: "Loading...")
    type?: 'spinner' | 'dots' | 'bars' | 'wave';  // Spinner animation type
    size?: 'compact' | 'default' | 'large';       // Size of the loader
    className?: string;         // Additional CSS classes
}
```

#### Spinner Types:
- **spinner** (default): Classic rotating spinner
- **dots**: Three pulsing dots animation
- **bars**: Vertical bars animation
- **wave**: Wave animation effect

#### Sizes:
- **compact**: Small loader for inline use (32px)
- **default**: Medium loader (50px)
- **large**: Full-page loader (60px, 100vh height)

#### Usage Examples:

```typescript
// Default spinner
<Loader message="Loading..." />

// With dots animation
<Loader message="Loading dashboard..." type="dots" />

// Wave animation with custom message
<Loader message="Fetching data..." type="wave" size="large" />

// Compact loader without message
<Loader type="bars" size="compact" />

// With custom className
<Loader type="spinner" className="custom-loader" />
```

### 2. SkeletonLoader Component
**Location:** `src/components/loader/SkeletonLoader.tsx`

A flexible skeleton loader component that shows placeholder content while data loads.

#### Props:
```typescript
interface SkeletonLoaderProps {
    type?: 'card' | 'table' | 'dashboard' | 'grid' | 'custom';
    count?: number;                    // Number of items to show (default: 3)
    gridColumns?: 'cols2' | 'cols3' | 'cols4';  // Grid layout columns
    className?: string;                // Additional CSS classes
}
```

#### Skeleton Types:

**Card Layout:**
Displays skeleton cards with avatar, title, and text lines.

```typescript
<SkeletonLoader type="card" count={5} />
```

**Table Layout:**
Displays skeleton table rows.

```typescript
<SkeletonLoader type="table" count={10} />
```

**Dashboard Layout:**
Displays a full dashboard skeleton with stats and content.

```typescript
<SkeletonLoader type="dashboard" count={5} />
```

**Grid Layout:**
Displays skeleton items in a grid.

```typescript
<SkeletonLoader type="grid" count={6} gridColumns="cols2" />
<SkeletonLoader type="grid" count={9} gridColumns="cols3" />
<SkeletonLoader type="grid" count={12} gridColumns="cols4" />
```

## Implementation Details

### Animation Styles

All animations are defined in CSS modules for optimal performance:

- **Spinner**: Cubic-bezier easing for smooth rotation
- **Dots**: Pulsing animation with staggered delays
- **Bars**: Scaling animation with easing
- **Wave**: Combined opacity and scaling
- **Skeleton**: Shimmer effect with 2-second loop

All animations use `will-change: transform` to enable GPU acceleration.

## Updated Components

The following components have been updated to use the new Loader component:

1. **Dashboard.tsx** (`src/admin/dashboard/`)
   - Uses: `<Loader message="Loading dashboard data..." type="spinner" />`

2. **WhatsAppDashboard.tsx** (`src/admin/whatsapp/`)
   - Uses: `<Loader message="Loading WhatsApp analytics..." type="dots" />`

3. **EnquiryDashboard.tsx** (`src/admin/enquirydashboard/`)
   - Uses: `<Loader message="Loading quotes..." type="bars" />`

4. **ContactDashboard.tsx** (`src/admin/contactdashboard/`)
   - Uses: `<Loader message="Loading contacts..." type="wave" />`

## Advanced Usage

### Combining Loaders

Use Loader for initial load and SkeletonLoader for subsequent updates:

```typescript
const [isInitialLoad, setIsInitialLoad] = useState(true);
const [isUpdating, setIsUpdating] = useState(false);

return (
    <>
        {isInitialLoad && (
            <Loader message="Loading data..." type="spinner" size="large" />
        )}
        {!isInitialLoad && isUpdating && (
            <SkeletonLoader type="table" count={5} />
        )}
        {!isInitialLoad && !isUpdating && (
            // Your content here
        )}
    </>
);
```

### Responsive Design

Both components are fully responsive:

- On mobile devices, sizes are automatically adjusted
- Grid layouts adapt to single column on smaller screens
- Padding and margins are optimized for mobile

## Performance Considerations

1. **GPU Acceleration**: All animations use `will-change` to leverage GPU
2. **Efficient Redraws**: Animations use `transform` and `opacity` for better performance
3. **Minimal Layout Thrashing**: Skeleton loaders maintain layout to prevent reflow
4. **CSS-based Animations**: No JavaScript animations for better performance

## Customization

### Custom Colors

The components use CSS variables for easy customization:

```css
/* In your global styles */
:root {
    --primary-color: #2563eb;
    --text-secondary: #64748b;
    --skeleton-base: #e2e8f0;
    --skeleton-highlight: #f1f5f9;
}
```

### Custom Styling

Add custom classes to override default styles:

```typescript
<Loader 
    type="spinner" 
    className="my-custom-loader" 
/>
```

```css
/* In your CSS */
.my-custom-loader {
    background: linear-gradient(to bottom, #f5f5f5, #ffffff);
}
```

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support

## Migration Guide

If you have existing loading indicators, follow these steps:

### Before:
```typescript
{loading ? (
    <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <span>Loading...</span>
    </div>
) : (
    <YourContent />
)}
```

### After:
```typescript
{loading ? (
    <Loader message="Loading..." type="spinner" />
) : (
    <YourContent />
)}
```

## Troubleshooting

### Loader not animating
- Ensure CSS module is properly imported
- Check browser DevTools for CSS syntax errors
- Verify `will-change: transform` is applied

### Skeleton not showing shimmer
- Check if CSS variables are defined
- Verify `animation: shimmer 2s infinite` is applied
- Clear browser cache and reload

### Layout shift
- Use SkeletonLoader to maintain layout
- Set explicit heights for content areas
- Use `min-height` instead of `height`

## Best Practices

1. **Use Loader for initial page loads** - Better perceived performance
2. **Use SkeletonLoader for data updates** - Maintains layout stability
3. **Add meaningful messages** - Helps with user guidance
4. **Choose appropriate types** - Match the content being loaded
5. **Test on mobile** - Ensure responsive behavior

## File Locations

```
src/components/loader/
├── Loader.tsx              # Main Loader component
├── Loader.module.css       # Loader styles
├── SkeletonLoader.tsx      # Skeleton component
├── SkeletonLoader.module.css # Skeleton styles
└── index.ts               # Export file
```

## Next Steps

1. Monitor animation performance in production
2. Gather user feedback on loading UX
3. Consider adding more spinner types as needed
4. Update other components as they need loading states
