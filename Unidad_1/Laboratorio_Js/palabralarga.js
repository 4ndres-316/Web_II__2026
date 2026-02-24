const frase = "Alejandro limpiará el vidrio mañana";

function palabralarga(frase) {
  let pala = frase.split(" ");
  let larga = "";

  for (let p of pala) {
    if (p.length > larga.length) {
      larga = p;
    }
  }
  return larga;
}

const palabra = (frase) => {
  let pala = frase.split(" ");
  let larga = "";

  for (let p of pala) {
    if (p.length > larga.length) {
      larga = p;
    }
  }
  console.log(`Palabra más larga: ${larga}`);
};

console.log(frase);

let resultado = palabralarga(frase);
console.log(`Palabra más larga: ${resultado}`);

palabra(frase);