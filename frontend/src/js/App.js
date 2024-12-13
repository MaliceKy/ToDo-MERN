import React, { useState, useEffect } from 'react';
import '../css/App.css';
import axios from 'axios';
import { setEncodedPasswordCookie } from './utils/setCookie';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState(null);

  // Base64 encoded username for CTF
  const encodedUsername = "VXNlcjpEaWRkeQ==";

  useEffect(() => {
    // Set the encoded password in cookies using the utility function
    setEncodedPasswordCookie();

    // Log a hint to the console for participants
    console.log("Hint: Check your browser's cookies for more clues.");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = process.env.REACT_APP_API_BASE_URL;

      const response = await axios.post(`${apiUrl}/api/users/login`, {
        username,
        password
      });

      console.log('Login response:', response.data);

      if (response.data.success) {
        setUserId(response.data.data._id);
        alert(`Login successful! Flag: ${response.data.data.flag}`);
      } else {
        console.error("Login failed: ", response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Login</h2>
        <div className="login-user-pass-container">
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="username" className="form-user-pass-label">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="form-user-pass-label">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
          {/* Hint for finding the password */}
          <p style={{ fontSize: '12px', color: '#888' }}>Hint: Check the code and cookies for hidden messages.</p>
        </div>
      </header>
    </div>
  );
}

export default App;