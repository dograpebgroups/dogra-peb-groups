// ============================================
// BANNER SLIDER
// ============================================

document.addEventListener("DOMContentLoaded", () => {
    const banners = document.querySelectorAll(".banner");

    if (!banners.length) {
        return;
    }

    let index = 0;

    setInterval(() => {
        banners[index].classList.remove("active");
        index = (index + 1) % banners.length;
        banners[index].classList.add("active");
    }, 4000);
});


// ============================================
// ABOUT US STATS COUNTER
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.count);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + '+';
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 30);
    });
});

// ============================================
// DOM ELEMENTS (with null checks)
// ============================================

const header = document.getElementById('header');
const mobileToggle = document.getElementById('mobileToggle');
const navMobile = document.getElementById('navMobile');
const navOverlay = document.getElementById('navOverlay');
const servicesTrack = document.getElementById('servicesTrack');
const serviceDots = document.querySelectorAll('.slider-dot');
const prevService = document.getElementById('prevService');
const nextService = document.getElementById('nextService');
const viewProjectBtns = document.querySelectorAll('.view-project');
const galleryItems = document.querySelectorAll('.gallery-item');
const faqQuestions = document.querySelectorAll('.faq-question');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');

// ============================================
// STATE
// ============================================

let currentService = 0;

// ============================================
// INITIALIZATION
// ============================================

function init() {
    setupEventListeners();
    setupScrollEffects();
    setupAnimations();
    setupFAQ();
    
    // Only setup services slider if elements exist
    if (servicesTrack) {
        setupServicesSlider();
    }
}

// ============================================
// SERVICES SLIDER
// ============================================

function setupServicesSlider() {
    updateServicesSlider();
}

function updateServicesSlider() {
    const track = servicesTrack;
    const cards = track.querySelectorAll('.service-card');
    const dots = document.querySelectorAll('.slider-dot');
    
    if (!cards.length) return;
    
    // Calculate card width with margin
    const cardStyle = window.getComputedStyle(cards[0]);
    const cardWidth = cards[0].offsetWidth + 
        parseInt(cardStyle.marginLeft) + 
        parseInt(cardStyle.marginRight);
    
    // Update track position
    track.style.transform = `translateX(-${currentService * cardWidth}px)`;
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentService);
    });
}

function nextServiceSlide() {
    if (!servicesTrack) return;
    
    const cards = servicesTrack.querySelectorAll('.service-card');
    if (!cards.length) return;
    
    currentService = (currentService + 1) % cards.length;
    updateServicesSlider();
}

function prevServiceSlide() {
    if (!servicesTrack) return;
    
    const cards = servicesTrack.querySelectorAll('.service-card');
    if (!cards.length) return;
    
    currentService = (currentService - 1 + cards.length) % cards.length;
    updateServicesSlider();
}

function goToService(index) {
    if (!servicesTrack) return;
    
    const cards = servicesTrack.querySelectorAll('.service-card');
    if (!cards.length || index < 0 || index >= cards.length) return;
    
    currentService = index;
    updateServicesSlider();
}

// ============================================
// FAQ
// ============================================

function setupFAQ() {
    if (!faqQuestions.length) return;
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = item.querySelector('.faq-answer');
            const icon = question.querySelector('.faq-icon');
            
            if (!answer || !icon) return;
            
            // Close all other items
            faqQuestions.forEach(q => {
                if (q !== question) {
                    const otherItem = q.parentElement;
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = q.querySelector('.faq-icon');
                    
                    if (otherAnswer) otherAnswer.classList.remove('active');
                    if (otherIcon) otherIcon.textContent = '+';
                    q.classList.remove('active');
                }
            });
            
            // Toggle current item
            answer.classList.toggle('active');
            icon.textContent = answer.classList.contains('active') ? '−' : '+';
            question.classList.toggle('active');
        });
    });
}

// ============================================
// FORM HANDLING
// ============================================

