import { productService } from "../service/product-service.js";

const formulario = document.querySelector("[data-form]");
const obInfo = async () => {
  const url = new URL(window.location);
  const id = url.searchParams.get("id");

  if (id == null) {
    window.location.href = "../screens/error_producto.html";
  }

  const nombre = document.querySelector("[data-nombre]");
  const precio = document.querySelector("[data-precio]");
  const descripcion = document.querySelector("[data-descripcion]");

  try {
    const producto = await productService.producto(id);

    if (producto.nombre) {
      nombre.value = producto.nombre;
      precio.value = producto.precio;
      descripcion.value = producto.descripcion;
    } else {
      throw new Error();
    }
  } catch (error) {
    window.location.href = "../screens/error_producto.html";
  }
};

obInfo();

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const url = new URL(window.location);
  const id = url.searchParams.get("id");

  const nombre = document.querySelector("[data-nombre]").value;
  const precio = document.querySelector("[data-precio]").value;
  const descripcion = document.querySelector("[data-descripcion]").value;

  productService
    .actualizarProducto(nombre, precio, descripcion, id)
    .then(() => {
      window.location.href = "../screens/edicion_producto.html";
    });
});
