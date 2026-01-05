        // ============================================
        // DATA
        // ============================================
        
        const services = [
            {
                icon: 'fas fa-building',
                title: 'PEB Construction',
                description: 'Pre-Engineered Building solutions with factory-made components for faster, cost-effective construction.',
                features: [
                    'Warehouses & Factories',
                    'Commercial Complexes',
                    'Schools & Hospitals',
                    'Structural Steel Design',
                    'Fast-Track Erection',
                    'Custom Solutions'
                ]
            },
            {
                icon: 'fas fa-home',
                title: 'Prefab Houses',
                description: 'Modern, affordable factory-built homes assembled on-site in weeks, not months.',
                features: [
                    'Urban & Rural Homes',
                    'Farmhouses & Villas',
                    'Resorts & Cabins',
                    'Staff Quarters',
                    'Eco-Friendly Materials',
                    'Customizable Designs'
                ]
            },
            {
                icon: 'fas fa-industry',
                title: 'MS/SS Tanks',
                description: 'High-quality storage tank solutions for industrial, commercial, and residential applications.',
                features: [
                    'Water & Chemical Storage',
                    'Food & Beverage Tanks',
                    'Fuel & Oil Containers',
                    'Pharmaceutical Grade',
                    'Epoxy Coating',
                    'On-Site Fabrication'
                ]
            },
            {
                icon: 'fas fa-child',
                title: 'Playway Equipment',
                description: 'Safe, engaging playground equipment designed for physical and social development.',
                features: [
                    'Preschool & Daycare',
                    'Public Parks',
                    'Residential Complexes',
                    'Swings & Slides',
                    'Climbing Structures',
                    'Sensory Play Equipment'
                ]
            },
            {
                icon: 'fas fa-dumbbell',
                title: 'Open Gym Equipment',
                description: 'Durable, weather-resistant fitness equipment for public spaces and community wellness.',
                features: [
                    'Public Parks Installation',
                    'Residential Complexes',
                    'Corporate Campuses',
                    'Cardio Machines',
                    'Strength Training',
                    'Bodyweight Stations'
                ]
            }
        ];
        
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
        
        const faqs = [
            {
                question: 'What are the main advantages of PEB construction?',
                answer: 'PEB construction offers 30-40% faster completion, 20-30% cost savings, superior quality control through factory fabrication, design flexibility, reduced construction waste, and easier expansion possibilities.'
            },
            {
                question: 'How long does it take to construct a prefabricated house?',
                answer: 'Prefabricated houses can be completed in 30-60 days depending on size and customization. Factory construction takes 3-4 weeks, while on-site assembly requires 2-3 weeks.'
            },
            {
                question: 'What is the difference between MS and SS tanks?',
                answer: 'MS (Mild Steel) tanks are cost-effective for general storage but require protective coatings. SS (Stainless Steel) tanks offer superior corrosion resistance, hygiene, and longevity, ideal for food and pharmaceutical applications.'
            },
            {
                question: 'What safety standards do your playway equipment meet?',
                answer: 'Our equipment meets ASTM F1487, EN 1176, and IS 15644 safety standards. We use non-toxic materials, powder-coated steel, rounded edges, and appropriate ground surfacing.'
            }
        ];
        
        // ============================================
        // DOM ELEMENTS
        // ============================================
        
        const header = document.getElementById('header');
        const mobileToggle = document.getElementById('mobileToggle');
        const navMobile = document.getElementById('navMobile');
        const navOverlay = document.getElementById('navOverlay');
        const navLinks = document.querySelectorAll('.nav-link');
        const servicesTrack = document.getElementById('servicesTrack');
        const serviceDots = document.getElementById('serviceDots');
        const prevService = document.getElementById('prevService');
        const nextService = document.getElementById('nextService');
        const projectsGrid = document.getElementById('projectsGrid');
        const galleryGrid = document.getElementById('galleryGrid');
        const faqContainer = document.getElementById('faqContainer');
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
        let currentSlide = 0;
        let lightboxIndex = 0;
        
        // ============================================
        // INITIALIZATION
        // ============================================
        
        function init() {
            generateServices();
            generateProjects();
            generateGallery();
            generateFAQ();
            setupEventListeners();
            setupScrollEffects();
            setupAnimations();
        }
        
        // ============================================
        // GENERATE CONTENT
        // ============================================
        
        function generateServices() {
            servicesTrack.innerHTML = '';
            serviceDots.innerHTML = '';
            
            services.forEach((service, index) => {
                // Create service card
                const card = document.createElement('div');
                card.className = 'service-card fade-in';
                card.innerHTML = `
                    <div class="service-icon">
                        <i class="${service.icon}"></i>
                    </div>
                    <h3>${service.title}</h3>
                    <p>${service.description}</p>
                    <ul class="service-features">
                        ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                    <a href="#contact" class="btn btn-outline" style="margin-top: 1rem;">
                        <i class="fas fa-envelope"></i> Get Quote
                    </a>
                `;
                servicesTrack.appendChild(card);
                
                // Create dot
                const dot = document.createElement('div');
                dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
                dot.dataset.index = index;
                dot.addEventListener('click', () => goToService(index));
                serviceDots.appendChild(dot);
            });
            
            updateServicesSlider();
        }
        
        function generateProjects() {
            projectsGrid.innerHTML = '';
            
            projects.forEach(project => {
                const card = document.createElement('div');
                card.className = 'project-card fade-in';
                card.innerHTML = `
                    <div class="project-image">
                        <img src="${project.image}" alt="${project.title}" loading="lazy">
                        <div class="project-overlay">
                            <div class="gallery-caption">
                                <p style="font-weight: 500;">${project.title}</p>
                            </div>
                        </div>
                    </div>
                    <div class="project-content">
                        <h3>${project.title}</h3>
                        <p style="color: var(--color-text-light); font-size: 0.875rem;">
                            <i class="fas fa-user-tie"></i> ${project.client} • <i class="fas fa-map-marker-alt"></i> ${project.location}
                        </p>
                        <p style="margin: 0.75rem 0;">${project.description}</p>
                        <div class="project-tags">
                            ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                        </div>
                        <button class="btn btn-outline view-project" data-id="${project.id}" style="margin-top: 1rem;">
                            <i class="fas fa-search-plus"></i> View Details
                        </button>
                    </div>
                `;
                projectsGrid.appendChild(card);
            });
            
            // Add click events to project buttons
            document.querySelectorAll('.view-project').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = parseInt(this.dataset.id);
                    openProjectModal(id);
                });
            });
        }
        
        function generateGallery() {
            galleryGrid.innerHTML = '';
            
            gallery.forEach((item, index) => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item fade-in';
                galleryItem.dataset.index = index;
                galleryItem.innerHTML = `
                    <img src="${item.image}" alt="${item.caption}" loading="lazy">
                    <div class="gallery-overlay">
                        <div class="gallery-caption">
                            <p style="font-weight: 500;">${item.caption}</p>
                        </div>
                    </div>
                `;
                galleryGrid.appendChild(galleryItem);
            });
            
            // Add click events to gallery items
            document.querySelectorAll('.gallery-item').forEach(item => {
                item.addEventListener('click', function() {
                    const index = parseInt(this.dataset.index);
                    openLightbox(index);
                });
            });
        }
        
        function generateFAQ() {
            faqContainer.innerHTML = '';
            
            faqs.forEach((faq, index) => {
                const faqItem = document.createElement('div');
                faqItem.className = 'faq-item';
                faqItem.innerHTML = `
                    <div class="faq-question">
                        <span>${faq.question}</span>
                        <span class="faq-icon">+</span>
                    </div>
                    <div class="faq-answer">
                        <p>${faq.answer}</p>
                    </div>
                `;
                faqContainer.appendChild(faqItem);
            });
            
            // Add click events to FAQ questions
            document.querySelectorAll('.faq-question').forEach(question => {
                question.addEventListener('click', function() {
                    const faqItem = this.parentElement;
                    const answer = this.nextElementSibling;
                    
                    // Toggle active class
                    this.classList.toggle('active');
                    answer.classList.toggle('active');
                    
                    // Close other FAQs
                    document.querySelectorAll('.faq-question').forEach(other => {
                        if (other !== this) {
                            other.classList.remove('active');
                            other.nextElementSibling.classList.remove('active');
                        }
                    });
                });
            });
        }
        
        // ============================================
        // SERVICES SLIDER
        // ============================================
        
        function updateServicesSlider() {
            const track = servicesTrack;
            const cards = track.querySelectorAll('.service-card');
            const dots = serviceDots.querySelectorAll('.slider-dot');
            
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
            currentService = (currentService + 1) % cards.length;
            updateServicesSlider();
        }
        
        function prevServiceSlide() {
            const cards = servicesTrack.querySelectorAll('.service-card');
            currentService = (currentService - 1 + cards.length) % cards.length;
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
                        <img src="${project.image}" alt="${project.title}" style="width: 100%; border-radius: var(--radius);">
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
            lightboxImage.src = item.image;
            lightboxImage.alt = item.caption;
            lightboxCaption.textContent = item.caption;
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
        // EVENT LISTENERS
        // ============================================
        
        function setupEventListeners() {
            // Mobile menu toggle
            mobileToggle.addEventListener('click', toggleMobileMenu);
            navOverlay.addEventListener('click', closeMobileMenu);
            
            // Services slider controls
            prevService.addEventListener('click', prevServiceSlide);
            nextService.addEventListener('click', nextServiceSlide);
            
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