function setupForms() {
    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate
            if (!data.name || !data.email || !data.phone || !data.message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Show success message
            showNotification('Thank you for your message! We will contact you within 24 hours.', 'success');
            
            // Reset form
            this.reset();
        });
    }
    
    // Newsletter form
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('.newsletter-input').value;
            
            if (!email) {
                showNotification('Please enter your email address.', 'error');
                return;
            }
            
            // Show success message
            showNotification('Thank you for subscribing to our newsletter!', 'success');
            
            // Reset form
            this.reset();
        });
    }
}

// ============================================
// NOTIFICATIONS
// ============================================

function showNotification(message, type = 'success') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Add close event
    const closeBtn = notification.querySelector('.notification-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        });
    }
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ============================================
// ANIMATIONS & EFFECTS
// ============================================

function setupAnimations() {
    // Animate stats counter
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length) {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.count);
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 30);
        });
    }
    
    // Intersection Observer for fade-in animations
    const fadeElements = document.querySelectorAll('.fade-in');
    if (fadeElements.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-visible');
                }
            });
        }, { threshold: 0.1 });
        
        // Observe all fade-in elements
        fadeElements.forEach(el => observer.observe(el));
    }
}

// ============================================
// SCROLL EFFECTS
// ============================================

function setupScrollEffects() {
    // Header scroll effect
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    if (anchorLinks.length) {
        anchorLinks.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ============================================
// MOBILE MENU
// ============================================

function toggleMobileMenu() {
    if (!mobileToggle || !navMobile || !navOverlay) return;
    
    mobileToggle.classList.toggle('active');
    navMobile.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = navMobile.classList.contains('active') ? 'hidden' : 'auto';
}

function closeMobileMenu() {
    if (!mobileToggle || !navMobile || !navOverlay) return;
    
    mobileToggle.classList.remove('active');
    navMobile.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ============================================
// EVENT LISTENERS (with null checks)
// ============================================

function setupEventListeners() {
    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
    }
    
    if (navOverlay) {
        navOverlay.addEventListener('click', closeMobileMenu);
    }
    
    // Services slider controls
    if (prevService) {
        prevService.addEventListener('click', prevServiceSlide);
    }
    
    if (nextService) {
        nextService.addEventListener('click', nextServiceSlide);
    }
    
    // Service dots
    if (serviceDots.length) {
        serviceDots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.dataset.index);
                goToService(index);
            });
        });
    }
    
    
    // Setup forms
    setupForms();
    
    // Auto advance services slider (only if slider exists)
    if (servicesTrack) {
        setInterval(nextServiceSlide, 5000);
    }
}

// ============================================
// INITIALIZE
// ============================================

document.addEventListener('DOMContentLoaded', init);


// *************************************************************************************************************************************
// ****************************************************        OPEN POPUPS JS        ***************************************************
// *************************************************************************************************************************************


// *************************************************************************************************************************************

// ============================================
// SIMPLE IMAGE LIGHTBOX - CLEAN VERSION
// ============================================

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initSimpleLightbox();
});

function initSimpleLightbox() {
    // Get all gallery images
    const galleryImages = document.querySelectorAll('.gallery-item img');
    
    // Add click event to each image
    galleryImages.forEach((img, index) => {
        // Get the parent gallery-item
        const galleryItem = img.closest('.gallery-item');
        
        if (galleryItem) {
            // Store index on the parent
            galleryItem.dataset.index = index;
            
            // Make it clickable
            galleryItem.style.cursor = 'pointer';
            
            // Remove any existing event listeners by cloning
            const newGalleryItem = galleryItem.cloneNode(true);
            galleryItem.parentNode.replaceChild(newGalleryItem, galleryItem);
            
            // Add click event to the new element
            newGalleryItem.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openSimpleLightbox(this);
            });
        }
    });
    
    // Setup lightbox controls
    setupLightboxControls();
}

