const form = (() => {
  const form = document.querySelector("[data-form]");
  const inputTask = document.querySelector("[data-input-task]");
  const inputDescription = document.querySelector("[data-input-descripcion]");
  const inputFecha = document.querySelector("[data-input-fecha]");
  const inputPrioridad = document.querySelector("[data-input-prioridad]");
  const inputNota = document.querySelector("[data-input-nota]");
  const inputGrupos = document.querySelector("[data-input-grupos]");
  const inputFormato = document.querySelector("[data-input-formato]");

  const datosForm = () => {
    return {
      task: inputTask.value.trim(),
      descrpiption: inputDescription.value.trim(),
      date: inputFecha.value.trim(),
      priority: inputPrioridad.value.trim(),
      note: inputNota.value.trim(),
      groups: inputGrupos.value.trim(),
      format: inputFormato.value.trim(),
    };
  };

  const reset = () => {
    inputTask.value = "";
    inputDescription.value = "";
    inputFecha.value = "";
    inputPrioridad.value = "";
    inputNota.value = "";
    inputGrupos.value = "";
    inputFormato.value = "";
  };

  const setDatos = (callback) => {
    form.addEventListener("submit", (evento) => {
      evento.preventDefault();
      callback(datosForm());
      reset();
    });
  };

  return { setDatos, datosForm };
})();

export default form;
