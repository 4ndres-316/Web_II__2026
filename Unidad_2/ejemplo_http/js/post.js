/*const postData = () => {
  const newPost = {
    titulo: "nuevo post",
    descripcion: "es un nuevo post creado",
    fecha: new Date().toISOString(),
  };
  fetch(API_URL, {
    method: "Post",
    headers: { "Content-type": "application/json", Accept: "application/json" },
    body: JSON.stringify(newPost),
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

const postData = () => {
  const nombre = document.querySelector("[data-input-nombre]").value;
  const descripcion = document.querySelector("[data-input-descripcion]").value;
  const fecha = document.querySelector("[data-input-fecha]").value;

  const newPost = {
    id:"",
    titulo: nombre,
    descripcion: descripcion,
    fecha: fecha,
  };

  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(newPost),
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
