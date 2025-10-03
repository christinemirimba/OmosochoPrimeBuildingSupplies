import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Grid, List, Filter, X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FadeInSection from '@/components/FadeInSection';

// Sample product data
const products = [
  // Construction Materials
  {
    id: '1',
    name: 'Premium Portland Cement',
    description: 'High-grade Portland cement for construction projects',
    category: 'construction',
    brand: 'simba',
    image: '/src/assets/category-cement.jpg',
    inStock: true,
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Sand & Gravel',
    description: 'Quality sand and gravel for concrete mixing',
    category: 'construction',
    brand: 'simba',
    image: '/src/assets/category-cement.jpg',
    inStock: true,
    rating: 4.7,
  },
  {
    id: '3',
    name: 'Bricks & Blocks',
    description: 'Durable bricks and concrete blocks',
    category: 'construction',
    image: '/src/assets/category-cement.jpg',
    inStock: true,
    rating: 4.6,
  },
  {
    id: '4',
    name: 'Tiles',
    description: 'Floor and wall tiles for finishing',
    category: 'finishing',
    brand: 'twyford',
    image: '/src/assets/category-cement.jpg',
    inStock: true,
    rating: 4.5,
  },
  
  // Metals & Steel
  {
    id: '5',
    name: 'Reinforcing Steel Bars (Rebar)',
    description: 'High-strength steel bars for reinforced concrete',
    category: 'metals',
    brand: 'maisha',
    image: '/src/assets/category-steel.jpg',
    inStock: true,
    rating: 4.9,
  },
  {
    id: '6',
    name: 'Steel Beams & Channels',
    description: 'Structural steel beams and channels',
    category: 'metals',
    image: '/src/assets/category-steel.jpg',
    inStock: true,
    rating: 4.8,
  },
  {
    id: '7',
    name: 'Pipes & Tubes',
    description: 'Steel pipes and tubes for construction',
    category: 'metals',
    image: '/src/assets/category-steel.jpg',
    inStock: true,
    rating: 4.7,
  },
  {
    id: '8',
    name: 'Wire Mesh',
    description: 'Welded wire mesh for reinforcement',
    category: 'metals',
    image: '/src/assets/category-steel.jpg',
    inStock: true,
    rating: 4.6,
  },
  
  // Tools & Equipment
  {
    id: '9',
    name: 'Hand Tools',
    description: 'Hammers, screwdrivers, wrenches, pliers',
    category: 'tools',
    image: '/src/assets/category-tools.jpg',
    inStock: true,
    rating: 4.8,
  },
  {
    id: '10',
    name: 'Power Tools',
    description: 'Drills, saws, grinders for professional use',
    category: 'tools',
    brand: 'bosch',
    image: '/src/assets/category-tools.jpg',
    inStock: true,
    rating: 4.9,
  },
  {
    id: '11',
    name: 'Measuring Tools',
    description: 'Tape measures, levels, calipers',
    category: 'tools',
    image: '/src/assets/category-tools.jpg',
    inStock: true,
    rating: 4.7,
  },
  {
    id: '12',
    name: 'Cutting Tools',
    description: 'Blades, cutters, chisels for precision work',
    category: 'tools',
    image: '/src/assets/category-tools.jpg',
    inStock: true,
    rating: 4.6,
  },
  
  // Fasteners & Fittings
  {
    id: '13',
    name: 'Nails & Screws',
    description: 'Various nails and screws for construction',
    category: 'fasteners',
    image: '/src/assets/category-tools.jpg',
    inStock: true,
    rating: 4.5,
  },
  {
    id: '14',
    name: 'Bolts & Nuts',
    description: 'Heavy-duty bolts and nuts',
    category: 'fasteners',
    image: '/src/assets/category-tools.jpg',
    inStock: true,
    rating: 4.7,
  },
  {
    id: '15',
    name: 'Anchors & Hooks',
    description: 'Wall anchors and mounting hooks',
    category: 'fasteners',
    image: '/src/assets/category-tools.jpg',
    inStock: true,
    rating: 4.6,
  },
  
  // Building Hardware
  {
    id: '16',
    name: 'Hinges & Locks',
    description: 'Door hinges, locks and latches',
    category: 'hardware',
    image: '/src/assets/category-tools.jpg',
    inStock: true,
    rating: 4.8,
  },
  {
    id: '17',
    name: 'Handles & Knobs',
    description: 'Door handles and cabinet knobs',
    category: 'hardware',
    image: '/src/assets/category-tools.jpg',
    inStock: true,
    rating: 4.5,
  },
  
  // Electrical Hardware
  {
    id: '18',
    name: 'Switches & Sockets',
    description: 'Electrical switches and power sockets',
    category: 'electrical',
    image: '/src/assets/category-tools.jpg',
    inStock: true,
    rating: 4.7,
  },
  {
    id: '19',
    name: 'Cables & Wires',
    description: 'Electrical cables and wiring',
    category: 'electrical',
    image: '/src/assets/category-tools.jpg',
    inStock: true,
    rating: 4.6,
  },
  {
    id: '20',
    name: 'Circuit Breakers',
    description: 'Electrical circuit breakers and panels',
    category: 'electrical',
    image: '/src/assets/category-tools.jpg',
    inStock: true,
    rating: 4.8,
  },
  
  // Plumbing Hardware
  {
    id: '21',
    name: 'Plumbing Pipes & Fittings',
    description: 'Water pipes and plumbing fittings',
    category: 'plumbing',
    image: '/src/assets/category-tools.jpg',
    inStock: true,
    rating: 4.7,
  },
  {
    id: '22',
    name: 'Taps & Faucets',
    description: 'Kitchen and bathroom taps',
    category: 'plumbing',
    image: '/src/assets/category-tools.jpg',
    inStock: true,
    rating: 4.6,
  },
  {
    id: '23',
    name: 'Water Tanks',
    description: 'Plastic and steel water storage tanks',
    category: 'plumbing',
    image: '/src/assets/category-tools.jpg',
    inStock: true,
    rating: 4.8,
  },
  
  // Safety Gear
  {
    id: '24',
    name: 'Safety Helmets',
    description: 'Hard hats and protective helmets',
    category: 'safety',
    image: '/src/assets/category-safety.jpg',
    inStock: true,
    rating: 4.9,
  },
  {
    id: '25',
    name: 'Safety Gloves & Boots',
    description: 'Protective gloves and safety boots',
    category: 'safety',
    image: '/src/assets/category-safety.jpg',
    inStock: true,
    rating: 4.8,
  },
  {
    id: '26',
    name: 'Goggles & Face Shields',
    description: 'Eye protection and face shields',
    category: 'safety',
    image: '/src/assets/category-safety.jpg',
    inStock: true,
    rating: 4.7,
  },
  {
    id: '27',
    name: 'Reflective Jackets',
    description: 'High-visibility safety jackets',
    category: 'safety',
    image: '/src/assets/category-safety.jpg',
    inStock: true,
    rating: 4.6,
  },
  
  // Finishing Materials
  {
    id: '28',
    name: 'Paints & Primers',
    description: 'Interior and exterior paints',
    category: 'finishing',
    brand: 'crown',
    image: '/src/assets/category-cement.jpg',
    inStock: true,
    rating: 4.7,
  },
  {
    id: '29',
    name: 'Varnishes & Sealants',
    description: 'Wood varnishes and waterproof sealants',
    category: 'finishing',
    image: '/src/assets/category-cement.jpg',
    inStock: true,
    rating: 4.5,
  },
  {
    id: '30',
    name: 'Adhesives & Grout',
    description: 'Construction adhesives and tile grout',
    category: 'finishing',
    image: '/src/assets/category-cement.jpg',
    inStock: true,
    rating: 4.6,
  },
];

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'construction', name: '🧱 Construction Materials' },
  { id: 'metals', name: '🔩 Metals & Steel' },
  { id: 'tools', name: '🛠️ Tools & Equipment' },
  { id: 'fasteners', name: '🧰 Fasteners & Fittings' },
  { id: 'hardware', name: '🚪 Building Hardware' },
  { id: 'electrical', name: '⚡ Electrical Hardware' },
  { id: 'plumbing', name: '💧 Plumbing Hardware' },
  { id: 'safety', name: '🦺 Safety Gear' },
  { id: 'finishing', name: '🎨 Finishing Materials' },
];

