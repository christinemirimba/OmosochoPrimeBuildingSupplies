
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from "./components/ThemeProvider";
import { useEffect } from 'react';
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import Quote from "./pages/Quote";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Services from "./pages/Services";
import Plan from "./pages/Plan";
import Testimonials from "./pages/Testimonials";
import FAQ from "./pages/FAQ";
import AISupport from "./pages/AISupport";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Settings from "./pages/Settings";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatBubble from "./components/ChatBubble";
import ScrollToTopButton from './components/ScrollToTopButton';
import MobileBottomNavigation from './components/MobileBottomNavigation';


const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system" storageKey="omosocho-theme">
            <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                    <InnerRoutes />
                </BrowserRouter>
            </TooltipProvider>
        </ThemeProvider>
    </QueryClientProvider>
);

export default App;

const InnerRoutes = () => {
    const location = useLocation();

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/categories" element={<Categories />} />
                        <Route path="/product/:id" element={<ProductDetail />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/favorites" element={<Favorites />} />
                        <Route path="/quote" element={<Quote />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/plan" element={<Plan />} />
                        <Route path="/testimonials" element={<Testimonials />} />
                        <Route path="/faq" element={<FAQ />} />
                        <Route path="/ai-support" element={<AISupport />} />
                        <Route path="/privacy" element={<PrivacyPolicy />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </AnimatePresence>
            </main>
            <Footer />
            <ChatBubble />
            <ScrollToTopButton />
            <MobileBottomNavigation />
        </div>
    );
};
