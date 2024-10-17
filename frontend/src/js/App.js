import React, { useState } from 'react';
import '../css/App.css';
import TodoPage from './TodoPage';
import Signup from './Singup';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showTodoPage, setShowTodoPage] = useState(false);
  const [showSignupPage, setShowSignupPage] = useState(false);

  const handleNavigateToTodo = () => {
    setShowTodoPage(true);
  };

  const handleNavigateToSignup = () => {
    setShowSignupPage(true);
  };

  if (showTodoPage) {
    return <TodoPage />;
  }

  if (showSignupPage) {
    return <Signup />;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(`Username: ${username}, Password: ${password}`);
    // Add authentication logic here
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
            <button className="debug-todo-btn"onClick={handleNavigateToTodo}>Go to To-Do Page (Debug)</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
