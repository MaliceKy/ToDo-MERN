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
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
  
      // Correct Axios POST request
      const response = await axios.post(`${apiUrl}/api/users/login`, {
        username,
        password
      });
  
      if (response.data.success) {
        setUserId(response.data.data._id);
        setTasks(response.data.data.todos); // Set tasks from the login response
        setShowTodoPage(true);
      } else {
        console.error("Login failed: ", response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      alert("Login failed. Please check your credentials and try again.");
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