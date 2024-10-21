import React, { useState } from 'react';
import '../css/App.css';
import TodoPage from './TodoPage';
import Signup from './Signup';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showTodoPage, setShowTodoPage] = useState(false);
  const [showSignupPage, setShowSignupPage] = useState(false);
  const [userId, setUserId] = useState(null);
  const [tasks, setTasks] = useState([]); // Store fetched todos

  const handleNavigateToSignup = () => {
    setShowSignupPage(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      //const response = await fetch("http://localhost:5001/api/users/login", {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        setUserId(data.data._id);
        setTasks(data.data.todos); // Set tasks from the login response
        setShowTodoPage(true);
      } else {
        console.error("Login failed: ", data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  if (showTodoPage) {
    return <TodoPage userId={userId} initialTasks={tasks} />; // Pass tasks as initialTasks
  }

  if (showSignupPage) {
    return <Signup />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Login</h2>
        <div className="login-user-pass-container">
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="username" className="form-user-pass-label" >Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="form-user-pass-label" >Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
            <button className="signup-btn" onClick={handleNavigateToSignup}>Sign Up</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;