const express = require("express");
const path = require("path");
const app = express();
const PORT = Number(process.env.PORT || 3000);
const { abrirBase } = require('./database');
const db = abrirBase();
const opciones = {
 taller: ['HTML y CSS', 'JavaScript', 'Node.js y Express'],
 horario: ['Sábado de 9:00 a 11:00', 'Sábado de 14:00 a 16:00', 'Domingo de 9:00 a 11:00'],
 modalidad: ['Presencial', 'Virtual'], nivel_experiencia: ['Inicial', 'Intermedio', 'Avanzado']
};
const campos = ['nombre', 'correo', 'telefono', ...Object.keys(opciones)];
function validar(req, res, next) {
 const datos = Object.fromEntries(campos.map(c => [c, typeof req.body?.[c] === 'string' ? req.body[c].trim() : '']));
 if (Object.values(datos).some(v => !v)) return res.status(400).json({ mensaje: 'Completa los siete campos obligatorios.' });
 if (datos.nombre.length < 2 || datos.nombre.length > 100) return res.status(400).json({ mensaje: 'Nombre: entre 2 y 100 caracteres.' });
 if (datos.correo.length > 150 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.correo)) return res.status(400).json({ mensaje: 'Ingresa un correo válido.' });
 if (!/^\+?[0-9 ()-]{7,20}$/.test(datos.telefono)) return res.status(400).json({ mensaje: 'Teléfono inválido: usa entre 7 y 20 caracteres, números, espacios, paréntesis o guiones.' });
 for (const [c, valores] of Object.entries(opciones)) if (!valores.includes(datos[c])) return res.status(400).json({ mensaje: 'Opción inválida para ' + c + '.' });
 req.datos = datos; next();
}
function validarId(req, res, next) {
 const id = Number(req.params.id);
 if (!/^\d+$/.test(req.params.id) || !Number.isSafeInteger(id) || id < 1) return res.status(400).json({ mensaje: 'Id inválido.' });
 req.inscripcionId = id; next();
}

// Proyecto final: las inscripciones se guardan en SQLite.

app.disable('x-powered-by');
app.use(express.json({ limit: '16kb' }));
app.use('/api', (_req, res, next) => { res.set('Cache-Control', 'no-store'); next(); });
app.use(express.static(path.join(__dirname, "public")));

// GET: consulta las inscripciones. Express responde con 200 por defecto.
app.get("/api/inscripciones", (req, res) => {
  res.json(db.prepare('SELECT * FROM inscripciones ORDER BY id DESC').all());
});

// POST y PUT comparten las mismas validaciones.
app.post('/api/inscripciones', validar, (req, res) => {
 const resultado = db.prepare(`INSERT INTO inscripciones (${campos.join(',')}) VALUES (${campos.map(() => '?').join(',')})`).run(...campos.map(c => req.datos[c]));
 res.status(201).json({ mensaje: 'Inscripción guardada.', id: Number(resultado.lastInsertRowid) });
});
app.put('/api/inscripciones/:id', validarId, validar, (req, res) => {
 const resultado = db.prepare(`UPDATE inscripciones SET ${campos.map(c => c + '=?').join(',')} WHERE id=?`).run(...campos.map(c => req.datos[c]), req.inscripcionId);
 if (!resultado.changes) return res.status(404).json({ mensaje: 'No se encontró la inscripción.' });
 res.json({ mensaje: 'Inscripción actualizada.' });
});
app.delete('/api/inscripciones/:id', validarId, (req, res) => {
 const resultado = db.prepare('DELETE FROM inscripciones WHERE id=?').run(req.inscripcionId);
 if (!resultado.changes) return res.status(404).json({ mensaje: 'No se encontró la inscripción.' });
 res.json({ mensaje: 'Inscripción eliminada.' });
});
app.get('/api/reportes/resumen', (_req, res) => {
 // Solo se pasan nombres de columna constantes, nunca texto recibido del usuario.
 const agrupar = campo => db.prepare(`SELECT ${campo}, COUNT(*) AS cantidad FROM inscripciones GROUP BY ${campo} ORDER BY cantidad DESC, ${campo}`).all();
 res.json({ total: db.prepare('SELECT COUNT(*) AS total FROM inscripciones').get().total,
 porTaller: agrupar('taller'), porHorario: agrupar('horario'), porModalidad: agrupar('modalidad') });
});
app.use('/api', (_req, res) => res.status(404).json({ mensaje: 'Ruta no encontrada.' }));
app.use((err, _req, res, _next) => {
 if (err.type === 'entity.parse.failed') return res.status(400).json({ mensaje: 'JSON inválido.' });
 if (err.type === 'entity.too.large') return res.status(413).json({ mensaje: 'Solicitud demasiado grande.' });
 console.error(err); res.status(500).json({ mensaje: 'No fue posible completar la operación.' });
});
const server = app.listen(PORT, '127.0.0.1', () => console.log(`Servidor disponible en http://localhost:${PORT}`));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close(() => { db.close(); process.exit(0); }));
