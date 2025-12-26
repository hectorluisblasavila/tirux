const contenedorllantas = document.getElementById('contenedor-llantas');
const baseURL = "https://www.importsaid.com/";

stockllantas.forEach(producto => {
    // 1. EXTRAER IC E IV (Maneja formatos como "82H" o "104/102R")
    // Usamos una expresión regular para separar números de letras
    const matches = producto.IC_IV.match(/(\d+)\/?(\d+)?([A-Z])/);
    
    let textoCarga = "No definido";
    let textoVelocidad = "No definido";

    if (matches) {
        const icPrincipal = matches[1]; // El primer número (ej. 104)
        const letraVelocidad = matches[3]; // La letra final (ej. R)
        
        // Buscamos en tus objetos tablaIC y tablaIV
        textoCarga = tablaIC[icPrincipal] || `${icPrincipal} (ver tabla)`;
        textoVelocidad = tablaIV[letraVelocidad] || letraVelocidad;
    }

    // 2. CREAR EL ELEMENTO HTML
    const div = document.createElement("div");
    div.classList.add('producto');
    
    // Guardamos los datos para los filtros
    div.setAttribute('data-ancho', producto.ancho);
    div.setAttribute('data-perfil', producto.Perfil);
    div.setAttribute('data-diametro', producto.Diametro);
    div.setAttribute('data-marca', producto.marca.toUpperCase());

    div.innerHTML = `
    <a href="producto.html?id=${producto.codigo}" class="boton-ver"> 
        <img class="imagen" src="${producto.imagen}" alt="${producto.alt}">
        
        <h3 class="titulop info">${producto.ancho}/${producto.Perfil}R${producto.Diametro}</h3>
        <h6 class="info">${producto.marca}</h6>
        <p class="info">Modelo: ${producto.modelo}</p>         
         <p class="info">IC/IV: ${producto.IC_IV}</p> 
        <p class="info">${textoCarga}/${textoVelocidad}</p>
        
        
        <p class="info">Precio: S/.${producto.precio}</p>
        <p class="info">Stock: ${producto.cantidad}</p>
    </a>
    <p class="info">Codigo: ${producto.codigo}</p>
    <p class="precioProductoAfiliado info">Afiliado: S/.${Math.round(producto.precio*0.95/5)*5}</p>
    <span class="info">Cantidad:</span>
    <input type="number" class="quantity-input" value="1" min="1">
    <button class="boton-agregar">WhatsApp</button>
    `;

    contenedorllantas.appendChild(div);


    // Aquí agregamos el evento a cada botón de WhatsApp dinámicamente
    const botonAgregar = div.querySelector('.boton-agregar');
    botonAgregar.addEventListener('click', () => {
        // Obtener la cantidad seleccionada
    const cantidadInput = div.querySelector('.quantity-input');
    const cantidad = parseInt(cantidadInput.value);
      const precioNoDecimales = Math.round(producto.precio/5)*5;
    // Calcular el total
    const total = cantidad * precioNoDecimales;
  
        // Crear el mensaje de WhatsApp con los datos del producto
        const mensaje = `Hola, estoy interesado en el siguiente producto:%0A
        - *Diametro:* ${producto.Diametro}%0A
        - *Ancho:* ${producto.ancho}%0A
        - *Perfil:* ${producto.Perfil}%0A
        - *PR:* ${producto.PR}%0A
        - *Marca:* ${producto.marca}%0A
        - *Código:* ${producto.codigo}%0A
        - *Precio:* S/. ${producto.precio}.00%0A
        - *Cantidad:* ${cantidad}%0A
        - *Total:* S/. ${total}.00%0A
        - *Imagen:* ${baseURL}${producto.imagen}%0A
        ¿Está disponible?`;

        // Número de WhatsApp (reemplaza con el tuyo)
        const numeroWhatsApp = '+51927668906'; // Incluye el código del país

        // Generar el enlace para WhatsApp
        const url = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;

        // Abrir WhatsApp en una nueva pestaña
        window.open(url, '_blank');
    });
});


// Seleccionar el botón
const botonFlotante = document.getElementById('boton-flotante');

// Mostrar el botón solo cuando se haya hecho scroll hacia abajo
window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    botonFlotante.style.display = 'flex'; // Mostrar el botón
  } else {
    botonFlotante.style.display = 'none'; // Ocultar el botón
  }
});

// Evento para regresar al inicio al hacer clic en el botón
botonFlotante.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Desplazamiento suave
  });
});
