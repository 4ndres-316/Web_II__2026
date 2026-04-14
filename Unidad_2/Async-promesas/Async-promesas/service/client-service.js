/*const crearFila = (nombre, email) => {
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
            href="../screens/editar_cliente.html"
            class="simple-button simple-button--edit"
          >
            Editar
          </a>
        </li>
        <li>
          <button class="simple-button simple-button--delete" type="button">
            Eliminar
          </button>
        </li>
      </ul>
    </td>
  `;
  fila.innerHTML = contenido;
  return fila;
};*/

const tabla = document.querySelector("[data-table]"); //seleccionamos la tabla
/*const listar_clientes = () => {
  const promesa = new Promise((resolve, reject) => {
    const http = new XMLHttpRequest(); //variable para request con http
    http.open("GET", "http://localhost:3000/perfil"); //abrimos la conexion con el metodo get y la url
    http.send();
    http.onload = () => {
      const response = JSON.parse(http.response); //parseamos la respuesta a json
      if (http.response >= 400) {
        reject(response);
      } else {
        resolve(response);
      }
    };
  });
  return promesa;
};

listar_clientes().then((data) => {
  data.forEach((perfil) => {
    const nueva_fila = crearFila(perfil.nombre, perfil.email);
    tabla.appendChild(nueva_fila);
  });
})
.catch((error) => alert("Sin Conexión"));*/

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=OPTIMIZADO-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/
const listar_clientes = () =>
  fetch("http://localhost:3000/perfil").then((respuesta) => respuesta.json());

const crearCliente = (nombre, email) => {
  return fetch("http://localhost:3000/perfil", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email, id: uuid.v4() }),
  });
};

const actualizarCliente = (nombre, email, id) => {
  //solo modifico el nombre y el email, el id se mantiene igual
  return fetch(`http://localhost:3000/perfil/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email })
      .then((respuesta) => console.log(respuesta))
      .catch((error) => console.log(error)),
  });
};

const eliminarCliente = (id) => {
  console.log("eliminar", id);
  return fetch(`http://localhost:3000/perfil/${id}`, {
    method: "DELETE",
  });
};

//referencia a id
const cliente = (id) => {
  return fetch(`http://localhost:3000/perfil/${id}`).then((respuesta) =>
    respuesta.json(),
  );
};

export const clientService = {
  listar_clientes,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
  cliente,
};
