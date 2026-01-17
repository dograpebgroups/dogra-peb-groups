// ============================================
// DATA
// ============================================

const projects = [
    {
        id: 1,
        title: 'Industrial PEB Warehouse',
        client: 'J. Kumar Industries',
        location: 'Kangra, HP',
        description: 'A 25,000 sq.ft. pre-engineered building warehouse with advanced insulation and electrical systems.',
        size: '25,000 sq.ft.',
        duration: '12 weeks',
        image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        tags: ['PEB', 'Warehouse', 'Industrial']
    },
    {
        id: 2,
        title: 'Prefab Resort Cottages',
        client: 'Mountain View Resorts',
        location: 'Shimla, HP',
        description: 'Collection of 15 luxury prefabricated cottages for a hillside resort.',
        size: '12,000 sq.ft.',
        duration: '8 weeks',
        image: 'https://images.unsplash.com/photo-1600585154340-0680e0e5f5a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        tags: ['Prefab', 'Resort', 'Luxury']
    },
    {
        id: 3,
        title: 'SS Tanks for Dairy Plant',
        client: 'FreshFarm Dairy',
        location: 'Ludhiana, Punjab',
        description: 'Fabrication of 8 stainless steel tanks for modern dairy processing.',
        size: '8 tanks (60,000L)',
        duration: '6 weeks',
        image: '',
        tags: ['SS Tanks', 'Dairy', 'Food-Grade']
    }
];

const gallery = [
    {
        image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        caption: 'PEB Warehouse Construction'
    },
    {
        image: 'https://images.unsplash.com/photo-1600585154340-0680e0e5f5a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        caption: 'Modern Prefab House'
    },
    {
        image: '',
        caption: 'SS Tank Fabrication'
    },
    {
        image: 'https://images.unsplash.com/photo-1544834841-9d5a00a23b9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        caption: 'Playway Equipment'
    },
    {
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        caption: 'Open Gym Installation'
    },
    {
        image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        caption: 'Factory Interior'
    }
];


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
// DOM ELEMENTS
// ============================================

const header = document.getElementById('header');
const mobileToggle = document.getElementById('mobileToggle');
const navMobile = document.getElementById('navMobile');
const navOverlay = document.getElementById('navOverlay');
const navLinks = document.querySelectorAll('.nav-link');
const servicesTrack = document.getElementById('servicesTrack');
const serviceDots = document.querySelectorAll('.slider-dot');
const prevService = document.getElementById('prevService');
const nextService = document.getElementById('nextService');
const viewProjectBtns = document.querySelectorAll('.view-project');
const galleryItems = document.querySelectorAll('.gallery-item');
const faqQuestions = document.querySelectorAll('.faq-question');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');
const projectModal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

// ============================================
// STATE
// ============================================

let currentService = 0;
let lightboxIndex = 0;

// ============================================
// INITIALIZATION
// ============================================

function init() {
    setupServicesSlider();
    setupEventListeners();
    setupScrollEffects();
    setupAnimations();
    setupFAQ();
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
    const cards = servicesTrack.querySelectorAll('.service-card');
    currentService = (currentService + 1) % 3;
    updateServicesSlider();
}

function prevServiceSlide() {
    const cards = servicesTrack.querySelectorAll('.service-card');
    currentService = (currentService - 1 + 3) % 3;
    updateServicesSlider();
}

function goToService(index) {
    currentService = index;
    updateServicesSlider();
}

// ============================================
// MODAL & LIGHTBOX
// ============================================

