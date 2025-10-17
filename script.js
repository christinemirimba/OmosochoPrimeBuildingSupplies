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

    // Initialize AI Project Planning Assistant
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
                (product.description && product.description.toLowerCase().includes(searchTerm)) ||
                (product.brand && product.brand.toLowerCase().includes(searchTerm)) ||
                product.category.toLowerCase().includes(searchTerm);
            
            // Category filter
            const matchesCategory = !category || product.category === category;
            
            // Brand filter (using actual brand data)
            const matchesBrand = !brand || 
                (product.brand && product.brand.toLowerCase().includes(brand.toLowerCase()));
            
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
        
        // Add brand information if available
        const brandInfo = product.brand ? `<div class="search-product-brand">${product.brand}</div>` : '';
        
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="search-product-image" loading="lazy">
            <span class="search-product-category">${product.category}</span>
            ${brandInfo}
            <h4>${product.name}</h4>
            <div class="search-product-actions">
            <a href="#need-help" class="btn btn-primary quote-btn-nav">Get Quote</a>
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
// PRODUCT DETAILS FUNCTIONALITY
// =========================

function showProductDetail(productId) {
    // Find the product in the dataset
    const product = productsData.find(p => p.id == productId);
    
    if (!product) {
        alert('Product not found!');
        return;
    }

    // Populate modal with product data
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductImage').src = product.image;
    document.getElementById('modalProductImage').alt = product.name;
    document.getElementById('modalProductCategory').textContent = product.category;
    document.getElementById('modalProductId').textContent = product.id;
    
    // Populate brand (if available)
    const brandElement = document.getElementById('modalProductBrand');
    if (product.brand) {
        brandElement.textContent = `Brand: ${product.brand}`;
        brandElement.style.display = 'block';
    } else {
        brandElement.style.display = 'none';
    }
    
    // Populate description (if available)
    const descriptionElement = document.getElementById('modalProductDescription');
    if (product.description) {
        descriptionElement.textContent = product.description;
    } else {
        descriptionElement.textContent = 'No description available for this product.';
    }
    
    // Show the modal
    const modal = document.getElementById('productDetailModal');
    modal.style.display = 'block';
    
    // Setup modal buttons
    setupModalButtons(product);
}

function setupModalButtons(product) {
    // Get Quote button
    const quoteBtn = document.querySelector('.get-quote-btn');
    quoteBtn.onclick = function() {
        alert(`Quote request for ${product.name} (${product.brand || 'No brand'}) has been sent! We'll contact you shortly.`);
    };
    
    // Contact Supplier button
    const contactBtn = document.querySelector('.contact-supplier-btn');
    contactBtn.onclick = function() {
        const supplier = product.brand || 'our supplier';
        alert(`Connecting you with ${supplier} for ${product.name}...`);
    };
}

// Close modal functionality
function setupModalClose() {
    const modal = document.getElementById('productDetailModal');
    const closeBtn = document.querySelector('.close-modal');
    
    // Close button click
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };
    
    // Click outside modal to close
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
    
    // Close on Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            modal.style.display = 'none';
        }
    });
}




