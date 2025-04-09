// Al inicio del archivo
if (!window.carrito) {
    window.carrito = JSON.parse(localStorage.getItem('carrito')) || [];
}

// Variables del carrito con verificaciones
const carritoIcono = document.querySelector('.carrito-icono');
const carritoDesplegable = document.querySelector('.carrito-desplegable');
const carritoItems = document.querySelector('.carrito-items');
const carritoContador = document.querySelector('.carrito-contador');
const carritoTotal = document.querySelector('.carrito-total span');
const botonComprar = document.querySelector('.boton-comprar');
const botonVaciar = document.querySelector('.boton-vaciar');
const cerrarCarritoBtn = document.querySelector('.cerrar-carrito');
const carritoOverlay = document.querySelector('.carrito-overlay');

// Solo agregar eventos si los elementos existen
if (carritoIcono) carritoIcono.addEventListener('click', toggleCarrito);
if (botonComprar) botonComprar.addEventListener('click', comprar);
if (botonVaciar) botonVaciar.addEventListener('click', vaciarCarrito);
if (cerrarCarritoBtn) cerrarCarritoBtn.addEventListener('click', cerrarCarrito);
if (carritoOverlay) {
    carritoOverlay.addEventListener('click', (e) => {
        // Prevenir el scroll durante la animación de cierre
        e.preventDefault();
        cerrarCarrito();
    });
}

// Funciones del carrito
function toggleCarrito() {
    const isActive = carritoDesplegable.classList.contains('active');
    
    if (!isActive) {
        // Abrir carrito
        carritoDesplegable.classList.add('active');
        carritoOverlay.style.display = 'block';
        setTimeout(() => {
            carritoOverlay.style.opacity = '1';
        }, 10);
        
        // Bloquear scroll del body y habilitar scroll solo en el carrito
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        carritoDesplegable.style.overflowY = 'auto';
        
    } else {
        // Cerrar carrito
        cerrarCarrito();
    }
}

// Función para cerrar el carrito
function cerrarCarrito() {
    carritoDesplegable.classList.remove('active');
    carritoOverlay.style.opacity = '0';
    
    // Restaurar scroll del body
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    carritoDesplegable.style.overflowY = '';
    
    setTimeout(() => {
        carritoOverlay.style.display = 'none';
    }, 300);
}

function actualizarCarrito() {
    carritoItems.innerHTML = '';
    let total = 0;
    
    carrito.forEach((item, index) => {
        const producto = productos.find(p => p.id === item.id);
        if (producto) {
            const precioNumerico = parseInt(producto.precio.replace(/[^0-9]/g, ''));
            const subtotal = precioNumerico * item.cantidad;
            total += subtotal;
            
            const carritoItem = document.createElement('div');
            carritoItem.classList.add('carrito-item');
            carritoItem.innerHTML = `
                <div class="carrito-item-info">
                    <h4>${producto.linea} - ${producto.marca}</h4>
                    <p>${item.aroma} x ${item.cantidad}</p>
                    <p>$${subtotal}</p>
                </div>
                <button class="eliminar-item" data-index="${index}">&times;</button>
            `;
            carritoItems.appendChild(carritoItem);
        }
    });
    
    // Actualizar total y contador
    carritoTotal.textContent = `$${total}`;
    carritoContador.textContent = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    localStorage.setItem('carrito', JSON.stringify(carrito));
        
    // Deshabilitar botón siguiente si no hay productos
    const botonSiguiente = document.querySelector('.boton-siguiente[data-paso="2"]');
    if (botonSiguiente) {
        botonSiguiente.disabled = carrito.length === 0;
    }
        
    // Agregar eventos a los botones de eliminar (solo este, elimina cualquier otro similar)
    document.querySelectorAll('.eliminar-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            carrito.splice(index, 1);
            actualizarCarrito();
        });
    });
}

