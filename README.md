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
## 🚀 Getting Started (Local Development)

These instructions get the Omosocho Prime site running locally and explain the most common tasks for development and preparing a production build.

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher (or `pnpm` / `yarn` if you prefer)

### Quick start

1. Clone the repo and install dependencies:

```powershell
git clone https://github.com/yourusername/omosocho-hardware.git
cd omosocho-hardware
npm install
```

2. Create environment variables (if you plan to use Supabase or other services):

```powershell
copy .env.example .env   # Windows PowerShell
# or on macOS / Linux: cp .env.example .env
```

Open `.env` and set values for at least:

- `VITE_SUPABASE_URL` (if using Supabase)
- `VITE_SUPABASE_ANON_KEY` (if using Supabase)

3. Start the dev server (Vite):

```powershell
npm run dev
```

4. Open the app:

Visit `http://localhost:5173` in your browser. The dev server supports HMR for fast feedback.

### Important notes while developing

- The `public/assets` folder contains static images (logo, product images). Use `/assets/...` paths when referencing them.
- PDF generation (catalogs and plan reports) runs client-side using `jspdf` — downloads are triggered by `doc.save()` and require a user gesture in some browsers.
- Favorites and Quote lists are persisted to `localStorage` for a quick demo-ready experience.

---

## 💻 Development & Build Commands

Use the package scripts below for common tasks. All commands assume you're in the project root.

```powershell
# Start development server (dev mode, HMR)
npm run dev

# Build a production bundle
npm run build

# Preview the production build locally
npm run preview

# Lint the codebase (if configured)
npm run lint
```

### Running a production preview

After `npm run build`, run `npm run preview` — Vite will serve the `dist/` folder so you can verify production behavior (asset paths, routing, downloads).

### Adding data or pages

- Add new products in `src/data/products.ts` (follow existing structure).
- Create new pages under `src/pages/` and add routes in `src/App.tsx`.
- Add navigation links in `src/components/Header.tsx` as needed.

---

## 🚀 Build & Deployment (Production)

This project is ready to deploy to static hosting services (Vercel, Netlify) or any static file host because the frontend is a Vite-built SPA.

### Environment variables for production

When deploying, set the same environment variables you used locally (e.g. `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) in your host's dashboard.

### Vercel (recommended)

1. Install Vercel CLI (optional): `npm i -g vercel`
2. From project root run `vercel` and follow prompts, or connect the GitHub repo in the Vercel dashboard.
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add the required environment variables in Vercel's project settings.

### Netlify

1. Connect your GitHub repo to Netlify.
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in the Netlify UI.

### Docker (optional)

Simple production Docker steps:

```dockerfile
# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Serve stage
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Then build and run the image:

```powershell
docker build -t omosocho-frontend .
docker run -p 8080:80 omosocho-frontend
```

Visit `http://localhost:8080` to see the production container.

### Common deployment tips

- Ensure `VITE_` env vars are set in your deployment platform (client-side vite vars must start with `VITE_`).
- If static assets (images) fail to load after deployment, confirm the `base` setting in `vite.config.ts` matches your hosting path.
- For reliable PDF downloads across browsers, test the generation flow in the deployed preview — some browsers limit downloads not originating from user gestures.

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
 - **Email**: nikeombura@gmail.com
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