// =========================
// AI PROJECT PLANNING ASSISTANT - GEMINI AI POWERED
// =========================
function initializeAIProjectAssistant() {
    console.log("🔧 AI Assistant initializing with Gemini AI...");
    
    // Get all elements
    const generatePlanButton = document.getElementById('generatePlan');
    const generatePlanText = document.getElementById('generatePlanText');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const projectType = document.getElementById('projectType');
    const projectSize = document.getElementById('projectSize');
    const additionalDetails = document.getElementById('additionalDetails'); 
    const planError = document.getElementById('planError');
    const chatHistory = document.getElementById('chatHistory');
    const initialGreetingTime = document.getElementById('initialGreetingTime');
    const chatInput = document.getElementById('chatInput');
    const sendChatButton = document.getElementById('sendChatButton');
    const chatInputContainer = document.getElementById('chatInputContainer');

    // Debug: Check if all elements exist
    console.log("✅ Elements found:", {
        generatePlanButton: !!generatePlanButton,
        projectType: !!projectType,
        projectSize: !!projectSize,
        additionalDetails: !!additionalDetails,
        planError: !!planError,
        chatHistory: !!chatHistory,
        chatInput: !!chatInput,
        sendChatButton: !!sendChatButton
    });

    // If critical elements are missing, stop initialization
    if (!generatePlanButton || !projectType || !projectSize || !additionalDetails) {
        console.error("❌ Critical elements missing! Check HTML IDs.");
        return;
    }

    // Global state
    let projectContext = "";
    let isChatLoading = false;
    let conversationHistory = [];
    let isBackendReady = false;
    let connectionCheckAttempts = 0;
    const MAX_CONNECTION_ATTEMPTS = 3;
    
    // Request tracking to prevent duplicates
    let lastRequestId = null;
    let lastUserMessage = "";
    let isGeneratingPlan = false;

    // Backend API URL
    const API_BASE_URL = 'http://localhost:8001';

    // Generate unique request ID
    function generateRequestId(message) {
        return 'req_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Enhanced connection checking function
    async function checkBackendConnection() {
        if (connectionCheckAttempts >= MAX_CONNECTION_ATTEMPTS) {
            console.log("🔴 Max connection attempts reached");
            showConnectionError("Backend service unavailable. Please make sure the server is running on port 8001.");
            return;
        }

        connectionCheckAttempts++;
        console.log(`🌐 Checking backend connection (attempt ${connectionCheckAttempts})...`);
        
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);

            const response = await fetch(`${API_BASE_URL}/health`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            console.log("📡 Health check response status:", response.status);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            isBackendReady = data.model_ready;
            
            console.log("🔍 Backend health check:", data);
            
            if (!isBackendReady) {
                showConnectionError("AI service is currently being configured. Please try again later.");
            } else {
                hideConnectionError();
                console.log("✅ Backend connection established and Gemini AI is ready");
                connectionCheckAttempts = 0; // Reset on success
                
                // Update UI to show Gemini AI is ready
                updateAIStatusIndicator(true);
            }
        } catch (error) {
            console.error("❌ Backend connection failed:", error);
            isBackendReady = false;
            
            let errorMessage = "Backend server not found. ";
            
            if (error.name === 'AbortError') {
                errorMessage += "Request timed out. ";
            }
            
            errorMessage += "Please make sure the backend server is running on port 8001.";
            
            showConnectionError(errorMessage);
            updateAIStatusIndicator(false);
            
            // Retry after delay if under max attempts
            if (connectionCheckAttempts < MAX_CONNECTION_ATTEMPTS) {
                console.log(`🔄 Retrying connection in 3 seconds... (${connectionCheckAttempts}/${MAX_CONNECTION_ATTEMPTS})`);
                setTimeout(checkBackendConnection, 3000);
            }
        }
    }

    function updateAIStatusIndicator(isReady) {
        const poweredByElement = document.querySelector('.main-header > div:last-child');
        if (poweredByElement) {
            if (isReady) {
                poweredByElement.innerHTML = `
                    <span class="flex items-center gap-1">
                        <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Powered by Gemini AI
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 ml-1">
                            <path d="M12 17.77l-4.22 2.22l-.78-4.71l-3.23-3.15l4.31-.62l1.93-4.27l1.93 4.27l4.31.62l-3.23 3.15l-.78 4.71z"/>
                        </svg>
                    </span>
                `;
            } else {
                poweredByElement.innerHTML = `
                    <span class="flex items-center gap-1 text-yellow-500">
                        <span class="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                        Connecting to Gemini AI...
                    </span>
                `;
            }
        }
    }

    function showConnectionError(message) {
        console.log("⚠️ Showing connection error:", message);
        if (planError) {
            planError.textContent = message;
            planError.classList.remove('hidden');
        }
        if (generatePlanButton) {
            generatePlanButton.disabled = true;
            generatePlanButton.classList.add('opacity-50');
        }
        // Keep chat input enabled but show it's not functional
        if (chatInput) {
            chatInput.disabled = true;
            chatInput.placeholder = "AI service unavailable...";
        }
        if (sendChatButton) sendChatButton.disabled = true;
        
        updateAIStatusIndicator(false);
    }

    function hideConnectionError() {
        console.log("🔓 Hiding connection error");
        if (planError) planError.classList.add('hidden');
        if (generatePlanButton) {
            generatePlanButton.disabled = false;
            generatePlanButton.classList.remove('opacity-50');
        }
        // Enable chat input when backend is ready
        if (chatInput) {
            chatInput.disabled = false;
            chatInput.placeholder = "Ask anything about your project...";
        }
        if (sendChatButton) sendChatButton.disabled = false;
    }

    // Utility Functions
    function appendMessage(content, role, requestId = null) {
        console.log("💬 Appending message:", { role, content: content.substring(0, 50) + "...", requestId });
        
        if (!chatHistory) {
            console.error("❌ chatHistory element not found!");
            return;
        }

        const bubble = document.createElement('div');
        const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
        
        bubble.className = role === 'ai' ? 'ai-chat-bubble' : 'user-chat-bubble';
        
        // Add request ID as data attribute for debugging
        if (requestId) {
            bubble.setAttribute('data-request-id', requestId);
        }
        
        let htmlContent = content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');

        let header = '';
        if (role === 'ai') {
            header = `
                <div class="flex items-center gap-2 mb-2 text-blue-800 font-semibold">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 17.77l-4.22 2.22l-.78-4.71l-3.23-3.15l4.31-.62l1.93-4.27l1.93 4.27l4.31.62l-3.23 3.15l-.78 4.71z"/>
                    </svg>
                    Gemini AI Assistant
                </div>
            `;
        }

        bubble.innerHTML = `
            ${header}
            <div class="message-content">${htmlContent}</div>
            <span class="text-xs text-slate-400 italic mt-1 block text-right">${time}</span>
        `;

        chatHistory.appendChild(bubble);
        chatHistory.scrollTop = chatHistory.scrollHeight;
        
        // Add to conversation history
        conversationHistory.push({
            role: role,
            content: content,
            timestamp: time,
            requestId: requestId
        });
    }

    function showLoading() {
        console.log("⏳ Showing loading state");
        isChatLoading = true;
        isGeneratingPlan = true;
        generatePlanButton.disabled = true;
        generatePlanButton.classList.add('opacity-70');
        generatePlanText.textContent = 'Generating with AI...';
        loadingSpinner.style.display = 'block';
        
        // Disable inputs during loading
        if (projectType) projectType.disabled = true;
        if (projectSize) projectSize.disabled = true;
        if (additionalDetails) additionalDetails.disabled = true;
        if (chatInput) chatInput.disabled = true;
        if (sendChatButton) sendChatButton.disabled = true;
    }

    function hideLoading() {
        console.log("✅ Hiding loading state");
        isChatLoading = false;
        isGeneratingPlan = false;
        generatePlanButton.disabled = false;
        generatePlanButton.classList.remove('opacity-70');
        generatePlanText.textContent = 'Generate Plan';
        loadingSpinner.style.display = 'none';
        
        // Re-enable inputs
        if (projectType) projectType.disabled = false;
        if (projectSize) projectSize.disabled = false;
        if (additionalDetails) additionalDetails.disabled = false;
        if (chatInput && isBackendReady) chatInput.disabled = false;
        if (sendChatButton && isBackendReady) sendChatButton.disabled = false;
    }

    // Chat message handler
    async function handleSendMessage() {
        if (!chatInput || !sendChatButton) return;
        
        const message = chatInput.value.trim();
        if (!message || isChatLoading || !isBackendReady) return;

        console.log("💭 Sending chat message to Gemini AI:", message);
        
        // Generate request ID for this message
        const requestId = generateRequestId(message);
        lastRequestId = requestId;
        lastUserMessage = message;
        
        // Add user message to chat
        appendMessage(message, 'user', requestId);
        chatInput.value = '';
        
        showLoading();
        
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 45000); // 45 seconds for AI processing

            const response = await fetch(`${API_BASE_URL}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    conversation_history: conversationHistory,
                    request_id: requestId
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("🤖 Gemini AI response received", { requestId: data.request_id });
            
            appendMessage(data.response, 'ai', data.request_id || requestId);
            
        } catch (error) {
            console.error("❌ Chat Error:", error);
            
            let errorMessage = "I apologize, but I'm having trouble connecting to Gemini AI right now. ";
            if (error.name === 'AbortError') {
                errorMessage += "The request timed out. Please try again.";
            } else if (error.message.includes('API')) {
                errorMessage += "There might be an issue with the AI service configuration.";
            } else {
                errorMessage += "Please check your connection and try again.";
            }
            
            appendMessage(errorMessage, 'ai', requestId);
            
            // Re-check connection on error
            setTimeout(checkBackendConnection, 2000);
        } finally {
            hideLoading();
        }
    }

    // Plan Generation Handler
    async function handleGeneratePlan() {
        console.log("🎯 Generate Plan button clicked!");
        
        // Prevent multiple clicks
        if (isGeneratingPlan) {
            console.log("🛑 Plan generation already in progress, ignoring click");
            return;
        }
        
        // Clear any previous errors
        if (planError) {
            planError.classList.add('hidden');
        }
        
        // Check backend connection before proceeding
        if (!isBackendReady) {
            console.log("🔌 Backend not ready, checking connection...");
            await checkBackendConnection();
            if (!isBackendReady) {
                if (planError) {
                    planError.textContent = "Gemini AI service is unavailable. Please try again later.";
                    planError.classList.remove('hidden');
                }
                return;
            }
        }
        
        const type = projectType.value;
        const size = projectSize.value;
        const details = additionalDetails.value.trim(); 

        console.log("📝 Form values:", { type, size, details });

        // Enhanced validation
        if (!type) {
            showValidationError("Please select a Project Type.");
            return;
        }
        if (!size || size < 0 || size > 10000) {
            showValidationError("Please enter a valid Project Size between 0 and 10,000 sq ft.");
            return;
        }
        if (!details) {
            showValidationError("Please provide Additional Details about your project vision.");
            return;
        }

        console.log("✅ Validation passed, showing loading...");
        showLoading();

        // Remove initial greeting
        const initialGreeting = document.getElementById('initialGreeting');
        if (initialGreeting) {
            console.log("🗑️ Removing initial greeting");
            initialGreeting.remove();
        }

        // Generate request ID for this plan generation
        const requestId = generateRequestId(`plan-${type}-${size}-${details}`);
        lastRequestId = requestId;
        lastUserMessage = `Generate plan for ${type} ${size} sq ft: ${details}`;

        // PREVENT DUPLICATE LOADING MESSAGES using request ID
        const existingMessages = chatHistory.querySelectorAll('.ai-chat-bubble');
        for (let i = existingMessages.length - 1; i >= 0; i--) {
            const msg = existingMessages[i];
            const existingRequestId = msg.getAttribute('data-request-id');
            if (existingRequestId === requestId) {
                msg.remove();
                break;
            }
        }

        appendMessage(`🧠 Analyzing your ${type} project (${size} sq ft) with Gemini AI...`, 'ai', requestId);
        
        const userMessage = `I need help planning a ${type} project that is ${size} square feet. Additional details: ${details}. Can you provide a comprehensive material plan, cost estimation, timeline, and labor requirements for construction in Kenya?`;

        console.log("📤 Sending request to Gemini AI:", userMessage, { requestId });

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 45000); // 45 seconds for AI processing

            const response = await fetch(`${API_BASE_URL}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage,
                    conversation_history: conversationHistory,
                    request_id: requestId
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            console.log("📥 Response received:", response.status);

            if (!response.ok) {
                if (response.status === 429) {
                    throw new Error('Rate limit exceeded. Please wait a moment before trying again.');
                } else if (response.status === 503) {
                    throw new Error('Gemini AI service is temporarily unavailable.');
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("🤖 Gemini AI Response received", { requestId: data.request_id });

            // Store context for follow-up chat
            projectContext = data.response;

            // Remove the loading message and display the actual response
            const loadingMessages = chatHistory.querySelectorAll(`[data-request-id="${requestId}"]`);
            loadingMessages.forEach(msg => {
                if (msg.textContent.includes('Analyzing your') || msg.textContent.includes('Analyzing project')) {
                    msg.remove();
                }
            });

            // Display the AI-generated plan
            appendMessage(data.response, 'ai', data.request_id || requestId);

            // Enable chat mode
            if (chatInput) {
                chatInput.disabled = false;
                chatInput.focus();
                chatInput.placeholder = "Ask follow-up questions about your project...";
            }
            if (sendChatButton) sendChatButton.disabled = false;
            
            console.log("🎉 Plan generation completed successfully with Gemini AI");
            
        } catch (error) {
            console.error("❌ Plan Generation Error:", error);
            
            let errorMessage = "Unable to generate plan with Gemini AI. ";
            let aiErrorMessage = "I apologize, but I'm having trouble connecting to our AI planning service right now. ";

            if (error.name === 'AbortError') {
                errorMessage = "Request timed out. Gemini AI is taking longer than expected.";
                aiErrorMessage = "I apologize, but the AI request took too long to process. This might be due to high server load. Please try again.";
            } else if (error.message.includes('Rate limit')) {
                errorMessage = error.message;
                aiErrorMessage = "I'm receiving too many requests right now. Please wait a moment before trying again.";
            } else if (error.message.includes('API') || error.message.includes('Gemini')) {
                errorMessage = "Gemini AI service configuration issue. Please check the backend setup.";
                aiErrorMessage = "There seems to be a configuration issue with our AI service. Please contact support if this continues.";
            } else {
                errorMessage += "Please check your connection and try again.";
                aiErrorMessage += "Please try again in a moment.";
            }

            if (planError) {
                planError.textContent = errorMessage;
                planError.classList.remove('hidden');
            }
            
            // Remove loading message on error
            const loadingMessages = chatHistory.querySelectorAll(`[data-request-id="${requestId}"]`);
            loadingMessages.forEach(msg => {
                if (msg.textContent.includes('Analyzing your') || msg.textContent.includes('Analyzing project')) {
                    msg.remove();
                }
            });
            
            appendMessage(aiErrorMessage, 'ai', requestId);
            
            // Re-check connection on error
            setTimeout(checkBackendConnection, 5000);
            
        } finally {
            hideLoading();
        }
    }

    function showValidationError(message) {
        if (planError) {
            planError.textContent = message;
            planError.classList.remove('hidden');
            // Scroll to error
            planError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    // Event Listeners
    console.log("🔗 Adding event listeners");
    
    // Use proper event listener with prevention
    generatePlanButton.addEventListener('click', function(e) {
        e.preventDefault();
        handleGeneratePlan();
    });
    
    // Chat input handlers
    if (chatInput && sendChatButton) {
        sendChatButton.addEventListener('click', function(e) {
            e.preventDefault();
            handleSendMessage();
        });
        
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
            }
        });
        
        // Enable chat input by default for better UX
        chatInput.disabled = false;
        chatInput.placeholder = "Ask anything about construction...";
        sendChatButton.disabled = false;
    }

    // Input validation listeners
    if (projectSize) {
        projectSize.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            if (value < 0) e.target.value = 0;
            if (value > 10000) e.target.value = 10000;
        });
    }

    // Initialize chat timestamp
    if (initialGreetingTime) {
        initialGreetingTime.textContent = new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: false});
    }

    // Update initial greeting to mention Gemini AI
    const initialGreeting = document.getElementById('initialGreeting');
    if (initialGreeting) {
        const greetingText = initialGreeting.querySelector('p');
        if (greetingText) {
            greetingText.innerHTML = `
                Hello! I'm your AI Construction Planning Assistant powered by <strong>Gemini AI</strong>. 
                Fill out the project details above and click 'Generate Plan' to get started!
                <br><span id="initialGreetingTime" class="text-xs text-slate-400 italic mt-1 block"></span>
            `;
        }
    }

    // Initialize connection check
    checkBackendConnection();

    console.log("🚀 Gemini AI Assistant initialization complete - Ready to use!");
}

