// navScroll.js - Versión universal para todas las páginas

function initNavScroll() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    // Agregar clases iniciales
    nav.classList.add('nav-visible');
    
    let lastScroll = 0;
    const scrollThreshold = 100;
    let isEnabled = true;

    function handleScroll() {
        if (!isEnabled) return;
        
        const currentScroll = window.pageYOffset;
        
        // Resetear al llegar al top
        if (currentScroll <= 10) {
            nav.classList.remove('nav-hidden', 'scrolled');
            nav.classList.add('nav-visible');
            return;
        }
        
        // Cambiar estilo al hacer scroll down
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Ocultar/mostrar según dirección del scroll
        if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
            nav.classList.remove('nav-visible');
            nav.classList.add('nav-hidden');
        } else if (currentScroll < lastScroll) {
            nav.classList.remove('nav-hidden');
            nav.classList.add('nav-visible');
        }
        
        lastScroll = currentScroll;
    }
    
    // Inicializar
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Manejar interacción con carrito (si existe)
    const carritoDesplegable = document.querySelector('.carrito-desplegable');
    if (carritoDesplegable) {
        const observer = new MutationObserver((mutations) => {
            isEnabled = !carritoDesplegable.classList.contains('active');
            if (!isEnabled) {
                nav.classList.remove('nav-hidden');
                nav.classList.add('nav-visible');
            }
        });
        
        observer.observe(carritoDesplegable, {
            attributes: true,
            attributeFilter: ['class']
        });
    }
}

// Exportar para init.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initNavScroll };
} else {
    window.initNavScroll = initNavScroll;
}