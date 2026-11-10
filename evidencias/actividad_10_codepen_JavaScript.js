// Actividad 10: pegar en el panel JavaScript de CodePen
// Datos ficticios de participantes.
const inscripciones = ["Ana López", "Luis Pérez", "Marta García"];

// La función devuelve la cantidad de nombres del arreglo.
function contarInscripciones() {
  return inscripciones.length;
}

// Muestra los nombres sin insertarlos como HTML inseguro.
const listaInscripciones = document.querySelector("#inscripciones-lista");
inscripciones.forEach((nombre) => {
  const item = document.createElement("li");
  item.textContent = nombre;
  listaInscripciones.appendChild(item);
});

// Coloca el resultado en un párrafo del documento.
const parrafoTotal = document.querySelector("#inscripciones-total");
parrafoTotal.textContent = `Total de inscripciones: ${contarInscripciones()}`;