function agregarAlCarrito() {
    if (!window.idProductoActual || !window.aromasSeleccionados) return;

    const producto = window.productos.find(p => p.id === window.idProductoActual);
    if (!producto) return;

    Object.entries(window.aromasSeleccionados).forEach(([aroma, cantidad]) => {
        if (cantidad <= 0) return;

        const itemExistenteIndex = window.carrito.findIndex(item => 
            item.id === window.idProductoActual && 
            item.aroma === aroma
        );

        if (itemExistenteIndex >= 0) {
            window.carrito[itemExistenteIndex].cantidad += cantidad;
        } else {
            window.carrito.push({
                id: window.idProductoActual,
                marca: producto.marca,
                linea: producto.linea,
                aroma: aroma,
                cantidad: cantidad,
                precio: producto.precio,
                precioNumerico: parseInt(producto.precio.replace(/[^0-9]/g, ''))
            });
        }
    });

    actualizarCarrito();
}

// Función de compra unificada y mejorada
async function comprar() {
    const botonPagar = document.querySelector('.boton-pagar');
    try {
        // Validar carrito
        if (!window.carrito || window.carrito.length === 0) {
            mostrarNotificacion('Tu carrito está vacío', 'error');
            return;
        }

        // Validar datos del cliente
        const nombre = document.getElementById('nombre')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const telefono = document.getElementById('telefono')?.value.trim();

        if (!nombre || nombre.length < 5) {
            mostrarNotificacion('Nombre debe tener al menos 5 caracteres', 'error');
            return;
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            mostrarNotificacion('Ingresa un email válido', 'error');
            return;
        }

        if (!telefono || !/^\d{10}$/.test(telefono)) {
            mostrarNotificacion('Teléfono debe tener 10 dígitos', 'error');
            return;
        }

        // Mostrar estado de carga
        if (botonPagar) {
            botonPagar.disabled = true;
            botonPagar.innerHTML = '<span class="spinner"></span> Procesando...';
        }

        // Preparar items para MP
        const itemsMP = window.carrito.map(item => {
            const precioNumerico = item.precioNumerico || parseInt(item.precio?.replace(/[^0-9]/g, '')) || 0;
            
            if (precioNumerico <= 0) {
                throw new Error(`El producto ${item.linea} - ${item.aroma} no tiene precio válido`);
            }

            return {
                id: item.id || `prod_${Math.random().toString(36).substr(2, 5)}`,
                title: `${item.linea || 'Producto'} - ${item.aroma || 'Sin aroma'}`.substring(0, 50),
                unit_price: precioNumerico,
                quantity: Number(item.cantidad) || 1,
                currency_id: 'ARS',
                description: `Producto: ${item.linea}, Aroma: ${item.aroma}`,
                linea: item.linea,
                aroma: item.aroma
            };
        });

        // Datos del comprador
        const payerMP = {
            name: nombre,
            email: email,
            phone: {
                area_code: telefono.substring(0, 2) || "11",
                number: telefono.substring(2) || telefono
            },
            address: {
                street_name: document.getElementById('calle')?.value.trim() || "",
                street_number: document.getElementById('altura')?.value.trim() || "",
                zip_code: document.getElementById('codigo-postal')?.value.trim() || ""
            }
        };

        console.log('Enviando a API:', { items: itemsMP, payer: payerMP });

        // Llamar al backend
        const response = await fetch('http://localhost:3001/api/create-preference', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: itemsMP,
                payer: payerMP
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al procesar el pago');
        }

        const responseData = await response.json();
        
        if (!responseData.id || (!responseData.init_point && !responseData.sandbox_init_point)) {
            throw new Error('No se recibió URL de pago válida del servidor');
        }

        // Redireccionar al checkout de prueba (usa sandbox_init_point)
        window.location.href = responseData.sandbox_init_point;

    } catch (error) {
        console.error('Error en proceso de compra:', error);
        mostrarNotificacion(error.message || 'Error al procesar el pago', 'error');
    } finally {
        if (botonPagar) {
            botonPagar.disabled = false;
            botonPagar.innerHTML = 'Finalizar Compra';
        }
    }
}

// Configurar evento del botón
document.querySelector('.boton-pagar')?.addEventListener('click', async (e) => {
    e.preventDefault();
    await comprar();
});

function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}

// Formulario y Pasos

