// Actividad 08: práctica de variables, suma y cupos.
'use strict';
const numero1 = 7;
const numero2 = 5;
const suma = numero1 + numero2;
console.log('Prediccion de la suma: 12');
console.log('Resultado de 7 + 5:', suma);

const cuposMaximos = 20;
let inscritos = 0;
function hayCupo() { return inscritos < cuposMaximos; }
if (hayCupo()) inscritos++;
console.log('Inscritos tras una alta:', inscritos);

inscritos = 20;
console.log('hayCupo() con 20 inscritos:', hayCupo());
if (hayCupo()) inscritos++;
console.log('Inscritos tras intentar agregar al llegar a 20:', inscritos);
