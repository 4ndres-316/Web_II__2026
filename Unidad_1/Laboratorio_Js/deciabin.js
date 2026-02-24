const num = 104;

function binario(num) {
  return num.toString(2);
}

const decimalabin = (num) => {
  console.log(`El número en binario es: ${num.toString(2)}`);
};

console.log(num);

let resultado = binario(num);
console.log(`El número en binario es: ${resultado}`);

decimalabin(num);
