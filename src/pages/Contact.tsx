import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import FadeInSection from '@/components/FadeInSection';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+254705621054'],
      description: 'Call us during business hours',
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['nikeombura@gmail.com'],
      description: 'Send us an email anytime',
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['Kisii, Nyamache', 'Kenya'],
      description: 'Visit our location',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon - Fri: 8:00 AM - 6:00 PM', 'Sat: 9:00 AM - 4:00 PM'],
      description: 'We are closed on Sundays',
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
                Get in Touch
              </h1>
              <p className="text-xl text-white/90">
                Have questions about our products or need assistance with your project? 
                We're here to help you every step of the way.
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <FadeInSection>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="text-sm font-medium mb-2 block">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="text-sm font-medium mb-2 block">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="text-sm font-medium mb-2 block">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+254705621054"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="text-sm font-medium mb-2 block">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="How can we help?"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="text-sm font-medium mb-2 block">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your project or ask us any questions..."
                      className="min-h-[120px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="btn-hero w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </FadeInSection>

          {/* Contact Information */}
          <div className="space-y-6">
            <FadeInSection delay={200}>
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                <p className="text-muted-foreground">
                  Reach out to us through any of these channels. We're always happy to help!
                </p>
              </div>
            </FadeInSection>

            {contactInfo.map((info, index) => (
              <FadeInSection key={info.title} delay={300 + index * 100}>
                <Card className="card-product">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{info.title}</h3>
                        <div className="space-y-1 mb-2">
                          {info.details.map((detail, i) => (
                            <p key={i} className="font-medium">
                              {detail}
                            </p>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeInSection>
            ))}

            {/* Map Placeholder */}
            <FadeInSection delay={700}>
              <Card>
                <CardContent className="p-0">
                  <div className="h-64 bg-gradient-to-br from-secondary to-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-primary mx-auto mb-3" />
                      <p className="text-lg font-semibold mb-1">Visit Our Location</p>
                      <p className="text-muted-foreground">
                        Interactive map would be embedded here
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeInSection>
          </div>
        </div>

        {/* FAQ Section */}
        <FadeInSection delay={900}>
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Quick answers to common questions. Can't find what you're looking for? 
              Feel free to contact us directly.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">What are your delivery options?</h4>
                  <p className="text-muted-foreground text-sm">
                    We offer same-day delivery for local orders, next-day delivery within 50 miles, 
                    and standard shipping nationwide. Bulk orders can be scheduled for specific delivery windows.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">Do you offer bulk pricing?</h4>
                  <p className="text-muted-foreground text-sm">
                    Yes! We offer competitive bulk pricing for contractors and large projects. 
                    Contact our sales team for custom quotes on large orders.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">What quality certifications do you have?</h4>
                  <p className="text-muted-foreground text-sm">
                    All our products meet or exceed industry standards including ASTM, ACI, and OSHA certifications. 
                    We can provide detailed quality documentation upon request.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">Can you help with technical specifications?</h4>
                  <p className="text-muted-foreground text-sm">
                    Absolutely! Our technical team can assist with material selection, 
                    specifications, and project planning. We're here to ensure you get the right materials for your needs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};

export default Contact;