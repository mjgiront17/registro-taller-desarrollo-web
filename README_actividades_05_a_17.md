# Registro de participantes para un taller — Desarrollo Web

**Estudiante:** María José Girón Tol  
**Carné:** 1090-23-15450  
**Fecha:** 8 de noviembre de 2026

## Contenido de esta entrega

Se incluyen las prácticas de **HTML, CSS, JavaScript y diseño responsive (05 a 10)**, la documentación de Node.js (11), la API Express con rutas GET y POST (12), el frontend preparado con `fetch` (13) y la **práctica SQL ejecutada localmente (14)**. La bitácora contiene preguntas, respuestas, explicaciones y enlaces a evidencias de las actividades trabajadas.

- `public/index.html`: formulario de nombre, correo, teléfono, taller y horario; datos ficticios de ejemplo y demostraciones de las actividades 09 y 10.
- `public/styles.css`: estilos, modelo de caja y reglas responsive.
- `public/app.js`: manejo de eventos `submit`, `click` e `input`, y ejemplo de arreglos y funciones.
- `server.js`: servidor Express con rutas GET y POST; valida cinco campos y devuelve estados 200, 201 y 400.
- `bitacora.md`: respuestas y evidencias de las actividades.
- `evidencias/`: capturas, ejemplos de código y archivos de comprobación. Consulta también [Índice de evidencias](INDICE_DE_EVIDENCIAS.md).

## Cómo abrir el proyecto

1. Instalar Node.js 18 o superior si no está disponible.
2. Abrir `registro-taller-estudiante` en Visual Studio Code.
3. Abrir la terminal y ejecutar `npm install` y luego `npm start`.
4. En el navegador, visitar `http://localhost:3000`.

Si Windows bloquea `npm.ps1` desde PowerShell, ejecutar `npm.cmd install` y `npm.cmd start`.

## Estado de funcionamiento

El formulario puede validar campos obligatorios y demostrar los eventos de JavaScript. La actividad de arreglos muestra **3 inscripciones ficticias** en la página. La API de Express ya incluye la ruta `POST /api/inscripciones` con validación. En la Actividad 13 se agregó `fetch` para enviar los datos, pero la comunicación HTTP real con Express requiere ejecutar el servidor y comprobarla en el equipo de entrega. `GET /api/inscripciones` devuelve el arreglo temporal, inicialmente vacío.

## Capturas y evidencias

Las imágenes de las actividades 05, 06, 08, 09 y 10 documentan prácticas locales. Las imágenes de los primeros ocho niveles de Flexbox Froggy muestran **demostraciones locales del código y su comportamiento**, no pantallas de una cuenta de Flexbox Froggy. El ejercicio de W3Schools también se resolvió y verificó localmente: no hay captura de entrega en W3Schools. Las capturas del diseño móvil corresponden al proyecto funcionando con un ancho de 412 píxeles.

## Entrega posterior

Las actividades 11 a 20 están contestadas como material de estudio en la bitácora y se ha programado la API de la Actividad 12. De la actividad 11 se incluye una captura de verificación de Node.js y npm en el entorno de prueba, no del equipo personal. La instalación de dependencias y la ejecución HTTP de la API aún requieren comprobación en una computadora con acceso al registro de npm. La lógica de las rutas de la Actividad 12 se verificó con pruebas locales que simulan Express y usan los controladores reales de `server.js`; la Actividad 13 contiene la integración `fetch` y sus simulaciones, y la Actividad 14 ya tiene una práctica local ejecutada de SQL. La Actividad 15 tiene cuatro commits Git locales. La Actividad 16 está preparada para crear y conectar un repositorio remoto, pero no se ha publicado en GitHub. En la Actividad 17 se respondieron las siete preguntas del cuestionario de frontend en la guía HTML, con resultado 7/7. Las prácticas posteriores a la 17 siguen pendientes. No se incluye una URL ficticia.

## Actividad 12 — API con Express

