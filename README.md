# 🏗️ Omosocho Prime Building Supplies

<div align="center">

![Omosocho Prime](public/assets/logo.png)

**A premium e-commerce platform for construction materials, tools, and hardware supplies**

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38bdf8.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4.19-646cff.svg)](https://vitejs.dev/)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Development](#-development)
- [Build & Deployment](#-build--deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

Omosocho Prime Building Supplies is a modern, responsive e-commerce platform designed specifically for the construction industry. Serving Kisii, Nyamache, and surrounding areas in Kenya, we provide a comprehensive catalog of premium construction materials, professional-grade tools, and safety equipment.

### Key Highlights

- **90+ Products** across multiple categories
- **Premium Design** with Navy & Gold aesthetic
- **Real-time Business Hours** status indicator
- **AI-Powered Support** for customer queries
- **Mobile-First** responsive design
- **Fast Performance** with optimized loading

---

## ✨ Features

### 🛍️ E-Commerce Functionality
- **Product Catalog**: Browse 90+ construction materials and tools
- **Advanced Search**: Filter by category, brand, and search terms
- **Product Details**: Comprehensive product information pages
- **Shopping Cart**: Add items and manage your cart
- **Favorites**: Save products for later

### 🎨 User Experience
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Dark/Light Mode**: Theme toggle for user preference
- **Smooth Animations**: Framer Motion powered transitions
- **Lazy Loading**: Optimized image loading for performance
- **Business Hours**: Real-time open/closed status

### 📱 Pages & Navigation
- **Home**: Hero section, featured products, categories
- **Products**: Full catalog with search and filters
- **Categories**: Browse by product category
- **Services**: Delivery, consultation, bulk orders
- **About**: Company information and team
- **Contact**: Get in touch form
- **AI Support**: Intelligent customer assistance
- **Construction Planner**: Project planning tool
- **FAQ**: Frequently asked questions
- **Privacy Policy**: Data handling information

### 🔧 Technical Features
- **TypeScript**: Full type safety
- **Component Library**: Shadcn UI components
- **State Management**: React hooks and context
- **Routing**: React Router DOM
- **Form Handling**: React Hook Form with Zod validation
- **API Ready**: Supabase integration prepared

---

## 🛠️ Technology Stack

### Core
- **React 18.3.1** - UI library
- **TypeScript 5.8.3** - Type-safe JavaScript
- **Vite 5.4.19** - Build tool and dev server

### Styling
- **Tailwind CSS 3.4.17** - Utility-first CSS
- **Shadcn UI** - Component library
- **Framer Motion 12.23.25** - Animations
- **Lucide React** - Icon library

### Routing & Forms
- **React Router DOM 6.30.1** - Client-side routing
- **React Hook Form 7.61.1** - Form management
- **Zod 3.25.76** - Schema validation

### UI Components
- **Radix UI** - Accessible component primitives
- **Sonner** - Toast notifications
- **Embla Carousel** - Touch-friendly carousels
- **Recharts** - Data visualization

### Backend Ready
- **Supabase** - Backend as a service
- **TanStack Query** - Data fetching and caching

---

## 📁 Project Structure

```
omosocho-hardware/
├── public/
│   └── assets/
│       ├── logo.png
│       ├── hero-image.jpg
│       ├── products/          # Product images
│       └── category-images/   # Category images
├── src/
│   ├── components/
│   │   ├── ui/               # Shadcn UI components
│   │   ├── Header.tsx        # Navigation header
│   │   ├── Footer.tsx        # Site footer
│   │   ├── ProductCard.tsx   # Reusable product card
│   │   ├── CategoryCard.tsx  # Reusable category card
│   │   ├── SectionHeader.tsx # Reusable section header
│   │   ├── FadeInSection.tsx # Animation wrapper
│   │   ├── ThemeProvider.tsx # Theme context
│   │   └── ThemeToggle.tsx   # Dark/light mode toggle
│   ├── pages/
│   │   ├── Home.tsx          # Landing page
│   │   ├── Products.tsx      # Product catalog
│   │   ├── ProductDetail.tsx # Single product view
│   │   ├── Categories.tsx    # Category overview
│   │   ├── Cart.tsx          # Shopping cart
│   │   ├── Favorites.tsx     # Saved products
│   │   ├── Services.tsx      # Services page
│   │   ├── About.tsx         # About us
│   │   ├── Contact.tsx       # Contact form
│   │   ├── AiSupport.tsx     # AI assistant
│   │   ├── Plan.tsx          # Construction planner
│   │   ├── Testimonials.tsx  # Customer reviews
│   │   ├── Faq.tsx           # FAQ page
│   │   ├── PrivacyPolicy.tsx # Privacy policy
│   │   ├── Settings.tsx      # User settings
│   │   └── NotFound.tsx      # 404 page
│   ├── data/
│   │   ├── products.ts       # Product catalog data
│   │   └── categoryImages.ts # Category image paths
│   ├── hooks/
│   │   ├── useBusinessHours.ts # Business hours logic
│   │   └── use-toast.ts      # Toast notifications
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # App entry point
│   └── index.css             # Global styles
├── index.html                # HTML template
├── package.json              # Dependencies
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── vite.config.ts            # Vite configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher (or **yarn** / **pnpm**)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/omosocho-hardware.git
   cd omosocho-hardware
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional)
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your configuration (e.g., Supabase credentials)

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

---

## 💻 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Build for development (with source maps)
npm run build:dev

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Configured for React and TypeScript
- **Prettier**: Code formatting (recommended)
- **Component Structure**: Functional components with hooks
- **Naming Conventions**:
  - Components: PascalCase (`ProductCard.tsx`)
  - Utilities: camelCase (`useBusinessHours.ts`)
  - Constants: UPPER_SNAKE_CASE

### Adding New Products

Edit `src/data/products.ts`:

```typescript
{
  id: 91,
  name: "Product Name",
  category: "Category",
  image: "/assets/products/product-image.jpg",
  brand: "Brand Name",
  inStock: true
}
```

### Adding New Pages

1. Create page component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation link in `src/components/Header.tsx`

---

## 📦 Build & Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Deployment Options

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

#### Manual Deployment
1. Build the project: `npm run build`
2. Upload the `dist/` folder to your hosting provider
3. Configure your server to serve `index.html` for all routes

### Environment Variables

For production, set these environment variables:

- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Write clean, readable code
- Add TypeScript types for all new code
- Test on mobile, tablet, and desktop
- Ensure accessibility standards are met
- Update documentation as needed

---

## 📄 License

All rights reserved © 2024 Omosocho Prime Building Supplies.

This project is proprietary software. Unauthorized copying, modification, distribution, or use of this software, via any medium, is strictly prohibited.

---

## 📞 Contact

**Omosocho Prime Building Supplies**

- **Location**: Kisii & Nyamache, Kenya
- **Email**: info@omosochoprime.co.ke
- **Phone**: +254 XXX XXX XXX

---

## 🙏 Acknowledgments

- **Shadcn UI** for the beautiful component library
- **Radix UI** for accessible primitives
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the icon set
- **Framer Motion** for smooth animations

---

<div align="center">

**Built with ❤️ for the construction industry**

[Website](https://omosochoprime.co.ke) · [Report Bug](https://github.com/yourusername/omosocho-hardware/issues) · [Request Feature](https://github.com/yourusername/omosocho-hardware/issues)

</div>
