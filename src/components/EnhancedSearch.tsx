import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Clock, Star, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { products, categories, brands } from '@/data/products';

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

// Faceted search categories
const FACET_CATEGORIES = [
    { id: 'Construction', name: 'Construction' },
    { id: 'Metals', name: 'Metals' },
    { id: 'Tools', name: 'Tools' },
    { id: 'Fasteners', name: 'Fasteners' },
    { id: 'Building', name: 'Building Hardware' },
    { id: 'Electrical', name: 'Electrical' },
    { id: 'Plumbing', name: 'Plumbing' },
    { id: 'Safety', name: 'Safety Gear' },
    { id: 'Finishing', name: 'Finishing Materials' }
];

interface EnhancedSearchProps {
    onSearch: (query: string) => void;
    className?: string;
}

const EnhancedSearch = ({ onSearch, className }: EnhancedSearchProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [showFacets, setShowFacets] = useState(false);
    const [selectedFacets, setSelectedFacets] = useState<string[]>([]);
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const [showHistory, setShowHistory] = useState(false);
    const [showPopular, setShowPopular] = useState(true);
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
    const searchRef = useRef<HTMLDivElement>(null);
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
            return;
        }

        const queryLower = searchQuery.toLowerCase();
        const suggestions = POPULAR_SEARCHES.filter(item =>
            item.toLowerCase().includes(queryLower)
        ).slice(0, 5);
        setFilteredSuggestions(suggestions);
    }, [searchQuery]);

    // Handle search submission
    const handleSearch = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (searchQuery.trim()) {
            saveSearchHistory(searchQuery.trim());
            onSearch(searchQuery.trim());
            setIsFocused(false);
            setShowFacets(false);
        }
    };

    // Handle clicking outside the search component
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsFocused(false);
                setShowFacets(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Toggle facet selection
    const toggleFacet = (facetId: string) => {
        setSelectedFacets(prev =>
            prev.includes(facetId)
                ? prev.filter(id => id !== facetId)
                : [...prev, facetId]
        );
    };

    // Clear all facets
    const clearFacets = () => {
        setSelectedFacets([]);
    };

    // Apply facets to search
    const applyFacets = () => {
        if (selectedFacets.length > 0) {
            const facetQuery = selectedFacets.join(',');
            navigate(`/products?category=${facetQuery}`);
            setIsFocused(false);
            setShowFacets(false);
        }
    };

    // Handle suggestion click
    const handleSuggestionClick = (suggestion: string) => {
        setSearchQuery(suggestion);
        saveSearchHistory(suggestion);
        onSearch(suggestion);
        setIsFocused(false);
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
                        onFocus={() => {
                            setIsFocused(true);
                            setShowHistory(true);
                            setShowPopular(true);
                        }}
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
            {(isFocused && (showHistory || showPopular || filteredSuggestions.length > 0)) && (
                <div className="absolute left-0 right-0 mt-1 bg-background border border-border rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
                    {/* Popular Searches Section */}
                    {showPopular && (
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
                    )}

                    {/* Search History Section */}
                    {showHistory && searchHistory.length > 0 && (
                        <div className="p-3 border-b border-border">
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
                    {filteredSuggestions.length > 0 && (
                        <div className="p-3">
                            <h3 className="text-sm font-medium text-muted-foreground mb-2">Suggestions</h3>
                            <div className="space-y-1">
                                {filteredSuggestions.map((suggestion, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSuggestionClick(suggestion)}
                                        className="flex items-center gap-2 w-full text-left text-sm hover:bg-secondary/50 rounded p-2 transition-colors"
                                    >
                                        <Search className="w-4 h-4 text-muted-foreground" />
                                        <span>{suggestion}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Faceted Search Button */}
            <div className="mt-2">
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full justify-between"
                    onClick={() => {
                        setShowFacets(!showFacets);
                        setIsFocused(true);
                    }}
                >
                    <span className="flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        {selectedFacets.length > 0 ? (
                            <span>{selectedFacets.length} filters applied</span>
                        ) : (
                            <span>Filter by Category</span>
                        )}
                    </span>
                </Button>

                {/* Faceted Search Panel */}
                {showFacets && (
                    <div className="mt-2 bg-background border border-border rounded-md p-4 shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium">Filter by Category</h3>
                            {selectedFacets.length > 0 && (
                                <button
                                    onClick={clearFacets}
                                    className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                                >
                                    <X className="w-3 h-3" /> Clear All
                                </button>
                            )}
                        </div>

                        <div className="space-y-3 max-h-64 overflow-y-auto">
                            {FACET_CATEGORIES.map((category) => (
                                <div key={category.id} className="flex items-center gap-2">
                                    <Checkbox
                                        id={`facet-${category.id}`}
                                        checked={selectedFacets.includes(category.id)}
                                        onCheckedChange={() => toggleFacet(category.id)}
                                    />
                                    <Label htmlFor={`facet-${category.id}`} className="text-sm cursor-pointer">
                                        {category.name}
                                    </Label>
                                    <Badge variant="secondary" className="text-xs">
                                        {products.filter(p => p.category === category.id).length}
                                    </Badge>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 flex gap-2">
                            <Button
                                size="sm"
                                className="flex-1"
                                onClick={applyFacets}
                                disabled={selectedFacets.length === 0}
                            >
                                Apply Filters
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-1"
                                onClick={() => setShowFacets(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EnhancedSearch;