function openSimpleLightbox(galleryItem) {
    const imgElement = galleryItem.querySelector('img');
    if (!imgElement) return;
    
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxCounter = document.getElementById('lightboxCounter');
    
    if (!lightbox || !lightboxImg) return;
    
    // Get the actual image source
    const imgSrc = imgElement.src;
    
    // Show loading
    showLoadingState(true);
    
    // Set image source with error handling
    lightboxImg.onload = function() {
        showLoadingState(false);
    };
    
    lightboxImg.onerror = function() {
        showLoadingState(false);
        // Try alternative loading method
        setTimeout(() => {
            lightboxImg.src = imgElement.getAttribute('src');
        }, 100);
    };
    
    lightboxImg.src = imgSrc;
    lightboxImg.alt = imgElement.alt || 'Gallery Image';
    
    // Set title if available
    if (lightboxTitle) {
        const caption = galleryItem.querySelector('.gallery-caption p');
        lightboxTitle.textContent = caption?.textContent || imgElement.alt || 'Gallery Image';
    }
    
    // Set counter
    if (lightboxCounter) {
        const total = document.querySelectorAll('.gallery-item').length;
        const current = parseInt(galleryItem.dataset.index) + 1;
        lightboxCounter.textContent = `${current} / ${total}`;
    }
    
    // Store current index globally
    window.currentLightboxIndex = parseInt(galleryItem.dataset.index);
    
    // Show lightbox
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus close button for accessibility
    setTimeout(() => {
        const closeBtn = document.getElementById('lightboxClose');
        if (closeBtn) closeBtn.focus();
    }, 100);
}

function showLoadingState(show) {
    const spinner = document.querySelector('.loading-spinner');
    const errorDiv = document.getElementById('imageError');
    const lightboxImg = document.getElementById('lightboxImage');
    
    if (spinner) spinner.style.display = show ? 'flex' : 'none';
    if (errorDiv) errorDiv.style.display = 'none';
    if (lightboxImg) lightboxImg.style.display = show ? 'none' : 'block';
}

function setupLightboxControls() {
    const lightbox = document.getElementById('imageLightbox');
    if (!lightbox) return;
    
    // Close buttons
    const closeBtn = document.getElementById('lightboxClose');
    const overlay = document.getElementById('lightboxOverlay');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }
    
    if (overlay) {
        overlay.addEventListener('click', closeLightbox);
    }
    
    // Navigation arrows
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', navigateToPrevImage);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', navigateToNextImage);
    }
    
    // Download button
    const downloadBtn = document.getElementById('lightboxDownload');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const img = document.getElementById('lightboxImage');
            if (img && img.src) {
                const link = document.createElement('a');
                link.href = img.src;
                link.download = 'image-' + (window.currentLightboxIndex + 1) + '.jpg';
                link.click();
            }
        });
    }
    
    // Keyboard controls
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                navigateToPrevImage();
                break;
            case 'ArrowRight':
                navigateToNextImage();
                break;
        }
    });
}

function closeLightbox() {
    const lightbox = document.getElementById('imageLightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function navigateToPrevImage() {
    const total = document.querySelectorAll('.gallery-item').length;
    if (total === 0) return;
    
    let newIndex = window.currentLightboxIndex - 1;
    if (newIndex < 0) newIndex = total - 1;
    
    const nextItem = document.querySelector(`.gallery-item[data-index="${newIndex}"]`);
    if (nextItem) {
        openSimpleLightbox(nextItem);
    }
}

function navigateToNextImage() {
    const total = document.querySelectorAll('.gallery-item').length;
    if (total === 0) return;
    
    let newIndex = window.currentLightboxIndex + 1;
    if (newIndex >= total) newIndex = 0;
    
    const nextItem = document.querySelector(`.gallery-item[data-index="${newIndex}"]`);
    if (nextItem) {
        openSimpleLightbox(nextItem);
    }
}

// *************************************************************************************************************************************

// ============================================
// SERVICE SUMMARY POPUP
// ============================================

// DOM Elements
let servicePopup;
let isTyping = false;
let typewriterInterval;

// Initialize Service Popup
function initServicePopup() {
    servicePopup = document.getElementById('servicePopup');
    
    if (!servicePopup) return;
    
    // Add click events to all "View Details" buttons
    const viewButtons = document.querySelectorAll('.view-service-summary');
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceCard = this.closest('.service-card');
            if (serviceCard) {
                openServicePopup(serviceCard);
            }
        });
    });
    
    // Setup close events
    setupServicePopupControls();
}

