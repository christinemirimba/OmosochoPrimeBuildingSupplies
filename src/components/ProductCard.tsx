import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Plus, Check } from 'lucide-react';
import { useQuote } from '@/hooks/useQuote';
import { useWishlist } from '@/hooks/useWishlist';
import { toast } from 'sonner';

interface ProductCardProps {
    id: number;
    name: string;
    category: string;
    image: string;
    brand?: string;
    inStock?: boolean;
}

export const ProductCard = ({ id, name, category, image, brand, inStock = true }: ProductCardProps) => {
    const { addToQuote, removeFromQuote, isInQuote } = useQuote();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const inQuote = isInQuote(id);
    const isWishlisted = isInWishlist(id);

    const handleAddToQuote = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!inQuote) {
            addToQuote(id, 1);
            toast.success(`${name} added to quote`, {
                description: 'View your quote list to review items',
                action: {
                    label: 'View Quote',
                    onClick: () => window.location.href = '/quote'
                }
            });
        } else {
            removeFromQuote(id);
            toast.success(`${name} removed from quote`, {
                description: 'Item has been removed from your quote',
            });
        }
    };

    const handleToggleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const added = toggleWishlist(id);
        if (added) {
            toast.success("Added to wishlist");
        } else {
            toast.success("Removed from wishlist");
        }
    };

    return (
        <Card className="card-product group h-full hover:shadow-xl transition-all duration-300 overflow-hidden border-none">
            <CardContent className="p-0">
                <Link to={`/product/${id}`} className="block">
                    <div className="aspect-[4/3] overflow-hidden relative bg-gradient-to-br from-gray-50 to-gray-100">
                        <img
                            src={image}
                            alt={name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                        />

                        {/* Wishlist Button Overlay */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-white/90 shadow-sm hover:bg-white hover:text-red-500 transition-colors"
                            onClick={handleToggleWishlist}
                        >
                            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                        </Button>

                        {!inStock && (
                            <Badge className="absolute top-3 left-3 bg-destructive/90 text-destructive-foreground backdrop-blur-sm">
                                Out of Stock
                            </Badge>
                        )}
                    </div>
                </Link>
            </CardContent>
            <CardHeader className="p-4 sm:p-5">
                <div className="flex items-center justify-between mb-3">
                    {brand && (
                        <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm px-3 py-1 rounded-full border border-primary-foreground/20 text-xs">
                            {brand}
                        </Badge>
                    )}
                </div>
                <CardTitle className="text-base font-medium line-clamp-2 group-hover:text-primary transition-colors mb-4 min-h-[48px]">
                    {name}
                </CardTitle>
                <div className="flex flex-col gap-3">
                    <Button
                        variant="default"
                        size="sm"
                        className={`w-full text-sm px-4 py-2 h-auto transition-all duration-200 ${inQuote ? 'bg-primary text-green-400 hover:bg-primary/90' : 'bg-primary hover:bg-primary/90 text-primary-foreground'}`}
                        onClick={handleAddToQuote}
                        disabled={!inStock}
                    >
                        {inQuote ? (
                            <>
                                <Check className="w-4 h-4 mr-2" />
                                In Quote
                            </>
                        ) : (
                            <>
                                <Plus className="w-4 h-4 mr-2" />
                                Add to Quote
                            </>
                        )}
                    </Button>
                </div>
            </CardHeader>
        </Card>
    );
};
