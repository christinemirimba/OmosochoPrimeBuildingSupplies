import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">N</span>
              </div>
              <div>
                <span className="text-xl font-heading font-bold">Nikit</span>
                <span className="text-primary font-heading font-medium ml-1">Hardware</span>
              </div>
            </div>
            <p className="text-background/80 leading-relaxed">
              Premium construction materials and tools for professionals. Quality, reliability, and fast delivery since 1995.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-background/60 hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-background/80 hover:text-background transition-colors">
                Home
              </Link>
              <Link to="/products" className="text-background/80 hover:text-background transition-colors">
                Products
              </Link>
              <Link to="/about" className="text-background/80 hover:text-background transition-colors">
                About Us
              </Link>
              <Link to="/testimonials" className="text-background/80 hover:text-background transition-colors">
                Testimonials
              </Link>
              <Link to="/contact" className="text-background/80 hover:text-background transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold">Categories</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/products?category=cement" className="text-background/80 hover:text-background transition-colors">
                Cement & Concrete
              </Link>
              <Link to="/products?category=tools" className="text-background/80 hover:text-background transition-colors">
                Power Tools
              </Link>
              <Link to="/products?category=steel" className="text-background/80 hover:text-background transition-colors">
                Steel & Materials
              </Link>
              <Link to="/products?category=safety" className="text-background/80 hover:text-background transition-colors">
                Safety Equipment
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-background/80">123 Construction Ave</p>
                  <p className="text-background/80">Industrial District, City 12345</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+1234567890" className="text-background/80 hover:text-background transition-colors">
                  +1 (234) 567-8900
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:info@nikithardware.com" className="text-background/80 hover:text-background transition-colors">
                  info@nikithardware.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-background/60 text-sm">
              © {currentYear} Nikit Hardware. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-background/60 hover:text-background transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-background/60 hover:text-background transition-colors">
                Terms of Service
              </Link>
              <Link to="/shipping" className="text-background/60 hover:text-background transition-colors">
                Shipping Info
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;