// Make sure the function is called when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log("📄 DOM Content Loaded - Initializing Gemini AI Assistant");
    initializeAIProjectAssistant();
});

// Also try to initialize if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAIProjectAssistant);
} else {
    initializeAIProjectAssistant();
}




// Products section
// products dataset with Kenyan brands
const productsData = [
  // =========================
  // Construction (10)
  // =========================
  {
    id: 1,
    name: "Cement Bag (50kg)",
    category: "Construction",
    brand: "Simba Cement",
    description: "Premium 32.5R grade cement from Simba Cement, perfect for all construction needs in Kenya. Excellent for concrete work, plastering, and masonry with consistent quality.",
    image: "https://pioneerhardwares.com/wp-content/uploads/2023/09/Simba-Cement-32.5R-1.webp"
  },
  {
    id: 2,
    name: "Concrete Blocks",
    category: "Construction",
    brand: "Bamburi",
    description: "High-quality concrete blocks manufactured by Bamburi Cement. Durable, load-bearing blocks ideal for walls, foundations, and structural elements in Kenyan construction projects.",
    image: "https://westkonkrete.com/wp-content/uploads/2022/03/concrete-1170x658.jpg"
  },
  {
    id: 3,
    name: "Sand (Ton)",
    category: "Construction",
    brand: "Natural River",
    description: "Clean, washed river sand sourced from Kenyan rivers. Perfect for concrete mixing and plastering work, free from impurities and contaminants.",
    image: "https://tse2.mm.bing.net/th/id/OIP.9IK1CWrmOtyStsTA30AxPwAAAA?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 4,
    name: "Gravel (Ton)",
    category: "Construction",
    brand: "Bamburi",
    description: "Quality crushed stone gravel from Bamburi Quarries. Ideal for concrete aggregate, drainage systems, and landscaping projects across Kenya.",
    image: "https://www.inchcalculator.com/wp-content/uploads/2018/10/gravel-material.jpg"
  },
  {
    id: 5,
    name: "Reinforcement Bars (12mm)",
    category: "Construction",
    brand: "Apex Steel",
    description: "High-strength TMT reinforcement bars manufactured in Kenya. Perfect for concrete structures with excellent bonding properties and earthquake resistance.",
    image: "https://tse1.mm.bing.net/th/id/OIP.tnUXjLGitDJKHuhuE8X8ZgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 6,
    name: "Wheelbarrow",
    category: "Construction",
    brand: "Truper",
    description: "Heavy-duty wheelbarrow designed for Kenyan construction sites. Features sturdy steel construction and pneumatic wheels for easy material transport.",
    image: "https://5.imimg.com/data5/SELLER/Default/2024/7/438498077/RZ/OY/PM/149834907/wheelbarrow-1000x1000.jpg"
  },
  {
    id: 7,
    name: "Shovel",
    category: "Construction",
    brand: "Stanley",
    description: "Professional-grade shovel with fiberglass handle. Perfect for digging, moving soil, and construction work on Kenyan building sites.",
    image: "https://th.bing.com/th/id/R.eddd3ea1c2a689108fc2159bbea8f6d1?rik=flSzOFcEZiNuvw&pid=ImgRaw&r=0"
  },
  {
    id: 8,
    name: "Pickaxe",
    category: "Construction",
    brand: "Rohi",
    description: "Durable pickaxe designed for tough Kenyan soil conditions. Ideal for breaking hard ground, rocks, and concrete in construction projects.",
    image: "https://tiimg.tistatic.com/fp/1/005/628/agriculture-pickaxe-549.jpg"
  },
  {
    id: 9,
    name: "Concrete Mixer",
    category: "Construction",
    brand: "Honda",
    description: "Portable concrete mixer with Honda engine. Perfect for small to medium construction projects across Kenya, ensuring consistent concrete mixing.",
    image: "https://m.media-amazon.com/images/I/61Vg4S-gDtL.jpg"
  },
  {
    id: 10,
    name: "Ladder (6ft)",
    category: "Construction",
    brand: "Zucchini",
    description: "Aluminum folding ladder made for Kenyan construction and maintenance work. Lightweight yet sturdy, perfect for various height requirements.",
    image: "https://5.imimg.com/data5/SELLER/Default/2024/3/404116509/XG/XX/AH/10691668/6-feet-aluminium-folding-ladder-1000x1000.jpg"
  },

  // =========================
  // Metals (10)
  // =========================
  {
    id: 11,
    name: "Steel Rods (16mm)",
    category: "Metals",
    brand: "Devki Steel",
    description: "High-quality steel reinforcement rods from Devki Steel Mills. Manufactured in Kenya to meet local construction standards and requirements.",
    image: "https://th.bing.com/th/id/R.29d10a4f163c31b2c696c962580ba0f2?rik=BgVuaPqN8%2fdbLw&pid=ImgRaw&r=0"
  },
  {
    id: 12,
    name: "Galvanized Pipes",
    category: "Metals",
    brand: "Diamond",
    description: "Galvanized steel pipes resistant to rust and corrosion. Ideal for water supply and construction applications in Kenya's varied climate.",
    image: "https://th.bing.com/th/id/R.f28710af1b4252c463fb70ec47f5db9b?rik=QmvchQVlqdX8vw&pid=ImgRaw&r=0"
  },
  {
    id: 13,
    name: "Wire Mesh",
    category: "Metals",
    brand: "Apex",
    description: "Steel wire mesh for construction reinforcement and fencing. Made from high-tensile steel wire, perfect for Kenyan building standards.",
    image: "https://image.made-in-china.com/2f0j00BiNzySIWfvrY/Stainless-Steel-Welded-Wire-Mesh.jpg"
  },
  {
    id: 14,
    name: "Aluminum Sheets",
    category: "Metals",
    brand: "Maisha Rolling Mabati",
    description: "Quality aluminum sheets from Maisha Rolling Mabati. Lightweight, corrosion-resistant, perfect for roofing and cladding in Kenyan buildings.",
    image: "https://th.bing.com/th/id/R.5ad8d90810eebd28c30a27b54de778a9?rik=wPyQGwOYoAjU6w&pid=ImgRaw&r=0"
  },
  {
    id: 15,
    name: "Nails (1kg)",
    category: "Metals",
    brand: "Mabati",
    description: "Assorted steel nails pack. Galvanized for rust resistance, suitable for various construction and woodworking projects in Kenya.",
    image: "https://th.bing.com/th/id/R.06da87ec5f86e19272dc5cbe5c808c18?rik=q2AHyGnX2iiddA&pid=ImgRaw&r=0"
  },
  {
    id: 16,
    name: "Steel Plates",
    category: "Metals",
    brand: "Devki",
    description: "Structural steel plates from Devki Steel. Available in various thicknesses for construction, manufacturing, and industrial applications in Kenya.",
    image: "https://149893212.v2.pressablecdn.com/wp-content/uploads/Steel-Plates-larger.jpg"
  },
  {
    id: 17,
    name: "Binding Wire",
    category: "Metals",
    brand: "Apex",
    description: "Steel binding wire for tying reinforcement bars in concrete construction. Essential for Kenyan building projects and structural work.",
    image: "https://tse2.mm.bing.net/th/id/OIP.5v_4MlKd3D2rEpTk8kpbOAHaFj?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 18,
    name: "Steel Beams",
    category: "Metals",
    brand: "Devki Steel",
    description: "Structural steel beams for building frameworks and support structures. Manufactured to Kenyan construction standards for safety and durability.",
    image: "https://tse2.mm.bing.net/th/id/OIP.VmAmJd0RkxJgbEdzYtGqLAHaFj?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 19,
    name: "Corrugated Iron Sheets",
    category: "Metals",
    brand: "Maisha Rolling Mabati",
    description: "Quality corrugated iron sheets from Maisha Rolling Mabati. Pre-painted and galvanized for long-lasting roofing solutions in Kenya.",
    image: "https://tse4.mm.bing.net/th/id/OIP.mHuqwuTXO6SJDokCTubGjwAAAA?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 20,
    name: "Metal Pipes",
    category: "Metals",
    brand: "Diamond",
    description: "Various diameter metal pipes for construction and plumbing. Durable and reliable for Kenyan infrastructure and building projects.",
    image: "https://www.thespruce.com/thmb/asLTfbb9o4nzfUwkeElhrc8-5No=/6000x4000/filters:no_upscale():max_bytes(150000):strip_icc()/steel-pipes-903670438-5ac5508d18ba0100362e2198.jpg"
  },

  // =========================
  // Tools (10)
  // =========================
  {
    id: 21,
    name: "Hammer",
    category: "Tools",
    brand: "Stanley",
    description: "Professional claw hammer with fiberglass handle. Essential tool for Kenyan construction sites and DIY projects with shock absorption.",
    image: "https://tse2.mm.bing.net/th/id/OIP.XPt3nvawfYMkpSJ7Ws_0VgHaEG?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 22,
    name: "Screwdriver Set",
    category: "Tools",
    brand: "Truper",
    description: "Complete screwdriver set with various tips. Perfect for electrical work, furniture assembly, and maintenance tasks in Kenyan homes and sites.",
    image: "https://d2j6dbq0eux0bg.cloudfront.net/images/53972175/4321545481.jpg"
  },
  {
    id: 23,
    name: "Adjustable Wrench",
    category: "Tools",
    brand: "Stanley",
    description: "Adjustable wrench for plumbing and mechanical work. Versatile tool suitable for various bolt sizes in Kenyan construction and repair.",
    image: "https://tse2.mm.bing.net/th/id/OIP.vfzHDIom6wqInF8LWhj4EgHaFa?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 24,
    name: "Electric Drill",
    category: "Tools",
    brand: "Bosch",
    description: "Corded electric drill with variable speed. Powerful tool for drilling in wood, metal, and concrete on Kenyan construction sites.",
    image: "https://th.bing.com/th/id/R.66166358893797b171d29f48431b184e?rik=RBUIT6fGtEZixA&pid=ImgRaw&r=0"
  },
  {
    id: 25,
    name: "Tape Measure",
    category: "Tools",
    brand: "Stanley",
    description: "25-foot tape measure with durable case. Essential for accurate measurements in Kenyan construction and carpentry projects.",
    image: "https://i5.walmartimages.com/asr/bc5115aa-6aef-4ef1-b8f4-2892d16b0224_1.703ae051dc43ce85d21ec8934712690a.jpeg"
  },
  {
    id: 26,
    name: "Spirit Level",
    category: "Tools",
    brand: "Truper",
    description: "Professional spirit level for precise leveling. Crucial for ensuring straight installations in Kenyan building and renovation projects.",
    image: "https://engineeringlearn.com/wp-content/uploads/2022/06/Spirit-Level-1024x539.jpg"
  },
  {
    id: 27,
    name: "Hand Saw",
    category: "Tools",
    brand: "Stanley",
    description: "Traditional hand saw for wood cutting. Reliable tool for carpentry and construction work across Kenya.",
    image: "https://th.bing.com/th/id/R.65b68d325be4d649b86ad904593ff022?rik=5E%2bYzydHYT80cw&riu=http%3a%2f%2fimage.made-in-china.com%2f2f0j00yvBTMjZsphkC%2fHand-Saw-OK8067-.jpg&ehk=zRfztlSP5ft8Nw4gpCBlz0t72zJ0rd5Xo%2f83vCVU7o4%3d&risl=&pid=ImgRaw&r=0"
  },
  {
    id: 28,
    name: "Pliers",
    category: "Tools",
    brand: "Truper",
    description: "Combination pliers for gripping and cutting. Versatile tool for electrical work and general repairs in Kenyan households and sites.",
    image: "https://m.media-amazon.com/images/I/61qJ485KguL._SL1500_.jpg"
  },
  {
    id: 29,
    name: "Toolbox",
    category: "Tools",
    brand: "Stanley",
    description: "Durable toolbox for organizing tools. Perfect for Kenyan technicians and construction workers to keep tools secure and accessible.",
    image: "https://hips.hearstapps.com/hmg-prod/images/opened-diy-toolbox-with-a-collection-of-tools-royalty-free-image-1701722687.jpg?crop=1.00xw:0.753xh;0,0.163xh&resize=1200:*"
  },
  {
    id: 30,
    name: "Angle Grinder",
    category: "Tools",
    brand: "Bosch",
    description: "Powerful angle grinder for cutting and grinding. Essential for metalwork and construction tasks on Kenyan job sites.",
    image: "https://tse3.mm.bing.net/th/id/OIP.4bxh3W0FVfP0qNhUeMV8agHaD-?rs=1&pid=ImgDetMain&o=7&rm=3"
  },

  // =========================
  // Fasteners (10)
  // =========================
  {
    id: 31,
    name: "Wood Screws (100pcs)",
    category: "Fasteners",
    brand: "Truper",
    description: "Assorted wood screws for carpentry and furniture. Various sizes suitable for Kenyan woodworking and construction projects.",
    image: "https://tse1.mm.bing.net/th/id/OIP.GUxosCPgAnqPaMAY0cTqcwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 32,
    name: "Nuts & Bolts Set",
    category: "Fasteners",
    brand: "Truper",
    description: "Complete set of nuts and bolts for assembly. Essential for mechanical and construction applications in Kenya.",
    image: "https://img.lazcdn.com/g/p/ae66977f03e1dc62c0aa6ca9595747d7.jpg_720x720q80.jpg"
  },
  {
    id: 33,
    name: "Washers (100pcs)",
    category: "Fasteners",
    brand: "Truper",
    description: "Steel washers for bolt assemblies. Prevents loosening and distributes load in Kenyan construction and mechanical applications.",
    image: "https://tse4.mm.bing.net/th/id/OIP.dNlkU02jqRG6YxgqBU6tdQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 34,
    name: "Hex Bolts (50pcs)",
    category: "Fasteners",
    brand: "Truper",
    description: "Hex head bolts for structural connections. High-strength bolts suitable for Kenyan building and machinery applications.",
    image: "https://tse3.mm.bing.net/th/id/OIP.XtXKOH1ssMd5KhJZDX9yUgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 35,
    name: "Concrete Nails (1kg)",
    category: "Fasteners",
    brand: "Mabati",
    description: "Hardened concrete nails for masonry work. Designed to penetrate concrete and brick in Kenyan construction projects.",
    image: "https://down-ph.img.susercontent.com/file/ph-11134207-7r98y-lwdrx60tcuox0b"
  },
  {
    id: 36,
    name: "Anchor Bolts",
    category: "Fasteners",
    brand: "Truper",
    description: "Heavy-duty anchor bolts for concrete. Essential for securing structures to concrete foundations in Kenyan buildings.",
    image: "https://th.bing.com/th/id/R.4b6b6cf87639e12577dc37e1359d9f38?rik=YT9ZcWYSVr6PlQ&riu=http%3a%2f%2fwww.northerntool.com%2fimages%2fproduct%2f2000x2000%2f343%2f34357_2000x2000.jpg&ehk=WcJTFc5jGR0jzJdiwJ2HxNufKE20kJX1r6csnQsDrnA%3d&risl=&pid=ImgRaw&r=0"
  },
  {
    id: 37,
    name: "Toggle Bolts",
    category: "Fasteners",
    brand: "Truper",
    description: "Toggle bolts for hollow wall mounting. Perfect for installing fixtures on drywall and hollow surfaces in Kenyan homes.",
    image: "https://th.bing.com/th/id/R.0be1bbd20381a9d3795372df18b822a8?rik=nfVInL8pr2hLkg&pid=ImgRaw&r=0"
  },
  {
    id: 38,
    name: "Wood Glue",
    category: "Fasteners",
    brand: "Ponal",
    description: "Strong wood adhesive for carpentry projects. Water-resistant glue suitable for Kenyan climate conditions and woodworking.",
    image: "https://tse4.mm.bing.net/th/id/OIP.LFsQpVtefW6kcID2qCZQcAHaIS?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 39,
    name: "Drywall Screws",
    category: "Fasteners",
    brand: "Truper",
    description: "Specialized screws for drywall installation. Fine threads designed for securing drywall in Kenyan interior construction.",
    image: "https://tse3.mm.bing.net/th/id/OIP.QJ-YSBbgz_wPGsBVUsSHsQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 40,
    name: "Self-tapping Screws",
    category: "Fasteners",
    brand: "Truper",
    description: "Self-tapping screws for metal and wood. Creates own threads, perfect for various assembly tasks in Kenyan projects.",
    image: "https://tse1.mm.bing.net/th/id/OIP.6pmjS9KtlwZb-7DPi9SPIAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
  },

  // =========================
  // Building (10)
  // =========================
  {
    id: 41,
    name: "Timber Planks",
    category: "Building",
    brand: "Local Kenyan",
    description: "Quality timber planks from sustainable Kenyan forests. Perfect for construction, formwork, and carpentry projects.",
    image: "https://tse3.mm.bing.net/th/id/OIP.0mLJkCNk2KDugYJTKYKwQgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 42,
    name: "Plywood Sheet",
    category: "Building",
    brand: "Timberland",
    description: "Structural plywood sheets for construction and furniture. Made from quality wood veneers, suitable for Kenyan building standards.",
    image: "https://plystory.com/wp-content/uploads/2023/03/Plywood.jpg"
  },
  {
    id: 43,
    name: "MDF Board",
    category: "Building",
    brand: "Timberland",
    description: "Medium Density Fiberboard for interior applications. Smooth surface perfect for painting and furniture in Kenyan homes.",
    image: "https://img.staticmb.com/mbcontent/images/uploads/2023/6/mdf-board-vs-hdf.jpg"
  },
  {
    id: 44,
    name: "Roofing Tiles",
    category: "Building",
    brand: "Maisha Rolling Mabati",
    description: "Decorative and durable roofing tiles from Maisha. Available in various colors and styles to suit Kenyan architectural preferences.",
    image: "https://tse3.mm.bing.net/th/id/OIP.icQkqxZZstQppnWVuJcbswHaFi?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 45,
    name: "Gypsum Board",
    category: "Building",
    brand: "Gyproc",
    description: "Gypsum boards for interior walls and ceilings. Fire-resistant and easy to install, perfect for modern Kenyan construction.",
    image: "https://g.foolcdn.com/editorial/images/226000/gypsum-construction-material.jpg"
  },
  {
    id: 46,
    name: "Clay Bricks",
    category: "Building",
    brand: "Bamburi",
    description: "Traditional clay bricks from Bamburi. Durable and thermally efficient, ideal for Kenyan residential and commercial buildings.",
    image: "https://tse2.mm.bing.net/th/id/OIP.YvqM4WSMIIemf4mo6OKaEQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 47,
    name: "Stone Blocks",
    category: "Building",
    brand: "Local Quarry",
    description: "Natural stone blocks from Kenyan quarries. Perfect for foundations, walls, and decorative elements in construction.",
    image: "https://bestwaystones.com/wp-content/uploads/2025/04/stone-blocks.png"
  },
  {
    id: 48,
    name: "Paint Bucket (20L)",
    category: "Building",
    brand: "Crown Paints",
    description: "Premium paint from Crown Paints Kenya. Weather-resistant and durable, available in various colors for Kenyan homes and buildings.",
    image: "https://image.made-in-china.com/2f0j00oIbkOGTcnhcK/20-Liter-Paint-Bucket-Metal-Paint-Drum-20L-Tinplate-Container-for-Paint-Adhesive-Ink-Engine-Oil-Glue-Solvent.jpg"
  },
  {
    id: 49,
    name: "Roofing Felt",
    category: "Building",
    brand: "Dalsan",
    description: "Waterproof roofing felt for moisture protection. Essential underlayment for Kenyan roofs to prevent leaks and water damage.",
    image: "https://tse2.mm.bing.net/th/id/OIP.VCleO2M-A5Y1O3ARZNvQywAAAA?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 50,
    name: "Insulation Roll",
    category: "Building",
    brand: "Knauf",
    description: "Thermal insulation rolls for energy efficiency. Helps maintain comfortable temperatures in Kenyan buildings throughout the year.",
    image: "https://tse1.mm.bing.net/th/id/OIP.Yx8cGIi7LCpxy-CGPuv9FAHaFI?rs=1&pid=ImgDetMain&o=7&rm=3"
  },

  // =========================
  // Electrical (10)
  // =========================
  {
    id: 51,
    name: "LED Bulb",
    category: "Electrical",
    brand: "Philips",
    description: "Energy-efficient LED bulbs for Kenyan homes and offices. Long-lasting and cost-effective lighting solution with various color temperatures.",
    image: "https://tse3.mm.bing.net/th/id/OIP.32xNZi_e8rzQCqCSrIxpOwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 52,
    name: "Extension Cord",
    category: "Electrical",
    brand: "Meco",
    description: "Heavy-duty extension cord with surge protection. Safe and reliable power extension for Kenyan households and construction sites.",
    image: "https://tse1.mm.bing.net/th/id/OIP.SwDbQ_FUDnTJdMd6t98Y8QHaE_?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 53,
    name: "Electrical Tape",
    category: "Electrical",
    brand: "3M",
    description: "Vinyl electrical tape for insulation and protection. Essential for electrical work and repairs in Kenyan installations.",
    image: "https://i0.wp.com/maxwel.com/wp-content/uploads/2022/03/electrical_tape.jpg"
  },
  {
    id: 54,
    name: "Circuit Breaker",
    category: "Electrical",
    brand: "Schneider Electric",
    description: "Safety circuit breaker for electrical panels. Protects Kenyan homes and buildings from electrical overloads and short circuits.",
    image: "https://www.tfcelectric.com/wp-content/uploads/2023/09/iStock_000017272602_Large.jpg"
  },
  {
    id: 55,
    name: "Wall Socket",
    category: "Electrical",
    brand: "MK",
    description: "UK standard wall sockets for Kenyan electrical systems. Durable and safe power outlets for homes and offices.",
    image: "https://th.bing.com/th/id/R.d7fe24c7f467ab6fb30e079842ddd13c?rik=2ID6iEnYEogDrw&pid=ImgRaw&r=0"
  },
  {
    id: 56,
    name: "Light Switch",
    category: "Electrical",
    brand: "MK",
    description: "Single-pole light switches for Kenyan lighting circuits. Reliable and easy to install for residential and commercial use.",
    image: "https://th.bing.com/th/id/R.0a8f6ad95221f4eb66c443974a4f93d8?rik=E6XgW1EIEnmEqA&pid=ImgRaw&r=0"
  },
  {
    id: 57,
    name: "Electrical Wires",
    category: "Electrical",
    brand: "Diamond",
    description: "Copper electrical wires for building installations. Various gauges available to meet Kenyan electrical standards and requirements.",
    image: "https://i.pinimg.com/originals/a0/22/07/a022075b06f41553ef86628ed2a80bce.jpg"
  },
  {
    id: 58,
    name: "Ceiling Light",
    category: "Electrical",
    brand: "Philips",
    description: "Modern ceiling light fixtures for Kenyan interiors. Energy-efficient lighting solutions for homes and commercial spaces.",
    image: "https://i5.walmartimages.com/asr/cc8838ff-bca6-4929-87db-29d8648dde24.f76313912c8b80ca48d1a03775703e3b.jpeg"
  },
  {
    id: 59,
    name: "Electric Fan",
    category: "Electrical",
    brand: "Maspion",
    description: "Ceiling and standing fans for Kenyan climate. Provides cooling comfort during warm weather in homes and offices.",
    image: "https://tse4.mm.bing.net/th/id/OIP.F-kZL18s1zNl3t1oa4Tv8gHaFj?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 60,
    name: "Solar Panel",
    category: "Electrical",
    brand: "M-KOPA",
    description: "Solar panels for renewable energy in Kenya. Perfect for off-grid power solutions and reducing electricity costs.",
    image: "https://th.bing.com/th/id/R.a510dcf9c8cf5bd51fee672e4703b712?rik=SmLCOUpJHX1MtQ&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2f2%2f2c%2fFixed_Tilt_Solar_panel_at_Canterbury_Municipal_Building_Canterbury_New_Hampshire.jpg&ehk=mYF2FZKSRXaC9ymA3%2bKjWZDuFek8HXyPxO%2fvGCuFm1k%3d&risl=1&pid=ImgRaw&r=0"
  },

  // =========================
  // Plumbing (10)
  // =========================
  {
    id: 61,
    name: "PVC Pipe (3m)",
    category: "Plumbing",
    brand: "Dalsan",
    description: "PVC pipes for water supply and drainage systems. Durable and corrosion-resistant, perfect for Kenyan plumbing installations.",
    image: "https://5.imimg.com/data5/EM/NG/MY-56823773/supreme-pvc-pipes-500x500-500x500.jpg"
  },
  {
    id: 62,
    name: "Pipe Fittings Set",
    category: "Plumbing",
    brand: "Dalsan",
    description: "Complete set of PVC pipe fittings for plumbing systems. Includes elbows, tees, and couplings for Kenyan water installations.",
    image: "https://c8.alamy.com/comp/T3R4P6/set-of-pipe-fittings-connection-for-industry-assorted-plumbing-fixtures-and-piping-parts-T3R4P6.jpg"
  },
  {
    id: 63,
    name: "Shower Head",
    category: "Plumbing",
    brand: "Twyford",
    description: "Modern shower head from Twyford Kenya. Water-efficient design with adjustable spray patterns for Kenyan bathrooms.",
    image: "https://i.ebayimg.com/images/g/gE0AAOSwYGJeaIW6/s-l1600.jpg"
  },
  {
    id: 64,
    name: "Water Tank (1000L)",
    category: "Plumbing",
    brand: "Twyford",
    description: "Plastic water storage tank from Twyford. Food-grade material, perfect for rainwater harvesting and water storage in Kenya.",
    image: "https://5.imimg.com/data5/AB/SL/NJ/SELLER-74535796/1000l-water-tank-500x500.jpg"
  },
  {
    id: 65,
    name: "Faucet",
    category: "Plumbing",
    brand: "Twyford",
    description: "Quality bathroom and kitchen faucets from Twyford. Durable ceramic cartridges and elegant designs for Kenyan homes.",
    image: "https://tse1.mm.bing.net/th/id/OIP.5J8T9F7_zi2TSzqLKSttLwHaFi?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 66,
    name: "Sink",
    category: "Plumbing",
    brand: "Twyford",
    description: "Stainless steel and ceramic sinks from Twyford Kenya. Various sizes and styles to suit Kenyan kitchen and bathroom requirements.",
    image: "https://tse1.mm.bing.net/th/id/OIP.S5My2RS2Ua2KTZ30ntmU2QHaFM?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 67,
    name: "Toilet Bowl",
    category: "Plumbing",
    brand: "Twyford",
    description: "Water-efficient toilet bowls from Twyford. Modern designs with dual-flush systems suitable for Kenyan bathrooms.",
    image: "https://tse4.mm.bing.net/th/id/OIP.bbAi3CWxJN5XBeQUXaNtfAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 68,
    name: "Water Heater",
    category: "Plumbing",
    brand: "Ariston",
    description: "Electric water heater for Kenyan households. Energy-efficient design providing reliable hot water for showers and washing.",
    image: "https://hips.hearstapps.com/popularmechanics/assets/15/45/1446571234-gettyimages-173756481.jpg"
  },
  {
    id: 69,
    name: "Drain Pipe",
    category: "Plumbing",
    brand: "Dalsan",
    description: "PVC drain pipes for wastewater systems. Smooth interior for efficient drainage in Kenyan buildings and infrastructure.",
    image: "https://tse4.mm.bing.net/th/id/OIP.hO3fMgJrhNDTmZYfNUVKqAHaJ4?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 70,
    name: "Plunger",
    category: "Plumbing",
    brand: "Simple Human",
    description: "Toilet plunger for clearing blockages. Essential tool for maintaining plumbing systems in Kenyan homes and buildings.",
    image: "https://tse2.mm.bing.net/th/id/OIP.oSQDzaKY6zdoljzhf9y_5gHaEA?rs=1&pid=ImgDetMain&o=7&rm=3"
  },

  // =========================
  // Safety (10)
  // =========================
  {
    id: 71,
    name: "Safety Helmet",
    category: "Safety",
    brand: "3M",
    description: "Industrial safety helmet for construction sites. Meets Kenyan safety standards, essential for head protection on job sites.",
    image: "https://tse4.mm.bing.net/th/id/OIP.7O9f21ga532TCI_HrXlO1QHaHh?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 72,
    name: "Safety Goggles",
    category: "Safety",
    brand: "3M",
    description: "Protective safety goggles for eye protection. Prevents injuries from debris and chemicals on Kenyan construction sites.",
    image: "https://tse1.mm.bing.net/th/id/OIP.fistdmfdgPNP5BXeudrLvwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 73,
    name: "Safety Gloves",
    category: "Safety",
    brand: "3M",
    description: "Industrial safety gloves for hand protection. Various types available for different tasks on Kenyan work sites.",
    image: "https://th.bing.com/th/id/R.509e9786556896f2b9d60f15e08d1b34?rik=2KInxQxRaInQFg&pid=ImgRaw&r=0"
  },
  {
    id: 74,
    name: "Reflective Vest",
    category: "Safety",
    brand: "3M",
    description: "High-visibility reflective vest for worker safety. Essential for road construction and low-light conditions in Kenya.",
    image: "https://mugaleindustries.com/wp-content/uploads/2023/07/Reflective-Vest.png"
  },
  {
    id: 75,
    name: "Ear Protection",
    category: "Safety",
    brand: "3M",
    description: "Hearing protection for noisy environments. Protects workers from hearing damage on loud Kenyan construction sites.",
    image: "https://th.bing.com/th/id/R.1160211eaae5f04329972a9970c3c8ab?rik=NcyOoBk%2fXHx%2fUQ&pid=ImgRaw&r=0"
  },
  {
    id: 76,
    name: "Work Boots",
    category: "Safety",
    brand: "Bata Industrials",
    description: "Safety work boots with steel toe caps. Protects feet from heavy objects and provides grip on Kenyan construction sites.",
    image: "https://i.ebayimg.com/images/g/uBEAAeSwwp1o1PhK/s-l960.jpg"
  },
  {
    id: 77,
    name: "Dust Mask",
    category: "Safety",
    brand: "3M",
    description: "Respiratory protection masks for dust and particles. Essential for construction and woodworking in dusty Kenyan environments.",
    image: "https://tse2.mm.bing.net/th/id/OIP.QcJM6iO45lw7iTN3qyJQIwHaGN?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 78,
    name: "Harness",
    category: "Safety",
    brand: "3M",
    description: "Safety harness for fall protection. Crucial for workers at heights on Kenyan construction projects and maintenance work.",
    image: "https://tse4.mm.bing.net/th/id/OIP.8rtE4c_Y9WsJRPOUb1_rsgHaJo?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 79,
    name: "First Aid Kit",
    category: "Safety",
    brand: "St. John Ambulance",
    description: "Comprehensive first aid kit for workplaces. Meets Kenyan occupational safety requirements for emergency medical care.",
    image: "https://m.media-amazon.com/images/I/81a8W+LrAwL.jpg"
  },
  {
    id: 80,
    name: "Fire Extinguisher",
    category: "Safety",
    brand: "Firemaster",
    description: "Fire extinguisher for workplace safety. Essential equipment for Kenyan buildings and construction sites as per fire regulations.",
    image: "https://firesouq.com/wp-content/uploads/2022/06/FireExting11.jpg"
  },

  // =========================
  // Finishing (10)
  // =========================
  {
    id: 81,
    name: "Wall Paint (5L)",
    category: "Finishing",
    brand: "Crown Paints",
    category: "Finishing",
    brand: "Crown Paints",
    description: "Premium interior and exterior wall paint from Crown Paints Kenya. Weather-resistant, washable, and available in various colors for Kenyan homes.",
    image: "https://5.imimg.com/data5/CX/XK/FF/SELLER-8392174/wall-paint-500x500.jpg"
  },
  {
    id: 82,
    name: "Wall Tiles",
    category: "Finishing",
    brand: "Twyford Tiles",
    description: "Ceramic wall tiles from Twyford Kenya. Various designs and sizes perfect for bathrooms, kitchens, and feature walls in Kenyan homes.",
    image: "https://megahw.co.za/wp-content/uploads/2018/05/3008_01.jpg"
  },
  {
    id: 83,
    name: "Floor Tiles",
    category: "Finishing",
    brand: "Twyford Tiles",
    description: "Durable floor tiles from Twyford Kenya. Slip-resistant and easy to clean, ideal for Kenyan homes and commercial spaces.",
    image: "https://assets.wfcdn.com/im/94866093/compr-r85/2166/216638100/regallo-24-x-24-marble-look-polished-porcelain-wall-floor-tile.jpg"
  },
  {
    id: 84,
    name: "Wood Varnish",
    category: "Finishing",
    brand: "Crown Paints",
    description: "Clear wood varnish from Crown Paints. Protects and enhances natural wood beauty, perfect for Kenyan furniture and woodwork.",
    image: "https://octaneseating.com/blog/wp-content/uploads/2020/07/varnish.jpg"
  },
  {
    id: 85,
    name: "Plaster",
    category: "Finishing",
    brand: "Bamburi",
    description: "Finishing plaster from Bamburi Cement. Creates smooth surfaces for painting, ideal for interior walls in Kenyan buildings.",
    image: "https://th.bing.com/th/id/OSK.HEROCLICKTHROUGHqcGVtFClkzAQ9FniacnMklrvR14_AOeoWTaTnTv4sBM?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 86,
    name: "Grout (5kg)",
    category: "Finishing",
    brand: "Twyford",
    description: "Tile grout for filling joints between tiles. Water-resistant and mold-resistant, perfect for Kenyan bathroom and kitchen installations.",
    image: "https://tileitsa.co.za/site/wp-content/uploads/2023/08/Untitled-design-58.png"
  },
  {
    id: 87,
    name: "Wood Polish",
    category: "Finishing",
    brand: "Crown Paints",
    description: "Wood polish and conditioner from Crown Paints. Restores and protects wooden surfaces in Kenyan homes and furniture.",
    image: "https://5.imimg.com/data5/LL/CL/MY-3643474/furniture-polish-500x500.jpg"
  },
  {
    id: 88,
    name: "Wallpaper Roll",
    category: "Finishing",
    brand: "Crown Paints",
    description: "Decorative wallpaper rolls from Crown Paints. Various patterns and textures to enhance interior spaces in Kenyan homes.",
    image: "https://ae01.alicdn.com/kf/HTB1mx_pgcnI8KJjSsziq6z8QpXaU/10M-Modern-3D-Embossed-Background-Wallpaper-Roll-Desktop-Decor-WallPapers-Living-Room-Wall-paper-for-Walls.jpg"
  },
  {
    id: 89,
    name: "Curtain Rods",
    category: "Finishing",
    brand: "Alfresco",
    description: "Decorative curtain rods and tracks. Various styles and finishes to complement Kenyan interior design preferences.",
    image: "https://oxfordhomeware.co.uk/cdn/shop/products/plainball_748x748.jpg?v=1592981919"
  },
  {
    id: 90,
    name: "Ceiling Board",
    category: "Finishing",
    brand: "Gyproc",
    description: "Gypsum ceiling boards for modern interiors. Easy to install and provides smooth finish for Kenyan homes and offices.",
    image: "https://tiimg.tistatic.com/fp/1/004/463/ceiling-board-900.jpg"
  }
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
    currentSlide = 0;
    updateSlider();
    
    // Set up event listeners with proper error handling
    const sliderPrev = document.getElementById('sliderPrev');
    const sliderNext = document.getElementById('sliderNext');
    const sliderDots = document.getElementById('sliderDots');
    const autoSlideToggle = document.getElementById('autoSlideToggle');
    const sliderTrack = document.querySelector('.slider-track');
    
    // Remove any existing event listeners first
    if (sliderPrev) {
        sliderPrev.replaceWith(sliderPrev.cloneNode(true));
    }
    if (sliderNext) {
        sliderNext.replaceWith(sliderNext.cloneNode(true));
    }
    
    // Get fresh references after cloning
    const freshSliderPrev = document.getElementById('sliderPrev');
    const freshSliderNext = document.getElementById('sliderNext');
    
    // Manual navigation event handlers
    if (freshSliderPrev) {
        freshSliderPrev.addEventListener('click', function() {
            goToPrevSlide();
            handleManualNavigation();
        });
    }
    
    if (freshSliderNext) {
        freshSliderNext.addEventListener('click', function() {
            goToNextSlide();
            handleManualNavigation();
        });
    }
    
    // Dot navigation
    if (sliderDots) {
        // Remove existing dots and reattach listeners
        const dotsContainer = sliderDots;
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        
        dots.forEach(dot => {
            // Clone to remove old listeners
            const newDot = dot.cloneNode(true);
            dot.replaceWith(newDot);
            
            newDot.addEventListener('click', function() {
                const slideIndex = parseInt(this.getAttribute('data-slide'));
                goToSlide(slideIndex);
                handleManualNavigation();
            });
        });
    }
    
    // Auto-slide toggle
    if (autoSlideToggle) {
        autoSlideToggle.addEventListener('click', function() {
            isAutoSlideEnabled = !isAutoSlideEnabled;
            this.classList.toggle('active');
            
            if (isAutoSlideEnabled) {
                startAutoSlide();
                // Show subtle notification
                showSubtleNotification("Auto-slide on");
            } else {
                stopAutoSlide();
                // Show notification when auto-slide is turned off
                showSubtleNotification("Manual navigation");
            }
        });
    }
    
    // Start auto-slide if enabled
    if (isAutoSlideEnabled && currentProducts.length > 1) {
        startAutoSlide();
    }
    
    // Mouse/touch events for manual navigation
    if (sliderTrack && currentProducts.length > 1) {
        setupManualNavigation(sliderTrack);
    }
    
    // Add keyboard navigation for slider
    document.addEventListener('keydown', handleKeyboardNavigation);
}

