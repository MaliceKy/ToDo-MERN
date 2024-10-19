import React, { useState, useEffect } from 'react';
import '../css/TodoPage.css';
import App from './App.js';
import axios from 'axios';

const TodoPage = ({ userId }) => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [showSignIn, setShowSignIn] = useState(false);

  // Fetch existing to-dos when the component mounts
  useEffect(() => {
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
  }, [userId]);

  // Handle adding a new task
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
          setTasks(response.data.todos); // Update the tasks with the new list
          setTask('');
        } else {
          alert('Failed to add task.');
        }
      } catch (error) {
        console.error('Error adding task:', error);
      }
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
        <button onClick={handleNavigateToSignIn}>Go to Sign in Page (Debug)</button>
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