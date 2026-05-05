import { petsService } from "../service/pets-service.js";
import { clientService } from "../service/client-service.js";

const formulario = document.querySelector("[data-form]");
const selectDueno = document.querySelector("[data-dueno]");

clientService.listar_clientes().then((clientes) => {
  clientes.forEach((cliente) => {
    const option = document.createElement("option");
    option.value = cliente.id;
    option.textContent = cliente.nombre;
    selectDueno.appendChild(option);
  });
});

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nombre = document.querySelector("[data-nombre]").value;
  const edad = document.querySelector("[data-edad]").value;
  const raza = document.querySelector("[data-raza]").value;
  const peso = document.querySelector("[data-peso]").value;
  const idDueño = selectDueno.value;

  petsService
    .crearPet(nombre, edad, raza, peso, idDueño)
    .then((respuesta) => {
      console.log("Mascota registrada", respuesta);
      window.location.href = "../screens/registro_mascota.html";
    })
    .catch((error) => {
      console.log("Error mascota", error);
    });
});