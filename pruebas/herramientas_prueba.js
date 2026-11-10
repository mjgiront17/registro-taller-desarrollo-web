// Herramienta de prueba: ejecuta las funciones de server.js con rutas simuladas.
// No instala Express ni abre un servidor HTTP: verifica la lógica de GET/POST.
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

function cargarRutas() {
  const rutas = {};
  const app = {
    use() {},
    get(url, fn) { rutas[`GET ${url}`] = fn; },
    post(url, fn) { rutas[`POST ${url}`] = fn; },
    listen(_port, callback) { callback(); },
  };
  const expressSimulado = () => app;
  expressSimulado.json = () => () => {};
  expressSimulado.static = () => () => {};
  const projectDir = path.join(__dirname, "..");
  const source = fs.readFileSync(path.join(projectDir, "server.js"), "utf8");
  vm.runInNewContext(source, {
    __dirname: projectDir,
    require: (moduleName) => moduleName === "express" ? expressSimulado : require(moduleName),
    console: { log() {} },
  }, { filename: "server.js" });

  function llamar(metodo, ruta, body) {
    const handler = rutas[`${metodo} ${ruta}`];
    if (!handler) throw new Error(`No existe ${metodo} ${ruta}`);
    const respuesta = {
      codigo: 200,
      json: undefined,
      status(codigo) { this.codigo = codigo; return this; },
      json(valor) { this.json = JSON.parse(JSON.stringify(valor)); return this; },
    };
    handler({ body }, respuesta);
    return { estado: respuesta.codigo, cuerpo: respuesta.json };
  }
  return llamar;
}
module.exports = { cargarRutas };
