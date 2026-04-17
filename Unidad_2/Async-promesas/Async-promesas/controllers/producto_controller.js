import { productService } from "../service/product-service.js";

const crearFila = (nombre, precio, descripcion, id) => {
  const fila = document.createElement("tr");

  const contenido = `
    <td>${nombre}</td>
    <td>${precio}</td>
    <td>${descripcion}</td>
    <td>
      <ul class="table__button-control">
        <li>
          <a href="../screens/editar_producto.html?id=${id}" class="simple-button simple-button--edit">
            Editar
          </a>
        </li>
        <li>
          <button class="simple-button simple-button--delete" id="${id}">
            Eliminar
          </button>
        </li>
      </ul>
    </td>
  `;

  fila.innerHTML = contenido;

  const btn = fila.querySelector("button");
  btn.addEventListener("click", () => {
    productService
      .eliminarProducto(id)
      .then(() => {
        alert("Producto eliminado");
        window.location.reload();
      })
      .catch(() => alert("No se pudo eliminar"));
  });

  return fila;
};

const tabla = document.querySelector("[data-table]");

productService
  .listarProductos()
  .then((data) => {
    data.forEach(({ nombre, precio, descripcion, id }) => {
      const fila = crearFila(nombre, precio, descripcion, id);
      tabla.appendChild(fila);
    });
  })
  .catch(() => alert("ERROR"));