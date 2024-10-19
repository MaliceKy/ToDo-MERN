import React, { useState, useEffect } from 'react';
import '../css/TodoPage.css';
import App from './App.js';
import axios from 'axios';

const TodoPage = ({ userId, initialTasks }) => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState(initialTasks); // Initialize with initialTasks
  const [showSignIn, setShowSignIn] = useState(false);

  useEffect(() => {
    // Fetch todos only if initialTasks is empty
    if (tasks.length === 0) {
      const fetchTodos = async () => {
        try {
          const response = await axios.get(`http://localhost:5001/api/users/${userId}/todos`);
          if (response.data.success) {
            setTasks(response.data.todos);
          }
        } catch (error) {
          console.error("Error fetching todos:", error);
        }
      };

      fetchTodos();
    }
  }, [userId, tasks]);

  const handleAddTask = async () => {
    if (task.trim()) {
      try {
        const response = await axios.post('http://localhost:5001/api/users/add-todo', 
          {
            userId: userId, 
            todo: task 
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
  
        if (response.data.success) {
          setTasks(response.data.todos);
          setTask('');
        } else {
          alert('Failed to add task.');
        }
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };  

  const handleDeleteTask = async (todo) => {
    try {
      const response = await axios.post(
        'http://localhost:5001/api/users/delete-todo',
        { userId: userId, todo: todo },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
  
      if (response.data.success) {
        setTasks(response.data.todos);
      } else {
        alert('Failed to delete task.');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
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
      </div>
      <ul className="todo-list">
        {tasks.map((t, index) => (
          <li key={index}>
            &bull; {t}
            <button onClick={() => handleDeleteTask(t)} className="delete-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoPage;