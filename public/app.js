// Actividad 09 — DOM y eventos.
// Busca los elementos de la página mediante sus identificadores.
const formulario = document.querySelector("#formulario-registro");
const lista = document.querySelector("#lista-inscripciones");
const mensaje = document.querySelector("#mensaje");
const campoNombre = document.querySelector("#nombre");
const avisoEscritura = document.querySelector("#aviso-escritura");
const contadorElemento = document.querySelector("#contador-clics");
const botonClic = document.querySelector("#boton-prueba-clic");

// Evento click: cambia el contador sin recargar la página.
let clics = 0;
botonClic.addEventListener("click", () => {
  clics++;
  contadorElemento.textContent = String(clics);
});

// Evento input: muestra el texto mientras se escribe en el campo nombre.
campoNombre.addEventListener("input", (evento) => {
  avisoEscritura.textContent = `Escribiendo: ${evento.target.value || "(campo vacío)"}`;
});

// Proyecto final: CRUD persistente y reportes.
let idEnEdicion = null;
let ocupado = false;
const cancelar = document.querySelector('#cancelar-edicion');
const enviar = formulario.querySelector('button[type=submit]');
function avisar(texto, error = false) { mensaje.textContent = texto; mensaje.classList.toggle('error', error); }
async function api(ruta, config) {
 const respuesta = await fetch(ruta, config);
 const datos = await respuesta.json();
 if (!respuesta.ok) throw new Error(datos.mensaje || 'Error HTTP ' + respuesta.status);
 return datos;
}
function nodo(tag, texto, clase) { const el = document.createElement(tag); if (texto !== undefined) el.textContent = texto; if (clase) el.className = clase; return el; }
function cancelarEdicion() { idEnEdicion = null; formulario.reset(); enviar.textContent = 'Registrar inscripción'; cancelar.hidden = true; document.querySelector('#titulo-formulario').textContent = 'Datos de inscripción'; }
cancelar.onclick = () => { if (!ocupado) cancelarEdicion(); };
function mostrarInscripciones(filas) {
 lista.replaceChildren();
 if (!filas.length) { lista.append(nodo('li', 'Aún no hay inscripciones.', 'vacio')); return; }
 for (const fila of filas) {
  const item = nodo('li'); item.append(nodo('h3', fila.nombre));
  item.append(nodo('p', fila.correo + ' · ' + fila.telefono, 'detalle'));
  item.append(nodo('p', fila.taller + ' · ' + fila.horario, 'detalle'));
  item.append(nodo('p', fila.modalidad + ' · Nivel ' + fila.nivel_experiencia, 'detalle'));
  item.append(nodo('p', 'Registro #' + fila.id + ' · ' + fila.fecha_registro + ' UTC', 'detalle'));
  const acciones = nodo('div', undefined, 'acciones-fila');
  const editar = nodo('button', 'Editar', 'secundario'); editar.type = 'button'; editar.setAttribute('aria-label', 'Editar inscripción de ' + fila.nombre);
  editar.onclick = () => { if (ocupado) return; idEnEdicion = fila.id; for (const [c,v] of Object.entries(fila)) { const control = formulario.elements.namedItem(c); if (control) control.value = v; } enviar.textContent = 'Guardar cambios'; cancelar.hidden = false; document.querySelector('#titulo-formulario').textContent = 'Editar inscripción #' + fila.id; campoNombre.focus(); };
  const borrar = nodo('button', 'Eliminar', 'peligro'); borrar.type = 'button'; borrar.setAttribute('aria-label', 'Eliminar inscripción de ' + fila.nombre);
  borrar.onclick = async () => {
   if (ocupado || !confirm('¿Eliminar la inscripción de ' + fila.nombre + '?')) return;
   ocupado = true; borrar.disabled = true; enviar.disabled = true;
   try { const resultado = await api('/api/inscripciones/' + fila.id, {method:'DELETE'}); if (idEnEdicion === fila.id) cancelarEdicion(); await refrescarTrasCambio(resultado.mensaje); }
   catch(error) { avisar(error.message, true); }
   finally { ocupado = false; borrar.disabled = false; enviar.disabled = false; }
  };
  acciones.append(editar,borrar); item.append(acciones); lista.append(item);
 }
}
function barras(id, filas, campo) {
 const ul = document.getElementById(id); ul.replaceChildren();
 if (!filas.length) { ul.append(nodo('li','Todavía no hay inscripciones para reportar.','vacio')); return; }
 const mayor = Math.max(...filas.map(f => Number(f.cantidad)), 1);
 for (const fila of filas) { const li = nodo('li'); const etiqueta = nodo('div',undefined,'etiqueta-barra'); etiqueta.append(nodo('span',fila[campo]),nodo('strong',String(fila.cantidad))); const fondo = nodo('div',undefined,'barra-fondo'); fondo.setAttribute('aria-hidden','true'); const barra = nodo('div',undefined,'barra'); barra.style.width = (Number(fila.cantidad)/mayor*100)+'%'; fondo.append(barra); li.append(etiqueta,fondo); ul.append(li); }
}
async function refrescar() {
 const [filas, reporte] = await Promise.all([api('/api/inscripciones'), api('/api/reportes/resumen')]);
 mostrarInscripciones(filas); document.querySelector('#total').textContent = reporte.total;
 barras('reporte-talleres',reporte.porTaller,'taller'); barras('reporte-horarios',reporte.porHorario,'horario'); barras('reporte-modalidades',reporte.porModalidad,'modalidad');
}
async function refrescarTrasCambio(texto) { try { await refrescar(); avisar(texto); } catch { avisar(texto + ' No se pudo actualizar la vista. Recarga la página.', true); } }
formulario.addEventListener('submit', async evento => {
 evento.preventDefault(); if (ocupado || !formulario.reportValidity()) return;
 ocupado = true; enviar.disabled = true; cancelar.disabled = true;
 try { const datos = Object.fromEntries(new FormData(formulario)); const resultado = await api('/api/inscripciones' + (idEnEdicion ? '/' + idEnEdicion : ''), {method:idEnEdicion?'PUT':'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(datos)}); cancelarEdicion(); await refrescarTrasCambio(resultado.mensaje); }
 catch(error) { avisar(error.message, true); }
 finally { ocupado = false; enviar.disabled = false; cancelar.disabled = false; }
});
refrescar().catch(() => avisar('No se pudieron cargar las inscripciones. Inicia el servidor y recarga la página.',true));

// Actividad 10 — Arreglos y funciones.
// Estos datos son ficticios y NO están guardados en la API ni la base de datos.
const inscripcionesEjemplo = ["Ana López", "Luis Pérez", "Marta García"];

function contarInscripcionesEjemplo() {
  return inscripcionesEjemplo.length;
}

const listaEjemplo = document.querySelector("#lista-ejemplo-inscripciones");
const resultadoCantidad = document.querySelector("#resultado-cantidad");

inscripcionesEjemplo.forEach((nombre) => {
  const elemento = document.createElement("li");
  elemento.textContent = nombre;
  listaEjemplo.appendChild(elemento);
});

resultadoCantidad.textContent = `Total de inscripciones de ejemplo: ${contarInscripcionesEjemplo()}`;
