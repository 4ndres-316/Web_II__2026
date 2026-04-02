import cards from "./cards.js";
import form from "./formulario.js";

const tabla = (() => {
  const cuerpoTabla = document
    .getElementById("taskTable")
    .getElementsByTagName("tbody")[0];

  const addTask = (Task) => {
    const nuevaFila = cuerpoTabla.insertRow();

    nuevaFila.insertCell(0).textContent = Task.task;
    nuevaFila.insertCell(1).textContent = Task.descrpiption;
    nuevaFila.insertCell(2).textContent = Task.date;
    nuevaFila.insertCell(3).textContent = Task.priority;
    nuevaFila.insertCell(4).textContent = Task.note;
    nuevaFila.insertCell(5).textContent = Task.groups;
    nuevaFila.insertCell(6).textContent = Task.format;

    const actionCell = nuevaFila.insertCell(7);
    const acciones = document.createElement("div");
    acciones.className = "actions";

    const completeButton = document.createElement("button");
    completeButton.textContent = "Hecho";
    completeButton.className = "view";
    completeButton.addEventListener("click", () => {
      nuevaFila.classList.toggle("completed");
      cards.update();
    });

    acciones.appendChild(completeButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.className = "delete";
    deleteButton.addEventListener("click", () => {
      cuerpoTabla.deleteRow(nuevaFila.rowIndex - 1);
      cards.update();
    });

    acciones.appendChild(deleteButton);

    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.className = "edit";

    editButton.addEventListener("click", () => {
      const datos = form.datosForm();

      if (
        datos.task === "" ||
        datos.descrpiption === "" ||
        datos.date === "" ||
        datos.priority === "" ||
        datos.note === "" ||
        datos.groups === "" ||
        datos.format === ""
      ) {
        alert("Todos los campos deben estar llenos");
        return;
      }

      nuevaFila.cells[0].textContent = datos.task;
      nuevaFila.cells[1].textContent = datos.descrpiption;
      nuevaFila.cells[2].textContent = datos.date;
      nuevaFila.cells[3].textContent = datos.priority;
      nuevaFila.cells[4].textContent = datos.note;
      nuevaFila.cells[5].textContent = datos.groups;
      nuevaFila.cells[6].textContent = datos.format;

      cards.update();
    });

    acciones.appendChild(editButton);

    actionCell.appendChild(acciones);
  };

  const getTask = () => {
    return Array.from(cuerpoTabla.rows).map((row) => ({
      task: row.cells[0].textContent,
      descrpiption: row.cells[1].textContent,
      date: row.cells[2].textContent,
      priority: row.cells[3].textContent,
      note: row.cells[4].textContent,
      groups: row.cells[5].textContent,
      format: row.cells[6].textContent,
      completed: row.classList.contains("completed"),
    }));
  };

  return { addTask, getTask };
})();

export default tabla;
