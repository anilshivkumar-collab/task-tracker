const API = "http://localhost:3000/tasks";

async function loadTasks() {
  const res = await fetch(API);
  const tasks = await res.json();
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(t => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span style="text-decoration:${t.completed ? "line-through" : "none"}">
        ${t.title}
      </span>
      <button onclick="toggleTask(${t.id})">✔</button>
      <button onclick="deleteTask(${t.id})">❌</button>
    `;
    list.appendChild(li);
  });
}

async function addTask() {
  const input = document.getElementById("taskInput");
  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: input.value })
  });
  input.value = "";
  loadTasks();
}

async function toggleTask(id) {
  await fetch(`${API}/${id}`, { method: "PUT" });
  loadTasks();
}

async function deleteTask(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  loadTasks();
}

loadTasks();