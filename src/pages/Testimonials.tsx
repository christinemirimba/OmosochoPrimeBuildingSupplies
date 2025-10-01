import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import FadeInSection from '@/components/FadeInSection';

const testimonials = [
  {
    id: 1,
    name: 'David Thompson',
    role: 'General Contractor',
    company: 'Thompson Construction Co.',
    rating: 5,
    content: 'Nikit Hardware has been our go-to supplier for over 10 years. Their cement quality is unmatched, and their delivery is always on time. They understand the construction business and our tight deadlines.',
    image: '/placeholder-avatar.jpg',
  },
  {
    id: 2,
    name: 'Maria Rodriguez',
    role: 'Project Manager',
    company: 'Urban Development Ltd.',
    rating: 5,
    content: 'The customer service at Nikit Hardware is exceptional. They helped us find the perfect materials for our commercial project and provided technical support throughout. Highly recommended!',
    image: '/placeholder-avatar.jpg',
  },
  {
    id: 3,
    name: 'James Mitchell',
    role: 'Site Supervisor',
    company: 'Mitchell & Sons',
    rating: 5,
    content: 'Quality products, competitive prices, and reliable service. What more could you ask for? Nikit Hardware has never let us down, even on our most challenging projects.',
    image: '/placeholder-avatar.jpg',
  },
  {
    id: 4,
    name: 'Lisa Chen',
    role: 'Architect',
    company: 'Chen Design Studio',
    rating: 5,
    content: 'As an architect, I need suppliers who understand quality and precision. Nikit Hardware consistently delivers materials that meet our exact specifications.',
    image: '/placeholder-avatar.jpg',
  },
  {
    id: 5,
    name: 'Robert Kim',
    role: 'Construction Manager',
    company: 'Pacific Builders',
    rating: 5,
    content: 'Their steel products are top-notch, and the safety equipment keeps our workers protected. Nikit Hardware is a trusted partner in our success.',
    image: '/placeholder-avatar.jpg',
  },
  {
    id: 6,
    name: 'Sarah Williams',
    role: 'Owner',
    company: 'Williams Renovations',
    rating: 5,
    content: 'From small renovations to major projects, Nikit Hardware has everything we need. Their tool selection is impressive, and the quality is always reliable.',
    image: '/placeholder-avatar.jpg',
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentTestimonials = testimonials.slice(
    currentIndex * testimonialsPerPage,
    (currentIndex + 1) * testimonialsPerPage
  );

  const stats = [
    { value: '4.9/5', label: 'Average Rating' },
    { value: '2,500+', label: 'Happy Customers' },
    { value: '98%', label: 'Satisfaction Rate' },
    { value: '15K+', label: 'Projects Completed' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-hero py-20">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <div className="text-center text-white max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                What Our Customers Say
              </h1>
              <p className="text-xl text-white/90">
                Don't just take our word for it. See what construction professionals 
                across the region say about working with Nikit Hardware.
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Stats Section */}
        <FadeInSection>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <FadeInSection key={stat.label} delay={index * 100}>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <p className="text-muted-foreground font-medium">{stat.label}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </FadeInSection>

        {/* Testimonials Carousel */}
        <FadeInSection delay={200}>
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Customer Reviews</h2>
              <p className="text-lg text-muted-foreground">
                Real feedback from real construction professionals
              </p>
            </div>

            {/* Carousel Controls */}
            <div className="flex justify-center items-center gap-4 mb-8">
              <Button
                variant="outline"
                size="sm"
                onClick={prevSlide}
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      i === currentIndex ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={nextSlide}
                disabled={currentIndex === totalPages - 1}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {currentTestimonials.map((testimonial, index) => (
                <FadeInSection key={testimonial.id} delay={index * 150}>
                  <Card className="card-product h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="mb-4">
                        <Quote className="w-8 h-8 text-primary/20 mb-3" />
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          "{testimonial.content}"
                        </p>
                      </div>

                      <div className="mt-auto">
                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>

                        {/* Customer Info */}
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-semibold">
                              {testimonial.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-semibold truncate">{testimonial.name}</h4>
                            <p className="text-sm text-muted-foreground truncate">
                              {testimonial.role}
                            </p>
                            <p className="text-sm text-primary font-medium truncate">
                              {testimonial.company}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </FadeInSection>
              ))}
            </div>
          </div>
        </FadeInSection>

        {/* Call to Action */}
        <FadeInSection delay={600}>
          <div className="bg-secondary rounded-2xl p-8 lg:p-12 text-center">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Ready to Experience Quality Service?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Nikit Hardware for their construction needs. 
              Let us help you build your next successful project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-hero">
                Start Shopping
              </Button>
              <Button variant="outline" size="lg">
                Contact Us Today
              </Button>
            </div>
          </div>
        </FadeInSection>

        {/* Trust Indicators */}
        <FadeInSection delay={800}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Verified Reviews</h4>
              <p className="text-muted-foreground text-sm">
                All reviews are from verified customers who have purchased from us
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Quote className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Real Experiences</h4>
              <p className="text-muted-foreground text-sm">
                Authentic feedback from construction professionals across various industries
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChevronRight className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Continuous Growth</h4>
              <p className="text-muted-foreground text-sm">
                We use customer feedback to continuously improve our products and services
              </p>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};

export default Testimonials;