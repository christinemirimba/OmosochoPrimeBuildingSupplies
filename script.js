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
        image: "https://images.unsplash.com/photo-1598899145503-5ec3e03c33cd?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=400"
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