const vendedores = [
  { dni: "admin", clave: "adm123", rol: "admin" }, // Administrador
  { dni: "vendedor", clave: "locotes", rol: "vendedor" } // Vendedor normal
];

// --- 1. LÓGICA DE SESIÓN Y VISTA ---

function aplicarEstadoVendedor(estaLogueado, rol = "") {
  const formulario = document.querySelector(".vendedor");
  
  // Limpiamos SIEMPRE las clases al iniciar la función para evitar residuos
  document.body.classList.remove("vendedor-activo", "soy-admin");

  if (estaLogueado) {
    document.body.classList.add("vendedor-activo");
    
    // Solo si el rol es estrictamente 'admin' se agrega la clase
    if (rol === "admin") {
      document.body.classList.add("soy-admin");
    }

    if (formulario) formulario.style.display = "none";
  } else {
    localStorage.removeItem("usuarioAutenticado");
    // Al cerrar sesión, el remove de arriba ya hizo el trabajo
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