import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Trash2, ShoppingCart, Heart, Plus, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import FadeInSection from '@/components/FadeInSection';
import PageTransition from '@/components/PageTransition';
import { getProductById } from '@/data/products';
import { useWishlist } from '@/hooks/useWishlist';
import { useQuote } from '@/hooks/useQuote';

const Wishlist = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
    const { addToQuote, isInQuote } = useQuote();

    const wishlistProducts = wishlistItems
        .map(id => getProductById(id.toString()))
        .filter(Boolean);

    const handleAddToQuote = (productId: number, productName: string) => {
        addToQuote(productId, 1);
        toast({
            title: "Added to Quote",
            description: `${productName} has been added to your quote list.`,
        });
    };

    const handleRemove = (productId: number, productName: string) => {
        removeFromWishlist(productId);
        toast({
            title: "Removed from Wishlist",
            description: `${productName} has been removed.`,
        });
    };

    const handleClear = () => {
        clearWishlist();
        toast({
            title: "Wishlist Cleared",
            description: "All items have been removed from your wishlist.",
        });
    };

    return (
        <PageTransition>
            <div className="min-h-screen bg-background">
                {/* Header Section */}
                <section className="bg-hero py-12">
                    <div className="container mx-auto px-4">
                        <FadeInSection>
                            <div className="text-center text-white">
                                <Heart className="w-16 h-16 mx-auto mb-4 opacity-90 fill-current" />
                                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                    My Wishlist
                                </h1>
                                <p className="text-xl text-white/90 max-w-2xl mx-auto">
                                    Save products you're interested in for later
                                </p>
                            </div>
                        </FadeInSection>
                    </div>
                </section>

                <div className="container mx-auto px-4 py-12">
                    <FadeInSection>
                        <Button
                            variant="ghost"
                            onClick={() => navigate('/products')}
                            className="mb-6"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Continue Browsing
                        </Button>
                    </FadeInSection>

                    {wishlistProducts.length === 0 ? (
                        <FadeInSection>
                            <div className="text-center py-20">
                                <Heart className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
                                <h3 className="text-2xl font-semibold mb-4">Your wishlist is empty</h3>
                                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                                    Start saving items you like by clicking the heart icon on products.
                                </p>
                                <Link to="/products">
                                    <Button size="lg" variant="accent">
                                        Explore Products
                                    </Button>
                                </Link>
                            </div>
                        </FadeInSection>
                    ) : (
                        <div className="max-w-4xl mx-auto">
                            <FadeInSection>
                                <Card>
                                    <CardHeader>
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <CardTitle>Saved Items</CardTitle>
                                                <CardDescription>
                                                    {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} in your wishlist
                                                </CardDescription>
                                            </div>
                                            <Button variant="outline" size="sm" onClick={handleClear}>
                                                Clear All
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {wishlistProducts.map((product, index) => {
                                                if (!product) return null;
                                                const inQuote = isInQuote(product.id);

                                                return (
                                                    <div key={product.id}>
                                                        <div className="flex flex-col sm:flex-row gap-4 items-center">
                                                            {/* Image */}
                                                            <Link to={`/product/${product.id}`} className="block">
                                                                <div className="w-full sm:w-24 h-24 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                                                                    <img
                                                                        src={product.image}
                                                                        alt={product.name}
                                                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                                    />
                                                                </div>
                                                            </Link>

                                                            {/* Details */}
                                                            <div className="flex-1 min-w-0 text-center sm:text-left w-full">
                                                                <Link to={`/product/${product.id}`}>
                                                                    <h4 className="font-semibold hover:text-primary transition-colors text-lg">
                                                                        {product.name}
                                                                    </h4>
                                                                </Link>
                                                                <p className="text-sm text-muted-foreground mb-1">
                                                                    {product.brand || 'Generic'}
                                                                </p>
                                                                <div className="flex items-center justify-center sm:justify-start gap-2 text-sm">
                                                                    <span className={product.inStock ? "text-green-600 font-medium" : "text-red-500 font-medium"}>
                                                                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            {/* Actions */}
                                                            <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
                                                                <Button
                                                                    variant={inQuote ? "secondary" : "default"}
                                                                    size="sm"
                                                                    onClick={() => handleAddToQuote(product.id, product.name)}
                                                                    disabled={!product.inStock}
                                                                    className="flex-1 sm:flex-none"
                                                                >
                                                                    {inQuote ? (
                                                                        <>
                                                                            <FileText className="w-4 h-4 mr-2" />
                                                                            In Quote
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <Plus className="w-4 h-4 mr-2" />
                                                                            Add to Quote
                                                                        </>
                                                                    )}

                                                                </Button>

                                                                <Button
                                                                    variant="outline"
                                                                    size="icon"
                                                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                                                    onClick={() => handleRemove(product.id, product.name)}
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                        {index < wishlistProducts.length - 1 && <Separator className="mt-4" />}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </CardContent>
                                </Card>
                            </FadeInSection>
                        </div>
                    )}
                </div>
            </div>
        </PageTransition>
    );
};

export default Wishlist;
