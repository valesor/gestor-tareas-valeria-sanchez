// script.js
document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const taskPriority = document.getElementById("taskPriority");
  const addTaskButton = document.getElementById("addTaskButton");

  // Creo div de error si no existe
  let errorDiv = document.getElementById("errorMessage");
  if (!errorDiv) {
    errorDiv = document.createElement("div");
    errorDiv.id = "errorMessage";
    taskInput.parentNode.insertBefore(errorDiv, taskPriority);
  }

  // Agrego tarea
  addTaskButton.addEventListener("click", () => {
    const text = taskInput.value.trim();
    const priority = taskPriority.value;

    if (!text) {
      errorDiv.textContent = "Por favor, escribe una tarea.";
      return;
    }
    errorDiv.textContent = "";

    // Creo elemento de tarea
    const taskItem = document.createElement("li");
    taskItem.classList.add("task", priority);

    const spanText = document.createElement("span");
    spanText.classList.add("task-text");
    spanText.textContent = text;

    const spanPrio = document.createElement("span");
    spanPrio.classList.add("priority-label");
    spanPrio.textContent =
      taskPriority.options[taskPriority.selectedIndex].textContent;

    const btnComplete = document.createElement("button");
    btnComplete.classList.add("complete");
    btnComplete.textContent = "Completar";
    btnComplete.addEventListener("click", () => {
      spanText.classList.toggle("completed");
      document.getElementById("completedList").appendChild(taskItem);
      btnComplete.remove();
    });

    const btnDelete = document.createElement("button");
    btnDelete.classList.add("delete");
    btnDelete.textContent = "Eliminar";
    btnDelete.addEventListener("click", () => taskItem.remove());

    // Unir tareas
    taskItem.appendChild(spanText);
    taskItem.appendChild(spanPrio);
    taskItem.appendChild(btnComplete);
    taskItem.appendChild(btnDelete);

    document.getElementById("taskList").appendChild(taskItem);
    taskInput.value = "";
  });

  // Registro service Worker
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
       .register("service-worker.js")
  .then((reg) => console.log("✅ SW registrado en scope:", reg.scope))
  .catch((err) => console.error("❌ Error al registrar SW:", err));
    });
  }
});
