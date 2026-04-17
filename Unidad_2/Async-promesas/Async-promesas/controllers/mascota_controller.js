import { petsService } from "../service/pets-service.js";
import { clientService } from "../service/client-service.js";

const crearFila = async (nombre, edad, raza, peso, idDueño, id) => {
  const fila = document.createElement("tr");

  let nombreDueno = "Desconocido";

  try {
    const cliente = await clientService.cliente(idDueño);

    if (cliente && cliente.nombre) {
      nombreDueno = cliente.nombre;
    }

  } catch (error) {
    console.log("Error cargando dueño", error);
  }

  fila.innerHTML = `
    <td>${nombre}</td>
    <td>${edad}</td>
    <td>${raza}</td>
    <td>${peso}</td>
    <td>${nombreDueno}</td>
    <td>
      <ul class="table__button-control">
        <li>
          <a href="../screens/editar_mascota.html?id=${id}" class="simple-button simple-button--edit">
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

  const btn = fila.querySelector("button");
  btn.addEventListener("click", () => {
    petsService
      .eliminarPet(id)
      .then(() => {
        alert("Mascota eliminada");
        window.location.reload();
      })
      .catch(() => alert("No se pudo eliminar"));
  });

  return fila;
};

const tabla = document.querySelector("[data-table]");

petsService
  .listarPets()
  .then(async (data) => {
    for (const pet of data) {
      const fila = await crearFila(
        pet.nombre,
        pet.edad,
        pet.raza,
        pet.peso,
        pet.idDueño,
        pet.id
      );
      tabla.appendChild(fila);
    }
  })
  .catch(() => alert("ERROR"));