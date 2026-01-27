const vendedores = [
  { dni: "Admin", clave: "adm123", rol: "admin" },
  { dni: "Plata", clave: "plata123", rol: "plata" },
  { dni: "vendedor", clave: "locotes", rol: "vendedor" },
  { dni: "Admin2", clave: "rosa123", rol: "admin2" } // <-- Nueva Admin
];

function aplicarEstadoVendedor(estaLogueado, rol = "") {
  const formulario = document.querySelector(".vendedor");
  
  // Limpiamos TODAS las clases anteriores
  document.body.classList.remove("vendedor-activo", "soy-admin", "soy-plata", "soy-admin2");

  if (estaLogueado) {
    document.body.classList.add("vendedor-activo");
    
    if (rol === "admin") {
      document.body.classList.add("soy-admin");
    } else if (rol === "admin2") {
      document.body.classList.add("soy-admin2");
      // OPCIONAL: Reproducir música al entrar
      let audio = new Audio('url_de_tu_musica.mp3'); 
      audio.play().catch(e => console.log("El navegador bloqueó el audio inicial"));
    } else if (rol === "plata") {
      document.body.classList.add("soy-plata");
    }

    if (formulario) formulario.style.display = "none";
  } else {
    localStorage.removeItem("usuarioAutenticado");
  }
}

// También actualiza esta parte en tu verificarSesion:
function verificarSesion() {
  const usuarioGuardado = localStorage.getItem("usuarioAutenticado");
  if (usuarioGuardado) {
    const datos = JSON.parse(usuarioGuardado);
    aplicarEstadoVendedor(true, datos.rol); // Enviamos el rol guardado
  }
}

function validarAcceso() {
  const dniIngresado = document.getElementById("dni").value;
  const claveIngresada = document.getElementById("clave").value;

  const vendedorValido = vendedores.find(
    (v) => v.dni === dniIngresado && v.clave === claveIngresada
  );

  if (vendedorValido) {
    alert("Acceso permitido.");
    localStorage.setItem("usuarioAutenticado", JSON.stringify(vendedorValido));
    
    // AQUÍ ESTÁ EL TRUCO: Pasamos el rol del objeto encontrado
    aplicarEstadoVendedor(true, vendedorValido.rol); 
  } else {
    alert("Usuario o clave incorrectos.");
  }
}

// Función para cerrar sesión
function cerrarSesion() {
  aplicarEstadoVendedor(false);
  alert("Sesión cerrada.");
  location.reload(); 
}

// --- 2. INTERFAZ Y EVENTOS ---

// Función para mostrar u ocultar el formulario de login (al presionar el icono)
function mostrarFormulario() {
  const formulario = document.querySelector(".vendedor");
  if (formulario) {
    const estaVisible = formulario.style.display === "block";
    formulario.style.display = estaVisible ? "none" : "block";
  }
}

// Cerrar el formulario si se hace clic fuera de él
document.addEventListener("click", (e) => {
  const formulario = document.querySelector(".vendedor");
  const iconoPerfil = document.querySelector(".iconoPerfil");

  if (
    formulario &&
    formulario.style.display === "block" &&
    !formulario.contains(e.target) &&
    (!iconoPerfil || !iconoPerfil.contains(e.target))
  ) {
    formulario.style.display = "none";
  }
});

// Ejecutar verificación al cargar
window.addEventListener("DOMContentLoaded", verificarSesion);