import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import FadeInSection from '@/components/FadeInSection';
import PageTransition from '@/components/PageTransition';
import { categoryData } from '@/data/categoryImages';

const Categories = () => {
    return (
        <PageTransition>
            <div className="min-h-screen bg-background">
                {/* Header Section */}
                <section className="bg-hero py-16">
                    <div className="container mx-auto px-4">
                        <FadeInSection>
                            <div className="max-w-4xl mx-auto text-center text-white">
                                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                    Browse by Category
                                </h1>
                                <p className="text-xl text-white/90">
                                    Explore our complete range of construction materials, tools, and hardware organized by category
                                </p>
                            </div>
                        </FadeInSection>
                    </div>
                </section>

                {/* Categories Grid */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <FadeInSection>
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                    All Categories
                                </h2>
                                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                    Find exactly what you need from our 9 specialized categories
                                </p>
                            </div>
                        </FadeInSection>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {categoryData.map((category, index) => (
                                <FadeInSection key={category.id} delay={index * 100}>
                                    <Link to={`/products?category=${category.id}`}>
                                        <Card className="card-category group cursor-pointer h-full">
                                            <CardContent className="p-0">
                                                <div className="aspect-video overflow-hidden rounded-t-xl">
                                                    <img
                                                        src={category.image}
                                                        alt={category.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                            </CardContent>
                                            <CardHeader>
                                                <CardTitle className="text-xl font-semibold">
                                                    {category.name}
                                                </CardTitle>
                                                <CardDescription className="text-muted-foreground">
                                                    {category.description}
                                                </CardDescription>
                                                <Button
                                                    className="w-full mt-4 group-hover:bg-primary/90"
                                                    variant="default"
                                                >
                                                    Browse {category.name}
                                                    <ArrowRight className="w-4 h-4 ml-2" />
                                                </Button>
                                            </CardHeader>
                                        </Card>
                                    </Link>
                                </FadeInSection>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 bg-secondary">
                    <div className="container mx-auto px-4 text-center">
                        <FadeInSection>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Can't Find What You're Looking For?
                            </h2>
                            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                                Browse all our products or contact our team for assistance
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/products">
                                    <Button size="lg" variant="accent">
                                        View All Products
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </Link>
                                <Link to="/contact">
                                    <Button variant="outline" size="lg">
                                        Contact Us
                                    </Button>
                                </Link>
                            </div>
                        </FadeInSection>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default Categories;
