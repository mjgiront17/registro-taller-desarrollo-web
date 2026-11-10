// Actividad 10: solución independiente para Node.js o OneCompiler.
const inscripciones = ["Ana López", "Luis Pérez", "Marta García"];

function contarInscripciones() {
  return inscripciones.length;
}

console.log("Participantes:", inscripciones.join(", "));
console.log("Total de inscripciones:", contarInscripciones());
