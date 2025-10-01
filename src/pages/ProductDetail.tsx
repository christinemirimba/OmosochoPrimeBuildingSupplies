import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Star, Shield, Truck, HeadphonesIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import FadeInSection from '@/components/FadeInSection';

// Sample product data (would come from API)
const productDetails = {
  '1': {
    id: '1',
    name: 'Premium Portland Cement',
    description: 'High-grade Portland cement suitable for all types of construction projects. This cement provides excellent strength and durability for both residential and commercial applications.',
    price: 12.99,
    category: 'cement',
    images: ['/src/assets/category-cement.jpg'],
    inStock: true,
    rating: 4.8,
    reviews: 124,
    specifications: {
      'Weight': '50 kg',
      'Type': 'Portland Cement',
      'Grade': 'Grade 53',
      'Compressive Strength': '53 MPa',
      'Setting Time': '30 minutes initial, 600 minutes final',
    },
    features: [
      'Superior strength and durability',
      'Consistent quality and performance',
      'Suitable for all weather conditions',
      'Meets international standards',
      'Eco-friendly production process',
    ],
  },
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = productDetails[id as keyof typeof productDetails];

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Button onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const relatedProducts = [
    {
      id: '2',
      name: 'Professional Power Drill',
      price: 89.99,
      image: '/src/assets/category-tools.jpg',
    },
    {
      id: '3',
      name: 'Reinforcing Steel Bars',
      price: 45.50,
      image: '/src/assets/category-steel.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <FadeInSection>
          <Button 
            variant="ghost" 
            onClick={() => navigate('/products')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
        </FadeInSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <FadeInSection>
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg bg-secondary">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? 'border-primary' : 'border-border'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </FadeInSection>

          {/* Product Info */}
          <FadeInSection delay={200}>
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{product.category}</Badge>
                  <Badge variant={product.inStock ? "default" : "secondary"}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="font-medium ml-2">{product.rating}</span>
                  </div>
                  <span className="text-muted-foreground">({product.reviews} reviews)</span>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="space-y-4">
                <div className="text-3xl font-bold text-primary">
                  ${product.price}
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4">
                  <span className="font-medium">Quantity:</span>
                  <div className="flex items-center border border-border rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuantityChange(1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <div className="flex gap-4">
                  <Button 
                    className="btn-hero flex-1"
                    disabled={!product.inStock}
                  >
                    Add to Cart - ${(product.price * quantity).toFixed(2)}
                  </Button>
                  <Button variant="outline">
                    Add to Wishlist
                  </Button>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="text-center">
                  <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">Quality Guarantee</p>
                </div>
                <div className="text-center">
                  <Truck className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">Fast Delivery</p>
                </div>
                <div className="text-center">
                  <HeadphonesIcon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">24/7 Support</p>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>

        {/* Product Details Tabs */}
        <FadeInSection delay={400}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Specifications */}
            <Card>
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
                <CardDescription>Technical details and specifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-border last:border-b-0">
                      <span className="font-medium">{key}</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
                <CardDescription>What makes this product special</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </FadeInSection>

        {/* Related Products */}
        <FadeInSection delay={600}>
          <div>
            <h3 className="text-2xl font-bold mb-6">Related Products</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <FadeInSection key={relatedProduct.id} delay={index * 100}>
                  <Card className="card-product cursor-pointer" onClick={() => navigate(`/product/${relatedProduct.id}`)}>
                    <CardHeader className="p-0">
                      <div className="aspect-square overflow-hidden rounded-t-lg">
                        <img
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <CardTitle className="text-sm font-semibold line-clamp-2 mb-2">
                        {relatedProduct.name}
                      </CardTitle>
                      <div className="text-lg font-bold text-primary">
                        ${relatedProduct.price}
                      </div>
                    </CardContent>
                  </Card>
                </FadeInSection>
              ))}
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};

export default ProductDetail;