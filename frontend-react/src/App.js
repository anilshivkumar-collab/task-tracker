import { useEffect, useState } from "react";

const API = "http://localhost:3000/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const loadTasks = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async () => {
    if (!text.trim()) return;

    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: text })
    });

    setText("");
    loadTasks();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Task Tracker</h2>

      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="New task"
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
