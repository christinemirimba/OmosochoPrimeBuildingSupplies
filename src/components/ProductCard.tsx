import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Plus, Check } from 'lucide-react';
import { useQuote } from '@/hooks/useQuote';
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
    const inQuote = isInQuote(id);

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

    return (
        <Card className="card-product group h-full hover:shadow-xl transition-all duration-300 overflow-hidden border-none">
            <CardContent className="p-0">
                <div className="aspect-[4/3] overflow-hidden relative bg-gradient-to-br from-gray-50 to-gray-100">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                    />
                    {!inStock && (
                        <Badge className="absolute top-3 right-3 bg-destructive/90 text-destructive-foreground backdrop-blur-sm">
                            Out of Stock
                        </Badge>
                    )}
                </div>
            </CardContent>
            <CardHeader className="p-4 sm:p-5">
                <div className="flex items-center justify-between mb-3">
                    {brand && (
                        <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm px-3 py-1 rounded-full border border-primary-foreground/20 text-xs">
                            {brand}
                        </Badge>
                    )}
                    <Badge variant="secondary" className="text-xs px-2 py-1 rounded-full border border-border/50">
                        {category}
                    </Badge>
                </div>
                <CardTitle className="text-base font-medium line-clamp-2 group-hover:text-primary transition-colors mb-4 min-h-[48px]">
                    {name}
                </CardTitle>
                <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-sm px-4 py-2 h-auto border border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                        asChild
                    >
                        <Link to={`/product/${id}`}>
                            <Eye className="w-4 h-4 mr-2" />
                            Details
                        </Link>
                    </Button>
                    <Button
                        variant={inQuote ? "secondary" : "default"}
                        size="sm"
                        className="text-sm px-3 py-2 h-auto bg-primary hover:bg-primary/90 transition-all duration-200"
                        onClick={handleAddToQuote}
                        disabled={!inStock}
                    >
                        {inQuote ? (
                            <>
                                <Check className="w-3 h-3 mr-1" />
                                In Quote
                            </>
                        ) : (
                            <>
                                <Plus className="w-3 h-3 mr-1" />
                                Quote
                            </>
                        )}
                    </Button>
                </div>
            </CardHeader>
        </Card>
    );
};
