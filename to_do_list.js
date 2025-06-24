const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const categoryInput = document.getElementById("categoryInput");
const taskList = document.getElementById("taskList");
const addTaskBtn = document.getElementById("addTaskBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const topRow = document.createElement("div");
    topRow.classList.add("task-top");

    const textSpan = document.createElement("span");
    textSpan.textContent = task.text;
    textSpan.classList.add("task-text");
    if (task.completed) textSpan.classList.add("completed");

    topRow.appendChild(textSpan);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      tasks.splice(index, 1);
      updateTasks();
    });

    topRow.appendChild(deleteBtn);
    li.appendChild(topRow);

    const info = document.createElement("small");
    info.textContent = `${task.date} • ${task.category}`;
    li.appendChild(info);

    li.addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      updateTasks();
    });

    taskList.appendChild(li);
  });
}

function updateTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function addTask() {
  if (taskInput.value.trim() !== "") {
    const task = {
      text: taskInput.value.trim(),
      date: dateInput.value || "No date",
      category: categoryInput.value,
      completed: false
    };
    tasks.push(task);
    taskInput.value = "";
    dateInput.value = "";
    categoryInput.value = "daily";
    updateTasks();
  }
}

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

addTaskBtn.addEventListener("click", addTask);

renderTasks();
