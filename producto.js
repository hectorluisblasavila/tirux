
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const productoId = params.get('id');
    const productoSeleccionado = stockllantas.find(producto => producto.codigo === productoId);

    if (productoSeleccionado) {
        const detalleContainer = document.getElementById('producto-detail');
        const baseURL = "https://www.importsaid.com/";
        const precioNoDecimales = Math.round(productoSeleccionado.precio / 5) * 5;

        detalleContainer.innerHTML = `
            <h2>${productoSeleccionado.marca} - ${productoSeleccionado.codigo}</h2>
            <img class="imagen" src="${productoSeleccionado.imagen}" alt="Imagen de la llanta">
            <p><strong>Diametro:</strong> ${productoSeleccionado.Diametro}</p>
            <p><strong>Ancho:</strong> ${productoSeleccionado.ancho}</p>
            <p><strong>Perfil:</strong> ${productoSeleccionado.Perfil}</p>
            <p><strong>PR:</strong> ${productoSeleccionado.PR}</p>
            <p><strong>Precio:</strong> S/. ${precioNoDecimales}</p>
            <span class="info">Cantidad:</span>
            <input type="number" id="cantidad" class="quantity-input" value="1" min="1">
            <button id="boton-whatsapp" class="pedir-whatsapp">WhatsApp</button>
        `;

        // Ahora sí, agregar el evento después de insertar el contenido
        const botonWhatsApp = document.getElementById('boton-whatsapp');
        const cantidadInput = document.getElementById('cantidad');

        botonWhatsApp.addEventListener('click', () => {
            const cantidad = parseInt(cantidadInput.value);
            const total = cantidad * precioNoDecimales;

            const mensaje = `Hola, estoy interesado en el siguiente producto:%0A
- *Diametro:* ${productoSeleccionado.Diametro}%0A
- *Ancho:* ${productoSeleccionado.ancho}%0A
- *Perfil:* ${productoSeleccionado.Perfil}%0A
- *PR:* ${productoSeleccionado.PR}%0A
- *Marca:* ${productoSeleccionado.marca}%0A
- *Código:* ${productoSeleccionado.codigo}%0A
- *Precio:* S/. ${precioNoDecimales}.00%0A
- *Cantidad:* ${cantidad}%0A
- *Total:* S/. ${total}.00%0A
- *Imagen:* ${baseURL}${productoSeleccionado.imagen}%0A
¿Está disponible?`;

            const numeroWhatsApp = '+51927668906';
            const url = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
            window.open(url, '_blank');
        });
    } else {
        const detalleContainer = document.getElementById('producto-detail');
        detalleContainer.innerHTML = '<p>Producto no encontrado</p>';
    }
});



   

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const productoId = params.get('id'); // Obtener el ID del producto desde la URL
    const productoSeleccionado = stockllantas.find(producto => producto.codigo === productoId);

    if (productoSeleccionado) {
        const baseURL = "https://www.importsaid.com/";

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