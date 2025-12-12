import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Award, Truck, Headphones, Star, Search, Download, FileText, X, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import FadeInSection from '@/components/FadeInSection';
import PageTransition from '@/components/PageTransition';
import PDFCatalog from '@/components/PDFCatalog';

import { products } from '@/data/products';
import { categoryImages } from '@/data/categoryImages';
import { getFeaturedServices } from '@/data/services';
import { useToast } from '@/hooks/use-toast';

const heroImage = '/assets/hero-image.webp';

const Home = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [searchQuery, setSearchQuery] = useState('');
    const featuredServices = getFeaturedServices();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const scrollToWhyChoose = () => {
        const element = document.getElementById('why-choose-section');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const categories = [
        {
            name: 'Construction',
            description: 'Premium cement, blocks, and building materials',
            image: categoryImages.Construction,
            link: '/products?category=Construction',
        },
        {
            name: 'Tools',
            description: 'Professional-grade construction tools',
            image: categoryImages.Tools,
            link: '/products?category=Tools',
        },
        {
            name: 'Metals',
            description: 'High-strength steel and metal materials',
            image: categoryImages.Metals,
            link: '/products?category=Metals',
        },
        {
            name: 'Safety',
            description: 'Complete safety gear and protective equipment',
            image: categoryImages.Safety,
            link: '/products?category=Safety',
        },
    ];

    const features = [
        {
            icon: Award,
            title: 'Premium Quality',
            description: 'All materials meet or exceed industry standards with comprehensive quality guarantees.',
        },
        {
            icon: Truck,
            title: 'Fast Delivery',
            description: 'Reliable logistics network ensures your materials arrive on time, every time.',
        },
        {
            icon: Headphones,
            title: '24/7 Support',
            description: 'Expert technical support and customer service whenever you need assistance.',
        },
    ];

    // Get featured products - top rated items from different categories
    const featuredProducts = [
        products.find(p => p.id === 1),  // Cement Bag
        products.find(p => p.id === 24), // Electric Drill
        products.find(p => p.id === 11), // Steel Rods
        products.find(p => p.id === 71), // Safety Helmet
    ].filter(Boolean); // Remove any undefined items

    return (
        <PageTransition>
            <div className="min-h-screen bg-background">
                {/* Hero Section */}
                <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url(${heroImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />

                    {/* Overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

                    {/* Content */}
                    <div className="relative z-10 container mx-auto px-4 text-center text-white">
                        <FadeInSection>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-lg">
                                Premium Construction
                                <span className="block text-accent">Materials & Tools</span>
                            </h1>
                            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/95 drop-shadow-md">
                                Your one-stop destination for all construction and hardware needs.
                                Serving Kisii, Nyamache and surrounding areas with quality materials.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/products">
                                    <Button size="xl" variant="accent" className="text-lg">
                                        Explore Products
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </Link>
                                <PDFCatalog />
                            </div>
                        </FadeInSection>
                    </div>
                </section>

                {/* Inline home search removed — header search provides site-wide searching */}

                {/* Categories Section */}
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-4">
                        <FadeInSection>
                            <div className="text-center mb-16">
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                    Browse by Category
                                </h2>
                                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                    Find everything you need for your construction projects in our comprehensive catalog
                                </p>
                            </div>
                        </FadeInSection>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {categories.map((category, index) => (
                                <FadeInSection key={category.name} delay={index * 150}>
                                    <Link to={category.link}>
                                        <Card className="card-category group cursor-pointer">
                                            <CardContent className="p-0">
                                                <div className="aspect-square overflow-hidden rounded-t-xl">
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
                                            </CardHeader>
                                        </Card>
                                    </Link>
                                </FadeInSection>
                            ))}
                        </div>

                        {/* View All Categories Button */}
                        <FadeInSection delay={600}>
                            <div className="text-center mt-12">
                                <Link to="/categories">
                                    <Button size="lg" variant="outline">
                                        Explore Collection
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        </FadeInSection>
                    </div>
                </section>

                {/* Features Section */}
                <section id="why-choose-section" className="py-20 bg-secondary">
                    <div className="container mx-auto px-4">
                        <FadeInSection>
                            <div className="text-center mb-16">
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                    Why Choose Omosocho Prime Building Supplies?
                                </h2>
                                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                    We're committed to providing the best construction materials and service in the industry
                                </p>
                            </div>
                        </FadeInSection>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <FadeInSection key={feature.title} delay={index * 200}>
                                    <div className="text-center">
                                        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                                            <feature.icon className="w-10 h-10 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </FadeInSection>
                            ))}
                        </div>

                        {/* Learn More CTA (moved from hero) */}
                        <FadeInSection delay={600}>
                            <div className="text-center mt-12">
                                <Link to="/about">
                                    <Button size="lg" variant="default">
                                        Learn More
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        </FadeInSection>
                    </div>
                </section>

                {/* Services Section */}
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-4">
                        <FadeInSection>
                            <div className="text-center mb-16">
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                    Our Services
                                </h2>
                                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                    Professional construction services available in Kisii, Nyamache, and surrounding areas
                                </p>
                            </div>
                        </FadeInSection>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            {featuredServices.map((service, index) => (
                                <FadeInSection key={service.id} delay={index * 100}>
                                    <Card className="card-product group cursor-pointer h-full hover:shadow-xl transition-shadow">
                                        <CardHeader className="text-center">
                                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <service.icon className="w-8 h-8 text-primary" />
                                            </div>
                                            <CardTitle className="text-xl font-semibold mb-3">
                                                {service.title}
                                            </CardTitle>
                                            <CardDescription className="text-muted-foreground">
                                                {service.description}
                                            </CardDescription>
                                        </CardHeader>
                                    </Card>
                                </FadeInSection>
                            ))}
                        </div>

                        <FadeInSection delay={400}>
                            <div className="text-center">
                                <Link to="/services">
                                    <Button size="lg" variant="default">
                                        View All Services
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        </FadeInSection>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-hero">
                    <div className="container mx-auto px-4 text-center text-white">
                        <FadeInSection>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Ready to Start Your Next Project?
                            </h2>
                            <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
                                Get premium construction materials delivered to your site.
                                Professional quality, competitive prices, reliable service.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/products">
                                    <Button size="xl" variant="accent" className="text-lg">
                                        Explore Products
                                    </Button>
                                </Link>
                                <Link to="/quote">
                                    <Button size="xl" variant="outline" className="text-lg text-white border-white hover:bg-white hover:text-foreground">
                                        Request Quote
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

export default Home;
