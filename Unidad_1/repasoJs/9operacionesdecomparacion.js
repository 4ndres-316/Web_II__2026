const valores = 1000;
if (valores === 1000) {
  console.log(`el pasaje es correcto`);
}

const paisdestino = "Ecuador";
const paisesdisponible = [
  "Bolivia",
  "Ecuador",
  "Brasil",
  "Venezuela",
  "Italia",
  "Francia",
];

let edadpasajero = 17;
let acompañado1 = true;

console.log(`pasajes para ${paisdestino}`);
if (
  (paisesdisponible.indexOf(paisdestino) > -1 && edadpasajero >= 18) ||
  acompañado1
) {
    console.log(`el pasaje disponible para venta`);
}
else{
    console.log(`no se puede vender el pasaje`);
}

let acompañado2 = false;

console.log(`pasajes para ${paisdestino}`);
if (
  (paisesdisponible.indexOf(paisdestino) > -1 && edadpasajero >= 18) ||
  acompañado2
) {
    console.log(`el pasaje disponible para venta`);
}
else{
    console.log(`no se puede vender el pasaje`);
}