// Cargar datos guardados al iniciar
if (localStorage.getItem('datosCliente')) {
    const datos = JSON.parse(localStorage.getItem('datosCliente'));
    
    // Campos principales (solo si existen y no están vacíos)
    if (datos.nombre && datos.nombre.trim() !== '') {
        document.getElementById('nombre').value = datos.nombre;
    }
    if (datos.email && datos.email.trim() !== '') {
        document.getElementById('email').value = datos.email;
    }
    if (datos.telefono && datos.telefono.trim() !== '') {
        document.getElementById('telefono').value = datos.telefono;
    }
    
    // Campos de dirección (solo si existen y no están vacíos)
    if (datos.direccion) {
        const dir = datos.direccion;
        if (dir.calle && dir.calle.trim() !== '') {
            document.getElementById('calle').value = dir.calle;
        }
        if (dir.altura && dir.altura.trim() !== '') {
            document.getElementById('altura').value = dir.altura;
        }
        if (dir.entreCalles && dir.entreCalles.trim() !== '') {
            document.getElementById('entre-calles').value = dir.entreCalles;
        }
        if (dir.localidad && dir.localidad.trim() !== '') {
            document.getElementById('localidad').value = dir.localidad;
        }
        if (dir.codigoPostal && dir.codigoPostal.trim() !== '') {
            document.getElementById('codigo-postal').value = dir.codigoPostal;
        }
    }
}

// Función para guardar datos del formulario (nueva versión)
function guardarDatosFormulario() {
    const datosCliente = {
        nombre: document.getElementById('nombre').value.trim(),
        email: document.getElementById('email').value.trim(),
        telefono: document.getElementById('telefono').value.trim(),
        direccion: {
            calle: document.getElementById('calle').value.trim(),
            altura: document.getElementById('altura').value.trim(),
            entreCalles: document.getElementById('entre-calles').value.trim(),
            localidad: document.getElementById('localidad').value.trim(),
            codigoPostal: document.getElementById('codigo-postal').value.trim()
        }
    };
    
    // Solo guardar si hay al menos un campo con datos
    const hayDatos = Object.values(datosCliente).some(val => val !== '') || 
                    Object.values(datosCliente.direccion).some(val => val !== '');
    
    if (hayDatos) {
        localStorage.setItem('datosCliente', JSON.stringify(datosCliente));
    } else {
        localStorage.removeItem('datosCliente');
    }
}

// 1. Función de validación mejorada
function validarFormulario() {
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const telefono = document.getElementById('telefono');
    const calle = document.getElementById('calle');
    const altura = document.getElementById('altura');
    const localidad = document.getElementById('localidad');

    // Validaciones específicas
    const valido = 
        nombre.value.length >= 5 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) &&
        /^\d{10}$/.test(telefono.value) &&
        calle.value.length >= 3 &&
        altura.value.length >= 1 &&
        localidad.value.length >= 3;

    if (!valido) {
        mostrarNotificacion('Verifica los campos obligatorios', 'error');
        return false;
    }
    return true;
}

// 2. Generar resumen corregido (versión mejorada)
function generarResumen() {
    let total = 0;
    const resumenProductos = document.querySelector('.resumen-productos');
    
    resumenProductos.innerHTML = window.carrito.map(item => {
        const subtotal = item.precioNumerico * item.cantidad;
        total += subtotal;
        return `
            <div class="resumen-item">
                <p>${item.linea} - ${item.aroma} x${item.cantidad}</p>
                <p>$${subtotal}</p>
            </div>
        `;
    }).join('');

    document.getElementById('total-resumen').textContent = `$${total}`;
    
    // Obtener datos actuales del formulario
    const datosCliente = {
        nombre: document.getElementById('nombre').value.trim(),
        email: document.getElementById('email').value.trim(),
        telefono: document.getElementById('telefono').value.trim(),
        direccion: {
            calle: document.getElementById('calle').value.trim(),
            altura: document.getElementById('altura').value.trim(),
            entreCalles: document.getElementById('entre-calles').value.trim(),
            localidad: document.getElementById('localidad').value.trim(),
            codigoPostal: document.getElementById('codigo-postal').value.trim()
        }
    };

    // Mostrar todos los datos en el resumen
    document.getElementById('resumen-nombre').textContent = datosCliente.nombre || 'No especificado';
    document.getElementById('resumen-email').textContent = datosCliente.email || 'No especificado';
    document.getElementById('resumen-telefono').textContent = datosCliente.telefono || 'No especificado';
    document.getElementById('resumen-calle').textContent = datosCliente.direccion.calle || 'No especificado';
    document.getElementById('resumen-altura').textContent = datosCliente.direccion.altura || 'No especificado';
    document.getElementById('resumen-entre-calles').textContent = datosCliente.direccion.entreCalles || 'No especificado';
    document.getElementById('resumen-localidad').textContent = datosCliente.direccion.localidad || 'No especificado';
    document.getElementById('resumen-codigo-postal').textContent = datosCliente.direccion.codigoPostal || 'No especificado';
    
    // Guardar datos actualizados
    guardarDatosFormulario();
}

