const { test } = require('node:test');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const { mkdtempSync, rmSync } = require('node:fs');
const { tmpdir } = require('node:os');
const path = require('node:path');
const net = require('node:net');

test('API real: CRUD, validaciones, reportes y persistencia tras reiniciar', async () => {
  const carpeta = mkdtempSync(path.join(tmpdir(), 'taller-test-'));
  const disponible = net.createServer();
  await new Promise(resolve => disponible.listen(0, '127.0.0.1', resolve));
  const port = disponible.address().port;
  await new Promise(resolve => disponible.close(resolve));
  let proceso;
  async function iniciar() {
    proceso = spawn(process.execPath, [path.join(__dirname, '../server.js')], {
      env: { ...process.env, PORT: String(port), DB_PATH: path.join(carpeta, 'pruebas.db') }, stdio: ['ignore', 'pipe', 'pipe']
    });
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('El servidor no inició')), 10000);
      proceso.stdout.on('data', data => { if (String(data).includes('Servidor disponible')) { clearTimeout(timer); resolve(); } });
      proceso.on('error', err => { clearTimeout(timer); reject(err); });
      proceso.once('exit', code => { clearTimeout(timer); reject(new Error('Servidor terminó: ' + code)); });
    });
  }
  async function detener() { if (proceso && proceso.exitCode === null) { await new Promise(resolve => { proceso.once('exit', resolve); proceso.kill(); }); } }
  async function pedir(ruta = '/api/inscripciones', metodo = 'GET', cuerpo) {
    const respuesta = await fetch('http://127.0.0.1:' + port + ruta, { method: metodo,
      headers: cuerpo === undefined ? {} : { 'Content-Type': 'application/json' },
      body: cuerpo === undefined ? undefined : JSON.stringify(cuerpo) });
    return { estado: respuesta.status, datos: await respuesta.json() };
  }
  const ejemplo = { nombre: 'Ana Ejemplo', correo: 'ana@example.com', telefono: '5550-0123', taller: 'HTML y CSS', horario: 'Sábado de 9:00 a 11:00', modalidad: 'Virtual', nivel_experiencia: 'Inicial' };
  try {
    await iniciar();
    assert.deepEqual((await pedir()).datos, []);
    assert.equal((await pedir('/api/reportes/resumen')).datos.total, 0);
    for (const campo of Object.keys(ejemplo)) {
      assert.equal((await pedir(undefined, 'POST', { ...ejemplo, [campo]: '' })).estado, 400);
      assert.equal((await pedir('/api/inscripciones/1', 'PUT', { ...ejemplo, [campo]: '' })).estado, 400);
    }
    for (const cambio of [{correo:'incorrecto'}, {telefono:'abc'}, {nombre:'A'}, {modalidad:'Otra'}, {taller:'Otro'}, {horario:'Otro'}, {nivel_experiencia:'Otro'}, {correo:42}]) {
      assert.equal((await pedir(undefined, 'POST', {...ejemplo,...cambio})).estado,400);
      assert.equal((await pedir('/api/inscripciones/1','PUT',{...ejemplo,...cambio})).estado,400);
    }
    assert.equal((await pedir()).datos.length, 0);
    const creado = await pedir(undefined, 'POST', ejemplo); assert.equal(creado.estado, 201);
    const id = creado.datos.id;
    const segundo = await pedir(undefined, 'POST', { ...ejemplo, nombre:'Luis Ejemplo', modalidad:'Presencial', taller:'JavaScript' });
    assert.equal(segundo.estado,201);
    let reporte = (await pedir('/api/reportes/resumen')).datos;
    assert.equal(reporte.total,2); assert.equal(reporte.porModalidad.length,2);
    assert.equal(reporte.porHorario[0].cantidad,2);
    assert.equal(reporte.porTaller.reduce((s,f)=>s+f.cantidad,0),2);
    await detener(); await iniciar();
    assert.equal((await pedir()).datos.length,2);
    const cambio = { ...ejemplo, nombre:'Ana Actualizada', modalidad:'Presencial', nivel_experiencia:'Avanzado', taller:'JavaScript' };
    assert.equal((await pedir('/api/inscripciones/'+id,'PUT',cambio)).estado,200);
    assert.equal((await pedir()).datos.find(f=>f.id===id).nivel_experiencia,'Avanzado');
    reporte=(await pedir('/api/reportes/resumen')).datos;
    assert.equal(reporte.porModalidad[0].cantidad,2); assert.equal(reporte.porTaller[0].cantidad,2);
    for (const metodo of ['PUT','DELETE']) {
      assert.equal((await pedir('/api/inscripciones/999999',metodo,metodo==='PUT'?ejemplo:undefined)).estado,404);
      assert.equal((await pedir('/api/inscripciones/no',metodo,metodo==='PUT'?ejemplo:undefined)).estado,400);
    }
    const mal = await fetch('http://127.0.0.1:'+port+'/api/inscripciones',{method:'POST',headers:{'Content-Type':'application/json'},body:'{'});
    assert.equal(mal.status,400);
    assert.equal((await pedir('/api/inscripciones/'+id,'DELETE')).estado,200);
    assert.equal((await pedir('/api/reportes/resumen')).datos.total,1);
    assert.equal((await pedir('/api/inscripciones/'+segundo.datos.id,'DELETE')).estado,200);
    assert.equal((await pedir('/api/reportes/resumen')).datos.total,0);
    console.log('Comprobados: CRUD, 30 rechazos de validación, 400/404, agrupaciones, JSON inválido y persistencia tras reinicio.');
  } finally { await detener(); rmSync(carpeta, { recursive:true, force:true }); }
});
