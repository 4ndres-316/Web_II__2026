import tabla from "./tabla.js";

const cards = (() => {
  const taskCards = document.getElementById("taskCards");

  const update = () => {
    const tasks = tabla.getTask();
    taskCards.innerHTML = "";

    tasks.forEach((task) => {
      const card = document.createElement("div");
      card.className = "taskCard";

      card.innerHTML = `
        <p><strong>Nombre:</strong>${task.task}</p>
        <p><strong>Descripción:</strong>${task.descrpiption}</p>
        <p><strong>Fecha:</strong>${task.date}</p>
        <p><strong>Prioridad:</strong>${task.priority}</p>
        <p><strong>Nota:</strong>${task.note}</p>
        <p><strong>Grupos:</strong>${task.groups}</p>
        <p><strong>Formato:</strong>${task.format}</p>
        <p><strong>Estado:</strong>${task.completed ? "Completado" : "Pendiente"}</p>
      `;

      taskCards.appendChild(card);
    });
  };

  return { update };
})();

export default cards;
