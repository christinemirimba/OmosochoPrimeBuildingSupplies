import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, ChevronDown, Settings, FileText, Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from './ThemeToggle';
import SimpleSearch from './SimpleSearch';
import { useQuote } from '@/hooks/useQuote';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { getQuoteCount } = useQuote();
    const quoteCount = getQuoteCount();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
            setIsMenuOpen(false);
        }
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const productLinks = [
        { name: 'All Products', href: '/products' },
        { name: 'Categories', href: '/categories' },
    ];

    const mainLinks = [
        { name: 'Services', href: '/services' },
        { name: 'Plan', href: '/plan' },
        { name: 'AI Support', href: '/ai-support' },
    ];

    const companyLinks = [
        { name: 'About Us', href: '/about' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'Testimonials', href: '/testimonials' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Privacy Policy', href: '/privacy' },
    ];

    return (
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-3 sm:py-4">
                    {/* Logo */}
                    <Link to="/" className="text-decoration-none flex-shrink-0">
                        <div className="logo flex items-center gap-2">
                            <img src="/assets/logo.webp" alt="Omosocho Prime" className="h-8 sm:h-10 w-auto" />
                            <h1 className="brand-name text-base sm:text-lg font-bold hidden xs:block">Omosocho Prime</h1>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
                        {/* Categories - Direct Link */}
                        <Link
                            to="/categories"
                            className={`transition-colors duration-200 font-medium text-sm ${location.pathname === '/categories' ? 'text-primary font-bold' : 'text-foreground hover:text-primary'}`}
                        >
                            Categories
                        </Link>

                        {/* Main links */}
                        {mainLinks.map((link) => {
                            const isActive = location.pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className={`transition-colors duration-200 font-medium text-sm ${isActive ? 'text-primary font-bold' : 'text-foreground hover:text-primary'}`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}

                        {/* Company Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-1 text-foreground hover:text-primary transition-colors duration-200 font-medium cursor-pointer text-sm">
                                Company
                                <ChevronDown className="w-4 h-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {companyLinks.map((link) => (
                                    <DropdownMenuItem key={link.name} asChild>
                                        <Link to={link.href}>{link.name}</Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-1 sm:gap-2">
                        {/* Simple Search - Desktop */}
                        <div className="hidden md:block w-64 lg:w-80">
                            <SimpleSearch
                                onSearch={(query) => {
                                    navigate(`/products?search=${encodeURIComponent(query)}`);
                                    setIsMenuOpen(false);
                                }}
                            />
                        </div>

                        {/* Quick Actions */}
                        <div className="flex items-center gap-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 hidden sm:flex"
                                onClick={() => navigate('/wishlist')}
                                title="Wishlist"
                            >
                                <Heart className="w-4 h-4" />
                            </Button>

                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 relative"
                                onClick={() => navigate('/quote')}
                                title="Quote List"
                            >
                                <FileText className="w-4 h-4" />
                                {quoteCount > 0 && (
                                    <Badge
                                        className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-primary-foreground"
                                    >
                                        {quoteCount > 99 ? '99+' : quoteCount}
                                    </Badge>
                                )}
                            </Button>

                            <ThemeToggle />

                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 hidden sm:flex"
                                onClick={() => navigate('/settings')}
                                title="Settings"
                            >
                                <Settings className="w-4 h-4" />
                            </Button>

                            {/* Mobile Menu Toggle */}
                            <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9" onClick={toggleMenu}>
                                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Simple Search - Mobile */}
                <div className="md:hidden pb-3">
                    <SimpleSearch
                        onSearch={(query) => {
                            navigate(`/products?search=${encodeURIComponent(query)}`);
                            setIsMenuOpen(false);
                        }}
                    />
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden border-t border-border py-4 animate-in slide-in-from-top-2 duration-300 max-h-[70vh] overflow-y-auto">
                        <nav className="flex flex-col space-y-3 px-2">
                            {/* Quick Links */}
                            <div className="flex gap-2 pb-3 border-b border-border">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 text-xs"
                                    onClick={() => { navigate('/wishlist'); setIsMenuOpen(false); }}
                                >
                                    <Heart className="w-4 h-4 mr-1" /> Wishlist
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 text-xs relative"
                                    onClick={() => { navigate('/quote'); setIsMenuOpen(false); }}
                                >
                                    <FileText className="w-4 h-4 mr-1" /> Quote
                                    {quoteCount > 0 && (
                                        <Badge className="ml-1 h-4 px-1 text-xs">{quoteCount}</Badge>
                                    )}
                                </Button>
                            </div>

                            {/* Main Links including Categories */}
                            <div>
                                <p className="text-xs text-muted-foreground mb-2 font-medium uppercase">Menu</p>
                                <div className="grid grid-cols-2 gap-2">
                                    <Link
                                        to="/categories"
                                        className="text-foreground hover:text-primary transition-colors duration-200 font-medium py-2 px-3 bg-secondary rounded-md text-sm"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Categories
                                    </Link>
                                    {mainLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            to={link.href}
                                            className="text-foreground hover:text-primary transition-colors duration-200 font-medium py-2 px-3 bg-secondary rounded-md text-sm"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Company */}
                            <div className="border-t border-border pt-3">
                                <p className="text-xs text-muted-foreground mb-2 font-medium uppercase">Company</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {companyLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            to={link.href}
                                            className="text-foreground hover:text-primary transition-colors duration-200 font-medium py-2 px-3 bg-secondary rounded-md text-sm"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <Link
                                to="/settings"
                                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-200 font-medium py-2 px-3 bg-secondary rounded-md text-sm mt-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Settings className="w-4 h-4" /> Settings
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
