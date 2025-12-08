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
        <Card className="card-product group h-full hover:shadow-xl transition-all duration-300 overflow-hidden">
            <CardContent className="p-0">
                <div className="aspect-square overflow-hidden relative">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                    />
                    {!inStock && (
                        <Badge className="absolute top-2 right-2 bg-destructive text-destructive-foreground">
                            Out of Stock
                        </Badge>
                    )}
                    {brand && (
                        <Badge className="absolute top-2 left-2 bg-primary/90 text-primary-foreground">
                            {brand}
                        </Badge>
                    )}
                </div>
            </CardContent>
            <CardHeader className="p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                        {category}
                    </Badge>
                </div>
            <CardTitle className="text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors mb-3">
                {name}
            </CardTitle>
            <div className="grid grid-cols-2 gap-1.5">
                <Button 
                    variant="default" 
                    size="sm" 
                    className="text-xs px-2 py-1.5 h-auto"
                    asChild
                >
                    <Link to={`/product/${id}`}>
                        <Eye className="w-3 h-3 mr-1" />
                        Details
                    </Link>
                </Button>
                <Button 
                    variant={inQuote ? "secondary" : "outline"}
                    size="sm" 
                    className="text-xs px-2 py-1.5 h-auto"
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
