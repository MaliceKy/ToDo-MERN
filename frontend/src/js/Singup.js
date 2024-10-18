import React, { useState } from 'react';
import axios from 'axios';
import '../css/App.css';
import TodoPage from './TodoPage';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showTodoPage, setShowTodoPage] = useState(false);
  const [error, setError] = useState('');

  const handleNavigateToTodo = () => {
    setShowTodoPage(true);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    try {
      const response = await axios.post('/api/users', {
        username,
        password
      });

      if (response.data.success) {
        console.log('Signup successful:', response.data);
        // Do later: 
        // automatically log the user in here or redirect them to a login page

        alert('Signup successful! Please log in.');
        
        // Reset form fields
        setUsername('');
        setPassword('');
        setConfirmPassword('');
      } else {
        setError('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setError(error.response?.data?.message || 'An error occurred during signup. Please try again.');
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
            {error && <p className="error-message">{error}</p>}
            <button type="submit">Sign Up</button>
            <button className="debug-todo-btn" onClick={handleNavigateToTodo}>Go to To-Do Page (Debug)</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default Signup;