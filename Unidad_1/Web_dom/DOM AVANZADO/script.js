import form from "./componentes/formulario.js";
import tabla from "./componentes/tabla.js";
import cards from "./componentes/cards.js";

const API_URL = "http://localhost:3001/posts";

const getData = () => {
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((task) => tabla.addTask(task));
      cards.update();
    })
    .catch((err) => console.error(err));
};

(() => {
  form.setDatos((task) => {
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((data) => {
        tabla.addTask(data);
        cards.update();
      })
      .catch((err) => console.error(err));
  });
})();

getData();