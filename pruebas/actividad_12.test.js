const test = require("node:test");
const assert = require("node:assert/strict");
const { cargarRutas } = require("./herramientas_prueba");
const endpoint = "/api/inscripciones";
const registro = {
  nombre: "Ana López",
  correo: "ana.lopez@example.com",
  telefono: "5550-0123",
  taller: "HTML y CSS",
  horario: "Sábado de 9:00 a 11:00",
};

test("GET devuelve 200 y [] antes de registrar personas", () => {
  const llamar = cargarRutas();
  const respuesta = llamar("GET", endpoint);
  assert.equal(respuesta.estado, 200);
  assert.deepEqual(respuesta.cuerpo, []);
});

test("POST válido crea la inscripción con 201 y GET la muestra", () => {
  const llamar = cargarRutas();
  const creado = llamar("POST", endpoint, registro);
  assert.equal(creado.estado, 201);
  assert.equal(creado.cuerpo.id, 1);
  assert.deepEqual({ ...creado.cuerpo, id: undefined }, { ...registro, id: undefined });
  const consultado = llamar("GET", endpoint);
  assert.equal(consultado.estado, 200);
  assert.equal(consultado.cuerpo.length, 1);
  assert.deepEqual(consultado.cuerpo[0], creado.cuerpo);
});

test("POST sin teléfono responde 400 y no crea un registro", () => {
  const llamar = cargarRutas();
  const respuesta = llamar("POST", endpoint, { ...registro, telefono: "" });
  assert.equal(respuesta.estado, 400);
  assert.match(respuesta.cuerpo.mensaje, /cinco campos/i);
  assert.deepEqual(llamar("GET", endpoint).cuerpo, []);
});

test("POST con correo inválido devuelve 400", () => {
  const llamar = cargarRutas();
  const respuesta = llamar("POST", endpoint, { ...registro, correo: "ana_sin_arroba" });
  assert.equal(respuesta.estado, 400);
  assert.match(respuesta.cuerpo.mensaje, /correo/i);
});

test("POST con espacios en un campo obligatorio devuelve 400", () => {
  const llamar = cargarRutas();
  assert.equal(llamar("POST", endpoint, { ...registro, horario: "  " }).estado, 400);
});

test("POST con req.body ausente devuelve 400, no falla", () => {
  const llamar = cargarRutas();
  assert.equal(llamar("POST", endpoint).estado, 400);
});

test("POST elimina espacios exteriores antes de guardar", () => {
  const llamar = cargarRutas();
  const respuesta = llamar("POST", endpoint, { ...registro, nombre: " Ana López  " });
  assert.equal(respuesta.estado, 201);
  assert.equal(respuesta.cuerpo.nombre, "Ana López");
});
