import form from "./componentes/formulario.js";
import tabla from "./componentes/tabla.js";
import cards from "./componentes/cards.js";

(() => {
  form.setDatos((task) => {
    tabla.addTask(task);
    cards.update();
  });
})();
