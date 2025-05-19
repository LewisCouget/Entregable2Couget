/* function Persona(nombre, edad) {
  this.nombre = nombre;
  this.edad = edad;

  this.saludar = function () {
    console.log(`Hola me llamo ${this.nombre} y tengo ${this.edad} años`);
  };
}

let persona1 = new Persona(`Lewis Couget`, 26);

persona1.saludar(); */

const saludo = document.getElementById("saludo");
const botonGuardar = document.getElementById("guardarNombre");
const botonEliminar = document.getElementById("eliminarNombre");

// Agregar usuario
botonGuardar.addEventListener("click", () => {
  const nombre = prompt("Ingrese su nombre:");
  if (nombre) {
    localStorage.setItem("nombreUsuario", nombre);
    saludo.textContent = `Hola ${nombre}!`;
  }
});

// Eliminar usuario
botonEliminar.addEventListener("click", () => {
  localStorage.removeItem("nombreUsuario");
  saludo.textContent = `Hola!`;
});

const nombreGuardado = localStorage.getItem("nombreUsuario");
if (nombreGuardado) {
  saludo.textContent = `Hola ${nombreGuardado}!`;
}
