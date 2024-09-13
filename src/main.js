import "./style.css";
const $app = document.getElementById("app");
const $createTaskForm = document.getElementById("create-task");
const $tasksList = document.getElementById("tasksList");

const renderTasks = (tasks) => {
  const $container = document.createElement("div");
  // Clases de Tailwind para el contenedor de cada tarea
  $container.classList.add(
    "p-4",
    "mb-4",
    "bg-gray-800",
    "rounded-lg",
    "shadow"
  );

  const $info = document.createElement("div");
  // Clases para el contenedor de la información de la tarea
  $info.classList.add("flex", "flex-col", "space-y-2");

  const $title = document.createElement("span");
  // Estilos para el título
  $title.classList.add("text-lg", "font-semibold", "text-white");
  $title.innerText = tasks.title;

  const $description = document.createElement("span");
  // Estilos para la descripción
  $description.classList.add("text-sm", "text-gray-300");
  $description.innerText = tasks.description;

  const $status = document.createElement("span");
  // Estilos para el estado de la tarea (completado o pendiente)
  const statusClass = tasks.isComplete ? "text-green-500" : "text-yellow-500";
  $status.classList.add("text-sm", "font-medium", statusClass);
  $status.textContent = tasks.isComplete ? "Completado" : "Pendiente";

  // Añadir los elementos al contenedor
  $info.appendChild($title);
  $info.appendChild($description);
  $info.appendChild($status);
  $container.appendChild($info);

  const $deleteButtom = document.createElement("div");
  $deleteButtom.classList.add("delete-buttom");
  $deleteButtom.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>
`;

  return $container;
};

document.addEventListener("DOMContentLoaded", async () => {
  const renderAllTask = async () => {
    $tasksList.innerHTML = "";

    return fetch("http://localhost:4000/tasks")
      .then((e) => e.json())
      .then((listTasks) => {
        listTasks.forEach((task) => {
          const statusTasks = task.isComplete ? "Completado" : "Pendiente";
          $tasksList.appendChild(renderTasks(task));
        });
      });
  };

  $createTaskForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const isComplete = document.getElementById("isComplete").checked;
    fetch("http://localhost:4000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        isComplete,
      }),
    }).then(async (res) => {
      console.log(res);

      if (res.status == 201) {
        alert("Tarea creada con exito");
        await renderAllTask();
      } else {
        alert("error al crear la tarea");
      }
    });

    e.target.reset();
  });

  await renderAllTask();
});