const brands = [
  { id: 'all', name: 'All Brands' },
  { id: 'crown', name: 'Crown Paints' },
  { id: 'simba', name: 'Simba Cement' },
  { id: 'maisha', name: 'Maisha Mabati' },
  { id: 'twyford', name: 'Twyford Tiles' },
  { id: 'bosch', name: 'Bosch' },
];

const quickSearches = [
  { id: 'cement', label: 'Cement' },
  { id: 'paint', label: 'Paint' },
  { id: 'hammer', label: 'Hammer' },
  { id: 'nails', label: 'Nails' },
  { id: 'tiles', label: 'Tiles' },
  { id: 'power tools', label: 'Power Tools' },
];

const Products = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
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

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'name-desc') {
      return b.name.localeCompare(a.name);
    }
    // Default is relevance (no sorting)
    return 0;
  });

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setMinRating(0);
    setShowInStockOnly(false);
    setSearchQuery('');
    setSortBy('relevance');
  };

  const activeFiltersCount = 
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedBrand !== 'all' ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (showInStockOnly ? 1 : 0);

  return (
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
                  Search from 500+ hardware products, tools, and building materials
                </p>
              </div>

              {/* Main Search Box */}
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20">
                <div className="flex gap-2 mb-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Search for products, tools, or materials..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-6 text-lg bg-white"
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

              {/* Sort and View Mode */}
              <div className="flex gap-2 items-center">
                <Label className="text-sm text-muted-foreground hidden md:block">Sort by:</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                    <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode Toggle */}
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === 'grid' ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
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
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
          }>
            {sortedProducts.map((product, index) => (
              <FadeInSection key={product.id} delay={index * 100}>
                <Card className="card-product h-full">
                  <CardHeader className="p-0">
                    <div className="aspect-square overflow-hidden rounded-t-lg">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-lg font-semibold line-clamp-2">
                        {product.name}
                      </CardTitle>
                      <Badge variant={product.inStock ? "default" : "secondary"}>
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {product.description}
                    </CardDescription>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-primary">
                        Available
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-muted-foreground">★</span>
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button 
                      className="w-full" 
                      disabled={!product.inStock}
                      variant={product.inStock ? "default" : "secondary"}
                    >
                      {product.inStock ? "Contact Us" : "Out of Stock"}
                    </Button>
                  </CardFooter>
                </Card>
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
  );
};

export default Products;