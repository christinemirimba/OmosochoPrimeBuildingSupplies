import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Heart, FileText, Menu } from 'lucide-react';
import { Squares2X2Icon as CategoriesOutline } from '@heroicons/react/24/outline';
import { Squares2X2Icon as CategoriesSolid } from '@heroicons/react/24/solid';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQuote } from '@/hooks/useQuote';

const MobileBottomNavigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const { getQuoteCount } = useQuote();
    const quoteCount = getQuoteCount();

    const navItems = [
        { name: 'Home', icon: Home, path: '/' },
        { name: 'Categories', icon: { outline: CategoriesOutline, solid: CategoriesSolid }, path: '/categories' },
        { name: 'Search', icon: Search, path: '/products' },
        { name: 'Wishlist', icon: Heart, path: '/wishlist' },
        { name: 'Quote', icon: FileText, path: '/quote' },
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <>
            {/* Bottom Navigation Bar - Always visible on mobile */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[9997] bg-background/95 backdrop-blur-sm border-t border-border">
                <div className="grid grid-cols-5 gap-0">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path ||
                            (item.path === '/' && location.pathname === '/');

                        // choose appropriate icon component: solid when active if available
                        let IconComponent: any = null;
                        if (typeof item.icon === 'object' && item.icon.solid) {
                            IconComponent = isActive ? item.icon.solid : item.icon.outline;
                        } else {
                            IconComponent = item.icon as any;
                        }

                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex flex-col items-center justify-center py-3 transition-colors duration-200 ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
                            >
                                <IconComponent className="w-5 h-5 mb-1" />
                                <span className="text-xs font-medium">{item.name}</span>
                                {item.name === 'Quote' && quoteCount > 0 && (
                                    <Badge className="absolute mt-6 h-4 w-4 flex items-center justify-center p-0 text-xs bg-primary text-primary-foreground">
                                        {quoteCount > 99 ? '99+' : quoteCount}
                                    </Badge>
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Mobile Menu Button - Floating for quick access */}
            <Button
                variant="outline"
                size="icon"
                className="lg:hidden fixed bottom-16 right-4 z-[9998] w-12 h-12 rounded-full shadow-lg"
                onClick={toggleMenu}
                aria-label="Mobile menu"
            >
                <Menu className="w-5 h-5" />
            </Button>

            {/* Quick Access Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-[9999] bg-background/90 backdrop-blur-sm">
                    <div className="flex flex-col h-full p-4 pt-20">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-4 right-4 w-8 h-8"
                            onClick={toggleMenu}
                            aria-label="Close menu"
                        >
                            <span className="text-xl">×</span>
                        </Button>

                        <div className="grid grid-cols-2 gap-3 mb-6">
                            {navItems.map((item) => {
                                const isActive = location.pathname === item.path ||
                                    (item.path === '/' && location.pathname === '/');

                                let IconComponent: any = null;
                                if (typeof item.icon === 'object' && item.icon.solid) {
                                    IconComponent = isActive ? item.icon.solid : item.icon.outline;
                                } else {
                                    IconComponent = item.icon as any;
                                }

                                return (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        className="flex flex-col items-center justify-center py-4 bg-secondary rounded-lg hover:bg-primary/10 transition-colors"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <IconComponent className="w-6 h-6 mb-2" />
                                        <span className="text-sm font-medium">{item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="space-y-3 overflow-y-auto flex-1">
                            <Link
                                to="/categories"
                                className="flex items-center gap-3 p-3 bg-secondary rounded-lg hover:bg-primary/10 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span className="text-sm font-medium">Categories</span>
                            </Link>

                            <Link
                                to="/services"
                                className="flex items-center gap-3 p-3 bg-secondary rounded-lg hover:bg-primary/10 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span className="text-sm font-medium">Services</span>
                            </Link>

                            <Link
                                to="/contact"
                                className="flex items-center gap-3 p-3 bg-secondary rounded-lg hover:bg-primary/10 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span className="text-sm font-medium">Contact Us</span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MobileBottomNavigation;