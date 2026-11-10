const { cargarRutas } = require("./herramientas_prueba");
const llamar = cargarRutas();
const ruta = "/api/inscripciones";
const datos = {
  nombre: "Ana López", correo: "ana.lopez@example.com",
  telefono: "5550-0123", taller: "HTML y CSS",
  horario: "Sábado de 9:00 a 11:00",
};
function mostrar(titulo, respuesta) {
  console.log("\n" + titulo);
  console.log("HTTP " + respuesta.estado);
  console.log(JSON.stringify(respuesta.cuerpo, null, 2));
}
mostrar("1. GET inicial", llamar("GET", ruta));
mostrar("2. POST válido", llamar("POST", ruta, datos));
mostrar("3. GET tras registrar", llamar("GET", ruta));
mostrar("4. POST sin teléfono", llamar("POST", ruta, { ...datos, telefono: "" }));
mostrar("5. POST correo inválido", llamar("POST", ruta, { ...datos, correo: "no-valido" }));
