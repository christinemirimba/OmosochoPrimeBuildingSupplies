// Product data with real images
const products = {
    construction: [
        {
            name: 'Premium Portland Cement',
            description: 'High-grade Portland cement for construction projects',
            image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400&h=300&fit=crop',
        },
        {
            name: 'Sand & Gravel',
            description: 'Quality sand and gravel for concrete mixing',
            image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
        },
        {
            name: 'Bricks & Blocks',
            description: 'Durable bricks and concrete blocks',
            image: 'https://images.unsplash.com/photo-1558618738-fbd97c5cd389?w=400&h=300&fit=crop',
        },
        {
            name: 'Concrete Mix',
            description: 'Ready-to-use concrete mix for various applications',
            image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop',
        },
        {
            name: 'Tiles',
            description: 'Floor and wall tiles for finishing',
            image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop',
        },
        {
            name: 'Plaster',
            description: 'High-quality plaster for smooth wall finishes',
            image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop',
        }
    ],
    metals: [
        {
            name: 'Reinforcement Bars (Rebar)',
            description: 'High-strength steel bars for reinforced concrete',
            image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=400&h=300&fit=crop',
        },
        {
            name: 'Steel Beams & Channels',
            description: 'Structural steel beams and channels',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        },
        {
            name: 'Pipes & Tubes',
            description: 'Steel pipes and tubes for construction',
            image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
        },
        {
            name: 'Sheets & Plates',
            description: 'Steel sheets and plates for various applications',
            image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop',
        },
        {
            name: 'Wire Mesh',
            description: 'Welded wire mesh for reinforcement',
            image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400&h=300&fit=crop',
        }
    ],
    tools: [
        {
            name: 'Hand Tools',
            description: 'Hammers, screwdrivers, wrenches, pliers',
            image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400&h=300&fit=crop',
        },
        {
            name: 'Power Tools',
            description: 'Drills, saws, grinders for professional use',
            image: 'https://images.unsplash.com/photo-1609475720857-a82de6b70dc4?w=400&h=300&fit=crop',
        },
        {
            name: 'Measuring Tools',
            description: 'Tape measures, levels, calipers',
            image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
        },
        {
            name: 'Cutting Tools',
            description: 'Blades, cutters, chisels for precision work',
            image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=300&fit=crop',
        }
    ],
    fasteners: [
        {
            name: 'Nails',
            description: 'Various types of nails for construction',
            image: 'https://images.unsplash.com/photo-1558618738-fbd97c5cd389?w=400&h=300&fit=crop',
        },
        {
            name: 'Screws',
            description: 'Different screws for various applications',
            image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
        },
        {
            name: 'Bolts & Nuts',
            description: 'Heavy-duty bolts and nuts',
            image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=400&h=300&fit=crop',
        },
        {
            name: 'Washers',
            description: 'Various washers for proper fastening',
            image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400&h=300&fit=crop',
        },
        {
            name: 'Anchors & Hooks',
            description: 'Wall anchors and mounting hooks',
            image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400&h=300&fit=crop',
        }
    ],
    hardware: [
        {
            name: 'Hinges',
            description: 'Door and cabinet hinges',
            image: 'https://images.unsplash.com/photo-1558618738-fbd97c5cd389?w=400&h=300&fit=crop',
        },
        {
            name: 'Locks & Latches',
            description: 'Security locks and door latches',
            image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400&h=300&fit=crop',
        },
        {
            name: 'Handles & Knobs',
            description: 'Door handles and cabinet knobs',
            image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
        },
        {
            name: 'Door Closers',
            description: 'Automatic door closing mechanisms',
            image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=400&h=300&fit=crop',
        },
        {
            name: 'Sliding Systems',
            description: 'Door and window sliding systems',
            image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400&h=300&fit=crop',
        }
    ],
    electrical: [
        {
            name: 'Switches & Sockets',
            description: 'Electrical switches and power sockets',
            image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop',
        },
        {
            name: 'Cables & Wires',
            description: 'Electrical cables and wiring',
            image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
        },
        {
            name: 'Circuit Breakers',
            description: 'Electrical circuit breakers and panels',
            image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=400&h=300&fit=crop',
        },
        {
            name: 'Electrical Boxes & Panels',
            description: 'Distribution boxes and electrical panels',
            image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop',
        },
        {
            name: 'Lighting Fixtures',
            description: 'Various lighting fixtures and fittings',
            image: 'https://images.unsplash.com/photo-1558618738-fbd97c5cd389?w=400&h=300&fit=crop',
        }
    ],
    plumbing: [
        {
            name: 'Pipes & Fittings',
            description: 'Water pipes and plumbing fittings',
            image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
        },
        {
            name: 'Valves',
            description: 'Water control valves and stoppers',
            image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=400&h=300&fit=crop',
        },
        {
            name: 'Taps & Faucets',
            description: 'Kitchen and bathroom taps',
            image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop',
        },
        {
            name: 'Water Tanks',
            description: 'Plastic and steel water storage tanks',
            image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400&h=300&fit=crop',
        },
        {
            name: 'Plumbing Tools',
            description: 'Specialized plumbing tools and equipment',
            image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400&h=300&fit=crop',
        }
    ],
    safety: [
        {
            name: 'Helmets & Hard Hats',
            description: 'Safety helmets and hard hats',
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
        },
        {
            name: 'Gloves',
            description: 'Protective work gloves',
            image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400&h=300&fit=crop',
        },
        {
            name: 'Safety Boots',
            description: 'Steel-toe safety boots',
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
        },
        {
            name: 'Goggles & Face Shields',
            description: 'Eye protection and face shields',
            image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400&h=300&fit=crop',
        },
        {
            name: 'Reflective Jackets',
            description: 'High-visibility safety jackets',
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
        }
    ],
    finishing: [
        {
            name: 'Paints & Primers',
            description: 'Interior and exterior paints',
            image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=300&fit=crop',
        },
        {
            name: 'Varnishes & Sealants',
            description: 'Wood varnishes and waterproof sealants',
            image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=300&fit=crop',
        },
        {
            name: 'Adhesives',
            description: 'Construction adhesives and bonding agents',
            image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400&h=300&fit=crop',
        },
        {
            name: 'Grout & Fillers',
            description: 'Tile grout and wall fillers',
            image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=300&fit=crop',
        }
    ]
};

