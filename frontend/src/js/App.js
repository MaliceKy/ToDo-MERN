import React, { useState } from 'react';
import '../css/App.css';
import TodoPage from './TodoPage';
import Signup from './Signup';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showTodoPage, setShowTodoPage] = useState(false);
  const [showSignupPage, setShowSignupPage] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleNavigateToSignup = () => {
    setShowSignupPage(true);
  };

  if (showTodoPage) {
    return <TodoPage userId={userId} />;
  }

  if (showSignupPage) {
    return <Signup />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        setUserId(data.data._id);
        setShowTodoPage(true);
      } else {
        console.error("Login failed: ", data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Login</h2>
        <div className = "login-user-pass-container">
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
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
