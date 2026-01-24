const vendedores = [
  { dni: "hectorblas", clave: "locotes" },
  { dni: "vendedor", clave: "locotes" }
];

// --- 1. LÓGICA DE SESIÓN Y VISTA ---

// Función maestra que aplica o quita la visibilidad de vendedor
function aplicarEstadoVendedor(estaLogueado) {
  const formulario = document.querySelector(".vendedor");
  
  if (estaLogueado) {
    // Añadimos la clase al body para que el CSS muestre todo (incluso filtros nuevos)
    document.body.classList.add("vendedor-activo");
    if (formulario) formulario.style.display = "none";
  } else {
    // Quitamos la clase y el acceso
    document.body.classList.remove("vendedor-activo");
    localStorage.removeItem("usuarioAutenticado");
  }
}

// Función para verificar si hay una sesión activa al cargar la página
function verificarSesion() {
  const usuarioGuardado = localStorage.getItem("usuarioAutenticado");
  if (usuarioGuardado) {
    aplicarEstadoVendedor(true);
  }
}

// Función para validar el acceso del vendedor
function validarAcceso() {
  const dniIngresado = document.getElementById("dni").value;
  const claveIngresada = document.getElementById("clave").value;

  const vendedorValido = vendedores.find(
    (v) => v.dni === dniIngresado && v.clave === claveIngresada
  );

  if (vendedorValido) {
    alert("Acceso permitido. Mostrando información de vendedor.");
    localStorage.setItem("usuarioAutenticado", JSON.stringify(vendedorValido));
    aplicarEstadoVendedor(true);
  } else {
    alert("DNI o clave incorrectos. Intenta nuevamente.");
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