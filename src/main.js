import "./style.css";
const $app = document.getElementById("app");
const $createTaskForm = document.getElementById("create-task");
const $tasksList = document.getElementById("tasksList");

document.addEventListener("DOMContentLoaded", async () => {
  const renderAllTask = async () => {
    $tasksList.innerHTML = "";

    return fetch("http://localhost:4000/tasks")
      .then((e) => e.json())
      .then((listTasks) => {
        listTasks.forEach((task) => {
          $tasksList.innerHTML += `
        <p>
          <span>
           <b> ${task.title} <b/>
          </span>
          <span>
            <b>${task.description}</b>
          </span>
          <span>
            <b>${task.isComplete}</b>
          </span>
          <div id="botonEliminar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </div>
        </p>
      `;
        });
      });
  };

  $createTaskForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const isComplete = document.getElementById("isComplete").value;
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

      if (res.status == 400) {
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

document.addEventListener("DOMContentLoaded");
