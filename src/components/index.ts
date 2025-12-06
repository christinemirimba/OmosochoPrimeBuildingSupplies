/**
 * Component exports for easier imports
 * Usage: import { ProductCard, CategoryCard } from '@/components'
 */

// Layout Components
export { default as Header } from './Header';
export { default as Footer } from './Footer';

// Reusable Components
export { ProductCard } from './ProductCard';
export { CategoryCard } from './CategoryCard';
export { SectionHeader } from './SectionHeader';
export { default as FadeInSection } from './FadeInSection';

// Theme Components
export { ThemeProvider } from './ThemeProvider';
export { ThemeToggle } from './ThemeToggle';

// UI Components (re-export from ui folder)
export * from './ui/button';
export * from './ui/card';
export * from './ui/input';
export * from './ui/label';
export * from './ui/badge';
export * from './ui/dropdown-menu';
export * from './ui/separator';
export * from './ui/toast';
export * from './ui/toaster';
export * from './ui/tooltip';