function setupManualNavigation(sliderTrack) {
    // Mouse events for desktop
    sliderTrack.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Touch events for mobile
    sliderTrack.addEventListener('touchstart', handleTouchStart);
    sliderTrack.addEventListener('touchmove', handleTouchMove);
    sliderTrack.addEventListener('touchend', handleTouchEnd);
    
    // Wheel event for mouse wheel scrolling
    sliderTrack.addEventListener('wheel', handleWheel, { passive: false });
}

function handleMouseDown(e) {
    isDragging = true;
    startX = e.clientX;
    sliderTrack.style.cursor = 'grabbing';
    stopAutoSlide(); // Stop auto-slide during manual interaction
}

function handleMouseMove(e) {
    if (!isDragging) return;
    currentX = e.clientX;
}

function handleMouseUp(e) {
    if (!isDragging) return;
    isDragging = false;
    sliderTrack.style.cursor = 'grab';
    
    handleSwipeGesture();
    
    // Resume auto-slide if enabled after manual interaction
    if (isAutoSlideEnabled && currentProducts.length > 1) {
        temporarilyPauseAutoSlide();
    }
}

function handleTouchStart(e) {
    isDragging = true;
    startX = e.touches[0].clientX;
    stopAutoSlide(); // Stop auto-slide during touch interaction
}

