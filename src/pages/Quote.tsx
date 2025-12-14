import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingCart, Send, ArrowLeft, FileText, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import FadeInSection from '@/components/FadeInSection';
import PageTransition from '@/components/PageTransition';
import { products, getProductById } from '@/data/products';

interface QuoteItem {
    productId: number;
    quantity: number;
}

const Quote = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
    });

    // Load quote from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('quote');
        if (saved) {
            try {
                setQuoteItems(JSON.parse(saved));
            } catch (error) {
                console.error('Error loading quote:', error);
            }
        }
    }, []);

    // Save quote to localStorage
    const saveQuote = (items: QuoteItem[]) => {
        localStorage.setItem('quote', JSON.stringify(items));
        setQuoteItems(items);
    };

    // Get product details for quote items
    const quoteProducts = quoteItems
        .map(item => {
            const product = getProductById(item.productId.toString());
            return product ? { ...product, quantity: item.quantity } : null;
        })
        .filter(Boolean);

    // Update quantity
    const updateQuantity = (productId: number, change: number) => {
        const updated = quoteItems.map(item => {
            if (item.productId === productId) {
                const newQty = Math.max(1, item.quantity + change);
                return { ...item, quantity: newQty };
            }
            return item;
        });
        saveQuote(updated);
    };

    // Remove item
    const removeItem = (productId: number) => {
        const updated = quoteItems.filter(item => item.productId !== productId);
        saveQuote(updated);
        toast({
            title: "Item Removed",
            description: "Product has been removed from your quote.",
        });
    };

    // Clear all
    const clearQuote = () => {
        localStorage.removeItem('quote');
        setQuoteItems([]);
        toast({
            title: "Quote Cleared",
            description: "All items have been removed from your quote.",
        });
    };

    // Handle form submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (quoteProducts.length === 0) {
            toast({
                title: "No Items",
                description: "Please add products to your quote before submitting.",
            });
            return;
        }

        if (!formData.name || !formData.email || !formData.phone) {
            toast({
                title: "Required Fields",
                description: "Please fill in your name, email, and phone number.",
            });
            return;
        }

        setIsSubmitting(true);

        // Build quote details for email
        const quoteDetails = quoteProducts.map(p =>
            `- ${p?.name} (Qty: ${p?.quantity}) - ${p?.brand || 'N/A'}`
        ).join('\n');

        // Create mailto link with quote details
        const subject = encodeURIComponent(`Quote Request from ${formData.name}`);
        const body = encodeURIComponent(
            `QUOTE REQUEST

Customer Information:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Company: ${formData.company || 'N/A'}

Products Requested:
${quoteDetails}

Total Items: ${quoteProducts.length}
Total Quantity: ${quoteItems.reduce((sum, item) => sum + item.quantity, 0)}

Additional Message:
${formData.message || 'No additional message'}

---
Submitted via Omosocho Prime Website
Date: ${new Date().toLocaleString()}
`
        );

        // Open email client
        window.location.href = `mailto:nikeombura@gmail.com?subject=${subject}&body=${body}`;

        setIsSubmitting(false);

        toast({
            title: "Quote Request Prepared",
            description: "Your email client has been opened with the quote details. Please send the email to complete your request.",
        });

        // Clear quote after submission
        setTimeout(() => {
            clearQuote();
            setFormData({ name: '', email: '', phone: '', company: '', message: '' });
        }, 2000);
    };

    return (
        <PageTransition>
            <div className="min-h-screen bg-background">
                {/* Header Section */}
                <section className="bg-hero py-12">
                    <div className="container mx-auto px-4">
                        <FadeInSection>
                            <div className="text-center text-white">
                                <FileText className="w-16 h-16 mx-auto mb-4 opacity-90" />
                                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                    Request a Quote
                                </h1>
                                <p className="text-xl text-white/90 max-w-2xl mx-auto">
                                    Review your selected products and submit a quote request. We'll respond with pricing within 24 hours.
                                </p>
                            </div>
                        </FadeInSection>
                    </div>
                </section>

                <div className="container mx-auto px-4 py-12">
                    <FadeInSection>
                        <Button
                            variant="ghost"
                            onClick={() => navigate('/products')}
                            className="mb-6"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Continue Browsing
                        </Button>
                    </FadeInSection>

                    {quoteProducts.length === 0 ? (
                        <FadeInSection>
                            <div className="text-center py-20">
                                <ShoppingCart className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
                                <h3 className="text-2xl font-semibold mb-4">Your quote list is empty</h3>
                                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                                    Start adding products to your quote by clicking "Add to Quote" on product pages.
                                </p>
                                <Link to="/products">
                                    <Button size="lg" variant="accent">
                                        Explore Products
                                    </Button>
                                </Link>
                            </div>
                        </FadeInSection>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Quote Items */}
                            <div className="lg:col-span-2">
                                <FadeInSection>
                                    <Card>
                                        <CardHeader>
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <CardTitle>Quote Items</CardTitle>
                                                    <CardDescription>
                                                        {quoteProducts.length} {quoteProducts.length === 1 ? 'item' : 'items'} in your quote
                                                    </CardDescription>
                                                </div>
                                                <Button variant="outline" size="sm" onClick={clearQuote}>
                                                    Clear All
                                                </Button>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                {quoteProducts.map((product, index) => (
                                                    <div key={product?.id}>
                                                        <div className="flex gap-4 items-start sm:items-center">
                                                            <div className="w-20 h-20 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                                                                <img
                                                                    src={product?.image}
                                                                    alt={product?.name}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                            <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-y-3 gap-x-4">
                                                                <div className="min-w-0">
                                                                    <Link to={`/product/${product?.id}`}>
                                                                        <h4 className="font-semibold hover:text-primary transition-colors line-clamp-1">
                                                                            {product?.name}
                                                                        </h4>
                                                                    </Link>
                                                                    <p className="text-sm text-muted-foreground">
                                                                        {product?.brand}
                                                                    </p>
                                                                </div>
                                                                <div className="flex items-center gap-3">
                                                                    <div className="flex items-center gap-2 bg-secondary/30 rounded-lg p-1">
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="h-7 w-7"
                                                                            onClick={() => updateQuantity(product?.id || 0, -1)}
                                                                        >
                                                                            <Minus className="w-3 h-3" />
                                                                        </Button>
                                                                        <span className="w-8 text-center font-medium text-sm">
                                                                            {product?.quantity}
                                                                        </span>
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="h-7 w-7"
                                                                            onClick={() => updateQuantity(product?.id || 0, 1)}
                                                                        >
                                                                            <Plus className="w-3 h-3" />
                                                                        </Button>
                                                                    </div>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                                                        onClick={() => removeItem(product?.id || 0)}
                                                                    >
                                                                        <Trash2 className="w-4 h-4" />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {index < quoteProducts.length - 1 && <Separator className="mt-4" />}
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </FadeInSection>
                            </div>

                            {/* Quote Form */}
                            <div className="lg:col-span-1">
                                <FadeInSection delay={200}>
                                    <Card className="sticky top-24">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <Mail className="w-5 h-5" />
                                                Contact Details
                                            </CardTitle>
                                            <CardDescription>
                                                Fill in your details and we'll send you a quote
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                <div>
                                                    <Label htmlFor="name">Full Name *</Label>
                                                    <Input
                                                        id="name"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        placeholder="Your full name"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="email">Email Address *</Label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        placeholder="your@email.com"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="phone">Phone Number *</Label>
                                                    <Input
                                                        id="phone"
                                                        type="tel"
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                        placeholder="+254 7XX XXX XXX"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="company">Company (Optional)</Label>
                                                    <Input
                                                        id="company"
                                                        value={formData.company}
                                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                        placeholder="Your company name"
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="message">Additional Notes</Label>
                                                    <Textarea
                                                        id="message"
                                                        value={formData.message}
                                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                        placeholder="Any specific requirements or questions..."
                                                        rows={3}
                                                    />
                                                </div>
                                                <Separator />
                                                <div className="text-sm text-muted-foreground">
                                                    <p>Total Items: <strong>{quoteProducts.length}</strong></p>
                                                    <p>Total Quantity: <strong>{quoteItems.reduce((sum, item) => sum + item.quantity, 0)}</strong></p>
                                                </div>
                                                <Button
                                                    type="submit"
                                                    size="lg"
                                                    variant="accent"
                                                    className="w-full"
                                                    disabled={isSubmitting}
                                                >
                                                    <Send className="w-4 h-4 mr-2" />
                                                    {isSubmitting ? 'Preparing...' : 'Submit Quote Request'}
                                                </Button>
                                            </form>
                                        </CardContent>
                                    </Card>
                                </FadeInSection>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </PageTransition>
    );
};

export default Quote;
