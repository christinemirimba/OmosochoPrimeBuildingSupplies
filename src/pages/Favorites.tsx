import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { SectionHeader } from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';

/**
 * Favorites Page
 * Displays user's saved/favorited products
 * Uses localStorage to persist favorites across sessions
 */
const Favorites = () => {
    const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

    // Load favorites from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('favorites');
        if (saved) {
            try {
                setFavoriteIds(JSON.parse(saved));
            } catch (error) {
                console.error('Error loading favorites:', error);
            }
        }
    }, []);

    // Get favorite products from the full product list
    const favoriteProducts = products.filter(product =>
        favoriteIds.includes(product.id)
    );

    // Remove item from favorites
    const removeFavorite = (id: number) => {
        const updated = favoriteIds.filter(favId => favId !== id);
        setFavoriteIds(updated);
        localStorage.setItem('favorites', JSON.stringify(updated));
    };

    // Clear all favorites
    const clearAllFavorites = () => {
        setFavoriteIds([]);
        localStorage.removeItem('favorites');
    };

    return (
        <div className="min-h-screen bg-background py-20">
            <div className="container mx-auto px-4">
                <SectionHeader
                    title="My Favorites"
                    description="Products you've saved for later"
                />

                {favoriteProducts.length === 0 ? (
                    // Empty state
                    <div className="text-center py-20">
                        <Heart className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
                        <h3 className="text-2xl font-semibold mb-4">No favorites yet</h3>
                        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                            Start adding products to your favorites by clicking the heart icon on product cards
                        </p>
                        <Button onClick={() => window.location.href = '/products'}>
                            Browse Products
                        </Button>
                    </div>
                ) : (
                    <>
                        {/* Header with count and clear button */}
                        <div className="flex justify-between items-center mb-8">
                            <p className="text-lg text-muted-foreground">
                                {favoriteProducts.length} {favoriteProducts.length === 1 ? 'item' : 'items'}
                            </p>
                            <Button
                                variant="outline"
                                onClick={clearAllFavorites}
                                className="text-destructive hover:text-destructive"
                            >
                                Clear All
                            </Button>
                        </div>

                        {/* Favorites grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {favoriteProducts.map((product) => (
                                <div key={product.id} className="relative">
                                    <ProductCard {...product} />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-4 right-4 bg-background/80 hover:bg-background"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            removeFavorite(product.id);
                                        }}
                                    >
                                        <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Favorites;