function handleTouchMove(e) {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
}

function handleTouchEnd(e) {
    if (!isDragging) return;
    isDragging = false;
    
    handleSwipeGesture();
    
    // Resume auto-slide if enabled after manual interaction
    if (isAutoSlideEnabled && currentProducts.length > 1) {
        temporarilyPauseAutoSlide();
    }
}

function handleWheel(e) {
    e.preventDefault();
    
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        // Horizontal scroll
        if (e.deltaX > 0) {
            goToNextSlide();
        } else {
            goToPrevSlide();
        }
    } else {
        // Vertical scroll (treat as horizontal for convenience)
        if (e.deltaY > 0) {
            goToNextSlide();
        } else {
            goToPrevSlide();
        }
    }
    
    handleManualNavigation();
}

function handleSwipeGesture() {
    const diff = startX - currentX;
    const swipeThreshold = 50;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - go to next
            goToNextSlide();
        } else {
            // Swipe right - go to previous
            goToPrevSlide();
        }
        handleManualNavigation();
    }
}

function handleManualNavigation() {
    // When user manually navigates, handle auto-slide behavior
    if (isAutoSlideEnabled) {
        temporarilyPauseAutoSlide();
    }
    // If auto-slide is off, manual navigation works without any auto behavior
}

function handleKeyboardNavigation(e) {
    if (!modal.classList.contains('active')) return;
    
    switch(e.key) {
        case 'ArrowLeft':
            e.preventDefault();
            goToPrevSlide();
            handleManualNavigation();
            break;
        case 'ArrowRight':
            e.preventDefault();
            goToNextSlide();
            handleManualNavigation();
            break;
        case ' ':
            e.preventDefault();
            // Toggle auto-slide with spacebar
            const autoSlideToggle = document.getElementById('autoSlideToggle');
            if (autoSlideToggle) {
                autoSlideToggle.click();
            }
            break;
    }
}

