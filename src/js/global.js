
// Variables globales compartidas
window.carrito = JSON.parse(localStorage.getItem('carrito')) || [];
window.idProductoActual = '';
window.aromasSeleccionados = {};
window.scrollPosition = 0;

// Exporta las variables si usas módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        productos,
        carrito,
        idProductoActual,
        aromasSeleccionados,
        scrollPosition
    };
}

// Función de notificación (compartida)
function mostrarNotificacion(mensaje, tipo = 'exito') {
    // Crear elemento de notificación si no existe
    let notificacion = document.querySelector('.notificacion-global');
    if (!notificacion) {
        notificacion = document.createElement('div');
        notificacion.className = 'notificacion-global';
        document.body.appendChild(notificacion);
    }
    
    // Configurar notificación
    notificacion.textContent = mensaje;
    notificacion.className = `notificacion-global ${tipo}`;
    
    // Mostrar
    notificacion.style.display = 'block';
    notificacion.style.opacity = '1';
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
        notificacion.style.opacity = '0';
        setTimeout(() => {
            notificacion.style.display = 'none';
        }, 300);
    }, 3000);
}