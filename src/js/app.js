// Modifica el evento DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    // Inicializar variables globales si no están definidas
    if (!window.productos) {
        console.warn('Productos no está definido');
        window.productos = [];
    }
    
    if (!window.carrito) {
        window.carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    }

    // Inicializar elementos del carrito si existen
    const carritoIcono = document.querySelector('.carrito-icono');
    if (carritoIcono) {
        carritoIcono.addEventListener('click', toggleCarrito);
    }

    // Inicializar filtros solo si estamos en la página de productos
    const opcionesFiltro = document.querySelectorAll('input[name="opcion"]');
    if (opcionesFiltro.length > 0) {
        opcionesFiltro.forEach(radio => {
            radio.addEventListener('change', (e) => {
                datosBusqueda.marca = e.target.value;
                filtrarProductos();
            });
        });
    }

    // Mostrar productos solo si el contenedor existe
    const cajaProductos = document.querySelector('.caja-productos');
    if (cajaProductos) {
        mostrarProductos(window.productos);
    }

    // Actualizar carrito siempre
    actualizarCarrito();
});

// Al inicio del archivo
if (typeof productos === 'undefined') {
    console.error('Error: productos no está definido');
    // Puedes cargar productos alternativos o mostrar un mensaje
}

// Variables

const cajaProductos = document.querySelector('.caja-productos') || null;

const todo = document.querySelector('#todo');
const satya = document.querySelector('#satya');
const sagradaMadre = document.querySelector('#sagrada-madre');
const aromanza = document.querySelector('#aromanza');

const datosBusqueda = { marca: '' };

// Eventos

