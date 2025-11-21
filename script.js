document.addEventListener('DOMContentLoaded', function() {
    // Loader
    const loader = document.querySelector('.loader');
    if (loader) {
        window.addEventListener('load', () => {
            loader.style.transition = 'opacity 0.5s';
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        });
    }

    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Review Slider
    const slides = document.querySelectorAll('.slide');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    let slideIndex = 0;

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        if (n >= slides.length) { slideIndex = 0; }
        if (n < 0) { slideIndex = slides.length - 1; }
        slides[slideIndex].classList.add('active');
    }

    function nextSlide() {
        showSlide(++slideIndex);
    }

    if (slides.length > 0) {
        showSlide(slideIndex);

        if(prev && next) {
            prev.addEventListener('click', () => showSlide(--slideIndex));
            next.addEventListener('click', () => nextSlide());
        }

        setInterval(nextSlide, 5000); // Autoplay every 5 seconds
    }

    // Animate on scroll
    const fadeInElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    fadeInElements.forEach(element => {
        observer.observe(element);
    });

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const closeBtn = document.querySelector('.close-btn');

    if (lightbox) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                lightbox.style.display = 'block';
                lightboxImg.src = item.src;
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                lightbox.style.display = 'none';
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target == lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }

    // Contact Form Validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = contactForm.querySelector('input[name="name"]').value;
            const email = contactForm.querySelector('input[name="email"]').value;
            const message = contactForm.querySelector('textarea[name="message"]').value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                alert('Please fill in all fields.');
                return;
            }

            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // If validation passes, you can submit the form here or show a success message
            // For now, we'll just show a success message
            contactForm.innerHTML = '<h3>Thank you for your message!</h3>';
        });
    }

    // Door Animation for About Us page
    const doorAnimation = document.querySelector('.door-animation');
    const pageContent = document.getElementById('page-content');

    if (doorAnimation && pageContent) {
        window.addEventListener('load', () => {
            doorAnimation.classList.add('door-open');
            setTimeout(() => {
                doorAnimation.style.display = 'none';
            }, 1500); // Match this duration to your CSS transition duration
        });
    }

    // Page Turn Animation for Menu page
    if (window.location.pathname.includes('menu.html')) {
        document.body.classList.add('page-turn');
    }

    // Pillar Modal
    const pillarModal = document.getElementById('pillar-modal');
    if (pillarModal) {
        const pillars = document.querySelectorAll('.pillar[data-pillar]');
        const closeModalBtn = pillarModal.querySelector('.close-modal-btn');
        const sliderContainer = pillarModal.querySelector('.pillar-slider');
        const nextBtn = pillarModal.querySelector('.pillar-next');
        const prevBtn = pillarModal.querySelector('.pillar-prev');

        const pillarImages = {
            '1': [
                'images/peninsula1.jpeg',
                'images/peninsula2.jpeg',
                'images/peninsula3.jpeg'
            ],
            '2': [
                'images/conference1.jpeg',
                'images/conference2.jpeg',
                'images/conference3.jpeg',
                'images/conference4.jpeg'
            ],
            '3': [
                'images/tidings1.jpeg',
                'images/tidings2.jpeg',
                'images/tidings3.jpeg',
                'images/tidings4.jpeg',
                'images/tidings video.mp4'
            ]
        };

        let currentImages = [];
        let currentImageIndex = 0;

        function showPillarImage(index) {
            const slides = sliderContainer.querySelectorAll('.pillar-slide');
            slides.forEach(slide => slide.style.display = 'none');
            slides[index].style.display = 'block';
        }

        pillars.forEach(pillar => {
            pillar.addEventListener('click', () => {
                const pillarId = pillar.dataset.pillar;
                currentImages = pillarImages[pillarId];

                if (currentImages && currentImages.length > 0) {
                    sliderContainer.innerHTML = ''; // Clear previous images
                    currentImages.forEach(src => {
                        const slide = document.createElement('div');
                        slide.className = 'pillar-slide';
                        if (src.endsWith('.mp4')) {
                            const video = document.createElement('video');
                            video.src = src;
                            video.autoplay = true;
                            video.loop = true;
                            video.muted = true;
                            video.playsInline = true;
                            slide.appendChild(video);
                        } else {
                            const img = document.createElement('img');
                            img.src = src;
                            slide.appendChild(img);
                        }
                        sliderContainer.appendChild(slide);
                    });

                    currentImageIndex = 0;
                    showPillarImage(currentImageIndex);
                    pillarModal.style.display = 'block';
                }
            });
        });

        closeModalBtn.addEventListener('click', () => {
            pillarModal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target == pillarModal) {
                pillarModal.style.display = 'none';
            }
        });

        nextBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % currentImages.length;
            showPillarImage(currentImageIndex);
        });

        prevBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
            showPillarImage(currentImageIndex);
        });
    }
});