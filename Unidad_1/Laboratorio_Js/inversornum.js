const num = 587943;

function inversor(num) {
  let separ = num.toString().split("");
  var l = separ.length - 1;
  for (let i = 0; i < separ.length / 2; i++) {
    let aux = separ[i];
    separ[i] = separ[l - i];
    separ[l - i] = aux;
  }
  return separ.join("");
}

const invertir = (num) => {
  let separ = num.toString().split("");
  var l = separ.length - 1;
  for (let i = 0; i < separ.length / 2; i++) {
    let aux = separ[i];
    separ[i] = separ[l - i];
    separ[l - i] = aux;
  }
  console.log(`Número invertido: ${separ.join("")}`);
};

console.log(num);

let resultado = inversor(num);
console.log(`Número invertido: ${resultado}`);

invertir(num);
