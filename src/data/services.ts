import { Wrench, Truck, ClipboardCheck, Users, ShieldCheck, Ruler } from 'lucide-react';

export interface Service {
    id: string;
    title: string;
    description: string;
    icon: any; // Using 'any' for Lucide icon component type safely here
    displayOnHome: boolean;
}

export const services: Service[] = [
    {
        id: 'material-supply',
        title: 'Material Supply',
        description: 'Comprehensive supply of construction materials including cement, steel, roofing, and finishing materials for all project sizes.',
        icon: Wrench,
        displayOnHome: true,
    },
    {
        id: 'delivery-services',
        title: 'Delivery Services',
        description: 'Reliable and timely delivery of materials to your construction site within Kisii, Nyamache, and surrounding areas.',
        icon: Truck,
        displayOnHome: true,
    },
    {
        id: 'project-consultation',
        title: 'Expert Consultation',
        description: 'Professional advice on material selection and project planning to fit your specific needs and budget.',
        icon: ClipboardCheck, // Renamed slightly for Home display "Expert Consultation" vs "Project Consultation" - sticking to "Expert Consultation" as likely desired for Home marketing.
        displayOnHome: true,
    },
    {
        id: 'bulk-orders',
        title: 'Bulk Orders',
        description: 'Special pricing and dedicated support for contractors and large-scale construction projects.',
        icon: Users,
        displayOnHome: true,
    },
    {
        id: 'custom-solutions',
        title: 'Custom Solutions',
        description: 'Tailored material packages for your specific construction needs.',
        icon: Ruler,
        displayOnHome: false, // Previously on Home but redundant with others? Let's keep distinct.
    },
    {
        id: 'quality-assurance',
        title: 'Quality Assurance',
        description: 'All our materials meet industry standards with proper certifications and quality guarantees.',
        icon: ShieldCheck,
        displayOnHome: false,
    },
    {
        id: 'technical-support',
        title: 'Technical Support',
        description: 'On-call technical assistance to help with material specifications and construction queries.',
        icon: Ruler,
        displayOnHome: false,
    }
];

// Helper to get featured services for Home page
export const getFeaturedServices = () => services.filter(s => s.displayOnHome).slice(0, 4);
