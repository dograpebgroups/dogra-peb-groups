// ============================================
// BANNER SLIDER
// ============================================

document.addEventListener("DOMContentLoaded", () => {
    const fullbanners = document.querySelectorAll(".full-banner");

    if (!fullbanners.length) {
        return;
    }

    let index = 0;

    setInterval(() => {
        fullbanners[index].classList.remove("active");
        index = (index + 1) % fullbanners.length;
        fullbanners[index].classList.add("active");
    }, 4000);
});

document.addEventListener("DOMContentLoaded", () => {
    const mbbanners = document.querySelectorAll(".mb-banner");

    if (!mbbanners.length) {
        return;
    }

    let index = 0;

    setInterval(() => {
        mbbanners[index].classList.remove("active");
        index = (index + 1) % mbbanners.length;
        mbbanners[index].classList.add("active");
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
const visibleCards = 3;

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

    const cardStyle = window.getComputedStyle(cards[0]);
    const cardWidth =
        cards[0].offsetWidth +
        parseInt(cardStyle.marginLeft) +
        parseInt(cardStyle.marginRight);

    const maxSlides = cards.length - visibleCards + 1;

    // Safety clamp
    if (currentService >= maxSlides) {
        currentService = maxSlides - 1;
    }

    track.style.transform = `translateX(-${currentService * cardWidth}px)`;

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentService);
    });
}


function nextServiceSlide() {
    const cards = servicesTrack.querySelectorAll('.service-card');
    const maxSlides = cards.length - visibleCards + 1;

    if (currentService < maxSlides - 1) {
        currentService++;
        updateServicesSlider();
    }
}

function prevServiceSlide() {
    if (currentService > 0) {
        currentService--;
        updateServicesSlider();
    }
}

function goToService(index) {
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
    
    // // Auto advance services slider (only if slider exists)
    // if (servicesTrack) {
    //     setInterval(nextServiceSlide, 5000);
    // }
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

document.addEventListener("DOMContentLoaded", () => {

    const popup = document.getElementById("projectPopup");

    if(!popup) return;

    const overlay = document.getElementById("projectPopupOverlay");
    const closeBtn = document.getElementById("projectPopupClose");

    const titleEl = document.getElementById("projectPopupTitle");
    const locationEl = document.querySelector("#projectPopupLocation span");
    const imageEl = document.getElementById("projectPopupImage");
    const descEl = document.getElementById("projectPopupDescription");

    const scaleEl = document.getElementById("projectPopupScale");
    const timelineEl = document.getElementById("projectPopupTimeline");
    const categoryEl = document.getElementById("projectPopupCategory");

    const keyPointsEl = document.getElementById("projectPopupKeyPoints");

    const clientNameEl = document.getElementById("projectPopupClientName");
    const clientRoleEl = document.getElementById("projectPopupClientRole");
    const testimonialEl = document.getElementById("projectPopupTestimonial");

    const prevBtn = popup.querySelector(".popup-prev");
    const nextBtn = popup.querySelector(".popup-next");

    let galleryImages = [];
    let currentImageIndex = 0;

    document.querySelectorAll(".view-project-summary").forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault();
            const card = btn.closest(".project-card");
            if (!card) return;
            openPopupFromCard(card);
        });
    });

    function openPopupFromCard(card) {

        /* ---------- BASIC DATA ---------- */

        titleEl.textContent = card.querySelector("h3")?.textContent || "";
        locationEl.textContent =
            card.querySelector(".fa-map-marker-alt")?.parentElement.textContent.trim() || "";
        descEl.textContent =
            card.querySelector(".project-content > p:nth-of-type(2)")?.textContent || "";

        /* ---------- TAGS ---------- */

        const tags = [...card.querySelectorAll(".project-tag")].map(t => t.textContent.trim());
        keyPointsEl.innerHTML = "";
        tags.forEach(tag => {
            keyPointsEl.innerHTML += `
                <div class="key-point">
                    <i class="fas fa-check-circle"></i> ${tag}
                </div>`;
        });

        scaleEl.textContent = tags.length >= 3 ? "Large" : "Medium";
        timelineEl.textContent = "As per project scope";
        categoryEl.textContent = tags[0] || "Project";

        /* ---------- CLIENT DATA ---------- */

        clientNameEl.textContent =
            card.querySelector(".c-name")?.value || "Project Client";
        clientRoleEl.textContent =
            card.querySelector(".c-role")?.value || "Authorized Representative";
        testimonialEl.textContent =
            `"${card.querySelector(".c-testimonial")?.value || "Excellent project execution."}"`;

        /* ---------- IMAGE GALLERY ---------- */

        galleryImages = [...card.querySelectorAll(".project-img")].map(i => i.value);
        currentImageIndex = 0;

        setGalleryImage();

        popup.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function setGalleryImage() {
        if (!galleryImages.length) return;
        imageEl.src = galleryImages[currentImageIndex];
        imageEl.alt = titleEl.textContent;
    }

    prevBtn.addEventListener("click", () => {
        if (!galleryImages.length) return;
        currentImageIndex =
            (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        setGalleryImage();
    });

    nextBtn.addEventListener("click", () => {
        if (!galleryImages.length) return;
        currentImageIndex =
            (currentImageIndex + 1) % galleryImages.length;
        setGalleryImage();
    });

    function closePopup() {
        popup.classList.remove("active");
        document.body.style.overflow = "";
        galleryImages = [];
    }

    closeBtn.addEventListener("click", closePopup);
    overlay.addEventListener("click", closePopup);

    document.addEventListener("keydown", e => {
        if (!popup.classList.contains("active")) return;
        if (e.key === "Escape") closePopup();
        if (e.key === "ArrowLeft") prevBtn.click();
        if (e.key === "ArrowRight") nextBtn.click();
    });

    window.closeProjectPopup = closePopup;
});