function openProjectModal(id) {
    const project = projects.find(p => p.id === id);
    if (!project) return;
    
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalContent').innerHTML = `
        <div style="display: grid; gap: 2rem;">
            <div>
                ${project.image ? 
                    `<img src="${project.image}" alt="${project.title}" style="width: 100%; border-radius: var(--radius);">` : 
                    `<div style="width: 100%; height: 300px; background: linear-gradient(135deg, var(--color-accent-light), var(--color-accent)); border-radius: var(--radius); display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem;">
                        <i class="fas fa-industry"></i>
                    </div>`
                }
            </div>
            <div>
                <h3 style="margin-bottom: 1rem;">Project Details</h3>
                <div style="display: grid; gap: 0.75rem; margin-bottom: 1.5rem;">
                    <div style="display: flex; justify-content: space-between;">
                        <span style="font-weight: 600;">Client:</span>
                        <span>${project.client}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="font-weight: 600;">Location:</span>
                        <span>${project.location}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="font-weight: 600;">Size:</span>
                        <span>${project.size}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="font-weight: 600;">Duration:</span>
                        <span>${project.duration}</span>
                    </div>
                </div>
                <h3 style="margin-bottom: 1rem;">Description</h3>
                <p>${project.description}</p>
            </div>
        </div>
    `;
    
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function openLightbox(index) {
    lightboxIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function updateLightbox() {
    const item = gallery[lightboxIndex];
    if (item.image) {
        lightboxImage.src = item.image;
        lightboxImage.alt = item.caption;
        lightboxCaption.textContent = item.caption;
    } else {
        // Handle missing images
        lightboxImage.src = '';
        lightboxCaption.textContent = item.caption;
        lightboxImage.style.display = 'none';
    }
}

function nextLightbox() {
    lightboxIndex = (lightboxIndex + 1) % gallery.length;
    updateLightbox();
}

function prevLightbox() {
    lightboxIndex = (lightboxIndex - 1 + gallery.length) % gallery.length;
    updateLightbox();
}

// ============================================
// FAQ
// ============================================

function setupFAQ() {
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = item.querySelector('.faq-answer');
            const icon = question.querySelector('.faq-icon');
            
            // Close all other items
            faqQuestions.forEach(q => {
                if (q !== question) {
                    const otherItem = q.parentElement;
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = q.querySelector('.faq-icon');
                    otherAnswer.classList.remove('active');
                    otherIcon.textContent = '+';
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
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });
    
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
    
    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ============================================
// SCROLL EFFECTS
// ============================================

function setupScrollEffects() {
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update active nav link
        updateActiveNavLink();
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ============================================
// MOBILE MENU
// ============================================

function toggleMobileMenu() {
    mobileToggle.classList.toggle('active');
    navMobile.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = navMobile.classList.contains('active') ? 'hidden' : 'auto';
}

function closeMobileMenu() {
    mobileToggle.classList.remove('active');
    navMobile.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ============================================
// EVENT LISTENERS
// ============================================

function setupEventListeners() {
    // Mobile menu toggle
    mobileToggle.addEventListener('click', toggleMobileMenu);
    navOverlay.addEventListener('click', closeMobileMenu);
    
    // Services slider controls
    prevService.addEventListener('click', prevServiceSlide);
    nextService.addEventListener('click', nextServiceSlide);
    
    // Service dots
    serviceDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.dataset.index);
            goToService(index);
        });
    });
    
    // Project modal buttons
    viewProjectBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            openProjectModal(id);
        });
    });
    
    // Gallery items
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            openLightbox(index);
        });
    });
    
    // Modal and lightbox controls
    modalClose.addEventListener('click', closeProjectModal);
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) closeProjectModal();
    });
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    lightboxPrev.addEventListener('click', prevLightbox);
    lightboxNext.addEventListener('click', nextLightbox);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Close modals with Escape
        if (e.key === 'Escape') {
            if (projectModal.classList.contains('active')) {
                closeProjectModal();
            }
            if (lightbox.classList.contains('active')) {
                closeLightbox();
            }
        }
        
        // Lightbox navigation with arrow keys
        if (lightbox.classList.contains('active')) {
            if (e.key === 'ArrowLeft') prevLightbox();
            if (e.key === 'ArrowRight') nextLightbox();
        }
    });
    
    // Setup forms
    setupForms();
    
    // Auto advance services slider
    setInterval(nextServiceSlide, 5000);
}

// ============================================
// INITIALIZE
// ============================================

document.addEventListener('DOMContentLoaded', init);

