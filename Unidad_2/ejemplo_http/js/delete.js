/*const deleteData = () => {
  fetch(`${API_URL}/1`, {
    method: "Delete",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error estado: ${response.status}`);
      }
      showResult({
        message: "Post con el id 1 eliminado",
        status: response.status,
      });
    })
    .catch((error) => showResult(error.message, true));
};*/

const deleteData = () => {
  const id = document.querySelector("[data-input-id]").value;

  if (!id) {
    alert("Ingresa un ID válido");
    return;
  }

  fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error estado: ${response.status}`);
      }

      showResult({
        message: `Post con el id ${id} eliminado`,
        status: response.status,
      });
    })
    .catch((error) => showResult(error.message, true));
};
