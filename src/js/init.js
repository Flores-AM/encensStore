// init.js - Inicialización común para todas las páginas
document.addEventListener("DOMContentLoaded", () => {
    // Inicializar variables globales si no están definidas
    if (!window.productos) {
        window.productos = [];
    }
    
    if (!window.carrito) {
        window.carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    }
    
    if (!window.aromasSeleccionados) {
        window.aromasSeleccionados = {};
    }
    
    // Inicializar carrito
    if (typeof actualizarCarrito === 'function') {
        actualizarCarrito();
    }
    
    // Inicializar nav scroll en todas las páginas
    if (typeof initNavScroll === 'function') {
        initNavScroll();
    }
});