import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Music } from 'lucide-react';

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
                <span className="text-white font-bold">O</span>
              </div>
              <div>
                <span className="text-lg font-heading font-bold">Omosocho Prime</span>
                <span className="text-primary font-heading font-medium ml-1">Building Supplies</span>
              </div>
            </div>
            <p className="text-background/80 leading-relaxed">
              Premium construction materials and tools for professionals in Kisii, Nyamache and surrounding areas.
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
                <Music className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/products" className="text-background/80 hover:text-background transition-colors">
                Products
              </Link>
              <Link to="/services" className="text-background/80 hover:text-background transition-colors">
                Services
              </Link>
              <Link to="/plan" className="text-background/80 hover:text-background transition-colors">
                Plan Your Project
              </Link>
              <Link to="/about" className="text-background/80 hover:text-background transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="text-background/80 hover:text-background transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold">Resources</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/faq" className="text-background/80 hover:text-background transition-colors">
                FAQ
              </Link>
              <Link to="/privacy" className="text-background/80 hover:text-background transition-colors">
                Privacy Policy
              </Link>
              <Link to="/ai-support" className="text-background/80 hover:text-background transition-colors">
                AI Support
              </Link>
              <Link to="/testimonials" className="text-background/80 hover:text-background transition-colors">
                Testimonials
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
                  <p className="text-background/80">Kisii, Nyamache</p>
                  <p className="text-background/80">Kenya</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+254705621054" className="text-background/80 hover:text-background transition-colors">
                  +254705621054
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:nikeombura@gmail.com" className="text-background/80 hover:text-background transition-colors">
                  nikeombura@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-background/60 text-sm">
              © {currentYear} Omosocho Prime Building Supplies. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-background/60 hover:text-background transition-colors">
                Privacy Policy
              </Link>
              <Link to="/faq" className="text-background/60 hover:text-background transition-colors">
                FAQ
              </Link>
              <Link to="/contact" className="text-background/60 hover:text-background transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
