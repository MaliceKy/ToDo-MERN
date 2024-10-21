import React, { useState, useEffect } from 'react';
import '../css/TodoPage.css';
import App from './App.js';
import axios from 'axios';

const TodoPage = ({ userId, initialTasks }) => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState(initialTasks); // Initialize with initialTasks
  const [showSignIn, setShowSignIn] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newTask, setNewTask] = useState('');


  useEffect(() => {
    // Fetch todos only if initialTasks is empty
    if (tasks.length === 0) {
      const fetchTodos = async () => {
        try {
          //const response = await axios.get(`http://localhost:5001/api/users/${userId}/todos`);
          const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/users/${userId}/todos`);
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
        //const response = await axios.post('http://localhost:5001/api/users/add-todo', 
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/users/add-todo`, 
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
      // const response = await axios.post('http://localhost:5001/api/users/delete-todo',
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/users/delete-todo`,
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

  const handleEditTask = async (oldTodo) => {
    if (newTask.trim()) {
      try {
        // const response = await axios.post('http://localhost:5001/api/users/edit-todo',
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/users/edit-todo`,
          { userId: userId, oldTodo: oldTodo, newTodo: newTask },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
  
        if (response.data.success) {
          setTasks(response.data.todos);
          setEditIndex(null);
          setNewTask('');
        } else {
          alert('Failed to edit task.');
        }
      } catch (error) {
        console.error('Error editing task:', error);
      }
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
            {editIndex === index ? (
              <>
                <input 
                  type="text" 
                  value={newTask} 
                  onChange={(e) => setNewTask(e.target.value)} 
                  className="edit-input"
                />
                <div className="button-group">
                  <button onClick={() => handleEditTask(t)} className="save-button">Save</button>
                  <button onClick={() => setEditIndex(null)} className="cancel-button">Cancel</button>
                </div>
              </>
            ) : (
              <>
                <div className="task-content">
                  <span className="task-text">&bull; {t}</span>
                </div>
                <div className="button-group">
                  <button onClick={() => { setEditIndex(index); setNewTask(t); }} className="edit-button">Edit</button>
                  <button onClick={() => handleDeleteTask(t)} className="delete-button">Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoPage;