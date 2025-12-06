import { Award, Users, Truck, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import FadeInSection from '@/components/FadeInSection';

const About = () => {
    const stats = [
        { icon: Award, label: 'Years of Excellence', value: '28+' },
        { icon: Users, label: 'Happy Customers', value: '50K+' },
        { icon: Truck, label: 'Projects Completed', value: '15K+' },
        { icon: Clock, label: 'Cities Served', value: '200+' },
    ];

    const team = [
        {
            name: 'Ziporah Kemunto',
            role: 'Owner & CEO',
            description: 'Owner managing daily operations and ensuring excellent customer service',
            image: '/placeholder-avatar.jpg',
        },
        {
            name: 'Kelvin Ombura',
            role: 'Technical Expert & Engineer',
            description: 'Leading hardware solutions expert with extensive knowledge in tools and equipment',
            image: '/placeholder-avatar.jpg',
        },
        {
            name: 'Davison Nikit Ombura',
            role: 'Supervisor',
            description: 'Managing workflow, supervising staff, and ensuring excellent customer service',
            image: '/placeholder-avatar.jpg',
        },
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="bg-hero py-20">
                <div className="container mx-auto px-4">
                    <FadeInSection>
                        <div className="text-center text-white max-w-3xl mx-auto">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                About Omosocho Prime
                            </h1>
                            <p className="text-xl text-white/90">
                                Building trust through quality construction materials since 1995.
                                We're your reliable partner for all construction needs.
                            </p>
                        </div>
                    </FadeInSection>
                </div>
            </section>

            <div className="container mx-auto px-4 py-16">
                {/* Company Story */}
                <FadeInSection>
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                            Founded in 1995, Omosocho Prime began as a small family business with a simple mission:
                            to provide high-quality construction materials at fair prices. Over nearly three decades,
                            we've grown from a local supplier to a trusted partner for construction professionals
                            across the region.
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Today, we continue to uphold our founding values of quality, reliability, and exceptional
                            customer service. Our state-of-the-art facilities and experienced team ensure that every
                            product meets the highest standards of excellence.
                        </p>
                    </div>
                </FadeInSection>

                {/* Stats */}
                <FadeInSection delay={200}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {stats.map((stat, index) => (
                            <FadeInSection key={stat.label} delay={index * 100}>
                                <Card className="text-center card-category">
                                    <CardContent className="p-6">
                                        <stat.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                                        <div className="text-3xl font-bold mb-2">{stat.value}</div>
                                        <div className="text-muted-foreground font-medium">{stat.label}</div>
                                    </CardContent>
                                </Card>
                            </FadeInSection>
                        ))}
                    </div>
                </FadeInSection>

                {/* Mission & Values */}
                <FadeInSection delay={400}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">Our Mission</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed">
                                    To be the leading supplier of premium construction materials, empowering builders
                                    and contractors with the tools and materials they need to create lasting, quality
                                    structures. We're committed to innovation, sustainability, and building strong
                                    relationships with our customers.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">Our Values</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                        <span><strong>Quality:</strong> We never compromise on product quality</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                        <span><strong>Reliability:</strong> Consistent delivery and service you can count on</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                        <span><strong>Innovation:</strong> Embracing new technologies and solutions</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                        <span><strong>Sustainability:</strong> Protecting our environment for future generations</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </FadeInSection>

                {/* Team Section */}
                <FadeInSection delay={600}>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Our experienced leadership team brings decades of industry expertise
                            and a shared commitment to excellence.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {team.map((member, index) => (
                            <FadeInSection key={member.name} delay={index * 150}>
                                <Card className="text-center card-product">
                                    <CardContent className="p-6">
                                        <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                                            <span className="text-2xl font-bold text-white">
                                                {member.name.split(' ').map(n => n[0]).join('')}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                                        <p className="text-primary font-medium mb-3">{member.role}</p>
                                        <p className="text-muted-foreground text-sm">{member.description}</p>
                                    </CardContent>
                                </Card>
                            </FadeInSection>
                        ))}
                    </div>
                </FadeInSection>

                {/* Why Choose Us */}
                <FadeInSection delay={800}>
                    <div className="bg-secondary rounded-2xl p-8 lg:p-12 mt-16">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold mb-4">Why Choose Omosocho Prime?</h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                We're more than just a supplier - we're your construction partner
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Award className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">Premium Quality</h3>
                                <p className="text-muted-foreground">
                                    All our products meet or exceed industry standards, backed by comprehensive quality guarantees.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Truck className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
                                <p className="text-muted-foreground">
                                    Reliable logistics network ensures your materials arrive on time, every time.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">Expert Support</h3>
                                <p className="text-muted-foreground">
                                    Our knowledgeable team provides technical support and guidance for all your projects.
                                </p>
                            </div>
                        </div>
                    </div>
                </FadeInSection>
            </div>
        </div>
    );
};

export default About;