// Configuración del botón de pago (reemplaza el código duplicado)
document.querySelector('.boton-pagar')?.addEventListener('click', (e) => {
    e.preventDefault();
    comprar(); // Usamos la función unificada de compra
});

// 4. Eliminar duplicados en el manejo de pasos (conserva solo esto)
document.querySelectorAll('.boton-siguiente, .boton-anterior').forEach(boton => {
    boton.addEventListener('click', (e) => {
        e.preventDefault();
        cambiarPaso(boton.dataset.paso);
        
        if (boton.dataset.paso === '3' && !validarFormulario()) {
            cambiarPaso('2'); // Regresa si no es válido
            return;
        }
        
        if (boton.dataset.paso === '3') generarResumen();
    });
});

function validarCampo(input) {
    if (!input) return false; // Protección contra inputs nulos
    
    const error = input.nextElementSibling;
    if (!error) return false; // Si no hay elemento de error, salir
    
    // Validaciones específicas por campo
    let valido = true;
    if (input.id === 'nombre') valido = input.value.length >= 5;
    if (input.id === 'email') valido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
    if (input.id === 'telefono') valido = /^\d{10}$/.test(input.value);
    
    if (input.classList) {
        input.classList.toggle('invalido', !valido);
    }
    if (error.style) {
        error.style.display = valido ? 'none' : 'block';
    }
    
    return valido;
}

// Función para cambiar entre pasos del carrito
function cambiarPaso(pasoDestino) {
    // Ocultar todos los pasos
    document.querySelectorAll('.carrito-paso').forEach(paso => {
        paso.classList.remove('mostrar-paso');
    });
    
    // Mostrar solo el paso destino
    const paso = document.querySelector(`.carrito-paso-${pasoDestino}`);
    if (paso) {
        paso.classList.add('mostrar-paso');
    }
    
    // Actualizar indicador de pasos
    document.querySelectorAll('.paso').forEach(paso => {
        paso.classList.remove('activo');
    });
    
    const pasoIndicador = document.querySelector(`.paso-${pasoDestino}`);
    if (pasoIndicador) {
        pasoIndicador.classList.add('activo');
    }
}

// Manejar el formulario de datos (versión mejorada)
const formDatos = document.getElementById('datos-entrega');
if (formDatos) {
    formDatos.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validar que haya productos
        if (carrito.length === 0) {
            mostrarNotificacion('Debes agregar al menos un producto para continuar', 'error');
            cambiarPaso('1'); // Regresa al paso 1
            return;
        }
        
        if (validarFormulario()) {
            generarResumen();
            cambiarPaso('3');
        }
    });
}

// Validación en tiempo real para campos del formulario (versión mejorada)
document.querySelectorAll('#datos-entrega input').forEach(input => {
    // Validar cuando pierde el foco
    input.addEventListener('blur', function() {
        validarCampo(this);
        guardarDatosFormulario();
    });
    
    // Manejar cambios en tiempo real
    input.addEventListener('input', function() {
        // Si el campo se vacía, actualizar el almacenamiento
        if (this.value.trim() === '') {
            guardarDatosFormulario();
        }
    });
});

