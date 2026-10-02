import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API = 'http://localhost:5000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

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

  const saveEdit = async (task) => {
    if (editText.trim() && editText !== task.title) {
      const res = await axios.put(`${API}/${task._id}`, { title: editText });
      setTasks(tasks.map(t => (t._id === task._id ? res.data : t)));
    }
    setEditingId(null);
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);
    setTasks(tasks.filter(t => t._id !== id));
  };

  const doneCount = tasks.filter(t => t.completed).length;
  const percent = tasks.length ? Math.round((doneCount / tasks.length) * 100) : 0;

  const visible = tasks.filter(t =>
    filter === 'all' ? true : filter === 'done' ? t.completed : !t.completed
  );

  return (
    <div className="card">
      <h1>My Tasks</h1>
      <p className="subtitle">{doneCount} of {tasks.length} completed</p>

      <div className="progress">
        <div className="progress-bar" style={{ width: `${percent}%` }} />
      </div>

      <form onSubmit={addTask}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="What needs to be done?"
        />
        <button type="submit">+</button>
      </form>

      <div className="filters">
        {['all', 'active', 'done'].map(f => (
          <button
            key={f}
            className={filter === f ? 'active' : ''}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <ul>
        {visible.map(task => (
          <li key={task._id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task)}
            />
            {editingId === task._id ? (
              <input
                className="edit-input"
                autoFocus
                value={editText}
                onChange={e => setEditText(e.target.value)}
                onBlur={() => saveEdit(task)}
                onKeyDown={e => e.key === 'Enter' && saveEdit(task)}
              />
            ) : (
              <span
                className={task.completed ? 'done' : ''}
                onDoubleClick={() => { setEditingId(task._id); setEditText(task.title); }}
              >
                {task.title}
              </span>
            )}
            <button className="delete" onClick={() => deleteTask(task._id)}>✕</button>
          </li>
        ))}
      </ul>

      {visible.length === 0 && <p className="empty">Nothing here yet ✨</p>}
      <p className="hint">Double-click a task to edit it</p>
    </div>
  );
}

export default App;