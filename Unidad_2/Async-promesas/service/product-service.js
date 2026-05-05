/*const tabla = document.querySelector("[data-table]");

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
};*/

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-MYSQL=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/
const API_BASE_URL = "http://localhost/API/productos.php";

const listarProductos = () => {
  return fetch(`${API_BASE_URL}`).then((respuesta) => {
    if (!respuesta.ok) {
      throw new Error("Error al obtener los productos");
    }
    return respuesta.json();
  });
};

const crearProducto = (nombre, precio, descripcion) => {
  return fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, precio, descripcion }),
  }).then((respuesta) => {
    if (!respuesta.ok) {
      throw new Error("Error al crear el producto");
    }
    return respuesta.json();
  });
};

const eliminarProducto = (id) => {
  return fetch(`${API_BASE_URL}?id=${id}`, {
    method: "DELETE",
  });
};

const actualizarProducto = (nombre, precio, descripcion, id) => {
  return fetch(`${API_BASE_URL}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, precio, descripcion, id }),
  })
    .then((respuesta) => {
      console.log(respuesta);
    })
    .catch((error) => console.log(error));
};

const producto = (id) => {
  return fetch(`${API_BASE_URL}?id=${id}`).then((respuesta) =>
    respuesta.json(),
  );
};

//-=-=-=-CON SUPABASE-=-=-=-=-
/*const URL_SUPABASE = "https://uuowpnopgueaqtkmvvnx.supabase.co";
const SUPABASE_KEY = "sb_publishable_ltf_LjQgaLRI28z2AbtMbw_QY7U7Xqo";
const tabla = "productos";
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
    const mensaje = data?.message ?? data?.error ?? text ?? "Error";
    throw new Error(mensaje);
  }
  return data;
};

//get
const listarProductos = () =>
  request(`${API_URL}?select=id,nombre,precio,descripcion`);

//get por id
const producto = (id) =>
  request(`${API_URL}?id=eq.${id}&select=id,nombre,precio,descripcion`).then(
    (respuesta) => respuesta?.[0],
  );

//post
const crearProducto = (nombre, precio, descripcion) =>
  request(API_URL, {
    method: "POST",
    body: JSON.stringify({ nombre, precio, descripcion }),
  }).then((data) => data?.[0]);

//patch
const actualizarProducto = (nombre, precio, descripcion, id) =>
  request(`${API_URL}?id=eq.${id}`, {
    method: "PATCH",
    body: JSON.stringify({ nombre, precio, descripcion }),
  }).then(
    (data) => data?.[0] ?? Promise.reject(new Error("No se pudo actualizar")),
  );

//delete
const eliminarProducto = (id) =>
  request(`${API_URL}?id=eq.${id}`, {
    method: "DELETE",
  }).then(
    (data) => data?.[0] ?? Promise.reject(new Error("No se pudo eliminar")),
  );*/

/*export const productService = {
  listarProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  producto,
};*/

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-Express-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/
const BASE_URL = "http://localhost:3000";
const productService = {
  // get
  listarProductos: async () => {
    const res = await fetch(`${BASE_URL}/productos`);
    return res.json();
  },

  // get por id
  producto: async (id) => {
    const res = await fetch(`${BASE_URL}/productos/${id}`);
    return res.json();
  },

  // post
  crearProducto: async (nombre, precio, descripcion) => {
    const res = await fetch(`${BASE_URL}/productos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, precio, descripcion }),
    });
    return res.json();
  },

  // put
  actualizarProducto: async (nombre, precio, descripcion, id) => {
    const res = await fetch(`${BASE_URL}/productos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, precio, descripcion }),
    });
    return res.json();
  },

  // delete
  eliminarProducto: async (id) => {
    const res = await fetch(`${BASE_URL}/productos/${id}`, {
      method: "DELETE",
    });
    return res.json();
  },
};
export { productService };
