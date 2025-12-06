import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import FadeInSection from '@/components/FadeInSection';

// Sample cart data
const initialCartItems = [
    {
        id: '1',
        name: 'Premium Portland Cement',
        price: 12.99,
        quantity: 2,
        image: '/assets/category-cement.jpg',
    },
    {
        id: '2',
        name: 'Professional Power Drill',
        price: 89.99,
        quantity: 1,
        image: '/assets/category-tools.jpg',
    },
];

const Cart = () => {
    const [cartItems, setCartItems] = useState(initialCartItems);
    const [promoCode, setPromoCode] = useState('');

    const updateQuantity = (id: string, newQuantity: number) => {
        if (newQuantity <= 0) {
            removeItem(id);
            return;
        }
        setCartItems(items =>
            items.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const removeItem = (id: string) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 9.99;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-16">
                    <FadeInSection>
                        <div className="text-center max-w-md mx-auto">
                            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                                <ShoppingBag className="w-12 h-12 text-muted-foreground" />
                            </div>
                            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
                            <p className="text-muted-foreground mb-8">
                                Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
                            </p>
                            <Link to="/products">
                                <Button className="btn-hero">
                                    Continue Shopping
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </FadeInSection>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <FadeInSection>
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
                        <p className="text-muted-foreground">
                            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
                        </p>
                    </div>
                </FadeInSection>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item, index) => (
                            <FadeInSection key={item.id} delay={index * 100}>
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex gap-4">
                                            {/* Product Image */}
                                            <div className="w-20 h-20 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            {/* Product Details */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-lg mb-1 truncate">
                                                    {item.name}
                                                </h3>
                                                <p className="text-primary font-bold text-lg">
                                                    ${item.price}
                                                </p>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center border border-border rounded-lg">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="h-8 w-8 p-0"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </Button>
                                                    <span className="px-3 py-1 font-medium min-w-[2rem] text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="h-8 w-8 p-0"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </Button>
                                                </div>

                                                {/* Remove Button */}
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-destructive hover:text-destructive h-8 w-8 p-0"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Item Total */}
                                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
                                            <span className="text-sm text-muted-foreground">
                                                ${item.price} × {item.quantity}
                                            </span>
                                            <span className="font-semibold">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </FadeInSection>
                        ))}

                        {/* Continue Shopping */}
                        <FadeInSection delay={300}>
                            <div className="pt-4">
                                <Link to="/products">
                                    <Button variant="outline">
                                        Continue Shopping
                                    </Button>
                                </Link>
                            </div>
                        </FadeInSection>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <FadeInSection delay={200}>
                            <Card className="sticky top-24">
                                <CardHeader>
                                    <CardTitle>Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Promo Code */}
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">
                                            Promo Code
                                        </label>
                                        <div className="flex gap-2">
                                            <Input
                                                type="text"
                                                placeholder="Enter code"
                                                value={promoCode}
                                                onChange={(e) => setPromoCode(e.target.value)}
                                            />
                                            <Button variant="outline" size="sm">
                                                Apply
                                            </Button>
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Price Breakdown */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span>Subtotal</span>
                                            <span>${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Shipping</span>
                                            <span>
                                                {shipping === 0 ? (
                                                    <span className="text-green-600">Free</span>
                                                ) : (
                                                    `$${shipping.toFixed(2)}`
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Tax</span>
                                            <span>${tax.toFixed(2)}</span>
                                        </div>
                                        {shipping === 0 && (
                                            <div className="text-sm text-green-600">
                                                🎉 Free shipping on orders over $100
                                            </div>
                                        )}
                                    </div>

                                    <Separator />

                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>

                                    <Button className="btn-hero w-full">
                                        Proceed to Checkout
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>

                                    <div className="text-xs text-muted-foreground text-center">
                                        Secure checkout with SSL encryption
                                    </div>
                                </CardContent>
                            </Card>
                        </FadeInSection>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;