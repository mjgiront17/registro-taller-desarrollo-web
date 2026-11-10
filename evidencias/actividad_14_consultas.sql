-- ACTIVIDAD 14 · SQL · María José Girón Tol · 1090-23-15450
-- Práctica con datos ficticios. Ejecutar cada bloque por separado en SQLite Fiddle.
-- Nota: volver a ejecutar CREATE TABLE sobre la misma base ya creada causará un error.

-- 1. DDL: crear la tabla de talleres
CREATE TABLE talleres (
    id INTEGER PRIMARY KEY,
    nombre TEXT NOT NULL,
    horario TEXT
);

-- 2. DML: insertar un taller
INSERT INTO talleres (nombre, horario) VALUES ('Desarrollo Web', 'Tarde');

-- 3. Consulta: comprobar el registro creado
SELECT id, nombre, horario FROM talleres;

-- 4. DML: actualizar el horario
UPDATE talleres SET horario = 'Noche' WHERE id = 1;

-- 5. Consulta: comprobar el horario nuevo
SELECT id, nombre, horario FROM talleres;

-- 6. DML: borrar SOLO el registro de id 1
DELETE FROM talleres WHERE id = 1;

-- 7. Consulta: comprobar que la tabla quedó vacía
SELECT id, nombre, horario FROM talleres;

-- IMPORTANTE: la captura de clase usa 'Noche' y la guía propone 'Mañana'.
-- Ambas opciones son válidas; se usó 'Noche' para reproducir la práctica mostrada.
-- Error de sintaxis observado: SELECT * talleres; (faltaba FROM).
-- Forma correcta: SELECT * FROM talleres;
