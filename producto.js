
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const productoId = params.get('id');
    
    const productoSeleccionado = stockllantas.find(producto => producto.codigo === productoId);

    if (productoSeleccionado) {
        const detalleContainer = document.getElementById('producto-detail');
        const precioNoDecimales = Math.round(productoSeleccionado.precio / 5) * 5;

        // 1. Lógica IC/IV (mantengo tu código)
        const matches = productoSeleccionado.IC_IV.match(/(\d+)\/?(\d+)?([A-Z])/);
        let textoCarga = "No definido";
        let textoVelocidad = "No definido";
        if (matches) {
            const icPrincipal = matches[1];
            const letraVelocidad = matches[3];
            textoCarga = tablaIC[icPrincipal] || `${icPrincipal} (ver tabla)`;
            textoVelocidad = tablaIV[letraVelocidad] || letraVelocidad;
        }

        // 2. Insertar el HTML
        detalleContainer.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <h2 id="tituloACopiar" style="margin: 0;">
                    Llanta ${productoSeleccionado.ancho}/${productoSeleccionado.Perfil}R${productoSeleccionado.Diametro} ${productoSeleccionado.marca}
                </h2>
                <button class="btn-copiar" onclick="copiarCualquierTexto('tituloACopiar')" title="Copiar Título">
                    <span>📋</span>
                </button>
            </div>

            <div class="producto-contenedor-flex">
                <div class="galeria-wrapper" style="position: relative; display: flex; align-items: center;">
                    <button class="btn-flecha" onclick="scrollGaleria(-1)" style="left: 5px;">&#10094;</button>
                    <div id="galeria-scroll" class="galeria-deslizable">
                        ${productoSeleccionado.imagenes.map(foto => `
                            <img src="${foto}" class="foto-slide" style="padding-bottom: 15px;" onerror="this.remove()" alt="Imagen de la llanta">
                        `).join('')}
                    </div>
                    <button class="btn-flecha" onclick="scrollGaleria(1)" style="right: 5px;">&#10095;</button>
                </div>
                
                <div class="info-detallada">
                    <div id="infoACopiar">
                        <p>
                        <strong>Características:</strong></p>
                        <p>
                        <strong>🔘 Diámetro:</strong> ${productoSeleccionado.Diametro} pulgadas<br>
                        <strong>📐 Ancho:</strong> ${productoSeleccionado.ancho} mm<br>
                        <strong>📊 Perfil:</strong> ${productoSeleccionado.Perfil} %<br>
                        <strong>🏷️ Marca:</strong> ${productoSeleccionado.marca}<br>
                        <strong>🏁 Modelo:</strong> ${productoSeleccionado.modelo}<br>
                        <strong>📈 IC/IV:</strong> ${productoSeleccionado.IC_IV}<br>
                        <strong>Capacidad de Carga:</strong> ${textoCarga}<br>
                        <strong>Rango de Velocidad:</strong> ${textoVelocidad}<br>
                        <strong>PR:</strong> ${productoSeleccionado.PR}</p>
                        <p>
                        📦 Envíos a nivel nacional 🇵🇪<br>
                        💳 Aceptamos todos los medios de pago (efectivo, tarjeta, transferencias, Yape, Plin) ✅<br>
                        ⏰ Atención las 24 horas del día, los 7 días de la semana, los 365 días del año<br>
                        📲 Escríbenos para más información o cotizar tu juego de llantas 💬</p>
                    </div>

                    <button class="btn-copiar" onclick="copiarCualquierTexto('infoACopiar')" title="Copiar Características">
                        <span>📋</span>
                    </button>

                    <p><strong>Precio:</strong> S/. ${precioNoDecimales}.00</p>
                    <span class="info">Comprar:</span>
                    <input type="number" id="cantidad" class="quantity-input" value="1" min="1">
                    <button id="boton-whatsapp" class="pedir-whatsapp">Consultar por WhatsApp</button>
                </div>
            </div> 
        `;

        // --- NUEVA LÓGICA DE WHATSAPP ---
        const btnWS = document.getElementById('boton-whatsapp');
        btnWS.addEventListener('click', () => {
            const cantidadInput = document.getElementById('cantidad');
            const cantidad = parseInt(cantidadInput.value) || 1;
            const total = cantidad * precioNoDecimales;
            const urlProducto = `https://hectorluisblasavila.github.io/tirux/producto.html?id=${productoSeleccionado.codigo}`; // Captura la URL actual

            const mensaje = encodeURIComponent(
`*¡Hola! Nuevo Pedido* 

*Producto:* ${productoSeleccionado.ancho}/${productoSeleccionado.Perfil}R${productoSeleccionado.Diametro} ${productoSeleccionado.IC_IV}
*Marca:* ${productoSeleccionado.marca}
*Modelo:* ${productoSeleccionado.modelo}
*Código:* ${productoSeleccionado.codigo}

--------------------------
*Precio Unit:* S/. ${precioNoDecimales}.00
*Cantidad:* ${cantidad} unidades
*TOTAL: S/. ${total}.00*
--------------------------

*Link del producto:* ${urlProducto}`
            );

            const numeroWhatsApp = '51927668906';
            window.open(`https://wa.me/${numeroWhatsApp}?text=${mensaje}`, '_blank');
        });

    } else {
        document.getElementById('producto-detail').innerHTML = "<h2>Producto no encontrado</h2>";
    }
});
   



