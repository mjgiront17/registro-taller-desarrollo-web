# Registro de participantes para un taller — versión final

María José Girón Tol · Desarrollo Web

## Procedencia
Se amplió el proyecto del ZIP Entrega_Maria_Jose_Giron_Tol_Actividades_05_a_17_Actualizada. Se conservaron los cuatro commits existentes, las evidencias, la bitácora y las prácticas DOM, arreglos y funciones. El formulario mantiene sus cinco campos y opciones originales. Se añadieron modalidad y nivel de experiencia, SQLite, PUT, DELETE y reportes. Los PDF son material de referencia; no sustituyen el código ejecutable.

## Abrir en esta computadora
Haz doble clic en INICIAR.cmd y abre http://localhost:3000 en tu navegador. Mantén abierta la ventana del servidor. Para detenerlo, pulsa Ctrl+C en esa ventana. Si ya está ejecutándose, abre directamente la dirección. El lanzador usa Node instalado o el runtime local disponible de Codex.

## Instalar en otra computadora
1. Instala Node.js 22.13 o posterior (se recomienda Node 24 LTS).
2. Extrae el ZIP y abre la carpeta registro-taller-estudiante en VS Code.
3. En Terminal > Nueva terminal ejecuta:

```sh
npm install
npm start
```

4. Abre http://localhost:3000. No abras public/index.html directamente: necesita la API.

SQLite está integrado en Node; no requiere XAMPP, MySQL ni un servidor adicional. El archivo registro_taller.db se crea automáticamente en la raíz del proyecto y permanece al reiniciar. La fecha se almacena en UTC. DB_PATH permite elegir otro archivo y PORT otro puerto. No borres la base si deseas conservar registros. CREATE TABLE IF NOT EXISTS no migra tablas antiguas: realiza respaldo y migraciones si cambias el esquema.

## Uso
Completa nombre, correo, teléfono, taller, horario, modalidad y nivel. Registrar crea una inscripción; Editar carga sus siete campos en el formulario y Guardar cambios actualiza la fila; Cancelar edición vuelve al modo de creación. Eliminar pide confirmación y borra la fila elegida. Las tarjetas y barras muestran total y agrupaciones por taller, horario y modalidad; se actualizan después de cada operación. Las prácticas anteriores se encuentran en el apartado desplegable al final de la página y no agregan datos a la base.

## API
| Método | Ruta | Respuesta |
| --- | --- | --- |
| GET | /api/inscripciones | 200: filas de SQLite |
| POST | /api/inscripciones | 201: mensaje e id |
| PUT | /api/inscripciones/:id | 200: actualización; 404 si no existe |
| DELETE | /api/inscripciones/:id | 200: eliminación; 404 si no existe |
| GET | /api/reportes/resumen | 200: total, porTaller, porHorario, porModalidad |

POST y PUT reciben JSON con los siete campos:

```json
{"nombre":"Ana Ejemplo","correo":"ana@example.com","telefono":"5550-0123","taller":"HTML y CSS","horario":"Sábado de 9:00 a 11:00","modalidad":"Virtual","nivel_experiencia":"Inicial"}
```

Se rechazan campos vacíos, tipos distintos de texto, nombre fuera de 2–100 caracteres, correo inválido o mayor de 150 caracteres, teléfono fuera del patrón y selecciones no permitidas. Los errores de validación o id inválido devuelven 400; JSON mal formado devuelve 400; cuerpo mayor de 16 KB devuelve 413. Se usan sentencias SQL preparadas y textContent para mostrar los datos.

## Pruebas reproducibles

```sh
npm test
```

pruebas/final.test.js inicia un servidor HTTP real y una base temporal independiente. Comprueba CRUD, validación de los siete campos en POST y PUT, tipos y opciones inválidas, reportes, ids inválidos, filas inexistentes, JSON inválido y persistencia después de detener y reiniciar el proceso. No modifica tu base de uso normal. Las pruebas antiguas de actividad 12 son evidencia histórica de controladores simulados y no son la suite de la versión final.

Prueba manual: crear un registro ficticio; recargar; editar modalidad y nivel; revisar las barras; reiniciar el servidor; comprobar que sigue; eliminarlo. Vaciar un campo o escribir un correo inválido debe bloquear el envío. Revisar la página en escritorio y móvil.

## Evidencias
- evidencias/final_escritorio.jpg: formulario, lista con edición y reportes del servidor real.
- evidencias/final_movil.jpg: diseño de una columna a 412 px con datos ficticios.
- evidencias/final_pruebas_http.txt: resultado de la suite real.
- Las capturas anteriores se conservan con su alcance original; no son pruebas de la versión final.

## Repositorio GitHub

Repositorio privado de entrega: https://github.com/mjgiront17/registro-taller-desarrollo-web

El código, la documentación y las evidencias se cargan mediante la sesión web de la estudiante. El historial original de cuatro commits se conserva en la copia local y en el ZIP con .git; la carga web crea su propio historial en GitHub. No se ha realizado un push del historial local.

El repositorio es privado porque incluye identificación académica y evidencias de clase. Para que el docente pueda revisarlo, invita su cuenta de GitHub como colaborador o acuerda la visibilidad apropiada.

No se incluyen node_modules, .env ni bases SQLite en los archivos de la entrega remota. Para ejecutarlo después de descargarlo, usa npm install y npm start.

## Archivos principales
server.js: Express y validación. database.js: tabla y conexión. public/: interfaz y fetch. pruebas/final.test.js: pruebas reales. bitacora.md: historia de actividades y ampliación final. README_actividades_05_a_17.md: instrucciones históricas sin alterar.

## Defensa
El formulario produce un objeto con FormData; fetch envía JSON; express.json interpreta el cuerpo; Express valida; una consulta preparada modifica SQLite; la respuesta actualiza lista y reportes. GET consulta, POST crea, PUT actualiza y DELETE elimina. COUNT y GROUP BY alimentan los reportes. La persistencia se verificó reiniciando el proceso. La validación del navegador ayuda a corregir datos y la del servidor impide aceptar solicitudes inválidas que omitan el formulario.
