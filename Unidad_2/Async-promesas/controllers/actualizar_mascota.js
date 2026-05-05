import { petsService } from "../service/pets-service.js";
import { clientService } from "../service/client-service.js";

const formulario = document.querySelector("[data-form]");
const obInfo = async () => {
  const url = new URL(window.location);
  const id = url.searchParams.get("id");

  if (id == null) {
    window.location.href = "../screens/error_mascota.html";
  }

  const nombre = document.querySelector("[data-nombre]");
  const edad = document.querySelector("[data-edad]");
  const raza = document.querySelector("[data-raza]");
  const peso = document.querySelector("[data-peso]");
  const dueno = document.querySelector("[data-dueno]");

  try {
    const pet = await petsService.pet(id);

    const clientes = await clientService.listar_clientes();
    clientes.forEach((cliente) => {
      const option = document.createElement("option");
      option.value = cliente.id;
      option.textContent = cliente.nombre;
      dueno.appendChild(option);
    });

    if (pet.nombre) {
      nombre.value = pet.nombre;
      edad.value = pet.edad;
      raza.value = pet.raza;
      peso.value = pet.peso;
      dueno.value = pet.idDueño;
    } else {
      throw new Error();
    }
  } catch (error) {
    window.location.href = "../screens/error_mascota.html";
  }
};

obInfo();

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const url = new URL(window.location);
  const id = url.searchParams.get("id");

  const nombre = document.querySelector("[data-nombre]").value;
  const edad = document.querySelector("[data-edad]").value;
  const raza = document.querySelector("[data-raza]").value;
  const peso = document.querySelector("[data-peso]").value;
  const idDueño = document.querySelector("[data-dueno]").value;

  petsService
    .actualizarPet(nombre, edad, raza, peso, idDueño, id)
    .then(() => {
      window.location.href = "../screens/edicion_mascota.html";
    });
});