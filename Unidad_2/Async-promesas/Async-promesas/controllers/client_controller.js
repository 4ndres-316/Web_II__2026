import { clientService } from "../service/client-service.js";

const crearFila = (nombre, email) => {
  const fila = document.createElement("tr"); //creamos una fila
  //html como variable
  const contenido = `
    <td class="td" data-td>
      ${nombre}
    </td>
    <td>${email}</td>
    <td>
      <ul class="table__button-control">
        <li>
          <a
            href="../screens/editar_cliente.html?id=${id}"
            class="simple-button simple-button--edit"
          >
            Editar
          </a>
        </li>
        <li>
          <button class="simple-button simple-button--delete" type="button" id="${id}">
            Eliminar
          </button>
        </li>
      </ul>
    </td>
  `;
  fila.innerHTML = contenido;
  const btn = fila.querySelector("button").addEventListener("click", () => {
    const id = btn.id;
    clientService
      .eliminarCliente(id)
      .then((respuesta) => alert("eliminado").window.location.reload())
      .catch((error) => alert("no se pudo eliminar"));
  });
  return fila;
};

const tabla = document.querySelector("[data-table]");
clientService.listar_clientes().then((data) => {
data.forEach(( { nombre, email, id }) => {
    const nuevaFila=crearFila(nombre, email, id)
    tabla.appendChild(nuevaFila)
});
}).catch((error) => alert("ERROR"));