function goToSlide(slideIndex) {
    if (slideIndex < 0 || slideIndex >= currentProducts.length) return;
    
    currentSlide = slideIndex;
    updateSlider();
}

function goToNextSlide() {
    if (currentProducts.length === 0) return;
    
    currentSlide = (currentSlide + 1) % currentProducts.length;
    updateSlider();
}

function goToPrevSlide() {
    if (currentProducts.length === 0) return;
    
    currentSlide = (currentSlide - 1 + currentProducts.length) % currentProducts.length;
    updateSlider();
}

function updateSlider() {
    const sliderTrack = document.querySelector('.slider-track');
    const sliderDots = document.querySelectorAll('.slider-dot');
    const slideCounter = document.getElementById('slideCounter');
    
    if (!sliderTrack) return;
    
    // Update slider position
    sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update active dot
    sliderDots.forEach((dot, index) => {
        if (dot) {
            dot.classList.toggle('active', index === currentSlide);
        }
    });
    
    // Update slide counter
    if (slideCounter) {
        slideCounter.textContent = `${currentSlide + 1} / ${currentProducts.length}`;
    }
}

function startAutoSlide() {
    stopAutoSlide(); // Clear any existing interval
    
    if (currentProducts.length > 1 && isAutoSlideEnabled) {
        autoSlideInterval = setInterval(goToNextSlide, 4000); // Change slide every 4 seconds
    }
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

function temporarilyPauseAutoSlide() {
    if (isAutoSlideEnabled && currentProducts.length > 1) {
        stopAutoSlide();
        
        // Clear any existing timeout
        if (temporaryPauseTimeout) {
            clearTimeout(temporaryPauseTimeout);
        }
        
        // Restart auto-slide after 5 seconds of manual navigation inactivity
        temporaryPauseTimeout = setTimeout(() => {
            if (isAutoSlideEnabled && currentProducts.length > 1) {
                startAutoSlide();
            }
        }, 5000);
    }
}

function showSubtleNotification(message) {
    // Create subtle notification element
    const notification = document.createElement('div');
    notification.className = 'subtle-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: absolute;
        top: 60px;
        right: 1rem;
        background: rgba(255, 107, 53, 0.8);
        color: white;
        padding: 5px 10px;
        border-radius: 15px;
        font-size: 12px;
        z-index: 10;
        animation: fadeInOut 2s ease-in-out;
    `;
    
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.appendChild(notification);
        
        // Remove notification after animation
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 2000);
    }
}

function hideModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Remove slider mode classes
    const modalContent = modal.querySelector('.modal-content');
    const modalBody = modal.querySelector('.modal-body');
    
    if (modalContent) modalContent.classList.remove('slider-mode');
    if (modalBody) modalBody.classList.remove('slider-mode');
    
    // Stop auto-slide and clear timeouts
    stopAutoSlide();
    if (temporaryPauseTimeout) {
        clearTimeout(temporaryPauseTimeout);
        temporaryPauseTimeout = null;
    }
    
    // Clean up event listeners
    const sliderTrack = document.querySelector('.slider-track');
    if (sliderTrack) {
        // Remove all manual navigation event listeners
        const newTrack = sliderTrack.cloneNode(true);
        sliderTrack.parentNode.replaceChild(newTrack, sliderTrack);
    }
    
    // Remove keyboard event listener for slider
    document.removeEventListener('keydown', handleKeyboardNavigation);
    
    // Clear current products
    currentProducts = [];
}


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
