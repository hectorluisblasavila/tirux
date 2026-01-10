// --- CONFIGURACIÓN DE PAGINACIÓN ---
let paginaActual = 1;
const productosPorPagina = 14; 

/**
 * Función Principal para Renderizar el Catálogo
 */
function renderizarPagina(pagina) {
    const contenedorllantas = document.getElementById('contenedor-llantas');
    if (!contenedorllantas) return;

    contenedorllantas.innerHTML = ""; // Limpiar contenedor

    // 1. Calcular rango de productos (Paginación)
    const inicio = (pagina - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosParaMostrar = stockllantas.slice(inicio, fin);

    // 2. Generar cada Tarjeta de Producto
    productosParaMostrar.forEach(producto => {
        // --- EXTRAER IC E IV ---
        const matches = producto.IC_IV.match(/(\d+)\/?(\d+)?([A-Z])/);
        let textoCarga = "No definido";
        let textoVelocidad = "No definido";

        if (matches) {
            const icPrincipal = matches[1];
            const letraVelocidad = matches[3];
            // Asumiendo que tablaIC y tablaIV están definidos globalmente
            if (typeof tablaIC !== 'undefined') textoCarga = tablaIC[icPrincipal] || icPrincipal;
            if (typeof tablaIV !== 'undefined') textoVelocidad = tablaIV[letraVelocidad] || letraVelocidad;
        }

        // --- CREAR ELEMENTO HTML ---
        const div = document.createElement("div");
        div.classList.add('producto');
        
        // Atributos para filtros
        div.setAttribute('data-ancho', producto.ancho);
        div.setAttribute('data-perfil', producto.Perfil);
        div.setAttribute('data-diametro', producto.Diametro);
        div.setAttribute('data-marca', producto.marca.toUpperCase());

        div.innerHTML = `
            <a href="producto.html?id=${producto.codigo}" class="boton-ver"> 
                <img class="imagen" src="${producto.imagenes[0]}" alt="${producto.alt}">
                <h3 class="titulop info"><strong>${producto.ancho}/${producto.Perfil}R${producto.Diametro} ${producto.IC_IV}</strong></h3>
                <h6 class="info"><strong>${producto.marca}</strong></h6>
                <p class="info">${producto.modelo}</p>         
                <h3 class="info precio-destacado"><strong>PRECIO: S/.${producto.precio}</strong></h3> 
                <p class="info"><strong>Stock: </strong>${producto.cantidad}</p>
            </a>
            
            <p class="precioProductoAfiliado info">Afiliado: S/.${Math.round(producto.precio * 0.95 / 5) * 5}</p>
            <p class="info">Codigo: ${producto.codigo}</p>
            <span class="info">Comprar:</span>
            <input type="number" class="quantity-input" value="1" min="1">
            <button class="boton-agregar">WhatsApp</button>
        `;

        // --- EVENTO WHATSAPP ---
        const botonAgregar = div.querySelector('.boton-agregar');
        botonAgregar.addEventListener('click', () => {
            const cantidadInput = div.querySelector('.quantity-input');
            const cantidad = parseInt(cantidadInput.value) || 1;
            const precioUnitario = Math.round(producto.precio / 5) * 5;
            const total = cantidad * precioUnitario;

            const urlProducto = `https://hectorluisblasavila.github.io/tirux/producto.html?id=${producto.codigo}`;

            const mensajeTexto = `*¡Hola! Nuevo Pedido* %0A%0A` +
                `*Producto:* ${producto.ancho}/${producto.Perfil}R${producto.Diametro} ${producto.IC_IV}%0A` +
                `*Marca:* ${producto.marca} %0A` +
                `*Modelo:* ${producto.modelo}%0A` +
                `*Código:* \`${producto.codigo}\`%0A%0A` +
                `--------------------------%0A` +
                `*Precio Unit:* S/. ${precioUnitario}.00%0A` +
                `*Cantidad:* ${cantidad} unidades%0A` +
                `*TOTAL:* S/. ${total}.00 %0A` +
                `--------------------------%0A%0A` +
                `*Link del producto:* ${urlProducto}`;

            const numeroWhatsApp = '51927668906'; 
            window.open(`https://wa.me/${numeroWhatsApp}?text=${mensajeTexto}`, '_blank');
        });

        contenedorllantas.appendChild(div);
    });

    actualizarControlesPaginacion();
}

/**
 * Función para crear botones de paginación
 */
function actualizarControlesPaginacion() {
    const totalPaginas = Math.ceil(stockllantas.length / productosPorPagina);
    let nav = document.getElementById('paginacion-nav');
    
    if (!nav) {
        nav = document.createElement('div');
        nav.id = 'paginacion-nav';
        nav.className = 'paginacion-container';
        document.querySelector('.productoall').appendChild(nav);
    }

    nav.innerHTML = "";

    for (let i = 1; i <= totalPaginas; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.className = (i === paginaActual) ? 'btn-pag activo' : 'btn-pag';
        
        btn.onclick = () => {
            paginaActual = i;
            renderizarPagina(paginaActual);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
        
        nav.appendChild(btn);
    }
}

/**
 * Lógica del Botón Flotante (Scroll to top)
 */
const configurarBotonFlotante = () => {
    const botonFlotante = document.getElementById('boton-flotante');
    if (!botonFlotante) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            botonFlotante.style.display = 'flex';
        } else {
            botonFlotante.style.display = 'none';
        }
    });

    botonFlotante.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
};

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    renderizarPagina(paginaActual);
    configurarBotonFlotante();
});