// Extract data from service card and open popup
function openServicePopup(serviceCard) {
    if (!servicePopup) return;
    
    // Stop any ongoing typing
    if (typewriterInterval) {
        clearInterval(typewriterInterval);
        typewriterInterval = null;
    }
    isTyping = false;
    
    // Extract data from service card
    const iconElement = serviceCard.querySelector('.service-icon i');
    const title = serviceCard.querySelector('h3')?.textContent || 'Service Title';
    const description = serviceCard.querySelector('p')?.textContent || '';
    const features = Array.from(serviceCard.querySelectorAll('.service-features li')).map(li => li.textContent);
    const iconClass = iconElement?.className || 'fas fa-industry';
    
    // Set popup content
    document.getElementById('servicePopupTitle').textContent = title;
    document.getElementById('servicePopupIcon').innerHTML = `<i class="${iconClass}"></i>`;
    
    // Clear previous content
    const descriptionElement = document.getElementById('servicePopupDescription');
    const cursorElement = document.querySelector('.typewriter-cursor');
    const featuresContainer = document.getElementById('servicePopupFeatures');
    
    descriptionElement.textContent = '';
    cursorElement.style.display = 'inline-block';
    featuresContainer.innerHTML = '';
    
    // Show popup
    servicePopup.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Start animations after popup is visible
    setTimeout(() => {
        // Typewriter effect for description
        startTypewriterEffect(descriptionElement, description, cursorElement);
        
        // Animated features after a delay
        setTimeout(() => {
            createAnimatedFeatures(featuresContainer, features);
        }, description.length * 20 + 500); // Wait for typing to complete + 500ms
    }, 300);
}

// Typewriter Effect
function startTypewriterEffect(element, text, cursor) {
    let i = 0;
    element.textContent = '';
    element.style.opacity = '1';
    
    // First, show the text immediately (fade in)
    element.textContent = text;
    element.style.opacity = '0';
    element.style.animation = 'fadeInText 0.5s ease forwards';
    
    // Then start the typewriter effect
    setTimeout(() => {
        element.textContent = '';
        element.style.animation = '';
        
        typewriterInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typewriterInterval);
                typewriterInterval = null;
                cursor.style.display = 'none';
                isTyping = false;
            }
        }, 20); // Typing speed
    }, 300);
}

// Create animated features
function createAnimatedFeatures(container, features) {
    container.innerHTML = '';
    
    features.forEach((feature, index) => {
        const featureItem = document.createElement('div');
        featureItem.className = 'feature-item';
        featureItem.style.animationDelay = `${index * 0.15}s`;
        
        const checkbox = document.createElement('div');
        checkbox.className = 'feature-checkbox';
        checkbox.innerHTML = '<i class="fas fa-check"></i>';
        checkbox.style.animationDelay = `${index * 0.15}s`;
        
        const text = document.createElement('div');
        text.className = 'feature-text';
        text.textContent = feature;
        text.style.animationDelay = `${index * 0.15 + 0.3}s`;
        
        featureItem.appendChild(checkbox);
        featureItem.appendChild(text);
        container.appendChild(featureItem);
    });
}

// Setup popup controls
function setupServicePopupControls() {
    // Close button
    const closeBtn = document.getElementById('servicePopupClose');
    const overlay = document.getElementById('servicePopupOverlay');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeServicePopup);
    }
    
    if (overlay) {
        overlay.addEventListener('click', closeServicePopup);
    }
    
    // Keyboard close
    document.addEventListener('keydown', (e) => {
        if (servicePopup && servicePopup.classList.contains('active') && e.key === 'Escape') {
            closeServicePopup();
        }
    });
}

// Close popup function (also available globally)
function closeServicePopup() {
    if (!servicePopup) return;
    
    // Stop typing if in progress
    if (typewriterInterval) {
        clearInterval(typewriterInterval);
        typewriterInterval = null;
    }
    
    servicePopup.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    initServicePopup();
});


// *************************************************************************************************************************************