// DOM elements
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const modal = document.getElementById('productsModal');
const modalTitle = document.getElementById('modalTitle');
const productsGrid = document.getElementById('productsGrid');
const scrollToTopBtn = document.getElementById('scrollToTop');

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
nav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        nav.classList.remove('active');
    }
});

// Smooth scrolling for navigation
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

function scrollToServices() {
    scrollToSection('services');
}

function scrollToContact() {
    scrollToSection('contact');
}

// Show products modal
function showProducts(category) {
    const categoryData = products[category];
    const categoryNames = {
        construction: 'Construction Materials',
        metals: 'Metals & Steel',
        tools: 'Tools & Equipment',
        fasteners: 'Fasteners & Fittings',
        hardware: 'Building Hardware',
        electrical: 'Electrical Hardware',
        plumbing: 'Plumbing Hardware',
        safety: 'Safety Gear',
        finishing: 'Finishing Materials'
    };

    modalTitle.textContent = categoryNames[category];
    
    productsGrid.innerHTML = categoryData.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
            </div>
        </div>
    `).join('');

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Contact functions
function sendEmail() {
    window.location.href = 'mailto:nikeombura@gmail.com?subject=Inquiry about Building Supplies&body=Hello, I would like to inquire about your building supplies.';
}

function makeCall() {
    window.location.href = 'tel:+254705621054';
}

function openLocation() {
    // Open Google Maps for Kisii, Nyamache, Kenya
    window.open('https://www.google.com/maps/search/Kisii,+Nyamache,+Kenya', '_blank');
}

// Form submission
function submitForm(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const name = formData.get('name') || event.target.querySelector('input[type="text"]').value;
    const email = formData.get('email') || event.target.querySelector('input[type="email"]').value;
    const phone = formData.get('phone') || event.target.querySelector('input[type="tel"]').value;
    const message = formData.get('message') || event.target.querySelector('textarea').value;
    
    // Create email body
    const emailBody = `Name: ${name}%0D%0AEmail: ${email}%0D%0APhone: ${phone}%0D%0AMessage: ${message}`;
    
    // Send email
    window.location.href = `mailto:nikeombura@gmail.com?subject=Contact Form Submission&body=${emailBody}`;
    
    // Reset form
    event.target.reset();
    
    alert('Thank you for your message! We will get back to you soon.');
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.pageYOffset > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'var(--white)';
        header.style.backdropFilter = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.category-card, .feature-card, .contact-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});