
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Services from "./pages/Services";
import Plan from "./pages/Plan";
import Testimonials from "./pages/Testimonials";
import Faq from "./pages/Faq";
import AiSupport from "./pages/AiSupport";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Settings from "./pages/Settings";
import Header from "./components/Header";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => (
    <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
    </div>
);

const App = () => (
    <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system" storageKey="omosocho-theme">
            <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/categories" element={<Categories />} />
                            <Route path="/product/:id" element={<ProductDetail />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/favorites" element={<Favorites />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/plan" element={<Plan />} />
                            <Route path="/testimonials" element={<Testimonials />} />
                            <Route path="/faq" element={<Faq />} />
                            <Route path="/ai-support" element={<AiSupport />} />
                            <Route path="/privacy" element={<PrivacyPolicy />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Layout>
                </BrowserRouter>
            </TooltipProvider>
        </ThemeProvider>
    </QueryClientProvider>
);

export default App;
