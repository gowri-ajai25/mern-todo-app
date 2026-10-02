import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API = 'http://localhost:5000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    axios.get(API).then(res => setTasks(res.data));
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const res = await axios.post(API, { title });
    setTasks([res.data, ...tasks]);
    setTitle('');
  };

  const toggleTask = async (task) => {
    const res = await axios.put(`${API}/${task._id}`, { completed: !task.completed });
    setTasks(tasks.map(t => (t._id === task._id ? res.data : t)));
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);
    setTasks(tasks.filter(t => t._id !== id));
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <form onSubmit={addTask}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Add a task..."
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task)}
            />
            <span className={task.completed ? 'done' : ''}>{task.title}</span>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;