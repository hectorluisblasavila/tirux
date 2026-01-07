
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const productoId = params.get('id');
    
    // Buscamos el producto en el array stockllantas
    const productoSeleccionado = stockllantas.find(producto => producto.codigo === productoId);

    if (productoSeleccionado) {
        const detalleContainer = document.getElementById('producto-detail');
        const precioNoDecimales = Math.round(productoSeleccionado.precio / 5) * 5;

        // --- REUTILIZANDO TU LÓGICA DE CATALOGOLLANTAS.JS ---
        // 1. EXTRAER IC E IV (Maneja formatos como "82H" o "104/102R")
        const matches = productoSeleccionado.IC_IV.match(/(\d+)\/?(\d+)?([A-Z])/);
        
        let textoCarga = "No definido";
        let textoVelocidad = "No definido";

        if (matches) {
            const icPrincipal = matches[1]; // El primer número (ej. 104)
            const letraVelocidad = matches[3]; // La letra final (ej. R)
            
            // Usamos las tablas que ya están cargadas desde stockllantas.js
            textoCarga = tablaIC[icPrincipal] || `${icPrincipal} (ver tabla)`;
            textoVelocidad = tablaIV[letraVelocidad] || letraVelocidad;
        }

        // 2. INSERTAR EL HTML (Usando tus mismas variables)
        detalleContainer.innerHTML = `
            <h2>Llanta ${productoSeleccionado.ancho}/${productoSeleccionado.Perfil}R${productoSeleccionado.Diametro}  ${productoSeleccionado.marca}</h2>
            

<div class="producto-contenedor-flex">
<div class="galeria-wrapper" style="position: relative; display: flex; align-items: center;">
    <button class="btn-flecha" onclick="scrollGaleria(-1)" style="left: 5px;">&#10094;</button>

    <div id="galeria-scroll" class="galeria-deslizable">
        ${productoSeleccionado.imagenes.map(foto => `
            <img src="${foto}" 
                 class="foto-slide" 
                 onerror="this.remove()" 
                 alt="Imagen de la llanta">
        `).join('')}
    </div>

    <button class="btn-flecha" onclick="scrollGaleria(1)" style="right: 5px;">&#10095;</button>
</div>
            
            <div class="info-detallada">
                <p><strong>Características:</strong></p>
                <p><strong>🔘 Diametro:</strong> ${productoSeleccionado.Diametro} pulgadas</p>
                <p><strong>📐 Ancho:</strong> ${productoSeleccionado.ancho} mm</p>
                <p><strong>📊 Perfil:</strong> ${productoSeleccionado.Perfil} %</p>
                <p><strong>🏷️ Marca:</strong> ${productoSeleccionado.marca}</p>
                <p><strong>🏁 Modelo:</strong> ${productoSeleccionado.modelo}</p>
                <p><strong>📈 IC/IV:</strong> ${productoSeleccionado.IC_IV}</p>
                <p><strong>Capacidad de Carga:</strong> ${textoCarga}</p>
                <p><strong>Rango de Velocidad:</strong> ${textoVelocidad}</p>
                <p><strong>PR:</strong> ${productoSeleccionado.PR}</p>
                <p>📦 Envíos a nivel nacional 🇵🇪</p>
                <p>💳 Aceptamos todos los medios de pago (efectivo, tarjeta, transferencias, Yape, Plin) ✅</p>
                <p>⏰ Atención las 24 horas del día, los 7 días de la semana, los 365 días del año</p>
                <p>📲 Escríbenos para más información o cotizar tu juego de llantas 💬</p>
                <p><strong>Precio:</strong> S/. ${precioNoDecimales}</p>

                <span class="info">Comprar:</span>
            <input type="number" id="cantidad" class="quantity-input" value="0" min="1">
            <button id="boton-whatsapp" class="pedir-whatsapp">Consultar por WhatsApp</button>
            </div>
            
            
</div> 
        `;
    } else {
        document.getElementById('producto-detail').innerHTML = "<h2>Producto no encontrado</h2>";
    }
});



   

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