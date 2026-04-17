const tabla = document.querySelector("[data-table]");

const listarProductos = () =>
  fetch("http://localhost:3000/productos").then((respuesta) =>
    respuesta.json(),
  );

const crearProducto = (nombre, precio, descripcion) => {
  return fetch("http://localhost:3000/productos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombre,
      precio,
      descripcion,
      id: crypto.randomUUID(), // ← reemplaza uuid.v4()
    }),
  });
};

const actualizarProducto = (nombre, precio, descripcion, id) => {
  return fetch(`http://localhost:3000/productos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, precio, descripcion }),
  })
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));
};

const eliminarProducto = (id) => {
  console.log("eliminar producto", id);
  return fetch(`http://localhost:3000/productos/${id}`, {
    method: "DELETE",
  });
};

const producto = (id) => {
  return fetch(`http://localhost:3000/productos/${id}`)
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log("Error aquí", error));
};

export const productService = {
  listarProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  producto,
};
