const tabla = document.querySelector("[data-table]");

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
  fetch(`http://localhost:3000/pets/${id}`).then((r) => r.json());

export const petsService = {
  listarPets,
  crearPet,
  actualizarPet,
  eliminarPet,
  pet,
};
