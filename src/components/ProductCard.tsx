import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
    id: number;
    name: string;
    category: string;
    image: string;
    brand?: string;
    inStock?: boolean;
}

/**
 * Reusable ProductCard component for displaying product information
 * Used across Products, Home, and other pages
 */
export const ProductCard = ({ id, name, category, image, brand, inStock = true }: ProductCardProps) => {
    return (
        <Link to={`/product/${id}`}>
            <Card className="card-product group cursor-pointer h-full hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                    <div className="aspect-square overflow-hidden rounded-t-xl relative">
                        <img
                            src={image}
                            alt={name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                        />
                        {!inStock && (
                            <Badge className="absolute top-2 right-2 bg-red-500">
                                Out of Stock
                            </Badge>
                        )}
                        {brand && (
                            <Badge className="absolute top-2 left-2 bg-primary/90">
                                {brand}
                            </Badge>
                        )}
                    </div>
                </CardContent>
                <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">
                            {category}
                        </Badge>
                    </div>
                    <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                        {name}
                    </CardTitle>
                    <CardDescription className="mt-2">
                        <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                            View Details
                        </Button>
                    </CardDescription>
                </CardHeader>
            </Card>
        </Link>
    );
};
