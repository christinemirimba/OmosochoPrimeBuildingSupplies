import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface CategoryCardProps {
    name: string;
    description: string;
    image: string;
    link: string;
    delay?: number;
}

/**
 * Reusable CategoryCard component for displaying category information
 * Used on Home and Categories pages
 */
export const CategoryCard = ({ name, description, image, link }: CategoryCardProps) => {
    return (
        <Link to={link}>
            <Card className="card-category group cursor-pointer h-full hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                    <div className="aspect-square overflow-hidden rounded-t-xl">
                        <img
                            src={image}
                            alt={name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                        />
                    </div>
                </CardContent>
                <CardHeader>
                    <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {name}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                        {description}
                    </CardDescription>
                </CardHeader>
            </Card>
        </Link>
    );
};
