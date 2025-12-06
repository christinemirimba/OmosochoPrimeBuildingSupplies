# 🚀 Developer Quick Reference

Quick reference guide for common development tasks in the Omosocho Prime Building Supplies project.

---

## 📦 Common Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:5173)
npm run build            # Production build
npm run build:dev        # Development build with source maps
npm run preview          # Preview production build
npm run lint             # Run ESLint

# Package Management
npm install              # Install dependencies
npm install <package>    # Add new package
npm update               # Update packages
```

---

## 🎨 Using Components

### ProductCard
```tsx
import { ProductCard } from '@/components/ProductCard';

<ProductCard
  id={1}
  name="Cement Bag"
  category="Construction"
  image="/assets/products/cement.jpg"
  brand="Bamburi"
  inStock={true}
/>
```

### CategoryCard
```tsx
import { CategoryCard } from '@/components/CategoryCard';

<CategoryCard
  name="Construction"
  description="Premium building materials"
  image="/assets/category-images/construction.jpg"
  link="/products?category=Construction"
/>
```

### SectionHeader
```tsx
import { SectionHeader } from '@/components/SectionHeader';

<SectionHeader
  title="Our Products"
  description="Browse our extensive catalog"
/>
```

### FadeInSection (Animation Wrapper)
```tsx
import FadeInSection from '@/components/FadeInSection';

<FadeInSection delay={200}>
  <YourContent />
</FadeInSection>
```

---

## 🎯 Common Patterns

### Navigation
```tsx
import { Link, useNavigate } from 'react-router-dom';

// Using Link component
<Link to="/products">Products</Link>

// Programmatic navigation
const navigate = useNavigate();
navigate('/products');
```

### Search with Query Params
```tsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
const searchTerm = "cement";

navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
```

### Reading Query Params
```tsx
import { useSearchParams } from 'react-router-dom';

const [searchParams] = useSearchParams();
const searchQuery = searchParams.get('search') || '';
const category = searchParams.get('category') || '';
```

### Theme Toggle
```tsx
import { useTheme } from 'next-themes';

const { theme, setTheme } = useTheme();

// Toggle theme
setTheme(theme === 'dark' ? 'light' : 'dark');
```

### Toast Notifications
```tsx
import { useToast } from '@/hooks/use-toast';

const { toast } = useToast();

toast({
  title: "Success!",
  description: "Your action was completed.",
});

// Error toast
toast({
  title: "Error",
  description: "Something went wrong.",
  variant: "destructive",
});
```

### LocalStorage
```tsx
// Save data
localStorage.setItem('key', JSON.stringify(data));

// Read data
const data = JSON.parse(localStorage.getItem('key') || '[]');

// Remove data
localStorage.removeItem('key');
```

---

## 📂 File Structure

```
src/
├── components/          # Reusable components
│   ├── ui/             # Shadcn UI components
│   ├── ProductCard.tsx
│   ├── CategoryCard.tsx
│   ├── SectionHeader.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── index.ts        # Component exports
├── pages/              # Page components
│   ├── Home.tsx
│   ├── Products.tsx
│   └── ...
├── data/               # Static data
│   ├── products.ts
│   └── categoryImages.ts
├── hooks/              # Custom hooks
│   ├── useBusinessHours.ts
│   └── use-toast.ts
├── App.tsx             # Main app with routes
├── main.tsx            # Entry point
└── index.css           # Global styles
```

---

## 🎨 Styling

### Tailwind Classes
```tsx
// Common patterns
className="container mx-auto px-4"           // Container
className="grid grid-cols-1 md:grid-cols-3"  // Responsive grid
className="flex items-center justify-between" // Flexbox
className="text-3xl font-bold mb-4"          // Typography
className="hover:bg-primary transition-colors" // Hover effects
```

### Theme Colors
```tsx
// Use theme-aware colors
className="bg-background text-foreground"     // Background & text
className="bg-primary text-primary-foreground" // Primary button
className="bg-secondary text-secondary-foreground" // Secondary
className="bg-accent text-accent-foreground"  // Accent
className="text-muted-foreground"             // Muted text
className="border-border"                     // Borders
```

### Custom CSS (index.css)
```css
/* Use CSS variables */
.custom-class {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}
```

---

## 🔧 TypeScript

### Component Props
```tsx
interface MyComponentProps {
  title: string;
  description?: string;  // Optional
  onClick: () => void;
  items: string[];
}

