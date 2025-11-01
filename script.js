document.addEventListener('DOMContentLoaded', function() {
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
});
