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

//const tabla = document.querySelector("[data-table]"); //seleccionamos la tabla
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
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-OPTIMIZADO-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/
/*const listar_clientes = () =>
  fetch("http://localhost:3000/perfil").then((respuesta) => respuesta.json());

const crearCliente = (nombre, email) => {
  return fetch("http://localhost:3000/perfil", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email, id: uuid.v4() }),
  });
};

const actualizarCliente = (nombre, email, id) => {
  return fetch(`http://localhost:3000/perfil/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email }),
  })
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));
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
    respuesta.json())
  .catch((error) => console.log("Error aquí",error));
};*/

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-MYSQL=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/
/*const API_BASE_URL = "http://localhost/API/conexion.php";

const listar_clientes = () => {
  return fetch(`${API_BASE_URL}`).then((respuesta) => {
    if (!respuesta.ok) {
      throw new Error("Error al obtener los clientes");
    }
    return respuesta.json();
  });
};

const crearCliente = (nombre, email) => {
  return fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email }),
  }).then((respuesta) => {
    if (!respuesta.ok) {
      throw new Error("Error al crear el cliente");
    }
    return respuesta.json();
  });
};

const eliminarCliente = (id) => {
  return fetch(`${API_BASE_URL}?id=${id}`, {
    method: "DELETE",
  });
};

const actualizarCliente = (nombre, email, id) => {
  return fetch(`${API_BASE_URL}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email, id }),
  })
    .then((respuesta) => {
      console.log(respuesta);
    })
    .catch((error) => console.log(error));
};

const cliente = (id) => {
  return fetch(`${API_BASE_URL}?id=${id}`).then((respuesta) =>
    respuesta.json(),
  );
};*/

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-SUPABASE-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/
/*const URL_SUPABASE = "https://uuowpnopgueaqtkmvvnx.supabase.co";
const SUPABASE_KEY = "sb_publishable_ltf_LjQgaLRI28z2AbtMbw_QY7U7Xqo";
const tabla = "clientes";
const API_URL = `${URL_SUPABASE}/rest/v1/${tabla}`;

const HEADERS = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

const request = async (url, option = {}) => {
  const res = await fetch(url, { headers: HEADERS, ...option });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    //manera de manejar errores, si no hay mensaje o error, se muestra el texto o un mensaje genérico
    const mensaje = data?.message ?? data?.error ?? text ?? "Error";
    throw new Error(mensaje);
  }
  return data;
};

//get
const listar_clientes = () => {
  return request(`${API_URL}?select=id,nombre,email`);
};

//get por id
const cliente = (id) => {
  return request(`${API_URL}?id=eq.${id}&select=id,nombre,email`).then(
    (respuesta) => respuesta?.[0],
  );
};

//post
const crearCliente = (nombre, email) => {
  return request(API_URL, {
    method: "POST",
    body: JSON.stringify({ nombre, email }),
  }).then((data) => data?.[0]);
};

//put/patch
const actualizarCliente = (nombre, email, id) => {
  return request(`${API_URL}?id=eq.${id}`, {
    method: "PATCH",
    body: JSON.stringify({ nombre, email }),
  }).then(
    (data) => data?.[0] ?? Promise.reject(new Error("No se pudo actualizar")),
  );
};

//delete
const eliminarCliente = (id) => {
  return request(`${API_URL}?id=eq.${id}`, {
    method: "DELETE",
  }).then(
    (data) => data?.[0] ?? Promise.reject(new Error("No se pudo eliminar")),
  );
};*/

/*export const clientService = {
  listar_clientes,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
  cliente,
};*/

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-Express-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/
const BASE_URL = "http://localhost:3000";
const clientService = {
  //get
  listar_clientes: async () => {
    const res = await fetch(`${BASE_URL}/clientes`);
    return res.json();
  },

  //get por id
  cliente: async (id) => {
    const res = await fetch(`${BASE_URL}/clientes/${id}`);
    return res.json();
  },

  //post
  crearCliente: async (nombre, email) => {
    const res = await fetch(`${BASE_URL}/clientes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, email }),
    });
    return res.json();
  },

  //put
  actualizarCliente: async (nombre, email, id) => {
    const res = await fetch(`${BASE_URL}/clientes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email }),
    });
    return res.json();
  },

  //delete
  eliminarCliente: async (id) => {
    const res = await fetch(`${BASE_URL}/clientes/${id}`, {
      method: "DELETE",
    });
    return res.json();
  },
};
export { clientService };
