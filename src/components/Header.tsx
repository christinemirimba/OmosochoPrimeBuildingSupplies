
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, User, ChevronDown, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from './ThemeToggle';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    // Business hours removed from header

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Grouped navigation for cleaner header
    const productLinks = [
        { name: 'All Products', href: '/products' },
        { name: 'Categories', href: '/categories' },
        { name: 'Featured', href: '/products?filter=featured' },
        { name: 'Wishlist', href: '/favorites' },
        { name: 'Quote List', href: '/quote' },
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
                <div className="flex items-center justify-between py-4">
                    {/* Logo */}
                    <Link to="/" className="text-decoration-none">
                        <div className="logo">
                            <img src="/assets/logo.png" alt="Omosocho Prime" />
                            <h1 className="brand-name">Omosocho Prime</h1>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-6">
                            {/* Products Dropdown - groups product related links */}
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex items-center gap-1 text-foreground hover:text-primary transition-colors duration-200 font-medium cursor-pointer">
                                    Products
                                    <ChevronDown className="w-4 h-4" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    {productLinks.map((link) => (
                                        <DropdownMenuItem key={link.name} asChild>
                                            <Link to={link.href}>{link.name}</Link>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Main links shown inline for quick access */}
                            {mainLinks.map((link) => {
                                const isActive = location.pathname === link.href;
                                return (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        className={`transition-colors duration-200 font-medium ${isActive ? 'text-primary font-bold' : 'text-foreground hover:text-primary'}`}>
                                        {link.name}
                                    </Link>
                                );
                            })}

                            {/* Company / Resources Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex items-center gap-1 text-foreground hover:text-primary transition-colors duration-200 font-medium cursor-pointer">
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

                    {/* Actions - Top Right */}
                    <div className="flex items-center gap-2">
                        {/* Business hours removed per request */}

                        {/* Search Bar - Desktop */}
                        <form onSubmit={handleSearch} className="hidden md:flex items-center">
                            <div className="relative flex items-center gap-2">
                                <div className="relative w-56 lg:w-64">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                    <Input
                                        type="text"
                                        placeholder="Search materials..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 pr-4 py-2 w-full bg-secondary border-0"
                                    />
                                </div>
                                <Button type="submit" size="sm" className="bg-primary hover:bg-primary/90">
                                    <Search className="w-4 h-4" />
                                </Button>
                            </div>
                        </form>

                        {/* Theme Toggle */}
                        <ThemeToggle />

                        {/* Settings */}
                        <Button variant="ghost" size="icon" className="hidden sm:flex h-9 w-9" onClick={() => navigate('/settings')}>
                            <Settings className="w-4 h-4" />
                        </Button>

                        {/* Mobile Menu Toggle */}
                            <Button variant="ghost" size="icon" className="md:hidden h-9 w-9" onClick={toggleMenu}>
                            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                <form onSubmit={handleSearch} className="md:hidden pb-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                            type="text"
                            placeholder="Search construction materials..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full bg-secondary border-0"
                        />
                    </div>
                </form>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden border-t border-border py-4 animate-in slide-in-from-top-2 duration-300">
                        <nav className="flex flex-col space-y-4 px-4">
                            {/* Product Group */}
                            <div>
                                <p className="text-sm text-muted-foreground mb-2">Products</p>
                                <div className="flex flex-col">
                                    {productLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            to={link.href}
                                            className="block text-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Main Links */}
                            <div>
                                <p className="text-sm text-muted-foreground mb-2">Explore</p>
                                <div className="flex flex-col">
                                    {mainLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            to={link.href}
                                            className="block text-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Company / Resources */}
                            <div className="border-t border-border pt-3 mt-2">
                                <p className="text-sm text-muted-foreground mb-2">Company</p>
                                {companyLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        className="block text-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>

                            <Link to="/settings" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-200 font-medium py-2" onClick={() => setIsMenuOpen(false)}>
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
