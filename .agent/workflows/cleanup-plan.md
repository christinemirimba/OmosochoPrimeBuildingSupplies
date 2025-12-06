# Omosocho Hardware - Complete Codebase Cleanup Plan

## Executive Summary
This document outlines the comprehensive cleanup and refactoring plan for the Omosocho Prime Building Supplies project. The goal is to improve code quality, maintainability, performance, and user experience.

## Issues Identified

### 1. **Unused/Dead Files** (HIGH PRIORITY)
- `script.js` (98KB) - Old vanilla JS file, not used in React app
- `styles.css` (57KB) - Old CSS file, not used in React app (using Tailwind + index.css)
- Multiple unnecessary documentation files in root:
  - `CATEGORY_IMAGES_INTEGRATION.md`
  - `DROPDOWN_FIX.md`
  - `HERO_IMAGE_FIX.md`
  - `HOW_TO_DISPLAY_PRODUCTS.md`
  - `PRODUCTS_USAGE_GUIDE.md`
  - `PRODUCT_IMAGES_INTEGRATION.md`
  - `QUICK_REFERENCE.md`
  - `SETTINGS_PAGE_UPDATE.md`
  - `VIEW_ALL_CATEGORIES.md`

### 2. **Dropdown Menu Bug** (HIGH PRIORITY)
- Resources dropdown in Header doesn't close when clicking on items
- Issue: The dropdown component needs proper click handling for Link components

### 3. **Code Organization** (MEDIUM PRIORITY)
- No clear separation of concerns in some components
- Some components are too large (Home.tsx - 358 lines, Products.tsx likely similar)
- Data files could be better organized

### 4. **Performance Optimizations** (MEDIUM PRIORITY)
- Large images may need optimization
- No lazy loading for images
- No code splitting for routes

### 5. **Consistency Issues** (MEDIUM PRIORITY)
- Mixed use of inline styles and CSS classes
- Inconsistent naming conventions in some areas
- Some components missing proper TypeScript types

### 6. **Documentation** (LOW PRIORITY)
- README.md is minimal
- No inline documentation for complex logic
- Missing project structure documentation

## Cleanup Tasks

### Phase 1: Remove Dead Code & Files ✅
1. Delete unused `script.js`
2. Delete unused `styles.css`
3. Delete unnecessary documentation files (keep only README.md)
4. Clean up any commented-out code blocks

### Phase 2: Fix Critical Bugs ✅
1. Fix Resources dropdown not closing issue
2. Test all navigation flows
3. Ensure mobile menu works correctly

### Phase 3: Code Refactoring ✅
1. Extract reusable components:
   - ProductCard component
   - CategoryCard component
   - ServiceCard component
   - SectionHeader component
2. Improve TypeScript typing
3. Standardize naming conventions
4. Extract constants and configuration

### Phase 4: Performance Optimization ✅
1. Add lazy loading for images
2. Implement route-based code splitting
3. Optimize image assets
4. Add proper loading states

### Phase 5: UI/UX Polish ✅
1. Ensure consistent spacing
2. Verify responsive design on all breakpoints
3. Add smooth transitions
4. Improve accessibility (ARIA labels, keyboard navigation)

### Phase 6: Documentation ✅
1. Update README.md with:
   - Comprehensive project overview
   - Setup instructions
   - Project structure
   - Development guidelines
2. Add inline comments for complex logic
3. Document component props and usage

## Success Criteria
- ✅ All unused files removed
- ✅ No console errors or warnings
- ✅ All navigation and interactions work smoothly
- ✅ Responsive on mobile, tablet, and desktop
- ✅ Code follows consistent patterns
- ✅ Performance metrics improved
- ✅ Documentation is clear and comprehensive
