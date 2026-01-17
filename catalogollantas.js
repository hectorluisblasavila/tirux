// --- CONFIGURACIÓN DE ESTADO GLOBAL ---
let paginaActual = 1;
const productosPorPagina = 14; 
// Esta variable mantendrá los productos que pasen el filtro. Por defecto, todos.
let stockFiltrado = [...stockllantas]; 

/**
 * Función Principal para Renderizar el Catálogo
 */
function renderizarPagina(pagina) {
    const contenedorllantas = document.getElementById('contenedor-llantas');
    if (!contenedorllantas) return;

    contenedorllantas.innerHTML = ""; // Limpiar contenedor

    // 1. Calcular rango de productos usando el array FILTRADO (stockFiltrado)
    const inicio = (pagina - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosParaMostrar = stockFiltrado.slice(inicio, fin);

    if (productosParaMostrar.length === 0) {
        contenedorllantas.innerHTML = `<p style="text-align:center; width:100%; grid-column: 1/-1; padding: 20px;">
            No se encontraron llantas con esos criterios.</p>`;
    }

    // 2. Generar cada Tarjeta de Producto
    productosParaMostrar.forEach(producto => {
        const matches = producto.IC_IV.match(/(\d+)\/?(\d+)?([A-Z])/);
        let textoCarga = "No definido";
        let textoVelocidad = "No definido";

        if (matches) {
            const icPrincipal = matches[1];
            const letraVelocidad = matches[3];
            if (typeof tablaIC !== 'undefined') textoCarga = tablaIC[icPrincipal] || icPrincipal;
            if (typeof tablaIV !== 'undefined') textoVelocidad = tablaIV[letraVelocidad] || letraVelocidad;
        }

        const div = document.createElement("div");
        div.classList.add('producto');
        
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
 * Función Actualizada de Búsqueda y Filtro
 */
const buscarllantas = () => {
    const textoDiametro = document.getElementById('buscar-llantas').value;
    const textoAncho = document.getElementById('ancho-llantas').value;
    const textoPerfil = document.getElementById('perfil-llantas').value;
    const textoMarca = document.getElementById('marca-llantas').value.toUpperCase();

    stockFiltrado = stockllantas.filter(p => {
        const coincideAncho = p.ancho.includes(textoAncho);
        const coincidePerfil = p.Perfil.includes(textoPerfil);
        const coincideDiametro = p.Diametro.includes(textoDiametro);
        const coincideMarca = p.marca.toUpperCase().includes(textoMarca);

        return (textoDiametro === "" || coincideDiametro) && 
               (textoAncho === "" || coincideAncho) && 
               (textoPerfil === "" || coincidePerfil) && 
               (textoMarca === "" || coincideMarca);
    });

    paginaActual = 1;
    renderizarPagina(paginaActual);
};

/**
 * FUNCIÓN PARA LIMPIAR FILTROS
 */
const limpiarFiltros = () => {
    // 1. Limpiar los valores visuales de los inputs/selects
    document.getElementById('buscar-llantas').value = "";
    document.getElementById('ancho-llantas').value = "";
    document.getElementById('perfil-llantas').value = "";
    document.getElementById('marca-llantas').value = "";

    // 2. Resetear el stock filtrado al stock original
    stockFiltrado = [...stockllantas];

    // 3. Regresar a la página 1 y volver a pintar
    paginaActual = 1;
    renderizarPagina(paginaActual);
};

/**
 * Función para crear botones de paginación basados en stockFiltrado
 */
function actualizarControlesPaginacion() {
    const totalPaginas = Math.ceil(stockFiltrado.length / productosPorPagina);
    
    let navTop = document.getElementById('paginacion-top');
    let navBottom = document.getElementById('paginacion-bottom');

    if (!navTop) {
        navTop = document.createElement('div');
        navTop.id = 'paginacion-top';
        navTop.className = 'paginacion-container';
        document.getElementById('contenedor-llantas').before(navTop);
    }
    if (!navBottom) {
        navBottom = document.createElement('div');
        navBottom.id = 'paginacion-bottom';
        navBottom.className = 'paginacion-container';
        document.getElementById('contenedor-llantas').after(navBottom);
    }

    navTop.innerHTML = "";
    navBottom.innerHTML = "";

    if (totalPaginas <= 1) return;

    for (let i = 1; i <= totalPaginas; i++) {
        const crearBoton = (n) => {
            const btn = document.createElement('button');
            btn.innerText = n;
            btn.className = (n === paginaActual) ? 'btn-pag activo' : 'btn-pag';
            btn.onclick = () => {
                paginaActual = n;
                renderizarPagina(paginaActual);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };
            return btn;
        };

        navTop.appendChild(crearBoton(i));
        navBottom.appendChild(crearBoton(i));
    }
}

/**
 * Lógica del Botón Flotante
 */
const configurarBotonFlotante = () => {
    const botonFlotante = document.getElementById('boton-flotante');
    if (!botonFlotante) return;
    window.addEventListener('scroll', () => {
        botonFlotante.style.display = (window.scrollY > 200) ? 'flex' : 'none';
    });
    botonFlotante.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
};

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    // Vincular los eventos de los filtros
    const filtrosIds = ['buscar-llantas', 'ancho-llantas', 'perfil-llantas', 'marca-llantas'];
    filtrosIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', buscarllantas);
    });

    // VINCULAR EL BOTÓN DE LIMPIAR FILTROS
    const btnLimpiar = document.getElementById('btn-limpiar');
    if (btnLimpiar) {
        btnLimpiar.addEventListener('click', limpiarFiltros);
    }

    renderizarPagina(paginaActual);
    configurarBotonFlotante();
});

// Validación de rango
const inputDiametro = document.getElementById('buscar-llantas');
if (inputDiametro) {
    inputDiametro.addEventListener('input', function () {
        let valor = this.value.replace(/\D/g, ''); 
        if (valor.length > 2) valor = valor.slice(0, 2);
        if (valor.length === 2 && (parseInt(valor) < 12 || parseInt(valor) > 22)) { 
            alert("Solo se permiten números entre 12 y 22.");
            valor = ''; 
        }
        this.value = valor;
    });
}