// Mostrar productos
function mostrarProductos(productos) {
    limpiarHTML();

    if (!productos || productos.length === 0) {
        cajaProductos.innerHTML = '<div class="sin-productos"><p>No se encontraron productos</p></div>';
        return;
    }

    productos.forEach(producto => {
        const productoHTML = document.createElement('div');
        productoHTML.classList.add('producto');
        productoHTML.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.linea} - ${producto.marca}" 
                 onerror="this.onerror=null; this.src='../build/img/producto-default.jpg'">
            <div class="datos">
                <div class="linea-precio">
                    <h3>${producto.linea}</h3>
                    <p>${producto.precio}</p>
                </div>
                <button class="ver-producto" data-id="${producto.id}">Ver</button>
            </div>
        `;
        cajaProductos.appendChild(productoHTML);
    });

    // Eventos para botones "Ver"
    document.querySelectorAll('.ver-producto').forEach(boton => {
        boton.addEventListener('click', (e) => {
            const idProducto = e.target.getAttribute('data-id');
            const producto = productos.find(p => p.id === idProducto);
            if (producto) abrirModal(producto);
        });
    });
}

function filtrarProductos() {
    const resultados = datosBusqueda.marca 
        ? productos.filter(p => p.marca === datosBusqueda.marca)
        : [...productos];
    
    mostrarProductos(resultados);
}

// Limpiar HTML
function limpiarHTML() {
    if (!cajaProductos) {
        console.error('cajaProductos no está definido');
        return;
    }
    
    while(cajaProductos.firstChild) {
        cajaProductos.removeChild(cajaProductos.firstChild);
    }
}

// Variables para el modal
const modal = document.getElementById('producto-modal');
const modalImagen = document.getElementById('modal-imagen');
const modalLinea = document.getElementById('modal-linea');
const modalMarca = document.getElementById('modal-marca');
const modalPrecio = document.getElementById('modal-precio');
const modalListaAromas = document.getElementById('modal-lista-aromas');
const cerrarModalBtn = document.querySelector('.cerrar-modal');

// Función para abrir el modal
function abrirModal(producto) {
    if (!modal) {
        console.error('Modal no encontrado en el DOM');
        return;
    }

    // Configuración inicial del modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    window.scrollPosition = window.pageYOffset;
    document.body.style.top = `-${window.scrollPosition}px`;
    document.body.classList.add("body-scroll-lock");
    
    window.idProductoActual = producto.id;
    window.aromasSeleccionados = {};
    
    // Configurar imagen
    modalImagen.onerror = () => {
        modalImagen.src = "build/img/producto-default.jpg";
    };
    modalImagen.src = producto.imagen;
    
    // Configurar información del producto
    modalLinea.textContent = producto.linea;
    modalMarca.textContent = producto.marca;
    modalPrecio.innerHTML = producto.precio;
    
    // Actualizar lista de aromas
    actualizarModalAromas(producto);
    
    // Configurar el botón del carrito
    setupCarritoButton();
    
    // Mostrar el modal
    modal.style.display = "flex";
    
    console.log('Modal abierto correctamente para:', producto.linea);
}

// Función para cerrar el modal
function cerrarModal() {
    if (!modal) return;
    
    modal.classList.remove('active');
    modal.style.display = 'none';
    document.body.classList.remove('body-scroll-lock');
    document.body.style.overflow = '';
    
    if (window.scrollPosition !== undefined) {
        window.scrollTo(0, window.scrollPosition);
    }
    
    document.body.style.top = '';
}

// Eventos del modal
if (cerrarModalBtn) {
    cerrarModalBtn.addEventListener('click', cerrarModal);
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            cerrarModal();
        }
    });
}

// Eventos del modal
if (cerrarModalBtn) {
    cerrarModalBtn.addEventListener('click', cerrarModal);
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            cerrarModal();
        }
    });
}

// Función para actualizar el modal con aromas interactivos
function actualizarModalAromas(producto) {
    const datosProducto = catalogo[producto.marca][producto.linea];
    modalListaAromas.innerHTML = '';

    datosProducto.aromas.forEach(aroma => {
        const itemAroma = document.createElement('div');
        itemAroma.className = `aroma-item ${aroma.stock === 0 ? 'aroma-sin-stock' : ''}`;
        
        const nombreAroma = document.createElement('span');
        nombreAroma.textContent = aroma.nombre;
        
        const contador = document.createElement('div');
        contador.className = 'contador-cantidad';
        
        const btnMenos = document.createElement('button');
        btnMenos.textContent = '-';
        btnMenos.disabled = true;
        
        const cantidad = document.createElement('span');
        cantidad.textContent = '0';
        cantidad.className = 'cantidad-aroma';
        cantidad.dataset.aroma = aroma.nombre;
        
        const btnMas = document.createElement('button');
        btnMas.textContent = '+';
        btnMas.disabled = aroma.stock === 0;

        // Función para actualizar estado de los botones
        const actualizarBotones = () => {
            const current = parseInt(cantidad.textContent);
            btnMenos.disabled = current <= 0;
            btnMas.disabled = current >= aroma.stock;
        };

        if (aroma.stock > 0) {
            // Eventos para los botones +/-
            btnMenos.addEventListener('click', () => {
                const current = parseInt(cantidad.textContent);
                if (current > 0) {
                    cantidad.textContent = current - 1;
                    actualizarAromasSeleccionados(aroma.nombre, current - 1);
                    actualizarBotones(); // Actualiza estado de botones
                }
            });
            
            btnMas.addEventListener('click', () => {
                const current = parseInt(cantidad.textContent);
                if (current < aroma.stock) {
                    cantidad.textContent = current + 1;
                    actualizarAromasSeleccionados(aroma.nombre, current + 1);
                    actualizarBotones(); // Actualiza estado de botones
                }
            });
        } else {
            const sinStock = document.createElement('span');
            sinStock.textContent = ' (Sin stock)';
            sinStock.className = 'texto-sin-stock';
            nombreAroma.appendChild(sinStock);
        }
        
        contador.appendChild(btnMenos);
        contador.appendChild(cantidad);
        contador.appendChild(btnMas);
        
        itemAroma.appendChild(nombreAroma);
        itemAroma.appendChild(contador);
        modalListaAromas.appendChild(itemAroma);
    });
}

function actualizarAromasSeleccionados(nombreAroma, cantidad) {
    if (cantidad > 0) {
        aromasSeleccionados[nombreAroma] = cantidad;
    } else {
        delete aromasSeleccionados[nombreAroma];
    }
    console.log('Aromas seleccionados:', aromasSeleccionados);
}

// Configuración del botón del carrito
function setupCarritoButton() {
    const btn = document.getElementById('btn-agregar-carrito');
    if (!btn) {
        console.warn('Botón "btn-agregar-carrito" no encontrado');
        return;
    }
    
    // Clona el botón para eliminar todos los event listeners
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    
    // Agregar nuevo event listener al botón clonado
    newBtn.addEventListener('click', handleAgregarAlCarrito);
    
    console.log('Botón de carrito configurado correctamente');
}
// Manejador del evento para agregar al carrito
function handleAgregarAlCarrito() {
    if (!window.aromasSeleccionados || Object.keys(window.aromasSeleccionados).length === 0) {
        mostrarNotificacion('Por favor selecciona al menos un aroma', 'error');
        return;
    }

    if (!window.agregarAlCarrito) {
        console.error('La función agregarAlCarrito no está definida');
        mostrarNotificacion('Error al agregar al carrito', 'error');
        return;
    }

    // Verificar que hay al menos un aroma con cantidad > 0
    const tieneItemsValidos = Object.values(window.aromasSeleccionados).some(cant => cant > 0);
    if (!tieneItemsValidos) {
        mostrarNotificacion('Las cantidades deben ser mayores a cero', 'error');
        return;
    }

    window.agregarAlCarrito();
    
    if (modal) {
        cerrarModal();
    }
    
    mostrarNotificacion('Productos añadidos al carrito');
}