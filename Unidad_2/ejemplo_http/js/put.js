/*const putData = () => {
  const updateData = {
    titulo: "ACTUALIZADO",
    descripcion: "ACTUALIZADO",
    fecha: new Date().toISOString(),
  };
  fetch(`${API_URL}/`, {
    method: "PUT",
    headers: { "Content-type": "application/json", Accept: "application/json" },
    body: JSON.stringify(updateData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error estado: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => showResult(data))
    .catch((error) => showResult(error.message, true));
};*/

const putData = () => {
  const id = document.querySelector("[data-input-id]").value;
  const nombre = document.querySelector("[data-input-nombre]").value;
  const descripcion = document.querySelector("[data-input-descripcion]").value;
  const fecha = document.querySelector("[data-input-fecha]").value;

  const updateData = {
    id: id,
    titulo: nombre,
    descripcion: descripcion,
    fecha: fecha,
  };
  fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-type": "application/json", Accept: "application/json" },
    body: JSON.stringify(updateData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error estado: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => showResult(data))
    .catch((error) => showResult(error.message, true));
};
