import React, { useState } from 'react';
import '../css/App.css';
import TodoPage from './TodoPage';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showTodoPage, setShowTodoPage] = useState(false);

  const handleNavigateToTodo = () => {
    setShowTodoPage(true);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      console.log(`Username: ${username}, Password: ${password}`);
      // Add signup logic here
    } else {
      alert("Passwords do not match. Please try again.");
    }
  };

  if (showTodoPage) {
    return <TodoPage />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Sign Up</h2>
        <div className="login-user-pass-container">
          <form onSubmit={handleSignup}>
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
            <div>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Sign Up</button>
            <button className="debug-todo-btn" onClick={handleNavigateToTodo}>Go to To-Do Page (Debug)</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default Signup;
