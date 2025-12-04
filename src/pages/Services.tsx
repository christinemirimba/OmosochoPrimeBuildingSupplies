import { Helmet } from 'react-helmet-async';
import { Wrench, Truck, ClipboardCheck, Users, ShieldCheck, Ruler } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import FadeInSection from '@/components/FadeInSection';

const services = [
  {
    icon: Wrench,
    title: 'Material Supply',
    description: 'Comprehensive supply of construction materials including cement, steel, roofing, and finishing materials for all project sizes.',
  },
  {
    icon: Truck,
    title: 'Delivery Services',
    description: 'Reliable and timely delivery of materials to your construction site within Kisii, Nyamache, and surrounding areas.',
  },
  {
    icon: ClipboardCheck,
    title: 'Project Consultation',
    description: 'Expert consultation to help you select the right materials for your specific construction needs and budget.',
  },
  {
    icon: Users,
    title: 'Bulk Orders',
    description: 'Special pricing and dedicated support for contractors and large-scale construction projects.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Assurance',
    description: 'All our materials meet industry standards with proper certifications and quality guarantees.',
  },
  {
    icon: Ruler,
    title: 'Technical Support',
    description: 'On-call technical assistance to help with material specifications, measurements, and construction queries.',
  },
];

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Our Services | Omosocho Prime Building Supplies</title>
        <meta name="description" content="Explore Omosocho Prime's comprehensive construction services including material supply, delivery, consultation, and technical support in Kisii, Kenya." />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-hero text-primary-foreground py-20">
          <div className="container mx-auto px-4">
            <FadeInSection>
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                  Our Services
                </h1>
                <p className="text-lg md:text-xl opacity-90">
                  Comprehensive construction support services to help you build with confidence
                </p>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <FadeInSection key={service.title} delay={index * 100}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <service.icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {service.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4 text-center">
            <FadeInSection>
              <h2 className="text-3xl font-heading font-bold mb-4">
                Need a Custom Solution?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Contact us today to discuss your specific construction requirements. Our team is ready to help you find the perfect materials and services for your project.
              </p>
              <a
                href="/contact"
                className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Get in Touch
              </a>
            </FadeInSection>
          </div>
        </section>
      </div>
    </>
  );
};

export default Services;
