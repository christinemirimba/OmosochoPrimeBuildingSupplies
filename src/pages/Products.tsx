import { useState } from 'react';
import { Search, Grid, List, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import FadeInSection from '@/components/FadeInSection';

// Sample product data
const products = [
  {
    id: '1',
    name: 'Premium Portland Cement',
    description: 'High-grade Portland cement for construction projects',
    price: 12.99,
    category: 'cement',
    image: '/src/assets/category-cement.jpg',
    inStock: true,
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Professional Power Drill',
    description: 'Heavy-duty cordless drill with multiple speed settings',
    price: 89.99,
    category: 'tools',
    image: '/src/assets/category-tools.jpg',
    inStock: true,
    rating: 4.9,
  },
  {
    id: '3',
    name: 'Reinforcing Steel Bars',
    description: 'High-strength steel bars for reinforced concrete',
    price: 45.50,
    category: 'steel',
    image: '/src/assets/category-steel.jpg',  
    inStock: true,
    rating: 4.7,
  },
  {
    id: '4',
    name: 'Safety Helmet Kit',
    description: 'Complete safety helmet with protective gear',
    price: 34.99,
    category: 'safety',
    image: '/src/assets/category-safety.jpg',
    inStock: false,
    rating: 4.6,
  },
];

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'cement', name: 'Cement & Concrete' },
  { id: 'tools', name: 'Power Tools' },
  { id: 'steel', name: 'Steel & Materials' },
  { id: 'safety', name: 'Safety Equipment' },
];

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-hero py-20">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <div className="text-center text-white max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Premium Construction Materials
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Browse our extensive catalog of high-quality construction materials, tools, and safety equipment
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Filters and Search */}
        <FadeInSection>
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 text-lg"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="whitespace-nowrap"
                >
                  {category.name}
                </Button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </FadeInSection>

        {/* Results Count */}
        <FadeInSection delay={100}>
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>
        </FadeInSection>

        {/* Products Grid */}
        <FadeInSection delay={200}>
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
          }>
            {filteredProducts.map((product, index) => (
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
                      <span className="text-2xl font-bold text-primary">
                        ${product.price}
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
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                  </CardFooter>
                </Card>
              </FadeInSection>
            ))}
          </div>
        </FadeInSection>

        {/* No Results */}
        {filteredProducts.length === 0 && (
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