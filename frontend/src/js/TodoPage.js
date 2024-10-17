import React, { useState } from 'react';
import '../css/TodoPage.css';
import App from './App.js';

const TodoPage = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [showSignIn, setShowSignIn] = useState(false);

  const handleAddTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  const handleNavigateToSignIn = () => {
    setShowSignIn(true);
  };

  if (showSignIn) {
    return <App />;
  }

  return (
    <div className="todo-page">
      <h2>To-Do List</h2>
      <div className="todo-input">
        <input
          type="text"
          placeholder="Enter a new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
        <button onClick={handleNavigateToSignIn}>Go to Signin Page (Debug)</button>
      </div>
      <ul className="todo-list">
        {tasks.map((t, index) => (
          <li key={index}>&bull; {t}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoPage;
