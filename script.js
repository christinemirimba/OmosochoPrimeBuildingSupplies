// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');
    const backToTopButton = document.getElementById('back-to-top');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY > 100;
        
        if (scrolled) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }

        // Back to top button visibility
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // Back to top functionality
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            this.reset();
            
            // In a real application, you would send this data to your server
            console.log('Form submitted:', { name, email, phone, subject, message });
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animations
    const animateElements = document.querySelectorAll('.service-card, .product-card, .team-member, .value-card');
    animateElements.forEach(el => observer.observe(el));

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    
    const highlightNavigation = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    };

    window.addEventListener('scroll', highlightNavigation);

// Products dataset
const productsData = {
  construction: {
    name: "Construction Materials",
    products: [
      {
        name: "Portland Cement 50kg",
        price: "KSh 750",
        description: "High-grade Portland cement for all construction needs.",
        image: "data:image/jpeg;base64,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" 
      },
      {
        name: "River Sand (per tonne)",
        price: "KSh 2,500",
        description: "Clean washed river sand ideal for concrete mixing.",
        image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Machine Cut Stones",
        price: "KSh 3,200",
        description: "Uniform machine-cut stones for foundation work.",
        image: "https://images.unsplash.com/photo-1505842465776-3a6be01c384e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Clay Bricks (per 100)",
        price: "KSh 1,800",
        description: "Durable clay bricks for wall construction.",
        image: "https://images.unsplash.com/photo-1556131211-29ca94dbc29f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Concrete Blocks 6-inch",
        price: "KSh 85",
        description: "Standard 6-inch concrete blocks for building.",
        image: "https://images.unsplash.com/photo-1573387562559-0ff6153a801f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Ceramic Wall Tiles",
        price: "KSh 1,200",
        description: "Premium ceramic tiles for interior walls.",
        image: "https://images.unsplash.com/photo-1585944305779-66b3b7304b82?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Floor Tiles 60x60cm",
        price: "KSh 2,800",
        description: "Polished porcelain floor tiles.",
        image: "https://images.unsplash.com/photo-1582582494705-cde997fc410f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      }
    ]
  },

  metals: {
    name: "Metals & Steel",
    products: [
      {
        name: "Reinforcement Bars 12mm",
        price: "KSh 95",
        description: "High tensile steel reinforcement bars.",
        image: "https://images.unsplash.com/photo-1547772786-3a12ed24577b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Mild Steel Angle Iron",
        price: "KSh 280",
        description: "50x50mm mild steel angle iron.",
        image: "https://images.unsplash.com/photo-1560840534-daf1d0c4f09e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Galvanized Steel Pipes",
        price: "KSh 450",
        description: "1-inch galvanized steel water pipes.",
        image: "https://images.unsplash.com/photo-1523942839745-784687c00d23?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Mild Steel Sheets 3mm",
        price: "KSh 3,500",
        description: "4x8 feet mild steel sheets.",
        image: "https://images.unsplash.com/photo-1523958203904-cdcb402031fd?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Wire Mesh Welded",
        price: "KSh 1,200",
        description: "Welded wire mesh for concrete reinforcement.",
        image: "https://images.unsplash.com/photo-1565326176105-dc2033899e4f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Steel H-Beams 200mm",
        price: "KSh 15,800",
        description: "Structural steel H-beams for construction.",
        image: "https://images.unsplash.com/photo-1563453390474-8a15a31a1067?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      }
    ]
  },

  tools: {
    name: "Tools & Equipment",
    products: [
      {
        name: "Cordless Drill Set",
        price: "KSh 12,500",
        description: "18V cordless drill with multiple bits.",
        image: "https://images.unsplash.com/photo-1581091012184-4d3c92c49f53?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Angle Grinder 9-inch",
        price: "KSh 8,900",
        description: "Powerful angle grinder for cutting and grinding.",
        image: "https://images.unsplash.com/photo-1563189824-bcc9192c96b3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Hammer Set Professional",
        price: "KSh 3,200",
        description: "Set of claw, ball peen, and sledge hammers.",
        image: "https://images.unsplash.com/photo-1582582494705-cde997fc410f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Measuring Tape 10m",
        price: "KSh 850",
        description: "Heavy-duty measuring tape with magnetic tip.",
        image: "https://images.unsplash.com/photo-1571079950478-38275683078f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Circular Saw 7.25-inch",
        price: "KSh 15,600",
        description: "Professional circular saw for wood cutting.",
        image: "https://images.unsplash.com/photo-1584543738851-12c4250eabf1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Wrench Set Combination",
        price: "KSh 4,500",
        description: "Complete set of combination wrenches.",
        image: "https://images.unsplash.com/photo-1593169200435-b4e5bff2f3fa?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Spirit Level 60cm",
        price: "KSh 1,200",
        description: "Aluminum spirit level with 3 vials.",
        image: "https://images.unsplash.com/photo-1523480717988-3b3bdd4ed581?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      }
    ]
  },

  fasteners: {
    name: "Fasteners & Fittings",
    products: [
      {
        name: "Wire Nails 4-inch (5kg)",
        price: "KSh 650",
        description: "High-quality wire nails for general construction.",
        image: "https://images.unsplash.com/photo-1605195140394-e2809b367290?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Wood Screws Assorted",
        price: "KSh 450",
        description: "Assorted wood screws in various sizes.",
        image: "https://images.unsplash.com/photo-1593169200435-b4e5bff2f3fa?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Hex Bolts M12x100",
        price: "KSh 85",
        description: "Galvanized hex head bolts with nuts.",
        image: "https://images.unsplash.com/photo-1565182999564-812b23c0c30d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Flat Washers Set",
        price: "KSh 280",
        description: "Stainless steel flat washers assortment.",
        image: "https://images.unsplash.com/photo-1565182999564-812b23c0c30d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Wall Anchors Rawl Plugs",
        price: "KSh 320",
        description: "Plastic wall anchors for hollow walls.",
        image: "https://images.unsplash.com/photo-1581092918357-5d6e3c9969f2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Eye Hooks Heavy Duty",
        price: "KSh 150",
        description: "Galvanized eye hooks for hanging applications.",
        image: "https://images.unsplash.com/photo-1609206234978-b2a3e2d7bb15?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      }
    ]
  },

  building: {
    name: "Building Hardware",
    products: [
      {
        name: "Door Hinges 4-inch",
        price: "KSh 450",
        description: "Heavy-duty ball bearing door hinges.",
        image: "https://images.unsplash.com/photo-1595515106969-69b4ac45888d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Mortise Door Lock",
        price: "KSh 2,800",
        description: "Security mortise lock with keys.",
        image: "https://images.unsplash.com/photo-1606813901597-d7c3a171f548?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Door Handles Chrome",
        price: "KSh 1,200",
        description: "Polished chrome lever door handles.",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Cabinet Knobs Brass",
        price: "KSh 180",
        description: "Antique brass cabinet knobs.",
        image: "https://images.unsplash.com/photo-1565182999564-812b23c0c30d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Door Closer Hydraulic",
        price: "KSh 3,500",
        description: "Adjustable hydraulic door closer.",
        image: "https://images.unsplash.com/photo-1606813950922-ec25415205da?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Sliding Door Track",
        price: "KSh 2,200",
        description: "Aluminum sliding door track system.",
        image: "https://images.unsplash.com/photo-1606813950922-ec25415205da?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      }
    ]
  },

  electrical: {
    name: "Electrical Hardware",
    products: [
      {
        name: "Light Switches 2-Gang",
        price: "KSh 350",
        description: "Modern 2-gang light switches.",
        image: "https://images.unsplash.com/photo-1581093804475-577d72e38aa0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Power Socket 13A",
        price: "KSh 280",
        description: "Standard 13A power sockets with safety shutters.",
        image: "https://images.unsplash.com/photo-1588120835571-31572293085f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Electrical Cable 2.5mm",
        price: "KSh 45",
        description: "Twin and earth electrical cable per meter.",
        image: "https://images.unsplash.com/photo-1594736797933-d0b22fcb18be?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "MCB Circuit Breaker 20A",
        price: "KSh 850",
        description: "Miniature circuit breaker 20 amp.",
        image: "https://images.unsplash.com/photo-1594496682251-51590adcf2f9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Junction Box Plastic",
        price: "KSh 120",
        description: "Weatherproof plastic junction box.",
        image: "https://images.unsplash.com/photo-1594496682251-51590adcf2f9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "LED Bulb 12W",
        price: "KSh 250",
        description: "Energy-efficient LED bulb daylight.",
        image: "https://images.unsplash.com/photo-1565629975056-2e8d38d7e1eb?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Extension Cable 10m",
        price: "KSh 1,800",
        description: "Heavy-duty 10-meter extension cable.",
        image: "https://images.unsplash.com/photo-1594736797933-d0b22fcb18be?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      }
    ]
  },

  plumbing: {
    name: "Plumbing Hardware",
    products: [
      {
        name: "PVC Pipes 4-inch",
        price: "KSh 650",
        description: "PVC drainage pipes 4-inch diameter.",
        image: "https://images.unsplash.com/photo-1581092918357-5d6e3c9969f2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Elbow Fittings 90°",
        price: "KSh 85",
        description: "PVC 90-degree elbow fittings.",
        image: "https://images.unsplash.com/photo-1581092918357-5d6e3c9969f2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Ball Valve 1-inch",
        price: "KSh 450",
        description: "Brass ball valve with lever handle.",
        image: "https://images.unsplash.com/photo-1581092918357-5d6e3c9969f2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Kitchen Tap Mixer",
        price: "KSh 2,800",
        description: "Chrome kitchen mixer tap with swivel spout.",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Water Tank 1000L",
        price: "KSh 12,500",
        description: "Plastic water storage tank 1000 liters.",
        image: "https://images.unsplash.com/photo-1581092918357-5d6e3c9969f2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Pipe Wrench 18-inch",
        price: "KSh 1,200",
        description: "Heavy-duty pipe wrench for plumbing.",
        image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Toilet Flush Valve",
        price: "KSh 350",
        description: "Universal toilet flush valve mechanism.",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      }
    ]
  },

  safety: {
    name: "Safety Gear",
    products: [
      {
        name: "Safety Helmet White",
        price: "KSh 650",
        description: "Industrial safety helmet with adjustable strap.",
        image: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Work Gloves Leather",
        price: "KSh 280",
        description: "Genuine leather work gloves with wrist protection.",
        image: "https://images.unsplash.com/photo-1581093804475-577d72e38aa0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Safety Boots Steel Toe",
        price: "KSh 3,500",
        description: "Steel toe cap safety boots with slip resistance.",
        image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Safety Goggles Clear",
        price: "KSh 350",
        description: "Impact-resistant safety goggles with side shields.",
        image: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Reflective Safety Vest",
        price: "KSh 450",
        description: "High-visibility reflective safety vest.",
        image: "https://images.unsplash.com/photo-1595515106969-69b4ac45888d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Face Shield Full",
        price: "KSh 520",
        description: "Full face protection shield for grinding work.",
        image: "https://images.unsplash.com/photo-1581093804475-577d72e38aa0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      }
    ]
  },

  finishing: {
    name: "Finishing Materials",
    products: [
      {
        name: "Exterior Paint 20L",
        price: "KSh 3,800",
        description: "Weather-resistant exterior paint in white.",
        image: "https://images.unsplash.com/photo-1497935587233-22bc85796c29?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Primer Undercoat 4L",
        price: "KSh 1,200",
        description: "Universal primer for interior and exterior surfaces.",
        image: "https://images.unsplash.com/photo-1581093804475-577d72e38aa0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Wood Varnish Clear",
        price: "KSh 850",
        description: "High-gloss clear wood varnish for protection.",
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Silicone Sealant",
        price: "KSh 320",
        description: "Waterproof silicone sealant for bathrooms.",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Construction Adhesive",
        price: "KSh 450",
        description: "Heavy-duty construction adhesive for bonding.",
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Tile Grout 5kg",
        price: "KSh 680",
        description: "Waterproof tile grout in grey color.",
        image: "https://images.unsplash.com/photo-1581093804475-577d72e38aa0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      },
      {
        name: "Wall Filler 2kg",
        price: "KSh 380",
        description: "Ready-mix wall filler for crack repairs.",
        image: "https://images.unsplash.com/photo-1581092918357-5d6e3c9969f2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
      }
    ]
  }
};


    // Product Modal Functionality
    const modal = document.getElementById('productsModal');
    const modalTitle = document.getElementById('modalTitle');
    const productsGrid = document.getElementById('productsGrid');
    const closeModal = document.getElementById('closeModal');
    const modalBackdrop = document.querySelector('.modal-backdrop');

    // View Products buttons
    document.querySelectorAll('.view-products-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const category = this.getAttribute('data-category');
            showProducts(category);
        });
    });

    // Close modal functionality
    closeModal.addEventListener('click', hideModal);
    modalBackdrop.addEventListener('click', hideModal);

    // ESC key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            hideModal();
        }
    });

    function showProducts(category) {
        const categoryData = productsData[category];
        if (!categoryData) return;

        modalTitle.textContent = categoryData.name;
        
        // Clear previous products
        productsGrid.innerHTML = '';
        
        // Add products
        categoryData.products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-price">${product.price}</p>
                    <p class="product-description">${product.description}</p>
                    <a href="#need-help" class="btn btn-primary">Get Quote</a>
                </div>
            `;
            productsGrid.appendChild(productCard);
        });
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function hideModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Category card hover effects
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            showProducts(category);
        });
    });

    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Prevent zoom on double tap on mobile
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // Lazy loading for images
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('fade-in-up');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Stats counter animation
    const statsNumbers = document.querySelectorAll('.stat h3');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                const number = parseInt(text.replace(/\D/g, '')) || 0;
                
                if (number > 0) {
                    let current = 0;
                    const increment = number / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            target.textContent = text;
                            clearInterval(timer);
                        } else {
                            target.textContent = Math.floor(current) + text.replace(/\d+/, '');
                        }
                    }, 40);
                }
                statsObserver.unobserve(target);
            }
        });
    });

    statsNumbers.forEach(stat => statsObserver.observe(stat));

    // Add loading states for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.href && this.href.includes('#')) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Initialize tooltips for social media links
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization for scroll events
const debouncedScroll = debounce(() => {
    // Additional scroll optimizations can go here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Error handling for missing elements
function safeQuerySelector(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        console.warn(`Element not found: ${selector}`);
    }
    return element;
}

// Add error boundary for JavaScript errors
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Service worker registration for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment if you add a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}