const checkComplete = () => {
  const i = document.createElement("i");
  i.classList.add("far", "fa-check-square", "icon"); //estilos de icon
  i.addEventListener("click", color);
  return i;
};

const color = (evento) => {
  const element = evento.target;
  element.classList.toggle("fas");
  element.classList.toggle("far");
  element.classList.toggle("completeIcon");
};

export default checkComplete;
