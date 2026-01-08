const contenedorllantas = document.getElementById('contenedor-llantas');


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

  // el codigo va dentro de la tarjeta del producto pero lo quite para tener mas limpia la tarjeta <p class="info">${textoCarga}/${textoVelocidad}</p>
  // el codigo va dentro de la tarjeta del producto pero lo quite para tener mas limpia la tarjeta  <p class="info">Codigo: ${producto.codigo}</p>
    
  
  
  div.innerHTML = `
    <a href="producto.html?id=${producto.codigo}" class="boton-ver"> 
       <img class="imagen" src="${producto.imagenes[0]}" alt="${producto.alt}">
        
        <h3 class="titulop info"><strong>${producto.ancho}/${producto.Perfil}R${producto.Diametro} ${producto.IC_IV}</strong></h3>
        <h6 class="info"><strong>${producto.marca}</strong></h6>
        <p class="info">${producto.modelo}</p>         
      
        
        
       
<h3 class="info precio-destacado"><strong>PRECIO: S/.${producto.precio}</strong></h3> 
        <p class="info"><strong>Stock: </strong>${producto.cantidad}</p>
    </a>
    
    <p class="precioProductoAfiliado info">Afiliado: S/.${Math.round(producto.precio*0.95/5)*5}</p>
    <p class="info">Codigo: ${producto.codigo}</p>
     <span class="info">Comprar:</span>
   <input type="number" class="quantity-input" value="0" min="1"></input>
    <button class="boton-agregar">WhatsApp</button>
    `;

    contenedorllantas.appendChild(div);


   // Aquí agregamos el evento a cada botón de WhatsApp dinámicamente
const botonAgregar = div.querySelector('.boton-agregar');

botonAgregar.addEventListener('click', () => {
    // 1. Obtener y validar la cantidad seleccionada
    const cantidadInput = div.querySelector('.quantity-input');
    const cantidad = parseInt(cantidadInput.value) || 1; // Por defecto 1 si hay error

    // 2. Lógica de redondeo y cálculo (según tu código original)
    const precioUnitario = Math.round(producto.precio / 5) * 5;
    const total = cantidad * precioUnitario;

    // 3. Construir la URL del producto usando el código como ID
    const urlProducto = `https://hectorluisblasavila.github.io/tirux/producto.html?id=${producto.codigo}`;

    // 4. Crear el mensaje con emojis y formato de negritas
    // Nota: Usamos encodeURIComponent para que los caracteres especiales y espacios funcionen siempre
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

    // 4. Número de WhatsApp
    const numeroWhatsApp = '51927668906'; 

    // 5. Generar URL y abrir
    const url = `https://wa.me/${numeroWhatsApp}?text=${mensajeTexto}`;
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