// ============================================
// PROJECT POPUP WITH ENHANCED DATA
// ============================================

// Project Data based on your cards
const projectData = {
    1: {
        scale: "Large Scale (25,000 sq.ft.)",
        timeline: "12 Weeks",
        category: "PEB Construction",
        points: [
            "Pre-engineered steel structure for maximum strength",
            "Fast-track construction with modular design",
            "Industrial-grade insulation systems",
            "Customizable layouts for warehouse operations",
            "Earthquake-resistant engineering",
            "Low maintenance & long lifespan"
        ],
        client: {
            name: "Rajesh Kumar",
            role: "Operations Director",
            testimonial: "Dogra PEB Group delivered our warehouse project ahead of schedule with exceptional quality. Their attention to detail and professional approach made the entire process smooth and efficient."
        }
    },
    2: {
        scale: "Medium Scale (12,000 sq.ft.)",
        timeline: "8 Weeks",
        category: "Prefab Construction",
        points: [
            "Modular prefabricated cottages for resorts",
            "Weather-resistant premium materials",
            "Quick on-site assembly process",
            "Modern interior designs & layouts",
            "Eco-friendly construction approach",
            "Scenic hillside location optimization"
        ],
        client: {
            name: "Priya Sharma",
            role: "Resort Owner",
            testimonial: "The prefab cottages transformed our resort completely. The quality exceeded our expectations, and the quick installation meant we could start operations much sooner than planned."
        }
    },
    3: {
        scale: "Industrial Scale (60,000L)",
        timeline: "6 Weeks",
        category: "Tank Fabrication",
        points: [
            "Stainless steel food-grade fabrication",
            "Hygienic processing tank systems",
            "Corrosion-resistant protective coatings",
            "Custom capacity configurations",
            "ISO & FDA compliance standards",
            "Easy maintenance access design"
        ],
        client: {
            name: "Amit Patel",
            role: "Plant Manager",
            testimonial: "The SS tanks fabricated for our dairy plant are of exceptional quality. They met all our hygiene standards and have been performing flawlessly since installation."
        }
    },
    4: {
        scale: "Large Scale (30,000 sq.ft.)",
        timeline: "14 Weeks",
        category: "PEB Industrial",
        points: [
            "Pre-engineered factory shed structure",
            "Heavy-duty industrial operations design",
            "Flexible manufacturing space layout",
            "Quick installation process",
            "Cost-effective construction solution",
            "Durable & weather-resistant materials"
        ],
        client: {
            name: "Sanjay Gupta",
            role: "Factory Owner",
            testimonial: "Our factory shed was constructed with precision and efficiency. The team handled all challenges professionally, delivering a structure that perfectly meets our manufacturing needs."
        }
    },
    5: {
        scale: "Residential Complex",
        timeline: "10 Weeks",
        category: "Prefab Housing",
        points: [
            "Modular staff housing units",
            "Fast delivery & deployment system",
            "Durable construction materials",
            "Cost-efficient accommodation solution",
            "Comfortable living spaces",
            "Easy maintenance design"
        ],
        client: {
            name: "Neha Singh",
            role: "HR Director",
            testimonial: "The staff quarters were delivered quickly and have provided comfortable accommodation for our employees. The quality is excellent and maintenance has been minimal."
        }
    },
    6: {
        scale: "Community Project",
        timeline: "4 Weeks",
        category: "Public Installation",
        points: [
            "Outdoor fitness equipment installation",
            "Public health promotion design",
            "Durable weather-resistant materials",
            "Community park integration",
            "Safety-focused equipment selection",
            "Easy public access design"
        ],
        client: {
            name: "Arjun Mehta",
            role: "Municipal Officer",
            testimonial: "The open gym installation has been a huge success in our community park. Residents appreciate the quality equipment and the positive impact on public health."
        }
    },
    7: {
        scale: "Educational Campus",
        timeline: "5 Weeks",
        category: "Playground Equipment",
        points: [
            "Child-safe playway equipment",
            "Educational activity integration",
            "Safety-focused design standards",
            "Durable & colorful materials",
            "Social interaction promotion",
            "Easy installation process"
        ],
        client: {
            name: "Dr. Anjali Verma",
            role: "School Principal",
            testimonial: "The playway equipment has enhanced our school campus significantly. Children love it, and we appreciate the safety features and durable construction."
        }
    },
    8: {
        scale: "Commercial Building",
        timeline: "9 Weeks",
        category: "Prefab Commercial",
        points: [
            "Prefabricated commercial structure",
            "Quick deployment capabilities",
            "Flexible space utilization design",
            "Durable construction materials",
            "Cost-effective building solution",
            "Modern architectural appearance"
        ],
        client: {
            name: "Vikram Joshi",
            role: "Business Owner",
            testimonial: "Our commercial building was up and running in record time. The prefab approach saved us both time and money without compromising on quality."
        }
    },
    9: {
        scale: "Industrial Storage",
        timeline: "7 Weeks",
        timeline: "6 Weeks",
        category: "Water Storage",
        points: [
            "Mild steel water storage tanks",
            "Industrial capacity requirements",
            "Strength & durability focus",
            "Long-term performance design",
            "Corrosion protection systems",
            "Easy maintenance access"
        ],
        client: {
            name: "Rohan Malhotra",
            role: "Industrial Manager",
            testimonial: "The water storage tanks have been working perfectly for our industrial needs. The fabrication quality is top-notch and they've required zero maintenance."
        }
    }
};