function copiarCualquierTexto(idElemento) {
    // 1. Buscamos el texto
    const elemento = document.getElementById(idElemento);
    // 2. Buscamos el botón que lanzó el evento
    const boton = event.currentTarget;
    const iconoOriginal = boton.innerHTML;

    if (elemento) {
        navigator.clipboard.writeText(elemento.innerText).then(() => {
            // AÑADIR EFECTOS VISUALES
            boton.classList.add('copiado'); // Cambia color y opacidad
            boton.innerHTML = "<span>✅</span>"; // Cambia icono

            // QUITAR EFECTOS después de 1.5 segundos
            setTimeout(() => {
                boton.classList.remove('copiado');
                boton.innerHTML = iconoOriginal;
            }, 1500);
            
        }).catch(err => {
            console.error('Error al copiar: ', err);
        });
    }
}

   

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const productoId = params.get('id'); // Obtener el ID del producto desde la URL
    const productoSeleccionado = stockllantas.find(producto => producto.codigo === productoId);

    if (productoSeleccionado) {
        const baseURL = "https://hectorluisblasavila.github.io/tirux/";

        // Definir las propiedades de Open Graph dinámicamente
        const ogTitle = document.querySelector('meta[property="og:title"]');
        const ogDescription = document.querySelector('meta[property="og:description"]');
        const ogImage = document.querySelector('meta[property="og:image"]');
        const ogUrl = document.querySelector('meta[property="og:url"]');

        if (ogTitle) ogTitle.setAttribute("content", `Detalles del producto: ${productoSeleccionado.marca} ${productoSeleccionado.codigo}`);
        if (ogDescription) ogDescription.setAttribute("content", `Consulta detalles de este producto: diámetro ${productoSeleccionado.Diametro}, ancho ${productoSeleccionado.ancho}. ¡Compra ya!`);
        if (ogImage) ogImage.setAttribute("content", `${baseURL}${productoSeleccionado.imagen}`);
        if (ogUrl) ogUrl.setAttribute("content", window.location.href);

        // Actualiza otros elementos en la página si es necesario
        document.title = `${productoSeleccionado.marca} - ${productoSeleccionado.codigo}`;
    } else {
        console.error("Producto no encontrado. No se pueden actualizar las etiquetas OG.");
    }
}); 


function scrollGaleria(direccion) {
    const contenedor = document.getElementById('galeria-scroll');
    const anchoImagen = contenedor.clientWidth; // Detecta el ancho de la imagen visible
    contenedor.scrollBy({
        left: direccion * anchoImagen,
        behavior: 'smooth' // Hace que el movimiento sea fluido
    });
}