const MyComponent = ({ title, description, onClick, items }: MyComponentProps) => {
  // Component code
};
```

### Product Type
```tsx
interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  brand?: string;
  inStock?: boolean;
}
```

---

## 🖼️ Images

### Adding Product Images
1. Place image in `public/assets/products/`
2. Reference in products.ts:
```tsx
{
  id: 91,
  name: "New Product",
  image: "/assets/products/new-product.jpg",
  // ...
}
```

### Adding Category Images
1. Place image in `public/assets/category-images/`
2. Update categoryImages.ts:
```tsx
export const categoryImages = {
  NewCategory: '/assets/category-images/new-category.jpg',
};
```

### Image Optimization
```tsx
// Always use lazy loading
<img 
  src={imagePath} 
  alt={description}
  loading="lazy"
  className="w-full h-full object-cover"
/>
```

---

## 🔍 Debugging

### React DevTools
- Install React DevTools browser extension
- Inspect component props and state
- Track component re-renders

### Console Logging
```tsx
// Development only
if (import.meta.env.DEV) {
  console.log('Debug info:', data);
}
```

### Network Requests
- Open DevTools → Network tab
- Check for failed requests (404, 500)
- Verify image paths

---

## 🚨 Common Issues & Fixes

### Issue: Images not loading
**Fix**: Check file path in `public/assets/`
```tsx
// ❌ Wrong
image: "assets/products/cement.jpg"

// ✅ Correct
image: "/assets/products/cement.jpg"
```

### Issue: Component not found
**Fix**: Use @ alias for imports
```tsx
// ❌ Wrong
import { Button } from '../../../components/ui/button';

// ✅ Correct
import { Button } from '@/components/ui/button';
```

### Issue: Dropdown not closing
**Fix**: Use `asChild` prop with Link
```tsx
<DropdownMenuItem asChild>
  <Link to="/about">About</Link>
</DropdownMenuItem>
```

### Issue: Theme not persisting
**Fix**: Wrap app in ThemeProvider (already done in App.tsx)

---

## 📝 Adding New Pages

1. **Create page component** in `src/pages/`
```tsx
// src/pages/NewPage.tsx
const NewPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1>New Page</h1>
    </div>
  );
};
export default NewPage;
```

2. **Add route** in `src/App.tsx`
```tsx
import NewPage from './pages/NewPage';

// In Routes:
<Route path="/new-page" element={<NewPage />} />
```

3. **Add navigation link** in `src/components/Header.tsx`
```tsx
const navLinks = [
  // ...
  { name: 'New Page', href: '/new-page' },
];
```

---

## 🎯 Best Practices

### ✅ Do's
- Use TypeScript interfaces for props
- Use Tailwind classes for styling
- Implement lazy loading for images
- Use semantic HTML
- Add ARIA labels for accessibility
- Keep components small and focused
- Use the new reusable components (ProductCard, etc.)

### ❌ Don'ts
- Don't use inline styles (use Tailwind)
- Don't forget to handle loading states
- Don't hardcode colors (use theme variables)
- Don't skip TypeScript types
- Don't create duplicate components

---

## 🔗 Useful Links

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Shadcn UI Components](https://ui.shadcn.com/)
- [React Router Docs](https://reactrouter.com/)
- [Vite Guide](https://vitejs.dev/guide/)

---

## 💡 Tips

1. **Hot Reload**: Save files to see changes instantly
2. **Component Library**: Check `src/components/ui/` for available components
3. **Data**: All product data is in `src/data/products.ts`
4. **Styles**: Global styles in `src/index.css`, use Tailwind for components
5. **Icons**: Use Lucide React for icons
6. **Forms**: Use React Hook Form + Zod for validation

---

**Need Help?** Check the full README.md or CLEANUP_SUMMARY.md for more details.
