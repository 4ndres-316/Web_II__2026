const productos = [
  { nombre: "manzana", precio: 5 },
  { nombre: "banana", precio: 3 },
  { nombre: "pera", precio: 4 },
  { nombre: "piña", precio: 10 },
  { nombre: "carne", precio: 100 },
];

function sumar(arr, prop) {
  let suma = 0;
  for (let i = 0; i < arr.length; i++) {
    suma += arr[i][prop];
  }
  return suma;
}

const sumarpropiedad = (arr, prop) => {
  let suma = 0;
  for (let i = 0; i < arr.length; i++) {
    suma += arr[i][prop];
  }
  console.log(`Suma de ${prop}: ${suma}`);
};

console.log(productos);

let resultado = sumar(productos, "precio");
console.log(`Suma de precio: ${resultado}`);

sumarpropiedad(productos, "precio");
