const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function esPrimo(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}
//filter() verifica si se cumple una condición
function primal(arr) {
  return arr.filter(esPrimo);
}

const primo = (arr) => {
  console.log(`Los números primos son: ${arr.filter(esPrimo)}`);
};

console.log(numeros);

let resultado = primal(numeros);
console.log(`Los números primos son: ${resultado}`);

primo(numeros);
