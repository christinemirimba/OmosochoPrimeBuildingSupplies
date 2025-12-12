import { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Clock, Star, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useProductSearch } from '@/hooks/useProductSearch';
import { products } from '@/data/products';
import { useNavigate } from 'react-router-dom';
import { trackEvent } from '@/lib/analytics';

interface SimpleSearchProps {
    onSearch: (query: string) => void;
    className?: string;
}

// Popular search suggestions
const POPULAR_SEARCHES = [
    'Cement',
    'Steel Bars',
    'Power Tools',
    'Safety Gear',
    'Paint',
    'Tiles',
    'Roofing Materials',
    'Plumbing Supplies',
    'Electrical Fittings',
    'Construction Blocks'
];

const SimpleSearch = ({ onSearch, className }: SimpleSearchProps) => {
    const { getSuggestions } = useProductSearch();
    const [searchQuery, setSearchQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
    const [productSuggestions, setProductSuggestions] = useState<any[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const searchRef = useRef<HTMLDivElement>(null);
    const suggestionsRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();

    // Load search history from localStorage
    useEffect(() => {
        const savedHistory = localStorage.getItem('searchHistory');
        if (savedHistory) {
            setSearchHistory(JSON.parse(savedHistory));
        }
    }, []);

    // Save search history to localStorage
    const saveSearchHistory = (query: string) => {
        const updatedHistory = [query, ...searchHistory.filter(item => item !== query)].slice(0, 10);
        setSearchHistory(updatedHistory);
        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    };

    // Filter suggestions based on search query
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredSuggestions([]);
            setProductSuggestions([]);
            return;
        }

        const queryLower = searchQuery.toLowerCase();
        const suggestions = POPULAR_SEARCHES.filter(item =>
            item.toLowerCase().includes(queryLower)
        ).slice(0, 5);
        setFilteredSuggestions(suggestions);

        // Run fuzzy product search via Fuse (debounced behavior handled below)
    }, [searchQuery]);



    // Debounced Fuse search
    useEffect(() => {
        if (searchQuery.trim() === '') return;
        const handle = setTimeout(() => {
            try {
                const results = getSuggestions(searchQuery.trim(), 8);
                setProductSuggestions(results);
            } catch (e) {
                setProductSuggestions([]);
            }
        }, 180);
        return () => clearTimeout(handle);
    }, [searchQuery, getSuggestions]);

    // Handle search submission
    const handleSearch = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (searchQuery.trim()) {
            saveSearchHistory(searchQuery.trim());
            onSearch(searchQuery.trim());
            setIsFocused(false);
        }
    };

    // Handle clicking outside the search component
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsFocused(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Handle suggestion click
    const handleSuggestionClick = (suggestion: string) => {
        setSearchQuery(suggestion);
        saveSearchHistory(suggestion);
        trackEvent('select_suggestion', { query: suggestion, source: 'autocomplete' });
        onSearch(suggestion);
        setIsFocused(false);
    };

    // Handle product suggestion click — navigate to product detail
    const handleProductClick = (product: any) => {
        if (product?.id) {
            trackEvent('select_product', { id: product.id, name: product.name, category: product.category, source: 'autocomplete' });
            setIsFocused(false);
            navigate(`/product/${product.id}`);
        } else {
            const term = product.name || product.id?.toString();
            trackEvent('select_product', { id: null, name: term, source: 'autocomplete' });
            setSearchQuery(term);
            saveSearchHistory(term);
            onSearch(term);
            setIsFocused(false);
        }
    };

    // Handle history item click
    const handleHistoryClick = (historyItem: string) => {
        setSearchQuery(historyItem);
        onSearch(historyItem);
        setIsFocused(false);
    };

    // Clear search history
    const clearHistory = () => {
        setSearchHistory([]);
        localStorage.removeItem('searchHistory');
    };

    // Build a flat list of visible suggestion items for keyboard navigation
    const visibleItems = useMemo(() => {
        // order: productSuggestions, filteredSuggestions, searchHistory
        const prodItems = productSuggestions.map((p) => ({ type: 'product', item: p }));
        const suggItems = filteredSuggestions.map((s) => ({ type: 'suggestion', item: s }));
        const historyItems = searchHistory.map((h) => ({ type: 'history', item: h }));
        return [...prodItems, ...suggItems, ...historyItems];
    }, [productSuggestions, filteredSuggestions, searchHistory]);

    // Keyboard navigation handler
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!isFocused) return;
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex((idx) => Math.min(idx + 1, visibleItems.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex((idx) => Math.max(idx - 1, -1));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedIndex === -1) {
                trackEvent('search_submit', { query: searchQuery, source: 'autocomplete' });
                handleSearch();
            } else {
                const sel = visibleItems[selectedIndex];
                if (!sel) return;
                if (sel.type === 'product') handleProductClick(sel.item);
                else handleSuggestionClick(sel.item as string);
            }
        } else if (e.key === 'Escape') {
            setIsFocused(false);
        }
    };

    // Scroll selected item into view when navigating with keyboard
    useEffect(() => {
        if (selectedIndex < 0) return;
        const container = suggestionsRef.current;
        if (!container) return;
        const buttons = container.querySelectorAll('button');
        const el = buttons[selectedIndex] as HTMLElement | undefined;
        if (el && typeof el.scrollIntoView === 'function') {
            el.scrollIntoView({ block: 'nearest' });
        }
    }, [selectedIndex]);

    // Reset selection when dropdown closes or items change
    useEffect(() => {
        if (!isFocused) setSelectedIndex(-1);
    }, [isFocused]);

    useEffect(() => {
        if (selectedIndex >= visibleItems.length) {
            setSelectedIndex(visibleItems.length - 1);
        }
    }, [visibleItems, selectedIndex]);

    return (
        <div className={`relative ${className || ''}`} ref={searchRef}>
            {/* Search Input */}
            <form onSubmit={handleSearch} className="relative w-full">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                        type="text"
                        placeholder="Search materials, tools, products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => { setIsFocused(true); setSelectedIndex(-1); }}
                        onKeyDown={handleKeyDown}
                        onBlur={() => {
                            // Don't hide immediately to allow click on suggestions
                            setTimeout(() => {
                                if (!searchRef.current?.contains(document.activeElement)) {
                                    setIsFocused(false);
                                }
                            }, 200);
                        }}
                        className="pl-10 pr-12 py-2 w-full bg-secondary border-0 text-sm h-9"
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            aria-label="Clear search"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </form>

            {/* Search Dropdown */}
            {isFocused && (
                <div ref={suggestionsRef} className="absolute left-0 right-0 mt-1 bg-background border border-border rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
                    {/* Popular Searches Section */}
                    <div className="p-3 border-b border-border">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-muted-foreground">Popular Searches</h3>
                            <Star className="w-4 h-4 text-yellow-500" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {POPULAR_SEARCHES.slice(0, 6).map((search) => (
                                <button
                                    key={search}
                                    onClick={() => handleSuggestionClick(search)}
                                    className="text-xs px-3 py-1 bg-secondary hover:bg-primary/10 rounded-full transition-colors"
                                >
                                    {search}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Search History Section */}
                    {searchHistory.length > 0 && (
                        <div className="p-3">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-medium text-muted-foreground">Recent Searches</h3>
                                <button
                                    onClick={clearHistory}
                                    className="text-xs text-muted-foreground hover:text-foreground"
                                >
                                    Clear
                                </button>
                            </div>
                            <div className="space-y-2">
                                {searchHistory.map((historyItem, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleHistoryClick(historyItem)}
                                        className="flex items-center gap-2 w-full text-left text-sm hover:bg-secondary/50 rounded p-1 transition-colors"
                                    >
                                        <Clock className="w-4 h-4 text-muted-foreground" />
                                        <span className="truncate">{historyItem}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Autocomplete Suggestions */}
                    {/* Product Suggestions (fuzzy) */}
                    {productSuggestions.length > 0 && (
                        <div className="p-3 border-t border-border">
                            <h3 className="text-sm font-medium text-muted-foreground mb-2">Products</h3>
                            <div className="space-y-1">
                                {productSuggestions.map((p, index) => {
                                    const idx = index;
                                    return (
                                        <button
                                            key={p.id || index}
                                            onClick={() => handleProductClick(p)}
                                            className={`flex items-center gap-3 w-full text-left text-sm rounded p-2 transition-colors ${selectedIndex === idx ? 'bg-secondary/50' : 'hover:bg-secondary/50'}`}
                                            tabIndex={-1}
                                        >
                                            <div className="w-10 h-10 bg-muted rounded flex items-center justify-center overflow-hidden">
                                                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium truncate">{p.name}</div>
                                                <div className="text-xs text-muted-foreground truncate">{p.category} • {p.brand}</div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Autocomplete Suggestions (popular/category) */}
                    {filteredSuggestions.length > 0 && (
                        <div className="p-3">
                            <h3 className="text-sm font-medium text-muted-foreground mb-2">Suggestions</h3>
                            <div className="space-y-1">
                                {filteredSuggestions.map((suggestion, fIndex) => {
                                    const idx = productSuggestions.length + fIndex;
                                    return (
                                        <button
                                            key={fIndex}
                                            onClick={() => handleSuggestionClick(suggestion)}
                                            className={`flex items-center gap-2 w-full text-left text-sm rounded p-2 transition-colors ${selectedIndex === idx ? 'bg-secondary/50' : 'hover:bg-secondary/50'}`}
                                            tabIndex={-1}
                                        >
                                            <Search className="w-4 h-4 text-muted-foreground" />
                                            <span>{suggestion}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SimpleSearch;