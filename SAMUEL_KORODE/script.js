document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Mobile Menu Toggle Logic ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const hamburgerIcon = document.querySelector('.hamburger i');
    const links = document.querySelectorAll('.nav-links li a');

    // Toggle menu open/close
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        
        // Swap icon between hamburger bars and close 'X'
        if (navLinks.classList.contains('nav-active')) {
            hamburgerIcon.classList.remove('fa-bars');
            hamburgerIcon.classList.add('fa-times');
        } else {
            hamburgerIcon.classList.remove('fa-times');
            hamburgerIcon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a navigation link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            hamburgerIcon.classList.remove('fa-times');
            hamburgerIcon.classList.add('fa-bars');
        });
    });


    // --- 2. Sticky Header Scroll Effect ---
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    // --- 3. Dynamic Active Link Highlighting (Optional Feature) ---
    // Updates the active link in the navigation based on scroll position
    const sections = document.querySelectorAll('header, section');
    const navItems = document.querySelectorAll('.nav-links li');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Add a slight offset to trigger a bit earlier
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(li => {
            li.classList.remove('active');
            if (li.querySelector('a').getAttribute('href').includes(current)) {
                li.classList.add('active');
            }
        });
    });


    // --- 4. Skill Bar Animation on Scroll ---
    // Animate progress bars only when they scroll into view
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkills = () => {
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2; // Trigger point
            
            if (barPosition < screenPosition) {
                // The width is already set inline in the HTML (e.g., style="width: 95%;")
                // CSS transition handles the smooth filling animation automatically
                bar.style.opacity = '1';
            }
        });
    };
    
    window.addEventListener('scroll', animateSkills);
    // Trigger once on load in case it's already in view
    animateSkills();
});
// --- 5. Experience Carousel Logic ---
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');
    const dotsNav = document.querySelector('.carousel-nav');
    const dots = Array.from(dotsNav.children);

    const slideWidth = slides[0].getBoundingClientRect().width;

    // Arrange slides next to one another
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);

    const moveToSlide = (track, currentSlide, targetSlide) => {
        if (!targetSlide) return; // Prevent errors if clicking past ends
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    };

    const updateDots = (currentDot, targetDot) => {
        if (!targetDot) return;
        currentDot.classList.remove('current-indicator');
        targetDot.classList.add('current-indicator');
    };

    // Next Button Click
    nextButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling;
        const currentDot = dotsNav.querySelector('.current-indicator');
        const nextDot = currentDot.nextElementSibling;

        if (nextSlide) {
            moveToSlide(track, currentSlide, nextSlide);
            updateDots(currentDot, nextDot);
        }
    });

    // Previous Button Click
    prevButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling;
        const currentDot = dotsNav.querySelector('.current-indicator');
        const prevDot = currentDot.previousElementSibling;

        if (prevSlide) {
            moveToSlide(track, currentSlide, prevSlide);
            updateDots(currentDot, prevDot);
        }
    });

    // Dots Click
    dotsNav.addEventListener('click', e => {
        const targetDot = e.target.closest('button');
        if (!targetDot) return;

        const currentSlide = track.querySelector('.current-slide');
        const currentDot = dotsNav.querySelector('.current-indicator');
        const targetIndex = dots.findIndex(dot => dot === targetDot);
        const targetSlide = slides[targetIndex];

        moveToSlide(track, currentSlide, targetSlide);
        updateDots(currentDot, targetDot);
    });

    // Recalculate slide positions on window resize
    window.addEventListener('resize', () => {
        const newSlideWidth = slides[0].getBoundingClientRect().width;
        slides.forEach((slide, index) => {
            slide.style.left = newSlideWidth * index + 'px';
        });
        // Snap back to the current slide to avoid visual bugs
        const currentSlide = track.querySelector('.current-slide');
        track.style.transform = 'translateX(-' + currentSlide.style.left + ')';
    });
    // --- 6. Projects Carousel Drag-to-Scroll ---
    const projectsTrack = document.getElementById('projects-track');
    let isDown = false;
    let startX;
    let scrollLeft;

    if (projectsTrack) {
        projectsTrack.addEventListener('mousedown', (e) => {
            isDown = true;
            projectsTrack.style.cursor = 'grabbing';
            // Disable scroll snapping while dragging for a smoother feel
            projectsTrack.style.scrollSnapType = 'none'; 
            startX = e.pageX - projectsTrack.offsetLeft;
            scrollLeft = projectsTrack.scrollLeft;
        });

        projectsTrack.addEventListener('mouseleave', () => {
            isDown = false;
            projectsTrack.style.cursor = 'grab';
            projectsTrack.style.scrollSnapType = 'x mandatory';
        });

        projectsTrack.addEventListener('mouseup', () => {
            isDown = false;
            projectsTrack.style.cursor = 'grab';
            projectsTrack.style.scrollSnapType = 'x mandatory';
        });

        projectsTrack.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - projectsTrack.offsetLeft;
            const walk = (x - startX) * 2; // Scroll-fast multiplier
            projectsTrack.scrollLeft = scrollLeft - walk;
        });
    }
    // --- 7. Testimonial Center Active Class Logic ---
    const testiTrack = document.getElementById('testi-track');
    const testiCards = document.querySelectorAll('.testi-card');
    const testiDots = document.querySelectorAll('.testi-dot');

    if (testiTrack) {
        // Adjust the scroll position so the first item is centered initially
        const centerFirstCard = () => {
            const firstCard = testiCards[0];
            const trackCenter = testiTrack.offsetWidth / 2;
            const cardCenter = firstCard.offsetWidth / 2;
            testiTrack.scrollLeft = firstCard.offsetLeft - trackCenter + cardCenter;
        };
        
        // Wait briefly for layout to paint, then center
        setTimeout(centerFirstCard, 100);

        testiTrack.addEventListener('scroll', () => {
            let closestCard = null;
            let closestDistance = Infinity;
            const trackCenter = testiTrack.scrollLeft + (testiTrack.offsetWidth / 2);

            testiCards.forEach((card, index) => {
                const cardCenter = card.offsetLeft + (card.offsetWidth / 2);
                const distance = Math.abs(trackCenter - cardCenter);

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestCard = card;
                    
                    // Update active dot
                    testiDots.forEach(dot => dot.classList.remove('active-dot'));
                    if (testiDots[index]) testiDots[index].classList.add('active-dot');
                }
            });

            // Update active card styling for scaling/opacity
            testiCards.forEach(card => card.classList.remove('active-testi'));
            if (closestCard) closestCard.classList.add('active-testi');
        });
    }

    // --- 8. Random Number Counter Animation (0.30s) ---
    const counters = document.querySelectorAll('.random-counter');
    let animationStarted = false;

    const animateNumbers = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 1000; // 0.30 seconds
            const intervalTime = 30; // Change number every 30ms for a chaotic feel
            let elapsed = 0;

            const interval = setInterval(() => {
                // Generate a random 2-digit number while animating
                counter.innerText = Math.floor(Math.random() * 99) + 1;
                elapsed += intervalTime;

                if (elapsed >= duration) {
                    clearInterval(interval);
                    counter.innerText = target; // Arrive at final number
                }
            }, intervalTime);
        });
    };

    // Trigger animation when the stats section scrolls into view
    const statsSection = document.querySelector('.stats-container');
    
    window.addEventListener('scroll', () => {
        if (!statsSection || animationStarted) return;
        
        const sectionPos = statsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight;

        if (sectionPos < screenPos) {
            animationStarted = true;
            animateNumbers();
        }
    });
    // --- 9. Contact Form Logic ---
    const contactForm = document.getElementById('contact-form');
    const messageInput = document.getElementById('message');

    if (contactForm) {
        // Auto-expand textarea as user types
        messageInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });

        // Handle form submission
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // You can integrate EmailJS or a backend API here
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = 'SENT SUCCESSFULLY <i class="fas fa-check"></i>';
            submitBtn.style.backgroundColor = '#fff';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.backgroundColor = 'var(--accent-color)';
                contactForm.reset();
                messageInput.style.height = 'auto';
            }, 3000);
        });
    }