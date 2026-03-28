const form = (() => {
  const form = document.querySelector("[data-formulario]");
  const inputnombre = document.querySelector("[data-input-nombre]");
  const inputcurso = document.querySelector("[data-input-curso]");
  const inputedad = document.querySelector("[data-input-edad]");
  const inputhermanos = document.querySelector("[data-input-hermanos]");
  const inputciudad = document.querySelector("[data-input-ciudad]");

  const datosForm = () => {
    return {
      nombre: inputnombre.value.trim(),
      curso: inputcurso.value.trim(),
      edad: inputedad.value.trim(),
      hermanos: inputhermanos.value.trim(),
      ciudad: inputciudad.value.trim(),
    };
  };

  const reset = () => {
    inputnombre.value = "";
    inputcurso.value = "";
    inputedad.value = "";
    inputhermanos.value = "";
    inputciudad.value = "";
  };

  const setDatos = (callback) => {
    form.addEventListener("submit", (evento) => {
      evento.preventDefault();
      callback(datosForm());
      reset();
    });
  };

  return { setDatos, datosForm, reset };
})();

const tabla = (() => {
  const cuerpoTabla = document
    .getElementById("tabla")
    .getElementsByTagName("tbody")[0];

  const addTask = (task) => {
    const nuevaFila = cuerpoTabla.insertRow();

    nuevaFila.insertCell(0).textContent = task.nombre;
    nuevaFila.insertCell(1).textContent = task.curso;
    nuevaFila.insertCell(2).textContent = task.edad;
    nuevaFila.insertCell(3).textContent = task.hermanos;
    nuevaFila.insertCell(4).textContent = task.ciudad;

    const actionCell = nuevaFila.insertCell(5);

    //boton eliminar
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.className = "delete";
    deleteButton.addEventListener("click", () => {
      cuerpoTabla.deleteRow(nuevaFila.rowIndex - 1);
    });
    actionCell.appendChild(deleteButton);

    //boton editar
    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.className = "edit";
    editButton.addEventListener("click", () => {
      const datos = form.datosForm();

      if (!datos) return;

      if (datos.nombre === "" || datos.curso === "" || datos.ciudad === "") {
        alert("Todos los campos deben estar llenos");
        return;
      }

      nuevaFila.cells[0].textContent = datos.nombre;
      nuevaFila.cells[1].textContent = datos.curso;
      nuevaFila.cells[2].textContent = datos.edad;
      nuevaFila.cells[3].textContent = datos.hermanos;
      nuevaFila.cells[4].textContent = datos.ciudad;

      form.reset();
    });
    actionCell.appendChild(editButton);
  };

  return { addTask };
})();

(() => {
  form.setDatos((task) => {
    tabla.addTask(task);
  });
})();
