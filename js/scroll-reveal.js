class ScrollReveal {
    constructor() {
        this.sections = document.querySelectorAll('.reveal-section');
        this.init();
    }
    
    init() {
        // Immediately reveal all sections (they should all be visible)
        this.sections.forEach(section => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
            section.style.visibility = 'visible';
            section.style.display = 'block';
        });
        
        // Also set up observer for scroll effects
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        this.sections.forEach(section => {
            observer.observe(section);
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.scrollReveal = new ScrollReveal();
});