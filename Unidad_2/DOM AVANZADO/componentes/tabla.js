import cards from "./cards.js";
import form from "./formulario.js";

const API_URL = "http://localhost:3001/posts";

const tabla = (() => {
  const cuerpoTabla = document
    .getElementById("taskTable")
    .getElementsByTagName("tbody")[0];

  const addTask = (Task) => {
    const nuevaFila = cuerpoTabla.insertRow();

    nuevaFila.dataset.id = Task.id;

    if (Task.completed) {
      nuevaFila.classList.add("completed");
    }

    nuevaFila.insertCell(0).textContent = Task.task;
    nuevaFila.insertCell(1).textContent = Task.description;
    nuevaFila.insertCell(2).textContent = Task.date;
    nuevaFila.insertCell(3).textContent = Task.priority;
    nuevaFila.insertCell(4).textContent = Task.note;
    nuevaFila.insertCell(5).textContent = Task.groups;
    nuevaFila.insertCell(6).textContent = Task.format;

    const actionCell = nuevaFila.insertCell(7);
    const acciones = document.createElement("div");
    acciones.className = "actions";

    const completeButton = document.createElement("button");
    completeButton.textContent = Task.completed ? "Pendiente" : "Hecho";
    completeButton.className = "view";

    completeButton.addEventListener("click", () => {
      const id = nuevaFila.dataset.id;
      const nuevoEstado = !nuevaFila.classList.contains("completed");

      fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ completed: nuevoEstado }),
      })
        .then((res) => res.json())
        .then(() => {
          nuevaFila.classList.toggle("completed");
          completeButton.textContent = nuevoEstado ? "Pendiente" : "Hecho";
          cards.update();
        })
        .catch((err) => console.error(err));
    });

    acciones.appendChild(completeButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.className = "delete";

    deleteButton.addEventListener("click", () => {
      const id = nuevaFila.dataset.id;

      fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          nuevaFila.remove();
          cards.update();
        })
        .catch((err) => console.error(err));
    });

    acciones.appendChild(deleteButton);

    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.className = "edit";

    editButton.addEventListener("click", () => {
      const id = nuevaFila.dataset.id;
      const datos = form.datosForm();

      if (
        datos.task === "" ||
        datos.description === "" ||
        datos.date === "" ||
        datos.priority === "" ||
        datos.note === "" ||
        datos.groups === "" ||
        datos.format === ""
      ) {
        alert("Todos los campos deben estar llenos");
        return;
      }

      fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          ...datos,
          completed: nuevaFila.classList.contains("completed"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          nuevaFila.cells[0].textContent = data.task;
          nuevaFila.cells[1].textContent = data.description;
          nuevaFila.cells[2].textContent = data.date;
          nuevaFila.cells[3].textContent = data.priority;
          nuevaFila.cells[4].textContent = data.note;
          nuevaFila.cells[5].textContent = data.groups;
          nuevaFila.cells[6].textContent = data.format;

          cards.update();
        })
        .catch((err) => console.error(err));
    });

    acciones.appendChild(editButton);

    actionCell.appendChild(acciones);
  };

  const getTask = () => {
    return Array.from(cuerpoTabla.rows).map((row) => ({
      task: row.cells[0].textContent,
      description: row.cells[1].textContent,
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
