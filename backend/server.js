const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const FILE = "./tasks.json";

// Helper functions
const readTasks = () => JSON.parse(fs.readFileSync(FILE));
const writeTasks = (data) =>
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

// GET all tasks
app.get("/tasks", (req, res) => {
  res.json(readTasks());
});

// ADD task
app.post("/tasks", (req, res) => {
  const tasks = readTasks();
  const newTask = {
    id: Date.now(),
    title: req.body.title,
    completed: false,
  };
  tasks.push(newTask);
  writeTasks(tasks);
  res.json(newTask);
});

// TOGGLE task
app.put("/tasks/:id", (req, res) => {
  const tasks = readTasks();
  const updated = tasks.map((t) =>
    t.id == req.params.id ? { ...t, completed: !t.completed } : t
  );
  writeTasks(updated);
  res.json({ success: true });
});

// DELETE task
app.delete("/tasks/:id", (req, res) => {
  const tasks = readTasks().filter((t) => t.id != req.params.id);
  writeTasks(tasks);
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));