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

       // Definimos el aviso solo si la cantidad es 0
const agotadoHTML = producto.cantidad === 0 
    ? `<div class="badge-agotado">AGOTADO</div>` 
    : '';

// 1. Verificamos si la cantidad es CERO (convertimos a número por seguridad)
const esAgotado = Number(producto.cantidad) === 0;

// 2. Definimos qué mostrar
const badgeAgotado = esAgotado ? '<div class="badge-agotado">AGOTADO</div>' : '';
const claseExtraImagen = esAgotado ? 'imagen-agotada' : '';

// 3. Insertamos el HTML (Fíjate en el contenedor-imagen que envuelve la imagen)
div.innerHTML = `
    <a href="producto.html?id=${producto.codigo}" class="boton-ver"> 
        <div class="contenedor-imagen">
            ${badgeAgotado}
            <img class="imagen ${claseExtraImagen}" src="${producto.imagenes[0]}" alt="${producto.alt}">
        <div class="burbuja-stock b-izquierda precioProductoAfiliado">T: ${producto.Tirux}</div>
            
            <div class="burbuja-stock b-derecha precioProductoAfiliado">L: ${producto.LlantasLarco}</div>
             <div class="moneda-comision " title="Tu comisión">
                <span class="simbolo-moneda ">S/</span>${producto.comision}
            </div>
            
            </div>
           
        
        <h3 class="titulop info"><strong>${producto.ancho}/${producto.Perfil}R${producto.Diametro} ${producto.IC_IV}</strong></h3>
        <h6 class="info"><strong>${producto.marca}</strong></h6>
        <p class="info">${producto.modelo}</p>         
        <h3 class="info precio-destacado"><strong>PRECIO: S/.${producto.precio}</strong></h3> 
        <p class="info precioProductoAfiliado"><strong>P. Minimo: S/.</strong>${producto.pMinimo}</p>
        <p class="info"><strong>Stock: </strong>${producto.cantidad}</p>
    </a>
    
    <p class="info precioProductoAfiliado">Codigo: ${producto.codigo}</p>
    <span class="info">Comprar:</span>
    <input type="number" class="quantity-input" value="1" min="1">
    <button class="boton-agregar btn-whatsapp">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#ffffff">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
    <span></span> </button>
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


