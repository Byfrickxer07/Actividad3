document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.btn-prev');
    const nextBtn = document.querySelector('.btn-next');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const themeToggleBtn = document.querySelector('.theme-toggle-btn');
    const htmlElement = document.documentElement;
    
    // Modal elements
    const modal = document.querySelector('.modal');
    const modalImg = document.querySelector('.modal-contenido img');
    const cerrar = document.querySelector('.cerrar');
    const carouselImages = document.querySelectorAll('.carousel-slide img');

    let currentIndex = 0;
    let autoSlideInterval;

    function moveCarousel() {
        container.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    function nextSlide() {
        currentIndex++;
        if (currentIndex >= slides.length) {
            currentIndex = 0;
        }
        moveCarousel();
    }

    function prevSlide() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = slides.length - 1;
        }
        moveCarousel();
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 3500);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Dark Mode Toggle
    function toggleTheme() {
        if (htmlElement.classList.contains('light-mode')) {
            htmlElement.classList.remove('light-mode');
            htmlElement.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            htmlElement.classList.remove('dark-mode');
            htmlElement.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        }
    }

    // Modal functionality
    carouselImages.forEach(img => {
        img.addEventListener('click', () => {
            // Mostrar modal
            modal.style.display = 'flex';
            
            // Establecer la imagen seleccionada en la modal
            modalImg.src = img.src;
            modalImg.alt = img.alt;
        });
    });

    // Cerrar modal
    cerrar.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Cerrar modal si se hace clic fuera de la imagen
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.classList.remove('light-mode', 'dark-mode');
        htmlElement.classList.add(`${savedTheme}-mode`);
    }

    // Navigation buttons
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    // Theme toggle button
    themeToggleBtn.addEventListener('click', toggleTheme);

    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            moveCarousel();
            stopAutoSlide();
            startAutoSlide();
        });
    });

    // Iniciar auto-slide al cargar la página
    startAutoSlide();

    // Detener auto-slide al pasar el ratón
    container.addEventListener('mouseenter', stopAutoSlide);
    container.addEventListener('mouseleave', startAutoSlide);
});