import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X, SlidersHorizontal, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FadeInSection from '@/components/FadeInSection';
import PageTransition from '@/components/PageTransition';
import { ProductCard } from '@/components/ProductCard';
import { products, categories, brands, quickSearches } from '@/data/products';

const Products = () => {
    const [searchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedBrand, setSelectedBrand] = useState('all');
    const [minRating, setMinRating] = useState(0);
    const [showInStockOnly, setShowInStockOnly] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        const searchParam = searchParams.get('search');
        const categoryParam = searchParams.get('category');
        if (searchParam) setSearchQuery(searchParam);
        if (categoryParam) setSelectedCategory(categoryParam);
    }, [searchParams]);

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
        const matchesRating = product.rating >= minRating;
        const matchesStock = !showInStockOnly || product.inStock;
        return matchesSearch && matchesCategory && matchesBrand && matchesRating && matchesStock;
    });

    // Products (no sorting needed)
    const sortedProducts = filteredProducts;

    const clearFilters = () => {
        setSelectedCategory('all');
        setSelectedBrand('all');
        setMinRating(0);
        setShowInStockOnly(false);
        setSearchQuery('');
    };

    const activeFiltersCount =
        (selectedCategory !== 'all' ? 1 : 0) +
        (selectedBrand !== 'all' ? 1 : 0) +
        (minRating > 0 ? 1 : 0) +
        (showInStockOnly ? 1 : 0);

    return (
        <PageTransition>
        <div className="min-h-screen bg-background">
            {/* Header Section */}
            <section className="bg-hero py-16">
                <div className="container mx-auto px-4">
                    <FadeInSection>
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center text-white mb-8">
                                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                    Find Exactly What You Need
                                </h1>
                                <p className="text-xl text-white/90">
                                    Search from 90+ hardware products, tools, and building materials
                                </p>
                            </div>

                            {/* Main Search Box */}
                            <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20 relative">

                               <div className="flex gap-2 mb-4">
                                    <div className="flex-1 relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                        <Input
                                            type="text"
                                            placeholder="Search for products, tools, or materials..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-10 pr-4 py-6 text-lg bg-white text-foreground"
                                        />
                                    </div>
                                    <Button size="lg" className="px-6">
                                        <Search className="w-5 h-5 mr-2" />
                                        Search
                                    </Button>
                                </div>

                                {/* Quick Search Tags */}
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-white/80 text-sm">Popular Searches:</span>
                                    {quickSearches.map((search) => (
                                        <Button
                                            key={search.id}
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => setSearchQuery(search.id)}
                                            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                                        >
                                            {search.label}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </FadeInSection>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12">
                {/* Filters and Sort */}
                <FadeInSection>
                    <div className="space-y-6 mb-8">
                        {/* Top Bar: Filter Button + Sort + View Mode */}
                        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                            <div className="flex gap-2 flex-1">
                                {/* Mobile Filter Button */}
                                <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                                    <SheetTrigger asChild>
                                        <Button variant="outline" className="md:hidden relative">
                                            <SlidersHorizontal className="w-4 h-4 mr-2" />
                                            Filters
                                            {activeFiltersCount > 0 && (
                                                <Badge variant="default" className="ml-2 h-5 w-5 p-0 flex items-center justify-center rounded-full">
                                                    {activeFiltersCount}
                                                </Badge>
                                            )}
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent side="left" className="w-[300px] overflow-y-auto">
                                        <SheetHeader>
                                            <SheetTitle>Filters</SheetTitle>
                                            <SheetDescription>
                                                Refine your product search
                                            </SheetDescription>
                                        </SheetHeader>
                                        <div className="space-y-6 mt-6">
                                            {/* Mobile Filters Content */}
                                            <div>
                                                <Label className="text-sm font-semibold mb-3 block">Category</Label>
                                                <div className="space-y-2">
                                                    {categories.map((category) => (
                                                        <Button
                                                            key={category.id}
                                                            variant={selectedCategory === category.id ? "default" : "outline"}
                                                            onClick={() => setSelectedCategory(category.id)}
                                                            className="w-full justify-start"
                                                            size="sm"
                                                        >
                                                            {category.name}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <Label className="text-sm font-semibold mb-3 block">Brand</Label>
                                                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select brand" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {brands.map((brand) => (
                                                            <SelectItem key={brand.id} value={brand.id}>
                                                                {brand.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div>
                                                <Label className="text-sm font-semibold mb-3 block">
                                                    Minimum Rating: {minRating.toFixed(1)}★
                                                </Label>
                                                <Slider
                                                    value={[minRating]}
                                                    onValueChange={(value) => setMinRating(value[0])}
                                                    max={5}
                                                    step={0.5}
                                                    className="w-full"
                                                />
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="stock-mobile"
                                                    checked={showInStockOnly}
                                                    onCheckedChange={(checked) => setShowInStockOnly(checked as boolean)}
                                                />
                                                <Label htmlFor="stock-mobile" className="text-sm cursor-pointer">
                                                    Show in-stock only
                                                </Label>
                                            </div>

                                            <Button onClick={clearFilters} variant="outline" className="w-full">
                                                <X className="w-4 h-4 mr-2" />
                                                Clear Filters
                                            </Button>
                                        </div>
                                    </SheetContent>
                                </Sheet>

                                {/* Results Count */}
                                <p className="text-muted-foreground flex items-center">
                                    Showing {sortedProducts.length} of {products.length} products
                                </p>
                            </div>

                        </div>

                        {/* Desktop Filters */}
                        <div className="hidden md:block">
                            <Card className="p-6">
                                <div className="space-y-4">
                                    {/* Category Pills */}
                                    <div>
                                        <Label className="text-sm font-semibold mb-2 block">Category</Label>
                                        <div className="flex gap-2 flex-wrap">
                                            {categories.map((category) => (
                                                <Button
                                                    key={category.id}
                                                    variant={selectedCategory === category.id ? "default" : "outline"}
                                                    onClick={() => setSelectedCategory(category.id)}
                                                    size="sm"
                                                >
                                                    {category.name}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-end gap-6">
                                        {/* Brand Filter */}
                                        <div className="w-48">
                                            <Label className="text-sm font-semibold mb-2 block">Brand</Label>
                                            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select brand" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {brands.map((brand) => (
                                                        <SelectItem key={brand.id} value={brand.id}>
                                                            {brand.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* Rating Filter */}
                                        <div className="w-64">
                                            <Label className="text-sm font-semibold mb-2 block">
                                                Min Rating: {minRating.toFixed(1)}★
                                            </Label>
                                            <Slider
                                                value={[minRating]}
                                                onValueChange={(value) => setMinRating(value[0])}
                                                max={5}
                                                step={0.5}
                                                className="w-full"
                                            />
                                        </div>

                                        {/* Stock Filter */}
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="stock-desktop"
                                                checked={showInStockOnly}
                                                onCheckedChange={(checked) => setShowInStockOnly(checked as boolean)}
                                            />
                                            <Label htmlFor="stock-desktop" className="text-sm cursor-pointer">
                                                In stock only
                                            </Label>
                                        </div>

                                        {/* Clear Filters */}
                                        {activeFiltersCount > 0 && (
                                            <Button onClick={clearFilters} variant="outline" size="sm">
                                                <X className="w-4 h-4 mr-2" />
                                                Clear ({activeFiltersCount})
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </FadeInSection>

                {/* Products Grid */}
                <FadeInSection delay={200}>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
                        {sortedProducts.map((product, index) => (
                            <FadeInSection key={product.id} delay={Math.min(index * 50, 500)}>
                                <ProductCard
                                    id={product.id}
                                    name={product.name}
                                    category={product.category}
                                    image={product.image}
                                    brand={product.brand}
                                    inStock={product.inStock}
                                />
                            </FadeInSection>
                        ))}
                    </div>
                </FadeInSection>

                {/* No Results */}
                {sortedProducts.length === 0 && (
                    <FadeInSection>
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">No products found</h3>
                            <p className="text-muted-foreground">
                                Try adjusting your search or filter criteria
                            </p>
                        </div>
                    </FadeInSection>
                )}
            </div>
        </div>
        </PageTransition>
    );
};

export default Products;