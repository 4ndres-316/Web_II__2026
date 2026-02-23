const ciudades = new Array("sucre","la paz","santa cruz","pando","beni");

const paises =["Bolivia","Ecuador","Brasil","Venezuela","Italia","Francia"];

let conteociu = ciudades.length;
console.log(`el conteo total de las ciudades es ${conteociu}`);

//ejer
ciudades.shift();//elimina primer elemento
console.log(ciudades);

ciudades.pop();//elimina el ultimo elemento
console.log(ciudades);

console.log(paises.join("-"));//unifica los elementos en una cadena de caracteres

console.log(paises.sort());//ordenar arreglos