const saludoElemento = document.getElementById("saludo");
const botonRegistrar = document.getElementById("botonRegistrar");
const botonEliminarRegistro = document.getElementById("botonEliminarRegistro");

const alumnosSeccion = document.getElementById("alumnos-seccion");
const botonAgregarAlumno = document.getElementById("botonAgregarAlumno");
const botonEliminarAlumnoPorNombre = document.getElementById(
  "botonEliminarAlumnoPorNombre"
);
const listaAlumnosUL = document.getElementById("listaAlumnos");

const LS_KEY_PROFESOR = "profesorRegistrado";
const LS_KEY_ALUMNOS = "alumnosRegistrados";

function obtenerProfesorGuardado() {
  const profesorJSON = localStorage.getItem(LS_KEY_PROFESOR);
  return profesorJSON ? JSON.parse(profesorJSON) : null;
}

function guardarProfesor(profesor) {
  localStorage.setItem(LS_KEY_PROFESOR, JSON.stringify(profesor));
}

function eliminarProfesor() {
  localStorage.removeItem(LS_KEY_PROFESOR);
  localStorage.removeItem(LS_KEY_ALUMNOS);
}

function obtenerAlumnosGuardados() {
  const alumnosJSON = localStorage.getItem(LS_KEY_ALUMNOS);
  return alumnosJSON ? JSON.parse(alumnosJSON) : [];
}

function guardarAlumnos(alumnosArray) {
  localStorage.setItem(LS_KEY_ALUMNOS, JSON.stringify(alumnosArray));
}

function validarNombre(input) {
  if (input === null) return null;
  input = input.trim();

  const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s-]+$/;

  if (input === "") {
    alert("El nombre no puede estar vacío.");
    return false;
  }
  if (!regexNombre.test(input)) {
    alert("El nombre solo puede contener letras, espacios y guiones.");
    return false;
  }
  return input;
}

function registrarProfesor() {
  let nombre, edad, email;

  do {
    const tempNombre = prompt("Profesor: Ingrese su nombre:");
    nombre = validarNombre(tempNombre);
    if (nombre === null) {
      alert("Registro de profesor cancelado.");
      return;
    }
  } while (nombre === false);

  do {
    edad = Number(prompt("Profesor: Ingrese su edad:"));
    if (isNaN(edad) || edad <= 21 || edad >= 85) {
      alert("Por favor, ingrese una edad válida (número positivo).");
    }
  } while (isNaN(edad) || edad <= 21 || edad >= 85);

  do {
    email = prompt("Profesor: Ingrese su email:");
    if (email === null) {
      alert("Registro de profesor cancelado.");
      return;
    }
    if (!email.includes("@") || email.trim() === "") {
      alert("Por favor, ingrese un email válido.");
    }
  } while (!email.includes("@") || email.trim() === "");

  const nuevoProfesor = {
    nombre: nombre,
    edad: edad,
    email: email,
  };

  guardarProfesor(nuevoProfesor);
  actualizarInterfaz(nuevoProfesor.nombre, true);
  alert(`¡Gracias por registrarse, Profesor ${nuevoProfesor.nombre}!`);
}

// saludo
function actualizarInterfaz(nombreProfesor, esPrimerRegistro = false) {
  if (saludoElemento) {
    if (esPrimerRegistro) {
      saludoElemento.textContent = `¡Bienvenido, Profesor ${nombreProfesor}!`;
    } else {
      saludoElemento.textContent = `¡Bienvenido de nuevo, Profesor ${nombreProfesor}!`;
    }
  }
  if (alumnosSeccion) {
    alumnosSeccion.style.display = "block";
  }
  if (botonRegistrar && botonEliminarRegistro) {
    botonRegistrar.style.display = "none";
    botonEliminarRegistro.style.display = "block";
  }
  mostrarAlumnosEnDOM();
}

// Función para desregistrar al profesor
function desregistrarProfesor() {
  const confirmar = confirm(
    "¿Estás seguro de que quieres eliminar el registro del profesor y todos los alumnos?"
  );
  if (confirmar) {
    eliminarProfesor();
    if (saludoElemento) {
      saludoElemento.textContent =
        "¡Bienvenido/a! Por favor, regístrate como Profesor.";
    }
    if (alumnosSeccion) {
      alumnosSeccion.style.display = "none";
    }
    if (botonRegistrar && botonEliminarRegistro) {
      botonRegistrar.style.display = "block";
      botonEliminarRegistro.style.display = "none";
    }
    mostrarAlumnosEnDOM();
    alert("El registro del profesor y los alumnos ha sido eliminado.");
  }
}