// Manejar botones de navegación
document.querySelector('.carrito-desplegable')?.addEventListener('click', (e) => {
    if (e.target.classList.contains('boton-siguiente')) {
        e.preventDefault();
        const pasoDestino = e.target.dataset.paso;

        // Validación especial para el paso 2 (desde paso 1)
        if (pasoDestino === '2' && carrito.length === 0) {
            mostrarNotificacion('Debes agregar al menos un producto para continuar', 'error');
            return; // Esto detiene la ejecución aquí
        }

        // Validación especial para el paso 3 (desde paso 2)
        if (pasoDestino === '3') {
            if (carrito.length === 0) {
                mostrarNotificacion('Debes agregar al menos un producto para continuar', 'error');
                cambiarPaso('1'); // Regresa al paso 1
                return;
            }
            
            if (!validarFormulario()) {
                mostrarNotificacion('Por favor completa todos los campos requeridos', 'error');
                return;
            }
            generarResumen();
        }
        
        cambiarPaso(pasoDestino);
    }
    
    if (e.target.classList.contains('boton-anterior')) {
        e.preventDefault();
        cambiarPaso(e.target.dataset.paso);
    }
});


// Manejar cambios en los campos del formulario
document.querySelectorAll('#datos-entrega input').forEach(input => {
    input.addEventListener('input', () => {
        // Si el campo está vacío, borramos su valor guardado
        if (input.value === '') {
            const datos = localStorage.getItem('datosCliente') ? 
                JSON.parse(localStorage.getItem('datosCliente')) : {};
            
            // Borramos el campo específico
            if (input.id === 'calle' || input.id === 'altura' || 
                input.id === 'entre-calles' || input.id === 'localidad' || 
                input.id === 'codigo-postal') {
                
                if (datos.direccion) {
                    delete datos.direccion[input.id];
                    localStorage.setItem('datosCliente', JSON.stringify(datos));
                }
            } else {
                delete datos[input.id];
                localStorage.setItem('datosCliente', JSON.stringify(datos));
            }
        }
    });
    
    // Guardar cambios en tiempo real
    input.addEventListener('blur', () => {
        if (input.value !== '') {
            const datos = localStorage.getItem('datosCliente') ? 
                JSON.parse(localStorage.getItem('datosCliente')) : {};
            
            // Para campos de dirección
            if (input.id === 'calle' || input.id === 'altura' || 
                input.id === 'entre-calles' || input.id === 'localidad' || 
                input.id === 'codigo-postal') {
                
                if (!datos.direccion) datos.direccion = {};
                datos.direccion[input.id] = input.value;
            } 
            // Para campos principales
            else {
                datos[input.id] = input.value;
            }
            
            localStorage.setItem('datosCliente', JSON.stringify(datos));
        }
    });
});

// Estilo para los botones

// Añade esto a tu carrito.js
document.querySelectorAll('.carrito-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      // Solo si es un botón primario o secundario
      if(this.classList.contains('carrito-btn--primary') || 
         this.classList.contains('carrito-btn--secondary')) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.classList.add('carrito-btn-ripple');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      }
    });
  });

// En carrito.js, dentro del DOMContentLoaded o al final del archivo
document.querySelector('.carrito-desplegable')?.addEventListener('wheel', function(e) {
    // Si el scroll está en la parte superior y el usuario intenta hacer scroll hacia arriba
    if (this.scrollTop === 0 && e.deltaY < 0) {
        e.preventDefault();
    }
    // Si el scroll está en la parte inferior y el usuario intenta hacer scroll hacia abajo
    else if (this.scrollHeight - this.scrollTop === this.clientHeight && e.deltaY > 0) {
        e.preventDefault();
    }
}, { passive: false });

// Prevenir el pull-to-refresh cuando el carrito está abierto CELULARES
let startY = 0;

document.addEventListener('touchstart', function(e) {
    if (carritoDesplegable.classList.contains('active')) {
        startY = e.touches[0].clientY;
    }
}, { passive: true });

document.addEventListener('touchmove', function(e) {
    if (carritoDesplegable.classList.contains('active')) {
        // Si el scroll está en la parte superior y el usuario está deslizando hacia abajo
        if (carritoDesplegable.scrollTop === 0 && e.touches[0].clientY > startY) {
            e.preventDefault();
        }
        // Si el scroll está en la parte inferior y el usuario está deslizando hacia arriba
        else if (carritoDesplegable.scrollHeight - carritoDesplegable.scrollTop === carritoDesplegable.clientHeight && 
                 e.touches[0].clientY < startY) {
            e.preventDefault();
        }
    }
}, { passive: false });