/*const tabla = document.querySelector("[data-table]");

const listarPets = () =>
  fetch("http://localhost:3000/pets").then((r) => r.json());

const crearPet = (nombre, edad, raza, peso, idDueño) => {
  return fetch("http://localhost:3000/pets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: uuid.v4(),
      nombre,
      edad,
      raza,
      peso,
      idDueño,
    }),
  });
};

const actualizarPet = (nombre, edad, raza, peso, idDueño, id) => {
  return fetch(`http://localhost:3000/pets/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, edad, raza, peso, idDueño }),
  }).then((r) => r.json());
};

const eliminarPet = (id) => {
  return fetch(`http://localhost:3000/pets/${id}`, {
    method: "DELETE",
  });
};

const pet = (id) =>
  fetch(`http://localhost:3000/pets/${id}`).then((r) => r.json());*/

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-MYSQL=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/
const API_BASE_URL = "http://localhost/API/pets.php";

const listarPets = () => {
  return fetch(`${API_BASE_URL}`).then((respuesta) => {
    if (!respuesta.ok) {
      throw new Error("Error al obtener las mascotas");
    }
    return respuesta.json();
  });
};

const crearPet = (nombre, edad, raza, peso, idDueño) => {
  return fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, edad, raza, peso, idDueño }),
  }).then((respuesta) => {
    if (!respuesta.ok) {
      throw new Error("Error al crear la mascota");
    }
    return respuesta.json();
  });
};

const eliminarPet = (id) => {
  return fetch(`${API_BASE_URL}?id=${id}`, {
    method: "DELETE",
  });
};

const actualizarPet = (nombre, edad, raza, peso, idDueño, id) => {
  return fetch(`${API_BASE_URL}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, edad, raza, peso, idDueño, id }),
  })
    .then((respuesta) => {
      console.log(respuesta);
    })
    .catch((error) => console.log(error));
};

const pet = (id) => {
  return fetch(`${API_BASE_URL}?id=${id}`).then((respuesta) =>
    respuesta.json(),
  );
};

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-SUPABASE-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/
/*const URL_SUPABASE = "https://uuowpnopgueaqtkmvvnx.supabase.co";
const SUPABASE_KEY = "sb_publishable_ltf_LjQgaLRI28z2AbtMbw_QY7U7Xqo";
const tabla = "pets";
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

// get — trae el nombre del dueño desde clientes
const listarPets = () =>
  request(`${API_URL}?select=id,nombre,edad,raza,peso,cliente_id,clientes(id,nombre)`)
  .then((data) =>
    data.map((pet) => ({
      ...pet,
      idDueño: pet.clientes?.nombre ?? "Desconocido",
    }))
  );

// get por id
const pet = (id) =>
  request(
    `${API_URL}?id=eq.${id}&select=id,nombre,edad,raza,peso,cliente_id,clientes(id,nombre)`,
  ).then((respuesta) => {
    const pet = respuesta?.[0];
    if (!pet) return null;
    return { ...pet, idDueño: pet.cliente_id };
  });
  

// post
const crearPet = (nombre, edad, raza, peso, idDueño) =>
  request(API_URL, {
    method: "POST",
    body: JSON.stringify({ nombre, edad, raza, peso, cliente_id: idDueño }),
  }).then((data) => data?.[0]);

// patch
const actualizarPet = (nombre, edad, raza, peso, idDueño, id) =>
  request(`${API_URL}?id=eq.${id}`, {
    method: "PATCH",
    body: JSON.stringify({ nombre, edad, raza, peso, cliente_id: idDueño }),
  }).then(
    (data) => data?.[0] ?? Promise.reject(new Error("No se pudo actualizar")),
  );

// delete
const eliminarPet = (id) =>
  request(`${API_URL}?id=eq.${id}`, {
    method: "DELETE",
  }).then(
    (data) => data?.[0] ?? Promise.reject(new Error("No se pudo eliminar")),
  );*/

/*export const petsService = {
  listarPets,
  crearPet,
  actualizarPet,
  eliminarPet,
  pet,
};*/

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-Express-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/
const BASE_URL = "http://localhost:3000";
const petsService = {
  // get
  listarPets: async () => {
    const res = await fetch(`${BASE_URL}/pets`);
    return res.json();
  },

  // get por id
  pet: async (id) => {
    const res = await fetch(`${BASE_URL}/pets/${id}`);
    return res.json();
  },

  // post
  crearPet: async (nombre, edad, raza, peso, idDueño) => {
    const res = await fetch(`${BASE_URL}/pets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, edad, raza, peso, idDueño }),
    });
    return res.json();
  },

  // put
  actualizarPet: async (nombre, edad, raza, peso, idDueño, id) => {
    const res = await fetch(`${BASE_URL}/pets/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, edad, raza, peso, idDueño }),
    });
    return res.json();
  },

  // delete
  eliminarPet: async (id) => {
    const res = await fetch(`${BASE_URL}/pets/${id}`, {
      method: "DELETE",
    });
    return res.json();
  },
};
export { petsService };
