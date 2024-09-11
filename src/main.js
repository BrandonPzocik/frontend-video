import "./src/style.css";
const $app = document.getElementById("app");
const $createTaskForm = document.getElementById("create-task");
const $tasksList = document.getElementById("tasksList");

const renderTasks = (tasks) => {
  const $container = document.createElement("div");
  $container.classList.add("tasks-item");

  const $info = document.createElement("p");
  const $title = document.createElement("span");
  const $description = document.createElement("span");
  const $status = document.createElement("span");

  $title.innerText = tasks.title;
  $description.innerText = tasks.description;
  $status.textContent = tasks.isComplete ? "Completado" : "Pendiente";

  $info.appendChild($title);
  $info.appendChild($description);
  $info.appendChild($status);
  $container.appendChild($info);

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
