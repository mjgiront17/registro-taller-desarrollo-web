const { DatabaseSync } = require('node:sqlite');
const path = require('node:path');
function abrirBase(archivo = process.env.DB_PATH || path.join(__dirname, 'registro_taller.db')) {
 const db = new DatabaseSync(archivo);
 db.exec(`CREATE TABLE IF NOT EXISTS inscripciones (
 id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, correo TEXT NOT NULL,
 telefono TEXT NOT NULL, taller TEXT NOT NULL, horario TEXT NOT NULL,
 modalidad TEXT NOT NULL, nivel_experiencia TEXT NOT NULL,
 fecha_registro TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)`);
 return db;
}
module.exports = { abrirBase };
