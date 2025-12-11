import { Helmet } from 'react-helmet-async';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import FadeInSection from '@/components/FadeInSection';
import ExitButton from '@/components/ExitButton';

const faqs = [
    {
        question: 'What types of construction materials do you offer?',
        answer: 'We offer a comprehensive range of construction materials including cement, steel bars, roofing materials (mabati, tiles), building blocks, sand, ballast, timber, plumbing supplies, electrical fittings, paints, and finishing materials. We stock products suitable for both residential and commercial construction projects.',
    },
    {
        question: 'Do you offer delivery services?',
        answer: 'Yes, we provide reliable delivery services throughout Kisii, Nyamache, and surrounding areas. Delivery fees vary based on distance and order size. For large orders, we offer free delivery within a certain radius. Contact us for specific delivery quotes.',
    },
    {
        question: 'Can I get materials on credit?',
        answer: 'We offer credit facilities for established customers and contractors with a proven track record. New customers may need to build a relationship with us through initial cash purchases. Please visit our store to discuss credit terms and requirements.',
    },
    {
        question: 'Do you provide technical advice on material selection?',
        answer: 'Absolutely! Our experienced team can help you select the right materials for your specific project. We consider factors like budget, durability requirements, local climate conditions, and building regulations when making recommendations.',
    },
    {
        question: 'What are your business hours?',
        answer: 'We are open Monday to Saturday from 7:00 AM to 6:00 PM, and Sundays from 8:00 AM to 2:00 PM. We remain closed on public holidays. For urgent requirements, you can reach us via phone.',
    },
    {
        question: 'Do you offer bulk discounts for contractors?',
        answer: 'Yes, we offer competitive pricing for bulk orders and have special rates for contractors and construction companies. The discount percentage depends on order volume and frequency. Contact our sales team to discuss contractor partnership opportunities.',
    },
    {
        question: 'Can I return unused materials?',
        answer: 'We accept returns of unused materials in their original condition within 14 days of purchase, accompanied by the original receipt. Some items like cut-to-size materials, mixed cement, or opened paint containers cannot be returned. Please check with our staff before purchase.',
    },
    {
        question: 'Do you provide material quantity estimates?',
        answer: 'Yes, we can help estimate material quantities based on your building plans. Bring your architectural drawings or measurements, and our team will calculate the approximate quantities needed. You can also use our online Construction Plan Manager tool for basic estimates.',
    },
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept cash, M-Pesa, bank transfers, and cheques (for approved accounts). For M-Pesa payments, you can pay at our store or use our business Till Number for advance payments.',
    },
    {
        question: 'Do you guarantee the quality of your materials?',
        answer: 'All our materials are sourced from reputable manufacturers and meet Kenya Bureau of Standards (KEBS) requirements. We stand behind the quality of our products and will address any quality concerns promptly. Cement and steel come with manufacturer certifications.',
    },
    {
        question: 'Can I place orders over the phone?',
        answer: 'Yes, existing customers can place orders via phone for delivery. New customers are encouraged to visit our store first to register and establish their account. Call us at +254705621054 to place an order.',
    },
    {
        question: 'Do you offer installation services?',
        answer: 'While we primarily focus on material supply, we can recommend trusted contractors and fundis for installation services. We have partnerships with skilled professionals for roofing, plumbing, and electrical work.',
    },
];

const Faq = () => {
    return (
        <>
            <Helmet>
                <title>Frequently Asked Questions | Omosocho Prime</title>
                <meta name="description" content="Find answers to common questions about Omosocho Prime Building Supplies - delivery, materials, pricing, and more." />
            </Helmet>

            <div className="min-h-screen py-12 relative">
                <div className="container mx-auto px-4">
                    {/* Exit Button - Close type for FAQ page */}
                    <div className="absolute top-4 right-4 z-10">
                        <ExitButton type="close" className="relative" />
                    </div>
                    <FadeInSection>
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-heading font-bold mb-4">Frequently Asked Questions</h1>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Find answers to common questions about our products, services, and policies.
                            </p>
                        </div>
                    </FadeInSection>

                    <div className="max-w-3xl mx-auto">
                        <FadeInSection delay={100}>
                            <Accordion type="single" collapsible className="space-y-4">
                                {faqs.map((faq, index) => (
                                    <AccordionItem
                                        key={index}
                                        value={`item-${index}`}
                                        className="bg-card border border-border rounded-lg px-6"
                                    >
                                        <AccordionTrigger className="text-left hover:no-underline">
                                            {faq.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </FadeInSection>

                        <FadeInSection delay={200}>
                            <div className="mt-12 text-center bg-secondary rounded-lg p-8">
                                <h2 className="text-xl font-heading font-semibold mb-2">Still have questions?</h2>
                                <p className="text-muted-foreground mb-4">
                                    Can't find what you're looking for? Our team is here to help.
                                </p>
                                <a
                                    href="/contact"
                                    className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                                >
                                    Contact Us
                                </a>
                            </div>
                        </FadeInSection>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Faq;