- `GET /api/inscripciones`: consulta los registros guardados en memoria (200).
- `POST /api/inscripciones`: recibe `nombre`, `correo`, `telefono`, `taller` y `horario`; crea el registro (201) o informa un error de validación (400).
- Para probar en una computadora con dependencias instaladas: ejecuta `npm install`, `npm start` y abre `http://localhost:3000/api/inscripciones` para comprobar el GET.
- Para enviar un POST de prueba en PowerShell, puedes usar:

```powershell
$datos = @{ nombre='Ana López'; correo='ana.lopez@example.com'; telefono='5550-0123'; taller='HTML y CSS'; horario='Sábado de 9:00 a 11:00' } | ConvertTo-Json
Invoke-RestMethod -Uri 'http://localhost:3000/api/inscripciones' -Method Post -ContentType 'application/json; charset=utf-8' -Body ([System.Text.Encoding]::UTF8.GetBytes($datos))
```

Las pruebas automáticas sin dependencias pueden ejecutarse con `node --test pruebas/actividad_12.test.js`. Simulan Express **únicamente para probar la lógica de las rutas**, no realizan peticiones HTTP reales. Las imágenes incluidas describen esa condición.


## Actividad 13 — ejemplo de inscripción con fetch

Se completó la conexión del formulario con `GET /api/inscripciones` y `POST /api/inscripciones` en `public/app.js`. La lista se actualiza usando `textContent` y la solicitud envía los cinco datos como JSON.

Ejemplo de prueba: Sofía López, `sofia.lopez@example.com`, teléfono `5555 1234`, taller JavaScript y un horario válido del selector. Inicia el servidor con `npm install` seguido de `npm start` y abre `http://localhost:3000` para comprobar un registro real.

Las capturas de la Actividad 13 corresponden al **simulador de la guía** y a una **prueba de frontend con respuestas simuladas**. No se presentan como capturas de una conexión real a Express, que debe verificarse ejecutando la aplicación con las dependencias instaladas.

## Actividad 14 — Práctica de SQL

Se agregó una práctica **independiente** de SQLite en `evidencias/actividad_14_consultas.sql`. En ella se crea `talleres`, se inserta un registro ficticio, se consulta, se actualiza el horario a `Noche`, se elimina por `id` y se comprueba que no queden filas. El registro de ejecución y las capturas se guardan en `evidencias/`; el procedimiento también está explicado en `bitacora.md`.

**Nota:** se realizó con SQLite local. No se modificó la aplicación para guardar las inscripciones en SQL: el proyecto conserva el almacenamiento en memoria de Express tal como indica la guía. Para repetir la actividad en SQLite Fiddle se pueden copiar los bloques del archivo `.sql`.


## Actividad 15 — Git

Se creó un historial local de versiones para la estructura inicial, el formulario HTML/CSS y la lógica JavaScript/API con documentación. Las pruebas de terminal están en `evidencias/actividad_15_*`.

**Para publicar en GitHub:** configura tu propio correo de Git y agrega un remoto válido; luego ejecuta `git push -u origin main`. El repositorio **no se ha publicado** en GitHub como parte de esta entrega. Para verificar los commits locales, ejecuta `git log --oneline`.

## Actividad 16 — Publicación en GitHub (preparación local)

La carpeta tiene el código, la rama `main` y el historial Git local. **No hay un enlace de GitHub publicado:** hace falta crear un repositorio vacío desde la cuenta de la estudiante, configurar el correo personal y usar `git push`. Las instrucciones están en [Actividad 16: publicar en GitHub](evidencias/actividad_16_publicar_en_github.md).

## Actividad 17 — Cuestionario frontend

Se resolvieron las siete preguntas de frontend en la guía interactiva HTML proporcionada, con **7/7 aciertos**. Hay capturas auténticas de esa página de repaso en `evidencias/actividad_17_quiz_frontend_respuestas.png` y `evidencias/actividad_17_quiz_frontend_resultado.png`. Las respuestas están en `bitacora.md`.
