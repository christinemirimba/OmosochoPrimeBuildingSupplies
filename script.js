// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const getQuoteBtn = document.querySelector('.btn.btn-primary');
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

    // Close mobile menu when clicking the Get Quote button
    if (getQuoteBtn) {
      getQuoteBtn.addEventListener('click', function() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    }
    
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

    // Initialize business status
    updateBusinessStatus();
    updateFooterBusinessStatus();

    // Initialize Search Functionality
    initializeSearchFunctionality();

    // Initialize AI Project Assistant
    initializeAIProjectAssistant();
});

// =========================
// SEARCH FUNCTIONALITY
// =========================
function initializeSearchFunctionality() {
    const searchInput = document.getElementById('mainSearch');
    const searchButton = document.getElementById('searchButton');
    const categoryFilter = document.getElementById('categoryFilter');
    const brandFilter = document.getElementById('brandFilter');
    const sortResults = document.getElementById('sortResults');
    const resultsGrid = document.getElementById('resultsGrid');
    const resultsCount = document.getElementById('resultsCount');
    const noResults = document.getElementById('noResults');
    const clearSearch = document.getElementById('clearSearch');
    const quickTags = document.querySelectorAll('.quick-tag');

    let currentSearchTerm = '';
    let currentFilters = {
        category: '',
        brand: ''
    };

    // Search function
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        currentSearchTerm = searchTerm;
        
        const category = categoryFilter.value;
        const brand = brandFilter.value;
        const sort = sortResults.value;

        currentFilters = { category, brand };

        let filteredProducts = productsData.filter(product => {
            // Text search
            const matchesSearch = !searchTerm || 
                product.name.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm);
            
            // Category filter
            const matchesCategory = !category || product.category === category;
            
            // Brand filter (simplified - you'd need to add brand data to your products)
            const matchesBrand = !brand || 
                product.name.toLowerCase().includes(brand) ||
                (brand === 'crown' && product.name.toLowerCase().includes('paint')) ||
                (brand === 'simba' && product.name.toLowerCase().includes('cement'));
            
            return matchesSearch && matchesCategory && matchesBrand;
        });

        // Sort results
        filteredProducts = sortProducts(filteredProducts, sort);

        displaySearchResults(filteredProducts);
    }

    // Sort products
    function sortProducts(products, sortBy) {
        switch(sortBy) {
            case 'name':
                return products.sort((a, b) => a.name.localeCompare(b.name));
            case 'name-desc':
                return products.sort((a, b) => b.name.localeCompare(a.name));
            default: // relevance
                return products;
        }
    }

    // Display search results
    function displaySearchResults(products) {
        resultsGrid.innerHTML = '';
        
        if (products.length === 0) {
            noResults.style.display = 'block';
            resultsCount.textContent = 'No products found';
            return;
        }
        
        noResults.style.display = 'none';
        resultsCount.textContent = `${products.length} products found`;
        
        products.forEach(product => {
            const productCard = createProductCard(product);
            resultsGrid.appendChild(productCard);
        });
    }

    // Create product card for search results
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'search-product-card';
        
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="search-product-image" loading="lazy">
            <span class="search-product-category">${product.category}</span>
            <h4>${product.name}</h4>
            <div class="search-product-actions">
                <button class="btn btn-primary" onclick="showProductDetail('${product.id}')">View Details</button>
                <button class="btn btn-secondary" onclick="requestQuote('${product.id}')">Get Quote</button>
            </div>
        `;
        
        return card;
    }

    // Event listeners
    searchInput.addEventListener('input', function() {
        if (this.value.trim().length >= 2) {
            performSearch();
        } else if (this.value.trim().length === 0) {
            clearSearchResults();
        }
    });

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    searchButton.addEventListener('click', performSearch);

    // Filter change events
    [categoryFilter, brandFilter, sortResults].forEach(filter => {
        filter.addEventListener('change', performSearch);
    });

    // Quick search tags
    quickTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const searchTerm = this.getAttribute('data-search');
            searchInput.value = searchTerm;
            performSearch();
            
            // Scroll to results
            document.querySelector('.search-results').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    });

    // Clear search
    clearSearch.addEventListener('click', function() {
        searchInput.value = '';
        categoryFilter.value = '';
        brandFilter.value = '';
        sortResults.value = 'relevance';
        clearSearchResults();
    });

    function clearSearchResults() {
        resultsGrid.innerHTML = '';
        resultsCount.textContent = 'Search Results';
        noResults.style.display = 'none';
    }
}

// =========================
// AI PROJECT PLANNING ASSISTANT
// =========================
class AIProjectPlanner {
    constructor() {
        this.projectTemplates = {
            'small-house': {
                name: 'Small House (1-2 bedroom)',
                materials: [
                    { id: 1, name: 'Cement Bag (50kg)', quantity: '80-100 bags', category: 'Construction' },
                    { id: 41, name: 'Timber Planks', quantity: '150-200 pieces', category: 'Building' },
                    { id: 11, name: 'Steel Rods (16mm)', quantity: '40-60 pieces', category: 'Metals' },
                    { id: 44, name: 'Roofing Tiles', quantity: '800-1000 pieces', category: 'Building' },
                    { id: 51, name: 'LED Bulb', quantity: '15-20 units', category: 'Electrical' },
                    { id: 61, name: 'PVC Pipe (3m)', quantity: '20-30 pieces', category: 'Plumbing' },
                    { id: 81, name: 'Wall Paint (5L)', quantity: '8-12 cans', category: 'Finishing' }
                ]
            },
            'medium-house': {
                name: 'Medium House (3-4 bedroom)',
                materials: [
                    { id: 1, name: 'Cement Bag (50kg)', quantity: '150-200 bags', category: 'Construction' },
                    { id: 41, name: 'Timber Planks', quantity: '300-400 pieces', category: 'Building' },
                    { id: 11, name: 'Steel Rods (16mm)', quantity: '80-120 pieces', category: 'Metals' },
                    { id: 44, name: 'Roofing Tiles', quantity: '1500-2000 pieces', category: 'Building' },
                    { id: 51, name: 'LED Bulb', quantity: '25-35 units', category: 'Electrical' },
                    { id: 61, name: 'PVC Pipe (3m)', quantity: '40-60 pieces', category: 'Plumbing' },
                    { id: 81, name: 'Wall Paint (5L)', quantity: '15-20 cans', category: 'Finishing' }
                ]
            },
            'large-house': {
                name: 'Large House (5+ bedroom)',
                materials: [
                    { id: 1, name: 'Cement Bag (50kg)', quantity: '250-350 bags', category: 'Construction' },
                    { id: 41, name: 'Timber Planks', quantity: '500-700 pieces', category: 'Building' },
                    { id: 11, name: 'Steel Rods (16mm)', quantity: '150-200 pieces', category: 'Metals' },
                    { id: 44, name: 'Roofing Tiles', quantity: '2500-3500 pieces', category: 'Building' },
                    { id: 51, name: 'LED Bulb', quantity: '40-60 units', category: 'Electrical' },
                    { id: 61, name: 'PVC Pipe (3m)', quantity: '70-100 pieces', category: 'Plumbing' },
                    { id: 81, name: 'Wall Paint (5L)', quantity: '25-35 cans', category: 'Finishing' }
                ]
            },
            'shop': {
                name: 'Commercial Shop',
                materials: [
                    { id: 1, name: 'Cement Bag (50kg)', quantity: '50-80 bags', category: 'Construction' },
                    { id: 41, name: 'Timber Planks', quantity: '100-150 pieces', category: 'Building' },
                    { id: 51, name: 'LED Bulb', quantity: '10-15 units', category: 'Electrical' },
                    { id: 55, name: 'Wall Socket', quantity: '8-12 units', category: 'Electrical' },
                    { id: 81, name: 'Wall Paint (5L)', quantity: '4-6 cans', category: 'Finishing' }
                ]
            },
            'school': {
                name: 'School Building',
                materials: [
                    { id: 1, name: 'Cement Bag (50kg)', quantity: '300-500 bags', category: 'Construction' },
                    { id: 41, name: 'Timber Planks', quantity: '500-800 pieces', category: 'Building' },
                    { id: 11, name: 'Steel Rods (16mm)', quantity: '200-300 pieces', category: 'Metals' },
                    { id: 51, name: 'LED Bulb', quantity: '50-80 units', category: 'Electrical' },
                    { id: 81, name: 'Wall Paint (5L)', quantity: '20-30 cans', category: 'Finishing' }
                ]
            },
            'renovation': {
                name: 'Home Renovation',
                materials: [
                    { id: 81, name: 'Wall Paint (5L)', quantity: '5-10 cans', category: 'Finishing' },
                    { id: 82, name: 'Wall Tiles', quantity: '200-400 pieces', category: 'Finishing' },
                    { id: 41, name: 'Timber Planks', quantity: '50-100 pieces', category: 'Building' },
                    { id: 51, name: 'LED Bulb', quantity: '10-20 units', category: 'Electrical' },
                    { id: 31, name: 'Wood Screws (100pcs)', quantity: '5-10 packs', category: 'Fasteners' }
                ]
            },
            'fence': {
                name: 'Fence/Wall Construction',
                materials: [
                    { id: 1, name: 'Cement Bag (50kg)', quantity: '30-50 bags', category: 'Construction' },
                    { id: 11, name: 'Steel Rods (16mm)', quantity: '20-40 pieces', category: 'Metals' },
                    { id: 19, name: 'Corrugated Iron Sheets', quantity: '50-100 sheets', category: 'Metals' },
                    { id: 15, name: 'Nails (1kg)', quantity: '5-10 kg', category: 'Metals' }
                ]
            },
            'roofing': {
                name: 'Roofing Project',
                materials: [
                    { id: 44, name: 'Roofing Tiles', quantity: '500-1000 pieces', category: 'Building' },
                    { id: 41, name: 'Timber Planks', quantity: '100-200 pieces', category: 'Building' },
                    { id: 15, name: 'Nails (1kg)', quantity: '3-5 kg', category: 'Metals' },
                    { id: 49, name: 'Roofing Felt', quantity: '2-4 rolls', category: 'Building' }
                ]
            }
        };
    }

    generateMaterialPlan(projectType, size, description) {
        const template = this.projectTemplates[projectType];
        if (!template) return null;

        // AI logic to adjust quantities based on size and description
        let adjustedMaterials = template.materials.map(material => {
            let adjustedQuantity = material.quantity;
            
            // Simple AI adjustment based on project size
            if (size) {
                const baseSize = projectType === 'small-house' ? 1000 : 
                                projectType === 'medium-house' ? 2000 : 
                                projectType === 'large-house' ? 3000 : 500;
                const sizeFactor = size / baseSize;
                
                // Adjust quantity based on size factor
                if (material.category === 'Construction') {
                    adjustedQuantity = this.adjustQuantity(material.quantity, sizeFactor * 1.2);
                } else if (material.category === 'Building') {
                    adjustedQuantity = this.adjustQuantity(material.quantity, sizeFactor * 1.1);
                } else {
                    adjustedQuantity = this.adjustQuantity(material.quantity, sizeFactor);
                }
            }

            // AI analysis of description for additional requirements
            if (description) {
                const desc = description.toLowerCase();
                if (desc.includes('modern') && material.category === 'Finishing') {
                    adjustedQuantity = this.adjustQuantity(adjustedQuantity, 1.3);
                }
                if (desc.includes('affordable') && material.category === 'Construction') {
                    adjustedQuantity = this.adjustQuantity(adjustedQuantity, 0.9);
                }
                if (desc.includes('luxury') && material.category === 'Finishing') {
                    adjustedQuantity = this.adjustQuantity(adjustedQuantity, 1.5);
                }
            }

            return {
                ...material,
                quantity: adjustedQuantity
            };
        });

        return {
            projectName: template.name,
            materials: adjustedMaterials,
            size: size,
            description: description
        };
    }

    adjustQuantity(quantity, factor) {
        // Simple quantity adjustment logic
        const range = quantity.split('-');
        if (range.length === 2) {
            const min = parseInt(range[0]);
            const max = parseInt(range[1]);
            const adjustedMin = Math.round(min * factor);
            const adjustedMax = Math.round(max * factor);
            return `${adjustedMin}-${adjustedMax}`;
        }
        return quantity;
    }

    predictDemand(projectPlan) {
        // AI demand prediction based on project type and materials
        const baseDemand = projectPlan.materials.reduce((total, material) => {
            const range = material.quantity.split('-');
            const avgQuantity = range.length === 2 ? 
                (parseInt(range[0]) + parseInt(range[1])) / 2 : parseInt(material.quantity);
            return total + avgQuantity;
        }, 0);

        const predictedDemand = Math.round(baseDemand * 0.1); // 10% of project size as monthly demand
        const wasteReduction = Math.round((1 - (predictedDemand / (baseDemand * 0.2))) * 100); // Calculate waste reduction
        const supplyOptimization = Math.min(95, Math.round(wasteReduction * 1.2));

        return {
            predictedDemand,
            wasteReduction: Math.max(0, wasteReduction),
            supplyOptimization: Math.max(0, supplyOptimization)
        };
    }
}

function initializeAIProjectAssistant() {
    const aiPlanner = new AIProjectPlanner();
    const generatePlanBtn = document.getElementById('generatePlan');
    const aiResults = document.getElementById('aiResults');
    const materialsList = document.getElementById('materialsList');
    const demandPrediction = document.getElementById('demandPrediction');
    const savePlanBtn = document.getElementById('savePlan');
    const getQuoteAllBtn = document.getElementById('getQuoteAll');

    generatePlanBtn.addEventListener('click', function() {
        const projectType = document.getElementById('projectType').value;
        const projectSize = document.getElementById('projectSize').value;
        const projectDescription = document.getElementById('projectDescription').value;

        if (!projectType) {
            alert('Please select a project type');
            return;
        }

        // Generate AI material plan
        const plan = aiPlanner.generateMaterialPlan(projectType, projectSize, projectDescription);
        
        if (plan) {
            displayMaterialPlan(plan);
            
            // Generate demand predictions
            const predictions = aiPlanner.predictDemand(plan);
            displayDemandPredictions(predictions);
            
            // Show results sections
            aiResults.style.display = 'block';
            demandPrediction.style.display = 'block';
            
            // Scroll to results
            aiResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    function displayMaterialPlan(plan) {
        materialsList.innerHTML = '';
        
        plan.materials.forEach(material => {
            const materialItem = document.createElement('div');
            materialItem.className = 'material-item';
            materialItem.innerHTML = `
                <div class="material-info">
                    <h4>${material.name}</h4>
                    <p>${material.category}</p>
                </div>
                <div class="material-quantity">${material.quantity}</div>
            `;
            materialsList.appendChild(materialItem);
        });
    }

    function displayDemandPredictions(predictions) {
        document.getElementById('predictedDemand').textContent = predictions.predictedDemand;
        document.getElementById('wasteReduction').textContent = predictions.wasteReduction + '%';
        document.getElementById('supplyOptimization').textContent = predictions.supplyOptimization + '%';
    }

    savePlanBtn.addEventListener('click', function() {
        // Save plan to localStorage
        const plan = {
            projectType: document.getElementById('projectType').value,
            size: document.getElementById('projectSize').value,
            description: document.getElementById('projectDescription').value,
            timestamp: new Date().toISOString()
        };
        
        const savedPlans = JSON.parse(localStorage.getItem('savedPlans') || '[]');
        savedPlans.push(plan);
        localStorage.setItem('savedPlans', JSON.stringify(savedPlans));
        
        alert('Project plan saved successfully!');
    });

    getQuoteAllBtn.addEventListener('click', function() {
        // Redirect to contact form with project details
        const projectType = document.getElementById('projectType').value;
        const projectSize = document.getElementById('projectSize').value;
        
        localStorage.setItem('quoteProject', JSON.stringify({
            type: projectType,
            size: projectSize,
            isAIRecommended: true
        }));
        
        window.location.href = '#need-help';
    });
}

// =========================
// GLOBAL FUNCTIONS
// =========================

// Product detail function
window.showProductDetail = function(productId) {
    const product = productsData.find(p => p.id == productId);
    if (product) {
        // You can reuse your existing modal functionality here
        // For now, show a simple detail view
        const modalContent = `
            <div class="product-detail-modal">
                <img src="${product.image}" alt="${product.name}" style="width: 100%; max-height: 300px; object-fit: cover; border-radius: 8px; margin-bottom: 20px;">
                <h3>${product.name}</h3>
                <p><strong>Category:</strong> ${product.category}</p>
                <p>Contact us for pricing and availability</p>
                <button class="btn btn-primary" onclick="requestQuote('${product.id}')">Request Quote</button>
            </div>
        `;
        
        // Simple alert for now - you can integrate with your existing modal system
        alert(`Product: ${product.name}\nCategory: ${product.category}\n\nContact us for pricing and availability!`);
    }
};

// Quote request function
window.requestQuote = function(productId) {
    const product = productsData.find(p => p.id == productId);
    if (product) {
        // Redirect to contact form and pre-fill product info
        window.location.href = '#need-help';
        
        // You can store the product info to pre-fill the contact form
        localStorage.setItem('quoteProduct', JSON.stringify({
            id: product.id,
            name: product.name,
            category: product.category
        }));
    }
};

// =========================
// EXISTING FUNCTIONALITY (KEEP ALL YOUR ORIGINAL CODE BELOW)
// =========================

// products dataset
const productsData = [
  // ... [KEEP YOUR EXISTING PRODUCTS DATA EXACTLY AS IS] ...
  // Construction (10)
  {
    id: 1,
    name: "Cement Bag (50kg)",
    category: "Construction",
    image: "https://pioneerhardwares.com/wp-content/uploads/2023/09/Simba-Cement-32.5R-1.webp"
  },
  // ... [REST OF YOUR PRODUCTS DATA] ...
];

// Product Slider Functionality
const modal = document.getElementById('productsModal');
const modalTitle = document.getElementById('modalTitle');
const productsGrid = document.getElementById('productsGrid');
const closeModal = document.getElementById('closeModal');
const modalBackdrop = document.querySelector('.modal-backdrop');

// Slider state
let currentSlide = 0;
let autoSlideInterval;
let isAutoSlideEnabled = true;
let currentProducts = [];
let temporaryPauseTimeout;
let isDragging = false;
let startX = 0;
let currentX = 0;

// View Products buttons
document.querySelectorAll('.view-products-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const category = this.getAttribute('data-category');
        showProducts(category);
    });
});

// Category card click effects
const categoryCards = document.querySelectorAll('.category-card');
categoryCards.forEach(card => {
    card.addEventListener('click', function() {
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
    // Filter products by category (case-insensitive)
    const filteredProducts = productsData.filter(
        product => product.category.toLowerCase() === category.toLowerCase()
    );

    if (!filteredProducts.length) return;

    currentProducts = filteredProducts;
    modalTitle.textContent = category + " Products";

    // Clear previous products
    productsGrid.innerHTML = '';

    // Create slider structure using data from the products dataset
    const sliderHTML = `
        <div class="slider-container">
            <div class="slider-track">
                ${filteredProducts.map((product, index) => `
                    <div class="slide" data-slide="${index}">
                        <img src="${product.image}" alt="${product.name}" class="slide-image" loading="lazy">
                        <div class="slide-content">
                            <h3>${product.name}</h3>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="auto-slide-indicator">
                <span>Auto-slide</span>
                <div class="auto-slide-toggle ${isAutoSlideEnabled ? 'active' : ''}" id="autoSlideToggle"></div>
            </div>
            
            <div class="slider-nav">
                <button class="slider-prev" id="sliderPrev">‹</button>
                <a href="#need-help" class="btn btn-primary quote-btn-nav" id="quoteBtn">Get Quote</a>
                <button class="slider-next" id="sliderNext">›</button>
            </div>
            
            <div class="slider-info">
                <span class="slide-counter" id="slideCounter">1 / ${filteredProducts.length}</span>
                <div class="slider-dots" id="sliderDots">
                    ${filteredProducts.map((_, index) => `
                        <div class="slider-dot ${index === 0 ? 'active' : ''}" data-slide="${index}"></div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    productsGrid.innerHTML = sliderHTML;
    
    // Add slider mode classes
    const modalContent = modal.querySelector('.modal-content');
    const modalBody = modal.querySelector('.modal-body');
    
    if (modalContent) modalContent.classList.add('slider-mode');
    if (modalBody) modalBody.classList.add('slider-mode');
    
    // Initialize slider
    initSlider();
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add event listener to quote button in navigation
    const quoteBtn = document.getElementById('quoteBtn');
    if (quoteBtn) {
        quoteBtn.addEventListener('click', function(e) {
            e.preventDefault();
            hideModal();
            
            // Scroll to need help section
            setTimeout(() => {
                const needHelpSection = document.querySelector('#need-help');
                if (needHelpSection) {
                    const offsetTop = needHelpSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }, 300);
        });
    }
}

function initSlider() {
    // ... [KEEP ALL YOUR EXISTING SLIDER FUNCTIONS EXACTLY AS IS] ...
    currentSlide = 0;
    updateSlider();
    
    // Set up event listeners with proper error handling
    const sliderPrev = document.getElementById('sliderPrev');
    const sliderNext = document.getElementById('sliderNext');
    // ... [REST OF YOUR SLIDER CODE] ...
}

// ... [KEEP ALL YOUR EXISTING SLIDER HELPER FUNCTIONS] ...
function setupManualNavigation(sliderTrack) {
    // ... [KEEP EXISTING CODE] ...
}

function handleMouseDown(e) {
    // ... [KEEP EXISTING CODE] ...
}

// ... [CONTINUE WITH ALL YOUR EXISTING FUNCTIONS] ...

// Business Hours Status Function
function updateBusinessStatus() {
    const statusElement = document.getElementById('business-status');
    const timeElement = document.getElementById('current-time-eat');
    
    if (!statusElement || !timeElement) return;
    
    // Get current time in East African Time (EAT)
    const now = new Date();
    
    // Convert to EAT (UTC+3)
    const eatOffset = 3 * 60; // EAT is UTC+3
    const localOffset = now.getTimezoneOffset();
    const eatTime = new Date(now.getTime() + (eatOffset + localOffset) * 60000);
    
    const hours = eatTime.getHours();
    const minutes = eatTime.getMinutes();
    
    // Format time for display
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    timeElement.textContent = `Current EAT: ${formattedTime}`;
    
    // Check if it's a weekend
    const dayOfWeek = eatTime.getDay(); // 0 = Sunday, 6 = Saturday
    
    let status = '';
    let statusClass = '';
    
    if (dayOfWeek === 6) { // Saturday
        status = 'Closed';
        statusClass = 'closed';
    } else if (dayOfWeek === 0) { // Sunday
        if (hours >= 8 && hours < 16) {
            status = 'Open';
            statusClass = 'open';
        } else if (hours >= 16 && hours < 18) {
            status = 'Almost Closing';
            statusClass = 'almost-closing';
        } else {
            status = 'Closed';
            statusClass = 'closed';
        }
    } else { // Weekdays (Monday to Friday)
        if (hours >= 8 && hours < 16) {
            status = 'Open';
            statusClass = 'open';
        } else if (hours >= 16 && hours < 18) {
            status = 'Almost Closing';
            statusClass = 'almost-closing';
        } else {
            status = 'Closed';
            statusClass = 'closed';
        }
    }
    
    // Update the status element
    statusElement.textContent = status;
    statusElement.className = 'business-status ' + statusClass;
    
    // Update every minute
    setTimeout(updateBusinessStatus, 60000);
}

// Update footer business status
function updateFooterBusinessStatus() {
    const footerStatusElement = document.getElementById('footer-business-status');
    
    if (!footerStatusElement) return;
    
    // Get current time in East African Time (EAT)
    const now = new Date();
    const eatOffset = 3 * 60;
    const localOffset = now.getTimezoneOffset();
    const eatTime = new Date(now.getTime() + (eatOffset + localOffset) * 60000);
    
    const hours = eatTime.getHours();
    const dayOfWeek = eatTime.getDay();
    
    let status = '';
    let statusClass = '';
    
    if (dayOfWeek === 6) {
        status = 'Closed';
        statusClass = 'closed';
    } else if (dayOfWeek === 0) {
        if (hours >= 8 && hours < 16) {
            status = 'Open';
            statusClass = 'open';
        } else if (hours >= 16 && hours < 18) {
            status = 'Almost Closing';
            statusClass = 'almost-closing';
        } else {
            status = 'Closed';
            statusClass = 'closed';
        }
    } else {
        if (hours >= 8 && hours < 16) {
            status = 'Open';
            statusClass = 'open';
        } else if (hours >= 16 && hours < 18) {
            status = 'Almost Closing';
            statusClass = 'almost-closing';
        } else {
            status = 'Closed';
            statusClass = 'closed';
        }
    }
    
    footerStatusElement.textContent = status;
    footerStatusElement.className = 'business-status ' + statusClass;
    
    setTimeout(updateFooterBusinessStatus, 60000);
}

// ... [KEEP ALL YOUR EXISTING UTILITY FUNCTIONS AT THE END] ...

// Services section 
// Simple services initialization
document.addEventListener('DOMContentLoaded', function() {
    const servicesGrid = document.querySelector('.services-grid');
    const container = document.querySelector('.services-slider-container');
    
    if (servicesGrid && container) {
        // Pause on hover
        container.addEventListener('mouseenter', function() {
            servicesGrid.style.animationPlayState = 'paused';
        });
        
        container.addEventListener('mouseleave', function() {
            servicesGrid.style.animationPlayState = 'running';
        });
        
        // Pause on touch
        container.addEventListener('touchstart', function() {
            servicesGrid.style.animationPlayState = 'paused';
        });
        
        container.addEventListener('touchend', function() {
            setTimeout(() => {
                servicesGrid.style.animationPlayState = 'running';
            }, 1000);
        });
    }
});

//Trusted Brands section
// Continuous scrolling for Trusted Brands
const brandsGrid = document.querySelector('.brands-grid');
const brandsContainer = document.querySelector('.brands-slider-container');

// Remove the old slider functionality and keep only hover effects
if (brandsContainer) {
    // Pause animation on hover for better UX
    brandsContainer.addEventListener('mouseenter', () => {
        brandsGrid.style.animationPlayState = 'paused';
    });
    
    brandsContainer.addEventListener('mouseleave', () => {
        brandsGrid.style.animationPlayState = 'running';
    });
    
    // Optional: Reset animation to prevent long pauses
    brandsGrid.addEventListener('animationiteration', () => {
        // This ensures smooth continuous looping
    });
}

// Keyboard navigation support for mobile menu
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (navToggle) {
            navToggle.classList.remove('active');
        }
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

//Our Proven Track Record section
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