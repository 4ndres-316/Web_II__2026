const datos = [
  {
    pais: "Bolivia",
    precio: 500
  },
  {
    pais: "Ecuador",
    precio: 600
  },
  {
    pais: "Brasil",
    precio: 700
  },
  {
    pais: "Venezuela",
    precio: 400
  },
  {
    pais: "Italia",
    precio: 350
  },
  {
    pais: "Francia",
    precio: 100
  },
];
const presupuesto = 300;
const buscarPasaje = (datos, presupuesto) => {
  let paisSeleccionado = "";

  for (let i = 0; i < datos.length && paisSeleccionado === ""; i++) {
    if (datos[i].precio <= presupuesto) {
      paisSeleccionado = datos[i].pais;
    }
  }

  return paisSeleccionado;
};

const resultado = buscarPasaje(datos, presupuesto);

if (resultado === "") {
  console.log("No existen pasajes disponibles");
} else {
  console.log(`Puedes comprar pasaje a ${resultado}`);
}