// Indian Names for Clients
const indianNames = [
    "Rohan Sharma", "Priya Patel", "Amit Singh", "Neha Gupta", 
    "Rajesh Kumar", "Anjali Verma", "Vikram Joshi", "Sanjay Mehta",
    "Arjun Reddy", "Deepika Nair", "Karan Malhotra", "Pooja Desai"
];

// DOM Elements
let projectPopup;
let typeInterval;

// Initialize
function initProjectPopup() {
    projectPopup = document.getElementById('projectPopup');
    if (!projectPopup) return;
    
    // Add click events
    document.querySelectorAll('.view-project-summary').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.project-card');
            if (card) openProjectPopup(card);
        });
    });
    
    setupProjectPopupControls();
}

// Open Popup
function openProjectPopup(card) {
    if (!projectPopup) return;
    
    // Stop typing
    if (typeInterval) {
        clearInterval(typeInterval);
        typeInterval = null;
    }
    
    // Extract data from card
    const projectId = card.dataset.id;
    const title = card.querySelector('h3')?.textContent || 'Project';
    const location = card.querySelector('.fa-map-marker-alt')?.parentElement?.textContent?.trim() || '';
    const image = card.querySelector('.project-image img')?.src || '';
    const description = card.querySelector('.project-content p:nth-of-type(2)')?.textContent || '';
    const tags = Array.from(card.querySelector('.project-tags')?.querySelectorAll('.project-tag') || [])
        .map(tag => tag.textContent);
    
    // Get additional data
    const data = projectData[projectId] || getDefaultData(tags);
    
    // Set basic content
    document.getElementById('projectPopupTitle').textContent = title;
    document.getElementById('projectPopupLocation').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${location}`;
    document.getElementById('projectPopupImage').src = image;
    document.getElementById('projectPopupImage').alt = title;
    document.getElementById('projectPopupScale').textContent = data.scale;
    document.getElementById('projectPopupTimeline').textContent = data.timeline;
    document.getElementById('projectPopupCategory').textContent = data.category;
    
    // Set client testimonial
    const client = data.client || getRandomClient();
    document.getElementById('projectPopupClientName').textContent = client.name;
    document.getElementById('projectPopupClientRole').textContent = client.role;
    document.getElementById('projectPopupTestimonial').textContent = `"${client.testimonial}"`;
    
    // Clear and setup typing
    const descElement = document.getElementById('projectPopupDescription');
    const cursor = document.querySelector('.project-typewriter-cursor');
    descElement.textContent = '';
    cursor.style.display = 'inline-block';
    
    // Create key points from tags and data
    createKeyPoints(tags, data.points);
    
    // Show popup
    projectPopup.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Start animations
    setTimeout(() => {
        startTyping(descElement, description, cursor);
        animateDetails();
    }, 400);
}

// Create key points
function createKeyPoints(tags, additionalPoints) {
    const container = document.getElementById('projectPopupKeyPoints');
    container.innerHTML = '';
    
    // Combine tags and additional points
    const allPoints = [...tags, ...(additionalPoints || [])];
    
    allPoints.slice(0, 6).forEach((point, index) => {
        const pointItem = document.createElement('div');
        pointItem.className = 'key-point-item';
        pointItem.style.animationDelay = `${index * 0.1}s`;
        
        const icon = document.createElement('div');
        icon.className = 'key-point-icon';
        icon.innerHTML = '<i class="fas fa-check"></i>';
        
        const text = document.createElement('div');
        text.className = 'key-point-text';
        text.textContent = point;
        
        pointItem.appendChild(icon);
        pointItem.appendChild(text);
        container.appendChild(pointItem);
    });
}

// Typewriter effect
function startTyping(element, text, cursor) {
    let i = 0;
    element.textContent = '';
    
    typeInterval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
            typeInterval = null;
            cursor.style.display = 'none';
        }
    }, 20);
}

// Animate detail items
function animateDetails() {
    document.querySelectorAll('.detail-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        item.style.animationFillMode = 'forwards';
    });
}

// Get random Indian client
function getRandomClient() {
    const randomName = indianNames[Math.floor(Math.random() * indianNames.length)];
    const roles = ["Project Manager", "Operations Head", "Business Owner", "Plant Manager", "Director"];
    const randomRole = roles[Math.floor(Math.random() * roles.length)];
    
    const testimonials = [
        "Excellent work quality and timely delivery. Highly recommended!",
        "Professional team that delivered beyond expectations.",
        "Quality construction with attention to detail. Very satisfied!",
        "Completed the project ahead of schedule. Great experience!",
        "Reliable and trustworthy service provider. Will work with them again."
    ];
    const randomTestimonial = testimonials[Math.floor(Math.random() * testimonials.length)];
    
    return {
        name: randomName,
        role: randomRole,
        testimonial: randomTestimonial
    };
}

// Get default data based on tags
function getDefaultData(tags) {
    const tag = tags[0]?.toLowerCase() || 'industrial';
    
    const dataMap = {
        'peb': { scale: "Large Scale", timeline: "12 Weeks", category: "PEB Construction" },
        'prefab': { scale: "Medium Scale", timeline: "8 Weeks", category: "Prefab Construction" },
        'industrial': { scale: "Industrial Scale", timeline: "10 Weeks", category: "Industrial Construction" },
        'tank': { scale: "Storage System", timeline: "6 Weeks", category: "Tank Fabrication" },
        'factory': { scale: "Factory Scale", timeline: "14 Weeks", category: "Industrial Shed" },
        'residential': { scale: "Residential Complex", timeline: "10 Weeks", category: "Housing" },
        'commercial': { scale: "Commercial Building", timeline: "9 Weeks", category: "Commercial Construction" },
        'public': { scale: "Public Project", timeline: "5 Weeks", category: "Public Installation" }
    };
    
    return dataMap[tag] || { 
        scale: "Standard Scale", 
        timeline: "8-12 Weeks", 
        category: "Construction Project" 
    };
}

// Setup controls
function setupProjectPopupControls() {
    const closeBtn = document.getElementById('projectPopupClose');
    const overlay = document.getElementById('projectPopupOverlay');
    
    if (closeBtn) closeBtn.addEventListener('click', closeProjectPopup);
    if (overlay) overlay.addEventListener('click', closeProjectPopup);
    
    document.addEventListener('keydown', (e) => {
        if (projectPopup?.classList.contains('active') && e.key === 'Escape') {
            closeProjectPopup();
        }
    });
}

// Close popup
function closeProjectPopup() {
    if (!projectPopup) return;
    
    if (typeInterval) {
        clearInterval(typeInterval);
        typeInterval = null;
    }
    
    projectPopup.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Initialize
document.addEventListener('DOMContentLoaded', initProjectPopup);