function agregarAlumno() {
  let nombre, edad, email, calificacion;

  // Pedir nombre
  do {
    const tempNombre = prompt("Alumno: Ingrese el nombre:");
    nombre = validarNombre(tempNombre);
    if (nombre === null) return;
  } while (nombre === false);

  // Pedir edad
  do {
    edad = Number(prompt("Alumno: Ingrese la edad:"));
    if (isNaN(edad) || edad <= 0) {
      alert("Por favor, ingrese una edad válida (número positivo).");
    }
  } while (isNaN(edad) || edad <= 0);

  // Pedir email
  do {
    email = prompt("Alumno: Ingrese el email:");
    if (email === null) return;
    if (!email.includes("@") || email.trim() === "") {
      alert("Por favor, ingrese un email válido.");
    }
  } while (!email.includes("@") || email.trim() === "");

  // Pedir calificación
  do {
    calificacion = Number(prompt("Alumno: Ingrese la calificación (0-100):"));
    if (isNaN(calificacion) || calificacion < 0 || calificacion > 100) {
      alert("Por favor, ingrese una calificación válida entre 0 y 100.");
    }
  } while (isNaN(calificacion) || calificacion < 0 || calificacion > 100);

  const alumnos = obtenerAlumnosGuardados();
  const nuevoId = alumnos.length > 0 ? alumnos[alumnos.length - 1].id + 1 : 1;

  const nuevoAlumno = {
    id: nuevoId,
    nombre: nombre,
    edad: edad,
    email: email,
    calificacion: calificacion,
  };

  alumnos.push(nuevoAlumno);
  guardarAlumnos(alumnos);

  alert(`Alumno "${nuevoAlumno.nombre}" agregado correctamente.`);
  mostrarAlumnosEnDOM();
}
// eliminar un alumno por nombre
function eliminarAlumnoPorNombre() {
  const nombreAEliminarTemp = prompt(
    "Ingrese el nombre del alumno a eliminar:"
  );
  const nombreAEliminar = validarNombre(nombreAEliminarTemp);

  if (nombreAEliminar === null) {
    alert("Eliminación cancelada.");
    return;
  }
  if (nombreAEliminar === false) {
    return;
  }

  let alumnos = obtenerAlumnosGuardados();
  const indiceAEliminar = alumnos.findIndex(
    (alumno) => alumno.nombre.toLowerCase() === nombreAEliminar.toLowerCase()
  );

  if (indiceAEliminar === -1) {
    alert(`No se encontró ningún alumno con el nombre "${nombreAEliminar}".`);
    return;
  }

  const alumnoEliminado = alumnos.splice(indiceAEliminar, 1)[0];
  guardarAlumnos(alumnos);
  alert(`Alumno "${alumnoEliminado.nombre}" eliminado correctamente.`);
  mostrarAlumnosEnDOM();
}

function mostrarAlumnosEnDOM() {
  if (!listaAlumnosUL) return;

  const alumnos = obtenerAlumnosGuardados();
  listaAlumnosUL.innerHTML = "";

  if (alumnos.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No hay alumnos registrados aún.";
    listaAlumnosUL.appendChild(li);
    return;
  }

  alumnos.forEach((alumno) => {
    const li = document.createElement("li");
    li.innerHTML = `
      Nombre: ${alumno.nombre}<br>
      Edad: ${alumno.edad}<br>
      Calificación: ${alumno.calificacion}
    `;
    listaAlumnosUL.appendChild(li);

    const hr = document.createElement("hr");
    listaAlumnosUL.appendChild(hr);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const profesor = obtenerProfesorGuardado();

  if (profesor) {
    actualizarInterfaz(profesor.nombre, false);
  } else {
    if (saludoElemento) {
      saludoElemento.textContent =
        "¡Bienvenido/a! Por favor, regístrate como Profesor.";
    }
    if (alumnosSeccion) {
      alumnosSeccion.style.display = "none";
    }
    if (botonRegistrar && botonEliminarRegistro) {
      botonRegistrar.style.display = "block";
      botonEliminarRegistro.style.display = "none";
    }
  }

  if (botonRegistrar) {
    botonRegistrar.addEventListener("click", registrarProfesor);
  }
  if (botonEliminarRegistro) {
    botonEliminarRegistro.addEventListener("click", desregistrarProfesor);
  }
  if (botonAgregarAlumno) {
    botonAgregarAlumno.addEventListener("click", agregarAlumno);
  }
  if (botonEliminarAlumnoPorNombre) {
    botonEliminarAlumnoPorNombre.addEventListener(
      "click",
      eliminarAlumnoPorNombre
    );
  }

  if (profesor) {
    mostrarAlumnosEnDOM();
  }
});
